import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { ADDON_EXPAND, isAddonItem, findAddonOnlySubscription } from "../_shared/childAddons.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Helper logging function for debugging
const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

const getSubscriptionTier = (amount: number, interval?: string | null, productName?: string | null, planId?: string | null) => {
  const identity = `${planId ?? ""} ${productName ?? ""}`.toLowerCase();
  if (identity.includes("family")) return interval === "year" ? "Family Annual" : "Family Monthly";
  if (identity.includes("premium")) return interval === "year" ? "Premium Annual" : "Premium Monthly";
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

    // If this user's access came from a non-Stripe source (mobile IAP via RevenueCat,
    // a redeemed access code, or a manual grant), trust the cached row.
    // Stripe has no record of these entitlements.
    const NON_STRIPE_PROVIDERS = ["revenuecat", "access_code", "manual"];

    const { data: existingRow } = await supabaseClient
      .from("subscribers")
      .select("provider, subscribed, subscription_tier, subscription_end, child_addons, store_child_addons")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingRow?.provider && NON_STRIPE_PROVIDERS.includes(existingRow.provider)) {
      const stillActive = existingRow.subscription_end
        ? new Date(existingRow.subscription_end).getTime() > Date.now()
        : Boolean(existingRow.subscribed);
      logStep("Honoring non-Stripe entitlement", { provider: existingRow.provider, stillActive });
      // Extra-child add-ons bought on the website live in a separate add-on-only Stripe subscription.
      let addons = existingRow.child_addons ?? 0;
      try {
        const stripeNs = new Stripe(stripeKey, { apiVersion: "2023-10-16", maxNetworkRetries: 1 });
        const { sub } = await findAddonOnlySubscription(stripeNs, user.email);
        const qty = sub?.items.data.find(isAddonItem)?.quantity ?? 0;
        if (qty !== addons) {
          addons = qty;
          await supabaseClient.from("subscribers").update({ child_addons: qty, updated_at: new Date().toISOString() }).eq("user_id", user.id);
        }
      } catch (e) {
        logStep("Add-on lookup failed, keeping cached add-ons", { message: e instanceof Error ? e.message : String(e) });
      }
      existingRow.child_addons = addons;
      await supabaseClient.rpc("reconcile_child_coverage", { _user_id: user.id });
      const active = stillActive && Boolean(existingRow.subscribed);
      return new Response(JSON.stringify({
        subscribed: active,
        subscription_tier: existingRow.subscription_tier ?? null,
        subscription_end: existingRow.subscription_end ?? null,
        provider: existingRow.provider,
        child_addons: (existingRow.child_addons ?? 0) + (existingRow.store_child_addons ?? 0),
        website_child_addons: existingRow.child_addons ?? 0,
        store_child_addons: existingRow.store_child_addons ?? 0,
        child_allowance: active && String(existingRow.subscription_tier ?? "").toLowerCase().startsWith("family")
          ? 4 : 1 + (active ? (existingRow.child_addons ?? 0) + (existingRow.store_child_addons ?? 0) : 0),
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }



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
      await supabaseClient.rpc("reconcile_child_coverage", { _user_id: user.id });
      return new Response(JSON.stringify({ subscribed: false, subscription_tier: null, subscription_end: null, child_addons: 0, child_allowance: 1 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 10,
      expand: ADDON_EXPAND,
    });
    // Prefer a Family base subscription when overlapping legacy subscriptions
    // temporarily coexist; otherwise use the newest active base subscription.
    const baseSubscriptions = subscriptions.data
      .filter((s) => s.items.data.some((i) => !isAddonItem(i)))
      .sort((a, b) => b.created - a.created);
    const productIdentity = (s: typeof baseSubscriptions[number]) => {
      const item = s.items.data.find((i) => !isAddonItem(i));
      const product = item?.price?.product;
      return `${s.metadata?.planId ?? ""} ${product && typeof product === "object" ? `${product.name ?? ""} ${product.metadata?.plan_id ?? ""}` : ""}`.toLowerCase();
    };
    const premiumSub = baseSubscriptions.find((s) => productIdentity(s).includes("family")) ?? baseSubscriptions[0];
    const hasActiveSub = Boolean(premiumSub);
    let subscriptionTier = null;
    let subscriptionEnd = null;
    let childAddons = 0;

    if (premiumSub) {
      const subscription = premiumSub;
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd });

      // Premium item decides the tier; extra-child add-on items set the child allowance.
      const addonItem = subscription.items.data.find(isAddonItem);
      childAddons = addonItem?.quantity ?? 0;
      const baseItem = subscription.items.data.find((i) => !isAddonItem(i));
      const interval = baseItem?.price?.recurring?.interval;
      const product = baseItem?.price?.product;
      const productName = product && typeof product === "object" ? product.name : null;
      const planId = product && typeof product === "object" ? product.metadata?.plan_id : subscription.metadata?.planId;
      subscriptionTier = getSubscriptionTier(baseItem?.price?.unit_amount || 0, interval, productName, planId);
      logStep("Determined subscription tier", { interval, subscriptionTier, childAddons });
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
      child_addons: childAddons,
      provider: "stripe",
      updated_at: new Date().toISOString(),
    }, { onConflict: "email" });
    await supabaseClient.rpc("reconcile_child_coverage", { _user_id: user.id });

    // Extra children bought inside the phone app are counted too.
    const storeAddons = existingRow?.store_child_addons ?? 0;
    logStep("Updated database with subscription info", { subscribed: hasActiveSub, subscriptionTier });
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      child_addons: childAddons + storeAddons,
      website_child_addons: childAddons,
      store_child_addons: storeAddons,
      child_allowance: hasActiveSub && String(subscriptionTier ?? "").toLowerCase().startsWith("family")
        ? 4 : 1 + (hasActiveSub ? childAddons + storeAddons : 0),
      provider: "stripe",
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