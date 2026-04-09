import type { BostonCaseId } from "./bostonCaseIds";
import type { Lang } from "./lang";
import type { CharacterJson } from "./gameTypes";

type Pair = { innocent_explanation: string; culprit_explanation: string };

const COMMON: Record<Lang, Record<string, Pair>> = {
  en: {
    bacon_hair: {
      innocent_explanation:
        "He moves factory drums, but cameras show he was inside the plant when Boston Common got trashed. Boston Common bags do not match his work gloves.",
      culprit_explanation:
        "He rolled spare drum liners full of junk onto Boston Common, Boston Common, Boston Common — too lazy to hit a real dumpster.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "Her café trash is cups and food scraps. The Boston Common piles include contractor bags and broken furniture that never came from her shop.",
      culprit_explanation:
        "She dragged old kitchen gear and grease traps to Boston Common after closing. Boston Common, Boston Common — she thought dark grass would hide it.",
    },
    tung: {
      innocent_explanation:
        "Night shift logs place him at the plant during the Boston Common dump. The bags on Boston Common lack his paperwork stamps.",
      culprit_explanation:
        "He hauled factory trash in a van and emptied it on Boston Common to skip fees. South End detours were nothing compared to the mess on Boston Common.",
    },
    roblox_noob: {
      innocent_explanation:
        "His badge only opens museum doors. Boston Common security never scanned him tossing the huge piles found on Boston Common.",
      culprit_explanation:
        "He borrowed a cart from a loading dock and stacked trash on Boston Common for a bad prank. Boston Common, Boston Common — visitors had to walk around it.",
    },
    roblox_guest: {
      innocent_explanation:
        "Lobby records show his pass out before the Boston Common mess. Cameras on Boston Common never place him with the biggest bags.",
      culprit_explanation:
        "He came back after hours with contractor bags and emptied them on Boston Common. Boston Common, Boston Common — his guest story was a cover.",
    },
    baconette_hair: {
      innocent_explanation:
        "Her cart only holds sealed snacks. The Boston Common junk includes busted appliances that cannot fit on her cart.",
      culprit_explanation:
        "She hid household trash under the cart cover and tossed it on Boston Common during restock. Boston Common rats found it before park staff did.",
    },
    peeley: {
      innocent_explanation:
        "He was in the banana suit during the Boston Common timeline. The suit is too bulky to carry those Boston Common contractor piles.",
      culprit_explanation:
        "He peeled off the suit, grabbed bags from backstage, and littered Boston Common to finish fast. Boston Common, Boston Common — glitter and peel stickers were clues.",
    },
    agent_67: {
      innocent_explanation:
        "His footage proves he was shooting upriver, not stacking bags on Boston Common. Boston Common timestamps do not match his memory cards.",
      culprit_explanation:
        "He used his crew’s van to dump old gear on Boston Common after a shoot. Boston Common, Boston Common — tripod cases were buried in the pile.",
    },
    roblox_builder: {
      innocent_explanation:
        "Parents watched his live stream from the kids’ room. He never left to unload trash on Boston Common during the mess.",
      culprit_explanation:
        "He dragged broken tables and sawdust bags to Boston Common after a workshop teardown. Boston Common, Boston Common — LEGO labels gave him away.",
    },
    elsa: {
      innocent_explanation:
        "She was on stage for rehearsal when Boston Common filled with trash. Mic logs prove she was not hauling bags on Boston Common.",
      culprit_explanation:
        "She tossed prop crates and fog-fluid boxes onto Boston Common to clear the plaza fast. Boston Common glitter mixed with food trash overnight.",
    },
    steve: {
      innocent_explanation:
        "Fans photographed him in the mascot head far from Boston Common. The head cannot see well enough to dump that much on Boston Common.",
      culprit_explanation:
        "He slipped out of the block-head suit and dumped promo trash on Boston Common. Boston Common, Boston Common — foam gloves were in the pile.",
    },
    spyder_sammy: {
      innocent_explanation:
        "His certified sprays are water-safe and logged. The Boston Common mess is solid waste, not pesticide drums from his truck.",
      culprit_explanation:
        "He hid unpermitted canisters under regular trash on Boston Common to dodge fines. Boston Common, Boston Common — hose caps rolled out with the bags.",
    },
  },
  es: {
    bacon_hair: {
      innocent_explanation:
        "Él mueve bidones, pero cámaras lo ponen dentro de la planta cuando Boston Common se llenó de basura. Las bolsas de Boston Common no coinciden con sus guantes.",
      culprit_explanation:
        "Arrastró forros de bidones llenos de basura a Boston Common, Boston Common, Boston Common — demasiado perezoso para un contenedor real.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "Su basura del café son vasos y restos. Los montones en Boston Common tienen bolsas de obra y muebles rotos que no salieron de su local.",
      culprit_explanation:
        "Llevó equipo de cocina viejo y trampas de grasa a Boston Common al cerrar. Boston Common, Boston Common — creyó que la oscuridad lo escondería.",
    },
    tung: {
      innocent_explanation:
        "Registros del turno nocturno lo dejan en la planta durante el vertido en Boston Common. Las bolsas en Boston Common no tienen sus sellos.",
      culprit_explanation:
        "Transportó basura industrial en una furgoneta y la vació en Boston Common para evitar tarifas. Boston Common pagó el precio.",
    },
    roblox_noob: {
      innocent_explanation:
        "Su gafete solo abre puertas del museo. Seguridad de Boston Common nunca lo escaneó tirando las pilas enormes.",
      culprit_explanation:
        "Pidió prestado un carrito del muelle y apiló basura en Boston Common como broma. Boston Common, Boston Common — los visitantes tuvieron que rodearla.",
    },
    roblox_guest: {
      innocent_explanation:
        "Registros del vestíbulo muestran su salida antes del desastre en Boston Common. Cámaras en Boston Common no lo enlazan con las bolsas grandes.",
      culprit_explanation:
        "Volvió de noche con bolsas de obra y las vació en Boston Common. Boston Common, Boston Common — el pase de invitado era tapadera.",
    },
    baconette_hair: {
      innocent_explanation:
        "Su carrito solo lleva snacks sellados. La basura de Boston Common incluye electrodomésticos rotos que no caben ahí.",
      culprit_explanation:
        "Escondió basura doméstica bajo la funda del carrito y la tiró en Boston Common al reabastecer. Las ratas de Boston Common llegaron antes que el personal.",
    },
    peeley: {
      innocent_explanation:
        "Estaba en el traje de plátano durante el caos en Boston Common. El traje es demasiado grande para cargar esas pilas.",
      culprit_explanation:
        "Se quitó el traje, tomó bolsas del escenario y las esparció en Boston Common para terminar rápido. Boston Common, Boston Common — purpurina del traje delató.",
    },
    agent_67: {
      innocent_explanation:
        "Su metraje prueba que filmaba río arriba, no apilando bolsas en Boston Common. Marcas de tiempo de Boston Common no coinciden con sus tarjetas.",
      culprit_explanation:
        "Usó la furgoneta del equipo para tirar equipo viejo en Boston Common tras un rodaje. Boston Common, Boston Common — maletines del trípode estaban en el montón.",
    },
    roblox_builder: {
      innocent_explanation:
        "Padres vieron su transmisión en vivo desde el salón infantil. No salió a vaciar basura en Boston Common durante el desorden.",
      culprit_explanation:
        "Arrastró mesas rotas y bolsas de aserrín a Boston Common tras un taller. Boston Common, Boston Common — etiquetas LEGO lo delataron.",
    },
    elsa: {
      innocent_explanation:
        "Estaba en el escenario ensayando cuando Boston Common se llenó. El micrófono demuestra que no cargaba bolsas en Boston Common.",
      culprit_explanation:
        "Tiró cajas de utilería y fluido de niebla a Boston Common para despejar la plaza rápido. Purpurina de Boston Common se mezcló con basura de comida.",
    },
    steve: {
      innocent_explanation:
        "Fans lo fotografiaron con la cabeza del disfraz lejos de Boston Common. La cabeza no permite ver bien para tirar tanto en Boston Common.",
      culprit_explanation:
        "Se salió del traje de bloque y tiró basura promocional en Boston Common. Boston Common, Boston Common — guantes de espuma estaban en la pila.",
    },
    spyder_sammy: {
      innocent_explanation:
        "Sus sprays certificados son seguros y registrados. El desorden de Boston Common es basura sólida, no bidones de pesticida.",
      culprit_explanation:
        "Escondió bidones sin permiso bajo basura normal en Boston Common para evitar multas. Boston Common, Boston Common — tapas de manguera rodaron con las bolsas.",
    },
  },
};

const SOUTH: Record<Lang, Record<string, Pair>> = {
  en: {
    bacon_hair: {
      innocent_explanation:
        "Drum video shows a taller worker. He was fixing belts when the South End coal stunt blocked the parade — South End cameras prove it.",
      culprit_explanation:
        "He rolled props and real coal dust onto the South End parade route to fake a mine. South End, South End, South End — permits blew up and the march stopped.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "She was counting receipts when the South End route closed. Her café has no coal gear — the South End barricades came from someone else.",
      culprit_explanation:
        "She rented generators and piled coal bags on the South End line for a viral stunt. South End, South End — parade floats could not pass.",
    },
    tung: {
      innocent_explanation:
        "Plant cameras show him on the repair floor during the South End shutdown. The fake mine permits never had his real signature.",
      culprit_explanation:
        "He forged night forms so trucks could unload coal props on the South End route. South End, South End, South End — the parade map was useless.",
    },
    roblox_noob: {
      innocent_explanation:
        "Museum keys cannot open South End street plates. He was leading a tour inside when the South End coal tent appeared.",
      culprit_explanation:
        "He printed fake South End Coal Adventure tickets and blocked the lane with plywood. South End, South End — kids thought it was a game.",
    },
    roblox_guest: {
      innocent_explanation:
        "His pass clocked out before the South End closure. Phone data shows him across town when the South End mine popped up.",
      culprit_explanation:
        "He posed as a contractor and chained barriers across the South End parade path. South End, South End, South End — coal dust was on his boots.",
    },
    baconette_hair: {
      innocent_explanation:
        "Health inspectors had her cart sealed during the South End incident. She could not unload coal on the South End route.",
      culprit_explanation:
        "She parked the snack cart sideways to hold a spot for a coal photo shoot on the South End line. South End, South End — marchers had nowhere to turn.",
    },
    peeley: {
      innocent_explanation:
        "Costume stuffing clogged no streets. He was taking photos with families away from the South End barricades.",
      culprit_explanation:
        "He ditched the banana suit and helped stack coal bags on the South End route. South End, South End, South End — peel stickers stuck to the tarps.",
    },
    agent_67: {
      innocent_explanation:
        "His lenses were pointed at the river cleanup, not the South End parade grid. Metadata shows no South End coal shots from his kit.",
      culprit_explanation:
        "He lit the fake South End mine for a dramatic reel and left debris in the street. South End, South End — extension cords tripped inspectors.",
    },
    roblox_builder: {
      innocent_explanation:
        "Tool cabinets stayed locked on video. He never signed out lumber big enough to wall off the South End route.",
      culprit_explanation:
        "He let activists borrow kid-workshop plywood to frame a South End coal tunnel. South End, South End, South End — the parade never started.",
    },
    elsa: {
      innocent_explanation:
        "Light-board logs show her cues were downtown, not on the South End coal pile. Fog timers do not match the South End closure.",
      culprit_explanation:
        "She aimed spotlights at coal piles on the South End route for a teaser video. South End, South End — smoke and dust choked the staging lane.",
    },
    steve: {
      innocent_explanation:
        "The mascot suit cannot lift coal pallets. Fan selfies place him blocks away from the South End mine props.",
      culprit_explanation:
        "He changed into coveralls and helped drag coal bags across the South End parade line. South End, South End, South End — square gloves left prints.",
    },
    spyder_sammy: {
      innocent_explanation:
        "His truck was at the depot when the South End route sealed. Permitted sprays do not include coal theater on South End streets.",
      culprit_explanation:
        "He stored unlabeled drums next to coal props on the South End curb to hide them. South End, South End — hazmat crews shut the whole South End leg.",
    },
  },
  es: {
    bacon_hair: {
      innocent_explanation:
        "El vídeo muestra a alguien más alto. Él arreglaba correas cuando el truco del carbón cerró el South End — cámaras del South End lo prueban.",
      culprit_explanation:
        "Rodó utilería y polvo de carbón a la ruta del desfile del South End para fingir una mina. South End, South End, South End — los permisos saltaron y el desfile paró.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "Estaba contando recibos cuando cerraron la ruta del South End. Su café no tiene carbón — las vallas del South End fueron de otro.",
      culprit_explanation:
        "Alquiló generadores y apiló bolsas de carbón en la línea del South End para un viral. South End, South End — las carrozas no pasaron.",
    },
    tung: {
      innocent_explanation:
        "Cámaras de planta lo muestran en reparaciones durante el cierre del South End. Los permisos falsos no tenían su firma real.",
      culprit_explanation:
        "Falsificó formas para que camiones descargaran utilería en la ruta del South End. South End, South End, South End — el mapa del desfile quedó inútil.",
    },
    roblox_noob: {
      innocent_explanation:
        "Las llaves del museo no abren placas del South End. Guiaba un tour adentro cuando apareció la carpa de carbón del South End.",
      culprit_explanation:
        "Imprimió entradas falsas de Aventura Carbón del South End y bloqueó el carril con madera. South End, South End — los niños creyeron que era juego.",
    },
    roblox_guest: {
      innocent_explanation:
        "Su pase marcó salida antes del cierre del South End. Datos del teléfono lo ponen lejos cuando apareció la mina del South End.",
      culprit_explanation:
        "Se hizo pasar por contratista y encadenó vallas en el camino del desfile del South End. South End, South End, South End — polvo en sus botas.",
    },
    baconette_hair: {
      innocent_explanation:
        "Inspectores sellaron su carrito durante el incidente del South End. No pudo descargar carbón en la ruta del South End.",
      culprit_explanation:
        "Estacionó el carrito de lado para un spot de fotos con carbón en la línea del South End. South End, South End — no había giro para los marchistas.",
    },
    peeley: {
      innocent_explanation:
        "El relleno del disfraz no cerró calles. Posaba con familias lejos de las vallas del South End.",
      culprit_explanation:
        "Dejó el traje de plátano y ayudó a apilar carbón en la ruta del South End. South End, South End, South End — pegatinas de plátano en lonas.",
    },
    agent_67: {
      innocent_explanation:
        "Sus lentes apuntaban a limpieza del río, no a la cuadrícula del South End. Metadatos sin tomas de carbón del South End.",
      culprit_explanation:
        "Iluminó la falsa mina del South End para un reel y dejó escombros en la calle. South End, South End — cables enredaron a inspectores.",
    },
    roblox_builder: {
      innocent_explanation:
        "Herramientas cerradas en vídeo. No retiró madera suficiente para cerrar la ruta del South End.",
      culprit_explanation:
        "Dejó tomar madera del taller infantil para enmarcar un túnel de carbón del South End. South End, South End, South End — el desfile no arrancó.",
    },
    elsa: {
      innocent_explanation:
        "Registros de luces la ponen en otro barrio, no en el montón de carbón del South End. Niebla no coincide con el cierre del South End.",
      culprit_explanation:
        "Enfocó reflectores a pilas de carbón en la ruta del South End para un adelanto. South End, South End — humo y polvo ahogaron el carril.",
    },
    steve: {
      innocent_explanation:
        "El traje no levanta palés de carbón. Selfies lo alejan de la utilería del South End.",
      culprit_explanation:
        "Se puso overol y arrastró bolsas por la línea del desfile del South End. South End, South End, South End — guantes cuadrados dejaron marcas.",
    },
    spyder_sammy: {
      innocent_explanation:
        "Su camión estaba en el depósito al sellarse el South End. Sus químicos permitidos no incluyen teatro de carbón en el South End.",
      culprit_explanation:
        "Guardó bidones sin etiqueta junto a utilería en la acera del South End. South End, South End — emergencias cerraron todo el tramo del South End.",
    },
  },
};

const NEWBURY: Record<Lang, Record<string, Pair>> = {
  en: {
    bacon_hair: {
      innocent_explanation:
        "Oil cases are his world, not drywall. Surveillance skips him carrying tiles out of Newbury Street alleys.",
      culprit_explanation:
        "He moonlit hauling renovation tear-out from a Newbury Street boutique and dumped it behind Newbury Street. Newbury Street, Newbury Street — the alley could not pass code.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "Inspectors track her grease only. The Newbury Street pile is lumber and tile that never sat in her café kitchen.",
      culprit_explanation:
        "She paid a sketchy hauler to ditch torn-out counters off Newbury Street. Newbury Street debris blocked deliveries for every Newbury Street neighbor.",
    },
    tung: {
      innocent_explanation:
        "His paperwork stayed on oil trucks, not Newbury Street dumpsters. Cameras show him at the plant during the Newbury Street dump window.",
      culprit_explanation:
        "He signed off a phantom Newbury Street pickup so a buddy could ditch bags in the Newbury Street alley. Newbury Street, Newbury Street — fines landed on the block.",
    },
    roblox_noob: {
      innocent_explanation:
        "Museum policy forbids hauling construction junk. He was scanning tickets when the Newbury Street pile appeared.",
      culprit_explanation:
        "He dragged exhibit crates and broken shelving to a Newbury Street alley after hours. Newbury Street, Newbury Street — map flyers fluttered in the dust.",
    },
    roblox_guest: {
      innocent_explanation:
        "His pass expired before the Newbury Street mess. Ride shares show him away from Newbury Street when debris fell.",
      culprit_explanation:
        "He rented a dolly and rolled drywall out a Newbury Street service door into the alley. Newbury Street, Newbury Street — guest logs caught the door chime.",
    },
    baconette_hair: {
      innocent_explanation:
        "Cart weight limits stopped her from moving tile sheets. Health tags prove she was vending, not demolishing Newbury Street shops.",
      culprit_explanation:
        "She hid contractor bags under napkins and slid them into a Newbury Street alley during restock. Newbury Street, Newbury Street — grout matched her wheel wells.",
    },
    peeley: {
      innocent_explanation:
        "Banana hands were waving at kids, not mixing mortar. The Newbury Street junk pile has no costume foam in the lab photos.",
      culprit_explanation:
        "He changed clothes and helped a friend dump a Newbury Street remodel overnight. Newbury Street, Newbury Street — peel tape marked the drywall.",
    },
    agent_67: {
      innocent_explanation:
        "His shoot schedule was river-side, not Newbury Street back lots. Lenses never pointed down the Newbury Street alley that night.",
      culprit_explanation:
        "He stacked b-roll crates and scrap wood in a Newbury Street alley to clear a set. Newbury Street, Newbury Street — paint chips matched his tripod case.",
    },
    roblox_builder: {
      innocent_explanation:
        "Live stream parents watched him sand tiny bridges all night. No sign he trucked debris to Newbury Street.",
      culprit_explanation:
        "He borrowed the workshop van and unloaded sawdust and broken tables behind Newbury Street. Newbury Street, Newbury Street — kid-safe paint cans rolled out.",
    },
    elsa: {
      innocent_explanation:
        "Her crates list glitter, not two-by-fours. Stagehands swear she never drove a truck down Newbury Street.",
      culprit_explanation:
        "She stashed old stage flats and fog crates in a Newbury Street alley after a pop-up. Newbury Street, Newbury Street — glitter stuck to every tile shard.",
    },
    steve: {
      innocent_explanation:
        "Mascot gloves cannot grip sheetrock. Event security logged him posing on the plaza, not behind Newbury Street.",
      culprit_explanation:
        "He ditched the block head and hauled bags from a Newbury Street pop-up remodel. Newbury Street, Newbury Street — foam dust mixed with insulation.",
    },
    spyder_sammy: {
      innocent_explanation:
        "Permitted chemicals stayed in labeled totes. The Newbury Street pile is construction waste, not spray tanks.",
      culprit_explanation:
        "He hid illegal concentrate jugs under drywall in a Newbury Street alley. Newbury Street, Newbury Street — hazmat taped off the whole Newbury Street block.",
    },
  },
  es: {
    bacon_hair: {
      innocent_explanation:
        "Sus casos son aceite, no yeso. Cámaras no lo muestran sacando azulejos de callejones de Newbury Street.",
      culprit_explanation:
        "Hizo mudanzas nocturnas de demolición desde una boutique de Newbury Street y lo tiró detrás de Newbury Street. Newbury Street, Newbury Street — el callejón no pasó inspección.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "Inspectores rastrean su grasa, no madera. El montón de Newbury Street es losa que nunca estuvo en su cocina.",
      culprit_explanation:
        "Pagó a un transportista dudoso para tirar mostradores viejos fuera de Newbury Street. Escombros de Newbury Street bloquearon entregas en toda la cuadra.",
    },
    tung: {
      innocent_explanation:
        "Su papeleo era de camiones de aceite, no contenedores de Newbury Street. Cámaras lo dejan en planta durante el vertido en Newbury Street.",
      culprit_explanation:
        "Firmó una recogida fantasma en Newbury Street para que un amigo tirara bolsas en el callejón de Newbury Street. Newbury Street, Newbury Street — multas para la manzana.",
    },
    roblox_noob: {
      innocent_explanation:
        "El museo prohíbe llevar escombros. Escaneaba entradas cuando apareció el montón de Newbury Street.",
      culprit_explanation:
        "Arrastró cajas de exposición y estantes rotos a un callejón de Newbury Street. Newbury Street, Newbury Street — volantes del mapa en el polvo.",
    },
    roblox_guest: {
      innocent_explanation:
        "Su pase venció antes del desorden de Newbury Street. Viajes compartidos lo alejan de Newbury Street cuando cayó el escombro.",
      culprit_explanation:
        "Alquiló un carrito y sacó yeso por una puerta de servicio de Newbury Street al callejón. Newbury Street, Newbury Street — registros del pase captaron la puerta.",
    },
    baconette_hair: {
      innocent_explanation:
        "Límites de peso del carrito impiden planchas de azulejo. Etiquetas de salud prueban que vendía, no demolía tiendas de Newbury Street.",
      culprit_explanation:
        "Escondió bolsas de obra bajo servilletas y las deslizó a un callejón de Newbury Street al reabastecer. Newbury Street, Newbury Street — lechada en sus ruedas.",
    },
    peeley: {
      innocent_explanation:
        "Manos de plátano saludaban niños, no mezclaban mortero. El montón de Newbury Street no tiene espuma de disfraz en fotos.",
      culprit_explanation:
        "Se cambió y ayudó a vaciar una remodelación de Newbury Street de madrugada. Newbury Street, Newbury Street — cinta del plátano en el yeso.",
    },
    agent_67: {
      innocent_explanation:
        "Su agenda era el río, no los fondos de Newbury Street. Lentes nunca apuntaron al callejón de Newbury Street esa noche.",
      culprit_explanation:
        "Apiló cajas de metraje y madera en un callejón de Newbury Street para despejar un set. Newbury Street, Newbury Street — pintura en su maletín del trípode.",
    },
    roblox_builder: {
      innocent_explanation:
        "Padres lo vieron lijar puentes mini toda la noche. No hay señal de furgoneta a Newbury Street.",
      culprit_explanation:
        "Tomó la furgoneta del taller y descargó aserrín y mesas rotas detrás de Newbury Street. Newbury Street, Newbury Street — latas de pintura infantil rodaron.",
    },
    elsa: {
      innocent_explanation:
        "Sus cajas listan purpurina, no madera. Utilería jura que no condujo por Newbury Street.",
      culprit_explanation:
        "Escondió viejos flats y cajas de niebla en un callejón de Newbury Street tras un pop-up. Newbury Street, Newbury Street — purpurina en cada trozo de azulejo.",
    },
    steve: {
      innocent_explanation:
        "Guantes de mascota no agarran paneles de yeso. Seguridad lo registró en la plaza, no detrás de Newbury Street.",
      culprit_explanation:
        "Dejó la cabeza cuadrada y cargó bolsas de remodelación pop-up de Newbury Street. Newbury Street, Newbury Street — polvo de espuma con aislamiento.",
    },
    spyder_sammy: {
      innocent_explanation:
        "Químicos permitidos en bidones etiquetados. El montón de Newbury Street es obra, no tanques de spray.",
      culprit_explanation:
        "Escondió bidones ilegales bajo yeso en un callejón de Newbury Street. Newbury Street, Newbury Street — emergencias acordonaron la manzana de Newbury Street.",
    },
  },
};

/** Per-case innocent/culprit reveal copy (Charles River uses `characters.json` + characterEs). */
export const CASE_EXPLANATIONS: Record<
  Exclude<BostonCaseId, "charles_river">,
  Record<Lang, Record<string, Pair>>
> = {
  boston_common: COMMON,
  south_end: SOUTH,
  newbury_street: NEWBURY,
};

export function explanationsForCase(
  c: CharacterJson,
  caseId: BostonCaseId,
  lang: Lang
): Pick<CharacterJson, "innocent_explanation" | "culprit_explanation"> {
  if (caseId === "charles_river") {
    return {
      innocent_explanation: c.innocent_explanation,
      culprit_explanation: c.culprit_explanation,
    };
  }
  const pack = CASE_EXPLANATIONS[caseId][lang][c.uid];
  if (pack) return pack;
  return {
    innocent_explanation: c.innocent_explanation,
    culprit_explanation: c.culprit_explanation,
  };
}
