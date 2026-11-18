import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Check, Plus, X } from 'lucide-react';
import { useAuthContext } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Classroom, Invite, Member, ROLE_LABEL, schoolCall, SchoolRole } from './api';
import { useSettingsDraft } from './useSettingsDraft';
import BackupPanel from './BackupPanel';

interface Props { schoolId: string; members: Member[]; invites: Invite[]; classrooms: Classroom[]; staff: { classroom_id: string; member_id: string }[]; onChange: () => void; studentCounts?: Record<string, number>; seatLimit?: number | null; schoolName?: string; schoolEmail?: string | null; permissions?: ReactNode; backupFrequency?: 'quarterly' | 'semester'; onSettingsSaved?: () => void }

type Pending = { title: string; body: string; action: string; run: () => void } | null;
const AGE_GROUPS = ['Nido (2 months–15 months)', 'Infant Community (15 months–3 years)', "Children's House (3–6 years)", 'Lower Elementary (6–9 years)', 'Upper Elementary (9–12 years)'];
const initials = (s: string) => s.split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');
const SECTIONS = [{ id: 'sec-staff', key: 'secStaff' }, { id: 'sec-rooms', key: 'secRooms' }, { id: 'sec-perms', key: 'secPerms' }, { id: 'sec-profile', key: 'secProfile' }, { id: 'sec-compliance', key: 'secCompliance' }, { id: 'sec-backup', key: 'secBackup' }];
// Stored age-group values stay in English; only the shown label follows the chosen language.
const ageLabel = (value: string) => { const i = AGE_GROUPS.indexOf(value); return i < 0 ? value : i18n.t(`school.st.age${i}`); };

function Section({ id, title, desc, children, extra }: { id: string; title: string; desc: string; children: ReactNode; extra?: ReactNode }) {
  return (
    <section id={id} className="school-card scroll-mt-24 p-5 md:p-7 space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div><h2 className="font-display text-2xl md:text-3xl">{title}</h2><p className="mt-1 text-muted-foreground">{desc}</p></div>
        {extra}
      </div>
      {children}
    </section>
  );
}

export default function StaffTab({ schoolId, members, invites, classrooms, staff, onChange, studentCounts = {}, seatLimit, schoolName = '', schoolEmail = '', permissions, backupFrequency, onSettingsSaved }: Props) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const adminCount = members.filter((m) => m.role === 'school_admin').length;
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<SchoolRole>('teacher');
  const [inviteRooms, setInviteRooms] = useState<string[]>([]);
  const [room, setRoom] = useState('');
  const [inviteWarning, setInviteWarning] = useState<string | null>(null);
  const [pending, setPending] = useState<Pending>(null);
  const [override, setOverride] = useState<Record<string, boolean>>({});
  const { draft: profile, setDraft: setProfile, acknowledge, dirty: profileDirty } = useSettingsDraft(schoolId, { name: schoolName, contact_email: schoolEmail ?? '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const saveProfile = async () => {
    if (savingProfile) return;
    const submitted = { name: profile.name.trim(), contact_email: profile.contact_email.trim().toLowerCase() };
    setSavingProfile(true);
    try {
      if (await run({ action: 'school_profile_save', school_id: schoolId, ...submitted }, t('school.st.profileSaved'))) { setProfile(submitted); acknowledge(submitted); }
    } finally { setSavingProfile(false); }
  };
  const inviteLink = `${window.location.origin}/auth?redirect=${encodeURIComponent('/school')}`;
  const copyInvite = async (to: string, r: SchoolRole) => {
    const text = t('school.st.inviteText', { school: schoolName, role: ROLE_LABEL[r], link: inviteLink, email: to });
    try { await navigator.clipboard.writeText(text); toast({ title: t('school.st.copied'), description: t('school.st.copiedBody') }); }
    catch { toast({ title: t('school.st.copyFailed'), description: inviteLink }); }
  };
  const run = async (body: Record<string, unknown>, ok?: string) => {
    try {
      const result = await schoolCall<{ invitation?: { queued: boolean; error: string | null } }>(body);
      if (body.action === 'invite') {
        setInviteWarning(result.invitation?.error ?? null);
        toast({ title: result.invitation?.queued ? t('school.st.queued') : t('school.st.saved'), description: result.invitation?.error ?? t('school.st.unconfirmed'), variant: result.invitation?.error ? 'destructive' : 'default' });
      } else if (ok) toast({ title: ok });
      onChange(); return true;
    }
    catch (e) { toast({ title: t('school.today.updateFailed'), description: (e as Error).message, variant: 'destructive' }); return false; }
  };
  const key = (c: string, m: string) => `${c}:${m}`;
  const inRoom = (c: string, m: string) => override[key(c, m)] ?? staff.some((s) => s.classroom_id === c && s.member_id === m);
  // Optimistic: the chip flips at once; a failed save flips it back and explains why.
  const toggle = async (c: string, m: string) => {
    const next = !inRoom(c, m);
    setOverride((o) => ({ ...o, [key(c, m)]: next }));
    const ok = await run({ action: 'staff_assign', classroom_id: c, member_id: m, assigned: next });
    setOverride((o) => { const n = { ...o }; delete n[key(c, m)]; if (!ok) return n; return { ...n, [key(c, m)]: next }; });
  };
  const nonAdmins = members.filter((m) => m.role !== 'school_admin');
  const unassigned = nonAdmins.filter((m) => !classrooms.some((c) => inRoom(c.id, m.id)));
  const nameOf = (m: Member) => m.full_name || m.email;
  const roomChips = (m: Member) => (
    <div className="flex flex-wrap gap-2">
      {classrooms.map((c) => {
        const on = inRoom(c.id, m.id);
        return (
          <button key={c.id} type="button" aria-pressed={on} onClick={() => toggle(c.id, m.id)}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-base transition-colors ${on ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}>
            {on ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}{c.name}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => <Button key={s.id} variant="outline" className="rounded-full bg-card" onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}>{t(`school.st.${s.key}`)}</Button>)}
      </div>

      <Section id="sec-staff" title={t('school.st.secStaff')} desc={t('school.st.staffDesc')}
        extra={unassigned.length > 0 && <Badge variant="destructive" className="text-sm">{t('school.st.needs', { count: unassigned.length })}</Badge>}>
        <div className="rounded-2xl border border-border bg-muted/40 p-4 space-y-3">
          <p className="font-medium text-lg">{t('school.st.invite')}</p>
          <div className="flex flex-wrap gap-2">
            <Input className="h-11 flex-1 min-w-[220px] text-base" type="email" placeholder={t('school.st.emailPh')} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Select value={role} onValueChange={(v) => setRole(v as SchoolRole)}>
              <SelectTrigger className="h-11 w-44 text-base" aria-label={t('school.st.role')}><SelectValue /></SelectTrigger>
              <SelectContent>{(Object.keys(ROLE_LABEL) as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {role !== 'school_admin' && classrooms.length > 0 && (
            <div className="space-y-2">
              <p className="text-muted-foreground">{t('school.st.theirRooms')}</p>
              <div className="flex flex-wrap gap-2">
                {classrooms.map((c) => {
                  const on = inviteRooms.includes(c.id);
                  return <button key={c.id} type="button" aria-pressed={on} onClick={() => setInviteRooms((r) => on ? r.filter((x) => x !== c.id) : [...r, c.id])}
                    className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-base ${on ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}>{on ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}{c.name}</button>;
                })}
              </div>
            </div>
          )}
          <Button size="lg" disabled={!/\S+@\S+\.\S+/.test(email)} onClick={async () => { if (await run({ action: 'invite', school_id: schoolId, email: email.trim(), role, classroom_ids: role === 'school_admin' ? [] : inviteRooms })) { setEmail(''); setInviteRooms([]); } }}>{t('school.st.send')}</Button>
          {inviteWarning && <p role="alert" className="text-destructive">{inviteWarning}</p>}
        </div>

        <ul className="divide-y divide-border">
          {members.map((m) => {
            const self = m.user_id === user?.id;
            const locked = self || (m.role === 'school_admin' && adminCount <= 1);
            const none = m.role !== 'school_admin' && unassigned.includes(m);
            return (
              <li key={m.id} className="flex flex-col gap-3 py-5 md:flex-row md:items-start">
                <div className="flex min-w-0 flex-1 gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-lg font-semibold">{initials(nameOf(m))}</div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xl font-medium truncate">{nameOf(m)}{self ? t('school.st.you') : ''}</p>
                      <Badge variant={m.role === 'school_admin' ? 'default' : 'secondary'} className="text-sm">{ROLE_LABEL[m.role]}</Badge>
                      {none && <Badge variant="destructive" className="text-sm">{t('school.st.notInRoom')}</Badge>}
                    </div>
                    <p className="text-muted-foreground truncate">{m.email}</p>
                    {m.role === 'school_admin' ? <p className="text-muted-foreground">{t('school.st.seesAll')}</p> : classrooms.length ? roomChips(m) : <p className="text-muted-foreground">{t('school.st.addRoomFirst')}</p>}
                  </div>
                </div>
                {!locked && (
                  <div className="flex items-center gap-2 md:pt-1">
                    <Select value={m.role} onValueChange={(v) => setPending({ title: t('school.st.changeTo', { name: nameOf(m), role: ROLE_LABEL[v as SchoolRole] }), body: v === 'school_admin' ? t('school.st.adminBody') : t('school.st.roleBody', { role: ROLE_LABEL[v as SchoolRole] }), action: t('school.st.changeRole'), run: () => run({ action: 'member_role', id: m.id, role: v }, t('school.st.roleUpdated')) })}>
                      <SelectTrigger className="h-11 w-40 text-base" aria-label={t('school.st.roleFor', { name: nameOf(m) })}><SelectValue /></SelectTrigger>
                      <SelectContent>{(Object.keys(ROLE_LABEL) as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
                    </Select>
                    <Button variant="ghost" className="text-destructive" onClick={() => setPending({ title: t('school.st.removeQ', { name: nameOf(m) }), body: t('school.st.removeBody'), action: t('school.st.removeFrom'), run: () => run({ action: 'member_remove', id: m.id }, t('school.st.removed')) })}>{t('school.st.remove')}</Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {invites.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t('school.st.waiting')}</h3>
            <ul className="divide-y divide-border rounded-2xl border border-border">
              {invites.map((i) => (
                <li key={i.id} className="p-4 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-lg">{i.email} <Badge variant="outline" className="ml-1 text-sm">{ROLE_LABEL[i.role]}</Badge></p>
                    {!!i.classroom_ids?.length && <p className="text-muted-foreground">{t('school.st.joins', { rooms: classrooms.filter((c) => i.classroom_ids!.includes(c.id)).map((c) => c.name).join(', ') })}</p>}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" onClick={() => run({ action: 'invite', school_id: schoolId, email: i.email, role: i.role, classroom_ids: i.classroom_ids ?? [] })}>{t('school.st.resend')}</Button>
                    <Button variant="outline" onClick={() => copyInvite(i.email, i.role)}>{t('school.st.copy')}</Button>
                    <Button variant="ghost" onClick={() => setPending({ title: t('school.st.cancelQ', { email: i.email }), body: t('school.st.cancelBody'), action: t('school.st.cancelInvite'), run: () => run({ action: 'invite_cancel', id: i.id }, t('school.st.cancelled')) })}>{t('shared.cancel')}</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section id="sec-rooms" title={t('school.st.secRooms')} desc={t('school.st.roomsDesc')}>
        <div className="flex flex-wrap gap-2">
          <Input className="h-11 flex-1 min-w-[220px] text-base" placeholder={t('school.st.roomPh')} value={room} onChange={(e) => setRoom(e.target.value)} />
          <Button size="lg" disabled={!room.trim()} onClick={async () => { if (await run({ action: 'classroom_save', school_id: schoolId, name: room.trim() }, t('school.st.roomAdded'))) setRoom(''); }}>{t('school.st.addRoom')}</Button>
        </div>
        {classrooms.length === 0 && <p className="text-muted-foreground">{t('school.st.noRooms')}</p>}
        <div className="grid gap-4 lg:grid-cols-2">
          {classrooms.map((c) => {
            const here = nonAdmins.filter((m) => inRoom(c.id, m.id));
            const notHere = nonAdmins.filter((m) => !inRoom(c.id, m.id));
            const count = studentCounts[c.id] ?? 0;
            const cap = c.seat_limit ?? seatLimit ?? null;
            return (
              <div key={c.id} className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-2xl leading-tight">{c.name}</p>
                    <p className="text-muted-foreground">{cap ? t('school.st.childrenOf', { count, cap }) : t('school.st.children', { count })}{c.age_group ? ` · ${ageLabel(c.age_group)}` : ''}</p>
                  </div>
                  <Button variant="ghost" className="text-destructive" onClick={() => setPending({ title: t('school.st.delQ', { name: c.name }), body: t('school.st.delBody', { name: c.name, count }), action: t('school.st.delRoom'), run: () => run({ action: 'classroom_delete', id: c.id }, t('school.st.roomDeleted')) })}>{t('shared.delete')}</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {here.length === 0 && <p className="text-muted-foreground">{t('school.st.noStaff')}</p>}
                  {here.map((m) => (
                    <span key={m.id} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-muted/50 pl-4 pr-1 text-base">
                      {nameOf(m)}{c.lead_member_id === m.id && <span className="text-primary font-medium">{t('school.st.lead')}</span>}<span className="text-muted-foreground">· {ROLE_LABEL[m.role]}</span>
                      <button type="button" aria-label={t('school.st.takeOff', { name: nameOf(m), room: c.name })} onClick={() => toggle(c.id, m.id)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-card"><X className="h-4 w-4" /></button>
                    </span>
                  ))}
                  {notHere.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild><Button variant="outline" className="min-h-11 rounded-full"><Plus className="h-4 w-4 mr-1" />{t('school.st.addStaff')}</Button></PopoverTrigger>
                      <PopoverContent className="w-72 p-1">
                        {notHere.map((m) => (
                          <button key={m.id} type="button" onClick={() => toggle(c.id, m.id)} className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-3 text-left text-base hover:bg-muted">
                            <span className="truncate">{nameOf(m)}</span><span className="text-sm text-muted-foreground">{ROLE_LABEL[m.role]}</span>
                          </button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Select value={c.age_group ?? 'none'} onValueChange={(v) => run({ action: 'classroom_save', school_id: schoolId, id: c.id, name: c.name, age_group: v === 'none' ? null : v }, t('school.st.ageSaved'))}>
                    <SelectTrigger className="h-11 text-base" aria-label={t('school.st.ageGroup')}><SelectValue placeholder={t('school.st.ageGroup')} /></SelectTrigger>
                    <SelectContent><SelectItem value="none">{t('school.st.noAge')}</SelectItem>{AGE_GROUPS.map((a) => <SelectItem key={a} value={a}>{ageLabel(a)}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={c.lead_member_id ?? 'none'} onValueChange={(v) => run({ action: 'classroom_save', school_id: schoolId, id: c.id, name: c.name, lead_member_id: v === 'none' ? null : v }, t('school.st.leadSaved'))}>
                    <SelectTrigger className="h-11 text-base" aria-label={t('school.st.leadGuide')}><SelectValue placeholder={t('school.st.leadGuide')} /></SelectTrigger>
                    <SelectContent><SelectItem value="none">{t('school.st.noLead')}</SelectItem>{members.filter((m) => m.role !== 'assistant').map((m) => <SelectItem key={m.id} value={m.id}>{t('school.st.leadName', { name: nameOf(m) })}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {permissions && <Section id="sec-perms" title={t('school.st.secPerms')} desc={t('school.st.permsDesc')}>{permissions}</Section>}

      <Section id="sec-profile" title={t('school.st.secProfile')} desc={t('school.st.profileDesc')}>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end">
          <div className="space-y-1"><Label htmlFor="sp-name" className="text-base">{t('school.st.schoolName')}</Label><Input id="sp-name" disabled={savingProfile} className="h-11 text-base" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
          <div className="space-y-1"><Label htmlFor="sp-email" className="text-base">{t('school.st.schoolEmail')}</Label><Input id="sp-email" disabled={savingProfile} type="email" className="h-11 text-base" value={profile.contact_email} onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })} /></div>
          <Button size="lg" disabled={savingProfile || !profileDirty || !profile.name.trim() || !/\S+@\S+\.\S+/.test(profile.contact_email)} onClick={saveProfile}>{savingProfile ? t('shared.saving') : t('school.st.saveProfile')}</Button>
        </div>
      </Section>

      <AlertDialog open={!!pending} onOpenChange={(o) => { if (!o) setPending(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{pending?.title}</AlertDialogTitle>
            <AlertDialogDescription>{pending?.body}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('school.st.keep')}</AlertDialogCancel>
            <AlertDialogAction onClick={() => { pending?.run(); setPending(null); }}>{pending?.action}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Section id="sec-compliance" title={t('school.st.secCompliance')} desc={t('school.st.complianceDesc')}>
        <a href="/downloads/School_Compliance_Privacy_Brief.pdf" download="School_Compliance_Privacy_Brief.pdf" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">{t('school.st.downloadBrief')}</a>
      </Section>
      <Section id="sec-backup" title={t('school.st.secBackup')} desc={t('school.st.backupDesc')}>
        <BackupPanel schoolId={schoolId} schoolName={schoolName} frequency={backupFrequency} onSettingsSaved={onSettingsSaved} />
      </Section>
    </div>
  );
}
