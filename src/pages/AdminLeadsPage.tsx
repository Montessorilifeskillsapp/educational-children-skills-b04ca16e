import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminBackBar from '@/components/AdminBackBar';

interface LeadStats {
  days: number;
  total: number;
  byDay: { day: string; count: number }[];
  bySource: { source: string; count: number }[];
  byUtmSource: { name: string; count: number }[];
  byUtmCampaign: { name: string; count: number }[];
}

const pct = (n: number | null) =>
  n === null ? '—' : `${Math.round(n * 1000) / 10}%`;

const AdminLeadsPage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [days, setDays] = useState(30);
  const [data, setData] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consults, setConsults] = useState<{
    id: string; created_at: string; name: string; email: string; package: string;
    child_age: string | null; topics: string; preferred_times: string | null;
  }[] | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setIsAdmin(false); return; }
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user, authLoading]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from('consultation_requests')
      .select('id, created_at, name, email, package, child_age, topics, preferred_times')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data }) => setConsults(data ?? []));
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const { data: sess } = await supabase.auth.getSession();
        const token = sess.session?.access_token;
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-lead-stats?days=${days}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setData(await res.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [isAdmin, days]);

  if (authLoading || isAdmin === null) {
    return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div>;
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="max-w-md">
          <CardHeader><CardTitle>Access restricted</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">You don't have permission to view this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const maxDay = Math.max(1, ...(data?.byDay.map((d) => d.count) ?? [1]));

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <AdminBackBar />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Email Signups</h1>
          <p className="text-muted-foreground">Email signups and where they came from</p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90, 180].map((d) => (
            <Button key={d} variant={days === d ? 'default' : 'outline'} size="sm" onClick={() => setDays(d)}>
              Last {d}d
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Consultation requests</CardTitle></CardHeader>
        <CardContent>
          {consults === null ? (
            <LoadingSpinner />
          ) : consults.length === 0 ? (
            <p className="text-muted-foreground text-sm">No consultation requests yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Received</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Child's age</TableHead>
                  <TableHead>Topics</TableHead>
                  <TableHead>Preferred times</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consults.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="whitespace-nowrap text-xs">{new Date(c.created_at).toLocaleString()}</TableCell>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell><a className="text-primary underline underline-offset-2" href={`mailto:${c.email}`}>{c.email}</a></TableCell>
                    <TableCell className="whitespace-nowrap">{c.package === 'bundle' ? 'Three sessions' : 'Single session'}</TableCell>
                    <TableCell>{c.child_age || '—'}</TableCell>
                    <TableCell className="max-w-xs whitespace-pre-wrap text-sm">{c.topics}</TableCell>
                    <TableCell className="text-sm">{c.preferred_times || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {error && <Card><CardContent className="pt-6 text-destructive">{error}</CardContent></Card>}
      {loading && <div className="flex justify-center py-8"><LoadingSpinner /></div>}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Total leads</div>
                <div className="text-2xl font-bold">{data.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Avg / day</div>
                <div className="text-2xl font-bold">
                  {data.days > 0 ? (Math.round((data.total / data.days) * 10) / 10) : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Leads over time</CardTitle></CardHeader>
            <CardContent>
              {data.byDay.length === 0 ? (
                <p className="text-muted-foreground text-sm">No leads in this window.</p>
              ) : (
                <div className="space-y-1">
                  {data.byDay.map((d) => (
                    <div key={d.day} className="flex items-center gap-3 text-sm">
                      <span className="font-mono text-xs w-24 text-muted-foreground">{d.day}</span>
                      <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(d.count / maxDay) * 100}%` }}
                        />
                      </div>
                      <span className="w-10 text-right tabular-nums">{d.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>By source</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Share</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.bySource.map((s) => (
                      <TableRow key={s.source}>
                        <TableCell className="font-medium">{s.source}</TableCell>
                        <TableCell className="text-right">{s.count}</TableCell>
                        <TableCell className="text-right">{pct(data.total ? s.count / data.total : null)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>By UTM source</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>utm_source</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Share</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.byUtmSource.map((s) => (
                      <TableRow key={s.name}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell className="text-right">{s.count}</TableCell>
                        <TableCell className="text-right">{pct(data.total ? s.count / data.total : null)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>By UTM campaign</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>utm_campaign</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.byUtmCampaign.map((s) => (
                    <TableRow key={s.name}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-right">{s.count}</TableCell>
                      <TableCell className="text-right">{pct(data.total ? s.count / data.total : null)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminLeadsPage;
