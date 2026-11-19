// "growth" namespace: pop-ups, cookie choices, consultation booking. English is the source; other languages must match its shape.
const en = {
  shared: { invalidEmail: 'Please enter a valid email address.', genericError: 'Something went wrong. Please try again.', close: 'Close', email: 'Email' },
  readiness: {
    readyTitle: 'Your guide is ready', readyBody: 'It opened in a new tab. Use “Save as PDF” to keep a copy.',
    openAgain: 'Open the guide again', seePremium: 'See the full sequence with Premium',
    eyebrow: 'Free guide', titleHome: 'Get your free Montessori Kindergarten Readiness Guide', titleActivity: 'See where this lesson fits in your child’s sequence',
    body: 'An age-matched readiness checklist and a sample AMI week, with the U.S. standards each lesson supports.',
    ageGroup: "Child's age", years: '{{age}} years', preparing: 'Preparing…', submit: 'Get my free guide',
    footnote: 'Occasional Montessori tips. Unsubscribe anytime.', privacy: 'Privacy',
  },
  cookies: {
    region: 'Cookie choices', title: 'Your privacy choices',
    body: 'We count visits without cookies. If you accept, we also use analytics cookies and record which pages and activities are used, so we can improve the app. See our <1>Privacy Policy</1>.',
    acceptAll: 'Accept all', rejectAll: 'Reject all', settings: 'Cookie settings',
    dialogBody: 'Choose what this app may use on your device. You can change this at any time from the Cookie settings link.',
    gpc: 'Your browser is sending a privacy signal (Global Privacy Control), so analytics stays off.',
    necessary: 'Necessary', necessaryBody: 'Keeps you signed in, saves your settings and lessons for offline use. Always on.', alwaysOn: 'Always on',
    analytics: 'Analytics',
    analyticsBody: 'Provided by Google and by Montessori Life Skills. Analytics cookies and a record of which pages and activities are used. Visit counts without cookies, provided by Lovable, continue either way.',
    save: 'Save choices',
  },
  consult: {
    errName: 'Please enter your name', errNameLong: 'Name must be under 100 characters', errEmail: 'Please enter a valid email address',
    errAge: 'Child age must be under 60 characters', errTopics: 'Please tell us what you would like to discuss', errTopicsLong: 'Topics must be under 2000 characters',
    errTimes: 'Preferred times must be under 500 characters', sendFailed: 'We could not send your request. Please try again.',
    sentTitle: 'Request sent', sentBody: 'Thank you. Your request has reached Kerry, who will reply to <1>{{email}}</1> to arrange a time.',
    title: 'Book a private consultation', body: 'Tell us a little about your child and what you would like help with. Kerry will reply by email to arrange a time.',
    name: 'Your name', childAge: "Child's age", optional: '(optional)', agePlaceholder: 'e.g. 4 years', package: 'Package',
    single: 'Single session', bundle: 'Three sessions', topics: 'What would you like to discuss?',
    topicsPlaceholder: 'Goals, routines, setting up your space, questions about the curriculum…',
    times: 'Preferred dates and times', timesPlaceholder: 'e.g. Weekday mornings, Central time',
    cancel: 'Cancel', sending: 'Sending…', send: 'Send request',
  },
  exit: {
    doneTitle: "You're on the list", doneBody: "Thank you — we'll be in touch with updates and early access.", back: 'Back to the page',
    title: 'Before you go', body: 'Join the list for early access to new activities and updates from Montessori Life Skills. No spam — you can unsubscribe anytime.',
    placeholder: 'Your email address', emailLabel: 'Email address', submitting: 'Signing you up…', submit: 'Keep me posted',
    footnote: 'Early access and occasional updates. Unsubscribe anytime.',
  },
  guidePage: {
  "title": "Montessori Kindergarten Readiness Guide",
  "body": "A readiness checklist and a sample AMI Primary week for your child’s age, with the U.S. standards each lesson supports.",
  "b1": "Age-matched readiness checklist",
  "b2": "Five sample lessons from the AMI sequence",
  "b3": "Common Core and NGSS alignment for each lesson",
  "b4": "Printable – save it as a PDF",
  "childAge": "Your child’s age",
  "included": "Included for age {{age}}:",
  "points": "+ {{count}}-point readiness checklist",
  "footnote": "We’ll email you occasional Montessori tips. Unsubscribe anytime.",
  "privacy": "Privacy Policy"
},
  guide: {
  "docTitle": "Montessori Readiness Guide – Age {{age}}",
  "save": "Save as PDF",
  "sub": "A sample AMI Primary week with U.S. standards alignment · Montessori Life Skills",
  "intro": "As Dr. Maria Montessori observed, the hand is the instrument of the mind. This guide shows one sample week from the AMI Primary sequence for a {{age}}-year-old, with the U.S. standards each lesson supports.",
  "checklist": "Readiness checklist",
  "observe": "Observe, don’t test. Each child follows their own timeline.",
  "week": "Sample week",
  "day": "Day",
  "lesson": "Lesson",
  "gains": "What the child gains",
  "standards": "Standards",
  "days": [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri"
  ],
  "indirect": "Indirect preparation",
  "ctaTitle": "The complete sequence.",
  "cta": "Premium includes every AMI Primary presentation in order, step-by-step guides, lesson videos and printable homeschool portfolios. Premium Annual is $199/year or $29.99/month, with a 30-day guarantee.",
  "footer": "Standard codes: Common Core (CCSS), NGSS, NCSS and National Core Arts Standards. This is an alignment map, not a certification. © {{year}} Montessori Life Skills.",
  "titles": {
    "Dry Pouring": "Dry Pouring",
    "Greeting Others": "Greeting Others",
    "Knobbed Cylinders": "Knobbed Cylinders",
    "Pink Tower": "Pink Tower",
    "Sandpaper Letters": "Sandpaper Letters",
    "Red Rods": "Red Rods",
    "Number Rods": "Number Rods",
    "Spindle Box": "Spindle Box",
    "Land and Water Forms": "Land and Water Forms",
    "Golden Beads": "Golden Beads",
    "Moveable Alphabet": "Moveable Alphabet",
    "Parts of a Plant": "Parts of a Plant"
  },
  "areas": {
    "Practical Life": "Practical Life",
    "Grace and Courtesy": "Grace and Courtesy",
    "Sensorial": "Sensorial",
    "Language": "Language",
    "Math": "Math",
    "Geography": "Geography",
    "Botany": "Botany"
  },
  "purposes": {
    "3": [
      "Coordination of movement, concentration and independence.",
      "Confidence and respectful social language.",
      "Visual discrimination of size; the pincer grip that prepares the hand for writing.",
      "Visual discrimination of graded size in three dimensions.",
      "Linking each sound to its written symbol through touch."
    ],
    "4": [
      "Graded length; direct preparation for the Number Rods.",
      "Quantity and symbol 1–10 as single, countable lengths.",
      "Counting loose quantities and the concept of zero.",
      "Sound–symbol association for early reading and writing.",
      "Concrete understanding of the Earth’s land and water."
    ],
    "5": [
      "The decimal system: units, tens, hundreds and thousands.",
      "Building words phonetically before the hand can write them.",
      "Confirming quantity, symbol and zero.",
      "Naming and observing the parts of living plants.",
      "Paired land and water forms through touch and naming."
    ]
  },
  "checks": {
    "3": [
      "Carries a tray or chair with care",
      "Pours dry materials with some spilling",
      "Follows a two-step request",
      "Greets familiar adults",
      "Sorts objects by size or color",
      "Shows interest in letter sounds"
    ],
    "4": [
      "Pours water with few spills",
      "Works on one activity for 10+ minutes",
      "Grades objects by size",
      "Recognizes several letter sounds",
      "Counts objects to 10 with one-to-one correspondence",
      "Uses please, thank you and excuse me"
    ],
    "5": [
      "Completes a multi-step activity and puts it away",
      "Names most letter sounds",
      "Builds simple words by sound",
      "Counts and matches quantity to numerals beyond 10",
      "Holds a pencil with a tripod grip",
      "Takes turns speaking in a group"
    ]
  }
},
};

const es: typeof en = {
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

const de: typeof en = {
  shared: { invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', genericError: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.', close: 'Schließen', email: 'E-Mail' },
  readiness: {
    readyTitle: 'Ihr Leitfaden ist fertig', readyBody: 'Er wurde in einem neuen Tab geöffnet. Mit „Als PDF speichern“ behalten Sie eine Kopie.',
    openAgain: 'Leitfaden erneut öffnen', seePremium: 'Die vollständige Abfolge mit Premium ansehen',
    eyebrow: 'Kostenloser Leitfaden', titleHome: 'Ihr kostenloser Montessori-Leitfaden zur Schulreife', titleActivity: 'Sehen Sie, wo diese Lektion in der Abfolge Ihres Kindes steht',
    body: 'Eine altersgerechte Checkliste zur Schulreife und eine AMI-Beispielwoche mit den US-Bildungsstandards, die jede Lektion unterstützt.',
    ageGroup: 'Alter des Kindes', years: '{{age}} Jahre', preparing: 'Wird vorbereitet…', submit: 'Kostenlosen Leitfaden erhalten',
    footnote: 'Gelegentliche Montessori-Tipps. Jederzeit abbestellbar.', privacy: 'Datenschutz',
  },
  cookies: {
    region: 'Cookie-Auswahl', title: 'Ihre Datenschutzeinstellungen',
    body: 'Wir zählen Besuche ohne Cookies. Wenn Sie zustimmen, verwenden wir außerdem Analyse-Cookies und erfassen, welche Seiten und Aktivitäten genutzt werden, um die App zu verbessern. Siehe unsere <1>Datenschutzerklärung</1>.',
    acceptAll: 'Alle akzeptieren', rejectAll: 'Alle ablehnen', settings: 'Cookie-Einstellungen',
    dialogBody: 'Legen Sie fest, was diese App auf Ihrem Gerät verwenden darf. Sie können dies jederzeit über den Link „Cookie-Einstellungen“ ändern.',
    gpc: 'Ihr Browser sendet ein Datenschutzsignal (Global Privacy Control), daher bleibt die Analyse ausgeschaltet.',
    necessary: 'Notwendig', necessaryBody: 'Hält Sie angemeldet und speichert Ihre Einstellungen und Lektionen für die Offline-Nutzung. Immer aktiv.', alwaysOn: 'Immer aktiv',
    analytics: 'Analyse',
    analyticsBody: 'Bereitgestellt von Google und Montessori Life Skills. Analyse-Cookies und eine Aufzeichnung, welche Seiten und Aktivitäten genutzt werden. Die cookiefreie Besuchszählung durch Lovable läuft in jedem Fall weiter.',
    save: 'Auswahl speichern',
  },
  consult: {
    errName: 'Bitte geben Sie Ihren Namen ein', errNameLong: 'Der Name muss kürzer als 100 Zeichen sein', errEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    errAge: 'Die Altersangabe muss kürzer als 60 Zeichen sein', errTopics: 'Bitte teilen Sie uns mit, worüber Sie sprechen möchten', errTopicsLong: 'Die Themen müssen kürzer als 2000 Zeichen sein',
    errTimes: 'Die Wunschzeiten müssen kürzer als 500 Zeichen sein', sendFailed: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    sentTitle: 'Anfrage gesendet', sentBody: 'Vielen Dank. Ihre Anfrage ist bei Kerry eingegangen. Sie antwortet an <1>{{email}}</1>, um einen Termin zu vereinbaren.',
    title: 'Private Beratung buchen', body: 'Erzählen Sie uns ein wenig über Ihr Kind und wobei Sie Unterstützung wünschen. Kerry antwortet per E-Mail, um einen Termin zu vereinbaren.',
    name: 'Ihr Name', childAge: 'Alter des Kindes', optional: '(optional)', agePlaceholder: 'z. B. 4 Jahre', package: 'Paket',
    single: 'Einzelsitzung', bundle: 'Drei Sitzungen', topics: 'Worüber möchten Sie sprechen?',
    topicsPlaceholder: 'Ziele, Tagesabläufe, Gestaltung Ihrer Umgebung, Fragen zum Lehrplan…',
    times: 'Bevorzugte Tage und Uhrzeiten', timesPlaceholder: 'z. B. werktags vormittags, US-Central-Zeit',
    cancel: 'Abbrechen', sending: 'Wird gesendet…', send: 'Anfrage senden',
  },
  exit: {
    doneTitle: 'Sie stehen auf der Liste', doneBody: 'Vielen Dank – wir melden uns mit Neuigkeiten und frühem Zugang.', back: 'Zurück zur Seite',
    title: 'Bevor Sie gehen', body: 'Tragen Sie sich ein und erhalten Sie frühen Zugang zu neuen Aktivitäten und Neuigkeiten von Montessori Life Skills. Kein Spam – jederzeit abbestellbar.',
    placeholder: 'Ihre E-Mail-Adresse', emailLabel: 'E-Mail-Adresse', submitting: 'Wird eingetragen…', submit: 'Auf dem Laufenden bleiben',
    footnote: 'Früher Zugang und gelegentliche Neuigkeiten. Jederzeit abbestellbar.',
  },
  guidePage: {
  "title": "Montessori-Leitfaden zur Schulreife",
  "body": "Eine Checkliste zur Schulreife und eine AMI-Kinderhaus-Beispielwoche für das Alter Ihres Kindes, mit den US-Bildungsstandards, die jede Lektion unterstützt.",
  "b1": "Altersgerechte Checkliste zur Schulreife",
  "b2": "Fünf Beispiellektionen aus der AMI-Abfolge",
  "b3": "Zuordnung zu Common Core und NGSS für jede Lektion",
  "b4": "Druckbar – als PDF speichern",
  "childAge": "Alter Ihres Kindes",
  "included": "Enthalten für {{age}} Jahre:",
  "points": "+ Checkliste zur Schulreife mit {{count}} Punkten",
  "footnote": "Wir senden Ihnen gelegentlich Montessori-Tipps. Jederzeit abbestellbar.",
  "privacy": "Datenschutzerklärung"
},
  guide: {
  "docTitle": "Montessori-Leitfaden zur Schulreife – {{age}} Jahre",
  "save": "Als PDF speichern",
  "sub": "Eine AMI-Kinderhaus-Beispielwoche mit Zuordnung zu US-Bildungsstandards · Montessori Life Skills",
  "intro": "Wie Dr. Maria Montessori beobachtete, ist die Hand das Werkzeug des Geistes. Dieser Leitfaden zeigt eine Beispielwoche aus der AMI-Kinderhaus-Abfolge für ein {{age}}-jähriges Kind, mit den US-Bildungsstandards, die jede Lektion unterstützt.",
  "checklist": "Checkliste zur Schulreife",
  "observe": "Beobachten, nicht testen. Jedes Kind folgt seinem eigenen Tempo.",
  "week": "Beispielwoche",
  "day": "Tag",
  "lesson": "Lektion",
  "gains": "Was das Kind gewinnt",
  "standards": "Standards",
  "days": [
    "Mo",
    "Di",
    "Mi",
    "Do",
    "Fr"
  ],
  "indirect": "Indirekte Vorbereitung",
  "ctaTitle": "Die vollständige Abfolge.",
  "cta": "Premium enthält jede AMI-Kinderhaus-Darbietung in der richtigen Reihenfolge, Anleitungen Schritt für Schritt, Lektionsvideos und druckbare Portfolios für den Heimunterricht. Premium Jährlich kostet $199/Jahr oder $29.99/Monat, mit 30 Tagen Garantie.",
  "footer": "Standardcodes: Common Core (CCSS), NGSS, NCSS und National Core Arts Standards. Dies ist eine Zuordnungsübersicht, keine Zertifizierung. © {{year}} Montessori Life Skills.",
  "titles": {
    "Dry Pouring": "Trockenes Schütten",
    "Greeting Others": "Andere begrüßen",
    "Knobbed Cylinders": "Einsatzzylinder",
    "Pink Tower": "Rosa Turm",
    "Sandpaper Letters": "Sandpapierbuchstaben",
    "Red Rods": "Rote Stangen",
    "Number Rods": "Numerische Stangen",
    "Spindle Box": "Spindelkasten",
    "Land and Water Forms": "Land- und Wasserformen",
    "Golden Beads": "Goldenes Perlenmaterial",
    "Moveable Alphabet": "Bewegliches Alphabet",
    "Parts of a Plant": "Teile der Pflanze"
  },
  "areas": {
    "Practical Life": "Übungen des täglichen Lebens",
    "Grace and Courtesy": "Anmut und Höflichkeit",
    "Sensorial": "Sinnesmaterial",
    "Language": "Sprache",
    "Math": "Mathematik",
    "Geography": "Geographie",
    "Botany": "Botanik"
  },
  "purposes": {
    "3": [
      "Bewegungskoordination, Konzentration und Selbstständigkeit.",
      "Selbstvertrauen und respektvolle soziale Sprache.",
      "Visuelle Unterscheidung von Größen; der Pinzettengriff als Vorbereitung der Hand auf das Schreiben.",
      "Visuelle Unterscheidung abgestufter Größen in drei Dimensionen.",
      "Jeden Laut über den Tastsinn mit seinem Schriftzeichen verbinden."
    ],
    "4": [
      "Abgestufte Länge; direkte Vorbereitung auf die Numerischen Stangen.",
      "Menge und Ziffer 1–10 als einzelne, zählbare Längen.",
      "Lose Mengen zählen und der Begriff der Null.",
      "Laut-Zeichen-Zuordnung für erstes Lesen und Schreiben.",
      "Konkretes Verständnis von Land und Wasser auf der Erde."
    ],
    "5": [
      "Das Dezimalsystem: Einer, Zehner, Hunderter und Tausender.",
      "Wörter lautgetreu legen, bevor die Hand sie schreiben kann.",
      "Menge, Ziffer und Null festigen.",
      "Die Teile lebender Pflanzen benennen und beobachten.",
      "Paarige Land- und Wasserformen durch Tasten und Benennen."
    ]
  },
  "checks": {
    "3": [
      "Trägt ein Tablett oder einen Stuhl sorgfältig",
      "Schüttet trockene Materialien mit etwas Verschütten",
      "Folgt einer Bitte mit zwei Schritten",
      "Begrüßt vertraute Erwachsene",
      "Sortiert Gegenstände nach Größe oder Farbe",
      "Zeigt Interesse an Buchstabenlauten"
    ],
    "4": [
      "Gießt Wasser mit wenig Verschütten",
      "Arbeitet 10 Minuten und länger an einer Aktivität",
      "Ordnet Gegenstände nach Größe",
      "Erkennt mehrere Buchstabenlaute",
      "Zählt Gegenstände bis 10 mit Eins-zu-eins-Zuordnung",
      "Sagt bitte, danke und Entschuldigung"
    ],
    "5": [
      "Schließt eine Aktivität mit mehreren Schritten ab und räumt sie weg",
      "Benennt die meisten Buchstabenlaute",
      "Legt einfache Wörter nach Lauten",
      "Zählt Mengen über 10 und ordnet sie Ziffern zu",
      "Hält den Stift im Dreipunktgriff",
      "Wartet in der Gruppe, bis es an der Reihe ist zu sprechen"
    ]
  }
},
};

const zh: typeof en = {
  shared: { invalidEmail: '请输入有效的电子邮件地址。', genericError: '出了点问题，请重试。', close: '关闭', email: '电子邮件' },
  readiness: {
    readyTitle: '您的指南已准备好', readyBody: '已在新标签页中打开。使用“另存为 PDF”保存副本。',
    openAgain: '再次打开指南', seePremium: '开通高级版查看完整序列',
    eyebrow: '免费指南', titleHome: '领取免费的蒙台梭利幼小衔接准备指南', titleActivity: '看看这节课在孩子学习序列中的位置',
    body: '按年龄匹配的入学准备清单和一周 AMI 示例课程，并标注每节课对应的美国教育标准。',
    ageGroup: '孩子年龄', years: '{{age}} 岁', preparing: '正在准备…', submit: '领取免费指南',
    footnote: '偶尔发送蒙台梭利小贴士，可随时退订。', privacy: '隐私',
  },
  cookies: {
    region: 'Cookie 选项', title: '您的隐私选择',
    body: '我们在不使用 Cookie 的情况下统计访问量。如果您同意，我们还会使用分析 Cookie，并记录哪些页面和活动被使用，以改进应用。请参阅我们的<1>隐私政策</1>。',
    acceptAll: '全部接受', rejectAll: '全部拒绝', settings: 'Cookie 设置',
    dialogBody: '选择此应用可以在您的设备上使用哪些内容。您可以随时通过“Cookie 设置”链接更改。',
    gpc: '您的浏览器正在发送隐私信号（全球隐私控制），因此分析功能保持关闭。',
    necessary: '必要', necessaryBody: '保持登录状态，并保存您的设置和课程以供离线使用。始终开启。', alwaysOn: '始终开启',
    analytics: '分析',
    analyticsBody: '由 Google 和 Montessori Life Skills 提供。包括分析 Cookie 以及哪些页面和活动被使用的记录。由 Lovable 提供的无 Cookie 访问统计无论如何都会继续。',
    save: '保存选择',
  },
  consult: {
    errName: '请输入您的姓名', errNameLong: '姓名须少于 100 个字符', errEmail: '请输入有效的电子邮件地址',
    errAge: '孩子年龄须少于 60 个字符', errTopics: '请告诉我们您想讨论的内容', errTopicsLong: '讨论内容须少于 2000 个字符',
    errTimes: '偏好时间须少于 500 个字符', sendFailed: '无法发送您的请求，请重试。',
    sentTitle: '请求已发送', sentBody: '谢谢。Kerry 已收到您的请求，她会回复至 <1>{{email}}</1> 与您约定时间。',
    title: '预约私人咨询', body: '请简单介绍您的孩子以及希望获得哪些帮助。Kerry 会通过电子邮件回复，与您约定时间。',
    name: '您的姓名', childAge: '孩子年龄', optional: '（选填）', agePlaceholder: '例如：4 岁', package: '套餐',
    single: '单次咨询', bundle: '三次咨询', topics: '您想讨论什么？',
    topicsPlaceholder: '目标、日常安排、环境布置、关于课程的问题…',
    times: '偏好的日期和时间', timesPlaceholder: '例如：工作日上午，美国中部时间',
    cancel: '取消', sending: '正在发送…', send: '发送请求',
  },
  exit: {
    doneTitle: '您已加入名单', doneBody: '谢谢！我们会向您发送最新动态和抢先体验机会。', back: '返回页面',
    title: '离开之前', body: '加入名单，抢先体验新活动并获取 Montessori Life Skills 的最新动态。绝无垃圾邮件，可随时退订。',
    placeholder: '您的电子邮件地址', emailLabel: '电子邮件地址', submitting: '正在登记…', submit: '通知我',
    footnote: '抢先体验和不定期更新，可随时退订。',
  },
  guidePage: {
  "title": "蒙台梭利幼小衔接准备指南",
  "body": "根据孩子年龄提供的入学准备清单和一周 AMI 初级示例课程，并标注每节课对应的美国教育标准。",
  "b1": "按年龄匹配的入学准备清单",
  "b2": "AMI 序列中的五节示例课",
  "b3": "每节课对应的 Common Core 与 NGSS 标准",
  "b4": "可打印——可保存为 PDF",
  "childAge": "孩子的年龄",
  "included": "{{age}} 岁包含：",
  "points": "+ {{count}} 项入学准备清单",
  "footnote": "我们会偶尔发送蒙台梭利小贴士，可随时退订。",
  "privacy": "隐私政策"
},
  guide: {
  "docTitle": "蒙台梭利入学准备指南——{{age}} 岁",
  "save": "另存为 PDF",
  "sub": "一周 AMI 初级示例课程，对应美国教育标准 · Montessori Life Skills",
  "intro": "正如玛利亚·蒙台梭利博士所观察到的，手是心智的工具。本指南展示了 AMI 初级序列中适合 {{age}} 岁孩子的一周示例课程，并标注每节课对应的美国教育标准。",
  "checklist": "入学准备清单",
  "observe": "观察，而非测试。每个孩子都有自己的节奏。",
  "week": "示例一周",
  "day": "日",
  "lesson": "课程",
  "gains": "孩子的收获",
  "standards": "标准",
  "days": [
    "周一",
    "周二",
    "周三",
    "周四",
    "周五"
  ],
  "indirect": "间接预备",
  "ctaTitle": "完整序列。",
  "cta": "高级版按顺序包含所有 AMI 初级示范、分步指南、课程视频和可打印的家庭教育档案。高级版年付 $199/年，或 $29.99/月，享 30 天保证。",
  "footer": "标准代码：Common Core（CCSS）、NGSS、NCSS 和美国国家核心艺术标准。本文件为对照图，并非认证。© {{year}} Montessori Life Skills。",
  "titles": {
    "Dry Pouring": "干物倒取",
    "Greeting Others": "问候他人",
    "Knobbed Cylinders": "带插座圆柱体",
    "Pink Tower": "粉红塔",
    "Sandpaper Letters": "砂纸字母",
    "Red Rods": "红棒",
    "Number Rods": "数棒",
    "Spindle Box": "纺锤棒箱",
    "Land and Water Forms": "陆地与水域模型",
    "Golden Beads": "金色串珠",
    "Moveable Alphabet": "活动字母",
    "Parts of a Plant": "植物的部分"
  },
  "areas": {
    "Practical Life": "日常生活",
    "Grace and Courtesy": "优雅与礼仪",
    "Sensorial": "感官",
    "Language": "语言",
    "Math": "数学",
    "Geography": "地理",
    "Botany": "植物学"
  },
  "purposes": {
    "3": [
      "动作协调、专注与独立。",
      "自信与得体的社交语言。",
      "大小的视觉辨别；为书写做准备的三指抓握。",
      "三维渐变大小的视觉辨别。",
      "通过触觉将每个音与其书写符号联系起来。"
    ],
    "4": [
      "渐变长度；数棒的直接预备。",
      "把 1–10 的数量与符号理解为单一、可数的长度。",
      "数散放的数量以及零的概念。",
      "为早期阅读和书写建立音与符号的联系。",
      "具体理解地球上的陆地与水域。"
    ],
    "5": [
      "十进制：个、十、百、千。",
      "在手能书写之前，按发音拼出单词。",
      "巩固数量、符号与零。",
      "说出并观察活体植物的各部分。",
      "通过触摸和命名认识成对的陆地与水域形态。"
    ]
  },
  "checks": {
    "3": [
      "小心地搬托盘或椅子",
      "倒取干物，偶有洒落",
      "能听从两步指令",
      "向熟悉的成人问好",
      "按大小或颜色分类物品",
      "对字母发音感兴趣"
    ],
    "4": [
      "倒水时很少洒出",
      "专注于一项活动 10 分钟以上",
      "按大小排序物品",
      "认识几个字母的发音",
      "一一对应地数到 10",
      "会说请、谢谢和对不起"
    ],
    "5": [
      "完成多步骤活动并归位",
      "能说出大多数字母的发音",
      "按发音拼出简单单词",
      "数 10 以上的数量并与数字对应",
      "用三指握笔",
      "在小组中轮流发言"
    ]
  }
},
};

const sw: typeof en = {
  "shared": {
    "invalidEmail": "Tafadhali weka anwani halali ya barua pepe.",
    "genericError": "Hitilafu imetokea. Tafadhali jaribu tena.",
    "close": "Funga",
    "email": "Barua pepe"
  },
  "readiness": {
    "readyTitle": "Mwongozo wako uko tayari",
    "readyBody": "Umefunguliwa kwenye kichupo kipya. Tumia “Hifadhi kama PDF” ili kuhifadhi nakala.",
    "openAgain": "Fungua mwongozo tena",
    "seePremium": "Angalia mfuatano kamili kwa Premium",
    "eyebrow": "Mwongozo wa bure",
    "titleHome": "Pata mwongozo wako wa bure wa Montessori wa utayari wa kuanza chekechea",
    "titleActivity": "Angalia nafasi ya somo hili katika mfuatano wa kujifunza wa mtoto wako",
    "body": "Orodha ya kukagua utayari kulingana na umri na mfano wa wiki ya AMI, pamoja na viwango vya Marekani vinavyoungwa mkono na kila somo.",
    "ageGroup": "Umri wa mtoto",
    "years": "Miaka {{age}}",
    "preparing": "Inaandaa…",
    "submit": "Pata mwongozo wangu wa bure",
    "footnote": "Vidokezo vya Montessori mara kwa mara. Jiondoe wakati wowote.",
    "privacy": "Faragha"
  },
  "cookies": {
    "region": "Chaguo za vidakuzi",
    "title": "Chaguo zako za faragha",
    "body": "Tunahesabu ziara bila vidakuzi. Ukikubali, tunatumia pia vidakuzi vya uchanganuzi na kurekodi kurasa na shughuli zinazotumiwa ili tuboreshe programu. Angalia <1>Sera yetu ya Faragha</1>.",
    "acceptAll": "Kubali vyote",
    "rejectAll": "Kataa vyote",
    "settings": "Mipangilio ya vidakuzi",
    "dialogBody": "Chagua kile ambacho programu hii inaweza kutumia kwenye kifaa chako. Unaweza kubadilisha hili wakati wowote kupitia kiungo cha mipangilio ya vidakuzi.",
    "gpc": "Kivinjari chako kinatuma ishara ya faragha (Global Privacy Control), kwa hivyo uchanganuzi unabaki umezimwa.",
    "necessary": "Muhimu",
    "necessaryBody": "Hukuweka ukiwa umeingia, huhifadhi mipangilio na masomo yako kwa matumizi bila mtandao. Huwashwa daima.",
    "alwaysOn": "Huwashwa daima",
    "analytics": "Uchanganuzi",
    "analyticsBody": "Hutolewa na Google na Montessori Life Skills. Vidakuzi vya uchanganuzi na rekodi ya kurasa na shughuli zinazotumiwa. Uhesabuji wa ziara bila vidakuzi, unaotolewa na Lovable, huendelea bila kujali chaguo lako.",
    "save": "Hifadhi machaguo"
  },
  "consult": {
    "errName": "Tafadhali weka jina lako",
    "errNameLong": "Jina lazima liwe na vibambo chini ya 100",
    "errEmail": "Tafadhali weka anwani halali ya barua pepe",
    "errAge": "Umri wa mtoto lazima uwe na vibambo chini ya 60",
    "errTopics": "Tafadhali tuambie ungependa kujadili nini",
    "errTopicsLong": "Mada lazima ziwe na vibambo chini ya 2000",
    "errTimes": "Nyakati unazopendelea lazima ziwe na vibambo chini ya 500",
    "sendFailed": "Hatukuweza kutuma ombi lako. Tafadhali jaribu tena.",
    "sentTitle": "Ombi limetumwa",
    "sentBody": "Asante. Ombi lako limemfikia Kerry, ambaye atajibu kupitia <1>{{email}}</1> ili kupanga muda.",
    "title": "Weka nafasi ya ushauri wa faragha",
    "body": "Tuambie kidogo kuhusu mtoto wako na jambo ambalo ungependa kusaidiwa. Kerry atajibu kwa barua pepe ili kupanga muda.",
    "name": "Jina lako",
    "childAge": "Umri wa mtoto",
    "optional": "(si lazima)",
    "agePlaceholder": "k.m. miaka 4",
    "package": "Kifurushi",
    "single": "Kikao kimoja",
    "bundle": "Vikao vitatu",
    "topics": "Ungependa kujadili nini?",
    "topicsPlaceholder": "Malengo, ratiba za kila siku, kuandaa mazingira yako, maswali kuhusu mtaala…",
    "times": "Tarehe na nyakati unazopendelea",
    "timesPlaceholder": "k.m. Asubuhi za siku za kazi, saa za eneo la Kati la Marekani",
    "cancel": "Ghairi",
    "sending": "Inatuma…",
    "send": "Tuma ombi"
  },
  "exit": {
    "doneTitle": "Umejiunga na orodha",
    "doneBody": "Asante — tutawasiliana nawe kuhusu taarifa mpya na ufikiaji wa mapema.",
    "back": "Rudi kwenye ukurasa",
    "title": "Kabla hujaondoka",
    "body": "Jiunge na orodha ili kupata ufikiaji wa mapema wa shughuli mpya na taarifa kutoka Montessori Life Skills. Hakuna barua taka — unaweza kujiondoa wakati wowote.",
    "placeholder": "Anwani yako ya barua pepe",
    "emailLabel": "Anwani ya barua pepe",
    "submitting": "Tunakusajili…",
    "submit": "Nijulishe",
    "footnote": "Ufikiaji wa mapema na taarifa za mara kwa mara. Jiondoe wakati wowote."
  },
  "guidePage": {
    "title": "Mwongozo wa Montessori wa Utayari kwa Chekechea",
    "body": "Orodha ya kukagua utayari na mfano wa wiki ya AMI Primary unaolingana na umri wa mtoto wako, pamoja na viwango vya Marekani vinavyoungwa mkono na kila somo.",
    "b1": "Orodha ya kukagua utayari kulingana na umri",
    "b2": "Masomo matano ya mfano kutoka mfuatano wa AMI",
    "b3": "Ulinganifu wa kila somo na Common Core na NGSS",
    "b4": "Inaweza kuchapishwa – ihifadhi kama PDF",
    "childAge": "Umri wa mtoto wako",
    "included": "Yaliyomo kwa umri wa miaka {{age}}:",
    "points": "+ Orodha ya kukagua utayari yenye vipengele {{count}}",
    "footnote": "Tutakutumia vidokezo vya Montessori kwa barua pepe mara kwa mara. Jiondoe wakati wowote.",
    "privacy": "Sera ya Faragha"
  },
  "guide": {
    "docTitle": "Mwongozo wa Utayari wa Montessori – Umri wa miaka {{age}}",
    "save": "Hifadhi kama PDF",
    "sub": "Mfano wa wiki ya AMI Primary unaolingana na viwango vya Marekani · Montessori Life Skills",
    "intro": "Kama Dr. Maria Montessori alivyoona, mkono ni chombo cha akili. Mwongozo huu unaonyesha mfano wa wiki moja kutoka mfuatano wa AMI Primary kwa mtoto wa miaka {{age}}, pamoja na viwango vya Marekani vinavyoungwa mkono na kila somo.",
    "checklist": "Orodha ya kukagua utayari",
    "observe": "Angalia, usipime. Kila mtoto hukua kwa kasi yake mwenyewe.",
    "week": "Wiki ya mfano",
    "day": "Siku",
    "lesson": "Somo",
    "gains": "Anachopata mtoto",
    "standards": "Viwango",
    "days": [
      "Jumatatu",
      "Jumanne",
      "Jumatano",
      "Alhamisi",
      "Ijumaa"
    ],
    "indirect": "Maandalizi yasiyo ya moja kwa moja",
    "ctaTitle": "Mfuatano kamili.",
    "cta": "Premium inajumuisha kila uwasilishaji wa AMI Primary kwa mpangilio, miongozo ya hatua kwa hatua, video za masomo na jalada za masomo ya nyumbani zinazoweza kuchapishwa. Premium ya Mwaka ni $199/mwaka au $29.99/mwezi, pamoja na dhamana ya siku 30.",
    "footer": "Misimbo ya viwango: Common Core (CCSS), NGSS, NCSS na National Core Arts Standards. Huu ni mwongozo wa ulinganifu, si uthibitisho. © {{year}} Montessori Life Skills.",
    "titles": {
      "Dry Pouring": "Kumimina vitu vikavu",
      "Greeting Others": "Kuwasalimu wengine",
      "Knobbed Cylinders": "Silinda zenye vishikio",
      "Pink Tower": "Mnara wa waridi",
      "Sandpaper Letters": "Herufi za msasa",
      "Red Rods": "Fimbo nyekundu",
      "Number Rods": "Fimbo za nambari",
      "Spindle Box": "Sanduku la vijiti",
      "Land and Water Forms": "Maumbo ya nchi kavu na maji",
      "Golden Beads": "Shanga za dhahabu",
      "Moveable Alphabet": "Herufi zinazohamishika",
      "Parts of a Plant": "Sehemu za mmea"
    },
    "areas": {
      "Practical Life": "Maisha ya vitendo",
      "Grace and Courtesy": "Uungwana na adabu",
      "Sensorial": "Ukuzaji wa hisi",
      "Language": "Lugha",
      "Math": "Hisabati",
      "Geography": "Jiografia",
      "Botany": "Botania"
    },
    "purposes": {
      "3": [
        "Uratibu wa mienendo, umakini na kujitegemea.",
        "Kujiamini na lugha ya heshima katika mahusiano.",
        "Kutofautisha ukubwa kwa kuona; kushika kwa kidole gumba na cha shahada ili kuandaa mkono kwa kuandika.",
        "Kutofautisha kwa kuona ukubwa unaoongezeka hatua kwa hatua katika vipimo vitatu.",
        "Kuhusianisha kila sauti na alama yake iliyoandikwa kwa kugusa."
      ],
      "4": [
        "Urefu unaoongezeka hatua kwa hatua; maandalizi ya moja kwa moja kwa Fimbo za nambari.",
        "Kiasi na alama za 1–10 kwa kutumia fimbo moja moja zenye urefu unaoweza kuhesabiwa.",
        "Kuhesabu vitu visivyofungamanishwa na kuelewa dhana ya sifuri.",
        "Kuhusianisha sauti na alama kwa hatua za awali za kusoma na kuandika.",
        "Kuelewa nchi kavu na maji ya dunia kwa kutumia vitu halisi."
      ],
      "5": [
        "Mfumo wa desimali: mamoja, makumi, mamia na maelfu.",
        "Kuunda maneno kwa sauti kabla mkono haujaweza kuyaandika.",
        "Kuthibitisha uelewa wa kiasi, alama na sifuri.",
        "Kutaja na kuchunguza sehemu za mimea hai.",
        "Maumbo ya nchi kavu na maji yaliyo katika jozi, kwa kugusa na kutaja."
      ]
    },
    "checks": {
      "3": [
        "Hubeba sinia au kiti kwa uangalifu",
        "Humimina vitu vikavu huku kiasi fulani kikimwagika",
        "Hufuata ombi lenye hatua mbili",
        "Huwasalimia watu wazima anaowafahamu",
        "Hupanga vitu kwa ukubwa au rangi",
        "Huonyesha hamu ya kujifunza sauti za herufi"
      ],
      "4": [
        "Humimina maji huku kiasi kidogo kikimwagika",
        "Hufanya shughuli moja kwa dakika 10+",
        "Hupanga vitu kwa mfuatano wa ukubwa",
        "Hutambua sauti kadhaa za herufi",
        "Huhesabu vitu hadi 10 akihusianisha kila kitu na nambari moja",
        "Hutumia tafadhali, asante na samahani"
      ],
      "5": [
        "Hukamilisha shughuli yenye hatua nyingi na kurudisha vifaa mahali pake",
        "Hutaja sauti za herufi nyingi",
        "Huunda maneno rahisi kwa sauti",
        "Huhesabu na kuoanisha kiasi na tarakimu zaidi ya 10",
        "Hushika penseli kwa vidole vitatu",
        "Huzungumza kwa zamu katika kikundi"
      ]
    }
  }
};
const hi: typeof en = {
  "shared": {
    "invalidEmail": "कृपया मान्य ईमेल पता दर्ज करें।",
    "genericError": "कुछ गलत हो गया। कृपया फिर कोशिश करें।",
    "close": "बंद करें",
    "email": "ईमेल"
  },
  "readiness": {
    "readyTitle": "आपकी मार्गदर्शिका तैयार है",
    "readyBody": "यह नए टैब में खुल गई है। एक प्रति रखने के लिए “PDF के रूप में सहेजें” का उपयोग करें।",
    "openAgain": "मार्गदर्शिका फिर खोलें",
    "seePremium": "प्रीमियम के साथ पूरा क्रम देखें",
    "eyebrow": "मुफ़्त मार्गदर्शिका",
    "titleHome": "किंडरगार्टन की तैयारी के लिए अपनी मुफ़्त मोंटेसरी मार्गदर्शिका पाएँ",
    "titleActivity": "देखें कि आपके बच्चे के सीखने के क्रम में यह पाठ कहाँ आता है",
    "body": "उम्र के अनुसार तैयारी की चेकलिस्ट और एक नमूना AMI सप्ताह, साथ में हर पाठ से जुड़े अमेरिकी मानक।",
    "ageGroup": "बच्चे की उम्र",
    "years": "{{age}} साल",
    "preparing": "तैयार हो रहा है…",
    "submit": "मुफ़्त मार्गदर्शिका पाएँ",
    "footnote": "समय-समय पर मोंटेसरी सुझाव। कभी भी सदस्यता छोड़ें।",
    "privacy": "गोपनीयता"
  },
  "cookies": {
    "region": "कुकी विकल्प",
    "title": "आपके गोपनीयता विकल्प",
    "body": "हम बिना कुकी के विज़िट गिनते हैं। अगर आप स्वीकार करते हैं, तो हम ऐप को बेहतर बनाने के लिए एनालिटिक्स कुकी भी इस्तेमाल करते हैं और रिकॉर्ड करते हैं कि किन पेजों और गतिविधियों का उपयोग किया जाता है। हमारी <1>गोपनीयता नीति</1> देखें।",
    "acceptAll": "सभी स्वीकार करें",
    "rejectAll": "सभी अस्वीकार करें",
    "settings": "कुकी सेटिंग्स",
    "dialogBody": "चुनें कि यह ऐप आपके डिवाइस पर क्या इस्तेमाल कर सकता है। आप कुकी सेटिंग्स लिंक से इसे कभी भी बदल सकते हैं।",
    "gpc": "आपका ब्राउज़र गोपनीयता संकेत (Global Privacy Control) भेज रहा है, इसलिए एनालिटिक्स बंद रहेगा।",
    "necessary": "ज़रूरी",
    "necessaryBody": "आपको साइन इन रखता है और ऑफ़लाइन इस्तेमाल के लिए आपकी सेटिंग्स और पाठ सहेजता है। हमेशा चालू।",
    "alwaysOn": "हमेशा चालू",
    "analytics": "एनालिटिक्स",
    "analyticsBody": "Google और Montessori Life Skills द्वारा प्रदान किया जाता है। इसमें एनालिटिक्स कुकीज़ और इस्तेमाल किए गए पेजों व गतिविधियों का रिकॉर्ड शामिल है। Lovable द्वारा बिना कुकीज़ के की जाने वाली विज़िट की गिनती दोनों स्थितियों में जारी रहती है।",
    "save": "विकल्प सहेजें"
  },
  "consult": {
    "errName": "कृपया अपना नाम दर्ज करें",
    "errNameLong": "नाम 100 अक्षरों से कम होना चाहिए",
    "errEmail": "कृपया मान्य ईमेल पता दर्ज करें",
    "errAge": "बच्चे की उम्र 60 अक्षरों से कम होनी चाहिए",
    "errTopics": "कृपया बताएं कि आप किस बारे में चर्चा करना चाहते हैं",
    "errTopicsLong": "विषय 2000 अक्षरों से कम होने चाहिए",
    "errTimes": "पसंदीदा समय 500 अक्षरों से कम होने चाहिए",
    "sendFailed": "हम आपका अनुरोध नहीं भेज सके। कृपया फिर कोशिश करें।",
    "sentTitle": "अनुरोध भेज दिया गया",
    "sentBody": "धन्यवाद। आपका अनुरोध केरी तक पहुँच गया है। समय तय करने के लिए वे <1>{{email}}</1> पर जवाब देंगी।",
    "title": "निजी परामर्श बुक करें",
    "body": "अपने बच्चे के बारे में थोड़ा बताएं और बताएं कि आपको किस चीज़ में मदद चाहिए। समय तय करने के लिए केरी ईमेल से जवाब देंगी।",
    "name": "आपका नाम",
    "childAge": "बच्चे की उम्र",
    "optional": "(वैकल्पिक)",
    "agePlaceholder": "जैसे, 4 साल",
    "package": "पैकेज",
    "single": "एक सत्र",
    "bundle": "तीन सत्र",
    "topics": "आप किस बारे में चर्चा करना चाहते हैं?",
    "topicsPlaceholder": "लक्ष्य, दिनचर्या, अपनी जगह तैयार करना, पाठ्यक्रम से जुड़े सवाल…",
    "times": "पसंदीदा तारीखें और समय",
    "timesPlaceholder": "जैसे, कार्यदिवसों की सुबह, सेंट्रल समय",
    "cancel": "रद्द करें",
    "sending": "भेजा जा रहा है…",
    "send": "अनुरोध भेजें"
  },
  "exit": {
    "doneTitle": "आप सूची में जुड़ गए हैं",
    "doneBody": "धन्यवाद — हम अपडेट और शुरुआती एक्सेस के बारे में आपसे संपर्क करेंगे।",
    "back": "पेज पर वापस जाएं",
    "title": "जाने से पहले",
    "body": "Montessori Life Skills की नई गतिविधियों का शुरुआती एक्सेस और अपडेट पाने के लिए सूची से जुड़ें। कोई स्पैम नहीं — आप कभी भी सदस्यता छोड़ सकते हैं।",
    "placeholder": "आपका ईमेल पता",
    "emailLabel": "ईमेल पता",
    "submitting": "आपको जोड़ा जा रहा है…",
    "submit": "मुझे अपडेट भेजें",
    "footnote": "शुरुआती एक्सेस और समय-समय पर अपडेट। कभी भी सदस्यता छोड़ें।"
  },
  "guidePage": {
    "title": "मोंटेसरी किंडरगार्टन तैयारी मार्गदर्शिका",
    "body": "आपके बच्चे की उम्र के अनुसार तैयारी की चेकलिस्ट और AMI प्राइमरी के एक सप्ताह का नमूना, जिसमें हर पाठ से जुड़े अमेरिकी मानक दिए गए हैं।",
    "b1": "उम्र के अनुसार तैयारी की चेकलिस्ट",
    "b2": "AMI क्रम से पाँच नमूना पाठ",
    "b3": "हर पाठ का Common Core और NGSS मानकों से मेल",
    "b4": "प्रिंट करने योग्य – PDF के रूप में सहेजें",
    "childAge": "आपके बच्चे की उम्र",
    "included": "{{age}} साल की उम्र के लिए शामिल:",
    "points": "+ {{count}} बिंदुओं वाली तैयारी की चेकलिस्ट",
    "footnote": "हम समय-समय पर आपको मोंटेसरी सुझाव ईमेल करेंगे। कभी भी सदस्यता छोड़ें।",
    "privacy": "गोपनीयता नीति"
  },
  "guide": {
    "docTitle": "मोंटेसरी तैयारी मार्गदर्शिका – उम्र {{age}} साल",
    "save": "PDF के रूप में सहेजें",
    "sub": "अमेरिकी मानकों से मेल के साथ AMI प्राइमरी के एक सप्ताह का नमूना · Montessori Life Skills",
    "intro": "जैसा कि Dr. Maria Montessori ने कहा था, हाथ मन का उपकरण है। यह मार्गदर्शिका {{age}} साल के बच्चे के लिए AMI प्राइमरी क्रम के एक सप्ताह का नमूना दिखाती है, साथ ही हर पाठ से जुड़े अमेरिकी मानक भी बताती है।",
    "checklist": "तैयारी की चेकलिस्ट",
    "observe": "अवलोकन करें, परीक्षा न लें। हर बच्चा अपनी गति से आगे बढ़ता है।",
    "week": "एक सप्ताह का नमूना",
    "day": "दिन",
    "lesson": "पाठ",
    "gains": "बच्चा क्या सीखता है",
    "standards": "मानक",
    "days": [
      "सोम",
      "मंगल",
      "बुध",
      "गुरु",
      "शुक्र"
    ],
    "indirect": "अप्रत्यक्ष तैयारी",
    "ctaTitle": "पूरा क्रम।",
    "cta": "प्रीमियम में AMI प्राइमरी के सभी प्रस्तुतीकरण क्रम से, चरण-दर-चरण मार्गदर्शिकाएँ, पाठ के वीडियो और प्रिंट करने योग्य होमस्कूल पोर्टफ़ोलियो शामिल हैं। प्रीमियम वार्षिक $199/वर्ष या $29.99/माह है, 30 दिनों की गारंटी के साथ।",
    "footer": "मानक कोड: Common Core (CCSS), NGSS, NCSS और National Core Arts Standards। यह मानकों से मेल का मानचित्र है, प्रमाणन नहीं। © {{year}} Montessori Life Skills.",
    "titles": {
      "Dry Pouring": "सूखी सामग्री उँडेलना",
      "Greeting Others": "दूसरों का अभिवादन करना",
      "Knobbed Cylinders": "घुंडी वाले बेलन [Knobbed Cylinders / Cylinder Blocks]",
      "Pink Tower": "गुलाबी मीनार [Pink Tower]",
      "Sandpaper Letters": "रेगमाल के अक्षर [Sandpaper Letters]",
      "Red Rods": "लाल छड़ें [Red Rods]",
      "Number Rods": "संख्या छड़ें [Number Rods]",
      "Spindle Box": "स्पिंडल बॉक्स [Spindle Box]",
      "Land and Water Forms": "स्थल और जल की आकृतियाँ [Land and Water Forms]",
      "Golden Beads": "सुनहरे मनके [Golden Beads]",
      "Moveable Alphabet": "चल वर्णमाला [Moveable Alphabet]",
      "Parts of a Plant": "पौधे के भाग"
    },
    "areas": {
      "Practical Life": "व्यावहारिक जीवन",
      "Grace and Courtesy": "शालीनता और शिष्टाचार",
      "Sensorial": "इंद्रिय विकास",
      "Language": "भाषा",
      "Math": "गणित",
      "Geography": "भूगोल",
      "Botany": "वनस्पति विज्ञान"
    },
    "purposes": {
      "3": [
        "शारीरिक गतिविधियों का समन्वय, एकाग्रता और स्वतंत्रता।",
        "आत्मविश्वास और सम्मानपूर्ण सामाजिक संवाद।",
        "आकारों का अंतर देखकर पहचानना; अंगूठे और तर्जनी की पकड़, जो हाथ को लिखने के लिए तैयार करती है।",
        "तीन आयामों में क्रमिक आकारों का अंतर देखकर पहचानना।",
        "स्पर्श के माध्यम से हर ध्वनि को उसके लिखित प्रतीक से जोड़ना।"
      ],
      "4": [
        "लंबाई का क्रमिक अंतर; संख्या छड़ों [Number Rods] के लिए प्रत्यक्ष तैयारी।",
        "अलग-अलग गिनी जा सकने वाली लंबाइयों के रूप में 1–10 की मात्रा और प्रतीक।",
        "अलग-अलग वस्तुओं को गिनना और शून्य की अवधारणा समझना।",
        "शुरुआती पढ़ने और लिखने के लिए ध्वनि और प्रतीक का संबंध।",
        "पृथ्वी के स्थल और जल की ठोस समझ।"
      ],
      "5": [
        "दशमलव प्रणाली: इकाई, दहाई, सैकड़ा और हज़ार।",
        "हाथ से लिखने में सक्षम होने से पहले ध्वनियों के आधार पर शब्द बनाना।",
        "मात्रा, प्रतीक और शून्य की समझ पक्की करना।",
        "जीवित पौधों के भागों के नाम जानना और उनका अवलोकन करना।",
        "स्पर्श और नामकरण के माध्यम से स्थल और जल की जोड़ीदार आकृतियाँ समझना।"
      ]
    },
    "checks": {
      "3": [
        "ट्रे या कुर्सी सावधानी से उठाकर ले जाता है",
        "सूखी सामग्री उँडेलता है, थोड़ी सामग्री गिरती है",
        "दो चरणों वाले निर्देश का पालन करता है",
        "परिचित वयस्कों का अभिवादन करता है",
        "वस्तुओं को आकार या रंग के अनुसार छाँटता है",
        "अक्षरों की ध्वनियों में रुचि दिखाता है"
      ],
      "4": [
        "पानी उँडेलता है, बहुत कम पानी छलकता है",
        "एक गतिविधि पर 10+ मिनट तक कार्य करता है",
        "वस्तुओं को आकार के क्रम में रखता है",
        "कई अक्षरों की ध्वनियाँ पहचानता है",
        "हर वस्तु के लिए एक संख्या बोलते हुए 10 तक वस्तुएँ गिनता है",
        "कृपया, धन्यवाद और माफ़ कीजिए कहता है"
      ],
      "5": [
        "कई चरणों वाली गतिविधि पूरी करके सामग्री वापस रखता है",
        "अधिकांश अक्षरों की ध्वनियाँ बताता है",
        "ध्वनियों के आधार पर सरल शब्द बनाता है",
        "10 से आगे गिनता है और मात्रा को अंकों से मिलाता है",
        "पेंसिल को तीन उँगलियों की पकड़ से पकड़ता है",
        "समूह में अपनी बारी आने पर बोलता है"
      ]
    }
  }
};
export const growth = { en, es, de, zh, sw, hi };
