import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data: due, error } = await supabase
    .from('email_schedule')
    .select('id, user_id, email, template_name, attempts')
    .is('sent_at', null)
    .lte('send_at', new Date().toISOString())
    .lt('attempts', 5)
    .limit(50)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let sent = 0
  let failed = 0

  for (const row of due ?? []) {
    try {
      // Day-1 abandonment: skip if the user has already started any activity.
      if (row.template_name === 'day-1-abandonment') {
        const { count, error: countErr } = await supabase
          .from('analytics_events')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', row.user_id)
          .eq('event', 'activity_started')
        if (countErr) throw new Error(countErr.message)
        if ((count ?? 0) > 0) {
          await supabase
            .from('email_schedule')
            .update({ sent_at: new Date().toISOString(), last_error: 'skipped: user activated' })
            .eq('id', row.id)
          continue
        }
      }

      // Paywall abandon: skip if the user has subscribed since enrolling.
      if (row.template_name === 'paywall-abandon') {
        const { data: sub } = await supabase
          .from('subscribers')
          .select('subscribed')
          .eq('user_id', row.user_id)
          .maybeSingle()
        if (sub?.subscribed) {
          await supabase
            .from('email_schedule')
            .update({ sent_at: new Date().toISOString(), last_error: 'skipped: user subscribed' })
            .eq('id', row.id)
          continue
        }
      }

      // Fetch name for personalization
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('user_id', row.user_id)
        .maybeSingle()

      const { error: invokeError } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: row.template_name,
          recipientEmail: row.email,
          idempotencyKey: `onboarding-${row.id}`,
          templateData: { name: profile?.full_name?.split(' ')[0] ?? null },
        },
      })

      if (invokeError) throw new Error(invokeError.message)

      await supabase
        .from('email_schedule')
        .update({ sent_at: new Date().toISOString(), attempts: row.attempts + 1 })
        .eq('id', row.id)
      sent++
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      await supabase
        .from('email_schedule')
        .update({ attempts: row.attempts + 1, last_error: msg })
        .eq('id', row.id)
      failed++
    }
  }

  return new Response(JSON.stringify({ processed: due?.length ?? 0, sent, failed }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
