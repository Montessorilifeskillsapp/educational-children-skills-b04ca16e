import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { locale } from '@/i18n/format';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { schoolCall } from './api';
import { SchoolData } from './useSchoolData';
import { skillById, skillLink } from './curriculum';
import { StatusBadge } from './ProgressChooser';

interface Props { data: SchoolData; nameOf: (userId: string | null) => string; onChange: () => void; onOpenStudent: (id: string) => void }
const day = (d?: string | null) => (d ? new Date(d).toLocaleDateString(locale()) : '');

/** School Admin oversight across every classroom: grades, observation notes and parent reports, with editing. */
export default function SchoolReview({ data, nameOf, onChange, onOpenStudent }: Props) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [room, setRoom] = useState('all');
  const [who, setWho] = useState('all');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<{ kind: 'note' | 'report'; id: string; title: string; body: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const student = (id: string) => data.students.find((s) => s.id === id);
  const roomName = (id?: string) => data.classrooms.find((c) => c.id === id)?.name ?? '';
  const keep = (studentId: string, author: string | null | undefined) => {
    const s = student(studentId);
    if (!s) return false;
    if (room !== 'all' && s.classroom_id !== room) return false;
    if (who !== 'all' && author !== who) return false;
    return !q || s.name.toLowerCase().includes(q.toLowerCase());
  };
  const progress = useMemo(() => data.progress.filter((p) => keep(p.student_id, p.updated_by)).sort((a, b) => b.updated_at.localeCompare(a.updated_at)), [data, room, who, q]);
  const notes = useMemo(() => data.observations.filter((o) => keep(o.student_id, o.author_id)).sort((a, b) => b.observed_at.localeCompare(a.observed_at)), [data, room, who, q]);
  const reports = useMemo(() => data.reports.filter((r) => keep(r.student_id, r.created_by)).sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? '')), [data, room, who, q]);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await schoolCall(editing.kind === 'note'
        ? { action: 'observation_update', id: editing.id, body: editing.body }
        : { action: 'report_update', id: editing.id, title: editing.title, body: editing.body });
      toast({ title: t('school.rv.saved') }); setEditing(null); onChange();
    } catch (e) { toast({ title: t('shared.couldNotSave'), description: (e as Error).message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };
  const delNote = async (id: string) => {
    if (!confirm(t('school.er.confirmDel'))) return;
    try { await schoolCall({ action: 'observation_delete', id }); onChange(); }
    catch (e) { toast({ title: t('school.ro.deleteFailed'), description: (e as Error).message, variant: 'destructive' }); }
  };

  const who_ = (s: string) => { const st = student(s); return st ? <button className="font-medium underline-offset-2 hover:underline" onClick={() => onOpenStudent(st.id)}>{st.name}</button> : null; };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('school.rv.title')}</CardTitle>
        <p className="text-sm text-muted-foreground">{t('school.rv.desc')}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Select value={room} onValueChange={setRoom}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">{t('school.rv.allRooms')}</SelectItem>{data.classrooms.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={who} onValueChange={setWho}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">{t('school.rv.allStaff')}</SelectItem>{data.members.map((m) => <SelectItem key={m.id} value={m.user_id}>{m.full_name || m.email}</SelectItem>)}</SelectContent>
          </Select>
          <Input className="w-48" placeholder={t('school.rv.search')} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reports">
          <TabsList>
            <TabsTrigger value="reports">{t('school.rv.reports', { count: reports.length })}</TabsTrigger>
            <TabsTrigger value="grades">{t('school.rv.grades', { count: progress.length })}</TabsTrigger>
            <TabsTrigger value="notes">{t('school.rv.notes', { count: notes.length })}</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-3">
            {!reports.length && <p className="text-sm text-muted-foreground">{t('school.rv.noReports')}</p>}
            {reports.map((r) => editing?.id === r.id ? (
              <div key={r.id} className="rounded-md border border-primary p-3 space-y-2">
                <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                <Textarea rows={10} value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
                <div className="flex gap-2"><Button size="sm" onClick={save} disabled={saving || !editing.body.trim() || !editing.title.trim()}>{t('school.rv.saveChanges')}</Button><Button size="sm" variant="ghost" onClick={() => setEditing(null)}>{t('shared.cancel')}</Button></div>
              </div>
            ) : (
              <div key={r.id} className="rounded-md border border-border p-3">
                <div className="flex justify-between gap-2 flex-wrap">
                  <p className="text-sm">{who_(r.student_id)} · {roomName(student(r.student_id)?.classroom_id)} · {day(r.period_start)}–{day(r.period_end)}</p>
                  <Button size="sm" variant="outline" onClick={() => setEditing({ kind: 'report', id: r.id, title: r.summary.title ?? '', body: r.summary.body ?? '' })}>{t('shared.edit')}</Button>
                </div>
                <p className="font-medium mt-1">{r.summary.title}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">{r.summary.body}</p>
                <p className="text-xs text-muted-foreground mt-1">{t('school.rv.by', { name: nameOf(r.created_by ?? null) })} · {day(r.created_at)}{r.sent_to ? t('school.er.to', { to: r.sent_to }) : ''}{r.updated_at ? t('school.er.edited', { name: nameOf(r.updated_by ?? null), date: day(r.updated_at) }) : ''}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="grades">
            {!progress.length && <p className="text-sm text-muted-foreground">{t('school.rv.noGrades')}</p>}
            <ul className="divide-y divide-border">
              {progress.slice(0, 300).map((p) => { const sk = skillById(p.skill_id); return (
                <li key={p.id} className="py-2 flex items-center justify-between gap-2 flex-wrap text-sm">
                  <span>{who_(p.student_id)} · {sk ? <Link className="underline-offset-2 hover:underline" to={skillLink(sk)}>{sk.title}</Link> : p.skill_id}
                    <span className="block text-xs text-muted-foreground">{roomName(student(p.student_id)?.classroom_id)} · {nameOf(p.updated_by)} · {day(p.updated_at)}</span></span>
                  <div className="flex items-center gap-2"><StatusBadge status={p.status} /><Button size="sm" variant="ghost" onClick={() => onOpenStudent(p.student_id)}>{t('school.rv.change')}</Button></div>
                </li>); })}
            </ul>
          </TabsContent>

          <TabsContent value="notes" className="space-y-2">
            {!notes.length && <p className="text-sm text-muted-foreground">{t('school.rv.noNotes')}</p>}
            {notes.slice(0, 300).map((o) => editing?.id === o.id ? (
              <div key={o.id} className="rounded-md border border-primary p-3 space-y-2">
                <Textarea rows={4} value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
                <div className="flex gap-2"><Button size="sm" onClick={save} disabled={saving || !editing.body.trim()}>{t('school.rv.saveChanges')}</Button><Button size="sm" variant="ghost" onClick={() => setEditing(null)}>{t('shared.cancel')}</Button></div>
              </div>
            ) : (
              <div key={o.id} className="rounded-md border border-border p-3 text-sm">
                <div className="flex justify-between gap-2 flex-wrap">
                  <span>{who_(o.student_id)} · {roomName(student(o.student_id)?.classroom_id)}</span>
                  <span className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setEditing({ kind: 'note', id: o.id, title: '', body: o.body })}>{t('shared.edit')}</Button><Button size="sm" variant="ghost" className="text-destructive" onClick={() => delNote(o.id)}>{t('shared.delete')}</Button></span>
                </div>
                <p className="whitespace-pre-wrap mt-1">{o.body}</p>
                <p className="text-xs text-muted-foreground mt-1">{t('school.rv.by', { name: nameOf(o.author_id) })} · {day(o.observed_at)}{o.edited_at ? t('school.er.edited', { name: nameOf(o.edited_by ?? null), date: day(o.edited_at) }) : ''}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
