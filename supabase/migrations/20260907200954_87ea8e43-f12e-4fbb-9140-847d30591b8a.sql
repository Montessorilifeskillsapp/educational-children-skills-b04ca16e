CREATE TABLE public.activity_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_id TEXT NOT NULL UNIQUE,
  section_key TEXT,
  title TEXT,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  duration_seconds INTEGER,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.activity_videos TO anon, authenticated;
GRANT ALL ON public.activity_videos TO service_role;

ALTER TABLE public.activity_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny client writes on activity_videos"
  ON public.activity_videos FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "Active activity videos are publicly listable"
  ON public.activity_videos FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE TRIGGER activity_videos_updated_at
  BEFORE UPDATE ON public.activity_videos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE VIEW public.activity_videos_public
  WITH (security_invoker = true) AS
  SELECT skill_id, section_key, title, thumbnail_path, duration_seconds
  FROM public.activity_videos
  WHERE active = true;

GRANT SELECT ON public.activity_videos_public TO anon, authenticated;