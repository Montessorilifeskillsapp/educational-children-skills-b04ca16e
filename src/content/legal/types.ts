import type { PolicySection } from '@/content/privacy/policy.en';

/**
 * A translated legal page (Terms of Service, Songs License). English source lives in TypeScript;
 * each translation is a JSON file of the exact same shape, loaded only when that language is chosen.
 */
export interface LegalDoc {
  seoTitle: string;
  seoDescription: string;
  pageTitle: string;
  /** Version or last-updated line shown under the title. */
  updated: string;
  /** Shown on translated versions only: the English version applies if they differ. */
  translationNote: string;
  sections: PolicySection[];
}

export type LegalLoaders = Record<string, () => Promise<{ default: unknown }>>;

export async function loadLegalDoc(loaders: LegalLoaders, lang: string, english: LegalDoc): Promise<LegalDoc> {
  const load = loaders[lang];
  if (!load) return english;
  try { return (await load()).default as LegalDoc; } catch { return english; }
}
