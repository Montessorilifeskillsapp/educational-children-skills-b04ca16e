import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExternalLink, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ActivityMaterial } from '@/lib/materials';
import { normalizeMaterialKey } from '@/lib/materials';
import type { MaterialLink } from '@/hooks/useMaterialLinks';
import { withAffiliateTag, vendorLabel } from '@/lib/affiliate';
import { getMaterialImage } from '@/lib/materialImageRegistry';
import { resolveIncludedWith } from '@/lib/materialBundles';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';

export interface ResolvedMaterial {
  key: string;
  displayName: string;
  essential: boolean;
  amazonUrl: string | null;
  imageUrl?: string;
  vendor?: string;
  /** Product this material arrives inside, when it is not sold on its own. */
  includedWith?: string | null;
  /** Parent product whose link this material borrows, when it has none of its own. */
  inheritedFrom?: string | null;
}

interface MaterialBundleProps {
  title: string;
  materials: ResolvedMaterial[];
  className?: string;
  /** Hidden when the surrounding page already carries the disclosure. */
  showDisclosure?: boolean;
}

export function resolveMaterials(
  materials: ActivityMaterial[],
  linkMap: Map<string, MaterialLink>
): ResolvedMaterial[] {
  const siblings = materials.map((m) => m.displayName);
  return materials.map((m) => {
    const ownLink = linkMap.get(m.key);
    const displayName = ownLink?.display_name || m.displayName;
    const includedWith = resolveIncludedWith(m.key, siblings);

    let link = ownLink;
    let url = ownLink?.amazon_url || null;
    let inheritedFrom: string | null = null;

    if (!url && includedWith) {
      const parentLink = linkMap.get(normalizeMaterialKey(includedWith));
      if (parentLink?.amazon_url) {
        link = parentLink;
        url = parentLink.amazon_url;
        inheritedFrom = includedWith;
      }
    }

    return {
      key: m.key,
      displayName,
      essential: m.essential,
      amazonUrl: url ? withAffiliateTag(url, link?.affiliate_tag) : null,
      imageUrl: getMaterialImage(displayName),
      vendor: url ? vendorLabel(url, link?.vendor) : undefined,
      includedWith,
      inheritedFrom,
    };
  });
}

export function MaterialBundle({ title, materials, className, showDisclosure = true }: MaterialBundleProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {materials.map((material) => (
            <li
              key={material.key}
              className="flex items-start justify-between gap-3 p-3 rounded-lg border bg-card"
            >
              <div className="flex items-start gap-3 min-w-0">
                {material.imageUrl ? (
                  <img
                    src={material.imageUrl}
                    alt=""
                    loading="lazy"
                    width={48}
                    height={48}
                    className="shrink-0 w-12 h-12 object-cover rounded-md border bg-muted"
                  />
                ) : (
                  <div
                    className="shrink-0 w-12 h-12 rounded-md border bg-muted flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Package className="w-5 h-5 text-muted-foreground/60" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">
                    {material.displayName}
                    {material.essential && (
                      <span className="sr-only"> (essential)</span>
                    )}
                  </p>
                  {material.essential && (
                    <p className="text-xs text-muted-foreground mt-0.5">Essential</p>
                  )}
                  {material.includedWith ? (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Included with {material.includedWith}
                    </p>
                  ) : !material.amazonUrl ? (
                    <Link
                      to={`/materials/${material.key}`}
                      className="inline-block text-xs text-primary underline mt-0.5"
                    >
                      Use what you have
                    </Link>
                  ) : null}
                </div>
              </div>
              {material.amazonUrl ? (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="shrink-0 max-w-[45%] min-h-9 h-auto whitespace-normal border-primary/25 bg-primary/5 px-3 py-2 text-xs text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
                >
                  <a
                    href={material.amazonUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    aria-label={`Buy ${material.inheritedFrom || material.displayName} on ${vendorLabel(material.amazonUrl, material.vendor)}`}
                  >
                    <span>{material.inheritedFrom ? `Buy ${material.inheritedFrom}` : 'Buy'}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-2 shrink-0 text-primary" aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
            </li>
          ))}
        </ul>

        {!materials.some((material) => material.amazonUrl) && (
          <p className="text-xs text-muted-foreground text-center">
            Supplier links for these materials are not yet available. Source the items locally or check back soon.
          </p>
        )}

        {showDisclosure && <AffiliateDisclosure />}
      </CardContent>
    </Card>
  );
}

export default MaterialBundle;
