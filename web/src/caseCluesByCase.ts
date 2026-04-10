/**
 * Three clue lines per culprit per Boston case (EN/ES). All 12 character uids appear under
 * charles_river, boston_common, south_end, and revere_beach — not river-only.
 */
import type { BostonCaseId } from "./bostonCaseIds";
import type { Lang } from "./lang";

export type ClueTriple = readonly [string, string, string];

/** Three clues per culprit per case (EN/ES). */
export const CLUES_BY_CASE: Record<
  BostonCaseId,
  Record<string, Record<Lang, ClueTriple>>
> = {
  charles_river: {
    bacon_hair: {
      en: [
        "The stain is thick factory oil bound for the river.",
        "Video shows drums rolling toward the storm drain.",
        "Scrape marks match a cart from the machine yard.",
      ],
      es: [
        "La mancha es aceite grueso de fábrica rumbo al río.",
        "El video muestra bidones rodando hacia el desagüe de tormenta.",
        "Los rayones coinciden con un carrito del patio de máquinas.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "Factory machine oil stains sit near the Charles River.",
        "Greasy smears lead toward her cafe patio on the walk.",
        "The trail runs between the factory and her river cafe.",
      ],
      es: [
        "Hay manchas de aceite de fábrica cerca del río Charles.",
        "Manchas grasientas llevan a la terraza de su café en el paseo.",
        "La pista va entre la fábrica y su café junto al río.",
      ],
    },
    tung: {
      en: [
        "Test samples match the same oil that reached the Charles River.",
        "Truck papers list a river pickup that never really happened.",
        "The wrong form shows a night shift stamp on the bottom.",
      ],
      es: [
        "Las pruebas coinciden con el mismo aceite que llegó al río Charles.",
        "Papeles del camión listan una recogida al río que nunca pasó.",
        "El formulario equivocado muestra un sello de turno nocturno abajo.",
      ],
    },
    roblox_noob: {
      en: [
        "The mess is factory drum pollution bound for the Charles River.",
        "The stain pattern fits factory drums by the Charles River.",
        "A hunt photo shows the time by the Charles River museum steps.",
      ],
      es: [
        "El desastre es contaminación de bidones rumbo al río Charles.",
        "El patrón de mancha encaja con bidones junto al río Charles.",
        "Una foto de la caza muestra la hora en las escaleras del museo del río Charles.",
      ],
    },
    roblox_guest: {
      en: [
        "Charles River samples match this same factory oil blend.",
        "This much oil usually rolls on the freight road toward the river.",
        "Lobby logs show an exit before drums rolled toward the river.",
      ],
      es: [
        "Muestras del río Charles coinciden con esta misma mezcla de aceite.",
        "Tanto aceite suele ir por la ruta de carga hacia el río.",
        "El registro del vestíbulo muestra salida antes de que rueden bidones al río.",
      ],
    },
    baconette_hair: {
      en: [
        "Crews traced this slick to the same factory oil type.",
        "Oil pooled under a cart liner, not a kitchen sink drain.",
        "Snack wrappers by the stain match a cart brand on the path.",
      ],
      es: [
        "Equipos rastrearon esta mancha al mismo tipo de aceite de fábrica.",
        "Aceite charcó bajo un forro de carrito, no en un desagüe de cocina.",
        "Envoltorios junto a la mancha coinciden con una marca de carrito en el camino.",
      ],
    },
    peeley: {
      en: [
        "The Charles River mess is factory machine oil.",
        "Oil hit work clothes after he changed near the Charles River.",
        "Costume fluff from his suit stuck to a drum at the grate.",
      ],
      es: [
        "El desastre del río Charles es aceite de máquina de fábrica.",
        "Aceite manchó ropa de trabajo tras cambiarse cerca del río Charles.",
        "Pelusa de su traje quedó pegada a un bidón en la rejilla.",
      ],
    },
    agent_67: {
      en: [
        "Charles River tests show the same factory machine oil.",
        "Tripod legs carry the same grease as the river sample.",
        "A camera sat on the mud bank by the Charles River.",
      ],
      es: [
        "Pruebas del río Charles muestran el mismo aceite de máquina de fábrica.",
        "Las patas del trípode llevan la misma grasa que la muestra del río.",
        "Una cámara quedó en el barro junto al río Charles.",
      ],
    },
    roblox_builder: {
      en: [
        "Charles River oil matches the same factory blend.",
        "The oil matches kids' demo tubes, not the big plant pipe.",
        "A kids' room door sits close to the Charles River grate.",
      ],
      es: [
        "El aceite del río Charles coincide con la misma mezcla de fábrica.",
        "El aceite coincide con tubitos de demo, no con el tubo grande de planta.",
        "Una puerta del salón de niños queda cerca de la rejilla del río Charles.",
      ],
    },
    elsa: {
      en: [
        "Crews found factory oil inside the same river drain pipe.",
        "Her fog show and the pipe oil used one Charles River drain.",
        "Plaza rehearsal time matched the oil hitting the river drain.",
      ],
      es: [
        "Equipos hallaron aceite de fábrica dentro del mismo tubo del desagüe.",
        "Su show de niebla y el aceite del tubo usaron un desagüe del río Charles.",
        "La hora del ensayo en la plaza coincidió con el aceite en el desagüe del río.",
      ],
    },
    steve: {
      en: [
        "Charles River pollution is the same factory machine oil.",
        "Work gloves picked up oil, not foam from the suit by the river.",
        "The mascot head cannot fit through the drum room door there.",
      ],
      es: [
        "La contaminación del río Charles es el mismo aceite de máquina de fábrica.",
        "Guantes de trabajo recogieron aceite, no espuma del traje junto al río.",
        "La cabeza del disfraz no cabe por la puerta del cuarto de bidones allí.",
      ],
    },
    spyder_sammy: {
      en: [
        "Charles River samples show factory oil right at the drain.",
        "A torn label for illegal chemicals sat by the Charles River drain.",
        "Hoses and a stop list were left by the Charles River drain.",
      ],
      es: [
        "Muestras del río Charles muestran aceite de fábrica justo en el desagüe.",
        "Una etiqueta rota de químicos ilegales quedó junto al desagüe del río Charles.",
        "Mangueras y una lista de paradas quedaron junto al desagüe del río Charles.",
      ],
    },
  },
  boston_common: {
    bacon_hair: {
      en: [
        "Huge trash bags showed up on the Frog Pond grass overnight.",
        "Factory drum labels were mixed deep into the heap.",
        "Neighbors heard a metal cart on the path after park closing.",
      ],
      es: [
        "Bolsas enormes aparecieron en el césped del Frog Pond de la noche a la mañana.",
        "Etiquetas de bidones de fábrica estaban mezcladas en el montón.",
        "Vecinos oyeron un carrito de metal en el sendero tras cerrar el parque.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "Snack trash and cup sleeves run through layers of the pile.",
        "Grease-smudged receipts match the thin paper her register uses.",
        "Coffee grounds in the bags match the blend her cafe brews.",
      ],
      es: [
        "Basura de snacks y fundas de vaso aparecen en capas del montón.",
        "Recibos manchados de grasa coinciden con el papel fino de su caja.",
        "Posos de café en las bolsas coinciden con la mezcla que prepara.",
      ],
    },
    tung: {
      en: [
        "Shift papers cite a park-side pickup with no dump stamp.",
        "Orange crew tape was wrapped tight around bag handles.",
        "His key card opened a maintenance gate onto the Common.",
      ],
      es: [
        "Papeles de turno citan recogida junto al parque sin sello de vertido.",
        "Cinta naranja del equipo envolvía fuerte las asas de las bolsas.",
        "Su tarjeta abrió un portón de mantenimiento que da al Common.",
      ],
    },
    roblox_noob: {
      en: [
        "Fresh museum tour flyers were tucked under the top trash layer.",
        "A hunt stamp on cardboard matches his Wednesday route card.",
        "Badge readers log a staff exit toward the park during the dump window.",
      ],
      es: [
        "Volantes nuevos del tour del museo estaban bajo la capa superior de basura.",
        "Un sello de caza en cartón coincide con su tarjeta de ruta del miércoles.",
        "Lectores de tarjeta registran salida de personal al parque en la hora del vertido.",
      ],
    },
    roblox_guest: {
      en: [
        "Guest-pass scans cluster when the bag piles were first reported.",
        "A rideshare dropped someone with a folding dolly at Park Street.",
        "Recovered texts ask where to unload contractor bags before sunrise.",
      ],
      es: [
        "Escaneos de pase de invitado se agrupan cuando se reportaron las pilas.",
        "Un viaje compartido dejó a alguien con carrito plegable en Park Street.",
        "Mensajes recuperados preguntan dónde descargar bolsas de obra antes del alba.",
      ],
    },
    baconette_hair: {
      en: [
        "Snack wrappers from her-only brands sit deep in the pile.",
        "Narrow wheel ruts in the dew match a street cart width.",
        "Other vendors heard her fight for lawn space for a promo.",
      ],
      es: [
        "Envoltorios de marcas solo suyas están hondo en el montón.",
        "Surcos estrechos en el rocío coinciden con el ancho de carrito callejero.",
        "Otros vendedores la oyeron pelear por espacio en el césped para promo.",
      ],
    },
    peeley: {
      en: [
        "Yellow costume fibers snagged on a torn liner in the heap.",
        "A social post on the Common shows bags stacked behind him.",
        "Security logged him leaving a service bay with a loaded cart.",
      ],
      es: [
        "Fibras amarillas del disfraz enganchadas en forro roto del montón.",
        "Una publicación en el Common muestra bolsas apiladas detrás de él.",
        "Seguridad lo registró saliendo de bahía de servicio con carrito cargado.",
      ],
    },
    agent_67: {
      en: [
        "Straight drag marks from a hard camera case cross the grass.",
        "Clips show contractor bags with a tripod leg in the corner.",
        "Photo sale times line up with the city's first cleanup report.",
      ],
      es: [
        "Marcas rectas de arrastre de maletín de cámara cruzan el césped.",
        "Clips muestran bolsas de obra con pata de trípode en la esquina.",
        "Horas de venta de fotos coinciden con el primer reporte de limpieza.",
      ],
    },
    roblox_builder: {
      en: [
        "Plywood scraps with workshop paint codes sat under food trash.",
        "Sawdust under bags matches samples from the museum shop floor.",
        "A dolly checked out for education programs sat beside a mound.",
      ],
      es: [
        "Retazos de madera con códigos de pintura del taller bajo restos de comida.",
        "Aserrín bajo bolsas coincide con muestras del suelo del taller del museo.",
        "Un carrito firmado para programas educativos quedó junto a un montón.",
      ],
    },
    elsa: {
      en: [
        "Stage glitter and confetti are pressed into grease-stained bags.",
        "Empty fog bottles in the pile match her show concentrate orders.",
        "Crew sheets list a borrowed flatbed for scenic flats that night.",
      ],
      es: [
        "Purpurina y confeti de escenario van incrustados en bolsas manchadas de grasa.",
        "Botellas vacías de niebla en el montón coinciden con pedidos de concentrado.",
        "Hojas de equipo listan plataforma prestada para paneles escénicos esa noche.",
      ],
    },
    steve: {
      en: [
        "Foam glove lining picked up grease from buried fast-food wrappers.",
        "Fan photos place him in full suit blocks away before the mess.",
        "Square mascot boot prints pressed into mud by the largest heap.",
      ],
      es: [
        "El forro de guante de espuma recogió grasa de envoltorios de comida rápida enterrados.",
        "Fotos de fans lo sitúan con traje completo a varias cuadras antes del desorden.",
        "Huellas de bota cuadrada de mascota marcaron barro junto al montón más grande.",
      ],
    },
    spyder_sammy: {
      en: [
        "Pesticide caps from a non-permit brand rolled from a split bag.",
        "Truck GPS shows a slow pass beside the Common during the dump.",
        "Oily marks on a torn liner match a bottle from his truck cab.",
      ],
      es: [
        "Tapas de pesticida de marca no permitida salieron de bolsa rota.",
        "GPS del camión muestra paso lento junto al Common durante el vertido.",
        "Marcas aceitosas en forro roto coinciden con botella de su cabina.",
      ],
    },
  },
  south_end: {
    bacon_hair: {
      en: [
        "Coal dust on the parade lane matches bags from his loading dock.",
        "Heavy cart tracks run from the floats to a fake mine tent.",
        "Boot prints by the tarps match plaster casts from his locker.",
      ],
      es: [
        "Polvo de carbón en el carril coincide con bolsas de su muelle de carga.",
        "Huellas de carrito pesado van de las carrozas a una carpa de mina falsa.",
        "Huellas de bota junto a lonas coinciden con moldes de yeso de su casillero.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "A rented generator was cabled to the wooden street barriers.",
        "Grand-opening flyers from her shop were stapled to the barriers.",
        "Noise complaints from her block match the hour the march stopped.",
      ],
      es: [
        "Un generador alquilado estaba cableado a las vallas de madera.",
        "Volantes de inauguración de su local estaban grapados a las vallas.",
        "Quejas de ruido de su cuadra coinciden con la hora en que paró el desfile.",
      ],
    },
    tung: {
      en: [
        "Changed truck lists name coal drops on streets with no parade permit.",
        "His orange safety vest was wadded on prop coal sacks.",
        "After-hours logs show his card at a fenced yard by the route.",
      ],
      es: [
        "Listas de camión cambiadas nombran calles sin permiso de desfile.",
        "Su chaleco naranja de seguridad estaba arrugado sobre sacos de carbón de utilería.",
        "Registros nocturnos muestran su tarjeta en un patio cercado junto a la ruta.",
      ],
    },
    roblox_noob: {
      en: [
        "Gift-shop maps in his writing mark a fake mine on the parade path.",
        "Tour guests heard him call the setup a South End coal adventure.",
        "Laminated tour badges were zip-tied to the caution tape barriers.",
      ],
      es: [
        "Mapas de tienda con su letra marcan una mina falsa en la ruta del desfile.",
        "Visitas del tour lo oyeron llamar al montaje aventura de carbón del South End.",
        "Gafetes laminados del tour iban amarrados a la cinta de precaución en vallas.",
      ],
    },
    roblox_guest: {
      en: [
        "His day pass scanned at each police barrier on the closed leg.",
        "Recovered texts ask where to stack coal props before go time.",
        "A wood rental receipt lists this morning and a Tremont corner.",
      ],
      es: [
        "Su pase diario se escaneó en cada barrera policial del tramo cerrado.",
        "Mensajes recuperados preguntan dónde apilar utilería de carbón antes de la hora.",
        "Un recibo de alquiler de madera lista esta mañana y una esquina de Tremont.",
      ],
    },
    baconette_hair: {
      en: [
        "Her snack cart sat sideways blocking the float build lane overnight.",
        "Coal dust from her wheels matches grit by the barrier pile.",
        "Marshals recall her arguing over a filming spot on the route.",
      ],
      es: [
        "Su carrito de snacks quedó de lado bloqueando el carril de carrozas toda la noche.",
        "Polvo de carbón en sus ruedas coincide con arena junto al montón de vallas.",
        "Oficiales recuerdan que discutió por un lugar para filmar en la ruta.",
      ],
    },
    peeley: {
      en: [
        "Yellow suit cloth caught on a nail holding a coal stunt banner.",
        "A livestream tag places his phone behind the fake mine set.",
        "Banana peel stickers littered the cordoned parade pavement.",
      ],
      es: [
        "Tela amarilla del traje enganchada en clavo de pancarta de truco de carbón.",
        "Una etiqueta de transmisión en vivo ubica su celular detrás de la mina falsa.",
        "Pegatinas de cáscara de plátano cubrían el pavimento acordonado del desfile.",
      ],
    },
    agent_67: {
      en: [
        "Coal dust inside his camera case matches the prop pile samples.",
        "Clips show him running cords across the closed parade lane.",
        "Tripod feet left prints in the ash by the jersey barriers.",
      ],
      es: [
        "Polvo de carbón dentro del maletín coincide con muestras del montón de utilería.",
        "Clips lo muestran tendiendo cables en el carril cerrado del desfile.",
        "Patas del trípode dejaron huellas en ceniza junto a vallas jersey.",
      ],
    },
    roblox_builder: {
      en: [
        "Kids' workshop wood was screwed into fake tunnel walls on asphalt.",
        "Tool rental papers list his phone for a dawn Tremont drop.",
        "Sawdust under coal sacks matches dust by his museum bench.",
      ],
      es: [
        "Madera del taller infantil atornillada en paredes de túnel falso en asfalto.",
        "Papeles de alquiler de herramientas listan su celular para entrega al alba en Tremont.",
        "Aserrín bajo sacos coincide con polvo junto a su banco del museo.",
      ],
    },
    elsa: {
      en: [
        "Stage fog mixed with coal dust and helped stop the parade march.",
        "Lighting cables from her rig were tied to metal crowd fences.",
        "Spotlight gels on-site match her winter show test colors.",
      ],
      es: [
        "Niebla de escenario se mezcló con polvo y ayudó a parar el desfile.",
        "Cables de luz de su equipo iban amarrados a vallas metálicas del público.",
        "Geles de foco en sitio coinciden con colores de prueba de su show de invierno.",
      ],
    },
    steve: {
      en: [
        "Coarse grit on foam gloves matches coal dust on barriers.",
        "Crowd photos place him by the prop pile before police closed the street.",
        "He changed out of the suit right before coveralls helpers appeared.",
      ],
      es: [
        "Arena gruesa en guantes de espuma coincide con polvo de carbón en vallas.",
        "Fotos del público lo sitúan junto a la utilería antes del cierre policial.",
        "Se quitó el traje justo antes de que aparecieran ayudantes con overoles.",
      ],
    },
    spyder_sammy: {
      en: [
        "Unlabeled drums sat by coal props where tape closed the sidewalk.",
        "Truck GPS hits every closed point on the printed parade map.",
        "Hose oily marks tested as a street spray not on his permit list.",
      ],
      es: [
        "Bidones sin etiqueta junto a carbón donde cinta cerró la acera.",
        "GPS del camión marca cada punto cerrado del mapa impreso del desfile.",
        "Marcas aceitosas en manguera dieron un rociado de calle no listado en su permiso.",
      ],
    },
  },
  revere_beach: {
    bacon_hair: {
      en: [
        "Oily drum stickers on the sand match his factory route.",
        "Deep tire tracks run from the lot down to the waterline.",
        "Night photos show his work van at the beach with the bags.",
      ],
      es: [
        "Calcomanías aceitosas en la arena coinciden con su ruta de fábrica.",
        "Huellas profundas van del estacionamiento hasta la orilla del agua.",
        "Fotos de noche muestran su furgoneta de trabajo en la playa con las bolsas.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "Cup sleeves in the foam match her cafe logo.",
        "Coffee grounds in a torn bag match her grinder batch sticker.",
        "Her supplier van sat at the beach the night trash hit the surf.",
      ],
      es: [
        "Fundas de vaso en la espuma coinciden con el logo de su café.",
        "Posos en bolsa rota coinciden con la etiqueta de lote de su molinillo.",
        "Su furgoneta de proveedor estuvo en la playa la noche de la basura en la resaca.",
      ],
    },
    tung: {
      en: [
        "A night form bears his initials for Revere Beach with no stamp.",
        "His crew's orange cones sat in the lot before high tide.",
        "He cleared an extra truck that never logged off the beach road.",
      ],
      es: [
        "Un formulario nocturno lleva sus iniciales de Revere Beach sin sello.",
        "Los conos naranjas de su equipo estaban en el lote antes de la pleamar.",
        "Autorizó un camión extra que nunca registró salida del camino a la playa.",
      ],
    },
    roblox_noob: {
      en: [
        "Museum maps in the surf match the batch handed out downtown.",
        "He asked how to lose trash fast near the train and the beach.",
        "A museum hand truck was found above the high tide line.",
      ],
      es: [
        "Mapas del museo en la resaca son del mismo lote del centro.",
        "Preguntó cómo perder basura rápido cerca del tren y la playa.",
        "Un carrito del museo apareció sobre la línea de pleamar.",
      ],
    },
    roblox_guest: {
      en: [
        "A pass scanned at Wonderland leads wet footprints to the bags.",
        "Texts say push it past the wrack line with a beach pin drop.",
        "Rental wagon tracks run from the boardwalk into piled plastic.",
      ],
      es: [
        "Un pase escaneado en Wonderland lleva huellas mojadas hacia las bolsas.",
        "Mensajes dicen empujarlo más allá de la línea de algas con pin de playa.",
        "Huellas de carrito de alquiler van del paseo al plástico amontonado.",
      ],
    },
    baconette_hair: {
      en: [
        "Snack wrappers in the mat share a stamp with her cart stock.",
        "She rolled the cart to the wall for ice when cameras lost the beach.",
        "Syrup rings on a black bag match her pour spouts that night.",
      ],
      es: [
        "Envoltorios en el tapete comparten sello con el stock de su carrito.",
        "Llevó el carrito al muro por hielo cuando las cámaras perdieron la playa.",
        "Anillos de jarabe en bolsa negra coinciden con sus picos de vertido esa noche.",
      ],
    },
    peeley: {
      en: [
        "Yellow suit fibers were on a zip tie that held a floating bag.",
        "A live tag shows him on sand right after the suit came off.",
        "Peel stickers ashore match fast-food bags from his route.",
      ],
      es: [
        "Fibras amarillas en una brida que sujetaba una bolsa flotante.",
        "Una etiqueta en vivo lo muestra en arena tras quitarse el traje.",
        "Pegatinas en la orilla coinciden con bolsas de comida rápida de su ruta.",
      ],
    },
    agent_67: {
      en: [
        "Tripod feet left salt rings like splashes on a torn bag.",
        "B-roll shows him filming tide trash while standing in shallows.",
        "He sold phone clips titled Revere midnight dump before the news.",
      ],
      es: [
        "Patas del trípode dejaron anillos de sal como salpicaduras en bolsa rota.",
        "Metraje extra lo muestra filmando basura de marea en lo poco profundo.",
        "Vendió clips en celular titulados vertido medianoche Revere antes de las noticias.",
      ],
    },
    roblox_builder: {
      en: [
        "Kids' workshop wood scraps washed in with the foam onshore.",
        "A van said beach cleanup volunteer but he never checked in.",
        "Sawdust glue on a float matches Friday's museum build batch.",
      ],
      es: [
        "Restos de madera del taller infantil llegaron con la espuma a la orilla.",
        "Una furgoneta decía voluntario de limpieza de playa, pero él no se reportó.",
        "Pegamento con aserrín en flotador coincide con el lote del viernes en el museo.",
      ],
    },
    elsa: {
      en: [
        "Costume glitter clumped on black bags floating in the surf.",
        "Her fog bottles floated inside the swim buoys near shore.",
        "Rehearsal confetti stuck to a wet receipt from beach parking.",
      ],
      es: [
        "Purpurina del vestuario en grumos sobre bolsas negras en la resaca.",
        "Sus botellas de niebla flotaron dentro de las boyas de nado cerca de la orilla.",
        "Confeti de ensayo pegado a un recibo mojado del estacionamiento de playa.",
      ],
    },
    steve: {
      en: [
        "Foam glove grit matches sand on a split bag at the waterline.",
        "Fan photos show him by the wall before plastic spread offshore.",
        "He dropped the block-head suit beside a tote above wet sand.",
      ],
      es: [
        "Arena en guantes de espuma coincide con bolsa rota en la línea del agua.",
        "Fotos de fans lo muestran junto al muro antes del plástico en el mar.",
        "Dejó el traje de cabeza cuadrada junto a bolsa sobre arena mojada.",
      ],
    },
    spyder_sammy: {
      en: [
        "Unlabeled jugs floated with food trash like sneaky strong chemicals.",
        "The hose tip shows the same oily film as bags in the foam.",
        "Truck GPS shows slow rolls on the boulevard during tide change.",
      ],
      es: [
        "Garrafas sin etiqueta flotaron con basura de comida como químicos fuertes escondidos.",
        "La punta de manguera muestra la misma película aceitosa que bolsas en la espuma.",
        "GPS del camión muestra vueltas lentas en el bulevar en el cambio de marea.",
      ],
    },
  },};

export const DEFAULT_CLUES_BY_CASE: Record<Lang, Record<BostonCaseId, string[]>> = {
  en: {
    charles_river: [
      "The mess is factory machine oil headed for the Charles River.",
      "Someone moved oil drums toward the Charles River drain.",
      "Only factory workers can move those drums by the Charles River.",
    ],
    boston_common: [
      "Huge bag piles on the grass overnight. Way more than a few missed tosses.",
      "Parks staff say the lawns were clear at closing yesterday.",
      "Whoever did this skipped every trash and recycling bin on purpose.",
    ],
    south_end: [
      "Illegal mining is tearing up South End streets and stopped the parade.",
      "Fake mine gear and fences block floats where crowds should walk.",
      "Boston never said yes to street mines. Someone dug anyway.",
    ],
    revere_beach: [
      "Trash in the water: bags and plastic that belong in bins, not the ocean.",
      "Crews say after-hours dumping at the shore is washing in with the tide.",
      "The beach has bins. Someone put garbage in the water anyway.",
    ],
  },
  es: {
    charles_river: [
      "El desastre es aceite de fábrica rumbo al río Charles.",
      "Alguien movió bidones hacia el desagüe del río Charles.",
      "Solo trabajadores de fábrica pueden mover esos bidones junto al río Charles.",
    ],
    boston_common: [
      "Montones enormes de bolsas aparecieron en el césped de la noche a la mañana.",
      "El personal del parque dice que los pastos estaban claros al cerrar ayer.",
      "Quien hizo esto ignoró a propósito todos los basureros y el reciclaje.",
    ],
    south_end: [
      "Minería ilegal rompe calles del South End y paró el desfile.",
      "Utilería de mina falsa y vallas bloquean carrozas y gente.",
      "Boston no aprobó minas en calles. Alguien cavó igual.",
    ],
    revere_beach: [
      "Basura en el agua: bolsas y plástico que iban a contenedores, no al mar.",
      "La cuadrilla dice que vertidos nocturnos en la orilla entran con la marea.",
      "Hay contenedores en la playa. Alguien metió basura al agua igual.",
    ],
  },
};
