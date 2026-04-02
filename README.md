# 🔍 Pollution Mystery — TF5 Cornerstone Project

An interactive Clue-style exhibit powered by a Raspberry Pi Pico, RFID cards, NeoPixel LEDs, and a React web UI served from a Python/FastAPI backend. Players scan suspect cards to reveal character profiles, then make their accusation. Made for the final project of Cornerstone of Engineering 1502 at Northeastern University.

---

## How It Works

The system has three layers that communicate in sequence:

- **Pico #1 — RFID** (`microcontroller/rfid/main.py`) — reads RFID tags and prints tag IDs over USB serial.
- **Pico #2 — LED + Button** (`microcontroller/led_button/main.py`) — drives NeoPixel LEDs, reads the button, receives RGB commands from the bridge.
- **Bridge (Python/FastAPI)** — runs on a connected PC or Mac, reads serial output from the Pico, and exposes a WebSocket endpoint for the UI.
- **Web UI (React/TypeScript)** — full-screen browser experience with character profiles and the accusation finale. Connects to the bridge over WebSocket.

### Game Flow

1. **Landing** — Players press Play and choose a language (English or Spanish).
2. **Explore** — Players scan each suspect's card. The screen shows the character's name, role, and a suspicious detail.
3. **Accuse** — Players scan their chosen suspect, then press the physical button to confirm.
4. **Result** — The screen reveals whether they were right and explains the full story.

---

## Project Structure

```
project/
├── bridge.py             ← FastAPI backend — serial bridge + WebSocket server
├── bridge_protocol.py    ← versioned event schema
├── characters.json       ← character data — edit this to customise the mystery
├── requirements.txt      ← Python dependencies
├── display_app.py        ← legacy PyQt5 app (superseded by web UI)
├── CITATIONS.md          ← citations
├── microcontroller/
│   ├── rfid/
│   │   └── main.py       ← MicroPython firmware for RFID Pico
│   └── led_button/
│       └── main.py       ← MicroPython firmware for LED+Button Pico
├── hardware/
│   └── serial_worker.py  ← thread that reads Pico serial → event queue
├── web/                  ← React/TypeScript frontend (Vite)
│   ├── src/
│   │   ├── GameShell.tsx       ← top-level game state
│   │   ├── gameContent.ts      ← localized copy (EN/ES)
│   │   ├── gameTypes.ts        ← TypeScript types
│   │   └── views/              ← LandingView, PlayingView, LanguagePicker
│   └── package.json
└── assets/
    ├── images/           ← character portrait PNGs
    └── sounds/           ← WAV files (one per character)
```

---

## Hardware Setup

### Parts

- 2× Raspberry Pi Pico (or Pico W)
- MFRC522 RFID reader module
- NeoPixel LED strip
- Momentary push button
- 2× USB cable (one per Pico → PC/Mac)

### Wiring

**Pico #1 — RFID** (`microcontroller/rfid/main.py`)

| MFRC522 | Pico pin |
|---------|----------|
| SDA/CS  | GP1      |
| SCK     | GP2      |
| MOSI    | GP3      |
| MISO    | GP4      |
| RST     | GP18     |
| 3.3V    | 3V3(OUT) |
| GND     | GND      |

**Pico #2 — LED + Button** (`microcontroller/led_button/main.py`)

| Component      | Pico pin |
|----------------|----------|
| NeoPixel data  | GP28     |
| Button (leg 1) | GP15     |
| Button (leg 2) | GND      |

Default NeoPixel count is 24. To change it, edit `n` at the top of `microcontroller/led_button/main.py`.

The button uses the internal pull-up — no resistor needed.

---

## Pico Setup

### 1. Flash MicroPython

Download the latest MicroPython `.uf2` from [micropython.org/download/rp2-pico](https://micropython.org/download/rp2-pico/).
Hold **BOOTSEL**, plug in USB, then drag the `.uf2` file onto the `RPI-RP2` drive that appears.

### 2. Install the MFRC522 library

Download `mfrc522.py` from [github.com/wendlers/micropython-mfrc522](https://github.com/wendlers/micropython-mfrc522) and copy it to the Pico root using Thonny or rshell.

### 3. Copy the firmware

Flash each Pico separately:
- Copy `microcontroller/rfid/main.py` to the **RFID Pico** root as `main.py`
- Copy `microcontroller/led_button/main.py` to the **LED+Button Pico** root as `main.py`

Each file runs automatically on boot.

### 4. Find your tag IDs

Open a serial monitor (e.g. Thonny's shell) and scan each RFID card. The Pico prints lines like:

```
TAG: 390485036
```

Note these numbers — you'll need them when editing `characters.json`.

---

## PC / Mac Setup

### Install Python dependencies

```bash
python -m venv venv

# Mac/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate

pip install -r requirements.txt
```

### Run the bridge

```bash
# Normal startup — reads ports.json for this machine's hostname, falls back to AUTO
python bridge.py

# Override ports from the command line (overrides ports.json entirely)
python bridge.py --rfid-port /dev/cu.usbmodem1101 --led-port /dev/cu.usbmodem101

# Enable dev mode (enables in-browser hardware simulation)
MYSTERY_DEV=1 python bridge.py
```

#### Per-machine port config (`ports.json`)

Each computer that runs the bridge should have an entry in `ports.json` (project root), keyed by hostname:

```json
{
  "Sachits-MacBook-Air.local": {
    "rfid_port": "/dev/cu.usbmodem1101",
    "led_port":  "/dev/cu.usbmodem101"
  },
  "exhibit-pc": {
    "rfid_port": "/dev/tty.usbmodem1101",
    "led_port":  "/dev/tty.usbmodem101"
  }
}
```

Find your hostname by running `hostname` in a terminal. On Linux/Windows exhibit machines use `tty` instead of `cu`. If the hostname isn't in the file, the bridge falls back to auto-detection.

If a Pico isn't connected, that worker falls back to DUMMY mode — events from that Pico are silently dropped but the UI still loads.

Bridge listens on `http://127.0.0.1:8000`.

### Run the web UI

In a separate terminal:

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:5173` in a browser. The Vite dev server proxies all WebSocket and API traffic to the bridge automatically.

### Production (optional)

```bash
cd web && npm run build
```

The bridge will then serve the built UI at `http://127.0.0.1:8000/` — no separate web server needed.

---

## Keyboard Shortcuts

These work in the browser and are intended for development and testing.

| Key | Action |
|-----|--------|
| `P` | Start game (from landing screen) |
| `D` | Toggle dev control panel |
| `Esc` | Close overlay / language picker |

The dev panel lets you simulate tag scans, tag removal, and button presses without physical hardware.

**Disable dev mode before the exhibit goes live** by running the bridge without `MYSTERY_DEV=1`.

---

## Customising the Mystery

Everything about the story lives in `characters.json`. Open it in any text editor.

### Changing the culprit

Set `"round_culprits"` to an array of `uid` values for the guilty character(s). One is chosen at random each game session. Update `"culprit_explanation"` with the reveal text for each.

### Adding a character

Add a new object to the `"characters"` array:

```json
{
  "uid": "colonel_mustard",
  "tag_ids": ["XXXXXXXXX"],
  "name": "Colonel Mustard",
  "role": "Retired Military Officer",
  "description": "A decorated veteran with a volatile temper...",
  "suspicious_detail": "Was seen arguing with the river warden last spring.",
  "innocent_explanation": "Mustard's argument was about fishing rights, unrelated to the spill.",
  "culprit_explanation": "Mustard had been illegally dumping from his private estate upstream.",
  "image": "assets/images/colonel_mustard.png",
  "led_color": [200, 150, 0]
}
```

- `uid` — short identifier used internally (letters and underscores only).
- `tag_ids` — one or more raw tag numbers printed by the Pico. Multiple IDs let you assign several physical cards to one character.
- `led_color` — RGB `[R, G, B]` for the NeoPixel strip when this character is scanned.
- `image` — path to a portrait PNG relative to the project root.
- `innocent_explanation` / `culprit_explanation` — text shown at the reveal depending on outcome.

The app reloads `characters.json` on each launch — no code changes needed.

### Editing UI copy or translations

Localized strings (EN/ES) live in `web/src/gameContent.ts`.

---

## Troubleshooting

**Bridge says "Could not auto-detect Pico"**
Pass ports manually with `--rfid-port` and `--led-port`. On Mac, run `ls /dev/cu.usbmodem*` to list both. On Windows, check Device Manager under Ports (COM & LPT). If both Picos show the same VID, unplug one at a time to identify which port is which.

**Tag scans do nothing**
Open a serial monitor and scan the card. Check that the number printed matches a `tag_ids` value in `characters.json` exactly (plain decimal string).

**LEDs don't light up**
Confirm the data wire is on GP28. Check that `n` in `microcontroller/led_button/main.py` matches your actual pixel count. LED power must come from VBUS (5V), not 3V3. Also confirm `--led-port` points to the LED+Button Pico, not the RFID one.

**UI won't connect to bridge**
Make sure `python bridge.py` is running before opening the browser. Check the terminal for port errors. The status line in the dev panel shows connection state.
