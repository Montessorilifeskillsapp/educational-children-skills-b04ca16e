import { FunctionsHttpError } from '@supabase/supabase-js';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

/**
 * App-owned password reset (password-reset edge function). Reset emails go out from the
 * app's Gmail with a single-use link to /auth?reset_token=…; the link never signs anyone in —
 * it can only save a new password, after which every session for that account ends.
 */
const WEB_ORIGIN = 'https://montessorilifeskillsapp.com';

export const RESET_TOKEN_PARAM = 'reset_token';

async function readError(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await error.context.json();
      if (error.context.status === 429) return 'rate limit';
      if (typeof body?.error === 'string') return body.error;
    } catch { /* fall through */ }
  }
  return error instanceof Error ? error.message : 'Something went wrong';
}

export async function requestPasswordReset(email: string): Promise<{ error: string | null }> {
  const origin = Capacitor.isNativePlatform() ? WEB_ORIGIN : window.location.origin;
  const { error } = await supabase.functions.invoke('password-reset', {
    body: { action: 'request', email: email.trim(), origin },
  });
  return { error: error ? await readError(error) : null };
}

export async function completePasswordReset(
  token: string,
  password: string,
): Promise<{ email: string | null; error: string | null }> {
  const { data, error } = await supabase.functions.invoke('password-reset', {
    body: { action: 'complete', token, password },
  });
  if (error) return { email: null, error: await readError(error) };
  return { email: typeof data?.email === 'string' ? data.email : null, error: null };
}
