-- Harden subscribers RLS by restricting unrestricted access to service_role only
DROP POLICY IF EXISTS "Edge functions can manage subscriptions" ON public.subscribers;

CREATE POLICY "Service role can manage subscriptions"
ON public.subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow users to delete their own profile data
CREATE POLICY "Users can delete their own profile"
ON public.user_profiles
FOR DELETE
USING (user_id = auth.uid());

-- Allow users to update and delete activity sessions for their own children
CREATE POLICY "Users can update activity sessions for their children"
ON public.activity_sessions
FOR UPDATE
USING (
  child_id IN (
    SELECT child_profiles.id
    FROM public.child_profiles
    WHERE child_profiles.user_id = auth.uid()
  )
)
WITH CHECK (
  child_id IN (
    SELECT child_profiles.id
    FROM public.child_profiles
    WHERE child_profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete activity sessions for their children"
ON public.activity_sessions
FOR DELETE
USING (
  child_id IN (
    SELECT child_profiles.id
    FROM public.child_profiles
    WHERE child_profiles.user_id = auth.uid()
  )
);

-- Allow users to delete incorrect progress for their own children
CREATE POLICY "Users can delete progress for their children"
ON public.skill_progress
FOR DELETE
USING (
  child_id IN (
    SELECT child_profiles.id
    FROM public.child_profiles
    WHERE child_profiles.user_id = auth.uid()
  )
);

-- Allow users to delete their own subscriber record if needed
CREATE POLICY "Users can delete their own subscription"
ON public.subscribers
FOR DELETE
USING ((user_id = auth.uid()) OR (email = auth.email()));