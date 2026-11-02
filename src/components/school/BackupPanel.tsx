import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Archive, CheckCircle2, Download, AlertTriangle, CalendarClock, ShieldCheck, Lock, HardDrive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, schoolCall } from './api';
import { backupState, buildBackupZip, quarterOf, type BackupData } from './backup';
import { skillById } from './curriculum';
import { downloadBlob } from '@/lib/downloadBlob';

interface Entry { id: number; actor_email: string | null; created_at: string; action?: string; detail?: string | null; stored?: string | null }
const LOCATIONS: Record<string, string> = { school_drive: "School's cloud drive", school_server: "School's own server", external_drive: 'Encrypted external drive', other: 'Other' };
const storedLabel = (d?: string | null) => { if (!d) return null; const [k, ...rest] = d.split(': '); return (LOCATIONS[k] ?? k) + (rest.length ? ` — ${rest.join(': ')}` : ''); };

/** Reads past backups from the school's change history (written by the server for every school_backup). */
export function useBackupHistory(schoolId: string | null) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const load = useCallback(async () => {
    if (!schoolId) return;
    const { data } = await db.from('school_audit_log').select('id, actor_email, created_at, action, detail').eq('school_id', schoolId)
      .in('action', ['school_backup', 'backup_confirm']).order('created_at', { ascending: false }).limit(40);
    const rows = (data ?? []) as Entry[];
    // Each storage confirmation belongs to the backup made just before it.
    const backups = rows.filter((r) => r.action === 'school_backup').map((b) => ({ ...b,
      stored: rows.filter((c) => c.action === 'backup_confirm' && c.created_at >= b.created_at && c.actor_email === b.actor_email).pop()?.detail ?? null }));
    setEntries(backups.slice(0, 12));
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
  const [pw, setPw] = useState(''); const [pw2, setPw2] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loc, setLoc] = useState('school_drive'); const [note, setNote] = useState(''); const [saving, setSaving] = useState(false);
  const pwError = pw.length > 0 && pw.length < 8 ? 'Use at least 8 characters.' : pw2 && pw !== pw2 ? 'Passwords do not match.' : null;
  const pwReady = pw.length >= 8 && pw === pw2;
  const confirmStored = async () => {
    setSaving(true);
    try {
      await schoolCall({ action: 'backup_confirm', school_id: schoolId, location: loc, ...(note.trim() ? { note: note.trim() } : {}) });
      toast({ title: 'Storage recorded', description: 'Added to your backup log.' });
      setConfirmOpen(false); setNote(''); void reload();
    } catch (e) { toast({ title: 'Could not record', description: e instanceof Error ? e.message : 'Please try again.', variant: 'destructive' }); }
    finally { setSaving(false); }
  };
  const status = useMemo(() => entries && backupState(entries.map((e) => new Date(e.created_at))), [entries]);
  const year = new Date().getFullYear();
  const quarters = [1, 2, 3, 4].map((q) => {
    const start = new Date(year, (q - 1) * 3, 1), end = new Date(year, q * 3, 1);
    const hit = entries?.find((e) => { const d = new Date(e.created_at); return d >= start && d < end; });
    return { q, hit, current: quarterOf(new Date()).q === q, future: start > new Date() };
  });

  const run = async () => {
    if (step || !pwReady) return;
    setStep('collect'); setLast(null);
    try {
      const data = await schoolCall<BackupData>({ action: 'school_backup', school_id: schoolId });
      setStep('pack');
      const { blob, filename, counts } = await buildBackupZip(data, (id) => skillById(id)?.title ?? id, pw);
      downloadBlob(blob, filename);
      setLast(counts); setPw(''); setPw2(''); setConfirmOpen(true);
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
              <li>A school summary with totals by classroom</li>
              <li>A printable record page for every child</li>
              <li>Spreadsheets of progress, observations, reports and plans</li>
              <li>A complete data copy for your school’s systems</li>
            </ul>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bk-pw" className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" aria-hidden /> File password</Label>
            <Input id="bk-pw" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} />
            <Input aria-label="Repeat password" type="password" autoComplete="new-password" placeholder="Repeat password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
            <p className={`text-xs ${pwError ? 'text-destructive' : 'text-muted-foreground'}`}>{pwError ?? 'Needed to open the file. Keep it somewhere safe — it cannot be recovered.'}</p>
          </div>
          <Button onClick={run} disabled={!!step || !pwReady} className="w-full">
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
          <Button variant="link" size="sm" className="ml-auto h-auto p-0" onClick={() => setConfirmOpen(true)}>Confirm where it's stored</Button>
        </p>
      )}

      <div>
        <p className="text-sm font-semibold">Backup log</p>
        {entries?.length ? (
          <ul className="mt-1 divide-y divide-border text-sm">
            {entries.map((e) => (
              <li key={e.id} className="flex justify-between py-1.5">
                <span>{new Date(e.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                <span className="text-right text-muted-foreground">{e.actor_email}{e.stored ? <span className="flex items-center justify-end gap-1 text-xs text-primary"><HardDrive className="h-3 w-3" aria-hidden />{storedLabel(e.stored)}</span> : <span className="block text-xs">Storage not confirmed</span>}</span>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-muted-foreground">No backups yet.</p>}
        <p className="mt-3 text-xs text-muted-foreground">Every school must save a backup to its own secure system once each quarter (January, April, July, October). The file contains sensitive information about children — store it only where your privacy policy allows.</p>
      </div>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Where did you store the backup?</DialogTitle>
            <DialogDescription>Move the downloaded file off this device to your school's own secure storage, then record where it went. This is kept in your backup log for reviews.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Select value={loc} onValueChange={setLoc}>
              <SelectTrigger aria-label="Storage location"><SelectValue /></SelectTrigger>
              <SelectContent>{Object.entries(LOCATIONS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
            </Select>
            <Textarea maxLength={200} placeholder="Optional: folder name or note (no passwords)" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Later</Button>
            <Button onClick={confirmStored} disabled={saving}>{saving ? 'Saving…' : 'Confirm stored'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
