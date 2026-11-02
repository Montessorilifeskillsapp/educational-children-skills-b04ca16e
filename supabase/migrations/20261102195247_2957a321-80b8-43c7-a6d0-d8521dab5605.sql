CREATE INDEX IF NOT EXISTS idx_child_profiles_user_id ON public.child_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_child_goals_child_id ON public.child_goals(child_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_child_starts ON public.calendar_events(child_id, starts_at);