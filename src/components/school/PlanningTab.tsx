import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { areaTitle, formatDate, formatDateRange } from '@/i18n/format';
import { Link } from 'react-router-dom';
import { addDays, isSameMonth, isWeekend } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight, CheckCircle2, Circle, Pencil, Plus, Printer, Search, Trash2, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { can, Classroom, PlanItem, schoolCall, SchoolRole, Student } from './api';
import { areas, orderedSkills, skillById, skillLink } from './curriculum';
import { monthDays, moveCalendar, planAreaStyle, planDate, weekDays } from './planningDates';

interface Props { role: SchoolRole; classroom: Classroom; students: Student[]; plans: PlanItem[]; onChange: () => void; initial?: { skill_id: string; student_ids: string[] } | null; onInitialUsed: () => void }
type Draft = Partial<PlanItem> & { area?: string };

export default function PlanningTab({ role, classroom, students, plans, onChange, initial, onInitialUsed }: Props) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const fullDay = (date: Date) => formatDate(date, { weekday: 'long', month: 'long', day: 'numeric' });
  const [view, setView] = useState<'week' | 'month'>('week');
  const [anchor, setAnchor] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => new Date());
  const [draft, setDraft] = useState<Draft | null>(null);
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [removing, setRemoving] = useState<PlanItem | null>(null);
  const edit = can.plan(role);
  const record = can.recordProgress(role);
  const today = planDate(new Date());
  const days = useMemo(() => view === 'week' ? weekDays(anchor) : monthDays(anchor), [view, anchor]);
  const names = new Map(students.map((s) => [s.id, s.name]));
  const scopedPlans = plans.filter((p) => p.classroom_id === classroom.id);
  const dayPlans = (date: Date) => scopedPlans.filter((p) => p.plan_date === planDate(date)).sort((a, b) => Number(a.done) - Number(b.done));
  const visiblePlans = scopedPlans.filter((p) => days.some((d) => planDate(d) === p.plan_date) && (view === 'week' || p.plan_date.slice(0, 7) === planDate(anchor).slice(0, 7)));
  const complete = visiblePlans.filter((p) => p.done).length;
  const selectedArea = draft?.area ?? areas()[0]?.key ?? '';
  const areaSkills = orderedSkills().filter((s) => s.areaKey === selectedArea && s.title.toLowerCase().includes(search.toLowerCase().trim()));

  useEffect(() => {
    if (initial) {
      setDraft({ plan_date: planDate(new Date()), skill_id: initial.skill_id, student_ids: initial.student_ids, area: skillById(initial.skill_id)?.areaKey });
      setSearch('');
    }
  }, [initial]);

  const close = () => { if (busy) return; setDraft(null); setSearch(''); onInitialUsed(); };
  const open = (date: Date, item?: PlanItem) => { setSearch(''); setDraft(item ? { ...item, area: skillById(item.skill_id)?.areaKey } : { plan_date: planDate(date), student_ids: [], area: areas()[0]?.key }); };
  const save = async () => {
    if (!edit || !draft?.skill_id || !draft.plan_date || busy) return;
    setBusy(true);
    try {
      await schoolCall({ action: 'plan_save', classroom_id: classroom.id, id: draft.id, plan_date: draft.plan_date, skill_id: draft.skill_id, student_ids: draft.student_ids ?? [], notes: draft.notes || null });
      setDraft(null); setSearch(''); onInitialUsed(); onChange();
    } catch (e) { toast({ title: t('shared.couldNotSave'), description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(false); }
  };
  const act = async (item: PlanItem, remove = false) => {
    if (pending || (remove ? !edit : !record)) return;
    setPending(item.id);
    try { await schoolCall(remove ? { action: 'plan_delete', id: item.id } : { action: 'plan_done', id: item.id, done: !item.done }); setRemoving(null); onChange(); }
    catch (e) { toast({ title: t('school.today.updateFailed'), description: (e as Error).message, variant: 'destructive' }); }
    finally { setPending(null); }
  };
  const navigate = (direction: number) => { const next = moveCalendar(anchor, view, direction); setAnchor(next); setSelectedDay(next); };
  const jumpToday = () => { const date = new Date(); setAnchor(date); setSelectedDay(date); };
  const audience = (p: PlanItem) => p.student_ids.length ? p.student_ids.map((id) => names.get(id)).filter(Boolean).join(', ') : t('school.today.whole');

  const lesson = (p: PlanItem) => {
    const sk = skillById(p.skill_id);
    return <li key={p.id} className={`group rounded-lg border border-border bg-card p-3 space-y-3 ${p.done ? 'opacity-65' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-medium ${planAreaStyle(sk?.areaKey)}`}>{sk ? sk.areaTitle : t('school.today.lesson')}</span>
        {record ? <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 print:hidden" disabled={pending === p.id} aria-label={`${p.done ? t('school.pl.markNot') : t('school.today.mark')}: ${sk?.title ?? p.skill_id}`} title={p.done ? t('school.pl.markNot') : t('school.today.mark')} onClick={() => void act(p)}>{p.done ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground" />}</Button> : p.done && <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />}
      </div>
      {sk ? <Link to={skillLink(sk)} className={`block font-medium leading-snug text-foreground hover:text-primary break-words ${p.done ? 'line-through' : ''}`}>{sk.title}</Link> : <p className="break-words">{p.skill_id}</p>}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"><Users className="h-4 w-4 shrink-0" />{p.student_ids.length ? p.student_ids.map((id) => names.get(id)).filter(Boolean).map((name, i) => <span key={`${p.id}:${i}`} className="max-w-full rounded-md bg-muted px-2 py-0.5 break-words">{name}</span>) : <span className="rounded-md bg-muted px-2 py-0.5">{t('school.today.whole')}</span>}</div>
      {p.notes && <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">{p.notes}</p>}
      {edit && <div className="flex justify-end gap-1 border-t border-border pt-2 print:hidden">
        <Button variant="ghost" size="icon" className="h-8 w-8" title={t('school.pl.editLesson')} aria-label={t('school.pl.editX', { title: sk?.title ?? p.skill_id })} onClick={() => open(new Date(), p)}><Pencil className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" title={t('school.pl.removeLesson')} aria-label={t('school.pl.removeX', { title: sk?.title ?? p.skill_id })} onClick={() => setRemoving(p)}><Trash2 className="h-4 w-4" /></Button>
      </div>}
    </li>;
  };

  return <div className="space-y-6">
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div>
        <p className="school-label">{classroom.name}</p>
        <h2 className="font-display text-2xl mt-1">{view === 'month' ? formatDate(anchor, { month: 'long', year: 'numeric' }) : formatDateRange(days[0], addDays(days[0], 4), { month: 'short', day: 'numeric', year: 'numeric' })}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t('school.pl.lessons', { count: visiblePlans.length })} <span aria-hidden="true">·</span> {t('school.pl.given', { count: complete })}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <div className="flex items-center rounded-lg border border-border bg-muted p-1" role="group" aria-label={t('school.pl.view')}>
          {(['week', 'month'] as const).map((v) => <Button key={v} size="sm" variant={view === v ? 'default' : 'ghost'} aria-pressed={view === v} onClick={() => setView(v)} className="rounded-md px-4">{v === 'week' ? t('school.pl.week') : t('school.pl.month')}</Button>)}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" aria-label={t(`school.pl.prev${view}`)} title={t(`school.pl.prev${view}`)} onClick={() => navigate(-1)}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" onClick={jumpToday}>{t('school.pl.today')}</Button>
          <Button variant="outline" size="icon" aria-label={t(`school.pl.next${view}`)} title={t(`school.pl.next${view}`)} onClick={() => navigate(1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <Button variant="outline" size="icon" title={t('school.pl.print')} aria-label={t('school.pl.print')} onClick={() => window.print()}><Printer className="h-4 w-4" /></Button>
      </div>
    </div>

    {view === 'week' ? <div className="grid grid-cols-1 gap-3 md:grid-cols-5 print:grid-cols-5" aria-label={t('school.pl.schoolWeek')}>
      {days.map((date) => { const items = dayPlans(date); const current = planDate(date) === today; return <section key={planDate(date)} aria-label={fullDay(date)} className={`min-w-0 border-t-2 ${current ? 'border-primary' : 'border-border'}`}>
        <div className={`flex items-center justify-between gap-1 px-2 py-3 ${current ? 'bg-primary/10' : 'bg-muted/50'}`}>
          <div><p className="text-xs font-medium text-muted-foreground">{formatDate(date, { weekday: 'long' })}</p><div className="flex items-baseline gap-2"><span className="font-display text-2xl">{date.getDate()}</span>{current && <span className="text-xs font-medium text-primary">{t('school.pl.today')}</span>}</div></div>
          <span className="text-xs text-muted-foreground">{items.length}</span>
        </div>
        <ul className="space-y-3 py-3">{items.map(lesson)}</ul>
        {!items.length && <div className="py-6 text-center text-sm text-muted-foreground"><CalendarDays className="mx-auto mb-2 h-6 w-6 opacity-50" />{t('school.pl.none')}</div>}
        {edit && <Button variant="ghost" className="w-full justify-center gap-1.5 border border-dashed border-border text-muted-foreground hover:text-primary print:hidden" onClick={() => open(date)} aria-label={t('school.pl.addFor', { date: fullDay(date) })}><Plus className="h-4 w-4" />{t('school.pl.add')}</Button>}
      </section>; })}
    </div> : <>
      <div className="overflow-x-auto rounded-lg border border-border">
        <div className="min-w-[840px]">
          <div className="grid grid-cols-7 border-b border-border bg-muted/60">{days.slice(0, 7).map((d) => formatDate(d, { weekday: 'short' })).map((day) => <p key={day} className="p-3 text-xs font-medium text-muted-foreground text-center">{day}</p>)}</div>
          <div className="grid grid-cols-7">
            {days.map((date) => { const items = dayPlans(date); const current = planDate(date) === today; const selected = planDate(date) === planDate(selectedDay); return <div key={planDate(date)} className={`min-w-0 min-h-[140px] border-b border-r border-border p-2 ${selected ? 'bg-primary/10 ring-1 ring-inset ring-primary' : isWeekend(date) ? 'bg-muted/50' : 'bg-card/70'} ${!isSameMonth(date, anchor) ? 'opacity-50' : ''}`}>
              <Button variant={current ? 'default' : 'ghost'} className="h-8 w-full justify-between rounded-md px-2" aria-label={t('school.pl.showFor', { date: fullDay(date) })} aria-pressed={selected} onClick={() => setSelectedDay(date)}><span>{date.getDate()}</span>{current && <span className="text-xs">{t('school.pl.today')}</span>}</Button>
              <div className="mt-2 space-y-1">{items.slice(0, 2).map((p) => { const sk = skillById(p.skill_id); return <Button key={p.id} variant="ghost" className={`h-auto w-full justify-start whitespace-normal text-left rounded-md px-2 py-1.5 text-xs border ${planAreaStyle(sk?.areaKey)} ${p.done ? 'line-through opacity-65' : ''}`} onClick={() => setSelectedDay(date)} title={`${sk?.title ?? p.skill_id} · ${audience(p)}`}><span className="min-w-0"><span className="line-clamp-2 break-words">{sk?.title ?? p.skill_id}</span><span className="flex items-center gap-1 mt-1 text-muted-foreground"><Users className="h-3 w-3" />{p.student_ids.length || t('school.pl.all')}</span></span></Button>; })}{items.length > 2 && <Button variant="link" className="h-auto px-1 py-0 text-xs" onClick={() => setSelectedDay(date)}>{t('school.pl.more', { count: items.length - 2 })}</Button>}</div>
            </div>; })}
          </div>
        </div>
      </div>
      <section aria-label={t('school.pl.selected')} className="border-t border-border pt-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-xl">{fullDay(selectedDay)}</h3>{edit && <Button onClick={() => open(selectedDay)} className="gap-2 print:hidden"><Plus className="h-4 w-4" />{t('school.pl.add')}</Button>}</div>
        {dayPlans(selectedDay).length ? <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{dayPlans(selectedDay).map(lesson)}</ul> : <p className="text-sm text-muted-foreground py-4">{t('school.pl.noneDot')}</p>}
      </section>
    </>}

    <Dialog open={!!draft} onOpenChange={(o) => !o && close()}>
      <DialogContent aria-describedby={undefined} className="school-theme max-w-2xl max-h-[90dvh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-display text-2xl">{draft?.id ? t('school.pl.editLesson') : t('school.pl.planLesson')}</DialogTitle></DialogHeader>
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label htmlFor="plan-date">{t('school.pl.date')}</Label><Input id="plan-date" type="date" value={draft?.plan_date ?? ''} disabled={busy} onChange={(e) => setDraft((d) => d ? { ...d, plan_date: e.target.value } : d)} /></div>
            <div className="space-y-1.5"><Label htmlFor="plan-area">{t('school.pl.area')}</Label><Select value={selectedArea} disabled={busy} onValueChange={(area) => { setDraft((d) => d ? { ...d, area, skill_id: undefined } : d); setSearch(''); }}><SelectTrigger id="plan-area"><SelectValue /></SelectTrigger><SelectContent>{areas().map((a) => <SelectItem key={a.key} value={a.key}>{a.title}</SelectItem>)}</SelectContent></Select></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan-search">{t('school.pl.activity')}</Label>
            <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="plan-search" placeholder={t('school.pl.search')} className="pl-9" value={search} disabled={busy} onChange={(e) => setSearch(e.target.value)} /></div>
            {draft?.skill_id && <p className="flex items-center gap-2 text-sm text-primary"><CheckCircle2 className="h-4 w-4 shrink-0" />{skillById(draft.skill_id)?.title}</p>}
            <div className="max-h-44 overflow-y-auto rounded-lg border border-border p-1 space-y-1" role="group" aria-label={t('school.pt.activities')}>
              {areaSkills.map((s) => <Button key={`${s.areaKey}:${s.id}`} variant={draft?.skill_id === s.id ? 'default' : 'ghost'} disabled={busy} aria-pressed={draft?.skill_id === s.id} className="h-auto w-full justify-start whitespace-normal text-left py-2" onClick={() => setDraft((d) => d ? { ...d, skill_id: s.id } : d)}>{s.title}</Button>)}
              {!areaSkills.length && <p className="p-3 text-sm text-muted-foreground">{t('school.pl.noneFound')}</p>}
            </div>
          </div>
          <fieldset className="space-y-2"><legend className="text-sm font-medium">{t('school.pl.students')}</legend>
            <Button variant={!draft?.student_ids?.length ? 'default' : 'outline'} size="sm" className="gap-2" disabled={busy} aria-pressed={!draft?.student_ids?.length} onClick={() => setDraft((d) => d ? { ...d, student_ids: [] } : d)}><Users className="h-4 w-4" />{t('school.today.whole')}</Button>
            <div className="grid gap-2 sm:grid-cols-2 max-h-44 overflow-y-auto">
              {students.map((s) => <label key={s.id} className="flex min-w-0 cursor-pointer items-center gap-2 rounded-md border border-border p-2 text-sm"><Checkbox checked={draft?.student_ids?.includes(s.id) ?? false} disabled={busy} onCheckedChange={(checked) => setDraft((d) => d ? { ...d, student_ids: checked ? [...(d.student_ids ?? []), s.id] : (d.student_ids ?? []).filter((id) => id !== s.id) } : d)} /><span className="break-words">{s.name}</span></label>)}
            </div>
          </fieldset>
          <div className="space-y-1.5"><Label htmlFor="plan-notes">{t('school.pl.notes')}</Label><Textarea id="plan-notes" rows={3} value={draft?.notes ?? ''} disabled={busy} onChange={(e) => setDraft((d) => d ? { ...d, notes: e.target.value } : d)} /></div>
        </div>
        <DialogFooter><Button variant="outline" disabled={busy} onClick={close}><X className="h-4 w-4 mr-2" />{t('shared.cancel')}</Button><Button onClick={() => void save()} disabled={!draft?.skill_id || !draft.plan_date || busy}>{busy ? t('shared.saving') : t('school.pl.save')}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog open={!!removing} onOpenChange={(o) => !o && !pending && setRemoving(null)}><DialogContent aria-describedby={undefined} className="school-theme"><DialogHeader><DialogTitle>{t('school.pl.removeQ')}</DialogTitle></DialogHeader><p>{removing ? skillById(removing.skill_id)?.title ?? removing.skill_id : ''}</p><DialogFooter><Button variant="outline" disabled={!!pending} onClick={() => setRemoving(null)}>{t('school.pl.keep')}</Button><Button variant="destructive" disabled={!!pending} onClick={() => removing && void act(removing, true)}>{pending ? t('school.pl.removing') : t('school.pl.removeLesson')}</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}
