CREATE POLICY "Deny authenticated insert on subscribers"
ON public.subscribers
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "Deny authenticated update on subscribers"
ON public.subscribers
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny authenticated delete on subscribers"
ON public.subscribers
FOR DELETE
TO authenticated
USING (false);