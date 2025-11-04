import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 animate-fade-up">
        <div className="animate-scale-in">
          <img src="/logo-seg.png" alt="FinGest Logo" className="w-32 h-32 mx-auto rounded-3xl shadow-card" />
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
          FinGest
        </h1>

        {/* Frase Motivacional */}
        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-md mx-auto">
          Gestão financeira inteligente e simples
        </p>

        {/* Loading Animation */}
        <div className="space-y-4" style={{ opacity: 0, animation: "fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards" }}>
          <div className="w-64 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-primary-foreground rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
