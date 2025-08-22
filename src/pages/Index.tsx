import React, { useState, useEffect } from 'react';
import BuilderAccess from '@/components/BuilderAccess';
import AppLayout from '@/components/AppLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';

const Index: React.FC = () => {
  const [showBuilderAccess, setShowBuilderAccess] = useState(() => {
    // Check if user has already entered the app in this session
    try {
      return !sessionStorage.getItem('appEntered');
    } catch (error) {
      console.error('SessionStorage error:', error);
      return true; // Default to showing BuilderAccess if sessionStorage fails
    }
  });
  
  // SEO optimization
  useSEO(SEO_CONFIG.home);

  // Add loading state and error boundary
  const [isLoading, setIsLoading] = useState(false);

  const handleEnterApp = () => {
    console.log('handleEnterApp called');
    setIsLoading(true);
    try {
      sessionStorage.setItem('appEntered', 'true');
      setTimeout(() => {
        setShowBuilderAccess(false);
        setIsLoading(false);
      }, 100); // Small delay to ensure state updates properly
    } catch (error) {
      console.error('SessionStorage error in handleEnterApp:', error);
      // Even if sessionStorage fails, still proceed to app
      setTimeout(() => {
        setShowBuilderAccess(false);
        setIsLoading(false);
      }, 100);
    }
  };

  if (isLoading) {
    return (
      <SEOOptimizer>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your Montessori experience...</p>
          </div>
        </div>
      </SEOOptimizer>
    );
  }

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
      <div className="app-container">
        <AppLayout />
      </div>
    </SEOOptimizer>
  );
};

export default Index;