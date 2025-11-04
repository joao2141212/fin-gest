import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileText, Check, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const checklist = [
    { label: "Arquivo recebido", done: completed },
    { label: "Formato validado", done: completed },
    { label: "Dados extraídos", done: completed },
    { label: "Condomínio identificado", done: completed },
    { label: "Valores processados", done: completed },
    { label: "Conciliação automática", done: completed },
  ];

  const handleUpload = () => {
    setUploading(true);
    setProgress(0);
    setCompleted(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setCompleted(true);
          toast.success("Upload concluído com sucesso! 🎉", {
            description: "O arquivo foi processado e está pronto para conciliação.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Upload de Documentos</h1>
          <p className="text-muted-foreground">Envie extratos e recibos para processamento automático</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Área de Upload */}
          <Card 
            className={`p-12 border-2 border-dashed transition-all duration-200 animate-scale-in ${
              uploading ? "border-primary bg-accent" : "border-border hover:border-primary hover:bg-accent/50"
            }`}
          >
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center transition-transform duration-200">
                <UploadIcon className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {uploading ? "Processando arquivo..." : completed ? "Arquivo processado!" : "Arraste arquivos aqui"}
                </h3>
                <p className="text-muted-foreground">
                  {uploading ? "Aguarde enquanto extraímos as informações" : "ou clique para selecionar"}
                </p>
              </div>

              {!uploading && !completed && (
                <Button 
                  onClick={handleUpload}
                  className="bg-gradient-primary hover:shadow-glow"
                >
                  Selecionar Arquivo
                </Button>
              )}

              {uploading && (
                <div className="space-y-2 animate-fade-in">
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground">{progress}% concluído</p>
                </div>
              )}

              {completed && (
                <div className="flex items-center justify-center gap-2 text-success animate-fade-up">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-semibold">Processamento completo</span>
                </div>
              )}
            </div>
          </Card>

          {/* Checklist de Processamento */}
          <Card className="p-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Etapas de Processamento
            </h3>
            
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    item.done ? "bg-success/10 animate-fade-up" : "bg-muted/50"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    item.done ? "bg-success text-success-foreground" : "bg-muted"
                  }`}>
                    {item.done && <Check className="w-4 h-4" />}
                  </div>
                  <span className={item.done ? "font-medium" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Informações */}
          <Card className="p-6 bg-accent/50 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h4 className="font-semibold mb-2">Formatos suportados</h4>
            <p className="text-sm text-muted-foreground">
              PDF, Excel (.xlsx, .xls), CSV, XML e OFX
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Upload;
