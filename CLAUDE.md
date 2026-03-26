# Pollution Mystery — Cornerstone P2

## Project Overview

An interactive Clue-style museum exhibit where visitors scan RFID suspect cards to investigate river pollution and accuse a culprit. The game reveals whether the player's choice was correct and explains the environmental impact.

**Tech stack:**
- **Microcontroller:** MicroPython on Raspberry Pi Pico (RFID reader, NeoPixel LEDs, button)
- **Backend bridge:** Python/FastAPI + WebSocket server, communicates with Pico over serial
- **Frontend:** React 18 + TypeScript, built with Vite
- **Game data:** `characters.json` (suspects, tag IDs, culprit explanations)

Supports English and Spanish (EN/ES) localization.

## Architecture & File Structure

```
/
├── microcontroller/
│   └── main.py              # MicroPython firmware flashed to Pico
├── hardware/
│   └── serial_worker.py     # Thread that reads Pico serial → event queue
├── web/                     # React/TypeScript SPA
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── GameShell.tsx        # Top-level game state + keyboard shortcuts
│   │   ├── gameContent.ts       # Localized copy, fallback character data
│   │   ├── gameTypes.ts         # TypeScript types mirroring characters.json
│   │   ├── types.ts             # Bridge WebSocket protocol types (v1)
│   │   ├── hooks/
│   │   │   └── useBridgeWebSocket.ts  # WS connection + auto-reconnect
│   │   └── views/
│   │       ├── LandingView.tsx
│   │       ├── PlayingView.tsx
│   │       └── LanguagePickerOverlay.tsx
│   ├── vite.config.ts           # Dev proxy: /ws, /api, /dev, /assets → :8000
│   └── package.json
├── bridge.py                # FastAPI app — serial-to-WebSocket bridge (main backend entry point)
├── bridge_protocol.py       # Versioned event schema (pollution-mystery.bridge v1)
├── characters.json          # Game data: suspects, tag IDs, culprit list, LED colors
├── display_app.py           # Legacy PyQt5 desktop app (superseded by web UI)
├── requirements.txt         # pyserial, fastapi, uvicorn, PyQt5
├── requirements-sound.txt   # + pygame (optional audio)
├── package.json             # Root npm scripts (delegates to web/)
└── README.md
```

### Communication flow

```
Pico (serial) → serial_worker.py → bridge.py (FastAPI/WebSocket :8000)
                                        ↕ WebSocket /ws
                               web/ React UI (Vite :5173 in dev)
```

- Pico outputs plain text over USB serial: `TAG: <id>`, `REMOVED`, `BUTTON`
- `serial_worker.py` parses these and emits typed event dicts to a queue
- `bridge.py` consumes the queue and broadcasts versioned JSON messages over `/ws`
- React hook `useBridgeWebSocket.ts` subscribes and drives `GameShell.tsx` state
- `GET /api/characters` serves `characters.json` (including culprit list) to the frontend
- In dev mode (`MYSTERY_DEV=1`), `POST /dev/event` allows injecting hardware events without a Pico

### Key entry points

| Layer | Entry point |
|---|---|
| Microcontroller | `microcontroller/main.py` |
| Python backend | `bridge.py` (FastAPI app) |
| React frontend | `web/src/main.tsx` → `App.tsx` → `GameShell.tsx` |

## Developer Workflow

### Python backend

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run bridge (auto-detects Pico, falls back to DUMMY mode if not found)
python bridge.py

# Or specify serial port explicitly
python bridge.py --serial-port /dev/cu.usbmodem14201

# Enable dev mode (unlocks POST /dev/event injection endpoint)
MYSTERY_DEV=1 python bridge.py
```

Backend listens on `http://127.0.0.1:8000` by default.

### React frontend

```bash
cd web
npm install
npm run dev          # Vite dev server on :5173, proxies hardware events from :8000
npm run build        # Production build → web/dist/
```

In production, `bridge.py` serves the built `web/dist/` as static files at `/`.

### Microcontroller setup

1. Flash MicroPython firmware to Pico (from micropython.org)
2. Copy `mfrc522.py` RFID library to Pico root (github.com/wendlers/micropython-mfrc522)
3. Copy `microcontroller/main.py` to Pico root as `main.py`

### Dev / testing without hardware

Run the bridge in dummy mode (no Pico connected), open the web UI, press `D` to toggle the dev panel, and simulate `tag`, `tag_removed`, and `button` events directly in the browser.

**Keyboard shortcuts (in-browser):**
- `P` — Start game (from landing)
- `D` — Toggle dev control panel
- `Esc` — Close overlays

## Game Data

Edit `characters.json` to change suspects, RFID tag IDs, LED colors, or the culprit list (`round_culprits`). Edit `web/src/gameContent.ts` for localized UI copy.

## Pico Pin Assignments

From `microcontroller/main.py` (authoritative):

| Signal | Pico pin |
|---|---|
| RFID CS | GP1 |
| RFID SCK | GP2 |
| RFID MOSI | GP3 |
| RFID MISO | GP4 |
| RFID RST | GP0 |
| NeoPixel data | GP28 |
| Button | GP14 |

NeoPixel pixel count: `n = 8` (edit at top of `main.py`). Button uses internal pull-up; triggers on falling edge.

## Notes

- `display_app.py` (PyQt5) is a legacy artifact — the active UI is the React web app.
