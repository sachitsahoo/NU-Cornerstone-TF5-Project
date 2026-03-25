import { ASSETS } from "./assetUrls";
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
          src={ASSETS.steveLogo}
          alt=""
          width={200}
          height={200}
          decoding="async"
        />
        <figcaption className="logo-strip__caption">{COPY.logoSteve}</figcaption>
      </figure>
      <figure className="logo-strip__item">
        <img
          className="logo-strip__img"
          src={ASSETS.sahurLogo}
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
