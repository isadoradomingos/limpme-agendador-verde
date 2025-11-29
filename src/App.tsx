import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import SelectLocation from "./pages/SelectLocation";
import SelectDateTime from "./pages/SelectDateTime";
import SelectTechnician from "./pages/SelectTechnician";
import PlansServices from "./pages/PlansServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select-location"
              element={
                <ProtectedRoute>
                  <SelectLocation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select-datetime"
              element={
                <ProtectedRoute>
                  <SelectDateTime />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select-technician"
              element={
                <ProtectedRoute>
                  <SelectTechnician />
                </ProtectedRoute>
              }
            />
            <Route path="/planos" element={<PlansServices />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
