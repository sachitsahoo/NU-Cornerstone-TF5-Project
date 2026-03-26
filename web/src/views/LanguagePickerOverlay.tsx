import type { Lang } from "../gameContent";
import { t } from "../gameContent";

type LanguagePickerOverlayProps = {
  lang: Lang;
  onPick: (lang: Lang) => void;
  onClose: () => void;
};

export function LanguagePickerOverlay({
  lang,
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
          <button
            type="button"
            className="lang-overlay__btn"
            onClick={() => onPick("en")}
          >
            {t(lang, "langEnglish")}
          </button>
          <button
            type="button"
            className="lang-overlay__btn"
            onClick={() => onPick("es")}
          >
            {t(lang, "langSpanish")}
          </button>
        </div>
      </div>
    </div>
  );
}
