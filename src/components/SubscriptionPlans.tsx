import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Users, ExternalLink } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import BackButton from '@/components/ui/back-button';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuthContext } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
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
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Start with the Basics - Explore Montessori-style learning at home',
    features: [
      '3 core activities (pouring, sweeping, rolling a mat)',
      '1 printable activity sheet',
      'Daily Life Skill Prompt',
      'Gentle, ad-free experience'
    ]
  },
  {
    id: 'premium-monthly',
    name: 'Premium',
    price: 15,
    period: 'month',
    description: 'Unlock Their Potential - Full access to all premium features',
    features: [
      '20+ Montessori life skill activities',
      'All new content every month',
      'Beautifully illustrated printable bundles',
      'Voice-guided instructions (coming soon!)',
      'Progress badges and certificates',
      'Family dashboard with skill tracking',
      'Bonus seasonal activity packs'
    ],
    popular: true
  },
  {
    id: 'consultation',
    name: 'Private Consultation',
    price: 149,
    period: 'session',
    description: 'Personalized Homeschool Setup - A custom Montessori plan built around your child and family',
    features: [
      '1-on-1 consultation with a Montessori guide',
      'Customized curriculum tailored to your child\'s age & interests',
      'Family lifestyle & schedule integration',
      'Personalized materials & activity recommendations',
      'Written homeschool action plan delivered after session',
      'Follow-up email support for 2 weeks'
    ],
    premium: true
  }
];

interface SubscriptionPlansProps {
  onBack?: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onBack }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { currentPlan, subscribe } = useSubscription();
  const { user } = useAuthContext();

  const handleSubscribe = async (plan: Plan) => {
    console.log('handleSubscribe called with plan:', plan);
    try {
      if (plan.id === 'free') {
        if (currentPlan?.id === 'free') {
          console.log('User already on free plan');
          toast({
            title: "You're already on the Free Plan!",
            description: "Start exploring your Montessori activities now.",
          });
          // Navigate back or to dashboard to show activities
          if (onBack) {
            onBack();
          }
      } else if (plan.id === 'consultation') {
        // Open email for consultation booking
        window.location.href = 'mailto:hello@montessorilearning.app?subject=Private%20Homeschool%20Consultation%20Request&body=Hi!%20I%27m%20interested%20in%20booking%20a%20private%20consultation%20to%20set%20up%20a%20customized%20Montessori%20homeschool%20plan%20for%20my%20family.%0A%0AChild%27s%20Age%3A%20%0ATopics%20of%20Interest%3A%20%0APreferred%20Date%2FTime%3A%20';
        toast({
          title: "Consultation Request",
          description: "Your email app should open shortly. We'll get back to you within 24 hours!",
        });
        return;
      } else {
          console.log('Subscribing to free plan...');
          subscribe(plan);
          console.log('Free plan subscription completed');
          toast({
            title: "Welcome to Free Starter Plan!",
            description: "You can now access basic Montessori activities and start your learning journey.",
          });
          // Navigate back after subscribing
          if (onBack) {
            setTimeout(() => onBack(), 1500);
          }
        }
      } else {
        if (!user) {
          toast({
            title: "Sign In Required",
            description: "Please sign in to subscribe to a premium plan.",
            variant: "destructive"
          });
          return;
        }
        
        console.log('Creating Stripe checkout for premium plan');
        setLoading(plan.id);
        
        try {
          const { data, error } = await supabase.functions.invoke('create-checkout', {
            body: { planId: plan.id }
          });
          
          if (error) throw error;
          if (!data?.url) throw new Error('Stripe checkout URL was not returned');
          
          toast({
            title: "Redirecting to Checkout",
            description: "Taking you to Stripe’s secure payment page...",
          });

          window.location.assign(data.url);
        } catch (error) {
          console.error('Checkout error:', error);
          toast({
            title: "Checkout Error",
            description: "Failed to start checkout process. Please try again.",
            variant: "destructive"
          });
        } finally {
          setLoading(null);
        }
      }
    } catch (error) {
      console.error('Error in handleSubscribe:', error);
      toast({
        title: "Subscription Error",
        description: "There was an issue processing your request. Please try again.",
        variant: "destructive"
      });
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                        disabled={(currentPlan?.id === plan.id && plan.id !== 'free') || loading === plan.id}
                        aria-label={`Subscribe to ${plan.name} plan for $${plan.price} per ${plan.period}`}
                      >
                        {loading === plan.id ? (
                          <>
                            Processing... <ExternalLink className="w-4 h-4 ml-2" />
                          </>
                        ) : currentPlan?.id === plan.id && plan.id === 'free' ? (
                          'Explore Your Activities' 
                        ) : currentPlan?.id === plan.id ? (
                          'Current Active Plan' 
                        ) : plan.id === 'free' ? (
                          'Start Free Today' 
                        ) : (
                          `Start ${plan.name} Plan`
                        )}
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

    </div>
  );

};

export default SubscriptionPlans;