#!/usr/bin/env python3
"""Emit characters.json with 6 alibis per character (3 innocent + 3 guilty), uniform length."""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "characters.json"
WEB_SRC_DATA = ROOT / "web" / "src" / "data" / "characters.json"

# Simple words. Base JSON is the Charles River / factory-oil case; the web app adds Boston Common,
# South End, and Newbury Street cases via web/src/caseCluesByCase.ts and web/src/caseExplanations.ts.


def C(*lines):
    return " ".join(lines).strip()


CHARS = [
    {
        "uid": "bacon_hair",
        "tag_ids": ["3594085623"],
        "name": "Bacon Hair",
        "role": "Factory Mechanic",
        "description": C(
            "He moves oil and chemicals for the factory by the river.",
            "He is allowed to roll the big oil drums.",
        ),
        "innocent_explanation": C(
            "The oil in the river is from factory drums.",
            "He was not the one rolling drums in the video.",
        ),
        "culprit_explanation": C(
            "He poured oil from the drums into the storm drain.",
            "It was the same machine oil he uses at work.",
        ),
        "image": "assets/images/Bacon_Hair_Shoulder_Up-removebg-preview.png",
        "sound_theme": "assets/sounds/bh_theme.wav",
        "led_color": [20, 120, 255],
        "inn": [
            C(
                "Video shows a taller person than him moving drums.",
                "His shift ended before the drums moved.",
            ),
            C(
                "His badge was at the dock when the oil hit the river.",
                "The camera was pointed the wrong way.",
            ),
            C(
                "His gloves do not match oil on the drum handles.",
                "He was fixing a machine inside the plant.",
            ),
        ],
        "guilt": [
            C(
                "Two drums were marked recycled but the truck never took them.",
                "Scrape marks at the drain match his cart.",
            ),
            C(
                "He complained about drum fees at work that day.",
                "The oil in the water matches his work lot number.",
            ),
            C(
                "Heat video shows his gloves right after the drums moved.",
                "Only his crew has those gloves.",
            ),
        ],
    },
    {
        "uid": "ballerina_cappuccina",
        "tag_ids": ["390485036"],
        "name": "Ballerina Cappuccina",
        "role": "Café Owner",
        "description": C(
            "She runs a small café on the river walk.",
            "She uses soap and spray bottles for dishes and floors.",
        ),
        "innocent_explanation": C(
            "The river oil is thick factory oil.",
            "Her café only uses dish soap and food-safe cleaners.",
        ),
        "culprit_explanation": C(
            "She poured old degreaser and cleaner behind the café.",
            "Rain washed that greasy mix into the river.",
        ),
        "image": "assets/images/Ballerina_cappuccina_shoulder_up-removebg-preview.png",
        "sound_theme": "assets/sounds/bc_theme.wav",
        "led_color": [255, 80, 180],
        "inn": [
            C(
                "Her car left the lot before the drums moved.",
                "Night trash was only cups and food waste.",
            ),
            C(
                "She was home when the factory cameras showed drums rolling.",
            ),
            C(
                "Inspectors only allow food cleaners at her shop.",
                "None of those match the thick oil in the river.",
            ),
        ],
        "guilt": [
            C(
                "Staff saw jugs behind the café after closing.",
                "The labels match degreaser in the gutter.",
            ),
            C(
                "Empty jugs with her logo were near the drain.",
            ),
            C(
                "Pour times match rainy nights.",
                "Her phone stayed behind the shop those nights.",
            ),
        ],
    },
    {
        "uid": "tung",
        "tag_ids": ["3593868791"],
        "name": "Tung Tung Tung Sahur",
        "role": "Night Shift Supervisor",
        "description": C(
            "He runs the night shift at the factory by the river.",
            "He signs papers when oil trucks leave the plant.",
        ),
        "innocent_explanation": C(
            "The person in the video wears maintenance orange.",
            "He wears a yellow supervisor vest on camera that night.",
        ),
        "culprit_explanation": C(
            "He signed fake truck forms so oil left the plant illegally.",
            "That oil went into the river instead of the recycler.",
        ),
        "image": "assets/images/TTTSahur_Shoulder_Up-removebg-preview.png",
        "sound_theme": "assets/sounds/sahur_theme.wav",
        "led_color": [255, 80, 20],
        "inn": [
            C(
                "His van was empty when he stopped by the drain.",
                "Logs show no drums on board.",
            ),
            C(
                "Plant cameras put him on the repair floor during the drum video.",
            ),
            C(
                "His card never opened the drum cage that night.",
            ),
        ],
        "guilt": [
            C(
                "He borrowed an orange jacket from the locker room.",
                "Fibers on the grate match that jacket.",
            ),
            C(
                "He closed a repair ticket early.",
                "His phone was by the drain at the same time.",
            ),
            C(
                "Truck forms he signed do not match real pickups.",
                "The recycler never got those fees.",
            ),
        ],
    },
    {
        "uid": "roblox_noob",
        "tag_ids": ["3594000001"],
        "name": "Roblox Noob",
        "role": "Museum Guide",
        "description": C(
            "He hands out maps at the museum on the river.",
            "He does not work inside the oil plant.",
        ),
        "innocent_explanation": C(
            "The oil in the river came from factory drums.",
            "He has no keys to the drum area.",
        ),
        "culprit_explanation": C(
            "He borrowed a maintenance badge and rolled drums to the drain.",
            "He wanted to skip paying the oil disposal fee.",
        ),
        "image": "",
        "led_color": [255, 255, 0],
        "inn": [
            C(
                "He led a kids scavenger hunt before the drums moved.",
            ),
            C(
                "His badge only opens public doors at the museum.",
                "He never scanned into the plant after seven p.m.",
            ),
            C(
                "He signed out at the front desk hours before the video.",
            ),
        ],
        "guilt": [
            C(
                "His volunteer vest was found crumpled by the drain.",
            ),
            C(
                "He asked how to open the service gate.",
            ),
            C(
                "Drum labels were in his backpack.",
                "Oil smears matched the river.",
            ),
        ],
    },
    {
        "uid": "roblox_guest",
        "tag_ids": ["3594000002"],
        "name": "Roblox Guest",
        "role": "Sales Representative",
        "description": C(
            "He visits on a paper guest pass for one day.",
            "He takes photos on the river path.",
        ),
        "innocent_explanation": C(
            "The oil came from factory drums at night.",
            "He had already left downtown on a rideshare.",
        ),
        "culprit_explanation": C(
            "He came back in work clothes and moved oil drums.",
            "He used his guest pass as a cover story.",
        ),
        "image": "",
        "led_color": [0, 0, 139],
        "inn": [
            C(
                "Lobby logs show his pass out before the drums moved.",
            ),
            C(
                "River cameras never show him at the drain that night.",
            ),
            C(
                "His phone stayed across town until morning.",
            ),
        ],
        "guilt": [
            C(
                "His guest pass shows in a clip near the drums.",
            ),
            C(
                "He walked in through a side door left open.",
            ),
            C(
                "He messaged a friend asking where barrels go.",
            ),
        ],
    },
    {
        "uid": "baconette_hair",
        "tag_ids": ["3594000003"],
        "name": "Baconette Hair",
        "role": "Street Food Vendor",
        "description": C(
            "She sells candy and drinks from a cart on the river path.",
            "Her cart is for food only.",
        ),
        "innocent_explanation": C(
            "The river shows thick factory machine oil.",
            "Her cart only holds snacks and drinks.",
        ),
        "culprit_explanation": C(
            "She hid small oil bottles under the cart liner.",
            "She poured them into the drain when restocking late.",
        ),
        "image": "assets/images/baconetteHairHeadshot-removebg-preview.png",
        "led_color": [255, 105, 180],
        "inn": [
            C(
                "She packed the cart away before the drums moved.",
            ),
            C(
                "Health rules list only food on her cart.",
            ),
            C(
                "Her wristband does not open the plant gate.",
            ),
        ],
        "guilt": [
            C(
                "Hidden jugs under the liner tested positive for the same oil.",
            ),
            C(
                "A witness saw the cart at the grate after hours.",
            ),
            C(
                "Glue on her gloves matched sealant from drum caps.",
            ),
        ],
    },
    {
        "uid": "peeley",
        "tag_ids": ["3594000004"],
        "name": "Peeley",
        "role": "Office Assistant",
        "description": C(
            "He wears a banana costume for kids at the museum.",
            "The suit is big and puffy.",
        ),
        "innocent_explanation": C(
            "The video shows a thin person in work clothes.",
            "A banana suit is too bulky to move drums.",
        ),
        "culprit_explanation": C(
            "He took off the suit and put on stolen work clothes.",
            "Then he rolled oil drums to the drain.",
        ),
        "image": "",
        "led_color": [255, 255, 0],
        "inn": [
            C(
                "He was still in the suit during drum movement time.",
            ),
            C(
                "The drain door was locked until staff left.",
            ),
            C(
                "Coworkers saw him in the dressing room.",
            ),
        ],
        "guilt": [
            C(
                "Video shows him removing the suit and wearing orange coveralls.",
            ),
            C(
                "Costume fluff was found on a drum at the grate.",
            ),
            C(
                "He posted online from the alley behind the museum.",
            ),
        ],
    },
    {
        "uid": "agent_67",
        "tag_ids": ["3594000005"],
        "name": "67",
        "role": "Freelance Videographer",
        "description": C(
            "He shoots video of the river for the city cleanup team.",
            "He uses a camera on a tripod with oily grease on the legs.",
        ),
        "innocent_explanation": C(
            "The oil in the river came straight from factory drums.",
            "He was filming upriver when those drums moved.",
        ),
        "culprit_explanation": C(
            "He poured extra machine oil from his tripod can into the drain.",
            "It was the same type of oil used at the factory.",
        ),
        "image": "",
        "led_color": [173, 216, 230],
        "inn": [
            C(
                "His camera was pointed upriver during the drum video.",
            ),
            C(
                "His memory card has no long break to reach the plant.",
            ),
            C(
                "Plant security never scanned his badge at the drums.",
            ),
        ],
        "guilt": [
            C(
                "Oily rags from his gear bag match the river oil.",
            ),
            C(
                "His tripod stood in the mud right at the grate.",
            ),
            C(
                "He threw away a bottle of oil behind his camera case.",
                "The bottle matched factory oil.",
            ),
        ],
    },
    {
        "uid": "roblox_builder",
        "tag_ids": ["3594000006"],
        "name": "Roblox Builder",
        "role": "Youth Program Instructor",
        "description": C(
            "He helps kids build projects at the museum by the river.",
            "The table uses small tubes of machine oil for gear demos.",
        ),
        "innocent_explanation": C(
            "The spill is from huge plant drums.",
            "He stayed in the kids’ room all night on camera.",
        ),
        "culprit_explanation": C(
            "He poured leftover demo oil down the drain after closing.",
            "That oil is the same kind the factory uses.",
        ),
        "image": "",
        "led_color": [255, 140, 0],
        "inn": [
            C(
                "He locked the tool room and stayed in the workshop on video.",
            ),
            C(
                "His key card never opens the waste hall.",
            ),
            C(
                "Parents watched him on a live stream during the drum video.",
            ),
        ],
        "guilt": [
            C(
                "Demo oil from his table matches the river slick.",
            ),
            C(
                "He opened a tunnel door that leads near the grate.",
            ),
            C(
                "Empty oil tubes with his name were in his locker.",
            ),
        ],
    },
    {
        "uid": "elsa",
        "tag_ids": ["3594000007"],
        "name": "Elsa",
        "role": "Plaza Performer",
        "description": C(
            "She performs in the winter light show on the plaza.",
            "The show uses fog machines and lights.",
        ),
        "innocent_explanation": C(
            "The main spill is thick factory machine oil.",
            "She was on stage when the drums rolled at the plant.",
        ),
        "culprit_explanation": C(
            "She poured leftover fog fluid into the storm drain.",
            "It mixed with oil already in the pipe from the factory.",
        ),
        "image": "",
        "led_color": [180, 220, 255],
        "inn": [
            C(
                "She was in full costume until late rehearsal.",
            ),
            C(
                "Stage logs show her mic on when drums moved at the plant.",
            ),
            C(
                "Her prop boxes list only lights and glitter.",
            ),
        ],
        "guilt": [
            C(
                "A fog hose tested positive for the same oil mix.",
            ),
            C(
                "She asked where to dump liquid fast behind the stage.",
            ),
            C(
                "Glitter on a drum matched her costume.",
            ),
        ],
    },
    {
        "uid": "steve",
        "tag_ids": ["3594000008"],
        "name": "Steve",
        "role": "Office Worker",
        "description": C(
            "He greets festival crowds in a block-head costume on the downtown waterfront.",
            "He is not allowed inside the oil plant.",
        ),
        "innocent_explanation": C(
            "The video shows a worker in coveralls.",
            "The mascot suit is too wide to fit in the drum room.",
        ),
        "culprit_explanation": C(
            "He took off the suit and wore stolen coveralls.",
            "He helped roll oil drums so no one saw the mascot.",
        ),
        "image": "",
        "led_color": [80, 160, 80],
        "inn": [
            C(
                "Fans took photos with him far from the plant that night.",
            ),
            C(
                "The suit head cannot fit through the drum door.",
            ),
            C(
                "His event badge only opens the convention hall.",
            ),
        ],
        "guilt": [
            C(
                "Oil from the drums smeared his foam gloves.",
            ),
            C(
                "He texted a friend about moving heavy props at midnight.",
            ),
            C(
                "Work clothes in his locker had his wristband stuck in the zipper.",
            ),
        ],
    },
]


def main():
    out_chars = []
    for d in CHARS:
        inn = d["inn"]
        guilt = d["guilt"]
        assert len(inn) == len(guilt) == 3
        row = {
            "uid": d["uid"],
            "tag_ids": d["tag_ids"],
            "name": d["name"],
            "role": d["role"],
            "description": d["description"],
            "alibis_innocent": inn,
            "alibis_guilty": guilt,
            "suspicious_detail": inn[0],
            "innocent_explanation": d["innocent_explanation"],
            "culprit_explanation": d["culprit_explanation"],
            "image": d["image"],
            "led_color": d["led_color"],
        }
        if d.get("sound_theme"):
            row["sound_theme"] = d["sound_theme"]
        out_chars.append(row)

    data = {"round_culprits": [], "characters": out_chars}
    text = json.dumps(data, indent=2, ensure_ascii=False) + "\n"
    OUT.write_text(text, encoding="utf-8")
    WEB_SRC_DATA.parent.mkdir(parents=True, exist_ok=True)
    WEB_SRC_DATA.write_text(text, encoding="utf-8")
    print(f"Wrote {OUT} and {WEB_SRC_DATA} ({len(out_chars)} characters)")
    es_script = ROOT / "scripts" / "emit_character_es_json.py"
    subprocess.run([sys.executable, str(es_script)], check=True)


if __name__ == "__main__":
    main()
