"""
Background thread: read raw bytes from the Pico, match tag substrings, detect BUTTON.
Events are pushed to a thread-safe queue as dicts (no PyQt).
"""

from __future__ import annotations

import queue
import re
import threading

import serial
import serial.tools.list_ports

SERIAL_BAUD = 115200

# Pico prints e.g. "TAG: 3594085623" — prefer exact ID lookup; avoid substring false positives.
_TAG_LINE_RE = re.compile(r"^TAG:\s*(\d+)", re.IGNORECASE)


def auto_detect_pico_port() -> str | None:
    ports = auto_detect_pico_ports()
    return ports[0] if ports else None


def auto_detect_pico_ports() -> list[str]:
    """Return all detected Pico serial ports (by VID or description)."""
    found = []
    for p in serial.tools.list_ports.comports():
        desc = (p.description or "").lower()
        mfr = (p.manufacturer or "").lower()
        if (
            "pico" in desc
            or "raspberry" in mfr
            or "MicroPython" in (p.product or "")
            or p.vid == 0x2E8A
        ):
            found.append(p.device)
    return found


class SerialWorker(threading.Thread):
    """
    Tag map: raw_id substring -> character uid (from characters.json tag_ids).
    Pushes dicts to event_queue:
      {"type":"tag","uid":...}
      {"type":"tag_removed"}
      {"type":"button"}
      {"type":"status","connected":bool,"message":str}
    """

    def __init__(
        self,
        port: str,
        tag_map: dict[str, str],
        event_queue: queue.Queue,
    ):
        super().__init__(daemon=True)
        self.port = port
        self.tag_map = tag_map
        self._tag_pairs_by_len_desc = sorted(
            tag_map.items(),
            key=lambda kv: len(kv[0]),
            reverse=True,
        )
        self.event_queue = event_queue
        self._running = True
        self._ser = None
        self._last_uid: str | None = None
        self._miss_count: int = 0
        self._MISS_THRESHOLD: int = 4  # consecutive misses before emitting tag_removed (~800ms at 200ms loop)

    def stop(self):
        self._running = False

    def _emit(self, d: dict):
        self.event_queue.put(d)

    def _match_line_to_tag_uid(self, line: str) -> str | None:
        m = _TAG_LINE_RE.match(line)
        if m:
            card_id = m.group(1)
            uid = self.tag_map.get(card_id)
            if uid is not None:
                return uid
        for raw_id, char_uid in self._tag_pairs_by_len_desc:
            if raw_id in line:
                return char_uid
        return None

    def run(self):
        if self.port == "DUMMY":
            self._emit({"type": "status", "connected": False, "message": "No serial port — UI-only mode"})
            return

        try:
            self._ser = serial.Serial(self.port, SERIAL_BAUD, timeout=1)
            self._emit({"type": "status", "connected": True, "message": f"Connected on {self.port}"})
        except serial.SerialException as e:
            self._emit({"type": "status", "connected": False, "message": str(e)})
            return

        buffer = ""
        while self._running:
            try:
                data = self._ser.read(64).decode(errors="ignore")
                if not data:
                    continue
                buffer += data
                while "\n" in buffer:
                    line, buffer = buffer.split("\n", 1)
                    line = line.strip()
                    if not line:
                        continue

                    matched_uid = self._match_line_to_tag_uid(line)

                    if matched_uid:
                        self._miss_count = 0
                        if matched_uid != self._last_uid:
                            self._last_uid = matched_uid
                            self._emit({"type": "tag", "uid": matched_uid})
                    else:
                        if self._last_uid is not None:
                            self._miss_count += 1
                            if self._miss_count >= self._MISS_THRESHOLD:
                                self._miss_count = 0
                                self._last_uid = None
                                self._emit({"type": "tag_removed"})

                    if line == "BUTTON_DOWN":
                        self._emit({"type": "button_down"})
                    elif line == "BUTTON_UP":
                        self._emit({"type": "button_up"})
                    elif line == "BUTTON":
                        self._emit({"type": "button"})  # legacy firmware

            except Exception as e:
                self._emit({"type": "status", "connected": False, "message": f"Serial error: {e}"})
                break

    def send_output(self, message: str):
        if self._ser and self._ser.is_open:
            try:
                self._ser.write((message + "\n").encode())
            except Exception as e:
                print(f"Serial write error: {e}")
