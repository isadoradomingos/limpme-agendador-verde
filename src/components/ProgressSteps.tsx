import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps = ({ currentStep, totalSteps }: ProgressStepsProps) => {
  return (
    <div className="w-full max-w-md mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                    isCompleted && "bg-gradient-primary text-white shadow-soft",
                    isCurrent && "bg-gradient-primary text-white shadow-elevated scale-110",
                    isUpcoming && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {stepNumber < totalSteps && (
                <div className="flex-1 h-1 mx-2">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      stepNumber < currentStep ? "bg-gradient-primary" : "bg-muted"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
