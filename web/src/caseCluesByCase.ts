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
        "Oily drum labels washed up at Revere Beach match stickers from his factory loading route.",
        "Deep treads in the soft sand at Revere Beach lead from the parking strip to the wrack line.",
        "Night photos show his work van idling at Revere Beach when bags hit the surf.",
      ],
      es: [
        "Etiquetas aceitosas de bidón en la orilla de Revere Beach coinciden con su ruta de carga de fábrica.",
        "Huellas profundas en la arena de Revere Beach van del estacionamiento a la línea de marea.",
        "Fotos nocturnas muestran su furgoneta de trabajo en Revere Beach cuando bolsas llegaron a la resaca.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "Branded cup sleeves floated in with tide foam at Revere Beach—same print as her café.",
        "Used grounds in a split bag on the sand match her weekly grinder batch code.",
        "Her supplier van GPS lingers at Revere Beach after closing on the night of the dump.",
      ],
      es: [
        "Fundas de vaso de su marca flotaron con espuma de marea en Revere Beach.",
        "Posos en bolsa rota en arena coinciden con el lote semanal de su molinillo.",
        "GPS de su furgoneta de proveedor se queda en Revere Beach tras cerrar la noche del vertido.",
      ],
    },
    tung: {
      en: [
        "A night haul form with his initials lists Revere Beach as a drop with no transfer-station stamp.",
        "Orange cones from his crew were photographed at the Revere Beach lot before high tide.",
        "He green-lit an off-books truck that never logged out of the beach access road.",
      ],
      es: [
        "Forma nocturna con sus iniciales lista Revere Beach como descarga sin sello de estación.",
        "Conos naranjas de su cuadrilla fotografiados en el lote de Revere Beach antes de pleamar.",
        "Autorizó camión extraoficial que nunca registró salida del acceso a la playa.",
      ],
    },
    roblox_noob: {
      en: [
        "Laminated museum maps in the surf line were the same batch handed out downtown.",
        "He asked staff how to 'lose trash fast' near the Blue Line and the beach.",
        "A museum hand truck was found above the high-tide mark at Revere Beach.",
      ],
      es: [
        "Mapas laminados del museo en la línea de resaca son del mismo lote del centro.",
        "Preguntó cómo 'perder basura rápido' cerca del Blue Line y la playa.",
        "Carrito del museo hallado sobre la marca de pleamar en Revere Beach.",
      ],
    },
    roblox_guest: {
      en: [
        "His guest pass scanned at Wonderland, then footprints match the wet sand drag to the bags.",
        "Texts on his phone say 'push it past the wrack' with a Revere Beach pin dropped.",
        "Rental wagon treads lead from the boardwalk cut to where plastic bloomed in the water.",
      ],
      es: [
        "Su pase escaneó en Wonderland; huellas coinciden con arrastre en arena húmeda hacia bolsas.",
        "Mensajes dicen 'empújalo pasando la línea de algas' con pin de Revere Beach.",
        "Huellas de carrito de alquiler van del acceso del paseo marítimo al plástico en el agua.",
      ],
    },
    baconette_hair: {
      en: [
        "Snack wrappers in the floating mat share a distributor stamp with her cart stock.",
        "She backed the cart to the seawall for 'ice restock' when cameras lost the beach angle.",
        "Sticky syrup rings on a black bag match her pour spouts from the same night.",
      ],
      es: [
        "Envoltorios en el tapete flotante comparten sello de distribuidor con su carrito.",
        "Acercó el carrito al muro para 'hielo' cuando cámaras perdieron el ángulo de playa.",
        "Anillos de jarabe en bolsa negra coinciden con sus vertidos esa noche.",
      ],
    },
    peeley: {
      en: [
        "Yellow suit fibers snagged on a zip-tie that held a bag floating at Revere Beach.",
        "A livestream geotag pins him on the sand after he peeled off the banana suit.",
        "Peel stickers washed ashore in the same clump as fast-food bags from his meet-and-greet route.",
      ],
      es: [
        "Fibras amarillas del traje en una brida que sujetaba bolsa flotando en Revere Beach.",
        "Geotag de transmisión lo ubica en la arena tras quitarse el traje de plátano.",
        "Pegatinas de plátano llegaron a la orilla con bolsas de comida rápida de su ruta.",
      ],
    },
    agent_67: {
      en: [
        "His tripod feet have dried salt rings matching splash marks on a torn contractor bag.",
        "B-roll metadata shows him framing the tide pulling trash out while standing in the shallows.",
        "He sold cellphone clips titled 'Revere Beach midnight dump' before the city press release.",
      ],
      es: [
        "Patas del trípode con sal seca coinciden con salpicaduras en bolsa de obra rota.",
        "Metadatos de metraje lo muestran filmando la marea sacando basura en lo poco profundo.",
        "Vendió clips titulados 'vertido de medianoche en Revere Beach' antes del comunicado municipal.",
      ],
    },
    roblox_builder: {
      en: [
        "Plywood scraps with kids' workshop stamps washed in with the Revere Beach foam.",
        "He borrowed a van marked 'beach cleanup volunteer' but never checked in with the crew chief.",
        "Sawdust-clumped glue on a float matches the museum build table batch from Friday.",
      ],
      es: [
        "Restos de madera del taller infantil llegaron con espuma en Revere Beach.",
        "Pidió furgoneta rotulada 'voluntario limpieza playa' pero nunca reportó al jefe de cuadrilla.",
        "Pegamento con aserrín en flotador coincide con el lote del viernes en el museo.",
      ],
    },
    elsa: {
      en: [
        "Glitter from her costumes sparkled in clumps on black bags rolling in the surf.",
        "Fog-fluid bottles with her vendor tape floated just inside the swim buoys at Revere Beach.",
        "Confetti from a rehearsal was pressed into a wet receipt time-stamped at Revere Beach parking.",
      ],
      es: [
        "Purpurina de sus vestuarios en grumos sobre bolsas negras en la resaca.",
        "Botellas de fluido de niebla con su cinta de proveedor flotaron dentro de las boyas.",
        "Confeti de ensayo marcó un recibo mojado con hora del estacionamiento de Revere Beach.",
      ],
    },
    steve: {
      en: [
        "Foam glove grit matches sand stuck to a split trash bag at the waterline.",
        "Fans' photos place him by the Revere Beach wall minutes before plastic bloomed offshore.",
        "He slipped out of the block-head suit where a contractor tote sat above the wet sand.",
      ],
      es: [
        "Arena en guantes de espuma coincide con bolsa rota en la línea del agua.",
        "Fotos de fans lo sitúan junto al muro de Revere Beach antes del plástico en el mar.",
        "Salió del traje de bloque donde había bolsa de obra sobre arena mojada.",
      ],
    },
    spyder_sammy: {
      en: [
        "Unlabeled chemical jugs floated beside food trash like someone hid hazmat as beach garbage.",
        "His spray hose nozzle tested positive for the same solvent film on bags in the surf.",
        "Truck GPS shows slow rolls along Revere Beach Boulevard during the tide change.",
      ],
      es: [
        "Bidones sin etiqueta flotaron junto a basura de comida como hazmat disfrazado.",
        "Boquilla de manguera dio película de disolvente igual a bolsas en la resaca.",
        "GPS del camión muestra vueltas lentas por Revere Beach Boulevard en el cambio de marea.",
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
      "Huge bag piles appeared on the grass overnight—far more than a few missed tosses.",
      "Parks staff say the lawns were clear at closing yesterday.",
      "Whoever did this skipped every trash and recycling bin on purpose.",
    ],
    south_end: [
      "Illegal mining in the South End is ruining the city—streets are torn up, coal dust everywhere, and the parade is shut down.",
      "Unpermitted dig sites and mine props block the South End where floats and crowds should move.",
      "Boston never authorized mining on neighborhood streets—someone started it anyway and trashed the South End route.",
    ],
    revere_beach: [
      "Trash is showing up in the water at Revere Beach—bags and plastic that should never reach the ocean.",
      "Beach crews say the tide is dragging in junk from someone dumping at the shoreline after hours.",
      "Revere Beach has bins and pickup rules; whoever did this shoved garbage straight into the water.",
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
      "Basura aparece en el agua de Revere Beach: bolsas y plástico que no deberían llegar al océano.",
      "Personal de playa dice que la marea arrastra basura de alguien que vertió en la orilla de noche.",
      "Revere Beach tiene contenedores y normas; quien hizo esto empujó basura directo al agua.",
    ],
  },
};
