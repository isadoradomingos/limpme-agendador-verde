import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "Básico",
    price: "R$ 89,90",
    period: "/mês",
    features: [
      "1 limpeza por mês",
      "Lavagem externa",
      "Limpeza interna básica",
      "Aspiração",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "R$ 149,90",
    period: "/mês",
    features: [
      "2 limpezas por mês",
      "Lavagem externa completa",
      "Limpeza interna detalhada",
      "Aspiração profunda",
      "Polimento básico",
      "Hidratação de plásticos",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "R$ 249,90",
    period: "/mês",
    features: [
      "4 limpezas por mês",
      "Lavagem premium",
      "Detalhamento completo",
      "Polimento profissional",
      "Cristalização de vidros",
      "Higienização com ozônio",
      "Proteção de pintura",
    ],
    popular: false,
  },
];

const services = [
  { name: "Lavagem externa completa", price: "R$ 49,90" },
  { name: "Limpeza interna detalhada", price: "R$ 79,90" },
  { name: "Polimento profissional", price: "R$ 199,90" },
  { name: "Cristalização de vidros", price: "R$ 149,90" },
  { name: "Higienização com ozônio", price: "R$ 129,90" },
  { name: "Proteção de pintura", price: "R$ 299,90" },
];

const PlansServices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero pb-12">
      <div className="px-6 py-8">
        <div className="mx-auto max-w-2xl">
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
              Planos e Serviços
            </h1>
            <p className="text-muted-foreground">
              Escolha o plano ideal para você ou agende serviços avulsos
            </p>
          </div>

          {/* Plans Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-in">
              Planos mensais
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <Card
                  key={plan.name}
                  className={`p-6 bg-card shadow-soft hover:shadow-elevated transition-all animate-fade-in relative ${
                    plan.popular ? "border-2 border-primary" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        MAIS POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "hero" : "gradient"}
                    size="lg"
                    className="w-full"
                    onClick={() => navigate("/agendar")}
                  >
                    Assinar plano
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-in">
              Serviços avulsos
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <Card
                  key={service.name}
                  className="p-5 bg-card shadow-soft hover:shadow-elevated transition-all animate-fade-in"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">
                      {service.name}
                    </h3>
                    <span className="text-lg font-bold text-primary">
                      {service.price}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate("/agendar")}
                  >
                    Agendar serviço
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansServices;
