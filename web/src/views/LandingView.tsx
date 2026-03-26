import { CharacterLogoStrip } from "../CharacterLogoStrip";
import { LandingBackdrop } from "../LandingBackdrop";
import { COPY } from "../strings";

type LandingViewProps = {
  scrollY: number;
  playActive: boolean;
  /** True while language picker is open (blocks repeat Play). */
  playBusy?: boolean;
  onPlay: () => void;
  /** When false, hero/below are visually hidden (playing view takes over). */
  visible: boolean;
};

export function LandingView({
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
        <section className="landing__hero-section" aria-label="Hero">
          <div className="landing__overlay landing__overlay--center">
            <div className="landing__hero">
              <h1 className="landing__title">
                <span className="landing__title-line">{COPY.titleLine1}</span>
                <span className="landing__title-line landing__title-line--accent">
                  {COPY.titleLine2}
                </span>
              </h1>
              <button
                type="button"
                className="landing__play"
                disabled={playActive || playBusy}
                title={COPY.playShortcutTitle}
                onClick={onPlay}
              >
                {playActive
                  ? COPY.playStarting
                  : playBusy
                    ? COPY.playChooseLanguage
                    : COPY.playLabel}
              </button>
            </div>
          </div>
        </section>
        <section
          className="landing__below"
          aria-labelledby="landing-below-heading"
        >
          <h2 id="landing-below-heading" className="landing__section-title">
            {COPY.belowTitle}
          </h2>
          <p className="landing__logo-strip-intro">{COPY.logoStripScrollIntro}</p>
          <CharacterLogoStrip variant="scroll" />
          <p>{COPY.belowP1}</p>
          <p>{COPY.belowP2}</p>
        </section>
      </main>
    </div>
  );
}
