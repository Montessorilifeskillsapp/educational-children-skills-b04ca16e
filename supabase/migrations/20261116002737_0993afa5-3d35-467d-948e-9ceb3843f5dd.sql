CREATE TABLE public.subscription_renewal_notices (
  stripe_subscription_id text NOT NULL,
  period_end timestamptz NOT NULL,
  email text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (stripe_subscription_id, period_end)
);
REVOKE ALL ON public.subscription_renewal_notices FROM anon, authenticated;
GRANT ALL ON public.subscription_renewal_notices TO service_role;
ALTER TABLE public.subscription_renewal_notices ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.subscription_renewal_notices IS 'Service-only log of annual renewal reminder emails; one row per subscription renewal date so each reminder is sent once.';