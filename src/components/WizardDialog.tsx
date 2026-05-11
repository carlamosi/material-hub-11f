import { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Wand2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Etapa, Tipo } from "@/data/materiales";
import { cn } from "@/lib/utils";

const ETAPAS_OPTS: { value: Etapa; emoji: string; desc: string }[] = [
  { value: "Infantil", emoji: "🧸", desc: "3 a 6 años" },
  { value: "Primaria", emoji: "✏️", desc: "6 a 12 años" },
  { value: "ESO", emoji: "🎒", desc: "12 a 16 años" },
  { value: "Bachillerato", emoji: "🎓", desc: "16 a 18 años" },
  { value: "Adultos", emoji: "🌍", desc: "Universidad y público" },
];

const TIPOS_OPTS: { value: Tipo | "todos"; emoji: string; label: string }[] = [
  { value: "todos", emoji: "✨", label: "Cualquier tipo" },
  { value: "Presentaciones", emoji: "📊", label: "Presentaciones" },
  { value: "Vídeos", emoji: "🎬", label: "Vídeos" },
  { value: "Juegos", emoji: "🎮", label: "Juegos" },
  { value: "Fichas", emoji: "📝", label: "Fichas imprimibles" },
  { value: "Ilustraciones", emoji: "🎨", label: "Para colorear" },
];

export function WizardDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const navigate = useNavigate();

  function reset() {
    setStep(1);
    setEtapa(null);
  }

  function finish(tipo: Tipo | "todos") {
    const search: Record<string, string> = {};
    if (etapa) search.etapa = etapa;
    if (tipo !== "todos") search.tipo = tipo;
    setOpen(false);
    setTimeout(reset, 200);
    navigate({ to: "/materiales", search });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(reset, 200);
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-all hover:border-primary hover:shadow-glow">
            <Wand2 className="h-4 w-4 text-primary" />
            ¿Qué busco?
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            {step === 1 ? "¿Para quién es?" : "¿Qué tipo de recurso?"}
          </DialogTitle>
          <DialogDescription>
            Paso {step} de 2 · te llevamos a los materiales perfectos
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {ETAPAS_OPTS.map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  setEtapa(o.value);
                  setStep(2);
                }}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                  "border-border hover:border-primary hover:bg-primary-soft",
                )}
              >
                <span className="text-2xl">{o.emoji}</span>
                <div>
                  <p className="font-semibold">{o.value}</p>
                  <p className="text-xs text-muted-foreground">{o.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {TIPOS_OPTS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => finish(o.value)}
                  className="group flex items-center gap-3 rounded-xl border-2 border-border p-4 text-left transition-all hover:border-primary hover:bg-primary-soft"
                >
                  <span className="text-2xl">{o.emoji}</span>
                  <span className="font-medium">{o.label}</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
              <span className="text-xs text-muted-foreground">Para: {etapa}</span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
