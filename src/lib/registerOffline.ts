/**
 * The only place the offline worker is registered. It never runs in development,
 * inside the editor preview, or in an iframe; `?sw=off` removes it.
 */
const SW_PATH = '/sw.js';

function refused(): boolean {
  if (!import.meta.env.PROD) return true;
  try { if (window.self !== window.top) return true; } catch { return true; }
  const host = window.location.hostname.toLowerCase();
  const label = host.split('.')[0];
  const lovableHosts = ['.lovable.app', '.gpt-eng.com', '.gptengineer.run'];
  if (lovableHosts.some((h) => host.endsWith(h))) {
    if (/^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/.test(label)) return true;
    if (/^project--[a-z0-9-]+-dev$/.test(label)) return true;
  }
  if (host === 'lovableproject.com' || host.endsWith('.lovableproject.com')) return true;
  if (host === 'lovableproject-dev.com' || host.endsWith('.lovableproject-dev.com')) return true;
  if (host === 'beta.lovable.dev' || host.endsWith('.beta.lovable.dev')) return true;
  if (new URLSearchParams(window.location.search).get('sw') === 'off') return true;
  return false;
}

async function unregisterAppWorker() {
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(regs.filter((r) => (r.active || r.installing || r.waiting)?.scriptURL.endsWith(SW_PATH)).map((r) => r.unregister()));
}

export function registerOffline() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  if (refused()) { void unregisterAppWorker().catch(() => {}); return; }
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(SW_PATH, { scope: '/' }).catch(() => {});
  });
}
