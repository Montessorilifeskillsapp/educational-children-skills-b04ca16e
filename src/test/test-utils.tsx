import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ProfileProvider } from '@/contexts/ProfileContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { AppProvider } from '@/contexts/AppContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AppProvider>
            <ProfileProvider>
              <SubscriptionProvider>
                {children}
              </SubscriptionProvider>
            </ProfileProvider>
          </AppProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library/react
export * from '@testing-library/react';
// Override render with our custom render
export { customRender as render };