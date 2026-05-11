import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, ExternalLink, Shield, Zap, Sparkles } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import BackButton from '@/components/ui/back-button';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuthContext } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { analytics } from '@/lib/analytics';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  meta?: string;
}

const FREE_PLAN: Plan = {
  id: 'free',
  name: 'Explorer',
  price: 0,
  period: 'forever',
  description: 'A real taste of the curriculum — no card required.',
  features: [
    '1 starter activity in each of the 8 curriculum areas',
    'Week 1 guided starter path',
    'Family Dashboard with progress tracking',
    'Ad-free, distraction-free experience',
  ],
};

const PREMIUM_MONTHLY: Plan = {
  id: 'premium-monthly',
  name: 'Premium',
  price: 29,
  period: 'month',
  description: 'Full curriculum, billed monthly. Cancel anytime.',
  features: [
    '100+ AMI-aligned activities across all 8 areas',
    'Step-by-step photo presentations for every activity',
    'New activities added every month',
    'Multiple child profiles & individual progress',
    'Printable bundles & seasonal packs',
    'Priority support',
  ],
};

const PREMIUM_YEARLY: Plan = {
  id: 'premium-yearly',
  name: 'Premium',
  price: 199,
  period: 'year',
  description: "Best value — save $149 vs monthly. Two months free.",
  features: [
    '100+ AMI-aligned activities across all 8 areas',
    'Step-by-step photo presentations for every activity',
    'New activities added every month',
    'Multiple child profiles & individual progress',
    'Printable bundles & seasonal packs',
    'Priority support',
  ],
  popular: true,
  meta: 'Just $16.58/month, billed annually',
};

const CONSULTATION: Plan = {
  id: 'consultation',
  name: 'Private Consultation',
  price: 225,
  period: 'session',
  description: "1-on-1 with a Montessori guide for your family's specific goals.",
  features: [
    '60-minute video session with an AMI-trained guide',
    'Customized curriculum tailored to your child',
    'Family routine & lifestyle integration',
    'Personalized materials recommendations',
    'Written homeschool action plan',
    '2 weeks of follow-up email support',
    '3-session package $600 (save $75)',
  ],
  premium: true,
};

interface SubscriptionPlansProps {
  onBack?: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onBack }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { currentPlan, subscribe } = useSubscription();
  const { user } = useAuthContext();

  const premiumPlan = billingCycle === 'yearly' ? PREMIUM_YEARLY : PREMIUM_MONTHLY;
  const plans: Plan[] = [FREE_PLAN, premiumPlan, CONSULTATION];

  useEffect(() => {
    analytics.track('paywall_view', { authenticated: !!user, current_plan: currentPlan?.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubscribe = async (plan: Plan) => {
    try {
      if (plan.id === 'consultation') {
        window.location.href =
          'mailto:hello@montessorilearning.app?subject=Private%20Homeschool%20Consultation%20Request&body=Hi!%20I%27m%20interested%20in%20booking%20a%20private%20consultation.%0A%0AChild%27s%20Age%3A%20%0ATopics%20of%20Interest%3A%20%0APreferred%20Date%2FTime%3A%20';
        toast({
          title: 'Consultation Request',
          description: "Your email app should open shortly. We'll reply within 24 hours.",
        });
        return;
      }

      if (plan.id === 'free') {
        if (currentPlan?.id === 'free') {
          toast({ title: "You're on the Explorer plan", description: 'Open the dashboard to start exploring.' });
          onBack?.();
        } else {
          subscribe(plan);
          toast({ title: 'Welcome to Explorer!', description: 'Your free starter activities are ready.' });
          if (onBack) setTimeout(() => onBack(), 1500);
        }
        return;
      }

      if (!user) {
        toast({
          title: 'Sign In Required',
          description: 'Please sign in to subscribe to a premium plan.',
          variant: 'destructive',
        });
        return;
      }

      setLoading(plan.id);
      try {
        const { data, error } = await supabase.functions.invoke('create-checkout', {
          body: { planId: plan.id },
        });
        if (error) throw error;
        if (!data?.url) throw new Error('Stripe checkout URL was not returned');
        toast({
          title: 'Redirecting to Checkout',
          description: 'Taking you to Stripe’s secure payment page…',
        });
        window.location.assign(data.url);
      } catch (error) {
        console.error('Checkout error:', error);
        toast({
          title: 'Checkout Error',
          description: 'Failed to start checkout. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(null);
      }
    } catch (error) {
      console.error('Error in handleSubscribe:', error);
      toast({
        title: 'Subscription Error',
        description: 'There was an issue processing your request. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-8">
      {onBack && <BackButton onClick={onBack} label="Back to Dashboard" />}

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          One subscription. The whole Montessori curriculum.
        </h1>
        <p className="text-lg text-muted-foreground mb-5">
          Most Montessori material kits cost $400+ per year and arrive in boxes you have to store.
          Our app costs less — and you reuse the household items you already own.
        </p>
        <div className="flex justify-center items-center gap-5 text-sm text-muted-foreground flex-wrap mb-8">
          <span className="inline-flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-accent text-accent" /> AMI-aligned
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-secondary" /> 30-day money-back guarantee
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" /> Cancel anytime
          </span>
        </div>

        {/* Billing toggle */}
        <div className="inline-flex items-center bg-muted rounded-full p-1 border border-border">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Annual
            <Badge className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0">Save 43%</Badge>
          </button>
        </div>
      </div>

      <section aria-label="Montessori learning subscription plans">
        <h2 className="sr-only">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan) => (
            <article key={plan.id} className={plan.popular ? 'md:-my-2' : ''}>
              <Card
                className={`${montessoriTheme.card.base} relative hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
                  plan.popular
                    ? 'ring-2 ring-primary shadow-xl bg-gradient-to-br from-primary/5 via-card to-accent/5'
                    : plan.premium
                    ? montessoriTheme.card.accent
                    : montessoriTheme.card.primary
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Best Value
                  </Badge>
                )}
                {plan.premium && (
                  <div className="absolute -top-3 right-4">
                    <Crown className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-extrabold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                    {plan.meta && (
                      <div className="text-sm text-secondary font-semibold mt-2">{plan.meta}</div>
                    )}
                    {plan.id === 'premium-monthly' && (
                      <div className="text-xs text-muted-foreground mt-2">
                        Switch to annual to save $149
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 px-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-1" aria-hidden="true" />
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      className={`w-full mb-3 ${
                        plan.popular
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                          : plan.premium
                          ? montessoriTheme.button.accent
                          : ''
                      }`}
                      variant={plan.id === 'free' || (!plan.popular && !plan.premium) ? 'outline' : 'default'}
                      onClick={() => handleSubscribe(plan)}
                      disabled={(currentPlan?.id === plan.id && plan.id !== 'free') || loading === plan.id}
                      aria-label={`Choose ${plan.name} plan`}
                    >
                      {loading === plan.id ? (
                        <>Processing… <ExternalLink className="w-4 h-4 ml-2" /></>
                      ) : currentPlan?.id === plan.id && plan.id === 'free' ? (
                        'Open your activities'
                      ) : currentPlan?.id === plan.id ? (
                        'Current plan'
                      ) : plan.id === 'free' ? (
                        'Start free — no card needed'
                      ) : plan.id === 'consultation' ? (
                        'Book a consultation'
                      ) : plan.id === 'premium-yearly' ? (
                        'Start annual — save $149'
                      ) : (
                        'Start monthly plan'
                      )}
                    </Button>

                    {plan.id !== 'free' && plan.id !== 'consultation' && (
                      <p className="text-xs text-muted-foreground text-center">
                        30-day money-back guarantee · Cancel anytime
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
