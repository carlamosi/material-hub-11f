import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Filter, Search, Wand2, Download, Sparkles, GraduationCap, Baby, BookOpen } from "lucide-react";
import heroImg from "@/assets/hero-mujeres-ciencia.jpg";
import { WizardDialog } from "@/components/WizardDialog";
import { MATERIALES } from "@/data/materiales";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "11F·Hub — Materiales para el Día de la Mujer y la Niña en la Ciencia" },
      {
        name: "description",
        content:
          "Hub unificado con presentaciones, vídeos, juegos e ilustraciones para el 11 de febrero. Filtros instantáneos por etapa educativa, tipo e idioma.",
      },
      { property: "og:title", content: "11F·Hub — Encuentra tu material en segundos" },
      {
        property: "og:description",
        content: "+60 recursos abiertos para celebrar el Día Internacional de la Mujer y la Niña en la Ciencia.",
      },
    ],
  }),
  component: HomePage,
});

const FEATURES = [
  {
    icon: Filter,
    title: "Filtros en tiempo real",
    desc: "Etapa, tipo, idioma y disciplina. Resultados instantáneos sin recargar.",
  },
  {
    icon: Search,
    title: "Buscador inteligente",
    desc: '"Marie Curie", "microbiología primaria"... encuentra por palabras clave.',
  },
  {
    icon: Download,
    title: "Descarga directa",
    desc: "Sin pasos intermedios. Un clic y el recurso está abierto.",
  },
  {
    icon: Wand2,
    title: "Recomendador guiado",
    desc: "Wizard de 2 pasos para docentes que llegan sin saber por dónde empezar.",
  },
];

const SHORTCUTS = [
  { etapa: "Infantil", emoji: "🧸", icon: Baby, count: MATERIALES.filter((m) => m.etapas.includes("Infantil")).length },
  { etapa: "Primaria", emoji: "✏️", icon: BookOpen, count: MATERIALES.filter((m) => m.etapas.includes("Primaria")).length },
  { etapa: "ESO", emoji: "🎒", icon: GraduationCap, count: MATERIALES.filter((m) => m.etapas.includes("ESO")).length },
  { etapa: "Bachillerato", emoji: "🎓", icon: Sparkles, count: MATERIALES.filter((m) => m.etapas.includes("Bachillerato")).length },
] as const;

function HomePage() {
  const total = MATERIALES.length;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-violet/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
        </div>

        <div className="container mx-auto grid gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> 11 de febrero · Día de la Mujer y la Niña en la Ciencia
            </span>
            <h1 className="mt-5 font-display text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Todos los materiales del 11F.
              <br />
              <span className="bg-gradient-to-r from-primary via-violet to-coral bg-clip-text text-transparent">
                Un solo lugar.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {total}+ presentaciones, vídeos, juegos, ilustraciones y exposiciones para celebrar el día. Filtra por etapa, idioma o tipo y descarga en un clic.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/materiales"
                className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-lg transition-all hover:scale-105"
              >
                Explorar los {total} materiales
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <WizardDialog />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-6">
              <div>
                <p className="font-display text-2xl font-bold text-primary">{total}+</p>
                <p className="text-xs text-muted-foreground">recursos</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary">14</p>
                <p className="text-xs text-muted-foreground">tipos distintos</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary">5</p>
                <p className="text-xs text-muted-foreground">etapas educativas</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
              <img
                src={heroImg}
                alt="Ilustración de mujeres científicas trabajando con telescopio, microscopio, pizarra y matraces"
                width={1536}
                height={1024}
                className="relative w-full rounded-3xl border border-border/60 bg-card shadow-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SHORTCUTS */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Empieza por tu etapa</h2>
          <p className="mt-2 text-muted-foreground">Atajos directos al material adecuado para tu aula.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHORTCUTS.map((s) => (
            <Link
              key={s.etapa}
              to="/materiales"
              search={{ etapa: s.etapa }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{s.emoji}</span>
                <span className="text-xs font-semibold text-muted-foreground">{s.count} recursos</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.etapa}</h3>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Ver materiales <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-muted/40">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Diseñado para encontrar, no para perderse</h2>
            <p className="mt-3 text-muted-foreground">
              Adiós al "haz clic en la imagen, busca el botón rosa escondido en Drive". Aquí cada material se descarga de un clic.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-glow sm:p-16">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_30%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">¿No sabes por dónde empezar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
              Responde dos preguntas y te llevamos al material exacto que necesitas para tu aula.
            </p>
            <div className="mt-6 inline-block">
              <WizardDialog
                trigger={
                  <button className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground shadow-lg transition-transform hover:scale-105">
                    <Wand2 className="h-4 w-4 text-primary" /> Abrir el recomendador
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
