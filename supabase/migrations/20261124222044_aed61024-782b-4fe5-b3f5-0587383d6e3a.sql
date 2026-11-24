CREATE TABLE public.email_confirmation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX email_confirmation_requests_user_idx ON public.email_confirmation_requests (user_id, created_at);
GRANT ALL ON public.email_confirmation_requests TO service_role;
ALTER TABLE public.email_confirmation_requests ENABLE ROW LEVEL SECURITY;