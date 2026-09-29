ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS child_addons integer NOT NULL DEFAULT 0;
ALTER TABLE public.child_profiles ADD COLUMN IF NOT EXISTS is_covered boolean NOT NULL DEFAULT true;

CREATE OR REPLACE FUNCTION public.child_allowance(_user_id uuid)
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT 1 + COALESCE((
    SELECT GREATEST(child_addons, 0) FROM public.subscribers
    WHERE user_id = _user_id AND subscribed = true
      AND (subscription_end IS NULL OR subscription_end > now())
    LIMIT 1), 0)
$$;

CREATE OR REPLACE FUNCTION public.reconcile_child_coverage(_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_allow integer := public.child_allowance(_user_id);
BEGIN
  UPDATE public.child_profiles c SET is_covered = r.rn <= v_allow
  FROM (SELECT id, row_number() OVER (ORDER BY is_covered DESC, created_at ASC) rn
        FROM public.child_profiles WHERE user_id = _user_id) r
  WHERE c.id = r.id AND c.is_covered IS DISTINCT FROM (r.rn <= v_allow);
END $$;

REVOKE ALL ON FUNCTION public.reconcile_child_coverage(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reconcile_child_coverage(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.child_allowance(uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.is_client_request()
RETURNS boolean LANGUAGE sql STABLE AS $$
  SELECT COALESCE(current_setting('request.jwt.claims', true)::json->>'role', '') IN ('authenticated', 'anon')
$$;

CREATE OR REPLACE FUNCTION public.enforce_child_allowance()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_covered integer;
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.user_id IS NOT NULL THEN
      SELECT count(*) INTO v_covered FROM public.child_profiles WHERE user_id = NEW.user_id AND is_covered;
      IF v_covered >= public.child_allowance(NEW.user_id) THEN
        RAISE EXCEPTION 'CHILD_LIMIT_REACHED' USING HINT = 'Add a child add-on to include another child.';
      END IF;
    END IF;
    NEW.is_covered := true;
  ELSIF public.is_client_request() AND NEW.is_covered IS DISTINCT FROM OLD.is_covered THEN
    NEW.is_covered := OLD.is_covered;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS child_profiles_allowance ON public.child_profiles;
CREATE TRIGGER child_profiles_allowance BEFORE INSERT OR UPDATE ON public.child_profiles
FOR EACH ROW EXECUTE FUNCTION public.enforce_child_allowance();

CREATE OR REPLACE FUNCTION public.protect_child_addons()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF public.is_client_request() THEN
    IF TG_OP = 'INSERT' THEN NEW.child_addons := 0;
    ELSE NEW.child_addons := OLD.child_addons; END IF;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS subscribers_protect_addons ON public.subscribers;
CREATE TRIGGER subscribers_protect_addons BEFORE INSERT OR UPDATE ON public.subscribers
FOR EACH ROW EXECUTE FUNCTION public.protect_child_addons();