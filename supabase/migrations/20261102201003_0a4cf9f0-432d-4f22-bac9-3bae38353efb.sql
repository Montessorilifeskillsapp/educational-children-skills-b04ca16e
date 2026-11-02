ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS backup_frequency text NOT NULL DEFAULT 'quarterly';
CREATE OR REPLACE FUNCTION public.validate_backup_frequency() RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN IF NEW.backup_frequency NOT IN ('quarterly','semester') THEN RAISE EXCEPTION 'Invalid backup frequency'; END IF; RETURN NEW; END $$;
CREATE TRIGGER schools_backup_frequency BEFORE INSERT OR UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION public.validate_backup_frequency();