import { useMemo, useState } from 'react';
import { Mail, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { can, Observation, Progress, Report, schoolCall, SchoolRole, Student } from './api';
import { areas, nextSuggestions, skillById } from './curriculum';
import { STATUS_LABEL } from './ProgressChooser';

interface Props {
  role: SchoolRole; students: Student[]; progress: Progress[]; observations: Observation[]; reports: Report[];
  schoolName: string; schoolEmail: string | null; onChange: () => void; onEditStudent: (id: string) => void;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

export default function ReportsTab({ role, students, progress, observations, reports, schoolName, schoolEmail, onChange, onEditStudent }: Props) {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(students[0]?.id ?? null);
  const [from, setFrom] = useState(() => iso(new Date(Date.now() - 30 * 864e5)));
  const [to, setTo] = useState(() => iso(new Date()));
  const [edits, setEdits] = useState<Record<string, { title: string; body: string }>>({});
  const [sending, setSending] = useState(false);
  const student = students.find((s) => s.id === selected) ?? null;
  const canSend = can.sendReport(role);

  const lastSent = (id: string) => reports.filter((r) => r.student_id === id && (r.summary.email_status === 'queued' || r.summary.email_status === 'school_mail')).sort((a, b) => b.period_end.localeCompare(a.period_end))[0];

  const generated = useMemo(() => {
    if (!student) return null;
    const inRange = (d: string) => d.slice(0, 10) >= from && d.slice(0, 10) <= to;
    const mine = progress.filter((p) => p.student_id === student.id);
    const lines: string[] = [`Progress summary for ${student.name}, ${from} to ${to}.`, ''];
    for (const a of areas()) {
      const items = mine.filter((p) => inRange(p.updated_at) && skillById(p.skill_id)?.areaKey === a.key);
      if (!items.length) continue;
      lines.push(`${a.title}:`);
      items.forEach((p) => lines.push(`• ${skillById(p.skill_id)?.title ?? p.skill_id} — ${STATUS_LABEL[p.status]}${p.note ? ` (${p.note})` : ''}`));
      lines.push('');
    }
    const notes = observations.filter((o) => o.student_id === student.id && inRange(o.observed_at)).sort((a, b) => a.observed_at.localeCompare(b.observed_at));
    if (notes.length) { lines.push('Observations:'); notes.forEach((o) => lines.push(`• ${o.observed_at.slice(0, 10)}: ${o.body}`)); lines.push(''); }
    const next = nextSuggestions(mine);
    if (next.length) { lines.push('Coming next:'); next.forEach((s) => lines.push(`• ${s.title} (${s.areaTitle})`)); }
    return { title: `Progress report for ${student.name}`, body: lines.join('\n').trim() };
  }, [student, progress, observations, from, to]);

  const key = student ? `${student.id}:${from}:${to}` : '';
  const report = (key && edits[key]) || generated;
  const setReport = (r: { title: string; body: string }) => setEdits((e) => ({ ...e, [key]: r }));

  const send = () => {
    if (!student || !report || !student.family_email || sending) return;
    const subject = `${schoolName} · ${report.title}`;
    const body = `${report.body}\n\nWith warm regards,\n${schoolName}${schoolEmail ? `\n${schoolEmail}` : ''}`;
    window.location.href = `mailto:${encodeURIComponent(student.family_email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSending(true);
    schoolCall({ action: 'report_record', student_id: student.id, period_start: from, period_end: to, title: report.title, body: report.body })
      .then(() => { toast({ title: 'Report opened in your school email', description: `Press Send in your email app to deliver it to ${student.family_email}.` }); onChange(); })
      .catch((e) => toast({ title: 'Email opened, but the record was not saved', description: (e as Error).message, variant: 'destructive' }))
      .finally(() => setSending(false));
  };

  const print = () => {
    if (!report) return;
    const w = window.open('', '_blank'); if (!w) return;
    w.document.title = report.title;
    const pre = w.document.createElement('pre'); pre.style.cssText = 'font-family:Georgia,serif;white-space:pre-wrap;font-size:14px;padding:24px';
    pre.textContent = `${schoolName}\n\n${report.title}\n\n${report.body}`; w.document.body.appendChild(pre); w.print();
  };

  if (!students.length) return <p className="py-6 text-muted-foreground">No students in this classroom yet. Add them under Class roster.</p>;

  return (
    <section className="pt-3 grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div><Label htmlFor="rf">From</Label><Input id="rf" type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></div>
          <div><Label htmlFor="rt">To</Label><Input id="rt" type="date" value={to} onChange={(e) => setTo(e.target.value)} /></div>
        </div>
        <ul className="rounded-md border border-border divide-y divide-border max-h-[520px] overflow-y-auto">
          {students.map((s) => {
            const last = lastSent(s.id);
            return (
              <li key={s.id}>
                <button onClick={() => setSelected(s.id)} aria-pressed={s.id === selected}
                  className={`w-full text-left px-3 py-3 transition-colors ${s.id === selected ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}>
                  <span className="block font-medium">{s.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {!s.family_email ? 'No parent email' : last ? `Last report to ${last.period_end}` : 'Not sent yet'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {student && report && (
        <div className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{student.name}</h2>
              <p className="text-sm text-muted-foreground">To: {student.family_email || 'no parent email saved'}</p>
            </div>
            {!student.family_email && <Button size="sm" variant="outline" onClick={() => onEditStudent(student.id)}>Add parent email</Button>}
          </div>
          <Input aria-label="Report title" value={report.title} onChange={(e) => setReport({ ...report, title: e.target.value })} disabled={!canSend} />
          <Textarea aria-label="Report" rows={16} value={report.body} onChange={(e) => setReport({ ...report, body: e.target.value })} disabled={!canSend} />
          {canSend ? (
            <div className="flex flex-wrap gap-2">
              <Button size="lg" onClick={send} disabled={sending || !student.family_email}>
                <Mail className="h-4 w-4 mr-2" />{student.family_email ? 'Send from school email' : 'Add a parent email first'}
              </Button>
              <Button size="lg" variant="outline" onClick={print}><Printer className="h-4 w-4 mr-2" />Print</Button>
            </div>
          ) : <p className="text-sm text-muted-foreground">Assistants can view reports. A Teacher or School Admin sends them.</p>}
          <p className="text-xs text-muted-foreground">Opens your school email app with the parent, subject and report filled in — just press Send.</p>
        </div>
      )}
    </section>
  );
}
