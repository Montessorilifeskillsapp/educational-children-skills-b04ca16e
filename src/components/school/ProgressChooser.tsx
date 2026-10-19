import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Progress, schoolCall } from './api';

export type Status = Progress['status'];
export const STATUSES: Status[] = ['presented', 'practising', 'mastered'];
export const STATUS_LABEL: Record<Status, string> = { presented: 'Presented', practising: 'Practising', mastered: 'Mastered' };
export const STATUS_STYLE: Record<Status, string> = {
  presented: 'bg-accent text-accent-foreground border-accent',
  practising: 'bg-secondary text-secondary-foreground border-secondary',
  mastered: 'bg-primary text-primary-foreground border-primary',
};

/** Small badge used in grids and lists. */
export function StatusBadge({ status }: { status?: Status }) {
  if (!status) return <span className="text-xs text-muted-foreground">Not yet</span>;
  return <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold border ${STATUS_STYLE[status]}`}>{STATUS_LABEL[status]}</span>;
}

export function lastUpdate(p: Progress | undefined, nameOf: (userId: string | null) => string) {
  if (!p) return 'Not recorded yet';
  const d = new Date(p.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return `${STATUS_LABEL[p.status]} · ${d}${p.updated_by ? ` · ${nameOf(p.updated_by)}` : ''}`;
}

interface Props { studentId: string; skillId: string; current?: Progress; nameOf: (userId: string | null) => string; onSaved: () => void; compact?: boolean }

/** Three labelled choices plus an optional note; one tap saves. */
export default function ProgressChooser({ studentId, skillId, current, nameOf, onSaved, compact }: Props) {
  const { toast } = useToast();
  const [note, setNote] = useState(current?.note ?? '');
  const [busy, setBusy] = useState(false);
  useEffect(() => { setNote(current?.note ?? ''); }, [current?.note, studentId, skillId]);

  const save = async (status: Status | 'clear') => {
    setBusy(true);
    try { await schoolCall({ action: 'progress_set', student_id: studentId, skill_id: skillId, status, note: note.trim() || null }); onSaved(); }
    catch (e) { toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5 flex-wrap">
        {STATUSES.map((s) => (
          <Button key={s} type="button" size="sm" disabled={busy} variant={current?.status === s ? 'default' : 'outline'}
            aria-pressed={current?.status === s} onClick={() => save(s)}
            className={current?.status === s ? STATUS_STYLE[s] : ''}>{STATUS_LABEL[s]}</Button>
        ))}
      </div>
      {!compact && (
        <Input value={note} maxLength={500} placeholder="Optional note (saved with the status)" onChange={(e) => setNote(e.target.value)} />
      )}
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{lastUpdate(current, nameOf)}</span>
        {current && <button type="button" disabled={busy} className="underline hover:text-foreground" onClick={() => save('clear')}>Clear record</button>}
      </div>
    </div>
  );
}
