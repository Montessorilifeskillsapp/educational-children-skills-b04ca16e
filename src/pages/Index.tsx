import React, { useState } from 'react';
import BuilderAccess from '@/components/BuilderAccess';
import AppLayout from '@/components/AppLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';

const Index: React.FC = () => {
  const [showBuilderAccess, setShowBuilderAccess] = useState(true);
  
  // SEO optimization
  useSEO(SEO_CONFIG.home);

  if (showBuilderAccess) {
    return (
      <SEOOptimizer>
        <BuilderAccess 
          onEnterApp={() => setShowBuilderAccess(false)}
        />
      </SEOOptimizer>
    );
  }

  return (
    <SEOOptimizer>
      <AppLayout />
    </SEOOptimizer>
  );
};

export default Index;