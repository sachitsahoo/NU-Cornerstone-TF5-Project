import { useState, type CSSProperties } from "react";
import type { CharacterJson } from "../gameTypes";
import type { Lang } from "../gameContent";
import {
  cluesFor,
  funFactFor,
  imageSrc,
  solutionsFor,
  t,
} from "../gameContent";
import { COPY } from "../strings";
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
  characters: CharacterJson[];
  highlightUid: string | null;
  confirmOpen: boolean;
  scannedUid: string | null;
  reveal: RevealState | null;
  onContinueReveal: () => void;
  onSuspectSelect: (uid: string) => void;
};

const CLUE_ICONS: Array<"water" | "fish" | "car"> = ["water", "fish", "car"];

function ledStyle(led: readonly number[]): CSSProperties {
  const r = led[0] ?? 124;
  const g = led[1] ?? 92;
  const b = led[2] ?? 173;
  return {
    ["--char-led" as string]: `rgb(${r},${g},${b})`,
    ["--char-led-dim" as string]: `rgba(${r},${g},${b},0.22)`,
  };
}

function SuspectPortrait({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <SuspectSilhouette tint="#7c3aed" />;
  }
  return (
    <img
      className="scene-suspects__img"
      src={src}
      alt=""
      width={160}
      height={160}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function PlayingView({
  visible,
  lang,
  characters,
  highlightUid,
  confirmOpen,
  scannedUid,
  reveal,
  onContinueReveal: _onContinueReveal,
  onSuspectSelect,
}: PlayingViewProps) {
  void _onContinueReveal;
  const clues = cluesFor(lang);
  const funFact = funFactFor(lang);
  const solutions = solutionsFor(lang);

  const picked =
    scannedUid != null
      ? characters.find((c) => c.uid === scannedUid)
      : undefined;

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
                  {clues.map((line, i) => (
                    <li key={i} className="scene-clues-list__item">
                      <div className="scene-clues-list__lead">
                        <span className="scene-clues-list__idx" aria-hidden>
                          {i + 1}
                        </span>
                        <ClueGlyph kind={CLUE_ICONS[i] ?? "water"} />
                      </div>
                      <p className="scene-clues-list__text">{line}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="scene__suspects-row">
              <div className="scene-suspects" aria-label={COPY.logoStripAria}>
                {characters.map((c) => {
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
                        <SuspectPortrait src={imageSrc(c.image)} />
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

      {confirmOpen && picked && (
        <div
          className="game-modal game-modal--confirm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="game-modal__panel game-modal__panel--confirm">
            <div className="game-modal__accuse-hero">
              <div
                className="game-modal__accuse-portrait-wrap"
                style={ledStyle(picked.led_color)}
              >
                <span className="game-modal__accuse-pulse" aria-hidden />
                <img
                  className="game-modal__char-img game-modal__char-img--hero"
                  src={imageSrc(picked.image)}
                  data-uid={picked.uid}
                  alt=""
                  width={160}
                  height={160}
                  decoding="async"
                />
              </div>
              <div className="game-modal__char-id game-modal__char-id--hero">
                <p className="game-modal__accent">{picked.name}</p>
                <p className="game-modal__role">{picked.role}</p>
              </div>
            </div>

            <div className="game-modal__accuse-call">
              <h2 id="confirm-title" className="game-modal__title game-modal__title--accuse">
                {t(lang, "confirmTitle")}
              </h2>
              <p className="game-modal__body game-modal__body--accuse">
                {t(lang, "confirmBody")}
              </p>
              <p className="game-modal__hint game-modal__hint--quiet">
                {t(lang, "cancelHint")}
              </p>
            </div>

            <section
              className="game-modal__review-static"
              aria-label={t(lang, "reviewCase")}
            >
              <ul className="game-modal__case-clues-list game-modal__case-clues-list--cards">
                {clues.map((line, i) => (
                  <li key={i} className="game-modal__case-clue-chip">
                    <span className="game-modal__case-clue-idx">{i + 1}</span>
                    {line}
                  </li>
                ))}
              </ul>
              {picked.description && (
                <p className="game-modal__description">{picked.description}</p>
              )}
              {picked.suspicious_detail && (
                <div className="game-modal__clue-block">
                  <span className="game-modal__clue-label">
                    {t(lang, "suspiciousDetailLabel")}
                  </span>
                  <p className="game-modal__clue-text">
                    {picked.suspicious_detail}
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      )}

      {reveal && (
        <div
          className="game-modal game-modal--reveal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reveal-title"
        >
          <div className="game-modal__panel game-modal__panel--reveal-stage">
            <h2
              id="reveal-title"
              className={`game-modal__title game-modal__title--result${reveal.correct ? " is-correct" : " is-incorrect"}`}
            >
              {reveal.correct
                ? t(lang, "resultCorrect")
                : t(lang, "resultIncorrect")}
            </h2>

            {reveal.correct ? (
              <div
                className="reveal-spotlight reveal-spotlight--correct"
                style={ledStyle(reveal.picked.led_color)}
              >
                <img
                  className="reveal-spotlight__img"
                  src={imageSrc(reveal.picked.image)}
                  alt=""
                  width={140}
                  height={140}
                  decoding="async"
                />
                <p className="reveal-spotlight__name">{reveal.picked.name}</p>
                <p className="reveal-spotlight__explain">
                  {reveal.picked.culprit_explanation}
                </p>
              </div>
            ) : (
              <div className="reveal-compare">
                <section className="reveal-pick reveal-pick--muted" aria-label={t(lang, "yourPick")}>
                  <img
                    className="reveal-pick__img"
                    src={imageSrc(reveal.picked.image)}
                    alt=""
                    width={72}
                    height={72}
                    decoding="async"
                  />
                  <p className="reveal-pick__label">{t(lang, "yourPick")}</p>
                  <p className="reveal-pick__name">{reveal.picked.name}</p>
                  <p className="reveal-pick__explain">
                    {reveal.picked.innocent_explanation}
                  </p>
                </section>
                <div className="reveal-compare__divider" aria-hidden>
                  <span className="reveal-compare__chev">▼</span>
                </div>
                <section
                  className="reveal-spotlight reveal-spotlight--culprit"
                  style={ledStyle(reveal.culprit.led_color)}
                  aria-label={t(lang, "theRealAnswer")}
                >
                  <p className="reveal-spotlight__truth-label">
                    {t(lang, "theRealAnswer")}
                  </p>
                  <img
                    className="reveal-spotlight__img reveal-spotlight__img--large"
                    src={imageSrc(reveal.culprit.image)}
                    alt=""
                    width={120}
                    height={120}
                    decoding="async"
                  />
                  <p className="reveal-spotlight__name">{reveal.culprit.name}</p>
                  <p className="reveal-spotlight__explain reveal-spotlight__explain--hero">
                    {reveal.culprit.culprit_explanation}
                  </p>
                </section>
              </div>
            )}

            <section className="reveal-extra" aria-label={t(lang, "funFactLabel")}>
              <p className="reveal-extra__fun">{funFact}</p>
              <p className="reveal-extra__solutions-head">{t(lang, "solutionsLabel")}</p>
              <ul className="reveal-solutions">
                {solutions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            <p className="game-modal__hardware-hint" role="status">
              {t(lang, "continue")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
