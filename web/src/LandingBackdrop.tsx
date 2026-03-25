import { useMemo, type CSSProperties } from "react";

function parallaxY(scrollY: number, factor: number): CSSProperties {
  return { transform: `translate3d(0, ${scrollY * factor}px, 0)` };
}

/**
 * Top-half night sky: small twinkling star shapes (not dots), plus birds.
 * Layers shift with scroll (parallax) when scrollY is provided.
 */
export function LandingBackdrop({ scrollY = 0 }: { scrollY?: number }) {
  const stars = useMemo(() => {
    const n = 160;
    return Array.from({ length: n }, (_, i) => {
      const x = ((Math.sin(i * 17.11) * 9301 + 49297) % 10000) / 100;
      /* Top half of viewBox only (0–50) */
      const y = ((Math.cos(i * 13.07) * 7919 + 104729) % 5000) / 100;
      const o = 0.2 + ((i * 7) % 8) / 35;
      const tw = (i * 0.27) % 4;
      const size = 0.22 + ((i * 11) % 7) / 55;
      const rot = ((i * 47) % 360) + ((i % 3) * 15);
      const variant = i % 3;
      /* Drift motion: viewport-relative so it scales; varied phase & duration */
      const floatDelay = (i * 0.41) % 14;
      const floatDur = 12 + (i % 19) * 1.15;
      const floatDx = `${0.1 + ((i * 17) % 55) / 200}vw`;
      const floatDy = `${(((i * 23) % 100) - 50) / 220}vh`;
      return {
        x,
        y,
        o,
        tw,
        size,
        rot,
        variant,
        floatDelay,
        floatDur,
        floatDx,
        floatDy,
      };
    });
  }, []);

  return (
    <div className="landing__backdrop" aria-hidden>
      <div className="landing__skywash" style={parallaxY(scrollY, 0.06)} />
      <div className="landing__aurora" style={parallaxY(scrollY, 0.1)} />
      <div className="landing__horizon-glow" style={parallaxY(scrollY, 0.14)} />
      <div
        className="landing__atmosphere landing__atmosphere--deep"
        style={parallaxY(scrollY, 0.11)}
      />
      <div
        className="landing__atmosphere landing__atmosphere--veil"
        style={parallaxY(scrollY, 0.08)}
      />
      <div
        className="landing__atmosphere landing__atmosphere--drift"
        style={parallaxY(scrollY, 0.1)}
      />

      <svg
        className="landing__stars"
        style={parallaxY(scrollY, 0.18)}
        viewBox="0 0 100 50"
        preserveAspectRatio="xMidYMin slice"
      >
        {stars.map((s, i) => (
          <StarMark
            key={i}
            x={s.x}
            y={s.y}
            size={s.size}
            rot={s.rot}
            opacity={s.o}
            variant={s.variant as 0 | 1 | 2}
            delay={s.tw}
            floatDelay={s.floatDelay}
            floatDur={s.floatDur}
            floatDx={s.floatDx}
            floatDy={s.floatDy}
          />
        ))}
      </svg>

      <div
        className="landing__birds-wrap landing__birds-wrap--a"
        style={parallaxY(scrollY, 0.22)}
      >
        <svg
          className="landing__birds landing__birds--a"
          viewBox="0 0 400 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 40 55 L 52 48 L 64 55"
            fill="none"
            stroke="rgba(255, 160, 230, 0.45)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M 120 38 L 134 30 L 148 38"
            fill="none"
            stroke="rgba(255, 170, 235, 0.4)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className="landing__birds-wrap landing__birds-wrap--b"
        style={parallaxY(scrollY, 0.2)}
      >
        <svg
          className="landing__birds landing__birds--b"
          viewBox="0 0 400 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 260 62 L 272 56 L 284 62"
            fill="none"
            stroke="rgba(230, 150, 255, 0.38)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M 320 32 L 332 26 L 344 32"
            fill="none"
            stroke="rgba(220, 160, 255, 0.35)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/** Classic 4-point star in -1…1 space */
const STAR_4 =
  "M 0 -1 L 0.24 -0.24 L 1 0 L 0.24 0.24 L 0 1 L -0.24 0.24 L -1 0 L -0.24 -0.24 Z";

function StarMark({
  x,
  y,
  size,
  rot,
  opacity,
  variant,
  delay,
  floatDelay,
  floatDur,
  floatDx,
  floatDy,
}: {
  x: number;
  y: number;
  size: number;
  rot: number;
  opacity: number;
  variant: 0 | 1 | 2;
  delay: number;
  floatDelay: number;
  floatDur: number;
  floatDx: string;
  floatDy: string;
}) {
  const t = `translate(${x} ${y}) rotate(${rot}) scale(${size})`;
  const fill = "rgba(255, 250, 255, 0.98)";
  const stroke = "rgba(255, 200, 255, 0.95)";

  const floatStyle = {
    "--tw-delay": `${delay}s`,
    "--float-delay": `${floatDelay}s`,
    "--float-dur": `${floatDur}s`,
    "--dx": floatDx,
    "--dy": floatDy,
  } as CSSProperties;

  if (variant === 0) {
    return (
      <g transform={t}>
        <g className="landing__star-glyph landing__star-float" style={floatStyle}>
          <path d={STAR_4} fill={fill} opacity={opacity} />
        </g>
      </g>
    );
  }
  if (variant === 1) {
    /* Tight sparkle: + with small diamond */
    return (
      <g transform={t}>
        <g className="landing__star-glyph landing__star-float" opacity={opacity} style={floatStyle}>
          <path d="M 0 -1 L 0.2 0 L 0 1 L -0.2 0 Z" fill={fill} />
          <line
            x1="-1.1"
            y1="0"
            x2="1.1"
            y2="0"
            stroke={stroke}
            strokeWidth="0.35"
            strokeLinecap="round"
          />
          <line
            x1="0"
            y1="-1.1"
            x2="0"
            y2="1.1"
            stroke={stroke}
            strokeWidth="0.35"
            strokeLinecap="round"
          />
        </g>
      </g>
    );
  }
  /* Tiny 6-point burst */
  return (
    <g transform={t}>
      <g className="landing__star-glyph landing__star-float" style={floatStyle}>
        <path
          d="M 0 -1 L 0.15 -0.15 L 1 0 L 0.15 0.15 L 0 1 L -0.15 0.15 L -1 0 L -0.15 -0.15 Z"
          fill={fill}
          opacity={opacity * 0.92}
        />
      </g>
    </g>
  );
}
