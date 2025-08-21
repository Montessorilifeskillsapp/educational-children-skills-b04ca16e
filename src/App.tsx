import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/AuthProvider";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AppProvider } from "@/contexts/AppContext";
import { CartProvider } from "@/components/CartContext";
import { MobileSecurityProvider } from "@/components/MobileSecurityProvider";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import Index from "./pages/Index";
import PracticalLifePage from "./pages/PracticalLifePage";
import PlansPage from "./pages/PlansPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

const App = () => {
  console.log('🔥 App.tsx: App component rendering');
  
  useEffect(() => {
    console.log('🔥 App.tsx: useEffect running');
    // Initialize analytics on app start
    analytics.init();
    
    // Track initial page view
    analytics.trackPageView(window.location.pathname, document.title);
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <AccessibilityProvider>
          <MobileSecurityProvider>
            <AuthProvider>
              <AppProvider>
                <ProfileProvider>
                  <SubscriptionProvider>
                    <CartProvider>
                      <Toaster />
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/practical-life" element={<PracticalLifePage />} />
                          <Route path="/plans" element={<PlansPage />} />
                          <Route path="/auth" element={<AuthPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BrowserRouter>
                    </CartProvider>
                  </SubscriptionProvider>
                </ProfileProvider>
              </AppProvider>
            </AuthProvider>
          </MobileSecurityProvider>
        </AccessibilityProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;