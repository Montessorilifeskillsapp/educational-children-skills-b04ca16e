// Builds a weekly progress + goals summary for one child from real data.
export const prettify = (id: string) =>
  id.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

// deno-lint-ignore no-explicit-any
export async function buildWeeklyReport(admin: any, childId: string, weekStart: Date) {
  const weekEnd = new Date(weekStart.getTime() + 7 * 86400_000)
  const [{ data: done }, { data: allDone }, { data: goals }, { data: events }] = await Promise.all([
    admin.from('skill_progress').select('skill_id, skill_category, completed_at').eq('child_id', childId)
      .eq('completed', true).gte('completed_at', weekStart.toISOString()).lt('completed_at', weekEnd.toISOString()),
    admin.from('skill_progress').select('skill_id').eq('child_id', childId).eq('completed', true),
    admin.from('child_goals').select('*').eq('child_id', childId).eq('status', 'active').order('sort_order'),
    admin.from('calendar_events').select('duration_minutes, completed, starts_at').eq('child_id', childId)
      .gte('starts_at', weekStart.toISOString()).lt('starts_at', weekEnd.toISOString()),
  ])
  const completedSet = new Set((allDone ?? []).map((r: { skill_id: string }) => r.skill_id))
  const areas: Record<string, number> = {}
  for (const r of done ?? []) areas[r.skill_category || 'general'] = (areas[r.skill_category || 'general'] ?? 0) + 1
  const minutes = (events ?? []).filter((e: { completed: boolean }) => e.completed)
    .reduce((s: number, e: { duration_minutes: number }) => s + e.duration_minutes, 0)
  const goalSummaries = (goals ?? []).map((g: { title: string; skill_ids: string[]; target_date: string | null }) => {
    const total = g.skill_ids.length
    const complete = g.skill_ids.filter((s) => completedSet.has(s)).length
    const next = g.skill_ids.find((s) => !completedSet.has(s))
    return { title: g.title, complete, total, target_date: g.target_date, next: next ? prettify(next) : null }
  })
  return {
    week_start: weekStart.toISOString().slice(0, 10),
    activities: (done ?? []).map((r: { skill_id: string; completed_at: string }) => ({ title: prettify(r.skill_id), at: r.completed_at })),
    activity_count: (done ?? []).length,
    minutes,
    planned: (events ?? []).length,
    planned_done: (events ?? []).filter((e: { completed: boolean }) => e.completed).length,
    areas,
    goals: goalSummaries,
  }
}

export function startOfWeek(d = new Date()) {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  x.setUTCDate(x.getUTCDate() - x.getUTCDay())
  return x
}
