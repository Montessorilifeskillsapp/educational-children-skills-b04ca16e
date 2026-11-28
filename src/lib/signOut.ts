import { supabase } from '@/integrations/supabase/client';
import { SCHOOL_RETURN_KEY } from '@/components/school/navigation';

/**
 * Signs out on this device only (other devices stay signed in), sends any School Portal
 * records still waiting for a connection first, clears per-visit navigation markers, and
 * reloads the home page (or the sign-in page, to switch account) so no data from the previous
 * account stays in memory.
 */
export async function signOutAndReset(to: '/' | '/auth' = '/'): Promise<void> {
  try {
    const { flushQueue } = await import('@/components/school/offlineQueue');
    await Promise.race([flushQueue(), new Promise((r) => setTimeout(r, 4000))]);
  } catch { /* unsent records stay on this device for the same account */ }
  try {
    const { revokeOfflineMedia } = await import('@/lib/offlineMedia');
    await revokeOfflineMedia(); // saved videos/songs belong to the signed-out account's access
  } catch { /* cache unavailable */ }
  await supabase.auth.signOut({ scope: 'local' });
  try {
    ['school_auto_open', 'post_auth_redirect', SCHOOL_RETURN_KEY].forEach((k) => sessionStorage.removeItem(k));
  } catch { /* storage unavailable */ }
  window.location.assign(to);
}
