import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Crown, Star } from 'lucide-react';

interface PremiumGateProps {
  children: React.ReactNode;
  isPremium?: boolean;
  onUpgrade: () => void;
  title?: string;
  description?: string;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ 
  children, 
  isPremium = false, 
  onUpgrade,
  title = "Premium Content",
  description = "Upgrade to access this exclusive content"
}) => {
  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none">
        {children}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border-2 border-blue-200">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">Premium Access Required</CardTitle>
            <p className="text-gray-600 text-sm">Unlock this activity with a premium subscription</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                <Star className="w-4 h-4 text-blue-500" />
                <span>Unlimited access to all activities</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                <Star className="w-4 h-4 text-blue-500" />
                <span>Advanced progress tracking</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                <Star className="w-4 h-4 text-blue-500" />
                <span>Premium materials & resources</span>
              </div>
            </div>

            <Button 
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Lock className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
            
            <p className="text-xs text-gray-500 mt-3">
              Starting at $9.99/month • Cancel anytime
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumGate;