CREATE SCHEMA IF NOT EXISTS school_private;
REVOKE ALL ON SCHEMA school_private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA school_private TO authenticated, service_role;
ALTER FUNCTION public.can_read_school_classroom(uuid) SET SCHEMA school_private;
ALTER FUNCTION public.can_read_school_student(uuid) SET SCHEMA school_private;
CREATE OR REPLACE FUNCTION school_private.can_read_school_student(_student_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
 SELECT EXISTS (SELECT 1 FROM public.school_students s WHERE s.id=_student_id AND school_private.can_read_school_classroom(s.classroom_id))
$$;
REVOKE ALL ON FUNCTION school_private.can_read_school_student(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION school_private.can_read_school_student(uuid) TO authenticated, service_role;