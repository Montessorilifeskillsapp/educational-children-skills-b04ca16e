import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlanItem, Progress, schoolCall, Student } from './api';
import { nextSuggestions, skillById, skillLink, SkillRef } from './curriculum';

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

interface Props {
  students: Student[];
  progress: Progress[];
  plans: PlanItem[];
  canPlan: boolean;
  canRecord: boolean;
  onChange: () => void;
  onPlan: () => void;
  onRecord: (studentId: string, skill: SkillRef) => void;
  onOpenStudent: (id: string) => void;
}

/** Portal home: the lessons planned for today, then the next presentation each child is ready for. */
export default function TodayLessons({ students, progress, plans, canPlan, canRecord, onChange, onPlan, onRecord, onOpenStudent }: Props) {
  const { toast } = useToast();
  const today = plans.filter((p) => p.plan_date === iso(new Date())).sort((a, b) => Number(a.done) - Number(b.done));
  const names = new Map(students.map((s) => [s.id, s.name]));
  const ready = students
    .map((s) => ({ s, sk: nextSuggestions(progress.filter((p) => p.student_id === s.id))[0] }))
    .filter((x): x is { s: Student; sk: SkillRef } => !!x.sk)
    .slice(0, 6);

  const toggle = async (p: PlanItem) => {
    try { await schoolCall({ action: 'plan_done', id: p.id, done: !p.done }); onChange(); }
    catch (e) { toast({ title: 'Could not update', description: (e as Error).message, variant: 'destructive' }); }
  };

  return (
    <div className="space-y-12">
      <section aria-labelledby="today-heading" className="space-y-4">
        <h2 id="today-heading" className="sr-only">Today's lessons</h2>
        {today.length === 0 ? (
          <div className="py-6 max-w-2xl">
            <p className="school-label">Today</p>
            <p className="font-display mt-2 text-2xl text-foreground">Nothing is planned for today yet.</p>
            {canPlan && (
              <Button variant="default" onClick={onPlan} className="mt-5 gap-2">
                Plan today's lessons <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {today.map((p) => {
              const sk = skillById(p.skill_id);
              const who = p.student_ids.length ? p.student_ids.map((id) => names.get(id)).filter(Boolean).join(', ') : 'Whole class';
              return (
                <li key={p.id} className={`school-card flex flex-col p-6 transition-opacity ${p.done ? 'opacity-70' : ''}`}>
                  <p className="school-label">{sk?.areaTitle ?? 'Lesson'}</p>
                  <p className={`font-display mt-2 text-xl leading-snug text-foreground ${p.done ? 'line-through decoration-1' : ''}`}>{sk?.title ?? p.skill_id}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{who}</p>
                  {p.notes && <p className="mt-2 text-sm text-foreground/80">{p.notes}</p>}
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
                    {sk && (
                      <Link to={skillLink(sk)} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                        Open activity <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {canRecord && (
                      <Button variant="ghost" onClick={() => void toggle(p)} className="h-auto px-0 gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                        {p.done ? <><CheckCircle2 className="h-4 w-4 text-primary" />Given</> : <><Check className="h-4 w-4" />Mark as given</>}
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {ready.length > 0 && (
        <section aria-labelledby="ready-heading" className="space-y-4">
          <div>
            <h2 id="ready-heading" className="font-display text-2xl text-foreground">Ready for a next presentation</h2>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {ready.map(({ s, sk }) => (
              <li key={s.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4">
                <Button variant="link" onClick={() => onOpenStudent(s.id)} className="h-auto px-0 font-medium text-foreground">{s.name}</Button>
                <span className="flex-1 min-w-40 text-sm text-muted-foreground">{sk.title} · {sk.areaTitle}</span>
                {canRecord && (
                  <Button variant="link" onClick={() => onRecord(s.id, sk)} className="gap-1.5 px-0 text-sm font-medium text-primary">
                    Record <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
