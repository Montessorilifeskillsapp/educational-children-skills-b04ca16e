import { useCallback, useEffect, useState } from 'react';
import { db, CalEvent, Completion, Goal, WeeklyReport } from './api';

export const useFamilyData = (childId: string | undefined) => {
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!childId) return;
    setLoading(true);
    const [c, g, e, r] = await Promise.all([
      db.from('skill_progress').select('skill_id, skill_category, completed_at').eq('child_id', childId).eq('completed', true),
      db.from('child_goals').select('*').eq('child_id', childId).neq('status', 'archived').order('sort_order').order('priority'),
      db.from('calendar_events').select('*').eq('child_id', childId).order('starts_at'),
      db.from('weekly_reports').select('*').eq('child_id', childId).order('week_start', { ascending: false }).limit(26),
    ]);
    setCompletions(c.data ?? []);
    setGoals(g.data ?? []);
    setEvents(e.data ?? []);
    setReports(r.data ?? []);
    setLoading(false);
  }, [childId]);

  useEffect(() => { load(); }, [load]);

  return { completions, goals, events, reports, loading, reload: load, setGoals, setEvents };
};
