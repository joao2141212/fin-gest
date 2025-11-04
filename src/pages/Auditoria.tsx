import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  User, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight,
  Calendar
} from "lucide-react";

const Auditoria = () => {
  const eventos = [
    {
      id: 1,
      tipo: "conciliacao",
      titulo: "Conciliação aprovada",
      descricao: "Extrato #2025-047 conciliado com Recibo REC-2025-001",
      usuario: "Maria Silva",
      data: "15/01/2025 14:32",
      status: "sucesso",
      detalhes: {
        extrato: "EXT-2025-047",
        recibo: "REC-2025-001",
        valor: "R$ 1.250,00",
        condominio: "Edifício Solar",
      },
    },
    {
      id: 2,
      tipo: "upload",
      titulo: "Documento enviado",
      descricao: "Upload de extrato bancário - Banco XYZ",
      usuario: "João Santos",
      data: "15/01/2025 11:15",
      status: "sucesso",
      detalhes: {
        arquivo: "extrato_janeiro_2025.pdf",
        tamanho: "2.4 MB",
        registros: "127 transações",
      },
    },
    {
      id: 3,
      tipo: "divergencia",
      titulo: "Divergência detectada",
      descricao: "Diferença de R$ 10,00 em conciliação manual",
      usuario: "Sistema",
      data: "14/01/2025 16:45",
      status: "alerta",
      detalhes: {
        extrato: "EXT-2025-046",
        recibo: "REC-2025-002",
        diferenca: "R$ 10,00",
        motivo: "Valor divergente",
      },
    },
    {
      id: 4,
      tipo: "conciliacao",
      titulo: "Conciliação manual",
      descricao: "Ajuste aprovado após análise",
      usuario: "Ana Costa",
      data: "14/01/2025 09:20",
      status: "sucesso",
      detalhes: {
        extrato: "EXT-2025-045",
        recibo: "REC-2025-003",
        observacao: "Diferença de taxa bancária",
      },
    },
  ];

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "conciliacao":
        return CheckCircle;
      case "upload":
        return FileText;
      case "divergencia":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sucesso":
        return "bg-success/10 text-success border-success/20";
      case "alerta":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Auditoria e Histórico</h1>
          <p className="text-muted-foreground">Rastreabilidade completa de todas as operações</p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-6">
          {eventos.map((evento, index) => {
            const Icon = getIcon(evento.tipo);
            
            return (
              <div
                key={evento.id}
                className="relative animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Linha vertical da timeline */}
                {index !== eventos.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-border -z-10" />
                )}

                <Card className="p-6 hover:shadow-card-hover transition-all duration-200 group">
                  <div className="flex gap-4">
                    {/* Ícone e Timeline */}
                    <div className="flex flex-col items-center">
                      <div className={`p-3 rounded-full ${getStatusColor(evento.status)} border-2 transition-transform duration-200 group-hover:scale-105`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {evento.titulo}
                          </h3>
                          <p className="text-sm text-muted-foreground">{evento.descricao}</p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Detalhes */}
                      <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-muted/50">
                        {Object.entries(evento.detalhes).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <p className="text-muted-foreground capitalize">{key}</p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Meta informações */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {evento.usuario}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {evento.data}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Estatísticas */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-200">
            <p className="text-3xl font-bold text-success mb-2">156</p>
            <p className="text-sm text-muted-foreground">Eventos este mês</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-200">
            <p className="text-3xl font-bold text-primary mb-2">98%</p>
            <p className="text-sm text-muted-foreground">Taxa de sucesso</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-200">
            <p className="text-3xl font-bold text-warning mb-2">3</p>
            <p className="text-sm text-muted-foreground">Alertas pendentes</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auditoria;
