REVOKE ALL ON FUNCTION public.update_material_links_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.update_material_links_updated_at() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_material_links_updated_at() TO service_role;