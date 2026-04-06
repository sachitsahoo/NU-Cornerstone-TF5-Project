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
  {
    uid: "roblox_noob",
    tag_ids: ["3594000001"],
    name: "Roblox Noob",
    role: "Riverside Museum Volunteer",
    description:
      "A cheerful volunteer who hands out visitor maps and runs the kids' scavenger hunt. He never goes near the factory dock or chemical drums.",
    suspicious_detail:
      "Riverside path camera, 8:45 p.m.: he was leading a family scavenger hunt with glow sticks and paper clues — no maintenance uniform, no drum keys, and no route toward the storm drain. His badge only scans at public areas.",
    innocent_explanation:
      "The river oil matches factory drums — not scavenger gear. He has no access to the maintenance corridor or the drums that moved at 12:40 a.m.",
    culprit_explanation:
      "He borrowed a maintenance badge after hours and rolled drums to the drain to avoid disposal fees — the oil still matches the factory stock he could only reach with that stolen access.",
    image: "",
    led_color: [255, 220, 60],
  },
  {
    uid: "roblox_guest",
    tag_ids: ["3594000002"],
    name: "Roblox Guest",
    role: "Guest Pass Visitor",
    description:
      "A day visitor on the classic guest-style pass. He photographs the skyline and leaves when the café closes — no factory clearance and no drum training.",
    suspicious_detail:
      "Lobby logs: his badge exits at 9:05 p.m. Phone records show a ride-share pickup downtown at 9:22 p.m. River cameras after midnight never show him near the storm drain or the factory fence.",
    innocent_explanation:
      "He was off-site hours before the drums moved. The midnight figure is in maintenance gear on the plant path — not a guest pass at the river walk.",
    culprit_explanation:
      "He slipped back in with a borrowed uniform and used a guest pass as cover — the drain video still matches his height and gait from older security stills.",
    image: "",
    led_color: [180, 180, 200],
  },
  {
    uid: "baconette_hair",
    tag_ids: ["3594000003"],
    name: "Baconette Hair",
    role: "River Walk Snack Cart Vendor",
    description:
      "She sells candy and cold drinks along the river walk. Her cart is tiny — no room for chemical drums — and she is not on the factory waste team.",
    suspicious_detail:
      "Riverside scene: closing receipts show she packed the cart at 8:30 p.m. Path cameras show her rolling toward the parking lot, away from the factory drain, well before the midnight drum run.",
    innocent_explanation:
      "Heavy machine oil from factory drums does not match snack-cart supplies. Her route and timeline point away from the drain.",
    culprit_explanation:
      "She hid small chemical jugs under the cart liner and poured them into the drain during late restocks — runoff carried them into the river after rain.",
    image: "",
    led_color: [255, 105, 180],
  },
  {
    uid: "peeley",
    tag_ids: ["3594000004"],
    name: "Peeley",
    role: "Costume Character (Banana Suit)",
    description:
      "A banana suit performer for family events. The suit lives in the costume closet — not the chemical room — and he does not handle factory waste.",
    suspicious_detail:
      "Riverside program: at 10:00 p.m. he was still in the museum atrium for costume tear-down. Security shows the full banana suit — no spare hands for rolling drums, and the exit to the storm drain stayed locked until staff left.",
    innocent_explanation:
      "The drain video shows a maintenance silhouette, not a bulky banana suit. His alibi is on camera inside the building during the drum movement window.",
    culprit_explanation:
      "He changed out of the suit in a loading bay and moved drums in maintenance coveralls stashed in his gear bag — the river samples still trace to the factory lubricants he accessed through a service door.",
    image: "",
    led_color: [255, 230, 80],
  },
  {
    uid: "agent_67",
    tag_ids: ["3594000005"],
    name: "67",
    role: "River Cleanup Documentarian",
    description:
      "Films 'before and after' shots for the volunteer cleanup crew. He carries a camera and tripod — not barrel keys or hazmat tags.",
    suspicious_detail:
      "Riverside bench camera, 11:45 p.m.: he was setting up a tripod facing upstream, away from the storm drain. Factory cameras still catch the drums rolling toward the drain at 12:40 a.m. while he stays on the public bench feed.",
    innocent_explanation:
      "He never crosses into the plant yard where the drums leave the building. The oil signature points to factory stock, not camera gear.",
    culprit_explanation:
      "He staged shots to hide trips to the drain between takes — traces on his tripod feet match mud at the grate matched to the same oil found in the water.",
    image: "",
    led_color: [100, 200, 255],
  },
  {
    uid: "roblox_builder",
    tag_ids: ["3594000006"],
    name: "Roblox Builder",
    role: "STEM Workshop Facilitator",
    description:
      "Runs the hands-on build table where kids snap together models and simple circuits. He carries plastic bins of parts and tools — not hazmat drums or factory keys.",
    suspicious_detail:
      "Riverside workshop log: he locked the tool cabinet at 9:50 p.m. and signed out through the lobby. Night security shows him in the workshop bay until 11:20 p.m. — nowhere near the factory storm drain when the drums roll at 12:40 a.m.",
    innocent_explanation:
      "His badge and cameras keep him on the education wing. The drain video shows maintenance gear on the plant path — not a workshop apron and part bins.",
    culprit_explanation:
      "He stashed spare lubricant from a donated demo kit and poured it down the drain after a late teardown — lab tests still tie the oil to the same factory stock the kit was meant to mimic.",
    image: "",
    led_color: [70, 180, 130],
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
  roblox_noob: {
    name: "Roblox Noob",
    role: "Voluntario del museo",
    description:
      "Voluntario alegre que reparte mapas y organiza la búsqueda del tesoro infantil. No entra en el muelle de la fábrica ni en bidones químicos.",
    suspicious_detail:
      "Cámara del sendero, 8:45 p.m.: guiaba una familia con varitas y pistas — sin uniforme de mantenimiento, sin llaves de bidón y sin ruta al desagüe. Su tarjeta solo marca zonas públicas.",
    innocent_explanation:
      "El aceite del río coincide con bidones de fábrica, no con material de juego. No tiene acceso al pasillo de mantenimiento ni a los bidones de las 12:40 a.m.",
    culprit_explanation:
      "Tomó prestada una tarjeta de mantenimiento y llevó bidones al desagüe para evitar tasas — el aceite sigue coincidiendo con el stock al que solo pudo acceder así.",
  },
  roblox_guest: {
    name: "Roblox Guest",
    role: "Visitante con pase",
    description:
      "Visitante de día con pase estilo clásico. Fotografía el horizonte y se va al cerrar el café — sin permiso de fábrica ni formación con bidones.",
    suspicious_detail:
      "Registro del vestíbulo: su pase sale a las 9:05 p.m. El móvil muestra un coche a las 9:22 p.m. Cámaras del río después de medianoche no lo muestran junto al desagüe ni la valla de la fábrica.",
    innocent_explanation:
      "Estaba fuera del sitio horas antes de moverse los bidones. La figura de medianoche lleva ropa de mantenimiento en la planta — no un pase de invitado en el paseo.",
    culprit_explanation:
      "Volvió con un uniforme prestado y usó el pase como tapadera — el vídeo del desagüe coincide con su altura y forma en fotos antiguas de seguridad.",
  },
  baconette_hair: {
    name: "Baconette Hair",
    role: "Vendedora de carrito",
    description:
      "Vende dulces y bebidas en el paseo del río. Su carrito es pequeño — sin sitio para bidones — y no está en el equipo de residuos de la fábrica.",
    suspicious_detail:
      "Escena del río: el cierre muestra que recogió el carrito a las 8:30 p.m. Las cámaras la mueven hacia el aparcamiento, lejos del desagüe, antes de la carrera de bidones a medianoche.",
    innocent_explanation:
      "El aceite de máquina de bidones no coincide con suministros del carrito. Su ruta y horario se alejan del desagüe.",
    culprit_explanation:
      "Escondió botes pequeños bajo el forro del carrito y los vertió al desagüe en repostajes tardíos — la lluvia los llevó al río.",
  },
  peeley: {
    name: "Peeley",
    role: "Personaje disfraz (plátano)",
    description:
      "Animador con traje de plátano para eventos familiares. El traje está en el guardarropa — no en la sala química — y no gestiona residuos de fábrica.",
    suspicious_detail:
      "Programa del río: a las 10:00 p.m. seguía en el atrio desmontando el traje. Las cámaras muestran el traje entero — sin manos libres para bidones — y la salida al desagüe cerrada hasta que salió el personal.",
    innocent_explanation:
      "El vídeo del desagüe muestra una silueta de mantenimiento, no un plátano voluminoso. Su coartada queda en cámara dentro del edificio.",
    culprit_explanation:
      "Se cambió en un muelle y movió bidones con mono de mantenimiento guardado en su bolsa — las muestras del río siguen enlazando lubricantes de fábrica.",
  },
  agent_67: {
    name: "67",
    role: "Documentalista de limpieza",
    description:
      "Filma el antes y el después para el equipo de voluntarios. Lleva cámara y trípode — no llaves de bidón ni etiquetas de residuos.",
    suspicious_detail:
      "Cámara del banco del río, 11:45 p.m.: montaba un trípode río arriba, lejos del desagüe. Las cámaras de la fábrica siguen mostrando bidones hacia el desagüe a las 12:40 a.m. mientras él sigue en la zona pública.",
    innocent_explanation:
      "No cruza el patio de la planta donde salen los bidones. La firma del aceite apunta al stock de fábrica, no al equipo de cámara.",
    culprit_explanation:
      "Montó tomas para ocultar idas al desagüe entre planos — barro en el trípode coincide con el mismo aceite del agua.",
  },
  roblox_builder: {
    name: "Roblox Builder",
    role: "Facilitador del taller STEM",
    description:
      "Dirige la mesa de montaje donde los niños arman modelos y circuitos sencillos. Lleva cajas de piezas y herramientas — no bidones ni llaves de fábrica.",
    suspicious_detail:
      "Registro del taller junto al río: cerró el armario de herramientas a las 9:50 p.m. y salió por el vestíbulo. Seguridad nocturna lo muestra en el taller hasta las 11:20 p.m. — lejos del desagüe cuando los bidones se mueven a las 12:40 a.m.",
    innocent_explanation:
      "Su tarjeta y las cámaras lo mantienen en el ala educativa. El vídeo del desagüe muestra ropa de mantenimiento en la planta — no delantal de taller ni cajas de piezas.",
    culprit_explanation:
      "Guardó lubricante sobrante de un kit de demostración y lo vertió al desagüe tras un desmontaje tardío — el laboratorio sigue enlazando el aceite con el mismo stock de fábrica que el kit imitaba.",
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