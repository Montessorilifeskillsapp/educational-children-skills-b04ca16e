import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/AuthProvider";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AppProvider } from "@/contexts/AppContext";
import { MobileSecurityProvider } from "@/components/MobileSecurityProvider";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import Index from "./pages/Index";
import PracticalLifePage from "./pages/PracticalLifePage";
import PlansPage from "./pages/PlansPage";
import AuthPage from "./pages/AuthPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import ContactPage from "./pages/ContactPage";
import HelpPage from "./pages/HelpPage";
import AboutPage from "./pages/AboutPage";
import InstallPage from "./pages/InstallPage";
import NotFound from "./pages/NotFound";
import SplashDebugOverlay from "@/components/SplashDebugOverlay";
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
            <AuthProvider>
              <AppProvider>
                <ProfileProvider>
                  <SubscriptionProvider>
                    <Toaster />
                    <SplashDebugOverlay />
                    <BrowserRouter
                      future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true
                      }}
                    >
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/practical-life" element={<PracticalLifePage />} />
                          <Route path="/plans" element={<PlansPage />} />
                          <Route path="/auth" element={<AuthPage />} />
                          <Route path="/payment-success" element={<PaymentSuccessPage />} />
                          <Route path="/payment-cancel" element={<PaymentCancelPage />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/help" element={<HelpPage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/install" element={<InstallPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
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