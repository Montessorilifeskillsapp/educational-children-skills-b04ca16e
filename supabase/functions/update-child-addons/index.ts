import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { ADDON_PRODUCT_NAME, MAX_ADDONS, addonCentsFor, isAddonItem } from "../_shared/childAddons.ts";

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
    if (row?.provider && row.provider !== "stripe") {
      return json({ error: "Extra children can be added on the website once you have a website Premium plan." }, 400);
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
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
