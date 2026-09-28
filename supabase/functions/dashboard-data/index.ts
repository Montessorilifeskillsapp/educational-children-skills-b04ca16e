import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.23.8'
import { buildWeeklyReport, startOfWeek } from '../_shared/weeklyReport.ts'

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

const Body = z.discriminatedUnion('action', [
  z.object({ action: z.literal('prefs_save'), prefs: z.object({
    timezone: z.string().max(64).optional(),
    daily_reminder: z.boolean().optional(),
    daily_reminder_time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    weekly_report: z.boolean().optional(),
    weekly_report_day: z.number().int().min(0).max(6).optional(),
    goal_alerts: z.boolean().optional(),
    activity_reminders: z.boolean().optional(),
    activity_reminder_minutes: z.number().int().min(5).max(1440).optional(),
    email_enabled: z.boolean().optional(),
    push_enabled: z.boolean().optional(),
  }) }),
  z.object({ action: z.literal('goal_save'), goal: z.object({
    id: z.string().uuid().optional(), child_id: z.string().uuid(), title: z.string().min(1).max(200),
    area: z.string().max(64).nullable().optional(), skill_ids: z.array(z.string().max(120)).max(200),
    priority: z.number().int().min(1).max(3), target_date: z.string().nullable().optional(),
    status: z.enum(['active', 'done', 'archived']).optional(),
  }) }),
  z.object({ action: z.literal('goal_delete'), id: z.string().uuid() }),
  z.object({ action: z.literal('goal_reorder'), ids: z.array(z.string().uuid()).max(200) }),
  z.object({ action: z.literal('event_save'), event: z.object({
    id: z.string().uuid().optional(), child_id: z.string().uuid(), skill_id: z.string().min(1).max(120),
    title: z.string().min(1).max(200), starts_at: z.string(), duration_minutes: z.number().int().min(5).max(240),
    notes: z.string().max(1000).nullable().optional(), completed: z.boolean().optional(),
  }) }),
  z.object({ action: z.literal('event_delete'), id: z.string().uuid() }),
  z.object({ action: z.literal('push_register'), token: z.string().min(10).max(4096), platform: z.enum(['ios', 'android', 'web']) }),
  z.object({ action: z.literal('push_unregister'), token: z.string().min(10).max(4096) }),
  z.object({ action: z.literal('report_generate'), child_id: z.string().uuid() }),
])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const auth = req.headers.get('Authorization') ?? ''
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: u, error: ue } = await admin.auth.getUser(auth.replace(/^Bearer\s+/i, ''))
    if (ue || !u.user) return json({ error: 'Unauthorized' }, 401)
    const uid = u.user.id

    const parsed = Body.safeParse(await req.json())
    if (!parsed.success) return json({ error: parsed.error.flatten() }, 400)
    const b = parsed.data

    const ownsChild = async (childId: string) => {
      const { data } = await admin.from('child_profiles').select('id').eq('id', childId).eq('user_id', uid).maybeSingle()
      return !!data
    }

    switch (b.action) {
      case 'prefs_save': {
        const { error } = await admin.from('notification_preferences').upsert({ user_id: uid, ...b.prefs })
        if (error) throw error
        return json({ ok: true })
      }
      case 'goal_save': {
        if (!(await ownsChild(b.goal.child_id))) return json({ error: 'Forbidden' }, 403)
        const row = { ...b.goal, user_id: uid }
        const q = b.goal.id
          ? admin.from('child_goals').update(row).eq('id', b.goal.id).eq('user_id', uid)
          : admin.from('child_goals').insert(row)
        const { data, error } = await q.select().single()
        if (error) throw error
        return json({ goal: data })
      }
      case 'goal_delete': {
        const { error } = await admin.from('child_goals').delete().eq('id', b.id).eq('user_id', uid)
        if (error) throw error
        return json({ ok: true })
      }
      case 'goal_reorder': {
        for (let i = 0; i < b.ids.length; i++) {
          await admin.from('child_goals').update({ sort_order: i }).eq('id', b.ids[i]).eq('user_id', uid)
        }
        return json({ ok: true })
      }
      case 'event_save': {
        if (!(await ownsChild(b.event.child_id))) return json({ error: 'Forbidden' }, 403)
        const starts = new Date(b.event.starts_at)
        if (isNaN(starts.getTime())) return json({ error: 'Invalid date' }, 400)
        const row = { ...b.event, starts_at: starts.toISOString(), user_id: uid }
        const q = b.event.id
          ? admin.from('calendar_events').update({ ...row, reminder_sent: false }).eq('id', b.event.id).eq('user_id', uid)
          : admin.from('calendar_events').insert(row)
        const { data, error } = await q.select().single()
        if (error) throw error
        if (b.event.completed) {
          await admin.from('skill_progress').upsert({
            child_id: b.event.child_id, skill_id: b.event.skill_id, skill_category: 'general',
            completed: true, completed_at: starts.toISOString(),
          }, { onConflict: 'child_id,skill_id', ignoreDuplicates: true })
        }
        return json({ event: data })
      }
      case 'event_delete': {
        const { error } = await admin.from('calendar_events').delete().eq('id', b.id).eq('user_id', uid)
        if (error) throw error
        return json({ ok: true })
      }
      case 'push_register': {
        const { error } = await admin.from('push_tokens').upsert({ user_id: uid, token: b.token, platform: b.platform }, { onConflict: 'token' })
        if (error) throw error
        return json({ ok: true })
      }
      case 'push_unregister': {
        await admin.from('push_tokens').delete().eq('token', b.token).eq('user_id', uid)
        return json({ ok: true })
      }
      case 'report_generate': {
        if (!(await ownsChild(b.child_id))) return json({ error: 'Forbidden' }, 403)
        const ws = startOfWeek()
        const summary = await buildWeeklyReport(admin, b.child_id, ws)
        const { data, error } = await admin.from('weekly_reports')
          .upsert({ child_id: b.child_id, user_id: uid, week_start: summary.week_start, summary }, { onConflict: 'child_id,week_start' })
          .select().single()
        if (error) throw error
        return json({ report: data })
      }
    }
  } catch (e) {
    console.error('dashboard-data error', e)
    return json({ error: e instanceof Error ? e.message : 'Server error' }, 500)
  }
})
