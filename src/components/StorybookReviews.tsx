import { useTranslation } from 'react-i18next';

const reviews = [
  { quote: 'This is such a fantastic example of teaching self-awareness, independence, self-care and empathy in a way that children can genuinely connect with. A beautiful story with an important life lesson — one that would spark some wonderful conversations both at home and in the classroom.', author: '_what_the_teacher_reads_', book: 'Biscuit Bunny Learns to Say No' },
  { quote: 'Such a lovely way to help little ones build independence and confidence at their own pace. The twin lambs sound absolutely adorable too!', author: 'patrycjaantczak', book: 'Marshmallow and Muffin Lambs Learn to Dress' },
  { quote: 'I love this great story! Great for independence.', author: 'sarahbaggott1', book: 'Marshmallow and Muffin Lambs Learn to Dress' },
  { quote: 'Beautiful artwork, beautiful message.', author: 'bobbiburnsbooks', book: 'Biscuit Bunny Learns to Say No' },
  { quote: 'I love the way this is illustrated.', author: 'lifewiththesykes' },
  { quote: "I really love the author's choice of words.", author: 'jennieobi' },
  { quote: 'Beautiful book.', author: 'emmacunninghamunspoken', book: 'Biscuit Bunny Learns to Say No' },
  { quote: 'This sounds really good.', author: 'littlelearningnest_' },
  { quote: 'So gorgeous!', author: 'theuffdasistersllc' },
];

export default function StorybookReviews() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="storybook-reviews-title" className="py-16 lg:py-20 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="storybook-reviews-title" className="text-3xl sm:text-4xl font-semibold text-foreground">{t('home.reviews.title')}</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">{t('home.reviews.intro')}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t('home.reviews.scope')}</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8 items-start">
          {reviews.map(review => (
            <figure key={review.author} className="m-0 border-l-2 border-border pl-5 py-1">
              <blockquote lang="en" className="text-foreground leading-relaxed">“{review.quote}”</blockquote>
              <figcaption className="mt-4 text-sm leading-relaxed">
                <a href={`https://www.instagram.com/${review.author}/`} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 break-all">@{review.author}</a>
                {review.book && <span className="block mt-1 text-muted-foreground">{t('home.reviews.on')} <cite lang="en" className="not-italic">{review.book}</cite></span>}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{t('home.reviews.source')} <a href="https://www.instagram.com/montessoristorybooks/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">@montessoristorybooks</a> {t('home.reviews.instagram')}</p>
      </div>
    </section>
  );
}