ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS store_child_addons integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.child_allowance(_user_id uuid)
 RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT 1 + COALESCE((
    SELECT GREATEST(child_addons, 0) + GREATEST(store_child_addons, 0) FROM public.subscribers
    WHERE user_id = _user_id AND subscribed = true
      AND (subscription_end IS NULL OR subscription_end > now())
    LIMIT 1), 0)
$$;

CREATE OR REPLACE FUNCTION public.protect_child_addons()
 RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public'
AS $$
BEGIN
  IF public.is_client_request() THEN
    IF TG_OP = 'INSERT' THEN NEW.child_addons := 0; NEW.store_child_addons := 0;
    ELSE NEW.child_addons := OLD.child_addons; NEW.store_child_addons := OLD.store_child_addons; END IF;
  END IF;
  RETURN NEW;
END $$;