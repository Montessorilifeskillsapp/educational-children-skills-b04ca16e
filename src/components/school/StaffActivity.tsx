import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROLE_LABEL } from './api';
import { SchoolData } from './useSchoolData';
import { skillById } from './curriculum';
import { StatusBadge } from './ProgressChooser';

interface Props { data: SchoolData; nameOf: (userId: string | null) => string; onOpenStudent: (id: string) => void }

/** School Admin view of what each staff member has recorded (progress and observation notes). */
export default function StaffActivity({ data, nameOf, onOpenStudent }: Props) {
  const [who, setWho] = useState<string>('all');
  const student = (id: string) => data.students.find((s) => s.id === id);
  const room = (id?: string) => data.classrooms.find((c) => c.id === id)?.name ?? '';

  const items = useMemo(() => {
    const rows = [
      ...data.progress.map((p) => ({ kind: 'progress' as const, id: p.id, by: p.updated_by, at: p.updated_at, studentId: p.student_id, p })),
      ...data.observations.map((o) => ({ kind: 'note' as const, id: o.id, by: o.author_id, at: o.observed_at, studentId: o.student_id, o })),
    ];
    return rows.filter((r) => who === 'all' || r.by === who).sort((a, b) => b.at.localeCompare(a.at)).slice(0, 200);
  }, [data, who]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 flex-wrap space-y-0">
        <CardTitle className="text-lg">Staff activity</CardTitle>
        <Select value={who} onValueChange={setWho}>
          <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All staff</SelectItem>
            {data.members.map((m) => <SelectItem key={m.id} value={m.user_id}>{m.full_name || m.email} · {ROLE_LABEL[m.role]}</SelectItem>)}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? <p className="text-sm text-muted-foreground">Nothing recorded yet.</p> : (
          <ul className="divide-y divide-border">
            {items.map((r) => {
              const st = student(r.studentId);
              return (
                <li key={`${r.kind}-${r.id}`} className="py-2 text-sm flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground w-28">{new Date(r.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · {nameOf(r.by)}</span>
                  <button className="font-medium hover:underline" onClick={() => st && onOpenStudent(st.id)}>{st?.name ?? 'Student'}</button>
                  <span className="text-xs text-muted-foreground">{room(st?.classroom_id)}</span>
                  {r.kind === 'progress'
                    ? <><span>{skillById(r.p.skill_id)?.title ?? r.p.skill_id}</span><StatusBadge status={r.p.status} />{r.p.note && <span className="text-muted-foreground">· {r.p.note}</span>}</>
                    : <span className="text-muted-foreground">Note: {r.o.body.length > 140 ? `${r.o.body.slice(0, 140)}…` : r.o.body}</span>}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
