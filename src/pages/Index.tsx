import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import AppLayout from '@/components/AppLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';

const APP_VERSION = "1.0.0";

const Index: React.FC = () => {
  // SEO optimization
  useSEO(SEO_CONFIG.home);

  return (
    <>
      {/* Version Badge — always visible */}
      <div className="fixed top-3 left-3 z-[9999]">
        <span className="inline-flex items-center px-2 py-1 bg-slate-800/90 text-white text-[10px] font-mono font-medium rounded shadow-lg backdrop-blur-sm">
          v{APP_VERSION}
        </span>
      </div>
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
          <AppLayout />
        </SEOOptimizer>
      </ErrorBoundary>
    </>
  );
};

export default Index;