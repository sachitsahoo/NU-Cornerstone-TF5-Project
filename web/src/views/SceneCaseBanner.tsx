import type { BostonCaseId } from "../bostonCaseIds";
import type { Lang } from "../lang";
import { sceneCaseCopy } from "../gameContent";
import { SceneRiverBanner } from "./SceneRiverBanner";

type SceneCaseBannerProps = {
  caseId: BostonCaseId;
  lang: Lang;
};

/** Charles River keeps the skyline photo; other cases use a themed placeholder panel. */
export function SceneCaseBanner({ caseId, lang }: SceneCaseBannerProps) {
  if (caseId === "charles_river") {
    return <SceneRiverBanner />;
  }
  const { sceneTitle, sceneDescriptor } = sceneCaseCopy(lang, caseId);
  return (
    <div
      className={`scene-case-banner scene-case-banner--${caseId}`}
      aria-hidden
    >
      <div className="scene-case-banner__inner">
        <p className="scene-case-banner__label">{sceneTitle}</p>
        <p className="scene-case-banner__descriptor">{sceneDescriptor}</p>
      </div>
    </div>
  );
}
