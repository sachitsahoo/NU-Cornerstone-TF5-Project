# 🔍 Pollution Mystery — TF5 Cornerstone Project

An interactive Clue-style exhibit powered by a Raspberry Pi Pico, RFID cards, NeoPixel LEDs, and a PyQt5 display app running on a PC or Mac. Players scan suspect cards to reveal character profiles, then make their accusation. This project is made for the final project for Cornerstone of Engineering 1502 at Northeastern University. 

---

## How It Works

The system has two parts that communicate over USB serial:

- **Pico (MicroPython)** — reads RFID tags and drives NeoPixel LEDs. Prints tag IDs and button events to serial output.
- **Display App (Python/PyQt5)** — runs on a connected PC or Mac, reads the serial output, and shows the full-screen experience with character profiles, sound, and the accusation finale.

### Game Flow

1. **Explore** — Players scan each suspect's card one by one. The screen shows the character's name, role, description, and a suspicious detail.
2. **Accuse** — Once all suspects have been reviewed, the physical button advances the game to the accusation stage.
3. **Result** — Players scan their chosen suspect. The screen reveals whether they were right — and explains the full story.

---

## Project Structure

```
project/
├── display_app.py        ← PyQt5 app (runs on PC/Mac)
├── characters.json       ← character data — edit this to customise the mystery
├── CITATIONS.MD          ← contains citations
├── requirements.txt      ← Python dependencies
├── microcontroller/
│   └── main.py           ← MicroPython firmware (copy to Pico as main.py)
└── assets/
    ├── images/           ← character portrait PNGs
    └── sounds/
        ├── ambient_idle.wav
        ├── stage_transition.wav
        ├── victory.wav
        ├── wrong.wav
        └── <character>_theme.wav   ← one per character
```

---

## Hardware Setup

### Parts

- Raspberry Pi Pico (or Pico W)
- MFRC522 RFID reader module
- NeoPixel LED strip (default: 58 pixels)
- Momentary push button
- USB cable (Pico → PC/Mac)

### Wiring

**MFRC522 → Pico**

| MFRC522 | Pico pin |
|---------|----------|
| SDA/CS  | GP5      |
| SCK     | GP2      |
| MOSI    | GP3      |
| MISO    | GP4      |
| RST     | GP6      |
| 3.3V    | 3V3(OUT) |
| GND     | GND      |

**NeoPixel strip → Pico**

| NeoPixel | Pico pin |
|----------|----------|
| Data     | GP0      |
| +5V      | VBUS     |
| GND      | GND      |

**Button → Pico**

| Button   | Pico pin |
|----------|----------|
| One leg  | GP15     |
| Other    | GND      |

The button uses the internal pull-up — no resistor needed.

---

## Pico Setup

### 1. Flash MicroPython

Download the latest MicroPython `.uf2` from [micropython.org/download/rp2-pico](https://micropython.org/download/rp2-pico/).
Hold **BOOTSEL**, plug in USB, then drag the `.uf2` file onto the `RPI-RP2` drive that appears.

### 2. Install the MFRC522 library

Download `mfrc522.py` from [github.com/wendlers/micropython-mfrc522](https://github.com/wendlers/micropython-mfrc522) and copy it to the Pico using Thonny or rshell.

### 3. Copy the firmware

Copy `main.py` to the root of the Pico. It runs automatically on every boot.

### 4. Find your tag IDs

Open a serial monitor (e.g. Thonny's shell) and scan each RFID card. The Pico will print lines like:

```
TAG: 390485036
```

Note these numbers — you'll need them when editing `characters.json`.

---

## PC / Mac Setup

### Install dependencies
```bash
# Create and activate a virtual environment
python -m venv venv

# On Mac/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Then install dependencies
pip install -r requirements.txt
```
### Run the app

```bash
# Auto-detect Pico port
python display_app.py

# Specify port manually (Windows)
python display_app.py --port COM3

# Specify port manually (Mac/Linux)
python display_app.py --port /dev/tty.usbmodem14201
# Try this if that doesn't work
python display_app.py --port /dev/cu.usbmodem14201

# Launch in fullscreen mode
python display_app.py --fullscreen
```

If the Pico isn't connected, the app starts in UI-only mode — useful for testing without hardware.

---

## Keyboard Shortcuts

These work at any time and are intended for development and testing. **Disable `DEV_MODE` before the exhibit goes live** (see `display_app.py`, line ~69).

| Key | Action |
|-----|--------|
| `1`, `2`, … | Simulate scanning Character 1, 2, … |
| `B` | Simulate button press |
| `R` | Simulate tag removed |
| `F11` | Toggle fullscreen |
| `Esc` | Quit |

The on-screen dev panel also provides buttons to force accusations (correct and wrong) and reset to the title screen.

---

## Customising the Mystery

Everything about the story lives in `characters.json`. Open it in any text editor.

### Changing the culprit

Set `"correct_culprit_id"` to the `uid` of the guilty character, and update `"culprit_explanation"` with the reveal text shown at the end.

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
  "image": "assets/images/colonel_mustard.png",
  "sound_theme": "assets/sounds/colonel_mustard_theme.wav",
  "led_color": [200, 150, 0]
}
```

- `uid` — a short identifier used internally (letters and underscores only).
- `tag_ids` — one or more raw tag numbers printed by the Pico when that card is scanned. Multiple IDs let you assign several physical cards to one character.
- `led_color` — RGB values `[R, G, B]` for the NeoPixel strip when this character is scanned.
- `image` — path to a portrait PNG (relative to the project root).
- `sound_theme` — WAV file played when the character's card is scanned.

### Editing an existing character

Find the character's object in the array and edit any field directly. The app reloads `characters.json` on each launch, so no code changes are needed.

---

## Sound Assets

Place all audio files in `assets/sounds/` as WAV files. The expected filenames are:

| File | When it plays |
|------|---------------|
| `ambient_idle.wav` | Title screen (looped) |
| `stage_transition.wav` | Button pressed, moving to accusation stage |
| `victory.wav` | Correct accusation |
| `wrong.wav` | Wrong accusation |
| `<character>_theme.wav` | Scanning that character's card |

If a file is missing, the app continues silently — no crash.

Sound requires `pygame`. If it isn't installed, all audio is silently disabled and a warning is printed to the console.

---

## Troubleshooting

**App says "Could not auto-detect Pico"**
Pass the port manually with `--port`. On Mac, run `ls /dev/tty.usbmodem*` to find it. On Windows, check Device Manager under Ports (COM & LPT).
If tty doesn't work, try using cu.usbmodem* instead

**Tag scans do nothing**
Open a serial monitor and scan the card. Check that the number printed matches the `tag_ids` value in `characters.json` exactly (it's a plain decimal string).

**LEDs don't light up**
Confirm the data wire is on GP0 and the strip's power comes from VBUS (5V), not 3V3. Check that `n` in `main.py` matches the actual pixel count of your strip.

**Sound plays but is very quiet**
Adjust system volume before the exhibit. `pygame` uses the OS audio stack, so the app has no independent volume control.

**Screen goes back to the title when I lift the card**
That's expected behaviour during the Explore stage — the character screen dismisses when the tag leaves the reader.
