import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, ExternalLink, Shield, Zap, Sparkles, RefreshCw } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import BackButton from '@/components/ui/back-button';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuthContext } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { analytics } from '@/lib/analytics';
import { getStoredUtm } from '@/hooks/useUtmTracking';
import {
  isNativePurchaseAvailable,
  purchaseProductId,
  restorePurchases,
  PRODUCT_MONTHLY,
  PRODUCT_ANNUAL,
  PRODUCT_CONSULTATION,
} from '@/lib/revenuecat';

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

type CheckoutResponse = {
  url?: string;
  error?: string;
};

type FunctionErrorContext = {
  error?: string;
};

const getCheckoutErrorDetail = (error: unknown) => {
  if (error instanceof Error) {
    const context = (error as Error & { context?: FunctionErrorContext }).context;
    return context?.error || error.message;
  }

  return 'Please try again.';
};

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onBack }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);
  const { toast } = useToast();
  const { currentPlan, subscribe, refreshSubscription } = useSubscription();
  const { user } = useAuthContext();
  const pendingCheckoutStarted = useRef(false);
  const isNative = isNativePurchaseAvailable();

  const premiumPlan = billingCycle === 'yearly' ? PREMIUM_YEARLY : PREMIUM_MONTHLY;
  const plans: Plan[] = [FREE_PLAN, premiumPlan, CONSULTATION];

  const productIdForPlan = (planId: string): string | null => {
    if (planId === 'premium-monthly') return PRODUCT_MONTHLY;
    if (planId === 'premium-yearly') return PRODUCT_ANNUAL;
    if (planId === 'consultation') return PRODUCT_CONSULTATION;
    return null;
  };

  const startNativePurchase = async (plan: Plan) => {
    const productId = productIdForPlan(plan.id);
    if (!productId) return;
    setLoading(plan.id);
    try {
      analytics.track('subscribe_started', {
        plan_id: plan.id,
        billing_cycle: billingCycle,
        price: plan.price,
        platform: 'native',
        attribution: getStoredUtm(),
      });
      await purchaseProductId(productId);
      toast({ title: 'Purchase complete', description: 'Your subscription is now active.' });
      try { await refreshSubscription?.(); } catch { /* noop */ }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // RevenueCat throws { userCancelled: true } when user dismisses the sheet
      const cancelled = /cancel/i.test(msg) || (err as { userCancelled?: boolean })?.userCancelled;
      if (!cancelled) {
        console.error('Native purchase failed', err);
        toast({
          title: 'Purchase failed',
          description: msg.slice(0, 240),
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(null);
    }
  };

  const handleRestore = async () => {
    setRestoring(true);
    try {
      await restorePurchases();
      try { await refreshSubscription?.(); } catch { /* noop */ }
      toast({ title: 'Purchases restored', description: 'If you had an active subscription, it is now linked to this account.' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: 'Restore failed', description: msg.slice(0, 240), variant: 'destructive' });
    } finally {
      setRestoring(false);
    }
  };

  const startStripeCheckout = async (plan: Plan) => {
    setLoading(plan.id);
    try {
      analytics.track('subscribe_started', { plan_id: plan.id, billing_cycle: billingCycle, price: plan.price, attribution: getStoredUtm() });
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId: plan.id },
      });
      if (error) throw error;
      const checkoutData = data as CheckoutResponse | null;
      if (checkoutData?.error) throw new Error(checkoutData.error);
      if (!data?.url) throw new Error('Stripe checkout URL was not returned');
      toast({
        title: 'Redirecting to Checkout',
        description: 'Taking you to Stripe’s secure payment page…',
      });
      window.location.assign(data.url);
    } catch (error: unknown) {
      console.error('Checkout error:', error);
      const detail = getCheckoutErrorDetail(error);
      toast({
        title: 'Checkout Error',
        description: String(detail).slice(0, 240),
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    analytics.track('paywall_view', { authenticated: !!user, current_plan: currentPlan?.id, attribution: getStoredUtm() });
    // Enroll logged-in non-subscribers in the 24h paywall-abandon recovery email.
    // The edge function is idempotent (ON CONFLICT DO NOTHING) and self-checks subscription status.
    if (user && currentPlan?.id !== 'premium-monthly' && currentPlan?.id !== 'premium-yearly') {
      void supabase.functions.invoke('schedule-paywall-abandon').catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user || pendingCheckoutStarted.current) return;

    const pendingPlanId = sessionStorage.getItem('post_auth_plan');
    if (pendingPlanId !== 'premium-monthly' && pendingPlanId !== 'premium-yearly') return;

    const pendingPlan = pendingPlanId === 'premium-yearly' ? PREMIUM_YEARLY : PREMIUM_MONTHLY;
    pendingCheckoutStarted.current = true;
    sessionStorage.removeItem('post_auth_plan');
    void startStripeCheckout(pendingPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubscribe = async (plan: Plan) => {
    try {
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

      // Consultation is always an offline-arranged email booking (web + native).
      // Apple IAP rules: we do not charge for it in-app, so no price is shown on native.
      if (plan.id === 'consultation') {
        const email = 'hello@montessorilearning.app';
        const mailto =
          `mailto:${email}?subject=Private%20Homeschool%20Consultation%20Request&body=Hi!%20I%27m%20interested%20in%20booking%20a%20private%20consultation.%0A%0AChild%27s%20Age%3A%20%0ATopics%20of%20Interest%3A%20%0APreferred%20Date%2FTime%3A%20`;
        try {
          if (isNative) {
            // On iOS/Android WebView, mailto: through window.location can be blocked.
            // window.open lets the OS hand it off to the default mail client.
            window.open(mailto, '_system');
          } else {
            window.location.href = mailto;
          }
        } catch {
          /* fall through to toast */
        }
        // Copy email so users without a configured mail app can still reach us.
        try { await navigator.clipboard?.writeText(email); } catch { /* noop */ }
        toast({
          title: 'Consultation Request',
          description: `If your mail app didn't open, email us at ${email} (copied to clipboard). We reply within 24 hours.`,
        });
        return;
      }


      if (!user) {
        toast({
          title: 'Sign in to continue',
          description: 'Redirecting you to sign in so we can start checkout…',
        });
        try {
          sessionStorage.setItem('post_auth_redirect', '/plans');
          sessionStorage.setItem('post_auth_plan', plan.id);
        } catch {
          console.warn('Unable to store checkout redirect intent');
        }
        setTimeout(() => {
          window.location.assign(`/auth?redirect=${encodeURIComponent('/plans')}`);
        }, 600);
        return;
      }

      if (isNative) {
        await startNativePurchase(plan);
      } else {
        await startStripeCheckout(plan);
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

        {/* Comparison strip */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mb-8 text-left">
          <div className="p-3 sm:p-4 rounded-xl border border-border/60 bg-muted/40">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Material kits</p>
            <p className="text-lg sm:text-2xl font-bold text-foreground">$400+</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Boxes to store</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border border-border/60 bg-muted/40">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Private school</p>
            <p className="text-lg sm:text-2xl font-bold text-foreground">$15k+</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Per child / year</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary mb-1">This app</p>
            <p className="text-lg sm:text-2xl font-bold text-foreground">$199<span className="text-sm font-medium text-muted-foreground">/yr</span></p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Whole family</p>
          </div>
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
                    {isNative && plan.id === 'consultation' ? (
                      <>
                        <span className="text-3xl font-extrabold text-foreground">By request</span>
                        <div className="text-xs text-muted-foreground mt-2">
                          Arranged directly with our team — not sold in-app.
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mt-3 px-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features
                      .filter((f) => !(isNative && plan.id === 'consultation' && /\$/.test(f)))
                      .map((feature, index) => (
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

      {isNative && (
        <div className="text-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRestore}
            disabled={restoring}
            className="text-muted-foreground"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${restoring ? 'animate-spin' : ''}`} />
            {restoring ? 'Restoring…' : 'Restore Purchases'}
          </Button>
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
            Subscriptions are billed through your {' '}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            App Store / Google Play account and can be managed there at any time.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
