import React, { useState, useEffect } from 'react';
import BuilderAccess from '@/components/BuilderAccess';
import AppLayout from '@/components/AppLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';

const Index: React.FC = () => {
  const [showBuilderAccess, setShowBuilderAccess] = useState(() => {
    // Check if user has already entered the app in this session
    return !sessionStorage.getItem('appEntered');
  });
  
  // SEO optimization
  useSEO(SEO_CONFIG.home);

  const handleEnterApp = () => {
    console.log('handleEnterApp called');
    sessionStorage.setItem('appEntered', 'true');
    setShowBuilderAccess(false);
  };

  if (showBuilderAccess) {
    return (
      <SEOOptimizer>
        <BuilderAccess 
          onEnterApp={handleEnterApp}
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