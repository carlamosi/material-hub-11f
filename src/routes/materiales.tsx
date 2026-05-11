import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search, X, SlidersHorizontal, Wand2, ArrowRight, LayoutGrid, List } from "lucide-react";

import {
  MATERIALES,
  TIPOS,
  ETAPAS,
  DISCIPLINAS,
  IDIOMAS,
  type Tipo,
  type Etapa,
  type Disciplina,
  type Idioma,
} from "@/data/materiales";
import { MaterialCard } from "@/components/MaterialCard";
import { MaterialRow } from "@/components/MaterialRow";
import { MaterialesIntro } from "@/components/MaterialesIntro";
import { WizardDialog } from "@/components/WizardDialog";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  tipo: z.enum(TIPOS).optional(),
  etapa: z.enum(ETAPAS).optional(),
  disciplina: z.enum(DISCIPLINAS).optional(),
  idioma: z.enum(IDIOMAS).optional(),
  vista: fallback(z.enum(["grid", "lista"]), "grid").default("grid"),
});

export const Route = createFileRoute("/materiales")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Materiales 11F · Hub con filtros, búsqueda y descarga directa" },
      {
        name: "description",
        content:
          "+60 recursos educativos para el 11 de febrero. Filtra por etapa, tipo, disciplina o idioma y descarga al instante.",
      },
      { property: "og:title", content: "Hub de materiales 11F" },
      {
        property: "og:description",
        content: "Presentaciones, vídeos, juegos, ilustraciones y más. Todo filtrable, todo a un clic.",
      },
    ],
  }),
  component: MaterialesPage,
});

const fuse = new Fuse(MATERIALES, {
  keys: ["titulo", "descripcion", "autor", "tipo", "disciplinas"],
  threshold: 0.35,
  ignoreLocation: true,
});

function MaterialesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/materiales" });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const filtered = useMemo(() => {
    const base = search.q.trim()
      ? fuse.search(search.q.trim()).map((r) => r.item)
      : MATERIALES;
    return base.filter(
      (m) =>
        (!search.tipo || m.tipo === search.tipo) &&
        (!search.etapa || m.etapas.includes(search.etapa)) &&
        (!search.disciplina || m.disciplinas.includes(search.disciplina)) &&
        (!search.idioma || m.idioma === search.idioma),
    );
  }, [search]);

  const activeCount = [search.tipo, search.etapa, search.disciplina, search.idioma].filter(Boolean).length + (search.q ? 1 : 0);

  function clearAll() {
    navigate({ search: { q: "", tipo: undefined, etapa: undefined, disciplina: undefined, idioma: undefined } });
  }

  const filterPanel = (
    <FilterPanel
      search={search}
      onChange={update}
      onClose={() => setMobileFiltersOpen(false)}
    />
  );

  return (
    <>
      {/* Hero del hub */}
      <section className="border-b border-border bg-gradient-hero">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl font-black sm:text-4xl lg:text-5xl">
                Hub de materiales
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Filtra por etapa, tipo, disciplina o idioma. Cada card descarga directo.
              </p>
            </div>
            <WizardDialog
              trigger={
                <button className="inline-flex w-fit items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg hover:opacity-90">
                  <Wand2 className="h-4 w-4" /> Recomendador guiado <ArrowRight className="h-4 w-4" />
                </button>
              }
            />
          </div>

          {/* Search bar */}
          <div className="mt-8 flex items-center gap-3">
            <div className="relative flex-1">
              <label htmlFor="materiales-search" className="sr-only">Buscar materiales</label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                id="materiales-search"
                data-search
                type="search"
                value={search.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder='Busca por nombre, disciplina o personaje…  ( / )'
                className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm shadow-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold shadow-sm hover:border-primary lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> Filtros
                  {activeCount > 0 && (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                      {activeCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">{filterPanel}</div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-sm">
              {filterPanel}
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> {filtered.length === 1 ? "material" : "materiales"} encontrados
                {activeCount > 0 && <span> · {activeCount} {activeCount === 1 ? "filtro activo" : "filtros activos"}</span>}
              </p>
              <div className="flex items-center gap-2">
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden /> Limpiar filtros
                  </button>
                )}
                <div
                  role="group"
                  aria-label="Cambiar vista"
                  className="inline-flex items-center rounded-lg border border-border bg-card p-0.5"
                >
                  <button
                    type="button"
                    aria-pressed={search.vista === "grid"}
                    aria-label="Vista en cuadrícula"
                    onClick={() => update({ vista: "grid" })}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      search.vista === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" aria-hidden /> Grid
                  </button>
                  <button
                    type="button"
                    aria-pressed={search.vista === "lista"}
                    aria-label="Vista en lista compacta"
                    onClick={() => update({ vista: "lista" })}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      search.vista === "lista" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <List className="h-3.5 w-3.5" aria-hidden /> Lista
                  </button>
                </div>
              </div>
            </div>

            {/* Active chips */}
            {activeCount > 0 && (
              <div className="mb-5 flex flex-wrap gap-2" role="region" aria-label="Filtros activos">
                {(["tipo", "etapa", "disciplina", "idioma"] as const).map((k) => {
                  const v = search[k];
                  if (!v) return null;
                  return (
                    <button
                      key={k}
                      onClick={() => update({ [k]: undefined } as Partial<typeof search>)}
                      aria-label={`Quitar filtro ${k}: ${v}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {v} <X className="h-3 w-3" aria-hidden />
                    </button>
                  );
                })}
                {search.q && (
                  <button
                    onClick={() => update({ q: "" })}
                    aria-label={`Quitar búsqueda: ${search.q}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    "{search.q}" <X className="h-3 w-3" aria-hidden />
                  </button>
                )}
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : search.vista === "lista" ? (
              <div className="flex flex-col gap-2.5" role="list" aria-label={`${filtered.length} materiales`}>
                {filtered.map((m) => (
                  <div role="listitem" key={m.id}>
                    <MaterialRow material={m} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" role="list" aria-label={`${filtered.length} materiales`}>
                {filtered.map((m) => (
                  <div role="listitem" key={m.id}>
                    <MaterialCard material={m} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

type Search = {
  q: string;
  tipo?: Tipo;
  etapa?: Etapa;
  disciplina?: Disciplina;
  idioma?: Idioma;
};

function FilterPanel({
  search,
  onChange,
  onClose,
}: {
  search: Search;
  onChange: (patch: Partial<Search>) => void;
  onClose?: () => void;
}) {
  return (
    <div className="space-y-6">
      <FilterGroup
        label="Etapa educativa"
        options={ETAPAS}
        value={search.etapa}
        onSelect={(v) => {
          onChange({ etapa: v });
          onClose?.();
        }}
      />
      <FilterGroup
        label="Tipo de recurso"
        options={TIPOS}
        value={search.tipo}
        onSelect={(v) => {
          onChange({ tipo: v });
          onClose?.();
        }}
      />
      <FilterGroup
        label="Disciplina"
        options={DISCIPLINAS}
        value={search.disciplina}
        onSelect={(v) => {
          onChange({ disciplina: v });
          onClose?.();
        }}
      />
      <FilterGroup
        label="Idioma"
        options={IDIOMAS}
        value={search.idioma}
        onSelect={(v) => {
          onChange({ idioma: v });
          onClose?.();
        }}
      />
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: readonly T[];
  value: T | undefined;
  onSelect: (v: T | undefined) => void;
}) {
  const groupId = `filter-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <h3 id={groupId} className="mb-2.5 text-xs font-bold uppercase tracking-wider text-foreground/70">
        {label}
      </h3>
      <div role="group" aria-labelledby={groupId} className="flex flex-wrap gap-1.5">
        <button
          type="button"
          aria-pressed={!value}
          onClick={() => onSelect(undefined)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
            !value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-foreground/80 hover:bg-accent hover:text-foreground",
          )}
        >
          Todos
        </button>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onSelect(o)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
              value === o
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-foreground/80 hover:bg-accent hover:text-foreground",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-border bg-muted/30 p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-2xl">
        🔍
      </div>
      <h3 className="mt-4 font-display text-xl font-bold">Sin resultados</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Prueba a quitar algún filtro o usar otra palabra clave. También puedes usar el recomendador.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={onClear}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
        >
          Limpiar filtros
        </button>
        <Link
          to="/"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
