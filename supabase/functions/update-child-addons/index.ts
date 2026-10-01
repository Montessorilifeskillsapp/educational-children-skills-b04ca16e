import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { ADDON_PRODUCT_NAME, MAX_ADDONS, addonCentsFor, isAddonItem, findAddonOnlySubscription } from "../_shared/childAddons.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user?.email) return json({ error: "Please sign in." }, 401);

    const body = await req.json().catch(() => ({}));
    const quantity = Number(body?.quantity);
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > MAX_ADDONS) {
      return json({ error: `Choose between 0 and ${MAX_ADDONS} extra children.` }, 400);
    }

    const { data: row } = await admin.from("subscribers").select("provider").eq("user_id", user.id).maybeSingle();
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });

    // App-store members: Premium stays with Apple/Google; add-ons are a separate website subscription.
    if (row?.provider && row.provider !== "stripe") {
      const { data: allowanceRow } = await admin.from("subscribers").select("subscribed, subscription_end").eq("user_id", user.id).maybeSingle();
      const active = allowanceRow?.subscribed && (!allowanceRow.subscription_end || new Date(allowanceRow.subscription_end).getTime() > Date.now());
      if (!active) return json({ error: "An active Premium plan is needed before adding extra children." }, 400);

      const { customer, sub } = await findAddonOnlySubscription(stripe, user.email);
      const item = sub?.items.data.find(isAddonItem);
      if (sub && item) {
        if (quantity === 0) await stripe.subscriptions.cancel(sub.id, { prorate: true });
        else await stripe.subscriptionItems.update(item.id, { quantity, proration_behavior: "create_prorations" });
      } else if (quantity > 0) {
        const allowed = ["https://montessorilifeskillsapp.com", "https://educational-children-skills.lovable.app", "https://id-preview--cad132a6-4b28-41b0-93d9-ba4b9938bbc8.lovable.app"];
        const reqOrigin = req.headers.get("origin") ?? "";
        const origin = allowed.includes(reqOrigin) ? reqOrigin : allowed[0];
        const session = await stripe.checkout.sessions.create({
          mode: "subscription",
          customer: customer?.id,
          customer_email: customer ? undefined : user.email,
          line_items: [{
            price_data: { currency: "usd", product_data: { name: ADDON_PRODUCT_NAME }, unit_amount: addonCentsFor("month"), recurring: { interval: "month" } },
            quantity,
          }],
          success_url: `${origin}/?addons=success`,
          cancel_url: `${origin}/`,
          metadata: { kind: "child_addons", userId: user.id },
          subscription_data: { metadata: { kind: "child_addons", userId: user.id } },
        });
        return json({ url: session.url });
      }
      await admin.from("subscribers").update({ child_addons: quantity, updated_at: new Date().toISOString() }).eq("user_id", user.id);
      await admin.rpc("reconcile_child_coverage", { _user_id: user.id });
      return json({ child_addons: quantity, child_allowance: 1 + quantity });
    }

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customer = customers.data[0];
    const subs = customer ? await stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 1 }) : null;
    const sub = subs?.data[0];
    if (!sub) return json({ error: "An active Premium plan is needed before adding extra children." }, 400);

    const addon = sub.items.data.find(isAddonItem);
    const base = sub.items.data.find((i) => !isAddonItem(i));
    const interval = base?.price?.recurring?.interval ?? "month";

    if (quantity === 0 && addon) {
      await stripe.subscriptionItems.del(addon.id, { proration_behavior: "create_prorations" });
    } else if (quantity > 0 && addon) {
      await stripe.subscriptionItems.update(addon.id, { quantity, proration_behavior: "create_prorations" });
    } else if (quantity > 0) {
      const product = await stripe.products.create({ name: ADDON_PRODUCT_NAME });
      await stripe.subscriptionItems.create({
        subscription: sub.id,
        quantity,
        proration_behavior: "create_prorations",
        price_data: { currency: "usd", product: product.id, unit_amount: addonCentsFor(interval), recurring: { interval: interval as "month" | "year" } },
      });
    }

    await admin.from("subscribers").update({ child_addons: quantity, updated_at: new Date().toISOString() }).eq("user_id", user.id);
    await admin.rpc("reconcile_child_coverage", { _user_id: user.id });
    return json({ child_addons: quantity, child_allowance: 1 + quantity });
  } catch (e) {
    console.error("[update-child-addons]", e);
    return json({ error: "Could not update extra children. Please try again." }, 500);
  }
});
