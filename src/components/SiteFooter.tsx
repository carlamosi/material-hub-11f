import { Link } from "@tanstack/react-router";
import { Grid2x2, Keyboard } from "lucide-react";
import { usePaperMode } from "@/hooks/use-paper-mode";

export function SiteFooter() {
  const { on, toggle } = usePaperMode();

  return (
    <footer className="rule-t mt-24 bg-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Colofón */}
        <div className="grid gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">Colofón</p>
            <p className="mt-3 font-serif text-2xl leading-snug">
              <span className="underline-hand">Once·F</span> es un hub editorial de materiales abiertos para celebrar el <span className="italic">Día Internacional de la Mujer y la Niña en la Ciencia</span> en cualquier aula.
            </p>
            <p className="mt-4 text-sm text-muted-foreground prose-ed">
              Curado a partir de fuentes oficiales (11defebrero.org, Mujeres con Ciencia, CASIO Educación, IEO, CSIC y muchas docentes anónimas). Cada enlace verificado por HTTP.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="kicker">Sumario</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link to="/" className="link-ed">00 · Portada</Link></li>
              <li><Link to="/materiales" className="link-ed">01 · Materiales</Link></li>
              <li><Link to="/sobre-el-11f" className="link-ed">02 · Sobre el 11F</Link></li>
              <li><Link to="/contacto" className="link-ed">03 · Contacto</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="kicker">Fuentes</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><a href="https://11defebrero.org" target="_blank" rel="noreferrer" className="link-ed">11defebrero.org</a></li>
              <li><a href="https://mujeresconciencia.com" target="_blank" rel="noreferrer" className="link-ed">Mujeres con Ciencia</a></li>
              <li><a href="https://www.cientificascasio.com/recursos" target="_blank" rel="noreferrer" className="link-ed">Científicas CASIO</a></li>
              <li><a href="https://oceanicas.ieo.es" target="_blank" rel="noreferrer" className="link-ed">Oceánicas (IEO)</a></li>
            </ul>
          </div>
        </div>

        {/* Cintilla inferior */}
        <div className="rule-t flex flex-col items-start justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p className="num">© {new Date().getFullYear()} Once·F · Recursos abiertos · Tirada digital ilimitada</p>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-1.5 border border-ink/15 px-2.5 py-1.5 hover:border-primary hover:text-primary"
              aria-pressed={on}
              title="Activar fondo cuadriculado"
            >
              <Grid2x2 className="h-3.5 w-3.5" /> Modo papel {on ? "ON" : "OFF"}
            </button>
            <span className="hidden items-center gap-1 text-muted-foreground sm:inline-flex">
              <Keyboard className="h-3.5 w-3.5" />
              <span className="num">/</span> buscar · <span className="num">r</span> recomendador · <span className="num">g m</span> materiales
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
