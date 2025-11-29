import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, List, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="relative px-6 pt-16 pb-12">
        <div className="mx-auto max-w-md">
          {/* Header with logout */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LimpMe
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {/* Main actions */}
          <div className="space-y-4">
            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={() => navigate("/select-location")}
            >
              <Calendar className="w-5 h-5" />
              Novo agendamento
            </Button>

            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={() => navigate("/my-bookings")}
            >
              <List className="w-5 h-5" />
              Meus agendamentos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
