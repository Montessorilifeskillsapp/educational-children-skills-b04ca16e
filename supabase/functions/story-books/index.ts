import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SOURCE_URL = 'https://montessoristorybooks.com/books';

type LiveBook = {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  buyLink: string;
  detailLink: string;
};

function decode(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseBooks(html: string): LiveBook[] {
  const books: LiveBook[] = [];
  const seen = new Set<string>();
  const blocks = html.split('<li class="group');

  for (const block of blocks.slice(1)) {
    const detail = block.match(/href="(https:\/\/montessoristorybooks\.com\/books\/[a-z0-9-]+)"/i)?.[1];
    if (!detail) continue;
    const slug = detail.split('/').pop() as string;
    if (seen.has(slug)) continue;

    const image = block.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? '';
    const name = decode(block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] ?? '');
    const category = decode(
      block.match(/<p class="mt-5[^"]*"[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? 'Story Books',
    );
    const description = decode(
      block.match(/<p class="mt-2 text-sm[^"]*"[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? '',
    );
    const buyLink = block.match(/href="(https:\/\/shop\.ingramspark\.com\/[^"]+)"/i)?.[1] ?? detail;

    if (!name) continue;
    seen.add(slug);
    books.push({ slug, name, description, image, category, buyLink: buyLink.replace(/&amp;/g, '&'), detailLink: detail });
  }

  return books;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const res = await fetch(SOURCE_URL, {
      headers: { 'User-Agent': 'MontessoriLifeSkillsApp/1.0 (+https://montessorilifeskillsapp.com)' },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Source fetch failed [${res.status}]: ${body.slice(0, 300)}`);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch story books source', status: res.status }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const html = await res.text();
    const books = parseBooks(html);

    if (books.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No books parsed from source' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ books, fetchedAt: new Date().toISOString() }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
    });
  } catch (error) {
    console.error('story-books error:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
