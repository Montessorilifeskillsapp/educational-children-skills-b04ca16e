CREATE TABLE public.child_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  title text NOT NULL,
  area text,
  skill_ids text[] NOT NULL DEFAULT '{}',
  priority integer NOT NULL DEFAULT 2,
  sort_order integer NOT NULL DEFAULT 0,
  target_date date,
  status text NOT NULL DEFAULT 'active',
  reached_notified boolean NOT NULL DEFAULT false,
  due_notified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.child_goals TO authenticated;
GRANT ALL ON public.child_goals TO service_role;
ALTER TABLE public.child_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners view goals" ON public.child_goals FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE TRIGGER child_goals_updated BEFORE UPDATE ON public.child_goals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  skill_id text NOT NULL,
  title text NOT NULL,
  starts_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 20,
  notes text,
  completed boolean NOT NULL DEFAULT false,
  reminder_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.calendar_events TO authenticated;
GRANT ALL ON public.calendar_events TO service_role;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners view events" ON public.calendar_events FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE INDEX calendar_events_start_idx ON public.calendar_events(starts_at);
CREATE TRIGGER calendar_events_updated BEFORE UPDATE ON public.calendar_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.notification_preferences (
  user_id uuid PRIMARY KEY,
  timezone text NOT NULL DEFAULT 'UTC',
  daily_reminder boolean NOT NULL DEFAULT true,
  daily_reminder_time text NOT NULL DEFAULT '09:00',
  weekly_report boolean NOT NULL DEFAULT true,
  weekly_report_day integer NOT NULL DEFAULT 0,
  goal_alerts boolean NOT NULL DEFAULT true,
  activity_reminders boolean NOT NULL DEFAULT true,
  activity_reminder_minutes integer NOT NULL DEFAULT 30,
  email_enabled boolean NOT NULL DEFAULT true,
  push_enabled boolean NOT NULL DEFAULT true,
  last_daily_sent date,
  last_weekly_sent date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.notification_preferences TO authenticated;
GRANT ALL ON public.notification_preferences TO service_role;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners view prefs" ON public.notification_preferences FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE TRIGGER notification_preferences_updated BEFORE UPDATE ON public.notification_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.push_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  token text NOT NULL UNIQUE,
  platform text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.push_tokens TO authenticated;
GRANT ALL ON public.push_tokens TO service_role;
ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners view tokens" ON public.push_tokens FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.weekly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  week_start date NOT NULL,
  summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  emailed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (child_id, week_start)
);
GRANT SELECT ON public.weekly_reports TO authenticated;
GRANT ALL ON public.weekly_reports TO service_role;
ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners view reports" ON public.weekly_reports FOR SELECT TO authenticated USING (user_id = auth.uid());