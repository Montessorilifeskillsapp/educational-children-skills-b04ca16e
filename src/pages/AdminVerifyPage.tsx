import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

type BootstrapResult =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'granted' }
  | { kind: 'already_admin' }
  | { kind: 'error'; status: number; code: string; message: string };

const statusCopy: Record<string, { title: string; hint: string }> = {
  unauthorized: {
    title: '401 Unauthorized',
    hint: 'Your session token is missing or expired. Sign out, sign back in, then retry.',
  },
  forbidden: {
    title: '403 Forbidden',
    hint: 'The bootstrap secret is wrong, or it is not set in Supabase Vault under the name "bootstrap_secret".',
  },
  admin_already_exists: {
    title: '403 Admin already exists',
    hint: 'Another user has already claimed admin. Add more admins by inserting directly into user_roles via SQL.',
  },
  internal_error: {
    title: '500 Internal Error',
    hint: 'The function threw — check the admin-bootstrap edge function logs in Supabase.',
  },
  network_error: {
    title: 'Network error',
    hint: 'Could not reach the edge function. Check your connection and that the function is deployed.',
  },
};

const AdminVerifyPage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const [secret, setSecret] = useState('');
  const [result, setResult] = useState<BootstrapResult>({ kind: 'idle' });

  const checkRole = async () => {
    if (!user) return;
    setChecking(true);
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();
    setIsAdmin(!!data);
    setChecking(false);
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setChecking(false);
      return;
    }
    checkRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  const claimAdmin = async () => {
    if (!user || !secret) return;
    setResult({ kind: 'loading' });
    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token;
      if (!token) {
        setResult({
          kind: 'error',
          status: 401,
          code: 'unauthorized',
          message: 'No active session token.',
        });
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-bootstrap`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'x-bootstrap-secret': secret,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        },
      );
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.granted) {
        setResult({ kind: 'granted' });
        await checkRole();
        return;
      }
      if (res.ok && json.alreadyAdmin) {
        setResult({ kind: 'already_admin' });
        await checkRole();
        return;
      }

      const code = json.error ?? (res.status === 401 ? 'unauthorized' : res.status === 403 ? 'forbidden' : 'internal_error');
      setResult({
        kind: 'error',
        status: res.status,
        code,
        message: typeof json.error === 'string' ? json.error : `HTTP ${res.status}`,
      });
    } catch (e) {
      setResult({
        kind: 'error',
        status: 0,
        code: 'network_error',
        message: e instanceof Error ? e.message : String(e),
      });
    }
  };

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div>;
  }
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Admin verification</h1>
          <p className="text-muted-foreground text-sm">Confirm your admin role and claim it if needed.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Current status
            <Button size="sm" variant="ghost" onClick={checkRole} disabled={checking}>
              {checking ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Re-check'}
            </Button>
          </CardTitle>
          <CardDescription className="break-all">
            Signed in as <span className="font-mono">{user.email}</span>
            <br />
            User ID: <span className="font-mono text-xs">{user.id}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {checking ? (
            <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Checking user_roles…</div>
          ) : isAdmin ? (
            <Alert className="border-green-500/50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>You are an admin</AlertTitle>
              <AlertDescription>
                Your user has the <Badge variant="secondary">admin</Badge> role in <span className="font-mono">user_roles</span>.{' '}
                <Link to="/admin/analytics" className="underline">Open analytics →</Link>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Not an admin</AlertTitle>
              <AlertDescription>
                No admin row found for your user. Use the form below to claim it.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {!isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Claim admin (one-time bootstrap)</CardTitle>
            <CardDescription>
              Paste the value you stored in Supabase Vault as <span className="font-mono">bootstrap_secret</span>. Only the first caller succeeds.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="secret">Bootstrap secret</Label>
              <Input
                id="secret"
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Paste bootstrap_secret"
                autoComplete="off"
              />
            </div>
            <Button onClick={claimAdmin} disabled={!secret || result.kind === 'loading'}>
              {result.kind === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Claim admin
            </Button>

            {result.kind === 'granted' && (
              <Alert className="border-green-500/50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Admin granted</AlertTitle>
                <AlertDescription>You now have the admin role. Re-check above.</AlertDescription>
              </Alert>
            )}

            {result.kind === 'already_admin' && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Already admin</AlertTitle>
                <AlertDescription>The function confirms your existing admin role.</AlertDescription>
              </Alert>
            )}

            {result.kind === 'error' && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{statusCopy[result.code]?.title ?? `Error ${result.status}`}</AlertTitle>
                <AlertDescription className="space-y-1">
                  <div>{statusCopy[result.code]?.hint ?? result.message}</div>
                  <div className="font-mono text-xs opacity-70">
                    status={result.status} code={result.code}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Possible outcomes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div><Badge variant="outline">200 granted</Badge> — first caller, role inserted.</div>
          <div><Badge variant="outline">200 alreadyAdmin</Badge> — you already have the role.</div>
          <div><Badge variant="outline">401 unauthorized</Badge> — missing/invalid session JWT.</div>
          <div><Badge variant="outline">403 forbidden</Badge> — wrong or missing bootstrap secret.</div>
          <div><Badge variant="outline">403 admin_already_exists</Badge> — another user has already claimed admin.</div>
          <div><Badge variant="outline">500 internal_error</Badge> — see edge function logs.</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVerifyPage;
