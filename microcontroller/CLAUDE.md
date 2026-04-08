# microcontroller/

Two separate Raspberry Pi Picos. Each has its own `main.py` and runs standalone — no Python env, no pip.

---

## Pico 1 — RFID (`rfid/main.py`)

**Role:** RFID scanning only. Runs RFID reader on Core 1, idle LED bounce animation on Core 0.

### Pin Assignments

| Signal    | Pin  |
|-----------|------|
| RFID CS   | GP1  |
| RFID SCK  | GP2  |
| RFID MOSI | GP3  |
| RFID MISO | GP4  |
| RFID RST  | GP18 |
| NeoPixel  | GP15 |

NeoPixel count: `n = 11`. Used for idle bounce animation (purple, 138,0,196). Not controlled by bridge.

### Serial Output (115200 baud, newline-delimited)

```
TAG: 3594085623    # RFID card detected (raw numeric ID, little-endian bytes)
```

- Prints `TAG:` every ~50ms continuously while card is present (no dedup on Pico — bridge handles it)
- **No `REMOVED` event currently** — bridge infers removal by absence of TAG messages
- No button, no serial command input

### Dependencies (must be on Pico root)

- `mfrc522.py` — RFID library (github.com/wendlers/micropython-mfrc522)
- `main.py` — this file

### Gotchas

- RST is GP18, not GP0 — docs used to say GP0, that was wrong
- TAG spam every 50ms is intentional; bridge deduplicates
- Missing `mfrc522.py` = silent boot failure; check Thonny REPL

---

## Pico 2 — LED/Button (`led_button/main.py`)

**Role:** NeoPixel strip control + two buttons. Receives LED color commands from bridge over serial.

### Pin Assignments

| Signal   | Pin  |
|----------|------|
| NeoPixel | GP28 |
| Button 1 | GP15 |
| Button 2 | GP16 |

NeoPixel count: `n = 24`. Both buttons use internal PULL_UP. Debounce is handled **in firmware** (50ms).

### Serial Input (from bridge → Pico)

```
255,180,100\n    # Sets all 24 NeoPixels to RGB(255,180,100)
```

### Serial Output (Pico → bridge)

```
BUTTON_DOWN      # Button 1 pressed
BUTTON_UP        # Button 1 released
BUTTON2_DOWN     # Button 2 pressed
BUTTON2_UP       # Button 2 released
LED SET: r,g,b   # Acknowledges a color command
```

- Inits all pixels to purple (138, 0, 196) on boot
- Polling loop every 10ms
- No RFID on this Pico

### Dependencies (must be on Pico root)

- `main.py` — this file only, no extra libraries

### Gotchas

- Debouncing is done in firmware here (unlike old single-Pico design where bridge debounced)
- If bridge sends malformed serial (not `r,g,b`), Pico prints `Invalid input: <line>` and continues

---

## Flashing Either Pico

1. Flash MicroPython firmware (micropython.org/download/rp2-pico)
2. For RFID Pico: copy `mfrc522.py` to Pico root first
3. Copy the relevant `main.py` to Pico root — runs automatically on boot
4. Use Thonny or `mpremote` to transfer files
