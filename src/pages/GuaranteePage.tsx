import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, RefreshCw, XCircle, CheckCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const GuaranteePage: React.FC = () => {
  const { t } = useTranslation();
  const items = t('pages.guarantee.items', { returnObjects: true }) as { title: string; body: string }[];
  const icons = [CheckCircle, RefreshCw, XCircle, Mail];
  useSEO({
    title: '30-Day Money-Back Guarantee | Montessori Life Skills',
    description: 'Try Montessori Life Skills risk-free for 30 days. Full refund if it isn\'t the right fit for your family. No questions asked.',
    canonical: 'https://montessorilifeskillsapp.com/guarantee',
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">{t('pages.guarantee.back')}</Link>

        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700">
          <ShieldCheck className="w-4 h-4" /> {t('pages.guarantee.badge')}
        </div>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">{t('pages.guarantee.title')}</h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{t('pages.guarantee.intro')}</p>

        <section className="space-y-5 mb-12">
          {(Array.isArray(items) ? items : []).map(({ title, body }, i) => { const Icon = icons[i] ?? CheckCircle; return (
            <div key={title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
              <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-1">{title}</h2>
                <p className="text-foreground/80 leading-relaxed text-sm">{body}</p>
              </div>
            </div>
          ); })}
        </section>

        <section className="rounded-2xl bg-muted/40 border border-border p-6">
          <h2 className="font-semibold text-foreground mb-2">{t('pages.guarantee.howTitle')}</h2>
          <p className="text-foreground/80 text-sm leading-relaxed">
            <Trans i18nKey="pages.guarantee.how" values={{ email: 'montessorilifeskills@gmail.com' }} components={{ 1: <a href="mailto:montessorilifeskills@gmail.com" className="text-primary underline" /> }} />
          </p>
        </section>
      </div>
    </div>
  );
};

export default GuaranteePage;
