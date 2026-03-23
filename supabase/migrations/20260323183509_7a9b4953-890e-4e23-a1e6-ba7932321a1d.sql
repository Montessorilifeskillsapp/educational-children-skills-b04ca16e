DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscribers;
CREATE POLICY "Users can view their own subscription" ON public.subscribers
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());