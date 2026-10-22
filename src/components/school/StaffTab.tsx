import { ReactNode, useState } from 'react';
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

interface Props { schoolId: string; members: Member[]; invites: Invite[]; classrooms: Classroom[]; staff: { classroom_id: string; member_id: string }[]; onChange: () => void; studentCounts?: Record<string, number>; seatLimit?: number | null; schoolName?: string; schoolEmail?: string | null; permissions?: ReactNode }

type Pending = { title: string; body: string; action: string; run: () => void } | null;
const AGE_GROUPS = ['Nido (2 months–15 months)', 'Infant Community (15 months–3 years)', "Children's House (3–6 years)", 'Lower Elementary (6–9 years)', 'Upper Elementary (9–12 years)'];
const initials = (s: string) => s.split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');
const SECTIONS = [{ id: 'sec-staff', label: 'Staff' }, { id: 'sec-rooms', label: 'Classrooms' }, { id: 'sec-perms', label: 'Permissions' }, { id: 'sec-profile', label: 'School profile' }];

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

export default function StaffTab({ schoolId, members, invites, classrooms, staff, onChange, studentCounts = {}, seatLimit, schoolName = '', schoolEmail = '', permissions }: Props) {
  const { toast } = useToast();
  const { user } = useAuthContext();
  const adminCount = members.filter((m) => m.role === 'school_admin').length;
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<SchoolRole>('teacher');
  const [inviteRooms, setInviteRooms] = useState<string[]>([]);
  const [room, setRoom] = useState('');
  const [inviteWarning, setInviteWarning] = useState<string | null>(null);
  const [pending, setPending] = useState<Pending>(null);
  const [override, setOverride] = useState<Record<string, boolean>>({});
  const [profile, setProfile] = useState({ name: schoolName, contact_email: schoolEmail ?? '' });
  const profileDirty = profile.name.trim() !== schoolName || profile.contact_email.trim().toLowerCase() !== (schoolEmail ?? '');
  const inviteLink = `${window.location.origin}/auth?redirect=${encodeURIComponent('/school')}`;
  const copyInvite = async (to: string, r: SchoolRole) => {
    const text = `You're invited to join ${schoolName} on Montessori Life Skills as ${ROLE_LABEL[r]}.\n\nOpen ${inviteLink} and sign in or create an account with ${to}. You'll go straight to your school workspace.`;
    try { await navigator.clipboard.writeText(text); toast({ title: 'Invitation copied', description: 'Paste it into a message or chat to the new staff member.' }); }
    catch { toast({ title: 'Could not copy', description: inviteLink }); }
  };
  const run = async (body: Record<string, unknown>, ok?: string) => {
    try {
      const result = await schoolCall<{ invitation?: { queued: boolean; error: string | null } }>(body);
      if (body.action === 'invite') {
        setInviteWarning(result.invitation?.error ?? null);
        toast({ title: result.invitation?.queued ? 'Invitation queued for email' : 'Invitation saved', description: result.invitation?.error ?? 'Delivery is not yet confirmed.', variant: result.invitation?.error ? 'destructive' : 'default' });
      } else if (ok) toast({ title: ok });
      onChange(); return true;
    }
    catch (e) { toast({ title: 'Could not update', description: (e as Error).message, variant: 'destructive' }); return false; }
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
        {SECTIONS.map((s) => <Button key={s.id} variant="outline" className="rounded-full bg-card" onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}>{s.label}</Button>)}
      </div>

      <Section id="sec-staff" title="Staff" desc="Tap a classroom under someone's name to add them to it. Tap it again to take them off."
        extra={unassigned.length > 0 && <Badge variant="destructive" className="text-sm">{unassigned.length} {unassigned.length === 1 ? 'person needs' : 'people need'} a classroom</Badge>}>
        <div className="rounded-2xl border border-border bg-muted/40 p-4 space-y-3">
          <p className="font-medium text-lg">Invite someone</p>
          <div className="flex flex-wrap gap-2">
            <Input className="h-11 flex-1 min-w-[220px] text-base" type="email" placeholder="Email they sign in with" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Select value={role} onValueChange={(v) => setRole(v as SchoolRole)}>
              <SelectTrigger className="h-11 w-44 text-base" aria-label="Role"><SelectValue /></SelectTrigger>
              <SelectContent>{(Object.keys(ROLE_LABEL) as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {role !== 'school_admin' && classrooms.length > 0 && (
            <div className="space-y-2">
              <p className="text-muted-foreground">Their classrooms:</p>
              <div className="flex flex-wrap gap-2">
                {classrooms.map((c) => {
                  const on = inviteRooms.includes(c.id);
                  return <button key={c.id} type="button" aria-pressed={on} onClick={() => setInviteRooms((r) => on ? r.filter((x) => x !== c.id) : [...r, c.id])}
                    className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-base ${on ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}>{on ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}{c.name}</button>;
                })}
              </div>
            </div>
          )}
          <Button size="lg" disabled={!/\S+@\S+\.\S+/.test(email)} onClick={async () => { if (await run({ action: 'invite', school_id: schoolId, email: email.trim(), role, classroom_ids: role === 'school_admin' ? [] : inviteRooms })) { setEmail(''); setInviteRooms([]); } }}>Send invitation</Button>
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
                      <p className="text-xl font-medium truncate">{nameOf(m)}{self ? ' (you)' : ''}</p>
                      <Badge variant={m.role === 'school_admin' ? 'default' : 'secondary'} className="text-sm">{ROLE_LABEL[m.role]}</Badge>
                      {none && <Badge variant="destructive" className="text-sm">Not in a classroom</Badge>}
                    </div>
                    <p className="text-muted-foreground truncate">{m.email}</p>
                    {m.role === 'school_admin' ? <p className="text-muted-foreground">Sees every classroom</p> : classrooms.length ? roomChips(m) : <p className="text-muted-foreground">Add a classroom below first.</p>}
                  </div>
                </div>
                {!locked && (
                  <div className="flex items-center gap-2 md:pt-1">
                    <Select value={m.role} onValueChange={(v) => setPending({ title: `Change ${nameOf(m)} to ${ROLE_LABEL[v as SchoolRole]}?`, body: v === 'school_admin' ? 'School Admins can see every classroom, change settings and manage all staff.' : `Their access will follow the ${ROLE_LABEL[v as SchoolRole]} permissions set for your school.`, action: 'Change role', run: () => run({ action: 'member_role', id: m.id, role: v }, 'Role updated') })}>
                      <SelectTrigger className="h-11 w-40 text-base" aria-label={`Role for ${nameOf(m)}`}><SelectValue /></SelectTrigger>
                      <SelectContent>{(Object.keys(ROLE_LABEL) as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
                    </Select>
                    <Button variant="ghost" className="text-destructive" onClick={() => setPending({ title: `Remove ${nameOf(m)}?`, body: 'They will lose access to this school immediately. The records they wrote stay with the children.', action: 'Remove from school', run: () => run({ action: 'member_remove', id: m.id }, 'Staff member removed') })}>Remove</Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {invites.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Waiting to sign in</h3>
            <ul className="divide-y divide-border rounded-2xl border border-border">
              {invites.map((i) => (
                <li key={i.id} className="p-4 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-lg">{i.email} <Badge variant="outline" className="ml-1 text-sm">{ROLE_LABEL[i.role]}</Badge></p>
                    {!!i.classroom_ids?.length && <p className="text-muted-foreground">Joins: {classrooms.filter((c) => i.classroom_ids!.includes(c.id)).map((c) => c.name).join(', ')}</p>}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" onClick={() => run({ action: 'invite', school_id: schoolId, email: i.email, role: i.role, classroom_ids: i.classroom_ids ?? [] })}>Resend email</Button>
                    <Button variant="outline" onClick={() => copyInvite(i.email, i.role)}>Copy invitation</Button>
                    <Button variant="ghost" onClick={() => setPending({ title: `Cancel the invitation for ${i.email}?`, body: 'They will not be able to join unless invited again.', action: 'Cancel invitation', run: () => run({ action: 'invite_cancel', id: i.id }, 'Invitation cancelled') })}>Cancel</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section id="sec-rooms" title="Classrooms" desc="Each classroom shows who works there. Use + Add staff or the x on a name.">
        <div className="flex flex-wrap gap-2">
          <Input className="h-11 flex-1 min-w-[220px] text-base" placeholder="New classroom name, e.g. Children's House 1" value={room} onChange={(e) => setRoom(e.target.value)} />
          <Button size="lg" disabled={!room.trim()} onClick={async () => { if (await run({ action: 'classroom_save', school_id: schoolId, name: room.trim() }, 'Classroom added')) setRoom(''); }}>Add classroom</Button>
        </div>
        {classrooms.length === 0 && <p className="text-muted-foreground">No classrooms yet. Add your first one above.</p>}
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
                    <p className="text-muted-foreground">{count}{cap ? ` of ${cap}` : ''} children{c.age_group ? ` · ${c.age_group}` : ''}</p>
                  </div>
                  <Button variant="ghost" className="text-destructive" onClick={() => setPending({ title: `Delete ${c.name}?`, body: `This permanently deletes ${c.name}, its ${count} student${count === 1 ? '' : 's'} and every progress record, note and report for them. This cannot be undone.`, action: 'Delete classroom', run: () => run({ action: 'classroom_delete', id: c.id }, 'Classroom deleted') })}>Delete</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {here.length === 0 && <p className="text-muted-foreground">No staff yet.</p>}
                  {here.map((m) => (
                    <span key={m.id} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-muted/50 pl-4 pr-1 text-base">
                      {nameOf(m)}{c.lead_member_id === m.id && <span className="text-primary font-medium">· Lead</span>}<span className="text-muted-foreground">· {ROLE_LABEL[m.role]}</span>
                      <button type="button" aria-label={`Take ${nameOf(m)} off ${c.name}`} onClick={() => toggle(c.id, m.id)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-card"><X className="h-4 w-4" /></button>
                    </span>
                  ))}
                  {notHere.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild><Button variant="outline" className="min-h-11 rounded-full"><Plus className="h-4 w-4 mr-1" />Add staff</Button></PopoverTrigger>
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
                  <Select value={c.age_group ?? 'none'} onValueChange={(v) => run({ action: 'classroom_save', school_id: schoolId, id: c.id, name: c.name, age_group: v === 'none' ? null : v }, 'Age group saved')}>
                    <SelectTrigger className="h-11 text-base" aria-label="Age group"><SelectValue placeholder="Age group" /></SelectTrigger>
                    <SelectContent><SelectItem value="none">No age group</SelectItem>{AGE_GROUPS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={c.lead_member_id ?? 'none'} onValueChange={(v) => run({ action: 'classroom_save', school_id: schoolId, id: c.id, name: c.name, lead_member_id: v === 'none' ? null : v }, 'Lead Guide saved')}>
                    <SelectTrigger className="h-11 text-base" aria-label="Lead Guide"><SelectValue placeholder="Lead Guide" /></SelectTrigger>
                    <SelectContent><SelectItem value="none">No Lead Guide</SelectItem>{members.filter((m) => m.role !== 'assistant').map((m) => <SelectItem key={m.id} value={m.id}>Lead: {nameOf(m)}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {permissions && <Section id="sec-perms" title="Permissions" desc="Decide what Teachers and Assistants may do in your school.">{permissions}</Section>}

      <Section id="sec-profile" title="School profile" desc="Your school's name and official email. Parent reports are sent from this email.">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end">
          <div className="space-y-1"><Label htmlFor="sp-name" className="text-base">School name</Label><Input id="sp-name" className="h-11 text-base" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
          <div className="space-y-1"><Label htmlFor="sp-email" className="text-base">School email</Label><Input id="sp-email" type="email" className="h-11 text-base" value={profile.contact_email} onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })} /></div>
          <Button size="lg" disabled={!profileDirty || !profile.name.trim() || !/\S+@\S+\.\S+/.test(profile.contact_email)} onClick={() => run({ action: 'school_profile_save', school_id: schoolId, name: profile.name.trim(), contact_email: profile.contact_email.trim() }, 'School profile saved')}>Save profile</Button>
        </div>
      </Section>

      <AlertDialog open={!!pending} onOpenChange={(o) => { if (!o) setPending(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{pending?.title}</AlertDialogTitle>
            <AlertDialogDescription>{pending?.body}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep as is</AlertDialogCancel>
            <AlertDialogAction onClick={() => { pending?.run(); setPending(null); }}>{pending?.action}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
