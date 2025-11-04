import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Dashboard from "./pages/Dashboard";
import Extratos from "./pages/Extratos";
import Recibos from "./pages/Recibos";
import Conciliacao from "./pages/Conciliacao";
import Upload from "./pages/Upload";
import Auditoria from "./pages/Auditoria";
import Tutorial from "./pages/Tutorial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/extratos" element={<Extratos />} />
          <Route path="/recibos" element={<Recibos />} />
          <Route path="/conciliacao" element={<Conciliacao />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/auditoria" element={<Auditoria />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
