import bannerUrl from "../../../assets/images/Boston skyline at night.png?url";

/** Photo banner for the case screen (Boston skyline at night). Served from repo `assets/images/` so edits show in dev without syncing `public/`. */
export function SceneRiverBanner() {
  return (
    <div className="scene-river-banner" aria-hidden>
      <img
        className="scene-river-banner__img"
        src={bannerUrl}
        alt=""
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}
