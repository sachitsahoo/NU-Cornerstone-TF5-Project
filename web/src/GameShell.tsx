import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBridgeWebSocket } from "./hooks/useBridgeWebSocket";
import {
  charByUid,
  exitQuizFor,
  FALLBACK_CHARACTERS,
  filterDemoRoster,
  pickCulpritForRound,
  pickSceneSuspects,
  prepareSceneSuspects,
  riverExitFactsFor,
  SUSPECTS_PER_SCENE,
  type Lang,
} from "./gameContent";
import type { CharacterJson, CharactersApiResponse } from "./gameTypes";
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
import { ExitQuizOverlay } from "./views/ExitQuizOverlay";
import { SceneExitLoadingOverlay } from "./views/SceneExitLoadingOverlay";

/** Time the single fun-fact screen is shown before the exit quiz. */
const EXIT_FACT_READ_MS = 6000;
/** Full interstitial length = one beat per fact (EN/ES arrays stay same length). */
const EXIT_SCENE_LOAD_MS =
  riverExitFactsFor("en").length * EXIT_FACT_READ_MS;
/** Exit quiz overlay fade-out; keep in sync with `.exit-quiz` CSS transition. */
const EXIT_TO_HOME_ANIM_MS = 480;

/** Physical NeoPixel “billboard”: always lit — warm white idle, green/red for feedback. */
const LED_BILLBOARD_DEFAULT: [number, number, number] = [138, 0, 196];
const LED_FEEDBACK_CORRECT: [number, number, number] = [0, 255, 0];
const LED_FEEDBACK_WRONG: [number, number, number] = [255, 0, 0];

/** Dev chrome is English-only (not localized with exhibit language). */
const DEV_UI = {
  enableLabel: "Enable Dev",
  enableTooltip: "Enable developer tools",
  fabLabel: "Dev",
  toggleTitle: "Developer controls (shortcut D)",
  regionAria: "Developer controls",
  stripHint: "Simulate hardware events for local testing.",
  simButtonLegacy: "Simulate button (legacy)",
  simButtonDown: "Simulate button down",
  simButtonUp: "Simulate button up",
  simButton2Down: "Simulate button 2 down",
  simButton2Up: "Simulate button 2 up",
  simTagBacon: "Simulate tag (Bacon Hair)",
  simTagBallerina: "Simulate tag (Ballerina Cappuccina)",
  simTagTung: "Simulate tag (Tung)",
  simTagSpyderSammy: "Simulate tag (SpyderSammy)",
  simTagRemoved: "Simulate tag removed",
} as const;

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
  /** True from first button_down through hold delay + 3s confirm — drives immediate fill track. */
  const [holdCharging, setHoldCharging] = useState(false);
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

  /** Subset of `characters` shown for this round (always includes the culprit). */
  const [sceneSuspects, setSceneSuspects] = useState<CharacterJson[]>([]);
  const sceneSuspectsRef = useRef<CharacterJson[]>([]);
  sceneSuspectsRef.current = sceneSuspects;

  /** Empty = random culprit each play; set first uid to fix culprit for testing. */
  const [roundCulprits, setRoundCulprits] = useState<string[]>([]);
  const culpritUidRef = useRef<string>("bacon_hair");
  /** Synced with culpritUidRef for UI (case clues per culprit). */
  const [roundCulpritUid, setRoundCulpritUid] = useState<string>("bacon_hair");

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

  const [sceneExitLoading, setSceneExitLoading] = useState(false);
  const sceneExitLoadingRef = useRef(false);
  sceneExitLoadingRef.current = sceneExitLoading;

  const [exitFactIndex, setExitFactIndex] = useState(0);

  const [exitQuizPhase, setExitQuizPhase] = useState<"pick" | "feedback" | null>(
    null
  );
  const exitQuizPhaseRef = useRef<"pick" | "feedback" | null>(null);
  exitQuizPhaseRef.current = exitQuizPhase;

  const [quizHighlightIndex, setQuizHighlightIndex] = useState(0);
  const quizHighlightIndexRef = useRef(0);
  quizHighlightIndexRef.current = quizHighlightIndex;

  const [quizHoldProgress, setQuizHoldProgress] = useState(0);
  const [quizHoldCharging, setQuizHoldCharging] = useState(false);
  const [quizFeedbackCorrect, setQuizFeedbackCorrect] = useState(false);
  const [exitQuizLeaving, setExitQuizLeaving] = useState(false);
  /** One-shot after returning from exit quiz so landing can ease in. */
  const [landingEnterSettle, setLandingEnterSettle] = useState(false);

  const quizHoldDelayTimerRef = useRef<number | null>(null);
  const quizHoldRafRef = useRef<number | null>(null);
  const quizHoldConfirmTimerRef = useRef<number | null>(null);
  const quizHoldStartRef = useRef<number | null>(null);
  const quizPickerOpenedThisPressRef = useRef(false);

  const exitToLandingAnimTimerRef = useRef<number | null>(null);
  const exitToLandingAnimLockRef = useRef(false);

  const confirmTimerRef = useRef<number | null>(null);

  const sendLed = useCallback((r: number, g: number, b: number) => {
    void fetch("/api/led", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ r, g, b }),
    });
  }, []);

  /** Exhibit strip stays on at default warmth whenever we are not showing per-suspect or feedback colors. */
  const sendBillboardDefault = useCallback(() => {
    const [r, g, b] = LED_BILLBOARD_DEFAULT;
    sendLed(r, g, b);
  }, [sendLed]);

  useEffect(() => {
    sendBillboardDefault();
  }, [sendBillboardDefault]);

  const clearConfirmTimer = useCallback(() => {
    if (confirmTimerRef.current != null) {
      window.clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = null;
    }
  }, []);

  const cancelQuizHold = useCallback(() => {
    if (quizHoldDelayTimerRef.current != null) {
      window.clearTimeout(quizHoldDelayTimerRef.current);
      quizHoldDelayTimerRef.current = null;
    }
    if (quizHoldRafRef.current != null) {
      cancelAnimationFrame(quizHoldRafRef.current);
      quizHoldRafRef.current = null;
    }
    if (quizHoldConfirmTimerRef.current != null) {
      window.clearTimeout(quizHoldConfirmTimerRef.current);
      quizHoldConfirmTimerRef.current = null;
    }
    quizHoldStartRef.current = null;
    setQuizHoldProgress(0);
    setQuizHoldCharging(false);
  }, []);

  const selectSuspectByUid = useCallback(
    (uid: string) => {
      if (sceneExitLoadingRef.current) return;
      if (exitQuizPhaseRef.current) return;
      if (revealRef.current) return;
      if (viewRef.current !== "playing") return;
      if (!sceneSuspectsRef.current.some((c) => c.uid === uid)) return;
      const roster =
        charactersRef.current.length > 0
          ? charactersRef.current
          : FALLBACK_CHARACTERS;
      const char = charByUid(roster, uid);
      if (!char) return;
      const [r, g, b] = char.led_color;
      sendLed(r, g, b);
      clearConfirmTimer();
      const dossierWasOpen = confirmOpenRef.current;
      setScannedUid(uid);
      scannedUidRef.current = uid;
      setHighlightUid(uid);
      if (dossierWasOpen) {
        return;
      }
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
    setHoldCharging(false);
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        const r = await fetch("/api/characters");
        if (!r.ok) {
          setCharacters(FALLBACK_CHARACTERS);
          setRoundCulprits([]);
          return;
        }
        const data = (await r.json()) as CharactersApiResponse;
        setCharacters(data.characters);
        setRoundCulprits(data.round_culprits);
      } catch {
        setCharacters(FALLBACK_CHARACTERS);
        setRoundCulprits([]);
      }
    })();
  }, []);

  const onLanguagePick = useCallback(
    (next: Lang) => {
      cancelHold();
      setLang(next);
      setLangPickerOpen(false);
      langPickerOpenRef.current = false;
      const roster = filterDemoRoster(
        characters.length > 0 ? characters : FALLBACK_CHARACTERS
      );
      const cul = pickCulpritForRound(roster, roundCulprits);
      culpritUidRef.current = cul;
      setRoundCulpritUid(cul);
      const picked = prepareSceneSuspects(
        pickSceneSuspects(roster, cul).slice(0, SUSPECTS_PER_SCENE),
        cul
      );
      sceneSuspectsRef.current = picked;
      setSceneSuspects(picked);
      setPlayActive(true);
      setView("playing");
      viewRef.current = "playing";
      sendBillboardDefault();
      window.dispatchEvent(new CustomEvent("polluter:play"));
    },
    [cancelHold, characters, sendBillboardDefault, roundCulprits]
  );

  const HOLD_MS = 800;

  /** Exit-quiz MCQ: fill duration for hold-to-confirm. */
  const QUIZ_HOLD_MS = 1000;

  const startHold = useCallback(() => {
    cancelHold();
    setHoldCharging(true);
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

  const startQuizHold = useCallback(() => {
    cancelQuizHold();
    setQuizHoldCharging(true);
    const start = Date.now();
    quizHoldStartRef.current = start;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / QUIZ_HOLD_MS, 1);
      setQuizHoldProgress(progress);
      if (progress < 1) {
        quizHoldRafRef.current = requestAnimationFrame(tick);
      }
    };
    quizHoldRafRef.current = requestAnimationFrame(tick);

    quizHoldConfirmTimerRef.current = window.setTimeout(() => {
      quizHoldRafRef.current = null;
      setQuizHoldProgress(1);
      const q = exitQuizFor(lang);
      const correct = quizHighlightIndexRef.current === q.correctIndex;
      setExitQuizPhase("feedback");
      exitQuizPhaseRef.current = "feedback";
      cancelQuizHold();
      setQuizFeedbackCorrect(correct);
      if (correct) {
        const [r, g, b] = LED_FEEDBACK_CORRECT;
        sendLed(r, g, b);
      } else {
        const [r, g, b] = LED_FEEDBACK_WRONG;
        sendLed(r, g, b);
      }
    }, QUIZ_HOLD_MS);
  }, [cancelQuizHold, sendLed, lang]);

  const submitReveal = useCallback(() => {
    const uid = scannedUidRef.current;
    if (!uid || !confirmOpenRef.current) return;
    const roster =
      charactersRef.current.length > 0
        ? charactersRef.current
        : FALLBACK_CHARACTERS;
    const picked = charByUid(roster, uid);
    const cul = charByUid(roster, culpritUidRef.current);
    if (!picked || !cul) return;
    const correct = picked.uid === cul.uid;
    setReveal({ correct, picked, culprit: cul });
    confirmOpenRef.current = false;
    setConfirmOpen(false);
    clearConfirmTimer();
    if (correct) {
      const [r, g, b] = LED_FEEDBACK_CORRECT;
      sendLed(r, g, b);
    } else {
      const [r, g, b] = LED_FEEDBACK_WRONG;
      sendLed(r, g, b);
    }
  }, [clearConfirmTimer, sendLed]);

  const openExitQuizAfterFunFacts = useCallback(() => {
    setSceneExitLoading(false);
    sceneExitLoadingRef.current = false;
    setExitQuizPhase("pick");
    exitQuizPhaseRef.current = "pick";
    setQuizHighlightIndex(0);
    quizHighlightIndexRef.current = 0;
    setQuizHoldProgress(0);
    setQuizFeedbackCorrect(false);
    // Quiz opens on a timer (not from a button press)—don't eat the first down/up.
    quizPickerOpenedThisPressRef.current = false;
    exitToLandingAnimLockRef.current = false;
    setExitQuizLeaving(false);
    if (exitToLandingAnimTimerRef.current != null) {
      window.clearTimeout(exitToLandingAnimTimerRef.current);
      exitToLandingAnimTimerRef.current = null;
    }
    sendBillboardDefault();
  }, [sendBillboardDefault]);

  const applyRevealExitToLanding = useCallback(() => {
    setSceneExitLoading(false);
    sceneExitLoadingRef.current = false;
    setExitQuizPhase(null);
    exitQuizPhaseRef.current = null;
    cancelQuizHold();
    sendBillboardDefault();
    setView("landing");
    viewRef.current = "landing";
    setPlayActive(false);
    // Clear await: if we set true here, a release during the prior exit animation
    // leaves no button_up, so button_down stays blocked on landing/playing.
    awaitingButtonUpRef.current = false;
    setLandingEnterSettle(true);
    window.setTimeout(() => setLandingEnterSettle(false), 620);
  }, [cancelQuizHold, sendBillboardDefault]);

  const beginExitToLandingWithAnimation = useCallback(() => {
    if (exitToLandingAnimLockRef.current) return;
    if (exitQuizPhaseRef.current !== "feedback") return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      applyRevealExitToLanding();
      return;
    }
    exitToLandingAnimLockRef.current = true;
    setExitQuizLeaving(true);
    if (exitToLandingAnimTimerRef.current != null) {
      window.clearTimeout(exitToLandingAnimTimerRef.current);
    }
    exitToLandingAnimTimerRef.current = window.setTimeout(() => {
      exitToLandingAnimTimerRef.current = null;
      setExitQuizLeaving(false);
      exitToLandingAnimLockRef.current = false;
      applyRevealExitToLanding();
    }, EXIT_TO_HOME_ANIM_MS);
  }, [applyRevealExitToLanding]);

  const onContinueReveal = useCallback(() => {
    setReveal(null);
    revealRef.current = null;
    clearConfirmTimer();
    setScannedUid(null);
    scannedUidRef.current = null;
    setHighlightUid(null);
    confirmOpenRef.current = false;
    setConfirmOpen(false);
    sendBillboardDefault();
    setPlayActive(false);
    setExitFactIndex(0);
    setSceneExitLoading(true);
    sceneExitLoadingRef.current = true;
  }, [clearConfirmTimer, sendBillboardDefault]);

  useEffect(() => {
    if (!sceneExitLoading) return undefined;
    const n = riverExitFactsFor(lang).length;
    const tick = window.setInterval(() => {
      setExitFactIndex((i) => (n > 0 ? (i + 1) % n : 0));
    }, EXIT_FACT_READ_MS);
    const done = window.setTimeout(() => {
      window.clearInterval(tick);
      openExitQuizAfterFunFacts();
    }, EXIT_SCENE_LOAD_MS);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [sceneExitLoading, lang, openExitQuizAfterFunFacts]);

  const onBridgeMessage = useCallback(
    (msg: BridgeMessage) => {
      if (msg.type === "status") return;

      if (exitQuizPhaseRef.current) {
        const phase = exitQuizPhaseRef.current;
        if (msg.type === "tag" || msg.type === "tag_removed") {
          return;
        }
        if (phase === "feedback") {
          if (msg.type === "button_down") {
            beginExitToLandingWithAnimation();
            awaitingButtonUpRef.current = true;
            return;
          }
          if (msg.type === "button") {
            beginExitToLandingWithAnimation();
            return;
          }
          if (msg.type === "button_up") {
            awaitingButtonUpRef.current = false;
            return;
          }
          return;
        }
        if (phase === "pick") {
          if (msg.type === "button_down") {
            if (awaitingButtonUpRef.current) return;
            if (quizPickerOpenedThisPressRef.current) {
              quizPickerOpenedThisPressRef.current = false;
              return;
            }
            // Single press confirms — no hold required
            const q = exitQuizFor(lang);
            const correct = quizHighlightIndexRef.current === q.correctIndex;
            setExitQuizPhase("feedback");
            exitQuizPhaseRef.current = "feedback";
            setQuizFeedbackCorrect(correct);
            if (correct) {
              const [r, g, b] = LED_FEEDBACK_CORRECT;
              sendLed(r, g, b);
            } else {
              const [r, g, b] = LED_FEEDBACK_WRONG;
              sendLed(r, g, b);
            }
            return;
          }
          if (msg.type === "button_up") {
            awaitingButtonUpRef.current = false;
            if (quizPickerOpenedThisPressRef.current) {
              quizPickerOpenedThisPressRef.current = false;
            } else if (
              quizHoldDelayTimerRef.current != null ||
              quizHoldStartRef.current != null
            ) {
              cancelQuizHold();  // cancel in-progress hold; no cycle here — use Button 2
            }
            return;
          }
          if (msg.type === "button" || msg.type === "button2_down") {
            const next = (quizHighlightIndexRef.current + 1) % 4;
            setQuizHighlightIndex(next);
            quizHighlightIndexRef.current = next;
            return;
          }
          // Don't catch-all return — let other event types (e.g. future button types) fall through
        }
      }

      // ─── Button 2: cycle / switch only ───
      if (msg.type === "button2_down") {
        // Exit quiz pick phase: cycle MCQ answer
        if (exitQuizPhaseRef.current === "pick") {
          const next = (quizHighlightIndexRef.current + 1) % 4;
          setQuizHighlightIndex(next);
          quizHighlightIndexRef.current = next;
          return;
        }
        // Landing with picker open: cycle language
        if (viewRef.current === "landing" && langPickerOpenRef.current) {
          const next: Lang = pickerLangRef.current === "en" ? "es" : "en";
          setPickerLang(next);
          pickerLangRef.current = next;
          return;
        }
        return;
      }

      if (msg.type === "button_down") {
        if (revealRef.current) {
          onContinueReveal();
          return;
        }
        if (awaitingButtonUpRef.current) return;
        if (viewRef.current === "landing") {
          if (!langPickerOpenRef.current) {
            // Opening picker — only on the first down of this press
            if (!pickerOpenedThisPressRef.current) {
              pickerOpenedThisPressRef.current = true;
              setLangPickerOpen(true);
              langPickerOpenRef.current = true;
            }
          } else {
            // Picker already open — single press confirms the selected language
            pickerOpenedThisPressRef.current = false;
            onLanguagePick(pickerLangRef.current);
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
            cancelHold();  // cancel in-progress hold; no cycle here — use Button 2
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
        if (revealRef.current) {
          onContinueReveal();
          return;
        }
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
        sendBillboardDefault();
      }
    },
    [
      clearConfirmTimer,
      submitReveal,
      sendLed,
      sendBillboardDefault,
      startHold,
      cancelHold,
      cancelQuizHold,
      startQuizHold,
      beginExitToLandingWithAnimation,
      onContinueReveal,
      selectSuspectByUid,
    ]
  );

  useBridgeWebSocket(onBridgeMessage);

  useEffect(() => {
    return () => {
      if (exitToLandingAnimTimerRef.current != null) {
        window.clearTimeout(exitToLandingAnimTimerRef.current);
      }
    };
  }, []);

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
      setHoldCharging(false);
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
        let msg: BridgeMessage;
        if (body.type === "tag") {
          msg = { type: "tag", uid: body.uid, schema };
        } else if (body.type === "button") {
          msg = { type: "button", schema };
        } else if (body.type === "button_down") {
          msg = { type: "button_down", schema };
        } else if (body.type === "button_up") {
          msg = { type: "button_up", schema };
        } else {
          msg = { type: "tag_removed", schema };
        }
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
        // Don't await body — WS delivers the event; draining the body would only add latency.
        void r.text();
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

  const devPortalRoot =
    typeof document !== "undefined" ? document.body : null;

  const devChromePortal =
    devPortalRoot &&
    createPortal(
      <div className="game-shell__dev-portal-root">
        {import.meta.env.DEV && !hideDevUi && !debugMode && (
          <button
            type="button"
            className="game-shell__debug-entry"
            onClick={enableDebugMode}
            title={DEV_UI.enableTooltip}
          >
            {DEV_UI.enableLabel}
          </button>
        )}

        {showDevChrome && (
          <button
            type="button"
            className="game-shell__dev-fab"
            aria-expanded={devOpen}
            aria-controls={devOpen ? "dev-controls-panel" : undefined}
            title={DEV_UI.toggleTitle}
            onClick={() => setDevOpen((v) => !v)}
          >
            {DEV_UI.fabLabel}
          </button>
        )}

        {showDevChrome && devOpen && (
          <div
            className="dev-strip dev-strip--portal"
            id="dev-controls-panel"
            role="region"
            aria-label={DEV_UI.regionAria}
          >
            <div className="dev-strip__row">
              <span className="dev-strip__hint">
                {DEV_UI.stripHint}
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
                {DEV_UI.simButtonLegacy}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("button_down"));
                }}
              >
                {DEV_UI.simButtonDown}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("button_up"));
                }}
              >
                {DEV_UI.simButtonUp}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("button2_down"));
                }}
              >
                {DEV_UI.simButton2Down}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("button2_up"));
                }}
              >
                {DEV_UI.simButton2Up}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("tag", "bacon_hair"));
                }}
              >
                {DEV_UI.simTagBacon}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("tag", "ballerina_cappuccina"));
                }}
              >
                {DEV_UI.simTagBallerina}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("tag", "tung"));
                }}
              >
                {DEV_UI.simTagTung}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("tag", "spyder_sammy"));
                }}
              >
                {DEV_UI.simTagSpyderSammy}
              </button>
              <button
                type="button"
                className="dev-strip__btn"
                disabled={devBusy}
                onClick={() => {
                  void sendDev(devEventRequest("tag_removed"));
                }}
              >
                {DEV_UI.simTagRemoved}
              </button>
            </div>
          </div>
        )}
      </div>,
      devPortalRoot
    );

  return (
    <div
      className={`game-shell landing game-shell--${view}${
        landingEnterSettle && view === "landing"
          ? " game-shell--landing-settle"
          : ""
      }`}
      data-view={view}
    >
      <div className="view-stack">
        <LandingView
          lang={lang}
          scrollY={scrollY}
          playActive={playActive}
          onPlay={handlePlayClick}
          visible={landingVisible}
          playBusy={langPickerOpen}
        />
        <PlayingView
          visible={playingVisible}
          lang={lang}
          culpritUid={roundCulpritUid}
          characters={sceneSuspects}
          highlightUid={highlightUid}
          confirmOpen={confirmOpen}
          scannedUid={scannedUid}
          reveal={reveal}
          onContinueReveal={onContinueReveal}
          onSuspectSelect={selectSuspectByUid}
        />
      </div>

      <SceneExitLoadingOverlay
        lang={lang}
        active={sceneExitLoading}
        factIndex={exitFactIndex}
        durationMs={EXIT_SCENE_LOAD_MS}
      />

      {exitQuizPhase && (
        <ExitQuizOverlay
          lang={lang}
          phase={exitQuizPhase}
          quiz={exitQuizFor(lang)}
          highlightIndex={quizHighlightIndex}
          holdProgress={quizHoldProgress}
          holdTrackVisible={quizHoldCharging}
          feedbackCorrect={quizFeedbackCorrect}
          leaving={exitQuizLeaving}
          onNextHome={beginExitToLandingWithAnimation}
        />
      )}

      {langPickerOpen && landingVisible && (
        <LanguagePickerOverlay
          lang={lang}
          pickerLang={pickerLang}
          holdProgress={holdProgress}
          holdTrackVisible={holdCharging}
          onPick={onLanguagePick}
        />
      )}

      {devChromePortal}
    </div>
  );
}
