import { Check, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PlanComparison() {
  const { t } = useTranslation();
  const columns = ['free', 'premiumMonthly', 'familyMonthly', 'consultation'] as const;
  const included = <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 shrink-0" aria-hidden="true" />{t('pricing.comparison.included')}</span>;
  const separate = t('pricing.comparison.separate');
  const rows = [
    { key: 'profiles', values: [t('pricing.comparison.one'), t('pricing.comparison.one'), t('pricing.comparison.four'), separate] },
    { key: 'curriculum', values: [t('pricing.comparison.starters'), included, included, separate] },
    { key: 'progress', values: [t('pricing.comparison.one'), t('pricing.comparison.one'), t('pricing.comparison.perChild'), separate] },
    { key: 'consultation', values: [t('pricing.comparison.optional'), t('pricing.comparison.optional'), t('pricing.comparison.optional'), t('pricing.comparison.session')] },
    { key: 'support', values: [<span className="inline-flex items-center gap-1.5" key="no-priority"><Minus className="h-4 w-4 shrink-0" aria-hidden="true" />{t('pricing.comparison.noPriority')}</span>, t('pricing.plans.premiumMonthly.features.4'), t('pricing.plans.premiumMonthly.features.4'), t('pricing.plans.consultation.features.5')] },
  ];

  return (
    <section className="max-w-6xl mx-auto" aria-labelledby="plan-comparison-title">
      <h2 id="plan-comparison-title" className="text-2xl font-semibold text-foreground mb-4">{t('pricing.comparison.title')}</h2>
      <div className="overflow-x-auto border-y border-border" role="region" aria-labelledby="plan-comparison-title" tabIndex={0}>
        <table className="w-full min-w-[760px] table-fixed text-sm text-foreground text-left">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="w-1/5 px-4 py-4 font-semibold">{t('pricing.comparison.feature')}</th>
              {columns.map((column) => <th scope="col" key={column} className={`px-4 py-4 font-semibold ${column === 'familyMonthly' ? 'bg-primary/10' : ''}`}>{t(`pricing.plans.${column}.name`)}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-border last:border-b-0">
                <th scope="row" className="px-4 py-4 font-medium">{t(`pricing.comparison.${row.key}`)}</th>
                {row.values.map((value, index) => <td key={columns[index]} className={`px-4 py-4 align-top leading-relaxed break-words ${columns[index] === 'familyMonthly' ? 'bg-primary/10 font-medium' : ''}`}>{value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t('pricing.comparison.note')}</p>
    </section>
  );
}