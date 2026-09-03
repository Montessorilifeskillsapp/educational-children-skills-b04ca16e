ALTER TABLE public.material_links
  ADD COLUMN IF NOT EXISTS affiliate_tag text,
  ADD COLUMN IF NOT EXISTS vendor text;