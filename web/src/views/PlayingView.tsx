import { CharacterLogoStrip } from "../CharacterLogoStrip";
import { COPY } from "../strings";

type PlayingViewProps = {
  visible: boolean;
  lastEventLine: string;
};

/** First gameplay screen — extend with story beats / RFID UI. */
export function PlayingView({ visible, lastEventLine }: PlayingViewProps) {
  return (
    <div
      className={`view-panel view-panel--playing${visible ? " view-panel--active" : ""}`}
      aria-hidden={!visible}
    >
      <main className="playing__main">
        <header className="playing__header">
          <p className="playing__eyebrow">{COPY.playingEyebrow}</p>
          <h1 className="playing__title">{COPY.playingTitle}</h1>
          <p className="playing__lede">{COPY.playingLede}</p>
        </header>
        <CharacterLogoStrip variant="playing" />
        <section className="playing__hud" aria-label="Live hardware events">
          <span className="playing__hud-label">{COPY.playingHudLabel}</span>
          <output className="playing__hud-value" title={lastEventLine}>
            {lastEventLine}
          </output>
        </section>
      </main>
    </div>
  );
}
