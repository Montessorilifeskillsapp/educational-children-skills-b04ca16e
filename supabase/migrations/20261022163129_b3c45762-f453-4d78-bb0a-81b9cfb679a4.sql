CREATE TABLE public.school_audit_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  school_id uuid,
  actor_id uuid NOT NULL,
  actor_email text,
  action text NOT NULL,
  target_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.school_audit_log TO authenticated;
GRANT ALL ON public.school_audit_log TO service_role;
ALTER TABLE public.school_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "School admins read their school audit log" ON public.school_audit_log
  FOR SELECT TO authenticated USING (EXISTS (
    SELECT 1 FROM public.school_members m WHERE m.school_id = school_audit_log.school_id
      AND m.user_id = auth.uid() AND m.role = 'school_admin'));
CREATE INDEX school_audit_log_school_idx ON public.school_audit_log (school_id, created_at DESC);