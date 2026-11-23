/**
 * Saves the curriculum photos for offline use a few at a time, after the page has settled.
 * The offline worker no longer downloads every photo at once on the first visit (that burst
 * made the app stall); it keeps the app itself, and this module fills in the photos gently.
 * Each photo is fetched through the worker, whose "built-assets" cache keeps it.
 */
const LIST_URL = '/offline-photos.json';
const CACHE = 'built-assets';
const AT_ONCE = 2;
const START_DELAY_MS = 6000;

type Conn = { saveData?: boolean; effectiveType?: string };

const idle = () => new Promise<void>((resolve) => {
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  if (ric) ric(() => resolve(), { timeout: 2000 }); else setTimeout(resolve, 200);
});

const visible = () => new Promise<void>((resolve) => {
  if (document.visibilityState === 'visible') return resolve();
  const on = () => { if (document.visibilityState === 'visible') { document.removeEventListener('visibilitychange', on); resolve(); } };
  document.addEventListener('visibilitychange', on);
});

/** Photos still missing from the offline cache, in list order. Exported for tests. */
export async function missingPhotos(urls: string[], cache: Pick<Cache, 'match'>): Promise<string[]> {
  const out: string[] = [];
  for (const url of urls) if (!(await cache.match(url))) out.push(url);
  return out;
}

async function run() {
  const conn = (navigator as Navigator & { connection?: Conn }).connection;
  if (conn?.saveData || conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') return;
  await navigator.serviceWorker.ready;
  if (!navigator.serviceWorker.controller) {
    // First visit: wait briefly for the new worker to take over this page.
    await new Promise<void>((resolve) => {
      const done = () => { navigator.serviceWorker.removeEventListener('controllerchange', done); resolve(); };
      navigator.serviceWorker.addEventListener('controllerchange', done);
      setTimeout(done, 15000);
    });
    if (!navigator.serviceWorker.controller) return;
  }
  const res = await fetch(LIST_URL, { cache: 'no-cache' });
  if (!res.ok) return;
  const urls = ((await res.json()) as string[]).map((u) => (u.startsWith('/') ? u : `/${u}`));
  const queue = await missingPhotos(urls, await caches.open(CACHE));
  const worker = async () => {
    while (queue.length) {
      if (!navigator.onLine) return;
      await visible();
      await idle();
      const url = queue.shift()!;
      try { await fetch(url, { priority: 'low' } as RequestInit); } catch { /* try again next visit */ }
    }
  };
  await Promise.all(Array.from({ length: AT_ONCE }, worker));
}

export function saveOfflinePhotos() {
  if (!('serviceWorker' in navigator) || !('caches' in window)) return;
  setTimeout(() => { void run().catch(() => {}); }, START_DELAY_MS);
}
