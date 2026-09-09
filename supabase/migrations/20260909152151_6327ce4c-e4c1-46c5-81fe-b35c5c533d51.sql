ALTER TABLE public.activity_videos ADD COLUMN IF NOT EXISTS free_preview BOOLEAN NOT NULL DEFAULT false;

DROP VIEW IF EXISTS public.activity_videos_public;
CREATE VIEW public.activity_videos_public
  WITH (security_invoker = true) AS
  SELECT skill_id, section_key, title, thumbnail_path, duration_seconds, free_preview
  FROM public.activity_videos
  WHERE active = true;

GRANT SELECT ON public.activity_videos_public TO anon, authenticated;