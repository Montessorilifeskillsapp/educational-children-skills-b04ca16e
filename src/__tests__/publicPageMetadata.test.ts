import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { canonicalUrl, pageHead, publicPageMetadata } from '@/lib/pageMetadata';

const html = readFileSync('index.html', 'utf8');

describe('Public page heads', () => {
  it.each(Object.keys(publicPageMetadata))('%s has its own canonical before JavaScript runs', (path) => {
    const doc = new DOMParser().parseFromString(pageHead(html, path), 'text/html');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`https://montessorilifeskillsapp.com${path}`);
    expect(doc.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  });

  it('Monthly Premium publishes exactly $29.99 USD', () => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent ?? '{}'));
    const offer = schemas.find(schema => schema['@type'] === 'WebApplication').offers.find((entry: { name: string }) => entry.name === 'Monthly Premium');
    expect(offer.price).toBe('29.99');
    expect(offer.priceCurrency).toBe('USD');
  });

  it('normalizes old curriculum domains to the app domain', () => {
    expect(canonicalUrl('https://montessori-skills.com/sensorial')).toBe('https://montessorilifeskillsapp.com/sensorial');
  });
});