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
import AuditHistory from '@/components/school/AuditHistory';
import StudentPanel from '@/components/school/StudentPanel';
import ReportsTab from '@/components/school/ReportsTab';
import SchoolReview from '@/components/school/SchoolReview';
import StaffPolicies from '@/components/school/StaffPolicies';
import RoleBanner from '@/components/school/RoleBanner';
import ClassroomPulse from '@/components/school/ClassroomPulse';
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

  const { data, loading, error: dataError, reload } = useSchoolData(schoolId);
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
    if ((['staff', 'activity', 'review', 'history'].includes(tab) && !can.manageSchool(role)) || (!['overview', 'staff', 'activity', 'review', 'history'].includes(tab) && !classroomId)) setTab('overview');
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
  if (!me) return <LoadingSpinner />;
  const school = me.schools;
  const seatLimit = classroom?.seat_limit ?? school.seat_limit;
  const students = data.students.filter((s) => s.classroom_id === classroomId && !s.archived);
  const studentIds = new Set(students.map((s) => s.id));
  const progress = data.progress.filter((p) => studentIds.has(p.student_id));
  const plans = data.plans.filter((p) => p.classroom_id === classroomId);
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const leadership = ['staff', 'activity', 'review', 'history'].includes(tab);
  const go = (t: string) => { if (t !== tab && allowSchoolNavigation()) setTab(t); };
  const myName = data.members.find((m) => m.user_id === user.id)?.full_name?.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const classroomNav = [
    { v: 'overview', label: 'Today', icon: Home },
    { v: 'progress', label: 'Record progress', icon: PenLine },
    { v: 'roster', label: 'Children', icon: Users },
    { v: 'planning', label: 'Lesson planning', icon: CalendarDays },
    { v: 'reports', label: 'Parent reports', icon: Mail },
  ];
  const leaderNav = [
    { v: 'staff', label: 'Classrooms & staff', icon: Building2 },
    { v: 'review', label: 'School-wide review', icon: ClipboardCheck },
    { v: 'activity', label: 'Staff activity', icon: Activity },
    { v: 'history', label: 'Change history', icon: History },
  ];
  const NavItem = ({ v, label, icon: Icon, disabled }: { v: string; label: string; icon: typeof Home; disabled?: boolean }) => (
    <button disabled={disabled} onClick={() => go(v)} aria-current={tab === v ? 'page' : undefined}
      className={`flex w-full shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors disabled:opacity-40 ${tab === v ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground hover:bg-muted'}`}>
      <Icon className="h-4 w-4 shrink-0" /><span className="whitespace-nowrap">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
     <div className="mx-auto max-w-7xl p-4 md:p-6 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
      <aside className="print:hidden mb-4 lg:mb-0 lg:sticky lg:top-6 lg:self-start space-y-5">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">School Portal</p>
          <p className="mt-1 font-serif text-lg leading-tight text-foreground">{school.name}</p>
          <span className="mt-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{ROLE_LABEL[role]}{!can.recordProgress(role) ? ' · View only' : ''}</span>
        </div>
        {visibleRooms.length > 0 && !leadership && (
          <div>
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Classroom</p>
            <div className="flex gap-2 overflow-x-auto lg:flex-col [scrollbar-width:none]">
              {visibleRooms.map((c) => (
                <button key={c.id} onClick={() => { if (allowSchoolNavigation()) setClassroomId(c.id); }}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${c.id === classroomId ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50'}`}>
                  <span className="block font-medium">{c.name}</span>
                  <span className="block text-xs text-muted-foreground">{data.students.filter((s) => s.classroom_id === c.id && !s.archived).length} children{c.age_group ? ` · ${c.age_group}` : ''}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <nav aria-label="Portal sections" className="space-y-4">
          <div className="flex gap-1 overflow-x-auto lg:flex-col [scrollbar-width:none]">
            {classroomNav.map((n) => <NavItem key={n.v} {...n} disabled={n.v !== 'overview' && !classroom} />)}
          </div>
          {can.manageSchool(role) && (
            <div>
              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">School leadership</p>
              <div className="flex gap-1 overflow-x-auto lg:flex-col [scrollbar-width:none]">{leaderNav.map((n) => <NavItem key={n.v} {...n} />)}</div>
            </div>
          )}
        </nav>
        <div className="flex gap-2 lg:flex-col">
          <Button variant="outline" size="sm" className="justify-start" onClick={() => { if (allowSchoolNavigation()) navigate('/?from=school#curriculum'); }}><BookOpen className="mr-2 h-4 w-4" />Browse curriculum</Button>
          <Button variant="ghost" size="sm" className="justify-start" onClick={() => { if (allowSchoolNavigation()) navigate('/'); }}><LogOut className="mr-2 h-4 w-4" />Exit portal</Button>
        </div>
      </aside>

      <main className="min-w-0 space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap print:hidden">
        <div>
          {!atPortalHome && <BackButton onClick={goBack} />}
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <h1 className="mt-1 font-serif text-3xl md:text-4xl text-foreground">
            {tab === 'overview' ? `${greeting}${myName ? `, ${myName}` : ''}` : [...classroomNav, ...leaderNav].find((n) => n.v === tab)?.label}
          </h1>
          <p className="mt-1 text-muted-foreground">{leadership ? `All of ${school.name}` : classroom ? `${classroom.name}${classroom.age_group ? ` · ${classroom.age_group}` : ''}` : (role === 'school_admin' ? 'School Administration' : role === 'teacher' ? 'Teacher Workspace' : 'Assistant Workspace')}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {realRole === 'school_admin' && (
            <Select value={role} onValueChange={(v) => setPreviewRole(v === 'school_admin' ? null : v as SchoolRole)}>
              <SelectTrigger className="w-48 bg-card" aria-label="View as"><span className="text-muted-foreground mr-1">View as:</span><SelectValue /></SelectTrigger>
              <SelectContent>{(['school_admin', 'teacher', 'assistant'] as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
            </Select>
          )}
          {memberships.length > 1 && (
            <Select value={schoolId ?? ''} onValueChange={(v) => { setSchoolId(v); setClassroomId(null); }}>
              <SelectTrigger className="w-48 bg-card"><SelectValue /></SelectTrigger>
              <SelectContent>{memberships.map((m) => <SelectItem key={m.school_id} value={m.school_id}>{m.schools.name}</SelectItem>)}</SelectContent>
            </Select>
          )}
        </div>
      </header>

      {previewing && <RoleBanner role={role} canRecord={can.recordProgress(role)} previewing={previewing} onExitPreview={() => setPreviewRole(null)} />}

      {dataError && <div role="alert" className="flex items-center gap-3 text-destructive"><p>{dataError}</p><Button variant="outline" onClick={() => void reload()}>Retry</Button></div>}
      {loading ? <LoadingSpinner /> : dataError ? null : (
        <Tabs value={tab} onValueChange={(value) => { if (allowSchoolNavigation()) setTab(value); }}>
          <TabsContent value="overview" className="mt-0 space-y-4">
            {visibleRooms.length === 0 ? (
              <Card><CardContent className="pt-6 text-sm text-muted-foreground">
                {can.manageSchool(role) ? 'Create your first classroom under Classrooms & staff.' : 'You have not been assigned to a classroom yet. Ask your School Admin.'}
              </CardContent></Card>
            ) : classroom && (
              <ClassroomPulse students={students} progress={progress} plans={plans} classroomName={classroom.name} onOpenStudent={setOpenStudent} onGo={go}
                onRecord={(sid, sk) => setParams((p) => { const n = new URLSearchParams(p); n.set('tab', 'progress'); n.set('recordStudent', sid); n.set('area', sk.areaKey); n.set('recordActivity', sk.id); return n; }, { replace: true })} />
            )}
          </TabsContent>

          {classroom && (
            <>
              <TabsContent value="roster">
                <RosterTab role={role} classroom={classroom} students={data.students.filter((s) => s.classroom_id === classroom.id)} seatLimit={seatLimit} schoolName={school.name} progress={data.progress} onChange={reload} onOpenStudent={setOpenStudent} />
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
            <TabsContent value="history">
              {schoolId && <AuditHistory key={schoolId} schoolId={schoolId} />}
            </TabsContent>
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
              <StaffPolicies schoolId={schoolId} policies={me.schools.policies} onSaved={loadMe} />
              <StaffTab schoolId={schoolId} members={data.members} invites={data.invites} classrooms={data.classrooms} staff={data.staff} onChange={() => { reload(); loadMe(); }} seatLimit={school.seat_limit} schoolName={school.name} schoolEmail={school.contact_email} studentCounts={Object.fromEntries(data.classrooms.map((c) => [c.id, data.students.filter((s) => s.classroom_id === c.id && !s.archived).length]))} />
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
