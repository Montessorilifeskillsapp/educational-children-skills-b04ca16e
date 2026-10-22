CREATE OR REPLACE FUNCTION public.can_read_school_classroom(_classroom_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
 SELECT EXISTS (SELECT 1 FROM public.classrooms c JOIN public.schools s ON s.id=c.school_id JOIN public.school_members m ON m.school_id=s.id
 WHERE c.id=_classroom_id AND s.active AND m.user_id=auth.uid() AND
 (m.role='school_admin' OR s.policies->>'staff_scope'='school' OR EXISTS (SELECT 1 FROM public.classroom_staff cs WHERE cs.classroom_id=c.id AND cs.member_id=m.id)))
$$;
REVOKE ALL ON FUNCTION public.can_read_school_classroom(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_read_school_classroom(uuid) TO authenticated, service_role;
CREATE OR REPLACE FUNCTION public.can_read_school_student(_student_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
 SELECT EXISTS (SELECT 1 FROM public.school_students s WHERE s.id=_student_id AND public.can_read_school_classroom(s.classroom_id))
$$;
REVOKE ALL ON FUNCTION public.can_read_school_student(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_read_school_student(uuid) TO authenticated, service_role;
DROP POLICY "Members read classrooms" ON public.classrooms;
CREATE POLICY "Scoped classroom reads" ON public.classrooms FOR SELECT TO authenticated USING (public.can_read_school_classroom(id));
DROP POLICY "Members read classroom staff" ON public.classroom_staff;
CREATE POLICY "Scoped classroom assignment reads" ON public.classroom_staff FOR SELECT TO authenticated USING (public.can_read_school_classroom(classroom_id));
DROP POLICY "Members read students" ON public.school_students;
CREATE POLICY "Scoped student reads" ON public.school_students FOR SELECT TO authenticated USING (public.can_read_school_classroom(classroom_id));
DROP POLICY "Members read progress" ON public.student_progress;
CREATE POLICY "Scoped progress reads" ON public.student_progress FOR SELECT TO authenticated USING (public.can_read_school_student(student_id));
DROP POLICY "Members read observations" ON public.student_observations;
CREATE POLICY "Scoped observation reads" ON public.student_observations FOR SELECT TO authenticated USING (public.can_read_school_student(student_id));
DROP POLICY "Members read reports" ON public.student_reports;
CREATE POLICY "Scoped report reads" ON public.student_reports FOR SELECT TO authenticated USING (public.can_read_school_student(student_id));
DROP POLICY "Members read plans" ON public.lesson_plan_items;
CREATE POLICY "Scoped plan reads" ON public.lesson_plan_items FOR SELECT TO authenticated USING (public.can_read_school_classroom(classroom_id));
DROP POLICY "Members read invites" ON public.school_invites;
CREATE POLICY "School admins read invitations" ON public.school_invites FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.school_members m JOIN public.schools s ON s.id=m.school_id WHERE m.school_id=school_invites.school_id AND m.user_id=auth.uid() AND m.role='school_admin' AND s.active));
CREATE OR REPLACE FUNCTION public.erase_school_student(_student_id uuid, _actor_id uuid, _actor_email text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE sid uuid;
BEGIN
 SELECT school_id INTO sid FROM public.school_students WHERE id=_student_id FOR UPDATE;
 IF sid IS NULL THEN RAISE EXCEPTION 'Student not found'; END IF;
 UPDATE public.lesson_plan_items SET student_ids=array_remove(student_ids,_student_id) WHERE school_id=sid AND _student_id=ANY(student_ids);
 DELETE FROM public.school_students WHERE id=_student_id;
 INSERT INTO public.school_audit_log(school_id,actor_id,actor_email,action,target_id) VALUES(sid,_actor_id,_actor_email,'student_delete',_student_id::text);
END $$;
REVOKE ALL ON FUNCTION public.erase_school_student(uuid,uuid,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.erase_school_student(uuid,uuid,text) TO service_role;