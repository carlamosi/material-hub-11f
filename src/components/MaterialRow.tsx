import { ExternalLink, Download, FileX2, Copy } from "lucide-react";
import { toast } from "sonner";
import type { Material } from "@/data/materiales";
import { TIPO_META } from "@/data/materiales";
import { cn } from "@/lib/utils";

async function copyLink(url: string) {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Enlace copiado", {
      description: "Pégalo en una pestaña nueva o en otro navegador si tu bloqueador impide abrirlo.",
    });
  } catch {
    toast.error("No se pudo copiar el enlace");
  }
}

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

const isPdf = (u: string) => /\.pdf($|\?)/i.test(u);

export function MaterialRow({ material }: { material: Material }) {
  const meta = TIPO_META[material.tipo];
  const enlace = material.enlace ?? "";
  const hasLink = Boolean(material.enlace);
  const Icon = !hasLink ? FileX2 : isPdf(enlace) ? Download : ExternalLink;
  const cta = !hasLink
    ? "Sin enlace"
    : isPdf(enlace)
      ? "Descargar"
      : enlace.includes("youtu") ? "Ver" : "Abrir";

  return (
    <article
      className={cn(
        "group flex flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center sm:gap-4 sm:pr-4",
        !hasLink && "opacity-75",
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
        <div
          className={cn(
            "grid h-11 w-11 flex-shrink-0 place-items-center rounded-lg text-xl",
            iconBg[meta.color],
          )}
          aria-hidden
        >
          {meta.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="font-display text-sm font-bold leading-snug text-foreground sm:truncate">
              {material.titulo}
            </h3>
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", colorClasses[meta.color])}>
              {material.tipo}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:line-clamp-1">
            {material.etapas.join(" · ")} — {material.idioma}
            {material.disciplinas.length ? ` — ${material.disciplinas.slice(0, 2).join(", ")}` : ""}
          </p>
        </div>
      </div>

      {hasLink ? (
        <div className="flex flex-shrink-0 items-center gap-1.5 self-stretch sm:self-auto">
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${cta} ${material.titulo}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90 sm:flex-none"
          >
            <Icon className="h-3.5 w-3.5" aria-hidden /> {cta}
          </a>
          <button
            type="button"
            onClick={() => copyLink(enlace)}
            aria-label="Copiar enlace"
            title="Copiar enlace"
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-8 sm:w-8"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      ) : (
        <span className="inline-flex flex-shrink-0 items-center justify-center gap-1.5 self-stretch rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground sm:self-auto">
          <Icon className="h-3.5 w-3.5" aria-hidden /> {cta}
        </span>
      )}
    </article>
  );
}
