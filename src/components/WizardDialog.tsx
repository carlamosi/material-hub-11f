import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Wand2, Printer, ClipboardCopy, RotateCcw, Check, Link2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Etapa, Disciplina } from "@/data/materiales";
import { DISCIPLINAS } from "@/data/materiales";
import { cn } from "@/lib/utils";
import {
  recomendarSesion,
  sesionATexto,
  type Bloque,
  type Contexto,
  type Duracion,
  type Formato,
  type Intencion,
} from "@/lib/recomendar";

const ETAPAS_OPTS: { value: Etapa; label: string; desc: string }[] = [
  { value: "Infantil", label: "Infantil", desc: "3 a 6 años" },
  { value: "Primaria", label: "Primaria", desc: "6 a 12 años" },
  { value: "ESO", label: "ESO", desc: "12 a 16 años" },
  { value: "Bachillerato", label: "Bachillerato", desc: "16 a 18 años" },
];

const DUR_OPTS: { value: Duracion; label: string; desc: string }[] = [
  { value: 20, label: "20 min", desc: "tutoría" },
  { value: 45, label: "45 min", desc: "una sesión" },
  { value: 90, label: "90 min", desc: "doble sesión" },
];

const INT_OPTS: { value: Intencion; label: string }[] = [
  { value: "inspirar", label: "Inspirar" },
  { value: "investigar", label: "Investigar" },
  { value: "crear", label: "Crear" },
  { value: "debatir", label: "Debatir" },
  { value: "celebrar", label: "Celebrar" },
];

const FMT_OPTS: { value: Formato; label: string }[] = [
  { value: "visual", label: "Visual" },
  { value: "manipulativo", label: "Manipulativo" },
  { value: "audiovisual", label: "Audiovisual" },
  { value: "ludico", label: "Lúdico" },
];

export function WizardDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [disciplina, setDisciplina] = useState<Disciplina | undefined>();
  const [duracion, setDuracion] = useState<Duracion>(45);
  const [intenciones, setIntenciones] = useState<Intencion[]>([]);
  const [formatos, setFormatos] = useState<Formato[]>([]);
  const [bloques, setBloques] = useState<Bloque[] | null>(null);
  const navigate = useNavigate();

  // Atajo global "r" abre el recomendador
  useEffect(() => {
    function open() { setOpen(true); }
    window.addEventListener("11f:open-recomendador", open as EventListener);
    return () => window.removeEventListener("11f:open-recomendador", open as EventListener);
  }, []);

  function reset() {
    setStep(1); setEtapa(null); setDisciplina(undefined); setDuracion(45);
    setIntenciones([]); setFormatos([]); setBloques(null);
  }

  function generar() {
    if (!etapa) return;
    const ctx: Contexto = { etapa, disciplina, duracion, intenciones, formatos };
    setBloques(recomendarSesion(ctx));
    setStep(4);
  }

  const ctx: Contexto | null = etapa ? { etapa, disciplina, duracion, intenciones, formatos } : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => { setOpen(v); if (!v) setTimeout(reset, 200); }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <button className="inline-flex items-center gap-2 border border-ink/20 bg-card px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary">
            <Wand2 className="h-4 w-4" />
            Diseñar mi sesión 11F
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <p className="kicker">Recomendador editorial</p>
          <DialogTitle className="font-serif text-3xl font-medium leading-tight">
            {step === 1 && "Diseña tu sesión del 11F"}
            {step === 2 && "Intenciones de la sesión"}
            {step === 3 && "Formato preferido"}
            {step === 4 && "Tu secuencia didáctica"}
          </DialogTitle>
          <DialogDescription>
            {step < 4 ? `Paso ${step} de 3 — Sin registros, sin esperas.` : "Editable, imprimible y compartible."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <Field label="Etapa educativa">
              <div className="grid gap-2 sm:grid-cols-2">
                {ETAPAS_OPTS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setEtapa(o.value)}
                    className={cn(
                      "flex items-center justify-between border px-4 py-3 text-left text-sm transition-colors",
                      etapa === o.value
                        ? "border-primary bg-primary-soft"
                        : "border-ink/15 hover:border-ink/40",
                    )}
                  >
                    <span className="font-medium">{o.label}</span>
                    <span className="marginalia text-xs">{o.desc}</span>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Disciplina (opcional)">
              <div className="flex flex-wrap gap-1.5">
                <Chip selected={!disciplina} onClick={() => setDisciplina(undefined)}>Cualquiera</Chip>
                {DISCIPLINAS.filter((d) => d !== "General").map((d) => (
                  <Chip key={d} selected={disciplina === d} onClick={() => setDisciplina(d)}>{d}</Chip>
                ))}
              </div>
            </Field>

            <Field label="Tiempo disponible">
              <div className="flex gap-2">
                {DUR_OPTS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setDuracion(o.value)}
                    className={cn(
                      "flex-1 border px-3 py-3 text-center text-sm transition-colors",
                      duracion === o.value ? "border-primary bg-primary-soft" : "border-ink/15 hover:border-ink/40",
                    )}
                  >
                    <div className="font-serif text-lg">{o.label}</div>
                    <div className="marginalia text-xs">{o.desc}</div>
                  </button>
                ))}
              </div>
            </Field>

            <div className="flex justify-end">
              <button
                disabled={!etapa}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm font-medium text-paper disabled:opacity-30"
              >
                Continuar <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Marca todas las intenciones que encajen. Combinar varias enriquece la sesión.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {INT_OPTS.map((o) => (
                <Chip
                  key={o.value}
                  selected={intenciones.includes(o.value)}
                  onClick={() => setIntenciones((p) => p.includes(o.value) ? p.filter((x) => x !== o.value) : [...p, o.value])}
                >
                  {o.label}
                </Chip>
              ))}
            </div>
            <div className="flex justify-between">
              <BackBtn onClick={() => setStep(1)} />
              <button onClick={() => setStep(3)} className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm font-medium text-paper">
                Continuar <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              ¿Cómo te sientes más cómoda trabajando? Puedes elegir varios.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {FMT_OPTS.map((o) => (
                <Chip
                  key={o.value}
                  selected={formatos.includes(o.value)}
                  onClick={() => setFormatos((p) => p.includes(o.value) ? p.filter((x) => x !== o.value) : [...p, o.value])}
                >
                  {o.label}
                </Chip>
              ))}
            </div>
            <div className="flex justify-between">
              <BackBtn onClick={() => setStep(2)} />
              <button onClick={generar} className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                <Sparkles className="h-4 w-4" /> Generar sesión
              </button>
            </div>
          </div>
        )}

        {step === 4 && bloques && ctx && (
          <SesionResultado
            bloques={bloques}
            ctx={ctx}
            onRestart={() => { reset(); }}
            onVerTodos={() => {
              const search: Record<string, string> = {};
              if (etapa) search.etapa = etapa;
              if (disciplina) search.disciplina = disciplina;
              setOpen(false);
              setTimeout(reset, 200);
              navigate({ to: "/materiales", search });
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="kicker mb-2">{label}</p>
      {children}
    </div>
  );
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border px-3 py-1.5 text-xs font-medium transition-colors",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-ink/20 hover:border-ink/40",
      )}
    >
      {children}
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" /> Atrás
    </button>
  );
}

function SesionResultado({
  bloques, ctx, onRestart, onVerTodos,
}: {
  bloques: Bloque[];
  ctx: Contexto;
  onRestart: () => void;
  onVerTodos: () => void;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const txt = sesionATexto(bloques, ctx);
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="space-y-5">
      <div className="rule-b pb-3 text-xs text-muted-foreground">
        <span className="kicker">Sesión 11F</span>
        <span className="ml-2">{ctx.etapa}{ctx.disciplina ? ` · ${ctx.disciplina}` : ""} · {ctx.duracion} min</span>
      </div>

      <ol className="space-y-5">
        {bloques.map((b, i) => (
          <li key={b.fase} className="grid grid-cols-[auto_1fr] gap-4 print-block">
            <span className="num-badge text-2xl">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg">{b.fase}</h3>
                <span className="num text-xs text-muted-foreground">{b.duracion} min</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{b.descripcion}</p>
              {b.material ? (
                b.material.enlace ? (
                  <a
                    href={b.material.enlace}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block border border-ink/15 p-3 transition-colors hover:border-primary"
                  >
                    <p className="kicker mb-1">{b.material.tipo}</p>
                    <p className="font-serif text-base leading-snug">{b.material.titulo}</p>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{b.material.descripcion}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary">
                      Abrir recurso <Link2 className="h-3 w-3" />
                    </span>
                  </a>
                ) : (
                  <div className="mt-3 block border border-ink/15 p-3">
                    <p className="kicker mb-1">{b.material.tipo}</p>
                    <p className="font-serif text-base leading-snug">{b.material.titulo}</p>
                    <p className="mt-1 text-xs italic text-muted-foreground">Sin enlace público disponible — busca por el título.</p>
                  </div>
                )
              ) : (
                <p className="mt-3 text-xs italic text-muted-foreground">— sin material asignado, completa con uno del hub —</p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="rule-t flex flex-wrap gap-2 pt-4 no-print">
        <button onClick={copy} className="inline-flex items-center gap-1.5 border border-ink/20 px-3 py-2 text-xs font-medium hover:border-primary">
          {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
          {copied ? "Copiada al portapapeles" : "Copiar como texto"}
        </button>
        <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 border border-ink/20 px-3 py-2 text-xs font-medium hover:border-primary">
          <Printer className="h-3.5 w-3.5" /> Imprimir
        </button>
        <button onClick={onVerTodos} className="inline-flex items-center gap-1.5 border border-ink/20 px-3 py-2 text-xs font-medium hover:border-primary">
          Ver todos los materiales <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button onClick={onRestart} className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
          <RotateCcw className="h-3.5 w-3.5" /> Empezar de nuevo
        </button>
      </div>
    </div>
  );
}
