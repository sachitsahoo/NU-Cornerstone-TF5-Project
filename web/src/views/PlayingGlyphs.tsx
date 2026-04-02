/** Small clue icons: water, fish, vehicle — match the three clue themes. */
export function ClueGlyph({ kind }: { kind: "water" | "fish" | "car" }) {
  const common = {
    className: "scene-clue-card__glyph",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };
  if (kind === "water") {
    return (
      <svg {...common}>
        <path
          d="M12 4c-2 4-6 6-6 10a6 6 0 0 0 12 0c0-4-4-6-6-10z"
          stroke="#c084fc"
          strokeWidth={1.5}
          fill="rgba(192,132,252,0.15)"
        />
      </svg>
    );
  }
  if (kind === "fish") {
    return (
      <svg {...common}>
        <path
          d="M4 12c2-3 5-5 9-5 2 0 4 .5 5 2l2-2v10l-2-2c-1 1.5-3 2-5 2-4 0-7-2-9-5z"
          stroke="#c084fc"
          strokeWidth={1.5}
          fill="rgba(192,132,252,0.12)"
        />
        <circle cx="11" cy="12" r="1" fill="#c084fc" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        d="M3 14h2l2-6h10l2 6h2M6 14v4h12v-4M8 18v2M16 18v2"
        stroke="#c084fc"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="17" cy="9" r="1.5" fill="#c084fc" opacity={0.7} />
    </svg>
  );
}

/** Fallback when suspect image fails to load. */
export function SuspectSilhouette({ tint }: { tint: string }) {
  return (
    <svg
      className="scene-suspects__silhouette"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="40" cy="26" r="14" fill={tint} opacity="0.35" />
      <path
        d="M20 72c2-16 10-24 20-24s18 8 20 24"
        fill={tint}
        opacity="0.28"
      />
    </svg>
  );
}

/** Decorative emblem per suspect slot (not narrative — visual only). */
export function SuspectEmblem({ index }: { index: number }) {
  const common = {
    className: "scene-suspects__emblem-icon",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };
  if (index === 0) {
    return (
      <svg {...common}>
        <circle cx="10" cy="10" r="7" stroke="#c084fc" strokeWidth={1.2} />
        <path d="M7 10h6M10 7v6" stroke="#c084fc" strokeWidth={1.2} />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...common}>
        <path
          d="M4 14 L10 5 L16 14 Z"
          stroke="#c084fc"
          strokeWidth={1.2}
          fill="rgba(192,132,252,0.12)"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect
        x="4"
        y="6"
        width="12"
        height="9"
        rx="1"
        stroke="#c084fc"
        strokeWidth={1.2}
        fill="rgba(192,132,252,0.1)"
      />
      <path d="M6 9h8M6 11h5" stroke="#c084fc" strokeWidth={0.8} />
    </svg>
  );
}
