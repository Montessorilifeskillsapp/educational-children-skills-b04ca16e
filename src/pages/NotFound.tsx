import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  // SEO optimization for 404 page
  useSEO({
    title: "Page Not Found - Montessori Learning App",
    description: "The page you're looking for doesn't exist. Return to our Montessori learning activities and continue your child's educational journey.",
    keywords: "404, page not found, montessori app",
    canonical: "/404"
  });

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <SEOOptimizer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-primary/20 to-accent/20 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50">
            {/* 404 Animation */}
            <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mb-6 animate-bounce">
              404
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The page you're looking for seems to have wandered off on its own learning adventure. 
              Let's get you back to exploring!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGoHome}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
              
              <Button 
                onClick={handleGoBack}
                variant="outline"
                size="lg"
                className="border-2 border-primary/25 text-primary hover:bg-primary/10 px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Fun Suggestions */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-primary/20 rounded-2xl">
              <div className="flex items-center justify-center mb-3">
                <Search className="w-5 h-5 text-primary mr-2" />
                <span className="font-semibold text-primary">What you might be looking for:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-primary">
                <span>• Practical Life Skills</span>
                <span>• Learning Activities</span>
                <span>• Progress Dashboard</span>
                <span>• Premium Plans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SEOOptimizer>
  );
};

export default NotFound;