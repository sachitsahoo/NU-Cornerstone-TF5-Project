import type { Lang } from "../gameContent";
import { t } from "../gameContent";

type LanguagePickerOverlayProps = {
  lang: Lang;
  pickerLang: Lang;
  holdProgress: number;
  onPick: (lang: Lang) => void;
  onClose: () => void;
};

export function LanguagePickerOverlay({
  lang,
  pickerLang,
  holdProgress,
  onPick,
  onClose,
}: LanguagePickerOverlayProps) {
  return (
    <div
      className="lang-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-overlay-title"
    >
      <button
        type="button"
        className="lang-overlay__scrim"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="lang-overlay__panel">
        <h2 id="lang-overlay-title" className="lang-overlay__title">
          {t(lang, "chooseLanguage")}
        </h2>
        <div className="lang-overlay__buttons">
          {(["en", "es"] as Lang[]).map((l) => {
            const isActive = pickerLang === l;
            const progress = isActive ? holdProgress : 0;
            return (
              <button
                key={l}
                type="button"
                className={`lang-overlay__btn${isActive ? " lang-overlay__btn--active" : ""}`}
                onClick={() => onPick(l)}
              >
                {progress > 0 && (
                  <span
                    className="lang-overlay__btn-fill"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                )}
                <span className="lang-overlay__btn-label">
                  {t(lang, l === "en" ? "langEnglish" : "langSpanish")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
