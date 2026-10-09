import { createClient } from 'npm:@supabase/supabase-js@2';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const email = 'applereview2@montessorilifeskillsapp.com';
  const password = 'AppleReview2026!';

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Apple Reviewer 2' },
  });

  if (createErr && !`${createErr.message}`.toLowerCase().includes('already')) {
    return new Response(JSON.stringify({ error: createErr.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let userId = created?.user?.id;
  if (!userId) {
    const { data: list } = await admin.auth.admin.listUsers();
    userId = list.users.find((u) => u.email === email)?.id;
  }

  if (userId) {
    // Grant premium access for review
    await admin.from('subscribers').upsert({
      user_id: userId,
      email,
      subscribed: true,
      subscription_tier: 'premium-yearly',
      subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      provider: 'manual',
    }, { onConflict: 'user_id' });

    // Demo child with sample progress/goals so recordings show a lived-in dashboard.
    const { data: kids } = await admin.from('child_profiles').select('id').eq('user_id', userId).limit(1);
    let childId = kids?.[0]?.id as string | undefined;
    if (!childId) {
      const dob = new Date(Date.now() - 4 * 365.25 * 864e5).toISOString().slice(0, 10);
      const { data: child } = await admin.from('child_profiles')
        .insert({ user_id: userId, name: 'Olivia', date_of_birth: dob, is_covered: true })
        .select('id').single();
      childId = child?.id;
    }
    if (childId) {
      const done = [
        ['pouring-water', 'practical-life'], ['spooning', 'practical-life'],
        ['pink-tower', 'sensorial'], ['sandpaper-letters', 'language'],
      ];
      for (const [skill_id, skill_category] of done) {
        await admin.from('skill_progress').upsert({
          child_id: childId, skill_id, skill_category, completed: true,
          completed_at: new Date(Date.now() - Math.random() * 10 * 864e5).toISOString(),
        }, { onConflict: 'child_id,skill_id' });
      }
      const { count } = await admin.from('child_goals').select('id', { count: 'exact', head: true }).eq('child_id', childId);
      if (!count) {
        await admin.from('child_goals').insert([
          { child_id: childId, user_id: userId, title: 'Independent pouring', area: 'practical-life', skill_ids: ['pouring-water', 'spooning'], priority: 1, sort_order: 0, status: 'active' },
          { child_id: childId, user_id: userId, title: 'Early sound recognition', area: 'language', skill_ids: ['sandpaper-letters'], priority: 2, sort_order: 1, status: 'active' },
        ]);
      }
      const start = new Date(); start.setDate(start.getDate() + 1); start.setHours(9, 30, 0, 0);
      await admin.from('calendar_events').insert({
        child_id: childId, user_id: userId, skill_id: 'pink-tower', title: 'Pink Tower', starts_at: start.toISOString(), duration_minutes: 20,
      });
    }
  }

  return new Response(JSON.stringify({ ok: true, email, password, userId }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
