import type { CharacterJson } from "./gameTypes";

export type Lang = "en" | "es";

/** Used when GET /api/characters fails (e.g. Vite without bridge). */
export const FALLBACK_CHARACTERS: CharacterJson[] = [
  {
    uid: "bacon_hair",
    tag_ids: ["000000001"],
    name: "Bacon Hair",
    role: "Factory Worker",
    description:
      "He moves chemical drums around the factory. He's the only one allowed to roll them out.",
    suspicious_detail:
      "Security camera caught someone in his uniform rolling two chemical drums toward the river drain at 12:40 a.m.   and those drums never came back.",
    innocent_explanation:
      "If he were innocent, the drums would be on a truck receipt or back on the shelf — but they're not.",
    culprit_explanation:
      "He dumped the drums into the storm drain to skip the fee. The oil in the river matches exactly what he uses at work.",
    image: "assets/images/Bacon_Hair_Shoulder_Up-removebg-preview.png",
    led_color: [20, 120, 255],
  },
  {
    uid: "ballerina_cappuccina",
    tag_ids: ["000000002"],
    name: "Ballerina Cappuccina",
    role: "Café Owner",
    description:
      "She runs the riverside café. She only uses small bottles of soap and no big chemical drums.",
    suspicious_detail:
      "She left the café at 9:18 p.m. and was home and asleep by 10 p.m., two hours before the drums were moved.",
    innocent_explanation:
      "The river pollution is heavy machine oil — not café soap. Her timeline and trash clear her completely.",
    culprit_explanation:
      "She poured leftover cleaning chemicals behind her café for months. Rain washed them straight into the river.",
    image: "assets/images/Ballerina_cappuccina_shoulder_up-removebg-preview.png",
    led_color: [255, 80, 180],
  },
  {
    uid: "tung",
    tag_ids: ["3593868791"],
    name: "Tung Tung Tung Sahur",
    role: "Night Shift Supervisor",
    description:
      "He manages the night shift and safety paperwork and wasn't near the drums.",
    suspicious_detail:
      "At 12:40 a.m. he was on camera inside the building fixing a sensor. He had on a bright orange vest.",
    innocent_explanation:
      "He was on camera elsewhere in the building at the exact time the drums were moved, and he wears the wrong uniform color.",
    culprit_explanation:
      "Tung faked his night reports and dumped chemicals into the river during storms to save money.",
    image: "assets/images/TTTSahur_Shoulder_Up-removebg-preview.png",
    led_color: [255, 80, 20],
  },
];

/** Spanish display text for characters (API JSON stays English). */
const CHARACTER_ES: Record<
  string,
  Pick<
    CharacterJson,
    | "name"
    | "role"
    | "description"
    | "suspicious_detail"
    | "innocent_explanation"
    | "culprit_explanation"
  >
> = {
  bacon_hair: {
    name: "Bacon Hair",
    role: "Obrero de mantenimiento",
    description:
      "Mueve aceites y químicos en la fábrica. Solo su equipo puede sacar los bidones grandes.",
    suspicious_detail:
      "12:40 a.m.: en cámara, alguien con uniforme de mantenimiento lleva dos bidones al desagüe del río. Esos bidones no volvieron al almacén.",
    innocent_explanation:
      "Si fuera inocente, los bidones estarían en un albarán o en el estante — pero no están.",
    culprit_explanation:
      "Los vertió al desagüe para no pagar el tratamiento. El aceite del río coincide con el lubricante que usa en las máquinas.",
  },
  ballerina_cappuccina: {
    name: "Ballerina Cappuccina",
    role: "Dueña del café",
    description:
      "Tiene el café junto al río. Usa sprays y jabón en botella — no bidones de fábrica.",
    suspicious_detail:
      "Salió del café a las 9:18 p.m. y estaba en casa a las 10 p.m., antes del vídeo de los bidones a medianoche.",
    innocent_explanation:
      "El laboratorio dice que el río tiene aceite de máquina, no limpiadores de café. Su horario no encaja con el vídeo.",
    culprit_explanation:
      "Vertió restos de limpieza detrás del café durante meses; la lluvia los llevó al río.",
  },
  tung: {
    name: "Tung Tung Tung Sahur",
    role: "Supervisor de noche",
    description:
      "Turnos y papeleo de seguridad. Los supervisores no firman bidones de residuos — eso es mantenimiento.",
    suspicious_detail:
      "A las 12:40 a.m. las cámaras lo muestran dentro arreglando un sensor. En el vídeo de los bidones, la figura lleva naranja de mantenimiento, no amarillo de supervisor.",
    innocent_explanation:
      "En cámara está en otra zona del edificio cuando se mueven los bidones; además el uniforme no coincide.",
    culprit_explanation:
      "Falsificó informes y vertió químicos al río en tormentas para ahorrar.",
  },
};

export function localizeCharacter(c: CharacterJson, lang: Lang): CharacterJson {
  if (lang !== "es") return c;
  const es = CHARACTER_ES[c.uid];
  if (!es) return c;
  return { ...c, ...es };
}

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
    sceneDescriptor: "Tonight's mystery starts at the river.",
    sceneTitle: "The Riverside Case",
    sceneContext:
      "Use the three clues to figure out who dumped waste into the river last night.",
    sceneHint:
      "Scan a suspect card to find out more.",
    investigationActive: "Investigation Active",
    cluesTitle: "Case clues",
    confirmTitle: "IS THIS YOUR SUSPECT?",
    confirmButton: "Confirm",
    cancelHint: "Remove card to choose again",
    dossierAboutLabel: "Their job",
    dossierSuspiciousHeading: "What we know",
    suspiciousDetailLabel: "What we know",
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
    landingPlayLabel: "Play",
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
    confirmTitle: "¿ES ESTE TU SOSPECHOSO?",
    confirmButton: "Confirmar",
    cancelHint: "Quita la tarjeta para cambiar",
    dossierAboutLabel: "Su trabajo",
    dossierSuspiciousHeading: "Datos",
    suspiciousDetailLabel: "Datos",
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
    landingPlayLabel: "Jugar",
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

export function culpritUid(roundCulprits: string[]): string {
  return roundCulprits[0] ?? "bacon_hair";
}

export function charByUid(
  characters: CharacterJson[],
  uid: string
): CharacterJson | undefined {
  return characters.find((c) => c.uid === uid);
}

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