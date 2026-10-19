import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress, Student } from './api';
import ProgressChooser, { StatusBadge, lastUpdate } from './ProgressChooser';
import { areas, orderedSkills } from './curriculum';

interface Props { students: Student[]; progress: Progress[]; canEdit: boolean; nameOf: (userId: string | null) => string; onChange: () => void; onOpenStudent: (id: string) => void }

export default function ProgressTab({ students, progress, canEdit, nameOf, onChange, onOpenStudent }: Props) {
  const [area, setArea] = useState(areas()[0].key);
  const [selectedId, setSelectedId] = useState('');
  const student = students.find((s) => s.id === selectedId) ?? students[0];
  const index = students.findIndex((s) => s.id === student?.id);
  const skills = useMemo(() => orderedSkills().filter((s) => s.areaKey === area), [area]);
  const records = useMemo(() => new Map(progress.filter((p) => p.student_id === student?.id).map((p) => [p.skill_id, p])), [progress, student?.id]);
  if (!student) return <p className="py-6 text-muted-foreground">No students in this classroom.</p>;
  return <section className="space-y-5 py-4">
    <header className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">Student observations</h2>{!canEdit && <span className="text-sm text-muted-foreground">View only</span>}</header>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2"><Label htmlFor="observation-student">Student</Label><div className="flex gap-2">
        <Button variant="outline" size="icon" aria-label="Previous student" disabled={index <= 0} onClick={() => setSelectedId(students[index - 1].id)}><ChevronLeft className="h-4 w-4" /></Button>
        <Select value={student.id} onValueChange={setSelectedId}><SelectTrigger id="observation-student" className="flex-1 min-w-0"><SelectValue /></SelectTrigger><SelectContent>{students.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select>
        <Button variant="outline" size="icon" aria-label="Next student" disabled={index >= students.length - 1} onClick={() => setSelectedId(students[index + 1].id)}><ChevronRight className="h-4 w-4" /></Button>
      </div></div>
      <div className="space-y-2"><Label htmlFor="observation-area">Curriculum area</Label><Select value={area} onValueChange={setArea}><SelectTrigger id="observation-area"><SelectValue /></SelectTrigger><SelectContent>{areas().map((a) => <SelectItem key={a.key} value={a.key}>{a.title}</SelectItem>)}</SelectContent></Select></div>
    </div>
    <div className="flex items-center justify-between gap-3 border-b border-border pb-3"><h3 className="text-lg font-semibold">{student.name}</h3><Button variant="ghost" size="sm" onClick={() => onOpenStudent(student.id)}><UserRound className="h-4 w-4 mr-2" />Student notes & details</Button></div>
    <ul className="divide-y divide-border">
      {skills.map((sk) => { const p = records.get(sk.id); return <li key={`${student.id}:${sk.id}`} className="py-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] items-start">
        <div className="min-w-0 space-y-1"><h4 className="font-medium">{sk.title}</h4><StatusBadge status={p?.status} />{p && <p className="text-xs text-muted-foreground">{lastUpdate(p, nameOf)}</p>}{p?.note && <p className="text-sm whitespace-pre-wrap break-words text-muted-foreground">{p.note}</p>}</div>
        {canEdit && <div><ProgressChooser studentId={student.id} studentName={student.name} activityTitle={sk.title} skillId={sk.id} current={p} nameOf={nameOf} onSaved={onChange} /></div>}
      </li>; })}
    </ul>
  </section>;
}
