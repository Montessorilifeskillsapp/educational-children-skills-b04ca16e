REVOKE EXECUTE ON FUNCTION public.enforce_classroom_seats() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_school_member(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_school_member(uuid) TO authenticated;