CREATE TABLE public.password_reset_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.password_reset_requests TO service_role;
REVOKE ALL ON public.password_reset_requests FROM anon, authenticated;
ALTER TABLE public.password_reset_requests ENABLE ROW LEVEL SECURITY;
CREATE INDEX password_reset_requests_user_idx ON public.password_reset_requests (user_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.auth_user_id_for_email(_email text)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT id FROM auth.users WHERE lower(email) = lower(trim(_email)) AND deleted_at IS NULL LIMIT 1
$$;
REVOKE ALL ON FUNCTION public.auth_user_id_for_email(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.auth_user_id_for_email(text) TO service_role;

CREATE OR REPLACE FUNCTION public.revoke_all_user_sessions(_user_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  DELETE FROM auth.sessions WHERE user_id = _user_id
$$;
REVOKE ALL ON FUNCTION public.revoke_all_user_sessions(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_all_user_sessions(uuid) TO service_role;