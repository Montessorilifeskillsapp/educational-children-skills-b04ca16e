import { describe, expect, it } from 'vitest';
import { missingPhotos } from '@/lib/offlinePhotos';

describe('offline photo saving', () => {
  it('downloads only photos not already saved, in order', async () => {
    const saved = new Set(['/assets/b.jpg']);
    const cache = { match: async (url: RequestInfo | URL) => (saved.has(String(url)) ? new Response('') : undefined) };
    expect(await missingPhotos(['/assets/a.jpg', '/assets/b.jpg', '/assets/c.jpg'], cache as Pick<Cache, 'match'>)).toEqual(['/assets/a.jpg', '/assets/c.jpg']);
  });
});
