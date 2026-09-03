import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Save, Trash2, ExternalLink, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthContext } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminBackBar from '@/components/AdminBackBar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { allCurriculumSkills } from '@/data/curriculumSections';
import { extractAllMaterialsFromSkills, normalizeMaterialKey } from '@/lib/materials';
import { withAffiliateTag, isAmazonUrl } from '@/lib/affiliate';

interface LinkForm {
  material_key: string;
  display_name: string;
  amazon_url: string;
  notes: string;
  active: boolean;
  affiliate_tag: string;
  vendor: string;
}

const AdminMaterialsPage: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [links, setLinks] = useState<Record<string, LinkForm>>({});
  const [initialLinks, setInitialLinks] = useState<Record<string, LinkForm>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user, authLoading]);

  useEffect(() => {
    if (!isAdmin) return;
    async function fetchLinks() {
      setLoading(true);
      const { data, error } = await supabase
        .from('material_links')
        .select('material_key, display_name, amazon_url, notes, active, affiliate_tag, vendor');
      if (error) {
        toast({ title: 'Error loading links', description: error.message, variant: 'destructive' });
      } else {
        const map: Record<string, LinkForm> = {};
        for (const row of data ?? []) {
          map[row.material_key] = {
            material_key: row.material_key,
            display_name: row.display_name || '',
            amazon_url: row.amazon_url || '',
            notes: row.notes || '',
            active: row.active ?? true,
            affiliate_tag: row.affiliate_tag || '',
            vendor: row.vendor || '',
          };
        }
        setLinks(map);
        setInitialLinks(map);
      }
      setLoading(false);
    }
    fetchLinks();
  }, [isAdmin, toast]);

  const allMaterials = useMemo(() => extractAllMaterialsFromSkills(allCurriculumSkills()), []);

  const coveredCount = useMemo(
    () => allMaterials.filter((m) => links[m.key]?.amazon_url && isAmazonUrl(links[m.key].amazon_url)).length,
    [allMaterials, links]
  );

  const filteredMaterials = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allMaterials;
    return allMaterials.filter((m) => m.displayName.toLowerCase().includes(term));
  }, [allMaterials, search]);

  function updateLink(key: string, patch: Partial<LinkForm>) {
    setLinks((prev) => ({
      ...prev,
      [key]: {
        material_key: key,
        display_name: prev[key]?.display_name || allMaterials.find((m) => m.key === key)?.displayName || '',
        amazon_url: prev[key]?.amazon_url || '',
        notes: prev[key]?.notes || '',
        active: prev[key]?.active ?? true,
        affiliate_tag: prev[key]?.affiliate_tag || '',
        vendor: prev[key]?.vendor || '',
        ...patch,
      },
    }));
  }

  async function saveLink(key: string) {
    if (!user) return;
    const link = links[key];
    if (!link) return;

    setSaving((prev) => new Set(prev).add(key));
    try {
      const { data: session } = await supabase.auth.getSession();
      const accessToken = session.session?.access_token;
      if (!accessToken) throw new Error('Not authenticated');

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-material-links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
        },
        body: JSON.stringify({
          action: 'upsert',
          material_key: link.material_key,
          display_name: link.display_name,
          amazon_url: link.amazon_url,
          notes: link.notes,
          active: link.active,
          affiliate_tag: link.affiliate_tag,
          vendor: link.vendor,
        }),
      });

      const result = await res.json().catch(() => ({ error: 'Unexpected response' }));
      if (!res.ok) throw new Error(result.error || `Save failed (${res.status})`);

      toast({ title: 'Saved', description: link.display_name });
      setInitialLinks((prev) => ({ ...prev, [key]: { ...link } }));
    } catch (err: any) {
      toast({ title: 'Save failed', description: err.message, variant: 'destructive' });
    } finally {
      setSaving((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }

  async function deleteLink(key: string) {
    if (!user) return;
    const link = links[key];
    if (!link?.amazon_url) {
      setLinks((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      return;
    }

    setSaving((prev) => new Set(prev).add(key));
    try {
      const { data: session } = await supabase.auth.getSession();
      const accessToken = session.session?.access_token;
      if (!accessToken) throw new Error('Not authenticated');

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-material-links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
        },
        body: JSON.stringify({ action: 'delete', material_key: key }),
      });

      const result = await res.json().catch(() => ({ error: 'Unexpected response' }));
      if (!res.ok) throw new Error(result.error || `Delete failed (${res.status})`);

      toast({ title: 'Deleted', description: link.display_name });
      setLinks((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setInitialLinks((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } catch (err: any) {
      toast({ title: 'Delete failed', description: err.message, variant: 'destructive' });
    } finally {
      setSaving((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }

  function hasChanges(key: string) {
    const current = links[key];
    const initial = initialLinks[key];
    if (!initial) return !!current?.amazon_url;
    return (
      current.display_name !== initial.display_name ||
      current.amazon_url !== initial.amazon_url ||
      current.notes !== initial.notes ||
      current.active !== initial.active ||
      current.affiliate_tag !== initial.affiliate_tag ||
      current.vendor !== initial.vendor
    );
  }

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/verify" replace />;

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
      <AdminBackBar />
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Materials Links</h1>
          <p className="text-muted-foreground">
            Curate supplier links for Montessori materials. {coveredCount} of {allMaterials.length} materials linked.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Default Amazon tag: <code className="bg-muted px-1 rounded">kerryhoward-20</code>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="w-4 h-4" aria-hidden="true" />
            Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${allMaterials.length ? (coveredCount / allMaterials.length) * 100 : 0}%` }}
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {coveredCount} linked · {allMaterials.length - coveredCount} pending
          </p>
        </CardContent>
      </Card>

      <div className="relative">
        <Input
          type="search"
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search materials"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMaterials.map((material) => {
            const key = material.key;
            const link = links[key] || {
              material_key: key,
              display_name: material.displayName,
              amazon_url: '',
              notes: '',
              active: true,
              affiliate_tag: '',
              vendor: '',
            };
            const previewUrl = link.amazon_url ? withAffiliateTag(link.amazon_url, link.affiliate_tag) : '';

            return (
              <Card key={key} className={hasChanges(key) ? 'border-primary' : undefined}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 space-y-1.5">
                      <Label htmlFor={`name-${key}`}>Display name</Label>
                      <Input
                        id={`name-${key}`}
                        value={link.display_name}
                        onChange={(e) => updateLink(key, { display_name: e.target.value })}
                      />
                    </div>
                    <div className="flex-[2] space-y-1.5">
                      <Label htmlFor={`url-${key}`}>Product URL</Label>
                      <Input
                        id={`url-${key}`}
                        value={link.amazon_url}
                        onChange={(e) => updateLink(key, { amazon_url: e.target.value })}
                        placeholder="https://www.amazon.com/dp/..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 space-y-1.5">
                      <Label htmlFor={`vendor-${key}`}>Supplier (optional)</Label>
                      <Input
                        id={`vendor-${key}`}
                        value={link.vendor}
                        onChange={(e) => updateLink(key, { vendor: e.target.value })}
                        placeholder="Amazon"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <Label htmlFor={`aff-${key}`}>Affiliate tag override (optional)</Label>
                      <Input
                        id={`aff-${key}`}
                        value={link.affiliate_tag}
                        onChange={(e) => updateLink(key, { affiliate_tag: e.target.value })}
                        placeholder="mystore-21 or ref=kerry"
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave blank to use the default Amazon tag. Use a bare code (added as{' '}
                        <code>tag=</code>) or an explicit <code>key=value</code> pair for other suppliers.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor={`notes-${key}`}>Notes</Label>
                    <Input
                      id={`notes-${key}`}
                      value={link.notes}
                      onChange={(e) => updateLink(key, { notes: e.target.value })}
                      placeholder="e.g. best value set of 6"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`active-${key}`}
                        checked={link.active}
                        onCheckedChange={(checked) => updateLink(key, { active: checked === true })}
                      />
                      <Label htmlFor={`active-${key}`} className="text-sm font-normal">
                        Active
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      {previewUrl && (
                        <a
                          href={previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          Preview
                          <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
                        </a>
                      )}
                      <Button
                        size="sm"
                        onClick={() => saveLink(key)}
                        disabled={saving.has(key) || !hasChanges(key)}
                      >
                        <Save className="w-4 h-4 mr-1" aria-hidden="true" />
                        {saving.has(key) ? 'Saving…' : 'Save'}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteLink(key)}
                        disabled={saving.has(key)}
                        aria-label="Clear link"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredMaterials.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No materials match your search.</p>
          )}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Affiliate disclosure: as an Amazon Associate we earn from qualifying purchases. Other supplier
        links may carry their own affiliate codes.
      </p>
    </div>
  );
};

export default AdminMaterialsPage;
