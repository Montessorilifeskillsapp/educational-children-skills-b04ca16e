import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
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
import TodayLessons from '@/components/school/TodayLessons';
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
  // The portal's display typeface loads only here so the public app is unaffected.
  useEffect(() => {
    if (document.getElementById('school-portal-font')) return;
    const l = document.createElement('link');
    l.id = 'school-portal-font'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap';
    document.head.appendChild(l);
  }, []);
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
  const twoWeeksAgo = new Date(Date.now() - 14 * 864e5).toISOString();
  const overlooked = students.filter((s) => !progress.some((p) => p.student_id === s.id && p.updated_at >= twoWeeksAgo));

  const classroomNav = [
    { v: 'overview', label: "Today's lessons" },
    { v: 'progress', label: 'Record progress' },
    { v: 'roster', label: 'Children' },
    { v: 'planning', label: 'Lesson planning' },
    { v: 'reports', label: 'Parent reports' },
  ];
  const leadershipNav = [
    { v: 'staff', label: 'Classrooms & staff' },
    { v: 'review', label: 'School-wide review' },
    { v: 'activity', label: 'Staff activity' },
    { v: 'history', label: 'Change history' },
  ];
  const leadership = leadershipNav.some((n) => n.v === tab);
  const currentLabel = [...classroomNav, ...leadershipNav].find((n) => n.v === tab)?.label ?? "Today's lessons";
  const go = (v: string) => { if (v !== tab && allowSchoolNavigation()) { setOpenStudent(null); setTab(v); } };
  const todayCount = plans.filter((p) => p.plan_date === new Date().toLocaleDateString('en-CA')).length;
  const navLink = (n: { v: string; label: string }) => {
    const disabled = !leadershipNav.some((l) => l.v === n.v) && n.v !== 'overview' && !classroom;
    const active = tab === n.v;
    return (
      <button key={n.v} type="button" disabled={disabled} aria-current={active ? 'page' : undefined} onClick={() => go(n.v)}
        className={`shrink-0 whitespace-nowrap border-b-2 py-2 text-[0.95rem] transition-colors disabled:opacity-40 ${active ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
        {n.label}
      </button>
    );
  };

  return (
    <div className="school-theme min-h-screen">
      <div className="mx-auto max-w-6xl px-5 md:px-8 pb-16">
        <nav aria-label="School Portal" className="print:hidden flex items-center gap-4 py-5">
          <button type="button" onClick={() => go('overview')} className="flex min-w-0 items-center gap-3 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card font-display text-lg text-primary shadow-sm border border-border">{school.name.trim().charAt(0).toUpperCase()}</span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg leading-tight text-foreground">{school.name}</span>
              <span className="block text-xs text-muted-foreground">School Portal · {ROLE_LABEL[role]}{!can.recordProgress(role) ? ' · View only' : ''}</span>
            </span>
          </button>
          <div className="ml-auto flex items-center gap-2">
            {!atPortalHome && <Button variant="ghost" size="sm" className="rounded-full" onClick={goBack}>Back</Button>}
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full" onClick={() => { if (allowSchoolNavigation()) navigate('/'); }}>Exit portal</Button>
            <button type="button" className="school-cta rounded-full px-5 py-2.5 text-sm font-semibold" onClick={() => { if (allowSchoolNavigation()) navigate('/?from=school#curriculum'); }}>Browse app</button>
          </div>
        </nav>

        <div className="print:hidden flex items-center gap-6 overflow-x-auto border-b border-border [scrollbar-width:none]">
          {(leadership ? leadershipNav : classroomNav).map(navLink)}
          {can.manageSchool(role) && (
            <>
              <span aria-hidden className="h-5 w-px shrink-0 bg-border" />
              <button type="button" onClick={() => go(leadership ? 'overview' : 'staff')} className="shrink-0 whitespace-nowrap py-2 text-[0.95rem] font-medium text-primary hover:underline">
                {leadership ? '← Back to classroom' : 'School leadership →'}
              </button>
            </>
          )}
        </div>

        <header className="print:hidden flex flex-wrap items-end justify-between gap-6 pt-10 pb-8">
          <div className="min-w-0">
            <p className="school-label">
              {leadership ? school.name : classroom ? `${classroom.name}${classroom.age_group ? ` · ${classroom.age_group}` : ''}` : school.name}
              {' · '}{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="font-display mt-3 text-4xl md:text-5xl leading-[1.05] text-foreground">{currentLabel}{tab === 'overview' ? '.' : ''}</h1>
            {tab === 'overview' && classroom && (
              <p className="mt-3 text-lg text-muted-foreground">
                {todayCount ? `${todayCount} presentation${todayCount === 1 ? '' : 's'} planned` : 'No presentations planned yet'} · {students.length} children
                {overlooked.length > 0 && <> · <button type="button" className="underline decoration-dotted underline-offset-4 hover:text-foreground" onClick={() => go('roster')}>{overlooked.length} not observed in two weeks</button></>}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!leadership && visibleRooms.length > 1 && visibleRooms.map((c) => (
              <button key={c.id} type="button" onClick={() => { if (c.id !== classroomId && allowSchoolNavigation()) setClassroomId(c.id); }}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${c.id === classroomId ? 'border-primary bg-card text-foreground font-medium' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                {c.name}
              </button>
            ))}
            {memberships.length > 1 && (
              <Select value={schoolId ?? ''} onValueChange={(v) => { setSchoolId(v); setClassroomId(null); }}>
                <SelectTrigger className="w-48 rounded-full bg-card" aria-label="School"><SelectValue /></SelectTrigger>
                <SelectContent>{memberships.map((m) => <SelectItem key={m.school_id} value={m.school_id}>{m.schools.name}</SelectItem>)}</SelectContent>
              </Select>
            )}
            {realRole === 'school_admin' && (
              <Select value={role} onValueChange={(v) => setPreviewRole(v === 'school_admin' ? null : v as SchoolRole)}>
                <SelectTrigger className="w-52 rounded-full bg-card" aria-label="View as"><span className="text-muted-foreground mr-1">View as:</span><SelectValue /></SelectTrigger>
                <SelectContent>{(['school_admin', 'teacher', 'assistant'] as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
              </Select>
            )}
          </div>
        </header>

        {previewing && <RoleBanner role={role} canRecord={can.recordProgress(role)} previewing={previewing} onExitPreview={() => setPreviewRole(null)} />}

        {dataError && <div role="alert" className="mb-6 flex items-center gap-3 text-destructive"><p>{dataError}</p><Button variant="outline" onClick={() => void reload()}>Retry</Button></div>}
        {loading ? <LoadingSpinner /> : dataError ? null : (
          <Tabs value={tab} onValueChange={(value) => { if (allowSchoolNavigation()) setTab(value); }} className="space-y-6">
            <TabsContent value="overview" className="mt-0">
              {visibleRooms.length === 0 ? (
                <div className="school-card p-8 max-w-2xl text-muted-foreground">
                  {can.manageSchool(role) ? 'Create your first classroom under School leadership → Classrooms & staff.' : 'You have not been assigned to a classroom yet. Ask your School Admin.'}
                </div>
              ) : classroom && (
                students.length === 0 ? (
                  <div className="school-card p-8 max-w-2xl">
                    <p className="font-display text-2xl">No children in {classroom.name} yet.</p>
                    <button type="button" onClick={() => go('roster')} className="mt-4 font-medium text-primary hover:underline">Add children →</button>
                  </div>
                ) : (
                  <TodayLessons students={students} progress={progress} plans={plans} canPlan={can.plan(role)} canRecord={can.recordProgress(role)}
                    onChange={reload} onPlan={() => go('planning')} onOpenStudent={setOpenStudent}
                    onRecord={(sid, sk) => setParams((p) => { const n = new URLSearchParams(p); n.set('tab', 'progress'); n.set('recordStudent', sid); n.set('area', sk.areaKey); n.set('recordActivity', sk.id); return n; }, { replace: true })} />
                )
              )}
            </TabsContent>

            {classroom && (
              <>
                <TabsContent value="roster" className="mt-0">
                  <RosterTab role={role} classroom={classroom} students={data.students.filter((s) => s.classroom_id === classroom.id)} seatLimit={seatLimit} schoolName={school.name} progress={data.progress} onChange={reload} onOpenStudent={setOpenStudent} />
                </TabsContent>
                <TabsContent value="progress" className="mt-0">
                  <ProgressTab students={students} progress={progress} canEdit={can.recordProgress(role)} nameOf={nameOf} onChange={reload} onOpenStudent={setOpenStudent} />
                </TabsContent>
                <TabsContent value="reports" className="mt-0">
                  <ReportsTab role={role} students={students} progress={progress} observations={data.observations} reports={data.reports}
                    schoolName={school.name} schoolEmail={school.contact_email} onChange={reload} onEditStudent={() => setTab('roster')} userId={user.id} nameOf={nameOf} />
                </TabsContent>
                <TabsContent value="planning" className="mt-0">
                  <PlanningTab key={planSeed ? planSeed.skill_id : 'plan'} role={role} classroom={classroom} students={students} plans={plans} onChange={reload} initial={planSeed} onInitialUsed={() => setPlanSeed(null)} />
                </TabsContent>
              </>
            )}
            {can.manageSchool(role) && (
              <TabsContent value="history" className="mt-0">
                {schoolId && <AuditHistory key={schoolId} schoolId={schoolId} />}
              </TabsContent>
            )}
            {can.manageSchool(role) && (
              <TabsContent value="activity" className="mt-0">
                <StaffActivity data={data} nameOf={nameOf} onOpenStudent={setOpenStudent} />
              </TabsContent>
            )}
            {can.manageSchool(role) && (
              <TabsContent value="review" className="mt-0">
                <SchoolReview data={data} nameOf={nameOf} onChange={reload} onOpenStudent={setOpenStudent} />
              </TabsContent>
            )}
            {can.manageSchool(role) && schoolId && (
              <TabsContent value="staff" className="mt-0 space-y-6">
                <StaffPolicies schoolId={schoolId} policies={me.schools.policies} onSaved={loadMe} />
                <StaffTab schoolId={schoolId} members={data.members} invites={data.invites} classrooms={data.classrooms} staff={data.staff} onChange={() => { reload(); loadMe(); }} seatLimit={school.seat_limit} schoolName={school.name} schoolEmail={school.contact_email} studentCounts={Object.fromEntries(data.classrooms.map((c) => [c.id, data.students.filter((s) => s.classroom_id === c.id && !s.archived).length]))} />
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>

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
