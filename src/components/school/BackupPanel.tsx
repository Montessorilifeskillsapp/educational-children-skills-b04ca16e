import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { locale } from '@/i18n/format';
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
const LOCATIONS = ['school_drive', 'school_server', 'external_drive', 'other'];
const storedLabel = (d?: string | null) => { if (!d) return null; const [k, ...rest] = d.split(': '); return (LOCATIONS.includes(k) ? i18n.t(`school.bk.loc.${k}`) : k) + (rest.length ? ` — ${rest.join(': ')}` : ''); };

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
        toast({ title: i18n.t('school.bk.saved'), description: `${st.quarter} · ${filename}` });
      } catch { try { localStorage.removeItem(claim); } catch { /* ignore */ } }
    })();
  }, [entries, schoolId, userId, frequency, toast]);
  return null;
}

export default function BackupPanel({ schoolId, schoolName, frequency: initialFrequency = 'quarterly', onSettingsSaved }: { schoolId: string; schoolName: string; frequency?: BackupFrequency; onSettingsSaved?: () => void }) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [frequency, setFrequency] = useState<BackupFrequency>(initialFrequency);
  useEffect(() => setFrequency(initialFrequency), [initialFrequency]);
  const [hasPw, setHasPw] = useState(() => !!(user && savedBackupPassword(user.id, schoolId)));
  const [autoPw, setAutoPw] = useState(''); const [autoPw2, setAutoPw2] = useState('');
  const changeFrequency = async (f: BackupFrequency) => {
    const before = frequency; setFrequency(f);
    try { await schoolCall({ action: 'backup_settings_set', school_id: schoolId, frequency: f }); onSettingsSaved?.(); toast({ title: f === 'semester' ? t('school.bk.semester') : t('school.bk.quarter') }); }
    catch (e) { setFrequency(before); toast({ title: t('shared.couldNotSave'), description: e instanceof Error ? e.message : t('school.bk.tryAgain'), variant: 'destructive' }); }
  };
  const saveAutoPw = () => {
    if (!user || autoPw.length < 8 || autoPw !== autoPw2) return;
    saveBackupPassword(user.id, schoolId, autoPw); setHasPw(true); setAutoPw(''); setAutoPw2('');
    toast({ title: t('school.bk.on') });
  };
  const { entries } = useBackupHistory(schoolId);
  const turnOff = () => { if (user) saveBackupPassword(user.id, schoolId, null); setHasPw(false); toast({ title: t('school.bk.off') }); };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-semibold">{t('school.bk.schedule')}</p>
        <div role="radiogroup" aria-label={t('school.bk.scheduleLabel')} className="inline-flex rounded-lg p-1 ring-1 ring-border">
          {(['quarterly', 'semester'] as const).map((f) => (
            <Button key={f} role="radio" aria-checked={frequency === f} size="sm" variant={frequency === f ? 'default' : 'ghost'} onClick={() => frequency !== f && changeFrequency(f)}>
              {f === 'quarterly' ? t('school.bk.quarterly') : t('school.bk.semesterBtn')}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="flex items-center gap-1.5 text-sm font-semibold"><Lock className="h-3.5 w-3.5" aria-hidden /> {t('school.bk.auto')}</p>
        {hasPw ? (
          <div className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden /> {t('school.bk.onDevice')}
            <Button variant="link" size="sm" className="h-auto p-0" onClick={turnOff}>{t('school.bk.turnOff')}</Button></div>
        ) : (
          <div className="grid max-w-md gap-2">
            <Input aria-label={t('school.bk.pw')} type="password" autoComplete="new-password" placeholder={t('school.bk.pwPh')} value={autoPw} onChange={(e) => setAutoPw(e.target.value)} />
            <Input aria-label={t('school.bk.pw2')} type="password" autoComplete="new-password" placeholder={t('school.bk.pw2Ph')} value={autoPw2} onChange={(e) => setAutoPw2(e.target.value)} />
            <Button size="sm" className="justify-self-start" onClick={saveAutoPw} disabled={autoPw.length < 8 || autoPw !== autoPw2}>{t('school.bk.turnOn')}</Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">{t('school.bk.pwNote')}</p>
      </div>

      <div>
        <p className="text-sm font-semibold">{t('school.bk.log')}</p>
        {entries?.length ? (
          <ul className="mt-1 divide-y divide-border text-sm">
            {entries.map((e) => (
              <li key={e.id} className="flex justify-between py-1.5">
                <span>{new Date(e.created_at).toLocaleString(locale(), { dateStyle: 'medium', timeStyle: 'short' })}</span>
                <span className="text-muted-foreground">{e.actor_email}</span>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-muted-foreground">{t('school.bk.none')}</p>}
      </div>
    </div>
  );
}
