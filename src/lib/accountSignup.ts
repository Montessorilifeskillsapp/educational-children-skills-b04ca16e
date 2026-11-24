import { FunctionsHttpError } from '@supabase/supabase-js';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

/**
 * App-owned email sign-up (account-signup edge function). Confirmation emails go out from the
 * app's Gmail with a single-use link to /auth?confirm_token=…; opening it only confirms the
 * address — the person then signs in with their password.
 */
const WEB_ORIGIN = 'https://montessorilifeskillsapp.com';
export const CONFIRM_TOKEN_PARAM = 'confirm_token';

const origin = () => (Capacitor.isNativePlatform() ? WEB_ORIGIN : window.location.origin);

async function readError(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    try {
      if (error.context.status === 429) return 'rate limit';
      const body = await error.context.json();
      if (typeof body?.error === 'string') return body.error;
    } catch { /* fall through */ }
  }
  return error instanceof Error ? error.message : 'Something went wrong';
}

export async function requestSignup(email: string, password: string): Promise<{ error: string | null; existing: boolean }> {
  const { data, error } = await supabase.functions.invoke('account-signup', {
    body: { action: 'signup', email: email.trim(), password, origin: origin() },
  });
  if (error) return { error: await readError(error), existing: false };
  return { error: null, existing: data?.existing === true };
}

export async function resendConfirmation(email: string): Promise<{ error: string | null }> {
  const { error } = await supabase.functions.invoke('account-signup', {
    body: { action: 'resend', email: email.trim(), origin: origin() },
  });
  return { error: error ? await readError(error) : null };
}

export async function confirmSignup(token: string): Promise<{ email: string | null; error: string | null }> {
  const { data, error } = await supabase.functions.invoke('account-signup', { body: { action: 'confirm', token } });
  if (error) return { email: null, error: await readError(error) };
  return { email: typeof data?.email === 'string' ? data.email : null, error: null };
}
