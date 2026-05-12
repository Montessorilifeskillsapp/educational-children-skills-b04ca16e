-- 1) Create internal secrets in Vault (idempotent)
DO $$
DECLARE
  v_id uuid;
BEGIN
  SELECT id INTO v_id FROM vault.secrets WHERE name = 'cron_secret';
  IF v_id IS NULL THEN
    PERFORM vault.create_secret(encode(gen_random_bytes(32), 'hex'), 'cron_secret');
  END IF;

  SELECT id INTO v_id FROM vault.secrets WHERE name = 'bootstrap_secret';
  IF v_id IS NULL THEN
    PERFORM vault.create_secret(encode(gen_random_bytes(32), 'hex'), 'bootstrap_secret');
  END IF;
END $$;

-- 2) Helper function: only callable by service_role (edge functions w/ service key)
CREATE OR REPLACE FUNCTION public.internal_get_secret(p_name text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'vault'
AS $$
DECLARE
  v_secret text;
BEGIN
  SELECT decrypted_secret INTO v_secret
  FROM vault.decrypted_secrets
  WHERE name = p_name
  LIMIT 1;
  RETURN v_secret;
END;
$$;

REVOKE ALL ON FUNCTION public.internal_get_secret(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.internal_get_secret(text) TO service_role;

-- 3) Re-schedule the onboarding email cron with the secret header
SELECT cron.unschedule('process-onboarding-emails')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'process-onboarding-emails');

SELECT cron.schedule(
  'process-onboarding-emails',
  '*/15 * * * *',
  $cron$
  SELECT extensions.http_post(
    url := 'https://lpdvohgfkjnjarrpsnqr.supabase.co/functions/v1/process-onboarding-emails',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZHZvaGdma2puamFycnBzbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDkzOTMsImV4cCI6MjA3MDU4NTM5M30.kn53HBzAFEgy_ksfOu05iJkVPVCufKxT8yiNkBp5Vdw',
      'X-Cron-Secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'cron_secret' LIMIT 1)
    ),
    body := jsonb_build_object('time', now())
  ) AS request_id;
  $cron$
);
