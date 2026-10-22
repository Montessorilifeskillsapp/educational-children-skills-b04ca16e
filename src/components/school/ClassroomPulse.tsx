import { useMemo } from 'react';
import { Sparkles, Leaf, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress, Student } from './api';
import { areas, nextSuggestions, skillById, SkillRef } from './curriculum';

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

const YEAR_LABEL: Record<string, string> = { '1': 'First year', '2': 'Second year', '3': 'Third year', none: 'Age not entered' };
const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');

interface Props { students: Student[]; progress: Progress[]; classroomName: string; onOpenStudent: (id: string) => void; onRecord: (studentId: string, skill: SkillRef) => void }

export default function ClassroomPulse({ students, progress, classroomName, onOpenStudent, onRecord }: Props) {
  const areaList = areas();
  const twoWeeksAgo = new Date(Date.now() - 14 * 864e5).toISOString();
  const rows = useMemo(() => students.map((s) => {
    const recs = progress.filter((p) => p.student_id === s.id);
    const perArea = areaList.map((a) => recs.filter((r) => skillById(r.skill_id)?.areaKey === a.key).length);
    const latest = recs.reduce<Progress | null>((m, r) => (!m || r.updated_at > m.updated_at ? r : m), null);
    return { s, recs, perArea, latest, next: nextSuggestions(recs).slice(0, 2), quiet: !recs.some((r) => r.updated_at >= twoWeeksAgo), year: cycleYear(s.date_of_birth) };
  }), [students, progress]); // eslint-disable-line react-hooks/exhaustive-deps

  const groups = (['1', '2', '3', 'none'] as const).map((k) => ({ k, items: rows.filter((r) => String(r.year ?? 'none') === k) })).filter((g) => g.items.length);
  const ready = rows.flatMap((r) => r.next.map((sk) => ({ r, sk }))).slice(0, 8);
  const quiet = rows.filter((r) => r.quiet);
  const max = Math.max(1, ...rows.flatMap((r) => r.perArea));

  if (!students.length) return <p className="py-6 text-muted-foreground">No children in {classroomName} yet. Add them under Students.</p>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="flex items-center gap-2 font-serif text-xl text-foreground"><Sparkles className="h-5 w-5 text-primary" />Ready for a next presentation</h2>
          <p className="text-sm text-muted-foreground mb-4">The next activity in sequence after work each child does independently.</p>
          {ready.length === 0 ? <p className="text-sm text-muted-foreground">Suggestions appear once a child is recorded as working independently.</p> : (
            <ul className="space-y-2">
              {ready.map(({ r, sk }) => (
                <li key={r.s.id + sk.id} className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{initials(r.s.name)}</span>
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium truncate">{r.s.name}</p><p className="text-xs text-muted-foreground truncate">{sk.title} · {sk.areaTitle}</p></div>
                  <Button size="sm" variant="outline" onClick={() => onRecord(r.s.id, sk)}>Record</Button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="flex items-center gap-2 font-serif text-xl text-foreground"><Clock className="h-5 w-5 text-accent-foreground" />Observe soon</h2>
          <p className="text-sm text-muted-foreground mb-4">No presentation or progress recorded in the last 14 days.</p>
          {quiet.length === 0 ? <p className="text-sm text-muted-foreground">Every child has a recent record.</p> : (
            <div className="flex flex-wrap gap-2">{quiet.map((r) => <Button key={r.s.id} size="sm" variant="secondary" className="rounded-full" onClick={() => onOpenStudent(r.s.id)}>{r.s.name}</Button>)}</div>
          )}
        </section>
      </div>

      {groups.map((g) => (
        <section key={g.k}>
          <h3 className="mb-3 flex items-center gap-2 font-serif text-lg text-foreground"><Leaf className="h-4 w-4 text-secondary" />{YEAR_LABEL[g.k]}<span className="text-sm font-sans text-muted-foreground">· {g.items.length}</span></h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {g.items.map((r) => (
              <button key={r.s.id} onClick={() => onOpenStudent(r.s.id)} className="group rounded-2xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/40 font-semibold text-accent-foreground">{initials(r.s.name)}</span>
                  <div className="min-w-0"><p className="font-medium truncate">{r.s.name}</p><p className="text-xs text-muted-foreground truncate">{r.latest ? `Latest: ${skillById(r.latest.skill_id)?.title ?? 'activity'}` : 'No work recorded yet'}</p></div>
                </div>
                <div className="mt-4 flex items-end gap-1 h-10" aria-label="Work recorded per curriculum area">
                  {r.perArea.map((n, i) => (
                    <div key={areaList[i].key} title={`${areaList[i].title}: ${n}`} className="flex h-10 flex-1 flex-col justify-end rounded-sm bg-muted">
                      <div className="rounded-sm bg-primary/70" style={{ height: `${Math.max(n ? 12 : 0, (n / max) * 40)}px` }} />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{r.recs.length} activities recorded across {r.perArea.filter(Boolean).length} of {areaList.length} areas</p>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
