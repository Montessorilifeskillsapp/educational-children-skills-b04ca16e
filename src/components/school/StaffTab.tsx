import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Classroom, Invite, Member, ROLE_LABEL, schoolCall, SchoolRole } from './api';

interface Props { schoolId: string; members: Member[]; invites: Invite[]; classrooms: Classroom[]; staff: { classroom_id: string; member_id: string }[]; onChange: () => void }

export default function StaffTab({ schoolId, members, invites, classrooms, staff, onChange }: Props) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<SchoolRole>('teacher');
  const [room, setRoom] = useState('');
  const run = async (body: Record<string, unknown>, ok?: string) => {
    try { await schoolCall(body); if (ok) toast({ title: ok }); onChange(); return true; }
    catch (e) { toast({ title: 'Could not update', description: (e as Error).message, variant: 'destructive' }); return false; }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-lg">Classrooms</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="New classroom name" value={room} onChange={(e) => setRoom(e.target.value)} />
            <Button disabled={!room.trim()} onClick={async () => { if (await run({ action: 'classroom_save', school_id: schoolId, name: room.trim() })) setRoom(''); }}>Add</Button>
          </div>
          {classrooms.map((c) => (
            <div key={c.id} className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{c.name}</p>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => confirm(`Delete ${c.name} and all its students and records?`) && run({ action: 'classroom_delete', id: c.id })}>Delete</Button>
              </div>
              <p className="text-xs text-muted-foreground mb-1">Staff in this classroom</p>
              <div className="flex flex-wrap gap-3">
                {members.filter((m) => m.role !== 'school_admin').map((m) => {
                  const on = staff.some((s) => s.classroom_id === c.id && s.member_id === m.id);
                  return (
                    <label key={m.id} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={on} onCheckedChange={(v) => run({ action: 'staff_assign', classroom_id: c.id, member_id: m.id, assigned: !!v })} />
                      {m.full_name || m.email}
                    </label>
                  );
                })}
                {members.every((m) => m.role === 'school_admin') && <p className="text-xs text-muted-foreground">Invite teachers or assistants first.</p>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Staff</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <Input className="flex-1 min-w-[200px]" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Select value={role} onValueChange={(v) => setRole(v as SchoolRole)}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>{(Object.keys(ROLE_LABEL) as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
            </Select>
            <Button disabled={!/\S+@\S+\.\S+/.test(email)} onClick={async () => { if (await run({ action: 'invite', school_id: schoolId, email: email.trim(), role }, 'Invitation sent')) setEmail(''); }}>Invite</Button>
          </div>
          <ul className="divide-y divide-border">
            {members.map((m) => (
              <li key={m.id} className="py-2 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm">{m.full_name || m.email} <span className="text-muted-foreground">· {m.email}</span></span>
                <div className="flex gap-2 items-center">
                  <Select value={m.role} onValueChange={(v) => run({ action: 'member_role', id: m.id, role: v })}>
                    <SelectTrigger className="w-36 h-8"><SelectValue /></SelectTrigger>
                    <SelectContent>{(Object.keys(ROLE_LABEL) as SchoolRole[]).map((r) => <SelectItem key={r} value={r}>{ROLE_LABEL[r]}</SelectItem>)}</SelectContent>
                  </Select>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => confirm(`Remove ${m.email}?`) && run({ action: 'member_remove', id: m.id })}>Remove</Button>
                </div>
              </li>
            ))}
            {invites.map((i) => (
              <li key={i.id} className="py-2 flex items-center justify-between gap-2">
                <span className="text-sm text-muted-foreground">{i.email} · {ROLE_LABEL[i.role]} · invited</span>
                <Button size="sm" variant="ghost" onClick={() => run({ action: 'invite_cancel', id: i.id })}>Cancel</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
