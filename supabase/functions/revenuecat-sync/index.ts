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

const KNOWN_SUBSCRIPTION_PRODUCTS = new Set(["premium_monthly", "premium_annual"]);
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
    const activeSubs = ci.activeSubscriptions ?? [];
    const purchasedProductId = body.productId ?? null;

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

    const tier = productId?.includes("annual")
      ? "Premium Annual"
      : productId && KNOWN_SUBSCRIPTION_PRODUCTS.has(productId)
        ? "Premium"
        : productId
          ? null
          : null;

    await supabaseAdmin.from("subscribers").upsert(
      {
        email: user.email,
        user_id: user.id,
        provider: subscribed ? "revenuecat" : "stripe",
        platform: body.platform ?? "mobile",
        subscribed,
        subscription_tier: tier,
        subscription_end: subscriptionEnd,
        revenuecat_app_user_id: user.id,
        revenuecat_entitlement: subscribed ? ENTITLEMENT_ID : null,
        revenuecat_product_id: productId ?? purchasedProductId ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    return new Response(JSON.stringify({ ok: true, subscribed, subscription_tier: tier }), {
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
