import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  FileText, 
  CheckSquare,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Bem-vindo ao FinGest! 👋",
      description: "Sistema completo de gestão financeira para condomínios",
      icon: Sparkles,
      content: "Vamos guiá-lo pelos principais recursos do sistema em poucos minutos.",
      image: "🏢",
    },
    {
      title: "Upload de Documentos",
      description: "Importe extratos bancários e recibos facilmente",
      icon: Upload,
      content: "Arraste arquivos PDF, Excel ou CSV. O sistema extrai automaticamente todas as informações necessárias para a conciliação.",
      image: "📁",
    },
    {
      title: "Gestão de Extratos",
      description: "Visualize e filtre todas as movimentações bancárias",
      icon: FileText,
      content: "Acesse extratos por condomínio, data ou status. Identifique rapidamente pendências e divergências.",
      image: "📊",
    },
    {
      title: "Conciliação Automática",
      description: "Match inteligente entre extratos e recibos",
      icon: CheckSquare,
      content: "O sistema compara automaticamente os registros e sugere conciliações. Você só precisa confirmar ou fazer ajustes manuais.",
      image: "✅",
    },
    {
      title: "Pronto para começar!",
      description: "Explore o dashboard e comece a usar",
      icon: Sparkles,
      content: "Todas as ferramentas estão disponíveis no menu superior. Comece enviando seu primeiro documento!",
      image: "🚀",
    },
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success("Tutorial concluído! 🎉", {
        description: "Você está pronto para usar o FinGest.",
      });
      navigate("/dashboard");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-muted-foreground">
                Passo {currentStep + 1} de {steps.length}
              </h2>
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                Pular tutorial
              </Button>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content Card */}
          <Card 
            className="p-8 mb-6 animate-scale-in"
            key={currentStep}
          >
            <div className="text-center space-y-6">
              {/* Icon & Image */}
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <Icon className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="text-6xl">
                  {currentStepData.image}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">{currentStepData.title}</h1>
                <p className="text-lg text-primary">{currentStepData.description}</p>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  {currentStepData.content}
                </p>
              </div>
            </div>
          </Card>

          {/* Steps Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? "w-8 bg-primary" 
                    : index < currentStep
                    ? "w-2 bg-success"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>

            <Button
              onClick={handleNext}
              className="gap-2 bg-gradient-primary hover:shadow-card-hover transition-all duration-200"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Começar
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tutorial;
