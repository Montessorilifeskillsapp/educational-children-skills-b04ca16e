import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { normalizeMaterialKey } from '@/lib/materials';

export interface MaterialLink {
  id: string;
  material_key: string;
  display_name: string | null;
  amazon_url: string | null;
  notes: string | null;
  active: boolean;
  affiliate_tag: string | null;
  vendor: string | null;
}

export function useMaterialLinks() {
  const [links, setLinks] = useState<MaterialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchLinks() {
      setLoading(true);
      setError(null);
      const { data, error: supaError } = await supabase
        .from('material_links')
        .select('id, material_key, display_name, amazon_url, notes, active, affiliate_tag, vendor')
        .eq('active', true);

      if (cancelled) return;

      if (supaError) {
        setError(supaError.message);
        setLinks([]);
      } else {
        setLinks((data as MaterialLink[]) ?? []);
      }
      setLoading(false);
    }

    fetchLinks();
    return () => {
      cancelled = true;
    };
  }, []);

  const byKey = useMemo(() => {
    const map = new Map<string, MaterialLink>();
    for (const link of links) {
      map.set(link.material_key, link);
    }
    return map;
  }, [links]);

  function getLink(materialName: string): MaterialLink | undefined {
    return byKey.get(normalizeMaterialKey(materialName));
  }

  return { links, byKey, getLink, loading, error };
}
