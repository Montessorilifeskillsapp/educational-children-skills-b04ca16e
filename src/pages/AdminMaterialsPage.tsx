import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Save, Trash2, ExternalLink, Package, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
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
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { extractAllMaterialsFromSkills, normalizeMaterialKey } from '@/lib/materials';
import { withAffiliateTag } from '@/lib/affiliate';
import { cn } from '@/lib/utils';

interface LinkForm {
  material_key: string;
  display_name: string;
  amazon_url: string;
  notes: string;
  active: boolean;
  affiliate_tag: string;
  vendor: string;
}

interface SectionGroup {
  key: string;
  title: string;
  emoji: string;
  route: string;
  materials: { key: string; displayName: string; essential: boolean }[];
}

const AdminMaterialsPage: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [search, setSearch] = useState('');
  const [essentialOnly, setEssentialOnly] = useState(false);
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [links, setLinks] = useState<Record<string, LinkForm>>({});
  const [initialLinks, setInitialLinks] = useState<Record<string, LinkForm>>({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const sections = useMemo<SectionGroup[]>(() => {
    return curriculumSectionsForMaterials.map((section) => ({
      ...section,
      materials: extractAllMaterialsFromSkills(section.skills),
    }));
  }, []);

  const allMaterialsCount = useMemo(
    () => sections.reduce((sum, s) => sum + s.materials.length, 0),
    [sections]
  );

  const coveredCount = useMemo(
    () =>
      sections.reduce(
        (sum, section) =>
          sum +
          section.materials.filter((m) => !!links[m.key]?.amazon_url?.trim()).length,
        0
      ),
    [sections, links]
  );

  const filteredSections = useMemo<SectionGroup[]>(() => {
    const term = search.trim().toLowerCase();
    return sections
      .map((section) => {
        let materials = section.materials;
        if (term) {
          materials = materials.filter((m) => m.displayName.toLowerCase().includes(term));
        }
        if (essentialOnly) {
          materials = materials.filter((m) => m.essential);
        }
        return { ...section, materials };
      })
      .filter((section) => section.materials.length > 0);
  }, [sections, search, essentialOnly]);

  useEffect(() => {
    // Expand sections that match the current search so results are visible.
    if (!search.trim() && !essentialOnly) return;
    setExpanded((prev) => {
      const next = new Set(prev);
      for (const section of filteredSections) {
        next.add(section.key);
      }
      return next;
    });
  }, [filteredSections, search, essentialOnly]);

  function toggleSection(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function expandAll() {
    setExpanded(new Set(filteredSections.map((s) => s.key)));
  }

  function collapseAll() {
    setExpanded(new Set());
  }

  function scrollToSection(key: string) {
    const el = sectionRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setExpanded((prev) => new Set(prev).add(key));
  }

  function updateLink(key: string, patch: Partial<LinkForm>, displayName?: string) {
    setLinks((prev) => ({
      ...prev,
      [key]: {
        material_key: key,
        display_name: prev[key]?.display_name || displayName || '',
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
    <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      <AdminBackBar />
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Materials Links</h1>
          <p className="text-muted-foreground">
            Curate supplier links for Montessori materials. {coveredCount} of {allMaterialsCount} linked.
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
            Overall coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{
                width: `${allMaterialsCount ? (coveredCount / allMaterialsCount) * 100 : 0}%`,
              }}
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {coveredCount} linked · {allMaterialsCount - coveredCount} pending
          </p>
        </CardContent>
      </Card>

      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-y -mx-6 px-6 py-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Input
              type="search"
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search materials"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Checkbox
                id="essential-only"
                checked={essentialOnly}
                onCheckedChange={(checked) => setEssentialOnly(checked === true)}
              />
              <Label htmlFor="essential-only" className="text-sm font-normal">
                Essential only
              </Label>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={expandAll}>
                Expand all
              </Button>
              <Button variant="ghost" size="sm" onClick={collapseAll}>
                Collapse all
              </Button>
            </div>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto mt-3 pb-1" aria-label="Curriculum areas">
          {filteredSections.map((section) => {
            const sectionLinked = section.materials.filter(
              (m) => !!links[m.key]?.amazon_url?.trim()
            ).length;
            const isExpanded = expanded.has(section.key);
            return (
              <button
                key={section.key}
                onClick={() => scrollToSection(section.key)}
                className={cn(
                  'shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors',
                  isExpanded
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border'
                )}
                aria-pressed={isExpanded}
              >
                <span aria-hidden="true">{section.emoji}</span>
                <span className="whitespace-nowrap">{section.title}</span>
                <span className={cn('text-xs', isExpanded ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  {sectionLinked}/{section.materials.length}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-6">
          {filteredSections.map((section) => {
            const isOpen = expanded.has(section.key);
            const sectionLinked = section.materials.filter(
              (m) => !!links[m.key]?.amazon_url?.trim()
            ).length;
            const sectionTotal = section.materials.length;

            return (
              <Card
                key={section.key}
                ref={(el) => {
                  sectionRefs.current[section.key] = el;
                }}
              >
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`section-${section.key}`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span aria-hidden="true">{section.emoji}</span>
                    <span className="font-semibold">{section.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {sectionLinked} of {sectionTotal} linked
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:block w-24 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${sectionTotal ? (sectionLinked / sectionTotal) * 100 : 0}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <CardContent id={`section-${section.key}`} className="pt-0 pb-4 space-y-3">
                    {section.materials.map((material) => {
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
                      const previewUrl = link.amazon_url
                        ? withAffiliateTag(link.amazon_url, link.affiliate_tag)
                        : '';

                      return (
                        <Card
                          key={key}
                          className={cn(
                            'transition-colors',
                            hasChanges(key) ? 'border-primary' : 'border-border/60'
                          )}
                        >
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                              {material.essential && (
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                  Essential
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <div className="flex-1 space-y-1.5">
                                <Label htmlFor={`name-${key}`}>Display name</Label>
                                <Input
                                  id={`name-${key}`}
                                  value={link.display_name}
                                  onChange={(e) =>
                                    updateLink(key, { display_name: e.target.value }, material.displayName)
                                  }
                                />
                              </div>
                              <div className="flex-[2] space-y-1.5">
                                <Label htmlFor={`url-${key}`}>Product URL</Label>
                                <Input
                                  id={`url-${key}`}
                                  value={link.amazon_url}
                                  onChange={(e) =>
                                    updateLink(key, { amazon_url: e.target.value }, material.displayName)
                                  }
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
                                  onChange={(e) =>
                                    updateLink(key, { vendor: e.target.value }, material.displayName)
                                  }
                                  placeholder="Amazon"
                                />
                              </div>
                              <div className="flex-1 space-y-1.5">
                                <Label htmlFor={`aff-${key}`}>Affiliate tag override (optional)</Label>
                                <Input
                                  id={`aff-${key}`}
                                  value={link.affiliate_tag}
                                  onChange={(e) =>
                                    updateLink(key, { affiliate_tag: e.target.value }, material.displayName)
                                  }
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
                                onChange={(e) =>
                                  updateLink(key, { notes: e.target.value }, material.displayName)
                                }
                                placeholder="e.g. best value set of 6"
                              />
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-1">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`active-${key}`}
                                  checked={link.active}
                                  onCheckedChange={(checked) =>
                                    updateLink(key, { active: checked === true }, material.displayName)
                                  }
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

                    <button
                      onClick={() => toggleSection(section.key)}
                      className="w-full flex items-center justify-center gap-1 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      Collapse {section.title}
                    </button>
                  </CardContent>
                )}
              </Card>
            );
          })}

          {filteredSections.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No materials match your filters. Try clearing the search or turning off “Essential only.”
            </p>
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
