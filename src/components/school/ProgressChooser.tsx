import { useId, useState } from 'react';
import { ClipboardPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Progress, schoolCall } from './api';

export type Status = Progress['status'];
export const STATUSES: Status[] = ['presented', 'practising', 'mastered'];
export const STATUS_LABEL: Record<Status, string> = { presented: 'Presented', practising: 'Practising', mastered: 'Working independently' };
export const STATUS_STYLE: Record<Status, string> = {
  presented: 'bg-accent text-accent-foreground border-accent',
  practising: 'bg-secondary text-secondary-foreground border-secondary',
  mastered: 'bg-primary text-primary-foreground border-primary',
};
const DESCRIPTION: Record<Status, string> = {
  presented: 'The adult has given the presentation.',
  practising: 'The child is repeating and exploring the activity.',
  mastered: 'The child carries out the activity without adult help.',
};
export function StatusBadge({ status }: { status?: Status }) {
  return <span className="text-sm text-foreground">{status ? STATUS_LABEL[status] : 'Not presented'}</span>;
}
export function lastUpdate(p: Progress | undefined, nameOf: (userId: string | null) => string) {
  if (!p) return 'No record';
  const d = new Date(p.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  return `${d}${p.updated_by ? ` · ${nameOf(p.updated_by)}` : ''}`;
}
interface Props { studentId: string; skillId: string; current?: Progress; nameOf: (userId: string | null) => string; onSaved: () => void; compact?: boolean; studentName?: string; activityTitle?: string }

export default function ProgressChooser({ studentId, skillId, current, nameOf, onSaved, studentName, activityTitle }: Props) {
  const { toast } = useToast();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status | ''>('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const dirty = status !== (current?.status ?? '') || note !== (current?.note ?? '');
  const changeOpen = (value: boolean) => {
    if (busy) return;
    if (!value && dirty && !window.confirm('Discard this unsaved observation?')) return;
    if (value) { setStatus(current?.status ?? ''); setNote(current?.note ?? ''); setError(''); }
    setOpen(value);
  };
  const save = async (value: Status | 'clear') => {
    setBusy(true); setError('');
    try {
      await schoolCall({ action: 'progress_set', student_id: studentId, skill_id: skillId, status: value, note: value === 'clear' ? null : note.trim() || null });
      onSaved(); setOpen(false); toast({ title: value === 'clear' ? 'Record removed' : 'Observation saved' });
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };
  return <Dialog open={open} onOpenChange={changeOpen}>
    <Button type="button" size="sm" variant="outline" onClick={() => changeOpen(true)}><ClipboardPen className="h-4 w-4 mr-2" />{current ? 'Edit record' : 'Record observation'}</Button>
    <DialogContent className="max-w-lg max-h-[90dvh] overflow-y-auto" onEscapeKeyDown={(e) => { if (busy) e.preventDefault(); }}>
      <DialogHeader><DialogTitle>{studentName ?? 'Student observation'}</DialogTitle><DialogDescription>{activityTitle ?? 'Activity record'}</DialogDescription></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); if (status) void save(status); }} className="space-y-4">
        <fieldset disabled={busy} className="space-y-3">
          <legend className="text-sm font-semibold mb-3">Observed activity</legend>
          <RadioGroup value={status} onValueChange={(v) => setStatus(v as Status)} aria-label="Observed activity">
            {STATUSES.map((s) => <Label key={s} htmlFor={`${id}-${s}`} className={`flex items-start gap-3 border rounded-md p-3 cursor-pointer ${status === s ? 'border-primary bg-accent/30' : 'border-border'}`}>
              <RadioGroupItem id={`${id}-${s}`} value={s} className="mt-0.5 shrink-0" />
              <span className="space-y-1"><span className="block font-medium">{STATUS_LABEL[s]}</span><span className="block text-sm font-normal text-muted-foreground">{DESCRIPTION[s]}</span></span>
            </Label>)}
          </RadioGroup>
          <div className="space-y-2"><Label htmlFor={`${id}-note`}>Observation notes</Label><Textarea id={`${id}-note`} value={note} maxLength={500} rows={4} onChange={(e) => setNote(e.target.value)} placeholder="Concentration, repetition, independence, or support observed…" /></div>
        </fieldset>
        {current && <p className="text-xs text-muted-foreground">Last recorded: {lastUpdate(current, nameOf)}</p>}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="flex flex-wrap justify-end gap-2">
          {current && <Button type="button" variant="ghost" disabled={busy} className="text-destructive mr-auto" onClick={() => { if (window.confirm('Remove this activity record?')) void save('clear'); }}>Remove record</Button>}
          <Button type="button" variant="outline" disabled={busy} onClick={() => changeOpen(false)}>Cancel</Button>
          <Button type="submit" disabled={busy || !status || !dirty}>{busy ? 'Saving…' : 'Save observation'}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>;
}
