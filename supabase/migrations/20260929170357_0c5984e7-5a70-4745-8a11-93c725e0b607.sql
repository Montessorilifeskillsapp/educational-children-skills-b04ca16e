ALTER FUNCTION public.is_client_request() SET search_path = public;
REVOKE ALL ON FUNCTION public.child_allowance(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.child_allowance(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.enforce_child_allowance() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.protect_child_addons() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.reconcile_child_coverage(uuid) FROM PUBLIC, anon, authenticated;