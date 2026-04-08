import utime
import neopixel
import machine
import sys
import select

n = 24
p = 28
np = neopixel.NeoPixel(machine.Pin(p), n)
buttonPin = 15
button = machine.Pin(buttonPin, machine.Pin.IN, machine.Pin.PULL_UP)
button_last = 1

button2Pin = 16
button2 = machine.Pin(button2Pin, machine.Pin.IN, machine.Pin.PULL_UP)
button2_last = 1

DEBOUNCE_MS = 50
button_debounce  = utime.ticks_ms()
button2_debounce = utime.ticks_ms()

def set_color(r, g, b):
    for i in range(n):
        np[i] = (r, g, b)
    np.write()

try:
    set_color(255, 180, 100)
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

    # ─── 2. BUTTON (press + release) ───
    button_now = button.value()
    now = utime.ticks_ms()
    if button_now == 0 and button_last == 1:
        if utime.ticks_diff(now, button_debounce) >= DEBOUNCE_MS:
            print("BUTTON_DOWN")
            button_debounce = now
    if button_now == 1 and button_last == 0:
        if utime.ticks_diff(now, button_debounce) >= DEBOUNCE_MS:
            print("BUTTON_UP")
            button_debounce = now
    button_last = button_now

    # ─── 3. BUTTON 2 (cycle/switch) ───
    button2_now = button2.value()
    if button2_now == 0 and button2_last == 1:
        if utime.ticks_diff(now, button2_debounce) >= DEBOUNCE_MS:
            print("BUTTON2_DOWN")
            button2_debounce = now
    if button2_now == 1 and button2_last == 0:
        if utime.ticks_diff(now, button2_debounce) >= DEBOUNCE_MS:
            print("BUTTON2_UP")
            button2_debounce = now
    button2_last = button2_now

    utime.sleep_ms(10)
