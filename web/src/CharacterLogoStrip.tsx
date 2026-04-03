import { imageSrc } from "./gameContent";
import { COPY } from "./strings";

type Variant = "scroll" | "playing";

export function CharacterLogoStrip({ variant }: { variant: Variant }) {
  const rootClass =
    variant === "scroll"
      ? "logo-strip logo-strip--scroll"
      : "logo-strip logo-strip--playing";

  return (
    <div className={rootClass} aria-label={COPY.logoStripAria}>
      <figure className="logo-strip__item">
        <img
          className="logo-strip__img"
          src={imageSrc(
            "assets/images/Bacon_Hair_Shoulder_Up-removebg-preview.png"
          )}
          alt=""
          width={200}
          height={200}
          decoding="async"
        />
        <figcaption className="logo-strip__caption">{COPY.logoBh}</figcaption>
      </figure>
      <figure className="logo-strip__item">
        <img
          className="logo-strip__img"
          src={imageSrc(
            "assets/images/Ballerina_cappuccina_shoulder_up-removebg-preview.png"
          )}
          alt=""
          width={200}
          height={200}
          decoding="async"
        />
        <figcaption className="logo-strip__caption">{COPY.logoBc}</figcaption>
      </figure>
      <figure className="logo-strip__item">
        <img
          className="logo-strip__img"
          src={imageSrc(
            "assets/images/TTTSahur_Shoulder_Up-removebg-preview.png"
          )}
          alt=""
          width={200}
          height={200}
          decoding="async"
        />
        <figcaption className="logo-strip__caption">{COPY.logoSahur}</figcaption>
      </figure>
    </div>
  );
}
