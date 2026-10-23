CREATE TABLE public.student_support_notes (
  student_id uuid PRIMARY KEY REFERENCES public.school_students(id) ON DELETE CASCADE,
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  body text NOT NULL,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.student_support_notes TO authenticated;
GRANT ALL ON public.student_support_notes TO service_role;
ALTER TABLE public.student_support_notes ENABLE ROW LEVEL SECURITY;

CREATE SCHEMA IF NOT EXISTS private;
CREATE OR REPLACE FUNCTION private.can_read_support_notes(_student_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.school_students st
    JOIN public.classrooms c ON c.id = st.classroom_id
    JOIN public.school_members m ON m.school_id = st.school_id AND m.user_id = auth.uid()
    JOIN public.schools s ON s.id = st.school_id AND s.active
    WHERE st.id = _student_id AND (m.role = 'school_admin' OR c.lead_member_id = m.id)
  )
$$;
REVOKE ALL ON FUNCTION private.can_read_support_notes(uuid) FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated;
GRANT EXECUTE ON FUNCTION private.can_read_support_notes(uuid) TO authenticated;

CREATE POLICY "School Admins and Lead Guides read support notes" ON public.student_support_notes
  FOR SELECT TO authenticated USING (private.can_read_support_notes(student_id));

INSERT INTO public.student_support_notes (student_id, school_id, body)
  SELECT id, school_id, support_notes FROM public.school_students WHERE support_notes IS NOT NULL AND btrim(support_notes) <> '';
UPDATE public.school_students SET support_notes = NULL WHERE support_notes IS NOT NULL;