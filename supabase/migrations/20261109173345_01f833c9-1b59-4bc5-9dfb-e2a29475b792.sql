CREATE TABLE public.consultation_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  child_age text,
  package text NOT NULL DEFAULT 'single',
  topics text NOT NULL,
  preferred_times text,
  owner_notified_at timestamptz,
  confirmation_sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.consultation_requests TO authenticated;
GRANT ALL ON public.consultation_requests TO service_role;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view consultation requests"
  ON public.consultation_requests FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX consultation_requests_created_idx ON public.consultation_requests (created_at DESC);
CREATE INDEX consultation_requests_email_idx ON public.consultation_requests (email, created_at DESC);