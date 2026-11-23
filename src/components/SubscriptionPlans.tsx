import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import AccessCodeRedeem from './AccessCodeRedeem';
import {
  isNativePurchaseAvailable,
  purchaseProductId,
  restorePurchases,
  PRODUCT_MONTHLY,
  PRODUCT_ANNUAL,
  PRODUCT_FAMILY_MONTHLY,
  PRODUCT_FAMILY_ANNUAL,
  PRODUCT_CONSULTATION,
  syncCurrentRevenueCatStatus,
} from '@/lib/revenuecat';
import { forceWebViewRepaint } from '@/hooks/useNativeWebViewRecovery';
import ConsultationDialog from './ConsultationDialog';
import { Trans, useTranslation } from 'react-i18next';
import i18n from '@/i18n';

// Plan constants keep English copy as identifiers; screen text comes from pricing.plans.<key>.
const PLAN_KEYS: Record<string, string> = {
  free: 'free', 'premium-monthly': 'premiumMonthly', 'premium-yearly': 'premiumYearly',
  'family-monthly': 'familyMonthly', 'family-yearly': 'familyYearly', consultation: 'consultation',
};

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
    '1 starter activity in each of the 9 curriculum areas',
    'Montessori Classroom Setup Guide (online)',
    'Family Dashboard for one child',
    'Ad-free, distraction-free experience',
  ],
};

const PREMIUM_MONTHLY: Plan = {
  id: 'premium-monthly',
  name: 'Premium',
  price: 29.99,
  period: 'month',
  description: 'Full curriculum, billed monthly. Cancel anytime.',
  features: [
    '100+ AMI-aligned activities across all 9 areas',
    'Written presentation steps for every activity',
    'New activities added every month',
    'Covers one child',
    'Priority support',
  ],
};

const PREMIUM_YEARLY: Plan = {
  id: 'premium-yearly',
  name: 'Premium',
  price: 199,
  period: 'year',
  description: "Best value — save $160.88 vs monthly.",
  features: [
    '100+ AMI-aligned activities across all 9 areas',
    'Written presentation steps for every activity',
    'New activities added every month',
    'Covers one child',
    'Priority support',
  ],
  popular: true,
  meta: 'Just $16.58/month, billed annually',
};

const FAMILY_MONTHLY: Plan = {
  id: 'family-monthly',
  name: 'Family',
  price: 49,
  period: 'month',
  description: 'Full curriculum for up to four children, billed monthly.',
  features: [
    'Everything in Premium',
    'Up to four child profiles',
    'Separate goals, progress, and calendar for each child',
    'Priority support',
  ],
  premium: true,
};

const FAMILY_YEARLY: Plan = {
  id: 'family-yearly',
  name: 'Family',
  price: 349,
  period: 'year',
  description: 'Full curriculum for up to four children, billed annually.',
  features: [
    'Everything in Premium',
    'Up to four child profiles',
    'Separate goals, progress, and calendar for each child',
    'Priority support',
  ],
  premium: true,
  meta: 'Just $29.08/month, billed annually',
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
  scheduled?: boolean;
  effectiveAt?: string;
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

  return i18n.t('pricing.toast.tryAgain');
};

const formatSubscriptionEnd = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(i18n.resolvedLanguage || undefined, { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onBack }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [syncingStatus, setSyncingStatus] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const { toast } = useToast();
  const { currentPlan, subscribe, refreshSubscription, isPremium, loading: subscriptionLoading, subscriptionEnd, provider } = useSubscription();
  const { user } = useAuthContext();
  const pendingCheckoutStarted = useRef(false);
  const isNative = isNativePurchaseAvailable();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const planText = (plan: Plan) => {
    const key = `pricing.plans.${PLAN_KEYS[plan.id]}`;
    return {
      name: t(`${key}.name`),
      description: t(`${key}.description`),
      meta: plan.meta ? t(`${key}.meta`) : undefined,
      features: t(`${key}.features`, { returnObjects: true }) as string[],
    };
  };

  const premiumPlan = billingCycle === 'yearly' ? PREMIUM_YEARLY : PREMIUM_MONTHLY;
  const familyPlan = billingCycle === 'yearly' ? FAMILY_YEARLY : FAMILY_MONTHLY;
  const plans: Plan[] = [FREE_PLAN, premiumPlan, familyPlan, CONSULTATION];

  const productIdForPlan = (planId: string): string | null => {
    if (planId === 'premium-monthly') return PRODUCT_MONTHLY;
    if (planId === 'premium-yearly') return PRODUCT_ANNUAL;
    if (planId === 'family-monthly') return PRODUCT_FAMILY_MONTHLY;
    if (planId === 'family-yearly') return PRODUCT_FAMILY_ANNUAL;
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
      // The StoreKit sheet can leave the WKWebView with a stale (blank) layer.
      forceWebViewRepaint();
      await refreshSubscription();
      toast({ title: t('pricing.toast.purchaseDone'), description: t('pricing.toast.purchaseDoneBody') });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // RevenueCat throws { userCancelled: true } when user dismisses the sheet
      const cancelled = /cancel/i.test(msg) || (err as { userCancelled?: boolean })?.userCancelled;
      if (!cancelled) {
        console.error('Native purchase failed', err);
        toast({
          title: t('pricing.toast.purchaseFailed'),
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
      forceWebViewRepaint();
      await refreshSubscription();
      toast({ title: t('pricing.toast.restored'), description: t('pricing.toast.restoredBody') });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: t('pricing.toast.restoreFailed'), description: msg.slice(0, 240), variant: 'destructive' });
    } finally {
      setRestoring(false);
    }
  };

  const startStripeCheckout = async (plan: Plan) => {
    // Native apps must never leave for a web payment page (App Store / Play rules,
    // and a hard navigation inside the WebView shows a blank screen).
    if (isNative) {
      await startNativePurchase(plan);
      return;
    }
    setLoading(plan.id);
    try {

      analytics.track('subscribe_started', { plan_id: plan.id, billing_cycle: billingCycle, price: plan.price, attribution: getStoredUtm() });
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId: plan.id },
      });
      if (error) throw error;
      const checkoutData = data as CheckoutResponse | null;
      if (checkoutData?.error) throw new Error(checkoutData.error);
      if (checkoutData?.scheduled) {
        toast({
          title: t('pricing.toast.familyScheduled'),
          description: checkoutData.effectiveAt
            ? t('pricing.toast.familyScheduledOn', { date: formatSubscriptionEnd(checkoutData.effectiveAt) })
            : t('pricing.toast.familyScheduledNext'),
        });
        return;
      }
      if (!data?.url) throw new Error('Stripe checkout URL was not returned');
      toast({
        title: t('pricing.toast.redirecting'),
        description: t('pricing.toast.redirectingBody'),
      });
      window.location.assign(data.url);
    } catch (error: unknown) {
      console.error('Checkout error:', error);
      const detail = getCheckoutErrorDetail(error);
      toast({
        title: t('pricing.toast.checkoutError'),
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
    if (user && currentPlan?.id === 'free') {
      void supabase.functions.invoke('schedule-paywall-abandon').catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    const syncStatus = async () => {
      setSyncingStatus(true);
      try {
        if (isNative) {
          await syncCurrentRevenueCatStatus(user.id);
        }
        await refreshSubscription?.();
      } catch (err) {
        console.warn('Unable to sync subscription status', err);
      } finally {
        if (!cancelled) setSyncingStatus(false);
      }
    };

    void syncStatus();

    return () => {
      cancelled = true;
    };
  }, [user, isNative, refreshSubscription]);

  useEffect(() => {
    if (!user || pendingCheckoutStarted.current) return;

    const pendingPlanId = sessionStorage.getItem('post_auth_plan');
    if (!['premium-monthly', 'premium-yearly', 'family-monthly', 'family-yearly'].includes(pendingPlanId ?? '')) return;

    const pendingPlan = pendingPlanId === 'premium-yearly' ? PREMIUM_YEARLY
      : pendingPlanId === 'family-yearly' ? FAMILY_YEARLY
      : pendingPlanId === 'family-monthly' ? FAMILY_MONTHLY
      : PREMIUM_MONTHLY;
    pendingCheckoutStarted.current = true;
    sessionStorage.removeItem('post_auth_plan');
    void startStripeCheckout(pendingPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubscribe = async (plan: Plan) => {
    try {
      if (plan.id === 'free') {
        if (currentPlan?.id === 'free') {
          toast({ title: t('pricing.toast.onExplorer'), description: t('pricing.toast.onExplorerBody') });
          onBack?.();
        } else {
          subscribe(plan);
          toast({ title: t('pricing.toast.welcomeExplorer'), description: t('pricing.toast.welcomeExplorerBody') });
          if (onBack) setTimeout(() => onBack(), 1500);
        }
        return;
      }

      // Consultation is an email booking request, not a purchase — no Terms gate.
      // Apple IAP rules: we do not charge for it in-app, so no price is shown on native.
      if (plan.id === 'consultation') {
        setConsultOpen(true);
        return;
      }

      // Require explicit acceptance of Terms & Privacy for any paid or subscription flow
      if (!termsAccepted) {
        toast({
          title: t('pricing.toast.acceptTerms'),
          description: t('pricing.toast.acceptTermsBody'),
          variant: 'destructive',
        });
        return;
      }



      if (!user) {
        toast({
          title: t('pricing.toast.signIn'),
          description: t('pricing.toast.signInBody'),
        });
        try {
          sessionStorage.setItem('post_auth_redirect', '/plans');
          sessionStorage.setItem('post_auth_plan', plan.id);
        } catch {
          console.warn('Unable to store checkout redirect intent');
        }
        setTimeout(() => {
          // Client-side navigation: a hard location change inside the native
          // WebView resolves to a missing file and renders a blank screen.
          navigate(`/auth?redirect=${encodeURIComponent('/plans')}`);
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
        title: t('pricing.toast.subError'),
        description: t('pricing.toast.subErrorBody'),
        variant: 'destructive',
      });
    }
  };

  const [openingBilling, setOpeningBilling] = useState(false);
  const handleManageBilling = async () => {
    setOpeningBilling(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error || !data?.url) throw error ?? new Error('No billing link');
      window.location.assign(data.url);
    } catch {
      toast({ title: t('pricing.toast.billingError'), description: t('pricing.toast.billingErrorBody'), variant: 'destructive' });
      setOpeningBilling(false);
    }
  };

  const handleManualRefresh = async () => {
    setSyncingStatus(true);
    try {
      if (isNative) {
        await syncCurrentRevenueCatStatus(user?.id ?? null);
      }
      await refreshSubscription?.();
      toast({ title: t('pricing.toast.synced'), description: t('pricing.toast.syncedBody') });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: t('pricing.toast.syncFailed'), description: msg.slice(0, 180), variant: 'destructive' });
    } finally {
      setSyncingStatus(false);
    }
  };

  const activePlanLabel = currentPlan?.id && PLAN_KEYS[currentPlan.id] ? t(`pricing.plans.${PLAN_KEYS[currentPlan.id]}.name`) : currentPlan?.name ?? t('pricing.page.premiumPlan');
  const renewalDate = formatSubscriptionEnd(subscriptionEnd);

  if (subscriptionLoading) {
    return (
      <div className="space-y-8">
        {onBack && <BackButton onClick={onBack} label={t('pricing.page.backToDashboard')} />}
        <Card className={`${montessoriTheme.card.base} max-w-xl mx-auto text-center`}>
          <CardContent className="py-10">
            <RefreshCw className="w-6 h-6 mx-auto mb-4 animate-spin text-primary" aria-hidden="true" />
            <p className="font-semibold text-foreground">{t('pricing.page.checking')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {onBack && <BackButton onClick={onBack} label={t('pricing.page.backToDashboard')} />}

      {isPremium && (
        <Card className={`${montessoriTheme.card.base} max-w-3xl mx-auto ring-2 ring-primary/30`}>
          <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2"><Badge>{t('pricing.page.active')}</Badge><strong>{activePlanLabel}</strong></div>
              {renewalDate && <p className="text-sm text-muted-foreground mt-2">{t('pricing.page.renews', { date: renewalDate })}</p>}
              {provider === 'revenuecat' && <p className="text-xs text-muted-foreground mt-1">{t('pricing.page.appStore')}</p>}
              {provider === 'stripe' && isNative && <p className="text-xs text-muted-foreground mt-1">{t('pricing.page.boughtOnWeb')}</p>}
            </div>
            <div className="flex flex-wrap gap-2"><Button onClick={onBack}>{t('pricing.page.openDashboard')}</Button>{provider === 'stripe' && !isNative && <Button variant="outline" onClick={handleManageBilling} disabled={openingBilling}>{t('pricing.page.manage')}</Button>}<Button variant="outline" onClick={handleManualRefresh} disabled={syncingStatus}>{t('pricing.page.sync')}</Button></div>
          </CardContent>
        </Card>
      )}

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          {t('pricing.page.heading')}
        </h1>
        <p className="text-lg text-muted-foreground mb-5">
          {t('pricing.page.intro')}
        </p>
        <div className="flex justify-center items-center gap-5 text-sm text-muted-foreground flex-wrap mb-8">
          <span className="inline-flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-accent text-accent" /> {t('pricing.page.amiAligned')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-secondary" /> {t('pricing.page.guarantee')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" /> {t('pricing.page.cancelAnytime')}
          </span>
        </div>
        <p className="text-sm text-muted-foreground -mt-4 mb-8">
          {t('pricing.page.schools')}
        </p>

        <div className="mb-8">
          <AccessCodeRedeem />
        </div>



        {/* Comparison strip */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mb-8 text-left">
          <div className="p-3 sm:p-4 rounded-xl border border-border/60 bg-muted/40">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{t('pricing.page.kits')}</p>
            <p className="text-lg sm:text-2xl font-bold text-foreground">$400+</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">{t('pricing.page.kitsNote')}</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border border-border/60 bg-muted/40">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{t('pricing.page.privateSchool')}</p>
            <p className="text-lg sm:text-2xl font-bold text-foreground">$15k+</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">{t('pricing.page.privateSchoolNote')}</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t('pricing.page.thisApp')}</p>
            <p className="text-lg sm:text-2xl font-bold text-foreground">$199<span className="text-sm font-medium text-muted-foreground">{t('pricing.page.perYearShort')}</span></p>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">{t('pricing.page.oneChild')}</p>
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
            {t('pricing.page.monthly')}
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('pricing.page.annual')}
            <Badge className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0">{t('pricing.page.annualValue')}</Badge>
          </button>
        </div>
      </div>

      <section aria-label={t('pricing.page.sectionLabel')}>
        <h2 className="sr-only">{t('pricing.page.title')}</h2>

        {/* Apple / Google Play required EULA & auto-renewal disclosure */}
        <div className="max-w-3xl mx-auto mb-6 rounded-xl border border-border bg-muted/40 p-4 text-left text-sm text-foreground">
          <p className="font-semibold mb-2">{t('pricing.page.details')}</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li><Trans i18nKey="pricing.page.d1" components={[<strong key="b" />]} /></li>
            <li><Trans i18nKey="pricing.page.d2" components={[<strong key="b" />]} /></li>
            <li><Trans i18nKey="pricing.page.d3" components={[<strong key="b" />]} /></li>
            <li><Trans i18nKey="pricing.page.d4" components={[<strong key="b" />]} /></li>
            <li>{t('pricing.page.d5')}</li>
            <li>{t('pricing.page.d6')}</li>
            <li>{t('pricing.page.d7')}</li>
          </ul>
          <label className="mt-4 flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-primary"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              aria-label={t('pricing.page.acceptLabel')}
            />
            <span className="text-sm text-foreground">
              <Trans
                i18nKey="pricing.page.agree"
                components={{
                  1: <a href="/terms-of-service" target="_blank" rel="noreferrer" className="underline text-primary" />,
                  3: <a href="/privacy-policy" target="_blank" rel="noreferrer" className="underline text-primary" />,
                }}
              />
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
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
                    <Sparkles className="w-3 h-3" /> {t('pricing.page.bestValue')}
                  </Badge>
                )}
                {plan.premium && (
                  <div className="absolute -top-3 right-4">
                    <Crown className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">{planText(plan).name}</CardTitle>
                  <div className="mt-4">
                    {isNative && plan.id === 'consultation' ? (
                      <>
                        <span className="text-3xl font-extrabold text-foreground">{t('pricing.page.byRequest')}</span>
                        <div className="text-xs text-muted-foreground mt-2">
                          {t('pricing.page.byRequestNote')}
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl font-extrabold text-foreground">${plan.price}</span>
                        <span className="text-muted-foreground">/{t(`pricing.period.${plan.period}`)}</span>
                        {plan.meta && (
                          <div className="text-sm text-secondary font-semibold mt-2">{planText(plan).meta}</div>
                        )}
                        {plan.id === 'premium-monthly' && (
                          <div className="text-xs text-muted-foreground mt-2">
                            {t('pricing.page.switchAnnual')}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mt-3 px-2">{planText(plan).description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {planText(plan).features
                      .filter((f) => !(isNative && plan.id === 'consultation' && /\$/.test(f)))
                      // Store rules: no web add-on prices inside the native apps.
                      .map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-1" aria-hidden="true" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                  </ul>

                  {plan.id !== 'free' && plan.id !== 'consultation' && (
                    <div className="mb-6 rounded-lg border border-border bg-muted/40 p-3 text-sm">
                      <p className="font-medium text-foreground">
                        {isNative ? t('pricing.page.addConsult') : t('pricing.page.addConsultPrice')}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSubscribe(CONSULTATION)}
                        className="mt-1 text-primary underline underline-offset-2 hover:text-primary/80"
                      >
                        {t('pricing.page.bookConsult')}
                      </button>
                    </div>
                  )}



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
                      disabled={(currentPlan?.id === plan.id && plan.id !== 'free') || loading === plan.id || (plan.id !== 'free' && plan.id !== 'consultation' && !termsAccepted)}
                      aria-label={t('pricing.page.choose', { name: planText(plan).name })}
                    >
                      {loading === plan.id ? (
                        <>{t('pricing.page.processing')} <ExternalLink className="w-4 h-4 ml-2" /></>
                      ) : currentPlan?.id === plan.id && plan.id === 'free' ? (
                        t('pricing.page.ctaOpen')
                      ) : currentPlan?.id === plan.id ? (
                        t('pricing.page.ctaCurrent')
                      ) : plan.id === 'free' ? (
                        t('pricing.page.ctaFree')
                      ) : plan.id === 'consultation' ? (
                        t('pricing.page.bookConsult')
                      ) : plan.id === 'premium-yearly' ? (
                        t('pricing.page.ctaAnnual')
                      ) : plan.id === 'family-yearly' ? (
                        t('pricing.page.ctaFamilyAnnual')
                      ) : plan.id === 'family-monthly' ? (
                        t('pricing.page.ctaFamilyMonthly')
                      ) : (
                        t('pricing.page.ctaMonthly')
                      )}
                    </Button>

                    {plan.id !== 'free' && plan.id !== 'consultation' && (
                      <p className="text-xs text-muted-foreground text-center">
                        {t('pricing.page.cardGuarantee')}
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
            {restoring ? t('pricing.page.restoring') : t('pricing.page.restore')}
          </Button>
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
            {t('pricing.page.storeNote')}
          </p>
        </div>
      )}
      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
    </div>
  );
};

export default SubscriptionPlans;
