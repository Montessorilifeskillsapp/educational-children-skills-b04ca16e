// "chrome" namespace, es: must match the English shape in ./en.ts.
import type { en } from './en';

export const es: typeof en = {
  back: 'Atrás', home: 'Inicio', goHome: 'Ir a la pantalla de inicio', curriculumSections: 'Áreas del currículo', sequence: 'Secuencia: {{sequence}}',
  continueLearning: 'Continuar aprendiendo',
  titles: {
    practicalLife: 'Vida Práctica', sensorial: 'Desarrollo sensorial', mathematics: 'Matemáticas', language: 'Lenguaje', geography: 'Geografía',
    botany: 'Botánica', art: 'Arte', cultural: 'Estudios culturales', graceCourtesy: 'Gracia y Cortesía', allPracticalLife: 'Todas las actividades de Vida Práctica',
  },
  menu: {
    menu: 'Menú', login: 'Iniciar sesión', dashboard: 'Panel', cultural: 'Cultura', plans: 'Planes', familyDashboard: 'Panel familiar', profiles: 'Perfiles',
    schoolAdmin: 'Administración escolar', appAdmin: 'Administración de la app', accessCodes: 'Códigos de acceso', terms: 'Términos del servicio', privacy: 'Política de privacidad',
  },
  shop: {
    region: 'Tienda de libros de cuentos Montessori Life Skills', title: 'Compra los libros de cuentos de Montessori Life Skills', graceTitle: 'Compra materiales de Gracia y Cortesía',
    body: 'Libros de cuentos bellamente ilustrados que dan vida a las habilidades Montessori para la vida.', browse: 'Ver libros',
  },
  card: {
    premium: 'Actividad Premium', completed: '✓ Completada', materialAlt: 'Material Montessori: {{title}}', iconAlt: 'Icono de la actividad {{title}}',
    aria: '{{title}}: actividad de {{category}}, nivel {{difficulty}}. {{status}}. {{action}}',
    done: 'Completada', notDone: 'Sin completar', lockedAction: 'Actividad Premium, ábrela para ver cómo desbloquearla', start: 'Haz clic para empezar',
    difficulty: { Beginner: 'Inicial', Intermediate: 'Intermedio', Advanced: 'Avanzado', Easy: 'Fácil', Medium: 'Medio' },
  },
  notFound: {
    title: '¡Vaya! Página no encontrada', body: 'Parece que la página que buscas se fue a su propia aventura de aprendizaje. ¡Volvamos a explorar!',
    goHome: 'Ir al inicio', goBack: 'Volver', looking: 'Quizás buscabas:',
    s1: '• Actividades de Vida Práctica', s2: '• Actividades de aprendizaje', s3: '• Panel de progreso', s4: '• Planes Premium',
  },
};
