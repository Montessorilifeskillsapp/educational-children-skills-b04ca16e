import React from 'react';
import { ShoppingCart, ExternalLink, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ActivityMaterial } from '@/lib/materials';
import type { MaterialLink } from '@/hooks/useMaterialLinks';
import { withAffiliateTag, isAmazonUrl } from '@/lib/affiliate';
import { getMaterialImage } from '@/lib/materialImageRegistry';

export interface ResolvedMaterial {
  key: string;
  displayName: string;
  essential: boolean;
  amazonUrl: string | null;
  imageUrl?: string;
}

interface MaterialBundleProps {
  title: string;
  materials: ResolvedMaterial[];
  disclosure?: string;
  className?: string;
}

export function resolveMaterials(
  materials: ActivityMaterial[],
  linkMap: Map<string, MaterialLink>
): ResolvedMaterial[] {
  return materials.map((m) => {
    const link = linkMap.get(m.key);
    const url = link?.amazon_url || null;
    return {
      key: m.key,
      displayName: link?.display_name || m.displayName,
      essential: m.essential,
      amazonUrl: url ? withAffiliateTag(url) : null,
      imageUrl: getMaterialImage(link?.display_name || m.displayName),
    };
  });
}

export function MaterialBundle({ title, materials, disclosure, className }: MaterialBundleProps) {
  const linked = materials.filter((m) => m.amazonUrl && isAmazonUrl(m.amazonUrl));
  const allLinked = linked.length === materials.length && materials.length > 0;

  const buyAllUrl = (() => {
    if (!linked.length) return null;
    // Amazon does not support a true multi-item affiliate cart URL, so we link
    // to the first essential item (or first item) when "Buy all" is clicked.
    const first = materials.find((m) => m.essential && m.amazonUrl)?.amazonUrl
      || linked[0].amazonUrl;
    return first;
  })();

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
                  <div className="shrink-0 mt-0.5">
                    {material.essential ? (
                      <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                    ) : (
                      <span className="block w-4 h-4 rounded-full border border-muted-foreground/30" aria-hidden="true" />
                    )}
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
                  {!material.amazonUrl && (
                    <p className="text-xs text-muted-foreground mt-0.5">Source locally</p>
                  )}
                </div>
              </div>
              {material.amazonUrl ? (
                <a
                  href={material.amazonUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="shrink-0 inline-flex items-center text-xs font-medium text-primary hover:underline"
                  aria-label={`Buy ${material.displayName} on Amazon`}
                >
                  Buy
                  <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        {buyAllUrl ? (
          <Button asChild className="w-full">
            <a
              href={buyAllUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              aria-label="Buy materials on Amazon"
            >
              <ShoppingCart className="w-4 h-4 mr-2" aria-hidden="true" />
              Buy all on Amazon
            </a>
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground text-center">
            Amazon links for these materials are not yet available. Source the items locally or check back soon.
          </p>
        )}

        {disclosure && (
          <p className="text-xs text-muted-foreground text-center">{disclosure}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default MaterialBundle;
