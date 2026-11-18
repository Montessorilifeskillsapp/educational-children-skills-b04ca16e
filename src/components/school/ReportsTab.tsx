import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { useDraft } from './drafts';
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
  const { t } = useTranslation();
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
  // Edits autosave on this device per child, together with their period, so staff can come back on a later day and finish.
  const [draft, setDraft, clearDraft] = useDraft<{ title: string; body: string; from?: string; to?: string } | null>(student ? `${userId}:report:${student.id}` : null, null);
  const pFrom = draft?.from ?? from;
  const pTo = draft?.to ?? to;

  const lastSent = (id: string) => reports.filter((r) => r.student_id === id && (r.summary.email_status === 'queued' || r.summary.email_status === 'school_mail')).sort((a, b) => b.period_end.localeCompare(a.period_end))[0];

  const generated = useMemo(() => {
    if (!student) return null;
    const inRange = (d: string) => d.slice(0, 10) >= pFrom && d.slice(0, 10) <= pTo;
    const mine = progress.filter((p) => p.student_id === student.id);
    const lines: string[] = [];
    if (style.opening.trim()) lines.push(style.opening.trim().split('{child}').join(student.name), '');
    lines.push(t('school.rp.summary', { name: student.name, from: pFrom, to: pTo }), '');
    for (const a of areas()) {
      if (style.areas.length && !style.areas.includes(a.key)) continue;
      const items = mine.filter((p) => inRange(p.updated_at) && skillById(p.skill_id)?.areaKey === a.key);
      if (!items.length) continue;
      lines.push(`${a.title}:`);
      items.forEach((p) => lines.push(`• ${skillById(p.skill_id)?.title ?? p.skill_id} — ${STATUS_LABEL[p.status]}${p.note ? ` (${p.note})` : ''}`));
      lines.push('');
    }
    const notes = observations.filter((o) => o.student_id === student.id && inRange(o.observed_at)).sort((a, b) => a.observed_at.localeCompare(b.observed_at));
    if (style.observations && notes.length) { lines.push(t('school.rp.observations')); notes.forEach((o) => lines.push(`• ${o.observed_at.slice(0, 10)}: ${o.body}`)); lines.push(''); }
    const next = nextSuggestions(mine);
    if (style.next && next.length) { lines.push(t('school.rp.next')); next.forEach((s) => lines.push(`• ${s.title} (${s.areaTitle})`)); }
    if (style.closing.trim()) lines.push('', style.closing.trim().split('{child}').join(student.name));
    // The untouched default heading follows the chosen language; a school's own heading is kept as written.
    const heading = style.heading.trim() && style.heading.trim() !== DEFAULT_STYLE.heading ? style.heading.trim() : t('school.er.progressReport');
    return { title: `${heading} · ${student.name}`, body: lines.join('\n').trim() };
  }, [student, progress, observations, pFrom, pTo, style, t]);

  const report = draft || generated;
  const setReport = (r: { title: string; body: string }) => setDraft({ title: r.title, body: r.body, from: pFrom, to: pTo });

  const send = () => {
    if (!student || !report || !student.family_email || sending) return;
    const subject = `${schoolName} · ${report.title}`;
    const body = `${report.body}\n\n${style.signoff.trim() || t('school.rp.regards')}\n${schoolName}${schoolEmail ? `\n${schoolEmail}` : ''}`;
    window.location.href = `mailto:${encodeURIComponent(student.family_email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSending(true);
    schoolCall({ action: 'report_record', student_id: student.id, period_start: pFrom, period_end: pTo, title: report.title, body: report.body })
      .then(() => { toast({ title: t('school.rp.opened'), description: t('school.rp.pressSend', { email: student.family_email }) }); clearDraft(); onChange(); })
      .catch((e) => toast({ title: t('school.rp.notSaved'), description: (e as Error).message, variant: 'destructive' }))
      .finally(() => setSending(false));
  };

  const print = () => {
    if (!report || !student) return;
    const w = window.open('', '_blank'); if (!w) { toast({ title: t('school.rp.popups'), description: t('school.rp.blocked'), variant: 'destructive' }); return; }
    w.document.open();
    w.document.write(conferenceHtml({ schoolName, schoolEmail, studentName: student.name, periodStart: pFrom, periodEnd: pTo, title: report.title, body: report.body, signoff: style.signoff.trim() }));
    w.document.close();
    w.focus(); setTimeout(() => w.print(), 250);
  };

  if (!students.length) return <p className="py-6 text-muted-foreground">{t('school.rp.noStudents')}</p>;

  return (
    <section className="pt-3 grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div><Label htmlFor="rf">{t('school.rp.from')}</Label><Input id="rf" type="date" value={pFrom} onChange={(e) => (draft ? setDraft({ ...draft, from: e.target.value }) : setFrom(e.target.value))} /></div>
          <div><Label htmlFor="rt">{t('school.rp.to')}</Label><Input id="rt" type="date" value={pTo} onChange={(e) => (draft ? setDraft({ ...draft, to: e.target.value }) : setTo(e.target.value))} /></div>
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
                    {!s.family_email ? t('school.rp.noEmail') : last ? t('school.rp.lastTo', { date: last.period_end }) : t('school.rp.notSent')}
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
              <p className="text-sm text-muted-foreground">{t('school.rp.toLine', { email: student.family_email || t('school.rp.noEmailSaved') })}</p>
            </div>
            {!student.family_email && <Button size="sm" variant="outline" onClick={() => onEditStudent(student.id)}>{t('school.rp.addEmail')}</Button>}
          </div>
          {canSend && (
            <div className="rounded-lg border border-border bg-muted/40">
              <button type="button" onClick={() => setStyleOpen(!styleOpen)} aria-expanded={styleOpen}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 min-h-11 text-left">
                <span className="flex items-center gap-2 font-medium text-foreground"><Palette className="h-4 w-4" />{t('school.rp.style')}</span>
                <span className="text-sm text-muted-foreground">{styleOpen ? t('school.rp.close') : t('school.rp.customize')}</span>
              </button>
              {styleOpen && (
                <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label htmlFor="rs-h">{t('school.rp.heading')}</Label><Input id="rs-h" value={style.heading} placeholder={t('school.rp.headingPh')} onChange={(e) => patchStyle({ heading: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label htmlFor="rs-o">{t('school.rp.opening')}</Label><Textarea id="rs-o" rows={2} value={style.opening} placeholder={t('school.rp.openingPh')} onChange={(e) => patchStyle({ opening: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label htmlFor="rs-c">{t('school.rp.closing')}</Label><Textarea id="rs-c" rows={2} value={style.closing} placeholder={t('school.rp.closingPh')} onChange={(e) => patchStyle({ closing: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label htmlFor="rs-s">{t('school.rp.signoff')}</Label><Input id="rs-s" value={style.signoff} placeholder={t('school.rp.regards')} onChange={(e) => patchStyle({ signoff: e.target.value })} /></div>
                  <label className="flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 min-h-11"><span className="text-sm">{t('school.rp.inclObs')}</span><Switch checked={style.observations} onCheckedChange={(v) => patchStyle({ observations: v })} /></label>
                  <label className="flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 min-h-11"><span className="text-sm">{t('school.rp.inclNext')}</span><Switch checked={style.next} onCheckedChange={(v) => patchStyle({ next: v })} /></label>
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium mb-2">{t('school.rp.areas')} {style.areas.length ? '' : t('school.rp.all')}</p>
                    <div className="flex flex-wrap gap-2">
                      {areas().map((a) => {
                        const on = style.areas.includes(a.key);
                        return <Button key={a.key} type="button" size="sm" variant={on ? 'default' : 'outline'} aria-pressed={on} className="min-h-10"
                          onClick={() => patchStyle({ areas: on ? style.areas.filter((k) => k !== a.key) : [...style.areas, a.key] })}>{a.title}</Button>;
                      })}
                    </div>
                  </div>
                  <p className="sm:col-span-2 text-xs text-muted-foreground">{t('school.rp.childHint')}</p>
                </div>
              )}
            </div>
          )}
          {draft && canSend && (
            <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
              <span>{t('school.rp.editsSaved')}</span>
              <Button size="sm" variant="ghost" onClick={() => { if (window.confirm(t('school.rp.discard'))) clearDraft(); }}>{t('school.rp.startOver')}</Button>
            </div>
          )}
          <Input aria-label={t('school.er.reportTitle')} value={report.title} onChange={(e) => setReport({ ...report, title: e.target.value })} disabled={!canSend} />
          <Textarea aria-label={t('school.er.report')} rows={16} value={report.body} onChange={(e) => setReport({ ...report, body: e.target.value })} disabled={!canSend} />
          {canSend ? (
            <div className="flex flex-wrap gap-2">
              <Button size="lg" onClick={send} disabled={sending || !student.family_email}>
                <Mail className="h-4 w-4 mr-2" />{student.family_email ? t('school.rp.send') : t('school.rp.addFirst')}
              </Button>
              <Button size="lg" variant="outline" onClick={print}><Printer className="h-4 w-4 mr-2" />{t('school.rp.print')}</Button>
            </div>
          ) : <p className="text-sm text-muted-foreground">{t('school.rp.assistants')}</p>}
          <p className="text-xs text-muted-foreground">{t('school.rp.opensApp')}</p>
          <div className="pt-4 border-t border-border">
            <h3 className="font-semibold mb-2">{t('school.rp.past', { name: student.name })}</h3>
            <ReportList reports={reports.filter((r) => r.student_id === student.id).sort((a, b) => (b.created_at ?? b.period_end).localeCompare(a.created_at ?? a.period_end))}
              role={role} userId={userId} nameOf={nameOf} onChange={onChange} />
          </div>
        </div>
      )}
    </section>
  );
}
