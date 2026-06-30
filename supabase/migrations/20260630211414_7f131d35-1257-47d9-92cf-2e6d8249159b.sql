
ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS provider TEXT DEFAULT 'stripe',
  ADD COLUMN IF NOT EXISTS revenuecat_app_user_id TEXT,
  ADD COLUMN IF NOT EXISTS revenuecat_entitlement TEXT,
  ADD COLUMN IF NOT EXISTS revenuecat_product_id TEXT,
  ADD COLUMN IF NOT EXISTS platform TEXT;

CREATE INDEX IF NOT EXISTS idx_subscribers_rc_app_user
  ON public.subscribers(revenuecat_app_user_id);
