import { ExternalLink, Download, BadgeCheck, AlertCircle, Link2Off } from "lucide-react";
import type { Material } from "@/data/materiales";
import { cn } from "@/lib/utils";

function isPdf(url: string) { return /\.pdf($|\?)/i.test(url); }
function isVideo(url: string) { return /youtube|youtu\.be|vimeo/i.test(url); }
function ctaLabel(url: string) {
  if (isPdf(url)) return "Descargar";
  if (isVideo(url)) return "Ver";
  return "Abrir";
}

function StatusBadge({ material }: { material: Material }) {
  if (!material.enlace) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground" title="Material citado en el catálogo sin enlace público disponible">
        <Link2Off className="h-3 w-3" /> Sin enlace público
      </span>
    );
  }
  if (material.funciona === "no") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-destructive">
        <AlertCircle className="h-3 w-3" /> Enlace caído
      </span>
    );
  }
  if (material.funciona === "parcial") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-amber-700" title={material.nota || "El enlace funciona parcialmente o lleva a una página relacionada"}>
        <AlertCircle className="h-3 w-3" /> Enlace parcial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-primary" title={`Comprobado el ${material.verificadoEn}`}>
      <BadgeCheck className="h-3 w-3" /> Verificado
    </span>
  );
}

function CTA({ material }: { material: Material }) {
  if (!material.enlace) {
    return (
      <span className="inline-flex items-center gap-1.5 self-center whitespace-nowrap border border-ink/10 px-3 py-1.5 text-xs italic text-muted-foreground">
        sin enlace
      </span>
    );
  }
  const Icon = isPdf(material.enlace) ? Download : ExternalLink;
  return (
    <a
      href={material.enlace}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 self-center whitespace-nowrap border border-ink/20 px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
    >
      {ctaLabel(material.enlace)} <Icon className="h-3.5 w-3.5 arrow-pop" />
    </a>
  );
}

function TitleLink({ material, className }: { material: Material; className?: string }) {
  if (!material.enlace) return <span className={className}>{material.titulo}</span>;
  return (
    <a href={material.enlace} target="_blank" rel="noreferrer" className={cn("link-ed", className)}>
      {material.titulo}
    </a>
  );
}

export function MaterialRow({ material, index }: { material: Material; index: number }) {
  return (
    <article className="group rule-b grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-1 py-5 transition-colors hover:bg-primary-soft/30">
      <span className="num-badge num text-xl tabular-nums">{String(index).padStart(2, "0")}</span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-serif text-xl font-medium leading-tight tracking-tight">
            <TitleLink material={material} />
          </h3>
          <StatusBadge material={material} />
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
        </div>
      </div>
      <CTA material={material} />
    </article>
  );
}

export function MaterialCard({ material }: { material: Material }) {
  return (
    <article className={cn("group flex flex-col border border-ink/15 bg-card p-5 transition-colors hover:border-primary")}>
      <p className="kicker mb-2">{material.tipo}</p>
      <h3 className="font-serif text-lg font-medium leading-snug">
        <TitleLink material={material} />
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{material.descripcion}</p>
      <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-muted-foreground">
        {material.etapas.map((e) => (<span key={e} className="border border-ink/15 px-1.5">{e}</span>))}
        <span className="border border-primary/40 px-1.5 text-primary">{material.idioma}</span>
      </div>
      <div className="mt-auto flex items-center justify-between pt-4">
        <StatusBadge material={material} />
        <CTA material={material} />
      </div>
    </article>
  );
}
