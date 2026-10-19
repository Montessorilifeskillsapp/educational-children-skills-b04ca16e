import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { can, Classroom, PlanItem, schoolCall, SchoolRole, Student } from './api';
import { areas, orderedSkills, skillById } from './curriculum';

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const monday = (d: Date) => { const x = new Date(d); const day = (x.getDay() + 6) % 7; x.setDate(x.getDate() - day); x.setHours(0, 0, 0, 0); return x; };

interface Props { role: SchoolRole; classroom: Classroom; students: Student[]; plans: PlanItem[]; onChange: () => void; initial?: { skill_id: string; student_ids: string[] } | null; onInitialUsed: () => void }

export default function PlanningTab({ role, classroom, students, plans, onChange, initial, onInitialUsed }: Props) {
  const { toast } = useToast();
  const [week, setWeek] = useState(() => monday(new Date()));
  const [draft, setDraft] = useState<Partial<PlanItem> & { area?: string } | null>(initial ? { plan_date: iso(new Date()), skill_id: initial.skill_id, student_ids: initial.student_ids, area: skillById(initial.skill_id)?.areaKey } : null);
  const days = useMemo(() => Array.from({ length: 5 }, (_, i) => { const d = new Date(week); d.setDate(d.getDate() + i); return d; }), [week]);
  const names = new Map(students.map((s) => [s.id, s.name]));
  const edit = can.plan(role);

  const close = () => { setDraft(null); onInitialUsed(); };
  const save = async () => {
    if (!draft?.skill_id || !draft.plan_date) return;
    try {
      await schoolCall({ action: 'plan_save', classroom_id: classroom.id, id: draft.id, plan_date: draft.plan_date, skill_id: draft.skill_id, student_ids: draft.student_ids ?? [], notes: draft.notes || null });
      close(); onChange();
    } catch (e) { toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' }); }
  };
  const act = async (body: Record<string, unknown>) => {
    try { await schoolCall(body); onChange(); } catch (e) { toast({ title: 'Could not update', description: (e as Error).message, variant: 'destructive' }); }
  };
  const areaSkills = orderedSkills().filter((s) => s.areaKey === (draft?.area ?? areas()[0].key));

  return (
    <Card className="print:shadow-none print:border-0">
      <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap space-y-0">
        <CardTitle className="text-lg">Week of {week.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} · {classroom.name}</CardTitle>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={() => setWeek(new Date(week.getTime() - 7 * 864e5))}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => setWeek(monday(new Date()))}>This week</Button>
          <Button variant="outline" size="sm" onClick={() => setWeek(new Date(week.getTime() + 7 * 864e5))}>Next</Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>Print</Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-5">
        {days.map((d) => {
          const items = plans.filter((p) => p.plan_date === iso(d));
          return (
            <div key={iso(d)} className="rounded-md border border-border p-2 min-h-[140px]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">{d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}</p>
                {edit && <Button size="sm" variant="ghost" className="h-7 px-2 print:hidden" onClick={() => setDraft({ plan_date: iso(d), student_ids: [] })}>Add</Button>}
              </div>
              <ul className="space-y-2">
                {items.map((p) => {
                  const sk = skillById(p.skill_id);
                  return (
                    <li key={p.id} className={`rounded p-2 text-xs bg-muted ${p.done ? 'opacity-60' : ''}`}>
                      <div className="flex items-start gap-2">
                        <Checkbox checked={p.done} onCheckedChange={(v) => act({ action: 'plan_done', id: p.id, done: !!v })} aria-label="Mark done" className="mt-0.5 print:hidden" />
                        <div className="flex-1">
                          {sk ? <Link to={sk.route} className={`font-medium hover:underline ${p.done ? 'line-through' : ''}`}>{sk.title}</Link> : <span>{p.skill_id}</span>}
                          <p className="text-muted-foreground">{p.student_ids.length ? p.student_ids.map((id) => names.get(id) ?? '').filter(Boolean).join(', ') : 'Whole class'}</p>
                          {p.notes && <p className="mt-1">{p.notes}</p>}
                        </div>
                      </div>
                      {edit && (
                        <div className="flex gap-1 mt-1 print:hidden">
                          <button className="underline" onClick={() => setDraft({ ...p, area: sk?.areaKey })}>Edit</button>
                          <button className="underline text-destructive ml-2" onClick={() => act({ action: 'plan_delete', id: p.id })}>Remove</button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </CardContent>

      <Dialog open={!!draft} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{draft?.id ? 'Edit plan' : 'Plan an activity'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Date</Label><Input type="date" value={draft?.plan_date ?? ''} onChange={(e) => setDraft({ ...draft, plan_date: e.target.value })} /></div>
            <div><Label>Area</Label>
              <Select value={draft?.area ?? areas()[0].key} onValueChange={(v) => setDraft({ ...draft, area: v, skill_id: undefined })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{areas().map((a) => <SelectItem key={a.key} value={a.key}>{a.title}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Activity</Label>
              <Select value={draft?.skill_id} onValueChange={(v) => setDraft({ ...draft, skill_id: v })}>
                <SelectTrigger><SelectValue placeholder="Choose an activity" /></SelectTrigger>
                <SelectContent>{areaSkills.map((s) => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Students (leave empty for the whole class)</Label>
              <div className="grid grid-cols-2 gap-1 mt-1 max-h-40 overflow-y-auto">
                {students.map((s) => {
                  const on = draft?.student_ids?.includes(s.id) ?? false;
                  return (
                    <label key={s.id} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={on} onCheckedChange={() => setDraft({ ...draft, student_ids: on ? draft!.student_ids!.filter((x) => x !== s.id) : [...(draft?.student_ids ?? []), s.id] })} />{s.name}
                    </label>
                  );
                })}
              </div>
            </div>
            <div><Label>Notes</Label><Textarea value={draft?.notes ?? ''} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={save} disabled={!draft?.skill_id}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
