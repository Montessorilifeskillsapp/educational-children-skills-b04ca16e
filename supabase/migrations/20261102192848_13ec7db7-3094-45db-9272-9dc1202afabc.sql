ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS backup_reminders_sent text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.school_audit_log ADD COLUMN IF NOT EXISTS detail text;