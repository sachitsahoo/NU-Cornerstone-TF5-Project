/**
 * Per-scene innocent/guilty alibi lines (three each) for dossiers when the active case
 * is not the Charles River. Charles River continues to use characters.json + characterEs.json.
 */
import type { CharacterJson } from "./gameTypes";
import type { BostonCaseId } from "./bostonCaseIds";
import type { Lang } from "./lang";
import esOverlay from "./characterEs.json";

export type AlibiTriple = readonly [string, string, string];

type LangPools = { innocent: AlibiTriple; guilty: AlibiTriple };

type CharacterCasePools = Record<Lang, LangPools>;

const ES = esOverlay as Record<
  string,
  { alibis_innocent: string[]; alibis_guilty: string[] }
>;

const boston_common: Record<string, CharacterCasePools> = {
  bacon_hair: {
    en: {
      innocent: [
        "Time clocks show he clocked out before parks staff found the trash piles.",
        "The figure on security video is taller than him; height does not match.",
        "His work coveralls tested clean—no match for the grease mixed in the bags.",
      ],
      guilty: [
        "Industrial drum labels from his plant were inside bags on the Common.",
        "Cart tire marks lead from the path to the center of the biggest pile.",
        "He messaged a coworker about skipping dump fees using 'open space downtown.'",
      ],
    },
    es: {
      innocent: [
        "Los fichajes muestran que salió antes de que el personal encontrara las pilas de basura.",
        "La figura en el vídeo es más alta que él; la altura no coincide.",
        "Su mono de trabajo salió limpio en pruebas; no coincide con la grasa de las bolsas.",
      ],
      guilty: [
        "Etiquetas de bidones de su planta aparecieron dentro de bolsas en el Common.",
        "Huellas de carrito van del sendero al centro de la pila más grande.",
        "Escribió a un compañero sobre evitar tasas de vertedero usando 'espacio abierto céntrico.'",
      ],
    },
  },
  ballerina_cappuccina: {
    en: {
      innocent: [
        "Licensed haulers emptied her shop grease traps on schedule before the mess.",
        "Receipts place her at a supplier dinner across town when dumping happened.",
        "Cup brands in the pile are chains her café does not carry.",
      ],
      guilty: [
        "Register receipt tape was tied through handles on bags in the pile.",
        "A resident saw her stacking contractor bags near the Frog Pond after midnight.",
        "Expired creamer crates with her vendor code were buried under the trash.",
      ],
    },
    es: {
      innocent: [
        "Transportistas autorizados vaciaron sus trampas de grasa antes del desorden.",
        "Recibos la sitúan en una cena con proveedores lejos cuando ocurrió el vertido.",
        "Las marcas de vasos del montón no son las que vende su café.",
      ],
      guilty: [
        "Cinta de ticket de caja amarraba asas de bolsas en el montón.",
        "Un vecino la vio apilar bolsas de obra cerca del Frog Pond pasada la medianoche.",
        "Cajas de cremera vencida con su código de proveedor quedaron bajo la basura.",
      ],
    },
  },
  tung: {
    en: {
      innocent: [
        "Night logs show he was on the repair floor when cameras caught dumping.",
        "His gate card never opened the waste-yard lock that night.",
        "Truck paperwork he signed matches real hauls that left the plant on time.",
      ],
      guilty: [
        "Shift forms list a phantom pickup routed past the Common with no disposal ticket.",
        "His orange vest fibers matched tape used to bundle bags in the pile.",
        "He approved after-hours access for a van with no listed destination.",
      ],
    },
    es: {
      innocent: [
        "Registros nocturnos lo ponen en taller de reparaciones cuando grabaron el vertido.",
        "Su tarjeta no abrió el candado del patio de residuos esa noche.",
        "Los papeles que firmó coinciden con retiros reales que salieron a tiempo.",
      ],
      guilty: [
        "Formas de turno listan una recogida fantasma pasando por el Common sin boleto de vertido.",
        "Fibras de su chaleco naranja coinciden con cinta que amarraba bolsas del montón.",
        "Autorizó acceso nocturno a una furgoneta sin destino registrado.",
      ],
    },
  },
  roblox_noob: {
    en: {
      innocent: [
        "Museum badge readers show he was inside leading a school group during the dumping window.",
        "His scavenger-hunt route stayed on the paved paths, away from the trash heaps.",
        "He does not have keys to any park maintenance gates.",
      ],
      guilty: [
        "Gift-shop maps with his handwriting marked 'trash drop' arrows toward the piles.",
        "Parents on his tour posted photos of black bags stacked where he pointed.",
        "He borrowed a janitor cart 'for props' the same night the Common was hit.",
      ],
    },
    es: {
      innocent: [
        "Lectores de gafete lo muestran dentro con un grupo escolar durante el vertido.",
        "Su ruta de búsqueda del tesoro siguió caminos pavimentados, lejos de las pilas.",
        "No tiene llaves de mantenimiento del parque.",
      ],
      guilty: [
        "Mapas de la tienda con su letra marcan flechas de 'tiro de basura' hacia las pilas.",
        "Padres de su tour subieron fotos de bolsas negras donde él señaló.",
        "Pidió un carrito de limpieza 'para utilería' la misma noche que azotaron el Common.",
      ],
    },
  },
  roblox_guest: {
    en: {
      innocent: [
        "Lobby records show his guest pass checked out before the piles appeared.",
        "Phone location data keeps him across the river until morning.",
        "He never had building access to park maintenance storage.",
      ],
      guilty: [
        "His pass was scanned at a staff door near the Common twice after midnight.",
        "Messages ask a friend where to 'unload contractor bags fast near the park.'",
        "A rideshare dropped him off two blocks from the trash with matching dolly tracks.",
      ],
    },
    es: {
      innocent: [
        "El vestíbulo registra salida de su pase antes de que aparecieran las pilas.",
        "Datos de ubicación del móvil lo mantienen al otro lado del río hasta la mañana.",
        "Nunca tuvo acceso al almacén de mantenimiento del parque.",
      ],
      guilty: [
        "Su pase se escaneó en una puerta de personal cerca del Common dos veces tras medianoche.",
        "Mensajes preguntan dónde 'descargar bolsas de obra rápido cerca del parque.'",
        "Un vehículo compartido lo dejó a dos cuadras de la basura con huellas de carrito.",
      ],
    },
  },
  baconette_hair: {
    en: {
      innocent: [
        "Health inspectors sealed her cart for a minor violation during the incident—she could not unload trash.",
        "Snack inventory that night matches sales; no extra bags left her cart.",
        "Her route permit does not cover the lawn areas where the piles sat.",
      ],
      guilty: [
        "Snack wrappers from brands only she sells were layered through the pile.",
        "Wheel grooves from a narrow cart match tracks from the path to the heap.",
        "She told vendors she needed space to 'stage a promo' on the grass.",
      ],
    },
    es: {
      innocent: [
        "Inspectores sellaron su carrito por una falta menor; no pudo descargar basura.",
        "El inventario de snacks coincide con ventas; no sobraron bolsas.",
        "Su permiso de ruta no cubre el césped donde estaban las pilas.",
      ],
      guilty: [
        "Envoltorios de marcas que solo ella vende aparecieron en capas del montón.",
        "Surcos de carrito estrecho coinciden con huellas del camino al montón.",
        "Dijo a otros vendedores que necesitaba espacio para 'montar una promo' en el césped.",
      ],
    },
  },
  peeley: {
    en: {
      innocent: [
        "He was posing for photos in the banana suit when the trash appeared on camera.",
        "The suit is too bulky to lift heavy contractor bags quickly.",
        "Museum staff clocked him in the dressing room during the dumping window.",
      ],
      guilty: [
        "Yellow suit fibers were caught on a torn bag in the deepest layer.",
        "He posted a story geotagged on the Common with trash bags visible behind him.",
        "Security saw him slip out of the suit and load bags into a maintenance cart.",
      ],
    },
    es: {
      innocent: [
        "Posaba con el traje de plátano cuando la basura apareció en cámara.",
        "El traje es demasiado voluminoso para levantar bolsas pesadas rápido.",
        "Personal del museo lo registró en el camerino durante el vertido.",
      ],
      guilty: [
        "Fibras amarillas del traje quedaron enganchadas en una bolsa rota en el fondo del montón.",
        "Subió una historia geolocalizada en el Common con bolsas visibles detrás.",
        "Seguridad lo vio quitarse el traje y cargar bolsas en un carrito de mantenimiento.",
      ],
    },
  },
  agent_67: {
    en: {
      innocent: [
        "His camera was on a fixed shot of the skyline while the piles grew.",
        "Memory-card timestamps show continuous rolling with no long gap.",
        "City cleanup supervisors confirm he was filing B-roll uptown that night.",
      ],
      guilty: [
        "Drag marks from his hard case line up with grooves through fresh litter.",
        "Deleted clips recovered show bags in frame with his tripod leg in the corner.",
        "He sold 'exclusive' footage of the mess to a blog before parks staff arrived.",
      ],
    },
    es: {
      innocent: [
        "Su cámara estaba fija al perfil urbano mientras crecían las pilas.",
        "Marcas de tarjeta muestran grabación continua sin huecos largos.",
        "Supervisores de limpieza confirman que archivaba metraje en otra zona esa noche.",
      ],
      guilty: [
        "Marcas de arrastre de su maletín coinciden con surcos en la basura fresca.",
        "Clips borrados recuperados muestran bolsas con pata de trípode al borde.",
        "Vendió metraje 'exclusivo' del desorden a un blog antes del personal del parque.",
      ],
    },
  },
  roblox_builder: {
    en: {
      innocent: [
        "Workshop cameras show him locking tools and staying with parents until close.",
        "Wood scraps from his class are stamped and inventoried—none match the pile.",
        "His key card never opened the tunnel door toward the Common.",
      ],
      guilty: [
        "Kids' plywood sheets with workshop paint codes were under the trash layer.",
        "He checked out a dolly labeled 'museum programs' past park closing.",
        "Sawdust under the bags matches the shop floor by his workbench.",
      ],
    },
    es: {
      innocent: [
        "Cámaras del taller lo muestran cerrando herramientas y quedándose con padres hasta cerrar.",
        "Restos de madera de su clase van sellados en inventario; ninguno coincide con el montón.",
        "Su tarjeta no abrió la puerta del túnel hacia el Common.",
      ],
      guilty: [
        "Tablas del taller con códigos de pintura quedaron bajo la basura.",
        "Retiró un carrito marcado 'programas del museo' tras el cierre del parque.",
        "Aserrín bajo las bolsas coincide con el suelo de su banco de trabajo.",
      ],
    },
  },
  elsa: {
    en: {
      innocent: [
        "Stage call logs have her on headset across downtown when the trash landed.",
        "Her prop crates list only lights and fabric—no contractor bags.",
        "Fog fluid she uses is water-based and would not leave the grease found in the pile.",
      ],
      guilty: [
        "Glitter from her show costumes was mixed through food waste in the bags.",
        "She borrowed a flatbed 'for scenery' that parks staff saw near the heap.",
        "Confetti from her winter finale matched scraps stuck to a trash bag handle.",
      ],
    },
    es: {
      innocent: [
        "Registros de escena la tienen con auriculares en otro barrio cuando cayó la basura.",
        "Sus cajas de utilería listan solo luces y tela; sin bolsas de obra.",
        "Su fluido de niebla es a base de agua y no deja la grasa hallada en el montón.",
      ],
      guilty: [
        "Purpurina de sus vestuarios se mezcló con restos de comida en las bolsas.",
        "Pidió una plataforma 'para escenografía' que personal del parque vio cerca del montón.",
        "Confeti de su final de invierno coincidió con retazos en el asa de una bolsa.",
      ],
    },
  },
  steve: {
    en: {
      innocent: [
        "Fan photos show him in full block-head gear blocks away from the trash zone.",
        "The costume head cannot fit through the narrow gate to the maintenance yard.",
        "His event badge only scanned at the convention hall that night.",
      ],
      guilty: [
        "Foam glove grit matched fast-food trash wedged in the pile.",
        "He texted about 'ditching the suit to move bags before sunrise.'",
        "Square glove prints on a bag matched the mascot gloves found in his locker.",
      ],
    },
    es: {
      innocent: [
        "Fotos de fans lo muestran con el traje completo lejos de la zona de basura.",
        "La cabeza del disfraz no pasa por el portón estrecho del patio de mantenimiento.",
        "Su gafete de evento solo se escaneó en el salón de convenciones esa noche.",
      ],
      guilty: [
        "Arena en guantes de espuma coincidió con basura de comida rápida en el montón.",
        "Mensaje sobre 'quitarse el traje para mover bolsas antes del amanecer.'",
        "Huellas de guantes cuadrados en una bolsa coinciden con los del disfraz en su locker.",
      ],
    },
  },
  spyder_sammy: {
    en: {
      innocent: [
        "His spray log ends before sunset; the trash showed up hours later.",
        "Truck GPS places his rig at the depot during the dumping window.",
        "Chemicals on his permit list do not match the food grease in the bags.",
      ],
      guilty: [
        "Pesticide caps from an off-permit brand rolled out when staff opened a bag.",
        "He routed 'extra supplies' through the Common to avoid weigh-station paperwork.",
        "Residue on his gloves matched a solvent traced to the trash liner.",
      ],
    },
    es: {
      innocent: [
        "Su registro de fumigación termina antes del atardecer; la basura llegó horas después.",
        "GPS del camión deja el vehículo en el depósito durante el vertido.",
        "Los químicos de su permiso no coinciden con la grasa de comida en las bolsas.",
      ],
      guilty: [
        "Tapas de pesticida de marca no autorizada salieron al abrir una bolsa.",
        "Enrutó 'suministros extra' por el Common para evitar papeleo de báscula.",
        "Residuo en guantes coincidió con un disolvente rastreado al forro de la bolsa.",
      ],
    },
  },
};

const south_end: Record<string, CharacterCasePools> = {
  bacon_hair: {
    en: {
      innocent: [
        "Plant security video shows him on the repair floor when the parade route was blocked.",
        "Coal bags at the scene use a different lot stamp than his factory's shipping labels.",
        "Witnesses describe the rigger as taller than him.",
      ],
      guilty: [
        "Coal dust on the route matches samples from bags staged at his loading dock.",
        "Heavy cart tracks run from the float lane to the fake mine tent.",
        "Work-boot impressions by the tarps match casts taken from his locker pair.",
      ],
    },
    es: {
      innocent: [
        "Cámaras de planta lo muestran en taller de reparaciones cuando cerraron la ruta.",
        "Bolsas de carbón en la escena usan otro lote que las etiquetas de envío de su fábrica.",
        "Testigos describen al montador más alto que él.",
      ],
      guilty: [
        "Polvo de carbón en la ruta coincide con muestras de bolsas en su muelle de carga.",
        "Huellas de carrito pesado van del carril de carrozas a la carpa de mina falsa.",
        "Impresiones de bota de trabajo junto a lonas coinciden con moldes de su casillero.",
      ],
    },
  },
  ballerina_cappuccina: {
    en: {
      innocent: [
        "She was closing out registers when police first taped the corridor—staff confirm.",
        "The generator serial traced to a rental chain does not match her café accounts.",
        "Her shop has no storage for coal props or rigging gear.",
      ],
      guilty: [
        "A generator tied to the barricades was rented with her business card.",
        "Grand-opening flyers from her café were stapled to the wooden barriers.",
        "Noise complaints on file name her block for the same hours the route shut down.",
      ],
    },
    es: {
      innocent: [
        "Cerraba cajas cuando la policía acordonó el pasillo — lo confirma el personal.",
        "El número de serie del generador rastreado no coincide con cuentas de su café.",
        "Su local no tiene bodega para utilería de carbón ni aparejos.",
      ],
      guilty: [
        "Un generador amarrado a las vallas se alquiló con su tarjeta de negocio.",
        "Volantes de inauguración de su café estaban grapados a las barreras de madera.",
        "Quejas de ruido en archivo citan su cuadra en las mismas horas del cierre de ruta.",
      ],
    },
  },
  tung: {
    en: {
      innocent: [
        "Cameras place him signing night maintenance forms inside the plant during the shutdown.",
        "Coal truck paperwork with his stamp was filed days earlier—routes do not match the parade map.",
        "His supervisor badge was scanned at the factory gate, not on Tremont.",
      ],
      guilty: [
        "Altered haul forms list coal drops on streets with no parade permit on file.",
        "His orange vest was found wadded on a pallet of prop coal sacks.",
        "After-hours gate logs show his card at a closed staging yard beside the route.",
      ],
    },
    es: {
      innocent: [
        "Cámaras lo muestran firmando mantenimiento nocturno dentro de la planta durante el cierre.",
        "Papeles de camión con su sello son de días antes; rutas no coinciden con el mapa del desfile.",
        "Su gafete de supervisor se escaneó en la entrada de la fábrica, no en Tremont.",
      ],
      guilty: [
        "Formas de transporte alteradas listan descargas en calles sin permiso de desfile.",
        "Su chaleco naranja apareció arrugado sobre un palé de sacos de carbón de utilería.",
        "Registros nocturnos muestran su tarjeta en un patio cerrado junto a la ruta.",
      ],
    },
  },
  roblox_noob: {
    en: {
      innocent: [
        "He was mid-tour inside the museum when the barricades went up.",
        "Printed maps he hands out only show exhibits—not street closures.",
        "Badge data never shows him west of the museum plaza that night.",
      ],
      guilty: [
        "Gift-shop maps in his handwriting label a fake 'coal mine tour' on the parade path.",
        "Tour guests heard him call the setup a 'South End coal adventure.'",
        "Laminated tour badges were zip-tied to the caution tape at the barriers.",
      ],
    },
    es: {
      innocent: [
        "Estaba a mitad de tour dentro del museo cuando levantaron las vallas.",
        "Los mapas impresos que reparte solo muestran salas, no cierres de calle.",
        "Datos de gafete no lo muestran al oeste de la plaza del museo esa noche.",
      ],
      guilty: [
        "Mapas de tienda con su letra marcan un falso 'tour mina de carbón' en la ruta.",
        "Visitas del tour lo oyeron llamar al montaje 'aventura de carbón del South End.'",
        "Gafetes laminados del tour iban amarrados a la cinta de precaución.",
      ],
    },
  },
  roblox_guest: {
    en: {
      innocent: [
        "His guest pass expired before inspectors arrived; he could not re-enter alone.",
        "Phone data shows him on a train out of downtown when the route was sealed.",
        "He had no contractor credentials to move staging gear on the street.",
      ],
      guilty: [
        "His day pass scanned at every police barrier along the closed leg.",
        "Texts ask where to 'stack the coal props before go-time.'",
        "A lumber rental receipt lists this morning and a South End cross-street.",
      ],
    },
    es: {
      innocent: [
        "Su pase de invitado venció antes de que llegaran inspectores; no pudo reingresar solo.",
        "Datos del móvil lo ponen en tren saliendo del centro cuando sellaron la ruta.",
        "No tenía credenciales de contratista para mover utilería en la calle.",
      ],
      guilty: [
        "Su pase diario se escaneó en cada barrera policial del tramo cerrado.",
        "Mensajes preguntan dónde 'apilar la utilería de carbón antes de la hora.'",
        "Recibo de alquiler de madera lista esta mañana y una esquina del South End.",
      ],
    },
  },
  baconette_hair: {
    en: {
      innocent: [
        "Health inspectors had her cart taped off for a paperwork fix during the incident.",
        "Vendors beside her stall say she never unloaded anything heavier than syrup crates.",
        "Her permit covers the sidewalk only—not the float staging lane.",
      ],
      guilty: [
        "Her cart was left sideways across the float assembly lane overnight.",
        "Coal dust on her wheels matches samples swabbed from the barricade pile.",
        "She argued with marshals about 'holding a filming spot' on the route.",
      ],
    },
    es: {
      innocent: [
        "Inspectores precintaron su carrito por trámite de papeles durante el incidente.",
        "Vecinos de puesto dicen que no descargó nada más pesado que cajas de jarabe.",
        "Su permiso cubre solo acera, no el carril de montaje de carrozas.",
      ],
      guilty: [
        "Dejó el carrito de lado bloqueando el carril de montaje toda la noche.",
        "Polvo de carbón en ruedas coincide con muestras del montón de vallas.",
        "Discutió con oficiales por 'guardar un lugar para filmar' en la ruta.",
      ],
    },
  },
  peeley: {
    en: {
      innocent: [
        "He was in the banana suit greeting families two blocks from the barricades.",
        "The suit sleeves snag on everything—he could not have rigged tarps cleanly.",
        "Museum Wi-Fi logs show his costume badge pinging indoors during the stunt.",
      ],
      guilty: [
        "Yellow suit fabric snagged on a nail holding up a coal-stunt banner.",
        "A livestream geotag shows his phone broadcasting from behind the fake mine.",
        "Peel stickers from his costume littered the cordoned pavement.",
      ],
    },
    es: {
      innocent: [
        "Iba en traje de plátano saludando familias a dos cuadras de las vallas.",
        "Las mangas del traje enganchan todo; no pudo tensar lonas con limpieza.",
        "Registros Wi‑Fi del museo muestran su gafete de disfraz adentro durante el truco.",
      ],
      guilty: [
        "Tela amarilla del traje quedó enganchada en un clavo de la pancarta del carbón.",
        "Un geotag de transmisión en vivo ubica su móvil detrás de la mina falsa.",
        "Pegatinas de plátano del disfraz cubrían el pavimento acordonado.",
      ],
    },
  },
  agent_67: {
    en: {
      innocent: [
        "His lenses were aimed at the river cleanup crew, not the parade grid.",
        "Metadata shows no coal-pile frames exported from his kit that night.",
        "He filed B-roll to the city archive before the route was closed.",
      ],
      guilty: [
        "Coal dust inside his camera case matches grit from the prop pile.",
        "Recovered clips show him running extension cords across the closed lane.",
        "Tripod feet left matching impressions in the ash layer by the barriers.",
      ],
    },
    es: {
      innocent: [
        "Sus lentes apuntaban al equipo de limpieza del río, no a la cuadrícula del desfile.",
        "Metadatos sin tomas exportadas del montón de carbón desde su equipo esa noche.",
        "Archivó metraje en archivo municipal antes del cierre de ruta.",
      ],
      guilty: [
        "Polvo de carbón dentro del maletín coincide con el del montón de utilería.",
        "Clips recuperados lo muestran tendiendo extensiones en el carril cerrado.",
        "Patas del trípode dejaron huellas en la capa de ceniza junto a las vallas.",
      ],
    },
  },
  roblox_builder: {
    en: {
      innocent: [
        "Workshop video shows plywood locked in the cage until morning.",
        "None of his class scrap pieces match the screws found in the street props.",
        "He was streaming a parent build-night online during the barricade setup.",
      ],
      guilty: [
        "Kids' workshop plywood was screwed into fake tunnel walls on the asphalt.",
        "Tool-rental paperwork lists his phone for a dawn drop on Tremont.",
        "Sawdust under the coal sacks matches the museum shop floor by his bench.",
      ],
    },
    es: {
      innocent: [
        "Vídeo del taller muestra madera bajo llave en la jaula hasta la mañana.",
        "Ningún retazo de clase coincide con tornillos hallados en la utilería de calle.",
        "Transmitía una noche de construcción con padres en línea durante el montaje de vallas.",
      ],
      guilty: [
        "Madera del taller infantil formó paredes de túnel falso en el asfalto.",
        "Papeles de alquiler de herramientas listan su móvil para entrega al alba en Tremont.",
        "Aserrín bajo sacos coincide con el suelo del taller del museo junto a su banco.",
      ],
    },
  },
  elsa: {
    en: {
      innocent: [
        "Light-board logs show her cues running at a downtown stage, not on the parade line.",
        "Her fog machine uses a fluid that would not leave the oily grit found on the tarps.",
        "Crew lists her on headset across town when the coal pile appeared.",
      ],
      guilty: [
        "Stage fog mixed with coal dust and helped trigger the air-quality hold that stopped the march.",
        "Her lighting cables were zip-tied to the metal crowd barriers.",
        "Spotlight gels recovered on-site match her winter show test reel.",
      ],
    },
    es: {
      innocent: [
        "Registros de luces muestran sus señales en escena céntrica, no en la línea del desfile.",
        "Su máquina de niebla usa fluido que no deja la grasa hallada en lonas.",
        "La cuadrilla la tiene con auricular en otro barrio cuando apareció el carbón.",
      ],
      guilty: [
        "Niebla de escenario se mezcló con polvo y contribuyó a la alerta de aire que paró el desfile.",
        "Sus cables de iluminación iban amarrados a las vallas metálicas.",
        "Geles de foco hallados en sitio coinciden con su prueba de luces de invierno.",
      ],
    },
  },
  steve: {
    en: {
      innocent: [
        "Fan photos timestamp him in full mascot gear at a convention doors away.",
        "The foam head cannot squeeze through the gate crews used to move the props.",
        "His wristband only scanned at the expo hall that evening.",
      ],
      guilty: [
        "Coarse grit on the foam gloves matches coal dust from the jersey barriers.",
        "Crowd photos place him by the prop pile minutes before police shut the street.",
        "He changed out of the suit right before coverall-clad helpers appeared on camera.",
      ],
    },
    es: {
      innocent: [
        "Fotos de fans lo marcan con disfraz completo en convención a varias puertas de distancia.",
        "La cabeza de espuma no pasa el portón que usaron para mover utilería.",
        "Su pulsera solo se escaneó en el salón de expo esa tarde.",
      ],
      guilty: [
        "Arena gruesa en guantes de espuma coincide con polvo de vallas jersey.",
        "Fotos del público lo sitúan junto al montón de utilería minutos antes del cierre.",
        "Se quitó el traje justo antes de que ayudantes con overoles salieran en cámara.",
      ],
    },
  },
  spyder_sammy: {
    en: {
      innocent: [
        "His truck was at the depot when GPS logs for the closure window were pulled.",
        "Permitted sprays on his truck are listed; none match the residue on the coal tarps.",
        "Route sheets show him finishing a riverbank job before the parade rehearsal.",
      ],
      guilty: [
        "Unlabeled drums sat beside the coal props where hazmat later taped the sidewalk.",
        "His truck GPS hits every closure point along the printed parade map.",
        "Hose residue tested as a concentrate not approved for street use.",
      ],
    },
    es: {
      innocent: [
        "Su camión estaba en el depósito según GPS en la ventana del cierre.",
        "Fumigaciones permitidas en el camión están listadas; ninguna coincide con residuo en lonas.",
        "Hojas de ruta muestran un trabajo en ribera antes del ensayo del desfile.",
      ],
      guilty: [
        "Bidones sin etiqueta junto al carbón donde hazmat precintó la acera.",
        "GPS del camión marca cada punto cerrado del mapa impreso del desfile.",
        "Residuo en manguera dio concentrado no aprobado para uso en calle.",
      ],
    },
  },
};

const newbury_street: Record<string, CharacterCasePools> = {
  bacon_hair: {
    en: {
      innocent: [
        "Delivery logs show his rig at the plant loading dock during the alley dump.",
        "Drywall dust on his gloves does not match the boutique tile mortar in the pile.",
        "Cameras on his route never face the service alley behind the shops.",
      ],
      guilty: [
        "Renovation drum stickers from a Newbury job site were in the debris heap.",
        "Tire treads match his work van leaving the alley before dawn.",
        "He texted about 'dropping off scrap where cameras never tilt.'",
      ],
    },
    es: {
      innocent: [
        "Registros de entrega ponen su unidad en muelle de planta durante el vertido del callejón.",
        "Polvo de yeso en guantes no coincide con mortero de azulejo de boutique del montón.",
        "Cámaras de su ruta no miran el callejón de servicio detrás de las tiendas.",
      ],
      guilty: [
        "Pegatinas de obra de un sitio en Newbury aparecieron en el montón.",
        "Huellas de neumático coinciden con su furgoneta saliendo del callejón antes del alba.",
        "Mensaje sobre 'dejar escombros donde las cámaras no miran.'",
      ],
    },
  },
  ballerina_cappuccina: {
    en: {
      innocent: [
        "Her supplier van was in the shop district on the opposite end of the street that night.",
        "Tile samples in the pile are high-end imports her café never ordered.",
        "She was catering a private event with a stamped contract for the same hours.",
      ],
      guilty: [
        "Branded cup sleeves were mixed with broken tile in the alley bags.",
        "Her van was cited for idle loading behind a Newbury boutique the night of the dump.",
        "Coffee grounds in the pile match her grinder batch lot from that week.",
      ],
    },
    es: {
      innocent: [
        "Su furgoneta de proveedor estaba en otro extremo de la calle esa noche.",
        "Muestras de azulejo del montón son importadas que su café nunca pidió.",
        "Catering con contrato sellado cubre las mismas horas del vertido.",
      ],
      guilty: [
        "Fundas de vaso de su marca se mezclaron con azulejo roto en bolsas del callejón.",
        "Multaron su furgoneta por carga detenida detrás de una boutique de Newbury esa noche.",
        "Posos del montón coinciden con el lote de molinillo de esa semana.",
      ],
    },
  },
  tung: {
    en: {
      innocent: [
        "Night forms he signed reference a plant pickup—timestamps do not overlap the alley window.",
        "Orange cones from his crew were logged at the industrial yard, not on Newbury.",
        "His card opens factory doors only; boutique alleys are out of scope.",
      ],
      guilty: [
        "A debris manifest with his initials lists a Newbury alley with no hauler stamp.",
        "Traffic cam caught his crew's cone pattern blocking the service entrance.",
        "He approved an off-books truck that never checked in at the transfer station.",
      ],
    },
    es: {
      innocent: [
        "Formas nocturnas que firmó son de recogida en planta; horas no cruzan el callejón.",
        "Conos de su cuadrilla registrados en patio industrial, no en Newbury.",
        "Su tarjeta solo abre puertas de fábrica; callejones de tiendas quedan fuera.",
      ],
      guilty: [
        "Manifiesto con sus iniciales lista callejón de Newbury sin sello de transportista.",
        "Cámara de tráfico captó patrón de conos bloqueando entrada de servicio.",
        "Autorizó camión extraoficial que nunca registró en la estación de transferencia.",
      ],
    },
  },
  roblox_noob: {
    en: {
      innocent: [
        "He was giving a late gallery tour; badge scans keep him inside the museum.",
        "Museum flyers found under bags were misprints from last season's exhibit.",
        "Staff confirm he asked about recycling rules, not illegal dumping.",
      ],
      guilty: [
        "Fresh flyers for his tour were tucked under contractor bags in the pile.",
        "He asked facilities how to 'haul junk off Newbury fast after hours.'",
        "A dolly from the museum loading dock was left in the alley beside the debris.",
      ],
    },
    es: {
      innocent: [
        "Daba tour tardío; escaneos de gafete lo mantienen dentro del museo.",
        "Volantes del museo bajo bolsas son errores de impresión de temporada pasada.",
        "Personal confirma que preguntó por reciclaje, no por vertido ilegal.",
      ],
      guilty: [
        "Volantes nuevos de su tour aparecieron bajo bolsas de obra.",
        "Preguntó a mantenimiento cómo 'sacar escombros de Newbury rápido tras cerrar.'",
        "Carrito del muelle del museo quedó en el callejón junto al montón.",
      ],
    },
  },
  roblox_guest: {
    en: {
      innocent: [
        "His guest badge logged out before the debris showed up on the 311 report.",
        "Phone location stayed in Cambridge during the dump timestamp.",
        "He never had a loading key for boutique service doors.",
      ],
      guilty: [
        "His badge scanned at a Newbury loading door minutes before the pile photo.",
        "Rental dolly treads lead from the sidewalk cut to the alley heap.",
        "Messages coordinate 'tile bags behind the pink door' with his contact saved.",
      ],
    },
    es: {
      innocent: [
        "Su gafete registró salida antes de que el montón apareciera en el reporte 311.",
        "Ubicación del móvil se quedó en Cambridge en la hora del vertido.",
        "Nunca tuvo llave de carga de puertas de servicio de boutiques.",
      ],
      guilty: [
        "Su gafete se escaneó en puerta de carga de Newbury minutos antes de la foto del montón.",
        "Huellas de carrito de alquiler van del corte de acera al montón del callejón.",
        "Mensajes coordinan 'bolsas de azulejo tras la puerta rosa' con su contacto guardado.",
      ],
    },
  },
  baconette_hair: {
    en: {
      innocent: [
        "Her cart was in for a wheel repair; she could not haul debris that night.",
        "Grout smeared on the pile is floor tile type; her cart only sells packaged food.",
        "Street vendors on her corner vouch she restocked syrup, not rubble.",
      ],
      guilty: [
        "Wheel grooves left grout smears matching the boutique tile dust in the pile.",
        "She parked for a restock with the tailgate facing the blocked alley entrance.",
        "Snack crates were stacked to hide contractor bags behind her awning.",
      ],
    },
    es: {
      innocent: [
        "Su carrito estaba en reparación de rueda; no pudo transportar escombros esa noche.",
        "Lechada del montón es de piso; su carrito solo vende comida empaquetada.",
        "Vendedores de su esquina avalan que reabastecía jarabe, no escombros.",
      ],
      guilty: [
        "Surcos de rueda dejaron lechada que coincide con polvo de azulejo del montón.",
        "Estacionó para reabastecer con portón hacia la entrada bloqueada del callejón.",
        "Cajas de snacks tapaban bolsas de obra detrás del toldo.",
      ],
    },
  },
  peeley: {
    en: {
      innocent: [
        "He was doing a photo line in costume; timestamps cover the alley dump window.",
        "The banana suit cannot carry sheetrock without tearing the seams.",
        "Museum security has him on indoor cameras during the haul.",
      ],
      guilty: [
        "Costume bag fabric matched scraps stuck to a drywall bundle.",
        "He carried contractor bags down Newbury in plain clothes after the suit came off.",
        "Peel-sticker backing was found pressed into wet grout on a thrown tile.",
      ],
    },
    es: {
      innocent: [
        "Hacía fila de fotos en disfraz; marcas de tiempo cubren la hora del vertido del callejón.",
        "El traje de plátano no aguanta planchas de yeso sin romperse.",
        "Seguridad del museo lo tiene en cámaras interiores durante el traslado.",
      ],
      guilty: [
        "Tela de bolsa del disfraz coincidió con retazos en un fajo de yeso.",
        "Llevó bolsas de obra por Newbury en ropa civil tras quitarse el traje.",
        "Respaldo de pegatina de plátano quedó marcado en lechada húmeda de un azulejo tirado.",
      ],
    },
  },
  agent_67: {
    en: {
      innocent: [
        "His tripod scraped a public art install uptown—metadata proves he was not behind the shops.",
        "Recovered cards show continuous city-hall B-roll during the dump.",
        "Lens caps in his bag tested clean of the boutique mortar mix.",
      ],
      guilty: [
        "Paint chips on his tripod feet match fresh boutique trim found in the pile.",
        "A time-lapse file shows debris flying into frame from his alley angle.",
        "He sold 'reno leak' photos to a gossip site before sanitation arrived.",
      ],
    },
    es: {
      innocent: [
        "Su trípode rozó una instalación artística céntrica — metadatos prueban que no estaba detrás de las tiendas.",
        "Tarjetas recuperadas muestran metraje continuo de ayuntamiento durante el vertido.",
        "Tapas de lente en su bolsa salieron limpias del mortero de boutique.",
      ],
      guilty: [
        "Restos de pintura en patas del trípode coinciden con moldura fresca del montón.",
        "Un time-lapse muestra escombros entrando en encuadre desde su ángulo del callejón.",
        "Vendió fotos de 'filtración de obra' a un sitio chismoso antes de saneamiento.",
      ],
    },
  },
  roblox_builder: {
    en: {
      innocent: [
        "Inventory tags show all workshop lumber accounted for in the museum cage.",
        "Parents on the stream chat confirm he never left the build table.",
        "None of his class screws match the hardware in the alley debris.",
      ],
      guilty: [
        "Lumber tags from his workshop match sticks in the illegal pile.",
        "He borrowed a van lettered for 'storefront refresh' on Newbury.",
        "Sawdust from his bench was mixed under broken display cases in the bags.",
      ],
    },
    es: {
      innocent: [
        "Etiquetas de inventario muestran toda la madera del taller en jaula del museo.",
        "Padres en el chat del stream confirman que no dejó la mesa de armado.",
        "Ningún tornillo de su clase coincide con el hardware del callejón.",
      ],
      guilty: [
        "Etiquetas de madera del taller coinciden con tablas del montón ilegal.",
        "Pidió furgoneta rotulada para 'renovación de vitrina' en Newbury.",
        "Aserrín de su banco se mezcló bajo vitrinas rotas en las bolsas.",
      ],
    },
  },
  elsa: {
    en: {
      innocent: [
        "Prop crates in the pile are hardware-store brands; hers are custom road cases.",
        "She was on a headset downtown for a dry tech run, not loading alleys.",
        "Fog-fluid bottles in the heap are a brand her show does not use.",
      ],
      guilty: [
        "Glitter from her costumes stuck to shattered glass from boutique windows.",
        "She stored fog crates behind a shop for 'atmosphere' shots that blocked pickup.",
        "Confetti from her finale was pressed into caulk smeared on dumped trim.",
      ],
    },
    es: {
      innocent: [
        "Cajas del montón son de ferretería; las suyas son flight cases a medida.",
        "Estaba con auricular en ensayo técnico céntrico, no cargando callejones.",
        "Botellas de niebla del montón son marca que su show no usa.",
      ],
      guilty: [
        "Purpurina de sus vestuarios pegada a vidrio roto de vitrinas.",
        "Guardó cajas de niebla tras una tienda para tomas de 'atmósfera' que bloquearon recogida.",
        "Confeti de su final quedó en masilla untada en molduras tiradas.",
      ],
    },
  },
  steve: {
    en: {
      innocent: [
        "Convention hall scans show him in suit and head for a midnight fan meet.",
        "Foam from the costume cannot scrape the metal studs found in the debris.",
        "His square-toe mascot boots were in lost-and-found during the alley haul.",
      ],
      guilty: [
        "Insulation fibers from the pile clung to foam glove interiors from his suit.",
        "He changed behind a Newbury scaffold minutes before bags hit the pavement.",
        "Security saw block-head gloves tossed in a contractor tote by the pile.",
      ],
    },
    es: {
      innocent: [
        "Escaneos del salón lo muestran con traje y cabeza en meet de medianoche con fans.",
        "La espuma del disfraz no raspa los montantes metálicos del escombro.",
        "Sus botas cuadradas del disfraz estaban en objetos perdidos durante el traslado.",
      ],
      guilty: [
        "Fibras de aislamiento del montón pegadas al interior de guantes de espuma del traje.",
        "Se cambió detrás de andamio de Newbury minutos antes de las bolsas en acera.",
        "Seguridad vio guantes del bloque en bolsa de obra junto al montón.",
      ],
    },
  },
  spyder_sammy: {
    en: {
      innocent: [
        "His permitted chemical list excludes the adhesive found on boutique tile shards.",
        "GPS shows the spray truck parked at the depot for service that night.",
        "He finished a riverbank contract before the boutique trash timestamp.",
      ],
      guilty: [
        "Pesticide totes were stacked with reno bags like someone hid hazmat as construction junk.",
        "His hose was coiled behind the boutique dumpster with mortar on the nozzle.",
        "A drum in the pile had his route sticker peeled and stuck back crooked.",
      ],
    },
    es: {
      innocent: [
        "Su lista de químicos permitidos excluye el adhesivo hallado en restos de azulejo.",
        "GPS muestra el camión de fumigación en taller de servicio esa noche.",
        "Terminó contrato en ribera antes de la hora de la basura de boutique.",
      ],
      guilty: [
        "Bidones de pesticida apilados con bolsas de obra como si escondieran hazmat.",
        "Su manguera enrollada tras contenedor con mortero en la boquilla.",
        "Un bidón del montón tenía su etiqueta de ruta pegada torcida de nuevo.",
      ],
    },
  },
};

const BY_CASE: Record<
  Exclude<BostonCaseId, "charles_river">,
  Record<string, CharacterCasePools>
> = {
  boston_common,
  south_end,
  newbury_street,
};

export function characterAlibiPools(
  c: CharacterJson,
  caseId: BostonCaseId,
  lang: Lang
): { innocent: string[]; guilty: string[] } {
  if (caseId === "charles_river") {
    if (lang === "es") {
      const es = ES[c.uid];
      if (es) {
        return {
          innocent: [...es.alibis_innocent],
          guilty: [...es.alibis_guilty],
        };
      }
    }
    return { innocent: [...c.alibis_innocent], guilty: [...c.alibis_guilty] };
  }
  const row = BY_CASE[caseId][c.uid];
  if (!row) {
    return { innocent: [...c.alibis_innocent], guilty: [...c.alibis_guilty] };
  }
  const pools = row[lang] ?? row.en;
  return {
    innocent: [...pools.innocent],
    guilty: [...pools.guilty],
  };
}
