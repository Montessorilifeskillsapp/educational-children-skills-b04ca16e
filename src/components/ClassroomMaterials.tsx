import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

/**
 * The classroom page's material list, presented as a room checklist rather
 * than a shopping list: grouped, quiet rows, and the purchase links folded
 * away behind a single "Where to find these" expander.
 */
export const ClassroomMaterials: React.FC = () => {
  const { byKey } = useMaterialLinks();
  const [showShopping, setShowShopping] = useState(false);

  const groups = useMemo(
    () =>
      classroomSetupMaterialGroups.map((group) => ({
        title: group.title,
        items: group.materials.map<ResolvedGroupItem>((name) => {
          const key = normalizeMaterialKey(name);
          const link = byKey.get(key);
          const displayName = link?.display_name || name;
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

  const linkedUrls = groups
    .flatMap((g) => g.items)
    .filter((i) => !!i.amazonUrl)
    .map((i) => i.amazonUrl as string);

  const buyAllUrl = linkedUrls[0] ?? null;

  return (
    <Card>
      <CardContent className="p-5 md:p-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          What to have in the room — much of it you may already own. Nothing here needs to be
          bought all at once.
        </p>

        <div className="mt-5 grid md:grid-cols-2 gap-x-8 gap-y-6">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {group.title}
              </h3>
              <ul className="divide-y divide-border/60">
                {group.items.map((item) => (
                  <li key={item.key} className="flex items-center gap-3 py-2">
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
                    <span className="text-sm text-foreground/90 leading-snug min-w-0">
                      {item.displayName}
                    </span>
                    {showShopping && (
                      <span className="ml-auto shrink-0 text-xs">
                        {item.amazonUrl ? (
                          <a
                            href={item.amazonUrl}
                            target="_blank"
                            rel="sponsored noopener noreferrer"
                            className="inline-flex items-center text-primary hover:underline"
                            aria-label={`Buy ${item.displayName} on ${vendorLabel(item.amazonUrl)}`}
                          >
                            Buy
                            <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
                          </a>
                        ) : (
                          <Link
                            to={`/materials/${item.key}`}
                            className="text-muted-foreground hover:text-primary hover:underline"
                          >
                            Use what you have
                          </Link>
                        )}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-border/60 pt-4">
          {!showShopping ? (
            <button
              type="button"
              onClick={() => setShowShopping(true)}
              className="text-sm text-primary hover:underline inline-flex items-center gap-1.5"
              aria-expanded={false}
            >
              Where to find these
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <div className="space-y-4">
              {buyAllUrl ? (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a
                    href={buyAllUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    aria-label={`Buy materials on ${vendorLabel(buyAllUrl)}`}
                  >
                    {`Buy on ${vendorLabel(buyAllUrl)}`}
                  </a>
                </Button>
              ) : null}
              <button
                type="button"
                onClick={() => setShowShopping(false)}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Hide shopping links
              </button>
              <AffiliateDisclosure />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassroomMaterials;
