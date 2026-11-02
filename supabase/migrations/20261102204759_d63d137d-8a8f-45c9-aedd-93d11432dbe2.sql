CREATE OR REPLACE FUNCTION school_private.readable_classroom_ids()
RETURNS SETOF uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
 SELECT c.id FROM public.classrooms c JOIN public.schools s ON s.id=c.school_id JOIN public.school_members m ON m.school_id=s.id
 WHERE s.active AND m.user_id=auth.uid() AND
 (m.role='school_admin' OR s.policies->>'staff_scope'='school' OR EXISTS (SELECT 1 FROM public.classroom_staff cs WHERE cs.classroom_id=c.id AND cs.member_id=m.id))
$$;
CREATE OR REPLACE FUNCTION school_private.readable_student_ids()
RETURNS SETOF uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
 SELECT st.id FROM public.school_students st WHERE st.classroom_id IN (SELECT school_private.readable_classroom_ids())
$$;
REVOKE ALL ON FUNCTION school_private.readable_classroom_ids() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION school_private.readable_student_ids() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION school_private.readable_classroom_ids() TO authenticated;
GRANT EXECUTE ON FUNCTION school_private.readable_student_ids() TO authenticated;

ALTER POLICY "Scoped classroom assignment reads" ON public.classroom_staff USING (classroom_id IN (SELECT school_private.readable_classroom_ids()));
ALTER POLICY "Scoped classroom reads" ON public.classrooms USING (id IN (SELECT school_private.readable_classroom_ids()));
ALTER POLICY "Scoped plan reads" ON public.lesson_plan_items USING (classroom_id IN (SELECT school_private.readable_classroom_ids()));
ALTER POLICY "Scoped student reads" ON public.school_students USING (classroom_id IN (SELECT school_private.readable_classroom_ids()));
ALTER POLICY "Scoped observation reads" ON public.student_observations USING (student_id IN (SELECT school_private.readable_student_ids()));
ALTER POLICY "Scoped progress reads" ON public.student_progress USING (student_id IN (SELECT school_private.readable_student_ids()));
ALTER POLICY "Scoped progress entry reads" ON public.student_progress_entries USING (student_id IN (SELECT school_private.readable_student_ids()));
ALTER POLICY "Scoped report reads" ON public.student_reports USING (student_id IN (SELECT school_private.readable_student_ids()));

CREATE INDEX IF NOT EXISTS idx_school_members_user_id ON public.school_members(user_id);
CREATE INDEX IF NOT EXISTS idx_classroom_staff_member ON public.classroom_staff(member_id, classroom_id);
CREATE INDEX IF NOT EXISTS idx_school_students_classroom ON public.school_students(classroom_id);