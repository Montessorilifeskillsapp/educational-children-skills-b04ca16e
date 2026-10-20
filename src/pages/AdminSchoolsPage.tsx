import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminBackBar from '@/components/AdminBackBar';
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { ROLE_LABEL, schoolCall, SchoolRole } from '@/components/school/api';

interface School { id: string; name: string; contact_email: string | null; seat_limit: number; active: boolean }
interface Row { school_id: string; email: string; role: SchoolRole; accepted_at?: string | null }
type Draft = Partial<School> & { first_admin_email?: string };

export default function AdminSchoolsPage() {
  const { user, loading: authLoading } = useAuthContext();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [data, setData] = useState<{ schools: School[]; members: Row[]; invites: Row[] } | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [inviteWarning, setInviteWarning] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setIsAdmin(false); return; }
    supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle().then(({ data }) => setIsAdmin(!!data));
  }, [user, authLoading]);
  const load = () => schoolCall<{ schools: School[]; members: Row[]; invites: Row[] }>({ action: 'admin_list' }).then(setData).catch((e) => toast({ title: 'Could not load', description: e.message, variant: 'destructive' }));
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

  if (authLoading || isAdmin === null) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (!isAdmin) return <Navigate to="/admin/verify" replace />;

  const save = async () => {
    if (!draft?.name?.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.contact_email?.trim() ?? '')) { toast({ title: 'School email required', description: "Enter the school's own email address. Parent reports are sent from the school's email.", variant: 'destructive' }); return; }
    try {
      const result = await schoolCall<{ invitation?: { queued: boolean; error: string | null } }>({ action: 'admin_school_save', id: draft.id, name: draft.name.trim(), contact_email: draft.contact_email!.trim(),
        seat_limit: Number(draft.seat_limit) || 30, active: draft.active ?? true, first_admin_email: draft.first_admin_email?.trim() || undefined });
      setInviteWarning(result.invitation?.error ?? null);
      toast({ title: 'School saved', description: result.invitation?.queued ? 'Invitation queued for email, not yet confirmed delivered.' : result.invitation?.error ?? undefined, variant: result.invitation?.error ? 'destructive' : 'default' });
      setDraft(null); load();
    } catch (e) { toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' }); }
  };

  const remove = async (s: School) => {
    if (!confirm(`Delete ${s.name}? This permanently removes its classrooms, students, staff and records.`)) return;
    try { await schoolCall({ action: 'admin_school_delete', id: s.id }); toast({ title: 'School deleted' }); if (draft?.id === s.id) setDraft(null); load(); }
    catch (e) { toast({ title: 'Could not delete', description: (e as Error).message, variant: 'destructive' }); }
  };

  const form = draft && (
    <Card>
      <CardHeader><CardTitle className="text-lg">{draft.id ? 'Edit school' : 'New school'}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div><Label>School name</Label><Input value={draft.name ?? ''} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
        <div><Label>School email (required)</Label><p className="text-xs text-muted-foreground">The school's own address, e.g. office@yourschool.org. Parent reports go out from the school's email.</p><Input type="email" required value={draft.contact_email ?? ''} onChange={(e) => setDraft({ ...draft, contact_email: e.target.value })} /></div>
        <div><Label>Places per classroom</Label><Input type="number" min={1} max={500} value={draft.seat_limit ?? 30} onChange={(e) => setDraft({ ...draft, seat_limit: Number(e.target.value) })} /></div>
        <div><Label>{draft.id ? 'Invite another School Admin (optional)' : 'First School Admin email'}</Label><Input type="email" value={draft.first_admin_email ?? ''} onChange={(e) => setDraft({ ...draft, first_admin_email: e.target.value })} /></div>
        <label className="flex items-center gap-2 text-sm"><Switch checked={draft.active ?? true} onCheckedChange={(v) => setDraft({ ...draft, active: v })} /> Portal turned on</label>
        <div className="flex gap-2"><Button onClick={save}>Save</Button><Button variant="outline" onClick={() => setDraft(null)}>Cancel</Button></div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      <AdminBackBar />
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Schools</h1>
          <p className="text-muted-foreground">Set up licensed schools and their places per classroom.</p>
        </div>
        <Button onClick={() => setDraft({ seat_limit: 30, active: true })}>New school</Button>
      </header>

      {inviteWarning && <p role="alert" className="border border-destructive rounded-md p-3 text-sm text-destructive">{inviteWarning}</p>}

      {draft && !draft.id && form}

      {!data ? <LoadingSpinner /> : data.schools.length === 0 ? <p className="text-muted-foreground">No schools yet.</p> : data.schools.map((s) => draft?.id === s.id ? <div key={s.id}>{form}</div> : (
        <Card key={s.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2">
            <CardTitle className="text-lg">{s.name} {!s.active && <span className="text-sm text-muted-foreground">(off)</span>}</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setDraft({ ...s })}>Edit</Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(s)}>Delete</Button>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-1">
            <p>{s.seat_limit} places per classroom{s.contact_email ? ` · ${s.contact_email}` : ''}</p>
            {data.members.filter((m) => m.school_id === s.id).map((m) => <p key={m.email}>{m.email} · {ROLE_LABEL[m.role]}</p>)}
            {data.invites.filter((i) => i.school_id === s.id && !i.accepted_at).map((i) => <p key={i.email}>{i.email} · {ROLE_LABEL[i.role]} · pending sign-in</p>)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
