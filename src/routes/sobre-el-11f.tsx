import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/sobre-el-11f")({
  head: () => ({
    meta: [
      { title: "Sobre el 11F · Once·F" },
      { name: "description", content: "Por qué el 11 de febrero, qué busca esta efeméride y cómo aprovechar los materiales en cualquier aula." },
      { property: "og:title", content: "Sobre el 11F · Once·F" },
      { property: "og:description", content: "Una efeméride internacional para visibilizar a las mujeres y niñas en la ciencia." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <>
      <section className="rule-b">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <p className="kicker">Sección 02</p>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl text-balance">
            Sobre el <span className="underline-hand italic">11 de febrero</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground prose-ed">
            Día Internacional de la Mujer y la Niña en la Ciencia. Proclamado por la ONU en 2015 para reconocer el papel clave de las mujeres y las niñas en la ciencia y la tecnología, e impulsar su pleno acceso y participación.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-3">
          <Article num="I" title="Por qué importa">
            Solo el 33% de las personas investigadoras a nivel mundial son mujeres (UNESCO, 2023). Sin referentes visibles, las niñas dejan de imaginarse en la ciencia mucho antes de elegir asignaturas.
          </Article>
          <Article num="II" title="A quién va dirigido">
            Profesorado de infantil a bachillerato, familias, AMPAS, bibliotecas, divulgadoras, periodistas y cualquier persona con curiosidad que quiera celebrar la fecha.
          </Article>
          <Article num="III" title="Cuándo y cómo">
            Cada 11 de febrero, sí, pero los materiales sirven todo el año: actividades de aula, exposiciones de pasillo, charlas, talleres, juegos en el recreo.
          </Article>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">Editorial</p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight">
              Por qué <span className="italic">otra</span> web del 11F.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-lg leading-relaxed text-muted-foreground prose-ed">
            <p>
              Hay materiales magníficos repartidos por blogs antiguos, PDFs en Drive, páginas universitarias y proyectos colaborativos. El problema no es la falta de recursos: es <strong className="text-foreground">encontrar el adecuado</strong> el 9 de febrero a las 22:30.
            </p>
            <p>
              Once·F es un esfuerzo de catalogación. Misma información, mismos enlaces, otra forma de mirarlos: como si fueran las páginas de una revista, con índice, sección y sello de verificado.
            </p>
            <p>
              <em>Si echas en falta algo, escríbenos.</em>
            </p>
          </div>
        </div>

        <div className="mt-16 rule-t pt-10">
          <Link to="/materiales" className="group inline-flex items-center gap-2 font-serif text-2xl font-medium link-ed">
            Ir al índice de materiales <ArrowRight className="h-5 w-5 arrow-pop" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Article({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <article>
      <p className="num-badge font-serif text-3xl">{num}</p>
      <h3 className="mt-2 font-serif text-2xl font-medium leading-tight">{title}</h3>
      <p className="mt-3 text-base text-muted-foreground">{children}</p>
    </article>
  );
}
