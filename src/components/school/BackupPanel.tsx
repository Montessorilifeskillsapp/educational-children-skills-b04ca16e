import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Archive, CheckCircle2, Download, AlertTriangle, CalendarClock, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, schoolCall } from './api';
import { backupState, buildBackupZip, quarterOf, type BackupData } from './backup';
import { skillById } from './curriculum';
import { downloadBlob } from '@/lib/downloadBlob';

interface Entry { id: number; actor_email: string | null; created_at: string }

/** Reads past backups from the school's change history (written by the server for every school_backup). */
export function useBackupHistory(schoolId: string | null) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const load = useCallback(async () => {
    if (!schoolId) return;
    const { data } = await db.from('school_audit_log').select('id, actor_email, created_at').eq('school_id', schoolId)
      .eq('action', 'school_backup').order('created_at', { ascending: false }).limit(12);
    setEntries(data ?? []);
  }, [schoolId]);
  useEffect(() => { void load(); }, [load]);
  return { entries, reload: load };
}

/** Slim reminder for School Admins shown across the portal while this quarter's backup is outstanding. */
export function BackupReminder({ schoolId, onOpen }: { schoolId: string; onOpen: () => void }) {
  const { entries } = useBackupHistory(schoolId);
  if (!entries) return null;
  const st = backupState(entries.map((e) => new Date(e.created_at)));
  if (st.state === 'done' || (st.state === 'due' && st.daysLeft > 21)) return null;
  return (
    <div role="status" className="school-card flex flex-wrap items-center justify-between gap-3 border-l-4 border-l-primary px-4 py-3">
      <p className="text-sm"><strong>{st.state === 'overdue' ? 'Records backup overdue.' : `${st.quarter} records backup due in ${st.daysLeft} day${st.daysLeft === 1 ? '' : 's'}.`}</strong> Save a copy of your school’s records to your own system.</p>
      <Button size="sm" onClick={onOpen}>Back up now</Button>
    </div>
  );
}

export default function BackupPanel({ schoolId, schoolName }: { schoolId: string; schoolName: string }) {
  const { toast } = useToast();
  const { entries, reload } = useBackupHistory(schoolId);
  const [step, setStep] = useState<null | 'collect' | 'pack'>(null);
  const [last, setLast] = useState<Record<string, number> | null>(null);
  const status = useMemo(() => entries && backupState(entries.map((e) => new Date(e.created_at))), [entries]);
  const year = new Date().getFullYear();
  const quarters = [1, 2, 3, 4].map((q) => {
    const start = new Date(year, (q - 1) * 3, 1), end = new Date(year, q * 3, 1);
    const hit = entries?.find((e) => { const d = new Date(e.created_at); return d >= start && d < end; });
    return { q, hit, current: quarterOf(new Date()).q === q, future: start > new Date() };
  });

  const run = async () => {
    if (step) return;
    setStep('collect'); setLast(null);
    try {
      const data = await schoolCall<BackupData>({ action: 'school_backup', school_id: schoolId });
      setStep('pack');
      const { blob, filename, counts } = await buildBackupZip(data, (id) => skillById(id)?.title ?? id);
      downloadBlob(blob, filename);
      setLast(counts);
      toast({ title: 'Backup downloaded', description: `${filename} — move it to your school’s own secure storage.` });
      void reload();
    } catch (e) {
      toast({ title: 'Backup could not be made', description: e instanceof Error ? e.message : 'Please try again.', variant: 'destructive' });
    } finally { setStep(null); }
  };

  const tone = status?.state === 'done' ? 'text-primary' : status?.state === 'overdue' ? 'text-destructive' : 'text-foreground';
  const Icon = status?.state === 'done' ? CheckCircle2 : status?.state === 'overdue' ? AlertTriangle : CalendarClock;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl bg-background/60 p-4 ring-1 ring-border">
          {status ? (
            <div className={`flex items-start gap-3 ${tone}`}>
              <Icon className="mt-0.5 h-6 w-6 shrink-0" aria-hidden />
              <div>
                <p className="font-display text-xl">{status.state === 'done' ? `${status.quarter} backup complete` : status.state === 'overdue' ? 'Backup overdue' : `${status.quarter} backup due`}</p>
                <p className="text-sm text-muted-foreground">
                  {status.state === 'done' ? `Next backup opens in ${status.daysLeft} day${status.daysLeft === 1 ? '' : 's'}.`
                    : status.state === 'overdue' ? 'Last quarter was not backed up. Please make a backup today.'
                    : `${status.daysLeft} day${status.daysLeft === 1 ? '' : 's'} left this quarter.`}
                </p>
              </div>
            </div>
          ) : <p className="text-sm text-muted-foreground">Checking backup history…</p>}
          <ol className="mt-4 grid grid-cols-4 gap-2" aria-label={`${year} quarters`}>
            {quarters.map(({ q, hit, current, future }) => (
              <li key={q} className={`rounded-lg px-2 py-2 text-center text-xs ring-1 ${hit ? 'bg-primary/10 ring-primary/40' : current ? 'ring-primary' : 'ring-border'} ${future ? 'opacity-50' : ''}`}>
                <span className="block font-semibold">Q{q}</span>
                <span className="text-muted-foreground">{hit ? new Date(hit.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : future ? 'Upcoming' : current ? 'Due' : 'Missed'}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col justify-between gap-3 rounded-xl bg-background/60 p-4 ring-1 ring-border">
          <div className="text-sm">
            <p className="font-semibold">What’s inside</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-muted-foreground">
              <li>A printable record page for every child</li>
              <li>Spreadsheets of progress, observations, reports and plans</li>
              <li>A complete data copy for your school’s systems</li>
            </ul>
          </div>
          <Button onClick={run} disabled={!!step} className="w-full">
            {step ? <Archive className="mr-2 h-4 w-4 animate-pulse" /> : <Download className="mr-2 h-4 w-4" />}
            {step === 'collect' ? 'Gathering records…' : step === 'pack' ? 'Packing your file…' : `Download ${schoolName} backup`}
          </Button>
          {step && <Progress value={step === 'collect' ? 40 : 85} aria-label="Backup progress" />}
        </div>
      </div>

      {last && (
        <p className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
          Saved {last.students} children, {last.progress_recordings} progress recordings, {last.observations} observations and {last.reports} reports.
        </p>
      )}

      <div>
        <p className="text-sm font-semibold">Backup log</p>
        {entries?.length ? (
          <ul className="mt-1 divide-y divide-border text-sm">
            {entries.map((e) => (
              <li key={e.id} className="flex justify-between py-1.5">
                <span>{new Date(e.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                <span className="text-muted-foreground">{e.actor_email}</span>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-muted-foreground">No backups yet.</p>}
        <p className="mt-3 text-xs text-muted-foreground">Every school must save a backup to its own secure system once each quarter (January, April, July, October). The file contains sensitive information about children — store it only where your privacy policy allows.</p>
      </div>
    </div>
  );
}
