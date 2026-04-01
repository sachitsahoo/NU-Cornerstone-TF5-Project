# microcontroller/

MicroPython firmware for the Raspberry Pi Pico. One file: `main.py`. This runs standalone on the Pico — no Python env, no pip.

## What it does

Polling loop (10ms) that:
1. Reads RFID tags via MFRC522 over SPI
2. Monitors a button with internal pull-up
3. Controls a NeoPixel LED strip
4. Outputs plain-text events over USB serial to the host

## Pin Assignments (authoritative)

| Signal      | Pin  |
|-------------|------|
| RFID CS     | GP1  |
| RFID SCK    | GP2  |
| RFID MOSI   | GP3  |
| RFID MISO   | GP4  |
| RFID RST    | GP0  |
| NeoPixel    | GP28 |
| Button      | GP15 |

NeoPixel count is set at the top of `main.py` as `n = 24`. Match this to actual hardware.

## Serial Output Format (115200 baud, newline-delimited)

```
TAG: 3594085623       # RFID card detected (raw numeric ID)
REMOVED               # card no longer in range
BUTTON_DOWN           # sent every loop while button held
BUTTON_UP             # sent once on release
LED SET: 255,180,100  # acknowledges an LED command from host
```

## Receiving LED Commands

Bridge sends `255,180,100\n` over serial → Pico sets all NeoPixels to that RGB value.

## Dependencies (must be on Pico root)

- `mfrc522.py` — RFID library (github.com/wendlers/micropython-mfrc522)
- `main.py` — this file

## Flashing / Deploying

1. Flash MicroPython firmware (micropython.org/download/rp2-pico)
2. Copy `mfrc522.py` to Pico root via Thonny or `mpremote`
3. Copy `main.py` to Pico root as `main.py` — runs automatically on boot

## Gotchas

- **No debouncing:** `BUTTON_DOWN` fires every 10ms while held. The bridge (`serial_worker.py`) handles debouncing, not the Pico.
- **No JSON:** Output is plain text. The bridge parses and enriches it.
- **MFRC522 must be present:** Missing library = silent boot failure. Check Thonny REPL if Pico isn't outputting anything.
- **Pixel count:** `n` at top of file must match actual strip length or you'll get incorrect colors on overflow pixels.
- **Tag IDs are raw integers:** The bridge maps these to character UIDs via `characters.json`.
