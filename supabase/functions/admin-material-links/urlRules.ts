const PRODUCT_HOSTS = new Set(['amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.es', 'amazon.fr', 'amazon.it', 'amazon.ca', 'amazon.com.au', 'amazon.co.jp', 'amazon.in', 'amazon.com.mx', 'amazon.com.br', 'amazon.nl', 'amazon.se', 'amazon.pl', 'amazon.com.be', 'amazon.ae', 'amazon.sa', 'amazon.sg']);
export function approvedProductUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');
    return url.protocol === 'https:' && !url.username && !url.password && !url.port && PRODUCT_HOSTS.has(host) ? url : null;
  } catch { return null; }
}