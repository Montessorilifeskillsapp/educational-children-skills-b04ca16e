// Called by the mobile app right after a successful RevenueCat purchase.
// Mirrors the entitlement into our `subscribers` table so the rest of the app
// (check-subscription, gating) sees the new access without waiting for the webhook.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ENTITLEMENT_ID = "pro";

interface SyncBody {
  customerInfo?: {
    entitlements?: {
      active?: Record<string, {
        productIdentifier?: string;
        expirationDate?: string | null;
        store?: string;
      }>;
    };
    activeSubscriptions?: string[];
    allExpirationDates?: Record<string, string | null>;
    allExpirationDatesMillis?: Record<string, number | null>;
    nonSubscriptionTransactions?: Array<{ productId?: string; productIdentifier?: string }>;
  };
  platform?: string;
  productId?: string;
}

const KNOWN_SUBSCRIPTION_PRODUCTS = new Set(["premium_monthly", "premium_annual", "family_monthly", "family_annual"]);
const KNOWN_ONE_TIME_PRODUCTS = new Set(["consultation_session"]);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
    if (userErr || !userData.user) throw new Error("Not authenticated");
    const user = userData.user;

    const body = (await req.json()) as SyncBody;
    const ci = body.customerInfo ?? {};
    const entitlement = ci.entitlements?.active?.[ENTITLEMENT_ID];
    const allActive = ci.activeSubscriptions ?? [];
    const isAddon = (id?: string | null) => Boolean(id && /^child_addon_(monthly|annual)_\d+$/.test(id));
    // Extra-child add-ons never count as Premium; they only raise the child allowance.
    const activeSubs = allActive.filter((p) => !isAddon(p));
    const storeAddons = new Set(allActive.filter(isAddon));
    if (isAddon(body.productId)) storeAddons.add(body.productId as string);
    const purchasedProductId = isAddon(body.productId) ? null : body.productId ?? null;

    // Determine subscribed state with fallbacks in case the RevenueCat
    // dashboard doesn't have the "pro" entitlement wired to the product yet.
    let subscribed = Boolean(entitlement);
    let productId = entitlement?.productIdentifier ?? null;
    let subscriptionEnd: string | null = entitlement?.expirationDate ?? null;

    if (!subscribed && activeSubs.length > 0) {
      subscribed = true;
      productId = activeSubs.find((p) => KNOWN_SUBSCRIPTION_PRODUCTS.has(p)) ?? activeSubs[0];
    }

    if (
      !subscribed &&
      purchasedProductId &&
      KNOWN_SUBSCRIPTION_PRODUCTS.has(purchasedProductId)
    ) {
      // Purchase call succeeded for a known subscription product; trust it.
      subscribed = true;
      productId = purchasedProductId;
    }

    if (!subscriptionEnd && productId) {
      const raw =
        ci.allExpirationDates?.[productId] ??
        (ci.allExpirationDatesMillis?.[productId]
          ? new Date(ci.allExpirationDatesMillis[productId] as number).toISOString()
          : null);
      subscriptionEnd = raw ?? null;
    }

    const tier = productId?.startsWith("family_")
      ? (productId.includes("annual") ? "Family Annual" : "Family Monthly")
      : productId?.includes("annual")
      ? "Premium Annual"
      : productId && KNOWN_SUBSCRIPTION_PRODUCTS.has(productId)
        ? "Premium Monthly"
        : productId
          ? null
          : null;

    // A missing RevenueCat entitlement must not revoke access granted by an
    // access code or an administrator. Those providers are independent of IAP.
    if (!subscribed) {
      const { data: existing } = await supabaseAdmin
        .from("subscribers")
        .select("provider, subscribed, subscription_tier, subscription_end")
        .eq("user_id", user.id)
        .maybeSingle();
      // Website (Stripe) Premium is independent of the store too: only record store add-ons.
      const independentlyGranted = existing?.provider === "access_code" || existing?.provider === "manual" || existing?.provider === "stripe";
      const stillActive = existing?.subscription_end
        ? new Date(existing.subscription_end).getTime() > Date.now()
        : Boolean(existing?.subscribed);

      if (independentlyGranted && stillActive) {
        await supabaseAdmin.from("subscribers").update({ store_child_addons: storeAddons.size, updated_at: new Date().toISOString() }).eq("user_id", user.id);
        await supabaseAdmin.rpc("reconcile_child_coverage", { _user_id: user.id });
        return new Response(JSON.stringify({
          ok: true,
          subscribed: true,
          subscription_tier: existing.subscription_tier,
          provider: existing.provider,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const { data: current } = await supabaseAdmin.from("subscribers")
      .select("provider, subscribed, subscription_tier, subscription_end")
      .eq("user_id", user.id).maybeSingle();
    const currentStripeActive = current?.provider === "stripe" && Boolean(current.subscribed) &&
      (!current.subscription_end || new Date(current.subscription_end).getTime() > Date.now());
    const currentIsFamily = String(current?.subscription_tier ?? "").toLowerCase().startsWith("family");
    const incomingIsFamily = String(tier ?? "").toLowerCase().startsWith("family");
    const preserveStripe = currentStripeActive && (currentIsFamily || !incomingIsFamily);

    await supabaseAdmin.from("subscribers").upsert(
      {
        email: user.email,
        user_id: user.id,
        provider: preserveStripe ? "stripe" : subscribed ? "revenuecat" : (current?.provider ?? "revenuecat"),
        platform: body.platform ?? "mobile",
        subscribed: currentStripeActive || subscribed,
        subscription_tier: preserveStripe ? current?.subscription_tier : tier,
        subscription_end: preserveStripe ? current?.subscription_end : subscriptionEnd,
        revenuecat_app_user_id: user.id,
        revenuecat_entitlement: subscribed ? ENTITLEMENT_ID : null,
        revenuecat_product_id: productId ?? purchasedProductId ?? null,
        store_child_addons: storeAddons.size,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    await supabaseAdmin.rpc("reconcile_child_coverage", { _user_id: user.id });

    return new Response(JSON.stringify({ ok: true, subscribed, subscription_tier: tier, store_child_addons: storeAddons.size }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[revenuecat-sync]", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
