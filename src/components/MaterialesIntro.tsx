import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Presentation, Printer, Gamepad2, ArrowRight, CalendarDays } from "lucide-react";
import { proximoOnceF, diasHasta } from "@/lib/countdown";

const ATAJOS = [
  {
    icon: Presentation,
    title: "Necesito una presentación",
    desc: "Diapos listas para proyectar mañana mismo.",
    search: { tipo: "Presentaciones" as const },
  },
  {
    icon: Printer,
    title: "Algo para imprimir",
    desc: "Pósters y fichas para vestir el aula.",
    search: { tipo: "Pósters" as const },
  },
  {
    icon: Gamepad2,
    title: "Quiero gamificar la clase",
    desc: "Juegos y kahoots para aprender jugando.",
    search: { tipo: "Juegos" as const },
  },
];

export function MaterialesIntro() {
  const [dias, setDias] = useState<number | null>(null);

  useEffect(() => {
    const target = proximoOnceF();
    setDias(diasHasta(target));
  }, []);

  return (
    <div className="mb-10 space-y-5">
      {/* Banner countdown */}
      <Link
        to="/"
        className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary-soft via-primary-soft/60 to-transparent px-5 py-3.5 transition-all hover:border-primary/40"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <CalendarDays className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              {dias === null ? "Cargando…" : `Faltan ${dias} días para el 11F · 2027`}
            </p>
            <p className="text-xs text-foreground/70">
              Reserva fecha: jueves 11 de febrero. Empieza a preparar tu sesión hoy.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
          Ver guía rápida <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </Link>

      {/* Atajos guiados */}
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-lg font-bold">Empieza aquí</h2>
          <span className="text-xs text-foreground/60">3 atajos rápidos</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {ATAJOS.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.title}
                to="/materiales"
                search={a.search}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-sm font-bold text-foreground">{a.title}</p>
                <p className="text-xs leading-relaxed text-foreground/70">{a.desc}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                  Ver materiales <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
