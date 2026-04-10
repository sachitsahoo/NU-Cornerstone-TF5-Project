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
        "Arrastró forros de bidones llenos de basura a Boston Common, Boston Common, Boston Common — demasiado flojo para usar un basurero de verdad.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "Su basura del café son vasos y restos. Los montones en Boston Common tienen bolsas de obra y muebles rotos que no salieron de su local.",
      culprit_explanation:
        "Llevó equipo de cocina viejo y trampas de grasa a Boston Common al cerrar. Boston Common, Boston Common — creyó que la oscuridad lo escondería.",
    },
    tung: {
      innocent_explanation:
        "El registro del turno nocturno lo pone en la fábrica durante el vertido en Boston Common. Las bolsas en Boston Common no tienen sus sellos.",
      culprit_explanation:
        "Transportó basura industrial en una furgoneta y la vació en Boston Common para evitar tarifas. Boston Common pagó el precio.",
    },
    roblox_noob: {
      innocent_explanation:
        "Su tarjeta solo abre puertas del museo. Seguridad de Boston Common nunca lo registró tirando las pilas enormes.",
      culprit_explanation:
        "Pidió prestado un carrito del muelle y apiló basura en Boston Common como broma. Boston Common, Boston Common — los visitantes tuvieron que rodearla.",
    },
    roblox_guest: {
      innocent_explanation:
        "Registros del vestíbulo muestran su salida antes del desastre en Boston Common. Cámaras en Boston Common no lo enlazan con las bolsas grandes.",
      culprit_explanation:
        "Volvió de noche con bolsas de obra y las vació en Boston Common. Boston Common, Boston Common — el pase de invitado era una excusa.",
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
        "Su video prueba que filmaba río arriba, no apilando bolsas en Boston Common. Las marcas de tiempo de Boston Common no cuadran con sus tarjetas de memoria.",
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
        "Su camión estaba en el patio cuando se cerró el South End. Sus químicos permitidos no incluyen trucos de carbón en el South End.",
      culprit_explanation:
        "Guardó bidones sin etiqueta junto a utilería en la acera del South End. South End, South End — emergencias cerraron todo el tramo del South End.",
    },
  },
};

const REVERE_BEACH: Record<Lang, Record<string, Pair>> = {
  en: {
    bacon_hair: {
      innocent_explanation:
        "His shift logs keep him at the plant when bags slid into the surf. Sand on his boots that night matches the factory yard, not Revere Beach wrack line.",
      culprit_explanation:
        "He hauled plant trash to Revere Beach and shoved bags into the water to skip fees. Revere Beach, Revere Beach — plastic from his route washed back for everyone to see.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "Health inspectors had her grease logs clean. The trash in the water at Revere Beach is contractor plastic and strapping, not café service waste.",
      culprit_explanation:
        "She rolled used oil jugs and broken crates to Revere Beach after closing and kicked them into the tide. Revere Beach swimmers found her cup sleeves the next morning.",
    },
    tung: {
      innocent_explanation:
        "Night cameras place him on the repair floor during the tide change. His signed haul forms never list Revere Beach as an approved dump site.",
      culprit_explanation:
        "He falsified a beach ‘maintenance’ ticket so a truck could empty junk straight into the water at Revere Beach. Revere Beach, Revere Beach — the city closed a swim flag because of it.",
    },
    roblox_noob: {
      innocent_explanation:
        "Badge scans keep him inside the museum for gallery night. No loading-dock camera shows him dragging bags toward Revere Beach.",
      culprit_explanation:
        "He borrowed a cart, stacked trash from events, and dumped it over the seawall at Revere Beach. Revere Beach map flyers floated out with the garbage.",
    },
    roblox_guest: {
      innocent_explanation:
        "His pass logged out before the trash bloom in the shallows. Phone data puts him on a train away from Revere Beach at high tide.",
      culprit_explanation:
        "He came back after hours with black bags and rolled them into the surf at Revere Beach. Revere Beach, Revere Beach — Wonderland gate timestamps caught him walking toward the sand.",
    },
    baconette_hair: {
      innocent_explanation:
        "Vendor rules cap her cart weight; she could not drag the heavy bags found floating. Wrapper brands in the water are bulk industrial, not her snack line.",
      culprit_explanation:
        "She hid personal trash and broken stock under the cart cover and tipped it into Revere Beach at low tide. Revere Beach gulls tore the bags open before dawn.",
    },
    peeley: {
      innocent_explanation:
        "He was in the banana suit for a donor photo line; the suit cannot wade deep enough to push those bags offshore.",
      culprit_explanation:
        "He peeled off the suit, grabbed event trash, and walked it into the water at Revere Beach. Revere Beach, Revere Beach — peel stickers stuck to a wet contractor sack.",
    },
    agent_67: {
      innocent_explanation:
        "His contract was city B-roll uptown; metadata shows no tripod time on Revere Beach sand during the dump.",
      culprit_explanation:
        "He filmed the tide pulling trash out for a ‘shock reel’ and helped shove a last bag in for the shot. Revere Beach, Revere Beach — salt ruined his lens but not his uploads.",
    },
    roblox_builder: {
      innocent_explanation:
        "Stream chat timestamps show him gluing kid projects all evening. Workshop inventory never left the museum cage for Revere Beach.",
      culprit_explanation:
        "He drove scrap builds and sawdust bags to Revere Beach in a borrowed van labeled ‘cleanup.’ Revere Beach foam lines turned brown where he emptied the bins into the ocean.",
    },
    elsa: {
      innocent_explanation:
        "She was on headset for a downtown light cue; fog trucks never rolled to Revere Beach that night.",
      culprit_explanation:
        "She ditched prop crates and fog bottles into the surf at Revere Beach to clear the truck fast. Revere Beach glitter and confetti clumped with plastic in the wrack line.",
    },
    steve: {
      innocent_explanation:
        "Convention security has him in the block head for a midnight meet; foam gloves never soaked long enough to match the soaked trash bags.",
      culprit_explanation:
        "He slipped out of the mascot suit, hauled contractor bags, and waded them into Revere Beach. Revere Beach, Revere Beach — grit from the gloves matched sand on the torn plastic.",
    },
    spyder_sammy: {
      innocent_explanation:
        "Permitted sprays on his truck do not match the oily film on the floating bags. GPS has his rig at the depot during the Revere Beach dump window.",
      culprit_explanation:
        "He hid unlabeled jugs inside trash bags and rolled the lot into Revere Beach to dodge hazmat fees. Revere Beach, Revere Beach — a hazmat boom went up after kids found the drums in the foam.",
    },
  },
  es: {
    bacon_hair: {
      innocent_explanation:
        "El registro de turno lo pone en la fábrica cuando bolsas entraron al mar. Arena en botas coincide con el patio de la fábrica, no con la orilla de Revere Beach.",
      culprit_explanation:
        "Llevó basura de planta a Revere Beach y empujó bolsas al agua para evitar tasas. Revere Beach, Revere Beach — plástico de su ruta volvió a la orilla para que todos lo vieran.",
    },
    ballerina_cappuccina: {
      innocent_explanation:
        "Inspectores de salud tienen sus registros de grasa limpios. La basura en el agua en Revere Beach es plástico de obra, no residuos de café.",
      culprit_explanation:
        "Rodó bidones de aceite usados y cajas rotas a Revere Beach al cerrar y los empujó con la marea. Nadadores de Revere Beach hallaron sus fundas de vaso al alba.",
    },
    tung: {
      innocent_explanation:
        "Cámaras nocturnas lo ponen en reparaciones en el cambio de marea. Sus formas firmadas nunca listan Revere Beach como vertedero autorizado.",
      culprit_explanation:
        "Falsificó un vale de ‘mantenimiento’ en playa para vaciar un camión al agua en Revere Beach. Revere Beach, Revere Beach — la ciudad bajó bandera de baño por eso.",
    },
    roblox_noob: {
      innocent_explanation:
        "La tarjeta lo mantiene dentro del museo en noche de galería. Ninguna cámara del muelle lo muestra arrastrando bolsas hacia Revere Beach.",
      culprit_explanation:
        "Pidió prestado un carrito, apiló basura de eventos y la tiró por el muro al mar en Revere Beach. Volantes del mapa del museo flotaron con la basura.",
    },
    roblox_guest: {
      innocent_explanation:
        "Su pase registró salida antes de la mancha de basura en lo poco profundo. Su celular lo ubica en el tren, lejos de Revere Beach, cuando subió la marea.",
      culprit_explanation:
        "Volvió de noche con bolsas negras y las rodó al agua en Revere Beach. Revere Beach, Revere Beach — el registro de entrada en Wonderland lo muestra yendo hacia la arena.",
    },
    baconette_hair: {
      innocent_explanation:
        "Normas del carrito limitan peso; no pudo arrastrar las bolsas pesadas flotantes. Marcas en el agua son industriales, no su línea de snacks.",
      culprit_explanation:
        "Escondió basura personal y stock roto bajo la funda y lo volcó en Revere Beach en marea baja. Gaviotas de Revere Beach rompieron las bolsas antes del alba.",
    },
    peeley: {
      innocent_explanation:
        "Estaba en traje de plátano para fotos con donantes; el traje no puede vadear lo bastante para empujar esas bolsas mar adentro.",
      culprit_explanation:
        "Se quitó el traje, tomó basura del evento y la metió al agua en Revere Beach. Revere Beach, Revere Beach — pegatinas de plátano pegadas a saco mojado de obra.",
    },
    agent_67: {
      innocent_explanation:
        "Su contrato era video para la ciudad; los metadatos no muestran trípode en la arena de Revere Beach durante el vertido.",
      culprit_explanation:
        "Filmó la marea sacando basura para un reel de ‘impacto’ y empujó una bolsa más para la toma. Revere Beach, Revere Beach — sal arruinó el lente pero no sus subidas.",
    },
    roblox_builder: {
      innocent_explanation:
        "Chat del stream lo deja pegando proyectos infantiles toda la noche. Inventario del taller nunca salió de la jaula del museo hacia Revere Beach.",
      culprit_explanation:
        "Llevó restos de armados y bolsas de aserrín a Revere Beach en furgoneta prestada de ‘limpieza.’ Espuma de Revere Beach se oscureció donde vació cubos al océano.",
    },
    elsa: {
      innocent_explanation:
        "Estaba con auricular para luces en el centro; camiones de niebla no fueron a Revere Beach esa noche.",
      culprit_explanation:
        "Tiró cajas de utilería y botellas de niebla al mar en Revere Beach para vaciar el camión rápido. Purpurina y confeti de Revere Beach se juntaron con plástico en la línea de algas.",
    },
    steve: {
      innocent_explanation:
        "Seguridad del evento lo tiene con cabeza de bloque en meet de medianoche; guantes de espuma no se empaparon lo bastante para coincidir con bolsas mojadas.",
      culprit_explanation:
        "Salió del traje, cargó bolsas de obra y las metió al agua en Revere Beach. Revere Beach, Revere Beach — arena de los guantes coincidió con plástico rasgado.",
    },
    spyder_sammy: {
      innocent_explanation:
        "Sus fumigaciones permitidas no coinciden con la película aceitosa en las bolsas flotantes. GPS pone su camión en el patio durante el vertido en Revere Beach.",
      culprit_explanation:
        "Escondió bidones sin etiqueta dentro de bolsas y los rodó al agua en Revere Beach para evitar pagar el manejo de materiales peligrosos. Revere Beach, Revere Beach — los de emergencias acordonaron todo cuando niños hallaron bidones en la espuma.",
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
  revere_beach: REVERE_BEACH,
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
