import type { CharacterJson, CharactersApiResponse } from "./gameTypes";
import pack from "./data/characters.json";
import esOverlay from "./characterEs.json";

export type Lang = "en" | "es";

/** Used when GET /api/characters fails (e.g. Vite without bridge). */
export const FALLBACK_CHARACTERS: CharacterJson[] = (
  pack as unknown as CharactersApiResponse
).characters;

type EsOverlay = {
  role: string;
  description: string;
  innocent_explanation: string;
  culprit_explanation: string;
  alibis_innocent: string[];
  alibis_guilty: string[];
};

const ES = esOverlay as Record<string, EsOverlay>;

/** Spanish display text for characters (API JSON stays English). */
export function localizeCharacter(c: CharacterJson, lang: Lang): CharacterJson {
  if (lang !== "es") return c;
  const es = ES[c.uid];
  if (!es) return c;
  const merged: CharacterJson = {
    ...c,
    role: es.role,
    description: es.description,
    innocent_explanation: es.innocent_explanation,
    culprit_explanation: es.culprit_explanation,
    alibis_innocent: es.alibis_innocent,
    alibis_guilty: es.alibis_guilty,
  };
  const i = c.round_alibi_index;
  if (i !== undefined && i >= 0 && i <= 2) {
    const pool = c.round_alibi_guilty ? merged.alibis_guilty : merged.alibis_innocent;
    merged.suspicious_detail = pool[i];
  }
  return merged;
}

/** Fallback if an unknown culprit uid is passed (should not happen in normal play). */
const CLUES: Record<Lang, string[]> = {
  en: [
    "The mess is factory machine oil.",
    "Someone moved oil drums to the river drain.",
    "Only factory workers can move those drums.",
  ],
  es: [
    "Es aceite de máquina de fábrica.",
    "Alguien movió bidones de aceite al desagüe del río.",
    "Solo trabajadores de la fábrica pueden mover esos bidones.",
  ],
};

/**
 * Three clues: (1) oil type (2–3) short evidence—enough to reason with, not a job listing.
 */
const CLUES_BY_CULPRIT: Record<string, Record<Lang, readonly [string, string, string]>> = {
  bacon_hair: {
    en: [
      "It's factory machine oil.",
      "Video shows drums heading toward the river.",
      "Scrape marks match a cart from the machine yard.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "El vídeo muestra bidones hacia el río.",
      "Rozaduras coinciden con un carro del taller de máquinas.",
    ],
  },
  ballerina_cappuccina: {
    en: [
      "It's factory machine oil.",
      "Grease traced to her café patio on the river walk.",
      "The trail runs between the factory and that riverside café.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Grasa llevó a la terraza de su café en el paseo del río.",
      "La pista va entre la fábrica y ese café ribereño.",
    ],
  },
  tung: {
    en: [
      "It's factory machine oil.",
      "Truck papers list a pickup that never happened.",
      "The wrong form has a night shift stamp on it.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Los papeles del camión dicen una recogida que no ocurrió.",
      "El formulario equivocado tiene sello de turno nocturno.",
    ],
  },
  roblox_noob: {
    en: [
      "It's factory machine oil.",
      "The stain pattern fits factory drums.",
      "A scavenger hunt photo shows the time by the museum steps.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "La mancha encaja con bidones de fábrica.",
      "Una foto de la búsqueda del tesoro muestra la hora junto al museo.",
    ],
  },
  roblox_guest: {
    en: [
      "It's factory machine oil.",
      "This much oil usually moves on the freight road.",
      "Lobby logs show an exit before the drums rolled.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Tanto aceite suele moverse por la vía de carga.",
      "Registros del vestíbulo muestran salida antes de los bidones.",
    ],
  },
  baconette_hair: {
    en: [
      "It's factory machine oil.",
      "Oil pooled under a cart liner, not a sink.",
      "Snack wrappers by the stain match a cart brand.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Aceite bajo el forro de un carrito, no en un fregadero.",
      "Envoltorios junto a la mancha coinciden con una marca de carrito.",
    ],
  },
  peeley: {
    en: [
      "It's factory machine oil.",
      "Oil hit work clothes right after he changed out of the banana suit.",
      "Fluff from a costume was on a drum at the grate.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Aceite en ropa de trabajo tras quitarse el traje de plátano.",
      "Pelusa de disfraz apareció en un bidón en la rejilla.",
    ],
  },
  agent_67: {
    en: [
      "It's factory machine oil.",
      "Tripod legs have the same grease as the water sample.",
      "A camera was on the mud bank by the river.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Las patas del trípode tienen la misma grasa que el agua.",
      "Una cámara en el barro junto al río.",
    ],
  },
  roblox_builder: {
    en: [
      "It's factory machine oil.",
      "The oil matches the kids' demo tubes, not the plant pipes.",
      "A door from the kids’ room sits near the grate.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "El aceite coincide con tubitos de demo, no con el tubo principal.",
      "Una puerta del salón de niños queda cerca de la rejilla.",
    ],
  },
  elsa: {
    en: [
      "It's factory machine oil.",
      "Fog from her light show and pipe oil used the same drain.",
      "The plaza rehearsal for that show matched when the oil hit the drain.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Niebla del show y aceite de tubo usan el mismo desagüe.",
      "El ensayo en la plaza para ese show coincidió con el aceite en el desagüe.",
    ],
  },
  steve: {
    en: [
      "It's factory machine oil.",
      "Work gloves picked up oil, not foam from the suit.",
      "The mascot head can’t fit through the drum room door.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Guantes con aceite, no espuma del traje de cabeza cuadrada.",
      "La cabeza grande no cabe por la puerta de la sala de bidones.",
    ],
  },
  spyder_sammy: {
    en: [
      "It's factory machine oil.",
      "A label for illegal chemicals was by the drain.",
      "Hoses and a list of stops were by the drain.",
    ],
    es: [
      "Es aceite de máquina de la fábrica.",
      "Una etiqueta de químico ilegal junto al desagüe.",
      "Mangueras y una lista de paradas junto al desagüe.",
    ],
  },
};

const FUN_FACT: Record<Lang, string> = {
  en: "Even a small amount of factory oil can poison the fish, frogs, and insects that live in a river!",
  es: "¡Poco aceite de fábrica basta para envenenar peces y vida del río!",
};

const SOLUTIONS: Record<Lang, string[]> = {
  en: [
    "Check drain pipes automatically and share the results publicly.",
    "Plant bushes and grass near rivers — they filter dirty water before it gets in.",
    "Let workers report rule-breaking safely, without getting in trouble.",
  ],
  es: [
    "Revisar tuberías con sensores y publicar los datos.",
    "Plantar vegetación en la orilla — filtra el agua antes de entrar al río.",
    "Que los trabajadores puedan reportar sin represalias.",
  ],
};

const RIVER_EXIT_FACTS: Record<Lang, string[]> = {
  en: [
    "The Charles River went from one of the dirtiest rivers in the US to one of the cleanest today!",
  ],
  es: [
    "¡El río Charles pasó de ser uno de los más contaminados de EE. UU. a uno de los más limpios hoy!",
  ],
};

export function riverExitFactsFor(lang: Lang): string[] {
  return RIVER_EXIT_FACTS[lang];
}

/** One post–fun-facts MCQ (easy–medium), aligned with river exit facts. */
export type ExitQuizContent = {
  question: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  /** Short explanation shown after a correct answer (same language as question). */
  feedbackCorrectBlurb: string;
  /** Short explanation shown after a wrong answer (same language as question). */
  feedbackIncorrectBlurb: string;
};

const EXIT_QUIZ: Record<Lang, ExitQuizContent> = {
  en: {
    question:
      "Street storm drains often connect straight to rivers. What should you never pour down them?",
    choices: [
      "Only clean water",
      "Paint, motor oil, or leftover chemicals",
      "Cold coffee or tea",
      "Rain from your boots",
    ],
    correctIndex: 1,
    feedbackCorrectBlurb:
      "Right! That stuff goes to the river and can pollute the water we drink and swim in.",
    feedbackIncorrectBlurb:
      "Those drains don't clean water. Paint, oil, and chemicals go straight to the river—use the trash or a drop-off.",
  },
  es: {
    question:
      "Muchas alcantarillas van al río. ¿Qué no debes verter?",
    choices: [
      "Solo agua limpia",
      "Pintura, aceite o químicos",
      "Café o té frío",
      "Agua de lluvia",
    ],
    correctIndex: 1,
    feedbackCorrectBlurb:
      "¡Bien! Eso llega al río y ensucia el agua.",
    feedbackIncorrectBlurb:
      "Ahí no se filtra el agua. Eso va al río: llévalo a reciclaje o basura segura.",
  },
};

export function exitQuizFor(lang: Lang): ExitQuizContent {
  return EXIT_QUIZ[lang];
}

export function cluesFor(lang: Lang, culpritUid: string): string[] {
  const triple = CLUES_BY_CULPRIT[culpritUid]?.[lang];
  if (triple) return [...triple];
  return [...CLUES[lang]];
}

export type CaseClueGlyph = "water" | "fish" | "car";

export type CaseClueItem = {
  text: string;
  glyph: CaseClueGlyph;
};

/**
 * Deterministic PRNG for one scene: suspect roster, alibis, and clue order all draw
 * from the same seed so they vary together each play.
 */
export type SceneRandom = {
  /** Uniform in [0, 1). */
  float: () => number;
};

/** Mulberry32 — fast, deterministic from a 32-bit seed. */
export function createSceneRandom(seed: number): SceneRandom {
  let a = seed >>> 0;
  return {
    float: () => {
      let t = (a += 0x6d2b79f5) | 0;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
  };
}

export function randomSceneSeed(): number {
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    const u = new Uint32Array(1);
    globalThis.crypto.getRandomValues(u);
    return u[0]! >>> 0;
  }
  return (Math.random() * 0x100000000) >>> 0;
}

function shuffleInPlaceSeeded<T>(xs: T[], float: () => number): void {
  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(float() * (i + 1));
    [xs[i], xs[j]] = [xs[j], xs[i]];
  }
}

const CASE_CLUE_GLYPHS: readonly CaseClueGlyph[] = ["water", "fish", "car"];

/** Three case clues for the culprit, order shuffled per scene (glyph stays paired with each line). */
export function caseCluesForScene(
  lang: Lang,
  culpritUid: string,
  rng: SceneRandom
): CaseClueItem[] {
  const triple = cluesFor(lang, culpritUid);
  const pairs: CaseClueItem[] = triple.map((text, i) => ({
    text,
    glyph: CASE_CLUE_GLYPHS[i]!,
  }));
  shuffleInPlaceSeeded(pairs, rng.float);
  return pairs;
}

export function funFactFor(lang: Lang): string {
  return FUN_FACT[lang];
}

export function solutionsFor(lang: Lang): string[] {
  return SOLUTIONS[lang];
}

export const UI = {
  en: {
    chooseLanguage: "Choose your language",
    langEnglish: "English",
    langSpanish: "Español",
    sceneEyebrow: "Case file",
    sceneDescriptor: "Tonight's mystery starts at the river.",
    sceneTitle: "The Riverside Case",
    sceneContext:
      "Use the three clues to figure out who dumped waste into the river last night.",
    sceneHint:
      "Scan a suspect card to find out more.",
    investigationActive: "Investigation Active",
    cluesTitle: "Case clues",
    confirmTitle: "PRESS BUTTON TO ACCUSE",
    confirmButton: "Confirm",
    cancelHint: "Remove card to choose again",
    dossierAboutLabel: "What they do",
    dossierSuspiciousHeading: "A clue",
    suspiciousDetailLabel: "A clue",
    resultCorrect: "YOU GOT IT!",
    resultIncorrect: "Wrong suspect!",
    yourPick: "Your pick",
    whyWrong: "Why this doesn't fit",
    whyRight: "Why the evidence points here",
    theRealAnswer: "Who did it?",
    revealPlayAgain: "Next",
    funFactLabel: "Did you know?",
    solutionsLabel: "How can we fix it?",
    continue: "NEXT",
    needTagFirst: "Scan a suspect card first.",
    navBack: "Back",
    navHome: "Home",
    navCase: "Case",
    navSkip: "Skip",
    navNext: "Next",
    navDone: "Let's solve it!",
    reviewCase: "Review the case file",
    landingBelowP1:
      "Scroll to explore more of the experience.",
    landingBelowP2:
      "RFID cards, the physical button, and the screen work together to drive the mystery.",
    landingBelowTitle: "The mystery continues",
    landingHeroAria: "Introduction",
    landingPlayChooseLanguage: "Choose language…",
    landingPlayLabel: "PRESS BUTTON TO START",
    buttonTapHoldHint: "Tap button to switch, hold to select",
    landingPlayStarting: "Starting…",
    landingTitleLine1: "Polluter",
    landingTitleLine2: "Mystery",
    logoBcCaption: "Ballerina Cappuccina — Café Owner",
    logoBhCaption: "Bacon Hair — Factory Mechanic",
    logoSahurCaption: "Tung — Night Shift Supervisor",
    logoStripAria: "Story characters",
    logoStripScrollIntro: "Meet the suspects",
    playShortcutTitle: "Start (shortcut P)",
    sceneExitTitle: "Helping rivers stay healthy",
    exitQuizEyebrow: "Quick check",
    exitQuizCorrect: "Correct",
    exitQuizIncorrect: "Incorrect",
    exitQuizNextHome: "Next",
  },
  es: {
    chooseLanguage: "Elige idioma",
    langEnglish: "English",
    langSpanish: "Español",
    sceneEyebrow: "Expediente",
    sceneDescriptor: "Esta noche el misterio empieza en el río.",
    sceneTitle: "El caso del río",
    sceneContext:
      "Usa las tres pistas para averiguar quién vertió residuos en el río anoche.",
    sceneHint: "Escanea una tarjeta para ver más.",
    investigationActive: "Investigación activa",
    cluesTitle: "Pistas",
    confirmTitle: "PRESIONA EL BOTÓN PARA ACUSAR",
    confirmButton: "Confirmar",
    cancelHint: "Quita la tarjeta para cambiar",
    dossierAboutLabel: "Qué hace",
    dossierSuspiciousHeading: "Una pista",
    suspiciousDetailLabel: "Una pista",
    resultCorrect: "¡Lo lograste!",
    resultIncorrect: "¡No es el culpable!",
    yourPick: "Tu elección",
    whyWrong: "Por qué no encaja",
    whyRight: "Por qué encaja",
    theRealAnswer: "¿Quién fue?",
    funFactLabel: "¿Sabías que...?",
    solutionsLabel: "¿Qué podemos hacer?",
    continue: "SIGUIENTE",
    needTagFirst: "Primero escanea una tarjeta.",
    navBack: "Atrás",
    navHome: "Inicio",
    navCase: "Caso",
    navSkip: "Saltar",
    navNext: "Siguiente",
    navDone: "¡A resolverlo!",
    reviewCase: "Ver expediente",
    landingBelowP1: "Desplázate para ver más.",
    landingBelowP2: "Tarjetas RFID, botón y pantalla: juntos en el misterio.",
    landingBelowTitle: "Sigue el misterio",
    landingHeroAria: "Introducción",
    landingPlayChooseLanguage: "Idioma…",
    landingPlayLabel: "PRESIONA EL BOTÓN PARA EMPEZAR",
    buttonTapHoldHint: "Toca el botón para cambiar; mantén para elegir",
    landingPlayStarting: "Iniciando…",
    landingTitleLine1: "Contaminación",
    landingTitleLine2: "Misterio",
    logoBcCaption: "Ballerina Cappuccina — Dueña De Un Café",
    logoBhCaption: "Bacon Hair — Mecánico De Fábrica",
    logoSahurCaption: "Tung — Supervisor De Turno Nocturno",
    logoStripAria: "Sospechosos",
    logoStripScrollIntro: "Los sospechosos",
    playShortcutTitle: "Empezar (P)",
    revealPlayAgain: "Siguiente",
    sceneExitTitle: "Ríos sanos",
    exitQuizEyebrow: "Pregunta",
    exitQuizCorrect: "Correcto",
    exitQuizIncorrect: "Incorrecto",
    exitQuizNextHome: "Siguiente",
  },
} as const;

export type UiKey = keyof (typeof UI)["en"];

export function t(lang: Lang, key: UiKey): string {
  return UI[lang][key];
}

/** @deprecated Use pickCulpritForRound — kept for one-off reads of JSON config. */
export function culpritUid(roundCulprits: string[]): string {
  return roundCulprits[0] ?? "bacon_hair";
}

/** If `round_culprits` has a valid first uid, use it; otherwise pick uniformly at random. */
export function pickCulpritForRound(
  roster: CharacterJson[],
  roundCulprits: string[]
): string {
  if (roster.length === 0) return "bacon_hair";
  const fixed = roundCulprits[0];
  if (fixed && roster.some((c) => c.uid === fixed)) return fixed;
  return roster[Math.floor(Math.random() * roster.length)].uid;
}

/** One innocent or guilty alibi per suspect for this round (index 0–2), drawn from scene RNG. */
export function prepareSceneSuspects(
  picked: CharacterJson[],
  culpritUidParam: string,
  rng: SceneRandom
): CharacterJson[] {
  return picked.map((c) => {
    const guilty = c.uid === culpritUidParam;
    const idx = Math.floor(rng.float() * 3) as 0 | 1 | 2;
    const pool = guilty ? c.alibis_guilty : c.alibis_innocent;
    return {
      ...c,
      round_alibi_index: idx,
      round_alibi_guilty: guilty,
      suspicious_detail: pool[idx],
    };
  });
}

/** Suspects shown in the playing scene (random subset of the full roster). */
export const SUSPECTS_PER_SCENE = 3;

/**
 * Kiosk demo: when true, only {@link DEMO_ROSTER_UIDS} appear — good for a 3-card
 * tabletop; set false so each play draws a random trio + culprit from the full roster.
 */
export const DEMO_THREE_SUSPECT_ONLY = false;
export const DEMO_ROSTER_UIDS: readonly string[] = [
  "bacon_hair",
  "ballerina_cappuccina",
  "baconette_hair",
];

/** Restricts roster for {@link DEMO_THREE_SUSPECT_ONLY}; falls back if data is incomplete. */
export function filterDemoRoster(characters: CharacterJson[]): CharacterJson[] {
  if (!DEMO_THREE_SUSPECT_ONLY) return characters;
  const want = new Set(DEMO_ROSTER_UIDS);
  const filtered = characters.filter((c) => want.has(c.uid));
  return filtered.length > 0 ? filtered : characters;
}

/**
 * Picks up to `SUSPECTS_PER_SCENE` suspects for one play-through: always includes
 * the culprit, fills remaining slots with random others, then shuffles order.
 */
export function pickSceneSuspects(
  all: CharacterJson[],
  culpritUidValue: string,
  rng: SceneRandom
): CharacterJson[] {
  if (all.length === 0) return [];
  const cul = all.find((c) => c.uid === culpritUidValue);
  const others = all.filter((c) => c.uid !== culpritUidValue);
  const float = rng.float;
  if (!cul) {
    const copy = [...all];
    shuffleInPlaceSeeded(copy, float);
    return copy.slice(0, Math.min(SUSPECTS_PER_SCENE, copy.length));
  }
  const n = Math.min(SUSPECTS_PER_SCENE, all.length);
  const needOthers = n - 1;
  const o = [...others];
  shuffleInPlaceSeeded(o, float);
  const rest = o.slice(0, Math.min(needOthers, o.length));
  const combined = [cul, ...rest];
  shuffleInPlaceSeeded(combined, float);
  return combined;
}

export function charByUid(
  characters: CharacterJson[],
  uid: string
): CharacterJson | undefined {
  return characters.find((c) => c.uid === uid);
}

export function imageSrc(imagePath: string): string {
  if (!imagePath.trim()) return "";
  if (imagePath.startsWith("/")) return imagePath;
  const encodedPath = imagePath
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  if (
    import.meta.env.DEV &&
    imagePath.startsWith("assets/images/")
  ) {
    const file = imagePath.slice("assets/images/".length);
    const encodedFile = file
      .split("/")
      .map((seg) => encodeURIComponent(seg))
      .join("/");
    return `/game-assets/images/${encodedFile}`;
  }
  return `/${encodedPath}`;
}