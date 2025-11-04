import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar, Building2, ArrowUpRight, Filter } from "lucide-react";
import { toast } from "sonner";

const Extratos = () => {
  const [filter, setFilter] = useState<"todos" | "conciliado" | "pendente" | "divergente">("todos");

  const extratos = [
    {
      id: 1,
      condominio: "Edifício Solar",
      data: "15/01/2025",
      descricao: "Pagamento taxa de condomínio - Apt 301",
      valor: "R$ 1.250,00",
      tipo: "entrada",
      status: "conciliado" as const,
    },
    {
      id: 2,
      condominio: "Residencial Vista Verde",
      data: "14/01/2025",
      descricao: "Manutenção elevadores",
      valor: "R$ 3.840,00",
      tipo: "saida",
      status: "pendente" as const,
    },
    {
      id: 3,
      condominio: "Condomínio Aurora",
      data: "13/01/2025",
      descricao: "Taxa extra - Reforma área comum",
      valor: "R$ 850,00",
      tipo: "entrada",
      status: "conciliado" as const,
    },
    {
      id: 4,
      condominio: "Edifício Central Park",
      data: "12/01/2025",
      descricao: "Conta de água",
      valor: "R$ 2.340,50",
      tipo: "saida",
      status: "divergente" as const,
    },
    {
      id: 5,
      condominio: "Edifício Solar",
      data: "11/01/2025",
      descricao: "Pagamento segurança - Janeiro",
      valor: "R$ 4.500,00",
      tipo: "saida",
      status: "conciliado" as const,
    },
  ];

  const filteredExtratos = filter === "todos" 
    ? extratos 
    : extratos.filter(e => e.status === filter);

  const handleExtratoClick = (extrato: typeof extratos[0]) => {
    toast.success(`Extrato #${extrato.id} visualizado!`, {
      description: extrato.descricao,
    });
  };

  const filters = [
    { value: "todos" as const, label: "Todos" },
    { value: "conciliado" as const, label: "Conciliados" },
    { value: "pendente" as const, label: "Pendentes" },
    { value: "divergente" as const, label: "Divergentes" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Extratos Bancários</h1>
          <p className="text-muted-foreground">Gestão completa de movimentações</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6 animate-slide-down">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
              className="transition-all duration-200"
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Lista de Extratos */}
        <div className="space-y-4">
          {filteredExtratos.map((extrato, index) => (
            <Card
              key={extrato.id}
              className="p-6 hover:shadow-card-hover transition-all duration-200 cursor-pointer group animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleExtratoClick(extrato)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent">
                      <Building2 className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {extrato.condominio}
                      </h3>
                      <p className="text-sm text-muted-foreground">{extrato.descricao}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {extrato.data}
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      extrato.tipo === "entrada" ? "text-success" : "text-destructive"
                    }`}>
                      {extrato.tipo === "entrada" ? "+" : "-"} {extrato.valor}
                    </p>
                  </div>

                  <StatusBadge status={extrato.status} />
                  
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-200" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredExtratos.length === 0 && (
          <Card className="p-12 text-center animate-fade-in">
            <p className="text-muted-foreground">Nenhum extrato encontrado com o filtro selecionado.</p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Extratos;
