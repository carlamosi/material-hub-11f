import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Lightbulb, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/sobre-el-11f")({
  head: () => ({
    meta: [
      { title: "Sobre el 11F · Día Internacional de la Mujer y la Niña en la Ciencia" },
      {
        name: "description",
        content:
          "Qué es el 11 de febrero, por qué importa visibilizar a las mujeres en STEM y cómo aprovechar los materiales en el aula.",
      },
      { property: "og:title", content: "Sobre el 11F" },
      {
        property: "og:description",
        content: "El Día Internacional de la Mujer y la Niña en la Ciencia y su impacto en el aula.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Calendar className="h-3.5 w-3.5" /> 11 de febrero
          </span>
          <h1 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl">
            Día Internacional de la Mujer y la Niña en la Ciencia
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Una efeméride proclamada por la ONU en 2015 para reconocer el papel clave de las mujeres y las niñas en la ciencia y la tecnología, y para impulsar su pleno acceso y participación.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">Por qué importa</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Solo el 33% de personas investigadoras a nivel mundial son mujeres. Sin referentes visibles, las niñas dejan de imaginarse en la ciencia.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">A quién va dirigido</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Profesorado de infantil a bachillerato, familias, AMPAS, bibliotecas, divulgadoras y cualquier persona con curiosidad.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">Cuándo y cómo</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Cada 11 de febrero. Pero los materiales son útiles todo el año: actividades, exposiciones, charlas, talleres, juegos.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-muted/40 p-8 sm:p-12">
          <h2 className="font-display text-2xl font-bold">Cómo aprovechar este hub</h2>
          <ol className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-4">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
              <p><strong className="text-foreground">Filtra por tu etapa.</strong> Selecciona Infantil, Primaria, ESO, Bachillerato o adultos.</p>
            </li>
            <li className="flex gap-4">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
              <p><strong className="text-foreground">Elige formato.</strong> Presentación para introducir, juego para dinamizar, vídeo para emocionar.</p>
            </li>
            <li className="flex gap-4">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
              <p><strong className="text-foreground">Descarga directo.</strong> Cada card abre el recurso en un clic, sin laberintos en Drive.</p>
            </li>
            <li className="flex gap-4">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
              <p><strong className="text-foreground">Combina y comparte.</strong> El enlace mantiene tus filtros: pasa la URL al claustro.</p>
            </li>
          </ol>
          <Link
            to="/materiales"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background hover:opacity-90"
          >
            Ir al hub de materiales <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
