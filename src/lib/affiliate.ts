export const AMAZON_AFFILIATE_TAG = 'kerryhoward-20';

/**
 * An affiliate tag override can be either:
 *  - a bare value, e.g. `mystore-21` (applied as `tag=mystore-21`), or
 *  - an explicit query pair, e.g. `ref=kerry` or `partner_id=1234`.
 */
export function parseAffiliateTag(tag?: string | null): { key: string; value: string } | null {
  if (!tag) return null;
  const trimmed = tag.trim();
  if (!trimmed) return null;
  const eq = trimmed.indexOf('=');
  if (eq > 0) {
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!key || !value) return null;
    return { key, value };
  }
  return { key: 'tag', value: trimmed };
}

/**
 * Appends the appropriate affiliate parameter to a product URL.
 *
 * - Amazon URLs get the default Associates tag unless a per-link override is supplied.
 * - Non-Amazon (other suppliers) URLs are only tagged when an override is supplied,
 *   so each supplier can carry its own affiliate parameter.
 */
export function withAffiliateTag(url: string, overrideTag?: string | null): string {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const override = parseAffiliateTag(overrideTag);
    const amazon = parsed.hostname.includes('amazon');

    if (override) {
      parsed.searchParams.delete(override.key);
      parsed.searchParams.set(override.key, override.value);
      return parsed.toString();
    }

    if (!amazon) return url;

    parsed.searchParams.delete('tag');
    parsed.searchParams.set('tag', AMAZON_AFFILIATE_TAG);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function isAmazonUrl(url: string): boolean {
  if (!url) return false;
  try {
    return new URL(url).hostname.includes('amazon');
  } catch {
    return false;
  }
}

/** Human-friendly supplier name used in button labels. */
export function vendorLabel(url?: string | null, vendor?: string | null): string {
  if (vendor && vendor.trim()) return vendor.trim();
  if (!url) return 'supplier';
  if (isAmazonUrl(url)) return 'Amazon';
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const name = host.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return 'supplier';
  }
}
