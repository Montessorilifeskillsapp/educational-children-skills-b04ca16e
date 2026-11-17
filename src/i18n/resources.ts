// Montessori material and area names use established AMI terminology in each language.
const en = {
  nav: { practicalLife: 'Practical Life', sensorial: 'Sensorial', math: 'Math', language: 'Language', botany: 'Botany', geography: 'Geography', science: 'Science', art: 'Art', graceCourtesy: 'Grace & Courtesy', shop: 'Shop', classroomSetup: 'Classroom Setup' },
  common: { signIn: 'Sign In', startFree: 'Start Free', schoolPortal: 'School Portal', language: 'Language' },
};
const es: typeof en = {
  nav: { practicalLife: 'Vida Práctica', sensorial: 'Sensorial', math: 'Matemáticas', language: 'Lenguaje', botany: 'Botánica', geography: 'Geografía', science: 'Ciencias', art: 'Arte', graceCourtesy: 'Gracia y Cortesía', shop: 'Tienda', classroomSetup: 'Preparación del Ambiente' },
  common: { signIn: 'Iniciar sesión', startFree: 'Empezar gratis', schoolPortal: 'Portal Escolar', language: 'Idioma' },
};
const de: typeof en = {
  nav: { practicalLife: 'Übungen des täglichen Lebens', sensorial: 'Sinnesmaterial', math: 'Mathematik', language: 'Sprache', botany: 'Botanik', geography: 'Geographie', science: 'Naturwissenschaft', art: 'Kunst', graceCourtesy: 'Anmut und Höflichkeit', shop: 'Shop', classroomSetup: 'Vorbereitete Umgebung' },
  common: { signIn: 'Anmelden', startFree: 'Kostenlos starten', schoolPortal: 'Schulportal', language: 'Sprache' },
};
const zh: typeof en = {
  nav: { practicalLife: '日常生活', sensorial: '感官', math: '数学', language: '语言', botany: '植物学', geography: '地理', science: '科学', art: '艺术', graceCourtesy: '优雅与礼仪', shop: '商店', classroomSetup: '环境预备' },
  common: { signIn: '登录', startFree: '免费开始', schoolPortal: '学校门户', language: '语言' },
};

export const resources = { en: { translation: en }, es: { translation: es }, de: { translation: de }, zh: { translation: zh } };
