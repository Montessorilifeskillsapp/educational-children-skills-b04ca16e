import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { Capacitor } from '@capacitor/core';
import { getLaunchHash, isPasswordRecoveryPending, markPasswordRecovery, urlIsPasswordRecovery } from '@/lib/passwordRecovery';

const AuthCallbackPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState(() => i18n.t('auth.callback.confirming'));
  const [offerContinueHere, setOfferContinueHere] = useState(false);
  const [appLink, setAppLink] = useState('');
  const [continueHere, setContinueHere] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // If this callback was triggered from the native app (in-app browser),
    // hand control back to the app via its custom URL scheme. The app's
    // deep-link listener (useCapacitorAuthDeepLink) will close the browser
    // and complete the session exchange inside the WebView.
    const searchParams0 = new URLSearchParams(window.location.search);
    if (searchParams0.get('native') === '1' && !continueHere && !Capacitor.isNativePlatform()) {
      const deepLink =
        'com.montessorilifeskills.app://auth-callback' +
        window.location.search +
        (window.location.hash || getLaunchHash());
      setMessage(i18n.t('auth.callback.returning'));
      // Some phone browsers only open the app after a tap, so keep a button for it.
      setAppLink(deepLink);
      // The app takes over this sign-in; don't keep a second copy in this browser, which
      // could later invalidate the app's sign-in when it renews.
      void supabase.auth.signOut({ scope: 'local' }).catch(() => undefined);
      window.location.replace(deepLink);
      // Opened on a computer or a phone without the app: offer to finish in this browser.
      const timer = window.setTimeout(() => setOfferContinueHere(true), 3000);
      return () => window.clearTimeout(timer);
    }

    const confirmEmail = async () => {

      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams((window.location.hash || getLaunchHash()).replace(/^#/, ''));
      const authError = searchParams.get('error_description') || hashParams.get('error_description');
      const code = searchParams.get('code');

      // A password-reset link must end on "Choose a new password", never straight in the account.
      const isRecovery = urlIsPasswordRecovery(window.location.hash || getLaunchHash(), window.location.search);
      if (isRecovery) markPasswordRecovery();

      if (authError) {
        setStatus('error');
        setMessage(authError);
        return;
      }

      try {
        const existingSession = await supabase.auth.getSession();

        // A reset link replaces whatever session this device already had.
        const replace = isRecovery || !existingSession.data.session;
        if (replace && code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }

        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        if (replace && !code && accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
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
        if (isRecovery || isPasswordRecoveryPending()) {
          navigate('/auth?reset=1', { replace: true });
          return;
        }
        setStatus('success');
        setMessage(i18n.t('auth.callback.confirmed'));
        window.setTimeout(() => navigate('/?view=dashboard', { replace: true }), 1200);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : i18n.t('auth.callback.failedRetry'));
      }
    };

    confirmEmail();
  }, [navigate, continueHere]);

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
        {status === 'loading' && appLink && !continueHere && (
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <a href={appLink}>{t('auth.callback.openApp')}</a>
            </Button>
            {offerContinueHere && (
              <Button variant="outline" className="w-full" onClick={() => setContinueHere(true)}>{t('auth.callback.continueHere')}</Button>
            )}
          </CardContent>
        )}
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