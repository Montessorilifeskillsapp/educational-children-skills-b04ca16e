-- Songs bundle: catalog + purchases
CREATE TABLE public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  sort_order integer not null default 0,
  storage_path text not null,
  preview_path text,
  preview_start_seconds integer not null default 0,
  cover_path text,
  duration_seconds integer,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

GRANT SELECT ON public.songs TO anon;
GRANT SELECT ON public.songs TO authenticated;
GRANT ALL ON public.songs TO service_role;

ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active songs"
  ON public.songs FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE TABLE public.song_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  email text not null,
  product text not null default 'songs_bundle',
  stripe_session_id text,
  purchased_at timestamptz not null default now(),
  unique (user_id, product)
);

GRANT SELECT ON public.song_purchases TO authenticated;
GRANT ALL ON public.song_purchases TO service_role;

ALTER TABLE public.song_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their own song purchase"
  ON public.song_purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_songs_updated_at
  BEFORE UPDATE ON public.songs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();