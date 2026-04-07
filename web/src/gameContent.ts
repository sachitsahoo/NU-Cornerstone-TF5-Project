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
 * Three clues: (1) factory machine oil (2) evidence trail, slightly inferential (3) narrows to one card without naming them.
 */
const CLUES_BY_CULPRIT: Record<string, Record<Lang, readonly [string, string, string]>> = {
  bacon_hair: {
    en: [
      "The pollution is machine oil from the factory.",
      "Video shows drums rolling from the plant toward the river.",
      "Only the crew that fixes machines is allowed to move those drums.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "El vídeo muestra bidones que salen de la planta hacia el río.",
      "Solo el equipo que arregla máquinas puede mover esos bidones.",
    ],
  },
  ballerina_cappuccina: {
    en: [
      "The pollution is machine oil from the factory.",
      "Grease traced back to a café patio one step from the water.",
      "One suspect’s shop opens straight onto the river path.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Grasa llevó la pista a la terraza de un café junto al agua.",
      "El local de un sospechoso da directo al paseo del río.",
    ],
  },
  tung: {
    en: [
      "The pollution is machine oil from the factory.",
      "The oil shows up on paperwork that does not match a real truck run.",
      "One suspect signs the night forms when oil leaves the plant.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "El aceite figura en papeles que no coinciden con un camión real.",
      "Un sospechoso firma de noche los formularios cuando sale aceite de la planta.",
    ],
  },
  roblox_noob: {
    en: [
      "The pollution is machine oil from the factory.",
      "The spill pattern matches plant drums, not maps or scavenger gear.",
      "One suspect greets visitors at the museum, not the oil line.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "La mancha coincide con bidones de planta, no con mapas ni juegos.",
      "Un sospechoso recibe visitas en el museo, no en la línea de aceite.",
    ],
  },
  roblox_guest: {
    en: [
      "The pollution is machine oil from the factory.",
      "A spill this size usually moves through the plant gate, not the lobby.",
      "One suspect’s pass only works until closing time.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Un derrame así suele salir por la planta, no por el vestíbulo.",
      "El pase de un sospechoso solo vale hasta el cierre.",
    ],
  },
  baconette_hair: {
    en: [
      "The pollution is machine oil from the factory.",
      "Tests find the same oil tucked under a food cart liner.",
      "One suspect wheels snacks along the walking path.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Pruebas hallan el mismo aceite bajo el forro de un carrito de comida.",
      "Un sospechoso empuja snacks por el camino del paseo.",
    ],
  },
  peeley: {
    en: [
      "The pollution is machine oil from the factory.",
      "Work pants picked up oil right after a full costume change.",
      "One suspect’s job is to wear a big suit for kids.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Un mono de trabajo cogió aceite justo tras cambiar de disfraz entero.",
      "El trabajo de un sospechoso es usar un traje grande para niños.",
    ],
  },
  agent_67: {
    en: [
      "The pollution is machine oil from the factory.",
      "The same oil type smears his tripod legs and the water sample.",
      "One suspect films where the city cleans the riverbank.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "El mismo tipo de aceite mancha las patas del trípode y el agua.",
      "Un sospechoso graba donde la ciudad limpia la orilla del río.",
    ],
  },
  roblox_builder: {
    en: [
      "The pollution is machine oil from the factory.",
      "The slick matches oil from the kids’ demo table, not the main plant line.",
      "One suspect teaches builds at the museum workshop.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "La mancha coincide con aceite de la mesa demo de niños, no con la línea principal.",
      "Un sospechoso enseña armados en el taller del museo.",
    ],
  },
  elsa: {
    en: [
      "The pollution is machine oil from the factory.",
      "Show fog and the pipe oil shared the same storm drain.",
      "One suspect’s show runs on the plaza stage at night.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Niebla del show y aceite de tubería compartieron el mismo desagüe.",
      "El show de un sospechoso es de noche en el escenario de la plaza.",
    ],
  },
  steve: {
    en: [
      "The pollution is machine oil from the factory.",
      "Work gloves picked up oil, not foam from a costume prop.",
      "One suspect wears a blocky head for the game weekend crowd.",
    ],
    es: [
      "La contaminación es aceite de máquina de la fábrica.",
      "Guantes de trabajo cogieron aceite, no espuma de disfraz.",
      "Un sospechoso usa cabeza cuadrada para el evento del juego.",
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
    logoBcCaption: "Ballerina Cappuccina — Riverside Café Owner",
    logoBhCaption: "Bacon Hair — Plant Maintenance Worker",
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
    logoBcCaption: "Ballerina Cappuccina — Propietaria de Café Ribereño",
    logoBhCaption: "Bacon Hair — Técnico de Mantenimiento de Planta",
    logoSahurCaption: "Tung — Supervisor de Turno Nocturno",
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