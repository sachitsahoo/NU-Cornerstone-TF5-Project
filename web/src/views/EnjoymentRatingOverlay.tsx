import { t, type Lang } from "../gameContent";

export type EnjoymentRatingOverlayProps = {
  lang: Lang;
  /** Selected rating 1–5 (hardware: other button cycles). */
  stars: number;
  /** True while fading out before landing. */
  leaving?: boolean;
  onConfirm: () => void;
  /** Mouse / touch: pick a star count directly. */
  onSetStars: (n: number) => void;
};

function NextChevronIcon() {
  return (
    <svg
      className="enjoyment-rating__next-icon"
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

function StarGlyph({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`enjoyment-rating__star-glyph${filled ? " enjoyment-rating__star-glyph--filled" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 2l2.9 6.9L22 9.8l-5.5 4.2 2.1 6.9L12 17.8 5.4 20.9l2.1-6.9L2 9.8l7.1-.9L12 2z"
      />
    </svg>
  );
}

export function EnjoymentRatingOverlay({
  lang,
  stars,
  leaving = false,
  onConfirm,
  onSetStars,
}: EnjoymentRatingOverlayProps) {
  const safe = Math.min(5, Math.max(1, Math.round(stars)));

  return (
    <div
      className={`enjoyment-rating${leaving ? " enjoyment-rating--leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enjoyment-rating-title"
    >
      <div className="enjoyment-rating__scrim" aria-hidden />
      <div className="enjoyment-rating__backdrop-bloom" aria-hidden />
      <div className="enjoyment-rating__panel">
        <p className="enjoyment-rating__eyebrow">
          {t(lang, "enjoymentRatingEyebrow")}
        </p>
        <h2 id="enjoyment-rating-title" className="enjoyment-rating__title">
          {t(lang, "enjoymentRatingTitle")}
        </h2>
        <div
          className="enjoyment-rating__stars"
          role="radiogroup"
          aria-label={t(lang, "enjoymentRatingTitle")}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={safe === n}
              className={`enjoyment-rating__star-btn${safe === n ? " enjoyment-rating__star-btn--active" : ""}`}
              onClick={() => onSetStars(n)}
            >
              <StarGlyph filled={n <= safe} />
              <span className="enjoyment-rating__star-num">{n}</span>
            </button>
          ))}
        </div>
        <p className="enjoyment-rating__hint">{t(lang, "enjoymentRatingHint")}</p>
        <button
          type="button"
          className="enjoyment-rating__next"
          disabled={leaving}
          onClick={onConfirm}
        >
          <span className="enjoyment-rating__next-label">
            {t(lang, "enjoymentRatingContinue")}
          </span>
          <NextChevronIcon />
        </button>
      </div>
    </div>
  );
}
