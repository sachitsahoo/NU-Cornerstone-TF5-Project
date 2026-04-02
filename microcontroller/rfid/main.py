from mfrc522 import MFRC522
import utime
import machine
import neopixel

reader = MFRC522(spi_id=0, sck=2, miso=4, mosi=3, cs=1, rst=18)
reader.init()

n = 11
p = 15
np = neopixel.NeoPixel(machine.Pin(p), n)

def set_color(r, g, b):
    for i in range(n):
        np[i] = (r, g, b)
    np.write()

set_color(138, 0, 196)
while True:
    # ─── RFID READING ───
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


    utime.sleep_ms(10)
