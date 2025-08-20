import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Users } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import { useSEO } from '@/hooks/useSEO';
import BackButton from '@/components/ui/back-button';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSubscription } from '@/contexts/SubscriptionContext';
import PaymentModal from './PaymentModal';
import { Shield, Zap } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
}



const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with Montessori learning',
    features: [
      '5 basic practical life activities',
      'Basic progress tracking dashboard',
      'Community support forum access',
      'Essential materials guide PDF',
      'Email learning tips newsletter'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Individual',
    price: 9.99,
    period: 'month',
    description: 'Unlock your child\'s full learning potential',
    features: [
      'Unlimited access to 50+ activities',
      'Advanced progress analytics & reports',
      'Premium materials bundles discount',
      'HD video tutorials for each activity',
      'Priority customer support',
      'Printable worksheets & certificates',
      'Age-appropriate activity recommendations',
      'Offline activity access'
    ],
    popular: true
  },
  {
    id: 'family',
    name: 'Family Premium',
    price: 19.99,
    period: 'month',
    description: 'Perfect for families with multiple children',
    features: [
      'Everything in Premium Individual',
      'Up to 5 child profiles & tracking',
      'Family progress dashboard overview',
      '20% discount on all materials bundles',
      'Monthly parent training video calls',
      'Custom learning paths for each child',
      'Sibling activity coordination tools',
      'Extended customer support hours'
    ],
    premium: true
  }
];

interface SubscriptionPlansProps {
  onBack?: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onBack }) => {
  // Always call hooks at the top level
  useSEO({
    title: 'Premium Family Learning Plans - Unlock Advanced Activities',
    description: 'Unlock advanced Montessori activities and exclusive content with our premium family plans. 30-day money-back guarantee.',
    keywords: 'montessori premium, family learning plan, educational subscription, advanced activities',
    canonical: '/plans'
  });
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const { toast } = useToast();
  const { currentPlan, subscribe } = useSubscription();

  const handleSubscribe = (plan: Plan) => {
    if (plan.id === 'free') {
      subscribe(plan);
      toast({
        title: "Welcome to Free Starter Plan!",
        description: "You can now access basic Montessori activities and start your learning journey.",
      });
    } else {
      setSelectedPlanId(plan.id);
      setPaymentModalOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Premium subscription activated!",
      description: "Welcome to enhanced Montessori learning. Enjoy unlimited access!",
    });
  };

  return (
    <div className="space-y-6">
      {onBack && (
        <BackButton onClick={onBack} label="Back to Dashboard" />
      )}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold ${montessoriTheme.text.accent} mb-4`}>
          Premium Montessori Learning Plans for Families
        </h1>
        <p className={`text-xl ${montessoriTheme.text.muted} mb-6`}>
          Choose the perfect plan to unlock advanced Montessori activities and accelerate your child's development
        </p>
        <div className={`flex justify-center items-center gap-6 text-sm ${montessoriTheme.text.light} flex-wrap`}>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-blue-400 text-blue-400" aria-hidden="true" />
            <span>Trusted by 10,000+ families worldwide</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" aria-hidden="true" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span>Cancel anytime, no questions asked</span>
          </div>
        </div>
      </div>

        <section aria-label="Montessori learning subscription plans">
          <h2 className="sr-only">Choose Your Montessori Learning Subscription Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <article key={plan.id}>
                <Card 
                  className={`${montessoriTheme.card.base} relative hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
                    plan.popular ? `${montessoriTheme.card.info} ring-2 ring-blue-500 scale-105` : 
                    plan.premium ? montessoriTheme.card.accent : montessoriTheme.card.primary
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Most Popular Choice
                    </Badge>
                  )}
                  {plan.premium && (
                    <div className="absolute -top-3 right-4">
                       <Crown className="w-6 h-6 text-blue-500" aria-hidden="true" />
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className={`text-2xl font-bold ${montessoriTheme.text.primary}`}>
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className={`text-4xl font-bold ${montessoriTheme.text.secondary}`}>
                        ${plan.price}
                      </span>
                      <span className={montessoriTheme.text.muted}>/{plan.period}</span>
                      {plan.price > 0 && (
                        <div className="text-sm text-green-600 mt-1">
                          Save ${((plan.price * 12) - (plan.price * 10)).toFixed(2)} with annual billing
                        </div>
                      )}
                    </div>
                    <p className={`${montessoriTheme.text.muted} mt-2`}>{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className={`text-sm ${montessoriTheme.text.primary}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto">
                      <Button
                        className={`w-full mb-3 ${
                          plan.popular 
                            ? montessoriTheme.button.secondary
                            : plan.premium 
                              ? montessoriTheme.button.accent
                              : montessoriTheme.button.primary
                        }`}
                        variant={plan.id === 'free' ? 'outline' : 'default'}
                        onClick={() => handleSubscribe(plan)}
                        disabled={currentPlan?.id === plan.id}
                        aria-label={`Subscribe to ${plan.name} plan for $${plan.price} per ${plan.period}`}
                      >
                        {currentPlan?.id === plan.id
                          ? 'Current Active Plan' 
                          : plan.id === 'free' 
                            ? 'Start Free Today' 
                            : `Start ${plan.name} Plan`
                        }
                      </Button>
                      
                      {plan.id !== 'free' && (
                        <p className={`text-xs ${montessoriTheme.text.light} text-center`}>
                          No commitment • Cancel anytime • Secure payment
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </section>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        planId={selectedPlanId}
      />
    </div>
  );

};

export default SubscriptionPlans;