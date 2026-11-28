import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';
import { publicPageMetadata } from '@/lib/pageMetadata';

export default function ComparePage() {
  const { t } = useTranslation();
  useSEO({ ...publicPageMetadata['/compare'], canonical: '/compare' });
  const rows = ['who', 'work', 'rewards'] as const;
  return (
    <main className="min-h-dvh bg-background text-foreground px-4 py-10 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Button asChild variant="ghost" className="mb-8"><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Montessori Life Skills</Link></Button>
        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight max-w-3xl">{t('home.comparison.title')}</h1>
        <p className="mt-5 mb-10 max-w-3xl text-lg text-muted-foreground leading-relaxed">{t('home.comparison.intro')}</p>
        <div className="overflow-x-auto border-y border-border" role="region" aria-label={t('home.comparison.title')} tabIndex={0}>
          <table className="w-full min-w-[620px] text-left text-sm leading-relaxed">
            <thead className="bg-muted"><tr>
              {['feature', 'adult', 'screen'].map(key => <th scope="col" key={key} className="p-4 w-1/3 font-semibold">{t(`home.comparison.${key}`)}</th>)}
            </tr></thead>
            <tbody>{rows.map(key => <tr key={key} className="border-t border-border">
              <th scope="row" className="p-4 font-medium">{t(`home.comparison.${key}`)}</th>
              <td className="p-4">{t(`home.comparison.${key}Adult`)}</td>
              <td className="p-4 text-muted-foreground">{t(`home.comparison.${key}Screen`)}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="my-5 text-sm text-muted-foreground leading-relaxed">{t('home.comparison.note')}</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild><Link to="/preview/pouring-water">{t('home.sample.cta')}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          <Button asChild variant="outline"><Link to="/pricing">{t('home.cta.viewPlans')}</Link></Button>
        </div>
      </div>
    </main>
  );
}