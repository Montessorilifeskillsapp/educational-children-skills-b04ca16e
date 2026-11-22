import { useTranslation } from 'react-i18next';
import heroDefault from '@/assets/hero-child-pouring-approved.jpg';
import heroSw from '@/assets/hero-child-pouring-sw.jpg';
import heroHi from '@/assets/hero-child-pouring-hi.jpg';
import heroZh from '@/assets/hero-child-pouring-zh.jpg';

// English, Spanish and German keep the original approved photo.
const POURING: Record<string, string> = { sw: heroSw, hi: heroHi, zh: heroZh };

export function pouringPhotoFor(lang: string | undefined): string {
  const base = (lang || 'en').split('-')[0];
  return POURING[base] ?? heroDefault;
}

export function usePouringPhoto(): string {
  const { i18n } = useTranslation();
  return pouringPhotoFor(i18n.resolvedLanguage || i18n.language);
}
