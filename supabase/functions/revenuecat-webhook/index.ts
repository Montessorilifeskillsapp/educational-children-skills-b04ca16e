// Server-to-server webhook from RevenueCat.
// Configure in RevenueCat dashboard:
//   URL: https://<project>.supabase.co/functions/v1/revenuecat-webhook
//   Authorization header: <value of REVENUECAT_WEBHOOK_AUTH>
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const ENTITLEMENT_ID = "pro";

interface RcEvent {
  type: string;
  app_user_id?: string;
  original_app_user_id?: string;
  product_id?: string;
  expiration_at_ms?: number | null;
  store?: string;
  environment?: string;
}

interface RcPayload {
  event?: RcEvent;
  api_version?: string;
}

const tierFromProduct = (productId?: string | null) =>
  productId?.includes("annual") ? "Premium Annual"
    : productId?.includes("consultation") ? "Consultation"
    : productId ? "Premium" : null;

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const expected = Deno.env.get("REVENUECAT_WEBHOOK_AUTH");
  const got = req.headers.get("Authorization");
  if (!expected || got !== expected) {
    console.warn("[rc-webhook] auth mismatch");
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = (await req.json()) as RcPayload;
  const event = payload.event;
  if (!event) return new Response("No event", { status: 400 });

  console.log("[rc-webhook] event", event.type, event.app_user_id, event.product_id);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  const userId = event.app_user_id ?? event.original_app_user_id;
  if (!userId) return new Response("No app_user_id", { status: 400 });

  // Translate event type into subscribed/expiry
  const grantingEvents = new Set([
    "INITIAL_PURCHASE", "RENEWAL", "PRODUCT_CHANGE", "UNCANCELLATION",
    "NON_RENEWING_PURCHASE", "TEMPORARY_ENTITLEMENT_GRANT",
  ]);
  const revokingEvents = new Set([
    "EXPIRATION", "CANCELLATION", "SUBSCRIPTION_PAUSED",
  ]);

  const isGranting = grantingEvents.has(event.type);
  const isRevoking = revokingEvents.has(event.type);
  if (!isGranting && !isRevoking) {
    // Acknowledge non-actionable events (BILLING_ISSUE, TRANSFER, etc.)
    return new Response("ok", { status: 200 });
  }

  const subscriptionEnd = event.expiration_at_ms
    ? new Date(event.expiration_at_ms).toISOString()
    : null;

  // Look up the subscriber row by user_id (RC app_user_id = supabase user id)
  const { data: existing } = await supabase
    .from("subscribers")
    .select("email, user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!existing) {
    console.warn("[rc-webhook] no subscriber row for user_id", userId);
    return new Response("ok", { status: 200 });
  }

  await supabase.from("subscribers").upsert(
    {
      email: existing.email,
      user_id: userId,
      provider: "revenuecat",
      platform: event.store === "PLAY_STORE" ? "android" : event.store === "APP_STORE" ? "ios" : "mobile",
      subscribed: isGranting,
      subscription_tier: isGranting ? tierFromProduct(event.product_id) : null,
      subscription_end: subscriptionEnd,
      revenuecat_app_user_id: userId,
      revenuecat_entitlement: isGranting ? ENTITLEMENT_ID : null,
      revenuecat_product_id: event.product_id ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );

  return new Response("ok", { status: 200 });
});
