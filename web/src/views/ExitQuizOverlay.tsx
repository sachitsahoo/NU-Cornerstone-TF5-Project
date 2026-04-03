import { t, type ExitQuizContent, type Lang } from "../gameContent";

type ExitQuizPhase = "pick" | "feedback";

export type ExitQuizOverlayProps = {
  lang: Lang;
  phase: ExitQuizPhase;
  quiz: ExitQuizContent;
  highlightIndex: number;
  holdProgress: number;
  /** True while hold delay or hold fill is active — shows the track immediately. */
  holdTrackVisible?: boolean;
  feedbackCorrect: boolean;
  /** True while fading out before returning to the landing screen. */
  leaving?: boolean;
  onNextHome: () => void;
};

function FeedbackIconCorrect() {
  return (
    <svg
      className="exit-quiz__icon exit-quiz__icon--correct"
      viewBox="0 0 56 56"
      aria-hidden
    >
      <circle
        cx="28"
        cy="28"
        r="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.9"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 28.5l7.2 7.2L39.5 20"
      />
    </svg>
  );
}

function FeedbackIconIncorrect() {
  return (
    <svg
      className="exit-quiz__icon exit-quiz__icon--wrong"
      viewBox="0 0 56 56"
      aria-hidden
    >
      <circle
        cx="28"
        cy="28"
        r="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.85"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        d="M20 20l16 16M36 20L20 36"
      />
    </svg>
  );
}

function NextChevronIcon() {
  return (
    <svg
      className="exit-quiz__next-icon"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExitQuizOverlay({
  lang,
  phase,
  quiz,
  highlightIndex,
  holdProgress,
  holdTrackVisible = false,
  feedbackCorrect,
  leaving = false,
  onNextHome,
}: ExitQuizOverlayProps) {
  const panelMods = [
    "exit-quiz__panel",
    phase === "feedback" ? "exit-quiz__panel--feedback" : "",
    phase === "feedback" && feedbackCorrect
      ? "exit-quiz__panel--feedback-correct"
      : "",
    phase === "feedback" && !feedbackCorrect
      ? "exit-quiz__panel--feedback-incorrect"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`exit-quiz${leaving ? " exit-quiz--leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-quiz-title"
    >
      <div className="exit-quiz__scrim" aria-hidden />
      <div className="exit-quiz__backdrop-bloom" aria-hidden />
      <div className={panelMods}>
        {phase === "pick" ? (
          <>
            <p className="exit-quiz__eyebrow">{t(lang, "exitQuizEyebrow")}</p>
            <h2 id="exit-quiz-title" className="exit-quiz__title">
              {quiz.question}
            </h2>
            <div
              className="exit-quiz__choices"
              role="listbox"
              aria-label={quiz.question}
            >
              {quiz.choices.map((label, i) => {
                const isActive = highlightIndex === i;
                const progress = isActive ? holdProgress : 0;
                const showHoldFill =
                  isActive && (holdTrackVisible || progress > 0);
                const fillScale =
                  progress > 0 ? progress : holdTrackVisible ? 0.03 : 0;
                return (
                  <button
                    key={i}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`lang-overlay__btn${isActive ? " lang-overlay__btn--active" : ""}`}
                  >
                    {showHoldFill && (
                      <span
                        className="lang-overlay__btn-fill"
                        style={{ transform: `scaleX(${fillScale})` }}
                      />
                    )}
                    <span className="lang-overlay__btn-label">{label}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div
            className={`exit-quiz__feedback${feedbackCorrect ? " exit-quiz__feedback--celebrate" : " exit-quiz__feedback--oops"}`}
            aria-live="polite"
          >
            <div className="exit-quiz__feedback-icon-wrap">
              {feedbackCorrect ? <FeedbackIconCorrect /> : <FeedbackIconIncorrect />}
            </div>
            <h2
              id="exit-quiz-title"
              className={`exit-quiz__feedback-title${feedbackCorrect ? " exit-quiz__feedback-title--correct" : " exit-quiz__feedback-title--incorrect"}`}
            >
              {feedbackCorrect
                ? t(lang, "exitQuizCorrect")
                : t(lang, "exitQuizIncorrect")}
            </h2>
            <p
              className={`exit-quiz__feedback-blurb${feedbackCorrect ? " exit-quiz__feedback-blurb--correct" : " exit-quiz__feedback-blurb--incorrect"}`}
            >
              {feedbackCorrect
                ? quiz.feedbackCorrectBlurb
                : quiz.feedbackIncorrectBlurb}
            </p>
            <button
              type="button"
              className="exit-quiz__next"
              disabled={leaving}
              onClick={onNextHome}
            >
              <span className="exit-quiz__next-label">
                {t(lang, "exitQuizNextHome")}
              </span>
              <NextChevronIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
