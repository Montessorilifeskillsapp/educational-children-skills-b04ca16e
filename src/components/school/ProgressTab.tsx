import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress, Student } from './api';
import ProgressChooser, { STATUS_LABEL, lastUpdate } from './ProgressChooser';
import { areas, orderedSkills, skillLink } from './curriculum';

interface Props { students: Student[]; progress: Progress[]; canEdit: boolean; nameOf: (userId: string | null) => string; onChange: () => void; onOpenStudent: (id: string) => void }

export default function ProgressTab({ students, progress, canEdit, nameOf, onChange, onOpenStudent }: Props) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const updateParam = (key: string, value: string) => setParams((previous) => {
    const next = new URLSearchParams(previous);
    if (value) next.set(key, value); else next.delete(key);
    return next;
  }, { replace: true });
  const area = params.get('area') || areas()[0].key;
  const selectedId = params.get('recordStudent') || '';
  const activityId = params.get('recordActivity') || '';
  const query = params.get('search') || '';
  const setArea = (value: string) => updateParam('area', value);
  const setSelectedId = (value: string) => updateParam('recordStudent', value);
  const setActivityId = (value: string) => updateParam('recordActivity', value);
  const setQuery = (value: string) => updateParam('search', value);
  const [draft, setDraft] = useState({ dirty: false, busy: false });
  const onDraftChange = useCallback((dirty: boolean, busy: boolean) => setDraft({ dirty, busy }), []);
  const student = students.find((s) => s.id === selectedId) ?? students[0];
  const index = students.findIndex((s) => s.id === student?.id);
  const skills = useMemo(() => orderedSkills().filter((s) => s.areaKey === area), [area]);
  const visible = useMemo(() => skills.filter((s) => s.title.toLowerCase().includes(query.trim().toLowerCase())), [skills, query]);
  const activity = skills.find((s) => s.id === activityId) ?? skills[0];
  const records = useMemo(() => new Map(progress.filter((p) => p.student_id === student?.id).map((p) => [p.skill_id, p])), [progress, student?.id]);
  const switchContext = (change: () => void) => {
    if (draft.busy || (draft.dirty && !window.confirm('Discard this unsaved observation?'))) return;
    setDraft({ dirty: false, busy: false }); change();
  };
  if (!student) return <p className="py-6 text-muted-foreground">No students in this classroom.</p>;
  const current = activity ? records.get(activity.id) : undefined;
  return <section className="pt-3">
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
      <div className="flex items-center gap-2 min-w-0">
        <Button variant="outline" size="icon" aria-label="Previous student" disabled={index <= 0 || draft.busy} onClick={() => switchContext(() => setSelectedId(students[index - 1].id))}><ChevronLeft className="h-4 w-4" /></Button>
        <Select value={student.id} onValueChange={(id) => switchContext(() => setSelectedId(id))}><SelectTrigger aria-label="Student" className="w-44 sm:w-56 text-base font-semibold"><SelectValue /></SelectTrigger><SelectContent>{students.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select>
        <Button variant="outline" size="icon" aria-label="Next student" disabled={index >= students.length - 1 || draft.busy} onClick={() => switchContext(() => setSelectedId(students[index + 1].id))}><ChevronRight className="h-4 w-4" /></Button>
        <span className="hidden sm:inline text-xs text-muted-foreground ml-1">{index + 1} / {students.length}</span>
      </div>
      <Button variant="ghost" size="sm" onClick={() => switchContext(() => onOpenStudent(student.id))}><UserRound className="h-4 w-4 mr-2" />Student notes</Button>
    </header>
    <div className="grid md:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="py-4 md:pr-5 md:border-r border-border min-w-0 space-y-3">
        <Select value={area} onValueChange={(value) => switchContext(() => { setArea(value); setActivityId(''); setQuery(''); })}><SelectTrigger aria-label="Curriculum area"><SelectValue /></SelectTrigger><SelectContent>{areas().map((a) => <SelectItem key={a.key} value={a.key}>{a.title}</SelectItem>)}</SelectContent></Select>
        <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="Search activities" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find an activity" /></div>
        <div className="md:hidden"><Select value={activity?.id ?? ''} onValueChange={(id) => switchContext(() => setActivityId(id))}><SelectTrigger aria-label="Activity"><SelectValue /></SelectTrigger><SelectContent>{visible.map((s) => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}</SelectContent></Select></div>
        <nav aria-label="Activities" className="hidden md:block max-h-[440px] overflow-y-auto space-y-1 pr-1">
          {visible.map((sk) => { const record = records.get(sk.id); return <Button key={sk.id} variant="ghost" aria-pressed={activity?.id === sk.id} onClick={() => switchContext(() => setActivityId(sk.id))} className={`w-full h-auto min-h-12 items-start justify-start text-left whitespace-normal px-3 py-2.5 rounded-md ${activity?.id === sk.id ? 'bg-accent text-accent-foreground border-l-2 border-primary' : 'border-l-2 border-transparent'}`}>
            <span className="min-w-0"><span className="block text-sm font-medium">{sk.title}</span>{record && <span className="block text-xs font-normal text-muted-foreground mt-1">{STATUS_LABEL[record.status]}</span>}</span>
          </Button>; })}
        </nav>
        {visible.length === 0 && <p className="text-sm text-muted-foreground">No matching activities.</p>}
      </aside>
      <div className="min-w-0 py-4 md:p-6">
        {activity ? <>
          <div className="mb-5 border-b border-border pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-medium text-muted-foreground">{activity.areaTitle ?? areas().find((a) => a.key === area)?.title}</p>{!canEdit && <span className="text-xs text-muted-foreground">View only</span>}</div>
            <h2 className="text-xl font-semibold mt-1">{activity.title}</h2>
            <Button variant="outline" size="sm" className="mt-3" disabled={draft.busy} onClick={() => switchContext(() => navigate(skillLink(activity)))}>Open activity guide</Button>
            <p className="text-xs text-muted-foreground mt-2">{current ? `Last recorded ${lastUpdate(current, nameOf)}` : 'No observation recorded'}</p>
          </div>
          {canEdit ? <ProgressChooser key={`${student.id}:${activity.id}`} inline studentId={student.id} studentName={student.name} activityTitle={activity.title} skillId={activity.id} current={current} nameOf={nameOf} onSaved={onChange} onDraftChange={onDraftChange} /> : <div className="space-y-4"><p className="font-medium">{current ? STATUS_LABEL[current.status] : 'Not presented'}</p><p className="text-sm whitespace-pre-wrap break-words text-muted-foreground">{current?.note ?? 'No observation notes.'}</p></div>}
        </> : <p className="text-muted-foreground">No activities in this area.</p>}
      </div>
    </div>
  </section>;
}
