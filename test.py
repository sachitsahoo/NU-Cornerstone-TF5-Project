"""
Minimal serial test — no PyQt, no pygame, nothing extra.
Just reads from the Pico and prints every line it receives.

Run:
    python serial_test.py /dev/tty.usbmodem1101
    python serial_test.py COM3
"""

import sys
import serial
PORT = sys.argv[1] if len(sys.argv) > 1 else "/dev/cu.usbmodem1101"
BAUD = 115200

print(f"Opening {PORT} at {BAUD} baud...")

try:
    ser = serial.Serial(PORT, BAUD, timeout=1)
    print("Connected. Scan a tag now. Press Ctrl+C to quit.\n")
except serial.SerialException as e:
    print(f"FAILED: {e}")
    sys.exit(1)

buffer = ""
while True:
    try:
        data = ser.read(64).decode(errors="ignore")
        if data:
            buffer += data
            while "\n" in buffer:
                line, buffer = buffer.split("\n", 1)
                line = line.strip()
                if line:
                    if "390485036" in line:
                        print("Steve")
                    elif "3593868791" in line:
                        print("Tung Tung Tung Sahur")
                    else:
                        print("None")

    except KeyboardInterrupt:
        print("\nDone.")
        ser.close()
        break
    except Exception as e:
        print("ERROR:", e)
        break