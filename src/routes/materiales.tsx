import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Search, X, SlidersHorizontal, Wand2, LayoutGrid, List } from "lucide-react";

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
import { MaterialRow, MaterialCard } from "@/components/MaterialCard";
import { WizardDialog } from "@/components/WizardDialog";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  tipo: z.enum(TIPOS).optional(),
  etapa: z.enum(ETAPAS).optional(),
  disciplina: z.enum(DISCIPLINAS).optional(),
  idioma: z.enum(IDIOMAS).optional(),
  vista: fallback(z.enum(["lista", "mosaico"]), "lista").default("lista"),
});

export const Route = createFileRoute("/materiales")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Materiales · Once·F — Índice editorial del 11F" },
      {
        name: "description",
        content: "Índice de +75 recursos para el 11 de febrero. Filtra por etapa, formato, disciplina o idioma. Cada enlace verificado.",
      },
      { property: "og:title", content: "Índice de materiales · Once·F" },
      { property: "og:description", content: "Búsqueda en vivo, filtros editoriales y descarga directa." },
    ],
  }),
  component: MaterialesPage,
});

const fuse = new Fuse(MATERIALES, {
  keys: ["titulo", "descripcion", "autor", "tipo", "disciplinas"],
  threshold: 0.35,
  ignoreLocation: true,
});

const PLACEHOLDERS = [
  'Buscar "Marie Curie"…',
  'Buscar "matemáticas primaria"…',
  'Buscar "kahoot"…',
  'Buscar "astronomía"…',
  'Buscar "para colorear"…',
];

function MaterialesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/materiales" });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const filtered = useMemo(() => {
    const base = search.q.trim() ? fuse.search(search.q.trim()).map((r) => r.item) : MATERIALES;
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
    navigate({ search: { q: "", vista: search.vista } });
  }

  const filterPanel = (
    <FilterPanel search={search} onChange={update} onClose={() => setMobileOpen(false)} />
  );

  return (
    <>
      {/* Cabecera editorial */}
      <section className="rule-b">
        <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="kicker">Sección 01 · Índice editorial</p>
              <h1 className="mt-3 font-serif text-5xl font-medium leading-none tracking-tight sm:text-6xl">
                Materiales <span className="italic text-muted-foreground">del</span> 11F
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground prose-ed">
                {MATERIALES.length} recursos catalogados. Pulsa <kbd className="num border border-ink/20 px-1.5">/</kbd> para buscar o usa el recomendador.
              </p>
            </div>
            <div className="flex justify-start lg:col-span-4 lg:justify-end">
              <WizardDialog
                trigger={
                  <button className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:bg-primary">
                    <Wand2 className="h-4 w-4" /> Diseñar mi sesión
                  </button>
                }
              />
            </div>
          </div>

          {/* Buscador */}
          <div className="mt-8 flex items-stretch gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={inputRef}
                data-search
                type="search"
                value={search.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder={PLACEHOLDERS[phIdx]}
                className="h-11 w-full border border-ink/20 bg-paper pl-10 pr-3 font-serif text-base outline-none transition-colors focus:border-primary"
              />
            </div>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex h-11 items-center gap-2 border border-ink/20 px-3 text-sm font-medium hover:border-primary lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> Filtros
                  {activeCount > 0 && <span className="num text-primary">({activeCount})</span>}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-sm">
                <SheetHeader><SheetTitle>Filtros de redacción</SheetTitle></SheetHeader>
                <div className="mt-6">{filterPanel}</div>
              </SheetContent>
            </Sheet>
            <div className="hidden border border-ink/20 lg:flex">
              <button
                onClick={() => update({ vista: "lista" })}
                className={cn("inline-flex h-11 w-11 items-center justify-center", search.vista === "lista" ? "bg-ink text-paper" : "hover:text-primary")}
                title="Vista lista"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => update({ vista: "mosaico" })}
                className={cn("inline-flex h-11 w-11 items-center justify-center", search.vista === "mosaico" ? "bg-ink text-paper" : "hover:text-primary")}
                title="Vista mosaico"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-32">{filterPanel}</div>
          </aside>

          <div>
            <div className="rule-b flex flex-wrap items-center justify-between gap-3 pb-3">
              <p className="text-sm">
                <span className="num font-serif text-2xl">{filtered.length}</span>{" "}
                <span className="text-muted-foreground">{filtered.length === 1 ? "material" : "materiales"}</span>
                {activeCount > 0 && <span className="text-muted-foreground"> · {activeCount} {activeCount === 1 ? "filtro" : "filtros"} activo{activeCount === 1 ? "" : "s"}</span>}
              </p>
              {activeCount > 0 && (
                <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  <X className="h-3 w-3" /> Limpiar
                </button>
              )}
            </div>

            {/* Chips activos */}
            {activeCount > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(["tipo", "etapa", "disciplina", "idioma"] as const).map((k) => {
                  const v = search[k];
                  if (!v) return null;
                  return (
                    <button key={k} onClick={() => update({ [k]: undefined } as Partial<typeof search>)}
                      className="inline-flex items-center gap-1 border border-primary/40 bg-primary-soft px-2 py-1 text-xs text-primary">
                      {v} <X className="h-3 w-3" />
                    </button>
                  );
                })}
                {search.q && (
                  <button onClick={() => update({ q: "" })} className="inline-flex items-center gap-1 border border-primary/40 bg-primary-soft px-2 py-1 text-xs text-primary">
                    "{search.q}" <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : search.vista === "mosaico" ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((m) => <MaterialCard key={m.id} material={m} />)}
              </div>
            ) : (
              <ol className="mt-2">
                {filtered.map((m, i) => <MaterialRow key={m.id} material={m} index={i + 1} />)}
              </ol>
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
  vista: "lista" | "mosaico";
};

function FilterPanel({ search, onChange, onClose }: {
  search: Search;
  onChange: (patch: Partial<Search>) => void;
  onClose?: () => void;
}) {
  return (
    <div className="space-y-7">
      <FilterGroup label="Etapa" options={ETAPAS} value={search.etapa}
        onSelect={(v) => { onChange({ etapa: v }); onClose?.(); }} />
      <FilterGroup label="Formato" options={TIPOS} value={search.tipo}
        onSelect={(v) => { onChange({ tipo: v }); onClose?.(); }} />
      <FilterGroup label="Disciplina" options={DISCIPLINAS} value={search.disciplina}
        onSelect={(v) => { onChange({ disciplina: v }); onClose?.(); }} />
      <FilterGroup label="Idioma" options={IDIOMAS} value={search.idioma}
        onSelect={(v) => { onChange({ idioma: v }); onClose?.(); }} />
    </div>
  );
}

function FilterGroup<T extends string>({ label, options, value, onSelect }: {
  label: string;
  options: readonly T[];
  value: T | undefined;
  onSelect: (v: T | undefined) => void;
}) {
  return (
    <div>
      <p className="kicker mb-2.5">{label}</p>
      <ul className="space-y-1">
        <li>
          <button onClick={() => onSelect(undefined)} className={cn("w-full text-left text-sm", !value ? "text-primary underline-hand" : "hover:text-primary")}>
            Todos
          </button>
        </li>
        {options.map((o) => (
          <li key={o}>
            <button onClick={() => onSelect(value === o ? undefined : o)}
              className={cn("w-full text-left text-sm", value === o ? "text-primary underline-hand" : "text-foreground hover:text-primary")}>
              {o}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-8 rule-t rule-b py-16 text-center">
      <p className="kicker">Sin resultados</p>
      <h3 className="mt-3 font-serif text-3xl font-medium">Nada coincide con esa búsqueda.</h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Prueba a quitar algún filtro, simplificar la palabra clave o lánzate al recomendador.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <button onClick={onClear} className="bg-ink px-4 py-2 text-sm font-medium text-paper">Limpiar filtros</button>
        <Link to="/" className="border border-ink/20 px-4 py-2 text-sm font-medium hover:border-primary">Volver al inicio</Link>
      </div>
    </div>
  );
}
