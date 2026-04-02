/** Static illustrated river banner (vector, sharp at any size). Replaces canvas animation on the case screen. */
export function SceneRiverBanner() {
  return (
    <div className="scene-river-banner" aria-hidden>
      <svg
        className="scene-river-banner__svg"
        viewBox="0 0 800 220"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="rv-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15102a" />
            <stop offset="50%" stopColor="#1a1630" />
            <stop offset="100%" stopColor="#0d0b1e" />
          </linearGradient>
          <linearGradient id="rv-water" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d1f4a" />
            <stop offset="100%" stopColor="#1a1338" />
          </linearGradient>
          <linearGradient id="rv-glow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="220" fill="url(#rv-sky)" />
        <ellipse cx="620" cy="48" rx="200" ry="40" fill="url(#rv-glow)" />
        <path
          d="M0 120 Q200 100 400 115 T800 108 L800 220 L0 220 Z"
          fill="url(#rv-water)"
        />
        <path
          d="M0 128 Q180 118 360 128 T720 122 T800 125 L800 220 L0 220 Z"
          fill="#2a1f45"
          opacity="0.85"
        />
        <path
          d="M-40 138 Q120 132 280 140 T560 136 T840 142 L840 220 L-40 220 Z"
          fill="#1e1635"
        />
        <path
          d="M0 145 Q100 142 200 148 Q400 155 600 148 Q700 145 800 152 L800 220 L0 220 Z"
          fill="#7c3aed"
          opacity="0.12"
        />
        <ellipse cx="140" cy="158" rx="28" ry="8" fill="#c084fc" opacity="0.2" />
        <ellipse cx="420" cy="168" rx="36" ry="9" fill="#c084fc" opacity="0.15" />
        <ellipse cx="680" cy="162" rx="22" ry="6" fill="#c084fc" opacity="0.18" />
        <rect x="0" y="0" width="800" height="220" fill="none" stroke="#3b1f6b" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}
