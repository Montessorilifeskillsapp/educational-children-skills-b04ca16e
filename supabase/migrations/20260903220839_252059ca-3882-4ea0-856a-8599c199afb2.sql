CREATE OR REPLACE FUNCTION public.update_material_links_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.update_material_links_updated_at() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_material_links_updated_at() TO service_role;