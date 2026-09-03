CREATE TABLE public.material_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_key text NOT NULL UNIQUE,
  display_name text,
  amazon_url text,
  notes text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.material_links TO anon, authenticated;
GRANT ALL ON public.material_links TO service_role;

ALTER TABLE public.material_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active material links are publicly readable"
ON public.material_links
FOR SELECT
TO anon, authenticated
USING (active = true);

CREATE OR REPLACE FUNCTION public.update_material_links_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER material_links_updated_at
BEFORE UPDATE ON public.material_links
FOR EACH ROW
EXECUTE FUNCTION public.update_material_links_updated_at();
