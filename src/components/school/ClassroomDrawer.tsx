import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ClipboardPen, Users, UsersRound } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from '@/components/AuthProvider';
import { can, setSchoolPolicies, Membership, ROLE_LABEL, schoolCall } from './api';
import { useSchoolData } from './useSchoolData';
import { skillById } from './curriculum';
import ProgressChooser, { StatusBadge, lastUpdate, STATUSES, STATUS_LABEL, type Status } from './ProgressChooser';
import { readFocus, updateFocusStatus } from './focusStudent';
import { NoteList } from './EditableRecords';

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="school-theme school-scale w-[calc(100vw-2rem)] max-w-2xl max-h-[88vh] overflow-y-auto rounded-lg">
          {open && <DrawerBody memberships={memberships} skillId={skill.id} skillTitle={skill.title} areaTitle={skill.areaTitle} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

function DrawerBody({ memberships, skillId, skillTitle, areaTitle }: { memberships: Membership[]; skillId: string; skillTitle: string; areaTitle: string }) {
  const { toast } = useToast();
  const { user } = useAuthContext();
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
  const [group, setGroup] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [groupStatus, setGroupStatus] = useState<Status>('presented');
  const [groupNote, setGroupNote] = useState('');
  const leaveGroup = () => {
    if ((picked.length || groupNote.trim()) && !window.confirm('Discard this unsaved group record?')) return;
    setGroup(false); setPicked([]); setGroupNote('');
  };
  const saveGroup = async () => {
    if (!picked.length) return;
    setBusy(true);
    const results = await Promise.allSettled(picked.map((sid) => schoolCall({ action: 'progress_set', student_id: sid, skill_id: skillId, status: groupStatus, note: groupNote.trim() || null })));
    const failed = picked.filter((_, i) => results[i].status === 'rejected');
    const ok = picked.length - failed.length;
    setBusy(false); reload();
    if (ok) toast({ title: `Recorded for ${ok} ${ok === 1 ? 'child' : 'children'}`, description: `${STATUS_LABEL[groupStatus]} · ${skillTitle}` });
    if (failed.length) {
      toast({ title: `Not saved for ${failed.length}`, description: failed.map((id) => students.find((s) => s.id === id)?.name).join(', '), variant: 'destructive' });
      setPicked(failed);
    } else { setPicked([]); setGroupNote(''); setGroup(false); }
  };

  const students = data.students.filter((s) => s.classroom_id === roomId && !s.archived);
  // Keep the focused child's card statuses current after saves made here.
  useEffect(() => {
    const f = readFocus();
    if (!f || loading || !data.students.some((s) => s.id === f.id)) return;
    const rec = data.progress.find((p) => p.student_id === f.id && p.skill_id === skillId);
    if ((f.statuses[skillId] ?? null) !== (rec?.status ?? null)) updateFocusStatus(f.id, skillId, rec?.status ?? 'clear');
  }, [data.progress, skillId, loading]);
  const recordFor = (sid: string) => data.progress.find((p) => p.student_id === sid && p.skill_id === skillId);
  const nameOf = (uid: string | null) => { const m = data.members.find((x) => x.user_id === uid); return m ? (m.full_name || m.email) : 'Former staff'; };
  const student = students.find((s) => s.id === studentId);
  const canRecord = can.recordProgress(role);
  const studentNotes = student ? data.observations.filter((o) => o.student_id === student.id).sort((a, b) => b.observed_at.localeCompare(a.observed_at)) : [];
  const pick = (id: string | null) => {
    if ((dirty || obs.trim()) && !window.confirm('Discard this unsaved observation?')) return;
    setDirty(false); setObs(''); setStudentId(id);
  };
  const addObservation = async () => {
    if (!student || !obs.trim()) return;
    setBusy(true);
    try {
      await schoolCall({ action: 'observation_add', student_id: student.id, body: `${skillTitle}: ${obs.trim()}` });
      setObs(''); toast({ title: 'Note saved' }); reload();
    } catch (e) { toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      <DialogHeader className="text-left">
        <DialogTitle className="font-display">{skillTitle}</DialogTitle>
        <DialogDescription>{areaTitle} · {me.schools.name} · {ROLE_LABEL[role]}{!canRecord ? ' · View only' : ''}</DialogDescription>
      </DialogHeader>
      {rooms.length > 1 && (
        <Select value={roomId ?? ''} onValueChange={(v) => { pick(null); setPicked([]); setRoomId(v); }}>
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
              <ProgressChooser inline studentId={student.id} skillId={skillId} current={recordFor(student.id)} nameOf={nameOf} onSaved={reload} onDraftChange={onDraft} />
            ) : (
              <p className="text-sm text-muted-foreground"><StatusBadge status={recordFor(student.id)?.status} /> · {lastUpdate(recordFor(student.id), nameOf)}</p>
            )}
            <div className="space-y-3 border-t border-border pt-4">
              <h4 className="font-display text-base font-semibold text-foreground">Notes</h4>
              {canRecord && (
                <div className="space-y-2">
                  <Label htmlFor="drawer-obs" className="sr-only">New note</Label>
                  <Textarea id="drawer-obs" rows={3} maxLength={1000} value={obs} onChange={(e) => setObs(e.target.value)} placeholder={`Anything noticed about ${student.name} during this activity…`} />
                  <div className="flex justify-end"><Button size="sm" disabled={busy || !obs.trim()} onClick={addObservation}>{busy ? 'Saving…' : 'Save note'}</Button></div>
                </div>
              )}
              {studentNotes.length
                ? <NoteList notes={studentNotes} role={role} userId={user?.id ?? ''} nameOf={nameOf} onChange={reload} />
                : <p className="text-sm text-muted-foreground">No notes for {student.name} yet.</p>}
            </div>
          </div>
        ) : group ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <Button variant="ghost" size="sm" onClick={leaveGroup}>← One child at a time</Button>
              <Button variant="outline" size="sm" onClick={() => setPicked(picked.length === students.length ? [] : students.map((s) => s.id))}>
                {picked.length === students.length ? 'Clear all' : 'Select all'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Tick each child who received this presentation together.</p>
            <ul className="divide-y divide-border border border-border rounded-md">
              {students.map((s) => {
                const on = picked.includes(s.id);
                return (
                  <li key={s.id}>
                    <label className="flex items-center justify-between gap-3 p-3 min-h-12 cursor-pointer hover:bg-accent/30">
                      <span className="flex items-center gap-3">
                        <Checkbox checked={on} onCheckedChange={(v) => setPicked((p) => v ? [...p, s.id] : p.filter((x) => x !== s.id))} aria-label={s.name} />
                        <span className="font-medium text-foreground">{s.name}</span>
                      </span>
                      <StatusBadge status={recordFor(s.id)?.status} />
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-2">
              <Label>Record as</Label>
              <div className="grid grid-cols-1 gap-2">
                {STATUSES.map((st) => (
                  <Button key={st} type="button" variant={groupStatus === st ? 'default' : 'outline'} aria-pressed={groupStatus === st} className="min-h-11 justify-start" onClick={() => setGroupStatus(st)}>{STATUS_LABEL[st]}</Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-note">Shared note (optional)</Label>
              <Textarea id="group-note" rows={2} maxLength={1000} value={groupNote} onChange={(e) => setGroupNote(e.target.value)} placeholder="e.g. Small-group presentation, three-period lesson" />
            </div>
            <Button className="w-full min-h-12" disabled={busy || !picked.length} onClick={saveGroup}>
              {busy ? 'Saving…' : picked.length ? `Save for ${picked.length} ${picked.length === 1 ? 'child' : 'children'}` : 'Select children first'}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
          {canRecord && students.length > 1 && (
            <Button variant="outline" className="w-full min-h-11" onClick={() => setGroup(true)}><UsersRound className="h-4 w-4 mr-2" />Record a group presentation</Button>
          )}
          <ul className="divide-y divide-border border border-border rounded-md">
            {students.map((s) => {
              const r = recordFor(s.id);
              return (
                <li key={s.id}>
                  <button type="button" onClick={() => pick(s.id)} className="w-full flex items-center justify-between gap-3 p-3 min-h-12 text-left hover:bg-accent/30">
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="flex items-center gap-2"><StatusBadge status={r?.status} />{canRecord && <ClipboardPen className="h-4 w-4 text-muted-foreground" />}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          </div>
        )}
    </div>
  );
}
