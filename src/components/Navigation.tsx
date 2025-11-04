import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  CheckSquare, 
  Upload, 
  ShieldCheck,
  BookOpen 
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/extratos", icon: FileText, label: "Extratos" },
  { to: "/recibos", icon: Receipt, label: "Recibos" },
  { to: "/conciliacao", icon: CheckSquare, label: "Conciliação" },
  { to: "/upload", icon: Upload, label: "Upload" },
  { to: "/auditoria", icon: ShieldCheck, label: "Auditoria" },
  { to: "/tutorial", icon: BookOpen, label: "Tutorial" },
];

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-card animate-slide-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center transition-all duration-200 group-hover:shadow-md">
              <span className="text-xl font-bold text-primary-foreground">FG</span>
            </div>
            <span className="text-lg font-bold hidden sm:inline">FinGest</span>
          </NavLink>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden md:inline text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
