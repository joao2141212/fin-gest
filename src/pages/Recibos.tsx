import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText, Download, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Recibos = () => {
  const recibos = [
    {
      id: 1,
      numero: "REC-2025-001",
      condominio: "Edifício Solar",
      data: "15/01/2025",
      valor: "R$ 1.250,00",
      tipo: "Taxa condominial",
      status: "conciliado" as const,
    },
    {
      id: 2,
      numero: "REC-2025-002",
      condominio: "Residencial Vista Verde",
      data: "14/01/2025",
      valor: "R$ 3.840,00",
      tipo: "Manutenção",
      status: "pendente" as const,
    },
    {
      id: 3,
      numero: "REC-2025-003",
      condominio: "Condomínio Aurora",
      data: "13/01/2025",
      valor: "R$ 850,00",
      tipo: "Taxa extra",
      status: "conciliado" as const,
    },
    {
      id: 4,
      numero: "REC-2025-004",
      condominio: "Edifício Central Park",
      data: "12/01/2025",
      valor: "R$ 2.340,50",
      tipo: "Conta de consumo",
      status: "divergente" as const,
    },
  ];

  const handleAction = (action: string, recibo: typeof recibos[0]) => {
    toast.success(`${action} realizado!`, {
      description: `Recibo ${recibo.numero}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gestão de Recibos</h1>
          <p className="text-muted-foreground">Controle e organização de documentos</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {recibos.map((recibo, index) => (
            <Card
              key={recibo.id}
              className="p-6 hover:shadow-card-hover transition-all duration-200 group animate-fade-up"
              style={{ 
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Info Principal */}
                <div className="flex-1 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-secondary transition-transform duration-200 group-hover:scale-105">
                    <FileText className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{recibo.numero}</h3>
                      <StatusBadge status={recibo.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{recibo.condominio}</p>
                    <p className="text-sm">{recibo.tipo}</p>
                  </div>
                </div>

                {/* Valor e Data */}
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Valor</p>
                    <p className="text-xl font-bold text-primary">{recibo.valor}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Data</p>
                    <p className="font-medium">{recibo.data}</p>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAction("Visualização", recibo)}
                    className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAction("Download", recibo)}
                    className="hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAction("Exclusão", recibo)}
                    className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Recibos;
