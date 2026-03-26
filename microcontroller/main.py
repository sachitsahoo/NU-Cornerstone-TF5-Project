from mfrc522 import MFRC522
import utime
import neopixel
import machine
import sys
import select

reader = MFRC522(spi_id=0, sck=2, miso=4, mosi=3, cs=1, rst=0)

n = 8
p = 28
np = neopixel.NeoPixel(machine.Pin(p), n)
buttonPin = 14
button = machine.Pin(buttonPin, machine.Pin.IN, machine.Pin.PULL_UP)
button_last = 1

def set_color(r, g, b):
    for i in range(n):
        np[i] = (r, g, b)
    np.write()

try:
    set_color(255, 200, 25)
except:
    print("Error setting color on init")

while True:
    # ─── 1. CHECK FOR SERIAL INPUT (FROM PC) ───
    if sys.stdin in select.select([sys.stdin], [], [], 0)[0]:
        line = sys.stdin.readline().strip()
        try:
            r, g, b = map(int, line.split(","))
            set_color(r, g, b)
            print(f"LED SET: {r},{g},{b}")
        except:
            print("Invalid input:", line)

    # ─── 2. RFID READING ───
    reader.init()
    (stat, tag_type) = reader.request(reader.REQIDL)

    if stat == reader.OK:
        (stat, uid) = reader.SelectTagSN()
        if stat == reader.OK:
            card = int.from_bytes(bytes(uid), "little", False)
            print("TAG: " + str(card))
        else:
            print("REMOVED")
    else:
        print("REMOVED")

    # ─── 3. BUTTON (rising-edge only) ───
    button_now = button.value()
    if button_now == 0 and button_last == 1:
        print("BUTTON")
    button_last = button_now

    utime.sleep_ms(200)
