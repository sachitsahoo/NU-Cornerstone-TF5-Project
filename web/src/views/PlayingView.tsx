import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { CharacterJson } from "../gameTypes";
import type { CaseClueItem, Lang } from "../gameContent";
import {
  imageSrc,
  localizeCharacter,
  SUSPECTS_PER_SCENE,
  t,
} from "../gameContent";
import { ClueGlyph, SuspectSilhouette } from "./PlayingGlyphs";
import { SceneRiverBanner } from "./SceneRiverBanner";

type RevealState = {
  correct: boolean;
  picked: CharacterJson;
  culprit: CharacterJson;
};

type PlayingViewProps = {
  visible: boolean;
  lang: Lang;
  /** Three case lines + icons for this scene (built with scene RNG in GameShell). */
  caseClues: CaseClueItem[];
  characters: CharacterJson[];
  highlightUid: string | null;
  confirmOpen: boolean;
  scannedUid: string | null;
  reveal: RevealState | null;
  onContinueReveal: () => void;
  onSuspectSelect: (uid: string) => void;
};

function firstSentences(text: string, maxSentences = 2): string {
  const t = text.trim();
  if (!t) return "";
  const parts = t.split(/(?<=[.!?])\s+/).filter((s) => s.length > 0);
  if (parts.length <= maxSentences) return parts.join(" ");
  return parts.slice(0, maxSentences).join(" ");
}

function PortraitOrSilhouette({
  src,
  className,
  width,
  height,
  dataUid,
}: {
  src: string;
  className: string;
  width?: number;
  height?: number;
  dataUid?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src.trim() || failed) {
    return (
      <SuspectSilhouette
        tint="#7c3aed"
        className={`scene-suspects__silhouette ${className}`.trim()}
      />
    );
  }
  return (
    <img
      className={className}
      src={imageSrc(src)}
      data-uid={dataUid}
      alt=""
      width={width}
      height={height}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function SuspectPortrait({ src }: { src: string }) {
  return (
    <PortraitOrSilhouette
      src={src}
      className="scene-suspects__img"
      width={160}
      height={160}
    />
  );
}

export function PlayingView({
  visible,
  lang,
  caseClues,
  characters,
  highlightUid,
  confirmOpen,
  scannedUid,
  reveal,
  onContinueReveal,
  onSuspectSelect,
}: PlayingViewProps) {
  const cast = useMemo(() => {
    const row = characters.slice(0, SUSPECTS_PER_SCENE);
    return row.map((c) => localizeCharacter(c, lang));
  }, [characters, lang]);

  const picked =
    scannedUid != null ? cast.find((c) => c.uid === scannedUid) : undefined;

  const revealDisplay = useMemo(() => {
    if (!reveal) return null;
    return {
      correct: reveal.correct,
      picked: localizeCharacter(reveal.picked, lang),
      culprit: localizeCharacter(reveal.culprit, lang),
    };
  }, [reveal, lang]);

  return (
    <div
      className={`view-panel view-panel--playing${visible ? " view-panel--active" : ""}`}
      aria-hidden={!visible}
    >
      <div className="scene">
        <div className="scene__backdrop" aria-hidden />
        <div className="scene__shell scene__shell--wide">
          <header className="scene__topbar">
            <div className="scene__topbar-left">
              <h1 className="scene__topbar-title">{t(lang, "sceneTitle")}</h1>
            </div>
            <div className="scene__topbar-status" role="status">
              <span className="scene__topbar-dot" aria-hidden />
              <span className="scene__topbar-status-text">
                {t(lang, "investigationActive")}
              </span>
            </div>
          </header>

          <div className="scene__split">
            <div className="scene__river-wrap">
              <SceneRiverBanner />
              {confirmOpen && picked && (
                <div
                  className="scene-river-confirm"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="confirm-title"
                >
                  <div className="game-modal__panel game-modal__panel--confirm">
                    <div className="game-modal__confirm-sheet">
                      <div className="game-modal__confirm-inner">
                        <div
                          key={picked.uid}
                          className="game-modal__confirm-dossier-swap"
                        >
                        <div className="game-modal__confirm-columns">
                          <div className="game-modal__confirm-col game-modal__confirm-col--left">
                            <div
                              className="game-modal__confirm-portrait-ring"
                              aria-hidden
                            >
                              <div className="game-modal__confirm-portrait-crop">
                                <PortraitOrSilhouette
                                  src={picked.image}
                                  className="game-modal__confirm-portrait-img"
                                  dataUid={picked.uid}
                                />
                              </div>
                            </div>
                            <p className="game-modal__confirm-name">{picked.name}</p>
                            <p className="game-modal__confirm-role">{picked.role}</p>
                          </div>
                          <div className="game-modal__confirm-col game-modal__confirm-col--right">
                            {picked.description ? (
                              <div className="game-modal__confirm-fact">
                                <h3 className="game-modal__confirm-fact-label">
                                  {t(lang, "dossierAboutLabel")}
                                </h3>
                                <p className="game-modal__confirm-fact-text">
                                  {picked.description}
                                </p>
                              </div>
                            ) : null}
                            {picked.suspicious_detail ? (
                              <div className="game-modal__confirm-fact">
                                <h3 className="game-modal__confirm-fact-label">
                                  {t(lang, "dossierSuspiciousHeading")}
                                </h3>
                                <p className="game-modal__confirm-fact-text">
                                  {picked.suspicious_detail}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <h2
                          id="confirm-title"
                          className="game-modal__confirm-action"
                        >
                          {t(lang, "confirmTitle")}
                        </h2>
                        <p className="game-modal__confirm-muted">
                          {t(lang, "cancelHint")}
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <aside
              className="scene__col scene__col--clues"
              aria-label={t(lang, "cluesTitle")}
            >
              <div className="scene-clues-panel">
                <div className="scene-clues__intro">
                  <p className="scene-clues__lede">{t(lang, "sceneContext")}</p>
                  <p className="scene-clues__hint">{t(lang, "sceneHint")}</p>
                </div>
                <ol className="scene-clues-list">
                  {caseClues.map((item, i) => (
                    <li
                      key={`${item.glyph}-${item.text.slice(0, 24)}`}
                      className="scene-clues-list__item"
                    >
                      <div className="scene-clues-list__lead">
                        <span className="scene-clues-list__idx" aria-hidden>
                          {i + 1}
                        </span>
                        <ClueGlyph kind={item.glyph} />
                      </div>
                      <p className="scene-clues-list__text">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="scene__suspects-row">
              <div className="scene-suspects" aria-label={t(lang, "logoStripAria")}>
                {cast.map((c) => {
                  const active = highlightUid === c.uid;
                  return (
                    <figure
                      key={c.uid}
                      role="button"
                      tabIndex={0}
                      className={`scene-suspects__card scene-suspects__card--pick${active ? " scene-suspects__card--active" : ""}`}
                      onClick={() => onSuspectSelect(c.uid)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSuspectSelect(c.uid);
                        }
                      }}
                    >
                      <div className="scene-suspects__portrait">
                        <SuspectPortrait src={c.image} />
                      </div>
                      <figcaption className="scene-suspects__name">
                        {c.name}
                      </figcaption>
                      <span className="scene-suspects__role">{c.role}</span>
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {revealDisplay &&
        createPortal(
          <div
            className="game-modal game-modal--reveal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reveal-title"
          >
            <div className="game-modal__panel game-modal__panel--reveal-stage">
              <h2
                id="reveal-title"
                className={`game-modal__title game-modal__title--result${revealDisplay.correct ? " is-correct" : " is-incorrect"}`}
              >
                {!revealDisplay.correct && (
                  <span
                    className="game-modal__title-mark game-modal__title-mark--wrong"
                    aria-hidden="true"
                  >
                    ✗
                  </span>
                )}
                <span className="game-modal__title-text">
                  {revealDisplay.correct
                    ? t(lang, "resultCorrect")
                    : t(lang, "resultIncorrect")}
                </span>
              </h2>

              {revealDisplay.correct ? (
                <div className="reveal-spotlight reveal-spotlight--correct">
                  <PortraitOrSilhouette
                    src={revealDisplay.picked.image}
                    className="reveal-spotlight__img"
                    width={88}
                    height={88}
                  />
                  <p className="reveal-spotlight__name">
                    {revealDisplay.picked.name}
                  </p>
                  <p className="reveal-spotlight__explain">
                    {firstSentences(revealDisplay.picked.culprit_explanation, 1)}
                  </p>
                </div>
              ) : (
                <div className="reveal-compare">
                  <section
                    className="reveal-pick reveal-pick--wrong"
                    aria-label={t(lang, "yourPick")}
                  >
                    <span
                      className="reveal-card-mark reveal-card-mark--wrong"
                      aria-hidden="true"
                    >
                      ✗
                    </span>
                    <PortraitOrSilhouette
                      src={revealDisplay.picked.image}
                      className="reveal-pick__img"
                      width={72}
                      height={72}
                    />
                    <p className="reveal-pick__label">{t(lang, "yourPick")}</p>
                    <p className="reveal-pick__name">
                      {revealDisplay.picked.name}
                    </p>
                    <p className="reveal-pick__explain">
                      {firstSentences(
                        revealDisplay.picked.innocent_explanation,
                        1,
                      )}
                    </p>
                  </section>
                  <section
                    className="reveal-spotlight reveal-spotlight--culprit"
                    aria-label={t(lang, "theRealAnswer")}
                  >
                    <div className="reveal-spotlight__truth-head">
                      <span
                        className="reveal-card-mark reveal-card-mark--right"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <p className="reveal-spotlight__truth-label">
                        {t(lang, "theRealAnswer")}
                      </p>
                    </div>
                    <PortraitOrSilhouette
                      src={revealDisplay.culprit.image}
                      className="reveal-spotlight__img reveal-spotlight__img--culprit"
                      width={80}
                      height={80}
                    />
                    <p className="reveal-spotlight__name">
                      {revealDisplay.culprit.name}
                    </p>
                    <p className="reveal-spotlight__explain reveal-spotlight__explain--hero">
                      {firstSentences(
                        revealDisplay.culprit.culprit_explanation,
                        1,
                      )}
                    </p>
                  </section>
                </div>
              )}

              <button
                type="button"
                className="game-modal__hardware-hint"
                onClick={onContinueReveal}
              >
                {t(lang, "revealPlayAgain")}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
