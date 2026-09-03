export const AMAZON_AFFILIATE_TAG = 'kerryhoward-20';

export function withAffiliateTag(url: string): string {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('amazon')) return url;

    // Remove any existing tag
    parsed.searchParams.delete('tag');
    parsed.searchParams.set('tag', AMAZON_AFFILIATE_TAG);

    // Normalize Amazon product links to use the shorter ASIN path when possible
    // e.g. https://www.amazon.com/dp/B08XXXXX or https://www.amazon.com/gp/product/B08XXXXX
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
