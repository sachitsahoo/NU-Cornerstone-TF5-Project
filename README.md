# Murder Mystery RFID Experience — Setup Guide

## File Structure

```
project/
├── display_app.py        ← PyQt5 app (runs on PC/Mac)
├── characters.json       ← character data (edit this to add characters)
├── pico_main.py          ← MicroPython firmware (copy to Pico)
└── assets/
    ├── images/
    │   ├── professor_plum.png
    │   └── ms_scarlett.png
    └── sounds/
        ├── ambient_idle.wav       ← placeholder
        ├── stage_transition.wav   ← placeholder
        ├── victory.wav            ← placeholder
        ├── wrong.wav              ← placeholder
        ├── professor_plum_enter.wav
        └── ms_scarlett_enter.wav
```

---

## Pi Pico Setup

### 1. Flash MicroPython
Download the latest MicroPython .uf2 from https://micropython.org/download/rp2-pico/
Hold BOOTSEL, plug in USB, drag .uf2 to the RPI-RP2 drive.

### 2. Install the MFRC522 library
Download mfrc522.py from: https://github.com/wendlers/micropython-mfrc522
Copy it to the Pico alongside main.py using Thonny or rshell.

### 3. Copy pico_main.py to the Pico
Rename it to `main.py` on the Pico so it runs on boot.

### 4. Wiring

| MFRC522 Pin | Pico Pin |
|-------------|----------|
| SDA/CS      | GP5      |
| SCK         | GP2      |
| MOSI        | GP3      |
| MISO        | GP4      |
| RST         | GP6      |
| 3.3V        | 3V3(OUT) |
| GND         | GND      |

| NeoPixel | Pico Pin |
|----------|----------|
| Data     | GP0      |
| +5V      | VBUS     |
| GND      | GND      |

| Button   | Pico Pin |
|----------|----------|
| One leg  | GP15     |
| Other    | GND      |

(Internal pull-up is enabled — no resistor needed.)

---

## PC / Mac Setup

### Install dependencies
```bash
pip install PyQt5 pyserial
```

### Run
```bash
# Auto-detect Pico port
python display_app.py

# Specify port manually (Windows)
python display_app.py --port COM3

# Specify port manually (Mac)
python display_app.py --port /dev/tty.usbmodem14201

# Fullscreen mode
python display_app.py --fullscreen
```

### Keyboard Shortcuts (dev/testing — no hardware needed)
| Key | Action |
|-----|--------|
| 1   | Simulate scan: Character 1 |
| 2   | Simulate scan: Character 2 |
| B   | Simulate button press |
| R   | Simulate tag removed |
| F11 | Toggle fullscreen |
| Esc | Quit |

---

## Adding Characters

Edit `characters.json`. Add a new object to the `characters` array:

```json
{
  "uid": "AABBCCDD",          ← the hex UID printed by the Pico when you scan the tag
  "name": "Colonel Mustard",
  "role": "Retired Military Officer",
  "description": "A decorated veteran with a volatile temper...",
  "suspicious_detail": "Was seen arguing with the river warden last spring.",
  "image": "assets/images/colonel_mustard.png",
  "led_color": [200, 150, 0],  ← RGB for this character's LED color
  "sound_enter": "assets/sounds/colonel_mustard_enter.wav",
  "sound_theme": "assets/sounds/colonel_mustard_theme.wav"
}
```

Then update `"correct_culprit_id"` at the top of the JSON to the UID of the guilty character.

### Finding a tag's UID
Run pico_main.py and watch the serial output in Thonny or any serial monitor.
When you scan a tag, it will print `TAG:XXXXXXXX` — that hex string is the UID.

---

## Debounce Tuning (pico_main.py top of file)

| Constant        | Default | Meaning                                      |
|-----------------|---------|----------------------------------------------|
| SPIKE_MIN_READS | 3       | Min reads in window to pass spike filter     |
| SPIKE_WINDOW_MS | 500     | Window size for spike filter (ms)            |
| DWELL_MS        | 2000    | How long tag must sit still to count as seen |
| REMOVAL_MS      | 600     | No-read timeout before tag is considered gone|
