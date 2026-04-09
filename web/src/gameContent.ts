import type { CharacterJson, CharactersApiResponse } from "./gameTypes";
import type { BostonCaseId } from "./bostonCaseIds";
import { characterAlibiPools } from "./caseAlibisByCase";
import {
  CLUES_BY_CASE,
  DEFAULT_CLUES_BY_CASE,
} from "./caseCluesByCase";
import { explanationsForCase } from "./caseExplanations";
import pack from "./data/characters.json";
import esOverlay from "./characterEs.json";
import type { Lang } from "./lang";
import {
  pickExitQuiz,
  type ExitQuizContent,
} from "./exitQuizBank";

export type { Lang } from "./lang";
export { BOSTON_CASE_IDS, pickRandomCase } from "./bostonCaseIds";
export type { BostonCaseId } from "./bostonCaseIds";

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
export function localizeCharacter(
  c: CharacterJson,
  lang: Lang,
  activeCase: BostonCaseId = "charles_river"
): CharacterJson {
  if (lang !== "es") return c;
  const es = ES[c.uid];
  if (!es) return c;
  const useCharlesRiverAlibis = activeCase === "charles_river";
  const merged: CharacterJson = {
    ...c,
    role: es.role,
    description: es.description,
    innocent_explanation: es.innocent_explanation,
    culprit_explanation: es.culprit_explanation,
    ...(useCharlesRiverAlibis
      ? {
          alibis_innocent: es.alibis_innocent,
          alibis_guilty: es.alibis_guilty,
        }
      : {}),
  };
  const i = c.round_alibi_index;
  if (
    useCharlesRiverAlibis &&
    i !== undefined &&
    i >= 0 &&
    i <= 2
  ) {
    const pool = c.round_alibi_guilty
      ? merged.alibis_guilty!
      : merged.alibis_innocent!;
    merged.suspicious_detail = pool[i]!;
  }
  return merged;
}

/** Localized character plus innocent/culprit reveal lines for the active Boston case. */
export function localizeCharacterForPlay(
  c: CharacterJson,
  lang: Lang,
  caseId: BostonCaseId
): CharacterJson {
  const base = localizeCharacter(c, lang, caseId);
  const { innocent_explanation, culprit_explanation } = explanationsForCase(
    base,
    caseId,
    lang
  );
  return { ...base, innocent_explanation, culprit_explanation };
}

export type SceneCaseStrings = {
  sceneTitle: string;
  sceneDescriptor: string;
  sceneContext: string;
  sceneExitTitle: string;
};

/** Case-specific headline copy for the playing + exit interstitial screens. */
export const SCENE_CASE_COPY: Record<BostonCaseId, Record<Lang, SceneCaseStrings>> = {
  charles_river: {
    en: {
      sceneTitle: "The Charles River Case",
      sceneDescriptor: "Tonight's mystery starts at the Charles River.",
      sceneContext:
        "Use the three clues to figure out who dumped waste into the Charles River last night.",
      sceneExitTitle: "Helping the Charles River stay healthy",
    },
    es: {
      sceneTitle: "El caso del río Charles",
      sceneDescriptor: "Esta noche el misterio empieza en el río Charles.",
      sceneContext:
        "Usa las tres pistas para averiguar quién vertió residuos en el río Charles anoche.",
      sceneExitTitle: "Cuidar el río Charles",
    },
  },
  boston_common: {
    en: {
      sceneTitle: "The Boston Common Case",
      sceneDescriptor:
        "Boston Common is the city’s shared front yard. Someone dumped bags and loose trash across the grass and paths, not in the bins.",
      sceneContext:
        "Use the three clues to find who trashed Boston Common last night and harmed the park everyone relies on.",
      sceneExitTitle: "Keeping Boston Common clean for everyone",
    },
    es: {
      sceneTitle: "El caso de Boston Common",
      sceneDescriptor:
        "Boston Common es el patio compartido de la ciudad: alguien tiró bolsas y basura suelta por el césped y los senderos, no en los contenedores.",
      sceneContext:
        "Usa las tres pistas para averiguar quién destrozó Boston Common anoche y perjudicó el parque del que todos dependen.",
      sceneExitTitle: "Mantener limpio Boston Common para todos",
    },
  },
  south_end: {
    en: {
      sceneTitle: "The South End Case",
      sceneDescriptor:
        "Illegal mining has started in the South End, tearing up streets, blocking the parade, and ruining the neighborhood for the whole city.",
      sceneContext:
        "Use the three clues to find who started mining in the South End and trashed the city’s streets and parade route.",
      sceneExitTitle: "Stopping illegal mining from ruining Boston’s streets",
    },
    es: {
      sceneTitle: "El caso del South End",
      sceneDescriptor:
        "Ha empezado minería ilegal en el South End: destroza calles, cierra el desfile y arruina el barrio para toda la ciudad.",
      sceneContext:
        "Usa las tres pistas para averiguar quién empezó a minar en el South End y destrozó las calles y la ruta del desfile.",
      sceneExitTitle: "Evitar que la minería ilegal arruine las calles de Boston",
    },
  },
  revere_beach: {
    en: {
      sceneTitle: "The Revere Beach Case",
      sceneDescriptor:
        "Someone is dumping trash straight into the water at Revere Beach: bags, plastic, and junk washing in with the tide.",
      sceneContext:
        "Use the three clues to find who is putting garbage into the ocean at Revere Beach instead of using bins and haul-away.",
      sceneExitTitle: "Keeping Revere Beach water clean",
    },
    es: {
      sceneTitle: "El caso de Revere Beach",
      sceneDescriptor:
        "Alguien está tirando basura al agua en Revere Beach: bolsas, plástico y desechos que entran con la marea.",
      sceneContext:
        "Usa las tres pistas para averiguar quién mete basura al mar en Revere Beach en vez de usar contenedores y retiro autorizado.",
      sceneExitTitle: "Cuidar el agua en Revere Beach",
    },
  },
};

export function sceneCaseCopy(
  lang: Lang,
  caseId: BostonCaseId
): SceneCaseStrings {
  return SCENE_CASE_COPY[caseId][lang];
}

const FUN_FACT: Record<Lang, string> = {
  en: "Even a small amount of factory oil can poison the fish, frogs, and insects that live in a river!",
  es: "¡Poco aceite de fábrica basta para envenenar peces y vida del río!",
};

const SOLUTIONS: Record<Lang, string[]> = {
  en: [
    "Check drain pipes automatically and share the results publicly.",
    "Plant bushes and grass near rivers. They filter dirty water before it gets in.",
    "Let workers report rule-breaking safely, without getting in trouble.",
  ],
  es: [
    "Revisar tuberías con sensores y publicar los datos.",
    "Plantar vegetación en la orilla. Filtra el agua antes de entrar al río.",
    "Que los trabajadores puedan reportar sin represalias.",
  ],
};

const EXIT_FACTS_BY_CASE: Record<BostonCaseId, Record<Lang, string[]>> = {
  charles_river: {
    en: [
      "The Charles River is much cleaner today than it used to be.",
    ],
    es: [
      "El río Charles está mucho más limpio hoy que antes.",
    ],
  },
  boston_common: {
    en: [
      "Litter brings rats and hurts the grass. Use the bins.",
    ],
    es: [
      "La basura atrae ratas y daña el césped. Usa los contenedores.",
    ],
  },
  south_end: {
    en: [
      "Secret digs tear up streets and block parades. Big street work needs a permit.",
    ],
    es: [
      "Las excavaciones clandestinas rompen calles y bloquean desfiles. La obra grande necesita permiso.",
    ],
  },
  revere_beach: {
    en: [
      "Trash in the water hurts people and wildlife. Pack out what you pack in.",
    ],
    es: [
      "La basura en el agua lastima a personas y animales. Llévate lo que traes.",
    ],
  },
};

export function exitFactsFor(lang: Lang, caseId: BostonCaseId): string[] {
  return EXIT_FACTS_BY_CASE[caseId][lang];
}

/** @deprecated Use exitFactsFor(lang, caseId); kept for single-case callers during migration. */
export function riverExitFactsFor(lang: Lang): string[] {
  return exitFactsFor(lang, "charles_river");
}

/** Post–fun-facts MCQ (easy); bank lives in `exitQuizBank.ts`. */
export type { ExitQuizContent };

/**
 * One quiz per play, chosen from 10 per scene/language. Uses the same `sceneSeed`
 * as the suspect roster so the question matches the case the visitor just played.
 */
export function exitQuizFor(
  lang: Lang,
  caseId: BostonCaseId,
  sceneSeed: number
): ExitQuizContent {
  return pickExitQuiz(lang, caseId, sceneSeed);
}

export function cluesFor(
  lang: Lang,
  culpritUid: string,
  caseId: BostonCaseId
): string[] {
  const triple = CLUES_BY_CASE[caseId][culpritUid]?.[lang];
  if (triple) return [...triple];
  return [...DEFAULT_CLUES_BY_CASE[lang][caseId]];
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
  rng: SceneRandom,
  caseId: BostonCaseId
): CaseClueItem[] {
  const triple = cluesFor(lang, culpritUid, caseId);
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
    sceneDescriptor: "Tonight's mystery starts at the Charles River.",
    sceneTitle: "The Charles River Case",
    sceneContext:
      "Use the three clues to figure out who dumped waste into the Charles River last night.",
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
    logoBcCaption: "Ballerina Cappuccina: Café Owner",
    logoBhCaption: "Bacon Hair: Factory Mechanic",
    logoSahurCaption: "Tung: Night Shift Supervisor",
    logoStripAria: "Story characters",
    logoStripScrollIntro: "Meet the suspects",
    playShortcutTitle: "Start (shortcut P)",
    sceneExitTitle: "Helping the Charles River stay healthy",
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
    sceneDescriptor: "Esta noche el misterio empieza en el río Charles.",
    sceneTitle: "El caso del río Charles",
    sceneContext:
      "Usa las tres pistas para averiguar quién vertió residuos en el río Charles anoche.",
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
    logoBcCaption: "Ballerina Cappuccina: Dueña De Un Café",
    logoBhCaption: "Bacon Hair: Mecánico De Fábrica",
    logoSahurCaption: "Tung: Supervisor De Turno Nocturno",
    logoStripAria: "Sospechosos",
    logoStripScrollIntro: "Los sospechosos",
    playShortcutTitle: "Empezar (P)",
    revealPlayAgain: "Siguiente",
    sceneExitTitle: "Cuidar el río Charles",
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
  rng: SceneRandom,
  caseId: BostonCaseId,
  lang: Lang
): CharacterJson[] {
  return picked.map((c) => {
    const guilty = c.uid === culpritUidParam;
    const idx = Math.floor(rng.float() * 3) as 0 | 1 | 2;
    const { innocent, guilty: guiltyPool } = characterAlibiPools(
      c,
      caseId,
      lang
    );
    const pool = guilty ? guiltyPool : innocent;
    return {
      ...c,
      alibis_innocent: innocent,
      alibis_guilty: guiltyPool,
      round_alibi_index: idx,
      round_alibi_guilty: guilty,
      suspicious_detail: pool[idx]!,
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