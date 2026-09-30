import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2, Music, Save, Trash2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminBackBar from '@/components/AdminBackBar';
import { useToast } from '@/hooks/use-toast';
import { generateAudioPreview } from '@/lib/audioPreview';

interface SongRow {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
  storage_path: string;
  preview_path: string | null;
  preview_start_seconds: number;
  cover_path: string | null;
  duration_seconds: number | null;
  active: boolean;
}

const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const BUCKET = 'songs';

const AdminSongsPage: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<SongRow[]>([]);
  const [purchases, setPurchases] = useState<{ user_id: string; email: string; purchased_at: string }[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  // New-song draft
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(String(songs.length + 1));
  const [previewStart, setPreviewStart] = useState('0');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Keep recently uploaded audio files so previews can be regenerated in-session.
  const audioFilesRef = useRef<Record<string, File>>({});

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user, authLoading]);

  async function callAdmin(payload: Record<string, unknown>) {
    const { data: session } = await supabase.auth.getSession();
    const accessToken = session.session?.access_token;
    if (!accessToken) throw new Error('Not authenticated');
    const res = await fetch(`${FUNCTIONS_URL}/admin-songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json().catch(() => ({ error: 'Unexpected response' }));
    if (!res.ok) throw new Error(result.error || `Request failed (${res.status})`);
    return result;
  }

  const refresh = async () => {
    try {
      const [list, buys] = await Promise.all([
        callAdmin({ action: 'list' }),
        callAdmin({ action: 'purchases' }),
      ]);
      setSongs((list.songs ?? []) as SongRow[]);
      setPurchases(buys.purchases ?? []);
    } catch (err: any) {
      toast({ title: 'Could not load songs', description: err.message, variant: 'destructive' });
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoading(true);
      await refresh();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  async function uploadWithToken(path: string, token: string, file: File | Blob) {
    const { error } = await supabase.storage.from(BUCKET).uploadToSignedUrl(path, token, file);
    if (error) throw error;
  }

  async function uploadAudioTrack(file: File, startSeconds: number) {
    const extension = file.name.split('.').pop() || 'mp3';
    const { path, token } = await callAdmin({ action: 'upload-url', kind: 'full', extension });
    await uploadWithToken(path, token, file);

    const preview = await generateAudioPreview(file, startSeconds);
    const { path: previewPath, token: previewToken } = await callAdmin({ action: 'upload-url', kind: 'preview', extension: 'wav' });
    await uploadWithToken(previewPath, previewToken, preview.blob);

    return { path, previewPath, durationSeconds: preview.durationSeconds };
  }

  async function addSong() {
    if (!title.trim()) {
      toast({ title: 'Add a title first', variant: 'destructive' });
      return;
    }
    if (!audioFile) {
      toast({ title: 'Choose the song file first', variant: 'destructive' });
      return;
    }
    setAdding(true);
    try {
      const start = Math.max(0, Number(previewStart) || 0);
      const { path, previewPath, durationSeconds } = await uploadAudioTrack(audioFile, start);

      let coverPath: string | null = null;
      if (coverFile) {
        const extension = coverFile.name.split('.').pop() || 'jpg';
        const { path: cPath, token } = await callAdmin({ action: 'upload-url', kind: 'cover', extension });
        await uploadWithToken(cPath, token, coverFile);
        coverPath = cPath;
      }

      await callAdmin({
        action: 'upsert',
        title: title.trim(),
        description: description.trim() || null,
        sort_order: Number(sortOrder) || songs.length + 1,
        storage_path: path,
        preview_path: previewPath,
        preview_start_seconds: start,
        cover_path: coverPath,
        duration_seconds: durationSeconds,
        active: true,
      });

      setTitle('');
      setDescription('');
      setAudioFile(null);
      setCoverFile(null);
      setPreviewStart('0');
      await refresh();
      toast({ title: 'Song added', description: title.trim() });
    } catch (err: any) {
      toast({ title: 'Could not add the song', description: err.message, variant: 'destructive' });
    } finally {
      setAdding(false);
    }
  }

  async function saveSong(row: SongRow, patch: Partial<SongRow>) {
    const merged = { ...row, ...patch };
    setBusyId(row.id);
    try {
      await callAdmin({
        action: 'upsert',
        id: merged.id,
        title: merged.title,
        description: merged.description,
        sort_order: merged.sort_order,
        storage_path: merged.storage_path,
        preview_path: merged.preview_path,
        preview_start_seconds: merged.preview_start_seconds,
        cover_path: merged.cover_path,
        duration_seconds: merged.duration_seconds,
        active: merged.active,
      });
      setSongs((prev) => prev.map((s) => (s.id === merged.id ? merged : s)));
    } catch (err: any) {
      toast({ title: 'Save failed', description: err.message, variant: 'destructive' });
    } finally {
      setBusyId(null);
    }
  }

  async function replaceAudio(row: SongRow, file: File) {
    setBusyId(row.id);
    try {
      const { path, previewPath, durationSeconds } = await uploadAudioTrack(file, row.preview_start_seconds);
      audioFilesRef.current[row.id] = file;
      await saveSong(row, { storage_path: path, preview_path: previewPath, duration_seconds: durationSeconds });
      toast({ title: 'Audio replaced', description: row.title });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setBusyId(null);
    }
  }

  async function replaceCover(row: SongRow, file: File) {
    setBusyId(row.id);
    try {
      const extension = file.name.split('.').pop() || 'jpg';
      const { path, token } = await callAdmin({ action: 'upload-url', kind: 'cover', extension });
      await uploadWithToken(path, token, file);
      await saveSong(row, { cover_path: path });
      toast({ title: 'Cover updated', description: row.title });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setBusyId(null);
    }
  }

  async function deleteSong(row: SongRow) {
    if (!window.confirm(`Remove "${row.title}" and its audio files? This cannot be undone.`)) return;
    setBusyId(row.id);
    try {
      await callAdmin({ action: 'delete', id: row.id });
      delete audioFilesRef.current[row.id];
      await refresh();
      toast({ title: 'Song removed' });
    } catch (err: any) {
      toast({ title: 'Delete failed', description: err.message, variant: 'destructive' });
    } finally {
      setBusyId(null);
    }
  }

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/verify" replace />;

  const activeCount = songs.filter((s) => s.active).length;

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
      <AdminBackBar />
      <header>
        <h1 className="text-3xl font-bold">Kerry's Montessori Songs</h1>
        <p className="text-muted-foreground">
          Upload the collection, set the order, and control what families see. A 30-second preview is
          created automatically from each song.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {[
          ['Songs', songs.length],
          ['Visible on the Songs page', activeCount],
          ['Families who own the collection', purchases.length],
        ].map(([label, value]) => (
          <Card key={label as string}>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add a new song */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Upload className="w-4 h-4" aria-hidden="true" />
            Add a song
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="song-title">Title</Label>
              <Input id="song-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Work Song" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="song-description">Short description (optional)</Label>
              <Input id="song-description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="song-order">Order on the page</Label>
              <Input id="song-order" type="number" min={1} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="song-preview-start">Preview starts at (seconds)</Label>
              <Input id="song-preview-start" type="number" min={0} value={previewStart} onChange={(e) => setPreviewStart(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="song-audio">Song file (MP3 or similar)</Label>
              <Input
                id="song-audio"
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="song-cover">Cover art (optional)</Label>
              <Input
                id="song-cover"
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <Button onClick={addSong} disabled={adding}>
            {adding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" /> : <Music className="w-4 h-4 mr-2" aria-hidden="true" />}
            {adding ? 'Uploading song and preview…' : 'Add song to the collection'}
          </Button>
        </CardContent>
      </Card>

      {/* Existing songs */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-4">
          {songs.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No songs yet. Add the first song above — the Songs page stays hidden from members
                until at least one song is visible.
              </CardContent>
            </Card>
          )}
          {songs.map((row) => {
            const busy = busyId === row.id;
            return (
              <Card key={row.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{row.title}</span>
                      {row.active ? (
                        <Badge>Visible</Badge>
                      ) : (
                        <Badge variant="secondary">Hidden</Badge>
                      )}
                    </div>
                    {busy && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" aria-hidden="true" />}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor={`title-${row.id}`}>Title</Label>
                      <Input
                        id={`title-${row.id}`}
                        defaultValue={row.title}
                        onBlur={(e) => e.target.value !== row.title && saveSong(row, { title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`desc-${row.id}`}>Description</Label>
                      <Input
                        id={`desc-${row.id}`}
                        defaultValue={row.description ?? ''}
                        onBlur={(e) => (e.target.value || null) !== row.description && saveSong(row, { description: e.target.value || null })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`order-${row.id}`}>Order</Label>
                      <Input
                        id={`order-${row.id}`}
                        type="number"
                        min={1}
                        defaultValue={row.sort_order}
                        onBlur={(e) => Number(e.target.value) !== row.sort_order && saveSong(row, { sort_order: Number(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`pstart-${row.id}`}>Preview starts at (seconds)</Label>
                      <Input
                        id={`pstart-${row.id}`}
                        type="number"
                        min={0}
                        defaultValue={row.preview_start_seconds}
                        onBlur={(e) =>
                          Number(e.target.value) !== row.preview_start_seconds &&
                          saveSong(row, { preview_start_seconds: Math.max(0, Number(e.target.value) || 0) })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Changing this takes effect the next time the song file or preview is uploaded.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`audio-${row.id}`}>Replace song file</Label>
                      <Input
                        id={`audio-${row.id}`}
                        type="file"
                        accept="audio/*"
                        disabled={busy}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void replaceAudio(row, file);
                          e.target.value = '';
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`cover-${row.id}`}>Replace cover art</Label>
                      <Input
                        id={`cover-${row.id}`}
                        type="file"
                        accept="image/*"
                        disabled={busy}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void replaceCover(row, file);
                          e.target.value = '';
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap pt-1 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`active-${row.id}`}
                        checked={row.active}
                        disabled={busy}
                        onCheckedChange={(checked) => saveSong(row, { active: checked === true })}
                      />
                      <Label htmlFor={`active-${row.id}`} className="text-sm font-normal">
                        Visible on the Songs page
                      </Label>
                    </div>
                    <Button size="sm" variant="ghost" disabled={busy} onClick={() => deleteSong(row)}>
                      <Trash2 className="w-4 h-4 mr-1" aria-hidden="true" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminSongsPage;
