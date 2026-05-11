import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { proximoOnceF, diasHasta } from "@/lib/countdown";

type NavItem = { to: "/" | "/materiales" | "/sobre-el-11f" | "/contacto"; label: string; num: string; exact?: boolean };
const NAV: readonly NavItem[] = [
  { to: "/", label: "Portada", num: "00", exact: true },
  { to: "/materiales", label: "Materiales", num: "01" },
  { to: "/sobre-el-11f", label: "Sobre el 11F", num: "02" },
  { to: "/contacto", label: "Contacto", num: "03" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dias, setDias] = useState<number | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setDias(diasHasta(proximoOnceF()));
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur">
      {/* Cintilla editorial */}
      <div className="rule-b">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-1.5 text-[11px] sm:px-6 lg:px-8">
          <span className="kicker !text-[10px]">Nº 11 · Edición 2027</span>
          {dias !== null && dias > 0 && (
            <span className="num text-muted-foreground">
              <span className="hidden sm:inline">Faltan </span>
              <span className="font-serif italic text-ink">{dias}</span>
              <span> {dias === 1 ? "día" : "días"} para el 11F</span>
            </span>
          )}
          {dias === 0 && <span className="text-primary">Hoy es 11F · Día de la Mujer y la Niña en la Ciencia</span>}
        </div>
      </div>

      <div className="rule-double-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-serif text-2xl font-medium tracking-tight">
              Once<span className="text-primary">·</span>F
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              · Materiales para el aula
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "group flex items-baseline gap-1.5 px-3 py-2 text-sm transition-colors",
                    active ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                >
                  <span className="num text-[10px] text-muted-foreground">{item.num}</span>
                  <span className={cn("font-medium", active && "underline-hand")}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            className="grid h-10 w-10 place-items-center md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="rule-b bg-paper md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-2 rule-b py-3 text-base font-medium last:border-b-0"
              >
                <span className="num text-[10px] text-muted-foreground">{item.num}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
