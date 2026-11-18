import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { skillById } from '@/components/school/curriculum';

interface Child { id: string; name: string; school_name: string }
interface RecordData {
  student: Child & { date_of_birth: string | null; health_notes: string | null };
  observations: { id: string; body: string; observed_at: string; edited_at: string | null }[];
  progress: { id: string; skill_id: string; status: string; note: string | null; updated_at: string }[];
  reports: { id: string; period_start: string; period_end: string; summary: { title?: string; body?: string } }[];
}
async function read<T>(studentId?: string): Promise<T> {
  const { data, error } = await supabase.functions.invoke('school-portal', { body: { action: 'parent_records', ...(studentId ? { student_id: studentId } : {}) } });
  if (error) throw new Error(i18n.t('family.rec.openError'));
  return data as T;
}

export default function SchoolRecords({ userId }: { userId: string }) {
  const { t } = useTranslation();
  const [children, setChildren] = useState<Child[]>([]);
  const [selected, setSelected] = useState('');
  const [record, setRecord] = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let canceled = false;
    setLoading(true); setError(''); setChildren([]); setSelected(''); setRecord(null);
    read<{ students: Child[] }>().then(({ students }) => {
      if (canceled) return;
      setChildren(students); setSelected(students[0]?.id ?? '');
    }).catch((e: Error) => { if (!canceled) setError(e.message); })
      .finally(() => { if (!canceled) setLoading(false); });
    return () => { canceled = true; };
  }, [userId, revision]);
  useEffect(() => {
    let canceled = false;
    setRecord(null);
    if (!selected) return;
    setLoading(true); setError('');
    read<RecordData>(selected).then((r) => { if (!canceled) setRecord(r); })
      .catch((e: Error) => { if (!canceled) setError(e.message); })
      .finally(() => { if (!canceled) setLoading(false); });
    return () => { canceled = true; };
  }, [selected]);
  return <section className="my-6 border-t border-border pt-5" aria-label={t('family.rec.region')}>
    <div className="flex items-center justify-between gap-3 mb-4">
      <h2 className="text-xl font-semibold">{t('family.rec.region')}</h2>
      <Button variant="outline" size="sm" onClick={() => setRevision((n) => n + 1)}>{t('shared.refresh')}</Button>
    </div>
    {error && <p role="alert" className="text-destructive">{error}</p>}
    {loading && <p role="status" className="text-muted-foreground">{t('family.rec.opening')}</p>}
    {!loading && !error && !children.length && <p className="text-muted-foreground">{t('family.rec.none')}</p>}
    {children.length > 0 && <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="max-w-md" aria-label={t('family.rec.child')}><SelectValue /></SelectTrigger>
      <SelectContent>{children.map((c) => <SelectItem key={c.id} value={c.id}>{c.name} · {c.school_name}</SelectItem>)}</SelectContent>
    </Select>}
    {record && <div className="mt-5">
      <h3 className="text-lg font-semibold">{record.student.name} · {record.student.school_name}</h3>
      {record.student.date_of_birth && <p className="text-sm text-muted-foreground">{t('family.rec.dob', { date: record.student.date_of_birth })}</p>}
      <Tabs defaultValue="notes" className="mt-4">
        <TabsList className="h-auto flex flex-wrap justify-start"><TabsTrigger value="notes">{t('family.rec.notes')}</TabsTrigger><TabsTrigger value="progress">{t('family.rec.progress')}</TabsTrigger><TabsTrigger value="reports">{t('family.rec.reports')}</TabsTrigger><TabsTrigger value="health">{t('family.rec.health')}</TabsTrigger></TabsList>
        <TabsContent value="notes"><ul className="divide-y divide-border">{record.observations.map((o) => <li key={o.id} className="py-4"><time className="text-sm text-muted-foreground">{o.observed_at.slice(0, 10)}</time><p className="whitespace-pre-wrap break-words mt-1">{o.body}</p>{o.edited_at && <p className="text-xs text-muted-foreground mt-1">{t('family.rec.updated', { date: o.edited_at.slice(0, 10) })}</p>}</li>)}</ul>{!record.observations.length && <p>{t('family.rec.noNotes')}</p>}</TabsContent>
        <TabsContent value="progress"><ul className="divide-y divide-border">{record.progress.map((p) => <li key={p.id} className="py-4"><p className="font-medium">{skillById(p.skill_id)?.title ?? p.skill_id} · {t(`shared.status.${p.status}`, { defaultValue: p.status })}</p>{p.note && <p className="whitespace-pre-wrap break-words mt-1">{p.note}</p>}<time className="text-sm text-muted-foreground">{p.updated_at.slice(0, 10)}</time></li>)}</ul>{!record.progress.length && <p>{t('family.rec.noProgress')}</p>}</TabsContent>
        <TabsContent value="reports"><ul className="divide-y divide-border">{record.reports.map((r) => <li key={r.id} className="py-4"><h4 className="font-semibold">{r.summary.title ?? t('family.rec.report')}</h4><p className="text-sm text-muted-foreground">{r.period_start} – {r.period_end}</p><p className="whitespace-pre-wrap break-words mt-2">{r.summary.body}</p></li>)}</ul>{!record.reports.length && <p>{t('family.rec.noReports')}</p>}</TabsContent>
        <TabsContent value="health"><p className="whitespace-pre-wrap break-words">{record.student.health_notes || t('family.rec.noHealth')}</p></TabsContent>
      </Tabs>
    </div>}
  </section>;
}