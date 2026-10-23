import { useEffect, useState } from 'react';
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
  if (error) throw new Error('School records could not be opened. Confirm your parent email with your school and try again.');
  return data as T;
}
const status: Record<string, string> = { presented: 'Presented', practising: 'Practicing', mastered: 'Mastered' };

export default function SchoolRecords({ userId }: { userId: string }) {
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
  return <section className="my-6 border-t border-border pt-5" aria-label="School records">
    <div className="flex items-center justify-between gap-3 mb-4">
      <h2 className="text-xl font-semibold">School records</h2>
      <Button variant="outline" size="sm" onClick={() => setRevision((n) => n + 1)}>Refresh</Button>
    </div>
    {error && <p role="alert" className="text-destructive">{error}</p>}
    {loading && <p role="status" className="text-muted-foreground">Opening records…</p>}
    {!loading && !error && !children.length && <p className="text-muted-foreground">No school records linked to your confirmed email. Ask your school to verify your parent access.</p>}
    {children.length > 0 && <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="max-w-md" aria-label="School child"><SelectValue /></SelectTrigger>
      <SelectContent>{children.map((c) => <SelectItem key={c.id} value={c.id}>{c.name} · {c.school_name}</SelectItem>)}</SelectContent>
    </Select>}
    {record && <div className="mt-5">
      <h3 className="text-lg font-semibold">{record.student.name} · {record.student.school_name}</h3>
      {record.student.date_of_birth && <p className="text-sm text-muted-foreground">Date of birth: {record.student.date_of_birth}</p>}
      <Tabs defaultValue="notes" className="mt-4">
        <TabsList className="h-auto flex flex-wrap justify-start"><TabsTrigger value="notes">Notes</TabsTrigger><TabsTrigger value="progress">Progress</TabsTrigger><TabsTrigger value="reports">Reports</TabsTrigger><TabsTrigger value="health">Health and allergies</TabsTrigger></TabsList>
        <TabsContent value="notes"><ul className="divide-y divide-border">{record.observations.map((o) => <li key={o.id} className="py-4"><time className="text-sm text-muted-foreground">{o.observed_at.slice(0, 10)}</time><p className="whitespace-pre-wrap break-words mt-1">{o.body}</p>{o.edited_at && <p className="text-xs text-muted-foreground mt-1">Updated {o.edited_at.slice(0, 10)}</p>}</li>)}</ul>{!record.observations.length && <p>No notes recorded yet.</p>}</TabsContent>
        <TabsContent value="progress"><ul className="divide-y divide-border">{record.progress.map((p) => <li key={p.id} className="py-4"><p className="font-medium">{skillById(p.skill_id)?.title ?? p.skill_id} · {status[p.status] ?? p.status}</p>{p.note && <p className="whitespace-pre-wrap break-words mt-1">{p.note}</p>}<time className="text-sm text-muted-foreground">{p.updated_at.slice(0, 10)}</time></li>)}</ul>{!record.progress.length && <p>No progress recorded yet.</p>}</TabsContent>
        <TabsContent value="reports"><ul className="divide-y divide-border">{record.reports.map((r) => <li key={r.id} className="py-4"><h4 className="font-semibold">{r.summary.title ?? 'Report'}</h4><p className="text-sm text-muted-foreground">{r.period_start} – {r.period_end}</p><p className="whitespace-pre-wrap break-words mt-2">{r.summary.body}</p></li>)}</ul>{!record.reports.length && <p>No reports recorded yet.</p>}</TabsContent>
        <TabsContent value="health"><p className="whitespace-pre-wrap break-words">{record.student.health_notes || 'No health or allergy notes recorded.'}</p></TabsContent>
      </Tabs>
    </div>}
  </section>;
}