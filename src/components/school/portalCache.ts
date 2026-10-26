import type { Membership } from './api';

/**
 * In-memory only (never stored on the device): the corner School Portal button fetches
 * memberships and the first school's records while staff are on other pages, so the
 * portal opens with them already in hand. Cleared whenever the signed-in user changes.
 */
let owner: string | null = null;
let memberships: Membership[] | null = null;
const data = new Map<string, unknown>();

export function setPortalOwner(userId: string | null) {
  if (userId === owner) return;
  owner = userId; memberships = null; data.clear();
}
export const cachedMemberships = (userId: string | undefined) => (userId && userId === owner ? memberships : null);
export function cacheMemberships(userId: string, ms: Membership[]) { setPortalOwner(userId); memberships = ms; }
export const cachedSchoolData = <T>(schoolId: string) => data.get(schoolId) as T | undefined;
export function cacheSchoolData(schoolId: string, d: unknown) { if (owner) data.set(schoolId, d); }

let portalChunk: Promise<unknown> | null = null;
/** Downloads the portal's code ahead of the tap. */
export const preloadPortal = () => (portalChunk ??= import('@/pages/SchoolPortalPage'));
