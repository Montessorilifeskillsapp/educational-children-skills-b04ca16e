
CREATE TABLE IF NOT EXISTS public.email_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  template_name TEXT NOT NULL,
  send_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  attempts INT NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_schedule_due
  ON public.email_schedule (send_at)
  WHERE sent_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_email_schedule_user_template
  ON public.email_schedule (user_id, template_name);

ALTER TABLE public.email_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_public_access" ON public.email_schedule FOR SELECT USING (false);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_name TEXT;
BEGIN
  v_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1));

  INSERT INTO public.user_profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, v_name);

  INSERT INTO public.subscribers (user_id, email)
  VALUES (NEW.id, NEW.email);

  -- Enqueue 5-email onboarding sequence
  INSERT INTO public.email_schedule (user_id, email, template_name, send_at) VALUES
    (NEW.id, NEW.email, 'welcome-day-0',         now()),
    (NEW.id, NEW.email, 'day-2-check-in',        now() + interval '2 days'),
    (NEW.id, NEW.email, 'day-3-next-activity',   now() + interval '3 days'),
    (NEW.id, NEW.email, 'day-5-encouragement',   now() + interval '5 days'),
    (NEW.id, NEW.email, 'day-7-wrap',            now() + interval '7 days')
  ON CONFLICT (user_id, template_name) DO NOTHING;

  RETURN NEW;
END;
$$;
