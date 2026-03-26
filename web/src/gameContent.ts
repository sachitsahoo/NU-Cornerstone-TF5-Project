import type { CharacterJson } from "./gameTypes";

export type Lang = "en" | "es";

/** Used when GET /api/characters fails (e.g. Vite without bridge). */
export const FALLBACK_CHARACTERS: CharacterJson[] = [
  {
    uid: "steve",
    tag_ids: ["390485036"],
    name: "Steve",
    role: "Factory Manager",
    description: "",
    suspicious_detail: "",
    innocent_explanation:
      "Steve's gaps in paperwork were from a software migration — independent audits showed his discharge pipes met standards during the incident window.",
    culprit_explanation:
      "Steve had been secretly diverting industrial waste into the storm drain. Lab traces matched solvents used only in his finishing line.",
    image: "assets/images/steve_logo.png",
    led_color: [255, 80, 20],
  },
  {
    uid: "tung",
    tag_ids: ["3593868791"],
    name: "Tung Tung Tung Sahur",
    role: "Night-shift Supervisor",
    description: "",
    suspicious_detail: "",
    innocent_explanation:
      "Security footage confirmed Tung was responding to equipment alarms; his route only passed the outflow on the way to the control room.",
    culprit_explanation:
      "Tung falsified night logs and flushed concentrated brine during storms to avoid treatment costs, overwhelming the river's buffer.",
    image: "assets/images/sahur_logo.png",
    led_color: [20, 120, 255],
  },
];

const CLUES: Record<Lang, string[]> = {
  en: [
    "Foam and sheen on the water near the outfall after storms.",
    "Fish counts dropped the month night shifts doubled.",
    "A broken fence lets vehicles reach the embankment unseen.",
  ],
  es: [
    "Espuma y brillo en el agua cerca del desagüe tras las tormentas.",
    "El número de peces bajó el mes en que se duplicaron los turnos nocturnos.",
    "Una valla rota permite que vehículos lleguen al terraplén sin ser vistos.",
  ],
};

const FUN_FACT: Record<Lang, string> = {
  en: "Industrial runoff often carries oils and solvents that form visible sheens and harm aquatic life in slow-moving rivers.",
  es: "El escurrimiento industrial suele arrastrar aceites y disolventes que forman brillos visibles y dañan la vida acuática en ríos lentos.",
};

const SOLUTIONS: Record<Lang, string[]> = {
  en: [
    "Require real-time monitoring at outfalls and public dashboards.",
    "Buffer zones with native plants filter runoff before it reaches water.",
    "Whistleblower protections encourage workers to report illegal dumping.",
  ],
  es: [
    "Exigir monitoreo en tiempo real en los desagües y tableros públicos.",
    "Zonas de amortiguación con plantas nativas filtran el escurrimiento antes de llegar al agua.",
    "Protección a denunciantes para que trabajadores reporten vertidos ilegales.",
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
      "Last night, polluted runoff reached the riverbank and wildlife was harmed. Use the clues to identify who caused it.",
    sceneHint: "Place a suspect card on the reader to investigate.",
    cluesTitle: "Clues",
    confirmTitle: "Confirm your selection?",
    confirmBody: "Press the physical button to lock in this suspect.",
    confirmButton: "Confirm",
    cancelHint: "Remove the card to pick someone else.",
    resultCorrect: "Correct!",
    resultIncorrect: "Not quite",
    yourPick: "Your pick",
    whyWrong: "Why this doesn’t fit",
    whyRight: "Why the evidence points here",
    theRealAnswer: "What really happened",
    funFactLabel: "Fun fact",
    solutionsLabel: "Solutions that help",
    continue: "Continue",
    needTagFirst: "Scan a suspect card first.",
  },
  es: {
    chooseLanguage: "Elige tu idioma",
    langEnglish: "English",
    langSpanish: "Español",
    sceneEyebrow: "Expediente",
    sceneTitle: "La escena junto al río",
    sceneContext:
      "Anoche, el escurrimiento contaminado llegó a la orilla del río y dañó la vida silvestre. Usa las pistas para descubrir quién lo causó.",
    sceneHint: "Coloca la tarjeta de un sospechoso en el lector para investigar.",
    cluesTitle: "Pistas",
    confirmTitle: "¿Confirmas tu elección?",
    confirmBody: "Presiona el botón físico para confirmar a este sospechoso.",
    confirmButton: "Confirmar",
    cancelHint: "Quita la tarjeta para elegir a otra persona.",
    resultCorrect: "¡Correcto!",
    resultIncorrect: "Casi",
    yourPick: "Tu elección",
    whyWrong: "Por qué no encaja",
    whyRight: "Por qué apunta la evidencia aquí",
    theRealAnswer: "Lo que pasó en realidad",
    funFactLabel: "Dato curioso",
    solutionsLabel: "Soluciones que ayudan",
    continue: "Continuar",
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
