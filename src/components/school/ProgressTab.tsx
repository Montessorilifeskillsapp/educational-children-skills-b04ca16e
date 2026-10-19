import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress, Student } from './api';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ProgressChooser, { STATUSES, STATUS_LABEL, STATUS_STYLE, lastUpdate } from './ProgressChooser';
import { areas, orderedSkills } from './curriculum';

interface Props { students: Student[]; progress: Progress[]; canEdit: boolean; nameOf: (userId: string | null) => string; onChange: () => void; onOpenStudent: (id: string) => void }

export default function ProgressTab({ students, progress, canEdit, nameOf, onChange, onOpenStudent }: Props) {
  const [area, setArea] = useState(areas()[0].key);
  const skills = useMemo(() => orderedSkills().filter((s) => s.areaKey === area), [area]);
  const map = useMemo(() => new Map(progress.map((p) => [`${p.student_id}:${p.skill_id}`, p])), [progress]);
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
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted-foreground">
          {STATUSES.map((st) => <span key={st} className={`rounded px-1.5 py-0.5 font-semibold border ${STATUS_STYLE[st]}`}>{STATUS_LABEL[st]}</span>)}
          <span>{canEdit ? 'Tap a cell to choose a status. Tap a name to open that student.' : 'View only. Tap a name to see that student.'} Activities run beginner to advanced, left to right.</span>
        </div>
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
                          {(() => {
                            const cell = (
                              <button type="button" aria-label={`${st.name}, ${sk.title}: ${p ? STATUS_LABEL[p.status] : 'not recorded'}`} title={lastUpdate(p, nameOf)}
                                className={`w-24 h-8 rounded text-[11px] font-semibold border ${p ? STATUS_STYLE[p.status] : 'bg-background text-muted-foreground border-border'} ${canEdit ? '' : 'cursor-default'}`}>
                                {p ? STATUS_LABEL[p.status] : canEdit ? '+ Record' : '—'}
                              </button>
                            );
                            if (!canEdit) return cell;
                            return (
                              <Popover>
                                <PopoverTrigger asChild>{cell}</PopoverTrigger>
                                <PopoverContent className="w-72">
                                  <p className="text-sm font-medium mb-2">{st.name} · {sk.title}</p>
                                  <ProgressChooser studentId={st.id} skillId={sk.id} current={p} nameOf={nameOf} onSaved={onChange} />
                                </PopoverContent>
                              </Popover>
                            );
                          })()}
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
