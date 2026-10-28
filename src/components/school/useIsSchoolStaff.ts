import { useEffect, useState } from 'react';
import { schoolCall, type Membership } from './api';
import { cacheMemberships, cachedMemberships } from './portalCache';

/** true/false once known for the signed-in user; null while checking. Server-verified via `me`. */
export function useIsSchoolStaff(userId: string | undefined): boolean | null {
  const cached = cachedMemberships(userId);
  const [staff, setStaff] = useState<boolean | null>(userId ? (cached ? cached.length > 0 : null) : false);
  useEffect(() => {
    if (!userId) { setStaff(false); return; }
    const c = cachedMemberships(userId);
    if (c) { setStaff(c.length > 0); return; }
    let cancelled = false;
    schoolCall<{ memberships: Membership[] }>({ action: 'me' })
      .then((r) => { const ms = r.memberships ?? []; cacheMemberships(userId, ms); if (!cancelled) setStaff(ms.length > 0); })
      .catch(() => { if (!cancelled) setStaff(false); });
    return () => { cancelled = true; };
  }, [userId]);
  return staff;
}
