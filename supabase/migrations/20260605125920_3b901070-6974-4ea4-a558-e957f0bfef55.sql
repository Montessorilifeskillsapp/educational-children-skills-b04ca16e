REVOKE EXECUTE ON FUNCTION public.internal_get_secret(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.internal_get_secret(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.internal_get_secret(text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.internal_get_secret(text) TO service_role;