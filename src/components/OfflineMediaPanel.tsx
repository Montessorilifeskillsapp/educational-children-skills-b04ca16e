import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloudDownload, Trash2, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cancelDownload, downloadAll, formatBytes, offlineMediaSupported, removeMedia, storageEstimate, useOfflineMedia, type MediaKind } from '@/lib/offlineMedia';

/** Lets families and school staff save lesson videos and songs on this device for use without internet. */
export default function OfflineMediaPanel() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { items, progress } = useOfflineMedia();
  const [space, setSpace] = useState<{ usage: number; quota: number } | null>(null);
  useEffect(() => { void storageEstimate().then(setSpace); }, [items.length]);

  if (!offlineMediaSupported()) return null;
  const videos = items.filter((m) => m.kind === 'video');
  const songs = items.filter((m) => m.kind === 'song');
  const size = (list: typeof items) => formatBytes(list.reduce((n, m) => n + m.bytes, 0));

  const start = async (kinds: MediaKind[]) => {
    if (!navigator.onLine) { toast({ title: t('family.off.needWifi'), variant: 'destructive' }); return; }
    try {
      const r = await downloadAll(kinds);
      toast(r.total === 0 ? { title: t('family.off.already') }
        : r.failed ? { title: t('family.off.partial', { ok: r.done - r.failed, total: r.total }), description: t('family.off.partialBody'), variant: 'destructive' as const }
        : { title: t('family.off.ok', { total: r.total }) });
    } catch {
      toast({ title: t('family.off.startFailed'), description: t('family.off.checkConn'), variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg flex items-center gap-2"><WifiOff className="h-5 w-5" />{t('family.off.title')}</CardTitle></CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground">{t('family.off.intro')}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-3"><div className="font-medium">{t('family.off.videos')}</div><div className="text-muted-foreground">{t('family.off.saved', { count: videos.length, size: size(videos) })}</div></div>
          <div className="rounded-lg border border-border p-3"><div className="font-medium">{t('family.off.songs')}</div><div className="text-muted-foreground">{t('family.off.saved', { count: songs.length, size: size(songs) })}</div></div>
        </div>
        {progress.running ? (
          <div className="space-y-2" aria-live="polite">
            <Progress value={progress.total ? (progress.done / progress.total) * 100 : 5} />
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground truncate">{progress.total ? `${t('family.off.nOf', { done: progress.done, total: progress.total })}${progress.label ? ` · ${progress.label}` : ''}` : progress.label}</span>
              <Button variant="outline" size="sm" onClick={cancelDownload}>{t('family.off.stop')}</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => start(['video', 'song'])}><CloudDownload className="h-4 w-4 mr-2" />{t('family.off.all')}</Button>
            <Button variant="outline" onClick={() => start(['video'])}>{t('family.off.videosOnly')}</Button>
            <Button variant="outline" onClick={() => start(['song'])}>{t('family.off.songsOnly')}</Button>
            {items.length > 0 && <Button variant="ghost" onClick={() => removeMedia()}><Trash2 className="h-4 w-4 mr-2" />{t('family.off.remove')}</Button>}
          </div>
        )}
        {space && space.quota > 0 && <p className="text-xs text-muted-foreground">{t('family.off.space', { used: formatBytes(space.usage), quota: formatBytes(space.quota) })}</p>}
        <p className="text-xs text-muted-foreground">{t('family.off.footnote')}</p>
      </CardContent>
    </Card>
  );
}
