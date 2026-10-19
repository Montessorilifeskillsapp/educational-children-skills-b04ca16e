import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { can, Classroom, KERRY_EMAIL, schoolCall, SchoolRole, Student } from './api';

interface Props { role: SchoolRole; classroom: Classroom; students: Student[]; seatLimit: number; schoolName: string; onChange: () => void; onOpenStudent: (id: string) => void }

export default function RosterTab({ role, classroom, students, seatLimit, schoolName, onChange, onOpenStudent }: Props) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<Partial<Student> | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const active = students.filter((s) => !s.archived);
  const list = showArchived ? students.filter((s) => s.archived) : active;
  const full = active.length >= seatLimit;
  const edit = can.editRoster(role);

  const save = async () => {
    if (!editing?.name?.trim()) return;
    try {
      await schoolCall({ action: 'student_save', classroom_id: classroom.id, id: editing.id, name: editing.name.trim(),
        date_of_birth: editing.date_of_birth || null, family_email: editing.family_email?.trim() || null });
      setEditing(null); onChange();
    } catch (e) {
      const msg = (e as Error).message;
      toast({ title: msg === 'CLASSROOM_FULL' ? 'This classroom is full' : 'Could not save', description: msg === 'CLASSROOM_FULL' ? 'Request more places to add another student.' : msg, variant: 'destructive' });
    }
  };
  const archive = async (s: Student, archived: boolean) => {
    try {
      await schoolCall({ action: 'student_save', classroom_id: classroom.id, id: s.id, name: s.name, date_of_birth: s.date_of_birth, family_email: s.family_email, archived });
      onChange();
    } catch (e) { toast({ title: (e as Error).message === 'CLASSROOM_FULL' ? 'This classroom is full' : 'Could not update', variant: 'destructive' }); }
  };
  const remove = async (s: Student) => {
    if (!confirm(`Permanently delete ${s.name} and all their records?`)) return;
    try { await schoolCall({ action: 'student_delete', id: s.id }); onChange(); }
    catch (e) { toast({ title: 'Could not delete', description: (e as Error).message, variant: 'destructive' }); }
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
          <ul className="divide-y divide-border">
            {list.map((s) => (
              <li key={s.id} className="py-3 flex items-center justify-between gap-3 flex-wrap">
                <button className="text-left" onClick={() => onOpenStudent(s.id)}>
                  <p className="font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.date_of_birth ? `Born ${s.date_of_birth}` : 'No birth date'} · {s.family_email || 'No family email'}</p>
                </button>
                {edit && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(s)}>Edit</Button>
                    <Button size="sm" variant="ghost" onClick={() => archive(s, !s.archived)}>{s.archived ? 'Restore' : 'Archive'}</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(s)}>Delete</Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? 'Edit student' : 'Add student'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label htmlFor="sn">Name</Label><Input id="sn" value={editing?.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><Label htmlFor="sd">Birth date</Label><Input id="sd" type="date" value={editing?.date_of_birth ?? ''} onChange={(e) => setEditing({ ...editing, date_of_birth: e.target.value })} /></div>
            <div><Label htmlFor="se">Family email (for reports)</Label><Input id="se" type="email" value={editing?.family_email ?? ''} onChange={(e) => setEditing({ ...editing, family_email: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={save}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
