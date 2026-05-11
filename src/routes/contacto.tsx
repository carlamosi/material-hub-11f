import { createFileRoute } from "@tanstack/react-router";
import { Mail, Globe, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · 11F·Hub" },
      { name: "description", content: "Sugiere recursos, reporta enlaces rotos o colabora con el hub de materiales del 11F." },
      { property: "og:title", content: "Contacto · 11F·Hub" },
      { property: "og:description", content: "Escríbenos para añadir recursos o colaborar con el hub." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h1 className="font-display text-4xl font-black sm:text-5xl">Hablemos</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        ¿Conoces un material que falta? ¿Detectaste un enlace roto? ¿Quieres aportar contenido? Estamos a un correo de distancia.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <a
          href="mailto:hola@11fhub.org"
          className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
        >
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Correo electrónico</h2>
            <p className="mt-1 text-sm text-muted-foreground">hola@11fhub.org</p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Escribir <ExternalLink className="h-3.5 w-3.5" />
            </p>
          </div>
        </a>

        <a
          href="https://11defebrero.org"
          target="_blank"
          rel="noreferrer"
          className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
        >
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Iniciativa oficial</h2>
            <p className="mt-1 text-sm text-muted-foreground">11defebrero.org</p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Visitar <ExternalLink className="h-3.5 w-3.5" />
            </p>
          </div>
        </a>
      </div>

      <div className="mt-12 rounded-3xl border border-border bg-gradient-soft p-8">
        <h2 className="font-display text-xl font-bold">¿Quieres añadir un recurso?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Envíanos un correo con: título, una breve descripción, enlace de descarga, etapa educativa recomendada e idioma. Lo revisamos y lo incorporamos al hub.
        </p>
      </div>
    </section>
  );
}
