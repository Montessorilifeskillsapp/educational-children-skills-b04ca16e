CREATE OR REPLACE FUNCTION public.child_allowance(_user_id uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT COALESCE((
    SELECT CASE
      WHEN subscribed = true
        AND (subscription_end IS NULL OR subscription_end > now())
        AND lower(COALESCE(subscription_tier, '')) LIKE 'family%'
      THEN 4
      WHEN subscribed = true
        AND (subscription_end IS NULL OR subscription_end > now())
      THEN 1 + GREATEST(child_addons, 0) + GREATEST(store_child_addons, 0)
      ELSE 1
    END
    FROM public.subscribers
    WHERE user_id = _user_id
    LIMIT 1
  ), 1)
$function$;

CREATE OR REPLACE FUNCTION public.enforce_child_allowance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_covered integer;
DECLARE v_allowance integer;
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.user_id IS NOT NULL THEN
      v_allowance := public.child_allowance(NEW.user_id);
      SELECT count(*) INTO v_covered
      FROM public.child_profiles
      WHERE user_id = NEW.user_id AND is_covered;

      IF v_covered >= v_allowance THEN
        IF v_allowance >= 4 THEN
          RAISE EXCEPTION 'CHILD_LIMIT_REACHED' USING HINT = 'Family covers up to four children. Contact montessorilifeskills@gmail.com if your family needs more profiles.';
        ELSE
          RAISE EXCEPTION 'CHILD_LIMIT_REACHED' USING HINT = 'Upgrade to the Family Plan to include up to four children.';
        END IF;
      END IF;
    END IF;
    NEW.is_covered := true;
  ELSIF public.is_client_request() AND NEW.is_covered IS DISTINCT FROM OLD.is_covered THEN
    NEW.is_covered := OLD.is_covered;
  END IF;
  RETURN NEW;
END
$function$;