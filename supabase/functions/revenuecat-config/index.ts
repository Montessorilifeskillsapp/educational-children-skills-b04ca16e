// Returns the *public* RevenueCat SDK keys to the mobile app.
// These are designed to be embedded in client binaries.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve((req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  return new Response(
    JSON.stringify({
      ios: Deno.env.get("REVENUECAT_IOS_API_KEY") ?? null,
      android: Deno.env.get("REVENUECAT_ANDROID_API_KEY") ?? null,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
