import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Conciliacao = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const comparacoes = [
    {
      extrato: {
        data: "15/01/2025",
        descricao: "Pagamento taxa condomínio",
        valor: "R$ 1.250,00",
        origem: "Banco XYZ",
      },
      recibo: {
        numero: "REC-2025-001",
        descricao: "Taxa condominial - Apt 301",
        valor: "R$ 1.250,00",
        emitente: "Edifício Solar",
      },
      match: true,
    },
    {
      extrato: {
        data: "14/01/2025",
        descricao: "Manutenção elevadores",
        valor: "R$ 3.840,00",
        origem: "Banco XYZ",
      },
      recibo: {
        numero: "REC-2025-002",
        descricao: "Manutenção preventiva",
        valor: "R$ 3.850,00",
        emitente: "Residencial Vista Verde",
      },
      match: false,
    },
  ];

  const current = comparacoes[currentIndex];

  const handleConciliar = () => {
    toast.success("Conciliado com sucesso! 🎉", {
      description: "Os registros foram vinculados.",
    });
    nextComparacao();
  };

  const handleRejeitar = () => {
    toast.error("Marcado para revisão manual", {
      description: "Esta divergência requer atenção.",
    });
    nextComparacao();
  };

  const nextComparacao = () => {
    if (currentIndex < comparacoes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.info("Todas as comparações concluídas!");
      setCurrentIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Conciliação Bancária</h1>
          <p className="text-muted-foreground">
            Comparando registros {currentIndex + 1} de {comparacoes.length}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Comparação Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 relative">
            {/* Extrato */}
            <Card className="p-6 animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg">Extrato Bancário</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className={`font-medium ${current.match ? "text-success" : ""}`}>
                    {current.extrato.data}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Descrição</p>
                  <p className="font-medium">{current.extrato.descricao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className={`text-2xl font-bold transition-colors duration-200 ${current.match ? "text-success" : "text-destructive"}`}>
                    {current.extrato.valor}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Origem</p>
                  <p className="font-medium">{current.extrato.origem}</p>
                </div>
              </div>
            </Card>

            {/* Seta de Conexão */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className={`p-4 rounded-full transition-all duration-300 ${current.match ? "bg-success" : "bg-destructive"}`}>
                {current.match ? (
                  <Check className="w-8 h-8 text-success-foreground" />
                ) : (
                  <X className="w-8 h-8 text-destructive-foreground" />
                )}
              </div>
            </div>

            {/* Recibo */}
            <Card className="p-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-secondary">
                  <Sparkles className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="font-bold text-lg">Recibo</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Número</p>
                  <p className="font-medium">{current.recibo.numero}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Descrição</p>
                  <p className="font-medium">{current.recibo.descricao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className={`text-2xl font-bold transition-colors duration-200 ${current.match ? "text-success" : "text-destructive"}`}>
                    {current.recibo.valor}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emitente</p>
                  <p className="font-medium">{current.recibo.emitente}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Status e Ações */}
          <Card className="p-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg mb-2">
                  {current.match ? "✅ Registros compatíveis" : "⚠️ Divergência detectada"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {current.match 
                    ? "Os valores e informações correspondem perfeitamente."
                    : "Há diferença de R$ 10,00 entre os registros. Revisão manual necessária."}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleRejeitar}
                  className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  Rejeitar
                </Button>
                <Button
                  onClick={handleConciliar}
                  className="gap-2 bg-gradient-primary hover:shadow-card-hover transition-all duration-200"
                >
                  <Check className="w-4 h-4" />
                  {current.match ? "Conciliar" : "Conciliar Manualmente"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Conciliacao;
