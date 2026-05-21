import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Download, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const readUtm = () => {
  if (typeof window === 'undefined') return null;
  const p = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = p.get(k);
    if (v) out[k] = v.slice(0, 100);
  }
  return Object.keys(out).length ? out : null;
};

const LeadMagnetForm: React.FC<{ className?: string }> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed) || trimmed.length > 254) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const { error: invokeError } = await supabase.functions.invoke('subscribe-lead-magnet', {
        body: { email: trimmed, utm: readUtm() },
      });
      if (invokeError) throw invokeError;
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError("Something went wrong. Please try again in a moment.");
    }
  };

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border border-secondary/30 bg-secondary/10 p-6 text-center ${className ?? ''}`}>
        <CheckCircle2 className="w-8 h-8 text-secondary mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-1">Check your inbox</h3>
        <p className="text-sm text-muted-foreground">
          Your Week 1 Starter Path PDF is on its way. If you don't see it in a few minutes,
          check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-3 ${className ?? ''}`} noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="lead-email" className="sr-only">Email address</label>
        <Input
          id="lead-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          maxLength={254}
          className="flex-1 h-12 rounded-full px-5 bg-background border-border/60"
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === 'loading'}
          className="rounded-full px-6 h-12"
        >
          {status === 'loading' ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</>
          ) : (
            <><Download className="w-4 h-4 mr-2" /> Get the free PDF</>
          )}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      <p className="text-xs text-muted-foreground">
        One email with your PDF. No spam — unsubscribe anytime.
      </p>
    </form>
  );
};

export default LeadMagnetForm;
