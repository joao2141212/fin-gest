import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Building2 } from "lucide-react";

const Dashboard = () => {
  const cards = [
    {
      title: "Saldo Total",
      value: "R$ 2.847.392,50",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      delay: 0,
    },
    {
      title: "Extratos Pendentes",
      value: "47",
      change: "-8 hoje",
      trend: "down",
      icon: TrendingDown,
      delay: 100,
    },
    {
      title: "Recibos Conciliados",
      value: "1.284",
      change: "+23 hoje",
      trend: "up",
      icon: TrendingUp,
      delay: 200,
    },
    {
      title: "Condomínios Ativos",
      value: "18",
      change: "100%",
      trend: "neutral",
      icon: Building2,
      delay: 300,
    },
  ];

  const condominios = [
    { nome: "Edifício Solar", saldo: "R$ 184.320,00", status: "ativo", progresso: 92 },
    { nome: "Residencial Vista Verde", saldo: "R$ 256.840,00", status: "ativo", progresso: 87 },
    { nome: "Condomínio Aurora", saldo: "R$ 143.920,00", status: "ativo", progresso: 94 },
    { nome: "Edifício Central Park", saldo: "R$ 198.450,00", status: "ativo", progresso: 78 },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard Financeiro</h1>
          <p className="text-muted-foreground">Visão geral das operações</p>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <Card
              key={card.title}
              className="p-6 hover:shadow-card-hover transition-all duration-200 cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-primary transition-transform duration-200 hover:scale-105">
                  <card.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                {card.trend === "up" && (
                  <TrendingUp className="w-5 h-5 text-success" />
                )}
                {card.trend === "down" && (
                  <TrendingDown className="w-5 h-5 text-destructive" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
              <p className="text-2xl font-bold mb-2">{card.value}</p>
              <p className={`text-sm ${card.trend === "up" ? "text-success" : card.trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
                {card.change}
              </p>
            </Card>
          ))}
        </div>

        {/* Gráfico de Conciliação */}
        <Card className="p-6 mb-8 animate-scale-in">
          <h2 className="text-xl font-bold mb-6">Taxa de Conciliação</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Conciliados</span>
                <span className="text-sm text-muted-foreground">89%</span>
              </div>
              <Progress value={89} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Pendentes</span>
                <span className="text-sm text-muted-foreground">8%</span>
              </div>
              <Progress value={8} className="h-3 [&>div]:bg-warning" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Divergentes</span>
                <span className="text-sm text-muted-foreground">3%</span>
              </div>
              <Progress value={3} className="h-3 [&>div]:bg-destructive" />
            </div>
          </div>
        </Card>

        {/* Lista de Condomínios */}
        <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-2xl font-bold mb-4">Condomínios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {condominios.map((cond, index) => (
              <Card
                key={cond.nome}
                className="p-6 hover:shadow-card-hover transition-all duration-200 cursor-pointer group animate-fade-up"
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200">
                      {cond.nome}
                    </h3>
                    <p className="text-2xl font-bold text-primary mt-1">{cond.saldo}</p>
                  </div>
                  <StatusBadge status={cond.status as "ativo"} />
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Progresso mensal</span>
                    <span className="font-medium">{cond.progresso}%</span>
                  </div>
                  <Progress value={cond.progresso} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
