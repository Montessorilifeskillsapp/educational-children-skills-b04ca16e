import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles, Star } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { analytics } from '@/lib/analytics';
import pouringSet from '@/assets/pouring-set.jpg';
import { usePouringPhoto } from '@/lib/localizedMedia';

const STEP_NUMBERS = [1, 2, 3, 4, 5, 6] as const;

const PreviewPouringWaterPage: React.FC = () => {
  const { t } = useTranslation();
  const pouringPhoto = usePouringPhoto();
  const p = (key: string) => t(`pages.pouringPreview.${key}`);
  const [searchParams] = useSearchParams();
  const isFirstRun = searchParams.get('firstrun') === '1';

  useSEO({
    title: p('seoTitle'),
    description: p('seoDescription'),
    canonical: 'https://montessorilifeskillsapp.com/preview/pouring-water',
  });

  useEffect(() => {
    if (isFirstRun) analytics.track('first_run_landed', { activity: 'pouring-water' });
  }, [isFirstRun]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-foreground hover:text-primary">← Montessori Life Skills</Link>
          <Link to="/"><Button size="sm" variant={isFirstRun ? 'default' : 'outline'}>{p('openDashboard')}</Button></Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-10 lg:py-14">
        {isFirstRun && (
          <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground mb-1">{p('welcomeTitle')}</p>
                <p className="text-sm text-muted-foreground">{p('welcomeBody')}</p>
              </div>
            </div>
          </div>
        )}

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary mb-5">
          <Sparkles className="w-3.5 h-3.5" /> {p('badge')}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">
          {p('title')}
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          {p('meta')}
        </p>
        <div className="flex items-center gap-1 text-amber-500 mb-8">
          {[0,1,2,3,4].map(i => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
          <span className="text-sm text-muted-foreground ml-2">{p('loved')}</span>
        </div>

        <img decoding="async"
          src={pouringPhoto}
          alt={p('heroAlt')}
          width={1024} height={1024}
          className="w-full h-auto rounded-2xl shadow-xl border-4 border-card mb-10"
          loading="eager"
          // @ts-expect-error fetchpriority
          fetchpriority="high"
        />

        <section className="prose prose-lg max-w-none mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">{p('whyTitle')}</h2>
          <p className="text-foreground/80 leading-relaxed">{p('whyBody')}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">{p('materialsTitle')}</h2>
          <img decoding="async" src={pouringSet} alt={p('materialsAlt')} width={1024} height={1024} className="w-full max-w-md rounded-xl border border-border mb-4" loading="lazy" />
          <ul className="space-y-2 text-foreground/80">
            <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> {p('m1')}</li>
            <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> {p('m2')}</li>
            <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> {p('m3')}</li>
            <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> {p('m4')}</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">{p('stepsTitle')}</h2>
          <ol className="space-y-5">
            {STEP_NUMBERS.map((n, i) => (
              <li key={n} className="flex gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold flex items-center justify-center">{i + 1}</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{p(`s${n}t`)}</h3>
                  <p className="text-foreground/80 leading-relaxed">{p(`s${n}b`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{p('ctaTitle')}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{p('ctaBody')}</p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8">
              {p('ctaButton')} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-3">{p('ctaNote')}</p>
        </section>
      </article>
    </div>
  );
};

export default PreviewPouringWaterPage;
