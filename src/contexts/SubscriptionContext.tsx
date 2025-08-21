import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  // Initialize with saved plan from localStorage or default free plan
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(() => {
    try {
      const saved = localStorage.getItem('subscription-plan');
      if (saved) {
        const parsedPlan = JSON.parse(saved);
        // Validate the saved plan has all required properties
        if (parsedPlan && parsedPlan.id && parsedPlan.name && parsedPlan.features) {
          return parsedPlan;
        }
      }
    } catch (error) {
      console.warn('Failed to parse saved subscription plan:', error);
    }
    return defaultFreePlan;
  });

  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('purchased-items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize once to prevent infinite loops
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Save to localStorage whenever plan changes, but only after initialization
  useEffect(() => {
    if (isInitialized && currentPlan) {
      const savedPlan = localStorage.getItem('subscription-plan');
      const currentPlanString = JSON.stringify(currentPlan);
      if (savedPlan !== currentPlanString) {
        localStorage.setItem('subscription-plan', currentPlanString);
      }
    }
  }, [currentPlan, isInitialized]);

  // Save to localStorage whenever purchased items change, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      const savedItems = localStorage.getItem('purchased-items');
      const currentItemsString = JSON.stringify(purchasedItems);
      if (savedItems !== currentItemsString) {
        localStorage.setItem('purchased-items', currentItemsString);
      }
    }
  }, [purchasedItems, isInitialized]);

  const isPremium = currentPlan?.id === 'premium' || currentPlan?.id === 'family';
  const isFamily = currentPlan?.id === 'family';

  const subscribe = (plan: SubscriptionPlan) => {
    console.log('SubscriptionContext.subscribe called with:', plan);
    try {
      setCurrentPlan(plan);
      console.log('Plan set successfully in subscription context');
    } catch (error) {
      console.error('Error setting plan in subscription context:', error);
      throw error;
    }
  };

  const cancel = () => {
    setCurrentPlan(defaultFreePlan);
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
      purchaseItem
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