import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AppProvider } from "@/contexts/AppContext";
import { CartProvider } from "@/components/CartContext";
import { MobileSecurityProvider } from "@/components/MobileSecurityProvider";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import Index from "./pages/Index";
import PracticalLifePage from "./pages/PracticalLifePage";
import PlansPage from "./pages/PlansPage";
import NotFound from "./pages/NotFound";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
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
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </CartProvider>
                </SubscriptionProvider>
              </ProfileProvider>
            </AppProvider>
          </MobileSecurityProvider>
        </AccessibilityProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;