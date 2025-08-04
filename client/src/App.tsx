import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/language-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Trips from "@/pages/trips";
import TripDetails from "@/pages/trip-details";
import OrganizerSignup from "@/pages/organizer-signup";
import OrganizerDashboard from "@/pages/organizer-dashboard";
import WhatsAppParserPage from "@/pages/whatsapp-parser";
import Admin from "@/pages/admin";
import MyBookings from "@/pages/my-bookings";
import Login from "@/pages/login";
import Register from "@/pages/register";
import AuthTest from "@/pages/auth-test";
import EmailVerification from "@/pages/email-verification";
import Reviews from "@/pages/reviews";
import Profile from "@/pages/profile";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/trips" component={Trips} />
      <Route path="/trips/:id" component={TripDetails} />
      <Route path="/organizer-signup" component={OrganizerSignup} />
      <Route path="/organizer-dashboard" component={OrganizerDashboard} />
      <Route path="/whatsapp-parser" component={WhatsAppParserPage} />
      <Route path="/admin" component={Admin} />
      <Route path="/my-bookings" component={MyBookings} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/auth-test" component={AuthTest} />
      <Route path="/verify-email" component={EmailVerification} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/profile" component={Profile} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
