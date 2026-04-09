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
        "It's factory machine oil bound for the Charles River.",
        "Video shows drums heading toward the Charles River storm drain.",
        "Scrape marks match a cart from the machine yard.",
      ],
      es: [
        "Es aceite de máquina de fábrica camino al río Charles.",
        "El vídeo muestra bidones hacia el desagüe del río Charles.",
        "Rozaduras coinciden con un carro del taller de máquinas.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "It's factory machine oil near the Charles River.",
        "Grease traced to her café patio on the Charles River walk.",
        "The trail runs between the factory and that Charles River café.",
      ],
      es: [
        "Es aceite de máquina cerca del río Charles.",
        "Grasa llevó a la terraza de su café en el paseo del río Charles.",
        "La pista va entre la fábrica y ese café del río Charles.",
      ],
    },
    tung: {
      en: [
        "It's the same oil that reached the Charles River.",
        "Truck papers list a Charles River pickup that never happened.",
        "The wrong form has a night shift stamp on it.",
      ],
      es: [
        "Es el mismo aceite que llegó al río Charles.",
        "Los papeles del camión dicen una recogida al río Charles que no ocurrió.",
        "El formulario equivocado tiene sello de turno nocturno.",
      ],
    },
    roblox_noob: {
      en: [
        "It's Charles River pollution from factory drums.",
        "The stain pattern fits factory drums by the Charles River.",
        "A scavenger hunt photo shows the time by the Charles River museum steps.",
      ],
      es: [
        "Es contaminación del río Charles por bidones de fábrica.",
        "La mancha encaja con bidones junto al río Charles.",
        "Una foto de la búsqueda del tesoro muestra la hora junto al museo del río Charles.",
      ],
    },
    roblox_guest: {
      en: [
        "Charles River samples match this factory oil.",
        "This much oil usually moves on the freight road toward the Charles River.",
        "Lobby logs show an exit before the drums rolled toward the Charles River.",
      ],
      es: [
        "Muestras del río Charles coinciden con este aceite de fábrica.",
        "Tanto aceite suele moverse por la vía de carga hacia el río Charles.",
        "Registros del vestíbulo muestran salida antes de los bidones hacia el río Charles.",
      ],
    },
    baconette_hair: {
      en: [
        "Charles River crews traced this slick to factory oil.",
        "Oil pooled under a cart liner, not a Charles River sink.",
        "Snack wrappers by the stain match a cart brand near the Charles River path.",
      ],
      es: [
        "Equipos del río Charles rastrearon esta mancha al aceite de fábrica.",
        "Aceite bajo el forro de un carrito, no en un desagüe del río Charles.",
        "Envoltorios junto a la mancha coinciden con un carrito del paseo del río Charles.",
      ],
    },
    peeley: {
      en: [
        "The Charles River mess is factory machine oil.",
        "Oil hit work clothes right after he changed out of the banana suit by the Charles River.",
        "Fluff from a costume was on a drum at the Charles River grate.",
      ],
      es: [
        "El desastre del río Charles es aceite de máquina de fábrica.",
        "Aceite en ropa de trabajo tras quitarse el traje de plátano junto al río Charles.",
        "Pelusa de disfraz apareció en un bidón en la rejilla del río Charles.",
      ],
    },
    agent_67: {
      en: [
        "Charles River water tests show factory machine oil.",
        "Tripod legs have the same grease as the Charles River sample.",
        "A camera was on the mud bank by the Charles River.",
      ],
      es: [
        "Pruebas del río Charles muestran aceite de máquina de fábrica.",
        "Las patas del trípode tienen la misma grasa que la muestra del río Charles.",
        "Una cámara en el barro junto al río Charles.",
      ],
    },
    roblox_builder: {
      en: [
        "Charles River oil matches the factory blend.",
        "The oil matches the kids' demo tubes, not the plant pipes to the Charles River.",
        "A door from the kids' room sits near the Charles River grate.",
      ],
      es: [
        "El aceite del río Charles coincide con la mezcla de la fábrica.",
        "El aceite coincide con tubitos de demo, no con el tubo principal al río Charles.",
        "Una puerta del salón de niños queda cerca de la rejilla del río Charles.",
      ],
    },
    elsa: {
      en: [
        "Charles River crews found factory oil in the pipe.",
        "Fog from her light show and pipe oil used the same Charles River drain.",
        "The plaza rehearsal matched when the oil hit the Charles River drain.",
      ],
      es: [
        "Equipos del río Charles hallaron aceite de fábrica en la tubería.",
        "Niebla del show y aceite de tubo usan el mismo desagüe del río Charles.",
        "El ensayo en la plaza coincidió con el aceite en el desagüe del río Charles.",
      ],
    },
    steve: {
      en: [
        "Charles River pollution is factory machine oil.",
        "Work gloves picked up oil, not foam from the suit by the Charles River.",
        "The mascot head can't fit through the drum room door near the Charles River.",
      ],
      es: [
        "La contaminación del río Charles es aceite de máquina de fábrica.",
        "Guantes con aceite, no espuma del traje junto al río Charles.",
        "La cabeza del disfraz no cabe por la puerta de bidones cerca del río Charles.",
      ],
    },
    spyder_sammy: {
      en: [
        "Charles River samples show factory oil at the drain.",
        "A label for illegal chemicals was by the Charles River drain.",
        "Hoses and a list of stops were by the Charles River drain.",
      ],
      es: [
        "Muestras del río Charles muestran aceite de fábrica en el desagüe.",
        "Una etiqueta de químico ilegal junto al desagüe del río Charles.",
        "Mangueras y una lista de paradas junto al desagüe del río Charles.",
      ],
    },
  },
  boston_common: {
    bacon_hair: {
      en: [
        "Huge trash bag piles showed up on the grass near the Frog Pond overnight.",
        "Industrial drum labels from a factory route were mixed into the heap.",
        "Neighbors heard a metal cart on the path after park closing.",
      ],
      es: [
        "Montones enormes de bolsas aparecieron en el césped cerca del Frog Pond de la noche a la mañana.",
        "Etiquetas de bidones industriales de ruta de fábrica se mezclaron en el montón.",
        "Vecinos oyeron un carrito metálico en el sendero tras el cierre del parque.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "Food-service trash and cup sleeves run through layers of the pile.",
        "Grease-smudged receipts match the thermal paper her register uses.",
        "Coffee grounds in the bags tested as the same blend her café brews.",
      ],
      es: [
        "Basura de servicio de comida y fundas de vaso aparecen en capas del montón.",
        "Recibos manchados de grasa coinciden con el papel térmico de su caja.",
        "Posos del café en las bolsas coinciden con la mezcla que sirve su café.",
      ],
    },
    tung: {
      en: [
        "Shift paperwork references a 'park-adjacent pickup' with no disposal stamp.",
        "Orange traffic tape from his crew was wrapped around bag handles.",
        "His key card unlocked a maintenance gate that opens onto the Common.",
      ],
      es: [
        "Papeles de turno citan una 'recogida junto al parque' sin sello de vertido.",
        "Cinta naranja de su cuadrilla envolvía asas de bolsas.",
        "Su tarjeta abrió un portón de mantenimiento que da al Common.",
      ],
    },
    roblox_noob: {
      en: [
        "Fresh museum tour flyers were tucked under the top layer of trash.",
        "A scavenger-hunt stamp on cardboard matches his Wednesday route card.",
        "Badge readers show a staff exit toward the park during the dump window.",
      ],
      es: [
        "Volantes nuevos del tour del museo estaban bajo la capa superior de basura.",
        "Un sello de búsqueda del tesoro en cartón coincide con su tarjeta de ruta del miércoles.",
        "Lectores de gafete muestran salida de personal hacia el parque en la hora del vertido.",
      ],
    },
    roblox_guest: {
      en: [
        "Guest-pass scans cluster around the time the piles were first reported.",
        "A rideshare dropped someone with a folding dolly at the Park Street side.",
        "Recovered texts ask where to unload contractor bags before sunrise.",
      ],
      es: [
        "Escaneos de pase de invitado se agrupan cuando se reportaron las pilas por primera vez.",
        "Un viaje compartido dejó a alguien con carrito plegable en el lado de Park Street.",
        "Mensajes recuperados preguntan dónde descargar bolsas de obra antes del amanecer.",
      ],
    },
    baconette_hair: {
      en: [
        "Snack wrappers from brands only her cart sells appear deep in the pile.",
        "Narrow wheel ruts in the dew match a street-vendor cart width.",
        "Other vendors heard her argue about needing lawn space for a promo.",
      ],
      es: [
        "Envoltorios de marcas que solo vende su carrito aparecen hondo en el montón.",
        "Surcos estrechos en el rocío coinciden con el ancho de carrito ambulante.",
        "Otros vendedores la oyeron discutir espacio en el césped para una promo.",
      ],
    },
    peeley: {
      en: [
        "Yellow costume fibers snagged on a torn trash liner from the heap.",
        "A social post geotagged on the Common shows bags stacked behind him.",
        "Museum security logged him leaving a service bay with a loaded cart.",
      ],
      es: [
        "Fibras amarillas del disfraz enganchadas en el forro roto de una bolsa del montón.",
        "Una publicación geolocalizada en el Common muestra bolsas apiladas detrás de él.",
        "Seguridad del museo lo registró saliendo de bahía de servicio con carrito cargado.",
      ],
    },
    agent_67: {
      en: [
        "Straight drag marks from a hard camera case lead across the grass to the pile.",
        "Recovered clips show contractor bags in frame with a tripod leg in the corner.",
        "Metadata on sold photos lines up with the city's first 311 report.",
      ],
      es: [
        "Marcas rectas de arrastre de un maletín de cámara cruzan el césped hacia el montón.",
        "Clips recuperados muestran bolsas de obra con pata de trípode al borde.",
        "Metadatos de fotos vendidas coinciden con el primer reporte 311 de la ciudad.",
      ],
    },
    roblox_builder: {
      en: [
        "Plywood scraps with kids' workshop paint codes sat under food waste.",
        "Sawdust under the bags matches samples from the museum shop floor.",
        "A dolly checked out under 'education programs' was found beside a mound.",
      ],
      es: [
        "Retazos de madera con códigos de pintura del taller infantil bajo restos de comida.",
        "Aserrín bajo las bolsas coincide con muestras del suelo del taller del museo.",
        "Un carrito firmado como 'programas educativos' apareció junto a un montón.",
      ],
    },
    elsa: {
      en: [
        "Stage glitter and confetti are pressed into grease-stained trash bags.",
        "Empty fog-fluid bottles in the pile match the concentrate her show orders.",
        "Crew call sheets list a borrowed flatbed for 'scenic flats' that night.",
      ],
      es: [
        "Purpurina y confeti de escenario van incrustados en bolsas manchadas de grasa.",
        "Botellas vacías de fluido de niebla coinciden con el concentrado que pide su show.",
        "Hojas de llamada listan una plataforma prestada para 'paneles escénicos' esa noche.",
      ],
    },
    steve: {
      en: [
        "Foam glove lining picked up fast-food grease from buried wrappers.",
        "Fan photos place him in full suit blocks away minutes before the mess appeared.",
        "Square mascot-boot prints pressed into mud beside the largest heap.",
      ],
      es: [
        "El forro de guantes de espuma recogió grasa de comida rápida de envoltorios enterrados.",
        "Fotos de fans lo sitúan con traje completo a varias cuadras minutos antes del desorden.",
        "Huellas de bota cuadrada del disfraz marcaron barro junto al montón más grande.",
      ],
    },
    spyder_sammy: {
      en: [
        "Pesticide caps from a brand not on his permit rolled out of a split bag.",
        "Truck GPS shows a slow pass beside the Common during the dump window.",
        "Solvent traces on a torn liner match a concentrate bottle from his cab.",
      ],
      es: [
        "Tapas de pesticida de una marca no autorizada en su permiso salieron de una bolsa rota.",
        "GPS del camión muestra paso lento junto al Common en la hora del vertido.",
        "Trazas de disolvente en forro roto coinciden con frasco concentrado de su cabina.",
      ],
    },
  },
  south_end: {
    bacon_hair: {
      en: [
        "Coal dust along the parade lane matches bags staged at his factory loading dock.",
        "Heavy cart tracks run from the float staging area to a fake mine tent.",
        "Boot impressions by the tarps match casts from his work locker.",
      ],
      es: [
        "Polvo de carbón en el carril del desfile coincide con bolsas en su muelle de carga.",
        "Huellas de carrito pesado van del área de carrozas a una carpa de mina falsa.",
        "Impresiones de bota junto a lonas coinciden con moldes de su casillero de trabajo.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "A generator cabled to the barricades was rented with her café business card.",
        "Grand-opening flyers from her shop were stapled to the wooden barriers.",
        "Noise complaints on file for her block match the hour the march was halted.",
      ],
      es: [
        "Un generador cableado a las vallas se alquiló con la tarjeta de negocio de su café.",
        "Volantes de inauguración de su local estaban grapados a las barreras de madera.",
        "Quejas de ruido de su cuadra coinciden con la hora en que paró el desfile.",
      ],
    },
    tung: {
      en: [
        "Altered haul forms list coal drops on streets with no parade permit on file.",
        "His orange safety vest was found wadded on a pallet of prop coal sacks.",
        "After-hours gate logs show his card at a fenced staging yard beside the route.",
      ],
      es: [
        "Formas de transporte alteradas listan descargas en calles sin permiso de desfile.",
        "Su chaleco naranja de seguridad apareció arrugado sobre sacos de carbón de utilería.",
        "Registros nocturnos muestran su tarjeta en un patio cercado junto a la ruta.",
      ],
    },
    roblox_noob: {
      en: [
        "Gift-shop maps in his handwriting mark a fake coal-mine entrance on the parade path.",
        "Tour guests heard him call the barricade setup a 'South End coal adventure.'",
        "Laminated tour badges were zip-tied to the caution tape on the barriers.",
      ],
      es: [
        "Mapas de tienda con su letra marcan una falsa entrada de mina en la ruta del desfile.",
        "Visitas del tour lo oyeron llamar al montaje 'aventura de carbón del South End.'",
        "Gafetes laminados del tour iban amarrados a la cinta de precaución de las vallas.",
      ],
    },
    roblox_guest: {
      en: [
        "His day pass was scanned at each police barrier along the closed leg.",
        "Recovered texts ask where to stack coal props before go-time.",
        "A lumber rental receipt lists this morning and a Tremont cross-street.",
      ],
      es: [
        "Su pase diario se escaneó en cada barrera policial del tramo cerrado.",
        "Mensajes recuperados preguntan dónde apilar utilería de carbón antes de la hora.",
        "Recibo de alquiler de madera lista esta mañana y una esquina de Tremont.",
      ],
    },
    baconette_hair: {
      en: [
        "Her snack cart was left sideways across the float assembly lane overnight.",
        "Coal dust swabbed from her wheels matches grit from the barricade pile.",
        "Marshals remember her arguing about holding a filming spot on the route.",
      ],
      es: [
        "Su carrito de snacks quedó de lado bloqueando el carril de montaje de carrozas.",
        "Polvo de carbón en sus ruedas coincide con el del montón junto a las vallas.",
        "Oficiales recuerdan que discutió por guardar un lugar para filmar en la ruta.",
      ],
    },
    peeley: {
      en: [
        "Yellow suit fabric snagged on a nail holding up a coal-stunt banner.",
        "A livestream geotag places his phone behind the fake mine set.",
        "Peel stickers from his costume littered the cordoned pavement.",
      ],
      es: [
        "Tela amarilla del traje enganchada en un clavo de la pancarta del truco del carbón.",
        "Geotag de transmisión en vivo ubica su móvil detrás del set de mina falsa.",
        "Pegatinas de plátano del disfraz cubrían el pavimento acordonado.",
      ],
    },
    agent_67: {
      en: [
        "Coal dust inside his camera case matches samples from the prop pile.",
        "Recovered clips show him running extension cords across the closed lane.",
        "Tripod feet left impressions in the ash layer beside the jersey barriers.",
      ],
      es: [
        "Polvo de carbón dentro del maletín coincide con muestras del montón de utilería.",
        "Clips recuperados lo muestran tendiendo extensiones en el carril cerrado.",
        "Patas del trípode dejaron huellas en la ceniza junto a vallas jersey.",
      ],
    },
    roblox_builder: {
      en: [
        "Kids' workshop plywood was screwed into fake tunnel walls on the asphalt.",
        "Tool-rental paperwork lists his phone for a dawn drop on Tremont.",
        "Sawdust under the coal sacks matches the museum shop floor by his bench.",
      ],
      es: [
        "Madera del taller infantil formó paredes de túnel falso en el asfalto.",
        "Papeles de alquiler de herramientas listan su móvil para entrega al alba en Tremont.",
        "Aserrín bajo sacos coincide con el suelo del taller del museo junto a su banco.",
      ],
    },
    elsa: {
      en: [
        "Stage fog mixed with coal dust and helped trigger the air-quality hold that stopped the march.",
        "Lighting cables from her rig were zip-tied to the metal crowd barriers.",
        "Spotlight gels recovered on-site match her winter show test reel.",
      ],
      es: [
        "Niebla de escenario se mezcló con polvo y contribuyó a la alerta de aire que paró el desfile.",
        "Cables de iluminación de su equipo iban amarrados a vallas metálicas.",
        "Geles de foco hallados en sitio coinciden con su prueba de luces de invierno.",
      ],
    },
    steve: {
      en: [
        "Coarse grit on the foam costume gloves matches coal dust from the barriers.",
        "Crowd photos place him by the prop pile minutes before police closed the street.",
        "He changed out of the suit right before coverall-clad helpers appeared on camera.",
      ],
      es: [
        "Arena gruesa en guantes de espuma coincide con polvo de carbón de las vallas.",
        "Fotos del público lo sitúan junto a la utilería minutos antes del cierre policial.",
        "Se quitó el traje justo antes de que ayudantes con overoles salieran en cámara.",
      ],
    },
    spyder_sammy: {
      en: [
        "Unlabeled drums sat beside the coal props where hazmat later taped off the sidewalk.",
        "Truck GPS hits every closure point along the printed parade map.",
        "Hose residue tested as a concentrate not approved for street application.",
      ],
      es: [
        "Bidones sin etiqueta junto al carbón donde hazmat precintó la acera.",
        "GPS del camión marca cada punto cerrado del mapa impreso del desfile.",
        "Residuo en manguera dio concentrado no aprobado para uso en calle.",
      ],
    },
  },
  revere_beach: {
    bacon_hair: {
      en: [
        "Oily drum labels on the sand match stickers from his factory route.",
        "Deep tire tracks run from beach parking to the waterline.",
        "Night photos: his work van at the beach when bags hit the surf.",
      ],
      es: [
        "Etiquetas aceitosas en la arena coinciden con calcomanías de su ruta de fábrica.",
        "Huellas profundas van del estacionamiento a la orilla.",
        "Fotos de noche: su furgoneta en la playa cuando las bolsas llegan a la resaca.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "Cup sleeves in the foam match her café logo.",
        "Coffee grounds in a torn bag match her grinder batch code.",
        "Her supplier van sat at the beach after close the night of the dump.",
      ],
      es: [
        "Fundas de vaso en la espuma coinciden con el logo de su café.",
        "Posos en bolsa rota coinciden con el código de su molinillo.",
        "Su furgoneta de proveedor estuvo en la playa tras cerrar la noche del vertido.",
      ],
    },
    tung: {
      en: [
        "Night haul form with his initials: Revere Beach, no transfer-stamp.",
        "His crew's orange cones show up in the beach lot before high tide.",
        "He cleared an off-books truck that never logged off the beach access road.",
      ],
      es: [
        "Forma nocturna con sus iniciales: Revere Beach, sin sello de estación.",
        "Los conos naranjas de su cuadrilla aparecen en el lote antes de pleamar.",
        "Autorizó un camión extraoficial que nunca registró salida del acceso a la playa.",
      ],
    },
    roblox_noob: {
      en: [
        "Museum maps in the surf match the batch handed out downtown.",
        "He asked how to 'lose trash fast' near the Blue Line and the beach.",
        "Museum hand truck found above the high-tide line.",
      ],
      es: [
        "Mapas del museo en la resaca son del mismo lote del centro.",
        "Preguntó cómo 'perder basura rápido' cerca del Blue Line y la playa.",
        "Carrito del museo hallado sobre la línea de pleamar.",
      ],
    },
    roblox_guest: {
      en: [
        "Guest pass scanned at Wonderland; wet-sand footprints lead to the bags.",
        "Texts: 'push it past the wrack' with a Revere Beach pin.",
        "Rental wagon tracks: boardwalk to where plastic piled in the water.",
      ],
      es: [
        "Pase escaneado en Wonderland; huellas en arena húmeda llevan a las bolsas.",
        "Mensajes: 'pásalo de la línea de algas' con pin de Revere Beach.",
        "Huellas de carrito: del paseo marítimo al plástico en el agua.",
      ],
    },
    baconette_hair: {
      en: [
        "Snack wrappers in the mat share a distributor stamp with her cart.",
        "She rolled the cart to the seawall for 'ice' when the cameras lost the beach.",
        "Syrup rings on a black bag match her pour spouts that night.",
      ],
      es: [
        "Envoltorios en el tapete comparten sello de distribuidor con su carrito.",
        "Llevó el carrito al muro para 'hielo' cuando las cámaras perdieron la playa.",
        "Anillos de jarabe en bolsa negra coinciden con sus vertidos esa noche.",
      ],
    },
    peeley: {
      en: [
        "Yellow suit fibers on a zip-tie that held a floating bag.",
        "Livestream geotag: on the sand right after he dropped the banana suit.",
        "Peel stickers ashore with fast-food bags from his route.",
      ],
      es: [
        "Fibras amarillas en brida que sujetaba bolsa flotante.",
        "Geotag en vivo: en la arena tras quitarse el traje de plátano.",
        "Pegatinas de plátano en la orilla con bolsas de comida rápida de su ruta.",
      ],
    },
    agent_67: {
      en: [
        "Tripod feet: dried salt rings match splashes on a torn contractor bag.",
        "B-roll: him filming the tide pulling trash, standing in the shallows.",
        "Sold phone clips titled 'Revere midnight dump' before the city statement.",
      ],
      es: [
        "Patas del trípode: sal seca coincide con salpicaduras en bolsa de obra rota.",
        "Metraje B: filmando la marea sacando basura en lo poco profundo.",
        "Vendió clips 'vertido medianoche Revere' antes del comunicado municipal.",
      ],
    },
    roblox_builder: {
      en: [
        "Kids' workshop plywood scraps washed in with the foam.",
        "Van marked 'beach cleanup volunteer' but he never checked in with the crew chief.",
        "Sawdust glue on a float matches Friday's museum build batch.",
      ],
      es: [
        "Restos de madera del taller infantil llegaron con la espuma.",
        "Furgoneta de 'voluntario limpieza playa' sin reportar al jefe de cuadrilla.",
        "Pegamento con aserrín en flotador coincide con el lote del viernes en el museo.",
      ],
    },
    elsa: {
      en: [
        "Costume glitter clumped on black bags in the surf.",
        "Her fog-fluid bottles floated inside the swim buoys.",
        "Rehearsal confetti pressed into a wet receipt from beach parking.",
      ],
      es: [
        "Purpurina del vestuario en grumos sobre bolsas negras en la resaca.",
        "Botellas de niebla con su cinta flotaron dentro de las boyas.",
        "Confeti de ensayo en recibo mojado del estacionamiento de la playa.",
      ],
    },
    steve: {
      en: [
        "Foam glove grit matches sand on a split bag at the waterline.",
        "Fan photos: by the seawall minutes before plastic spread offshore.",
        "Dropped the block-head suit next to a contractor tote above wet sand.",
      ],
      es: [
        "Arena en guantes de espuma coincide con bolsa rota en la orilla.",
        "Fotos de fans: junto al muro minutos antes del plástico en el mar.",
        "Dejó el traje de bloque junto a bolsa de obra sobre arena mojada.",
      ],
    },
    spyder_sammy: {
      en: [
        "Unlabeled jugs floated with food trash like hidden hazmat.",
        "Hose nozzle: same solvent film as on bags in the surf.",
        "Truck GPS: slow rolls on Revere Beach Blvd during the tide change.",
      ],
      es: [
        "Bidones sin etiqueta con basura de comida, como hazmat escondido.",
        "Boquilla de manguera: misma película de disolvente que en bolsas en la resaca.",
        "GPS del camión: vueltas lentas en Revere Beach Blvd en el cambio de marea.",
      ],
    },
  },
};

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
      "Illegal mining is wrecking the South End: torn streets, coal dust, parade off.",
      "Unpermitted digs and mine props block floats and crowds.",
      "Boston never approved street mining. Someone did it anyway.",
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
      "Quien hizo esto ignoró a propósito todos los contenedores de basura y reciclaje.",
    ],
    south_end: [
      "La minería ilegal en el South End está arruinando la ciudad: calles rotas, polvo de carbón y desfile cancelado.",
      "Excavaciones y utilería de mina sin permiso bloquean el South End donde deberían ir carrozas y público.",
      "Boston nunca autorizó minas en calles del barrio: alguien las empezó igual y destrozó la ruta del South End.",
    ],
    revere_beach: [
      "Basura en el agua: bolsas y plástico que iban a contenedores, no al mar.",
      "La cuadrilla dice que vertidos nocturnos en la orilla entran con la marea.",
      "Hay contenedores en la playa. Alguien metió basura al agua igual.",
    ],
  },
};
