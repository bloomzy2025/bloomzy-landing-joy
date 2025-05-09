
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import Calendly from "./pages/Calendly";
import Waitlist from "./pages/Waitlist";
import Pricing from "./pages/Pricing";
import EnterpriseContact from "./pages/EnterpriseContact";
import MakerManagerQuiz from "./pages/MakerManagerQuiz";
import TimeWastersAudit from "./pages/TimeWastersAudit";
import AuthCallback from "./pages/AuthCallback";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookieSettings from "./pages/CookieSettings";
import FirstPayingCustomerFinder from "./pages/FirstPayingCustomerFinder";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/calendly" element={<Calendly />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/enterprise" element={<EnterpriseContact />} />
              <Route path="/maker-manager-quiz" element={<MakerManagerQuiz />} />
              <Route path="/time-wasters-audit" element={<TimeWastersAudit />} />
              <Route path="/customer-finder" element={<FirstPayingCustomerFinder />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie-settings" element={<CookieSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
