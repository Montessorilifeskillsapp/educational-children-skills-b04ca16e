import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Progress, schoolCall, Student } from './api';
import { areas, orderedSkills } from './curriculum';

const NEXT: Record<string, 'presented' | 'practising' | 'mastered' | 'clear'> = { none: 'presented', presented: 'practising', practising: 'mastered', mastered: 'clear' };
const MARK: Record<string, string> = { presented: 'P', practising: 'Pr', mastered: 'M' };
const STYLE: Record<string, string> = {
  presented: 'bg-accent text-accent-foreground', practising: 'bg-secondary text-secondary-foreground', mastered: 'bg-primary text-primary-foreground',
};

interface Props { students: Student[]; progress: Progress[]; onChange: () => void; onOpenStudent: (id: string) => void }

export default function ProgressTab({ students, progress, onChange, onOpenStudent }: Props) {
  const { toast } = useToast();
  const [area, setArea] = useState(areas()[0].key);
  const skills = useMemo(() => orderedSkills().filter((s) => s.areaKey === area), [area]);
  const map = useMemo(() => new Map(progress.map((p) => [`${p.student_id}:${p.skill_id}`, p])), [progress]);
  const [busy, setBusy] = useState<string | null>(null);

  const cycle = async (sid: string, skill: string) => {
    const key = `${sid}:${skill}`;
    const cur = map.get(key)?.status ?? 'none';
    setBusy(key);
    try { await schoolCall({ action: 'progress_set', student_id: sid, skill_id: skill, status: NEXT[cur] }); onChange(); }
    catch (e) { toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(null); }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 flex-wrap space-y-0">
        <CardTitle className="text-lg">Progress & records</CardTitle>
        <Select value={area} onValueChange={setArea}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>{areas().map((a) => <SelectItem key={a.key} value={a.key}>{a.title}</SelectItem>)}</SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3">Tap a cell to step through Presented (P), Practising (Pr), Mastered (M), then clear. Activities run beginner to advanced, left to right.</p>
        {students.length === 0 ? <p className="text-sm text-muted-foreground">Add students to start recording.</p> : (
          <div className="overflow-auto max-h-[70vh] border border-border rounded-md">
            <table className="text-sm border-collapse">
              <thead className="sticky top-0 bg-card z-10">
                <tr>
                  <th className="sticky left-0 bg-card p-2 text-left min-w-[140px] border-b border-border">Student</th>
                  {skills.map((s) => (
                    <th key={s.id} className="p-1 border-b border-border align-bottom">
                      <Link to={s.route} className="block w-24 text-[11px] font-medium leading-tight text-left hover:underline" title={s.title}>{s.title}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((st) => (
                  <tr key={st.id}>
                    <td className="sticky left-0 bg-card p-2 border-b border-border">
                      <button className="font-medium hover:underline" onClick={() => onOpenStudent(st.id)}>{st.name}</button>
                    </td>
                    {skills.map((sk) => {
                      const p = map.get(`${st.id}:${sk.id}`);
                      return (
                        <td key={sk.id} className="p-1 border-b border-border text-center">
                          <button aria-label={`${st.name}, ${sk.title}: ${p?.status ?? 'not recorded'}`} disabled={busy === `${st.id}:${sk.id}`}
                            onClick={() => cycle(st.id, sk.id)}
                            className={`w-10 h-8 rounded text-xs font-semibold border border-border ${p ? STYLE[p.status] : 'bg-background text-muted-foreground'}`}>
                            {p ? MARK[p.status] : '·'}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
