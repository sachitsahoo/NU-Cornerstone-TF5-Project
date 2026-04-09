import type { BostonCaseId, Lang } from "../gameContent";
import { exitFactsFor, t } from "../gameContent";

type SceneExitLoadingOverlayProps = {
  lang: Lang;
  activeCase: BostonCaseId;
  active: boolean;
  factIndex: number;
  durationMs: number;
};

export function SceneExitLoadingOverlay({
  lang,
  activeCase,
  active,
  factIndex,
  durationMs,
}: SceneExitLoadingOverlayProps) {
  if (!active) return null;

  const facts = exitFactsFor(lang, activeCase);
  const fact = facts[factIndex % facts.length] ?? "";
  const eyebrow = t(lang, "funFactLabel");

  return (
    <div
      className="scene-exit-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
      lang={lang}
      aria-label={`${eyebrow} ${fact}`}
    >
      <div className="scene-exit-loading__panel">
        <p className="scene-exit-loading__eyebrow">{eyebrow}</p>
        <p className="scene-exit-loading__fact" id="scene-exit-fact" key={factIndex}>
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
