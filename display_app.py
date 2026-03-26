"""
Murder Mystery RFID Experience — PyQt5 Display App
===================================================
Serial reading uses the dead-simple approach: read raw bytes,
check if the line contains a known tag ID string, map to character.
No RFID library needed — just pyserial.

Requires:
  pip install PyQt5 pyserial pygame

Run:
  python display_app.py                        (auto-detect Pico)
  python display_app.py --port /dev/tty.usbmodem1101
  python display_app.py --port COM3
  python display_app.py --fullscreen

Folder structure expected:
  display_app.py
  characters.json
  assets/
    images/    (character portrait PNGs, filenames match characters.json)
    sounds/    (WAV files)
"""

import sys
import os
import json
import argparse
import threading
import signal
import serial
import serial.tools.list_ports

from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QStackedWidget, QWidget,
    QLabel, QVBoxLayout, QHBoxLayout, QFrame,
    QSizePolicy, QPushButton
)
from PyQt5.QtCore import Qt, QTimer, pyqtSignal, QObject
from PyQt5.QtGui import QPixmap, QFont

# ─── Sound ────────────────────────────────────────────────────────────────────
try:
    import pygame
    pygame.mixer.init()
    SOUND_AVAILABLE = True
except ImportError:
    SOUND_AVAILABLE = False
    print("⚠  pygame not found — sounds disabled.  pip install pygame")

# ─── Configuration ────────────────────────────────────────────────────────────
CHARACTERS_FILE = "characters.json"
SERIAL_BAUD     = 115200

# UI colours
BG_COLOR        = "#0a0a0f"
ACCENT_COLOR    = "#c8a96e"
TEXT_COLOR      = "#e8e0d0"
DIM_TEXT_COLOR  = "#8a8070"
CARD_COLOR      = "#12121a"

TITLE_FONT_SIZE   = 48
HEADING_FONT_SIZE = 32
BODY_FONT_SIZE    = 16
SMALL_FONT_SIZE   = 13

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  🚧 DEV / TESTING MODE — set DEV_MODE = False before final deployment       ║
# ╚══════════════════════════════════════════════════════════════════════════════╝
DEV_MODE = True   # ← FLIP TO False WHEN DONE


# ─── Serial Signal Bridge ─────────────────────────────────────────────────────
class SerialSignals(QObject):
    tag_detected   = pyqtSignal(str)   # emits the character UID string
    tag_removed    = pyqtSignal()
    button_pressed = pyqtSignal()
    status_update  = pyqtSignal(bool, str)   # (connected, message)


# ─── Serial Worker ────────────────────────────────────────────────────────────
class SerialWorker(threading.Thread):
    """
    Background thread.  Reads raw bytes from the Pico exactly like the
    minimal serial_test.py that already works — no framing protocol, no
    RFID library.  Just check whether the raw line contains a known tag-ID
    substring and emit the matching character UID.

    Tag map is built from characters.json:
        [{ "uid": "steve", "tag_ids": ["390485036"], ... }, ...]

    'tag_ids' is a list of raw numeric strings that might appear anywhere
    in the Pico's output line for that character.  The first match wins.
    """

    def __init__(self, port: str, tag_map: dict, signals: SerialSignals):
        """
        tag_map  –  { "390485036": "steve_uid", ... }
                    raw_tag_string → character uid
        """
        super().__init__(daemon=True)
        self.port     = port
        self.tag_map  = tag_map   # raw_id_substring → char uid
        self.signals  = signals
        self._running = True
        self._ser     = None
        self._last_uid: str | None = None   # track present/absent

    def stop(self):
        self._running = False

    def run(self):
        if self.port == "DUMMY":
            self.signals.status_update.emit(False, "No serial port — UI-only mode")
            return

        try:
            self._ser = serial.Serial(self.port, SERIAL_BAUD, timeout=1)
            self.signals.status_update.emit(True, f"Connected on {self.port}")
        except serial.SerialException as e:
            self.signals.status_update.emit(False, str(e))
            return

        buffer = ""
        while self._running:
            try:
                data = self._ser.read(64).decode(errors="ignore")
                if not data:
                    continue
                buffer += data
                while "\n" in buffer:
                    line, buffer = buffer.split("\n", 1)
                    line = line.strip()
                    if not line:
                        continue

                    # ── Check for known tag IDs (same logic as serial_test.py) ──
                    matched_uid = None
                    for raw_id, char_uid in self.tag_map.items():
                        if raw_id in line:
                            matched_uid = char_uid
                            break

                    if matched_uid:
                        if matched_uid != self._last_uid:
                            self._last_uid = matched_uid
                            self.signals.tag_detected.emit(matched_uid)
                    else:
                        # Any unrecognised line → treat as removal
                        # (Pico sends something when tag leaves field)
                        if self._last_uid is not None:
                            self._last_uid = None
                            self.signals.tag_removed.emit()

                    # Physical button line (Pico sends "BUTTON")
                    if line == "BUTTON":
                        self.signals.button_pressed.emit()

            except Exception as e:
                self.signals.status_update.emit(False, f"Serial error: {e}")
                break

    def send_output(self, message: str):
        if self._ser and self._ser.is_open:
            try:
                self._ser.write((message + "\n").encode())
            except Exception as e:
                print(f"⚠ Serial write error: {e}")


# ─── Auto-detect Pico ─────────────────────────────────────────────────────────
def auto_detect_pico_port() -> str | None:
    for p in serial.tools.list_ports.comports():
        desc = (p.description or "").lower()
        mfr  = (p.manufacturer or "").lower()
        if "pico" in desc or "raspberry" in mfr or "MicroPython" in (p.product or ""):
            return p.device
        if p.vid == 0x2E8A:   # RP2040 USB VID
            return p.device
    return None


# ─── Sound Helper ─────────────────────────────────────────────────────────────
def play_sound(path: str):
    if not SOUND_AVAILABLE or not path or not os.path.exists(path):
        return
    try:
        pygame.mixer.stop()
        pygame.mixer.Sound(path).play()
    except Exception as e:
        print(f"⚠  Sound error '{path}': {e}")


# ─── Widget Helpers ───────────────────────────────────────────────────────────
def make_label(text: str, size: int, color: str = TEXT_COLOR,
               bold: bool = False, align=Qt.AlignLeft) -> QLabel:
    lbl = QLabel(text)
    lbl.setAlignment(align)
    lbl.setWordWrap(True)
    font = QFont()
    font.setPointSize(size)
    font.setBold(bold)
    lbl.setFont(font)
    lbl.setStyleSheet(f"color: {color}; background: transparent;")
    return lbl

def divider() -> QFrame:
    line = QFrame()
    line.setFrameShape(QFrame.HLine)
    line.setStyleSheet(f"color: {ACCENT_COLOR}; background: {ACCENT_COLOR};")
    line.setFixedHeight(1)
    return line


# ─── Screens ─────────────────────────────────────────────────────────────────

class TitleScreen(QWidget):
    def __init__(self):
        super().__init__()
        self.setStyleSheet(f"background-color: {BG_COLOR};")
        layout = QVBoxLayout(self)
        layout.setAlignment(Qt.AlignCenter)
        layout.setSpacing(24)
        layout.setContentsMargins(80, 60, 80, 60)

        title    = make_label("🔍 The Pollution Mystery", TITLE_FONT_SIZE,
                               ACCENT_COLOR, bold=True, align=Qt.AlignCenter)
        subtitle = make_label("A Murder Mystery Experience", HEADING_FONT_SIZE,
                               DIM_TEXT_COLOR, align=Qt.AlignCenter)

        instructions = make_label(
            "How to Play:\n\n"
            "1.  Place a character card on the scanner to reveal their profile.\n\n"
            "2.  Investigate all suspects — learn who they are and what they were up to.\n\n"
            "3.  Once you've reviewed every character, press the button to move to the accusation phase.\n\n"
            "4.  Place the character you believe caused the pollution on the scanner to make your accusation.\n\n"
            "Can you solve the mystery?",
            BODY_FONT_SIZE, TEXT_COLOR
        )
        instructions.setStyleSheet(
            f"color: {TEXT_COLOR}; background: {CARD_COLOR}; "
            f"border-radius: 12px; padding: 24px;"
        )

        hint = make_label("Place a character card on the platform to begin…",
                          SMALL_FONT_SIZE, DIM_TEXT_COLOR, align=Qt.AlignCenter)

        layout.addStretch()
        layout.addWidget(title)
        layout.addWidget(subtitle)
        layout.addWidget(divider())
        layout.addWidget(instructions)
        layout.addStretch()
        layout.addWidget(hint)


class CharacterScreen(QWidget):
    def __init__(self):
        super().__init__()
        self.setStyleSheet(f"background-color: {BG_COLOR};")

        outer = QHBoxLayout(self)
        outer.setContentsMargins(60, 40, 60, 40)
        outer.setSpacing(40)

        # Portrait
        self.portrait = QLabel()
        self.portrait.setFixedSize(320, 380)
        self.portrait.setAlignment(Qt.AlignCenter)
        self.portrait.setStyleSheet(
            f"background: {CARD_COLOR}; border-radius: 16px; border: 2px solid {ACCENT_COLOR};"
        )
        outer.addWidget(self.portrait, stretch=0)

        # Info panel
        right = QVBoxLayout()
        right.setSpacing(16)

        self.name_label    = make_label("", HEADING_FONT_SIZE, ACCENT_COLOR, bold=True)
        self.role_label    = make_label("", BODY_FONT_SIZE, DIM_TEXT_COLOR)
        self.desc_label    = make_label("", BODY_FONT_SIZE, TEXT_COLOR)
        self.desc_label.setStyleSheet(
            f"color: {TEXT_COLOR}; background: {CARD_COLOR}; border-radius: 10px; padding: 16px;"
        )

        suspect_hdr        = make_label("⚠  Suspicious Detail", SMALL_FONT_SIZE,
                                        ACCENT_COLOR, bold=True)
        self.suspect_label = make_label("", BODY_FONT_SIZE, TEXT_COLOR)
        self.suspect_label.setStyleSheet(
            f"color: {TEXT_COLOR}; background: #1a1010; "
            f"border-radius: 10px; border: 1px solid #602020; padding: 16px;"
        )

        self.seen_badge = make_label("✓  Profile Reviewed", SMALL_FONT_SIZE,
                                     "#40c060", bold=True, align=Qt.AlignCenter)
        self.seen_badge.setStyleSheet(
            "color: #40c060; background: #0a2010; border-radius: 8px; padding: 8px;"
        )
        self.seen_badge.hide()

        right.addWidget(self.name_label)
        right.addWidget(self.role_label)
        right.addWidget(divider())
        right.addWidget(self.desc_label)
        right.addWidget(suspect_hdr)
        right.addWidget(self.suspect_label)
        right.addStretch()
        right.addWidget(self.seen_badge)

        outer.addLayout(right, stretch=1)

    def load_character(self, char: dict, already_seen: bool):
        self.name_label.setText(char["name"])
        self.role_label.setText(char.get("role", ""))
        self.desc_label.setText(char.get("description", ""))
        self.suspect_label.setText(char.get("suspicious_detail", ""))

        img_path = char.get("image", "")
        if img_path and os.path.exists(img_path):
            pix = QPixmap(img_path).scaled(300, 360, Qt.KeepAspectRatio, Qt.SmoothTransformation)
            self.portrait.setPixmap(pix)
        else:
            self.portrait.setText("[ No Image ]")
            self.portrait.setStyleSheet(
                f"color: {DIM_TEXT_COLOR}; background: {CARD_COLOR}; "
                f"border-radius: 16px; border: 2px solid {ACCENT_COLOR};"
            )

        self.seen_badge.setVisible(already_seen)


class AccusationScreen(QWidget):
    def __init__(self, characters: list):
        super().__init__()
        self.setStyleSheet(f"background-color: {BG_COLOR};")

        layout = QVBoxLayout(self)
        layout.setAlignment(Qt.AlignCenter)
        layout.setSpacing(30)
        layout.setContentsMargins(80, 60, 80, 60)

        title = make_label("The Moment of Truth", TITLE_FONT_SIZE,
                            ACCENT_COLOR, bold=True, align=Qt.AlignCenter)
        subtitle = make_label(
            "You've examined every suspect.\n"
            "Now place the character you believe caused the pollution on the platform.",
            HEADING_FONT_SIZE, TEXT_COLOR, align=Qt.AlignCenter
        )

        chips_layout = QHBoxLayout()
        chips_layout.setAlignment(Qt.AlignCenter)
        for char in characters:
            chip = QLabel(char["name"])
            r, g, b = char.get("led_color", [200, 169, 110])
            color = f"#{r:02x}{g:02x}{b:02x}"
            chip.setStyleSheet(
                f"color: {color}; background: {CARD_COLOR}; "
                f"border: 1px solid {color}; border-radius: 8px; padding: 8px 16px;"
            )
            chip.setFont(QFont("", BODY_FONT_SIZE, QFont.Bold))
            chips_layout.addWidget(chip)

        hint = make_label("Waiting for your accusation…",
                          SMALL_FONT_SIZE, DIM_TEXT_COLOR, align=Qt.AlignCenter)

        layout.addStretch()
        layout.addWidget(title)
        layout.addWidget(subtitle)
        layout.addWidget(divider())
        layout.addLayout(chips_layout)
        layout.addStretch()
        layout.addWidget(hint)


class ResultScreen(QWidget):
    def __init__(self):
        super().__init__()
        self.setStyleSheet(f"background-color: {BG_COLOR};")

        layout = QVBoxLayout(self)
        layout.setAlignment(Qt.AlignCenter)
        layout.setSpacing(28)
        layout.setContentsMargins(80, 60, 80, 60)

        self.verdict_label     = make_label("", TITLE_FONT_SIZE, ACCENT_COLOR,
                                             bold=True, align=Qt.AlignCenter)
        self.character_label   = make_label("", HEADING_FONT_SIZE, TEXT_COLOR,
                                             align=Qt.AlignCenter)
        self.explanation_label = make_label("", BODY_FONT_SIZE, TEXT_COLOR,
                                             align=Qt.AlignCenter)
        self.explanation_label.setStyleSheet(
            f"color: {TEXT_COLOR}; background: {CARD_COLOR}; "
            f"border-radius: 12px; padding: 24px;"
        )

        layout.addStretch()
        layout.addWidget(self.verdict_label)
        layout.addWidget(self.character_label)
        layout.addWidget(divider())
        layout.addWidget(self.explanation_label)
        layout.addStretch()

    def show_result(self, correct: bool, accused_name: str,
                    correct_name: str, explanation: str):
        if correct:
            self.verdict_label.setText("🎉  Correct!")
            self.verdict_label.setStyleSheet(
                f"color: #40d060; background: transparent; "
                f"font-size: {TITLE_FONT_SIZE}pt; font-weight: bold;"
            )
            self.character_label.setText(f"{accused_name} was the culprit all along!")
        else:
            self.verdict_label.setText("✗  Wrong Accusation")
            self.verdict_label.setStyleSheet(
                f"color: #d04040; background: transparent; "
                f"font-size: {TITLE_FONT_SIZE}pt; font-weight: bold;"
            )
            self.character_label.setText(
                f"It wasn't {accused_name}… The real culprit was {correct_name}."
            )
        self.explanation_label.setText(explanation)


# ─── Main Window ──────────────────────────────────────────────────────────────

class MysteryApp(QMainWindow):

    STAGE_EXPLORE = "explore"
    STAGE_ACCUSE  = "accuse"
    STAGE_RESULT  = "result"

    def __init__(self, serial_port: str):
        super().__init__()
        self.setWindowTitle("The Pollution Mystery")
        self.setMinimumSize(1024, 640)
        if "--fullscreen" in sys.argv:
            self.showFullScreen()
        else:
            self.resize(1200, 800)
        self._apply_global_style()

        # ── Load character data ────────────────────────────────────────────
        with open(CHARACTERS_FILE, "r") as f:
            data = json.load(f)
        self.characters: list         = data["characters"]
        self.correct_uid: str         = data["correct_culprit_id"]
        self.culprit_explanation: str = data["culprit_explanation"]
        self.char_by_uid              = {c["uid"]: c for c in self.characters}

        # Build raw-tag → uid lookup for the serial worker
        tag_map: dict[str, str] = {}
        for char in self.characters:
            for raw_id in char.get("tag_ids", []):
                tag_map[raw_id] = char["uid"]

        # ── App state ─────────────────────────────────────────────────────
        self.stage         = self.STAGE_EXPLORE
        self.seen_uids     = set()
        self.current_uid   = None
        self.displayed_uid = None   # ← tracks what's actually on screen
        self.all_seen      = False

        # ── Removal debounce ──────────────────────────────────────────────
        self._removal_timer = QTimer(self)
        self._removal_timer.setSingleShot(True)
        self._removal_timer.setInterval(600)   # ms — adjust to taste
        self._removal_timer.timeout.connect(self._do_tag_removed)

        # ── Serial ────────────────────────────────────────────────────────
        self.signals = SerialSignals()
        self.signals.tag_detected.connect(self.on_tag_detected)
        self.signals.tag_removed.connect(self.on_tag_removed)
        self.signals.button_pressed.connect(self.on_button_pressed)
        self.signals.status_update.connect(self.on_status_update)

        self.serial_worker = SerialWorker(serial_port, tag_map, self.signals)
        self.serial_worker.start()

        # ── Build screens ─────────────────────────────────────────────────
        self.stack = QStackedWidget()

        self.title_screen      = TitleScreen()
        self.character_screen  = CharacterScreen()
        self.accusation_screen = AccusationScreen(self.characters)
        self.result_screen     = ResultScreen()

        self.stack.addWidget(self.title_screen)       # 0
        self.stack.addWidget(self.character_screen)   # 1
        self.stack.addWidget(self.accusation_screen)  # 2
        self.stack.addWidget(self.result_screen)      # 3

        self.stack.setCurrentIndex(0)

        self.statusBar().setStyleSheet(
            f"background: {CARD_COLOR}; color: {DIM_TEXT_COLOR};"
        )
        self.statusBar().showMessage("Connecting to Pico…")

        # ── Dev panel ─────────────────────────────────────────────────────
        if DEV_MODE:
            self._build_test_panel()
        else:
            self.setCentralWidget(self.stack)

    # ─── Dev Test Panel ───────────────────────────────────────────────────────

    def _build_test_panel(self):
        panel = QWidget()
        panel.setFixedHeight(90)
        panel.setStyleSheet("""
            QWidget {
                background-color: #ff6600;
                border-top: 3px solid #ff0000;
            }
            QPushButton {
                background-color: #1a1a2e;
                color: #ffffff;
                border: 2px solid #ff6600;
                border-radius: 6px;
                padding: 8px 14px;
                font-size: 12px;
                font-weight: bold;
                min-width: 130px;
            }
            QPushButton:hover   { background-color: #2a2a4e; border-color: #ffcc00; }
            QPushButton:pressed { background-color: #0a0a1e; }
        """)

        outer = QVBoxLayout(panel)
        outer.setContentsMargins(12, 6, 12, 6)
        outer.setSpacing(4)

        warn = QLabel("⚠  DEV TEST MODE — REMOVE BEFORE EXHIBIT  ⚠")
        warn.setAlignment(Qt.AlignCenter)
        warn.setStyleSheet(
            "color: #ffffff; background: transparent; font-weight: bold; font-size: 11px;"
        )
        outer.addWidget(warn)

        btn_row = QHBoxLayout()
        btn_row.setSpacing(8)
        btn_row.setAlignment(Qt.AlignCenter)

        def make_btn(label: str, cb) -> QPushButton:
            b = QPushButton(label)
            b.clicked.connect(cb)
            return b

        for i, char in enumerate(self.characters):
            btn_row.addWidget(make_btn(
                f"[{i+1}] Scan\n{char['name']}",
                lambda checked, uid=char["uid"]: self.on_tag_detected(uid)
            ))

        btn_row.addWidget(make_btn("[R] Tag\nRemoved",  lambda: self.on_tag_removed()))
        btn_row.addWidget(make_btn("[B] Press\nButton", lambda: self.on_button_pressed()))

        correct_char = self.char_by_uid.get(self.correct_uid)
        if correct_char:
            btn_row.addWidget(make_btn(
                f"[C] Accuse\n✓ {correct_char['name']}",
                lambda checked, uid=self.correct_uid: self._force_accusation(uid)
            ))

        wrong_char = next((c for c in self.characters if c["uid"] != self.correct_uid), None)
        if wrong_char:
            btn_row.addWidget(make_btn(
                f"[W] Accuse\n✗ {wrong_char['name']}",
                lambda checked, uid=wrong_char["uid"]: self._force_accusation(uid)
            ))

        btn_row.addWidget(make_btn("[0] Reset\nTo Title", lambda: self._dev_reset()))

        outer.addLayout(btn_row)

        dock = QWidget()
        layout = QVBoxLayout(dock)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)
        layout.addWidget(self.stack)
        layout.addWidget(panel)
        self.setCentralWidget(dock)

    def _force_accusation(self, uid: str):
        for char in self.characters:
            self.seen_uids.add(char["uid"])
        self.all_seen = True
        self.stage = self.STAGE_ACCUSE
        self.on_tag_detected(uid)

    def _dev_reset(self):
        self.stage         = self.STAGE_EXPLORE
        self.seen_uids     = set()
        self.all_seen      = False
        self.current_uid   = None
        self.displayed_uid = None
        self._removal_timer.stop()   # cancel any pending removal
        self.stack.setCurrentIndex(0)
        self.statusBar().showMessage("🔄  DEV RESET")

    # ─── Style ────────────────────────────────────────────────────────────────

    def _apply_global_style(self):
        self.setStyleSheet(f"""
            QMainWindow {{ background-color: {BG_COLOR}; }}
            QStatusBar  {{ background-color: {CARD_COLOR}; color: {DIM_TEXT_COLOR}; }}
        """)

    # ─── Serial signal handlers ───────────────────────────────────────────────

    def on_status_update(self, connected: bool, msg: str):
        self.statusBar().showMessage(("🟢  " if connected else "🔴  ") + msg)

    def on_tag_detected(self, uid: str):
        self._removal_timer.stop()

        if uid == self.current_uid:
            return

        self.current_uid = uid

        char = self.char_by_uid.get(uid)
        if char is None:
            self.statusBar().showMessage(f"Unknown tag uid: {uid}")
            return

        if self.stage == self.STAGE_EXPLORE:
            r, g, b = char.get("led_color", [0, 0, 0])
            self.serial_worker.send_output(f"{r},{g},{b}")
            self._show_character(char)
        elif self.stage == self.STAGE_ACCUSE:
            self._handle_accusation(uid, char)   # sends green/red itself

    def on_tag_removed(self):
        # Start (or restart) the debounce timer — if a tag is re-detected
        # within the interval the timer is cancelled and nothing happens.
        self._removal_timer.start()

    def _do_tag_removed(self):
        # Only fires if no tag was re-detected within the debounce window.
        self.current_uid   = None
        self.displayed_uid = None

        self.serial_worker.send_output("255, 180, 100")

        if self.stage == self.STAGE_EXPLORE:
            self.stack.setCurrentIndex(0)
            if SOUND_AVAILABLE:
                pygame.mixer.stop()

    def on_button_pressed(self):
        if self.stage == self.STAGE_EXPLORE:
            self._advance_to_accusation()

    # ─── Stage logic ──────────────────────────────────────────────────────────

    def _show_character(self, char: dict):
        if char["uid"] == self.displayed_uid:
            return  # already showing this character — do nothing

        self.displayed_uid = char["uid"]
        already_seen = char["uid"] in self.seen_uids
        self.character_screen.load_character(char, already_seen)
        self.stack.setCurrentIndex(1)
        self.seen_uids.add(char["uid"])

        total = len(self.characters)
        seen  = len(self.seen_uids)
        self.statusBar().showMessage(
            f"Viewing: {char['name']}  |  Reviewed: {seen}/{total}"
            + ("  |  Press button to proceed!" if seen == total else "")
        )

        if seen == total and not self.all_seen:
            self.all_seen = True

        play_sound(char.get("sound_theme", ""))

    def _advance_to_accusation(self):
        if not self.all_seen:
            remaining = [c["name"] for c in self.characters
                         if c["uid"] not in self.seen_uids]
            self.statusBar().showMessage(
                f"Review these suspects first: {', '.join(remaining)}"
            )
            return

        self.stage = self.STAGE_ACCUSE
        self.stack.setCurrentIndex(2)
        self.statusBar().showMessage("Stage 2 — Place your suspect on the platform")
        play_sound("assets/sounds/stage_transition.wav")

    def _handle_accusation(self, uid: str, char: dict):
        correct      = (uid == self.correct_uid)
        correct_char = self.char_by_uid.get(self.correct_uid, {})
        correct_name = correct_char.get("name", "Unknown")

        self.result_screen.show_result(
            correct=correct,
            accused_name=char["name"],
            correct_name=correct_name,
            explanation=self.culprit_explanation
        )
        self.stack.setCurrentIndex(3)
        self.stage = self.STAGE_RESULT

        if correct:
            self.statusBar().showMessage("Correct! Case closed.")
            self.serial_worker.send_output("0,255,0")
            play_sound("assets/sounds/victory.wav")
        else:
            self.statusBar().showMessage("Wrong accusation. The mystery remains unsolved.")
            self.serial_worker.send_output("255,0,0")
            play_sound("assets/sounds/wrong.wav")

    # ─── Keyboard shortcuts ───────────────────────────────────────────────────

    def keyPressEvent(self, event):
        key = event.key()
        if key == Qt.Key_Escape:
            self.close()
        elif key == Qt.Key_F11:
            self.showNormal() if self.isFullScreen() else self.showFullScreen()
        elif key == Qt.Key_B:
            self.on_button_pressed()
        elif key == Qt.Key_R:
            self.on_tag_removed()
        else:
            # Number keys 1–9 simulate scanning that character
            for i in range(min(9, len(self.characters))):
                if key == getattr(Qt, f"Key_{i+1}"):
                    self.on_tag_detected(self.characters[i]["uid"])
                    break

    def closeEvent(self, event):
        self.serial_worker.stop()
        event.accept()


# ─── Entry Point ──────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Murder Mystery Display App")
    parser.add_argument("--port", default="AUTO",
                        help="Serial port for Pico (default: AUTO)")
    parser.add_argument("--fullscreen", action="store_true")
    args = parser.parse_args()

    port = args.port
    if port == "AUTO":
        port = auto_detect_pico_port()
        if port is None:
            print("⚠  Could not auto-detect Pico. Running in UI-only mode.")
            print("   Pass --port /dev/tty.usbmodemXXXX  or  --port COM3  to connect.")
            port = "DUMMY"

    app = QApplication(sys.argv)
    app.setApplicationName("The Pollution Mystery")
    window = MysteryApp(serial_port=port)
    window.show()

    # Allow Ctrl+C in the terminal to quit cleanly.
    # Qt's event loop blocks Python's signal handler by default, so we run a
    # no-op timer every 200 ms to give Python a chance to check for signals.
    signal.signal(signal.SIGINT, lambda *_: app.quit())
    _sigint_pulse = QTimer()
    _sigint_pulse.start(200)
    _sigint_pulse.timeout.connect(lambda: None)

    sys.exit(app.exec_())


if __name__ == "__main__":
    main()