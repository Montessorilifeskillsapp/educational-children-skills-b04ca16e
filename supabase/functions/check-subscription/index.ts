import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Helper logging function for debugging
const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

const getSubscriptionTier = (amount: number, interval?: string | null) => {
  if (amount === 1500 && interval === "month") {
    return "Premium";
  }

  if (amount === 999 && interval === "month") {
    return "Premium";
  }

  if (amount === 7999 && interval === "year") {
    return "Premium Annual";
  }

  if (amount === 14900 && !interval) {
    return "Premium Lifetime";
  }

  if (amount <= 1500) {
    return "Premium";
  }

  if (amount <= 8000) {
    return "Premium Annual";
  }

  return "Premium Lifetime";
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use the service role key to perform writes (upsert) in Supabase
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");

    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16", maxNetworkRetries: 2 });

    // Wrap Stripe calls so transient network failures fall back to last-known DB state
    let customers;
    try {
      customers = await stripe.customers.list({ email: user.email, limit: 1 });
    } catch (stripeErr) {
      const stripeMsg = stripeErr instanceof Error ? stripeErr.message : String(stripeErr);
      logStep("Stripe unreachable, falling back to cached subscriber row", { message: stripeMsg });
      const { data: cached } = await supabaseClient
        .from("subscribers")
        .select("subscribed, subscription_tier, subscription_end")
        .eq("user_id", user.id)
        .maybeSingle();
      return new Response(JSON.stringify({
        subscribed: Boolean(cached?.subscribed),
        subscription_tier: cached?.subscription_tier ?? null,
        subscription_end: cached?.subscription_end ?? null,
        stale: true,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (customers.data.length === 0) {
      logStep("No customer found, updating unsubscribed state");
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: null,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: "email" });
      return new Response(JSON.stringify({ subscribed: false, subscription_tier: null, subscription_end: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionTier = null;
    let subscriptionEnd = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd });

      const priceId = subscription.items.data[0]?.price.id;
      const price = priceId ? await stripe.prices.retrieve(priceId) : null;
      const amount = price?.unit_amount || 0;
      const interval = price?.recurring?.interval;

      subscriptionTier = getSubscriptionTier(amount, interval);
      logStep("Determined subscription tier", { priceId, amount, interval, subscriptionTier });
    } else {
      logStep("No active subscription found");
    }

    await supabaseClient.from("subscribers").upsert({
      email: user.email,
      user_id: user.id,
      stripe_customer_id: customerId,
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: "email" });

    logStep("Updated database with subscription info", { subscribed: hasActiveSub, subscriptionTier });
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });

    // Last-resort fallback: try to read cached subscriber row by auth header
    try {
      const authHeader = req.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabaseClient.auth.getUser(token);
        if (userData?.user) {
          const { data: cached } = await supabaseClient
            .from("subscribers")
            .select("subscribed, subscription_tier, subscription_end")
            .eq("user_id", userData.user.id)
            .maybeSingle();
          if (cached) {
            return new Response(JSON.stringify({
              subscribed: Boolean(cached.subscribed),
              subscription_tier: cached.subscription_tier ?? null,
              subscription_end: cached.subscription_end ?? null,
              stale: true,
            }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            });
          }
        }
      }
    } catch (_fallbackErr) {
      // ignore — fall through to error response
    }

    return new Response(JSON.stringify({ error: "Unable to check subscription status." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});