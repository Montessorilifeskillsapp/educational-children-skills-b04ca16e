import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const UUID = /^[0-9a-f-]{36}$/i;

// The parent chooses which children are included in their membership, within their allowance.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return json({ error: "Please sign in." }, 401);

    const body = await req.json().catch(() => ({}));
    const ids: unknown = body?.childIds;
    if (!Array.isArray(ids) || ids.some((i) => typeof i !== "string" || !UUID.test(i))) {
      return json({ error: "Invalid children." }, 400);
    }
    const chosen = [...new Set(ids as string[])];

    const { data: allowance } = await admin.rpc("child_allowance", { _user_id: user.id });
    if (chosen.length > Number(allowance ?? 1)) {
      return json({ error: `Your plan covers ${allowance} ${allowance === 1 ? "child" : "children"}.` }, 400);
    }

    const { data: kids, error } = await admin.from("child_profiles").select("id").eq("user_id", user.id);
    if (error) throw error;
    const owned = new Set((kids ?? []).map((k) => k.id));
    if (chosen.some((id) => !owned.has(id))) return json({ error: "Invalid children." }, 400);

    for (const k of kids ?? []) {
      await admin.from("child_profiles").update({ is_covered: chosen.includes(k.id) }).eq("id", k.id);
    }
    return json({ covered: chosen });
  } catch (e) {
    console.error("[set-covered-children]", e);
    return json({ error: "Could not save your choice. Please try again." }, 500);
  }
});
