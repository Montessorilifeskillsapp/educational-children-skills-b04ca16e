import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

const AuthCallbackPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState(() => i18n.t('auth.callback.confirming'));
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      setMessage(i18n.t('auth.callback.returning'));
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
          setMessage(i18n.t('auth.callback.failedFresh'));
          return;
        }

        window.history.replaceState({}, document.title, '/auth/callback');
        setStatus('success');
        setMessage(i18n.t('auth.callback.confirmed'));
        window.setTimeout(() => navigate('/?view=dashboard', { replace: true }), 1200);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : i18n.t('auth.callback.failedRetry'));
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
          <CardTitle>{status === 'error' ? t('auth.callback.errorTitle') : t('auth.callback.title')}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        {status === 'error' && (
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/auth">{t('auth.callback.returnSignUp')}</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/help">{t('auth.callback.help')}</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </main>
  );
};

export default AuthCallbackPage;