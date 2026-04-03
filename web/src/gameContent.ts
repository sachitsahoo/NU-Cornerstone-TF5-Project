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
      "His everyday job is moving oils and chemicals between the factory floor and the waste dock. He is on the only team allowed to roll the big chemical drums.",
    suspicious_detail:
      "12:40 a.m. security clip: someone in a maintenance uniform rolls two chemical drums along the path toward the storm drain that leads to the river. That night, no pickup truck was scheduled and those drum serial numbers never checked back into storage.",
    innocent_explanation:
      "If he were innocent, those drums would be on a truck receipt or back on the shelf — but they are not.",
    culprit_explanation:
      "He dumped the drums into the storm drain to skip the disposal fee. Lab tests matched the river oil to the exact lubricant used on the factory machines he services.",
    image: "assets/images/Bacon_Hair_Shoulder_Up-removebg-preview.png",
    led_color: [20, 120, 255],
  },
  {
    uid: "ballerina_cappuccina",
    tag_ids: ["000000002"],
    name: "Ballerina Cappuccina",
    role: "Riverside Café Owner",
    description:
      "She runs the café on the river path. The shop closes at 9 p.m. She uses small spray bottles and dish soap — the café does not keep giant factory chemical drums.",
    suspicious_detail:
      "Neighborhood camera: her car left the café parking lot at 9:18 p.m. Overnight trash was only coffee grounds, cups, and cardboard — no drums. She was asleep at home by 10 p.m. when the factory cameras show the drums moving.",
    innocent_explanation:
      "The lab says the river pollution is heavy machine oil, not her café cleaners. Her timeline and trash do not match the midnight drum video.",
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
      "He handles night schedules and safety paperwork. Supervisors do not sign out waste drums — only maintenance does.",
    suspicious_detail:
      "At 3:12 a.m. his van stopped near the drain while he dropped off a toolbox for a sensor repair. Gate logs show his cargo area empty both ways — no drums. Inside the plant, time-stamped cameras place him on the repair floor during the 12:40 a.m. drum video, and supervisors wear yellow vests while the figure in the video wears maintenance orange.",
    innocent_explanation:
      "The person moving drums is in maintenance gear during a time he is on camera elsewhere in the building. His van never carried barrels that night.",
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
      "Su trabajo diario es mover aceites y químicos entre la planta y el muelle de residuos. Es del único equipo autorizado a mover los bidones químicos grandes.",
    suspicious_detail:
      "Video de seguridad 12:40 a.m.: alguien con uniforme de mantenimiento rueda dos bidones químicos por el camino hacia el sumidero que va al río. Esa noche no había camión programado y esos números de bidón nunca volvieron al almacén.",
    innocent_explanation:
      "Si fuera inocente, los bidones estarían en un albarán de camión o de vuelta en el estante — pero no lo están.",
    culprit_explanation:
      "Vertió los bidones en el sumidero para no pagar la tarifa de eliminación. El laboratorio igualó el aceite del río con el lubricante exacto de las máquinas que él atiende.",
  },
  ballerina_cappuccina: {
    name: "Ballerina Cappuccina",
    role: "Dueña del café junto al río",
    description:
      "Regenta el café junto al río. Cierra a las 9 p.m. Usa pulverizadores pequeños y jabón para platos — el café no guarda bidones gigantes de fábrica.",
    suspicious_detail:
      "Cámara del vecindario: su coche salió del parking del café a las 9:18 p.m. La basura de la noche solo tenía posos de café, vasos y cartón — sin bidones. Ya dormía en casa antes de las 10 p.m. cuando las cámaras de la fábrica mueven los bidones.",
    innocent_explanation:
      "El laboratorio dice que la contaminación es aceite de máquina pesado, no sus limpiadores del café. Su horario y su basura no coinciden con el video de medianoche.",
    culprit_explanation:
      "Ballerina Cappuccina vertía restos de productos de limpieza detrás del café durante meses. La escorrentía los llevaba al río tras cada lluvia.",
  },
  tung: {
    name: "Tung Tung Tung Sahur",
    role: "Supervisor del turno de noche",
    description:
      "Gestiona turnos de noche y papeleo de seguridad. Los supervisores no firman bidones de residuos — solo mantenimiento.",
    suspicious_detail:
      "A las 3:12 a.m. su furgoneta paró cerca del desagüe mientras dejaba una caja de herramientas para arreglar un sensor. Los registros de la puerta muestran la carga vacía en ambos sentidos — sin bidones. Dentro de la planta, cámaras con hora lo sitúan en el taller de reparaciones durante el video de los bidones a las 12:40 a.m., y los supervisores llevan chaleco amarillo mientras la figura del video lleva naranja de mantenimiento.",
    innocent_explanation:
      "Quien mueve los bidones va de mantenimiento en un momento en que él aparece en otra parte del edificio en cámara. Su furgoneta nunca llevó barriles esa noche.",
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
    "Lab result: the pollution is thick factory machine oil — not café soap or food waste.",
    "12:40 a.m. security video: a person in a maintenance uniform rolls big chemical drums toward the storm drain that feeds the river.",
    "Only the maintenance team has the key and training to move those drums out of the factory.",
  ],
  es: [
    "Resultado de laboratorio: la contaminación es aceite espeso de máquinas de fábrica — no jabón del café ni restos de comida.",
    "Video de seguridad 12:40 a.m.: una persona con uniforme de mantenimiento rueda bidones químicos grandes hacia el sumidero que va al río.",
    "Solo el equipo de mantenimiento tiene la llave y la formación para sacar esos bidones de la fábrica.",
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

/** Short tips after The Riverside Case — shown on the exit “loading” interstitial (two beats only). */
const RIVER_EXIT_FACTS: Record<Lang, string[]> = {
  en: [
    "Many street drains lead straight to rivers — never pour paint, motor oil, or soapy wash water down them!",
    "Trees and plants along the bank slow dirty runoff so soil and roots can filter water before it reaches the river.",
  ],
  es: [
    "¡Muchas alcantarillas de la calle van directo al río — no tires pintura, aceite de motor ni agua muy jabonosa!",
    "Árboles y plantas en la orilla frenan el agua sucia para que la tierra y las raíces la filtren antes del río.",
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
      "Someone dumped waste into the river last night. The three clues tell you what kind of pollution it was and who could have put it there. Open each suspect’s file and find who matches every clue.",
    sceneHint:
      "Scan a suspect’s card on the reader. You’ll see what they do for work and what we know about their night — then compare to the clue list.",
    investigationActive: "Investigation Active",
    cluesTitle: "Case clues",
    confirmTitle: "IS THIS YOUR SUSPECT?",
    confirmButton: "Confirm",
    cancelHint: "Remove card to choose again",
    dossierAboutLabel: "What they do",
    dossierSuspiciousHeading: "What we know",
    suspiciousDetailLabel: "What we know",
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
      "Anoche alguien vertió residuos en el río. Las tres pistas te dicen qué tipo de contaminación es y quién pudo hacerlo. Abre el expediente de cada sospechoso y busca a quien encaje con todas las pistas.",
    sceneHint:
      "Escanea la tarjeta de un sospechoso en el lector. Verás qué hace en el trabajo y lo que sabemos de su noche — luego compáralo con la lista de pistas.",
    investigationActive: "Investigación en curso",
    cluesTitle: "Pistas del caso",
    confirmTitle: "¿Es este tu sospechoso?",
    confirmButton: "Confirmar",
    cancelHint: "Quita la tarjeta para elegir de nuevo",
    dossierAboutLabel: "Qué hace",
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
