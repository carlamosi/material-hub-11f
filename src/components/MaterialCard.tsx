import { ExternalLink, Download, BadgeCheck, AlertCircle } from "lucide-react";
import type { Material } from "@/data/materiales";
import { cn } from "@/lib/utils";

function isPdf(url: string) { return /\.pdf($|\?)/i.test(url); }
function isVideo(url: string) { return /youtube|youtu\.be|vimeo/i.test(url); }

function ctaLabel(url: string) {
  if (isPdf(url)) return "Descargar";
  if (isVideo(url)) return "Ver";
  return "Abrir";
}

/**
 * Fila editorial estilo índice de revista.
 */
export function MaterialRow({ material, index }: { material: Material; index: number }) {
  const Icon = isPdf(material.enlace) ? Download : ExternalLink;
  const verified = material.verificado !== false;

  return (
    <article className="group rule-b grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-1 py-5 transition-colors hover:bg-primary-soft/30">
      <span className="num-badge num text-xl tabular-nums">{String(index).padStart(2, "0")}</span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-serif text-xl font-medium leading-tight tracking-tight">
            <a href={material.enlace} target="_blank" rel="noreferrer" className="link-ed">
              {material.titulo}
            </a>
          </h3>
          {!verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <AlertCircle className="h-3 w-3" /> Enlace sin verificar
            </span>
          )}
          {verified && (
            <span className="hidden items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-primary sm:inline-flex" title={`Comprobado el ${material.verificadoEn}`}>
              <BadgeCheck className="h-3 w-3" /> Verificado
            </span>
          )}
        </div>

        <p className="mt-1 text-sm text-muted-foreground prose-ed">{material.descripcion}</p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          <span className="kicker !text-[10px] !text-foreground">{material.tipo}</span>
          <span aria-hidden>·</span>
          <span>{material.etapas.join(", ")}</span>
          <span aria-hidden>·</span>
          <span>{material.disciplinas.join(", ")}</span>
          <span aria-hidden>·</span>
          <span>{material.idioma}</span>
          {material.autor && (<><span aria-hidden>·</span><span className="italic">{material.autor}</span></>)}
        </div>
      </div>

      <a
        href={material.enlace}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 self-center whitespace-nowrap border border-ink/20 px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
      >
        {ctaLabel(material.enlace)} <Icon className="h-3.5 w-3.5 arrow-pop" />
      </a>
    </article>
  );
}

/**
 * Variante mosaico (alternativa a la fila).
 */
export function MaterialCard({ material }: { material: Material }) {
  const Icon = isPdf(material.enlace) ? Download : ExternalLink;
  const verified = material.verificado !== false;

  return (
    <article className={cn(
      "group flex flex-col border border-ink/15 bg-card p-5 transition-colors hover:border-primary",
    )}>
      <p className="kicker mb-2">{material.tipo}</p>
      <h3 className="font-serif text-lg font-medium leading-snug">
        <a href={material.enlace} target="_blank" rel="noreferrer" className="link-ed">
          {material.titulo}
        </a>
      </h3>
      {material.autor && (
        <p className="mt-1 text-xs italic text-muted-foreground">por {material.autor}</p>
      )}
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{material.descripcion}</p>

      <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-muted-foreground">
        {material.etapas.map((e) => (<span key={e} className="border border-ink/15 px-1.5">{e}</span>))}
        <span className="border border-primary/40 px-1.5 text-primary">{material.idioma}</span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        {verified
          ? <span className="stamp">Verificado</span>
          : <span className="text-[10px] uppercase tracking-wider text-muted-foreground">sin verificar</span>}
        <a
          href={material.enlace}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium hover:text-primary"
        >
          {ctaLabel(material.enlace)} <Icon className="h-3.5 w-3.5 arrow-pop" />
        </a>
      </div>
    </article>
  );
}
