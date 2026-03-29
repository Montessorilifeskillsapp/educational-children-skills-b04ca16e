
-- Fix 1: Replace user_profiles UPDATE policy to prevent subscription_status escalation
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;

CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
TO public
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND subscription_status IS NOT DISTINCT FROM (
    SELECT subscription_status FROM public.user_profiles WHERE user_id = auth.uid()
  )
);

-- Fix 2: Deny anonymous SELECT on subscribers table
CREATE POLICY "Deny anon select on subscribers"
ON public.subscribers
FOR SELECT
TO anon
USING (false);

-- Also deny anon insert/update/delete on subscribers
CREATE POLICY "Deny anon insert on subscribers"
ON public.subscribers
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Deny anon update on subscribers"
ON public.subscribers
FOR UPDATE
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny anon delete on subscribers"
ON public.subscribers
FOR DELETE
TO anon
USING (false);
