import { CharacterLogoStrip } from "../CharacterLogoStrip";
import { LandingBackdrop } from "../LandingBackdrop";
import { t, type Lang } from "../gameContent";

type LandingViewProps = {
  lang: Lang;
  scrollY: number;
  playActive: boolean;
  /** True while language picker is open (blocks repeat Play). */
  playBusy?: boolean;
  onPlay: () => void;
  /** When false, hero/below are visually hidden (playing view takes over). */
  visible: boolean;
};

export function LandingView({
  lang,
  scrollY,
  playActive,
  playBusy = false,
  onPlay,
  visible,
}: LandingViewProps) {
  return (
    <div
      className={`view-panel view-panel--landing${visible ? " view-panel--active" : ""}`}
      aria-hidden={!visible}
    >
      <LandingBackdrop scrollY={scrollY} />
      <main className="landing__main">
        <section
          className="landing__hero-section"
          aria-label={t(lang, "landingHeroAria")}
        >
          <div className="landing__overlay landing__overlay--center">
            <div className="landing__hero">
              <h1 className="landing__title">
                <span className="landing__title-line">
                  {t(lang, "landingTitleLine1")}
                </span>
                <span className="landing__title-line landing__title-line--accent">
                  {t(lang, "landingTitleLine2")}
                </span>
              </h1>
              <button
                type="button"
                className="landing__play"
                disabled={playActive || playBusy}
                title={t(lang, "playShortcutTitle")}
                onClick={onPlay}
              >
                {playActive
                  ? t(lang, "landingPlayStarting")
                  : playBusy
                    ? t(lang, "landingPlayChooseLanguage")
                    : t(lang, "landingPlayLabel")}
              </button>
            </div>
          </div>
        </section>
        <section
          className="landing__below"
          aria-labelledby="landing-below-heading"
        >
          <h2 id="landing-below-heading" className="landing__section-title">
            {t(lang, "landingBelowTitle")}
          </h2>
          <p className="landing__logo-strip-intro">
            {t(lang, "logoStripScrollIntro")}
          </p>
          <CharacterLogoStrip variant="scroll" lang={lang} />
          <p>{t(lang, "landingBelowP1")}</p>
          <p>{t(lang, "landingBelowP2")}</p>
        </section>
      </main>
    </div>
  );
}
