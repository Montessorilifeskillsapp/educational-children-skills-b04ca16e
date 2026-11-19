import i18n from './index';
import type { Locale } from 'date-fns';
import { de, enUS, es, hi, zhCN } from 'date-fns/locale';

const LOCALES: Record<string, string> = { en: 'en-US', es: 'es', de: 'de-DE', zh: 'zh-CN', sw: 'sw-KE', hi: 'hi-IN' };

/** Locale for dates and numbers that follows the language chosen in the app. */
export const locale = (): string => LOCALES[(i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2)] ?? 'en-US';

/** Curriculum area title in the current language; falls back to the stored English title. */
export const areaTitle = (key: string | undefined | null, fallback = ''): string =>
  key ? (i18n.t(`shared.areas.${key}`, { defaultValue: fallback || key }) as string) : fallback;

// date-fns has no Swahili locale; Swahili dates from date-fns fall back to English, Intl formatting uses sw-KE.
const DATE_FNS: Record<string, Locale> = { en: enUS, es, de, zh: zhCN, hi };

/** date-fns locale that follows the language chosen in the app. */
export const dateLocale = (): Locale => DATE_FNS[(i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2)] ?? enUS;
