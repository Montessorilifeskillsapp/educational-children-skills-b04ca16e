import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

interface FunnelData {
  days: number;
  overall: { signups: number; activated: number; paywall_view: number; subscribe_started: number; subscribe_completed: number };
  byCampaign: Record<string, { landed: number; paywall: number; subscribe_started: number; subscribe_completed: number }>;
  byDay: { day: string; signups: number; activated: number; paywall: number; subscribed: number }[];
}

const pct = (num: number, den: number) =>
  den > 0 ? `${Math.round((num / den) * 1000) / 10}%` : '—';

const AdminAnalyticsPage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [days, setDays] = useState(30);
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    setError(null);
    // Manual fetch with query string (supabase-js invoke doesn't carry GET params cleanly)
    (async () => {
      try {
        const { data: sess } = await supabase.auth.getSession();
        const token = sess.session?.access_token;
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-funnel-stats?days=${days}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
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
          <CardHeader><CardTitle>Access denied</CardTitle></CardHeader>
          <CardContent className="text-muted-foreground">
            This page is restricted to admin users.
          </CardContent>
        </Card>
      </div>
    );
  }

  const o = data?.overall;

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Conversion Funnel</h1>
          <p className="text-muted-foreground">Signup → activation → paywall → subscription</p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <Button key={d} variant={days === d ? 'default' : 'outline'} size="sm" onClick={() => setDays(d)}>
              Last {d}d
            </Button>
          ))}
        </div>
      </div>

      {error && <Card><CardContent className="pt-6 text-destructive">{error}</CardContent></Card>}
      {loading && <div className="flex justify-center py-8"><LoadingSpinner /></div>}

      {o && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'Signups', value: o.signups, base: o.signups },
              { label: 'Activated', value: o.activated, base: o.signups },
              { label: 'Paywall view', value: o.paywall_view, base: o.signups },
              { label: 'Sub started', value: o.subscribe_started, base: o.paywall_view },
              { label: 'Subscribed', value: o.subscribe_completed, base: o.signups },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{pct(s.value, s.base)} of prev</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle>By email campaign</CardTitle></CardHeader>
            <CardContent>
              {Object.keys(data!.byCampaign).length === 0 ? (
                <p className="text-muted-foreground text-sm">No campaign attribution yet — waiting on email clicks.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead className="text-right">Landed</TableHead>
                      <TableHead className="text-right">Paywall</TableHead>
                      <TableHead className="text-right">Sub started</TableHead>
                      <TableHead className="text-right">Subscribed</TableHead>
                      <TableHead className="text-right">Conv.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(data!.byCampaign)
                      .sort(([, a], [, b]) => b.landed - a.landed)
                      .map(([name, v]) => (
                        <TableRow key={name}>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell className="text-right">{v.landed}</TableCell>
                          <TableCell className="text-right">{v.paywall}</TableCell>
                          <TableCell className="text-right">{v.subscribe_started}</TableCell>
                          <TableCell className="text-right">{v.subscribe_completed}</TableCell>
                          <TableCell className="text-right">{pct(v.subscribe_completed, v.landed)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>By day</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead className="text-right">Signups</TableHead>
                    <TableHead className="text-right">Activated</TableHead>
                    <TableHead className="text-right">Paywall</TableHead>
                    <TableHead className="text-right">Subscribed</TableHead>
                    <TableHead className="text-right">Sub rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data!.byDay.map((d) => (
                    <TableRow key={d.day}>
                      <TableCell className="font-mono text-xs">{d.day}</TableCell>
                      <TableCell className="text-right">{d.signups}</TableCell>
                      <TableCell className="text-right">{d.activated}</TableCell>
                      <TableCell className="text-right">{d.paywall}</TableCell>
                      <TableCell className="text-right">{d.subscribed}</TableCell>
                      <TableCell className="text-right">{pct(d.subscribed, d.signups)}</TableCell>
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

export default AdminAnalyticsPage;
