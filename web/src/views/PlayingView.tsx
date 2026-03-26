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
import { RiverAnimation } from "./RiverAnimation";

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
  lastEventLine: string;
  showHud: boolean;
  onContinueReveal: () => void;
};

export function PlayingView({
  visible,
  lang,
  characters,
  highlightUid,
  confirmOpen,
  scannedUid,
  reveal,
  lastEventLine,
  showHud,
  onContinueReveal,
}: PlayingViewProps) {
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
        <div className="scene__main">
          <header className="scene__header">
            <p className="scene__eyebrow">{t(lang, "sceneEyebrow")}</p>
            <h1 className="scene__title">{t(lang, "sceneTitle")}</h1>
            <p className="scene__context">{t(lang, "sceneContext")}</p>
            <p className="scene__hint">{t(lang, "sceneHint")}</p>
          </header>

          <RiverAnimation />

          <div className="scene__lower">
            <div className="scene__glass scene__glass--suspects">
              <div className="scene-suspects" aria-label={COPY.logoStripAria}>
                {characters.map((c) => {
                  const active = highlightUid === c.uid;
                  return (
                    <figure
                      key={c.uid}
                      className={`scene-suspects__card${active ? " scene-suspects__card--active" : ""}`}
                    >
                      <div className="scene-suspects__portrait">
                        <img
                          className="scene-suspects__img"
                          src={imageSrc(c.image)}
                          alt=""
                          width={160}
                          height={160}
                          decoding="async"
                        />
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

            <aside className="scene__glass scene__glass--clues">
              <h2 className="scene__clues-title">{t(lang, "cluesTitle")}</h2>
              <ul className="scene__clues-list">
                {clues.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </aside>
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
            <div className="game-modal__char-header">
              <img
                className="game-modal__char-img"
                src={imageSrc(picked.image)}
                data-uid={picked.uid}
                alt=""
                width={72}
                height={72}
                decoding="async"
              />
              <div className="game-modal__char-id">
                <p className="game-modal__accent">{picked.name}</p>
                <p className="game-modal__role">{picked.role}</p>
              </div>
            </div>
            {picked.description && (
              <p className="game-modal__description">{picked.description}</p>
            )}
            {picked.suspicious_detail && (
              <div className="game-modal__clue-block">
                <span className="game-modal__clue-label">
                  {t(lang, "suspiciousDetailLabel")}
                </span>
                <p className="game-modal__clue-text">{picked.suspicious_detail}</p>
              </div>
            )}
            <div className="game-modal__action-box">
              <h2 id="confirm-title" className="game-modal__title">
                {t(lang, "confirmTitle")}
              </h2>
              <p className="game-modal__body">{t(lang, "confirmBody")}</p>
              <p className="game-modal__hint">{t(lang, "cancelHint")}</p>
            </div>
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
          <div className="game-modal__panel game-modal__panel--scroll">
            <h2
              id="reveal-title"
              className={`game-modal__title game-modal__title--result${reveal.correct ? " is-correct" : " is-incorrect"}`}
            >
              {reveal.correct
                ? t(lang, "resultCorrect")
                : t(lang, "resultIncorrect")}
            </h2>

            <section className="reveal-block">
              <h3 className="reveal-block__label">{t(lang, "yourPick")}</h3>
              <p className="reveal-block__text">{reveal.picked.name}</p>
              <p className="reveal-block__text muted">
                {reveal.correct
                  ? reveal.picked.culprit_explanation
                  : reveal.picked.innocent_explanation}
              </p>
            </section>

            {!reveal.correct && (
              <section className="reveal-block">
                <h3 className="reveal-block__label">
                  {t(lang, "theRealAnswer")} ({reveal.culprit.name})
                </h3>
                <p className="reveal-block__text">
                  {reveal.culprit.culprit_explanation}
                </p>
              </section>
            )}

            <section className="reveal-block">
              <h3 className="reveal-block__label fun">
                {t(lang, "funFactLabel")}
              </h3>
              <p className="reveal-block__text">{funFact}</p>
            </section>

            <section className="reveal-block">
              <h3 className="reveal-block__label">
                {t(lang, "solutionsLabel")}
              </h3>
              <ul className="reveal-solutions">
                {solutions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            <button
              type="button"
              className="game-modal__cta"
              onClick={onContinueReveal}
            >
              {t(lang, "continue")}
            </button>
          </div>
        </div>
      )}

      {showHud && (
        <section className="playing__hud" aria-label="Live hardware events">
          <span className="playing__hud-label">{COPY.playingHudLabel}</span>
          <output className="playing__hud-value" title={lastEventLine}>
            {lastEventLine}
          </output>
        </section>
      )}
    </div>
  );
}
