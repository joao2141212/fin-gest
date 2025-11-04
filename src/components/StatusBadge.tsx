import { Badge } from "@/components/ui/badge";

type Status = "conciliado" | "pendente" | "divergente" | "ativo" | "inativo";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const variants: Record<Status, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    conciliado: { label: "Conciliado", variant: "default" },
    pendente: { label: "Pendente", variant: "secondary" },
    divergente: { label: "Divergente", variant: "destructive" },
    ativo: { label: "Ativo", variant: "default" },
    inativo: { label: "Inativo", variant: "outline" },
  };

  const config = variants[status];

  return (
    <Badge 
      variant={config.variant} 
      className={`transition-all duration-200 ${className}`}
    >
      {config.label}
    </Badge>
  );
};
