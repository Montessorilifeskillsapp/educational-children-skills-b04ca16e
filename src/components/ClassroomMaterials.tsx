// ============= Full file contents =============

import React, { useMemo } from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { normalizeMaterialKey } from '@/lib/materials';
import { useMaterialLinks } from '@/hooks/useMaterialLinks';
import { withAffiliateTag, vendorLabel } from '@/lib/affiliate';
import { getMaterialImage } from '@/lib/materialImageRegistry';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { classroomSetupMaterialGroups } from '@/data/classroomSetupMaterials';

interface ResolvedGroupItem {
  key: string;
  displayName: string;
  amazonUrl: string | null;
  imageUrl?: string;
}

/** Classroom items that reuse an existing activity material's saved link. */
const LINK_ALIASES: Record<string, string> = {
  'small-jug-or-pitcher': 'child-sized-pitcher',
  'child-sized-apron': 'apron',
  'small-watering-can': 'watering-can',
};

/**
 * The classroom page's material list, presented as a room checklist rather
 * than a shopping list: grouped, quiet rows. Each item with a saved product
 * is itself the buy button — tapping the item opens its Amazon product.
 */
export const ClassroomMaterials: React.FC = () => {
  const { byKey, loading, error } = useMaterialLinks();

  const groups = useMemo(
    () =>
      classroomSetupMaterialGroups.map((group) => ({
        title: group.title,
        items: group.materials.map<ResolvedGroupItem>((name) => {
          const key = normalizeMaterialKey(name);
          const ownLink = byKey.get(key);
          const aliasKey = LINK_ALIASES[key];
          const link = ownLink?.amazon_url ? ownLink : (aliasKey ? byKey.get(aliasKey) : undefined) || ownLink;
          const displayName = ownLink?.display_name || name;
          return {
            key,
            displayName,
            amazonUrl: link?.amazon_url ? withAffiliateTag(link.amazon_url, link.affiliate_tag) : null,
            imageUrl: getMaterialImage(displayName),
          };
        }),
      })),
    [byKey]
  );

  return (
    <Card>
      <CardContent className="p-5 md:p-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Gather these gradually — begin with what you already have at home or in the
          classroom. Where a specific item is helpful, tapping it opens an authentic example.
        </p>


        <div className="mt-5 grid md:grid-cols-2 gap-x-8 gap-y-6">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {group.title}
              </h3>
              <ul className="divide-y divide-border/60">
                {group.items.map((item) => {
                  const row = (
                    <>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt=""
                          loading="lazy"
                          width={36}
                          height={36}
                          className="shrink-0 w-9 h-9 object-cover rounded-md border bg-muted"
                        />
                      ) : (
                        <span className="shrink-0 w-9 h-9 flex items-center justify-center">
                          <Check className="w-4 h-4 text-secondary" aria-hidden="true" />
                        </span>
                      )}
                       <span className="min-w-0 flex-1 flex flex-col gap-0.5">
                         <span className="text-sm leading-snug text-foreground/90">{item.displayName}</span>
                         {!item.amazonUrl && !loading && !error && (
                           <span className="text-xs text-muted-foreground">Use what you have available at home or in the classroom</span>
                         )}
                      </span>
                      {item.amazonUrl && (
                        <ExternalLink
                          className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  );

                  if (item.amazonUrl) {
                    return (
                      <li key={item.key}>
                        <a
                          href={item.amazonUrl}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          aria-label={`Buy ${item.displayName} on ${vendorLabel(item.amazonUrl)}`}
                          className="group flex items-center gap-3 py-2 rounded-md transition-colors hover:bg-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                        >
                          {row}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.key} className="flex items-center gap-3 py-2">
                      {row}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

         {error && <p className="mt-4 text-sm text-destructive" role="alert">Product links could not be loaded. Please try again later.</p>}

        <AffiliateDisclosure />
      </CardContent>
    </Card>
  );
};

export default ClassroomMaterials;
