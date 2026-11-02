CREATE TABLE public.student_progress_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.school_students(id) ON DELETE CASCADE,
  skill_id text NOT NULL,
  status text NOT NULL,
  note text,
  recorded_by uuid,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON public.student_progress_entries FROM anon, authenticated;
GRANT SELECT ON public.student_progress_entries TO authenticated;
GRANT ALL ON public.student_progress_entries TO service_role;
ALTER TABLE public.student_progress_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Scoped progress entry reads" ON public.student_progress_entries FOR SELECT TO authenticated USING (school_private.can_read_school_student(student_id));
CREATE INDEX student_progress_entries_student_idx ON public.student_progress_entries (student_id, skill_id, recorded_at);
CREATE INDEX student_progress_entries_school_idx ON public.student_progress_entries (school_id, recorded_at);