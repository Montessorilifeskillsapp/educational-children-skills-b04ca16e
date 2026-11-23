import { useTranslation } from 'react-i18next';
import heroDefault from '@/assets/hero-child-pouring-approved.jpg';
import heroSw from '@/assets/hero-child-pouring-sw.jpg';
import heroHi from '@/assets/hero-child-pouring-hi.jpg';
import heroZh from '@/assets/hero-child-pouring-zh.jpg';

// English, Spanish and German keep the original photos.
// Kiswahili, Hindi and Chinese show children matching the language.
const LOCALIZED_LANGS = ['sw', 'hi', 'zh'] as const;

const POURING: Record<string, string> = { sw: heroSw, hi: heroHi, zh: heroZh };

const baseLang = (lang: string | undefined) => (lang || 'en').split('-')[0];

export function pouringPhotoFor(lang: string | undefined): string {
  return POURING[baseLang(lang)] ?? heroDefault;
}

export function usePouringPhoto(): string {
  const { i18n } = useTranslation();
  return pouringPhotoFor(i18n.resolvedLanguage || i18n.language);
}

// Activity photos with children: any "<name>-sw|hi|zh.jpg" next to "<name>.jpg".
const originals = import.meta.glob('/src/assets/materials/**/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const VARIANTS = new Map<string, Record<string, string>>();
for (const [path, url] of Object.entries(originals)) {
  const m = path.match(/^(.*)-(sw|hi|zh)\.jpg$/);
  if (!m) continue;
  const base = originals[`${m[1]}.jpg`];
  if (!base) continue;
  const entry = VARIANTS.get(base) ?? {};
  entry[m[2]] = url;
  VARIANTS.set(base, entry);
}

export function localizedImageFor(src: string | undefined, lang: string | undefined): string | undefined {
  if (!src) return src;
  const l = baseLang(lang);
  if (!(LOCALIZED_LANGS as readonly string[]).includes(l)) return src;
  return VARIANTS.get(src)?.[l] ?? src;
}

export function useLocalizedImage(src: string | undefined): string | undefined {
  const { i18n } = useTranslation();
  return localizedImageFor(src, i18n.resolvedLanguage || i18n.language);
}
