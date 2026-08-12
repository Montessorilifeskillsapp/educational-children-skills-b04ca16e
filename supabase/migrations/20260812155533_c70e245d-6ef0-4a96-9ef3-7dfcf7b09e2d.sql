CREATE TABLE public.access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  label text,
  max_redemptions integer NOT NULL DEFAULT 1,
  redemption_count integer NOT NULL DEFAULT 0,
  expires_at timestamp with time zone,
  grant_duration_days integer,
  revoked boolean NOT NULL DEFAULT false,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.access_code_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id uuid NOT NULL REFERENCES public.access_codes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  revoked boolean NOT NULL DEFAULT false,
  redeemed_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (code_id, user_id)
);

CREATE INDEX idx_access_code_redemptions_code_id ON public.access_code_redemptions(code_id);
CREATE INDEX idx_access_code_redemptions_user_id ON public.access_code_redemptions(user_id);

GRANT ALL ON public.access_codes TO service_role;
GRANT ALL ON public.access_code_redemptions TO service_role;

ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_code_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny client access to access_codes"
  ON public.access_codes FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "Deny client access to access_code_redemptions"
  ON public.access_code_redemptions FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE TRIGGER update_access_codes_updated_at
  BEFORE UPDATE ON public.access_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();