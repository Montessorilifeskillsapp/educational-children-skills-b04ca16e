import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { useTranslation } from 'react-i18next';
import { publicPageMetadata } from '@/lib/pageMetadata';

const PlansPage: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  
  // SEO optimization for plans page
  useSEO({
    ...publicPageMetadata[pathname],
    keywords: "montessori premium, subscription plans, children education, learning app, family plans",
    canonical: pathname
  });

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <SEOOptimizer>
      <PageLayout title={t('pricing.page.title')} onBack={handleBack}>
        <SubscriptionPlans onBack={handleBack} />
      </PageLayout>
    </SEOOptimizer>
  );

};

export default PlansPage;