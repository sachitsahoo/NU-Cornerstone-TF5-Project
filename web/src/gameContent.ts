import type { CharacterJson } from "./gameTypes";

export type Lang = "en" | "es";

/** Used when GET /api/characters fails (e.g. Vite without bridge). */
export const FALLBACK_CHARACTERS: CharacterJson[] = [
  {
    uid: "steve",
    tag_ids: ["390485036"],
    name: "Steve",
    role: "Factory Manager",
    description:
      "Steve runs the big factory by the river. He seems nice, but some of his records are missing.",
    suspicious_detail:
      "His waste logs have gaps every few months — right when the river turned dirty.",
    innocent_explanation:
      "The missing records were from a computer upgrade. Inspectors checked his pipes and everything was okay.",
    culprit_explanation:
      "Steve was secretly dumping factory chemicals into the storm drain! Lab tests matched chemicals from his factory.",
    image: "assets/images/steve_logo.png",
    led_color: [255, 80, 20],
  },
  {
    uid: "tung",
    tag_ids: ["3593868791"],
    name: "Tung Tung Tung Sahur",
    role: "Night-shift Supervisor",
    description:
      "Tung works at the factory at night. He can go almost anywhere on site.",
    suspicious_detail:
      "Workers saw his van near the river drain at 3am — several times!",
    innocent_explanation:
      "Security cameras showed Tung was fixing broken machines. He just drove past the drain on his way back.",
    culprit_explanation:
      "Tung faked his night reports and poured chemicals into the river during storms to save money.",
    image: "assets/images/sahur_logo.png",
    led_color: [20, 120, 255],
  },
];

const CLUES: Record<Lang, string[]> = {
  en: [
    "Slimy bubbles and rainbow slick on the water near the drain after rain.",
    "Fewer fish were spotted the month night shifts doubled.",
    "A broken fence lets vehicles sneak down to the riverbank.",
  ],
  es: [
    "Burbujas viscosas y manchas de colores en el agua cerca del desagüe tras la lluvia.",
    "Se vieron menos peces el mes en que se duplicaron los turnos nocturnos.",
    "Una valla rota permite que vehículos lleguen al río sin ser vistos.",
  ],
};

const FUN_FACT: Record<Lang, string> = {
  en: "Factory chemicals can make river water look shiny or foamy — and even small amounts can hurt fish, frogs, and bugs that live there!",
  es: "Los químicos de fábrica pueden hacer que el agua del río parezca brillante o espumosa — ¡y hasta una pequeña cantidad puede dañar peces, ranas e insectos!",
};

const SOLUTIONS: Record<Lang, string[]> = {
  en: [
    "Check drain pipes automatically and share the results with everyone.",
    "Plant bushes and grasses near rivers — they catch dirty water before it gets in!",
    "Let workers report rule-breaking without getting into trouble.",
  ],
  es: [
    "Revisar las tuberías automáticamente y compartir los resultados con todos.",
    "Plantar arbustos y hierbas junto al río — ¡atrapan el agua sucia antes de que entre!",
    "Permitir que los trabajadores reporten irregularidades sin miedo a consecuencias.",
  ],
};

export function cluesFor(lang: Lang): string[] {
  return CLUES[lang];
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
    sceneTitle: "The riverside scene",
    sceneContext:
      "Someone polluted the river last night and hurt the animals! Use the clues to figure out who did it.",
    sceneHint: "Put a suspect card on the reader to learn more.",
    cluesTitle: "Clues",
    confirmTitle: "Is this your suspect?",
    confirmBody: "Press the big button to make your choice!",
    confirmButton: "Confirm",
    cancelHint: "Remove the card to pick someone else.",
    suspiciousDetailLabel: "Why they’re suspicious",
    resultCorrect: "You got it!",
    resultIncorrect: "Not quite...",
    yourPick: "Your pick",
    whyWrong: "Why this doesn’t fit",
    whyRight: "Why the evidence points here",
    theRealAnswer: "What really happened",
    funFactLabel: "Did you know?",
    solutionsLabel: "How can we fix it?",
    continue: "Play again",
    needTagFirst: "Scan a suspect card first.",
  },
  es: {
    chooseLanguage: "Elige tu idioma",
    langEnglish: "English",
    langSpanish: "Español",
    sceneEyebrow: "Expediente",
    sceneTitle: "La escena junto al río",
    sceneContext:
      "¡Alguien contaminó el río anoche y lastimó a los animales! Usa las pistas para descubrir quién fue.",
    sceneHint: "Pon la tarjeta de un sospechoso en el lector para saber más.",
    cluesTitle: "Pistas",
    confirmTitle: "¿Es este tu sospechoso?",
    confirmBody: "¡Presiona el botón grande para hacer tu elección!",
    confirmButton: "Confirmar",
    cancelHint: "Quita la tarjeta para elegir a otra persona.",
    suspiciousDetailLabel: "Por qué son sospechosos",
    resultCorrect: "¡Lo lograste!",
    resultIncorrect: "Casi...",
    yourPick: "Tu elección",
    whyWrong: "Por qué no encaja",
    whyRight: "Por qué apunta la evidencia aquí",
    theRealAnswer: "Lo que pasó en realidad",
    funFactLabel: "¿Sabías que...?",
    solutionsLabel: "¿Cómo podemos arreglarlo?",
    continue: "Jugar de nuevo",
    needTagFirst: "Primero escanea una tarjeta de sospechoso.",
  },
} as const;

export type UiKey = keyof (typeof UI)["en"];

export function t(lang: Lang, key: UiKey): string {
  return UI[lang][key];
}

export function culpritUid(roundCulprits: string[]): string {
  return roundCulprits[0] ?? "steve";
}

export function charByUid(
  characters: CharacterJson[],
  uid: string
): CharacterJson | undefined {
  return characters.find((c) => c.uid === uid);
}

export function imageSrc(imagePath: string): string {
  if (imagePath.startsWith("/")) return imagePath;
  return `/${imagePath}`;
}
