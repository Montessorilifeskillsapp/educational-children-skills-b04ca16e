// Every language at once. Used by tests and checks only — the running app loads one language at a time (see ./index.ts).
import en from './bundles/en';
import es from './bundles/es';
import de from './bundles/de';
import zh from './bundles/zh';
import sw from './bundles/sw';
import hi from './bundles/hi';
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

export const resources = {
  en: { translation: en },
  es: { translation: es },
  de: { translation: de },
  zh: { translation: zh },
  sw: { translation: sw },
  hi: { translation: hi },
};
export const sourceNamespaces = { home, auth, pricing, growth, chrome, pages, lesson, school, dashboard, family, shared };
