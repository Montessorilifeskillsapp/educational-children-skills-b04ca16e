CREATE TYPE public.school_role AS ENUM ('school_admin','teacher','assistant');

CREATE TABLE public.schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_email text,
  seat_limit integer NOT NULL DEFAULT 30,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.school_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  email text NOT NULL,
  full_name text,
  role public.school_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (school_id, user_id)
);
CREATE TABLE public.school_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  email text NOT NULL,
  role public.school_role NOT NULL,
  accepted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (school_id, email)
);
CREATE TABLE public.classrooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  name text NOT NULL,
  seat_limit integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.classroom_staff (
  classroom_id uuid NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  member_id uuid NOT NULL REFERENCES public.school_members(id) ON DELETE CASCADE,
  PRIMARY KEY (classroom_id, member_id)
);
CREATE TABLE public.school_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  classroom_id uuid NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  name text NOT NULL,
  date_of_birth date,
  family_email text,
  archived boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.school_students(id) ON DELETE CASCADE,
  skill_id text NOT NULL,
  status text NOT NULL DEFAULT 'presented',
  note text,
  updated_by uuid,
  presented_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, skill_id)
);
CREATE TABLE public.student_observations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.school_students(id) ON DELETE CASCADE,
  body text NOT NULL,
  author_id uuid,
  observed_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.lesson_plan_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  classroom_id uuid NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  plan_date date NOT NULL,
  skill_id text NOT NULL,
  student_ids uuid[] NOT NULL DEFAULT '{}',
  notes text,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.student_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.school_students(id) ON DELETE CASCADE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  sent_to text,
  sent_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.is_school_member(_school_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.school_members m JOIN public.schools s ON s.id = m.school_id
    WHERE m.school_id = _school_id AND m.user_id = auth.uid() AND s.active)
$$;

CREATE OR REPLACE FUNCTION public.enforce_classroom_seats()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_limit integer; v_count integer;
BEGIN
  IF NEW.archived THEN RETURN NEW; END IF;
  IF TG_OP = 'UPDATE' AND NOT OLD.archived AND OLD.classroom_id = NEW.classroom_id THEN RETURN NEW; END IF;
  SELECT COALESCE(c.seat_limit, s.seat_limit) INTO v_limit FROM public.classrooms c JOIN public.schools s ON s.id = c.school_id WHERE c.id = NEW.classroom_id;
  SELECT count(*) INTO v_count FROM public.school_students WHERE classroom_id = NEW.classroom_id AND NOT archived AND id <> NEW.id;
  IF v_count >= v_limit THEN RAISE EXCEPTION 'CLASSROOM_FULL'; END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER school_students_seats BEFORE INSERT OR UPDATE ON public.school_students FOR EACH ROW EXECUTE FUNCTION public.enforce_classroom_seats();
CREATE TRIGGER schools_updated BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER classrooms_updated BEFORE UPDATE ON public.classrooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER school_students_updated BEFORE UPDATE ON public.school_students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER student_progress_updated BEFORE UPDATE ON public.student_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['schools','school_members','school_invites','classrooms','classroom_staff','school_students','student_progress','student_observations','lesson_plan_items','student_reports'] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END $$;

CREATE POLICY "Members read school" ON public.schools FOR SELECT TO authenticated USING (public.is_school_member(id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Members read members" ON public.school_members FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_school_member(school_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Members read invites" ON public.school_invites FOR SELECT TO authenticated USING (public.is_school_member(school_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Members read classrooms" ON public.classrooms FOR SELECT TO authenticated USING (public.is_school_member(school_id));
CREATE POLICY "Members read classroom staff" ON public.classroom_staff FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.classrooms c WHERE c.id = classroom_id AND public.is_school_member(c.school_id)));
CREATE POLICY "Members read students" ON public.school_students FOR SELECT TO authenticated USING (public.is_school_member(school_id));
CREATE POLICY "Members read progress" ON public.student_progress FOR SELECT TO authenticated USING (public.is_school_member(school_id));
CREATE POLICY "Members read observations" ON public.student_observations FOR SELECT TO authenticated USING (public.is_school_member(school_id));
CREATE POLICY "Members read plans" ON public.lesson_plan_items FOR SELECT TO authenticated USING (public.is_school_member(school_id));
CREATE POLICY "Members read reports" ON public.student_reports FOR SELECT TO authenticated USING (public.is_school_member(school_id));