import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from './api';

interface AuditEntry { id: number; actor_email: string | null; action: string; target_id: string | null; created_at: string }
const PAGE_SIZE = 50;
const labels: Record<string, string> = {
  student_save: 'Student details saved', student_delete: 'Student records permanently deleted',
  progress_set: 'Activity progress updated', observation_add: 'Observation added', observation_update: 'Observation edited',
  observation_delete: 'Observation deleted', report_record: 'Parent report prepared', report_update: 'Parent report edited',
  classroom_save: 'Classroom settings saved', classroom_delete: 'Classroom deleted', staff_assign: 'Classroom assignment changed',
  invite: 'Staff invitation created', invite_cancel: 'Invitation cancelled', member_role: 'Staff role changed',
  member_remove: 'Staff access removed', plan_save: 'Lesson plan saved', plan_delete: 'Lesson plan deleted',
  plan_done: 'Lesson plan completion changed', policies_save: 'Staff permissions saved', school_profile_save: 'School profile saved',
};

export default function AuditHistory({ schoolId }: { schoolId: string }) {
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
    if (result.error) { setEntries([]); setError('Could not load the change history. Try again.'); }
    else { setMore(result.data.length > PAGE_SIZE); setEntries(result.data.slice(0, PAGE_SIZE)); }
    setLoading(false);
  }, [schoolId, page]);
  useEffect(() => { void load(); }, [load]);
  const visible = entries.filter((e) => `${e.actor_email ?? ''} ${labels[e.action] ?? e.action}`.toLowerCase().includes(search.toLowerCase()));
  return <section className="space-y-4">
    <header className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold">Change history</h2>
      <div className="flex items-center gap-2">
        <Input aria-label="Filter current history page" placeholder="Staff or action" value={search} onChange={(e) => setSearch(e.target.value)} className="w-56 max-w-full" />
        <Button variant="outline" size="icon" title="Refresh history" aria-label="Refresh history" disabled={loading} onClick={() => void load()}><RefreshCw className="h-4 w-4" /></Button>
      </div>
    </header>
    {error ? <p role="alert" className="text-destructive">{error}</p> : loading ? <p className="text-muted-foreground">Loading change history…</p> : !visible.length ? <p className="text-muted-foreground">No matching changes on this page.</p> :
      <ol className="divide-y divide-border">{visible.map((entry) => <li key={entry.id} className="py-3 grid gap-1 sm:grid-cols-[12rem_1fr]">
        <time className="text-sm text-muted-foreground" dateTime={entry.created_at}>{new Date(entry.created_at).toLocaleString()}</time>
        <div className="min-w-0"><p className="font-medium">{labels[entry.action] ?? entry.action.replaceAll('_', ' ')}</p>
          <p className="text-sm text-muted-foreground break-all">{entry.actor_email || 'Former staff'}</p>
          {entry.target_id && <p className="text-xs text-muted-foreground break-all">Record: {entry.target_id}</p>}
        </div>
      </li>)}</ol>}
    <footer className="flex justify-between items-center">
      <Button variant="outline" size="icon" aria-label="Newer changes" disabled={!page || loading} onClick={() => setPage(page - 1)}><ChevronLeft className="h-4 w-4" /></Button>
      <span className="text-sm text-muted-foreground">Page {page + 1}</span>
      <Button variant="outline" size="icon" aria-label="Older changes" disabled={!more || loading} onClick={() => setPage(page + 1)}><ChevronRight className="h-4 w-4" /></Button>
    </footer>
  </section>;
}