import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  isHighContrast: boolean;
  isLargeText: boolean;
  isReducedMotion: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setIsReducedMotion(prefersReducedMotion);
    setIsHighContrast(prefersHighContrast);

    // Load user preferences from localStorage
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    const savedLargeText = localStorage.getItem('accessibility-large-text') === 'true';
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true';

    setIsHighContrast(savedHighContrast || prefersHighContrast);
    setIsLargeText(savedLargeText);
    setIsReducedMotion(savedReducedMotion || prefersReducedMotion);
  }, []);

  useEffect(() => {
    // Apply accessibility classes to document
    const root = document.documentElement;
    
    if (isHighContrast) {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }

    if (isLargeText) {
      root.classList.add('accessibility-large-text');
    } else {
      root.classList.remove('accessibility-large-text');
    }

    if (isReducedMotion) {
      root.classList.add('accessibility-reduced-motion');
    } else {
      root.classList.remove('accessibility-reduced-motion');
    }
  }, [isHighContrast, isLargeText, isReducedMotion]);

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('accessibility-high-contrast', newValue.toString());
    announceToScreenReader(newValue ? 'High contrast mode enabled' : 'High contrast mode disabled');
  };

  const toggleLargeText = () => {
    const newValue = !isLargeText;
    setIsLargeText(newValue);
    localStorage.setItem('accessibility-large-text', newValue.toString());
    announceToScreenReader(newValue ? 'Large text mode enabled' : 'Large text mode disabled');
  };

  const toggleReducedMotion = () => {
    const newValue = !isReducedMotion;
    setIsReducedMotion(newValue);
    localStorage.setItem('accessibility-reduced-motion', newValue.toString());
    announceToScreenReader(newValue ? 'Reduced motion enabled' : 'Reduced motion disabled');
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    // Remove the element after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        isHighContrast,
        isLargeText,
        isReducedMotion,
        toggleHighContrast,
        toggleLargeText,
        toggleReducedMotion,
        announceToScreenReader,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};