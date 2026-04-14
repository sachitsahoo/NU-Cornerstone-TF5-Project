# Citations & Attributions

## Generative AI Disclosure

Portions of this project (firmware logic, backend architecture, frontend components, documentation, and debugging) were developed with the assistance of **Claude Code** (powered by Claude Sonnet by Anthropic) and **Cursor** (an AI-assisted code editor by Anysphere). AI assistance was used throughout the development cycle of the computer programming for Project 2 only in compliance with the NU Cornerstone of Engineering course policy and Project 2 policy requiring disclosure of generative AI use.

> Claude Code. Anthropic, 2026. [Online]. Available: https://claude.ai/claude-code

> Cursor. Anysphere, Inc., 2026. [Online]. Available: https://www.cursor.com

---

## Open Source Libraries & Frameworks

### Microcontroller (MicroPython / Raspberry Pi Pico)

| Library | Author | Purpose | Source |
|---------|--------|---------|--------|
| MicroPython | Damien George et al. | Python runtime for RP2040 microcontroller | https://micropython.org |
| micropython-mfrc522 | Stefan Wendler | MFRC522 RFID reader driver for MicroPython | https://github.com/wendlers/micropython-mfrc522 |

### Python Backend

| Library | Purpose | Source |
|---------|---------|--------|
| FastAPI | Web framework — REST API + WebSocket server | https://fastapi.tiangolo.com |
| Uvicorn | ASGI server (runs FastAPI) | https://www.uvicorn.org |
| pyserial | USB serial communication with both Picos | https://pyserial.readthedocs.io |
| PyQt5 | Legacy desktop display app (superseded by web UI) | https://www.riverbankcomputing.com/software/pyqt |

### Frontend (React / TypeScript)

| Library | Purpose | Source |
|---------|---------|--------|
| React 18 | UI component framework | https://react.dev |
| TypeScript 5 | Static typing for JavaScript | https://www.typescriptlang.org |
| Vite 5 | Build tool and dev server | https://vitejs.dev |

### Fonts

| Font | Author | License | Source |
|------|--------|---------|--------|
| Nunito | Vernon Adams | SIL Open Font License | https://fonts.google.com/specimen/Nunito |
| IBM Plex Sans | IBM | SIL Open Font License | https://fonts.google.com/specimen/IBM+Plex+Sans |

---

## Hardware

- **Raspberry Pi Pico** — RP2040 microcontroller board. Raspberry Pi Ltd. https://www.raspberrypi.com/products/raspberry-pi-pico/
- **MFRC522** — 13.56 MHz RFID reader/writer module. NXP Semiconductors.
- **NeoPixel LED Strip** — WS2812B addressable RGB LEDs. Adafruit Industries. https://www.adafruit.com/category/168
- **Push Buttons** — generic push buttons (2x), one obtained from FYELIC, the other from (Amazon)[https://www.amazon.com/Easyget-Shaped-Illuminated-Self-resetting-Projects/dp/B00XRC9URW]

fix