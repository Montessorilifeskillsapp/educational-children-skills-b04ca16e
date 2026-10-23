import { CloudOff, RefreshCw } from 'lucide-react';
import { useSyncStatus, dismissRejected } from './offlineQueue';

/** Quiet connection note: shows nothing when online and everything is saved. */
export default function SyncStatus() {
  const { online, pending, syncing, rejected } = useSyncStatus();
  if (rejected) {
    return (
      <button type="button" onClick={dismissRejected} className="whitespace-nowrap rounded-full px-3 py-1 text-xs text-destructive" title="Dismiss">
        {rejected} saved {rejected === 1 ? 'record was' : 'records were'} not accepted
      </button>
    );
  }
  if (online && !pending) return null;
  return (
    <span role="status" className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-card px-3 py-1 text-xs text-muted-foreground">
      {online ? <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} /> : <CloudOff className="h-3.5 w-3.5" />}
      {!online ? (pending ? `Offline · ${pending} waiting to sync` : 'Offline · notes save on this device') : `Syncing ${pending}…`}
    </span>
  );
}
