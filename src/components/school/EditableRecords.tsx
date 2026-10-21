import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { can, Observation, Report, schoolCall, SchoolRole } from './api';

/** Who may change a note or report: the author under their own capability, anyone else only with "edit others". Mirrors the server. */
export const canChangeNote = (role: SchoolRole, userId: string, o: Observation) =>
  o.author_id === userId ? can.recordProgress(role) : can.editOthers(role);
export const canChangeReport = (role: SchoolRole, userId: string, r: Report) =>
  r.created_by === userId ? can.sendReport(role) : can.editOthers(role);

interface Common { role: SchoolRole; userId: string; nameOf: (id: string | null) => string; onChange: () => void }

const stamp = (by: string | null | undefined, at: string | null | undefined, nameOf: (id: string | null) => string) =>
  at ? ` · edited by ${nameOf(by ?? null)} ${new Date(at).toLocaleDateString()}` : '';

export function NoteList({ notes, role, userId, nameOf, onChange }: Common & { notes: Observation[] }) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<{ id: string; body: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const save = async () => {
    if (!editing?.body.trim()) return;
    setBusy(true);
    try { await schoolCall({ action: 'observation_update', id: editing.id, body: editing.body.trim() }); toast({ title: 'Note saved' }); setEditing(null); onChange(); }
    catch (e) { toast({ title: 'Could not save note', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(false); }
  };
  const del = async (id: string) => {
    if (!window.confirm('Delete this observation note?')) return;
    try { await schoolCall({ action: 'observation_delete', id }); onChange(); }
    catch (e) { toast({ title: 'Could not delete', description: (e as Error).message, variant: 'destructive' }); }
  };
  if (!notes.length) return <p className="text-sm text-muted-foreground mt-3">No observation notes yet.</p>;
  return (
    <ul className="mt-3 space-y-3">
      {notes.map((o) => (
        <li key={o.id} className="text-sm border-l-2 border-border pl-3">
          <p className="text-xs text-muted-foreground">{new Date(o.observed_at).toLocaleString()}{o.author_id ? ` · ${nameOf(o.author_id)}` : ''}{stamp(o.edited_by, o.edited_at, nameOf)}</p>
          {editing?.id === o.id ? (
            <div className="space-y-2 mt-1">
              <Textarea aria-label="Edit note" rows={4} value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
              <div className="flex gap-2">
                <Button size="sm" onClick={save} disabled={busy || !editing.body.trim()}>{busy ? 'Saving…' : 'Save'}</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditing(null)} disabled={busy}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <p className="whitespace-pre-wrap">{o.body}</p>
              {canChangeNote(role, userId, o) && (
                <div className="flex gap-3 mt-1">
                  <button className="text-xs underline" onClick={() => setEditing({ id: o.id, body: o.body })}>Edit</button>
                  <button className="text-xs underline text-destructive" onClick={() => del(o.id)}>Delete</button>
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ReportList({ reports, role, userId, nameOf, onChange }: Common & { reports: Report[] }) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<{ id: string; title: string; body: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const save = async () => {
    if (!editing?.title.trim() || !editing.body.trim()) return;
    setBusy(true);
    try { await schoolCall({ action: 'report_update', id: editing.id, title: editing.title.trim(), body: editing.body.trim() }); toast({ title: 'Report saved' }); setEditing(null); onChange(); }
    catch (e) { toast({ title: 'Could not save report', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(false); }
  };
  if (!reports.length) return <p className="text-sm text-muted-foreground">No past reports yet.</p>;
  return (
    <ul className="space-y-3">
      {reports.map((r) => (
        <li key={r.id} className="text-sm rounded-md border border-border p-3">
          <p className="text-xs text-muted-foreground">{r.period_start} to {r.period_end}{r.sent_to ? ` · to ${r.sent_to}` : ''}{r.created_by ? ` · by ${nameOf(r.created_by)}` : ''}{stamp(r.updated_by, r.updated_at, nameOf)}</p>
          {editing?.id === r.id ? (
            <div className="space-y-2 mt-2">
              <Input aria-label="Report title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <Textarea aria-label="Report" rows={10} value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
              <div className="flex gap-2">
                <Button size="sm" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditing(null)} disabled={busy}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <p className="font-medium mt-1">{r.summary.title ?? 'Progress report'}</p>
              {r.summary.body && <p className="whitespace-pre-wrap text-muted-foreground mt-1 line-clamp-4">{r.summary.body}</p>}
              {canChangeReport(role, userId, r) && (
                <button className="text-xs underline mt-1" onClick={() => setEditing({ id: r.id, title: r.summary.title ?? 'Progress report', body: r.summary.body ?? '' })}>Edit</button>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
