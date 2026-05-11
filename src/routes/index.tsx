import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wand2 } from "lucide-react";
import { WizardDialog } from "@/components/WizardDialog";
import { CitaDelDia } from "@/components/CitaDelDia";
import { MATERIALES, TIPOS } from "@/data/materiales";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Once·F — Edición 2027 · Materiales para el 11F" },
      {
        name: "description",
        content:
          "La edición editorial del 11 de febrero: presentaciones, juegos, vídeos, ilustraciones y un recomendador que monta tu sesión didáctica en 30 segundos.",
      },
      { property: "og:title", content: "Once·F — La edición especial del 11F" },
      {
        property: "og:description",
        content: "Recursos verificados y un recomendador que diseña tu sesión.",
      },
    ],
  }),
  component: HomePage,
});

const SUMARIO = [
  { num: "01", title: "Materiales", desc: "Índice editorial con búsqueda y filtros en vivo.", to: "/materiales" as const },
  { num: "02", title: "Sobre el 11F", desc: "Por qué importa, a quién va dirigido, cómo aprovecharlo.", to: "/sobre-el-11f" as const },
  { num: "03", title: "Contacto", desc: "Sugiere recursos, reporta enlaces, colabora con la edición.", to: "/contacto" as const },
];

function HomePage() {
  const total = MATERIALES.length;
  const verificados = MATERIALES.filter((m) => m.verificado).length;

  return (
    <>
      {/* PORTADA */}
      <section className="rule-b">
        <div className="container mx-auto grid gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-20">
          <div className="lg:col-span-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="kicker">Nº 11 · Edición Febrero 2027</p>
              <p className="kicker hidden sm:block">Edición especial 11F</p>
            </div>
            <h1 className="mt-6 font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-balance">
              Una edición especial para celebrar a las{" "}
              <span className="underline-hand italic">mujeres y niñas</span> en la ciencia.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground prose-ed">
              {total} recursos curados desde 2017 — presentaciones, juegos, vídeos, ilustraciones, exposiciones — reunidos en una sola edición editorial. Cada enlace, comprobado a mano.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/materiales"
                className="group inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-primary"
              >
                Hojear los {total} materiales
                <ArrowRight className="h-4 w-4 arrow-pop" />
              </Link>
              <WizardDialog
                trigger={
                  <button className="inline-flex items-center gap-2 border border-ink/30 px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary">
                    <Wand2 className="h-4 w-4" /> Diseñar mi sesión
                  </button>
                }
              />
              <span className="hidden text-xs text-muted-foreground sm:inline">
                pulsa <kbd className="num border border-ink/20 px-1.5 py-0.5">r</kbd> en cualquier momento
              </span>
            </div>
          </div>

          {/* Sumario lateral tipo revista */}
          <aside className="lg:col-span-4">
            <div className="rule-t rule-b py-6">
              <p className="kicker">Sumario</p>
              <ol className="mt-4 space-y-4">
                {SUMARIO.map((s) => (
                  <li key={s.num}>
                    <Link to={s.to} className="group grid grid-cols-[auto_1fr] gap-3">
                      <span className="num-badge num text-sm">{s.num}</span>
                      <div>
                        <h3 className="font-serif text-lg font-medium leading-tight">
                          <span className="link-ed">{s.title}</span>
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <Stat n={total} label="recursos" />
              <Stat n={verificados} label="verificados" />
              <Stat n={TIPOS.length} label="formatos" />
            </div>
          </aside>
        </div>
      </section>

      {/* CITA DEL DÍA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CitaDelDia />
      </section>

      {/* CÓMO HOJEAR */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">Cómo hojear esta edición</p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight">
              Tres caminos para empezar.
            </h2>
          </div>
          <ol className="lg:col-span-8 space-y-6">
            <Path
              num="01"
              title="Sé qué quiero hacer."
              body="Abre el recomendador y responde tres preguntas: te entregamos una secuencia didáctica completa (calentamiento + actividad central + cierre) imprimible y compartible."
              cta={<WizardDialog trigger={<button className="link-ed">Abrir recomendador →</button>} />}
            />
            <Path
              num="02"
              title="Quiero curiosear."
              body="Recorre el índice editorial con filtros por etapa, formato, disciplina e idioma. Cada material lleva sello de verificado y abre con un solo clic."
              cta={<Link to="/materiales" className="link-ed">Ir al índice →</Link>}
            />
            <Path
              num="03"
              title="Tengo prisa."
              body={<>Pulsa <kbd className="num border border-ink/20 px-1.5">/</kbd> y busca por palabras clave: <em>"Marie Curie"</em>, <em>"matemáticas primaria"</em>, <em>"kahoot"</em>.</>}
              cta={<Link to="/materiales" className="link-ed">Probar buscador →</Link>}
            />
          </ol>
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rule-t pt-3">
      <p className="font-serif text-3xl font-medium num-badge">{n}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function Path({ num, title, body, cta }: { num: string; title: string; body: React.ReactNode; cta: React.ReactNode }) {
  return (
    <li className="rule-b grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 pb-6">
      <span className="num-badge num text-2xl">{num}</span>
      <div>
        <h3 className="font-serif text-2xl font-medium leading-tight">{title}</h3>
        <p className="mt-2 text-base text-muted-foreground prose-ed">{body}</p>
        <p className="mt-3 text-sm">{cta}</p>
      </div>
    </li>
  );
}
