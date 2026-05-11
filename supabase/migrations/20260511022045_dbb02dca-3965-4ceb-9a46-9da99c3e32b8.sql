
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT cron.unschedule('process-onboarding-emails')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'process-onboarding-emails');

SELECT cron.schedule(
  'process-onboarding-emails',
  '*/15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://lpdvohgfkjnjarrpsnqr.supabase.co/functions/v1/process-onboarding-emails',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZHZvaGdma2puamFycnBzbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDkzOTMsImV4cCI6MjA3MDU4NTM5M30.kn53HBzAFEgy_ksfOu05iJkVPVCufKxT8yiNkBp5Vdw"}'::jsonb,
    body := jsonb_build_object('time', now())
  ) AS request_id;
  $$
);
