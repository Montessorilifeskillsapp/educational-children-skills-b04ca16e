import { useEffect, useState } from 'react';
import { CloudDownload, Trash2, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cancelDownload, downloadAll, formatBytes, offlineMediaSupported, removeMedia, storageEstimate, useOfflineMedia, type MediaKind } from '@/lib/offlineMedia';

/** Lets families and school staff save lesson videos and songs on this device for use without internet. */
export default function OfflineMediaPanel() {
  const { toast } = useToast();
  const { items, progress } = useOfflineMedia();
  const [space, setSpace] = useState<{ usage: number; quota: number } | null>(null);
  useEffect(() => { void storageEstimate().then(setSpace); }, [items.length]);

  if (!offlineMediaSupported()) return null;
  const videos = items.filter((m) => m.kind === 'video');
  const songs = items.filter((m) => m.kind === 'song');
  const size = (list: typeof items) => formatBytes(list.reduce((n, m) => n + m.bytes, 0));

  const start = async (kinds: MediaKind[]) => {
    if (!navigator.onLine) { toast({ title: 'Connect to Wi-Fi to download', variant: 'destructive' }); return; }
    try {
      const r = await downloadAll(kinds);
      toast(r.total === 0 ? { title: 'Everything available is already on this device' }
        : r.failed ? { title: `Saved ${r.done - r.failed} of ${r.total}`, description: 'Some files did not download. Try again on a steady connection.', variant: 'destructive' }
        : { title: `Saved ${r.total} for offline use` });
    } catch {
      toast({ title: 'Could not start the download', description: 'Check your connection and try again.', variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg flex items-center gap-2"><WifiOff className="h-5 w-5" />Use without internet</CardTitle></CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground">Every activity, material list and photo is kept on this device automatically after your first visit. Lesson videos and songs are large, so save them here while on Wi-Fi.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-3"><div className="font-medium">Lesson videos</div><div className="text-muted-foreground">{videos.length} saved · {size(videos)}</div></div>
          <div className="rounded-lg border border-border p-3"><div className="font-medium">Songs</div><div className="text-muted-foreground">{songs.length} saved · {size(songs)}</div></div>
        </div>
        {progress.running ? (
          <div className="space-y-2" aria-live="polite">
            <Progress value={progress.total ? (progress.done / progress.total) * 100 : 5} />
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground truncate">{progress.total ? `${progress.done} of ${progress.total}${progress.label ? ` · ${progress.label}` : ''}` : progress.label}</span>
              <Button variant="outline" size="sm" onClick={cancelDownload}>Stop</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => start(['video', 'song'])}><CloudDownload className="h-4 w-4 mr-2" />Download all</Button>
            <Button variant="outline" onClick={() => start(['video'])}>Videos only</Button>
            <Button variant="outline" onClick={() => start(['song'])}>Songs only</Button>
            {items.length > 0 && <Button variant="ghost" onClick={() => removeMedia()}><Trash2 className="h-4 w-4 mr-2" />Remove downloads</Button>}
          </div>
        )}
        {space && space.quota > 0 && <p className="text-xs text-muted-foreground">Space used on this device: {formatBytes(space.usage)} of {formatBytes(space.quota)} available to the app.</p>}
        <p className="text-xs text-muted-foreground">Only videos and songs included with your access are downloaded. Notes and grades recorded offline are sent automatically when the connection returns.</p>
      </CardContent>
    </Card>
  );
}
