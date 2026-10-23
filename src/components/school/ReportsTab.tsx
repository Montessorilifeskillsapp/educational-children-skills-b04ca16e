import { useEffect, useMemo, useState } from 'react';
import { Mail, Palette, Printer } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { can, Observation, Progress, Report, schoolCall, SchoolRole, Student } from './api';
import { areas, nextSuggestions, skillById } from './curriculum';
import { STATUS_LABEL } from './ProgressChooser';
import { ReportList } from './EditableRecords';
import { conferenceHtml } from './conferenceReport';

interface Props {
  role: SchoolRole; students: Student[]; progress: Progress[]; observations: Observation[]; reports: Report[];
  schoolName: string; schoolEmail: string | null; onChange: () => void; onEditStudent: (id: string) => void;
  userId: string; nameOf: (id: string | null) => string;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

/** The school's own report wording, kept on this device so every report reads in the school's voice. */
export interface ReportStyle { heading: string; opening: string; closing: string; signoff: string; observations: boolean; next: boolean; areas: string[] }
const DEFAULT_STYLE: ReportStyle = { heading: 'Progress report', opening: '', closing: '', signoff: '', observations: true, next: true, areas: [] };
const styleKey = (school: string) => `school-report-style:${school}`;
function loadStyle(school: string): ReportStyle {
  try { return { ...DEFAULT_STYLE, ...JSON.parse(localStorage.getItem(styleKey(school)) || '{}') }; } catch { return DEFAULT_STYLE; }
}

export default function ReportsTab({ role, students, progress, observations, reports, schoolName, schoolEmail, onChange, onEditStudent, userId, nameOf }: Props) {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(students[0]?.id ?? null);
  const [from, setFrom] = useState(() => iso(new Date(Date.now() - 30 * 864e5)));
  const [to, setTo] = useState(() => iso(new Date()));
  const [sending, setSending] = useState(false);
  const [style, setStyle] = useState<ReportStyle>(() => loadStyle(schoolName));
  const [styleOpen, setStyleOpen] = useState(false);
  useEffect(() => { try { localStorage.setItem(styleKey(schoolName), JSON.stringify(style)); } catch { /* ignore */ } }, [style, schoolName]);
  const patchStyle = (p: Partial<ReportStyle>) => setStyle((s) => ({ ...s, ...p }));
  const student = students.find((s) => s.id === selected) ?? null;
  const canSend = can.sendReport(role);

  const lastSent = (id: string) => reports.filter((r) => r.student_id === id && (r.summary.email_status === 'queued' || r.summary.email_status === 'school_mail')).sort((a, b) => b.period_end.localeCompare(a.period_end))[0];

  const generated = useMemo(() => {
    if (!student) return null;
    const inRange = (d: string) => d.slice(0, 10) >= from && d.slice(0, 10) <= to;
    const mine = progress.filter((p) => p.student_id === student.id);
    const lines: string[] = [];
    if (style.opening.trim()) lines.push(style.opening.trim().split('{child}').join(student.name), '');
    lines.push(`Summary for ${student.name}, ${from} to ${to}.`, '');
    for (const a of areas()) {
      if (style.areas.length && !style.areas.includes(a.key)) continue;
      const items = mine.filter((p) => inRange(p.updated_at) && skillById(p.skill_id)?.areaKey === a.key);
      if (!items.length) continue;
      lines.push(`${a.title}:`);
      items.forEach((p) => lines.push(`• ${skillById(p.skill_id)?.title ?? p.skill_id} — ${STATUS_LABEL[p.status]}${p.note ? ` (${p.note})` : ''}`));
      lines.push('');
    }
    const notes = observations.filter((o) => o.student_id === student.id && inRange(o.observed_at)).sort((a, b) => a.observed_at.localeCompare(b.observed_at));
    if (style.observations && notes.length) { lines.push('Observations:'); notes.forEach((o) => lines.push(`• ${o.observed_at.slice(0, 10)}: ${o.body}`)); lines.push(''); }
    const next = nextSuggestions(mine);
    if (style.next && next.length) { lines.push('Coming next:'); next.forEach((s) => lines.push(`• ${s.title} (${s.areaTitle})`)); }
    if (style.closing.trim()) lines.push('', style.closing.trim().split('{child}').join(student.name));
    return { title: `${style.heading.trim() || 'Progress report'} · ${student.name}`, body: lines.join('\n').trim() };
  }, [student, progress, observations, from, to, style]);

  // Edits autosave on this device per child and period, so staff can leave and come back to finish.
  const [draft, setDraft, clearDraft] = useDraft<{ title: string; body: string } | null>(student ? `${userId}:report:${student.id}:${from}:${to}` : null, null);
  const report = draft || generated;
  const setReport = (r: { title: string; body: string }) => setDraft(r);

  const send = () => {
    if (!student || !report || !student.family_email || sending) return;
    const subject = `${schoolName} · ${report.title}`;
    const body = `${report.body}\n\n${style.signoff.trim() || 'With warm regards,'}\n${schoolName}${schoolEmail ? `\n${schoolEmail}` : ''}`;
    window.location.href = `mailto:${encodeURIComponent(student.family_email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSending(true);
    schoolCall({ action: 'report_record', student_id: student.id, period_start: from, period_end: to, title: report.title, body: report.body })
      .then(() => { toast({ title: 'Report opened in your school email', description: `Press Send in your email app to deliver it to ${student.family_email}.` }); clearDraft(); onChange(); })
      .catch((e) => toast({ title: 'Email opened, but the record was not saved', description: (e as Error).message, variant: 'destructive' }))
      .finally(() => setSending(false));
  };

  const print = () => {
    if (!report || !student) return;
    const w = window.open('', '_blank'); if (!w) { toast({ title: 'Allow pop-ups to print', description: 'Your browser blocked the print window.', variant: 'destructive' }); return; }
    w.document.open();
    w.document.write(conferenceHtml({ schoolName, schoolEmail, studentName: student.name, periodStart: from, periodEnd: to, title: report.title, body: report.body, signoff: style.signoff.trim() }));
    w.document.close();
    w.focus(); setTimeout(() => w.print(), 250);
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
          {canSend && (
            <div className="rounded-lg border border-border bg-muted/40">
              <button type="button" onClick={() => setStyleOpen(!styleOpen)} aria-expanded={styleOpen}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 min-h-11 text-left">
                <span className="flex items-center gap-2 font-medium text-foreground"><Palette className="h-4 w-4" />School report style</span>
                <span className="text-sm text-muted-foreground">{styleOpen ? 'Close' : 'Customize'}</span>
              </button>
              {styleOpen && (
                <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label htmlFor="rs-h">Report heading (term or cycle)</Label><Input id="rs-h" value={style.heading} placeholder="e.g. Autumn Term Observations" onChange={(e) => patchStyle({ heading: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label htmlFor="rs-o">Opening note</Label><Textarea id="rs-o" rows={2} value={style.opening} placeholder="Dear family of {child}, …" onChange={(e) => patchStyle({ opening: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label htmlFor="rs-c">Closing note</Label><Textarea id="rs-c" rows={2} value={style.closing} placeholder="A thought from the guide to finish the report" onChange={(e) => patchStyle({ closing: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label htmlFor="rs-s">Sign-off</Label><Input id="rs-s" value={style.signoff} placeholder="With warm regards," onChange={(e) => patchStyle({ signoff: e.target.value })} /></div>
                  <label className="flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 min-h-11"><span className="text-sm">Include observations</span><Switch checked={style.observations} onCheckedChange={(v) => patchStyle({ observations: v })} /></label>
                  <label className="flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 min-h-11"><span className="text-sm">Include “Coming next”</span><Switch checked={style.next} onCheckedChange={(v) => patchStyle({ next: v })} /></label>
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium mb-2">Curriculum areas {style.areas.length ? '' : '(all)'}</p>
                    <div className="flex flex-wrap gap-2">
                      {areas().map((a) => {
                        const on = style.areas.includes(a.key);
                        return <Button key={a.key} type="button" size="sm" variant={on ? 'default' : 'outline'} aria-pressed={on} className="min-h-10"
                          onClick={() => patchStyle({ areas: on ? style.areas.filter((k) => k !== a.key) : [...style.areas, a.key] })}>{a.title}</Button>;
                      })}
                    </div>
                  </div>
                  <p className="sm:col-span-2 text-xs text-muted-foreground">Write {'{child}'} to insert the child’s name. This style is saved on this device and used for every report you prepare.</p>
                </div>
              )}
            </div>
          )}
          {draft && canSend && (
            <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
              <span>Your edits are saved on this device.</span>
              <Button size="sm" variant="ghost" onClick={() => { if (window.confirm('Discard your edits and rebuild this report from the records?')) clearDraft(); }}>Start over</Button>
            </div>
          )}
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
          <div className="pt-4 border-t border-border">
            <h3 className="font-semibold mb-2">Past reports for {student.name}</h3>
            <ReportList reports={reports.filter((r) => r.student_id === student.id).sort((a, b) => (b.created_at ?? b.period_end).localeCompare(a.created_at ?? a.period_end))}
              role={role} userId={userId} nameOf={nameOf} onChange={onChange} />
          </div>
        </div>
      )}
    </section>
  );
}
