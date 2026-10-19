import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { can, Observation, Progress, Report, schoolCall, SchoolRole, Student } from './api';
import { areas, nextSuggestions, skillById } from './curriculum';

interface Props {
  role: SchoolRole; userId: string; student: Student | null; progress: Progress[]; observations: Observation[]; reports: Report[];
  onClose: () => void; onChange: () => void; onPlan: (skillId: string, studentId: string) => void;
}

const LABEL = { presented: 'Presented', practising: 'Practising', mastered: 'Mastered' } as const;
const iso = (d: Date) => d.toISOString().slice(0, 10);

export default function StudentPanel({ role, userId, student, progress, observations, reports, onClose, onChange, onPlan }: Props) {
  const { toast } = useToast();
  const [note, setNote] = useState('');
  const [from, setFrom] = useState(() => iso(new Date(Date.now() - 30 * 864e5)));
  const [to, setTo] = useState(() => iso(new Date()));
  const [preview, setPreview] = useState<{ title: string; body: string } | null>(null);
  const mine = useMemo(() => progress.filter((p) => p.student_id === student?.id), [progress, student]);
  const obs = useMemo(() => observations.filter((o) => o.student_id === student?.id).sort((a, b) => b.observed_at.localeCompare(a.observed_at)), [observations, student]);
  const sent = reports.filter((r) => r.student_id === student?.id).sort((a, b) => (b.sent_at ?? '').localeCompare(a.sent_at ?? ''));
  const suggestions = useMemo(() => nextSuggestions(mine), [mine]);

  if (!student) return null;

  const addNote = async () => {
    if (!note.trim()) return;
    try { await schoolCall({ action: 'observation_add', student_id: student.id, body: note.trim() }); setNote(''); onChange(); }
    catch (e) { toast({ title: 'Could not save note', description: (e as Error).message, variant: 'destructive' }); }
  };
  const delNote = async (id: string) => {
    try { await schoolCall({ action: 'observation_delete', id }); onChange(); } catch (e) { toast({ title: 'Could not delete', description: (e as Error).message, variant: 'destructive' }); }
  };

  const buildReport = () => {
    const inRange = (d: string) => d.slice(0, 10) >= from && d.slice(0, 10) <= to;
    const lines: string[] = [`Progress summary for ${student.name}, ${from} to ${to}.`, ''];
    for (const a of areas()) {
      const items = mine.filter((p) => inRange(p.updated_at) && skillById(p.skill_id)?.areaKey === a.key);
      if (!items.length) continue;
      lines.push(`${a.title}:`);
      items.forEach((p) => lines.push(`• ${skillById(p.skill_id)?.title ?? p.skill_id} — ${LABEL[p.status]}${p.note ? ` (${p.note})` : ''}`));
      lines.push('');
    }
    const notes = obs.filter((o) => inRange(o.observed_at));
    if (notes.length) { lines.push('Observations:'); notes.slice().reverse().forEach((o) => lines.push(`• ${o.observed_at.slice(0, 10)}: ${o.body}`)); lines.push(''); }
    if (suggestions.length) { lines.push('Coming next:'); suggestions.forEach((s) => lines.push(`• ${s.title} (${s.areaTitle})`)); }
    setPreview({ title: `Progress report for ${student.name}`, body: lines.join('\n').trim() });
  };
  const send = async () => {
    if (!preview) return;
    try {
      await schoolCall({ action: 'report_send', student_id: student.id, period_start: from, period_end: to, title: preview.title, body: preview.body, summary: { records: mine.length } });
      toast({ title: 'Report sent', description: `Emailed to ${student.family_email}` }); setPreview(null); onChange();
    } catch (e) { toast({ title: 'Could not send', description: (e as Error).message, variant: 'destructive' }); }
  };

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader><SheetTitle>{student.name}</SheetTitle></SheetHeader>
        <div className="space-y-6 mt-4">
          <section>
            <h3 className="font-semibold mb-2">Ready for next</h3>
            {suggestions.length === 0 ? <p className="text-sm text-muted-foreground">Suggestions appear once an activity is marked Mastered.</p> : (
              <ul className="space-y-1">
                {suggestions.map((s) => (
                  <li key={s.id} className="flex items-center justify-between text-sm gap-2">
                    <span>{s.title} <span className="text-muted-foreground">· {s.areaTitle}</span></span>
                    {can.plan(role) && <Button size="sm" variant="outline" onClick={() => onPlan(s.id, student.id)}>Plan</Button>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h3 className="font-semibold mb-2">Progress</h3>
            {mine.length === 0 ? <p className="text-sm text-muted-foreground">Nothing recorded yet.</p> : areas().map((a) => {
              const items = mine.filter((p) => skillById(p.skill_id)?.areaKey === a.key);
              if (!items.length) return null;
              return (
                <div key={a.key} className="mb-2">
                  <p className="text-sm font-medium">{a.title}</p>
                  <ul className="text-sm text-muted-foreground">
                    {items.map((p) => <li key={p.id}>{skillById(p.skill_id)?.title ?? p.skill_id} — {LABEL[p.status]}</li>)}
                  </ul>
                </div>
              );
            })}
          </section>

          <section>
            <h3 className="font-semibold mb-2">Observation notes</h3>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="What did you observe?" />
            <Button size="sm" className="mt-2" onClick={addNote} disabled={!note.trim()}>Add note</Button>
            <ul className="mt-3 space-y-2">
              {obs.map((o) => (
                <li key={o.id} className="text-sm border-l-2 border-border pl-3">
                  <p className="text-xs text-muted-foreground">{new Date(o.observed_at).toLocaleString()}</p>
                  <p className="whitespace-pre-wrap">{o.body}</p>
                  {(o.author_id === userId || can.editRoster(role)) && <button className="text-xs underline text-destructive" onClick={() => delNote(o.id)}>Delete</button>}
                </li>
              ))}
            </ul>
          </section>

          {can.sendReport(role) && (
            <section>
              <h3 className="font-semibold mb-2">Parent report</h3>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>From</Label><Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></div>
                <div><Label>To</Label><Input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></div>
              </div>
              <Button size="sm" className="mt-2" variant="outline" onClick={buildReport}>Preview report</Button>
              {preview && (
                <div className="mt-3 space-y-2">
                  <Input value={preview.title} onChange={(e) => setPreview({ ...preview, title: e.target.value })} />
                  <Textarea rows={12} value={preview.body} onChange={(e) => setPreview({ ...preview, body: e.target.value })} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={send} disabled={!student.family_email}>{student.family_email ? `Email to ${student.family_email}` : 'Add a family email first'}</Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      const w = window.open('', '_blank'); if (!w) return;
                      w.document.title = preview.title;
                      const pre = w.document.createElement('pre'); pre.style.cssText = 'font-family:Georgia,serif;white-space:pre-wrap;font-size:14px;padding:24px';
                      pre.textContent = `${preview.title}\n\n${preview.body}`; w.document.body.appendChild(pre); w.print();
                    }}>Print</Button>
                  </div>
                </div>
              )}
              {sent.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium">Sent reports</p>
                  <ul className="text-sm text-muted-foreground">{sent.map((r) => <li key={r.id}>{r.sent_at?.slice(0, 10)} · {r.period_start} to {r.period_end} · {r.sent_to}</li>)}</ul>
                </div>
              )}
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
