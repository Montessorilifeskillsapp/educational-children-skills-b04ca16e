import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
}

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan | null;
  isPremium: boolean;
  isFamily: boolean;
  subscribe: (plan: SubscriptionPlan) => void;
  cancel: () => void;
  purchasedItems: string[];
  purchaseItem: (itemId: string) => void;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const defaultFreePlan: SubscriptionPlan = {
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
};

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(defaultFreePlan);
  const [serverVerifiedPremium, setServerVerifiedPremium] = useState(false);
  const [serverVerifiedFamily, setServerVerifiedFamily] = useState(false);
  const [loading, setLoading] = useState(true);

  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('purchased-items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Server-side subscription verification — the authoritative source of truth
  const verifySubscription = useCallback(async () => {
    if (!user) {
      setServerVerifiedPremium(false);
      setServerVerifiedFamily(false);
      setCurrentPlan(defaultFreePlan);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');

      if (error) {
        console.error('Subscription verification failed:', error);
        setServerVerifiedPremium(false);
        setServerVerifiedFamily(false);
        setCurrentPlan(defaultFreePlan);
        setLoading(false);
        return;
      }

      const isSubscribed = Boolean(data?.subscribed);
      const tier = data?.subscription_tier ?? null;

      setServerVerifiedPremium(isSubscribed && tier !== null);
      setServerVerifiedFamily(tier === 'Family');

      if (isSubscribed && tier) {
        const premiumPlan: SubscriptionPlan = {
          id: tier === 'Family' ? 'family' : 'premium',
          name: tier === 'Family' ? 'Family Plan' : 'Premium Plan',
          price: tier === 'Family' ? 199 : 29,
          period: tier === 'Family' ? 'year' : 'month',
          features: [],
          premium: true,
        };
        setCurrentPlan(premiumPlan);
      } else {
        setCurrentPlan(defaultFreePlan);
      }
    } catch (error) {
      console.error('Subscription verification error:', error);
      setServerVerifiedPremium(false);
      setServerVerifiedFamily(false);
      setCurrentPlan(defaultFreePlan);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Verify on mount and when user changes
  useEffect(() => {
    setLoading(true);
    void verifySubscription();
  }, [verifySubscription]);

  // Save purchased items to localStorage
  useEffect(() => {
    localStorage.setItem('purchased-items', JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  // isPremium and isFamily are ALWAYS derived from server verification
  const isPremium = serverVerifiedPremium;
  const isFamily = serverVerifiedFamily;

  const subscribe = (plan: SubscriptionPlan) => {
    // This is called after successful Stripe checkout redirect
    // Trigger a re-verification from the server
    void verifySubscription();
  };

  const cancel = () => {
    // Trigger server re-verification rather than trusting client
    void verifySubscription();
  };

  const purchaseItem = (itemId: string) => {
    setPurchasedItems(prev => [...prev, itemId]);
  };

  return (
    <SubscriptionContext.Provider value={{
      currentPlan,
      isPremium,
      isFamily,
      subscribe,
      cancel,
      purchasedItems,
      purchaseItem,
      loading
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
