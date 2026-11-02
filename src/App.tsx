import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/AuthProvider";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AppProvider } from "@/contexts/AppContext";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import Index from "./pages/Index";
const PracticalLifePage = lazy(() => import("./pages/PracticalLifePage"));
const SensorialPage = lazy(() => import("./pages/SensorialPage"));
const LanguagePage = lazy(() => import("./pages/LanguagePage"));
const MathPage = lazy(() => import("./pages/MathPage"));
const GeographyPage = lazy(() => import("./pages/GeographyPage"));
const BotanyPage = lazy(() => import("./pages/BotanyPage"));
const ArtPage = lazy(() => import("./pages/ArtPage"));
const CulturalPage = lazy(() => import("./pages/CulturalPage"));
const GraceCourtesyPage = lazy(() => import("./pages/GraceCourtesyPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const MaterialAlternativesPage = lazy(() => import("./pages/MaterialAlternativesPage"));
const PlansPage = lazy(() => import("./pages/PlansPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const AuthCallbackPage = lazy(() => import("./pages/AuthCallbackPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const PaymentCancelPage = lazy(() => import("./pages/PaymentCancelPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const SongsLicencePage = lazy(() => import("./pages/SongsLicencePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const HelpPage = lazy(() => import("./pages/HelpPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const InstallPage = lazy(() => import("./pages/InstallPage"));
const GuaranteePage = lazy(() => import("./pages/GuaranteePage"));
const PreviewPouringWaterPage = lazy(() => import("./pages/PreviewPouringWaterPage"));
const UnsubscribePage = lazy(() => import("./pages/UnsubscribePage"));
import AppUpdateDialog from "@/components/AppUpdateDialog";
import InstallBanner from "@/components/InstallBanner";
const NotFound = lazy(() => import("./pages/NotFound"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ClassroomSetupPage = lazy(() => import("./pages/ClassroomSetupPage"));
const HomeSetupPage = lazy(() => import("./pages/HomeSetupPage"));
const SongsPage = lazy(() => import("./pages/SongsPage"));
const AdminSongsPage = lazy(() => import("./pages/AdminSongsPage"));
const AdminAnalyticsPage = lazy(() => import("./pages/AdminAnalyticsPage"));
const AdminLeadsPage = lazy(() => import("./pages/AdminLeadsPage"));
const AdminMembersPage = lazy(() => import("./pages/AdminMembersPage"));
const AdminAccessCodesPage = lazy(() => import("./pages/AdminAccessCodesPage"));
const AdminMaterialsPage = lazy(() => import("./pages/AdminMaterialsPage"));
const AdminVideosPage = lazy(() => import("./pages/AdminVideosPage"));
const AdminVerifyPage = lazy(() => import("./pages/AdminVerifyPage"));
const AdminHomePage = lazy(() => import("./pages/AdminHomePage"));

import AdminAnalyticsLink from "@/components/AdminAnalyticsLink";
import HomeFab from "@/components/HomeFab";
import SchoolReturnBar from "@/components/school/SchoolReturnBar";
import ClassroomDrawer from "@/components/school/ClassroomDrawer";
import SplashDebugOverlay from "@/components/SplashDebugOverlay";
import ScrollToTop from "@/components/ScrollToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { analytics } from "@/lib/analytics";
import { useUtmTracking } from "@/hooks/useUtmTracking";
const SchoolPortalPage = lazy(() => import("./pages/SchoolPortalPage"));
const AdminSchoolsPage = lazy(() => import("./pages/AdminSchoolsPage"));
import { Capacitor } from "@capacitor/core";
import { useCapacitorAuthDeepLink } from "@/hooks/useCapacitorAuthDeepLink";
import { useNativeWebViewRecovery } from "@/hooks/useNativeWebViewRecovery";

const RouteEffects = () => {
  useUtmTracking();
  return null;
};

const App = () => {
  useCapacitorAuthDeepLink();
  useNativeWebViewRecovery();

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
            <AuthProvider>
              <AppProvider>
                <ProfileProvider>
                  <SubscriptionProvider>
                    <Toaster />
                    {Capacitor.isNativePlatform() && <AppUpdateDialog />}
                    <SplashDebugOverlay />
                    <BrowserRouter
                      future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true
                      }}
                    >
                        <ScrollToTop />
                        <RouteEffects />
                        <SchoolReturnBar />
                        <ClassroomDrawer />
                        {!Capacitor.isNativePlatform() && <InstallBanner />}
                        <ErrorBoundary>
                        <Suspense fallback={null}>
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
                          <Route path="/materials/:materialKey" element={<MaterialAlternativesPage />} />
                          <Route path="/plans" element={<PlansPage />} />
                          <Route path="/auth" element={<AuthPage />} />
                          <Route path="/auth/callback" element={<AuthCallbackPage />} />
                          <Route path="/payment-success" element={<PaymentSuccessPage />} />
                          <Route path="/payment-cancel" element={<PaymentCancelPage />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                          <Route path="/privacy" element={<PrivacyPolicyPage />} />
                          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                          <Route path="/terms" element={<TermsOfServicePage />} />
                          <Route path="/songs-licence" element={<SongsLicencePage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/help" element={<HelpPage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/install" element={<InstallPage />} />
                          <Route path="/guarantee" element={<GuaranteePage />} />
                          <Route path="/preview/pouring-water" element={<PreviewPouringWaterPage />} />
                          <Route path="/unsubscribe" element={<UnsubscribePage />} />
                          <Route path="/welcome" element={<LandingPage />} />
                          <Route path="/classroom-setup" element={<ClassroomSetupPage />} />
                          <Route path="/home-setup" element={<HomeSetupPage />} />
                          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                          <Route path="/admin" element={<AdminHomePage />} />
                          <Route path="/admin/leads" element={<AdminLeadsPage />} />
                          <Route path="/admin/members" element={<AdminMembersPage />} />
                          <Route path="/admin/access-codes" element={<AdminAccessCodesPage />} />
                          <Route path="/admin/materials" element={<AdminMaterialsPage />} />
                          <Route path="/admin/videos" element={<AdminVideosPage />} />
                          <Route path="/admin/songs" element={<AdminSongsPage />} />
                          <Route path="/songs" element={<SongsPage />} />
                          <Route path="/school" element={<SchoolPortalPage />} />
                          <Route path="/admin/schools" element={<AdminSchoolsPage />} />

                          <Route path="/admin/verify" element={<AdminVerifyPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                        </Suspense>
                        </ErrorBoundary>
                        
                        <HomeFab />
                        <AdminAnalyticsLink />
                    </BrowserRouter>
                  </SubscriptionProvider>
                </ProfileProvider>
              </AppProvider>
            </AuthProvider>
        </AccessibilityProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;