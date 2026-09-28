import { supabase } from '@/integrations/supabase/client';
import { FunctionsHttpError } from '@supabase/supabase-js';

export interface Goal {
  id: string; child_id: string; title: string; area: string | null; skill_ids: string[];
  priority: number; sort_order: number; target_date: string | null; status: string;
}
export interface CalEvent {
  id: string; child_id: string; skill_id: string; title: string; starts_at: string;
  duration_minutes: number; notes: string | null; completed: boolean;
}
export interface Completion { skill_id: string; skill_category: string; completed_at: string | null }
export interface Prefs {
  timezone: string; daily_reminder: boolean; daily_reminder_time: string; weekly_report: boolean;
  weekly_report_day: number; goal_alerts: boolean; activity_reminders: boolean;
  activity_reminder_minutes: number; email_enabled: boolean; push_enabled: boolean;
}
export interface WeeklyReport {
  id: string; child_id: string; week_start: string; created_at: string;
  summary: {
    activity_count: number; minutes: number; planned: number; planned_done: number;
    activities: { title: string; at: string }[]; areas: Record<string, number>;
    goals: { title: string; complete: number; total: number; target_date: string | null; next: string | null }[];
  };
}

export const DEFAULT_PREFS: Prefs = {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  daily_reminder: true, daily_reminder_time: '09:00', weekly_report: true, weekly_report_day: 0,
  goal_alerts: true, activity_reminders: true, activity_reminder_minutes: 30, email_enabled: true, push_enabled: true,
};

// deno-style typed escape: new tables may not be in generated types yet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;

export async function call<T = unknown>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('dashboard-data', { body });
  if (error) {
    const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
    throw new Error(details);
  }
  return data as T;
}
