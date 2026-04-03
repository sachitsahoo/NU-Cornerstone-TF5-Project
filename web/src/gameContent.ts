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
      "He dumped the drums into the storm drain to skip the disposal fee. The oil in the river matches exactly what he uses at work.",
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
      "He manages the night shift and safety paperwork and wasn't near the drums",
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
    role: "Obrero de fábrica",
    description:
      "Mueve bidones de químicos por la fábrica. Es el único autorizado para sacarlos.",
    suspicious_detail:
      "La cámara de seguridad grabó a alguien con su uniforme rodando dos bidones hacia el desagüe del río a las 12:40 a.m. — y esos bidones nunca regresaron.",
    innocent_explanation:
      "Si fuera inocente, los bidones estarían en un albarán o de vuelta en el estante — pero no están.",
    culprit_explanation:
      "Tiró los bidones al desagüe para no pagar la eliminación. El aceite del río coincide exactamente con el que usa en el trabajo.",
  },
  ballerina_cappuccina: {
    name: "Ballerina Cappuccina",
    role: "Dueña del café",
    description:
      "Dirige el café junto al río. Solo usa botellas pequeñas de jabón — no tiene bidones grandes.",
    suspicious_detail:
      "Salió del café a las 9:18 p.m. y ya estaba en casa a las 10 p.m. — dos horas antes de que movieran los bidones. Su basura esa noche: solo vasos y cartón.",
    innocent_explanation:
      "La contaminación del río es aceite de máquina pesado — no jabón de café. Su horario y su basura la descartan.",
    culprit_explanation:
      "Durante meses vertió restos de limpiadores detrás del café. La lluvia los arrastraba directo al río.",
  },
  tung: {
    name: "Tung Tung Tung Sahur",
    role: "Supervisor de noche",
    description:
      "Gestiona el turno de noche y el papeleo de seguridad. Los supervisores no tocan los bidones — eso es trabajo del obrero.",
    suspicious_detail:
      "A las 12:40 a.m. estaba en cámara dentro del edificio arreglando un sensor. Los supervisores llevan chaleco amarillo — la persona del video lleva naranja de mantenimiento.",
    innocent_explanation:
      "Estaba en cámara en otra parte del edificio justo cuando movieron los bidones, y lleva el uniforme equivocado.",
    culprit_explanation:
      "Tung falsificó sus informes nocturnos y vertió químicos al río durante tormentas para ahorrar dinero.",
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
    "A maintenece worker moved chemical drums to the river drain.",
    "Only factory workers have the key and training to move drums.",
  ],
  es: [
    "La contaminación es aceite espeso de máquinas de fábrica — no jabón ni restos de comida.",
    "A las 12:40 a.m., alguien con uniforme de mantenimiento llevó bidones al desagüe del río.",
    "Solo los obreros de fábrica tienen la llave y el permiso para sacar esos bidones.",
  ],
};

const FUN_FACT: Record<Lang, string> = {
  en: "Even a small amount of factory oil can poison the fish, frogs, and insects that live in a river!",
  es: "¡Hasta una pequeña cantidad de aceite de fábrica puede envenenar los peces, ranas e insectos del río!",
};

const SOLUTIONS: Record<Lang, string[]> = {
  en: [
    "Check drain pipes automatically and share the results publicly.",
    "Plant bushes and grass near rivers — they filter dirty water before it gets in.",
    "Let workers report rule-breaking safely, without getting in trouble.",
  ],
  es: [
    "Revisar las tuberías automáticamente y publicar los resultados.",
    "Plantar arbustos y hierbas junto al río — filtran el agua sucia antes de que entre.",
    "Permitir que los trabajadores reporten problemas sin miedo a consecuencias.",
  ],
};

const RIVER_EXIT_FACTS: Record<Lang, string[]> = {
  en: [
    "Street drains lead straight to rivers — never pour paint or motor oil down them!",
    "Plants along the riverbank filter dirty runoff before it reaches the water.",
  ],
  es: [
    "¡Las alcantarillas van directo al río — no tires pintura ni aceite de motor!",
    "Las plantas en la orilla filtran el agua sucia antes de que llegue al río.",
  ],
};

export function riverExitFactsFor(lang: Lang): string[] {
  return RIVER_EXIT_FACTS[lang];
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
  },
  es: {
    chooseLanguage: "Elige tu idioma",
    langEnglish: "English",
    langSpanish: "Español",
    sceneEyebrow: "Expediente",
    sceneDescriptor: "El misterio de esta noche empieza en el río.",
    sceneTitle: "El caso del río",
    sceneContext:
      "Alguien vertió residuos en el río anoche. Usa las tres pistas para descubrir quién lo hizo.",
    sceneHint:
      "Escanea una tarjeta para ver el trabajo y la coartada del sospechoso — y compáralo con las pistas.",
    investigationActive: "Investigación en curso",
    cluesTitle: "Pistas del caso",
    confirmTitle: "¿ES ESTE TU SOSPECHOSO?",
    confirmButton: "Confirmar",
    cancelHint: "Quita la tarjeta para elegir de nuevo",
    dossierAboutLabel: "Su trabajo",
    dossierSuspiciousHeading: "Lo que sabemos",
    suspiciousDetailLabel: "Lo que sabemos",
    resultCorrect: "¡Lo lograste!",
    resultIncorrect: "¡Ese no es el culpable!",
    yourPick: "Tu elección",
    whyWrong: "Por qué no encaja",
    whyRight: "Por qué apunta la evidencia aquí",
    theRealAnswer: "¿Quién lo hizo?",
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
    landingBelowP1:
      "Desplázate para ver más de la experiencia.",
    landingBelowP2:
      "Las tarjetas RFID, el botón físico y la pantalla trabajan juntos para impulsar el misterio.",
    landingBelowTitle: "El misterio continúa",
    landingHeroAria: "Introducción",
    landingPlayChooseLanguage: "Elige el idioma…",
    landingPlayLabel: "Jugar",
    landingPlayStarting: "Iniciando…",
    landingTitleLine1: "Contaminación",
    landingTitleLine2: "Misterio",
    logoBcCaption: "Ballerina Cappuccina — dueña del café",
    logoBhCaption: "Bacon Hair — obrero de fábrica",
    logoSahurCaption: "Tung — supervisor de noche",
    logoStripAria: "Personajes de la historia",
    logoStripScrollIntro: "Conoce a los sospechosos",
    playShortcutTitle: "Empezar (atajo P)",
    revealPlayAgain: "Siguiente",
    sceneExitTitle: "Cómo cuidar los ríos",
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