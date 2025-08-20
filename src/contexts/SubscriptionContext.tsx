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
      return saved ? JSON.parse(saved) : defaultFreePlan;
    } catch {
      return defaultFreePlan;
    }
  });

  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('purchased-items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever plan changes
  useEffect(() => {
    if (currentPlan) {
      localStorage.setItem('subscription-plan', JSON.stringify(currentPlan));
    }
  }, [currentPlan]);

  // Save to localStorage whenever purchased items change
  useEffect(() => {
    localStorage.setItem('purchased-items', JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  const isPremium = currentPlan?.id === 'premium' || currentPlan?.id === 'family';
  const isFamily = currentPlan?.id === 'family';

  const subscribe = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan);
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