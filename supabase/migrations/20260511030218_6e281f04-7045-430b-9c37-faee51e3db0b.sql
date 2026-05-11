
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_name TEXT;
BEGIN
  v_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1));

  INSERT INTO public.user_profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, v_name);

  INSERT INTO public.subscribers (user_id, email)
  VALUES (NEW.id, NEW.email);

  -- Enqueue onboarding sequence (day-1 is conditionally skipped at send time
  -- if the user has already started an activity)
  INSERT INTO public.email_schedule (user_id, email, template_name, send_at) VALUES
    (NEW.id, NEW.email, 'welcome-day-0',         now()),
    (NEW.id, NEW.email, 'day-1-abandonment',     now() + interval '1 day'),
    (NEW.id, NEW.email, 'day-2-check-in',        now() + interval '2 days'),
    (NEW.id, NEW.email, 'day-3-next-activity',   now() + interval '3 days'),
    (NEW.id, NEW.email, 'day-5-encouragement',   now() + interval '5 days'),
    (NEW.id, NEW.email, 'day-7-wrap',            now() + interval '7 days')
  ON CONFLICT (user_id, template_name) DO NOTHING;

  RETURN NEW;
END;
$function$;

-- Backfill: enroll users who signed up in the last 24h and don't already have a row.
INSERT INTO public.email_schedule (user_id, email, template_name, send_at)
SELECT s.user_id, s.email, 'day-1-abandonment', s.created_at + interval '1 day'
FROM public.subscribers s
WHERE s.created_at > now() - interval '24 hours'
ON CONFLICT (user_id, template_name) DO NOTHING;
