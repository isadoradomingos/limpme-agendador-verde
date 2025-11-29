import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Calendar, FileText } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative px-6 pt-16 pb-12">
          <div className="mx-auto max-w-md text-center animate-fade-in">
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
              LimpMe
            </h1>
            <p className="text-lg text-muted-foreground font-medium mb-8">
              sua limpeza automotiva por assinatura
            </p>
            
            {/* Hero Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-elevated">
              <img 
                src={heroImage} 
                alt="Carro limpo e reluzente" 
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="hero"
                size="xl"
                className="w-full animate-fade-in"
                style={{ animationDelay: "0.1s" }}
                onClick={() => navigate("/agendar")}
              >
                <Calendar className="w-5 h-5" />
                Agendar limpeza
              </Button>

              <Button
                variant="gradient"
                size="lg"
                className="w-full animate-fade-in"
                style={{ animationDelay: "0.2s" }}
                onClick={() => navigate("/planos")}
              >
                <FileText className="w-5 h-5" />
                Consulte nossos planos e serviços
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                className="w-full animate-fade-in"
                style={{ animationDelay: "0.3s" }}
                onClick={() => window.open("https://wa.me/5548999999999", "_blank")}
              >
                <MessageCircle className="w-5 h-5" />
                Contatar Central de atendimento
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 pb-12">
        <div className="mx-auto max-w-md grid grid-cols-3 gap-4 text-center">
          <div className="bg-card p-4 rounded-xl shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-3xl mb-2">🚗</div>
            <p className="text-xs text-muted-foreground font-medium">Limpeza completa</p>
          </div>
          <div className="bg-card p-4 rounded-xl shadow-soft animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-xs text-muted-foreground font-medium">Profissionais qualificados</p>
          </div>
          <div className="bg-card p-4 rounded-xl shadow-soft animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="text-3xl mb-2">📱</div>
            <p className="text-xs text-muted-foreground font-medium">Agendamento fácil</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
