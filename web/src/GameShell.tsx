import { useCallback, useEffect, useRef, useState } from "react";
import { useBridgeWebSocket } from "./hooks/useBridgeWebSocket";
import { COPY } from "./strings";
import { useScrollParallax } from "./useScrollParallax";
import {
  devEventRequest,
  type BridgeMessage,
  type DevEventRequestV1,
} from "./types";
import type { GameView } from "./viewState";
import { LandingView } from "./views/LandingView";
import { PlayingView } from "./views/PlayingView";

export default function GameShell() {
  const scrollY = useScrollParallax();
  const [view, setView] = useState<GameView>("landing");
  const viewRef = useRef<GameView>("landing");
  viewRef.current = view;

  const [devOpen, setDevOpen] = useState(false);
  const [devBusy, setDevBusy] = useState(false);
  const [playActive, setPlayActive] = useState(false);
  const devFirstBtnRef = useRef<HTMLButtonElement>(null);

  const onBridgeMessage = useCallback((msg: BridgeMessage) => {
    if (msg.type !== "button") return;
    if (viewRef.current !== "landing") return;
    setPlayActive(true);
    setView("playing");
    window.dispatchEvent(new CustomEvent("polluter:play"));
  }, []);

  const { bridgeLine, bridgeFooterMeta, lastEvent, setLastEvent } =
    useBridgeWebSocket(onBridgeMessage);

  const enterPlaying = useCallback(() => {
    if (viewRef.current !== "landing") return;
    setPlayActive(true);
    setView("playing");
    window.dispatchEvent(new CustomEvent("polluter:play"));
    void (async () => {
      try {
        const r = await fetch("/dev/event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(devEventRequest("button")),
        });
        if (r.ok) setLastEvent("play → bridge button");
        else if (r.status === 404) setLastEvent("play (bridge dev off)");
        else setLastEvent(`play → HTTP ${r.status}`);
      } catch {
        setLastEvent("play (offline — UI only)");
      }
    })();
  }, [setLastEvent]);

  const handlePlay = useCallback(() => {
    if (playActive) return;
    enterPlaying();
  }, [playActive, enterPlaying]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        if (target.isContentEditable) return;
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      }
      if (e.key === "Escape" && devOpen) {
        e.preventDefault();
        setDevOpen(false);
        return;
      }
      if (e.key === "p" || e.key === "P") {
        if (viewRef.current !== "landing" || playActive) return;
        e.preventDefault();
        enterPlaying();
        return;
      }
      if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        setDevOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [devOpen, playActive, enterPlaying]);

  useEffect(() => {
    if (!devOpen) return;
    const id = requestAnimationFrame(() => devFirstBtnRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [devOpen]);

  const sendDev = useCallback(
    async (body: DevEventRequestV1) => {
      setDevBusy(true);
      try {
        const r = await fetch("/dev/event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const t = await r.text();
        setLastEvent(`dev: ${r.status} ${t}`);
      } catch (e) {
        setLastEvent(`dev error: ${String(e)}`);
      } finally {
        setDevBusy(false);
      }
    },
    [setLastEvent]
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
          onPlay={handlePlay}
          visible={landingVisible}
        />
        <PlayingView visible={playingVisible} lastEventLine={lastEvent} />
      </div>

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

      {devOpen && (
        <div
          className="dev-strip"
          id="dev-controls-panel"
          role="region"
          aria-label="Developer controls"
        >
          <div className="dev-strip__row">
            <span className="dev-strip__hint">
              POST /dev/event (only when MYSTERY_DEV is set on the bridge)
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
                void sendDev(devEventRequest("tag", "dev-uid-001"));
              }}
            >
              Simulate tag
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
