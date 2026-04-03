import { imageSrc } from "../gameContent";

const RIVER_SKYLINE = "assets/images/Boston skyline at night.png";

/** Photo banner for the case screen (Boston skyline at night). */
export function SceneRiverBanner() {
  return (
    <div className="scene-river-banner" aria-hidden>
      <img
        className="scene-river-banner__img"
        src={imageSrc(RIVER_SKYLINE)}
        alt=""
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}
