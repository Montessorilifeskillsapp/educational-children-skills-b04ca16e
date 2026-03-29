DROP POLICY "Users can update progress for their children" ON public.skill_progress;
CREATE POLICY "Users can update progress for their children"
ON public.skill_progress
FOR UPDATE
TO public
USING (child_id IN (SELECT id FROM child_profiles WHERE user_id = auth.uid()))
WITH CHECK (child_id IN (SELECT id FROM child_profiles WHERE user_id = auth.uid()));