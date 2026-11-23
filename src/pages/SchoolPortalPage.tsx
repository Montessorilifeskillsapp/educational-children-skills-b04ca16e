import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLessonLanguage } from '@/i18n/lessonText';
import { useTranslation } from 'react-i18next';
import { locale } from '@/i18n/format';
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
import { AutoBackup } from '@/components/school/BackupPanel';
import StudentPanel from '@/components/school/StudentPanel';
import ReportsTab from '@/components/school/ReportsTab';
import SchoolReview from '@/components/school/SchoolReview';
import StaffPolicies from '@/components/school/StaffPolicies';
import { useRecordPrivacy } from '@/components/school/recordPrivacy';
import { fetchMemberships, cachedMemberships } from '@/components/school/portalCache';
import RoleBanner from '@/components/school/RoleBanner';
import TodayLessons from '@/components/school/TodayLessons';
import { skillById } from '@/components/school/curriculum';
import CurriculumTab from '@/components/school/CurriculumTab';
import { rememberSchoolReturn } from '@/components/school/SchoolReturnBar';
import { allowSchoolNavigation } from '@/components/school/navigation';
import SyncStatus from '@/components/school/SyncStatus';
import LanguageSelector from '@/components/LanguageSelector';
import OfflineMediaPanel from '@/components/OfflineMediaPanel';
import { signOutAndReset } from '@/lib/signOut';

export default function SchoolPortalPage() {
  const { user, loading: authLoading } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useLessonLanguage();
  // Memberships already fetched by the corner School Portal button open the portal at once.
  const [memberships, setMemberships] = useState<Membership[] | null>(() => cachedMemberships(user?.id));
  const [schoolId, setSchoolId] = useState<string | null>(() => cachedMemberships(user?.id)?.[0]?.school_id ?? null);
  const [membershipError, setMembershipError] = useState(false);
  // Tab, classroom and open student live in the address so returning from an activity page lands on the same spot.
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'overview';
  const setTab = (next: string) => setParams((p) => { const n = new URLSearchParams(p); if (next === 'overview') n.delete('tab'); else n.set('tab', next); return n; }, { replace: true });
  const classroomId = params.get('room');
  const setClassroomId = (id: string | null) => setParams((p) => { const n = new URLSearchParams(p); if (id) n.set('room', id); else n.delete('room'); return n; }, { replace: true });
  const openStudent = params.get('student');
  const setOpenStudent = (id: string | null) => setParams((p) => { const n = new URLSearchParams(p); if (id) n.set('student', id); else n.delete('student'); return n; }, { replace: true });
  const [planSeed, setPlanSeed] = useState<{ skill_id: string; student_ids: string[] } | null>(null);

  // Back steps within the portal (student -> tab -> Overview); leaving the portal is an explicit "Exit portal".
  const goBack = () => { if (!allowSchoolNavigation()) return; if (openStudent) return setOpenStudent(null); if (tab !== 'overview') return setTab('overview'); navigate('/'); };
  const atPortalHome = !openStudent && tab === 'overview';
  useEffect(() => { document.title = t('school.p.docTitle'); }, [t]);
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
    setMembershipError(false);
    let cancelled = false;
    void fetchMemberships(user.id)
      .then((ms) => { if (cancelled) return; setMemberships(ms); setSchoolId((s) => ms.some((m) => m.school_id === s) ? s : ms[0]?.school_id ?? null); })
      .catch(() => { if (!cancelled) setMembershipError(true); });
    return () => { cancelled = true; };
  }, [user]);
  useEffect(() => { loadMe(); }, [loadMe]);

  const { data, loading, error: dataError, reload } = useSchoolData(schoolId);
  const nameOf = (uid: string | null) => { const m = data.members.find((x) => x.user_id === uid); return m ? (m.full_name || m.email) : t('school.p.formerStaff'); };
  const me = memberships?.find((m) => m.school_id === schoolId);
  const realRole = me?.role ?? 'assistant';
  useRecordPrivacy();
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

  if (user && memberships === null && membershipError) return <div role="alert" className="min-h-screen flex flex-col items-center justify-center gap-4"><p>{t('school.p.checkFailed')}</p><Button onClick={() => loadMe()}>{t('school.p.retry')}</Button></div>;
  if (authLoading || (user && memberships === null)) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;

  if (!user || !memberships?.length) {
    return (
      <div className="min-h-screen p-6 max-w-xl mx-auto flex flex-col justify-center gap-4">
        <BackButton onClick={goBack} />
        <h1 className="text-3xl font-bold text-foreground">{t('school.p.title')}</h1>
        <p className="text-muted-foreground">{t('school.p.intro')}</p>
        {!user ? <Button asChild><Link to="/auth">{t('school.p.signIn')}</Link></Button> : <p className="text-sm text-muted-foreground">{t('school.p.notLinked')}</p>}
        <Button variant="outline" asChild><a href={`mailto:${KERRY_EMAIL}?subject=${encodeURIComponent('School licensing enquiry')}`}>{t('school.p.contactKerry')}</a></Button>
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
  const recordActivity = (sid: string, sk: { id: string; areaKey: string }) => setParams((p) => {
    const n = new URLSearchParams(p); n.delete('student'); n.set('tab', 'progress'); n.set('recordStudent', sid); n.set('area', sk.areaKey); n.set('recordActivity', sk.id); return n;
  }, { replace: true });

  const classroomNav = [
    { v: 'overview', label: t('school.nav.overview') },
    { v: 'roster', label: t('school.nav.roster') },
    { v: 'progress', label: t('school.nav.progress') },
    { v: 'planning', label: t('school.nav.planning') },
    { v: 'reports', label: t('school.nav.reports') },
    { v: 'curriculum', label: t('school.nav.curriculum') },
  ];
  const leadershipNav = [
    { v: 'staff', label: t('school.nav.staff') },
    { v: 'review', label: t('school.nav.review') },
    { v: 'activity', label: t('school.nav.activity') },
    { v: 'history', label: t('school.nav.history') },
  ];
  const leadership = leadershipNav.some((n) => n.v === tab);
  const go = (v: string) => { if (v !== tab && allowSchoolNavigation()) { setOpenStudent(null); setTab(v); } };
  const todayCount = plans.filter((p) => p.plan_date === new Date().toLocaleDateString('en-CA')).length;
  const pill = (n: { v: string; label: string }, disabled = false) => {
    const active = tab === n.v;
    return (
      <Button key={n.v} variant="ghost" type="button" disabled={disabled} aria-current={active ? 'page' : undefined} onClick={() => go(n.v)}
        className={`h-11 shrink-0 whitespace-nowrap rounded-full px-3 py-2 transition-colors disabled:opacity-40 ${active ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-medium' : 'text-foreground hover:bg-card'}`}>
        {n.label}
      </Button>
    );
  };

  return (
    <div className="school-theme min-h-screen">
      <div className="mx-auto max-w-[96rem] px-4 md:px-8 pb-16">
        <nav aria-label={t('school.p.portalNav')} className="print:hidden sticky top-0 z-20 -mx-4 md:-mx-8 mb-6 border-b border-border bg-background/90 px-4 md:px-8 py-3 backdrop-blur">
          <div className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto [scrollbar-width:thin]">
            <div className="min-w-0 max-w-40 shrink-0 mr-1">
              <p className="font-display text-lg leading-tight text-foreground truncate" title={school.name}>{school.name}</p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">{ROLE_LABEL[role]}{!can.recordProgress(role) ? t('school.p.viewOnly') : ''}</p>
            </div>
            {!leadership && visibleRooms.length > 1 && (
              <Select value={classroomId ?? ''} onValueChange={(v) => { if (v !== classroomId && allowSchoolNavigation()) setClassroomId(v); }}>
                <SelectTrigger className="w-36 shrink-0 rounded-full bg-card" aria-label={t('school.p.classroom')}><SelectValue /></SelectTrigger>
                <SelectContent>{visibleRooms.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            )}
            <div className="flex flex-1 items-center justify-center gap-0.5">
              {leadership
                ? <Button variant="ghost" type="button" onClick={() => go('overview')} className="shrink-0 whitespace-nowrap rounded-full px-3 py-2 font-medium text-foreground hover:bg-card">{t('school.p.backToClass')}</Button>
                : classroomNav.map((n) => pill(n, n.v !== 'overview' && n.v !== 'curriculum' && !classroom))}
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-1">
              <SyncStatus />
              <LanguageSelector />
              {can.manageSchool(role) && !leadership && <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap text-foreground" onClick={() => go('staff')}>{t('school.p.settings')}</Button>}
              <Button variant="ghost" type="button" className="whitespace-nowrap rounded-full px-3 py-2 text-foreground hover:bg-card" onClick={() => { if (allowSchoolNavigation()) navigate('/'); }}>{t('school.p.leave')}</Button>
              <Button variant="ghost" type="button" className="whitespace-nowrap rounded-full px-3 py-2 text-foreground hover:bg-card" title={t('common.signedInAs', { email: user?.email ?? '' })} onClick={() => { if (allowSchoolNavigation()) void signOutAndReset(); }}>{t('common.signOut')}</Button>
            </div>
          </div>
        </nav>

        {leadership && (
          <div className="print:hidden mb-6 flex flex-wrap items-center gap-1">
            {leadershipNav.map((n) => pill(n))}
            <div className="ml-auto flex flex-wrap gap-2">
              {memberships.length > 1 && (
                <Select value={schoolId ?? ''} onValueChange={(v) => { setSchoolId(v); setClassroomId(null); }}>
                  <SelectTrigger className="w-48 rounded-full bg-card" aria-label={t('school.p.school')}><SelectValue /></SelectTrigger>
                  <SelectContent>{memberships.map((m) => <SelectItem key={m.school_id} value={m.school_id}>{m.schools.name}</SelectItem>)}</SelectContent>
                </Select>
              )}
              {realRole === 'school_admin' && (
                <Select value={role} onValueChange={(v) => { setPreviewRole(v === 'school_admin' ? null : v as SchoolRole); if (v !== 'school_admin') setTab('overview'); }}>
                  <SelectTrigger className="w-52 rounded-full bg-card" aria-label={t('school.p.previewAs')}><span className="text-muted-foreground mr-1">{t('school.p.previewLabel')}</span><SelectValue /></SelectTrigger>
                  <SelectContent>{(['school_admin', 'teacher', 'assistant'] as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
                </Select>
              )}
            </div>
          </div>
        )}

        {tab === 'overview' && classroom && (
          <header className="print:hidden pb-6">
            <h1 className="font-display text-3xl md:text-4xl leading-tight text-foreground">{classroom.name}</h1>
            <p className="mt-1 text-muted-foreground">
              {new Date().toLocaleDateString(locale(), { weekday: 'long', month: 'long', day: 'numeric' })} · {todayCount ? t('school.p.planned', { count: todayCount }) : t('school.p.nothingYet')}
            </p>
          </header>
        )}

        {previewing && <RoleBanner role={role} canRecord={can.recordProgress(role)} previewing={previewing} onExitPreview={() => setPreviewRole(null)} />}

        {dataError && <div role="alert" className="mb-6 flex items-center gap-3 text-destructive"><p>{dataError}</p><Button variant="outline" onClick={() => void reload()}>{t('school.p.retry')}</Button></div>}
        {realRole === 'school_admin' && !previewRole && schoolId && user && <AutoBackup schoolId={schoolId} userId={user.id} frequency={me?.schools.backup_frequency ?? 'quarterly'} />}
        {loading ? <LoadingSpinner /> : dataError ? null : (
          <Tabs value={tab} onValueChange={(value) => { if (allowSchoolNavigation()) setTab(value); }} className="space-y-6">
            <TabsContent value="overview" className="mt-0">
              {visibleRooms.length === 0 ? (
                <div className="school-card p-8 max-w-2xl text-muted-foreground">
                  {can.manageSchool(role) ? t('school.p.firstClassroom') : t('school.p.notAssigned')}
                </div>
              ) : classroom && (
                students.length === 0 ? (
                  <div className="school-card p-8 max-w-2xl">
                    <p className="font-display text-2xl">{t('school.p.noChildren', { name: classroom.name })}</p>
                    <button type="button" onClick={() => go('roster')} className="mt-4 font-medium text-primary hover:underline">{t('school.p.addChildren')}</button>
                  </div>
                ) : (
                  <TodayLessons students={students} progress={progress} plans={plans} canPlan={can.plan(role)} canRecord={can.recordProgress(role)}
                    onChange={reload} onPlan={() => go('planning')} onOpenStudent={setOpenStudent}
                    onRecord={recordActivity} />
                )
              )}
            </TabsContent>

            {classroom && (
              <>
                <TabsContent value="roster" className="mt-0">
                  <RosterTab role={role} classroom={classroom} students={data.students.filter((s) => s.classroom_id === classroom.id)} seatLimit={seatLimit} schoolName={school.name} progress={data.progress} onChange={reload} onOpenStudent={setOpenStudent} memberId={me?.id} />
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
            <TabsContent value="curriculum" className="mt-0 space-y-6"><CurriculumTab schoolName={school.name} /><OfflineMediaPanel /></TabsContent>
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
                <StaffTab permissions={<StaffPolicies schoolId={schoolId} policies={me.schools.policies} onSaved={loadMe} />} schoolId={schoolId} members={data.members} invites={data.invites} classrooms={data.classrooms} staff={data.staff} onChange={() => { reload(); loadMe(); }} seatLimit={school.seat_limit} schoolName={school.name} schoolEmail={school.contact_email} backupFrequency={me.schools.backup_frequency ?? 'quarterly'} onSettingsSaved={loadMe} studentCounts={Object.fromEntries(data.classrooms.map((c) => [c.id, data.students.filter((s) => s.classroom_id === c.id && !s.archived).length]))} />
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
          onRecord={recordActivity}
          classmates={(() => { const st = data.students.find((x) => x.id === openStudent); return data.students.filter((x) => x.classroom_id === st?.classroom_id && !x.archived); })()}
          onPlan={(skillId, sid) => { if (skillById(skillId)) { setPlanSeed({ skill_id: skillId, student_ids: [sid] }); setOpenStudent(null); setTab('planning'); } }} />
      )}
    </div>
  );
}
