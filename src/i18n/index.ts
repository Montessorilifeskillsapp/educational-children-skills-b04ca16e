import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './resources';

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'zh', label: '简体中文', short: '中文' },
  { code: 'sw', label: 'Kiswahili', short: 'SW' },
  { code: 'hi', label: 'हिन्दी', short: 'हि' },
] as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'], lookupLocalStorage: 'app-language' },
  });

const syncHtmlLang = (lng: string) => { if (typeof document !== 'undefined') document.documentElement.lang = lng === 'zh' ? 'zh-Hans' : lng; };
syncHtmlLang(i18n.resolvedLanguage || 'en');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
