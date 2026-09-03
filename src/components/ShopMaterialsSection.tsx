import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { useMaterialLinks } from '@/hooks/useMaterialLinks';
import { extractAllMaterialsFromSkills } from '@/lib/materials';
import { withAffiliateTag } from '@/lib/affiliate';
import { MaterialBundle, ResolvedMaterial } from './MaterialBundle';

export function ShopMaterialsSection() {
  const { byKey, loading } = useMaterialLinks();
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const sections = useMemo(() => {
    return curriculumSectionsForMaterials.map((section) => ({
      ...section,
      materials: extractAllMaterialsFromSkills(section.skills),
    }));
  }, []);

  function toggle(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  if (loading) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Materials</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Browse by curriculum area and find Amazon links for authentic Montessori materials.
      </p>

      {sections.map((section) => {
        const isOpen = expanded.has(section.key);
        const resolved: ResolvedMaterial[] = section.materials.map((m) => {
          const link = byKey.get(m.key);
          return {
            key: m.key,
            displayName: link?.display_name || m.displayName,
            essential: m.essential,
            amazonUrl: link?.amazon_url ? withAffiliateTag(link.amazon_url) : null,
          };
        });
        const hasLinks = resolved.some((m) => m.amazonUrl);

        return (
          <Card key={section.key}>
            <button
              onClick={() => toggle(section.key)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`materials-${section.key}`}
            >
              <div className="flex items-center gap-2">
                <span aria-hidden="true">{section.emoji}</span>
                <span className="font-medium">{section.title}</span>
                <span className="text-xs text-muted-foreground">
                  ({resolved.filter((m) => m.amazonUrl).length}/{resolved.length} linked)
                </span>
              </div>
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {isOpen && (
              <CardContent id={`materials-${section.key}`} className="pt-0 pb-4">
                {hasLinks ? (
                  <MaterialBundle
                    title={`${section.title} materials bundle`}
                    materials={resolved}
                    disclosure="As an Amazon Associate we earn from qualifying purchases."
                  />
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    No Amazon links for {section.title} materials yet.{' '}
                    <Link to={section.route} className="underline text-primary">
                      Browse activities
                    </Link>{' '}
                    to find locally sourced alternatives.
                  </p>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}

export default ShopMaterialsSection;
