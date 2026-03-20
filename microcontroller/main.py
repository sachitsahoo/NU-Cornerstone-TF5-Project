from mfrc522 import MFRC522
import utime
import neopixel

reader = MFRC522(spi_id=0,sck=2,miso=4,mosi=3,cs=1,rst=0)
n = 58 #Number of LED pixels on strip
p = 15 #Pin that the LED is connected to on the Pi Pico

np = neopixel.NeoPixel(machine.Pin(p), n)

'''
IMPORTANT - MATCH THESE TO YOUR WIRING:
- sck=2   means the clock pin (SCK) is connected to GP2 on your Pico
- miso=4  means MISO is connected to GP4
- mosi=3  means MOSI is connected to GP3
- cs=1    means CS (chip select/SDA) is connected to GP1
- rst=0   means RST (reset) is connected to GP0

If your wiring is different, change the numbers above to match YOUR setup!
Example: If you connected RST to GP5 instead, change rst=0 to rst=5
'''

print("Bring TAG closer...")
print("")


while True:
    reader.init()                                             # Wake up the RFID reader and prepare it to scan
    (stat, tag_type) = reader.request(reader.REQIDL)          # Ask "Is there an RFID tag nearby?"
    if stat == reader.OK:                                     # If a tag was detected...
        (stat, uid) = reader.SelectTagSN()                    # Read the tag's unique ID number (UID)
        if stat == reader.OK:                                 # If we successfully read the ID...     
            card = int.from_bytes(bytes(uid),"little",False)  # Convert the ID from a list of bytes into one big number
            print("TAG: "+str(card))                      # Display the card ID number in the console
                
        else:
            print("REMOVED")
    else:
        print("REMOVED")
    
    for i in range(n):
        np[i] = (255, 0, 0)

# TO DO SOMETHING DIFFERENT: Replace the print() above with your own code!
            # Examples:
            # - Turn on an LED: led.value(1)
            # - Play a sound
            # - Count how many times this card has been scanned
            # - Check if this card number matches a specific allowed card

utime.sleep_ms(500) #take a .5 second delay
