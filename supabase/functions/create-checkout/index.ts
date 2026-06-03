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
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

class CheckoutError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const PLAN_CONFIG = {
  premium: {
    productName: "Premium Monthly Plan",
    unitAmount: 2900,
    interval: "month" as const,
  },
  "premium-monthly": {
    productName: "Premium Monthly Plan",
    unitAmount: 2900,
    interval: "month" as const,
  },
  "premium-yearly": {
    productName: "Premium Annual Plan",
    unitAmount: 19900,
    interval: "year" as const,
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use the service role key to bypass RLS for secure writes
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new CheckoutError("Stripe is not configured.", 500);
    logStep("Stripe key verified");

    // Auth is OPTIONAL — guests can check out, then create an account afterwards.
    const authHeader = req.headers.get("Authorization");
    let user: { id: string; email: string } | null = null;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
      if (!userError && userData.user?.email) {
        user = { id: userData.user.id, email: userData.user.email };
        logStep("User authenticated", { userId: user.id, email: user.email });
      } else {
        logStep("Auth header present but invalid — proceeding as guest");
      }
    } else {
      logStep("No auth header — guest checkout");
    }

    const { planId } = await req.json();
    const normalizedPlanId = typeof planId === "string" ? planId : "";
    const selectedPlan = PLAN_CONFIG[normalizedPlanId as keyof typeof PLAN_CONFIG];

    if (!selectedPlan) {
      throw new CheckoutError("Invalid plan selected.", 400);
    }

    logStep("Request data parsed", { planId: normalizedPlanId, guest: !user });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    let customerId: string | undefined;
    if (user?.email) {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Existing customer found", { customerId });
      }
    }

    const ALLOWED_ORIGINS = [
      "https://montessorilifeskillsapp.com",
      "https://educational-children-skills.lovable.app",
      "https://id-preview--cad132a6-4b28-41b0-93d9-ba4b9938bbc8.lovable.app",
      "http://localhost:3000",
    ];
    const requestOrigin = req.headers.get("origin") || "";
    const origin = ALLOWED_ORIGINS.includes(requestOrigin)
      ? requestOrigin
      : (Deno.env.get("SITE_URL") ?? ALLOWED_ORIGINS[0]);
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId || !user ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: selectedPlan.productName },
            unit_amount: selectedPlan.unitAmount,
            recurring: { interval: selectedPlan.interval },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&planId=${encodeURIComponent(normalizedPlanId)}`,
      cancel_url: `${origin}/payment-cancel?planId=${encodeURIComponent(normalizedPlanId)}`,
      metadata: {
        planId: normalizedPlanId,
        ...(user ? { userId: user.id } : { guest: "true" }),
      },
      subscription_data: {
        metadata: {
          planId: normalizedPlanId,
          ...(user ? { userId: user.id } : { guest: "true" }),
        },
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    const status = error instanceof CheckoutError ? error.status : 500;
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status,
    });
  }
});