import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, ArrowRight, Loader2 } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { subscription_tier, subscribed, checkSubscription } = useSubscription();
  const [isRefreshing, setIsRefreshing] = useState(true);

  const planId = searchParams.get('planId');
  const sessionId = searchParams.get('session_id');

  const planLabel = useMemo(() => {
    if (planId === 'premium' || planId === 'premium-monthly') {
      return 'Premium';
    }

    return 'premium';
  }, [planId]);

  useSEO({
    title: 'Payment Successful - Montessori Learning App',
    description: 'Your payment has been processed successfully. Welcome to your premium Montessori learning experience!',
    keywords: 'payment success, montessori premium, subscription confirmation',
    canonical: '/payment-success'
  });

  useEffect(() => {
    let isMounted = true;

    const refreshSubscription = async () => {
      setIsRefreshing(true);

      for (let attempt = 0; attempt < 3; attempt += 1) {
        const result = await checkSubscription();

        if (result.subscribed) {
          break;
        }

        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      }

      if (isMounted) {
        setIsRefreshing(false);
      }
    };

    void refreshSubscription();

    return () => {
      isMounted = false;
    };
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
              {isRefreshing ? <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" /> : <CheckCircle className="w-10 h-10 text-emerald-600" />}
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-800">
              {isRefreshing ? 'Finalizing Your Subscription…' : 'Payment Successful!'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              {isRefreshing
                ? 'We’re confirming your Stripe checkout and syncing your subscription access.'
                : `Thanks for subscribing${sessionId ? ` with checkout ${sessionId.slice(0, 8)}…` : ''}. Your access is ready.`}
            </p>
            
            {subscribed ? (
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 rounded-lg border border-primary/25">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">
                    Welcome to {subscription_tier ?? planLabel}!
                  </span>
                </div>
                <p className="text-sm text-primary">
                  You now have access to all premium Montessori activities and content.
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700">
                  If premium access does not appear right away, refresh this page in a few seconds and we’ll sync it.
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
              disabled={isRefreshing}
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