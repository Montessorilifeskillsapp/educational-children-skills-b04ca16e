import { useSyncExternalStore } from 'react';

/** Notes and progress recorded without a connection wait here and are sent once the connection returns. */
export const QUEUEABLE = new Set(['observation_add', 'progress_set']);
export const SYNCED_EVENT = 'school:synced';
const KEY = 'school:outbox';

export interface Queued { id: string; uid: string; body: Record<string, unknown>; at: string }
type Sender = (body: Record<string, unknown>) => Promise<unknown>;

let sender: Sender | null = null;
let currentUid: () => Promise<string | null> = async () => null;
let syncing = false;
let rejected = 0;
const listeners = new Set<() => void>();
let snapshot = { pending: 0, syncing: false, online: typeof navigator === 'undefined' ? true : navigator.onLine, rejected: 0 };

function load(): Queued[] { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
function store(items: Queued[]) { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ } emit(); }
function emit() {
  snapshot = { pending: load().length, syncing, online: navigator.onLine, rejected };
  listeners.forEach((l) => l());
}

export function configureQueue(send: Sender, uid: () => Promise<string | null>) { sender = send; currentUid = uid; }

export function enqueue(uid: string, body: Record<string, unknown>) {
  store([...load(), { id: crypto.randomUUID(), uid, body, at: new Date().toISOString() }]);
}

/** True when a failure means "could not reach the server", not "the server said no". */
export function isConnectionError(e: unknown) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return true;
  const name = (e as { name?: string })?.name ?? '';
  return name === 'FunctionsFetchError' || name === 'TypeError';
}

/** Send waiting records in order. Only the person who recorded them can send them. */
export async function flushQueue() {
  if (syncing || !sender || !navigator.onLine || !load().length) return;
  const uid = await currentUid();
  if (!uid) return;
  syncing = true; emit();
  let sent = 0;
  try {
    for (const item of load().filter((q) => q.uid === uid)) {
      try { await sender(item.body); sent++; }
      catch (e) {
        if (isConnectionError(e)) break;
        rejected++; // server refused (e.g. permission changed): drop rather than retry forever
      }
      store(load().filter((q) => q.id !== item.id));
    }
  } finally { syncing = false; emit(); }
  if (sent) window.dispatchEvent(new Event(SYNCED_EVENT));
}

export function dismissRejected() { rejected = 0; emit(); }

let started = false;
export function startQueue() {
  if (started || typeof window === 'undefined') return;
  started = true;
  const tick = () => { emit(); void flushQueue(); };
  window.addEventListener('online', tick);
  window.addEventListener('offline', emit);
  window.addEventListener('focus', tick);
  window.setInterval(tick, 30_000);
  tick();
}

export function useSyncStatus() {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => snapshot, () => snapshot);
}
