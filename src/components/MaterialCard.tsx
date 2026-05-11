import { ExternalLink, Download, Link2 } from "lucide-react";
import type { Material } from "@/data/materiales";
import { TIPO_META } from "@/data/materiales";
import { cn } from "@/lib/utils";

const colorClasses: Record<string, string> = {
  primary: "bg-primary-soft text-primary",
  coral: "bg-coral/15 text-coral",
  violet: "bg-violet/15 text-violet",
  amber: "bg-amber/20 text-amber-foreground",
};

const iconBg: Record<string, string> = {
  primary: "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground",
  coral: "bg-gradient-to-br from-coral to-amber text-coral-foreground",
  violet: "bg-gradient-to-br from-violet to-primary text-violet-foreground",
  amber: "bg-gradient-to-br from-amber to-coral text-amber-foreground",
};

function isPdf(url: string) {
  return /\.pdf($|\?)/i.test(url);
}

export function MaterialCard({ material }: { material: Material }) {
  const meta = TIPO_META[material.tipo];
  const ctaLabel = isPdf(material.enlace)
    ? "Descargar PDF"
    : material.enlace.includes("youtube") || material.enlace.includes("youtu.be")
      ? "Ver vídeo"
      : "Abrir recurso";
  const CtaIcon = isPdf(material.enlace) ? Download : ExternalLink;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
      <div className="relative flex items-center justify-between gap-3 border-b border-border/60 bg-gradient-soft p-5">
        <div className={cn("grid h-12 w-12 place-items-center rounded-xl text-2xl shadow-md", iconBg[meta.color])}>
          <span aria-hidden>{meta.emoji}</span>
        </div>
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", colorClasses[meta.color])}>
          {material.tipo}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold leading-snug text-foreground">
          {material.titulo}
        </h3>
        {material.autor && (
          <p className="mt-1 text-xs text-muted-foreground">por {material.autor}</p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {material.descripcion}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {material.etapas.slice(0, 3).map((e) => (
            <span key={e} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {e}
            </span>
          ))}
          {material.etapas.length > 3 && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{material.etapas.length - 3}
            </span>
          )}
          <span className="rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary">
            {material.idioma}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <a
            href={material.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <CtaIcon className="h-4 w-4" />
            {ctaLabel}
          </a>
          {material.enlaceFuente && (
            <a
              href={material.enlaceFuente}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver fuente oficial"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Link2 className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
