import i18n, { type BackendModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './bundles/en';

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'zh', label: '简体中文', short: '中文' },
  { code: 'sw', label: 'Kiswahili', short: 'SW' },
  { code: 'hi', label: 'हिन्दी', short: 'हि' },
] as const;

// English ships with the app; every other language downloads only when chosen (and is kept for offline use).
const loaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  es: () => import('./bundles/es'),
  de: () => import('./bundles/de'),
  zh: () => import('./bundles/zh'),
  sw: () => import('./bundles/sw'),
  hi: () => import('./bundles/hi'),
};

const languageLoader: BackendModule = {
  type: 'backend',
  init: () => {},
  read: (lng, _ns, done) => {
    const load = loaders[lng.slice(0, 2)];
    if (!load) { done(null, {}); return; }
    load().then((m) => done(null, m.default), (err) => done(err, false));
  },
};

/** Resolves once the chosen language's text is ready (immediately for English). Never rejects. */
export const i18nReady: Promise<unknown> = i18n
  .use(languageLoader)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    partialBundledLanguages: true,
    fallbackLng: 'en',
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'], lookupLocalStorage: 'app-language' },
  })
  .catch(() => undefined);

const syncHtmlLang = (lng: string) => { if (typeof document !== 'undefined') document.documentElement.lang = lng === 'zh' ? 'zh-Hans' : lng; };
syncHtmlLang(i18n.resolvedLanguage || 'en');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
