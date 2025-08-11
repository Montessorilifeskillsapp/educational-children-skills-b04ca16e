import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import PageLayout from '@/components/PageLayout';

const PlansPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <PageLayout title="Choose Your Plan" onBack={handleBack}>
      <SubscriptionPlans />
    </PageLayout>
  );

};

export default PlansPage;