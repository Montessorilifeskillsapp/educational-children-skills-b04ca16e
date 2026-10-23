import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { can, Classroom, KERRY_EMAIL, Progress, schoolCall, SchoolRole, Student } from './api';
import { skillById } from './curriculum';
import { STATUS_LABEL } from './ProgressChooser';

function ageOf(dob: string | null) {
  if (!dob) return null;
  const b = new Date(dob), n = new Date();
  let m = (n.getFullYear() - b.getFullYear()) * 12 + n.getMonth() - b.getMonth();
  if (n.getDate() < b.getDate()) m--;
  if (m < 0) return null;
  return `${Math.floor(m / 12)} yrs ${m % 12} mo`;
}
const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');

interface Props { role: SchoolRole; classroom: Classroom; students: Student[]; seatLimit: number; schoolName: string; progress?: Progress[]; onChange: () => void; onOpenStudent: (id: string) => void; memberId?: string }

export default function RosterTab({ role, classroom, students, seatLimit, schoolName, progress = [], onChange, onOpenStudent, memberId }: Props) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<Partial<Student> | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [deleting, setDeleting] = useState<Student | null>(null);
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const active = students.filter((s) => !s.archived);
  const list = showArchived ? students.filter((s) => s.archived) : active;
  const full = active.length >= seatLimit;
  const edit = can.editRoster(role);
  const canDelete = can.deleteStudent(role);

  const save = async () => {
    if (!editing?.name?.trim() || busy) return;
    setBusy(true);
    try {
      await schoolCall({ action: 'student_save', classroom_id: classroom.id, id: editing.id, name: editing.name.trim(),
        date_of_birth: editing.date_of_birth || null, family_email: editing.family_email?.trim() || null,
        health_notes: editing.health_notes?.trim() || null });
      setEditing(null); onChange();
    } catch (e) {
      const msg = (e as Error).message;
      toast({ title: msg === 'CLASSROOM_FULL' ? 'This classroom is full' : 'Could not save', description: msg === 'CLASSROOM_FULL' ? 'Request more places to add another student.' : msg, variant: 'destructive' });
    } finally { setBusy(false); }
  };
  const archive = async (s: Student, archived: boolean) => {
    try {
      await schoolCall({ action: 'student_save', classroom_id: classroom.id, id: s.id, name: s.name, date_of_birth: s.date_of_birth, family_email: s.family_email, archived });
      onChange();
    } catch (e) { toast({ title: (e as Error).message === 'CLASSROOM_FULL' ? 'This classroom is full' : 'Could not update', variant: 'destructive' }); }
  };
  const remove = async () => {
    if (!deleting || confirmation !== 'DELETE' || busy) return;
    setBusy(true);
    try { await schoolCall({ action: 'student_delete', id: deleting.id, confirmation }); setDeleting(null); setConfirmation(''); onChange(); }
    catch (e) { toast({ title: 'Could not delete', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(false); }
  };
  const requestMailto = `mailto:${KERRY_EMAIL}?subject=${encodeURIComponent(`More places for ${schoolName} – ${classroom.name}`)}&body=${encodeURIComponent(`Hello Kerry,\n\nWe would like more places in ${classroom.name} (currently ${seatLimit}).\n\nThank you.`)}`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap space-y-0">
        <CardTitle className="text-lg">{classroom.name} · {active.length} of {seatLimit} places</CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setShowArchived(!showArchived)}>{showArchived ? 'Show current' : 'Show archived'}</Button>
          {edit && !full && <Button size="sm" onClick={() => setEditing({})}>Add student</Button>}
          {edit && full && <Button size="sm" asChild><a href={requestMailto}>Request more places</a></Button>}
        </div>
      </CardHeader>
      <CardContent>
        {list.length === 0 ? <p className="text-sm text-muted-foreground">{showArchived ? 'No archived students.' : 'No students yet.'}</p> : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => {
              const mine = progress.filter((p) => p.student_id === s.id);
              const latest = [...mine].sort((a, b) => b.updated_at.localeCompare(a.updated_at))[0];
              const latestSkill = latest ? skillById(latest.skill_id) : undefined;
              const age = ageOf(s.date_of_birth);
              return (
                <li key={s.id} className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md flex flex-col">
                  <button className="text-left p-4 flex gap-3 items-start flex-1 min-h-11" onClick={() => onOpenStudent(s.id)} aria-label={`Open ${s.name}`}>
                    <span aria-hidden className="h-12 w-12 shrink-0 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold text-lg">{initials(s.name)}</span>
                    <span className="min-w-0 space-y-1">
                      <span className="block font-semibold text-foreground text-base truncate">{s.name}</span>
                      <span className="block text-sm text-muted-foreground">{age ?? 'No birth date'}{s.health_notes ? <span className="ml-2 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">Health note</span> : null}</span>
                      <span className="block text-sm text-foreground">
                        {latestSkill ? <>Latest work: <span className="font-medium">{latestSkill.title}</span> · {STATUS_LABEL[latest.status]}</> : <span className="text-muted-foreground">No work recorded yet</span>}
                      </span>
                      <span className="block text-xs text-muted-foreground">{mine.length} {mine.length === 1 ? 'activity' : 'activities'} recorded · {s.family_email ? 'Parent email saved' : 'No parent email'}</span>
                    </span>
                  </button>
                  {(edit || canDelete) && (
                    <div className="flex gap-1 border-t border-border px-2 py-1.5">
                      {edit && <Button size="sm" variant="ghost" className="min-h-10" onClick={() => setEditing(s)}>Edit</Button>}
                      {edit && <Button size="sm" variant="ghost" className="min-h-10" onClick={() => archive(s, !s.archived)}>{s.archived ? 'Restore' : 'Archive'}</Button>}
                      {canDelete && <Button size="sm" variant="ghost" className="min-h-10 ml-auto text-destructive" onClick={() => { setDeleting(s); setConfirmation(''); }}>Delete</Button>}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>

      <AlertDialog open={!!deleting} onOpenChange={(open) => { if (!open && !busy) setDeleting(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete {deleting?.name} permanently?</AlertDialogTitle>
            <AlertDialogDescription>This removes the student's profile, health and support notes, observations, progress and reports from the app, and removes them from lesson plans. It cannot be undone. Previously emailed reports and backup copies are not removed by this action.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2"><Label htmlFor="delete-confirmation">Type DELETE to confirm</Label><Input id="delete-confirmation" autoComplete="off" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} /></div>
          <AlertDialogFooter><AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel><Button variant="destructive" disabled={busy || confirmation !== 'DELETE'} onClick={() => void remove()}>{busy ? 'Deleting…' : 'Delete permanently'}</Button></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={!!editing} onOpenChange={(o) => !o && !busy && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? 'Edit student' : 'Add student'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label htmlFor="sn">Name</Label><Input id="sn" value={editing?.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><Label htmlFor="sd">Birth date</Label><Input id="sd" type="date" value={editing?.date_of_birth ?? ''} onChange={(e) => setEditing({ ...editing, date_of_birth: e.target.value })} /></div>
            <div><Label htmlFor="se">Family email (for reports)</Label><Input id="se" type="email" value={editing?.family_email ?? ''} onChange={(e) => setEditing({ ...editing, family_email: e.target.value })} /></div>
            <div><Label htmlFor="sh">Health and allergies (staff only)</Label><Textarea id="sh" rows={2} placeholder="e.g. Nut allergy, carries an inhaler" value={editing?.health_notes ?? ''} onChange={(e) => setEditing({ ...editing, health_notes: e.target.value })} /></div>
          </div>
          <DialogFooter><Button disabled={busy || !editing?.name?.trim()} onClick={save}>{busy ? 'Saving…' : 'Save'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
