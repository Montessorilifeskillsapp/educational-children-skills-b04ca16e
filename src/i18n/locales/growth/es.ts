// "growth" namespace, es: must match the English shape in ./en.ts.
import type { en } from './en';

export const es: typeof en = {
  shared: { invalidEmail: 'Introduce un correo electrónico válido.', genericError: 'Algo salió mal. Inténtalo de nuevo.', close: 'Cerrar', email: 'Correo electrónico' },
  readiness: {
    readyTitle: 'Tu guía está lista', readyBody: 'Se abrió en una pestaña nueva. Usa “Guardar como PDF” para conservar una copia.',
    openAgain: 'Abrir la guía de nuevo', seePremium: 'Ver la secuencia completa con Premium',
    eyebrow: 'Guía gratuita', titleHome: 'Obtén tu guía gratuita Montessori de preparación para el kínder', titleActivity: 'Descubre dónde encaja esta lección en la secuencia de tu hijo',
    body: 'Una lista de preparación adaptada a la edad y una semana AMI de ejemplo, con los estándares de EE. UU. que apoya cada lección.',
    ageGroup: 'Edad del niño', years: '{{age}} años', preparing: 'Preparando…', submit: 'Obtener mi guía gratis',
    footnote: 'Consejos Montessori ocasionales. Date de baja cuando quieras.', privacy: 'Privacidad',
  },
  cookies: {
    region: 'Opciones de cookies', title: 'Tus opciones de privacidad',
    body: 'Contamos las visitas sin cookies. Si aceptas, también usamos cookies de análisis y registramos qué páginas y actividades se usan, para mejorar la app. Consulta nuestra <1>Política de privacidad</1>.',
    acceptAll: 'Aceptar todo', rejectAll: 'Rechazar todo', settings: 'Configuración de cookies',
    dialogBody: 'Elige qué puede usar esta app en tu dispositivo. Puedes cambiarlo en cualquier momento desde el enlace Configuración de cookies.',
    gpc: 'Tu navegador envía una señal de privacidad (Global Privacy Control), así que el análisis permanece desactivado.',
    necessary: 'Necesarias', necessaryBody: 'Mantienen tu sesión iniciada y guardan tu configuración y tus lecciones para usarlas sin conexión. Siempre activas.', alwaysOn: 'Siempre activas',
    analytics: 'Análisis',
    analyticsBody: 'Proporcionado por Google y por Montessori Life Skills. Cookies de análisis y un registro de qué páginas y actividades se usan. El recuento de visitas sin cookies, proporcionado por Lovable, continúa en cualquier caso.',
    save: 'Guardar opciones',
  },
  consult: {
    errName: 'Introduce tu nombre', errNameLong: 'El nombre debe tener menos de 100 caracteres', errEmail: 'Introduce un correo electrónico válido',
    errAge: 'La edad del niño debe tener menos de 60 caracteres', errTopics: 'Cuéntanos de qué te gustaría hablar', errTopicsLong: 'Los temas deben tener menos de 2000 caracteres',
    errTimes: 'Los horarios preferidos deben tener menos de 500 caracteres', sendFailed: 'No pudimos enviar tu solicitud. Inténtalo de nuevo.',
    sentTitle: 'Solicitud enviada', sentBody: 'Gracias. Tu solicitud le ha llegado a Kerry, que responderá a <1>{{email}}</1> para acordar una hora.',
    title: 'Reservar una consulta privada', body: 'Cuéntanos un poco sobre tu hijo y en qué te gustaría recibir ayuda. Kerry te responderá por correo para acordar una hora.',
    name: 'Tu nombre', childAge: 'Edad del niño', optional: '(opcional)', agePlaceholder: 'p. ej., 4 años', package: 'Paquete',
    single: 'Una sesión', bundle: 'Tres sesiones', topics: '¿De qué te gustaría hablar?',
    topicsPlaceholder: 'Objetivos, rutinas, preparar tu espacio, preguntas sobre el currículo…',
    times: 'Fechas y horarios preferidos', timesPlaceholder: 'p. ej., mañanas entre semana, hora del centro de EE. UU.',
    cancel: 'Cancelar', sending: 'Enviando…', send: 'Enviar solicitud',
  },
  exit: {
    doneTitle: 'Ya estás en la lista', doneBody: 'Gracias. Te escribiremos con novedades y acceso anticipado.', back: 'Volver a la página',
    title: 'Antes de irte', body: 'Únete a la lista para tener acceso anticipado a nuevas actividades y novedades de Montessori Life Skills. Sin spam: puedes darte de baja cuando quieras.',
    placeholder: 'Tu correo electrónico', emailLabel: 'Correo electrónico', submitting: 'Registrándote…', submit: 'Mantenme informado',
    footnote: 'Acceso anticipado y novedades ocasionales. Date de baja cuando quieras.',
  },
  guidePage: {
  "title": "Guía Montessori de preparación para el kínder",
  "body": "Una lista de preparación y una semana AMI de Casa de Niños de ejemplo para la edad de tu hijo, con los estándares de EE. UU. que apoya cada lección.",
  "b1": "Lista de preparación adaptada a la edad",
  "b2": "Cinco lecciones de ejemplo de la secuencia AMI",
  "b3": "Alineación con Common Core y NGSS para cada lección",
  "b4": "Imprimible: guárdala como PDF",
  "childAge": "Edad de tu hijo",
  "included": "Incluido para {{age}} años:",
  "points": "+ lista de preparación de {{count}} puntos",
  "footnote": "Te enviaremos consejos Montessori ocasionales. Date de baja cuando quieras.",
  "privacy": "Política de privacidad"
},
  guide: {
  "docTitle": "Guía Montessori de preparación – {{age}} años",
  "save": "Guardar como PDF",
  "sub": "Una semana AMI de Casa de Niños de ejemplo, alineada con los estándares de EE. UU. · Montessori Life Skills",
  "intro": "Como observó la Dra. Maria Montessori, la mano es el instrumento de la mente. Esta guía muestra una semana de ejemplo de la secuencia AMI de Casa de Niños para un niño de {{age}} años, con los estándares de EE. UU. que apoya cada lección.",
  "checklist": "Lista de preparación",
  "observe": "Observa, no evalúes. Cada niño sigue su propio ritmo.",
  "week": "Semana de ejemplo",
  "day": "Día",
  "lesson": "Lección",
  "gains": "Lo que gana el niño",
  "standards": "Estándares",
  "days": [
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie"
  ],
  "indirect": "Preparación indirecta",
  "ctaTitle": "La secuencia completa.",
  "cta": "Premium incluye todas las presentaciones AMI de Casa de Niños en orden, guías paso a paso, videos de las lecciones y portafolios imprimibles para la educación en casa. Premium Anual cuesta $199/año o $29.99/mes, con garantía de 30 días.",
  "footer": "Códigos de estándares: Common Core (CCSS), NGSS, NCSS y National Core Arts Standards. Es un mapa de alineación, no una certificación. © {{year}} Montessori Life Skills.",
  "titles": {
    "Dry Pouring": "Trasvase de sólidos",
    "Greeting Others": "Saludar a los demás",
    "Knobbed Cylinders": "Cilindros con botón",
    "Pink Tower": "Torre rosa",
    "Sandpaper Letters": "Letras de lija",
    "Red Rods": "Barras rojas",
    "Number Rods": "Barras numéricas",
    "Spindle Box": "Caja de husos",
    "Land and Water Forms": "Formas de tierra y agua",
    "Golden Beads": "Perlas doradas",
    "Moveable Alphabet": "Alfabeto móvil",
    "Parts of a Plant": "Partes de la planta"
  },
  "areas": {
    "Practical Life": "Vida Práctica",
    "Grace and Courtesy": "Gracia y Cortesía",
    "Sensorial": "Sensorial",
    "Language": "Lenguaje",
    "Math": "Matemáticas",
    "Geography": "Geografía",
    "Botany": "Botánica"
  },
  "purposes": {
    "3": [
      "Coordinación del movimiento, concentración e independencia.",
      "Confianza y lenguaje social respetuoso.",
      "Discriminación visual del tamaño; la pinza que prepara la mano para la escritura.",
      "Discriminación visual del tamaño graduado en tres dimensiones.",
      "Unir cada sonido con su símbolo escrito mediante el tacto."
    ],
    "4": [
      "Longitud graduada; preparación directa para las barras numéricas.",
      "Cantidad y símbolo del 1 al 10 como longitudes únicas y contables.",
      "Contar cantidades sueltas y el concepto de cero.",
      "Asociación sonido–símbolo para la lectura y escritura iniciales.",
      "Comprensión concreta de la tierra y el agua de nuestro planeta."
    ],
    "5": [
      "El sistema decimal: unidades, decenas, centenas y millares.",
      "Formar palabras fonéticamente antes de que la mano pueda escribirlas.",
      "Afianzar cantidad, símbolo y cero.",
      "Nombrar y observar las partes de las plantas vivas.",
      "Formas de tierra y agua en pares, mediante el tacto y la nomenclatura."
    ]
  },
  "checks": {
    "3": [
      "Transporta una bandeja o una silla con cuidado",
      "Trasvasa materiales secos derramando un poco",
      "Sigue una indicación de dos pasos",
      "Saluda a los adultos conocidos",
      "Clasifica objetos por tamaño o color",
      "Muestra interés por los sonidos de las letras"
    ],
    "4": [
      "Trasvasa agua con pocos derrames",
      "Trabaja en una actividad durante más de 10 minutos",
      "Gradúa objetos por tamaño",
      "Reconoce varios sonidos de letras",
      "Cuenta objetos hasta 10 con correspondencia uno a uno",
      "Dice por favor, gracias y disculpa"
    ],
    "5": [
      "Completa una actividad de varios pasos y la guarda",
      "Nombra la mayoría de los sonidos de las letras",
      "Forma palabras sencillas por sonidos",
      "Cuenta y asocia cantidades con numerales mayores que 10",
      "Sostiene el lápiz con pinza trípode",
      "Respeta los turnos de palabra en grupo"
    ]
  }
},
};
