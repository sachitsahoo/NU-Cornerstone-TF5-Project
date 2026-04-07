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
    "The pollution is machine oil.",
    "A maintenance worker moved chemical drums to the river drain.",
    "Only factory workers have the key and training to move drums.",
  ],
  es: [
    "La contaminación es aceite de máquina.",
    "Un obrero de mantenimiento llevó bidones al desagüe del río.",
    "Solo los obreros tienen llave y permiso para mover esos bidones.",
  ],
};

/**
 * Three clues: (1) pollution = factory machine oil (2) how that oil ties to this scene/role (3) simple role.
 */
const CLUES_BY_CULPRIT: Record<string, Record<Lang, readonly [string, string, string]>> = {
  bacon_hair: {
    en: [
      "The pollution is machine oil from the factory.",
      "He rolls big oil drums between the machines and the river.",
      "He fixes machines and moves those drums at work.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Él rueda bidones de aceite entre las máquinas y el río.",
      "Arregla máquinas y mueve esos bidones en el trabajo.",
    ],
  },
  ballerina_cappuccina: {
    en: [
      "The pollution is machine oil from the factory.",
      "Greasy soap and degreaser from her café washed toward the river.",
      "She runs the café right next to the river.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Jabón graso y desengrasante de su café fue hacia el río.",
      "Ella tiene el café pegado al río.",
    ],
  },
  tung: {
    en: [
      "The pollution is machine oil from the factory.",
      "The oil left the plant on trucks he signed off on his forms.",
      "He is the night boss who signs factory papers.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "El aceite salió de la planta en camiones que él firmó en papeles.",
      "Él es el jefe de noche que firma papeles de la fábrica.",
    ],
  },
  roblox_noob: {
    en: [
      "The pollution is machine oil from the factory.",
      "That oil only comes from big drums like the ones at the plant.",
      "He helps at the museum but does not work in the plant.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Ese aceite solo sale de bidones grandes como los de la planta.",
      "Él ayuda en el museo pero no trabaja en la planta.",
    ],
  },
  roblox_guest: {
    en: [
      "The pollution is machine oil from the factory.",
      "Moving that much oil takes factory keys and training.",
      "He is a day visitor, not a factory worker.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Mover tanto aceite pide llaves y práctica de la fábrica.",
      "Él es visitante de un día, no obrero de fábrica.",
    ],
  },
  baconette_hair: {
    en: [
      "The pollution is machine oil from the factory.",
      "Small oil bottles were hidden under her snack cart.",
      "She sells snacks on the path by the river.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Botes de aceite pequeños estaban escondidos bajo su carrito.",
      "Ella vende snacks en el camino junto al río.",
    ],
  },
  peeley: {
    en: [
      "The pollution is machine oil from the factory.",
      "Oil got on his work clothes after he took off the banana suit.",
      "He wears the banana suit at the museum.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Aceite manchó su ropa de trabajo al quitarse el traje de plátano.",
      "Él usa el traje de plátano en el museo.",
    ],
  },
  agent_67: {
    en: [
      "The pollution is machine oil from the factory.",
      "Oil from his tripod and camera bag matches the river.",
      "He shoots video by the river for the city.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "El aceite de su trípode y su bolsa coincide con el río.",
      "Él graba vídeo junto al río para la ciudad.",
    ],
  },
  roblox_builder: {
    en: [
      "The pollution is machine oil from the factory.",
      "The oil on the kids’ build table is the same as in the river.",
      "He helps kids build things at the museum.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "El aceite de la mesa de los niños es el mismo que en el río.",
      "Él ayuda a los niños a armar cosas en el museo.",
    ],
  },
  elsa: {
    en: [
      "The pollution is machine oil from the factory.",
      "Stage fog mixed with oil and washed into the drain.",
      "She is in the winter light show on the plaza.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Niebla de escenario se mezcló con aceite y entró al desagüe.",
      "Ella sale en el show de luces de invierno en la plaza.",
    ],
  },
  steve: {
    en: [
      "The pollution is machine oil from the factory.",
      "Factory oil from the drums stuck to his gloves after he changed clothes.",
      "He is the blocky game mascot.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Aceite de los bidones pegó a sus guantes al cambiarse de ropa.",
      "Él es la mascota del juego con forma de bloques.",
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
    logoBcCaption: "Ballerina Cappuccina — café owner",
    logoBhCaption: "Bacon Hair — factory worker",
    logoSahurCaption: "Tung — night supervisor",
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
    logoBcCaption: "Ballerina Cappuccina — café",
    logoBhCaption: "Bacon Hair — fábrica",
    logoSahurCaption: "Tung — supervisor",
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

/** One random innocent or guilty alibi per suspect for this round (index 0–2). */
export function prepareSceneSuspects(
  picked: CharacterJson[],
  culpritUidParam: string
): CharacterJson[] {
  return picked.map((c) => {
    const guilty = c.uid === culpritUidParam;
    const idx = Math.floor(Math.random() * 3) as 0 | 1 | 2;
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

function shuffleInPlace<T>(xs: T[]): void {
  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [xs[i], xs[j]] = [xs[j], xs[i]];
  }
}

/**
 * Picks up to `SUSPECTS_PER_SCENE` suspects for one play-through: always includes
 * the culprit, fills remaining slots with random others, then shuffles order.
 */
export function pickSceneSuspects(
  all: CharacterJson[],
  culpritUidValue: string
): CharacterJson[] {
  if (all.length === 0) return [];
  const cul = all.find((c) => c.uid === culpritUidValue);
  const others = all.filter((c) => c.uid !== culpritUidValue);
  if (!cul) {
    const copy = [...all];
    shuffleInPlace(copy);
    return copy.slice(0, Math.min(SUSPECTS_PER_SCENE, copy.length));
  }
  const n = Math.min(SUSPECTS_PER_SCENE, all.length);
  const needOthers = n - 1;
  const o = [...others];
  shuffleInPlace(o);
  const rest = o.slice(0, Math.min(needOthers, o.length));
  const combined = [cul, ...rest];
  shuffleInPlace(combined);
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