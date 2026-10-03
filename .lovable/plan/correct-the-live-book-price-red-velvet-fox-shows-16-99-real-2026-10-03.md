# Correct the live book price (Red Velvet Fox shows $16.99, real price is $24.99)

## What's wrong
The Red Velvet Fox Learns to Read page on montessoristorybooks.com shows **$24.99**, in its main price and on its "Buy this book — $24.99" button. The app shows $16.99.

The price reader looks for the first "Buy $X" on the page. The main button's wording ("Buy this book — $24.99") doesn't fit that pattern, so the reader skips it. It picks up the "Buy $16.99" button of a *different* book listed further down the page under related books.

The same mistake would hit any book whose price differs from $16.99. The other 14 books really are $16.99 today.

## Fix
1. Read the price only from the book's own section of its page, in this order:
   - the main "Buy this book — $X" button
   - the large price shown under the description
   - the price beside the book title in the page's purchase bar
2. Never read the price from the related-books cards. If none of the three is found, keep the bundled price as today.
3. Update the bundled price for Red Velvet Fox to $24.99. The shop then shows the right price even before the live check finishes.

## Check
- Call the price service and confirm Red Velvet Fox returns 24.99 and the other books return 16.99.
- Open the Shop and confirm Red Velvet Fox shows $24.99.

Website-only change; no app store release.

## Technical notes
- `supabase/functions/story-books/index.ts` → `parseDetailPrice`: match `Buy this book\s*[—·-]\s*(?:<!--\s*-->)?\$X`, then `mt-8 font-display text-3xl[^>]*>\$X`, then the sticky-bar `font-semibold">{title}</p><p ...>\$X`. Remove the generic first-`$` fallback, which is what picked up the related-book price.
- `src/data/storyBooks.ts`: change the Red Velvet Fox `price` and `originalPrice` to 24.99.
