import type { Membership } from './api';
import type { SchoolData } from './useSchoolData';
import { savedSchoolData } from './savedSchoolData';

/**
 * In-memory only (never stored on the device): the corner School Portal button fetches
 * memberships and the first school's records while staff are on other pages, so the
 * portal opens with them already in hand. Cleared whenever the signed-in user changes.
 */
let owner: string | null = null;
let memberships: Membership[] | null = null;
const data = new Map<string, unknown>();
const revisions = new Map<string, number>();
export const schoolRevision = (schoolId: string) => revisions.get(schoolId) ?? 0;
let epoch = 0;
const requests = new Map<string, Promise<unknown>>();

/** Share overlapping reads, never across signed-in users. Late replies cannot fill a new user's cache. */
export function sharedPortalRead<T>(key: string, read: () => Promise<T>, commit?: (value: T) => void): Promise<T> {
  const hit = requests.get(key);
  if (hit) return hit as Promise<T>;
  const started = epoch;
  const request = read().then((value) => {
    if (epoch !== started) throw new Error('The signed-in account changed.');
    commit?.(value);
    return value;
  }).finally(() => { if (requests.get(key) === request) requests.delete(key); });
  requests.set(key, request);
  return request;
}

export function fetchMemberships(userId: string): Promise<Membership[]> {
  setPortalOwner(userId);
  return sharedPortalRead('me', async () => {
    const { schoolCall } = await import('./api');
    return (await schoolCall<{ memberships: Membership[] }>({ action: 'me' })).memberships ?? [];
  }, (ms) => cacheMemberships(userId, ms));
}

export function setPortalOwner(userId: string | null) {
  if (userId === owner) return;
  owner = userId; memberships = null; data.clear(); revisions.clear(); epoch++; requests.clear();
}
export const cachedMemberships = (userId: string | undefined) => (userId && userId === owner ? memberships : null);
export function cacheMemberships(userId: string, ms: Membership[]) { setPortalOwner(userId); memberships = ms; }
export const cachedSchoolData = <T>(schoolId: string) => data.get(schoolId) as T | undefined;
export function cacheSchoolData(schoolId: string, d: unknown) { if (owner) data.set(schoolId, d); }
export const SCHOOL_SAVED_EVENT = 'school:server-saved';
export function applySavedSchoolChange(userId: string, body: Record<string, unknown>, reply: Record<string, unknown>) {
  if (owner !== userId || reply.queued) return;
  for (const [id, current] of data) {
    const next = savedSchoolData(current as SchoolData, id, body, reply);
    if (next !== current) { data.set(id, next); revisions.set(id, schoolRevision(id) + 1); }
  }
  window.dispatchEvent(new Event(SCHOOL_SAVED_EVENT));
}

let portalChunk: Promise<unknown> | null = null;
/** Downloads the portal's code ahead of the tap. */
export const preloadPortal = () => (portalChunk ??= import('@/pages/SchoolPortalPage'));
