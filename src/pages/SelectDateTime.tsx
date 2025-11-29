import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ProgressSteps from "@/components/ProgressSteps";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

const SelectDateTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { city, neighborhood } = location.state || {};
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate("/select-technician", {
        state: { 
          city, 
          neighborhood,
          date: selectedDate,
          time: selectedTime
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-8">
      {/* Progress Steps */}
      <ProgressSteps currentStep={2} totalSteps={3} />
      
      <div className="px-6 py-4">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/select-location")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Data e horário
            </h1>
            <p className="text-muted-foreground">
              {city} - {neighborhood}
            </p>
          </div>

          {/* Calendar */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Selecione o dia</h2>
            </div>
            <Card className="p-4 bg-card shadow-soft">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                locale={ptBR}
                className="pointer-events-auto rounded-md"
              />
            </Card>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold text-foreground">Horário</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <Card
                    key={time}
                    className={`p-4 cursor-pointer transition-all hover:shadow-soft ${
                      selectedTime === time
                        ? "bg-gradient-primary text-white shadow-soft"
                        : "bg-card hover:border-primary"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    <p className="font-semibold text-center">{time}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Summary and Continue */}
          {selectedDate && selectedTime && (
            <div className="space-y-4 animate-fade-in">
              <Card className="p-4 bg-card shadow-soft">
                <h3 className="font-semibold mb-2 text-foreground">Resumo do agendamento</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📍 {city} - {neighborhood}</p>
                  <p>📅 {format(selectedDate, "PPP", { locale: ptBR })}</p>
                  <p>🕐 {selectedTime}</p>
                </div>
              </Card>
              
              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={handleContinue}
              >
                Buscar técnicos disponíveis
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectDateTime;
