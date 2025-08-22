import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const PaymentCancelPage: React.FC = () => {
  const navigate = useNavigate();

  // SEO optimization
  useSEO({
    title: "Payment Cancelled - Montessori Learning App",
    description: "Your payment was cancelled. You can try again anytime to unlock premium Montessori learning features.",
    keywords: "payment cancelled, montessori subscription, try again",
    canonical: "/payment-cancel"
  });

  const handleRetry = () => {
    navigate('/plans');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <SEOOptimizer>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-800">
              Payment Cancelled
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              No worries! Your payment was cancelled and no charges were made to your account.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                You can continue using our free Montessori activities, or upgrade anytime to unlock the full learning experience.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleRetry}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={handleBack}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SEOOptimizer>
  );
};

export default PaymentCancelPage;