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
        "La tarjeta lo muestra dentro con un grupo escolar durante el vertido.",
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
        "La ubicación de su celular lo pone al otro lado del río hasta la mañana.",
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
        "Supervisores de limpieza confirman que grababa video en otra zona esa noche.",
      ],
      guilty: [
        "Marcas de arrastre de su maletín coinciden con surcos en la basura fresca.",
        "Clips borrados recuperados muestran bolsas con pata de trípode al borde.",
        "Vendió video 'exclusivo' del desorden a un blog antes de que llegara el personal del parque.",
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
        "Su pulsera del evento solo se escaneó en el salón de convenciones esa noche.",
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
        "Oily marks on his gloves matched a bottle linked to the trash liner.",
      ],
    },
    es: {
      innocent: [
        "Su registro de fumigación termina antes del atardecer; la basura llegó horas después.",
        "GPS del camión lo pone en el patio durante el vertido.",
        "Los químicos de su permiso no coinciden con la grasa de comida en las bolsas.",
      ],
      guilty: [
        "Tapas de pesticida de marca no autorizada salieron al abrir una bolsa.",
        "Enrutó 'suministros extra' por el Common para evitar papeleo de báscula.",
        "Marcas aceitosas en guantes coincidieron con una botella ligada al forro de la bolsa.",
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
        "Su local no tiene bodega para utilería de carbón ni equipo de montaje.",
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
        "Altered truck papers list coal drops on streets with no parade permit on file.",
        "His orange vest was found wadded on a pallet of prop coal sacks.",
        "After-hours gate logs show his card at a closed staging yard beside the route.",
      ],
    },
    es: {
      innocent: [
        "Cámaras lo muestran firmando mantenimiento nocturno dentro de la planta durante el cierre.",
        "Papeles de camión con su sello son de días antes; rutas no coinciden con el mapa del desfile.",
        "Su tarjeta de supervisor se escaneó en la entrada de la fábrica, no en Tremont.",
      ],
      guilty: [
        "Papeles de camión alterados listan descargas en calles sin permiso de desfile.",
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
        "La tarjeta no lo registra al oeste de la plaza del museo esa noche.",
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
        "Su celular lo ubica en el tren saliendo del centro cuando sellaron la ruta.",
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
        "Los registros de Wi-Fi del museo muestran que su disfraz estaba adentro durante el truco.",
      ],
      guilty: [
        "Tela amarilla del traje quedó enganchada en un clavo de la pancarta del carbón.",
        "Un geotag de transmisión en vivo ubica su celular detrás de la mina falsa.",
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
        "Entregó su video al archivo municipal antes del cierre de la ruta.",
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
        "Papeles de alquiler de herramientas registran su número para una entrega al alba en Tremont.",
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
        "Su camión estaba en el patio según GPS durante la ventana del cierre.",
        "Fumigaciones permitidas en el camión están listadas; ninguna coincide con residuo en lonas.",
        "Hojas de ruta muestran un trabajo en ribera antes del ensayo del desfile.",
      ],
      guilty: [
        "Bidones sin etiqueta junto al carbón donde materiales peligrosos precintaron la acera.",
        "GPS del camión marca cada punto cerrado del mapa impreso del desfile.",
        "Residuo en manguera dio concentrado no aprobado para uso en calle.",
      ],
    },
  },
};

const revere_beach: Record<string, CharacterCasePools> = {
  bacon_hair: {
    en: {
      innocent: [
        "Delivery logs show his rig at the plant pier when trash hit the Revere Beach surf.",
        "Oil smears on his gloves match factory grease, not the food plastic in the floating mat.",
        "Dash cam on his route never points toward the Revere Beach parking strip.",
      ],
      guilty: [
        "Factory drum labels washed up with tide foam match stickers from his loading shift.",
        "Deep van treads in the soft sand match his tires pulling away from the wrack line.",
        "He texted about 'letting the ocean take the bags' from a Revere Beach pin.",
      ],
    },
    es: {
      innocent: [
        "Registros de entrega ponen su unidad en muelle de planta cuando basura entró al mar en Revere Beach.",
        "Manchas de aceite en guantes coinciden con grasa de fábrica, no con plástico de comida flotante.",
        "Cámara del tablero nunca apunta al estacionamiento de Revere Beach.",
      ],
      guilty: [
        "Etiquetas de bidón de fábrica llegaron con espuma de marea de su turno de carga.",
        "Huellas profundas en arena blanda coinciden con sus neumáticos saliendo de la línea de algas.",
        "Mensaje sobre 'dejar que el mar se lleve las bolsas' con pin de Revere Beach.",
      ],
    },
  },
  ballerina_cappuccina: {
    en: {
      innocent: [
        "Grease-trap pickups for her café were on the books hours before plastic bloomed in the Revere Beach surf.",
        "Cup brands in the floating trash are chains her shop does not stock.",
        "She was plating a wedding tasting with a signed timeline during high tide.",
      ],
      guilty: [
        "Branded cup sleeves tangled in seaweed match sleeves from her counter stack.",
        "Her van GPS hovers at Revere Beach after close on the night bags slid in.",
        "Coffee grounds in a split sack on the sand match her grinder batch sticker.",
      ],
    },
    es: {
      innocent: [
        "Recogidas de trampa de grasa de su café estaban agendadas antes de que plástico apareciera en Revere Beach.",
        "Marcas de vasos en la basura flotante no son las que vende su local.",
        "Estaba en cata de boda con horario firmado durante pleamar.",
      ],
      guilty: [
        "Fundas de vaso enredadas en algas coinciden con las de su mostrador.",
        "GPS de su furgoneta se queda en Revere Beach tras cerrar la noche de las bolsas.",
        "Posos en saco roto en arena coinciden con etiqueta de su molinillo.",
      ],
    },
  },
  tung: {
    en: {
      innocent: [
        "Night forms he signed lock him to plant pickups—timestamps miss the Revere Beach tide change.",
        "Orange cones from his crew were logged at the yard, not along Revere Beach Boulevard.",
        "His access card never opens beach maintenance gates on the city system.",
      ],
      guilty: [
        "Night papers with his initials list Revere Beach with no dump-yard stamp.",
        "Traffic cam shows his cone pattern blocking the beach access lane before high tide.",
        "He approved a truck that offloaded straight onto the sand without weighing in.",
      ],
    },
    es: {
      innocent: [
        "Formas nocturnas lo atan a recogidas en planta; horas no cruzan el cambio de marea en Revere Beach.",
        "Conos de su cuadrilla registrados en patio, no en Revere Beach Boulevard.",
        "Su tarjeta nunca abre portones de mantenimiento de playa en el sistema municipal.",
      ],
      guilty: [
        "Papeles nocturnos con sus iniciales dicen Revere Beach sin sello del patio de basura.",
        "Cámara muestra sus conos bloqueando acceso a la playa antes de pleamar.",
        "Autorizó camión que descargó en arena sin pesar en báscula.",
      ],
    },
  },
  roblox_noob: {
    en: {
      innocent: [
        "He was giving a late gallery tour; badge scans keep him inside the museum.",
        "Flyers found in the surf were old misprints, not his current tour batch.",
        "Staff say he only asked how visitors should use beach trash cans responsibly.",
      ],
      guilty: [
        "Fresh tour flyers floated in the same clump as black contractor bags.",
        "He asked how to 'lose event trash fast near Wonderland and the beach.'",
        "A museum hand truck was abandoned above the wet sand at Revere Beach.",
      ],
    },
    es: {
      innocent: [
        "Daba tour tarde; la tarjeta lo mantiene dentro del museo.",
        "Volantes en la resaca son viejos errores de imprenta, no su lote actual.",
        "Personal dice que solo preguntó cómo usar los basureros de la playa bien.",
      ],
      guilty: [
        "Volantes nuevos del tour flotaron con bolsas negras de obra.",
        "Preguntó cómo 'perder basura de evento rápido cerca de Wonderland y la playa.'",
        "Carrito del museo abandonado sobre arena mojada en Revere Beach.",
      ],
    },
  },
  roblox_guest: {
    en: {
      innocent: [
        "His guest badge logged out before the trash mat showed on the lifeguard photo log.",
        "Phone location stayed on the Red Line away from Revere Beach at high tide.",
        "He never had a key to the beach equipment shed.",
      ],
      guilty: [
        "Wonderland gate scans place him walking toward the sand minutes before bags rolled in.",
        "Rental wagon treads lead from the boardwalk cut to the plastic in the shallows.",
        "Texts say 'push past the wrack' with a dropped Revere Beach map pin.",
      ],
    },
    es: {
      innocent: [
        "Su tarjeta registró salida antes de la mancha de basura que apareció en foto del salvavidas.",
        "Móvil en la línea roja lejos de Revere Beach en pleamar.",
        "Nunca tuvo llave del cobertizo de equipo de playa.",
      ],
      guilty: [
        "Escaneos en Wonderland lo ponen yendo a la arena minutos antes de las bolsas.",
        "Huellas de carrito van del paseo al plástico en lo poco profundo.",
        "Mensajes dicen 'pasar la línea de algas' con pin de Revere Beach.",
      ],
    },
  },
  baconette_hair: {
    en: {
      innocent: [
        "Her cart was in for a wheel repair; she could not drag the heavy bags found in the surf.",
        "Wrapper codes in the floating mat are bulk warehouse brands, not her snack SKUs.",
        "Corner vendors vouch she restocked syrup while the tide brought trash in.",
      ],
      guilty: [
        "Narrow wheel grooves in wet sand match her cart tires backing to the seawall.",
        "She parked for 'ice restock' with the tailgate aimed at the spot bags entered the water.",
        "Sticky syrup rings on a torn bag match her pour nozzles from the same night.",
      ],
    },
    es: {
      innocent: [
        "Su carrito estaba en reparación; no pudo arrastrar bolsas pesadas halladas en la resaca.",
        "Códigos de envoltorio en la mancha flotante son de mayoreo, no de sus snacks.",
        "Vendedores avalan que reabastecía jarabe cuando la marea trajo basura.",
      ],
      guilty: [
        "Surcos estrechos en arena mojada coinciden con ruedas de su carrito al muro.",
        "Estacionó para 'hielo' con portón hacia donde las bolsas entraron al agua.",
        "Anillos de jarabe en bolsa rasgada coinciden con sus picos de vertido esa noche.",
      ],
    },
  },
  peeley: {
    en: {
      innocent: [
        "He was doing a photo line in costume; timestamps cover the tide window.",
        "The banana suit cannot wade deep enough to shove those bags past the buoys.",
        "Museum security has him on indoor cameras during the beach complaint call.",
      ],
      guilty: [
        "Yellow suit fibers snagged on a zip-tie that held a bag in the foam line.",
        "A livestream geotag pins him on the sand right after he peeled off the suit.",
        "Peel stickers washed up glued to fast-food sacks from his meet-and-greet route.",
      ],
    },
    es: {
      innocent: [
        "Hacía fila de fotos en disfraz; marcas cubren la ventana de marea.",
        "El traje de plátano no puede vadear lo bastante para empujar bolsas tras las boyas.",
        "Seguridad del museo lo tiene adentro durante la llamada de queja de playa.",
      ],
      guilty: [
        "Fibras amarillas enganchadas en brida que sujetaba bolsa en la espuma.",
        "Geotag de transmisión lo ubica en arena tras quitarse el traje.",
        "Pegatinas de plátano llegaron pegadas a bolsas de comida rápida de su ruta.",
      ],
    },
  },
  agent_67: {
    en: {
      innocent: [
        "Metadata locks his tripod uptown for city-hall B-roll during the Revere Beach dump.",
        "Recovered cards show continuous rolling with no beach GPS tags that night.",
        "Salt crust on his gear bag tested as road salt, not ocean spray from the sand.",
      ],
      guilty: [
        "Dried salt rings on tripod feet match splash marks on a floating contractor sack.",
        "A time-lapse catches him framing the tide pulling trash while standing in the shallows.",
        "He sold clips titled 'Revere Beach midnight dump' before the press office woke up.",
      ],
    },
    es: {
      innocent: [
        "Los metadatos lo ponen grabando video para la ciudad en el centro durante el vertido en Revere Beach.",
        "Tarjetas muestran rodaje continuo sin etiquetas GPS de playa esa noche.",
        "Costra de sal en bolsa dio sal de carretera, no rocío oceánico de arena.",
      ],
      guilty: [
        "Anillos de sal seca en patas coinciden con salpicaduras en saco flotante.",
        "Time-lapse lo muestra filmando la marea sacando basura en lo poco profundo.",
        "Vendió clips titulados 'vertido de medianoche en Revere Beach' antes de prensa.",
      ],
    },
  },
  roblox_builder: {
    en: {
      innocent: [
        "Inventory tags show all workshop lumber caged at the museum during the tide change.",
        "Parents on stream chat confirm he never left the build table that evening.",
        "None of his class glue batches match the adhesive film on bags in the surf.",
      ],
      guilty: [
        "Plywood scraps with workshop stamps washed in with the Revere Beach foam.",
        "He borrowed a van marked 'beach cleanup volunteer' but never signed in with the crew chief.",
        "Sawdust clumped in the floating mat matches shavings from his Friday bench batch.",
      ],
    },
    es: {
      innocent: [
        "Inventario muestra madera del taller en jaula del museo en el cambio de marea.",
        "Padres en el chat confirman que no dejó la mesa esa tarde.",
        "Ningún lote de pegamento coincide con película adhesiva en bolsas en la resaca.",
      ],
      guilty: [
        "Restos de madera con sellos del taller llegaron con espuma de Revere Beach.",
        "Pidió furgoneta de 'voluntario limpieza playa' pero nunca firmó con el jefe de cuadrilla.",
        "Aserrín en el tapete flotante coincide con virutas del viernes en su banco.",
      ],
    },
  },
  elsa: {
    en: {
      innocent: [
        "Fog-fluid bottles in the surf are hardware brands; hers are theater-grade road cases.",
        "She was on headset downtown for a dry tech run, not on Revere Beach sand.",
        "Glitter clumps in the water test as craft glitter, not her stage blend.",
      ],
      guilty: [
        "Show glitter clumped with plastic inside swim buoys at Revere Beach.",
        "Fog crates with her tape floated just past the shallow rope where kids wade.",
        "Confetti from her finale stuck to a wet parking receipt time-stamped at Revere Beach.",
      ],
    },
    es: {
      innocent: [
        "Botellas en la resaca son de ferretería; las suyas son de teatro en flight cases.",
        "Estaba con auricular en ensayo céntrico, no en arena de Revere Beach.",
        "Purpurina en el agua es de manualidades, no su mezcla de escenario.",
      ],
      guilty: [
        "Purpurina del show en grumos con plástico dentro de boyas en Revere Beach.",
        "Cajas de niebla con su cinta flotaron pasada la cuerda donde chapotean niños.",
        "Confeti de su final pegado a recibo mojado con hora de estacionamiento de Revere Beach.",
      ],
    },
  },
  steve: {
    en: {
      innocent: [
        "Convention hall scans show him in suit and head for a midnight fan meet.",
        "Foam from the costume cannot hold enough soaked sand to match the tide-line bags.",
        "His mascot boots were in lost-and-found when lifeguards flagged the trash mat.",
      ],
      guilty: [
        "Grit inside foam gloves matches sand pressed into a split trash sack at the waterline.",
        "Fan photos place him by the Revere Beach wall minutes before plastic bloomed offshore.",
        "Block-head gloves turned up in a wet contractor tote above the high-tide mark.",
      ],
    },
    es: {
      innocent: [
        "Escaneos del salón lo muestran con traje y cabeza en meet de medianoche.",
        "La espuma no retiene arena mojada suficiente para coincidir con bolsas de la marea.",
        "Botas del disfraz en objetos perdidos cuando salvavidas reportaron la mancha.",
      ],
      guilty: [
        "Arena dentro de guantes de espuma coincide con bolsa rasgada en línea del agua.",
        "Fotos de fans lo sitúan junto al muro de Revere Beach antes del plástico en el mar.",
        "Guantes del bloque en bolsa mojada de obra sobre marca de pleamar.",
      ],
    },
  },
  spyder_sammy: {
    en: {
      innocent: [
        "Permitted concentrates on his truck do not match the oily film on floating bags.",
        "GPS shows the spray rig parked at the depot for service during the tide dump.",
        "He finished a marsh contract miles north before the Revere Beach complaint time.",
      ],
      guilty: [
        "Unlabeled jugs floated beside food trash like hazmat dressed up as beach garbage.",
        "His hose nozzle tested positive for the same oily sheen on bags in the foam.",
        "Truck GPS shows slow rolls along Revere Beach Boulevard as the tide turned.",
      ],
    },
    es: {
      innocent: [
        "Concentrados permitidos no coinciden con película aceitosa en bolsas flotantes.",
        "GPS muestra equipo de fumigación en taller durante el vertido de marea.",
        "Terminó contrato en marisma al norte antes de la hora de la queja en Revere Beach.",
      ],
      guilty: [
        "Bidones sin etiqueta flotaron junto a comida, como material peligroso disfrazado de basura de playa.",
        "Boquilla de manguera dio el mismo brillo aceitoso que bolsas en la espuma.",
        "GPS muestra vueltas lentas por Revere Beach Boulevard al girar la marea.",
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
  revere_beach,
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
