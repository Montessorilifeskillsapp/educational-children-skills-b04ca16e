import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ClipboardPen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from '@/components/AuthProvider';
import { can, Membership, ROLE_LABEL, schoolCall } from './api';
import { useSchoolData } from './useSchoolData';
import { skillById } from './curriculum';
import ProgressChooser, { StatusBadge, lastUpdate } from './ProgressChooser';

const ROOM_KEY = 'school-drawer-room';

/**
 * Classroom tools layered onto the regular curriculum activity pages.
 * Renders nothing unless the signed-in account is school staff and an activity is open,
 * so families and public visitors see the app exactly as before.
 */
export default function ClassroomDrawer() {
  const { user } = useAuthContext();
  const location = useLocation();
  const [params] = useSearchParams();
  const skillId = params.get('activity') ?? '';
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) { setMemberships([]); return; }
    schoolCall<{ memberships: Membership[] }>({ action: 'me' })
      .then((r) => setMemberships(r.memberships ?? []))
      .catch(() => setMemberships([]));
  }, [user?.id]);

  const hidden = ['/school', '/admin', '/auth'].some((p) => location.pathname.startsWith(p));
  const skill = skillId ? skillById(skillId) : undefined;
  if (hidden || !memberships.length || !skill) return null;

  return (
    <>
      <Button onClick={() => setOpen(true)} className="fixed left-4 z-50 shadow-lg print:hidden rounded-full" style={{ bottom: 'calc(4.75rem + env(safe-area-inset-bottom))' }} aria-label="Open classroom record">
        <Users className="h-4 w-4 mr-2" />Classroom
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          {open && <DrawerBody memberships={memberships} skillId={skill.id} skillTitle={skill.title} areaTitle={skill.areaTitle} />}
        </SheetContent>
      </Sheet>
    </>
  );
}

function DrawerBody({ memberships, skillId, skillTitle, areaTitle }: { memberships: Membership[]; skillId: string; skillTitle: string; areaTitle: string }) {
  const { toast } = useToast();
  const me = memberships[0];
  const { data, loading, reload } = useSchoolData(me.school_id);
  const role = me.role;
  setSchoolPolicies(me.schools.policies);
  const rooms = useMemo(() => can.seeAllRooms(role) ? data.classrooms
    : data.classrooms.filter((c) => data.staff.some((s) => s.classroom_id === c.id && s.member_id === me.id)), [data, role, me.id]);
  const [roomId, setRoomId] = useState<string | null>(() => { try { return sessionStorage.getItem(ROOM_KEY); } catch { return null; } });
  useEffect(() => { if (rooms.length && !rooms.some((r) => r.id === roomId)) setRoomId(rooms[0].id); }, [rooms, roomId]);
  useEffect(() => { try { if (roomId) sessionStorage.setItem(ROOM_KEY, roomId); } catch { /* ignore */ } }, [roomId]);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [obs, setObs] = useState('');
  const [busy, setBusy] = useState(false);
  const onDraft = useCallback((d: boolean) => setDirty(d), []);

  const students = data.students.filter((s) => s.classroom_id === roomId && !s.archived);
  const recordFor = (sid: string) => data.progress.find((p) => p.student_id === sid && p.skill_id === skillId);
  const nameOf = (uid: string | null) => { const m = data.members.find((x) => x.user_id === uid); return m ? (m.full_name || m.email) : 'Former staff'; };
  const student = students.find((s) => s.id === studentId);
  const canRecord = can.recordProgress(role);
  const pick = (id: string | null) => {
    if ((dirty || obs.trim()) && !window.confirm('Discard this unsaved observation?')) return;
    setDirty(false); setObs(''); setStudentId(id);
  };
  const addObservation = async () => {
    if (!student || !obs.trim()) return;
    setBusy(true);
    try {
      await schoolCall({ action: 'observation_add', student_id: student.id, body: `${skillTitle}: ${obs.trim()}` });
      setObs(''); toast({ title: 'Observation added' }); reload();
    } catch (e) { toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      <SheetHeader className="text-left">
        <SheetTitle>{skillTitle}</SheetTitle>
        <SheetDescription>{areaTitle} · {me.schools.name} · {ROLE_LABEL[role]}{!canRecord ? ' · View only' : ''}</SheetDescription>
      </SheetHeader>
      {rooms.length > 1 && (
        <Select value={roomId ?? ''} onValueChange={(v) => { pick(null); setRoomId(v); }}>
          <SelectTrigger><SelectValue placeholder="Classroom" /></SelectTrigger>
          <SelectContent>{rooms.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}</SelectContent>
        </Select>
      )}
      {loading ? <p className="text-sm text-muted-foreground">Loading class…</p>
        : !students.length ? <p className="text-sm text-muted-foreground">No students in this classroom yet.</p>
        : student ? (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => pick(null)}>← All students</Button>
            <h3 className="text-lg font-semibold text-foreground">{student.name}</h3>
            {canRecord ? (
              <>
                <ProgressChooser inline studentId={student.id} skillId={skillId} current={recordFor(student.id)} nameOf={nameOf} onSaved={reload} onDraftChange={onDraft} />
                <div className="space-y-2 border-t border-border pt-4">
                  <Label htmlFor="drawer-obs">General observation</Label>
                  <Textarea id="drawer-obs" rows={3} maxLength={1000} value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Anything noticed during this activity…" />
                  <div className="flex justify-end"><Button size="sm" disabled={busy || !obs.trim()} onClick={addObservation}>{busy ? 'Saving…' : 'Add observation'}</Button></div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground"><StatusBadge status={recordFor(student.id)?.status} /> · {lastUpdate(recordFor(student.id), nameOf)}</p>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-border border border-border rounded-md">
            {students.map((s) => {
              const r = recordFor(s.id);
              return (
                <li key={s.id}>
                  <button type="button" onClick={() => pick(s.id)} className="w-full flex items-center justify-between gap-3 p-3 text-left hover:bg-accent/30">
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="flex items-center gap-2"><StatusBadge status={r?.status} />{canRecord && <ClipboardPen className="h-4 w-4 text-muted-foreground" />}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
}
