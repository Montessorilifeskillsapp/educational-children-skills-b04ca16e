import { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { locale } from '@/i18n/format';
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
// Labels follow the chosen language; stored status identifiers never change.
export const STATUS_LABEL: Record<Status, string> = {
  get presented() { return i18n.t('school.status.presented'); },
  get practising() { return i18n.t('school.status.practising'); },
  get mastered() { return i18n.t('school.status.mastered'); },
};
export const STATUS_STYLE: Record<Status, string> = {
  presented: 'bg-accent text-accent-foreground border-accent',
  practising: 'bg-secondary text-secondary-foreground border-secondary',
  mastered: 'bg-primary text-primary-foreground border-primary',
};
const DESCRIPTION: Record<Status, string> = {
  get presented() { return i18n.t('school.statusDesc.presented'); },
  get practising() { return i18n.t('school.statusDesc.practising'); },
  get mastered() { return i18n.t('school.statusDesc.mastered'); },
};
export function StatusBadge({ status }: { status?: Status }) {
  return <span className="text-sm text-foreground">{status ? STATUS_LABEL[status] : i18n.t('school.pc.notPresented')}</span>;
}
export function lastUpdate(p: Progress | undefined, nameOf: (userId: string | null) => string) {
  if (!p) return i18n.t('school.pc.noRecord');
  const d = new Date(p.updated_at).toLocaleDateString(locale(), { month: 'short', day: 'numeric', year: 'numeric' });
  return `${d}${p.updated_by ? ` · ${nameOf(p.updated_by)}` : ''}`;
}
interface Props { studentId: string; skillId: string; current?: Progress; nameOf: (userId: string | null) => string; onSaved: () => void; compact?: boolean; studentName?: string; activityTitle?: string; inline?: boolean; onDraftChange?: (dirty: boolean, busy: boolean) => void }

export default function ProgressChooser({ studentId, skillId, current, nameOf, onSaved, studentName, activityTitle, inline = false, onDraftChange }: Props) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status | ''>(current?.status ?? '');
  const [note, setNote] = useState(current?.note ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const dirty = status !== (current?.status ?? '') || note !== (current?.note ?? '');
  useEffect(() => { onDraftChange?.(dirty, busy); }, [dirty, busy, onDraftChange]);
  useEffect(() => { setStatus(current?.status ?? ''); setNote(current?.note ?? ''); }, [current?.status, current?.note]);
  const reset = () => { setStatus(current?.status ?? ''); setNote(current?.note ?? ''); setError(''); };
  const changeOpen = (value: boolean) => {
    if (busy) return;
    if (!value && dirty && !window.confirm(t('school.pc.discard'))) return;
    if (value) { setStatus(current?.status ?? ''); setNote(current?.note ?? ''); setError(''); }
    setOpen(value);
  };
  const save = async (value: Status | 'clear') => {
    setBusy(true); setError('');
    try {
      await schoolCall({ action: 'progress_set', student_id: studentId, skill_id: skillId, status: value, note: value === 'clear' ? null : note.trim() || null });
      setStatus(value === 'clear' ? '' : value); setNote(value === 'clear' ? '' : note.trim()); onSaved(); setOpen(false); toast({ title: value === 'clear' ? t('school.pc.removed') : t('school.pc.saved') });
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };
  const form = (
      <form onSubmit={(e) => { e.preventDefault(); if (status) void save(status); }} className="space-y-4">
        <fieldset disabled={busy} className="space-y-3">
          <legend className="text-sm font-semibold mb-3">{t('school.pc.observed')}</legend>
          <RadioGroup value={status} onValueChange={(v) => setStatus(v as Status)} aria-label={t('school.pc.observed')}>
            {STATUSES.map((s) => <Label key={s} htmlFor={`${id}-${s}`} className={`flex items-start gap-3 border rounded-md p-3 cursor-pointer ${status === s ? 'border-primary bg-accent/30' : 'border-border'}`}>
              <RadioGroupItem id={`${id}-${s}`} value={s} className="mt-0.5 shrink-0" />
              <span className="space-y-1"><span className="block font-medium">{STATUS_LABEL[s]}</span><span className="block text-sm font-normal text-muted-foreground">{DESCRIPTION[s]}</span></span>
            </Label>)}
          </RadioGroup>
          <div className="space-y-2"><Label htmlFor={`${id}-note`}>{t('school.pc.notes')}</Label><Textarea id={`${id}-note`} value={note} maxLength={500} rows={4} onChange={(e) => setNote(e.target.value)} placeholder={t('school.pc.notesPh')} /></div>
        </fieldset>
        {current && <p className="text-xs text-muted-foreground">{t('school.pc.last', { when: lastUpdate(current, nameOf) })}</p>}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="flex flex-wrap justify-end gap-2">
          {current && <Button type="button" variant="ghost" disabled={busy} className="text-destructive mr-auto" onClick={() => { if (window.confirm(t('school.pc.confirmRemove'))) void save('clear'); }}>{t('school.pc.remove')}</Button>}
          <Button type="button" variant="outline" disabled={busy} onClick={() => inline ? reset() : changeOpen(false)}>{t('shared.cancel')}</Button>
          <Button type="submit" disabled={busy || !status || !dirty}>{busy ? t('shared.saving') : t('school.pc.save')}</Button>
        </div>
      </form>
  );
  if (inline) return form;
  return <Dialog open={open} onOpenChange={changeOpen}>
    <Button type="button" size="sm" variant="outline" onClick={() => changeOpen(true)}><ClipboardPen className="h-4 w-4 mr-2" />{current ? t('school.pc.edit') : t('school.pc.record')}</Button>
    <DialogContent className="max-w-lg max-h-[90dvh] overflow-y-auto" onEscapeKeyDown={(e) => { if (busy) e.preventDefault(); }}>
      <DialogHeader><DialogTitle>{studentName ?? t('school.pc.student')}</DialogTitle><DialogDescription>{activityTitle ?? t('school.pc.activity')}</DialogDescription></DialogHeader>
      {form}
    </DialogContent>
  </Dialog>;
}
