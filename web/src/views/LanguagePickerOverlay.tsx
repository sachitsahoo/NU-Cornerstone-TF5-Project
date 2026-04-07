import type { Lang } from "../gameContent";
import { t } from "../gameContent";

type LanguagePickerOverlayProps = {
  lang: Lang;
  pickerLang: Lang;
  holdProgress: number;
  /** True while the hold delay or 3s confirmation is armed — shows the fill track immediately. */
  holdTrackVisible?: boolean;
  onPick: (lang: Lang) => void;
};

export function LanguagePickerOverlay({
  lang,
  pickerLang,
  holdProgress,
  holdTrackVisible = false,
  onPick,
}: LanguagePickerOverlayProps) {
  return (
    <div
      className="lang-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-overlay-title"
    >
      <div className="lang-overlay__scrim" aria-hidden />
      <div className="lang-overlay__panel">
        <h2 id="lang-overlay-title" className="lang-overlay__title">
          {t(lang, "chooseLanguage")}
        </h2>
        <div className="lang-overlay__buttons">
          {(["en", "es"] as Lang[]).map((l) => {
            const isActive = pickerLang === l;
            const progress = isActive ? holdProgress : 0;
            const showHoldFill =
              isActive && (holdTrackVisible || progress > 0);
            const fillScale =
              progress > 0 ? progress : holdTrackVisible ? 0.03 : 0;
            return (
              <button
                key={l}
                type="button"
                className={`lang-overlay__btn${isActive ? " lang-overlay__btn--active" : ""}`}
                onClick={() => onPick(l)}
              >
                {showHoldFill && (
                  <span
                    className="lang-overlay__btn-fill"
                    style={{ transform: `scaleX(${fillScale})` }}
                  />
                )}
                <span className="lang-overlay__btn-label">
                  {t(lang, l === "en" ? "langEnglish" : "langSpanish")}
                </span>
              </button>
            );
          })}
        </div>
        <p className="lang-overlay__hint">{t(lang, "buttonTapHoldHint")}</p>
      </div>
    </div>
  );
}
