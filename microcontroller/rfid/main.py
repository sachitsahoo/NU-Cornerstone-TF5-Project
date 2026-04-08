from mfrc522 import MFRC522
import utime
import machine
import neopixel
import _thread

# ─── LED SETUP ───
n = 11
p = 15
np = neopixel.NeoPixel(machine.Pin(p), n)

def clear():
    for i in range(n):
        np[i] = (0, 0, 0)

def set_pixel(pos, r, g, b):
    clear()
    for i in range(-1, 2):
        idx = pos + i
        if 0 <= idx < n:
            np[idx] = (r, g, b)
    np.write()

# ─── RFID THREAD (Core 1) ───
def rfid_thread():
    reader = MFRC522(spi_id=0, sck=2, miso=4, mosi=3, cs=1, rst=18)
    reader.init()
    reader.antenna_gain = 0x04
    while True:
        (stat, tag_type) = reader.request(reader.REQIDL)
        if stat == reader.OK:
            (stat, uid) = reader.SelectTagSN()
            if stat == reader.OK:
                card = int.from_bytes(bytes(uid), "little", False)
                print("TAG: " + str(card))
        utime.sleep_ms(50)  # small yield to avoid watchdog issues

_thread.start_new_thread(rfid_thread, ())

# ─── LED BOUNCE (Core 0) ───
pos = 0
direction = 1
while True:
    set_pixel(pos, 138, 0, 196)
    pos += direction
    if pos >= n - 1:
        pos = n - 1
        direction = -1
    elif pos <= 0:
        pos = 0
        direction = 1
    utime.sleep_ms(50)
