import { policyEn, type PrivacyPolicy } from './policy.en';

// Each translation loads only when that language is chosen; the service worker caches it for offline reading.
const loaders: Record<string, () => Promise<{ default: unknown }>> = {
  es: () => import('./es.json'),
  de: () => import('./de.json'),
  zh: () => import('./zh.json'),
  sw: () => import('./sw.json'),
  hi: () => import('./hi.json'),
};

export const hasPolicyTranslation = (lang: string) => lang in loaders;

export async function loadPolicy(lang: string): Promise<PrivacyPolicy> {
  const load = loaders[lang];
  if (!load) return policyEn;
  try { return (await load()).default as PrivacyPolicy; } catch { return policyEn; }
}
