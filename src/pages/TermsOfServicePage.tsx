import React from 'react';
import LegalDocPage from '@/components/legal/LegalDocPage';
import { termsEn } from '@/content/terms/terms.en';
import { termsLoaders } from '@/content/terms/loaders';

const TermsOfServicePage: React.FC = () => (
  <LegalDocPage
    english={termsEn}
    loaders={termsLoaders}
    keywords="terms of service, user agreement, montessori app terms, conditions"
    canonical="/terms-of-service"
  />
);

export default TermsOfServicePage;
