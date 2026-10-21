import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/LoadingSpinner';
import BackButton from '@/components/ui/back-button';
import { useAuthContext } from '@/components/AuthProvider';
import { can, setSchoolPolicies, setRolePreview, SchoolRole, KERRY_EMAIL, Membership, ROLE_LABEL, schoolCall } from '@/components/school/api';
import { useSchoolData } from '@/components/school/useSchoolData';
import RosterTab from '@/components/school/RosterTab';
import ProgressTab from '@/components/school/ProgressTab';
import PlanningTab from '@/components/school/PlanningTab';
import StaffTab from '@/components/school/StaffTab';
import StaffActivity from '@/components/school/StaffActivity';
import StudentPanel from '@/components/school/StudentPanel';
import ReportsTab from '@/components/school/ReportsTab';
import SchoolReview from '@/components/school/SchoolReview';
import StaffPolicies from '@/components/school/StaffPolicies';
import RoleBanner from '@/components/school/RoleBanner';
import { skillById } from '@/components/school/curriculum';
import { rememberSchoolReturn } from '@/components/school/SchoolReturnBar';
import { allowSchoolNavigation } from '@/components/school/navigation';

export default function SchoolPortalPage() {
  const { user, loading: authLoading } = useAuthContext();
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState<Membership[] | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  // Tab, classroom and open student live in the address so returning from an activity page lands on the same spot.
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'overview';
  const setTab = (t: string) => setParams((p) => { const n = new URLSearchParams(p); if (t === 'overview') n.delete('tab'); else n.set('tab', t); return n; }, { replace: true });
  const classroomId = params.get('room');
  const setClassroomId = (id: string | null) => setParams((p) => { const n = new URLSearchParams(p); if (id) n.set('room', id); else n.delete('room'); return n; }, { replace: true });
  const openStudent = params.get('student');
  const setOpenStudent = (id: string | null) => setParams((p) => { const n = new URLSearchParams(p); if (id) n.set('student', id); else n.delete('student'); return n; }, { replace: true });
  const [planSeed, setPlanSeed] = useState<{ skill_id: string; student_ids: string[] } | null>(null);

  // Back steps within the portal (student -> tab -> Overview); leaving the portal is an explicit "Exit portal".
  const goBack = () => { if (!allowSchoolNavigation()) return; if (openStudent) return setOpenStudent(null); if (tab !== 'overview') return setTab('overview'); navigate('/'); };
  const atPortalHome = !openStudent && tab === 'overview';
  useEffect(() => { document.title = 'School Portal · Montessori Life Skills'; }, []);
  // Remember the exact portal spot so activity pages can offer "Return to School Portal".
  useEffect(() => {
    rememberSchoolReturn(window.location.pathname + window.location.search);
  }, [params, schoolId]);
  const loadMe = useCallback(() => {
    if (!user) return;
    schoolCall<{ memberships: Membership[] }>({ action: 'me' })
      .then((r) => { setMemberships(r.memberships); setSchoolId((s) => s ?? r.memberships[0]?.school_id ?? null); })
      .catch(() => setMemberships([]));
  }, [user]);
  useEffect(() => { loadMe(); }, [loadMe]);

  const { data, loading, reload } = useSchoolData(schoolId);
  const nameOf = (uid: string | null) => { const m = data.members.find((x) => x.user_id === uid); return m ? (m.full_name || m.email) : 'Former staff'; };
  const me = memberships?.find((m) => m.school_id === schoolId);
  const realRole = me?.role ?? 'assistant';
  // School Admins may preview the Teacher or Assistant view; saving is blocked while previewing.
  // Stored in the address (?as=) so leaving for an activity and returning keeps the preview.
  const asParam = params.get('as');
  const previewRole: SchoolRole | null = asParam === 'teacher' || asParam === 'assistant' ? asParam : null;
  const setPreviewRole = (r: SchoolRole | null) => setParams((p) => { const n = new URLSearchParams(p); if (r) n.set('as', r); else n.delete('as'); return n; }, { replace: true });
  const role: SchoolRole = realRole === 'school_admin' && previewRole ? previewRole : realRole;
  const previewing = role !== realRole;
  setRolePreview(previewing);
  useEffect(() => () => setRolePreview(false), []);
  setSchoolPolicies(me?.schools.policies);
  const visibleRooms = useMemo(() => {
    if (!me) return [];
    if (can.seeAllRooms(me.role)) return data.classrooms; // previews keep the admin's rooms so there is something to see
    return data.classrooms.filter((c) => data.staff.some((s) => s.classroom_id === c.id && s.member_id === me.id));
  }, [data, me]);
  useEffect(() => {
    if (!visibleRooms.find((c) => c.id === classroomId)) setClassroomId(visibleRooms[0]?.id ?? null);
  }, [visibleRooms, classroomId]);
  // If the current tab is no longer available (role changed, classroom gone), fall back to Overview instead of a blank page.
  useEffect(() => {
    if (!memberships) return;
    if ((['staff', 'activity', 'review'].includes(tab) && !can.manageSchool(role)) || (!['overview', 'staff', 'activity', 'review'].includes(tab) && !classroomId)) setTab('overview');
  }, [tab, role, classroomId, memberships]);

  if (authLoading || (user && memberships === null)) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;

  if (!user || !memberships?.length) {
    return (
      <div className="min-h-screen p-6 max-w-xl mx-auto flex flex-col justify-center gap-4">
        <BackButton onClick={goBack} />
        <h1 className="text-3xl font-bold text-foreground">School Portal</h1>
        <p className="text-muted-foreground">The School Portal is for schools licensed by Montessori Life Skills. Staff are invited by their school.</p>
        {!user ? <Button asChild><Link to="/auth">Sign in</Link></Button> : <p className="text-sm text-muted-foreground">This account isn't linked to a school yet. If you were invited, sign in with the email address the invitation was sent to.</p>}
        <Button variant="outline" asChild><a href={`mailto:${KERRY_EMAIL}?subject=${encodeURIComponent('School licensing enquiry')}`}>Contact Kerry about school licensing</a></Button>
      </div>
    );
  }

  const classroom = visibleRooms.find((c) => c.id === classroomId) ?? null;
  const school = me!.schools;
  const seatLimit = classroom?.seat_limit ?? school.seat_limit;
  const students = data.students.filter((s) => s.classroom_id === classroomId && !s.archived);
  const studentIds = new Set(students.map((s) => s.id));
  const progress = data.progress.filter((p) => studentIds.has(p.student_id));
  const plans = data.plans.filter((p) => p.classroom_id === classroomId);
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const twoWeeksAgo = new Date(Date.now() - 14 * 864e5).toISOString();
  const overlooked = students.filter((s) => !progress.some((p) => p.student_id === s.id && p.updated_at >= twoWeeksAgo));

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-6xl mx-auto space-y-4">
      <div className="print:hidden flex items-center justify-between gap-3">
        {atPortalHome
          ? <Button variant="ghost" size="sm" onClick={() => { if (allowSchoolNavigation()) navigate('/'); }}>Exit portal</Button>
          : <BackButton onClick={goBack} />}
        <Button variant="outline" size="sm" onClick={() => { if (allowSchoolNavigation()) navigate('/?from=school#curriculum'); }}>Browse app</Button>
      </div>
      <header className="flex items-end justify-between gap-3 flex-wrap print:hidden">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{role === 'school_admin' ? 'School Administration' : role === 'teacher' ? 'Teacher Workspace' : 'Assistant Workspace'}</h1>
          <p className="text-muted-foreground">{school.name} · {ROLE_LABEL[role]}{!can.recordProgress(role) ? ' · View only' : ''}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {realRole === 'school_admin' && (
            <Select value={role} onValueChange={(v) => setPreviewRole(v === 'school_admin' ? null : v as SchoolRole)}>
              <SelectTrigger className="w-48" aria-label="View as"><span className="text-muted-foreground mr-1">View as:</span><SelectValue /></SelectTrigger>
              <SelectContent>{(['school_admin', 'teacher', 'assistant'] as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
            </Select>
          )}
          {memberships.length > 1 && (
            <Select value={schoolId ?? ''} onValueChange={(v) => { setSchoolId(v); setClassroomId(null); }}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>{memberships.map((m) => <SelectItem key={m.school_id} value={m.school_id}>{m.schools.name}</SelectItem>)}</SelectContent>
            </Select>
          )}
          {visibleRooms.length > 0 && (
            <Select value={classroomId ?? ''} onValueChange={(id) => { if (allowSchoolNavigation()) setClassroomId(id); }}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Classroom" /></SelectTrigger>
              <SelectContent>{visibleRooms.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          )}
        </div>
      </header>

      <RoleBanner role={role} canRecord={can.recordProgress(role)} previewing={previewing} onExitPreview={() => setPreviewRole(null)} />

      {loading ? <LoadingSpinner /> : (
        <Tabs value={tab} onValueChange={(value) => { if (allowSchoolNavigation()) setTab(value); }}>
          <TabsList className="w-full justify-start flex flex-wrap h-auto gap-1 p-1 print:hidden">
            <TabsTrigger value="overview" className="px-4 py-2">Overview</TabsTrigger>
            <TabsTrigger value="progress" disabled={!classroom} className="px-4 py-2">Record progress</TabsTrigger>
            <TabsTrigger value="reports" disabled={!classroom} className="px-4 py-2">Parent reports</TabsTrigger>
            <TabsTrigger value="roster" disabled={!classroom} className="px-4 py-2">Students</TabsTrigger>
            <TabsTrigger value="planning" disabled={!classroom} className="px-4 py-2">Lesson planning</TabsTrigger>
            {can.manageSchool(role) && <TabsTrigger value="staff" className="px-4 py-2">Classrooms & staff</TabsTrigger>}
            {can.manageSchool(role) && <TabsTrigger value="activity" className="px-4 py-2">Staff activity</TabsTrigger>}
            {can.manageSchool(role) && <TabsTrigger value="review" className="px-4 py-2">School-wide review</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {visibleRooms.length === 0 ? (
              <Card><CardContent className="pt-6 text-sm text-muted-foreground">
                {can.manageSchool(role) ? 'Create your first classroom under Classrooms & staff.' : 'You have not been assigned to a classroom yet. Ask your School Admin.'}
              </CardContent></Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {visibleRooms.map((c) => {
                  const kids = data.students.filter((s) => s.classroom_id === c.id && !s.archived);
                  const ids = new Set(kids.map((k) => k.id));
                  const week = data.progress.filter((p) => ids.has(p.student_id) && p.updated_at >= weekAgo).length;
                  return (
                    <Card key={c.id} className={`cursor-pointer transition-colors hover:border-primary ${c.id === classroomId ? 'border-primary' : ''}`} onClick={() => { setClassroomId(c.id); setTab('progress'); }}>
                      <CardHeader><CardTitle className="text-lg">{c.name}</CardTitle></CardHeader>
                      <CardContent className="text-sm text-muted-foreground">{kids.length} of {c.seat_limit ?? school.seat_limit} places · {week} records this week</CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
            {classroom && (
              <Card>
                <CardHeader><CardTitle className="text-lg">Not seen recently · {classroom.name}</CardTitle></CardHeader>
                <CardContent>
                  {overlooked.length === 0 ? <p className="text-sm text-muted-foreground">Every student has a record from the last two weeks.</p> : (
                    <ul className="flex flex-wrap gap-2">
                      {overlooked.map((s) => <li key={s.id}><Button size="sm" variant="outline" onClick={() => setOpenStudent(s.id)}>{s.name}</Button></li>)}
                    </ul>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">Students with no presentation or progress recorded in the last 14 days.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {classroom && (
            <>
              <TabsContent value="roster">
                <RosterTab role={role} classroom={classroom} students={data.students.filter((s) => s.classroom_id === classroom.id)} seatLimit={seatLimit} schoolName={school.name} onChange={reload} onOpenStudent={setOpenStudent} />
              </TabsContent>
              <TabsContent value="progress">
                <ProgressTab students={students} progress={progress} canEdit={can.recordProgress(role)} nameOf={nameOf} onChange={reload} onOpenStudent={setOpenStudent} />
              </TabsContent>
              <TabsContent value="reports">
                <ReportsTab role={role} students={students} progress={progress} observations={data.observations} reports={data.reports}
                  schoolName={school.name} schoolEmail={school.contact_email} onChange={reload} onEditStudent={() => setTab('roster')} userId={user.id} nameOf={nameOf} />
              </TabsContent>
              <TabsContent value="planning">
                <PlanningTab key={planSeed ? planSeed.skill_id : 'plan'} role={role} classroom={classroom} students={students} plans={plans} onChange={reload} initial={planSeed} onInitialUsed={() => setPlanSeed(null)} />
              </TabsContent>
            </>
          )}
          {can.manageSchool(role) && (
            <TabsContent value="activity">
              <StaffActivity data={data} nameOf={nameOf} onOpenStudent={setOpenStudent} />
            </TabsContent>
          )}
          {can.manageSchool(role) && (
            <TabsContent value="review">
              <SchoolReview data={data} nameOf={nameOf} onChange={reload} onOpenStudent={setOpenStudent} />
            </TabsContent>
          )}
          {can.manageSchool(role) && schoolId && (
            <TabsContent value="staff">
              <StaffPolicies schoolId={schoolId} policies={me!.schools.policies} onSaved={loadMe} />
              <StaffTab schoolId={schoolId} members={data.members} invites={data.invites} classrooms={data.classrooms} staff={data.staff} onChange={reload} />
            </TabsContent>
          )}
        </Tabs>
      )}

      {openStudent && (
        <StudentPanel role={role} userId={user.id} student={data.students.find((s) => s.id === openStudent) ?? null}
          progress={data.progress} observations={data.observations} reports={data.reports}
          onClose={() => setOpenStudent(null)} onChange={reload} nameOf={nameOf} onSelect={setOpenStudent}
          schoolName={school.name} schoolEmail={school.contact_email}
          classmates={(() => { const st = data.students.find((x) => x.id === openStudent); return data.students.filter((x) => x.classroom_id === st?.classroom_id && !x.archived); })()}
          onPlan={(skillId, sid) => { if (skillById(skillId)) { setPlanSeed({ skill_id: skillId, student_ids: [sid] }); setOpenStudent(null); setTab('planning'); } }} />
      )}
    </div>
  );
}
