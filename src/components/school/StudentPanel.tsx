import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { can, Observation, Progress, Report, schoolCall, SchoolRole, Student } from './api';
import { areas, nextSuggestions, orderedSkills, skillById, skillLink } from './curriculum';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProgressChooser, { StatusBadge, lastUpdate, STATUS_LABEL } from './ProgressChooser';
import { allowSchoolNavigation, SCHOOL_LEAVE_EVENT } from './navigation';
import { NoteList, ReportList } from './EditableRecords';
import { setFocus } from './focusStudent';

interface Props {
  role: SchoolRole; userId: string; student: Student | null; progress: Progress[]; observations: Observation[]; reports: Report[];
  onClose: () => void; onChange: () => void; onPlan: (skillId: string, studentId: string) => void;
  schoolName: string; schoolEmail: string | null;
  classmates: Student[]; onSelect: (id: string) => void; nameOf: (userId: string | null) => string;
}

const LABEL = STATUS_LABEL;
const iso = (d: Date) => d.toISOString().slice(0, 10);

export default function StudentPanel({ role, userId, student, progress, observations, reports, onClose, onChange, onPlan, schoolName, schoolEmail, classmates, onSelect, nameOf }: Props) {
  const { toast } = useToast();
  const [area, setArea] = useState(areas()[0].key);
  const areaSkills = useMemo(() => orderedSkills().filter((s) => s.areaKey === area), [area]);
  const editable = can.recordProgress(role);
  const [note, setNote] = useState('');
  const [from, setFrom] = useState(() => iso(new Date(Date.now() - 30 * 864e5)));
  const [to, setTo] = useState(() => iso(new Date()));
  const [preview, setPreview] = useState<{ title: string; body: string } | null>(null);
  const [sending, setSending] = useState(false);
  const mine = useMemo(() => progress.filter((p) => p.student_id === student?.id), [progress, student]);
  const obs = useMemo(() => observations.filter((o) => o.student_id === student?.id).sort((a, b) => b.observed_at.localeCompare(a.observed_at)), [observations, student]);
  const sent = reports.filter((r) => r.student_id === student?.id && (r.summary.email_status === 'queued' || r.summary.email_status === 'school_mail'));
  const suggestions = useMemo(() => nextSuggestions(mine), [mine]);
  // Curriculum cards show this child's status while staff browse the app from here.
  useEffect(() => {
    if (student) setFocus({ id: student.id, name: student.name, statuses: Object.fromEntries(mine.map((p) => [p.skill_id, p.status])) });
  }, [student?.id, student?.name, mine]);
  useEffect(() => {
    const beforeLeave = (event: Event) => {
      if (sending || (note.trim() && !window.confirm('Discard this unsaved student note?'))) event.preventDefault();
    };
    window.addEventListener(SCHOOL_LEAVE_EVENT, beforeLeave);
    return () => window.removeEventListener(SCHOOL_LEAVE_EVENT, beforeLeave);
  }, [note, sending]);

  if (!student) return null;

  const switchStudent = (id: string) => {
    if (!allowSchoolNavigation()) return;
    setNote(''); setPreview(null); onSelect(id);
  };

  const addNote = async () => {
    if (!note.trim()) return;
    try { await schoolCall({ action: 'observation_add', student_id: student.id, body: note.trim() }); setNote(''); onChange(); }
    catch (e) { toast({ title: 'Could not save note', description: (e as Error).message, variant: 'destructive' }); }
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
  // One tap: opens the teacher's school email app with the parent, subject and report filled in, then records it.
  const send = () => {
    if (!preview || sending || !student.family_email) return;
    const subject = `${schoolName} · ${preview.title}`;
    const body = `${preview.body}\n\nWith warm regards,\n${schoolName}${schoolEmail ? `\n${schoolEmail}` : ''}`;
    window.location.href = `mailto:${encodeURIComponent(student.family_email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSending(true);
    schoolCall({ action: 'report_record', student_id: student.id, period_start: from, period_end: to, title: preview.title, body: preview.body })
      .then(() => { toast({ title: 'Report opened in your school email', description: `Press Send in your email app to deliver it to ${student.family_email}.` }); setPreview(null); onChange(); })
      .catch((e) => toast({ title: 'Email opened, but the record was not saved', description: (e as Error).message, variant: 'destructive' }))
      .finally(() => setSending(false));
  };

  const i = classmates.findIndex((c) => c.id === student.id);
  const showReports = can.sendReport(role) || sent.length > 0;
  const showSupport = !!student.support_notes && role !== 'assistant';
  const exportRecord = async () => {
    try {
      await schoolCall({ action: 'record_export', student_id: student.id });
      const record = { exported_at: new Date().toISOString(), school: schoolName, student: { name: student.name, date_of_birth: student.date_of_birth, family_email: student.family_email, health_notes: student.health_notes ?? null, support_notes: student.support_notes ?? null },
        progress: mine.map((p) => ({ activity: skillById(p.skill_id)?.title ?? p.skill_id, status: STATUS_LABEL[p.status] ?? p.status, note: p.note, recorded_by: p.updated_by ? nameOf(p.updated_by) : null, presented_at: p.presented_at, updated_at: p.updated_at })),
        observations: obs.map((o) => ({ observed_at: o.observed_at, author: o.author_id ? nameOf(o.author_id) : null, body: o.body, edited_at: o.edited_at ?? null })),
        reports: sent.map((r) => ({ period_start: r.period_start, period_end: r.period_end, title: r.summary.title, body: r.summary.body, sent_to: r.sent_to, sent_at: r.sent_at })) };
      const text = JSON.stringify(record, null, 2);
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)))).map((b) => b.toString(16).padStart(2, '0')).join('');
      const blob = new Blob([JSON.stringify({ ...record, sha256_of_record: digest }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `student-record-${student.id.slice(0, 8)}.json`; a.click(); URL.revokeObjectURL(a.href);
      toast({ title: 'Full record downloaded', description: 'The export was logged in your school change history.' });
    } catch (e) { toast({ title: 'Export failed', description: (e as Error).message, variant: 'destructive' }); }
  };
  return (
    <Dialog open onOpenChange={(o) => { if (!o && allowSchoolNavigation()) onClose(); }}>
      <DialogContent className="school-scale max-w-3xl w-[calc(100%-2rem)] max-h-[88vh] p-0 gap-0 overflow-hidden flex flex-col rounded-2xl">
        <div className="border-b border-border px-6 pt-6 pb-4 space-y-3">
          <DialogHeader className="text-left pr-8">
            <DialogTitle className="text-2xl font-semibold">{student.name}{!editable && <span className="ml-2 text-sm font-normal text-muted-foreground">View only</span>}</DialogTitle>
            {role === 'school_admin' && <Button variant="outline" size="sm" className="mt-2 w-fit" onClick={exportRecord}>Download full record</Button>}
          </DialogHeader>
          {(student.health_notes || showSupport) && (
            <div className="space-y-1 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm" role="note">
              {student.health_notes && <p><span className="font-semibold">Health and allergies: </span>{student.health_notes}</p>}
              {showSupport && <p><span className="font-semibold">Support notes: </span>{student.support_notes}</p>}
            </div>
          )}
          {classmates.length > 1 && (
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" aria-label="Previous child" disabled={i <= 0} onClick={() => switchStudent(classmates[i - 1].id)}><ChevronLeft className="h-4 w-4" /></Button>
              <Select value={student.id} onValueChange={switchStudent}>
                <SelectTrigger aria-label="Child" className="flex-1 max-w-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{classmates.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
              <Button size="icon" variant="outline" aria-label="Next child" disabled={i < 0 || i >= classmates.length - 1} onClick={() => switchStudent(classmates[i + 1].id)}><ChevronRight className="h-4 w-4" /></Button>
              <span className="text-sm text-muted-foreground">{i + 1} of {classmates.length}</span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
        <Tabs defaultValue="notes">
          <TabsList className="mb-5">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            {showReports && <TabsTrigger value="reports">Parent report</TabsTrigger>}
          </TabsList>
          <TabsContent value="progress" className="mt-0 space-y-6">
          <section aria-label="Progress across the nine curriculum areas">
            <h3 className="font-semibold mb-2">Across the curriculum</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {areas().map((a) => {
                const total = orderedSkills().filter((s) => s.areaKey === a.key).length || 1;
                const rec = mine.filter((p) => skillById(p.skill_id)?.areaKey === a.key);
                const m = rec.filter((p) => p.status === 'mastered').length;
                const pr = rec.filter((p) => p.status === 'practising').length;
                const ps = rec.filter((p) => p.status === 'presented').length;
                return (
                  <li key={a.key}>
                    <button type="button" onClick={() => setArea(a.key)} className={`w-full text-left rounded-lg border p-2 transition-colors hover:border-primary ${area === a.key ? 'border-primary bg-accent' : 'border-border'}`}>
                      <span className="block text-xs font-medium truncate">{a.title}</span>
                      <span className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden>
                        <span className="bg-primary" style={{ width: `${(m / total) * 100}%` }} />
                        <span className="bg-primary/60" style={{ width: `${(pr / total) * 100}%` }} />
                        <span className="bg-primary/30" style={{ width: `${(ps / total) * 100}%` }} />
                      </span>
                      <span className="block mt-1 text-[11px] text-muted-foreground">{m} mastered · {pr} practicing · {ps} presented</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h3 className="font-semibold mb-2">Ready for next</h3>
            {suggestions.length === 0 ? <p className="text-sm text-muted-foreground">No next activity suggested yet.</p> : (
              <ul className="space-y-1">
                {suggestions.map((s) => (
                  <li key={s.id} className="flex items-center justify-between text-sm gap-2">
                    <span><Link to={skillLink(s)} onClick={(event) => { if (!allowSchoolNavigation()) event.preventDefault(); }} className="font-medium hover:underline">{s.title}</Link> <span className="text-muted-foreground">· {s.areaTitle}</span></span>
                    {can.plan(role) && <Button size="sm" variant="outline" onClick={() => onPlan(s.id, student.id)}>Plan</Button>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-semibold">Progress</h3>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger className="w-48 h-8"><SelectValue /></SelectTrigger>
                <SelectContent>{areas().map((a) => <SelectItem key={a.key} value={a.key}>{a.title}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <ul className="divide-y divide-border">
              {areaSkills.map((sk) => {
                const p = mine.find((x) => x.skill_id === sk.id);
                return (
                  <li key={sk.id} className="py-2">
                    <Link to={skillLink(sk)} onClick={(event) => { if (!allowSchoolNavigation()) event.preventDefault(); }} className="block text-sm font-medium mb-1 hover:underline">{sk.title}</Link>
                    {editable
                      ? <div className="flex flex-wrap items-center justify-between gap-2"><StatusBadge status={p?.status} /><ProgressChooser key={`${student.id}:${sk.id}`} studentId={student.id} studentName={student.name} activityTitle={sk.title} skillId={sk.id} current={p} nameOf={nameOf} onSaved={onChange} /></div>
                      : <div className="flex items-center gap-2 text-xs text-muted-foreground"><StatusBadge status={p?.status} />{p && <span>{lastUpdate(p, nameOf)}</span>}{p?.note && <span>· {p.note}</span>}</div>}
                  </li>
                );
              })}
            </ul>
          </section>
          </TabsContent>
          <TabsContent value="notes" className="mt-0">
          <section>
            {editable && <div className="rounded-xl border border-border bg-card p-4 mb-5">
              <Label htmlFor="student-note" className="text-base font-semibold">New observation</Label>
              <Textarea id="student-note" rows={4} className="mt-2 text-base" value={note} onChange={(e) => setNote(e.target.value)} placeholder={`What did you observe about ${student.name} today?`} />
              <div className="flex justify-end mt-3"><Button onClick={addNote} disabled={!note.trim()}>Save note</Button></div>
            </div>}
            <h3 className="text-lg font-semibold mb-2">Earlier notes</h3>
            {obs.length === 0 && <p className="text-muted-foreground">No notes yet.</p>}
            <NoteList notes={obs} role={role} userId={userId} nameOf={nameOf} onChange={onChange} />
          </section>
          </TabsContent>
          <TabsContent value="reports" className="mt-0 space-y-6">
          {!can.sendReport(role) && sent.length > 0 && (
            <section>
              <h3 className="font-semibold mb-2">Past parent reports</h3>
              <ReportList reports={sent} role={role} userId={userId} nameOf={nameOf} onChange={onChange} />
            </section>
          )}
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
                    <Button size="sm" onClick={send} disabled={sending || !student.family_email}>{student.family_email ? `Send from school email to ${student.family_email}` : 'Add a family email first'}</Button>
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
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Past parent reports</p>
                  <ReportList reports={sent} role={role} userId={userId} nameOf={nameOf} onChange={onChange} />
                </div>
              )}
            </section>
          )}
          </TabsContent>
        </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
