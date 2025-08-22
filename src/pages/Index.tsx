import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import BuilderAccess from '@/components/BuilderAccess';
import AppLayout from '@/components/AppLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';

const Index: React.FC = () => {
  const [showBuilderAccess, setShowBuilderAccess] = useState(() => {
    // Check if user has already entered the app in this session
    try {
      // Clear any potentially corrupt session data on first load
      const appEntered = sessionStorage.getItem('appEntered');
      if (!appEntered) {
        // Clear localStorage to prevent issues with corrupted data
        localStorage.removeItem('montessori_profiles');
        localStorage.removeItem('montessori_active_profile');
        localStorage.removeItem('subscription-plan');
        localStorage.removeItem('purchased-items');
      }
      return !appEntered;
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
      <ErrorBoundary>
        <SEOOptimizer>
          <BuilderAccess 
            onEnterApp={handleEnterApp}
          />
        </SEOOptimizer>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Unable to Load Montessori App</h1>
          <p className="text-gray-600 mb-4">We're having trouble loading the app. This is usually a temporary issue.</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Refresh Page
            </button>
            <button 
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }} 
              className="block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Clear Data & Refresh
            </button>
          </div>
        </div>
      </div>
    }>
      <SEOOptimizer>
        <div className="app-container">
          <AppLayout />
        </div>
      </SEOOptimizer>
    </ErrorBoundary>
  );
};

export default Index;