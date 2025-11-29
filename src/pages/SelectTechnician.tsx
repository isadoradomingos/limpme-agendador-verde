import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, Award, CheckCircle, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import ProgressSteps from "@/components/ProgressSteps";

const technicians = [
  {
    id: 1,
    name: "Carlos Silva",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    rating: 4.9,
    reviews: 127,
    specialties: ["Limpeza completa", "Polimento"],
    verified: true,
    experience: "5 anos",
  },
  {
    id: 2,
    name: "João Santos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    rating: 4.8,
    reviews: 98,
    specialties: ["Detalhamento", "Higienização"],
    verified: true,
    experience: "4 anos",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    rating: 4.7,
    reviews: 85,
    specialties: ["Limpeza interna", "Cristalização"],
    verified: true,
    experience: "3 anos",
  },
];

const SelectTechnician = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { city, neighborhood, date, time } = location.state || {};

  const handleBooking = (technicianName: string) => {
    toast.success("Agendamento confirmado!", {
      description: `Técnico ${technicianName} foi notificado do seu agendamento.`,
    });
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
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
              onClick={() => navigate("/agendar/data-hora")}
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
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Award className="w-3 h-3" />
                      <span>{tech.experience} de experiência</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tech.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={() => handleBooking(tech.name)}
                >
                  Agendar com {tech.name.split(' ')[0]}
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
