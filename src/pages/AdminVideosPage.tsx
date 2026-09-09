import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Trash2, Save, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthContext } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminBackBar from '@/components/AdminBackBar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { cn } from '@/lib/utils';

interface VideoRow {
  skill_id: string;
  section_key: string | null;
  title: string | null;
  storage_path: string;
  thumbnail_path: string | null;
  duration_seconds: number | null;
  active: boolean;
  free_preview: boolean;
}

interface Activity {
  id: string;
  title: string;
}

const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

const AdminVideosPage: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Record<string, VideoRow>>({});
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    const res = await fetch(`${FUNCTIONS_URL}/admin-activity-videos`, {
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

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoading(true);
      try {
        const result = await callAdmin({ action: 'list' });
        const map: Record<string, VideoRow> = {};
        for (const row of (result.videos ?? []) as VideoRow[]) {
          map[row.skill_id] = row;
        }
        setVideos(map);
      } catch (err: any) {
        toast({ title: 'Could not load videos', description: err.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const sections = useMemo(
    () =>
      curriculumSectionsForMaterials.map((section) => ({
        key: section.key,
        title: section.title,
        emoji: section.emoji,
        activities: Object.entries(section.skills).map(([id, skill]) => ({
          id,
          title: skill.title || id,
        })) as Activity[],
      })),
    []
  );

  const filteredSections = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return sections;
    return sections
      .map((section) => ({
        ...section,
        activities: section.activities.filter(
          (a) => a.title.toLowerCase().includes(term) || a.id.toLowerCase().includes(term)
        ),
      }))
      .filter((section) => section.activities.length > 0);
  }, [sections, search]);

  useEffect(() => {
    if (!search.trim()) return;
    setExpanded(new Set(filteredSections.map((s) => s.key)));
  }, [filteredSections, search]);

  const totalActivities = sections.reduce((sum, s) => sum + s.activities.length, 0);
  const totalWithVideo = sections.reduce(
    (sum, s) => sum + s.activities.filter((a) => !!videos[a.id]).length,
    0
  );

  function mark(id: string, on: boolean) {
    setBusy((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function uploadFile(skillId: string, sectionKey: string, activityTitle: string, file: File, kind: 'video' | 'thumbnail') {
    mark(skillId, true);
    try {
      const extension = file.name.split('.').pop() || (kind === 'video' ? 'mp4' : 'jpg');
      const { path, token } = await callAdmin({
        action: 'upload-url',
        skill_id: skillId,
        kind,
        extension,
      });

      const { error: uploadError } = await supabase.storage
        .from('activity-videos')
        .uploadToSignedUrl(path, token, file);
      if (uploadError) throw uploadError;

      const existing = videos[skillId];
      const payload = {
        action: 'upsert',
        skill_id: skillId,
        section_key: sectionKey,
        title: existing?.title || activityTitle,
        storage_path: kind === 'video' ? path : existing?.storage_path,
        thumbnail_path: kind === 'thumbnail' ? path : existing?.thumbnail_path ?? null,
        duration_seconds: existing?.duration_seconds ?? null,
        active: existing?.active ?? true,
        free_preview: existing?.free_preview ?? false,
      };
      if (!payload.storage_path) throw new Error('Upload the video file first');

      const { video } = await callAdmin(payload);
      setVideos((prev) => ({ ...prev, [skillId]: video }));
      toast({ title: kind === 'video' ? 'Video uploaded' : 'Thumbnail uploaded', description: activityTitle });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      mark(skillId, false);
    }
  }

  async function saveRow(skillId: string, patch: Partial<VideoRow>, sectionKey: string, activityTitle: string) {
    const existing = videos[skillId];
    if (!existing) return;
    const merged = { ...existing, ...patch };
    setVideos((prev) => ({ ...prev, [skillId]: merged }));
    mark(skillId, true);
    try {
      const { video } = await callAdmin({
        action: 'upsert',
        skill_id: skillId,
        section_key: sectionKey,
        title: merged.title || activityTitle,
        storage_path: merged.storage_path,
        thumbnail_path: merged.thumbnail_path,
        duration_seconds: merged.duration_seconds,
        active: merged.active,
        free_preview: merged.free_preview,
      });
      setVideos((prev) => ({ ...prev, [skillId]: video }));
    } catch (err: any) {
      toast({ title: 'Save failed', description: err.message, variant: 'destructive' });
    } finally {
      mark(skillId, false);
    }
  }

  async function removeVideo(skillId: string) {
    mark(skillId, true);
    try {
      await callAdmin({ action: 'delete', skill_id: skillId });
      setVideos((prev) => {
        const next = { ...prev };
        delete next[skillId];
        return next;
      });
      toast({ title: 'Video removed' });
    } catch (err: any) {
      toast({ title: 'Delete failed', description: err.message, variant: 'destructive' });
    } finally {
      mark(skillId, false);
    }
  }

  function toggleSection(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/verify" replace />;

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      <AdminBackBar />
      <header>
        <h1 className="text-3xl font-bold">Activity Videos</h1>
        <p className="text-muted-foreground">
          Upload one presentation video per activity. {totalWithVideo} of {totalActivities} activities have a video.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Video className="w-4 h-4" aria-hidden="true" />
            Overall coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${totalActivities ? (totalWithVideo / totalActivities) * 100 : 0}%` }}
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {totalWithVideo} uploaded · {totalActivities - totalWithVideo} remaining
          </p>
        </CardContent>
      </Card>

      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-y -mx-6 px-6 py-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <Input
            type="search"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search activities"
            className="sm:max-w-md"
          />
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setExpanded(new Set(filteredSections.map((s) => s.key)))}>
              Expand all
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setExpanded(new Set())}>
              Collapse all
            </Button>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Curriculum areas">
          {filteredSections.map((section) => {
            const done = section.activities.filter((a) => !!videos[a.id]).length;
            const isExpanded = expanded.has(section.key);
            return (
              <button
                key={section.key}
                onClick={() => {
                  sectionRefs.current[section.key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setExpanded((prev) => new Set(prev).add(section.key));
                }}
                className={cn(
                  'shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors',
                  isExpanded ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-muted border-border'
                )}
                aria-pressed={isExpanded}
              >
                <span aria-hidden="true">{section.emoji}</span>
                <span className="whitespace-nowrap">{section.title}</span>
                <span className={cn('text-xs', isExpanded ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  {done}/{section.activities.length}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-6">
          {filteredSections.map((section) => {
            const isOpen = expanded.has(section.key);
            const done = section.activities.filter((a) => !!videos[a.id]).length;
            return (
              <Card
                key={section.key}
                ref={(el) => {
                  sectionRefs.current[section.key] = el;
                }}
              >
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span aria-hidden="true">{section.emoji}</span>
                    <span className="font-semibold">{section.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {done} of {section.activities.length} with video
                    </span>
                  </div>
                  {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {isOpen && (
                  <CardContent className="pt-0 pb-4 space-y-3">
                    {section.activities.map((activity) => {
                      const row = videos[activity.id];
                      const isBusy = busy.has(activity.id);
                      return (
                        <Card key={activity.id} className={cn(row ? 'border-primary/50' : 'border-border/60')}>
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <div>
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-xs text-muted-foreground">{activity.id}</p>
                              </div>
                              {row ? (
                                <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-0.5">
                                  Video uploaded
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">No video yet</span>
                              )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <div className="flex-1 space-y-1.5">
                                <Label htmlFor={`video-${activity.id}`}>
                                  {row ? 'Replace video file' : 'Upload video file'}
                                </Label>
                                <Input
                                  id={`video-${activity.id}`}
                                  type="file"
                                  accept="video/*"
                                  disabled={isBusy}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) void uploadFile(activity.id, section.key, activity.title, file, 'video');
                                    e.target.value = '';
                                  }}
                                />
                              </div>
                              <div className="flex-1 space-y-1.5">
                                <Label htmlFor={`thumb-${activity.id}`}>Thumbnail (optional)</Label>
                                <Input
                                  id={`thumb-${activity.id}`}
                                  type="file"
                                  accept="image/*"
                                  disabled={isBusy || !row}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) void uploadFile(activity.id, section.key, activity.title, file, 'thumbnail');
                                    e.target.value = '';
                                  }}
                                />
                              </div>
                            </div>

                            {row && (
                              <>
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <div className="flex-1 space-y-1.5">
                                    <Label htmlFor={`title-${activity.id}`}>Video title</Label>
                                    <Input
                                      id={`title-${activity.id}`}
                                      defaultValue={row.title ?? activity.title}
                                      onBlur={(e) =>
                                        void saveRow(activity.id, { title: e.target.value }, section.key, activity.title)
                                      }
                                    />
                                  </div>
                                  <div className="flex-1 space-y-1.5">
                                    <Label htmlFor={`dur-${activity.id}`}>Length in seconds (optional)</Label>
                                    <Input
                                      id={`dur-${activity.id}`}
                                      type="number"
                                      min={0}
                                      defaultValue={row.duration_seconds ?? ''}
                                      onBlur={(e) =>
                                        void saveRow(
                                          activity.id,
                                          { duration_seconds: e.target.value ? Number(e.target.value) : null },
                                          section.key,
                                          activity.title
                                        )
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <Checkbox
                                        id={`active-${activity.id}`}
                                        checked={row.active}
                                        disabled={isBusy}
                                        onCheckedChange={(checked) =>
                                          void saveRow(activity.id, { active: checked === true }, section.key, activity.title)
                                        }
                                      />
                                      <Label htmlFor={`active-${activity.id}`} className="text-sm font-normal">
                                        Active
                                      </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Checkbox
                                        id={`free-${activity.id}`}
                                        checked={row.free_preview}
                                        disabled={isBusy}
                                        onCheckedChange={(checked) =>
                                          void saveRow(
                                            activity.id,
                                            { free_preview: checked === true },
                                            section.key,
                                            activity.title
                                          )
                                        }
                                      />
                                      <Label htmlFor={`free-${activity.id}`} className="text-sm font-normal">
                                        Free starter video
                                      </Label>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {isBusy && <span className="text-xs text-muted-foreground">Working…</span>}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      disabled={isBusy}
                                      onClick={() => void removeVideo(activity.id)}
                                      aria-label={`Remove video for ${activity.title}`}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" aria-hidden="true" />
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminVideosPage;
