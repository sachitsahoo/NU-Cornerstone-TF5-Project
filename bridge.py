"""
WebSocket bridge: Pico serial -> JSON events -> browser UI.
Serves built React app (web/dist), /api/characters, POST /api/enjoyment-rating
(append-only JSONL under data/), static /assets, dev inject when DEV_MODE.

Run: python bridge.py                          # uses ports.json for this hostname, then AUTO
     python bridge.py --rfid-port /dev/cu.usbmodem1101 --led-port /dev/cu.usbmodem101
Or:  uvicorn bridge:app  (ports resolved from ports.json / AUTO)
"""

from __future__ import annotations

import argparse
import asyncio
import json
import logging
import os
import queue
import socket
import sys
import threading
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Set

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from bridge_protocol import (
    BRIDGE_EVENT_SCHEMA_VERSION,
    dev_event_ok_response,
    enrich_ws_payload,
    parse_dev_event_body,
)
from hardware.serial_worker import SerialWorker, auto_detect_pico_port, auto_detect_pico_ports

logger = logging.getLogger("pollution_mystery.bridge")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

ROOT = Path(__file__).resolve().parent
CHARACTERS_FILE = ROOT / "characters.json"
PORTS_FILE = ROOT / "ports.json"
WEB_DIST = ROOT / "web" / "dist"
ASSETS_DIR = ROOT / "assets"
DATA_DIR = ROOT / "data"
ENJOYMENT_RATINGS_FILE = DATA_DIR / "enjoyment_ratings.jsonl"
_ratings_file_lock = threading.Lock()

# MYSTERY_DEV: when unset or truthy ("1"), enables POST /dev/event and related dev UX.
# Set to "0" or "false" in production kiosk builds to disable dev injection (404 on /dev/event).
DEV_MODE = os.environ.get("MYSTERY_DEV", "1") not in ("0", "false", "False")

event_queue: queue.Queue = queue.Queue()
clients: Set[WebSocket] = set()
rfid_worker: SerialWorker | None = None
led_button_worker: SerialWorker | None = None
last_status: dict | None = None
resolved_rfid_port: str | None = None
resolved_led_port: str | None = None


def load_characters() -> dict:
    with open(CHARACTERS_FILE, "r") as f:
        return json.load(f)


def load_ports_config() -> tuple[str, str]:
    """
    Read ports.json and return (rfid_port, led_port) for this machine.
    Falls back to ("AUTO", "AUTO") if the file is missing or this hostname has no entry.
    """
    hostname = socket.gethostname()
    try:
        with open(PORTS_FILE, "r") as f:
            config = json.load(f)
        entry = config.get(hostname)
        if entry:
            rfid = entry.get("rfid_port", "AUTO")
            led = entry.get("led_port", "AUTO")
            logger.info("ports.json: hostname=%s → rfid=%s led=%s", hostname, rfid, led)
            return rfid, led
        logger.warning(
            "ports.json: no entry for hostname %r — falling back to AUTO. "
            "Add an entry to ports.json to fix this.",
            hostname,
        )
    except FileNotFoundError:
        logger.warning("ports.json not found — falling back to AUTO serial detection.")
    except Exception as e:
        logger.warning("ports.json read error: %s — falling back to AUTO.", e)
    return "AUTO", "AUTO"


def append_enjoyment_rating_line(record: dict) -> None:
    """Append one JSON object per line (JSONL). Thread-safe."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    line = json.dumps(record, ensure_ascii=False) + "\n"
    with _ratings_file_lock:
        with open(ENJOYMENT_RATINGS_FILE, "a", encoding="utf-8") as f:
            f.write(line)


def build_tag_map(characters: list) -> dict[str, str]:
    tag_map: dict[str, str] = {}
    for char in characters:
        for raw_id in char.get("tag_ids", []):
            tag_map[raw_id] = char["uid"]
    return tag_map


async def broadcast(msg: dict) -> None:
    global last_status
    port_label = f"rfid={resolved_rfid_port} led={resolved_led_port}"
    out = enrich_ws_payload(
        msg,
        dev_mode=DEV_MODE,
        port_label=port_label,
    )
    if out.get("type") == "status":
        last_status = out
    dead: list[WebSocket] = []
    for ws in list(clients):
        try:
            await ws.send_json(out)
        except Exception:
            dead.append(ws)
    for ws in dead:
        clients.discard(ws)


def blocking_get_event():
    try:
        return event_queue.get(timeout=0.2)
    except queue.Empty:
        return None


async def pump_serial_queue():
    loop = asyncio.get_event_loop()
    while True:
        item = await loop.run_in_executor(None, blocking_get_event)
        if item is not None:
            await broadcast(item)
        else:
            await asyncio.sleep(0.01)


def resolve_two_ports(rfid_arg: str, led_arg: str) -> tuple[str, str]:
    """Resolve rfid and led+button serial ports, auto-detecting Picos if needed."""
    if rfid_arg != "AUTO" and led_arg != "AUTO":
        return rfid_arg, led_arg

    detected = auto_detect_pico_ports()

    def _pick(arg: str, exclude: str | None) -> str:
        if arg != "AUTO":
            return arg
        available = [p for p in detected if p != exclude]
        if available:
            return available[0]
        print(f"Could not auto-detect a Pico (exclude={exclude}) — DUMMY mode.", file=sys.stderr)
        return "DUMMY"

    if rfid_arg == "AUTO" and led_arg == "AUTO":
        if len(detected) >= 2:
            return detected[0], detected[1]
        elif len(detected) == 1:
            print(
                f"Only one Pico found ({detected[0]}) — assigning to RFID, LED+Button in DUMMY mode.",
                file=sys.stderr,
            )
            return detected[0], "DUMMY"
        else:
            print("No Picos found — both in DUMMY mode.", file=sys.stderr)
            return "DUMMY", "DUMMY"

    # One is fixed, auto-detect the other excluding the fixed one
    rfid = _pick(rfid_arg, led_arg if led_arg != "AUTO" else None)
    led = _pick(led_arg, rfid if rfid != "AUTO" else None)
    return rfid, led


@asynccontextmanager
async def lifespan(app: FastAPI):
    global resolved_rfid_port, resolved_led_port, rfid_worker, led_button_worker
    data = load_characters()
    tag_map = build_tag_map(data["characters"])

    cli_rfid = getattr(app.state, "rfid_port", "AUTO")
    cli_led = getattr(app.state, "led_port", "AUTO")

    # Priority: CLI args → ports.json for this hostname → AUTO detection
    if cli_rfid == "AUTO" and cli_led == "AUTO":
        cfg_rfid, cfg_led = load_ports_config()
    else:
        cfg_rfid, cfg_led = cli_rfid, cli_led  # CLI fully overrides

    rfid_port, led_port = resolve_two_ports(cfg_rfid, cfg_led)
    resolved_rfid_port = rfid_port
    resolved_led_port = led_port

    logger.info(
        "Bridge starting: rfid_port=%s led_port=%s dev_mode=%s ws_schema=v%s",
        rfid_port,
        led_port,
        DEV_MODE,
        BRIDGE_EVENT_SCHEMA_VERSION,
    )

    rfid_worker = SerialWorker(rfid_port, tag_map, event_queue)
    led_button_worker = SerialWorker(led_port, {}, event_queue)  # no tag_map needed
    rfid_worker.start()
    led_button_worker.start()

    pump = asyncio.create_task(pump_serial_queue())
    yield
    pump.cancel()
    try:
        await pump
    except asyncio.CancelledError:
        pass
    for worker in (rfid_worker, led_button_worker):
        if worker:
            worker.stop()
            worker.join(timeout=2.0)


app = FastAPI(title="Pollution Mystery Bridge", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/characters")
async def api_characters():
    return load_characters()


@app.post("/api/led")
async def api_led(body: dict):
    r = body.get("r", 0)
    g = body.get("g", 0)
    b = body.get("b", 0)
    line = f"{r},{g},{b}"
    # Single-Pico setups: LED port is DUMMY but RFID Pico runs firmware that reads
    # serial RGB lines (see microcontroller/main.py) — forward colors to that port.
    if resolved_led_port != "DUMMY" and led_button_worker is not None:
        led_button_worker.send_output(line)
    elif rfid_worker is not None:
        rfid_worker.send_output(line)
    return {"ok": True}


@app.post("/api/enjoyment-rating")
async def api_enjoyment_rating(body: dict):
    """
    Persist a 1–5 enjoyment score after the post-MCQ rating step.
    Body: { "stars": int (1–5), "case_id"?: str, "lang"?: "en"|"es" }
    Appends to data/enjoyment_ratings.jsonl (UTC timestamp per row).
    """
    stars = body.get("stars")
    if type(stars) is not int or stars < 1 or stars > 5:
        raise HTTPException(400, "stars must be an integer from 1 to 5")
    case_id = body.get("case_id")
    if case_id is not None and not isinstance(case_id, str):
        case_id = str(case_id)
    lang = body.get("lang", "en")
    if lang not in ("en", "es"):
        lang = "en"
    record = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "stars": stars,
        "case_id": case_id,
        "lang": lang,
    }
    await asyncio.to_thread(append_enjoyment_rating_line, record)
    logger.info("Enjoyment rating saved: stars=%s case_id=%s lang=%s", stars, case_id, lang)
    return {"ok": True}


@app.post("/dev/event")
async def dev_event(body: dict):
    if not DEV_MODE:
        logger.warning("POST /dev/event rejected: MYSTERY_DEV disabled")
        raise HTTPException(404, "dev disabled")
    try:
        ev = parse_dev_event_body(body)
    except ValueError as e:
        logger.info("POST /dev/event bad body: %s", e)
        raise HTTPException(400, str(e)) from e
    event_queue.put(ev)
    logger.debug("POST /dev/event enqueued: %s", ev.get("type"))
    return dev_event_ok_response()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.add(websocket)
    logger.info("WebSocket /ws connected; clients=%d", len(clients))
    if last_status:
        try:
            await websocket.send_json(last_status)
        except Exception:
            pass
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        pass
    finally:
        clients.discard(websocket)
        logger.info("WebSocket /ws closed; clients=%d", len(clients))


if ASSETS_DIR.is_dir():
    app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")

if WEB_DIST.is_dir() and (WEB_DIST / "index.html").is_file():
    app.mount("/", StaticFiles(directory=str(WEB_DIST), html=True), name="spa")
else:

    @app.get("/")
    async def placeholder():
        return {
            "message": "Build the web UI first: cd web && npm install && npm run build",
            "api": "/api/characters",
            "websocket": "/ws",
        }


def main():
    parser = argparse.ArgumentParser(description="Pollution Mystery — WebSocket bridge")
    parser.add_argument(
        "--rfid-port", default="AUTO",
        help="Serial port for RFID Pico (AUTO or path, e.g. /dev/cu.usbmodem101)",
    )
    parser.add_argument(
        "--led-port", default="AUTO",
        help="Serial port for LED+Button Pico (AUTO or path, e.g. /dev/cu.usbmodem102)",
    )
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--http-port", type=int, default=8000)
    args = parser.parse_args()

    app.state.rfid_port = args.rfid_port
    app.state.led_port = args.led_port

    import uvicorn

    uvicorn.run(app, host=args.host, port=args.http_port, log_level="info")


if __name__ == "__main__":
    main()
