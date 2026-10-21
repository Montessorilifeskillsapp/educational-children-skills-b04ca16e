ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS policies jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.student_observations ADD COLUMN IF NOT EXISTS edited_by uuid, ADD COLUMN IF NOT EXISTS edited_at timestamptz;
ALTER TABLE public.student_reports ADD COLUMN IF NOT EXISTS updated_by uuid, ADD COLUMN IF NOT EXISTS updated_at timestamptz;