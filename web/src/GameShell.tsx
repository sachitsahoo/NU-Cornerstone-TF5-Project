import { useCallback, useEffect, useRef, useState } from "react";
import { useBridgeWebSocket } from "./hooks/useBridgeWebSocket";
import {
  charByUid,
  culpritUid,
  FALLBACK_CHARACTERS,
  type Lang,
} from "./gameContent";
import type { CharacterJson, CharactersApiResponse } from "./gameTypes";
import { COPY } from "./strings";
import { useScrollParallax } from "./useScrollParallax";
import {
  BRIDGE_EVENT_SCHEMA_NAME,
  BRIDGE_EVENT_SCHEMA_VERSION,
  devEventRequest,
  type BridgeMessage,
  type DevEventRequestV1,
} from "./types";
import type { GameView } from "./viewState";
import { LandingView } from "./views/LandingView";
import { LanguagePickerOverlay } from "./views/LanguagePickerOverlay";
import { PlayingView } from "./views/PlayingView";

type RevealState = {
  correct: boolean;
  picked: CharacterJson;
  culprit: CharacterJson;
};

export default function GameShell() {
  const debugFromQuery =
    new URLSearchParams(window.location.search).get("debug") === "1";
  const [debugEnabled, setDebugEnabled] = useState(
    debugFromQuery || window.sessionStorage.getItem("polluter_debug") === "1"
  );
  const debugMode = debugEnabled;
  const hideDevUi =
    import.meta.env.PROD ||
    import.meta.env.VITE_HIDE_DEV_UI === "true" ||
    import.meta.env.VITE_HIDE_DEV_UI === "1";
  const showDevChrome =
    import.meta.env.DEV && !hideDevUi && debugMode;
  const scrollY = useScrollParallax();
  const [view, setView] = useState<GameView>("landing");
  const viewRef = useRef<GameView>("landing");
  viewRef.current = view;

  const [lang, setLang] = useState<Lang>("en");
  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const langPickerOpenRef = useRef(false);
  langPickerOpenRef.current = langPickerOpen;

  // Language picker: which option is currently highlighted (cycles on short press)
  const [pickerLang, setPickerLang] = useState<Lang>("en");
  const pickerLangRef = useRef<Lang>("en");
  pickerLangRef.current = pickerLang;

  // Hold-to-confirm: fill progress [0..1]
  const [holdProgress, setHoldProgress] = useState(0);
  const holdStartRef = useRef<number | null>(null);
  const holdRafRef = useRef<number | null>(null);
  const holdConfirmTimerRef = useRef<number | null>(null);
  // Delay before the fill bar appears — button must be held this long to enter hold mode
  const holdDelayTimerRef = useRef<number | null>(null);
  // True when the picker was opened by the current button press (ignore its release)
  const pickerOpenedThisPressRef = useRef(false);
  // True after returning from reveal — ignore button_down until button is released
  const awaitingButtonUpRef = useRef(false);

  const [devOpen, setDevOpen] = useState(false);
  const [devBusy, setDevBusy] = useState(false);
  const [playActive, setPlayActive] = useState(false);
  const devFirstBtnRef = useRef<HTMLButtonElement>(null);

  const [characters, setCharacters] = useState<CharacterJson[]>([]);
  const charactersRef = useRef<CharacterJson[]>([]);
  charactersRef.current = characters;

  const [roundCulprits, setRoundCulprits] = useState<string[]>([
    "bacon_hair",
    "tung",
  ]);
  const culpritUidRef = useRef<string>("bacon_hair");

  const [highlightUid, setHighlightUid] = useState<string | null>(null);
  const [scannedUid, setScannedUid] = useState<string | null>(null);
  const scannedUidRef = useRef<string | null>(null);
  scannedUidRef.current = scannedUid;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const confirmOpenRef = useRef(false);
  confirmOpenRef.current = confirmOpen;

  const [reveal, setReveal] = useState<RevealState | null>(null);
  const revealRef = useRef<RevealState | null>(null);
  revealRef.current = reveal;

  const confirmTimerRef = useRef<number | null>(null);

  const sendLed = useCallback((r: number, g: number, b: number) => {
    void fetch("/api/led", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ r, g, b }),
    });
  }, []);

  const clearConfirmTimer = useCallback(() => {
    if (confirmTimerRef.current != null) {
      window.clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = null;
    }
  }, []);

  const selectSuspectByUid = useCallback(
    (uid: string) => {
      if (revealRef.current) return;
      if (viewRef.current !== "playing") return;
      const char = charactersRef.current.find((c) => c.uid === uid);
      if (!char) return;
      const [r, g, b] = char.led_color;
      sendLed(r, g, b);
      clearConfirmTimer();
      setScannedUid(uid);
      scannedUidRef.current = uid;
      setHighlightUid(uid);
      confirmOpenRef.current = false;
      setConfirmOpen(false);
      confirmTimerRef.current = window.setTimeout(() => {
        confirmOpenRef.current = true;
        setConfirmOpen(true);
      }, 1000);
    },
    [clearConfirmTimer, sendLed]
  );

  const cancelHold = useCallback(() => {
    if (holdDelayTimerRef.current != null) {
      window.clearTimeout(holdDelayTimerRef.current);
      holdDelayTimerRef.current = null;
    }
    if (holdRafRef.current != null) {
      cancelAnimationFrame(holdRafRef.current);
      holdRafRef.current = null;
    }
    if (holdConfirmTimerRef.current != null) {
      window.clearTimeout(holdConfirmTimerRef.current);
      holdConfirmTimerRef.current = null;
    }
    holdStartRef.current = null;
    setHoldProgress(0);
  }, []);

  useEffect(() => {
    culpritUidRef.current = culpritUid(roundCulprits);
  }, [roundCulprits]);

  useEffect(() => {
    void (async () => {
      try {
        const r = await fetch("/api/characters");
        if (!r.ok) {
          setCharacters(FALLBACK_CHARACTERS);
          setRoundCulprits(["bacon_hair", "tung"]);
          return;
        }
        const data = (await r.json()) as CharactersApiResponse;
        setCharacters(data.characters);
        setRoundCulprits(data.round_culprits);
      } catch {
        setCharacters(FALLBACK_CHARACTERS);
        setRoundCulprits(["bacon_hair", "tung"]);
      }
    })();
  }, []);

  const onLanguagePick = useCallback((next: Lang) => {
    cancelHold();
    setLang(next);
    setLangPickerOpen(false);
    langPickerOpenRef.current = false;
    setPlayActive(true);
    setView("playing");
    viewRef.current = "playing";
    window.dispatchEvent(new CustomEvent("polluter:play"));
  }, [cancelHold]);

  const HOLD_MS = 3000;
  const HOLD_DELAY_MS = 300; // button must be held this long before fill starts

  const startHold = useCallback(() => {
    cancelHold();
    const start = Date.now();
    holdStartRef.current = start;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / HOLD_MS, 1);
      setHoldProgress(progress);
      if (progress < 1) {
        holdRafRef.current = requestAnimationFrame(tick);
      }
    };
    holdRafRef.current = requestAnimationFrame(tick);

    holdConfirmTimerRef.current = window.setTimeout(() => {
      holdRafRef.current = null;
      setHoldProgress(1);
      onLanguagePick(pickerLangRef.current);
    }, HOLD_MS);
  }, [cancelHold, onLanguagePick]);

  const submitReveal = useCallback(() => {
    const uid = scannedUidRef.current;
    if (!uid || !confirmOpenRef.current) return;
    const picked = charByUid(charactersRef.current, uid);
    const cul = charByUid(charactersRef.current, culpritUidRef.current);
    if (!picked || !cul) return;
    const correct = picked.uid === cul.uid;
    setReveal({ correct, picked, culprit: cul });
    confirmOpenRef.current = false;
    setConfirmOpen(false);
    clearConfirmTimer();
    if (correct) {
      sendLed(0, 255, 0);
    } else {
      sendLed(255, 0, 0);
    }
  }, [clearConfirmTimer, sendLed]);

  const onContinueReveal = useCallback(() => {
    setReveal(null);
    revealRef.current = null;
    clearConfirmTimer();
    setScannedUid(null);
    scannedUidRef.current = null;
    setHighlightUid(null);
    confirmOpenRef.current = false;
    setConfirmOpen(false);
    sendLed(255, 180, 100);
    setView("landing");
    viewRef.current = "landing";
    setPlayActive(false);
    awaitingButtonUpRef.current = true;
  }, [clearConfirmTimer, sendLed]);

  const onBridgeMessage = useCallback(
    (msg: BridgeMessage) => {
      if (msg.type === "status") return;

      if (msg.type === "button_down") {
        if (awaitingButtonUpRef.current) return;
        if (revealRef.current) {
          onContinueReveal();
          return;
        }
        if (viewRef.current === "landing") {
          if (!langPickerOpenRef.current) {
            // Opening picker — only on the first down of this press
            if (!pickerOpenedThisPressRef.current) {
              pickerOpenedThisPressRef.current = true;
              setLangPickerOpen(true);
              langPickerOpenRef.current = true;
            }
          } else if (holdDelayTimerRef.current === null && holdStartRef.current === null) {
            // Picker already open, new press, hold not yet started.
            // Also clears pickerOpenedThisPressRef as a fallback in case BUTTON_UP was dropped.
            pickerOpenedThisPressRef.current = false;
            // Wait HOLD_DELAY_MS before starting the fill — short taps stay as language cycles.
            holdDelayTimerRef.current = window.setTimeout(() => {
              holdDelayTimerRef.current = null;
              startHold();
            }, HOLD_DELAY_MS);
          }
          return;
        }
        if (viewRef.current === "playing") {
          if (confirmOpenRef.current && scannedUidRef.current) {
            submitReveal();
            awaitingButtonUpRef.current = true;
          }
          return;
        }
        return;
      }

      if (msg.type === "button_up") {
        awaitingButtonUpRef.current = false;
        if (langPickerOpenRef.current) {
          if (pickerOpenedThisPressRef.current) {
            // This release paired with the press that opened the picker — ignore
            pickerOpenedThisPressRef.current = false;
          } else if (holdDelayTimerRef.current != null || holdStartRef.current != null) {
            // Short press (released before or during hold): cycle language
            const next: Lang = pickerLangRef.current === "en" ? "es" : "en";
            setPickerLang(next);
            pickerLangRef.current = next;
            cancelHold();
          }
          return;
        }
        return;
      }

      if (msg.type === "button") {
        // Legacy firmware (no button_down/button_up): cycle if picker open, otherwise existing behavior
        if (langPickerOpenRef.current) {
          const next: Lang = pickerLangRef.current === "en" ? "es" : "en";
          setPickerLang(next);
          pickerLangRef.current = next;
          return;
        }
        if (revealRef.current) return;
        if (viewRef.current === "landing") {
          setLangPickerOpen(true);
          langPickerOpenRef.current = true;
          return;
        }
        if (viewRef.current === "playing") {
          if (confirmOpenRef.current && scannedUidRef.current) {
            submitReveal();
          }
        }
        return;
      }

      if (msg.type === "tag") {
        selectSuspectByUid(msg.uid);
        return;
      }

      if (msg.type === "tag_removed") {
        if (revealRef.current) return;
        clearConfirmTimer();
        setScannedUid(null);
        scannedUidRef.current = null;
        setHighlightUid(null);
        confirmOpenRef.current = false;
        setConfirmOpen(false);
        sendLed(255, 180, 100);
      }
    },
    [
      clearConfirmTimer,
      submitReveal,
      sendLed,
      startHold,
      cancelHold,
      onContinueReveal,
      selectSuspectByUid,
    ]
  );

  useBridgeWebSocket(onBridgeMessage);

  const handlePlayClick = useCallback(() => {
    if (playActive) return;
    setLangPickerOpen(true);
  }, [playActive]);

  // Reset picker highlight whenever the overlay opens
  useEffect(() => {
    if (langPickerOpen) {
      setPickerLang("en");
      pickerLangRef.current = "en";
      setHoldProgress(0);
    } else {
      cancelHold();
    }
  }, [langPickerOpen, cancelHold]);

  const enableDebugMode = useCallback(() => {
    window.sessionStorage.setItem("polluter_debug", "1");
    setDebugEnabled(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        if (target.isContentEditable) return;
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      }
      if (e.key === "Escape" && devOpen) {
        if (hideDevUi || !debugMode) return;
        e.preventDefault();
        setDevOpen(false);
        return;
      }
      if (e.key === "Escape" && langPickerOpenRef.current) {
        e.preventDefault();
        cancelHold();
        setLangPickerOpen(false);
        langPickerOpenRef.current = false;
        return;
      }
      if (e.key === "p" || e.key === "P") {
        if (viewRef.current !== "landing" || playActive) return;
        e.preventDefault();
        handlePlayClick();
        return;
      }
      if (e.key === "d" || e.key === "D") {
        if (hideDevUi || !debugMode) return;
        e.preventDefault();
        setDevOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cancelHold, debugMode, devOpen, hideDevUi, playActive, handlePlayClick]);

  useEffect(() => {
    if (!devOpen) return;
    const id = requestAnimationFrame(() => devFirstBtnRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [devOpen]);

  const sendDev = useCallback(
    async (body: DevEventRequestV1) => {
      const runLocalSimulation = () => {
        const schema = {
          name: BRIDGE_EVENT_SCHEMA_NAME,
          version: BRIDGE_EVENT_SCHEMA_VERSION,
        } as const;
        const msg: BridgeMessage =
          body.type === "tag"
            ? { type: "tag", uid: body.uid, schema }
            : body.type === "button"
              ? { type: "button", schema }
              : { type: "tag_removed", schema };
        onBridgeMessage(msg);
      };
      setDevBusy(true);
      try {
        const r = await fetch("/dev/event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!r.ok) {
          runLocalSimulation();
          return;
        }
        await r.text();
      } catch {
        runLocalSimulation();
      } finally {
        setDevBusy(false);
      }
    },
    [onBridgeMessage]
  );

  const landingVisible = view === "landing";
  const playingVisible = view === "playing";

  return (
    <div
      className={`game-shell landing game-shell--${view}`}
      data-view={view}
    >
      <div className="view-stack">
        <LandingView
          scrollY={scrollY}
          playActive={playActive}
          onPlay={handlePlayClick}
          visible={landingVisible}
          playBusy={langPickerOpen}
        />
        <PlayingView
          visible={playingVisible}
          lang={lang}
          characters={characters}
          highlightUid={highlightUid}
          confirmOpen={confirmOpen}
          scannedUid={scannedUid}
          reveal={reveal}
          onContinueReveal={onContinueReveal}
          onSuspectSelect={selectSuspectByUid}
        />
      </div>

      {langPickerOpen && landingVisible && (
        <LanguagePickerOverlay
          lang={lang}
          pickerLang={pickerLang}
          holdProgress={holdProgress}
          onPick={onLanguagePick}
        />
      )}

      {import.meta.env.DEV && !hideDevUi && !debugMode && (
        <button
          type="button"
          className="game-shell__debug-entry"
          onClick={enableDebugMode}
          title="Enable developer tools"
        >
          Enable Dev
        </button>
      )}

      {showDevChrome && (
        <button
          type="button"
          className="game-shell__dev-fab"
          aria-expanded={devOpen}
          aria-controls={devOpen ? "dev-controls-panel" : undefined}
          title={COPY.devToggleTitle}
          onClick={() => setDevOpen((v) => !v)}
        >
          Dev
        </button>
      )}

      {showDevChrome && devOpen && (
        <div
          className="dev-strip"
          id="dev-controls-panel"
          role="region"
          aria-label="Developer controls"
        >
          <div className="dev-strip__row">
            <span className="dev-strip__hint">
              Simulate hardware events for local testing.
            </span>
            <button
              ref={devFirstBtnRef}
              type="button"
              className="dev-strip__btn"
              disabled={devBusy}
              onClick={() => {
                void sendDev(devEventRequest("button"));
              }}
            >
              Simulate button (legacy)
            </button>
            <button
              type="button"
              className="dev-strip__btn"
              disabled={devBusy}
              onClick={() => {
                void sendDev(devEventRequest("button_down"));
              }}
            >
              Simulate button down
            </button>
            <button
              type="button"
              className="dev-strip__btn"
              disabled={devBusy}
              onClick={() => {
                void sendDev(devEventRequest("button_up"));
              }}
            >
              Simulate button up
            </button>
            <button
              type="button"
              className="dev-strip__btn"
              disabled={devBusy}
              onClick={() => {
                void sendDev(devEventRequest("tag", "bacon_hair"));
              }}
            >
              Simulate tag (Bacon Hair)
            </button>
            <button
              type="button"
              className="dev-strip__btn"
              disabled={devBusy}
              onClick={() => {
                void sendDev(devEventRequest("tag", "ballerina_cappuccina"));
              }}
            >
              Simulate tag (Ballerina Cappuccina)
            </button>
            <button
              type="button"
              className="dev-strip__btn"
              disabled={devBusy}
              onClick={() => {
                void sendDev(devEventRequest("tag", "tung"));
              }}
            >
              Simulate tag (Tung)
            </button>
            <button
              type="button"
              className="dev-strip__btn"
              disabled={devBusy}
              onClick={() => {
                void sendDev(devEventRequest("tag_removed"));
              }}
            >
              Simulate tag removed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
