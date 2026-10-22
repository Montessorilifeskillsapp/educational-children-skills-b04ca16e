DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['access_code_redemptions','access_codes','activity_sessions','child_profiles','classroom_staff','classrooms','email_schedule','leads','lesson_plan_items','school_audit_log','school_invites','school_members','school_students','schools','skill_progress','song_purchases','stripe_webhook_events','student_observations','student_progress','student_reports','subscribers','user_profiles','user_roles'] LOOP
    EXECUTE format('REVOKE ALL ON public.%I FROM anon', t);
  END LOOP;
  -- Sign-in-free visitors may still record anonymous analytics events, but never read them.
  REVOKE SELECT, UPDATE, DELETE ON public.analytics_events FROM anon;
  -- Internal tables nobody signed in should even see.
  REVOKE ALL ON public.access_code_redemptions, public.access_codes, public.email_schedule, public.leads, public.stripe_webhook_events FROM authenticated;
END $$;

DO $$
DECLARE f record;
BEGIN
  FOR f IN SELECT p.oid::regprocedure AS sig FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
           WHERE n.nspname = 'public' AND p.prosecdef LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM anon, public', f.sig);
  END LOOP;
END $$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_school_member(uuid) TO authenticated;