import type { BostonCaseId } from "../bostonCaseIds";
import bostonCommonUrl from "../../../assets/images/BostonCommonBackground.png?url";
import revereBeachUrl from "../../../assets/images/RevereBeachBackground.png?url";
import southEndUrl from "../../../assets/images/SouthEndSceneIMage.png?url";
import { SceneRiverBanner } from "./SceneRiverBanner";

type SceneCaseBannerProps = {
  caseId: BostonCaseId;
};

const CASE_BANNER_URL: Record<
  Exclude<BostonCaseId, "charles_river">,
  string
> = {
  boston_common: bostonCommonUrl,
  south_end: southEndUrl,
  revere_beach: revereBeachUrl,
};

/** Charles River uses the skyline photo; other cases use full-bleed art from `assets/images/`. */
export function SceneCaseBanner({ caseId }: SceneCaseBannerProps) {
  if (caseId === "charles_river") {
    return <SceneRiverBanner />;
  }
  return (
    <div
      className={`scene-case-banner scene-case-banner--${caseId}`}
      aria-hidden
    >
      <img
        className="scene-case-banner__img"
        src={CASE_BANNER_URL[caseId]}
        alt=""
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}
