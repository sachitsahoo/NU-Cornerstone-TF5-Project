"""
WebSocket bridge: Pico serial -> JSON events -> browser UI.
Serves built React app (web/dist), /api/characters, static /assets, dev inject when DEV_MODE.

Run: python bridge.py [--serial-port AUTO] [--host 127.0.0.1] [--http-port 8000]
Or: uvicorn bridge:app (set MYSTERY_SERIAL_PORT=AUTO or device path)
"""

from __future__ import annotations

import argparse
import asyncio
import json
import logging
import os
import queue
import sys
from contextlib import asynccontextmanager
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
from hardware.serial_worker import SerialWorker, auto_detect_pico_port

logger = logging.getLogger("pollution_mystery.bridge")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

ROOT = Path(__file__).resolve().parent
CHARACTERS_FILE = ROOT / "characters.json"
WEB_DIST = ROOT / "web" / "dist"
ASSETS_DIR = ROOT / "assets"

# MYSTERY_DEV: when unset or truthy ("1"), enables POST /dev/event and related dev UX.
# Set to "0" or "false" in production kiosk builds to disable dev injection (404 on /dev/event).
DEV_MODE = os.environ.get("MYSTERY_DEV", "1") not in ("0", "false", "False")

event_queue: queue.Queue = queue.Queue()
clients: Set[WebSocket] = set()
serial_worker: SerialWorker | None = None
last_status: dict | None = None
resolved_serial_port: str | None = None


def load_characters() -> dict:
    with open(CHARACTERS_FILE, "r") as f:
        return json.load(f)


def build_tag_map(characters: list) -> dict[str, str]:
    tag_map: dict[str, str] = {}
    for char in characters:
        for raw_id in char.get("tag_ids", []):
            tag_map[raw_id] = char["uid"]
    return tag_map


async def broadcast(msg: dict) -> None:
    global last_status
    out = enrich_ws_payload(
        msg,
        dev_mode=DEV_MODE,
        port_label=resolved_serial_port,
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


def resolve_serial_port(app: FastAPI) -> str:
    port = getattr(app.state, "serial_port", None)
    if port is None:
        port = os.environ.get("MYSTERY_SERIAL_PORT", "AUTO")
    if port == "AUTO":
        port = auto_detect_pico_port()
        if port is None:
            print("Could not auto-detect Pico — DUMMY serial mode.", file=sys.stderr)
            port = "DUMMY"
    return port


@asynccontextmanager
async def lifespan(app: FastAPI):
    global resolved_serial_port
    data = load_characters()
    tag_map = build_tag_map(data["characters"])
    port = resolve_serial_port(app)
    resolved_serial_port = port
    logger.info(
        "Bridge starting: serial_port=%s dev_mode=%s ws_schema=v%s",
        port,
        DEV_MODE,
        BRIDGE_EVENT_SCHEMA_VERSION,
    )
    global serial_worker
    serial_worker = SerialWorker(port, tag_map, event_queue)
    serial_worker.start()
    pump = asyncio.create_task(pump_serial_queue())
    yield
    pump.cancel()
    try:
        await pump
    except asyncio.CancelledError:
        pass
    if serial_worker:
        serial_worker.stop()
        serial_worker.join(timeout=2.0)


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
    parser.add_argument("--serial-port", default="AUTO", help="Pico serial (AUTO or path)")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--http-port", type=int, default=8000)
    args = parser.parse_args()

    app.state.serial_port = args.serial_port

    import uvicorn

    uvicorn.run(app, host=args.host, port=args.http_port, log_level="info")


if __name__ == "__main__":
    main()
