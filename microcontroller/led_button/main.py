import utime
import neopixel
import machine
import sys
import select
import random

# ─── LED SETUP ───
n = 24
p = 28
np = neopixel.NeoPixel(machine.Pin(p), n)
GROUP_SIZE = 4
NUM_GROUPS = n // GROUP_SIZE  # 6
IDLE_COLOR = (138, 0, 196)

# ─── BUTTON SETUP ───
buttonPin = 15
button = machine.Pin(buttonPin, machine.Pin.IN, machine.Pin.PULL_UP)
button_last = 1
button2Pin = 16
button2 = machine.Pin(button2Pin, machine.Pin.IN, machine.Pin.PULL_UP)
button2_last = 1
DEBOUNCE_MS = 50
button_debounce  = utime.ticks_ms()
button2_debounce = utime.ticks_ms()

# ─── STATE ───
base_r, base_g, base_b = IDLE_COLOR
flicker_enabled = True

# Each group has independent flicker state:
#   active    – currently dimmed?
#   end_ms    – when to restore it
#   factor    – how dim (0.0–1.0)
group_state = [{"active": False, "end_ms": 0, "factor": 1.0} for _ in range(NUM_GROUPS)]

# When to next consider triggering a new flicker event
next_flicker_ms = utime.ticks_ms() + random.randint(300, 900)

def write_groups():
    for g in range(NUM_GROUPS):
        f = group_state[g]["factor"]
        r = min(255, int(base_r * f))
        gv = min(255, int(base_g * f))
        b = min(255, int(base_b * f))
        for i in range(GROUP_SIZE):
            np[g * GROUP_SIZE + i] = (r, gv, b)
    np.write()

def set_static():
    for i in range(n):
        np[i] = (base_r, base_g, base_b)
    np.write()

def reset_group_state():
    for g in range(NUM_GROUPS):
        group_state[g]["active"] = False
        group_state[g]["factor"] = 1.0

# ─── BOOT ───
write_groups()

while True:
    now = utime.ticks_ms()

    # ─── 1. SERIAL INPUT ───
    if sys.stdin in select.select([sys.stdin], [], [], 0)[0]:
        line = sys.stdin.readline().strip()
        try:
            base_r, base_g, base_b = map(int, line.split(","))
            flicker_enabled = (base_r, base_g, base_b) == IDLE_COLOR
            reset_group_state()
            if flicker_enabled:
                write_groups()
            else:
                set_static()
            print(f"LED SET: {base_r},{base_g},{base_b}")
        except Exception:
            print("Invalid input:", line)

    # ─── 2. FLICKER TICK ───
    if flicker_enabled:
        dirty = False

        # Restore any groups whose flicker duration has elapsed
        for g in range(NUM_GROUPS):
            s = group_state[g]
            if s["active"] and utime.ticks_diff(now, s["end_ms"]) >= 0:
                s["active"] = False
                s["factor"] = 1.0
                dirty = True

        # Time to trigger a new flicker event?
        if utime.ticks_diff(now, next_flicker_ms) >= 0:
            # Pick 1 or 2 groups to flicker (never the same group twice)
            count = random.randint(1, 2)
            pool = list(range(NUM_GROUPS))
            for i in range(len(pool) - 1, 0, -1):
                j = random.randint(0, i)
                pool[i], pool[j] = pool[j], pool[i]
            targets = pool[:count]
            for g in targets:
                s = group_state[g]
                # Dim level: noticeable but not dead
                s["factor"] = random.randint(30, 70) / 100.0
                # Duration: 80–280 ms — long enough to read as intentional
                duration = random.randint(80, 280)
                s["end_ms"] = utime.ticks_add(now, duration)
                s["active"] = True
            dirty = True
            # Schedule next event: 400–1200 ms from now (feels random, not rhythmic)
            next_flicker_ms = utime.ticks_add(now, random.randint(400, 1200))

        if dirty:
            write_groups()

    # ─── 3. BUTTON 1 ───
    button_now = button.value()
    if button_now != button_last:
        if utime.ticks_diff(now, button_debounce) >= DEBOUNCE_MS:
            button_debounce = now
            button_last = button_now
            if button_now == 0:
                print("BUTTON_DOWN")
            else:
                print("BUTTON_UP")

    # ─── 4. BUTTON 2 ───
    button2_now = button2.value()
    if button2_now != button2_last:
        if utime.ticks_diff(now, button2_debounce) >= DEBOUNCE_MS:
            button2_debounce = now
            button2_last = button2_now
            if button2_now == 0:
                print("BUTTON2_DOWN")
            else:
                print("BUTTON2_UP")

    utime.sleep_ms(10)
