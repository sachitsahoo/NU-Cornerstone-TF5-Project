"""
Versioned JSON shapes for the HTTP/WebSocket bridge (browser <-> bridge.py).

- WebSocket /ws: every outbound message includes schema pollution-mystery.bridge v1.
- POST /dev/event: request body may include schema pollution-mystery.dev v1; legacy bodies
  without schema are accepted as v1 for compatibility.
"""

from __future__ import annotations

from typing import Any

BRIDGE_EVENT_SCHEMA_NAME = "pollution-mystery.bridge"
BRIDGE_EVENT_SCHEMA_VERSION = 1
BRIDGE_EVENT_SCHEMA: dict[str, Any] = {
    "name": BRIDGE_EVENT_SCHEMA_NAME,
    "version": BRIDGE_EVENT_SCHEMA_VERSION,
}

DEV_EVENT_SCHEMA_NAME = "pollution-mystery.dev"
DEV_EVENT_SCHEMA_VERSION = 1
DEV_EVENT_SCHEMA: dict[str, Any] = {
    "name": DEV_EVENT_SCHEMA_NAME,
    "version": DEV_EVENT_SCHEMA_VERSION,
}


def enrich_ws_payload(
    msg: dict[str, Any],
    *,
    dev_mode: bool,
    port_label: str | None,
) -> dict[str, Any]:
    """Attach schema and bridge-only fields to messages sent to WebSocket clients."""
    out = dict(msg)
    out["schema"] = dict(BRIDGE_EVENT_SCHEMA)
    if out.get("type") == "status":
        out.setdefault("dev_mode", dev_mode)
        if port_label is not None:
            out["port"] = port_label
    return out


def parse_dev_event_body(body: dict[str, Any]) -> dict[str, Any]:
    """
    Validate POST /dev/event JSON and return a minimal queue event dict
    (type / uid only — no schema; the bridge enriches on broadcast).
    Raises ValueError with a short message if invalid.
    """
    schema = body.get("schema")
    if schema is not None:
        if schema.get("name") != DEV_EVENT_SCHEMA_NAME:
            raise ValueError(f"unknown dev schema name: {schema.get('name')!r}")
        if schema.get("version") != DEV_EVENT_SCHEMA_VERSION:
            raise ValueError(f"unsupported dev schema version: {schema.get('version')!r}")

    t = body.get("type")
    if t == "tag":
        uid = body.get("uid")
        if not uid:
            raise ValueError("uid required for tag")
        return {"type": "tag", "uid": uid}
    if t == "button":
        return {"type": "button"}
    if t == "button_down":
        return {"type": "button_down"}
    if t == "button_up":
        return {"type": "button_up"}
    if t == "tag_removed":
        return {"type": "tag_removed"}
    raise ValueError(f"unknown type: {t!r}")


def dev_event_ok_response() -> dict[str, Any]:
    return {"ok": True, "schema": dict(BRIDGE_EVENT_SCHEMA)}
