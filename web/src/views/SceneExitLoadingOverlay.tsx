import type { Lang } from "../gameContent";
import { riverExitFactsFor, t } from "../gameContent";

type SceneExitLoadingOverlayProps = {
  lang: Lang;
  active: boolean;
  factIndex: number;
  durationMs: number;
};

export function SceneExitLoadingOverlay({
  lang,
  active,
  factIndex,
  durationMs,
}: SceneExitLoadingOverlayProps) {
  if (!active) return null;

  const facts = riverExitFactsFor(lang);
  const fact = facts[factIndex % facts.length] ?? "";

  return (
    <div
      className="scene-exit-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={t(lang, "sceneExitTitle")}
    >
      <div className="scene-exit-loading__panel">
        <p className="scene-exit-loading__eyebrow">{t(lang, "funFactLabel")}</p>
        <h2 className="scene-exit-loading__title" id="scene-exit-title">
          {t(lang, "sceneExitTitle")}
        </h2>
        <p className="scene-exit-loading__fact" key={factIndex}>
          {fact}
        </p>
        <div className="scene-exit-loading__bar" aria-hidden>
          <div
            className="scene-exit-loading__bar-fill"
            style={{ animationDuration: `${durationMs}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
