import { useSyncExternalStore } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Lesson videos and songs saved on this device so they play without internet.
 * Files live in the browser's Cache Storage (also used inside the iOS/Android app),
 * and a small catalog in localStorage remembers what was saved.
 */
const CACHE = 'mls-offline-media-v1';
const CATALOG_KEY = 'mls:offline-media';

export type MediaKind = 'video' | 'song';
export interface SavedMedia {
  kind: MediaKind;
  id: string; // skill_id for videos, song id for songs
  title: string | null;
  bytes: number;
  savedAt: string;
  durationSeconds?: number | null;
  meta?: Record<string, unknown>;
}

interface Progress { running: boolean; done: number; total: number; failed: number; label: string | null }

const listeners = new Set<() => void>();
let progress: Progress = { running: false, done: 0, total: 0, failed: 0, label: null };
let catalogSnapshot: SavedMedia[] = readCatalog();
let cancelRequested = false;

function readCatalog(): SavedMedia[] {
  try { return JSON.parse(localStorage.getItem(CATALOG_KEY) || '[]'); } catch { return []; }
}
function writeCatalog(items: SavedMedia[]) {
  try { localStorage.setItem(CATALOG_KEY, JSON.stringify(items)); } catch { /* storage full */ }
  catalogSnapshot = items;
  emit();
}
function emit() { listeners.forEach((l) => l()); }
const keyFor = (kind: MediaKind, id: string) => `/offline-media/${kind}/${encodeURIComponent(id)}`;

export const offlineMediaSupported = () => typeof window !== 'undefined' && 'caches' in window;

export function savedMedia(kind?: MediaKind) {
  return kind ? catalogSnapshot.filter((m) => m.kind === kind) : catalogSnapshot;
}
export function isSaved(kind: MediaKind, id: string) {
  return catalogSnapshot.some((m) => m.kind === kind && m.id === id);
}

const objectUrls = new Map<string, string>();
/** A playable address for a saved file, or null when it is not on this device. */
export async function localMediaUrl(kind: MediaKind, id: string): Promise<string | null> {
  if (!offlineMediaSupported() || !isSaved(kind, id)) return null;
  const key = keyFor(kind, id);
  const existing = objectUrls.get(key);
  if (existing) return existing;
  try {
    const cache = await caches.open(CACHE);
    const res = await cache.match(key);
    if (!res) { writeCatalog(catalogSnapshot.filter((m) => !(m.kind === kind && m.id === id))); return null; }
    const url = URL.createObjectURL(await res.blob());
    objectUrls.set(key, url);
    return url;
  } catch { return null; }
}

/** Ask the browser not to clear saved media when the device runs low on space. */
async function keepPersistent() {
  try { await navigator.storage?.persist?.(); } catch { /* not supported */ }
}

export async function saveMedia(kind: MediaKind, id: string, url: string, info: Omit<SavedMedia, 'kind' | 'id' | 'bytes' | 'savedAt'>) {
  if (!offlineMediaSupported()) throw new Error('This browser cannot save media for offline use.');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status})`);
  const blob = await res.blob();
  const cache = await caches.open(CACHE);
  await cache.put(keyFor(kind, id), new Response(blob, { headers: { 'Content-Type': blob.type || res.headers.get('Content-Type') || 'application/octet-stream' } }));
  const entry: SavedMedia = { kind, id, bytes: blob.size, savedAt: new Date().toISOString(), ...info };
  writeCatalog([...catalogSnapshot.filter((m) => !(m.kind === kind && m.id === id)), entry]);
}

export async function removeMedia(kind?: MediaKind) {
  const doomed = kind ? catalogSnapshot.filter((m) => m.kind === kind) : catalogSnapshot;
  if (offlineMediaSupported()) {
    const cache = await caches.open(CACHE);
    await Promise.all(doomed.map((m) => cache.delete(keyFor(m.kind, m.id))));
  }
  doomed.forEach((m) => { const k = keyFor(m.kind, m.id); const u = objectUrls.get(k); if (u) { URL.revokeObjectURL(u); objectUrls.delete(k); } });
  writeCatalog(catalogSnapshot.filter((m) => !doomed.includes(m)));
}

export async function storageEstimate(): Promise<{ usage: number; quota: number } | null> {
  try { const e = await navigator.storage?.estimate?.(); return e ? { usage: e.usage ?? 0, quota: e.quota ?? 0 } : null; } catch { return null; }
}

interface Job { kind: MediaKind; id: string; url: string; title: string | null; durationSeconds?: number | null; meta?: Record<string, unknown> }

/** Lists every video and song this account may play, with temporary download links. */
async function availableJobs(kinds: MediaKind[]): Promise<Job[]> {
  const jobs: Job[] = [];
  if (kinds.includes('video')) {
    const { data, error } = await supabase.functions.invoke('video-playback-url', { body: { list: true } });
    if (error) throw error;
    for (const v of (data?.videos ?? []) as { skill_id: string; title: string | null; url: string; duration_seconds: number | null; section_key: string | null }[]) {
      jobs.push({ kind: 'video', id: v.skill_id, url: v.url, title: v.title, durationSeconds: v.duration_seconds, meta: { section: v.section_key } });
    }
  }
  if (kinds.includes('song')) {
    const { data, error } = await supabase.functions.invoke('song-playback-url', { body: {} });
    if (error) throw error;
    if (data?.purchased) {
      for (const s of (data?.songs ?? []) as { id: string; title: string; fullUrl: string | null; duration_seconds: number | null; description: string | null; sort_order: number; preview_start_seconds: number }[]) {
        if (s.fullUrl) jobs.push({ kind: 'song', id: s.id, url: s.fullUrl, title: s.title, durationSeconds: s.duration_seconds,
          meta: { description: s.description, sort_order: s.sort_order, preview_start_seconds: s.preview_start_seconds } });
      }
    }
  }
  return jobs;
}

/** Downloads everything not yet on this device. Already-saved files are skipped. */
export async function downloadAll(kinds: MediaKind[] = ['video', 'song']) {
  if (progress.running) return progress;
  cancelRequested = false;
  progress = { running: true, done: 0, total: 0, failed: 0, label: 'Checking what to download…' }; emit();
  try {
    await keepPersistent();
    const jobs = (await availableJobs(kinds)).filter((j) => !isSaved(j.kind, j.id));
    progress = { ...progress, total: jobs.length, label: null }; emit();
    for (const j of jobs) {
      if (cancelRequested) break;
      progress = { ...progress, label: j.title }; emit();
      try { await saveMedia(j.kind, j.id, j.url, { title: j.title, durationSeconds: j.durationSeconds, meta: j.meta }); }
      catch { progress = { ...progress, failed: progress.failed + 1 }; }
      progress = { ...progress, done: progress.done + 1 }; emit();
    }
  } finally {
    progress = { ...progress, running: false, label: null }; emit();
  }
  return progress;
}
export function cancelDownload() { cancelRequested = true; }

const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };
export function useOfflineMedia() {
  const items = useSyncExternalStore(subscribe, () => catalogSnapshot, () => catalogSnapshot);
  const p = useSyncExternalStore(subscribe, () => progress, () => progress);
  return { items, progress: p };
}

export const formatBytes = (n: number) => n >= 1e9 ? `${(n / 1e9).toFixed(1)} GB` : n >= 1e6 ? `${Math.round(n / 1e6)} MB` : `${Math.max(1, Math.round(n / 1e3))} KB`;
