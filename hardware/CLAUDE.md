# hardware/

Serial communication layer between the Pico and the bridge. One file: `serial_worker.py`.

## What it does

Runs as a daemon thread (started by `bridge.py`). It:
1. Auto-detects the Pico by USB VID (`0x2E8A`) or description matching "Pico"/"Raspberry"/"MicroPython"
2. Opens serial at 115200 baud
3. Parses plain-text lines from the Pico
4. Maps raw RFID IDs → character UIDs using `tag_map` from `characters.json`
5. Emits typed event dicts to a thread-safe queue consumed by `bridge.py`

## Events Emitted to Queue

```python
{"type": "tag",        "uid": "bacon_hair"}   # recognized RFID card
{"type": "tag_removed"}                        # card gone (after 4 consecutive misses)
{"type": "button_down"}                        # button pressed
{"type": "button_up"}                          # button released
{"type": "status", "connected": bool, "message": str}  # connection state changes
```

## Key Methods

| Method | Description |
|--------|-------------|
| `auto_detect_pico_port()` | Returns serial port path or `None` |
| `SerialWorker(port, tag_map, event_queue)` | Constructor |
| `.start()` | Launch as daemon thread |
| `.send_output(message)` | Send LED RGB string to Pico (e.g. `"255,0,128"`) |
| `.stop()` | Graceful shutdown |

## Tag Matching

`tag_map` is built from `characters.json` — maps raw ID strings to UIDs:
```python
{"3594085623": "bacon_hair", "1234567890": "tung", ...}
```

Matching is **substring**, not exact — `"3594"` would match `"3594085623"`. Always use full tag IDs in `characters.json`.

## Debouncing

- `_MISS_THRESHOLD = 4` consecutive missed scans (~800ms) before emitting `tag_removed`
- Duplicate `tag` events suppressed via `_last_uid` tracking

## No Pico / Dummy Mode

If `port="DUMMY"`, the worker emits a status event but never reads serial. The bridge falls back to UI-only/dev mode. Use `POST /dev/event` to inject events manually.

## Gotchas

- **Substring tag matching is fragile.** Partial IDs in `characters.json` can cause false positives. Always use full numeric IDs from the Pico.
- **Serial decode uses `errors="ignore"`.** Bad bytes from Pico are silently dropped.
- **No auto-reconnect on disconnect.** If the Pico unplugs mid-session, the bridge stays in broken state until restarted.
- **Thread-safe queue only.** Never call bridge state directly from this thread.
