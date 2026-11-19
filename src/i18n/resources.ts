import { home } from './locales/home';
import { auth } from './locales/auth';
import { pricing } from './locales/pricing';
import { growth } from './locales/growth';
import { chrome } from './locales/chrome';
import { pages } from './locales/pages';
import { lesson } from './locales/lesson';
import { school } from './locales/school';
import { dashboard } from './locales/dashboard';
import { family } from './locales/family';
import { shared } from './locales/shared';

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
const sw: typeof en = {
  nav: { practicalLife: 'Maisha ya Vitendo', sensorial: 'Ukuzaji wa Hisi', math: 'Hisabati', language: 'Lugha', botany: 'Botania', geography: 'Jiografia', science: 'Sayansi', art: 'Sanaa', graceCourtesy: 'Uungwana na Adabu', shop: 'Duka', classroomSetup: 'Mazingira Yaliyoandaliwa' },
  common: { signIn: 'Ingia', startFree: 'Anza bila malipo', schoolPortal: 'Lango la Shule', language: 'Lugha' },
};
const hi: typeof en = {
  nav: { practicalLife: 'व्यावहारिक जीवन', sensorial: 'इंद्रिय विकास', math: 'गणित', language: 'भाषा', botany: 'वनस्पति विज्ञान', geography: 'भूगोल', science: 'विज्ञान', art: 'कला', graceCourtesy: 'शालीनता और शिष्टाचार', shop: 'दुकान', classroomSetup: 'तैयार वातावरण' },
  common: { signIn: 'साइन इन करें', startFree: 'मुफ़्त शुरू करें', schoolPortal: 'स्कूल पोर्टल', language: 'भाषा' },
};


const namespaces = { home, auth, pricing, growth, chrome, pages, lesson, school, dashboard, family, shared };
type Lang = 'en' | 'es' | 'de' | 'zh' | 'sw' | 'hi';
const build = (lng: Lang) => ({
  ...{ en, es, de, zh, sw, hi }[lng],
  ...Object.fromEntries(Object.entries(namespaces).map(([k, v]) => [k, v[lng]])),
});

export const resources = {
  en: { translation: build('en') },
  es: { translation: build('es') },
  de: { translation: build('de') },
  zh: { translation: build('zh') },
  sw: { translation: build('sw') },
  hi: { translation: build('hi') },
};
export const sourceNamespaces = namespaces;
