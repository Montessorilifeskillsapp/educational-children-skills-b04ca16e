/**
 * Password-reset links sign the person in with a short "recovery" session. Wherever the link
 * lands (web page, phone browser handing back to the app, or the app itself), we remember that a
 * new password is still owed so the "Choose a new password" form is shown instead of skipping it.
 */
const KEY = 'mls:password-recovery';
export const PASSWORD_RECOVERY_EVENT = 'mls:password-recovery';
/** Matches the lifetime of a reset link; after that the person must request a new email. */
const MAX_AGE_MS = 60 * 60 * 1000;

/** Kept on the device (not just this tab) so a new tab, reload or app hand-off cannot lose it. */
const stores = (): Storage[] => {
  const out: Storage[] = [];
  try { out.push(window.localStorage); } catch { /* unavailable */ }
  try { out.push(window.sessionStorage); } catch { /* unavailable */ }
  return out;
};

export function urlIsPasswordRecovery(hash: string, search: string): boolean {
  const h = new URLSearchParams(hash.replace(/^#/, ''));
  const s = new URLSearchParams(search);
  return h.get('type') === 'recovery' || s.get('type') === 'recovery';
}

export function markPasswordRecovery(now = Date.now()): void {
  for (const s of stores()) { try { s.setItem(KEY, String(now)); } catch { /* storage unavailable */ } }
  try { window.dispatchEvent(new Event(PASSWORD_RECOVERY_EVENT)); } catch { /* non-browser */ }
}

export function clearPasswordRecovery(): void {
  for (const s of stores()) { try { s.removeItem(KEY); } catch { /* storage unavailable */ } }
}

export function isPasswordRecoveryPending(now = Date.now()): boolean {
  let raw: string | null = null;
  for (const s of stores()) { try { raw = raw ?? s.getItem(KEY); } catch { /* storage unavailable */ } }
  if (!raw) return false;
  const at = Number(raw);
  if (!at || now - at > MAX_AGE_MS || now < at) { clearPasswordRecovery(); return false; }
  return true;
}

let launchHash = '';
/** The link details the page opened with, kept because the sign-in library clears them from the address. */
export const getLaunchHash = (): string => launchHash;

/** Run before the sign-in library reads (and then removes) the link details from the address. */
export function detectPasswordRecoveryInUrl(loc: Pick<Location, 'hash' | 'search'> = window.location): void {
  launchHash = loc.hash || '';
  if (urlIsPasswordRecovery(loc.hash, loc.search)) markPasswordRecovery();
}

/**
 * True when the sign-in itself came from a reset link (the auth server stamps it "recovery").
 * This does not depend on anything stored on the device, so it cannot expire or be cleared:
 * such a sign-in only ever allows choosing a new password.
 */
export function accessTokenIsRecovery(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const part = token.split('.')[1];
    if (!part) return false;
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(part.length / 4) * 4, '=');
    const claims = JSON.parse(atob(b64)) as { amr?: Array<{ method?: string } | string> };
    return Array.isArray(claims.amr) && claims.amr.some((m) => (typeof m === 'string' ? m : m?.method) === 'recovery');
  } catch {
    return false;
  }
}
