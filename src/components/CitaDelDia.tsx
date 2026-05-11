import { citaDelDia } from "@/lib/citas";

export function CitaDelDia() {
  const c = citaDelDia();
  return (
    <figure className="rule-t rule-b py-12">
      <p className="kicker mb-4">Cita del día</p>
      <blockquote className="font-serif text-3xl font-light leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-5xl">
        <span aria-hidden className="select-none text-primary">«</span>
        {c.texto}
        <span aria-hidden className="select-none text-primary">»</span>
      </blockquote>
      <figcaption className="mt-6 flex items-baseline gap-3">
        {/* Firma manuscrita decorativa */}
        <svg width="120" height="32" viewBox="0 0 120 32" className="text-primary" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
          <path d="M2 22 C 8 6, 16 6, 18 18 S 28 26, 30 14 C 31 8, 38 6, 40 18 C 41 24, 50 26, 56 16 S 70 8, 74 22 C 76 28, 86 24, 92 16 S 110 8, 118 18" />
        </svg>
        <div>
          <p className="font-serif text-base">{c.autora}</p>
          <p className="text-xs text-muted-foreground">{c.rol}</p>
        </div>
      </figcaption>
    </figure>
  );
}
