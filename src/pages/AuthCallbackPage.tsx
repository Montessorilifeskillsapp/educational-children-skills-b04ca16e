import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const AuthCallbackPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Confirming your email...');
  const navigate = useNavigate();

  useEffect(() => {
    // If this callback was triggered from the native app (in-app browser),
    // hand control back to the app via its custom URL scheme. The app's
    // deep-link listener (useCapacitorAuthDeepLink) will close the browser
    // and complete the session exchange inside the WebView.
    const searchParams0 = new URLSearchParams(window.location.search);
    if (searchParams0.get('native') === '1') {
      const deepLink =
        'com.montessorilifeskills.app://auth-callback' +
        window.location.search +
        window.location.hash;
      setMessage('Returning you to the app...');
      window.location.replace(deepLink);
      return;
    }

    const confirmEmail = async () => {

      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const authError = searchParams.get('error_description') || hashParams.get('error_description');
      const code = searchParams.get('code');

      if (authError) {
        setStatus('error');
        setMessage(authError);
        return;
      }

      try {
        const existingSession = await supabase.auth.getSession();

        if (!existingSession.data.session && code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (!data.session) {
          setStatus('error');
          setMessage('This confirmation link could not be completed. Please request a fresh sign-up email.');
          return;
        }

        window.history.replaceState({}, document.title, '/auth/callback');
        setStatus('success');
        setMessage('Your email is confirmed. Taking you to your dashboard...');
        window.setTimeout(() => navigate('/?view=dashboard', { replace: true }), 1200);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'This confirmation link could not be completed. Please try signing up again.');
      }
    };

    confirmEmail();
  }, [navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {status === 'loading' && <Loader2 className="h-6 w-6 animate-spin" />}
            {status === 'success' && <CheckCircle2 className="h-6 w-6" />}
            {status === 'error' && <XCircle className="h-6 w-6" />}
          </div>
          <CardTitle>{status === 'error' ? 'Confirmation needs a new link' : 'Email confirmation'}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        {status === 'error' && (
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/auth">Return to sign up</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/help">Get help</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </main>
  );
};

export default AuthCallbackPage;