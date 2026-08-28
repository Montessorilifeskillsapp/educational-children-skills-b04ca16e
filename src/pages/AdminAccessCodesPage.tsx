import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import AccessCodeTestRedeem from '@/components/AccessCodeTestRedeem';
import AccessCodeRedeem from '@/components/AccessCodeRedeem';
import AdminBackBar from '@/components/AdminBackBar';

interface AccessCode {
  id: string;
  code: string;
  label: string | null;
  max_redemptions: number;
  redemption_count: number;
  expires_at: string | null;
  grant_duration_days: number | null;
  revoked: boolean;
  created_at: string;
}

interface Redemption {
  id: string;
  code_id: string;
  email: string;
  redeemed_at: string;
  revoked: boolean;
}

const DURATIONS = [
  { label: 'Lifetime', value: '' },
  { label: '12 months', value: '365' },
  { label: '6 months', value: '180' },
  { label: '3 months', value: '90' },
];

const AdminAccessCodesPage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [label, setLabel] = useState('');
  const [maxRedemptions, setMaxRedemptions] = useState('1');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user, authLoading]);

  const callApi = useCallback(async (body?: Record<string, unknown>) => {
    const { data: sess } = await supabase.auth.getSession();
    const token = sess.session?.access_token;
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-access-codes`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? { action: 'list' }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
    return json;
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await callApi({ action: 'list' });
      setCodes(data.codes ?? []);
      setRedemptions(data.redemptions ?? []);
    } catch (e) {
      toast({
        title: 'Could not load access codes',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [callApi, toast]);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const data = await callApi({
        action: 'create',
        label: label || null,
        max_redemptions: Number(maxRedemptions) || 1,
        grant_duration_days: duration === '' ? null : Number(duration),
      });
      setLabel('');
      setMaxRedemptions('1');
      await load();
      const newCode = data?.code?.code;
      if (newCode) {
        try {
          await navigator.clipboard.writeText(newCode);
        } catch {
          /* clipboard unavailable */
        }
        toast({ title: `Code created: ${newCode}`, description: 'Copied to your clipboard.' });
      }
    } catch (e) {
      toast({
        title: 'Could not create code',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };

  const handleRevokeCode = async (id: string, revoked: boolean) => {
    try {
      await callApi({ action: 'revoke_code', id, revoked: !revoked });
      await load();
      toast({ title: revoked ? 'Code re-enabled' : 'Code revoked' });
    } catch (e) {
      toast({
        title: 'Action failed',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  const handleRevokeRedemption = async (id: string) => {
    try {
      await callApi({ action: 'revoke_redemption', id });
      await load();
      toast({ title: 'Access revoked for that person' });
    } catch (e) {
      toast({
        title: 'Action failed',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast({ title: 'Copied', description: code });
    } catch {
      toast({ title: 'Copy failed', description: code, variant: 'destructive' });
    }
  };

  if (authLoading || isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access restricted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">You don't have permission to view this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-5xl">
      <AdminBackBar />
      <div>
        <h1 className="text-3xl font-bold">Access Codes</h1>
        <p className="text-muted-foreground">Give selected people full access without payment.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redeem a code on your account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Paste a code here to unlock full access on your own account — no payment needed.
          </p>
          <AccessCodeRedeem />
        </CardContent>
      </Card>

      <AccessCodeTestRedeem onFinished={() => void load()} />

      <Card>
        <CardHeader>
          <CardTitle>Create a code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="label" className="text-sm font-medium">Who is it for?</label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Jane Doe, AMI trainers"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="uses" className="text-sm font-medium">Number of people</label>
              <Input
                id="uses"
                type="number"
                min={1}
                value={maxRedemptions}
                onChange={(e) => setMaxRedemptions(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium">Access length</span>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((d) => (
                  <Button
                    key={d.label}
                    type="button"
                    size="sm"
                    variant={duration === d.value ? 'default' : 'outline'}
                    onClick={() => setDuration(d.value)}
                  >
                    {d.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <Button onClick={() => void handleCreate()} disabled={creating}>
            {creating ? 'Creating…' : 'Create access code'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing codes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : codes.length === 0 ? (
            <p className="text-muted-foreground text-sm">No access codes yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>For</TableHead>
                  <TableHead>Used</TableHead>
                  <TableHead>Length</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono">{c.code}</TableCell>
                    <TableCell>{c.label ?? '—'}</TableCell>
                    <TableCell>
                      {c.redemption_count} / {c.max_redemptions}
                    </TableCell>
                    <TableCell>
                      {c.grant_duration_days ? `${c.grant_duration_days} days` : 'Lifetime'}
                    </TableCell>
                    <TableCell>
                      {c.revoked ? (
                        <Badge variant="destructive">Revoked</Badge>
                      ) : c.redemption_count >= c.max_redemptions ? (
                        <Badge variant="secondary">Used up</Badge>
                      ) : (
                        <Badge>Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                      <Button size="sm" variant="ghost" onClick={() => void copyCode(c.code)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={c.revoked ? 'outline' : 'destructive'}
                        onClick={() => void handleRevokeCode(c.id, c.revoked)}
                      >
                        {c.revoked ? 'Re-enable' : 'Revoke'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redemptions</CardTitle>
        </CardHeader>
        <CardContent>
          {redemptions.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nobody has redeemed a code yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Person</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redemptions.map((r) => {
                  const parent = codes.find((c) => c.id === r.code_id);
                  return (
                    <TableRow key={r.id}>
                      <TableCell>{r.email}</TableCell>
                      <TableCell className="font-mono">{parent?.code ?? '—'}</TableCell>
                      <TableCell>{new Date(r.redeemed_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        {r.revoked ? (
                          <Badge variant="destructive">Revoked</Badge>
                        ) : (
                          <Button size="sm" variant="destructive" onClick={() => void handleRevokeRedemption(r.id)}>
                            Revoke access
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAccessCodesPage;
