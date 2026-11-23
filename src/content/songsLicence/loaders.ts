import type { LegalLoaders } from '@/content/legal/types';

// Each translation loads only when that language is chosen; the service worker caches it for offline reading.
export const songsLicenceLoaders: LegalLoaders = {
  es: () => import('./es.json'),
  de: () => import('./de.json'),
  zh: () => import('./zh.json'),
  sw: () => import('./sw.json'),
  hi: () => import('./hi.json'),
};
