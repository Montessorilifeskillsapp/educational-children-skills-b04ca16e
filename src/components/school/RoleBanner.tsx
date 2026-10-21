import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROLE_LABEL, type SchoolRole } from './api';

interface Props { role: SchoolRole; canRecord: boolean; previewing: boolean; onExitPreview: () => void }

const TEXT: Record<SchoolRole, string> = {
  school_admin: 'You oversee the whole school: all classrooms, staff, grades and reports.',
  teacher: 'Your classrooms: record progress, write notes and send parent reports.',
  assistant: 'View only. You can look up students, plans and records.',
};

export default function RoleBanner({ role, canRecord, previewing, onExitPreview }: Props) {
  const text = role === 'assistant' && canRecord ? 'You can record progress and notes in your classrooms, as allowed by your School Admin.' : TEXT[role];
  const tone = role === 'school_admin' ? 'bg-primary/10 border-primary/40' : role === 'teacher' ? 'bg-secondary border-border' : 'bg-muted border-border';
  return (
    <div className="space-y-2 print:hidden">
      {previewing && (
        <div role="status" className="flex items-center justify-between gap-3 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-foreground">
          <span>Previewing as {ROLE_LABEL[role]}. Changes are turned off.</span>
          <Button size="sm" variant="outline" onClick={onExitPreview}>Back to School Admin</Button>
        </div>
      )}
      <div className={`flex items-center gap-3 rounded-md border px-4 py-3 ${tone}`}>
        <Badge variant={role === 'school_admin' ? 'default' : 'secondary'}>{ROLE_LABEL[role]}</Badge>
        <p className="text-sm text-foreground">{text}</p>
      </div>
    </div>
  );
}
