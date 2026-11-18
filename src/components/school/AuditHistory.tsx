import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { locale } from '@/i18n/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from './api';

interface AuditEntry { id: number; actor_email: string | null; action: string; target_id: string | null; created_at: string }
const PAGE_SIZE = 50;
const ACTIONS = new Set(['student_save', 'student_delete', 'progress_set', 'observation_add', 'observation_update', 'observation_delete', 'report_record', 'report_update', 'classroom_save', 'classroom_delete', 'staff_assign', 'invite', 'invite_cancel', 'member_role', 'member_remove', 'plan_save', 'plan_delete', 'plan_done', 'policies_save', 'school_profile_save', 'school_backup', 'backup_confirm']);

export default function AuditHistory({ schoolId }: { schoolId: string }) {
  const { t } = useTranslation();
  const label = (action: string) => (ACTIONS.has(action) ? t(`school.au.${action}`) : action.replace(/_/g, ' '));
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [more, setMore] = useState(false);
  const load = useCallback(async () => {
    setLoading(true); setError(null);
    const result = await db.from('school_audit_log').select('id, actor_email, action, target_id, created_at')
      .eq('school_id', schoolId).order('created_at', { ascending: false }).order('id', { ascending: false })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    if (result.error) { setEntries([]); setError(t('school.au.loadFailed')); }
    else { setMore(result.data.length > PAGE_SIZE); setEntries(result.data.slice(0, PAGE_SIZE)); }
    setLoading(false);
  }, [schoolId, page, t]);
  useEffect(() => { void load(); }, [load]);
  const visible = entries.filter((e) => `${e.actor_email ?? ''} ${label(e.action)}`.toLowerCase().includes(search.toLowerCase()));
  return <section className="space-y-4">
    <header className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold">{t('school.au.title')}</h2>
      <div className="flex items-center gap-2">
        <Input aria-label={t('school.au.filter')} placeholder={t('school.au.filterPh')} value={search} onChange={(e) => setSearch(e.target.value)} className="w-56 max-w-full" />
        <Button variant="outline" size="icon" title={t('school.au.refresh')} aria-label={t('school.au.refresh')} disabled={loading} onClick={() => void load()}><RefreshCw className="h-4 w-4" /></Button>
      </div>
    </header>
    {error ? <p role="alert" className="text-destructive">{error}</p> : loading ? <p className="text-muted-foreground">{t('school.au.loading')}</p> : !visible.length ? <p className="text-muted-foreground">{t('school.au.none')}</p> :
      <ol className="divide-y divide-border">{visible.map((entry) => <li key={entry.id} className="py-3 grid gap-1 sm:grid-cols-[12rem_1fr]">
        <time className="text-sm text-muted-foreground" dateTime={entry.created_at}>{new Date(entry.created_at).toLocaleString(locale())}</time>
        <div className="min-w-0"><p className="font-medium">{label(entry.action)}</p>
          <p className="text-sm text-muted-foreground break-all">{entry.actor_email || t('school.p.formerStaff')}</p>
          {entry.target_id && <p className="text-xs text-muted-foreground break-all">{t('school.au.record', { id: entry.target_id })}</p>}
        </div>
      </li>)}</ol>}
    <footer className="flex justify-between items-center">
      <Button variant="outline" size="icon" aria-label={t('school.au.newer')} disabled={!page || loading} onClick={() => setPage(page - 1)}><ChevronLeft className="h-4 w-4" /></Button>
      <span className="text-sm text-muted-foreground">{t('school.au.page', { n: page + 1 })}</span>
      <Button variant="outline" size="icon" aria-label={t('school.au.older')} disabled={!more || loading} onClick={() => setPage(page + 1)}><ChevronRight className="h-4 w-4" /></Button>
    </footer>
  </section>;
}