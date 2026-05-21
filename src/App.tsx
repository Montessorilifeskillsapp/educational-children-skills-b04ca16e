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
import SensorialPage from "./pages/SensorialPage";
import LanguagePage from "./pages/LanguagePage";
import MathPage from "./pages/MathPage";
import GeographyPage from "./pages/GeographyPage";
import BotanyPage from "./pages/BotanyPage";
import ArtPage from "./pages/ArtPage";
import CulturalPage from "./pages/CulturalPage";
import GraceCourtesyPage from "./pages/GraceCourtesyPage";
import ShopPage from "./pages/ShopPage";
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
import GuaranteePage from "./pages/GuaranteePage";
import PreviewPouringWaterPage from "./pages/PreviewPouringWaterPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import FreePdfPage from "./pages/FreePdfPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminLeadsPage from "./pages/AdminLeadsPage";
import AdminVerifyPage from "./pages/AdminVerifyPage";

import AdminAnalyticsLink from "@/components/AdminAnalyticsLink";
import SplashDebugOverlay from "@/components/SplashDebugOverlay";
import { analytics } from "@/lib/analytics";
import { useUtmTracking } from "@/hooks/useUtmTracking";
import { useEffect } from "react";

const RouteEffects = () => {
  useUtmTracking();
  return null;
};

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
                        <RouteEffects />
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/index" element={<Index />} />
                          <Route path="/home" element={<Index />} />
                          <Route path="/practical-life" element={<PracticalLifePage />} />
                          <Route path="/sensorial" element={<SensorialPage />} />
                          <Route path="/language" element={<LanguagePage />} />
                          <Route path="/math" element={<MathPage />} />
                          <Route path="/geography" element={<GeographyPage />} />
                          <Route path="/botany" element={<BotanyPage />} />
                          <Route path="/art" element={<ArtPage />} />
                          <Route path="/cultural" element={<CulturalPage />} />
                          <Route path="/grace-courtesy" element={<GraceCourtesyPage />} />
                          <Route path="/shop" element={<ShopPage />} />
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
                          <Route path="/guarantee" element={<GuaranteePage />} />
                          <Route path="/preview/pouring-water" element={<PreviewPouringWaterPage />} />
                          <Route path="/unsubscribe" element={<UnsubscribePage />} />
                          <Route path="/welcome" element={<LandingPage />} />
                          <Route path="/free-pdf" element={<FreePdfPage />} />
                          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                          <Route path="/admin/verify" element={<AdminVerifyPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                        <PWAInstallPrompt />
                        <AdminAnalyticsLink />
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