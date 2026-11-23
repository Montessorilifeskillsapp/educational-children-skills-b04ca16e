import { useEffect, useState } from 'react';
import i18n from './index';
import { recoverIfStale } from '@/lib/staleBuild';

/**
 * Lesson content (activity names, purposes, steps, notes, materials, section text) is authored in English.
 * Translations are keyed by the exact English text, so they apply wherever that text is shown,
 * whichever curriculum file it came from. Each language loads on demand and is cached for offline use.
 */
type Dict = Record<string, string>;

const loaders: Record<string, () => Promise<{ default: Dict }>> = {
  es: () => import('./lessons/es.json'),
  de: () => import('./lessons/de.json'),
  zh: () => import('./lessons/zh.json'),
  sw: () => import('./lessons/sw.json'),
  hi: () => import('./lessons/hi.json'),
};
const cache: Record<string, Dict> = {};
const pending: Record<string, Promise<void>> = {};

const current = () => (i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2);

export function loadLessonText(lang = current()): Promise<void> {
  if (!loaders[lang] || cache[lang]) return Promise.resolve();
  pending[lang] ??= loaders[lang]().then((m) => { cache[lang] = m.default; }).catch((err) => { delete pending[lang]; recoverIfStale(err); });
  return pending[lang];
}

/** The lesson text in the chosen language, or the English original when no translation exists. */
export function lessonText(text: string, lang = current()): string {
  if (!text || lang === 'en') return text;
  const dict = cache[lang];
  if (!dict) return text;
  return dict[text] ?? dict[text.trim()] ?? text;
}

/** Keys that hold identifiers, links or media rather than words a reader sees. */
const SKIP = new Set(['id', 'key', 'icon', 'emoji', 'image', 'imageUrl', 'videoUrl', 'video', 'url', 'href', 'route', 'color', 'slug', 'asin', 'materials', 'completed', 'difficulty', 'level', 'skillId']);

/** A copy of a lesson object with every reader-facing string translated. Materials stay English for photo and purchase-link lookups. */
export function localizeLesson<T>(value: T, lang = current()): T {
  if (lang === 'en' || !cache[lang]) return value;
  const walk = (v: unknown, key?: string): unknown => {
    if (typeof v === 'string') return key && SKIP.has(key) ? v : lessonText(v, lang);
    if (Array.isArray(v)) return key && SKIP.has(key) ? v : v.map((x) => walk(x));
    if (v && typeof v === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, x] of Object.entries(v as Record<string, unknown>)) out[k] = SKIP.has(k) && typeof x !== 'object' ? x : walk(x, k);
      return out;
    }
    return v;
  };
  return walk(value) as T;
}

/** Re-renders when the language changes or its lesson translations finish loading. Returns the current language. */
export function useLessonLanguage(): string {
  const [, bump] = useState(0);
  useEffect(() => {
    let alive = true;
    const refresh = () => { void loadLessonText().then(() => { if (alive) bump((n) => n + 1); }); bump((n) => n + 1); };
    refresh();
    i18n.on('languageChanged', refresh);
    return () => { alive = false; i18n.off('languageChanged', refresh); };
  }, []);
  return current();
}

// Start loading as soon as a non-English language is active so lessons open already translated.
void loadLessonText();
i18n.on('languageChanged', (lng) => { void loadLessonText(lng.slice(0, 2)); });
