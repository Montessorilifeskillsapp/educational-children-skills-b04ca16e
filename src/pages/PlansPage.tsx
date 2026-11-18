import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { useTranslation } from 'react-i18next';

const PlansPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // SEO optimization for plans page
  useSEO({
    title: "Premium Plans - Montessori Learning App",
    description: "Choose the perfect Montessori learning plan for your family. Premium access to advanced activities, progress tracking, and expert guidance.",
    keywords: "montessori premium, subscription plans, children education, learning app, family plans",
    canonical: "/plans"
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