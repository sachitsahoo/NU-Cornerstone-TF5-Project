/**
 * Three clue lines per culprit per Boston case (EN/ES). All 12 character uids appear under
 * charles_river, boston_common, south_end, and newbury_street — not river-only.
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
        "Boston Common, Boston Common, Boston Common — bags everywhere on Boston Common.",
        "Trash on Boston Common matches drum labels from his factory route.",
        "He was seen near Boston Common with a cart after dark.",
      ],
      es: [
        "Boston Common, Boston Common, Boston Common — bolsas por todo Boston Common.",
        "Basura en Boston Common coincide con etiquetas de bidones de su ruta de fábrica.",
        "Lo vieron cerca de Boston Common con un carrito al anochecer.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "Boston Common looks like a landfill — Boston Common, Boston Common.",
        "Café trash ties to cups found dumped on Boston Common.",
        "The trail from her shop leads straight to Boston Common.",
      ],
      es: [
        "Boston Common parece un vertedero — Boston Common, Boston Common.",
        "Basura del café enlaza vasos hallados tirados en Boston Common.",
        "El rastro desde su local va directo a Boston Common.",
      ],
    },
    tung: {
      en: [
        "Someone trashed Boston Common — Boston Common, Boston Common.",
        "Night shift papers mention a pickup near Boston Common.",
        "His signature style tape was on bags on Boston Common.",
      ],
      es: [
        "Alguien destrozó Boston Common — Boston Common, Boston Common.",
        "Papeles del turno nocturno mencionan recogida cerca de Boston Common.",
        "Su cinta característica estaba en bolsas en Boston Common.",
      ],
    },
    roblox_noob: {
      en: [
        "Boston Common is covered in junk — Boston Common, Boston Common.",
        "Museum maps in the mess point to Boston Common.",
        "A scavenger hunt clue was buried under trash on Boston Common.",
      ],
      es: [
        "Boston Common está cubierto de basura — Boston Common, Boston Common.",
        "Mapas del museo en el desorden apuntan a Boston Common.",
        "Una pista de la búsqueda del tesoro quedó bajo basura en Boston Common.",
      ],
    },
    roblox_guest: {
      en: [
        "Boston Common, Boston Common — the piles are huge on Boston Common.",
        "Guest pass timestamps match Boston Common camera time.",
        "He asked where to dump bags behind Boston Common.",
      ],
      es: [
        "Boston Common, Boston Common — las pilas son enormes en Boston Common.",
        "Sellos de pase de invitado coinciden con cámaras de Boston Common.",
        "Preguntó dónde tirar bolsas detrás de Boston Common.",
      ],
    },
    baconette_hair: {
      en: [
        "Boston Common got hit hard — Boston Common, Boston Common.",
        "Snack brands in the pile match her cart labels near Boston Common.",
        "Wheels marks run from the path to Boston Common.",
      ],
      es: [
        "Boston Common recibió duro — Boston Common, Boston Common.",
        "Marcas de snacks en el montón coinciden con su carrito cerca de Boston Common.",
        "Huellas de ruedas van del camino a Boston Common.",
      ],
    },
    peeley: {
      en: [
        "Trash storm on Boston Common — Boston Common, Boston Common.",
        "Banana suit fibers stuck to bags on Boston Common.",
        "He posted a selfie with Boston Common trash in the frame.",
      ],
      es: [
        "Tormenta de basura en Boston Common — Boston Common, Boston Common.",
        "Fibras del traje de plátano pegadas a bolsas en Boston Common.",
        "Subió un selfie con basura de Boston Common en la foto.",
      ],
    },
    agent_67: {
      en: [
        "Boston Common is a mess — Boston Common, Boston Common.",
        "His tripod case left a drag mark across Boston Common grass.",
        "Video B-roll shows fresh dumping on Boston Common.",
      ],
      es: [
        "Boston Common es un desastre — Boston Common, Boston Common.",
        "Su maletín del trípode dejó marca arrastrada en el césped de Boston Common.",
        "Metraje extra muestra vertido reciente en Boston Common.",
      ],
    },
    roblox_builder: {
      en: [
        "Boston Common, Boston Common — someone emptied bins on Boston Common.",
        "Demo tape from his workshop stuck to Boston Common trash.",
        "Kids' event flyers blew from Boston Common piles.",
      ],
      es: [
        "Boston Common, Boston Common — alguien vació cubos en Boston Common.",
        "Cinta de demo de su taller pegada a basura de Boston Common.",
        "Volantes del evento infantil salieron de montones en Boston Common.",
      ],
    },
    elsa: {
      en: [
        "Glitter and trash on Boston Common — Boston Common, Boston Common.",
        "Fog machine boxes sat in the Boston Common pile.",
        "Her show confetti mixed with Boston Common garbage.",
      ],
      es: [
        "Purpurina y basura en Boston Common — Boston Common, Boston Common.",
        "Cajas de máquina de niebla en el montón de Boston Common.",
        "Confeti de su show mezclado con basura de Boston Common.",
      ],
    },
    steve: {
      en: [
        "Boston Common trashed — Boston Common, Boston Common.",
        "Block-head costume glitter on Boston Common bags.",
        "Fans saw him near Boston Common with contractor bags.",
      ],
      es: [
        "Boston Common destrozado — Boston Common, Boston Common.",
        "Purpurina del traje de cabeza cuadrada en bolsas de Boston Common.",
        "Fans lo vieron cerca de Boston Common con bolsas de obra.",
      ],
    },
    spyder_sammy: {
      en: [
        "Boston Common reeks — Boston Common, Boston Common.",
        "Pest spray caps rolled in Boston Common trash.",
        "His route sheet listed Boston Common as a stop.",
      ],
      es: [
        "Boston Common huele mal — Boston Common, Boston Common.",
        "Tapas de spray de plagas rodando en basura de Boston Common.",
        "Su hoja de ruta listaba Boston Common como parada.",
      ],
    },
  },
  south_end: {
    bacon_hair: {
      en: [
        "South End parade route closed — South End, South End, South End.",
        "Coal bags match labels from his factory yard near the South End.",
        "Heavy cart tracks lead from the South End route to a fake mine tent.",
      ],
      es: [
        "Ruta del desfile del South End cerrada — South End, South End, South End.",
        "Bolsas de carbón coinciden con etiquetas de su patio cerca del South End.",
        "Huellas de carrito pesado van de la ruta del South End a una carpa minera falsa.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "South End can't march — South End, South End, South End coal stunt.",
        "Café flyers plastered the South End barricades.",
        "She rented a loud generator on the South End parade line.",
      ],
      es: [
        "El South End no puede desfilar — South End, South End, truco del carbón.",
        "Volantes del café taparon las vallas del South End.",
        "Alquiló un generador ruidoso en la línea del desfile del South End.",
      ],
    },
    tung: {
      en: [
        "Illegal South End mining blocked the parade — South End, South End.",
        "Night forms list coal trucks routed through the South End.",
        "His orange vest was at the South End tunnel props.",
      ],
      es: [
        "Minería ilegal en el South End bloqueó el desfile — South End, South End.",
        "Formularios nocturnos listan camiones de carbón por el South End.",
        "Su chaleco naranja estaba en utilería del túnel del South End.",
      ],
    },
    roblox_noob: {
      en: [
        "South End parade shut down — South End, South End, South End.",
        "Museum maps marked the South End fake mine entrance.",
        "He gave tours titled South End Coal Adventure.",
      ],
      es: [
        "Desfile del South End cerrado — South End, South End, South End.",
        "Mapas del museo marcaron la falsa entrada de mina del South End.",
        "Hizo tours llamados Aventura Carbón del South End.",
      ],
    },
    roblox_guest: {
      en: [
        "South End streets sealed — South End, South End, South End.",
        "Guest pass scanned at every South End barricade.",
        "He texted about coal props on the South End route.",
      ],
      es: [
        "Calles del South End selladas — South End, South End, South End.",
        "Pase escaneado en cada valla del South End.",
        "Mensaje sobre utilería de carbón en la ruta del South End.",
      ],
    },
    baconette_hair: {
      en: [
        "South End parade canceled — South End, South End, South End.",
        "Her cart was parked blocking the South End staging lane.",
        "Coal dust on wheels matches her South End stop.",
      ],
      es: [
        "Desfile del South End cancelado — South End, South End, South End.",
        "Su carrito bloqueaba el carril de montaje del South End.",
        "Polvo de carbón en ruedas coincide con su parada del South End.",
      ],
    },
    peeley: {
      en: [
        "South End coal chaos — South End, South End, South End.",
        "Banana suit shed behind a South End coal banner.",
        "He streamed live from the South End fake mine.",
      ],
      es: [
        "Caos del carbón en el South End — South End, South End, South End.",
        "Traje de plátano quitado detrás de pancarta de carbón del South End.",
        "Transmitió en vivo desde la falsa mina del South End.",
      ],
    },
    agent_67: {
      en: [
        "South End route dead — South End, South End, South End.",
        "His camera case had coal dust from the South End set.",
        "B-roll shows him wiring lights on the South End pile.",
      ],
      es: [
        "Ruta del South End cortada — South End, South End, South End.",
        "Su maletín tenía polvo de carbón del set del South End.",
        "Metraje muestra luces cableadas en el montón del South End.",
      ],
    },
    roblox_builder: {
      en: [
        "South End parade off — South End, South End, South End.",
        "Kids' plywood props became South End mine walls.",
        "Tool rental receipts list a South End delivery address.",
      ],
      es: [
        "Desfile del South End fuera — South End, South End, South End.",
        "Utilería de madera infantil hizo paredes de mina del South End.",
        "Recibos de herramientas con dirección de entrega del South End.",
      ],
    },
    elsa: {
      en: [
        "South End shut for coal stunt — South End, South End, South End.",
        "Stage fog mixed with coal dust on the South End route.",
        "Her light rig drew power from the South End barricade line.",
      ],
      es: [
        "South End cerrado por truco del carbón — South End, South End, South End.",
        "Niebla de escenario mezclada con polvo en la ruta del South End.",
        "Su iluminación tomó luz de la línea de vallas del South End.",
      ],
    },
    steve: {
      en: [
        "South End parade blocked — South End, South End, South End.",
        "Mascot gloves had coal grit from South End barriers.",
        "Crowd photos show him near the South End coal pile.",
      ],
      es: [
        "Desfile del South End bloqueado — South End, South End, South End.",
        "Guantes del disfraz con arena de carbón de vallas del South End.",
        "Fotos del público lo muestran cerca del montón de carbón del South End.",
      ],
    },
    spyder_sammy: {
      en: [
        "South End coal mess — South End, South End, South End.",
        "Chemical drums sat beside South End coal props.",
        "His truck GPS pinged every South End closure point.",
      ],
      es: [
        "Desorden de carbón en el South End — South End, South End, South End.",
        "Bidones químicos junto a utilería de carbón del South End.",
        "GPS de su camión en cada punto cerrado del South End.",
      ],
    },
  },
  newbury_street: {
    bacon_hair: {
      en: [
        "Newbury Street, Newbury Street — reno debris in a Newbury Street alley.",
        "Drywall dust matches his work gloves from a Newbury Street delivery.",
        "A drum sticker from Newbury Street renovation ended up in the pile.",
      ],
      es: [
        "Newbury Street, Newbury Street — escombros de obra en un callejón de Newbury Street.",
        "Polvo de yeso coincide con sus guantes de entrega en Newbury Street.",
        "Etiqueta de bidón de obra de Newbury Street terminó en el montón.",
      ],
    },
    ballerina_cappuccina: {
      en: [
        "Illegal dump off Newbury Street — Newbury Street, Newbury Street.",
        "Café cups mixed with Newbury Street tile scraps.",
        "Her supplier van was ticketed on Newbury Street that night.",
      ],
      es: [
        "Vertido ilegal junto a Newbury Street — Newbury Street, Newbury Street.",
        "Vasos del café mezclados con restos de azulejo de Newbury Street.",
        "Su furgoneta de proveedor multada en Newbury Street esa noche.",
      ],
    },
    tung: {
      en: [
        "Newbury Street alley blocked — Newbury Street, Newbury Street.",
        "Night shift forms list a Newbury Street debris pickup that never logged out.",
        "Orange cones from his crew mark the Newbury Street dump spot.",
      ],
      es: [
        "Callejón de Newbury Street bloqueado — Newbury Street, Newbury Street.",
        "Formularios nocturnos listan recogida de escombros en Newbury Street sin cierre.",
        "Conos naranjas de su cuadrilla marcan el vertedero de Newbury Street.",
      ],
    },
    roblox_noob: {
      en: [
        "Newbury Street renovation trash — Newbury Street, Newbury Street.",
        "Museum flyers were under bags behind Newbury Street.",
        "He asked staff how to haul junk off Newbury Street fast.",
      ],
      es: [
        "Basura de obra en Newbury Street — Newbury Street, Newbury Street.",
        "Volantes del museo bajo bolsas detrás de Newbury Street.",
        "Preguntó al personal cómo sacar escombros de Newbury Street rápido.",
      ],
    },
    roblox_guest: {
      en: [
        "Newbury Street debris pile — Newbury Street, Newbury Street.",
        "Guest badge scanned at a Newbury Street loading door.",
        "Rental dolly tracks lead from Newbury Street to the alley.",
      ],
      es: [
        "Montón de escombros en Newbury Street — Newbury Street, Newbury Street.",
        "Gafete escaneado en puerta de carga de Newbury Street.",
        "Huellas de carrito van de Newbury Street al callejón.",
      ],
    },
    baconette_hair: {
      en: [
        "Newbury Street alley junk — Newbury Street, Newbury Street.",
        "Food cart wheels left grout in the Newbury Street pile.",
        "She parked for restock beside the Newbury Street debris.",
      ],
      es: [
        "Basura en callejón de Newbury Street — Newbury Street, Newbury Street.",
        "Ruedas del carrito dejaron lechada en el montón de Newbury Street.",
        "Estacionó para reabastecer junto a escombros de Newbury Street.",
      ],
    },
    peeley: {
      en: [
        "Newbury Street illegal dump — Newbury Street, Newbury Street.",
        "Banana suit bag tossed near Newbury Street tile bags.",
        "He carried contractor bags down Newbury Street after closing.",
      ],
      es: [
        "Vertido ilegal en Newbury Street — Newbury Street, Newbury Street.",
        "Bolsa del traje de plátano junto a sacos de azulejo de Newbury Street.",
        "Llevó bolsas de obra por Newbury Street al cerrar.",
      ],
    },
    agent_67: {
      en: [
        "Newbury Street reno mess — Newbury Street, Newbury Street.",
        "His tripod scraped fresh paint chips behind Newbury Street.",
        "Time-lapse caught dumping behind Newbury Street boutiques.",
      ],
      es: [
        "Desorden de obra en Newbury Street — Newbury Street, Newbury Street.",
        "Su trípode raspó restos de pintura fresca detrás de Newbury Street.",
        "Time-lapse captó vertido detrás de boutiques de Newbury Street.",
      ],
    },
    roblox_builder: {
      en: [
        "Newbury Street debris hazard — Newbury Street, Newbury Street.",
        "Kids' workshop lumber tags match the Newbury Street pile.",
        "He borrowed a van labeled for Newbury Street storefront work.",
      ],
      es: [
        "Peligro de escombros en Newbury Street — Newbury Street, Newbury Street.",
        "Etiquetas de madera del taller infantil coinciden con el montón de Newbury Street.",
        "Pidió prestada una furgoneta marcada para obra en Newbury Street.",
      ],
    },
    elsa: {
      en: [
        "Newbury Street alley pile — Newbury Street, Newbury Street.",
        "Glitter from props stuck to Newbury Street drywall scraps.",
        "She stored fog fluid crates behind Newbury Street shops.",
      ],
      es: [
        "Montón en callejón de Newbury Street — Newbury Street, Newbury Street.",
        "Purpurina de utilería pegada a restos de yeso de Newbury Street.",
        "Guardó cajas de fluido de niebla detrás de tiendas de Newbury Street.",
      ],
    },
    steve: {
      en: [
        "Newbury Street construction dump — Newbury Street, Newbury Street.",
        "Foam costume fibers mixed with Newbury Street insulation.",
        "He changed out of the suit behind a Newbury Street scaffold.",
      ],
      es: [
        "Vertido de obra en Newbury Street — Newbury Street, Newbury Street.",
        "Fibras del traje de espuma mezcladas con aislamiento de Newbury Street.",
        "Se quitó el traje detrás de un andamio de Newbury Street.",
      ],
    },
    spyder_sammy: {
      en: [
        "Newbury Street alley blocked — Newbury Street, Newbury Street.",
        "Pesticide totes sat beside Newbury Street reno bags.",
        "His hose was coiled behind a Newbury Street dumpster.",
      ],
      es: [
        "Callejón de Newbury Street bloqueado — Newbury Street, Newbury Street.",
        "Bidones de pesticida junto a bolsas de obra de Newbury Street.",
        "Su manguera enrollada detrás de un contenedor de Newbury Street.",
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
      "Boston Common is buried in trash — Boston Common, Boston Common.",
      "Parks staff say Boston Common was spotless before last night.",
      "Someone skipped every Boston Common bin on purpose.",
    ],
    south_end: [
      "The South End parade route is closed — South End, South End.",
      "A fake coal mine popped up in the South End overnight.",
      "Permits never listed mining on the South End parade map.",
    ],
    newbury_street: [
      "Newbury Street has a reno debris pile — Newbury Street, Newbury Street.",
      "Shop work on Newbury Street should use licensed haulers.",
      "The alley behind Newbury Street boutiques is blocked by junk.",
    ],
  },
  es: {
    charles_river: [
      "El desastre es aceite de fábrica rumbo al río Charles.",
      "Alguien movió bidones hacia el desagüe del río Charles.",
      "Solo trabajadores de fábrica pueden mover esos bidones junto al río Charles.",
    ],
    boston_common: [
      "Boston Common está bajo basura — Boston Common, Boston Common.",
      "El personal del parque dice que Boston Common estaba limpio anoche.",
      "Alguien ignoró todos los contenedores de Boston Common a propósito.",
    ],
    south_end: [
      "La ruta del desfile del South End está cerrada — South End, South End.",
      "Una falsa mina de carbón apareció en el South End de la noche a la mañana.",
      "Los permisos nunca listaron minería en el mapa del desfile del South End.",
    ],
    newbury_street: [
      "Hay un montón de escombros en Newbury Street — Newbury Street, Newbury Street.",
      "Las obras en Newbury Street deben usar transportistas autorizados.",
      "El callejón detrás de boutiques de Newbury Street está bloqueado.",
    ],
  },
};
