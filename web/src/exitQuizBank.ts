import type { BostonCaseId } from "./bostonCaseIds";
import type { Lang } from "./lang";

type ExitQuizItem = {
  question: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  feedbackCorrectBlurb: string;
  feedbackIncorrectBlurb: string;
};

/** Exactly 10 easy MCQs per scene and language (post–fun-facts exit quiz). */
export const EXIT_QUIZ_BY_CASE: Record<
  BostonCaseId,
  Record<Lang, ExitQuizItem[]>
> = {
  charles_river: {
    en: [
      {
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
      {
        question:
          "You see trash blowing toward the Charles River. What is the best first step?",
        choices: [
          "Leave it for the wind",
          "Pick it up or use a nearby bin",
          "Push it in the water",
          "Bury it in the sand",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Yes—small bits of litter add up and wash into the river.",
        feedbackIncorrectBlurb:
          "Litter often ends up in the water. Bins and carry-out help keep the river clean.",
      },
      {
        question: "Why do fish and frogs need clean river water?",
        choices: [
          "They don't care about water",
          "Dirty water can make them sick or harm their homes",
          "They only drink soda",
          "Rivers are only for boats",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Exactly—pollution hurts the animals that live in and near the river.",
        feedbackIncorrectBlurb:
          "Wildlife depends on clean water. Pollution can poison food and shelter.",
      },
      {
        question:
          "If someone pours soapy wash water into a storm drain, where can it often go?",
        choices: [
          "Nowhere—it disappears",
          "Toward local streams or the river without being cleaned",
          "Straight to a drinking fountain",
          "Into a swimming pool filter",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Storm drains usually skip the sewage plant, so only rain belongs there.",
        feedbackIncorrectBlurb:
          "Many storm drains lead outdoors. Soaps and grime can still harm waterways.",
      },
      {
        question: "What is a simple way families can help the Charles River?",
        choices: [
          "Pour old paint outside",
          "Join a cleanup, recycle, and use trash cans",
          "Ignore signs by the water",
          "Leave picnics messy",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Community care and proper trash make a huge difference.",
        feedbackIncorrectBlurb:
          "Small habits—bins, recycling, cleanups—protect the river for everyone.",
      },
      {
        question:
          "Why is planting bushes or grass near a riverbank helpful?",
        choices: [
          "It blocks all rain",
          "Plant roots and soil can filter runoff before it reaches the water",
          "It makes fishing illegal",
          "It heats the river",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Natural plants slow and clean runoff—a buffer for the river.",
        feedbackIncorrectBlurb:
          "Vegetation along banks helps trap dirt and pollutants.",
      },
      {
        question: "Who can you tell if you see someone dumping into the river?",
        choices: [
          "No one—it is private",
          "A trusted adult, park staff, or local hotline",
          "Only your pet",
          "Wait ten years",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Reporting helps crews stop spills before they spread.",
        feedbackIncorrectBlurb:
          "Quick reports protect people and wildlife—tell a grown-up or official contact.",
      },
      {
        question: "Used motor oil from a car should go…",
        choices: [
          "Down the kitchen sink",
          "To a recycling center or auto shop drop-off",
          "On the lawn",
          "Into any open drain",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Recycling oil keeps it out of rivers and groundwater.",
        feedbackIncorrectBlurb:
          "Oil is toxic—take it to a proper facility, never a drain.",
      },
      {
        question:
          "When walking a dog near the river, what should you do with the waste?",
        choices: [
          "Leave it on the path",
          "Bag it and place it in a trash can",
          "Toss it in the river",
          "Hide it under leaves",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Pet waste carries bacteria that pollutes water—bins keep swimmers safe.",
        feedbackIncorrectBlurb:
          "Rain washes waste into the river. Always bag and trash it.",
      },
      {
        question: "Clean rivers are important for Boston because they…",
        choices: [
          "Are useless to people",
          "Support wildlife, recreation, and community health",
          "Should be filled with trash",
          "Only matter in winter",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Healthy rivers help everyone—parks, paddling, and nature.",
        feedbackIncorrectBlurb:
          "Rivers are shared resources for fun, nature, and clean water.",
      },
    ],
    es: [
      {
        question:
          "Muchos desagües van directo al río. ¿Qué no debes tirar ahí?",
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
      {
        question:
          "Ves basura volando hacia el río Charles. ¿Qué haces primero?",
        choices: [
          "Dejarla al viento",
          "Recogerla o usar un basurero cercano",
          "Empujarla al agua",
          "Enterrarla en la arena",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Sí—la basura pequeña se acumula y llega al río.",
        feedbackIncorrectBlurb:
          "La basura suele llegar al agua. Usa basureros o llévate lo que traes.",
      },
      {
        question: "¿Por qué peces y ranas necesitan agua limpia?",
        choices: [
          "No les importa el agua",
          "El agua sucia puede enfermarlos o dañar su hogar",
          "Solo beben refresco",
          "El río es solo para barcos",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Exacto—la contaminación daña a los animales del río.",
        feedbackIncorrectBlurb:
          "La vida silvestre depende de agua limpia.",
      },
      {
        question:
          "Si alguien tira agua jabonosa en un desagüe de la calle, ¿adónde va?",
        choices: [
          "A ningún lado",
          "A arroyos o al río sin limpiarse",
          "A una fuente de agua potable",
          "A una piscina",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Los desagües no limpian el agua. Solo la lluvia debe ir ahí.",
        feedbackIncorrectBlurb:
          "Muchos desagües van directo al exterior. El jabón y la suciedad también dañan el río.",
      },
      {
        question: "¿Cómo puede ayudar una familia al río Charles?",
        choices: [
          "Verter pintura vieja afuera",
          "Participar en limpiezas, reciclar y usar basureros",
          "Ignorar las señales",
          "Dejar basura de picnic",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "El cuidado comunitario y la basura bien colocada ayudan mucho.",
        feedbackIncorrectBlurb:
          "Hábitos pequeños protegen el río para todos.",
      },
      {
        question:
          "¿Por qué ayuda plantar arbustos o pasto cerca de la orilla?",
        choices: [
          "Bloquea toda la lluvia",
          "Las raíces y el suelo filtran el agua antes del río",
          "Prohíbe pescar",
          "Calienta el río",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Las plantas frenan y limpian el agua antes de que llegue al río.",
        feedbackIncorrectBlurb:
          "La vegetación atrapa tierra y contaminantes.",
      },
      {
        question:
          "Si ves a alguien vertiendo al río, ¿a quién se lo cuentas?",
        choices: [
          "A nadie",
          "A un adulto de confianza, personal del parque o línea local",
          "Solo a tu mascota",
          "Esperar años",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Avisar ayuda a detener derrames a tiempo.",
        feedbackIncorrectBlurb:
          "Los avisos rápidos protegen a personas y animales.",
      },
      {
        question: "El aceite usado del coche debe ir…",
        choices: [
          "Al fregadero",
          "A reciclaje o taller autorizado",
          "Al césped",
          "A cualquier desagüe",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Reciclar aceite lo mantiene fuera del río.",
        feedbackIncorrectBlurb:
          "El aceite es tóxico: llévalo a un sitio adecuado.",
      },
      {
        question:
          "Paseas un perro cerca del río. ¿Qué haces con el popó del perro?",
        choices: [
          "Dejarlas en el sendero",
          "En bolsa y al basurero",
          "Tirarlas al río",
          "Esconderlas",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "El popó del perro lleva gérmenes al agua. Siempre usa bolsa y basurero.",
        feedbackIncorrectBlurb:
          "La lluvia arrastra el popó al río. Siempre bolsa y basurero.",
      },
      {
        question: "Los ríos limpios importan en Boston porque…",
        choices: [
          "No sirven para nada",
          "Apoyan vida silvestre, recreación y salud",
          "Deben llenarse de basura",
          "Solo importan en invierno",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Los ríos sanos benefician a todos.",
        feedbackIncorrectBlurb:
          "Son recursos compartidos para diversión y naturaleza.",
      },
    ],
  },
  boston_common: {
    en: [
      {
        question: "You finish a snack on the grass at Boston Common. Where should the wrapper go?",
        choices: [
          "Drop it on the lawn",
          "In a park trash or recycling bin",
          "Hide it under a bench",
          "Leave it for birds",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Bins keep the shared park tidy for the next visitor.",
        feedbackIncorrectBlurb:
          "Loose trash blows around and invites pests—use a bin.",
      },
      {
        question: "Why does leftover food in the park cause problems?",
        choices: [
          "It disappears overnight",
          "It can attract rats and harm the grass",
          "It helps trees grow faster",
          "It is required by law",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Food scraps draw rodents and damage the lawn everyone shares.",
        feedbackIncorrectBlurb:
          "Parks stay healthier when food waste goes in sealed trash.",
      },
      {
        question: "Big bags of household trash belong…",
        choices: [
          "Next to a park bench",
          "At home curbside pickup or a city drop-off",
          "Spread along a path",
          "In the duck pond",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Parks are for day visits, not bulk dumping—use city services.",
        feedbackIncorrectBlurb:
          "Park bins are for small litter; big loads need proper disposal.",
      },
      {
        question: "What does “carry in, carry out” mean for a picnic?",
        choices: [
          "Buy more plastic",
          "Take your trash home if bins are full",
          "Leave everything behind",
          "Burn trash on the grass",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "If cans overflow, packing trash out protects the Common.",
        feedbackIncorrectBlurb:
          "Overflow bins still need your help—take extras home.",
      },
      {
        question: "Broken glass on a path is dangerous because…",
        choices: [
          "It is soft",
          "People, dogs, and workers can get cut",
          "It melts instantly",
          "It is invisible",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Report or carefully dispose of glass so paths stay safe.",
        feedbackIncorrectBlurb:
          "Sharp litter hurts feet and paws—never leave it on walkways.",
      },
      {
        question: "How can you keep the lawn healthy for sports and lounging?",
        choices: [
          "Drive on the grass",
          "Stay on paths when asked and avoid dragging heavy junk across turf",
          "Pour drinks on the roots",
          "Dig large holes for fun",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Treating turf gently keeps the park green for everyone.",
        feedbackIncorrectBlurb:
          "Heavy gear and careless dumping tear up shared green space.",
      },
      {
        question: "After a birthday party with balloons in the park, you should…",
        choices: [
          "Release them to the sky",
          "Pop them and place pieces in the trash",
          "Tie them to trees forever",
          "Bury them shallowly",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Balloon scraps become litter—trash keeps wildlife safe.",
        feedbackIncorrectBlurb:
          "Loose balloon pieces blow away and harm animals.",
      },
      {
        question: "Dog walks on the Common mean you should…",
        choices: [
          "Ignore waste",
          "Bag pet waste and use a trash can",
          "Kick it into bushes",
          "Hope rain cleans it",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Bagged waste keeps bacteria off shoes, grass, and play areas.",
        feedbackIncorrectBlurb:
          "Pet waste spreads germs—always bag and bin it.",
      },
      {
        question: "Boston Common is important because it is…",
        choices: [
          "Private property for one person",
          "A shared green space for the whole city",
          "Only for cars",
          "Closed every weekend",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Everyone deserves a clean, welcoming park.",
        feedbackIncorrectBlurb:
          "Public parks rely on every visitor to leave them nice.",
      },
      {
        question: "If trash cans are overflowing, a helpful action is…",
        choices: [
          "Stack trash on top so it falls",
          "Tell park staff or carry trash to another bin",
          "Light a small fire",
          "Shove trash into a fountain",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Letting crews know—or moving trash—prevents messes.",
        feedbackIncorrectBlurb:
          "Overflow needs adults or another bin, not more dumping.",
      },
    ],
    es: [
      {
        question:
          "Terminas un snack en el césped de Boston Common. ¿Dónde va el envoltorio?",
        choices: [
          "Tirarlo al césped",
          "A un basurero o reciclaje del parque",
          "Esconderlo bajo un banco",
          "Dejarlo para los pájaros",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Los basureros mantienen el parque limpio para todos.",
        feedbackIncorrectBlurb:
          "La basura suelta vuela y atrae plagas—usa el basurero.",
      },
      {
        question: "¿Por qué la comida sobrante en el parque causa problemas?",
        choices: [
          "Desaparece sola",
          "Puede atraer ratas y dañar el césped",
          "Hace crecer los árboles al instante",
          "Es obligatorio dejarla",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Los restos atraen roedores y estropean el pasto compartido.",
        feedbackIncorrectBlurb:
          "El parque está mejor si la comida va a basura cerrada.",
      },
      {
        question: "Las bolsas grandes de basura de casa van…",
        choices: [
          "Junto a un banco",
          "A recogida en casa o punto autorizado de la ciudad",
          "Por el sendero",
          "Al estanque de patos",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "El parque no es vertedero: usa servicios urbanos.",
        feedbackIncorrectBlurb:
          "Los basureros del parque son para poca basura.",
      },
      {
        question: "“Traes, te llevas” en un picnic significa…",
        choices: [
          "Comprar más plástico",
          "Llevarte la basura si los botes están llenos",
          "Dejar todo",
          "Quemar basura en el césped",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Si hay mucha basura, llevarla protege el Common.",
        feedbackIncorrectBlurb:
          "Aunque los botes llenen, puedes llevarte lo extra.",
      },
      {
        question: "El vidrio roto en un camino es peligroso porque…",
        choices: [
          "Es suave",
          "Personas, perros y trabajadores pueden cortarse",
          "Se derrite",
          "Es invisible",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Avisa o desecha con cuidado para senderos seguros.",
        feedbackIncorrectBlurb:
          "Basura filosa lastima—no la dejes en el camino.",
      },
      {
        question: "¿Cómo cuidas el césped para jugar y descansar?",
        choices: [
          "Conducir sobre el pasto",
          "Usar senderos cuando toque y no arrastrar cosas pesadas",
          "Verter bebidas en las raíces",
          "Cavar hoyos grandes",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Tratar el césped con cuidado lo mantiene verde.",
        feedbackIncorrectBlurb:
          "Objetos pesados y basura destrozan el espacio verde.",
      },
      {
        question: "Después de una fiesta con globos en el parque debes…",
        choices: [
          "Soltarlos al cielo",
          "Reventarlos y meter pedazos al basurero",
          "Atarlos al árbol para siempre",
          "Enterrarlos poco profundo",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Los pedazos son basura—el basurero protege animales.",
        feedbackIncorrectBlurb:
          "Los globos sueltos vuelan y dañan la vida silvestre.",
      },
      {
        question: "Pasear un perro en el Common implica…",
        choices: [
          "Ignorar el popó del perro",
          "Bolsa y basurero",
          "Patearlo a los arbustos",
          "Que la lluvia lo limpie",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "En bolsa evitas gérmenes en el césped y zonas de juego.",
        feedbackIncorrectBlurb:
          "El popó del perro contagia gérmenes—siempre bolsa y basurero.",
      },
      {
        question: "Boston Common importa porque es…",
        choices: [
          "De una sola persona",
          "Espacio verde compartido de la ciudad",
          "Solo para coches",
          "Cerrado cada fin de semana",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Todos merecen un parque limpio y acogedor.",
        feedbackIncorrectBlurb:
          "Los parques públicos dependen de cada visitante.",
      },
      {
        question: "Si los botes rebosan, lo útil es…",
        choices: [
          "Apilar basura para que caiga",
          "Avisar al personal o usar otro bote",
          "Prender fuego",
          "Meter basura en una fuente",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Avisar o mover la basura evita desorden.",
        feedbackIncorrectBlurb:
          "El desbordamiento necesita ayuda adulta u otro bote.",
      },
    ],
  },
  south_end: {
    en: [
      {
        question: "Digging up a city street for mining usually requires…",
        choices: [
          "No permission",
          "Permits, safety plans, and community notice",
          "Only a shovel",
          "Doing it at night only",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Legal work follows rules that protect roads and neighbors.",
        feedbackIncorrectBlurb:
          "Secret digging skips safety steps and damages infrastructure.",
      },
      {
        question: "Illegal mining in a neighborhood can…",
        choices: [
          "Make streets smoother automatically",
          "Tear up pavement, pipes, and sidewalks",
          "Improve parade floats",
          "Lower dust forever",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Unapproved digging breaks utilities people rely on daily.",
        feedbackIncorrectBlurb:
          "Hidden mines harm roads and can cut services.",
      },
      {
        question: "Lots of dust from illegal digging is risky because…",
        choices: [
          "Dust is always healthy",
          "It can hurt breathing and coat homes and cars",
          "It only affects fish",
          "It disappears in seconds",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Dust and debris stress lungs and dirty the community.",
        feedbackIncorrectBlurb:
          "Airborne grit from digging affects people nearby.",
      },
      {
        question: "Parades and festivals need streets that are…",
        choices: [
          "Full of surprise holes",
          "Stable, inspected, and safe for crowds",
          "Closed forever",
          "Made of loose gravel only",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Safe routes keep marchers and viewers protected.",
        feedbackIncorrectBlurb:
          "Damaged roads threaten events and emergency vehicles.",
      },
      {
        question: "If you see unknown heavy equipment tearing a street without signage, you should…",
        choices: [
          "Ignore it",
          "Tell a trusted adult or city contact",
          "Join the crew without a hard hat",
          "Start digging your own hole",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Reporting helps officials check for legal permits.",
        feedbackIncorrectBlurb:
          "Adults and city workers can investigate unsafe digging.",
      },
      {
        question: "Legal construction sites usually have…",
        choices: [
          "No fences or signs",
          "Fencing, signage, and posted contacts",
          "Only music",
          "Hidden entrances only",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Visible safety gear shows the project is monitored.",
        feedbackIncorrectBlurb:
          "Permitted jobs warn pedestrians and protect the area.",
      },
      {
        question: "Broken water pipes under a street can happen when…",
        choices: [
          "People recycle cans",
          "Unauthorized digging hits buried utilities",
          "Birds sing loudly",
          "Kids draw with chalk",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Careless excavation can flood streets and cut service.",
        feedbackIncorrectBlurb:
          "Utilities sit underground—only trained crews should dig.",
      },
      {
        question: "Why do neighbors care about illegal mining downtown?",
        choices: [
          "It never affects anyone",
          "Noise, traffic, and damage disrupt daily life",
          "It always lowers taxes",
          "It guarantees free parking",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Neighborhoods need calm streets and reliable services.",
        feedbackIncorrectBlurb:
          "Secret projects stress residents and businesses.",
      },
      {
        question: "City crews repair streets best when…",
        choices: [
          "Residents hide damage",
          "Problems are reported with clear locations",
          "Streets are mined secretly",
          "Nobody uses sidewalks",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Good reports help teams fix hazards quickly.",
        feedbackIncorrectBlurb:
          "City maintenance depends on people speaking up.",
      },
      {
        question: "Protecting Boston streets helps…",
        choices: [
          "Only one block",
          "Buses, bikes, walkers, and emergency vehicles citywide",
          "Nobody",
          "Only underground fish",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Shared roads keep the whole city moving safely.",
        feedbackIncorrectBlurb:
          "Everyone uses public routes—damage ripples outward.",
      },
    ],
    es: [
      {
        question: "Cavar una calle de la ciudad para minar normalmente requiere…",
        choices: [
          "Ningún permiso",
          "Permisos, planes de seguridad y aviso a la comunidad",
          "Solo una pala",
          "Hacerlo solo de noche",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "El trabajo legal sigue reglas que protegen calles y vecinos.",
        feedbackIncorrectBlurb:
          "Cavar en secreto salta medidas de seguridad.",
      },
      {
        question: "La minería ilegal en un barrio puede…",
        choices: [
          "Alisar calles sola",
          "Romper pavimento, tuberías y aceras",
          "Mejorar carrozas de desfile",
          "Eliminar polvo para siempre",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Cavar sin permiso daña lo que todos usan cada día.",
        feedbackIncorrectBlurb:
          "Las minas clandestinas perjudican vías y servicios.",
      },
      {
        question: "Mucho polvo por excavación ilegal es riesgoso porque…",
        choices: [
          "El polvo siempre es saludable",
          "Puede dañar la respiración y ensuciar casas",
          "Solo afecta a peces",
          "Desaparece en segundos",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Polvo y escombros afectan pulmones y el vecindario.",
        feedbackIncorrectBlurb:
          "La suciedad en el aire perjudica a quienes viven cerca.",
      },
      {
        question: "Desfiles y festivales necesitan calles…",
        choices: [
          "Llenas de hoyos sorpresa",
          "Estables, revisadas y seguras para multitudes",
          "Cerradas para siempre",
          "Solo de grava suelta",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Rutas seguras protegen a participantes y público.",
        feedbackIncorrectBlurb:
          "Calles dañadas arriesgan eventos y emergencias.",
      },
      {
        question:
          "Si ves maquinaria pesada rompiendo una calle sin carteles, debes…",
        choices: [
          "Ignorarlo",
          "Decírselo a un adulto o contacto municipal",
          "Unirte sin casco",
          "Cavar tú también",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Avisar ayuda a revisar permisos.",
        feedbackIncorrectBlurb:
          "Adultos y la ciudad pueden investigar excavaciones inseguras.",
      },
      {
        question: "Las obras legales suelen tener…",
        choices: [
          "Ni vallas ni carteles",
          "Vallas, señales y contactos visibles",
          "Solo música",
          "Entradas ocultas",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "La seguridad visible indica proyecto supervisado.",
        feedbackIncorrectBlurb:
          "Las obras con permiso avisan a peatones.",
      },
      {
        question: "Las tuberías de agua bajo la calle pueden romperse si…",
        choices: [
          "La gente recicla latas",
          "Excavan sin permiso y golpean servicios",
          "Cantan pájaros",
          "Niños dibujan con tiza",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Cavar mal puede inundar o cortar servicio.",
        feedbackIncorrectBlurb:
          "Los servicios están bajo tierra—cavan solo equipos capacitados.",
      },
      {
        question: "¿Por qué importa la minería ilegal al vecindario?",
        choices: [
          "Nunca afecta a nadie",
          "Ruido, tráfico y daños alteran la vida diaria",
          "Siempre baja impuestos",
          "Garantiza estacionamiento gratis",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Los vecinos necesitan calles tranquilas y servicios fiables.",
        feedbackIncorrectBlurb:
          "Proyectos ocultos estresan a residentes y comercios.",
      },
      {
        question: "Las cuadrillas arreglan mejor cuando…",
        choices: [
          "Se esconde el daño",
          "Se reporta con ubicación clara",
          "Se mina en secreto",
          "Nadie usa aceras",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Buenos reportes aceleran las reparaciones.",
        feedbackIncorrectBlurb:
          "El mantenimiento depende de avisar.",
      },
      {
        question: "Proteger las calles de Boston ayuda a…",
        choices: [
          "Solo una cuadra",
          "Autobuses, bicis, peatones y emergencias en toda la ciudad",
          "A nadie",
          "Solo peces subterráneos",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Las vías compartidas mueven la ciudad con seguridad.",
        feedbackIncorrectBlurb:
          "Todos usan las calles—el daño se propaga.",
      },
    ],
  },
  revere_beach: {
    en: [
      {
        question: "At Revere Beach, where should snack wrappers go?",
        choices: [
          "Into the waves",
          "Into beach trash or recycling bins",
          "Buried in the sand",
          "Left on the towel",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Bins keep plastic off the shore and out of the ocean.",
        feedbackIncorrectBlurb:
          "Wind and tide carry loose trash straight into the water.",
      },
      {
        question: "Why is plastic in the ocean a problem?",
        choices: [
          "Fish enjoy eating all plastics",
          "Animals can choke or get tangled, and plastic breaks into tiny bits",
          "Plastic melts instantly",
          "It only affects deserts",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Marine life mistakes trash for food—keeping beaches clean helps them.",
        feedbackIncorrectBlurb:
          "Plastic persists for years and harms wildlife.",
      },
      {
        question: "The rising tide can…",
        choices: [
          "Erase litter magically",
          "Pull loose trash from the sand into the water",
          "Shrink plastic",
          "Stop all waves",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "What you leave on the sand often washes out with the tide.",
        feedbackIncorrectBlurb:
          "Tides move debris—pack out what you pack in.",
      },
      {
        question: "After a beach picnic, you should…",
        choices: [
          "Leave trays for seagulls",
          "Seal leftovers and carry all trash to a bin",
          "Toss bones in the surf",
          "Hide cups under castles",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Food scraps still become litter—use proper disposal.",
        feedbackIncorrectBlurb:
          "Seagulls spread loose food and trash across the beach.",
      },
      {
        question: "Old fishing line on the sand should be…",
        choices: [
          "Thrown in the water",
          "Cut up and placed in trash so wildlife cannot tangle",
          "Left as decoration",
          "Burned on the spot",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Line injures birds and seals—trash it responsibly.",
        feedbackIncorrectBlurb:
          "Monofilament hurts animals; bin it instead.",
      },
      {
        question: "Swimmers stay safer when the water is…",
        choices: [
          "Full of floating trash",
          "Clean, with litter removed from the shallows",
          "Oily and murky",
          "Unused by anyone",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Removing junk keeps people from stepping on sharp waste.",
        feedbackIncorrectBlurb:
          "Trash hides hazards and bacteria in the surf.",
      },
      {
        question: "Pouring soda or soup into the ocean is…",
        choices: [
          "Always harmless",
          "A bad idea—food and sugar feed algae and attract pests",
          "Required at beaches",
          "Good for coral paint",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Even liquids add nutrients and mess that unbalance the shore.",
        feedbackIncorrectBlurb:
          "The ocean is not a kitchen sink—use trash cans.",
      },
      {
        question: "Reusable bottles help the beach because they…",
        choices: [
          "Guarantee storms",
          "Cut down on single-use plastic left in the sand",
          "Melt in the sun instantly",
          "Scare fish away",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Fewer disposables mean fewer bottles blowing into the water.",
        feedbackIncorrectBlurb:
          "Disposable plastic is a top litter item on coasts.",
      },
      {
        question: "If you see a full trash barrel, you can…",
        choices: [
          "Balance trash on top",
          "Walk to the next bin or pack trash out",
          "Kick it into the sea",
          "Hide trash under the boardwalk only",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Overflow still needs a proper home—carry it if needed.",
        feedbackIncorrectBlurb:
          "Stacked trash blows away—find another bin or take it home.",
      },
      {
        question: "Keeping Revere Beach clean matters because…",
        choices: [
          "Only tourists visit",
          "Locals, wildlife, and visitors all share one shoreline",
          "Trash improves the view",
          "Waves remove all pollution nightly",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "One beach supports many people and animals—care shows respect.",
        feedbackIncorrectBlurb:
          "Pollution sticks around; everyone’s habits add up.",
      },
    ],
    es: [
      {
        question: "En Revere Beach, ¿dónde van envoltorios de snacks?",
        choices: [
          "A las olas",
          "A basureros o reciclaje de la playa",
          "Enterrados en la arena",
          "Sobre la toalla",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Los botes mantienen plástico fuera del mar.",
        feedbackIncorrectBlurb:
          "Viento y marea arrastran basura suelta al agua.",
      },
      {
        question: "¿Por qué el plástico en el océano es un problema?",
        choices: [
          "A los peces les encanta",
          "Los animales pueden ahogarse o enredarse; el plástico se fragmenta",
          "Se derrite al instante",
          "Solo afecta desiertos",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "La vida marina confunde basura con comida—playa limpia ayuda.",
        feedbackIncorrectBlurb:
          "El plástico dura años y daña fauna.",
      },
      {
        question: "La marea subiendo puede…",
        choices: [
          "Borrar basura mágicamente",
          "Llevar basura de la arena al agua",
          "Encoger plástico",
          "Parar todas las olas",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Lo que dejas en la arena suele salir con la marea.",
        feedbackIncorrectBlurb:
          "Las mareas mueven residuos—llévate lo que traes.",
      },
      {
        question: "Tras un picnic en la playa debes…",
        choices: [
          "Dejar bandejas para gaviotas",
          "Cerrar sobras y meter toda la basura al bote",
          "Tirar huesos al mar",
          "Esconder vasos en castillos",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Restos también son basura—usa desecho adecuado.",
        feedbackIncorrectBlurb:
          "Las gaviotas esparcen comida y basura.",
      },
      {
        question: "El hilo de pesca viejo en la arena debe…",
        choices: [
          "Ir al agua",
          "Cortarse y al basurero para no enredar fauna",
          "Quedarse de adorno",
          "Quemarse ahí",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "El hilo lastima aves y focas—bótalo bien.",
        feedbackIncorrectBlurb:
          "El monofilamento daña animales; al basurero.",
      },
      {
        question: "Los bañistas están más seguros si el agua está…",
        choices: [
          "Llena de basura flotante",
          "Limpia, sin basura en lo poco profundo",
          "Aceitosa y turbia",
          "Sin uso",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Quitar basura evita pisar desechos filosos.",
        feedbackIncorrectBlurb:
          "La basura esconde peligros y gérmenes.",
      },
      {
        question: "Verter refresco o sopa al océano es…",
        choices: [
          "Siempre inofensivo",
          "Mala idea—alimenta algas y plagas",
          "Obligatorio en playa",
          "Bueno para “pintar” coral",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Líquidos también añaden nutrientes y desorden.",
        feedbackIncorrectBlurb:
          "El mar no es fregadero—usa basurero.",
      },
      {
        question: "Botellas reutilizables ayudan porque…",
        choices: [
          "Causan tormentas",
          "Reducen plástico de un solo uso en la arena",
          "Se derriten al sol",
          "Espantan peces",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Menos desechables = menos botellas al viento.",
        feedbackIncorrectBlurb:
          "El plástico desechable es basura típica en costas.",
      },
      {
        question: "Si el basurero está lleno, puedes…",
        choices: [
          "Apilar basura arriba",
          "Ir a otro bote o llevártela",
          "Patearla al mar",
          "Solo esconderla bajo el muelle",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "El desbordamiento aún necesita un sitio adecuado.",
        feedbackIncorrectBlurb:
          "La basura apilada vuela—otro bote o casa.",
      },
      {
        question: "Cuidar Revere Beach importa porque…",
        choices: [
          "Solo van turistas",
          "Vecinos, fauna y visitantes comparten la orilla",
          "La basura mejora la vista",
          "Las olas borran toda contaminación",
        ],
        correctIndex: 1,
        feedbackCorrectBlurb:
          "Una playa sirve a muchos—cuidarla es respeto.",
        feedbackIncorrectBlurb:
          "La contaminación permanece; los hábitos suman.",
      },
    ],
  },
};

export type ExitQuizContent = ExitQuizItem;

/** Move the correct choice to another slot so the MCQ is not always “option B”. */
function rotateCorrectSlot(
  q: ExitQuizContent,
  newCorrectIndex: 0 | 1 | 2 | 3
): ExitQuizContent {
  const correct = q.choices[q.correctIndex];
  const wrong: string[] = [];
  for (let j = 0; j < 4; j++) {
    if (j !== q.correctIndex) wrong.push(q.choices[j]!);
  }
  const choices: [string, string, string, string] = ["", "", "", ""];
  let wi = 0;
  for (let s = 0; s < 4; s++) {
    if (s === newCorrectIndex) choices[s] = correct;
    else choices[s] = wrong[wi++]!;
  }
  return {
    ...q,
    choices,
    correctIndex: newCorrectIndex,
  };
}

export function pickExitQuiz(
  lang: Lang,
  caseId: BostonCaseId,
  sceneSeed: number
): ExitQuizContent {
  const bank = EXIT_QUIZ_BY_CASE[caseId][lang];
  const i = (sceneSeed >>> 0) % bank.length;
  const raw = bank[i]!;
  const slot = (i % 4) as 0 | 1 | 2 | 3;
  return rotateCorrectSlot(raw, slot);
}
