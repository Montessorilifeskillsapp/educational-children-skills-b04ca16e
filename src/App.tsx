import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { AppProvider } from "@/contexts/AppContext";
import { CartProvider } from "@/components/CartContext";
import { MobileSecurityProvider } from "@/components/MobileSecurityProvider";
import Index from "./pages/Index";
import PracticalLifePage from "./pages/PracticalLifePage";
import PlansPage from "./pages/PlansPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
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
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;