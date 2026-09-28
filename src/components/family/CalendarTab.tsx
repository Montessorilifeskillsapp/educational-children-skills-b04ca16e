import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CalendarPlus, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { areaOfSkill, titleOfSkill } from '@/lib/skillArea';
import { cn } from '@/lib/utils';
import { call, CalEvent, Completion } from './api';
import { downloadIcs } from './ics';

type Draft = { id?: string; area: string; skill_id: string; date: string; time: string; duration_minutes: number; notes: string; completed: boolean };
const pad = (n: number) => String(n).padStart(2, '0');
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const CalendarTab = ({ childId, childName, events, completions, reload }: {
  childId: string; childName: string; events: CalEvent[]; completions: Completion[]; reload: () => void;
}) => {
  const { toast } = useToast();
  const [view, setView] = useState<'month' | 'week'>('month');
  const [cursor, setCursor] = useState(new Date());
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const days = useMemo(() => {
    if (view === 'week') {
      const s = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - cursor.getDay());
      return Array.from({ length: 7 }, (_, i) => new Date(s.getFullYear(), s.getMonth(), s.getDate() + i));
    }
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const s = new Date(first.getFullYear(), first.getMonth(), 1 - first.getDay());
    return Array.from({ length: 42 }, (_, i) => new Date(s.getFullYear(), s.getMonth(), s.getDate() + i));
  }, [view, cursor]);

  const byDay = useMemo(() => {
    const m = new Map<string, { events: CalEvent[]; done: Completion[] }>();
    const get = (k: string) => m.get(k) ?? (m.set(k, { events: [], done: [] }), m.get(k)!);
    events.forEach((e) => get(ymd(new Date(e.starts_at))).events.push(e));
    const scheduledDone = new Set(events.filter((e) => e.completed).map((e) => `${ymd(new Date(e.starts_at))}|${e.skill_id}`));
    completions.forEach((c) => {
      if (!c.completed_at) return;
      const k = ymd(new Date(c.completed_at));
      if (!scheduledDone.has(`${k}|${c.skill_id}`)) get(k).done.push(c);
    });
    return m;
  }, [events, completions]);

  const shift = (dir: number) => setCursor((c) => view === 'week'
    ? new Date(c.getFullYear(), c.getMonth(), c.getDate() + dir * 7)
    : new Date(c.getFullYear(), c.getMonth() + dir, 1));

  const openNew = (d: Date) => setDraft({ area: 'practical-life', skill_id: '', date: ymd(d), time: '09:30', duration_minutes: 20, notes: '', completed: false });
  const openEdit = (e: CalEvent) => {
    const d = new Date(e.starts_at);
    setDraft({ id: e.id, area: areaOfSkill(e.skill_id), skill_id: e.skill_id, date: ymd(d), time: `${pad(d.getHours())}:${pad(d.getMinutes())}`, duration_minutes: e.duration_minutes, notes: e.notes ?? '', completed: e.completed });
  };

  const save = async (override?: Partial<Draft>) => {
    const d = { ...draft!, ...override };
    if (!d.skill_id) { toast({ title: 'Choose an activity', variant: 'destructive' }); return; }
    setSaving(true);
    try {
      await call({ action: 'event_save', event: {
        id: d.id, child_id: childId, skill_id: d.skill_id, title: titleOfSkill(d.skill_id),
        starts_at: new Date(`${d.date}T${d.time}`).toISOString(), duration_minutes: d.duration_minutes,
        notes: d.notes || null, completed: d.completed,
      } });
      setDraft(null);
      reload();
    } catch (e) {
      toast({ title: 'Could not save', description: String(e), variant: 'destructive' });
    } finally { setSaving(false); }
  };

  const toggleDone = async (e: CalEvent) => {
    await call({ action: 'event_save', event: { ...e, notes: e.notes, completed: !e.completed } });
    reload();
  };
  const remove = async (id: string) => { await call({ action: 'event_delete', id }); setDraft(null); reload(); };

  const today = ymd(new Date());
  const section = curriculumSectionsForMaterials.find((s) => s.key === draft?.area);
  const label = view === 'week'
    ? `${days[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${days[6].toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
    : cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" aria-label="Previous" onClick={() => shift(-1)}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" onClick={() => setCursor(new Date())}>Today</Button>
          <Button size="icon" variant="outline" aria-label="Next" onClick={() => shift(1)}><ChevronRight className="h-4 w-4" /></Button>
          <h3 className="font-semibold ml-2">{label}</h3>
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v as 'month' | 'week')}>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
          </ToggleGroup>
          <Button onClick={() => openNew(new Date())}><Plus className="h-4 w-4 mr-1" />Plan activity</Button>
        </div>
      </div>

      <Card><CardContent className="p-2">
        <div className="grid grid-cols-7 text-xs text-muted-foreground text-center py-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const k = ymd(d);
            const info = byDay.get(k);
            const outside = view === 'month' && d.getMonth() !== cursor.getMonth();
            return (
              <div key={k} role="button" tabIndex={0} onClick={() => openNew(d)} onKeyDown={(e) => e.key === 'Enter' && openNew(d)}
                className={cn('border border-border/60 rounded-md p-1 text-left cursor-pointer hover:bg-muted/50 transition-colors',
                  view === 'week' ? 'min-h-48' : 'min-h-20', outside && 'opacity-40', k === today && 'ring-2 ring-primary')}>
                <div className="text-xs font-medium mb-1">{d.getDate()}</div>
                <div className="space-y-0.5">
                  {info?.events.map((e) => (
                    <button key={e.id} type="button" onClick={(ev) => { ev.stopPropagation(); openEdit(e); }}
                      className={cn('block w-full truncate text-left text-[11px] rounded px-1 py-0.5',
                        e.completed ? 'bg-secondary/20 text-foreground line-through' : 'bg-primary/15 text-foreground')}>
                      {new Date(e.starts_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} {e.title}
                    </button>
                  ))}
                  {info?.done.map((c) => (
                    <div key={c.skill_id} className="truncate text-[11px] rounded px-1 py-0.5 bg-accent/15 text-foreground">✓ {titleOfSkill(c.skill_id)}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent></Card>
      <p className="text-xs text-muted-foreground">Planned activities are shaded; ✓ marks activities completed in the app on that day.</p>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{draft?.id ? 'Planned activity' : `Plan an activity for ${childName}`}</DialogTitle></DialogHeader>
          {draft && (
            <div className="space-y-3">
              <div>
                <Label>Area</Label>
                <Select value={draft.area} onValueChange={(v) => setDraft({ ...draft, area: v, skill_id: '' })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{curriculumSectionsForMaterials.map((s) => <SelectItem key={s.key} value={s.key}>{s.emoji} {s.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Activity</Label>
                <Select value={draft.skill_id} onValueChange={(v) => setDraft({ ...draft, skill_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Choose an activity" /></SelectTrigger>
                  <SelectContent className="max-h-72">
                    {section && Object.entries(section.skills).map(([id, s]) => <SelectItem key={id} value={id}>{s.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div><Label htmlFor="ev-date">Date</Label><Input id="ev-date" type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></div>
                <div><Label htmlFor="ev-time">Time</Label><Input id="ev-time" type="time" value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} /></div>
                <div><Label htmlFor="ev-dur">Minutes</Label><Input id="ev-dur" type="number" min={5} max={240} value={draft.duration_minutes} onChange={(e) => setDraft({ ...draft, duration_minutes: Math.max(5, Math.min(240, Number(e.target.value) || 5)) })} /></div>
              </div>
              <div><Label htmlFor="ev-notes">Notes</Label><Textarea id="ev-notes" maxLength={1000} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></div>
              <label className="flex items-center gap-2 text-sm"><Checkbox checked={draft.completed} onCheckedChange={(c) => setDraft({ ...draft, completed: !!c })} />Done</label>
            </div>
          )}
          <DialogFooter className="gap-2 sm:justify-between">
            <div className="flex gap-2">
              {draft?.id && <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => remove(draft.id!)}><Trash2 className="h-4 w-4" /></Button>}
              {draft?.id && (
                <Button variant="outline" onClick={() => { const e = events.find((x) => x.id === draft.id); if (e) downloadIcs(e, childName); }}>
                  <CalendarPlus className="h-4 w-4 mr-1" />Add to my calendar
                </Button>
              )}
            </div>
            <Button onClick={() => save()} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {events.filter((e) => !e.completed && new Date(e.starts_at) >= new Date()).length > 0 && (
        <Card><CardContent className="p-4 space-y-2">
          <h4 className="font-semibold text-sm">Upcoming</h4>
          {events.filter((e) => !e.completed && new Date(e.starts_at) >= new Date()).slice(0, 8).map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-2 text-sm">
              <label className="flex items-center gap-2"><Checkbox checked={e.completed} onCheckedChange={() => toggleDone(e)} aria-label="Mark done" />{e.title}</label>
              <div className="flex items-center gap-2 text-muted-foreground">
                {new Date(e.starts_at).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                <Button size="icon" variant="ghost" aria-label="Add to my calendar" onClick={() => downloadIcs(e, childName)}><CalendarPlus className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </CardContent></Card>
      )}
    </div>
  );
};
