CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

DROP POLICY IF EXISTS "Service role can manage subscriptions" ON public.subscribers;

DROP POLICY IF EXISTS "anyone can insert events" ON public.analytics_events;

CREATE POLICY "Authenticated users insert their own events"
ON public.analytics_events
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Anonymous visitors insert anonymous events"
ON public.analytics_events
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);
