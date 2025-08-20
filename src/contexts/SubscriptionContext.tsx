import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  // Start with free plan as default
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(defaultFreePlan);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

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