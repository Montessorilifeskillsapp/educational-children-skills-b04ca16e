import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, schoolCall } from './api';
import { backupState, buildBackupZip, type BackupData, type BackupFrequency } from './backup';
import { useAuthContext } from '@/components/AuthProvider';
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

const pwKey = (userId: string, schoolId: string) => `school:backup-pw:${userId}:${schoolId}`;
/** The automatic-backup password lives only on this School Admin's device, never on the server. */
export const savedBackupPassword = (userId: string, schoolId: string) => { try { return localStorage.getItem(pwKey(userId, schoolId)); } catch { return null; } };
const saveBackupPassword = (userId: string, schoolId: string, pw: string | null) => { try { pw ? localStorage.setItem(pwKey(userId, schoolId), pw) : localStorage.removeItem(pwKey(userId, schoolId)); } catch { /* ignore */ } };

/** Runs once when a School Admin opens the portal: if this period has no backup and a password is saved here, the file downloads by itself. */
export function AutoBackup({ schoolId, userId, frequency }: { schoolId: string; userId: string; frequency: BackupFrequency }) {
  const { toast } = useToast();
  const { entries } = useBackupHistory(schoolId);
  const ran = useRef(false);
  useEffect(() => {
    if (!entries || ran.current) return;
    const pw = savedBackupPassword(userId, schoolId);
    const st = backupState(entries.map((e) => new Date(e.created_at)), new Date(), undefined, frequency);
    if (st.state === 'done' || !pw) return;
    const claim = `school:autobackup:${schoolId}:${st.quarter}`;
    try { const t = Number(localStorage.getItem(claim)); if (t && Date.now() - t < 10 * 60_000) return; localStorage.setItem(claim, String(Date.now())); } catch { /* ignore */ }
    ran.current = true;
    void (async () => {
      try {
        const data = await schoolCall<BackupData>({ action: 'school_backup', school_id: schoolId });
        const { blob, filename } = await buildBackupZip(data, (id) => skillById(id)?.title ?? id, pw, frequency);
        downloadBlob(blob, filename);
        await schoolCall({ action: 'backup_auto_done', school_id: schoolId, period: st.quarter });
        toast({ title: 'Records backup saved to this device', description: `${st.quarter} · ${filename}` });
      } catch { try { localStorage.removeItem(claim); } catch { /* ignore */ } }
    })();
  }, [entries, schoolId, userId, frequency, toast]);
  return null;
}

export default function BackupPanel({ schoolId, schoolName, frequency: initialFrequency = 'quarterly', onSettingsSaved }: { schoolId: string; schoolName: string; frequency?: BackupFrequency; onSettingsSaved?: () => void }) {
  const { toast } = useToast();
  const { user } = useAuthContext();
  const [frequency, setFrequency] = useState<BackupFrequency>(initialFrequency);
  useEffect(() => setFrequency(initialFrequency), [initialFrequency]);
  const [hasPw, setHasPw] = useState(() => !!(user && savedBackupPassword(user.id, schoolId)));
  const [autoPw, setAutoPw] = useState(''); const [autoPw2, setAutoPw2] = useState('');
  const changeFrequency = async (f: BackupFrequency) => {
    const before = frequency; setFrequency(f);
    try { await schoolCall({ action: 'backup_settings_set', school_id: schoolId, frequency: f }); onSettingsSaved?.(); toast({ title: f === 'semester' ? 'Backups every semester' : 'Backups every quarter' }); }
    catch (e) { setFrequency(before); toast({ title: 'Could not save', description: e instanceof Error ? e.message : 'Please try again.', variant: 'destructive' }); }
  };
  const saveAutoPw = () => {
    if (!user || autoPw.length < 8 || autoPw !== autoPw2) return;
    saveBackupPassword(user.id, schoolId, autoPw); setHasPw(true); setAutoPw(''); setAutoPw2('');
    toast({ title: 'Automatic backups are on for this device' });
  };
  const { entries } = useBackupHistory(schoolId);
  const turnOff = () => { if (user) saveBackupPassword(user.id, schoolId, null); setHasPw(false); toast({ title: 'Automatic backups are off for this device' }); };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-semibold">Schedule</p>
        <div role="radiogroup" aria-label="Backup schedule" className="inline-flex rounded-lg p-1 ring-1 ring-border">
          {(['quarterly', 'semester'] as const).map((f) => (
            <Button key={f} role="radio" aria-checked={frequency === f} size="sm" variant={frequency === f ? 'default' : 'ghost'} onClick={() => frequency !== f && changeFrequency(f)}>
              {f === 'quarterly' ? 'Quarterly' : 'Semester'}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="flex items-center gap-1.5 text-sm font-semibold"><Lock className="h-3.5 w-3.5" aria-hidden /> Automatic backup</p>
        {hasPw ? (
          <div className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden /> On for this device.
            <Button variant="link" size="sm" className="h-auto p-0" onClick={turnOff}>Turn off</Button></div>
        ) : (
          <div className="grid max-w-md gap-2">
            <Input aria-label="Backup password" type="password" autoComplete="new-password" placeholder="Password (at least 8 characters)" value={autoPw} onChange={(e) => setAutoPw(e.target.value)} />
            <Input aria-label="Repeat backup password" type="password" autoComplete="new-password" placeholder="Repeat password" value={autoPw2} onChange={(e) => setAutoPw2(e.target.value)} />
            <Button size="sm" className="justify-self-start" onClick={saveAutoPw} disabled={autoPw.length < 8 || autoPw !== autoPw2}>Turn on automatic backup</Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">The password opens the backup file and stays only on this device. Keep a copy somewhere safe.</p>
      </div>

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
      </div>
    </div>
  );
}
