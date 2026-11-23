import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';
import { Trans, useTranslation } from 'react-i18next';
import { formatDate } from '@/i18n/format';

const LAST_UPDATED = new Date(2026, 10, 16);

const AccessibilityPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const k = (key: string, opts?: Record<string, unknown>) => t(`pages.accessibility.${key}`, opts) as string;
  const asList = <T,>(key: string) => {
    const v = t(`pages.accessibility.${key}`, { returnObjects: true });
    return (Array.isArray(v) ? v : []) as T[];
  };
  const doList = asList<string>('do');
  const gaps = asList<{ label: string; text: string }>('gaps');
  useSEO({
    title: k('seoTitle'),
    description: k('seoDescription'),
    keywords: 'accessibility statement, WCAG 2.1 AA, Section 508, ADA, montessori app accessibility',
    canonical: '/accessibility',
  });

  return (
    <SEOOptimizer>
      <PageLayout title={k('title')} onBack={() => navigate(-1)}>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 prose max-w-none">
              <p className="text-sm text-muted-foreground mb-6">{k('updated', { date: formatDate(LAST_UPDATED, { dateStyle: 'long' }) })}</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{k('commitTitle')}</h2>
                <p className="mb-4">{k('commit1')}</p>
                <p className="mb-4">{k('commit2')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{k('doTitle')}</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {doList.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{k('gapsTitle')}</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {gaps.map((g) => <li key={g.label}><strong>{g.label}</strong> {g.text}</li>)}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{k('helpTitle')}</h2>
                <p className="mb-4">
                  <Trans
                    i18nKey="pages.accessibility.help1"
                    components={{ mail: <a href="mailto:montessorilifeskills@gmail.com" className="text-primary hover:underline" /> }}
                  />
                </p>
                <p className="mb-4">{k('help2')}</p>
              </section>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default AccessibilityPage;
