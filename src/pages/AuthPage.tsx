import { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/components/AuthProvider';
import { useProfile } from '@/contexts/ProfileContext';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

const AuthPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, signIn, signUp, signInWithGoogle, signInWithApple, loading } = useAuthContext();
  const { completeOnboarding } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  const describeAuthError = (message: string) => {
    if (/already registered|already exists|user already/i.test(message)) return 'This email already has an account. Try signing in instead.';
    if (/rate limit|too many requests|email rate/i.test(message)) return 'Too many attempts right now. Please wait a little while and try again.';
    if (/password.*weak|password.*short/i.test(message)) return 'Please choose a stronger password with at least 6 characters.';
    if (/invalid.*email/i.test(message)) return 'Please enter a valid email address.';
    if (/network|fetch failed|failed to fetch/i.test(message)) return 'We could not connect right now. Check your connection and try again.';
    return message;
  };

  const getPostAuthRedirect = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || sessionStorage.getItem('post_auth_redirect');
    return redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : null;
  }, [location.search]);

  // Redirect authenticated users. Brand-new accounts (created within the last
  // 5 minutes and not yet welcomed) go straight to the Pouring Water guide
  // for a Day-1 activation moment.
  useEffect(() => {
    if (!user || loading) return;

    const welcomedKey = `welcomed:${user.id}`;
    const alreadyWelcomed = localStorage.getItem(welcomedKey);
    const createdAt = user.created_at ? new Date(user.created_at).getTime() : 0;
    const isFreshSignup = !alreadyWelcomed && Date.now() - createdAt < 5 * 60 * 1000;
    const postAuthRedirect = getPostAuthRedirect();

    if (postAuthRedirect) {
      try {
        sessionStorage.removeItem('post_auth_redirect');
      } catch {
        console.warn('Unable to clear auth redirect intent');
      }
      navigate(postAuthRedirect, { replace: true });
    } else if (isFreshSignup) {
      localStorage.setItem(welcomedKey, '1');
      navigate('/preview/pouring-water?firstrun=1', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate, getPostAuthRedirect]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!email || !password) {
      setFormError('Enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setFormError(describeAuthError(error.message));
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        const postAuthRedirect = getPostAuthRedirect();
        if (postAuthRedirect) {
          try {
            sessionStorage.removeItem('post_auth_redirect');
          } catch {
            console.warn('Unable to clear auth redirect intent');
          }
        }
        navigate(postAuthRedirect || '/');
      }
    } catch (error) {
      setFormError('We could not sign you in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!email || !password || !confirmPassword) {
      setFormError('Complete all three fields to create your account.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('The passwords do not match. Please try again.');
      return;
    }

    if (password.length < 6) {
      setFormError('Your password needs at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signUp(email.trim(), password);
      if (error) {
        setFormError(describeAuthError(error.message));
      } else {
        setConfirmationEmail(email.trim());
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setFormError('We could not create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Montessori Life Skills</CardTitle>
          <CardDescription>{confirmationEmail ? 'One more step to get started' : 'Your guide to Montessori activities'}</CardDescription>
        </CardHeader>
        <CardContent>
          {confirmationEmail ? (
            <div role="status" className="space-y-4 py-5 text-center">
              <h2 className="text-xl font-semibold">Check your email</h2>
              <p className="text-sm text-muted-foreground">We sent a confirmation link to <strong className="text-foreground break-all">{confirmationEmail}</strong>. Open it to finish creating your account. Check your spam folder if you don't see it.</p>
              <Button variant="outline" className="w-full" onClick={() => { setConfirmationEmail(''); setMode('signin'); }}>Back to sign in</Button>
            </div>
          ) : <Tabs value={mode} onValueChange={(value) => { setMode(value as 'signin' | 'signup'); setFormError(''); setShowPassword(false); }} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            {formError && <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{formError}</p>}
            {mode === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                     autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                   <div className="relative">
                     <Input id="signin-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} required className="pr-12" />
                     <Button type="button" variant="ghost" size="icon" aria-label={showPassword ? 'Hide password' : 'Show password'} title={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0" >{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                   </div>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                     autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                   <div className="relative">
                     <Input id="signup-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength={6} placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} required className="pr-12" />
                     <Button type="button" variant="ghost" size="icon" aria-label={showPassword ? 'Hide password' : 'Show password'} title={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                   </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            )}
          </Tabs>}
          
          <div className="mt-6 pt-4 border-t space-y-3">
            {!Capacitor.isNativePlatform() && (
              <>
                <p className="text-center text-sm text-muted-foreground">Or continue with</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={async () => {
                    const { error } = await signInWithGoogle();
                    if (error) {
                      toast({
                        title: "Google Sign In Failed",
                        description: error.message,
                        variant: "destructive",
                      });
                    }
                  }}
                  disabled={isSubmitting}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={async () => {
                    const { error } = await signInWithApple();
                    if (error) {
                      toast({
                        title: "Apple Sign In Failed",
                        description: error.message,
                        variant: "destructive",
                      });
                    }
                  }}
                  disabled={isSubmitting}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </Button>
              </>
            )}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                completeOnboarding([]);
                navigate('/');
              }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Explore Free Activities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;