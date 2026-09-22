import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import { Leaf } from 'lucide-react';

const SHOWN_KEY = 'mls-exit-shown'; // sessionStorage: once per visit
const DONE_KEY = 'mls-exit-done'; // localStorage: signed up or dismissed

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function readUtm(): Record<string, string> | undefined {
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

const ExitIntentCapture: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const triggeredRef = useRef(false);

  const eligible =
    import.meta.env.MODE !== 'test' &&
    !authLoading &&
    !user &&
    typeof window !== 'undefined' &&
    !window.localStorage.getItem(DONE_KEY) &&
    !window.sessionStorage.getItem(SHOWN_KEY);

  const trigger = () => {
    if (triggeredRef.current || !eligible) return;
    triggeredRef.current = true;
    window.sessionStorage.setItem(SHOWN_KEY, '1');
    setOpen(true);
  };

  useEffect(() => {
    if (!eligible) return;

    // Desktop: pointer leaves the window toward the top (tab bar / close).
    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      if (event.clientY <= 0) trigger();
    };

    // Mobile: after reading most of the page, a decisive scroll back to the top.
    let maxScroll = 0;
    let lastY = window.scrollY;
    let upDistance = 0;
    const onScroll = () => {
      const y = window.scrollY;
      maxScroll = Math.max(maxScroll, y);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const deepEnough = docHeight > 0 && maxScroll > docHeight * 0.6;
      if (y < lastY) {
        upDistance += lastY - y;
        if (deepEnough && upDistance > 800 && y < 200) trigger();
      } else {
        upDistance = 0;
      }
      lastY = y;
    };

    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eligible]);

  const dismiss = () => {
    window.localStorage.setItem(DONE_KEY, '1');
    setOpen(false);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed) || trimmed.length > 255) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { error: invokeError } = await supabase.functions.invoke('capture-lead', {
        body: { email: trimmed, source: 'exit-intent', utm: readUtm() },
      });
      if (invokeError) throw invokeError;
      window.localStorage.setItem(DONE_KEY, '1');
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss();
      }}
    >
      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="py-4 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-center">You're on the list</DialogTitle>
              <DialogDescription className="text-center">
                Thank you — we'll be in touch with updates and early access.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={dismiss} className="w-full sm:w-auto">
              Back to the page
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Before you go</DialogTitle>
              <DialogDescription>
                Join the list for early access to new activities and updates from Montessori Life
                Skills. No spam — you can unsubscribe anytime.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-3 pt-2">
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={255}
                required
                aria-label="Email address"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Signing you up…' : 'Keep me posted'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Early access and occasional updates. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentCapture;
