import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const cities = ["Florianópolis", "São José", "Palhoça", "Biguaçu"];

const neighborhoods: Record<string, string[]> = {
  "Florianópolis": ["Centro", "Trindade", "Lagoa da Conceição", "Canasvieiras", "Ingleses", "Jurerê"],
  "São José": ["Centro", "Campinas", "Kobrasol", "Praia Comprida", "Forquilhinha"],
  "Palhoça": ["Centro", "Pedra Branca", "Pagani", "Enseada de Brito"],
  "Biguaçu": ["Centro", "Tijuquinhas", "São Miguel", "Sorocaba"],
};

const SelectLocation = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");

  const handleContinue = () => {
    if (selectedCity && selectedNeighborhood) {
      navigate("/agendar/data-hora", {
        state: { city: selectedCity, neighborhood: selectedNeighborhood }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="px-6 py-8">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Selecione sua localização
            </h1>
            <p className="text-muted-foreground">
              Escolha sua cidade e bairro para encontrar técnicos disponíveis
            </p>
          </div>

          {/* City Selection */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Cidade</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {cities.map((city) => (
                <Card
                  key={city}
                  className={`p-4 cursor-pointer transition-all hover:shadow-soft ${
                    selectedCity === city
                      ? "bg-gradient-primary text-white shadow-soft"
                      : "bg-card hover:border-primary"
                  }`}
                  onClick={() => {
                    setSelectedCity(city);
                    setSelectedNeighborhood("");
                  }}
                >
                  <p className="font-medium text-center">{city}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Neighborhood Selection */}
          {selectedCity && (
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold text-foreground">Bairro</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {neighborhoods[selectedCity].map((neighborhood) => (
                  <Card
                    key={neighborhood}
                    className={`p-4 cursor-pointer transition-all hover:shadow-soft ${
                      selectedNeighborhood === neighborhood
                        ? "bg-gradient-primary text-white shadow-soft"
                        : "bg-card hover:border-primary"
                    }`}
                    onClick={() => setSelectedNeighborhood(neighborhood)}
                  >
                    <p className="font-medium text-center text-sm">{neighborhood}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Continue Button */}
          {selectedCity && selectedNeighborhood && (
            <Button
              variant="hero"
              size="xl"
              className="w-full animate-fade-in"
              onClick={handleContinue}
            >
              Continuar
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;
