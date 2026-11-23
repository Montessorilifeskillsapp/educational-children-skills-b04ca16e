// "home" namespace, es: must match the English shape in ./en.ts.
import type { en } from './en';

export const es: typeof en = {
  header: { curriculumSections: 'Áreas del currículo', openSectionMenu: 'Abrir menú de áreas', openMenu: 'Abrir menú' },
  hero: {
    badge: 'Presentaciones auténticas AMI/AMS',
    title: 'Sabrás exactamente qué enseñar y cómo presentarlo.',
    subtitle: 'Actividades Montessori paso a paso para niños de 2 a 6 años, creadas para madres, padres, guías y asistentes de aula.',
    body: 'Descubre qué preparar, cómo presentar cada actividad, qué observar y qué viene después.',
    seeHow: 'Ver cómo funciona',
    statActivities: 'Más de 100 actividades', statAges: 'De 2 a 6 años', statAreas: '9 áreas del currículo', statGuidance: 'Guía paso a paso',
  },
  problem: {
    eyebrow: 'Un punto de partida más claro',
    title: 'Montessori no debería exigir horas de búsqueda.',
    body: 'Quieres ofrecer a un niño un trabajo significativo, pero la información dispersa hace difícil saber qué preparar y cuándo.',
    q1: '¿Qué actividad viene después?', q2: '¿Está listo el niño?', q3: '¿Qué materiales se necesitan?', q4: '¿Cómo se presenta correctamente?',
    q5: '¿Qué conviene decir y qué no?', q6: '¿Qué debes observar?', q7: '¿Cuándo pasar a lo siguiente?',
    closing: 'Montessori Life Skills pone esas respuestas en tus manos.',
    steps: [
      {
        "title": "La secuencia",
        "body": "El trabajo Montessori avanza de lo simple a lo complejo, de lo seco a lo húmedo y de lo concreto a lo abstracto. Cada actividad prepara la mano y la mente para la siguiente.",
        "points": [
          "El trasvase de granos va antes del trasvase de agua.",
          "Trasvasar entre dos jarras va antes de servir en varios vasos o usar un embudo.",
          "El currículo presenta las actividades de cada área en el orden en que se presentan."
        ],
        "link": "Explorar la secuencia"
      },
      {
        "title": "Preparación del niño",
        "body": "Que el niño esté listo se observa; no lo decide la edad. Obsérvalo trabajar antes de ofrecerle algo nuevo.",
        "points": [
          "Lleva una bandeja con las dos manos, nivelada y estable.",
          "Domina el trabajo anterior de la secuencia, como el trasvase de granos.",
          "Puede permanecer tranquilo con una actividad hasta terminarla.",
          "Muestra interés: observa a otros o se acerca al material."
        ],
        "link": "Abrir la guía de preparación"
      },
      {
        "title": "Preparar el ambiente",
        "body": "Prepara la actividad completa antes de invitar al niño, para que todo lo necesario esté listo en la bandeja.",
        "points": [
          "Materiales reales de tamaño infantil: dos jarras pequeñas iguales, una con agua.",
          "Una bandeja que lo contenga todo, con una esponja para las gotas y un paño para secar.",
          "Un estante bajo y abierto donde el niño pueda tomar la bandeja y devolverla solo.",
          "Todo limpio, completo y en buen estado."
        ],
        "link": "Ver la actividad de ejemplo"
      },
      {
        "title": "La presentación",
        "body": "Presenta despacio, con movimientos precisos, para que el niño vea claramente cada paso.",
        "points": [
          "Siéntate junto al niño para que vea bien tus manos.",
          "Separa las palabras del movimiento: primero habla y luego muévete en silencio.",
          "Ve más despacio en el momento clave, cuando el agua llega al pico.",
          "Completa todo el ciclo, incluso secar las gotas y devolver la bandeja al estante."
        ],
        "link": "Ver la presentación completa"
      },
      {
        "title": "La invitación y tus palabras",
        "body": "Empieza con una invitación sencilla y deja que el material hable. Con menos palabras, la atención del niño se queda en tus manos.",
        "points": [
          "Ponte a la altura de sus ojos e invita: «¿Te gustaría aprender a trasvasar agua?»",
          "Si el niño dice que no, acéptalo con calma y ofrécelo en otro momento.",
          "Nombra la actividad y luego guarda silencio mientras la muestras.",
          "Evita elogiar o corregir durante el trabajo; derramar forma parte del aprendizaje."
        ],
        "link": "Ver la presentación completa"
      },
      {
        "title": "La observación",
        "body": "Cuando el niño empiece, da un paso atrás. Observa sin interrumpir; el propio material le muestra al niño cuándo algo debe corregirse.",
        "points": [
          "Agarre y control: cómo sostiene e inclina la jarra.",
          "Concentración: cuánto tiempo permanece con el trabajo.",
          "Repetición: si decide volver a trasvasar.",
          "Control del error: qué hace ante un derrame, con la esponja de la bandeja."
        ],
        "link": "Ver dónde encaja la observación"
      },
      {
        "title": "Pasar a lo siguiente",
        "body": "Pasa a lo siguiente cuando el niño trabaje con independencia y complete todo el ciclo, del estante y de vuelta al estante.",
        "points": [
          "Toma la bandeja del estante y la devuelve lista para la siguiente persona.",
          "Trasvasa con control y seca los derrames sin que se lo pidan.",
          "La repetición disminuye y su interés se dirige a otra cosa: ofrece la siguiente actividad.",
          "Si el trabajo se vuelve descuidado, preséntalo de nuevo otro día en lugar de avanzar."
        ],
        "link": "Ver qué viene después"
      }
    ],
  },
  sample: {
    eyebrow: 'Mira una actividad real', title: 'Esto es lo que usarás.',
    subtitle: 'Trasvasar agua · Propósito: coordinación, concentración e independencia.',
    imageAlt: 'Un niño vierte agua de una pequeña jarra de vidrio a otra sobre una bandeja de madera, con una mano en el asa y la otra sosteniendo la jarra',
    materialsTitle: 'Materiales', materialsText: 'Dos jarras iguales de tamaño infantil, agua, una bandeja, una esponja y un paño para secar.',
    preparationTitle: 'Preparación', preparationText: 'Dispón la actividad completa antes de invitar al niño.',
    presentationTitle: 'Presentación', presentationText: 'Muestra despacio cómo agarrar, levantar, verter con control, devolver y limpiar.',
    observationTitle: 'Observación', observationText: 'Fíjate en el control del movimiento, la concentración, la repetición y la limpieza independiente.',
    nextLabel: 'Siguiente actividad', nextText: 'La progresión completa continúa con el acceso total.',
    cta: 'Empieza con una actividad gratis',
  },
  how: {
    eyebrow: 'Tu primer ciclo de trabajo', title: 'Prepara. Presenta. Observa.',
    body: 'Usa una actividad inicial gratuita para vivir el proceso completo antes de elegir Premium.',
    prepareTitle: 'Prepara', prepareText: 'Abre la actividad, reúne los materiales indicados y repasa la presentación escrita.',
    presentTitle: 'Presenta', presentText: 'Trabaja con el niño fuera de la pantalla, siguiendo la secuencia con calma y claridad.',
    observeTitle: 'Observa', observeText: 'Registra la actividad al terminar y usa la secuencia para decidir qué viene después.',
    move: 'Pasa de <1>buscar una actividad</1> a <3>saber qué preparar y presentar.</3>',
    cta: 'Completa tu primera actividad',
  },
  curriculum: {
    eyebrow: 'Un currículo conectado', title: 'Deja de coleccionar actividades. Sigue una secuencia.',
    body: 'Las ideas sueltas responden a una sola pregunta. Montessori Life Skills organiza el trabajo de lo introductorio a lo avanzado, para que el adulto vea qué va junto y qué viene después.',
    explore: 'Explorar la secuencia →', imageAlt: 'Materiales Montessori de {{area}}',
  },
  areas: {
    practicalLife: 'Vida Práctica', sensorial: 'Sensorial', mathematics: 'Matemáticas', language: 'Lenguaje',
    geography: 'Geografía', botany: 'Botánica', art: 'Arte', graceCourtesy: 'Gracia y Cortesía',
  },
  founder: {
    eyebrow: 'Conoce a la fundadora', imageAlt: 'Kerry Howard, guía Montessori con formación AMI y fundadora',
    badge: 'Guía de Casa de Niños (3–6) con formación AMI',
    lead: 'Cada actividad de esta app está moldeada por la formación de Kerry y sus 40 años guiando a niños en el ambiente preparado, para que puedas confiar en que lo que presentas en casa es fiel al método de la Dra. Maria Montessori, no una aproximación de Pinterest.',
    body: 'Su misión: hacer que el Montessori auténtico sea accesible para todas las familias, sin necesidad de un aula.',
    cta: 'Leer la biografía de Kerry',
  },
  pricing: {
    eyebrow: 'Acceso Premium', title: 'Continúa con el currículo completo.',
    body: 'Después de probar una actividad inicial, Premium abre la secuencia completa y organizada por menos de lo que cuesta un mes típico de preescolar Montessori, con una guía de estándares para educación en casa y un portafolio imprimible.',
    guarantee: 'Garantía de devolución de 30 días · Cancela cuando quieras',
    bestValue: 'Mejor valor', annualTitle: 'Premium Anual', perYear: '/año', perMonth: '/mes', perSession: '/sesión',
    annualEquivalent: 'Equivale a $16.58/mes', annualNote: 'Un niño. Ahorra $160.88 frente a 12 pagos mensuales.',
    fFullCurriculum: 'Currículo completo', fActivities: 'Más de 100 actividades', fAllAreas: 'Todas las áreas del currículo', fProgress: 'Seguimiento del progreso',
    fPresentations: 'Presentaciones escritas', fMaterials: 'Información sobre materiales', fVideos: 'Videos de instrucción cuando estén disponibles',
    startPremium: 'Empezar Premium',
    flexible: 'Flexible', monthlyTitle: 'Premium Mensual', monthlyBody: 'El mismo acceso Premium, con pago mensual. Cancela cuando quieras.', monthlyCta: 'Ver opción mensual',
    familyEyebrow: 'Hasta cuatro niños', familyTitle: 'Plan Familia', familyBody: 'O $49/mes. Perfiles, metas y progreso separados para cada niño.', familyCta: 'Ver opciones Familia',
    consultEyebrow: 'Personalizada', consultTitle: 'Consulta privada',
    consultBody: 'Una sesión por video de 60 minutos con una guía con formación AMI, adaptada a tu hijo y a tus objetivos.',
    cGuidance: 'Orientación curricular personalizada', cRoutine: 'Integración en la rutina familiar', cPlan: 'Plan de acción escrito', cFollowUp: 'Dos semanas de seguimiento por correo',
    cPackage: 'Paquete de 3 sesiones: $600', consultCta: 'Reservar una consulta',
  },
  beyond: {
    eyebrow: 'Más allá de la primera actividad', title: 'Vuelve a la secuencia. Comparte lo que funciona.',
    continueTitle: 'Continúa el trabajo', continueText: 'Vuelve al perfil de cada niño, registra su progreso y elige la siguiente actividad adecuada.',
    shareTitle: 'Comparte con otros', shareText: 'Comparte Montessori Life Skills con otra madre o padre, guía, cuidador o asistente de aula.',
    schoolsTitle: 'Para escuelas', schoolsText: 'Presentaciones auténticas alineadas con la Association Montessori Internationale (AMI) y la American Montessori Society (AMS), adecuadas para escuelas AMI, AMS y Montessori independientes. Contáctanos para hablar de las necesidades de tu escuela.',
    contactUs: 'Contáctanos',
  },
  faq: {
    eyebrow: 'Preguntas', title: 'Preguntas frecuentes',
    q1: '¿Necesito formación Montessori para usar esta app?', a1: 'No. Las actividades incluyen los pasos de presentación por escrito y notas didácticas para madres, padres, cuidadores, asistentes y guías.',
    q2: '¿Para qué edades está pensada?', a2: 'El currículo está pensado para adultos que acompañan a niños de 3 a 6 años. Las actividades se organizan según la preparación del desarrollo, no según un calendario rígido por edades.',
    q3: '¿Puedo usarla con varios niños?', a3: 'Sí. Premium cubre a un niño, mientras que Familia cubre hasta cuatro niños, con progreso separado para cada uno.',
    q4: '¿Las canciones de Kerry están incluidas en Premium?', a4: 'No. La colección de 10 canciones es una compra única aparte de $99.99, con acceso de por vida y descargas para tu hogar. Cualquiera puede escuchar las muestras gratuitas de 10 segundos.',
    q5: '¿Funciona sin internet?', a5: 'Se necesita conexión a internet para el contenido actualizado de las actividades, los enlaces de compra, las funciones de la cuenta y los videos protegidos.',
    q6: '¿Cómo está organizado el currículo?', a6: 'Las actividades van del trabajo introductorio al avanzado dentro de cada área, con los materiales y la guía de presentación reunidos en un solo lugar.',
    q7: '¿Y si no quedo satisfecho?', a7: 'Los planes Premium incluyen una garantía de devolución de 30 días. Consulta la página de la garantía para más detalles.',
    q8: '¿Mi hijo usa esta app?', a8: 'No. Montessori Life Skills es un recurso de enseñanza para el adulto. Tú lees la presentación, preparas los materiales y guías a tu hijo con las manos, lejos de la pantalla. La app nunca se convierte en tiempo de pantalla para el niño.',
    q9: '¿Las presentaciones están alineadas con AMI y AMS?', a9: 'Sí. Las presentaciones siguen el enfoque Montessori de la Association Montessori Internationale (AMI), fundada por la Dra. Maria Montessori, y de la American Montessori Society (AMS). Las escribió una guía con formación AMI para niños de 3 a 6 años, para el hogar y el aula.',
  },
  cta: {
    title: '¿Listo para preparar tu próxima presentación?',
    body: 'Usa la guía para el adulto para elegir una actividad, reunir los materiales y presentar la lección con claridad mientras el niño aprende con las manos.',
    explore: 'Explorar actividades gratis', viewPlans: 'Ver planes y precios',
    noCard: 'Sin tarjeta de crédito', cancelAnytime: 'Cancela cuando quieras', guarantee: 'Garantía de 30 días', community: 'Únete a nuestra comunidad',
  },
  aiDisclaimer: 'Algunas imágenes han sido modificadas con IA.',
  footer: {
    tagline: 'Un recurso de preparación y presentación para madres, padres, educadores, cuidadores y asistentes de aula que acompañan a niños de 3 a 6 años.',
    product: 'Producto', activities: 'Actividades', progress: 'Seguimiento del progreso', pricing: 'Precios', about: 'Acerca de', readinessGuide: 'Guía de preparación gratuita',
    support: 'Ayuda', help: 'Centro de ayuda', contact: 'Contáctanos', guarantee: 'Garantía de 30 días', privacy: 'Política de privacidad', terms: 'Términos del servicio',
    accessibility: 'Accesibilidad', cookies: 'Configuración de cookies',
    trustRefund: 'Reembolso en 30 días', trustCancel: 'Cancela cuando quieras', trustNoCard: 'Sin tarjeta para el plan gratuito', trustBuilt: 'Creado por una guía AMI',
    complianceLabel: 'Privacidad y protección de los estudiantes',
    complianceRegions: { us: 'Estados Unidos', eu: 'UE y Reino Unido', de: 'Alemania', es: 'España y América Latina', cn: 'China', in: 'India', ea: 'Kenia y Uganda' },
    complianceNoAds: 'Sin anuncios ni seguimiento de niños',
    rights: '© {{year}} Montessori Life Skills. Todos los derechos reservados.',
  },
};
