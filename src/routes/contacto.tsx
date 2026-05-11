import { createFileRoute } from "@tanstack/react-router";
import { Mail, Globe, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Once·F" },
      { name: "description", content: "Sugiere recursos, reporta enlaces rotos o colabora con la edición editorial del 11F." },
      { property: "og:title", content: "Contacto · Once·F" },
      { property: "og:description", content: "Escríbenos para añadir recursos o colaborar con la edición." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <p className="kicker">Sección 03</p>
      <h1 className="mt-3 font-serif text-5xl font-medium leading-none tracking-tight sm:text-6xl">
        Hablemos.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground prose-ed">
        ¿Conoces un material que falta? ¿Detectaste un enlace roto? ¿Quieres aportar contenido? Estamos a un correo de distancia.
      </p>

      <div className="mt-12 grid gap-0 sm:grid-cols-2">
        <ContactBlock
          icon={Mail}
          kicker="Correo"
          title="hola@oncef.org"
          href="mailto:hola@oncef.org"
          cta="Escribir"
        />
        <ContactBlock
          icon={Globe}
          kicker="Iniciativa oficial"
          title="11defebrero.org"
          href="https://11defebrero.org"
          cta="Visitar"
        />
      </div>

      <div className="mt-16 rule-t pt-10">
        <p className="kicker">Cómo proponer un recurso</p>
        <h2 className="mt-3 font-serif text-3xl font-medium">Lo que necesitamos saber</h2>
        <ul className="mt-5 space-y-2 text-base text-muted-foreground prose-ed">
          <li>· <strong className="text-foreground">Título</strong> del recurso y una breve descripción.</li>
          <li>· <strong className="text-foreground">Enlace</strong> directo a la descarga o página oficial.</li>
          <li>· <strong className="text-foreground">Etapa</strong> educativa recomendada.</li>
          <li>· <strong className="text-foreground">Idioma</strong> (castellano, català, inglés, multilingüe).</li>
          <li>· <strong className="text-foreground">Autoría</strong> o entidad responsable, si aplica.</li>
        </ul>
      </div>
    </section>
  );
}

function ContactBlock({ icon: Icon, kicker, title, href, cta }: { icon: typeof Mail; kicker: string; title: string; href: string; cta: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
       className="group rule-t rule-b border-l border-ink/15 p-6 transition-colors hover:bg-primary-soft/40 sm:[&:nth-child(odd)]:border-l-0">
      <Icon className="h-5 w-5 text-primary" />
      <p className="kicker mt-3">{kicker}</p>
      <p className="mt-1 font-serif text-2xl">{title}</p>
      <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
        {cta} <ArrowRight className="h-4 w-4 arrow-pop" />
      </p>
    </a>
  );
}
