import { CloudOff, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSyncStatus, dismissRejected } from './offlineQueue';

/** Quiet connection note: shows nothing when online and everything is saved. */
export default function SyncStatus() {
  const { online, pending, syncing, rejected } = useSyncStatus();
  const { t } = useTranslation();
  if (rejected) {
    return (
      <button type="button" onClick={dismissRejected} className="whitespace-nowrap rounded-full px-3 py-1 text-xs text-destructive" title={t('school.sync.dismiss')}>
        {t('school.sync.rejected', { count: rejected })}
      </button>
    );
  }
  if (online && !pending) return null;
  return (
    <span role="status" className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-card px-3 py-1 text-xs text-muted-foreground">
      {online ? <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} /> : <CloudOff className="h-3.5 w-3.5" />}
      {!online ? (pending ? t('school.sync.offlineWaiting', { count: pending }) : t('school.sync.offline')) : t('school.sync.syncing', { count: pending })}
    </span>
  );
}
