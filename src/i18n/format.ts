import i18n from './index';
import type { Locale } from 'date-fns';
import { de, enUS, es, hi, zhCN } from 'date-fns/locale';

const LOCALES: Record<string, string> = { en: 'en-US', es: 'es', de: 'de-DE', zh: 'zh-CN', sw: 'sw-KE', hi: 'hi-IN' };

/** Locale for dates and numbers that follows the language chosen in the app. */
export const locale = (): string => LOCALES[(i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2)] ?? 'en-US';

/** Curriculum area title in the current language; falls back to the stored English title. */
export const areaTitle = (key: string | undefined | null, fallback = ''): string =>
  key ? (i18n.t(`shared.areas.${key}`, { defaultValue: fallback || key }) as string) : fallback;

/** Formats a date in the chosen language with the browser's own calendar names and word order (covers Swahili, which date-fns lacks). */
export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions): string => new Intl.DateTimeFormat(locale(), options).format(date);

/** Formats a date range (for example a school week) in the chosen language. */
export const formatDateRange = (start: Date, end: Date, options: Intl.DateTimeFormatOptions): string => {
  const f = new Intl.DateTimeFormat(locale(), options) as Intl.DateTimeFormat & { formatRange?: (a: Date, b: Date) => string };
  return typeof f.formatRange === 'function' ? f.formatRange(start, end) : `${f.format(start)} – ${f.format(end)}`;
};

// date-fns has no Swahili locale; prefer formatDate/formatDateRange for anything shown to people.
const DATE_FNS: Record<string, Locale> = { en: enUS, es, de, zh: zhCN, hi };

/** date-fns locale that follows the language chosen in the app. */
export const dateLocale = (): Locale => DATE_FNS[(i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2)] ?? enUS;
