import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

const defaultSubscriptionData: SubscriptionData = {
  subscribed: false,
  subscription_tier: null,
  subscription_end: null,
};

export const useSubscription = () => {
  const { user } = useAuthContext();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>(defaultSubscriptionData);
  const [loading, setLoading] = useState(true);

  const checkSubscription = useCallback(async () => {
    if (!user) {
      setSubscriptionData(defaultSubscriptionData);
      setLoading(false);
      return defaultSubscriptionData;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');

      if (error) {
        throw error;
      }

      const nextState: SubscriptionData = {
        subscribed: Boolean(data?.subscribed),
        subscription_tier: data?.subscription_tier ?? null,
        subscription_end: data?.subscription_end ?? null,
      };

      setSubscriptionData(nextState);
      return nextState;
    } catch (error) {
      console.error('Subscription check failed:', error);
      setSubscriptionData(defaultSubscriptionData);
      return defaultSubscriptionData;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const manageSubscription = useCallback(async () => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) throw error;
      if (!data?.url) throw new Error('Customer portal URL was not returned');

      window.location.assign(data.url);
      return true;
    } catch (error) {
      console.error('Customer portal error:', error);
      return false;
    }
  }, [user]);

  useEffect(() => {
    void checkSubscription();
  }, [checkSubscription]);

  return {
    ...subscriptionData,
    loading,
    checkSubscription,
    manageSubscription,
    isPremium: subscriptionData.subscribed && subscriptionData.subscription_tier !== null,
    isFamily: subscriptionData.subscription_tier === 'Family',
  };
};