import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, ArrowRight } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { subscription_tier, subscribed, checkSubscription } = useSubscription();

  // SEO optimization
  useSEO({
    title: "Payment Successful - Montessori Learning App",
    description: "Your payment has been processed successfully. Welcome to your premium Montessori learning experience!",
    keywords: "payment success, montessori premium, subscription confirmation",
    canonical: "/payment-success"
  });

  useEffect(() => {
    // Refresh subscription status when component mounts
    checkSubscription();
  }, [checkSubscription]);

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <SEOOptimizer>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-800">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Thank you for your purchase! Your payment has been processed successfully.
            </p>
            
            {subscribed && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">
                    Welcome to {subscription_tier} Plan!
                  </span>
                </div>
                <p className="text-sm text-purple-700">
                  You now have access to all premium Montessori activities and content.
                </p>
              </div>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                Start exploring your enhanced learning journey with beautifully guided activities designed to nurture independence and confidence.
              </p>
            </div>
            
            <Button 
              onClick={handleContinue}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Continue to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </SEOOptimizer>
  );
};

export default PaymentSuccessPage;