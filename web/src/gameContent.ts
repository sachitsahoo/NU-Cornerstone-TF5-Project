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
    role: "Trabajador de mantenimiento de fábrica",
    description:
      "Bacon Hair mantiene en marcha las máquinas de la fábrica. Tiene acceso a cada rincón del edificio, incluso al almacén de residuos.",
    suspicious_detail:
      "Lo vieron cargando bidones pesados cerca del desagüe del río a altas horas de la noche, justo antes de descubrirse la contaminación.",
    innocent_explanation:
      "Los bidones tenían aceite de motor viejo que llevaba al punto de reciclaje certificado. Su recibo cuadra.",
    culprit_explanation:
      "Bacon Hair se saltó la tarifa de reciclaje y vertió residuos químicos directamente en el sumidero de tormentas. Las muestras de laboratorio coincidieron con el aceite de las máquinas de la fábrica.",
  },
  ballerina_cappuccina: {
    name: "Ballerina Cappuccina",
    role: "Dueña del café junto al río",
    description:
      "Ballerina Cappuccina regenta el popular café a orillas del río. Usa muchos productos de limpieza para que todo brille.",
    suspicious_detail:
      "Encontraron botellas vacías de limpiador industrial escondidas entre los arbustos junto al río, la misma marca que pide por cajas.",
    innocent_explanation:
      "Tiró los envases vacíos durante una gran limpieza de primavera y olvidó separarlos para reciclar. Ningún rastro de sus limpiadores coincidió con las muestras del río.",
    culprit_explanation:
      "Ballerina Cappuccina vertía restos de productos de limpieza detrás del café durante meses. La escorrentía los llevaba al río tras cada lluvia.",
  },
  tung: {
    name: "Tung Tung Tung Sahur",
    role: "Supervisor del turno de noche",
    description:
      "Tung trabaja de noche en la fábrica. Casi puede ir a cualquier parte de las instalaciones.",
    suspicious_detail:
      "Los trabajadores vieron su furgoneta cerca del desagüe del río a las 3 de la mañana — ¡varias veces!",
    innocent_explanation:
      "Las cámaras de seguridad mostraron que Tung arreglaba máquinas rotas. Solo pasó junto al desagüe de vuelta.",
    culprit_explanation:
      "Tung falsificó sus informes nocturnos y vertió químicos en el río durante las tormentas para ahorrar dinero.",
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

/** Short tips after The Riverside Case — shown on the exit “loading” interstitial. */
const RIVER_EXIT_FACTS: Record<Lang, string[]> = {
  en: [
    "Many street drains lead straight to rivers — never pour paint, motor oil, or soapy wash water down them!",
    "Trees and plants along the bank slow dirty runoff so soil and roots can filter water before it reaches the river.",
    "Picking up litter near water keeps plastic and wrappers away from fish, ducks, and turtles.",
    "Rain washes oil drips from roads into streams — fixing car leaks helps protect the whole watershed.",
    "Weird colors, foam, or a strong smell in the water? Tell a trusted adult so they can report it early.",
    "Using less lawn fertilizer means fewer chemicals washing into creeks and rivers every time it rains.",
  ],
  es: [
    "¡Muchas alcantarillas de la calle van directo al río — no tires pintura, aceite de motor ni agua muy jabonosa!",
    "Árboles y plantas en la orilla frenan el agua sucia para que la tierra y las raíces la filtren antes del río.",
    "Recoger basura cerca del agua aleja plástico y envoltorios de peces, patos y tortugas.",
    "La lluvia arrastra manchas de aceite de la calle a los arroyos — arreglar fugas del auto ayuda a todo el vecindario.",
    "¿Colores raros, espuma u olor fuerte en el agua? Cuéntaselo a un adulto de confianza para que puedan avisar.",
    "Usar menos fertilizante en el césped reduce los químicos que entran a arroyos y ríos con cada lluvia.",
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
    landingBelowP1:
      "Scroll to explore more of the experience. The next build will layer in gameplay, hardware cues, and story beats that match your final product spec.",
    landingBelowP2:
      "Hardware events drive the mystery: RFID tags, the physical button, and on-screen feedback work together.",
    landingBelowTitle: "The mystery continues",
    landingHeroAria: "Introduction",
    landingPlayChooseLanguage: "Choose language…",
    landingPlayLabel: "Play",
    landingPlayStarting: "Starting…",
    landingTitleLine1: "Polluter",
    landingTitleLine2: "Mystery",
    logoBcCaption: "Ballerina Cappuccina — café owner",
    logoBhCaption: "Bacon Hair — factory maintenance",
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
      "Desplázate para ver más de la experiencia. Las próximas versiones añadirán juego, señales del hardware y momentos de historia según tu especificación final.",
    landingBelowP2:
      "El misterio funciona con el hardware: las tarjetas RFID, el botón físico y lo que ves en pantalla trabajan juntos.",
    landingBelowTitle: "El misterio continúa",
    landingHeroAria: "Introducción",
    landingPlayChooseLanguage: "Elige el idioma…",
    landingPlayLabel: "Jugar",
    landingPlayStarting: "Iniciando…",
    landingTitleLine1: "Contaminación",
    landingTitleLine2: "Misterio",
    logoBcCaption: "Ballerina Cappuccina — dueña del café",
    logoBhCaption: "Bacon Hair — mantenimiento de fábrica",
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
