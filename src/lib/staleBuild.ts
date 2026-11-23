/**
 * Recovery for visitors still running an older published version.
 * After a new publish the host deletes the old screen files, so an open tab (or a
 * home-screen app left in the background) fails to load the next screen it needs.
 * Instead of leaving them on an error screen, reload once to pick up the new version.
 */
const RELOAD_KEY = 'mls:stale-build-reload-at';
const MIN_GAP_MS = 10_000;

const STALE_PATTERNS = [
  /Failed to fetch dynamically imported module/i, // Chromium
  /error loading dynamically imported module/i, // Firefox
  /Importing a module script failed/i, // Safari / iOS
  /Unable to preload CSS/i, // Vite CSS preload
  /ChunkLoadError|Loading chunk [\w-]+ failed/i,
];

export function isStaleBuildError(err: unknown): boolean {
  const msg =
    typeof err === 'string' ? err : err && typeof err === 'object' && 'message' in err ? String((err as { message: unknown }).message) : '';
  return STALE_PATTERNS.some((re) => re.test(msg));
}

type KV = Pick<Storage, 'getItem' | 'setItem'>;

function safeStorage(): KV | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** Reloads unless we already reloaded in the last few seconds (prevents a reload loop). */
export function reloadForNewVersion(
  storage: KV | null = safeStorage(),
  now: number = Date.now(),
  reload: () => void = () => window.location.reload(),
): boolean {
  try {
    const last = Number(storage?.getItem(RELOAD_KEY) || 0);
    if (last && now - last < MIN_GAP_MS) return false;
    storage?.setItem(RELOAD_KEY, String(now));
  } catch {
    /* storage unavailable: still reload once */
  }
  reload();
  return true;
}

export function installStaleBuildRecovery() {
  if (typeof window === 'undefined') return;
  window.addEventListener('vite:preloadError', (event) => {
    if (reloadForNewVersion()) event.preventDefault();
  });
  window.addEventListener('unhandledrejection', (event) => {
    if (isStaleBuildError(event.reason)) reloadForNewVersion();
  });
}
