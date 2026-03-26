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
  const scrollY = useScrollParallax();
  const [view, setView] = useState<GameView>("landing");
  const viewRef = useRef<GameView>("landing");
  viewRef.current = view;

  const [lang, setLang] = useState<Lang>("en");
  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const langPickerOpenRef = useRef(false);
  langPickerOpenRef.current = langPickerOpen;

  const [devOpen, setDevOpen] = useState(false);
  const [devBusy, setDevBusy] = useState(false);
  const [playActive, setPlayActive] = useState(false);
  const devFirstBtnRef = useRef<HTMLButtonElement>(null);

  const [characters, setCharacters] = useState<CharacterJson[]>([]);
  const charactersRef = useRef<CharacterJson[]>([]);
  charactersRef.current = characters;

  const [roundCulprits, setRoundCulprits] = useState<string[]>([
    "steve",
    "tung",
  ]);
  const culpritUidRef = useRef<string>("steve");

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

  useEffect(() => {
    culpritUidRef.current = culpritUid(roundCulprits);
  }, [roundCulprits]);

  useEffect(() => {
    void (async () => {
      try {
        const r = await fetch("/api/characters");
        if (!r.ok) {
          setCharacters(FALLBACK_CHARACTERS);
          setRoundCulprits(["steve", "tung"]);
          return;
        }
        const data = (await r.json()) as CharactersApiResponse;
        setCharacters(data.characters);
        setRoundCulprits(data.round_culprits);
      } catch {
        setCharacters(FALLBACK_CHARACTERS);
        setRoundCulprits(["steve", "tung"]);
      }
    })();
  }, []);

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

  const onBridgeMessage = useCallback(
    (msg: BridgeMessage) => {
      if (msg.type === "status") return;

      if (msg.type === "button") {
        if (revealRef.current) return;
        if (viewRef.current === "landing") {
          if (!langPickerOpenRef.current) setLangPickerOpen(true);
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
        if (revealRef.current) return;
        if (viewRef.current !== "playing") return;
        const uid = msg.uid;
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
    [clearConfirmTimer, submitReveal, sendLed]
  );

  const { bridgeLine, bridgeFooterMeta, lastEvent, setLastEvent } =
    useBridgeWebSocket(onBridgeMessage);

  const handlePlayClick = useCallback(() => {
    if (playActive) return;
    setLangPickerOpen(true);
  }, [playActive]);

  const onLanguagePick = useCallback((next: Lang) => {
    setLang(next);
    setLangPickerOpen(false);
    setPlayActive(true);
    setView("playing");
    window.dispatchEvent(new CustomEvent("polluter:play"));
  }, []);

  const onLanguageOverlayClose = useCallback(() => {
    setLangPickerOpen(false);
  }, []);

  const onContinueReveal = useCallback(() => {
    setReveal(null);
    clearConfirmTimer();
    setScannedUid(null);
    scannedUidRef.current = null;
    setHighlightUid(null);
    confirmOpenRef.current = false;
    setConfirmOpen(false);
    sendLed(255, 180, 100);
  }, [clearConfirmTimer, sendLed]);

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
        if (!debugMode) return;
        e.preventDefault();
        setDevOpen(false);
        return;
      }
      if (e.key === "Escape" && langPickerOpenRef.current) {
        e.preventDefault();
        setLangPickerOpen(false);
        return;
      }
      if (e.key === "p" || e.key === "P") {
        if (viewRef.current !== "landing" || playActive) return;
        e.preventDefault();
        handlePlayClick();
        return;
      }
      if (e.key === "d" || e.key === "D") {
        if (!debugMode) return;
        e.preventDefault();
        setDevOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [devOpen, playActive, handlePlayClick]);

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
        setLastEvent(`dev local: ${JSON.stringify(msg)}`);
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
        const t = await r.text();
        setLastEvent(`dev bridge: ${r.status} ${t}`);
      } catch (e) {
        runLocalSimulation();
        setLastEvent(`dev local (bridge unavailable): ${String(e)}`);
      } finally {
        setDevBusy(false);
      }
    },
    [onBridgeMessage, setLastEvent]
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
          lastEventLine={lastEvent}
          showHud={debugMode}
          onContinueReveal={onContinueReveal}
        />
      </div>

      {langPickerOpen && landingVisible && (
        <LanguagePickerOverlay
          lang={lang}
          onPick={onLanguagePick}
          onClose={onLanguageOverlayClose}
        />
      )}

      {!debugMode && (
        <button
          type="button"
          className="game-shell__debug-entry"
          onClick={enableDebugMode}
          title="Enable developer tools"
        >
          Enable Dev
        </button>
      )}

      {debugMode && (
        <footer className="landing__footer" title={COPY.keyboardFooterHint}>
          <span className="landing__bridge" title="Latest serial / bridge status">
            {bridgeLine}
          </span>
          <span
            className="landing__bridge-meta"
            title="Bridge protocol version and connection hints"
          >
            {bridgeFooterMeta}
          </span>
          <span className="landing__last" title="Last hardware / dev event">
            {lastEvent}
          </span>
          <button
            type="button"
            className="landing__dev-toggle"
            aria-expanded={devOpen}
            aria-controls={devOpen ? "dev-controls-panel" : undefined}
            title={COPY.devToggleTitle}
            onClick={() => setDevOpen((v) => !v)}
          >
            Dev
          </button>
        </footer>
      )}
      {debugMode && (
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

      {debugMode && devOpen && (
        <div
          className="dev-strip"
          id="dev-controls-panel"
          role="region"
          aria-label="Developer controls"
        >
          <div className="dev-strip__row">
            <span className="dev-strip__hint">
              Works with bridge when available; auto-falls back to local simulation when unavailable.
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
              Simulate button
            </button>
            <button
              type="button"
              className="dev-strip__btn"
              disabled={devBusy}
              onClick={() => {
                void sendDev(devEventRequest("tag", "steve"));
              }}
            >
              Simulate tag (Steve)
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
