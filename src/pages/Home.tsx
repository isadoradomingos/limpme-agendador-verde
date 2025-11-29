import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Calendar, FileText } from "lucide-react";
import familyBg from "@/assets/happy-family-bg.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${familyBg})` }}
        >
          {/* Overlay reduzido: menos esbranquiçado/menos opaco para deixar o fundo mais visível */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/20 pointer-events-none" aria-hidden="true"></div>
        </div>
        
        <div className="relative px-6 pt-16 pb-12">
          <div className="mx-auto max-w-md text-center animate-fade-in">
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
              LimpMe
            </h1>
            <p className="text-lg text-white font-medium mb-12">
              Sua limpeza automotiva por assinatura
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="hero"
                size="xl"
                className="w-full animate-fade-in"
                style={{ animationDelay: "0.1s" }}
                onClick={() => navigate("/auth")}
              >
                <Calendar className="w-5 h-5" />
                Agendamentos
              </Button>

              <Button
                variant="gradient"
                size="lg"
                className="w-full animate-fade-in"
                style={{ animationDelay: "0.2s" }}
                onClick={() => window.open("https://limpme.com/", "_blank")}
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

    </div>
  );
};

export default Home;
