import { Link } from "@tanstack/react-router";
import { Sparkles, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container mx-auto grid gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="font-display text-base font-bold">11F·Hub</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Recursos abiertos para celebrar el Día Internacional de la Mujer y la Niña en la Ciencia. Filtra, encuentra y descarga al instante.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Navegación</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/materiales" className="hover:text-primary">Hub de materiales</Link></li>
            <li><Link to="/sobre-el-11f" className="hover:text-primary">Sobre el 11F</Link></li>
            <li><Link to="/contacto" className="hover:text-primary">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Fuentes oficiales</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="https://11defebrero.org" target="_blank" rel="noreferrer" className="hover:text-primary">11defebrero.org</a></li>
            <li><a href="https://mujeresconciencia.com" target="_blank" rel="noreferrer" className="hover:text-primary">Mujeres con Ciencia</a></li>
            <li><a href="https://www.cientificascasio.com/recursos" target="_blank" rel="noreferrer" className="hover:text-primary">Científicas CASIO</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} 11F·Hub. Recursos de uso educativo.</p>
          <p className="inline-flex items-center gap-1">
            Hecho con <Heart className="h-3.5 w-3.5 fill-coral text-coral" /> para docentes y curiosas.
          </p>
        </div>
      </div>
    </footer>
  );
}
