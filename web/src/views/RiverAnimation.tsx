/** Generates a smooth sine-like wave path using quadratic bezier.
 *  Period = 600 SVG units. Spans x=-600 to x=1800 so a translateX(-600)
 *  animation always loops seamlessly regardless of how the SVG is scaled.
 */
function wavePath(baseline: number, amplitude: number): string {
  const P = 600;
  const xS = -P;
  const xE = P * 3;
  const parts: string[] = [
    `M ${xS} ${baseline}`,
    `Q ${xS + P / 4} ${baseline - amplitude} ${xS + P / 2} ${baseline}`,
  ];
  for (let x = xS + P / 2; x < xE; x += P / 2) {
    parts.push(`T ${x + P / 2} ${baseline}`);
  }
  parts.push(`L ${xE} 200 L ${xS} 200 Z`);
  return parts.join(" ");
}

// ─── Trash silhouettes, centered at (0,0) ────────────────────────────────────

/** Plastic bottle lying on its side: oval body + rectangular cap */
const BOTTLE =
  "M -14 -3.5 C -14 -7 8 -7 8 -3.5 L 8 -2 L 13 -2 L 13 2 L 8 2 L 8 3.5 C 8 7 -14 7 -14 3.5 Z";
/** Tin/aluminum can (upright capsule silhouette) */
const CAN =
  "M -5 -10 C -5 -12 5 -12 5 -10 L 5 10 C 5 12 -5 12 -5 10 Z";
/** Drooping plastic bag */
const BAG =
  "M -1 -10 L 1 -10 C 10 -8 13 0 11 8 C 9 15 -9 15 -11 8 C -13 0 -10 -8 -1 -10 Z";
/** Tire — two concentric circles; use fillRule="evenodd" for the hollow centre */
const TIRE =
  "M -10 0 A 10 10 0 1 0 10 0 A 10 10 0 1 0 -10 0 Z " +
  "M -5 0 A 5 5 0 1 0 5 0 A 5 5 0 1 0 -5 0 Z";

// ─── Green-goo blob silhouettes, centered at (0,0) ───────────────────────────
const GOO_SM =
  "M 2 -9 C 7 -14 14 -8 12 0 C 14 8 6 14 -2 11 C -10 13 -14 5 -11 -2 C -12 -8 -3 -13 2 -9 Z";
const GOO_MD =
  "M 0 -14 C 8 -18 20 -12 18 -2 C 20 8 12 18 0 16 C -12 18 -20 8 -18 -2 C -20 -12 -8 -18 0 -14 Z";
const GOO_WD =
  "M 0 -8 C 10 -15 24 -10 22 -1 C 24 7 12 14 0 12 C -12 14 -24 7 -22 -1 C -24 -10 -10 -15 0 -8 Z";

// ─── Seamless tile helpers ────────────────────────────────────────────────────
// The animation translates each group by exactly -600 SVG units (one period).
// For a seamless loop every item must repeat every 600 units, so we define
// one 600-unit "tile" and stamp it at offsets -600, 0, 600, 1200.

const PERIODS = [-600, 0, 600, 1200] as const;

type TrashDef = {
  d: string;
  dx: number;           // x position within the 600-unit tile
  dy: number;
  rot?: number;
  scale?: number;
  fill: string;
  evenodd?: true;
};

/** One tile worth of trash items (dx must stay within 0–599). */
const TRASH_TILE: TrashDef[] = [
  { d: BOTTLE, dx: 50,  dy: 112, rot:  15,             fill: "rgba(91,184,197,0.68)" },
  { d: CAN,    dx: 155, dy: 109, rot:  81,             fill: "rgba(184,176,144,0.80)" },
  { d: TIRE,   dx: 255, dy: 114,                       fill: "rgba(30,30,36,0.90)", evenodd: true },
  { d: BAG,    dx: 355, dy: 116, rot:  -9,             fill: "rgba(216,224,204,0.62)" },
  { d: BOTTLE, dx: 448, dy: 111, rot: -19, scale: 0.85,fill: "rgba(106,170,64,0.70)" },
  { d: CAN,    dx: 550, dy: 110, rot: -75, scale: 0.9, fill: "rgba(160,88,40,0.76)" },
];

type GooDef = {
  d: string;
  dx: number;
  dy: number;
  scale?: number;
  fill: string;
};

/** One tile worth of goo blobs (dx must stay within 0–599). */
const GOO_TILE: GooDef[] = [
  { d: GOO_MD, dx:  40, dy: 118,              fill: "rgba(82,212,36,0.72)" },
  { d: GOO_WD, dx: 185, dy: 117, scale: 0.85, fill: "rgba(86,206,30,0.65)" },
  { d: GOO_SM, dx: 345, dy: 120, scale: 0.95, fill: "rgba(102,228,42,0.68)" },
  { d: GOO_MD, dx: 495, dy: 119, scale: 0.90, fill: "rgba(90,215,38,0.70)" },
];

export function RiverAnimation() {
  const w1 = wavePath(176, 6);
  const w2 = wavePath(152, 12);
  const w3 = wavePath(122, 18);

  return (
    <div className="river-scene" aria-hidden>
      <svg
        className="river-scene__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="rg-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0c2430" />
            <stop offset="100%" stopColor="#040d14" />
          </linearGradient>
          <linearGradient id="rg-top-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="rgba(4,13,20,0.92)" />
            <stop offset="35%" stopColor="rgba(4,13,20,0)" />
          </linearGradient>
          <linearGradient id="rg-bot-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="55%"  stopColor="rgba(4,13,20,0)" />
            <stop offset="100%" stopColor="rgba(4,13,20,0.88)" />
          </linearGradient>
          <radialGradient id="rg-goo-pool-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(90,210,35,0.65)" />
            <stop offset="100%" stopColor="rgba(60,180,20,0)" />
          </radialGradient>
          <radialGradient id="rg-goo-pool-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(90,210,35,0.58)" />
            <stop offset="100%" stopColor="rgba(60,180,20,0)" />
          </radialGradient>
          <filter id="flt-goo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Horizontal cylinder gradients — dark edges → bright centre → dark edge
              gives each stream the rounded shading of a 3-D pipe.
              userSpaceOnUse so the coords map directly to stream x positions.  */}
          <linearGradient id="rg-goo-cyl-1" x1="219" y1="0" x2="241" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(10,44,4,0.94)" />
            <stop offset="16%"  stopColor="rgba(175,255,88,0.58)" />
            <stop offset="42%"  stopColor="rgba(90,232,32,0.97)" />
            <stop offset="74%"  stopColor="rgba(54,172,16,0.88)" />
            <stop offset="100%" stopColor="rgba(10,44,4,0.94)" />
          </linearGradient>
          <linearGradient id="rg-goo-cyl-2" x1="810" y1="0" x2="830" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(10,44,4,0.94)" />
            <stop offset="16%"  stopColor="rgba(175,255,88,0.55)" />
            <stop offset="42%"  stopColor="rgba(88,228,30,0.96)" />
            <stop offset="74%"  stopColor="rgba(52,168,14,0.86)" />
            <stop offset="100%" stopColor="rgba(10,44,4,0.94)" />
          </linearGradient>
        </defs>

        {/* ══ Water base ═══════════════════════════════════════════════════════ */}
        <rect width="1200" height="200" fill="url(#rg-water)" />

        {/* ══ Wave 1 — deep slow current ════════════════════════════════════════ */}
        <g>
          <path d={w1} fill="rgba(14,52,65,0.82)" />
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-600 0" dur="9s" repeatCount="indefinite" />
        </g>

        {/* ══ Wave 2 — mid current ══════════════════════════════════════════════ */}
        <g>
          <path d={w2} fill="rgba(18,70,86,0.66)" />
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-600 0" dur="5.5s" repeatCount="indefinite" />
        </g>

        {/* ══ Trash — tiled every 600 units for a seamless loop ════════════════
               Rendered before wave 3 so the surface wave laps over items.    */}
        <g>
          {PERIODS.flatMap((offset, pi) =>
            TRASH_TILE.map((item, ii) => {
              const x = item.dx + offset;
              const rot   = item.rot   ?? 0;
              const scale = item.scale ?? 1;
              return (
                <path
                  key={`t-${pi}-${ii}`}
                  d={item.d}
                  transform={`translate(${x},${item.dy}) rotate(${rot}) scale(${scale})`}
                  fill={item.fill}
                  fillRule={item.evenodd ? "evenodd" : undefined}
                />
              );
            })
          )}
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-600 0" dur="4.8s" repeatCount="indefinite" />
        </g>

        {/* ══ Green goo — tiled every 600 units ════════════════════════════════ */}
        <g filter="url(#flt-goo-glow)">
          {PERIODS.flatMap((offset, pi) =>
            GOO_TILE.map((item, ii) => {
              const x     = item.dx + offset;
              const scale = item.scale ?? 1;
              return (
                <path
                  key={`g-${pi}-${ii}`}
                  d={item.d}
                  transform={`translate(${x},${item.dy}) scale(${scale})`}
                  fill={item.fill}
                />
              );
            })
          )}
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-600 0" dur="3.6s" repeatCount="indefinite" />
        </g>

        {/* ══ Wave 3 — surface (after trash/goo so it laps over them) ══════════ */}
        <g>
          <path d={w3} fill="rgba(24,90,110,0.50)" />
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-600 0" dur="3.2s" repeatCount="indefinite" />
        </g>

        {/* ══ Surface shimmer — 2 per tile, tiled ══════════════════════════════ */}
        <g>
          {PERIODS.map(o => (
            <g key={o}>
              <ellipse cx={80  + o} cy="113" rx="42" ry="2.5" fill="rgba(140,225,245,0.10)" />
              <ellipse cx={360 + o} cy="107" rx="30" ry="2"   fill="rgba(140,225,245,0.08)" />
            </g>
          ))}
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-600 0" dur="4.5s" repeatCount="indefinite" />
        </g>

        {/* ══ Small algae / foam dots — 3 per tile, tiled ══════════════════════ */}
        <g>
          {PERIODS.map(o => (
            <g key={o}>
              <circle cx={100 + o} cy="118" r="3.5" fill="rgba(56,112,38,0.46)" />
              <circle cx={280 + o} cy="121" r="2.5" fill="rgba(76,136,46,0.40)" />
              <circle cx={470 + o} cy="115" r="4"   fill="rgba(50,104,36,0.43)" />
            </g>
          ))}
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-600 0" dur="5s" repeatCount="indefinite" />
        </g>

        {/* ══ Oil sheen strip ════════════════════════════════════════════════════ */}
        <g>
          <rect x="-600" y="104" width="2400" height="14"
                fill="rgba(105,55,140,0.06)" rx="2" />
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-600 0" dur="7s" repeatCount="indefinite" />
        </g>

        {/* ══ Runoff streams — cylindrical goo waterfalls ════════════════════════
               Each stream uses four layers for a 3-D pipe illusion:
                 1. Gradient-filled rect  →  rounded cylinder body
                 2. Animated dashed line  →  goo segments flowing down
                 3. Narrow highlight rect →  specular shine on left edge
                 4. Pool + ripple rings   →  splash where stream hits water
               The top-fade overlay conceals the source at the top edge.       */}

        {/* ── Stream 1 at x = 230 ─────────────────────────────────────────── */}
        {/* Pipe mouth */}
        <rect x="216" y="3"  width="28" height="13" rx="3" fill="rgba(12,38,5,0.95)" />
        <rect x="219" y="5"  width="22" height="11" rx="2" fill="rgba(20,60,9,0.90)" />
        {/* Cylinder body — horizontal gradient gives dark-edge / bright-centre shading */}
        <rect x="219" y="13" width="22" height="107" fill="url(#rg-goo-cyl-1)" />
        {/* Flowing segments — semi-transparent dashes animate downward over the body */}
        <line x1="230" y1="13" x2="230" y2="120"
          stroke="rgba(160,255,72,0.28)" strokeWidth="13" strokeLinecap="butt"
          strokeDasharray="22 5">
          <animate attributeName="stroke-dashoffset" from="27" to="0"
                   dur="0.42s" repeatCount="indefinite" />
        </line>
        {/* Highlight stripe — simulates light catching the top-left edge */}
        <rect x="221" y="15" width="5" height="103" fill="rgba(200,255,135,0.20)" rx="1" />
        {/* Splash pool */}
        <ellipse cx="230" cy="119" rx="25" ry="9" fill="url(#rg-goo-pool-1)" />
        {/* Three ripple rings with staggered delays */}
        {([0, 0.43, 0.86] as const).map((delay, i) => (
          <ellipse key={i} cx="230" cy="119" rx="8" ry="4"
            fill="none" stroke="rgba(88,228,30,0.75)" strokeWidth="1.5">
            <animate attributeName="rx"      values="8;34"    dur="1.3s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="ry"      values="4;12"    dur="1.3s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.75;0"  dur="1.3s" begin={`${delay}s`} repeatCount="indefinite" />
          </ellipse>
        ))}

        {/* ── Stream 2 at x = 820 ─────────────────────────────────────────── */}
        {/* Pipe mouth */}
        <rect x="808" y="3"  width="24" height="12" rx="3" fill="rgba(12,38,5,0.95)" />
        <rect x="810" y="5"  width="20" height="10" rx="2" fill="rgba(20,60,9,0.90)" />
        {/* Cylinder body */}
        <rect x="810" y="13" width="20" height="104" fill="url(#rg-goo-cyl-2)" />
        {/* Flowing segments */}
        <line x1="820" y1="13" x2="820" y2="117"
          stroke="rgba(160,255,72,0.28)" strokeWidth="11" strokeLinecap="butt"
          strokeDasharray="20 5">
          <animate attributeName="stroke-dashoffset" from="25" to="0"
                   dur="0.38s" repeatCount="indefinite" />
        </line>
        {/* Highlight stripe */}
        <rect x="812" y="15" width="4" height="100" fill="rgba(200,255,135,0.20)" rx="1" />
        {/* Splash pool */}
        <ellipse cx="820" cy="117" rx="22" ry="8" fill="url(#rg-goo-pool-2)" />
        {/* Ripple rings */}
        {([0, 0.40, 0.80] as const).map((delay, i) => (
          <ellipse key={i} cx="820" cy="117" rx="8" ry="4"
            fill="none" stroke="rgba(88,228,30,0.68)" strokeWidth="1.5">
            <animate attributeName="rx"      values="8;30"   dur="1.2s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="ry"      values="4;11"   dur="1.2s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0"  dur="1.2s" begin={`${delay}s`} repeatCount="indefinite" />
          </ellipse>
        ))}

        {/* ══ Depth edge fades (always on top) ══════════════════════════════════ */}
        <rect width="1200" height="200" fill="url(#rg-top-fade)" />
        <rect width="1200" height="200" fill="url(#rg-bot-fade)" />
      </svg>
    </div>
  );
}
