// Hourly job (pg_cron): daily reminders, scheduled-activity reminders, goal alerts
// and weekly reports. Guarded by the shared cron secret. Bounded per run; idempotent
// through last_*_sent / *_notified / reminder_sent markers.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendPushToUser } from '../_shared/push.ts'
import { buildWeeklyReport, startOfWeek } from '../_shared/weeklyReport.ts'

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret' }
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } })

function local(tz: string, d = new Date()) {
  try {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, weekday: 'short',
    }).formatToParts(d).map((x) => [x.type, x.value]))
    const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday)
    return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour) % 24, weekday: wd }
  } catch { return local('UTC', d) }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const { data: secret } = await admin.rpc('internal_get_secret', { p_name: 'cron_secret' })
  if (!secret || req.headers.get('x-cron-secret') !== secret) return json({ error: 'forbidden' }, 403)

  const stats = { daily: 0, activity: 0, goals: 0, weekly: 0 }
  const { data: prefsRows } = await admin.from('notification_preferences').select('*').limit(1000)
  const prefsMap = new Map((prefsRows ?? []).map((p: any) => [p.user_id, p]))
  const defaults = { timezone: 'UTC', daily_reminder: true, daily_reminder_time: '09:00', weekly_report: true, weekly_report_day: 0,
    goal_alerts: true, activity_reminders: true, activity_reminder_minutes: 30, email_enabled: true, push_enabled: true }

  const emailCache = new Map<string, string | null>()
  const emailOf = async (uid: string) => {
    if (!emailCache.has(uid)) {
      const { data } = await admin.from('user_profiles').select('email').eq('user_id', uid).maybeSingle()
      emailCache.set(uid, data?.email ?? null)
    }
    return emailCache.get(uid)
  }
  const notify = async (uid: string, prefs: any, title: string, body: string, key: string) => {
    if (prefs.push_enabled) await sendPushToUser(admin, uid, title, body).catch((e) => console.error('push', e))
    if (prefs.email_enabled) {
      const to = await emailOf(uid)
      if (to) {
        const { error } = await admin.functions.invoke('send-transactional-email', {
          body: { templateName: 'family-notice', recipientEmail: to, idempotencyKey: key, templateData: { title, body } },
        })
        if (error) console.error('email', key, error)
      }
    }
  }

  // Parents who have children
  const { data: kids } = await admin.from('child_profiles').select('id, name, user_id').not('user_id', 'is', null).limit(2000)
  const byUser = new Map<string, { id: string; name: string }[]>()
  for (const k of kids ?? []) byUser.set(k.user_id, [...(byUser.get(k.user_id) ?? []), k])

  for (const [uid, children] of byUser) {
    const prefs = { ...defaults, ...(prefsMap.get(uid) ?? {}) }
    const l = local(prefs.timezone)
    const patch: Record<string, string> = {}

    // Daily reminder at the chosen local hour
    if (prefs.daily_reminder && l.hour === Number(prefs.daily_reminder_time.slice(0, 2)) && prefs.last_daily_sent !== l.date) {
      const names = children.map((c) => c.name).join(' and ')
      await notify(uid, prefs, 'Time for today\'s Montessori activity', `A short, focused activity with ${names} today keeps the rhythm going.`, `daily-${uid}-${l.date}`)
      patch.last_daily_sent = l.date
      stats.daily++
    }

    // Weekly report on the chosen day at 08:00 local (covers the week just ended)
    if (prefs.weekly_report && l.weekday === prefs.weekly_report_day && l.hour === 8 && prefs.last_weekly_sent !== l.date) {
      const ws = new Date(startOfWeek().getTime() - 7 * 86400_000)
      for (const c of children) {
        const summary = await buildWeeklyReport(admin, c.id, ws)
        await admin.from('weekly_reports').upsert({ child_id: c.id, user_id: uid, week_start: summary.week_start, summary, emailed_at: new Date().toISOString() }, { onConflict: 'child_id,week_start' })
        const goalLines = summary.goals.map((g) => `• ${g.title}: ${g.complete}/${g.total}${g.next ? ` — next: ${g.next}` : ''}`)
        const body = [
          `${c.name} completed ${summary.activity_count} activit${summary.activity_count === 1 ? 'y' : 'ies'} this week${summary.minutes ? ` (${summary.minutes} planned minutes)` : ''}.`,
          summary.activities.length ? `Activities: ${summary.activities.map((a) => a.title).join(', ')}` : 'No activities were recorded this week.',
          goalLines.length ? `Goals:\n${goalLines.join('\n')}` : '',
        ].filter(Boolean).join('\n')
        await notify(uid, prefs, `${c.name}'s weekly report`, body, `weekly-${c.id}-${summary.week_start}`)
        stats.weekly++
      }
      patch.last_weekly_sent = l.date
    }

    if (Object.keys(patch).length) await admin.from('notification_preferences').upsert({ user_id: uid, ...defaults, ...(prefsMap.get(uid) ?? {}), ...patch })
  }

  // Scheduled activity reminders (events starting within their reminder window, up to the next hour)
  const now = Date.now()
  const { data: events } = await admin.from('calendar_events').select('id, user_id, child_id, title, starts_at')
    .eq('reminder_sent', false).eq('completed', false)
    .gte('starts_at', new Date(now).toISOString()).lte('starts_at', new Date(now + 25 * 3600_000).toISOString()).limit(200)
  for (const e of events ?? []) {
    const prefs = { ...defaults, ...(prefsMap.get(e.user_id) ?? {}) }
    if (!prefs.activity_reminders) continue
    const sendAt = new Date(e.starts_at).getTime() - prefs.activity_reminder_minutes * 60_000
    if (sendAt > now + 3600_000) continue
    const child = (kids ?? []).find((k: any) => k.id === e.child_id)
    const when = new Date(e.starts_at).toLocaleTimeString('en-US', { timeZone: prefs.timezone, hour: 'numeric', minute: '2-digit' })
    await notify(e.user_id, prefs, `Coming up: ${e.title}`, `${child?.name ?? 'Your child'} has ${e.title} planned at ${when}.`, `event-${e.id}`)
    await admin.from('calendar_events').update({ reminder_sent: true }).eq('id', e.id)
    stats.activity++
  }

  // Goal alerts: reached, or due within 3 days
  const { data: goals } = await admin.from('child_goals').select('*').eq('status', 'active').limit(1000)
  for (const g of goals ?? []) {
    const prefs = { ...defaults, ...(prefsMap.get(g.user_id) ?? {}) }
    if (!prefs.goal_alerts || !g.skill_ids.length) continue
    const { data: done } = await admin.from('skill_progress').select('skill_id').eq('child_id', g.child_id).eq('completed', true).in('skill_id', g.skill_ids)
    const complete = (done ?? []).length
    const child = (kids ?? []).find((k: any) => k.id === g.child_id)
    if (complete >= g.skill_ids.length && !g.reached_notified) {
      await notify(g.user_id, prefs, `Goal reached: ${g.title}`, `${child?.name ?? 'Your child'} has completed every activity in this goal.`, `goal-reached-${g.id}`)
      await admin.from('child_goals').update({ reached_notified: true, status: 'done' }).eq('id', g.id)
      stats.goals++
    } else if (g.target_date && !g.due_notified && complete < g.skill_ids.length) {
      const days = (new Date(g.target_date).getTime() - now) / 86400_000
      if (days <= 3 && days >= -1) {
        await notify(g.user_id, prefs, `Goal due soon: ${g.title}`, `${complete} of ${g.skill_ids.length} activities done so far for ${child?.name ?? 'your child'}.`, `goal-due-${g.id}`)
        await admin.from('child_goals').update({ due_notified: true }).eq('id', g.id)
        stats.goals++
      }
    }
  }

  return json({ ok: true, stats })
})
