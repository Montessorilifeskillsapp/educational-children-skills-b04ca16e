import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ActivityBundle } from '@/data/activityBundles';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  description?: string;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (bundleId: string) => void;
  updateQuantity: (bundleId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  total: number; // Add alias for compatibility with PaymentModal
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart-items');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever items change
  React.useEffect(() => {
    try {
      localStorage.setItem('cart-items', JSON.stringify(items));
      // Cart saved to localStorage
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const addToCart = (product: any) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const newItem = { 
        id: product.id,
        name: product.name,
        price: product.price || 0,
        quantity: 1,
        category: product.category,
        description: product.description,
        image: product.image
      };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (bundleId: string) => {
    setItems(prev => prev.filter(item => item.id !== bundleId));
  };

  const updateQuantity = (bundleId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bundleId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === bundleId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      total: totalPrice // Add alias for PaymentModal compatibility
    }}>
      {children}
    </CartContext.Provider>
  );
};