import i18n from './index';

const LOCALES: Record<string, string> = { en: 'en-US', es: 'es', de: 'de-DE', zh: 'zh-CN' };

/** Locale for dates and numbers that follows the language chosen in the app. */
export const locale = (): string => LOCALES[(i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2)] ?? 'en-US';

/** Curriculum area title in the current language; falls back to the stored English title. */
export const areaTitle = (key: string | undefined | null, fallback = ''): string =>
  key ? (i18n.t(`shared.areas.${key}`, { defaultValue: fallback || key }) as string) : fallback;
