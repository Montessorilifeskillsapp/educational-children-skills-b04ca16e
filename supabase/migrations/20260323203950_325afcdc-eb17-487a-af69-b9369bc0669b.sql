-- Remove any orphaned records with NULL user_id
DELETE FROM public.subscribers WHERE user_id IS NULL;

-- Make user_id NOT NULL to prevent orphaned sensitive records
ALTER TABLE public.subscribers ALTER COLUMN user_id SET NOT NULL;