import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminBackBar from '@/components/AdminBackBar';

interface Member {
  user_id: string;
  email: string;
  name: string | null;
  joined: string;
  children: number;
  premium: boolean;
  via: 'paid' | 'access_code' | null;
  plan: string | null;
  where: string | null;
  status: string | null;
  renews: string | null;
  songs?: boolean;
}
interface Resp { total: number; premium: number; paid: number; viaCode: number; songsOwned?: number; members: Member[] }

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString() : '—');

const AdminMembersPage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [data, setData] = useState<Resp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'premium' | 'free'>('all');
  const [q, setQ] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setIsAdmin(false); return; }
    supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user, authLoading]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.functions.invoke('admin-members').then(({ data, error }) => {
      if (error) setError(error.message); else setData(data as Resp);
    });
  }, [isAdmin]);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data?.members ?? []).filter((m) =>
      (filter === 'all' || (filter === 'premium' ? m.premium : !m.premium)) &&
      (!term || m.email?.toLowerCase().includes(term) || m.name?.toLowerCase().includes(term)));
  }, [data, filter, q]);

  const downloadCsv = () => {
    const head = ['Name', 'Email', 'Joined', 'Children', 'Member', 'How', 'Plan', 'Where', 'Songs collection', 'Renews/ends'];
    const lines = rows.map((m) => [m.name ?? '', m.email, fmt(m.joined), m.children, m.premium ? 'Yes' : 'No',
      m.via === 'paid' ? 'Paid' : m.via === 'access_code' ? 'Access code' : '', m.plan ?? '', m.where ?? '', m.songs ? 'Yes' : 'No', fmt(m.renews)]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));
    const blob = new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'members.csv';
    a.click();
  };

  if (authLoading || isAdmin === null) return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/admin/verify" replace />;

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <AdminBackBar />
      <div>
        <h1 className="text-3xl font-bold">Members</h1>
        <p className="text-muted-foreground">Everyone who has signed up, and who has Premium.</p>
      </div>

      {error && <Card><CardContent className="pt-6 text-destructive">{error}</CardContent></Card>}
      {!data && !error && <div className="flex justify-center py-8"><LoadingSpinner /></div>}

      {data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[['Signed up', data.total], ['Premium (total)', data.premium], ['Paying', data.paid], ['Via access code', data.viaCode], ['Songs collection', data.songsOwned ?? 0]].map(([l, v]) => (
              <Card key={l as string}><CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">{l}</div>
                <div className="text-2xl font-bold">{v}</div>
              </CardContent></Card>
            ))}
          </div>

          <Card>
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
              <CardTitle>People ({rows.length})</CardTitle>
              <div className="flex flex-wrap gap-2">
                {(['all', 'premium', 'free'] as const).map((f) => (
                  <Button key={f} size="sm" variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)}>
                    {f === 'all' ? 'Everyone' : f === 'premium' ? 'Premium' : 'Free'}
                  </Button>
                ))}
                <Input placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} className="w-56 h-9" />
                <Button size="sm" variant="outline" onClick={downloadCsv}>Download CSV</Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Children</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Where</TableHead>
                    <TableHead>Songs</TableHead>
                    <TableHead>Renews / ends</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((m) => (
                    <TableRow key={m.user_id}>
                      <TableCell className="font-medium">{m.name || '—'}</TableCell>
                      <TableCell>{m.email}</TableCell>
                      <TableCell>{fmt(m.joined)}</TableCell>
                      <TableCell className="text-right">{m.children}</TableCell>
                      <TableCell>
                        {m.premium
                          ? <Badge variant={m.via === 'paid' ? 'default' : 'secondary'}>{m.via === 'access_code' ? `Code: ${m.plan}` : m.plan}</Badge>
                          : <span className="text-muted-foreground">Free</span>}
                      </TableCell>
                      <TableCell className="capitalize">{m.where ?? '—'}</TableCell>
                      <TableCell>{m.songs ? <Badge>Songs owner</Badge> : <span className="text-muted-foreground">—</span>}</TableCell>
                      <TableCell>{fmt(m.renews)}</TableCell>
                    </TableRow>
                  ))}
                  {rows.length === 0 && (
                    <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground">No one matches.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminMembersPage;
