import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useAuthContext } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Classroom, Invite, Member, ROLE_LABEL, schoolCall, SchoolRole } from './api';

interface Props { schoolId: string; members: Member[]; invites: Invite[]; classrooms: Classroom[]; staff: { classroom_id: string; member_id: string }[]; onChange: () => void; studentCounts?: Record<string, number>; seatLimit?: number | null; schoolName?: string; schoolEmail?: string | null }

type Pending = { title: string; body: string; action: string; run: () => void } | null;
const AGE_GROUPS = ['Nido (2 months–15 months)', 'Infant Community (15 months–3 years)', "Children's House (3–6 years)", 'Lower Elementary (6–9 years)', 'Upper Elementary (9–12 years)'];
const initials = (s: string) => s.split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');

export default function StaffTab({ schoolId, members, invites, classrooms, staff, onChange, studentCounts = {}, seatLimit, schoolName = '', schoolEmail = '' }: Props) {
  const { toast } = useToast();
  const { user } = useAuthContext();
  const adminCount = members.filter((m) => m.role === 'school_admin').length;
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<SchoolRole>('teacher');
  const [room, setRoom] = useState('');
  const [inviteWarning, setInviteWarning] = useState<string | null>(null);
  const [pending, setPending] = useState<Pending>(null);
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
  const roomsOf = (m: Member) => classrooms.filter((c) => staff.some((s) => s.classroom_id === c.id && s.member_id === m.id));
  const nonAdmins = members.filter((m) => m.role !== 'school_admin');

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">School profile</CardTitle>
          <CardDescription>Your school's name and official email. Parent reports are sent from this email.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end">
          <div><Label htmlFor="sp-name">School name</Label><Input id="sp-name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
          <div><Label htmlFor="sp-email">School email</Label><Input id="sp-email" type="email" value={profile.contact_email} onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })} /></div>
          <Button disabled={!profileDirty || !profile.name.trim() || !/\S+@\S+\.\S+/.test(profile.contact_email)} onClick={() => run({ action: 'school_profile_save', school_id: schoolId, name: profile.name.trim(), contact_email: profile.contact_email.trim() }, 'School profile saved')}>Save profile</Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Classrooms</CardTitle>
          <CardDescription>Each classroom shows its guides, assistants and how many places are filled.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="New classroom name, e.g. Children's House 1" value={room} onChange={(e) => setRoom(e.target.value)} />
            <Button disabled={!room.trim()} onClick={async () => { if (await run({ action: 'classroom_save', school_id: schoolId, name: room.trim() }, 'Classroom added')) setRoom(''); }}>Add classroom</Button>
          </div>
          {classrooms.length === 0 && <p className="text-sm text-muted-foreground">No classrooms yet. Add your first one above.</p>}
          <div className="grid gap-4 md:grid-cols-2">
            {classrooms.map((c) => {
              const assigned = nonAdmins.filter((m) => staff.some((s) => s.classroom_id === c.id && s.member_id === m.id));
              const guides = assigned.filter((m) => m.role === 'teacher');
              const helpers = assigned.filter((m) => m.role === 'assistant');
              const count = studentCounts[c.id] ?? 0;
              const cap = c.seat_limit ?? seatLimit ?? null;
              const pct = cap ? Math.min(100, Math.round((count / cap) * 100)) : 0;
              return (
                <div key={c.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-lg leading-tight">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{count}{cap ? ` of ${cap}` : ''} children</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setPending({ title: `Delete ${c.name}?`, body: `This permanently deletes ${c.name}, its ${count} student${count === 1 ? '' : 's'} and every progress record, note and report for them. This cannot be undone.`, action: 'Delete classroom', run: () => run({ action: 'classroom_delete', id: c.id }, 'Classroom deleted') })}>Delete</Button>
                  </div>
                  {cap ? <div className="h-2 rounded-full bg-muted overflow-hidden" aria-label={`${pct}% full`}><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div> : null}
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={c.age_group ?? 'none'} onValueChange={(v) => run({ action: 'classroom_save', school_id: schoolId, id: c.id, name: c.name, age_group: v === 'none' ? null : v }, 'Age group saved')}>
                      <SelectTrigger aria-label="Age group"><SelectValue placeholder="Age group" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No age group</SelectItem>
                        {AGE_GROUPS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select value={c.lead_member_id ?? 'none'} onValueChange={(v) => run({ action: 'classroom_save', school_id: schoolId, id: c.id, name: c.name, lead_member_id: v === 'none' ? null : v }, 'Lead Guide saved')}>
                      <SelectTrigger aria-label="Lead Guide"><SelectValue placeholder="Lead Guide" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Lead Guide</SelectItem>
                        {members.filter((m) => m.role !== 'assistant').map((m) => <SelectItem key={m.id} value={m.id}>Lead: {m.full_name || m.email}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Guides: </span>{guides.length ? guides.map((g) => g.full_name || g.email).join(', ') : <span className="text-muted-foreground">None assigned</span>}</p>
                    <p><span className="text-muted-foreground">Assistants: </span>{helpers.length ? helpers.map((g) => g.full_name || g.email).join(', ') : <span className="text-muted-foreground">None assigned</span>}</p>
                  </div>
                  <details className="rounded-lg bg-muted/50 p-2">
                    <summary className="cursor-pointer text-sm font-medium">Assign staff</summary>
                    <div className="mt-2 grid gap-2">
                      {nonAdmins.length === 0 && <p className="text-xs text-muted-foreground">Invite teachers or assistants first.</p>}
                      {nonAdmins.map((m) => {
                        const on = staff.some((s) => s.classroom_id === c.id && s.member_id === m.id);
                        return (
                          <label key={m.id} className="flex items-center gap-3 text-sm min-h-10">
                            <Checkbox checked={on} onCheckedChange={(v) => run({ action: 'staff_assign', classroom_id: c.id, member_id: m.id, assigned: !!v })} />
                            <span className="flex-1">{m.full_name || m.email}</span>
                            <Badge variant="secondary">{ROLE_LABEL[m.role]}</Badge>
                          </label>
                        );
                      })}
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Staff directory</CardTitle>
          <CardDescription>Invite staff with the email they sign in with. Only School Admins can change roles or remove people.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap rounded-xl border border-border p-3">
            <Input className="flex-1 min-w-[200px]" type="email" placeholder="Staff email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Select value={role} onValueChange={(v) => setRole(v as SchoolRole)}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>{(Object.keys(ROLE_LABEL) as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
            </Select>
            <Button disabled={!/\S+@\S+\.\S+/.test(email)} onClick={async () => { if (await run({ action: 'invite', school_id: schoolId, email: email.trim(), role })) setEmail(''); }}>Send invitation</Button>
          </div>
          {inviteWarning && <p role="alert" className="text-sm text-destructive">{inviteWarning}</p>}
          <ul className="grid gap-3 md:grid-cols-2">
            {members.map((m) => {
              const self = m.user_id === user?.id;
              const locked = self || (m.role === 'school_admin' && adminCount <= 1);
              const rooms = roomsOf(m);
              return (
                <li key={m.id} className="rounded-xl border border-border p-3 flex gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">{initials(m.full_name || m.email)}</div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium truncate">{m.full_name || m.email}{self ? ' (you)' : ''}</p>
                      <Badge variant={m.role === 'school_admin' ? 'default' : 'secondary'}>{ROLE_LABEL[m.role]}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                    <p className="text-xs text-muted-foreground">{m.role === 'school_admin' ? 'All classrooms' : rooms.length ? rooms.map((c) => c.name).join(', ') : 'Not assigned to a classroom yet'}</p>
                    {!locked && (
                      <div className="flex gap-2 items-center pt-1">
                        <Select value={m.role} onValueChange={(v) => setPending({ title: `Change ${m.full_name || m.email} to ${ROLE_LABEL[v as SchoolRole]}?`, body: v === 'school_admin' ? 'School Admins can see every classroom, change settings and manage all staff.' : `Their access will follow the ${ROLE_LABEL[v as SchoolRole]} permissions set for your school.`, action: 'Change role', run: () => run({ action: 'member_role', id: m.id, role: v }, 'Role updated') })}>
                          <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
                          <SelectContent>{(Object.keys(ROLE_LABEL) as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
                        </Select>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setPending({ title: `Remove ${m.full_name || m.email}?`, body: 'They will lose access to this school immediately. The records they wrote stay with the children.', action: 'Remove from school', run: () => run({ action: 'member_remove', id: m.id }, 'Staff member removed') })}>Remove</Button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {invites.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Waiting to sign in</h4>
              <ul className="divide-y divide-border rounded-xl border border-border">
                {invites.map((i) => (
                  <li key={i.id} className="p-3 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm">{i.email} <Badge variant="outline" className="ml-1">{ROLE_LABEL[i.role]}</Badge></span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => run({ action: 'invite', school_id: schoolId, email: i.email, role: i.role })}>Resend email</Button>
                      <Button size="sm" variant="outline" onClick={() => copyInvite(i.email, i.role)}>Copy invitation</Button>
                      <Button size="sm" variant="ghost" onClick={() => setPending({ title: `Cancel the invitation for ${i.email}?`, body: 'They will not be able to join unless invited again.', action: 'Cancel invitation', run: () => run({ action: 'invite_cancel', id: i.id }, 'Invitation cancelled') })}>Cancel</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

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
