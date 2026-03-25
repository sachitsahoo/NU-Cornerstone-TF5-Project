"""
The Pollution Mystery — exhibit kiosk display (PyQt5).
Serial RFID / button integration unchanged from original design.
No audio — UI only.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import random
import sys
import threading

import serial
import serial.tools.list_ports

from PyQt5.QtCore import QObject, QPoint, Qt, QTimer, pyqtSignal
from PyQt5.QtGui import (
    QBrush,
    QColor,
    QFont,
    QLinearGradient,
    QPainter,
    QPen,
    QPixmap,
    QPolygon,
)
from PyQt5.QtWidgets import (
    QApplication,
    QFrame,
    QGraphicsDropShadowEffect,
    QGraphicsOpacityEffect,
    QHBoxLayout,
    QLabel,
    QMainWindow,
    QPushButton,
    QSizePolicy,
    QStackedWidget,
    QVBoxLayout,
    QWidget,
)

# ─── Global style (monochrome UI + readable gameplay accents) ────────────────
BG_COLOR = "#000000"
ACCENT_COLOR = "#d4d4d4"
MUTED_ACCENT = "#9ca3af"
DANGER_COLOR = "#b91c1c"
SUCCESS_COLOR = "#15803d"
TEXT_COLOR = "#f5f5f5"
DIM_TEXT_COLOR = "#a3a3a3"
CARD_COLOR = "#0f0f0f"
CTA_FILL_COLOR = "#2a2a2a"
CTA_BORDER_COLOR = "#1a1a1a"
DEV_PANEL_COLOR = "#404040"
DEV_PANEL_BORDER = "#525252"
OVERLAY_COLOR = "rgba(0, 0, 0, 205)"

TITLE_FONT_SIZE = 38
MAIN_TITLE_FONT_SIZE = 58
HEADING_FONT_SIZE = 24
BODY_FONT_SIZE = 15
SMALL_FONT_SIZE = 11

CHARACTERS_FILE = "characters.json"
SERIAL_BAUD = 115200

DEV_MODE = True

STRINGS = {
    "en": {
        "main_title": "POLLUTION MYSTERY",
        "tagline": "A Murder Mystery Experience",
        "press_to_start": "Press button to start",
        "how_to_play": "How to Play",
        "step1": "Listen to each suspect and read the clues for this riverside scene.",
        "step2": "Watch the timer — when time is up, you will choose who polluted the river.",
        "step3": "Place a suspect card on the scanner to highlight them, then press the button to confirm.",
        "step4": "Complete three rounds and see how many polluters you caught!",
        "press_to_continue": "Press button to continue",
        "clues_title": "🔍 Clues",
        "moving_on": "Moving on in {n}s…",
        "whos_the_polluter": "Who's the Polluter?",
        "place_card": "Place the suspect card on the scanner",
        "invalid_scan": "❌ Not a valid suspect. Try another card.",
        "fun_fact": "💡 Fun Fact",
        "solutions": "🌱 Solutions",
        "next_round": "Next Round →",
        "case_closed": "Case Closed!",
        "score_you_got": "You got",
        "score_out_of": "out of 3 right",
        "thank_you": "Thank you for playing!",
        "congrat_high": "Outstanding detective work — you read the evidence like a pro.",
        "congrat_mid": "Nice effort — every round teaches something new about pollution and prevention.",
        "congrat_low": "Keep investigating — understanding sources of pollution is the first step to change.",
        "choose_language": "Choose your language / Elige tu idioma",
        "lang_english": "🇺🇸 English",
        "lang_spanish": "🇲🇽 Español",
        "defaulting_english": "Defaulting to English in {n}s…",
        "need_card_first": "Scan a suspect card before confirming.",
        "status_connecting": "Connecting…",
    },
    "es": {
        "main_title": "MISTERIO DE CONTAMINACIÓN",
        "tagline": "Una experiencia de misterio",
        "press_to_start": "Presiona el botón para comenzar",
        "how_to_play": "Cómo Jugar",
        "step1": "Escucha a cada sospechoso y lee las pistas de esta escena junto al río.",
        "step2": "Observa el temporizador — cuando se acabe el tiempo, elegirás quién contaminó el río.",
        "step3": "Coloca la tarjeta de un sospechoso en el escáner para resaltarlo y presiona el botón para confirmar.",
        "step4": "¡Completa tres rondas y descubre cuántos contaminadores atrapaste!",
        "press_to_continue": "Presiona el botón para continuar",
        "clues_title": "🔍 Pistas",
        "moving_on": "Continuando en {n}s…",
        "whos_the_polluter": "¿Quién es el Contaminador?",
        "place_card": "Coloca la tarjeta del sospechoso en el escáner",
        "invalid_scan": "❌ No es un sospechoso válido. Prueba otra tarjeta.",
        "fun_fact": "💡 Dato Curioso",
        "solutions": "🌱 Soluciones",
        "next_round": "Siguiente Ronda →",
        "case_closed": "¡Caso Cerrado!",
        "score_you_got": "Acertaste",
        "score_out_of": "de 3",
        "thank_you": "¡Gracias por jugar!",
        "congrat_high": "¡Excelente trabajo de detective — leíste las pruebas como un profesional!",
        "congrat_mid": "Buen esfuerzo — cada ronda enseña algo nuevo sobre la contaminación.",
        "congrat_low": "Sigue investigando — entender las fuentes de contaminación es el primer paso.",
        "choose_language": "Choose your language / Elige tu idioma",
        "lang_english": "🇺🇸 English",
        "lang_spanish": "🇲🇽 Español",
        "defaulting_english": "Usando inglés en {n}s…",
        "need_card_first": "Escanea una tarjeta de sospechoso antes de confirmar.",
        "status_connecting": "Conectando…",
    },
}

ROUND_CLUES = {
    1: {
        "en": [
            "Foam and sheen on the water near the outfall after storms.",
            "Fish counts dropped the month night shifts doubled.",
            "A broken fence lets vehicles reach the embankment unseen.",
        ],
        "es": [
            "Espuma y brillo en el agua cerca del desagüe tras las tormentas.",
            "El número de peces bajó el mes en que se duplicaron los turnos nocturnos.",
            "Una valla rota permite que vehículos lleguen al terraplén sin ser vistos.",
        ],
    },
    2: {
        "en": [
            "Lab kits show chloride spikes that do not match upstream samples.",
            "Shipping records list chemicals that never appear in disposal logs.",
            "A consultant’s laptop had drafts dated before the public advisory.",
        ],
        "es": [
            "Los kits de laboratorio muestran picos de cloruro que no coinciden con muestras río arriba.",
            "Los registros de envío listan químicos que no aparecen en los registros de disposición.",
            "El portátil de una consultora tenía borradores fechados antes del aviso público.",
        ],
    },
    3: {
        "en": [
            "Sensors downstream react minutes after specific batch runs.",
            "Maintenance tickets show bypass valves tested but not logged closed.",
            "Volunteer litter data does not correlate with the pollution fingerprint.",
        ],
        "es": [
            "Los sensores río abajo reaccionan minutos después de ciertos lotes de producción.",
            "Los tickets de mantenimiento muestran válvulas de derivación probadas pero no cerradas registradas.",
            "Los datos de basura de voluntarios no se correlacionan con la huella de contaminación.",
        ],
    },
}

ROUND_FACTS = {
    1: {
        "en": "Industrial runoff often carries oils and solvents that form visible sheens and harm aquatic life in slow-moving rivers.",
        "es": "El escurrimiento industrial suele arrastrar aceites y disolventes que forman brillos visibles y dañan la vida acuática en ríos lentos.",
    },
    2: {
        "en": "Salinity and chemical spikes can indicate hidden discharges or tampered monitoring — communities rely on transparent reporting.",
        "es": "Los picos de salinidad y químicos pueden indicar descargas ocultas o monitoreo alterado — las comunidades dependen de informes transparentes.",
    },
    3: {
        "en": "Pollution fingerprints — metals, nutrients, or organics — help scientists trace a spill back to a source or process.",
        "es": "Las huellas de contaminación — metales, nutrientes u orgánicos — ayudan a rastrear un derrame hasta su fuente o proceso.",
    },
}

ROUND_SOLUTIONS = {
    1: {
        "en": [
            "Require real-time monitoring at outfalls and public dashboards.",
            "Buffer zones with native plants filter runoff before it reaches water.",
            "Whistleblower protections encourage workers to report illegal dumping.",
        ],
        "es": [
            "Exigir monitoreo en tiempo real en los desagües y tableros públicos.",
            "Zonas de amortiguación con plantas nativas filtran el escurrimiento antes de llegar al agua.",
            "Protección a denunciantes para que trabajadores reporten vertidos ilegales.",
        ],
    },
    2: {
        "en": [
            "Independent third-party audits of disposal paperwork and chain-of-custody.",
            "Open data policies for environmental consultants’ signed reports.",
            "Citizen science water testing paired with lab calibration checks.",
        ],
        "es": [
            "Auditorías independientes de papeleo de disposición y cadena de custodia.",
            "Políticas de datos abiertos para informes firmados de consultores ambientales.",
            "Pruebas ciudadanas del agua junto con calibración en laboratorio.",
        ],
    },
    3: {
        "en": [
            "Automated valve position sensors logged to tamper-evident storage.",
            "Stronger penalties for delayed disclosure of hazardous releases.",
            "Green chemistry incentives to replace the worst pollutants at the source.",
        ],
        "es": [
            "Sensores de posición de válvulas registrados en almacenamiento a prueba de manipulación.",
            "Sanciones más fuertes por retrasar la divulgación de liberaciones peligrosas.",
            "Incentivos de química verde para reemplazar los peores contaminantes en el origen.",
        ],
    },
}


def S(lang: str, key: str) -> str:
    return STRINGS.get(lang, STRINGS["en"]).get(key, STRINGS["en"].get(key, key))


def make_label(
    text: str,
    size: int,
    bold: bool = False,
    color: str = TEXT_COLOR,
    align=Qt.AlignLeft,
    wrap: bool = True,
) -> QLabel:
    lbl = QLabel(text)
    lbl.setAlignment(align)
    lbl.setWordWrap(wrap)
    font = QFont()
    font.setPointSize(size)
    font.setBold(bold)
    lbl.setFont(font)
    lbl.setStyleSheet(f"color: {color}; background: transparent;")
    return lbl


# ─── Serial (unchanged integration) ───────────────────────────────────────────
class SerialSignals(QObject):
    tag_detected = pyqtSignal(str)
    tag_removed = pyqtSignal()
    button_pressed = pyqtSignal()
    status_update = pyqtSignal(bool, str)


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
        super().__init__(daemon=True)
        self.port = port
        self.tag_map = tag_map
        self.signals = signals
        self._running = True
        self._ser = None
        self._last_uid: str | None = None

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
                        if self._last_uid is not None:
                            self._last_uid = None
                            self.signals.tag_removed.emit()

                    if line == "BUTTON":
                        self.signals.button_pressed.emit()

            except Exception as e:
                self.signals.status_update.emit(False, f"Serial error: {e}")
                break


def auto_detect_pico_port() -> str | None:
    for p in serial.tools.list_ports.comports():
        desc = (p.description or "").lower()
        mfr = (p.manufacturer or "").lower()
        if "pico" in desc or "raspberry" in mfr or "MicroPython" in (p.product or ""):
            return p.device
        if p.vid == 0x2E8A:
            return p.device
    return None


# ─── Skyline: top 1/3 stars + fog; bottom = city, taller at sides, mono greys ─
class SkylineBackgroundWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        random.seed(42)
        self._stars_rel = [(random.random(), random.random()) for _ in range(95)]
        self._phase = 0.0
        self._timer = QTimer(self)
        self._timer.timeout.connect(self._tick)
        self._timer.start(33)

    def _tick(self):
        self._phase += 0.055
        self.update()

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        w, h = self.width(), self.height()
        if w < 16 or h < 24:
            return

        painter.fillRect(0, 0, w, h, QColor(0, 0, 0))

        sky_h = h // 3
        h_min = int(h / 3.0)
        h_max = int(2.0 * h / 3.0)
        h_min = max(12, min(h_min, h - sky_h - 2))
        h_max = max(h_min + 4, min(h_max, h - sky_h))

        ph = self._phase
        # Fog layers (grey only, top third)
        for layer in range(4):
            fy = sky_h * (0.15 + 0.2 * layer) + 6.0 * math.sin(ph * 0.8 + layer * 1.1)
            g = QLinearGradient(0, fy - 45, 0, fy + 55)
            a = 28 - layer * 5
            g.setColorAt(0.0, QColor(0, 0, 0, 0))
            g.setColorAt(0.45, QColor(75, 75, 75, a))
            g.setColorAt(1.0, QColor(0, 0, 0, 0))
            painter.fillRect(0, 0, w, sky_h + 24, g)

        drift = 10.0 * math.sin(ph)
        mist = QLinearGradient(0, sky_h - 40 + drift, 0, sky_h + 15)
        mist.setColorAt(0.0, QColor(0, 0, 0, 0))
        mist.setColorAt(1.0, QColor(18, 18, 18, 100))
        painter.fillRect(0, 0, w, sky_h + 20, mist)

        # Stars — only in top third
        painter.setPen(Qt.NoPen)
        for i, (rx, ry) in enumerate(self._stars_rel):
            sx = int(rx * (w - 1))
            sy = int(ry * max(1, sky_h - 4))
            br = 2 if (i % 8 == 0) else 1
            v = 130 + (i % 9) * 12
            painter.setBrush(QBrush(QColor(v, v, v)))
            painter.setPen(Qt.NoPen)
            painter.drawEllipse(QPoint(sx, sy), br, br)

        wall = QColor("#1c1c1c")
        wall_hi = QColor("#262626")
        win_lit = QColor("#4a4a4a")
        win_dim = QColor("#2e2e2e")

        rng = random.Random(90210)
        n = max(18, w // 26)
        col_w = w / float(n)

        for i in range(n):
            x0 = int(i * col_w)
            bw = max(10, int(col_w) - (1 if i < n - 1 else 0))
            if x0 >= w:
                break
            cx = x0 + bw * 0.5
            t = abs(2.0 * cx / float(w) - 1.0)
            bh = int(h_min + (h_max - h_min) * (0.22 + 0.78 * t))
            bh += rng.randint(-max(3, h // 50), max(3, h // 50))
            bh = max(h_min, min(h_max, bh))
            top_y = h - bh
            if top_y < sky_h:
                bh = h - sky_h
                top_y = sky_h

            painter.setBrush(QBrush(wall))
            painter.setPen(Qt.NoPen)
            painter.drawRect(x0, top_y, bw, h - top_y)
            painter.setBrush(QBrush(wall_hi))
            painter.drawRect(x0, top_y, min(3, max(1, bw // 5)), bh)

            pad = max(2, bw // 10)
            inner_w = bw - 2 * pad
            inner_h = bh - 2 * pad
            if inner_w < 4 or inner_h < 8:
                continue

            cols = max(1, inner_w // 8)
            rows = max(2, inner_h // 11)
            gap_x = 1
            gap_y = 1
            ww = (inner_w - (cols - 1) * gap_x) // cols
            hh = (inner_h - (rows - 1) * gap_y) // rows
            ww = max(2, ww)
            hh = max(2, hh)
            for row in range(rows):
                for col in range(cols):
                    wx = x0 + pad + col * (ww + gap_x)
                    wy = top_y + pad + row * (hh + gap_y)
                    if wx + ww > x0 + bw or wy + hh > top_y + bh:
                        continue
                    lit = rng.random() > 0.48
                    painter.fillRect(wx, wy, ww, hh, win_lit if lit else win_dim)

        painter.setPen(QPen(QColor("#141414"), 1))
        painter.drawLine(0, sky_h, w, sky_h)


class PulsingAccentLabel(QLabel):
    def __init__(self, text: str, app_get_lang, cta_text_color: str | None = None):
        super().__init__(text)
        self._app_get_lang = app_get_lang
        self._cta_text_color = cta_text_color or ACCENT_COLOR
        self._t = 0.0
        self._effect = QGraphicsOpacityEffect(self)
        self.setGraphicsEffect(self._effect)
        self._timer = QTimer(self)
        self._timer.timeout.connect(self._pulse)
        self._timer.start(50)

    def _pulse(self):
        self._t += 0.07
        o = 0.45 + 0.55 * (0.5 + 0.5 * math.sin(self._t))
        self._effect.setOpacity(o)

    def refresh_style(self):
        lang = self._app_get_lang()
        self.setText(S(lang, "press_to_start"))
        font = QFont()
        font.setPointSize(HEADING_FONT_SIZE)
        font.setBold(True)
        self.setFont(font)
        self.setStyleSheet(f"color: {self._cta_text_color}; background: transparent;")
        self.setAlignment(Qt.AlignCenter)


class PulsingContinueLabel(PulsingAccentLabel):
    def __init__(self, app_get_lang):
        super().__init__("", app_get_lang, cta_text_color=MUTED_ACCENT)

    def refresh_style(self):
        lang = self._app_get_lang()
        self.setText(S(lang, "press_to_continue"))
        font = QFont()
        font.setPointSize(HEADING_FONT_SIZE)
        font.setBold(True)
        self.setFont(font)
        self.setStyleSheet(f"color: {self._cta_text_color}; background: transparent;")
        self.setAlignment(Qt.AlignCenter)


# ─── Title screen ─────────────────────────────────────────────────────────────
class TitleScreen(QWidget):
    def __init__(self, app: "MysteryApp"):
        super().__init__()
        self._app = app
        self.setStyleSheet(f"background-color: {BG_COLOR};")
        root = QVBoxLayout(self)
        root.setContentsMargins(0, 0, 0, 0)
        root.setSpacing(0)

        self._sky = SkylineBackgroundWidget()
        self._sky.setMinimumHeight(240)

        mid = QVBoxLayout()
        mid.setAlignment(Qt.AlignHCenter | Qt.AlignTop)
        mid.setSpacing(0)
        mid.setContentsMargins(40, 28, 40, 32)

        self._hero = QLabel()
        self._hero.setAlignment(Qt.AlignCenter)
        self._hero.setWordWrap(True)

        self._tagline = make_label("", BODY_FONT_SIZE + 1, False, DIM_TEXT_COLOR, Qt.AlignCenter, False)
        self._tagline.setStyleSheet("letter-spacing: 0.1em;")

        self._cta_frame = QFrame()
        self._cta_frame.setObjectName("titleCtaFrame")
        self._cta_frame.setStyleSheet(
            f"""
            QFrame#titleCtaFrame {{
                background-color: {CTA_FILL_COLOR};
                border: 2px solid {CTA_BORDER_COLOR};
                border-radius: 6px;
            }}
            """
        )
        self._cta_frame.setMinimumWidth(380)
        cta_inner = QVBoxLayout(self._cta_frame)
        cta_inner.setContentsMargins(32, 20, 32, 20)
        self._cta = PulsingAccentLabel(
            "", lambda: self._app.state["language"], cta_text_color=TEXT_COLOR
        )

        cta_inner.addWidget(self._cta)

        mid.addWidget(self._hero)
        mid.addSpacing(14)
        mid.addWidget(self._tagline)
        mid.addStretch(1)
        mid.addWidget(self._cta_frame, alignment=Qt.AlignCenter)

        root.addWidget(self._sky, stretch=5)
        root.addLayout(mid, stretch=4)
        self._apply_hero_fonts()
        self.apply_strings()

    def _apply_hero_fonts(self):
        f = QFont()
        f.setPointSize(MAIN_TITLE_FONT_SIZE)
        f.setBold(True)
        f.setWeight(QFont.Black)
        f.setLetterSpacing(QFont.PercentageSpacing, 102)
        self._hero.setFont(f)
        self._hero.setStyleSheet(f"color: {TEXT_COLOR}; background: transparent;")

    def apply_strings(self):
        lang = self._app.state["language"]
        self._hero.setText(S(lang, "main_title"))
        self._tagline.setText(S(lang, "tagline"))
        self._cta.refresh_style()

    def resizeEvent(self, e):
        super().resizeEvent(e)
        self._sky.update()


# ─── Language overlay ─────────────────────────────────────────────────────────
class LanguageOverlay(QWidget):
    def __init__(self, parent: QWidget, app: "MysteryApp"):
        super().__init__(parent)
        self._app = app
        self.setStyleSheet(f"background-color: {OVERLAY_COLOR};")
        self.hide()

        lay = QVBoxLayout(self)
        lay.setAlignment(Qt.AlignCenter)
        lay.setSpacing(28)
        lay.setContentsMargins(60, 60, 60, 60)

        self._heading = make_label("", HEADING_FONT_SIZE, True, TEXT_COLOR, Qt.AlignCenter, False)
        lay.addWidget(self._heading)

        row = QHBoxLayout()
        row.setSpacing(32)
        row.setAlignment(Qt.AlignCenter)
        self._btn_en = QPushButton()
        self._btn_es = QPushButton()
        for b in (self._btn_en, self._btn_es):
            b.setMinimumSize(220, 72)
            b.setCursor(Qt.PointingHandCursor)
            b.setStyleSheet(
                f"""
                QPushButton {{
                    background-color: {CARD_COLOR};
                    color: {TEXT_COLOR};
                    border: 2px solid #525252;
                    border-radius: 12px;
                    font-size: {BODY_FONT_SIZE + 2}px;
                    font-weight: bold;
                    padding: 12px;
                }}
                QPushButton:hover {{ border-color: {MUTED_ACCENT}; background-color: #141414; }}
                QPushButton:pressed {{ background-color: #0a0a0a; }}
                """
            )
        self._btn_en.clicked.connect(lambda: self._pick("en"))
        self._btn_es.clicked.connect(lambda: self._pick("es"))
        row.addWidget(self._btn_en)
        row.addWidget(self._btn_es)
        lay.addLayout(row)

        self._countdown = make_label("", BODY_FONT_SIZE, False, DIM_TEXT_COLOR, Qt.AlignCenter, False)
        lay.addWidget(self._countdown)

        self._sec_left = 7
        self._cd_timer = QTimer(self)
        self._cd_timer.timeout.connect(self._tick_cd)

    def show_overlay(self):
        self._heading.setText(S(self._app.state["language"], "choose_language"))
        self._btn_en.setText(S(self._app.state["language"], "lang_english"))
        self._btn_es.setText(S(self._app.state["language"], "lang_spanish"))
        self._sec_left = 7
        self._update_cd_label()
        self._cd_timer.start(1000)
        self.setGeometry(self.parent().rect())
        self.show()
        self.raise_()

    def resizeEvent(self, e):
        super().resizeEvent(e)
        if self.parent():
            self.setGeometry(self.parent().rect())

    def _update_cd_label(self):
        lang = self._app.state["language"]
        self._countdown.setText(S(lang, "defaulting_english").format(n=self._sec_left))

    def _tick_cd(self):
        self._sec_left -= 1
        if self._sec_left <= 0:
            self._cd_timer.stop()
            self._pick("en")
            return
        self._update_cd_label()

    def _pick(self, lang: str):
        self._cd_timer.stop()
        self.hide()
        self._app.state["language"] = lang
        self._app.after_language_chosen()


# ─── Invalid scan overlay ─────────────────────────────────────────────────────
class InvalidScanOverlay(QWidget):
    def __init__(self, parent: QWidget, app: "MysteryApp"):
        super().__init__(parent)
        self._app = app
        self.setStyleSheet(f"background-color: {OVERLAY_COLOR};")
        self.hide()
        lay = QVBoxLayout(self)
        lay.setAlignment(Qt.AlignCenter)
        self._msg = make_label("", HEADING_FONT_SIZE, True, TEXT_COLOR, Qt.AlignCenter, True)
        lay.addWidget(self._msg)
        self._dismiss = QTimer(self)
        self._dismiss.setSingleShot(True)
        self._dismiss.timeout.connect(self.hide)

    def flash(self):
        lang = self._app.state["language"]
        self._msg.setText(S(lang, "invalid_scan"))
        self.setGeometry(self.parent().rect())
        self.show()
        self.raise_()
        self._dismiss.start(3000)

    def resizeEvent(self, e):
        super().resizeEvent(e)
        if self.parent():
            self.setGeometry(self.parent().rect())


# ─── Tutorial ───────────────────────────────────────────────────────────────
class TutorialScreen(QWidget):
    def __init__(self, app: "MysteryApp"):
        super().__init__()
        self._app = app
        self.setStyleSheet(f"background-color: {BG_COLOR};")
        lay = QVBoxLayout(self)
        lay.setAlignment(Qt.AlignCenter)
        lay.setSpacing(20)
        lay.setContentsMargins(64, 48, 64, 48)

        self._title = make_label("", TITLE_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignCenter, False)
        lay.addWidget(self._title)

        self._cards: list[QFrame] = []
        self._step_labels: list[QLabel] = []
        steps = ["step1", "step2", "step3", "step4"]
        for i, sk in enumerate(steps, start=1):
            card = QFrame()
            card.setStyleSheet(
                f"background-color: {CARD_COLOR}; border-radius: 14px; border: 2px solid #3f3f46;"
            )
            hl = QHBoxLayout(card)
            hl.setContentsMargins(20, 16, 20, 16)
            num = make_label(str(i), HEADING_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignCenter, False)
            num.setFixedWidth(48)
            body = make_label("", BODY_FONT_SIZE, False, TEXT_COLOR, Qt.AlignLeft | Qt.AlignVCenter, True)
            hl.addWidget(num)
            hl.addWidget(body, stretch=1)
            self._step_labels.append(body)
            self._cards.append(card)
            lay.addWidget(card)

        lay.addSpacing(12)
        self._cta = PulsingContinueLabel(lambda: self._app.state["language"])
        lay.addWidget(self._cta)
        lay.addStretch(1)

    def apply_strings(self):
        lang = self._app.state["language"]
        self._title.setText(S(lang, "how_to_play"))
        keys = ["step1", "step2", "step3", "step4"]
        for body, key in zip(self._step_labels, keys):
            body.setText(S(lang, key))
        self._cta.refresh_style()


# ─── Scene (painted background) ───────────────────────────────────────────────
class SceneBackgroundWidget(QWidget):
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        w, h = self.width(), self.height()
        painter.fillRect(self.rect(), QColor(BG_COLOR))

        horizon = int(h * 0.42)
        sky = QLinearGradient(0, 0, 0, horizon)
        sky.setColorAt(0.0, QColor("#121212"))
        sky.setColorAt(1.0, QColor("#0a0a0a"))
        painter.fillRect(0, 0, w, horizon, sky)

        haze = QLinearGradient(0, horizon - 100, 0, horizon + 40)
        haze.setColorAt(0.0, QColor(55, 55, 55, 0))
        haze.setColorAt(1.0, QColor(28, 28, 28, 95))
        painter.fillRect(0, 0, w, horizon + 20, haze)

        # Distant trees left (mono)
        painter.setPen(Qt.NoPen)
        painter.setBrush(QBrush(QColor("#1a1a1a")))
        for i, tx in enumerate(range(30, min(w // 2, 400), 50)):
            base_y = horizon - 2
            tri = QPolygon(
                [
                    QPoint(tx, base_y - 40 - (i % 3) * 6),
                    QPoint(tx - 18, base_y),
                    QPoint(tx + 18, base_y),
                ]
            )
            painter.drawPolygon(tri)

        # Factory silhouette mid-right
        fx = int(w * 0.58)
        painter.setBrush(QBrush(QColor("#1a1a1a")))
        painter.drawRect(fx, horizon - 120, 100, 120)
        painter.drawRect(fx + 30, horizon - 160, 50, 40)
        painter.setBrush(QBrush(QColor("#222")))
        painter.drawRect(fx + 10, horizon - 90, 16, 90)
        painter.drawRect(fx + 40, horizon - 100, 14, 100)
        painter.drawRect(fx + 70, horizon - 85, 12, 85)
        # Smokestacks
        painter.fillRect(fx + 25, horizon - 175, 10, 25, QColor("#252525"))
        painter.fillRect(fx + 65, horizon - 185, 12, 30, QColor("#252525"))

        # Water bottom third
        water_top = int(h * 0.62)
        water = QLinearGradient(0, water_top, 0, h)
        water.setColorAt(0.0, QColor("#0e0e0e"))
        water.setColorAt(1.0, QColor("#050505"))
        painter.fillRect(0, water_top, w, h - water_top, water)
        painter.setPen(QPen(QColor("#2a2a2a"), 1))
        for i in range(0, w, 40):
            painter.drawLine(i, water_top + 20 + (i % 17), i + 30, water_top + 25 + (i % 17))


class SceneScreen(QWidget):
    def __init__(self, app: "MysteryApp"):
        super().__init__()
        self._app = app
        self._bg = SceneBackgroundWidget(self)
        self._bg.lower()

        self._timer = QTimer(self)
        self._timer.timeout.connect(self._tick_scene)
        self._remain = 10

        self._count_lbl = make_label("", SMALL_FONT_SIZE, False, DIM_TEXT_COLOR, Qt.AlignCenter, False)
        self._count_lbl.setStyleSheet(
            f"color: {DIM_TEXT_COLOR}; background: rgba(0,0,0,120); "
            f"border-radius: 8px; padding: 6px 14px;"
        )
        self._count_lbl.setParent(self)

        self._strip = QWidget(self)
        s_lay = QHBoxLayout(self._strip)
        s_lay.setSpacing(20)
        s_lay.setContentsMargins(0, 0, 0, 0)
        for char in app.characters:
            col = QVBoxLayout()
            col.setSpacing(6)
            col.setAlignment(Qt.AlignBottom)
            av = QLabel()
            av.setFixedSize(100, 120)
            av.setAlignment(Qt.AlignCenter)
            av.setStyleSheet("background: transparent;")
            self._set_avatar(av, char, 100, 120)
            nm = make_label(char["name"], BODY_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignCenter, False)
            nm.setStyleSheet(f"color: {ACCENT_COLOR}; background: transparent;")
            col.addWidget(av)
            col.addWidget(nm)
            cell = QWidget()
            cell.setLayout(col)
            s_lay.addWidget(cell)

        self._clues_frame = QFrame(self)
        self._clues_frame.setStyleSheet(
            f"background-color: rgba(17, 17, 17, 220); border-radius: 12px; border: 1px solid #2a2a2a;"
        )
        cf = QVBoxLayout(self._clues_frame)
        cf.setContentsMargins(16, 14, 16, 14)
        cf.setSpacing(8)
        self._clues_title = make_label("", BODY_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignLeft, False)
        self._clue_rows: list[QLabel] = []
        cf.addWidget(self._clues_title)
        for _ in range(3):
            cl = make_label("", BODY_FONT_SIZE, False, TEXT_COLOR, Qt.AlignLeft, True)
            self._clue_rows.append(cl)
            cf.addWidget(cl)
        self._clues_frame.setFixedWidth(300)

    def resizeEvent(self, e):
        super().resizeEvent(e)
        self._bg.setGeometry(0, 0, self.width(), self.height())
        self._count_lbl.adjustSize()
        self._count_lbl.move(
            max(8, (self.width() - self._count_lbl.width()) // 2),
            self.height() - 52,
        )

        margin = 24
        strip_w = min(self.width() // 2, 420)
        self._strip.setGeometry(margin, self.height() - 200, strip_w, 180)

        cw = self._clues_frame.width()
        ch = min(260, self.height() - margin * 2)
        self._clues_frame.setGeometry(self.width() - cw - margin, self.height() - ch - margin, cw, ch)

        self._count_lbl.raise_()
        self._strip.raise_()
        self._clues_frame.raise_()

    def _set_avatar(self, lbl: QLabel, char: dict, mw: int, mh: int):
        p = char.get("image", "")
        if p and os.path.exists(p):
            pix = QPixmap(p).scaled(mw, mh, Qt.KeepAspectRatio, Qt.SmoothTransformation)
            lbl.setPixmap(pix)
        else:
            lbl.setText("?")
            lbl.setStyleSheet(f"color: {DIM_TEXT_COLOR}; background: transparent; font-size: 24px;")

    def start_round(self):
        self._remain = 10
        self._update_countdown_label()
        self._timer.start(1000)
        self.apply_strings()

    def stop_timer(self):
        self._timer.stop()

    def _update_countdown_label(self):
        lang = self._app.state["language"]
        self._count_lbl.setText(S(lang, "moving_on").format(n=self._remain))
        self._count_lbl.adjustSize()

    def _tick_scene(self):
        self._remain -= 1
        if self._remain <= 0:
            self._timer.stop()
            self._app.go_to_accusation_from_scene()
            return
        self._update_countdown_label()

    def apply_strings(self):
        lang = self._app.state["language"]
        r = self._app.state["round"]
        self._clues_title.setText(S(lang, "clues_title"))
        clues = ROUND_CLUES.get(r, ROUND_CLUES[1])[lang]
        for i, lbl in enumerate(self._clue_rows):
            lbl.setText(("• " + clues[i]) if i < len(clues) else "")
        self._update_countdown_label()


def _glow_green(widget: QWidget):
    glow = QGraphicsDropShadowEffect()
    glow.setBlurRadius(28)
    glow.setColor(QColor(SUCCESS_COLOR))
    glow.setOffset(0, 0)
    widget.setGraphicsEffect(glow)


# ─── Accusation ───────────────────────────────────────────────────────────────
class AccusationScreen(QWidget):
    def __init__(self, app: "MysteryApp"):
        super().__init__()
        self._app = app
        self.setStyleSheet(f"background-color: {BG_COLOR};")
        self._cards: dict[str, QFrame] = {}
        self._highlight_uid: str | None = None

        lay = QVBoxLayout(self)
        lay.setContentsMargins(48, 40, 48, 40)
        lay.setSpacing(20)

        self._title = make_label("", TITLE_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignCenter, False)
        self._sub = make_label("", BODY_FONT_SIZE, False, DIM_TEXT_COLOR, Qt.AlignCenter, True)
        lay.addWidget(self._title)
        lay.addWidget(self._sub)

        row = QHBoxLayout()
        row.setAlignment(Qt.AlignCenter)
        row.setSpacing(28)
        for char in app.characters:
            uid = char["uid"]
            frame = QFrame()
            frame.setStyleSheet(
                f"QFrame {{ background: transparent; border: 3px solid {CARD_COLOR}; "
                f"border-radius: 16px; padding: 12px; }}"
            )
            frame.setFixedSize(220, 260)
            vl = QVBoxLayout(frame)
            vl.setAlignment(Qt.AlignCenter)
            av = QLabel()
            av.setFixedSize(180, 180)
            av.setAlignment(Qt.AlignCenter)
            av.setStyleSheet("background: transparent;")
            self._set_av(av, char)
            nm = make_label(char["name"], BODY_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignCenter, False)
            vl.addWidget(av)
            vl.addWidget(nm)
            self._cards[uid] = frame
            row.addWidget(frame)
        lay.addLayout(row)
        lay.addStretch(1)

    def _set_av(self, lbl: QLabel, char: dict):
        p = char.get("image", "")
        if p and os.path.exists(p):
            pix = QPixmap(p).scaled(180, 180, Qt.KeepAspectRatio, Qt.SmoothTransformation)
            lbl.setPixmap(pix)
        else:
            lbl.setText("?")
            lbl.setStyleSheet(f"color: {DIM_TEXT_COLOR}; font-size: 32px;")

    def reset_highlights(self):
        self._highlight_uid = None
        for frame in self._cards.values():
            frame.setGraphicsEffect(None)
            frame.setStyleSheet(
                f"QFrame {{ background: transparent; border: 3px solid {CARD_COLOR}; "
                f"border-radius: 16px; padding: 12px; }}"
            )

    def set_highlight(self, uid: str | None):
        self.reset_highlights()
        self._highlight_uid = uid
        if uid and uid in self._cards:
            fr = self._cards[uid]
            fr.setStyleSheet(
                f"QFrame {{ background: transparent; border: 4px solid {SUCCESS_COLOR}; "
                f"border-radius: 16px; padding: 11px; }}"
            )
            _glow_green(fr)

    def apply_strings(self):
        lang = self._app.state["language"]
        self._title.setText(S(lang, "whos_the_polluter"))
        self._sub.setText(S(lang, "place_card"))


# ─── Reveal ───────────────────────────────────────────────────────────────────
class RevealScreen(QWidget):
    def __init__(self, app: "MysteryApp"):
        super().__init__()
        self._app = app
        self.setStyleSheet(f"background-color: {BG_COLOR};")
        root = QVBoxLayout(self)
        root.setContentsMargins(40, 32, 40, 32)
        root.setSpacing(16)

        self._rows_container = QVBoxLayout()
        self._rows_container.setSpacing(12)
        root.addLayout(self._rows_container)

        self._fun_card = QFrame()
        self._fun_card.setStyleSheet(
            f"background-color: {CARD_COLOR}; border-radius: 12px; border: 1px solid #2a2a2a;"
        )
        f_lay = QVBoxLayout(self._fun_card)
        f_lay.setContentsMargins(16, 12, 16, 12)
        self._fun_lbl = make_label("", BODY_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignLeft, False)
        self._fun_body = make_label("", BODY_FONT_SIZE, False, TEXT_COLOR, Qt.AlignLeft, True)
        f_lay.addWidget(self._fun_lbl)
        f_lay.addWidget(self._fun_body)
        root.addWidget(self._fun_card)

        self._sol_lbl = make_label("", BODY_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignLeft, False)
        root.addWidget(self._sol_lbl)
        self._sol_bullets: list[QLabel] = []
        for _ in range(3):
            bl = make_label("", BODY_FONT_SIZE, False, TEXT_COLOR, Qt.AlignLeft, True)
            self._sol_bullets.append(bl)
            root.addWidget(bl)

        root.addStretch(1)
        btn_row = QHBoxLayout()
        btn_row.addStretch(1)
        self._next_btn = QPushButton()
        self._next_btn.setCursor(Qt.PointingHandCursor)
        self._next_btn.setStyleSheet(
            f"""
            QPushButton {{
                background: transparent;
                color: {ACCENT_COLOR};
                border: none;
                font-size: {HEADING_FONT_SIZE}px;
                font-weight: bold;
                padding: 12px 24px;
            }}
            QPushButton:hover {{ color: #e0a840; }}
            """
        )
        self._next_btn.clicked.connect(app.on_reveal_next)
        btn_row.addWidget(self._next_btn)
        root.addLayout(btn_row)

        self._row_widgets: list[QWidget] = []

    def _clear_rows(self):
        for w in self._row_widgets:
            w.setParent(None)
            w.deleteLater()
        self._row_widgets.clear()

    def load_round(self):
        self._clear_rows()
        app = self._app
        lang = app.state["language"]
        r = app.state["round"]
        culprit_uid = app.culprit_for_round(r)

        for char in app.characters:
            row_w = QWidget()
            hl = QHBoxLayout(row_w)
            hl.setContentsMargins(0, 8, 0, 8)
            hl.setSpacing(16)
            av = QLabel()
            av.setFixedSize(80, 80)
            av.setAlignment(Qt.AlignCenter)
            p = char.get("image", "")
            if p and os.path.exists(p):
                av.setPixmap(
                    QPixmap(p).scaled(80, 80, Qt.KeepAspectRatio, Qt.SmoothTransformation)
                )
            else:
                av.setText("?")
            nm = make_label(char["name"], HEADING_FONT_SIZE, False, TEXT_COLOR, Qt.AlignLeft, False)
            is_culprit = char["uid"] == culprit_uid
            mark = make_label(
                "✓" if not is_culprit else "✗",
                TITLE_FONT_SIZE,
                True,
                SUCCESS_COLOR if not is_culprit else DANGER_COLOR,
                Qt.AlignCenter,
                False,
            )
            mark.setFixedWidth(48)
            expl = (
                char.get("culprit_explanation", "")
                if is_culprit
                else char.get("innocent_explanation", "")
            )
            ex_lbl = make_label(expl, BODY_FONT_SIZE, False, TEXT_COLOR, Qt.AlignLeft | Qt.AlignVCenter, True)
            hl.addWidget(av)
            hl.addWidget(nm, stretch=0)
            hl.addWidget(mark)
            hl.addWidget(ex_lbl, stretch=1)
            self._rows_container.addWidget(row_w)
            self._row_widgets.append(row_w)

        self._fun_lbl.setText(S(lang, "fun_fact"))
        self._fun_body.setText(ROUND_FACTS[r][lang])
        self._sol_lbl.setText(S(lang, "solutions"))
        sols = ROUND_SOLUTIONS[r][lang]
        for i, bl in enumerate(self._sol_bullets):
            bl.setText(("• " + sols[i]) if i < len(sols) else "")

        self._next_btn.setText(S(lang, "next_round"))


# ─── Final ────────────────────────────────────────────────────────────────────
class FinalScreen(QWidget):
    def __init__(self, app: "MysteryApp"):
        super().__init__()
        self._app = app
        self.setStyleSheet(f"background-color: {BG_COLOR};")
        lay = QVBoxLayout(self)
        lay.setAlignment(Qt.AlignCenter)
        lay.setSpacing(20)
        lay.setContentsMargins(48, 40, 48, 40)

        self._head = make_label("", TITLE_FONT_SIZE, True, ACCENT_COLOR, Qt.AlignCenter, False)
        self._score_line = make_label("", HEADING_FONT_SIZE, True, TEXT_COLOR, Qt.AlignCenter, False)
        self._msg = make_label("", BODY_FONT_SIZE, False, TEXT_COLOR, Qt.AlignCenter, True)
        self._thanks = make_label("", BODY_FONT_SIZE, False, DIM_TEXT_COLOR, Qt.AlignCenter, False)

        self._logo = QLabel()
        self._logo.setAlignment(Qt.AlignCenter)
        lay.addWidget(self._head)
        lay.addWidget(self._score_line)
        lay.addWidget(self._msg)
        lay.addSpacing(8)
        lay.addWidget(self._thanks)
        lay.addWidget(self._logo)
        lay.addStretch(1)

        self._idle_timer = QTimer(self)
        self._idle_timer.setSingleShot(True)
        self._idle_timer.timeout.connect(app.full_reset_to_title)

    def _load_logo(self):
        path = os.path.join("assets", "logo.png")
        if os.path.exists(path):
            pix = QPixmap(path).scaled(160, 160, Qt.KeepAspectRatio, Qt.SmoothTransformation)
            self._logo.setPixmap(pix)
        else:
            self._logo.clear()
            self._logo.setFixedHeight(0)

    def show_scores(self):
        self._load_logo()
        lang = self._app.state["language"]
        sc = self._app.state["score"]
        self._head.setText(S(lang, "case_closed"))
        color = SUCCESS_COLOR if sc >= 2 else DANGER_COLOR
        self._score_line.setTextFormat(Qt.RichText)
        self._score_line.setText(
            f'{S(lang, "score_you_got")} <span style="color:{color}; font-size:{HEADING_FONT_SIZE + 8}pt;">{sc}</span> {S(lang, "score_out_of")}'
        )
        if sc >= 2:
            self._msg.setText(S(lang, "congrat_high"))
        elif sc == 1:
            self._msg.setText(S(lang, "congrat_mid"))
        else:
            self._msg.setText(S(lang, "congrat_low"))
        self._thanks.setText(S(lang, "thank_you"))
        self._idle_timer.start(15000)

    def stop_idle_timer(self):
        self._idle_timer.stop()


class StackHost(QWidget):
    """Holds stacked screens edge-to-edge; overlays share the same geometry."""

    def __init__(self, app: "MysteryApp"):
        super().__init__()
        self._app = app
        self.stack = QStackedWidget(self)

    def resizeEvent(self, e):
        super().resizeEvent(e)
        w, h = self.width(), self.height()
        self.stack.setGeometry(0, 0, w, h)
        self._app.lang_overlay.setGeometry(0, 0, w, h)
        self._app.invalid_overlay.setGeometry(0, 0, w, h)
        self._app.lang_overlay.raise_()
        self._app.invalid_overlay.raise_()


# ─── Main window ──────────────────────────────────────────────────────────────
class MysteryApp(QMainWindow):
    def __init__(self, serial_port: str):
        super().__init__()
        self.setWindowTitle("The Pollution Mystery")
        self.setMinimumSize(1024, 640)
        if "--fullscreen" in sys.argv:
            self.showFullScreen()
        else:
            self.resize(1200, 800)

        self.state = {
            "language": "en",
            "round": 1,
            "score": 0,
            "scanned_char": None,
        }

        with open(CHARACTERS_FILE, "r") as f:
            data = json.load(f)
        self.characters: list = data["characters"]
        self.char_by_uid: dict = {c["uid"]: c for c in self.characters}
        self.round_culprits: list = data.get(
            "round_culprits",
            [self.characters[0]["uid"]] * 3,
        )
        while len(self.round_culprits) < 3:
            self.round_culprits.append(self.round_culprits[-1])

        tag_map: dict[str, str] = {}
        for char in self.characters:
            for raw_id in char.get("tag_ids", []):
                tag_map[raw_id] = char["uid"]

        self.signals = SerialSignals()
        self.signals.tag_detected.connect(self.on_tag_detected)
        self.signals.tag_removed.connect(self.on_tag_removed)
        self.signals.button_pressed.connect(self.on_button_pressed)
        self.signals.status_update.connect(self.on_status_update)

        self.serial_worker = SerialWorker(serial_port, tag_map, self.signals)
        self.serial_worker.start()

        self.stack_host = StackHost(self)
        self.stack = self.stack_host.stack
        self.lang_overlay = LanguageOverlay(self.stack_host, self)
        self.invalid_overlay = InvalidScanOverlay(self.stack_host, self)
        self.lang_overlay.hide()
        self.invalid_overlay.hide()

        self.title_screen = TitleScreen(self)
        self.tutorial_screen = TutorialScreen(self)
        self.scene_screen = SceneScreen(self)
        self.accusation_screen = AccusationScreen(self)
        self.reveal_screen = RevealScreen(self)
        self.final_screen = FinalScreen(self)

        self.stack.addWidget(self.title_screen)
        self.stack.addWidget(self.tutorial_screen)
        self.stack.addWidget(self.scene_screen)
        self.stack.addWidget(self.accusation_screen)
        self.stack.addWidget(self.reveal_screen)
        self.stack.addWidget(self.final_screen)
        self.stack.setCurrentIndex(0)

        self._lang_open = False

        self.statusBar().setStyleSheet(
            f"background: {CARD_COLOR}; color: {DIM_TEXT_COLOR};"
        )
        self.statusBar().showMessage(S(self.state["language"], "status_connecting"))

        if DEV_MODE:
            self._build_dev_panel()
        else:
            dock = QWidget()
            dl = QVBoxLayout(dock)
            dl.setContentsMargins(0, 0, 0, 0)
            dl.setSpacing(0)
            dl.addWidget(self.stack_host)
            self.setCentralWidget(dock)

        self._apply_global_style()
        self._refresh_status_bar()

    def culprit_for_round(self, r: int) -> str:
        idx = max(0, min(len(self.round_culprits) - 1, r - 1))
        return self.round_culprits[idx]

    def _apply_global_style(self):
        self.setStyleSheet(
            f"""
            QMainWindow {{ background-color: {BG_COLOR}; }}
            QStatusBar {{ background-color: {CARD_COLOR}; color: {DIM_TEXT_COLOR}; }}
            """
        )

    def _build_dev_panel(self):
        panel = QWidget()
        panel.setFixedHeight(80)
        panel.setStyleSheet(
            f"""
            QWidget {{ background-color: {DEV_PANEL_COLOR}; border-top: 2px solid {DEV_PANEL_BORDER}; }}
            QPushButton {{
                background-color: #1a1a1a;
                color: {TEXT_COLOR};
                border: 1px solid #333;
                border-radius: 4px;
                padding: 6px 10px;
                font-size: 10px;
                font-weight: bold;
                min-width: 72px;
            }}
            QPushButton:hover {{ background-color: #2a2a2a; }}
            """
        )
        outer = QVBoxLayout(panel)
        outer.setContentsMargins(8, 4, 8, 4)
        outer.setSpacing(2)
        warn = QLabel("DEV MODE — RFID / button simulation")
        warn.setAlignment(Qt.AlignCenter)
        warn.setStyleSheet("color: #fff; font-size: 9px; font-weight: bold;")
        outer.addWidget(warn)
        row = QHBoxLayout()
        row.setSpacing(6)
        row.setAlignment(Qt.AlignCenter)

        def mk(txt: str, fn):
            b = QPushButton(txt)
            b.clicked.connect(fn)
            return b

        for i, char in enumerate(self.characters):
            row.addWidget(
                mk(
                    f"[{i + 1}] Scan\n{char['name'][:14]}",
                    lambda checked, uid=char["uid"]: self.on_tag_detected(uid),
                )
            )
        row.addWidget(mk("[R] Tag\nRemoved", self.on_tag_removed))
        row.addWidget(mk("[B] Press\nButton", self.on_button_pressed))
        row.addWidget(mk("[0] Reset", self.full_reset_to_title))
        outer.addLayout(row)

        dock = QWidget()
        dl = QVBoxLayout(dock)
        dl.setContentsMargins(0, 0, 0, 0)
        dl.setSpacing(0)
        dl.addWidget(self.stack_host, stretch=1)
        dl.addWidget(panel)
        self.setCentralWidget(dock)

    def _refresh_status_bar(self):
        idx = self.stack.currentIndex()
        lang = self.state["language"]
        rnd = self.state["round"]
        scan = self.state["scanned_char"]
        sn = scan["name"] if scan else "—"
        self.statusBar().showMessage(
            f"Screen {idx} | round {rnd} | lang {lang} | last scan: {sn}"
        )

    def after_language_chosen(self):
        self._lang_open = False
        self.tutorial_screen.apply_strings()
        self.stack.setCurrentIndex(1)
        self._refresh_status_bar()

    def go_to_accusation_from_scene(self):
        self.scene_screen.stop_timer()
        self.accusation_screen.reset_highlights()
        self.accusation_screen.apply_strings()
        self.state["scanned_char"] = None
        self.stack.setCurrentIndex(3)
        self._refresh_status_bar()

    def on_reveal_next(self):
        if self.state["round"] < 3:
            self.state["round"] += 1
            self.reset_between_rounds()
            self.scene_screen.start_round()
            self.stack.setCurrentIndex(2)
        else:
            self.stack.setCurrentIndex(5)
            self.final_screen.show_scores()
        self._refresh_status_bar()

    def reset_between_rounds(self):
        self.state["scanned_char"] = None

    def full_reset_to_title(self):
        self.final_screen.stop_idle_timer()
        self.scene_screen.stop_timer()
        self.lang_overlay.hide()
        self.invalid_overlay.hide()
        self._lang_open = False
        self.state = {
            "language": "en",
            "round": 1,
            "score": 0,
            "scanned_char": None,
        }
        self.accusation_screen.reset_highlights()
        self.title_screen.apply_strings()
        self.stack.setCurrentIndex(0)
        self._refresh_status_bar()

    def on_status_update(self, connected: bool, msg: str):
        prefix = "🟢 " if connected else "🔴 "
        self.statusBar().showMessage(prefix + msg)
        QTimer.singleShot(2000, self._refresh_status_bar)

    def on_tag_detected(self, uid: str):
        char = self.char_by_uid.get(uid)
        idx = self.stack.currentIndex()

        if idx == 3:
            if char is None:
                self.invalid_overlay.flash()
                return
            self.state["scanned_char"] = char
            self.accusation_screen.set_highlight(char["uid"])
            self._refresh_status_bar()
            return

    def on_tag_removed(self):
        self.state["scanned_char"] = None
        if self.stack.currentIndex() == 3:
            self.accusation_screen.reset_highlights()
        self._refresh_status_bar()

    def on_button_pressed(self):
        idx = self.stack.currentIndex()

        if idx == 0:
            if not self._lang_open and not self.lang_overlay.isVisible():
                self._lang_open = True
                self.lang_overlay.show_overlay()
            return

        if idx == 1:
            self.scene_screen.start_round()
            self.stack.setCurrentIndex(2)
            self._refresh_status_bar()
            return

        if idx == 3:
            ch = self.state["scanned_char"]
            if not ch:
                lang = self.state["language"]
                self.statusBar().showMessage(S(lang, "need_card_first"))
                QTimer.singleShot(2500, self._refresh_status_bar)
                return
            culprit = self.culprit_for_round(self.state["round"])
            if ch["uid"] == culprit:
                self.state["score"] = self.state["score"] + 1
            self.reveal_screen.load_round()
            self.stack.setCurrentIndex(4)
            self._refresh_status_bar()
            return

        if idx == 4:
            self.on_reveal_next()
            return

        if idx == 5:
            self.full_reset_to_title()
            return

    def resizeEvent(self, e):
        super().resizeEvent(e)
        if hasattr(self, "stack_host"):
            self.stack_host.updateGeometry()

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
            for i in range(min(9, len(self.characters))):
                if key == getattr(Qt, f"Key_{i + 1}"):
                    self.on_tag_detected(self.characters[i]["uid"])
                    break
        super().keyPressEvent(event)

    def closeEvent(self, event):
        self.serial_worker.stop()
        event.accept()


def main():
    parser = argparse.ArgumentParser(description="The Pollution Mystery — kiosk display")
    parser.add_argument("--port", default="AUTO", help="Serial port (default: AUTO)")
    parser.add_argument("--fullscreen", action="store_true")
    args = parser.parse_args()

    port = args.port
    if port == "AUTO":
        port = auto_detect_pico_port()
        if port is None:
            print("Could not auto-detect Pico. UI-only mode — use --port to connect.")
            port = "DUMMY"

    app = QApplication(sys.argv)
    app.setApplicationName("The Pollution Mystery")
    win = MysteryApp(serial_port=port)
    win.show()
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
