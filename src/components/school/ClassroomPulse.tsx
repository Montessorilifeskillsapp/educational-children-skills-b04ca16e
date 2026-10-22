import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlanItem, Progress, Student } from './api';
import { nextSuggestions, skillById, SkillRef } from './curriculum';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const YEAR_LABEL: Record<string, string> = { '1': 'First year', '2': 'Second year', '3': 'Third year', none: 'Birth date not entered' };
export const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');
const isoToday = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

interface Props {
  students: Student[]; progress: Progress[]; plans: PlanItem[]; classroomName: string;
  onOpenStudent: (id: string) => void; onRecord: (studentId: string, skill: SkillRef) => void; onGo: (tab: string) => void;
}

export default function ClassroomPulse({ students, progress, plans, classroomName, onOpenStudent, onRecord, onGo }: Props) {
  const twoWeeksAgo = new Date(Date.now() - 14 * 864e5).toISOString();
  const rows = useMemo(() => students.map((s) => {
    const recs = progress.filter((p) => p.student_id === s.id);
    return { s, next: nextSuggestions(recs)[0], quiet: !recs.some((r) => r.updated_at >= twoWeeksAgo) };
  }), [students, progress]); // eslint-disable-line react-hooks/exhaustive-deps
  const today = plans.filter((p) => p.plan_date === isoToday() && !p.done);
  const ready = rows.filter((r) => r.next).slice(0, 5);

  if (!students.length) return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center">
      <p className="font-serif text-xl">No children in {classroomName} yet</p>
      <Button className="mt-4" onClick={() => onGo('roster')}>Add children</Button>
    </div>
  );

  return (
    <div className="max-w-3xl space-y-8">
      <section>
        <h2 className="mb-3 font-serif text-xl">Up next</h2>
        {ready.length === 0 && today.length === 0 ? (
          <p className="text-muted-foreground">Nothing waiting. Tap a child below to record a presentation.</p>
        ) : (
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {today.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0"><p className="font-medium truncate">{skillById(p.skill_id)?.title ?? 'Planned activity'}</p><p className="text-sm text-muted-foreground">Planned for today</p></div>
                <Button variant="outline" size="sm" onClick={() => onGo('planning')}>Open plan</Button>
              </li>
            ))}
            {ready.map((r) => (
              <li key={r.s.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0"><p className="font-medium truncate">{r.s.name}: {r.next!.title}</p><p className="text-sm text-muted-foreground">Ready for this presentation</p></div>
                <Button size="sm" onClick={() => onRecord(r.s.id, r.next!)}>Record</Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-serif text-xl">Children</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <button key={r.s.id} onClick={() => onOpenStudent(r.s.id)} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left hover:border-primary">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-semibold">{initials(r.s.name)}</span>
              <span className="min-w-0 flex-1 truncate font-medium">{r.s.name}</span>
              {r.quiet && <span className="text-xs text-muted-foreground">Not seen lately</span>}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
