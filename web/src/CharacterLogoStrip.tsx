import { imageSrc, t, type Lang } from "./gameContent";

type Variant = "scroll" | "playing";

export function CharacterLogoStrip({
  variant,
  lang,
}: {
  variant: Variant;
  lang: Lang;
}) {
  const rootClass =
    variant === "scroll"
      ? "logo-strip logo-strip--scroll"
      : "logo-strip logo-strip--playing";

  return (
    <div className={rootClass} aria-label={t(lang, "logoStripAria")}>
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
        <figcaption className="logo-strip__caption">
          {t(lang, "logoBhCaption")}
        </figcaption>
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
        <figcaption className="logo-strip__caption">
          {t(lang, "logoBcCaption")}
        </figcaption>
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
        <figcaption className="logo-strip__caption">
          {t(lang, "logoSahurCaption")}
        </figcaption>
      </figure>
    </div>
  );
}
