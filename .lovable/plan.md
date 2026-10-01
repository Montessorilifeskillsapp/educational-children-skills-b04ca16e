# Sync book prices live from montessoristorybooks.com

## Background
- Shop prices are hardcoded at $16.99 in `src/data/storyBooks.ts`.
- The `story-books` edge function already scrapes the listing page (titles, covers, descriptions, buy links) but deliberately forces every price back to $16.99 in `useStoryBooks.ts`.
- The listing page shows no price, but each book's own detail page (e.g. `/books/red-velvet-fox-learns-to-read`) shows it: a `Buy $16.99` button next to the IngramSpark link and a price line (`font-display ... ">$16.99`).
- Confirmed by fetching a real detail page: price appears multiple times; the primary paperback price sits with the main Buy button ($24.99 on the page is a second format/related item, not our link target).

## Changes

### 1. `supabase/functions/story-books/index.ts`
- After parsing the listing, fetch each book's detail page (`https://montessoristorybooks.com/books/<slug>`) in parallel with a per-request timeout.
- Parse the price: first `Buy <!-- -->$X.XX` occurrence; fallback to the first price line; fallback to bundled $16.99 if unparseable.
- Include `price` (number, USD) in each book returned. Keep the existing `Cache-Control: max-age=1800` and error behavior unchanged.

### 2. `src/hooks/useStoryBooks.ts`
- Add `price?: number` to the `LiveBook` type.
- Stop forcing `DEFAULT_PRICE`: when the live sync returns a valid price, use it for `price` and `originalPrice` (so no stale strikethrough); otherwise keep the bundled price.
- Bundled catalogue stays as the instant-render fallback, as today.

## Verification
- Deploy the function and call it: confirm each book returns a real price (should be 16.99 today).
- Load `/shop` in the preview and confirm prices render from live data.
- Typecheck + existing tests pass.

## Notes
- Website-only change; no app store release needed.
- The edge function hits montessoristorybooks.com once per listing sync plus one request per book; acceptable at current traffic, and responses are CDN-cached 30 minutes.
