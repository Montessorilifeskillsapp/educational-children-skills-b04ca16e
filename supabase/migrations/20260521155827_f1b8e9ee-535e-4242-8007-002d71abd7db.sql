
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL DEFAULT 'week-1-starter-pdf',
  utm jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, source)
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Lock down all client access; only edge functions (service role) write/read.
CREATE POLICY "deny_all_select_leads" ON public.leads FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "deny_all_insert_leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny_all_update_leads" ON public.leads FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "deny_all_delete_leads" ON public.leads FOR DELETE TO anon, authenticated USING (false);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
