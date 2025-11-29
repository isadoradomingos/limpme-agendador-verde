import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, Award, CheckCircle, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import ProgressSteps from "@/components/ProgressSteps";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const technicians = [
  {
    id: 1,
    name: "Carlos Silva",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    rating: 4.9,
    reviews: 127,
    verified: true,
    experience: "5 anos",
  },
  {
    id: 2,
    name: "João Santos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    rating: 4.8,
    reviews: 98,
    verified: true,
    experience: "4 anos",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    rating: 4.7,
    reviews: 85,
    verified: true,
    experience: "3 anos",
  },
];

const SelectTechnician = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { city, neighborhood, date, time } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handleBooking = async (technicianName: string) => {
    if (!user || !date) {
      toast.error("Erro ao agendar", {
        description: "Informações de agendamento incompletas.",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        technician_name: technicianName,
        city: city || "",
        neighborhood: neighborhood || "",
        booking_date: format(date, "yyyy-MM-dd"),
        booking_time: time || "",
        status: "scheduled",
      });

      if (error) throw error;

      toast.success("Agendamento confirmado!", {
        description: `Técnico ${technicianName} foi notificado do seu agendamento.`,
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Erro ao criar agendamento", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-8">
      {/* Progress Steps */}
      <ProgressSteps currentStep={3} totalSteps={3} />
      
      <div className="px-6 py-4">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/select-datetime")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Técnicos disponíveis
            </h1>
            <Card className="p-3 bg-card shadow-soft">
              <div className="text-sm text-muted-foreground space-y-1">
                <p>📍 {city} - {neighborhood}</p>
                <p>📅 {date && format(date, "PPP", { locale: ptBR })}</p>
                <p>🕐 {time}</p>
              </div>
            </Card>
          </div>

          {/* Technicians List */}
          <div className="space-y-4">
            {technicians.map((tech, index) => (
              <Card
                key={tech.id}
                className="p-5 bg-card shadow-soft hover:shadow-elevated transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={tech.avatar} alt={tech.name} />
                    <AvatarFallback>{tech.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-bold text-foreground flex items-center gap-2">
                          {tech.name}
                          {tech.verified && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{tech.rating}</span>
                          <span>({tech.reviews} avaliações)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Award className="w-3 h-3" />
                      <span>{tech.experience} de experiência</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={() => handleBooking(tech.name)}
                  disabled={loading}
                >
                  {loading ? "Agendando..." : `Agendar com ${tech.name.split(' ')[0]}`}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTechnician;
