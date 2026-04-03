import type { CharacterJson } from "./gameTypes";

export type Lang = "en" | "es";

/** Used when GET /api/characters fails (e.g. Vite without bridge). */
export const FALLBACK_CHARACTERS: CharacterJson[] = [
  {
    uid: "bacon_hair",
    tag_ids: ["000000001"],
    name: "Bacon Hair",
    role: "Factory Maintenance Worker",
    description:
      "Bacon Hair keeps the factory machines running. He has access to every corner of the building — even the waste storage room.",
    suspicious_detail:
      "He was seen carrying heavy drums near the river drain late at night, just before the pollution was discovered.",
    innocent_explanation:
      "The drums held old motor oil he was hauling to the certified recycling drop-off. His receipt checks out.",
    culprit_explanation:
      "Bacon Hair skipped the recycling fee and dumped chemical waste straight into the storm drain. Lab samples matched oil from the factory's machines.",
    image: "assets/images/Bacon_Hair_Shoulder_Up-removebg-preview.png",
    led_color: [20, 120, 255],
  },
  {
    uid: "ballerina_cappuccina",
    tag_ids: ["000000002"],
    name: "Ballerina Cappuccina",
    role: "Riverside Café Owner",
    description:
      "Ballerina Cappuccina runs the popular café right on the riverbank. She uses lots of cleaning supplies to keep the place sparkling.",
    suspicious_detail:
      "Empty bottles of industrial cleaner were found hidden in the bushes near the river — the same brand she orders by the case.",
    innocent_explanation:
      "She threw out the empties during a big spring clean and forgot to sort them for recycling. No traces of her cleaners matched the river samples.",
    culprit_explanation:
      "Ballerina Cappuccina poured leftover cleaning chemicals behind her café for months. Runoff carried them straight into the river after every rain.",
    image: "assets/images/Ballerina_cappuccina_shoulder_up-removebg-preview.png",
    led_color: [255, 80, 180],
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
    image: "assets/images/TTTSahur_Shoulder_Up-removebg-preview.png",
    led_color: [255, 80, 20],
  },
];

const CLUES: Record<Lang, string[]> = {
  en: [
    "There's soap in the river after rain.",
    "Longer factory shifts, fewer fish.",
    "Broken fence: cars reach the bank.",
  ],
  es: [
    "Jabón en el río tras la lluvia.",
    "Más turnos en la fábrica, menos peces.",
    "Valla rota: coches hasta la orilla.",
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
    sceneDescriptor: "Tonight’s mystery starts at the river.",
    sceneTitle: "The Riverside Case",
    sceneContext:
      "Someone polluted the river last night and hurt the animals! Use the clues to figure out who did it.",
    sceneHint: "Put a suspect card on the reader to learn more.",
    investigationActive: "Investigation Active",
    cluesTitle: "Clues",
    confirmTitle: "IS THIS YOUR SUSPECT?",
    confirmButton: "Confirm",
    cancelHint: "Remove card to choose again",
    dossierAboutLabel: "Who they are",
    dossierSuspiciousHeading: "Why they're suspicious",
    suspiciousDetailLabel: "Why they’re suspicious",
    resultCorrect: "YOU GOT IT!",
    resultIncorrect: "Wrong suspect!",
    yourPick: "Your pick",
    whyWrong: "Why this doesn’t fit",
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
    navDone: "Let’s solve it!",
    reviewCase: "Review the case file",
  },
  es: {
    chooseLanguage: "Elige tu idioma",
    langEnglish: "English",
    langSpanish: "Español",
    sceneEyebrow: "Expediente",
    sceneDescriptor: "El misterio de esta noche empieza en el río.",
    sceneTitle: "El caso del río",
    sceneContext:
      "¡Alguien contaminó el río anoche y lastimó a los animales! Usa las pistas para descubrir quién fue.",
    sceneHint: "Pon la tarjeta de un sospechoso en el lector para saber más.",
    investigationActive: "Investigación en curso",
    cluesTitle: "Pistas",
    confirmTitle: "¿Es este tu sospechoso?",
    confirmButton: "Confirmar",
    cancelHint: "Quita la tarjeta para elegir de nuevo",
    dossierAboutLabel: "Quién es",
    dossierSuspiciousHeading: "Por qué es sospechoso",
    suspiciousDetailLabel: "Por qué son sospechosos",
    resultCorrect: "¡Lo lograste!",
    resultIncorrect: "¡Ese no es el culpable!",
    yourPick: "Tu elección",
    whyWrong: "Por qué no encaja",
    whyRight: "Por qué apunta la evidencia aquí",
    theRealAnswer: "¿Quién lo hizo?",
    revealPlayAgain: "Jugar de nuevo",
    funFactLabel: "¿Sabías que...?",
    solutionsLabel: "¿Cómo podemos arreglarlo?",
    continue: "SIGUIENTE",
    needTagFirst: "Primero escanea una tarjeta de sospechoso.",
    navBack: "Atrás",
    navHome: "Inicio",
    navCase: "Caso",
    navSkip: "Saltar",
    navNext: "Próximo",
    navDone: "¡A resolverlo!",
    reviewCase: "Ver el expediente",
  },
} as const;

export type UiKey = keyof (typeof UI)["en"];

export function t(lang: Lang, key: UiKey): string {
  return UI[lang][key];
}

export function culpritUid(roundCulprits: string[]): string {
  return roundCulprits[0] ?? "bacon_hair";
}

export function charByUid(
  characters: CharacterJson[],
  uid: string
): CharacterJson | undefined {
  return characters.find((c) => c.uid === uid);
}

/**
 * Character art lives under repo `assets/images/` (served by bridge at `/assets/...`).
 * In Vite dev, `/assets` is proxied to the bridge; when the bridge is off, map to
 * copies in `web/public/game-assets/images/` so cards still load.
 */
export function imageSrc(imagePath: string): string {
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
