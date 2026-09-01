import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { storyBooks, type StoryBook } from '@/data/storyBooks';

type LiveBook = {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  buyLink: string;
  detailLink: string;
};

const DEFAULT_PRICE = 16.99;

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Keeps the shop in sync with montessoristorybooks.com.
 * The bundled list renders instantly; the live catalogue then adds any new
 * titles and refreshes covers, descriptions and buy links.
 */
export function useStoryBooks() {
  const [books, setBooks] = useState<StoryBook[]>(storyBooks);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const sync = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('story-books');
        if (error) throw error;

        const live: LiveBook[] = data?.books ?? [];
        if (cancelled || live.length === 0) return;

        const byName = new Map(storyBooks.map((b) => [normalize(b.name), b]));

      const merged: StoryBook[] = live.map((item) => {
          const existing = byName.get(normalize(item.name));
          // Live covers are relative asset paths from montessoristorybooks.com,
          // which 404 on this project's CDN. Known titles always keep their
          // bundled cover; new titles get an absolute URL to the source site.
          const liveImage = item.image
            ? item.image.startsWith('http')
              ? item.image
              : `https://montessoristorybooks.com${item.image}`
            : '';
          const image = existing?.image || liveImage;
          return {
            ...(existing ?? {
              id: item.slug,
              price: DEFAULT_PRICE,
              originalPrice: DEFAULT_PRICE,
              rating: 4.8,
              inStock: true,
              author: 'Kerry Howard',
              pages: 32,
              ageRange: '3-6 years',
              skillLevel: 'Beginner' as const,
              themes: [item.category],
            }),
            id: existing?.id ?? item.slug,
            price: DEFAULT_PRICE,
            originalPrice: DEFAULT_PRICE,
            name: item.name,
            description: item.description || existing?.description || '',
            image: item.image || existing?.image || '',
            category: existing?.category ?? 'Story Books',
            website: 'montessoristorybooks.com',
            amazonLink: item.buyLink || existing?.amazonLink,
          } as StoryBook;
        });

        setBooks(merged);
      } catch (err) {
        console.error('Story book sync failed, using bundled catalogue:', err);
      } finally {
        if (!cancelled) setIsSyncing(false);
      }
    };

    sync();
    return () => {
      cancelled = true;
    };
  }, []);

  return { books, isSyncing };
}
