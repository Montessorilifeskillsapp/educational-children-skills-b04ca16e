import { useMemo } from 'react';
import { Sparkles, Clock, CalendarDays, Users, PenLine, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlanItem, Progress, Student } from './api';
import { areas, nextSuggestions, skillById, skillImage, SkillRef } from './curriculum';

/** Classroom year in the 3–6 cycle from date of birth (age on 1 September of the current school year). */
export function cycleYear(dob: string | null, now = new Date()): 1 | 2 | 3 | null {
  if (!dob) return null;
  const b = new Date(dob);
  if (Number.isNaN(b.getTime())) return null;
  const sept = new Date(now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1, 8, 1);
  let age = sept.getFullYear() - b.getFullYear();
  if (sept.getMonth() < b.getMonth() || (sept.getMonth() === b.getMonth() && sept.getDate() < b.getDate())) age--;
  if (age <= 3) return 1;
  if (age === 4) return 2;
  return 3;
}

const YEAR_LABEL: Record<string, string> = { '1': 'First year', '2': 'Second year', '3': 'Third year', none: 'Birth date not entered' };
export const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');
const isoToday = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

interface Props {
  students: Student[]; progress: Progress[]; plans: PlanItem[]; classroomName: string;
  onOpenStudent: (id: string) => void; onRecord: (studentId: string, skill: SkillRef) => void; onGo: (tab: string) => void;
}

function Stat({ icon: Icon, value, label }: { icon: typeof Users; value: number; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
      <div><p className="font-serif text-2xl leading-none text-foreground">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>
    </div>
  );
}

export default function ClassroomPulse({ students, progress, plans, classroomName, onOpenStudent, onRecord, onGo }: Props) {
  const areaList = areas();
  const twoWeeksAgo = new Date(Date.now() - 14 * 864e5).toISOString();
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const rows = useMemo(() => students.map((s) => {
    const recs = progress.filter((p) => p.student_id === s.id);
    const perArea = areaList.map((a) => recs.filter((r) => skillById(r.skill_id)?.areaKey === a.key).length);
    const latest = recs.reduce<Progress | null>((m, r) => (!m || r.updated_at > m.updated_at ? r : m), null);
    return { s, recs, perArea, latest, next: nextSuggestions(recs).slice(0, 2), quiet: !recs.some((r) => r.updated_at >= twoWeeksAgo), year: cycleYear(s.date_of_birth) };
  }), [students, progress]); // eslint-disable-line react-hooks/exhaustive-deps

  const names = new Map(students.map((s) => [s.id, s.name]));
  const today = plans.filter((p) => p.plan_date === isoToday());
  const groups = (['1', '2', '3', 'none'] as const).map((k) => ({ k, items: rows.filter((r) => String(r.year ?? 'none') === k) })).filter((g) => g.items.length);
  const ready = rows.flatMap((r) => r.next.map((sk) => ({ r, sk }))).slice(0, 6);
  const quiet = rows.filter((r) => r.quiet);
  const classArea = areaList.map((a, i) => ({ ...a, n: rows.reduce((t, r) => t + r.perArea[i], 0) }));
  const classMax = Math.max(1, ...classArea.map((a) => a.n));
  const max = Math.max(1, ...rows.flatMap((r) => r.perArea));
  const thisWeek = progress.filter((p) => p.updated_at >= weekAgo).length;

  if (!students.length) return (
    <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
      <Users className="mx-auto h-10 w-10 text-primary" />
      <p className="mt-3 font-serif text-xl">No children in {classroomName} yet</p>
      <p className="mt-1 text-sm text-muted-foreground">Add your class list to start recording presentations.</p>
      <Button className="mt-4" onClick={() => onGo('roster')}>Add children</Button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon={Users} value={students.length} label="Children in class" />
        <Stat icon={PenLine} value={thisWeek} label="Records this week" />
        <Stat icon={CalendarDays} value={today.length} label="Planned for today" />
        <Stat icon={Eye} value={quiet.length} label="To observe soon" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section>
          <div className="mb-3 flex items-end justify-between gap-2">
            <div><h2 className="flex items-center gap-2 font-serif text-2xl text-foreground"><Sparkles className="h-5 w-5 text-primary" />Ready for a next presentation</h2>
              <p className="text-sm text-muted-foreground">The next activity in sequence after work a child does independently.</p></div>
          </div>
          {ready.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">Suggestions appear here once a child is recorded as working independently on an activity.</div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {ready.map(({ r, sk }) => { const img = skillImage(sk.id); return (
                <article key={r.s.id + sk.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
                  <div className="relative h-32 bg-muted">
                    {img ? <img src={img} alt={sk.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center font-serif text-lg text-muted-foreground">{sk.areaTitle}</div>}
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground">{sk.areaTitle}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/50 text-sm font-semibold text-accent-foreground">{initials(r.s.name)}</span>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{sk.title}</p><p className="truncate text-xs text-muted-foreground">for {r.s.name}</p></div>
                    <Button size="sm" onClick={() => onRecord(r.s.id, sk)}>Record</Button>
                  </div>
                </article>
              ); })}
            </div>
          )}
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-serif text-xl"><CalendarDays className="h-5 w-5 text-secondary" />Today</h2>
              <Button variant="ghost" size="sm" onClick={() => onGo('planning')}>Week plan<ArrowRight className="ml-1 h-4 w-4" /></Button></div>
            {today.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Nothing planned for today.</p> : (
              <ul className="mt-3 space-y-2">{today.map((p) => (
                <li key={p.id} className={`rounded-xl bg-muted/60 px-3 py-2 text-sm ${p.done ? 'opacity-60 line-through' : ''}`}>
                  <p className="font-medium">{skillById(p.skill_id)?.title ?? 'Activity'}</p>
                  <p className="text-xs text-muted-foreground">{p.student_ids.length ? p.student_ids.map((id) => names.get(id)).filter(Boolean).join(', ') : 'Whole class'}</p>
                </li>))}</ul>
            )}
          </section>
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-serif text-xl"><Clock className="h-5 w-5 text-accent-foreground" />Observe soon</h2>
            <p className="mb-3 text-xs text-muted-foreground">Nothing recorded in the last 14 days.</p>
            {quiet.length === 0 ? <p className="text-sm text-muted-foreground">Every child has a recent record.</p> : (
              <div className="flex flex-wrap gap-2">{quiet.map((r) => (
                <button key={r.s.id} onClick={() => onOpenStudent(r.s.id)} className="flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-3 text-sm hover:border-primary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold">{initials(r.s.name)}</span>{r.s.name}
                </button>))}</div>
            )}
          </section>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-serif text-xl">Balance across the curriculum</h2>
        <p className="mb-4 text-xs text-muted-foreground">Activities recorded for the whole class in each area.</p>
        <div className="space-y-2.5">{classArea.map((a) => (
          <div key={a.key} className="grid grid-cols-[9rem_minmax(0,1fr)_2.5rem] items-center gap-3 text-sm">
            <span className="truncate text-muted-foreground">{a.title}</span>
            <div className="h-2.5 rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-secondary to-primary" style={{ width: `${(a.n / classMax) * 100}%` }} /></div>
            <span className="text-right tabular-nums">{a.n}</span>
          </div>))}</div>
      </section>

      {groups.map((g) => (
        <section key={g.k}>
          <h3 className="mb-3 font-serif text-xl text-foreground">{YEAR_LABEL[g.k]} <span className="font-sans text-sm text-muted-foreground">· {g.items.length} {g.items.length === 1 ? 'child' : 'children'}</span></h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {g.items.map((r) => (
              <button key={r.s.id} onClick={() => onOpenStudent(r.s.id)} className="rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent/60 to-primary/30 font-serif text-lg text-foreground">{initials(r.s.name)}</span>
                  <div className="min-w-0 flex-1"><p className="truncate font-semibold">{r.s.name}</p><p className="truncate text-xs text-muted-foreground">{r.latest ? `Latest: ${skillById(r.latest.skill_id)?.title ?? 'activity'}` : 'No work recorded yet'}</p></div>
                  {r.quiet && <span className="rounded-full bg-accent/40 px-2 py-0.5 text-[11px] font-medium text-accent-foreground">Observe</span>}
                </div>
                <div className="mt-4 flex h-10 items-end gap-1" aria-label="Work recorded per curriculum area">
                  {r.perArea.map((n, i) => (
                    <div key={areaList[i].key} title={`${areaList[i].title}: ${n}`} className="flex h-10 flex-1 flex-col justify-end rounded-sm bg-muted">
                      <div className="rounded-sm bg-primary/70" style={{ height: `${n ? Math.max(12, (n / max) * 40) : 0}px` }} />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{r.recs.length} recorded · {r.perArea.filter(Boolean).length} of {areaList.length} areas</p>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
