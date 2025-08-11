import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, Gift, ArrowRight } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface PaymentSuccessProps {
  onContinue: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onContinue }) => {
  const { currentPlan, isPremium } = useSubscription();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for your purchase! Your payment has been processed successfully.
          </p>
          
          {isPremium && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">
                  Welcome to {currentPlan?.name}!
                </span>
              </div>
              <p className="text-sm text-purple-700">
                You now have access to all premium features and content.
              </p>
            </div>
          )}
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">What's Next?</span>
            </div>
            <p className="text-sm text-blue-700">
              Explore your new materials and start your enhanced learning journey!
            </p>
          </div>
          
          <Button 
            onClick={onContinue}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Continue to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;