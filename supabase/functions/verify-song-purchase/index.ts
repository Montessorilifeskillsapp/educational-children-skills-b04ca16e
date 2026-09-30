import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

// Confirms a completed one-time Stripe checkout for the Songs collection and
// records ownership for the signed-in buyer. Follows the project's
// check-subscription pattern (query Stripe directly; no webhook needed).
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'unauthorized' }, 401);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    const { data: userData } = await supabase.auth.getUser(authHeader.replace(/^Bearer\s+/i, ''));
    const user = userData?.user;
    if (!user?.email) return json({ error: 'unauthorized' }, 401);

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const sessionId = String(body.session_id ?? '').trim();
    if (!sessionId) return json({ error: 'session_id is required' }, 400);

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) return json({ error: 'Stripe is not configured.' }, 500);

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16', maxNetworkRetries: 2 });
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch {
      return json({ error: 'Checkout session not found.' }, 404);
    }

    if (session.metadata?.planId !== 'songs-bundle') {
      return json({ error: 'This checkout is not a Songs collection purchase.' }, 400);
    }
    if (session.payment_status !== 'paid') {
      return json({ purchased: false, reason: 'not_paid' }, 200);
    }
    // Ownership must attach to the signed-in account.
    if (session.metadata?.userId && session.metadata.userId !== user.id) {
      return json({ error: 'This purchase belongs to a different account.' }, 403);
    }

    const { error } = await supabase
      .from('song_purchases')
      .upsert(
        {
          user_id: user.id,
          email: user.email,
          product: 'songs_bundle',
          stripe_session_id: sessionId,
        },
        { onConflict: 'user_id,product', ignoreDuplicates: true }
      );
    if (error) return json({ error: error.message }, 400);

    return json({ purchased: true });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
