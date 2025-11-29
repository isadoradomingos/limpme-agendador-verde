import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProgressSteps from "@/components/ProgressSteps";

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
      {/* Progress Steps */}
      <ProgressSteps currentStep={1} totalSteps={3} />
      
      <div className="px-6 py-4">
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
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Cidade
            </label>
            <Select
              value={selectedCity}
              onValueChange={(value) => {
                setSelectedCity(value);
                setSelectedNeighborhood("");
              }}
            >
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Selecione sua cidade" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city} className="text-base">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Neighborhood Selection */}
          {selectedCity && (
            <div className="mb-8 animate-fade-in">
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Bairro
              </label>
              <Select
                value={selectedNeighborhood}
                onValueChange={setSelectedNeighborhood}
              >
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Selecione seu bairro" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods[selectedCity].map((neighborhood) => (
                    <SelectItem key={neighborhood} value={neighborhood} className="text-base">
                      {neighborhood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
