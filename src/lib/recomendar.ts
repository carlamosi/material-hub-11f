import { MATERIALES, type Etapa, type Disciplina, type Material, type Tipo } from "@/data/materiales";

export type Intencion = "inspirar" | "investigar" | "crear" | "debatir" | "celebrar";
export type Formato = "visual" | "manipulativo" | "audiovisual" | "ludico";
export type Duracion = 20 | 45 | 90;

export interface Contexto {
  etapa: Etapa;
  disciplina?: Disciplina;
  duracion: Duracion;
  idioma?: "Castellano" | "Català" | "Inglés" | "Multilingüe";
  intenciones: Intencion[];
  formatos: Formato[];
}

const TIEMPO_TIPO: Record<Tipo, number> = {
  Vídeos: 6,
  Pósters: 5,
  Pegatinas: 5,
  Ilustraciones: 8,
  Cómics: 12,
  Calendarios: 5,
  Fichas: 30,
  Presentaciones: 35,
  Juegos: 25,
  Kahoot: 15,
  Libros: 30,
  Exposiciones: 40,
  Webs: 20,
  Podcast: 25,
};

const TIPO_FORMATO: Record<Tipo, Formato[]> = {
  Vídeos: ["audiovisual"],
  Podcast: ["audiovisual"],
  Pósters: ["visual"],
  Ilustraciones: ["visual", "manipulativo"],
  Cómics: ["visual"],
  Pegatinas: ["visual", "manipulativo"],
  Calendarios: ["visual"],
  Fichas: ["manipulativo"],
  Juegos: ["ludico", "manipulativo"],
  Kahoot: ["ludico"],
  Presentaciones: ["visual"],
  Libros: ["visual"],
  Exposiciones: ["visual"],
  Webs: ["visual"],
};

const TIPO_INTENCION: Record<Tipo, Intencion[]> = {
  Vídeos: ["inspirar", "celebrar"],
  Podcast: ["inspirar", "investigar"],
  Pósters: ["celebrar", "inspirar"],
  Ilustraciones: ["crear", "celebrar"],
  Cómics: ["inspirar"],
  Pegatinas: ["celebrar", "crear"],
  Calendarios: ["celebrar"],
  Fichas: ["investigar", "crear"],
  Juegos: ["debatir", "celebrar", "crear"],
  Kahoot: ["debatir", "celebrar"],
  Presentaciones: ["investigar", "inspirar"],
  Libros: ["investigar"],
  Exposiciones: ["celebrar", "inspirar"],
  Webs: ["investigar"],
};

function score(m: Material, ctx: Contexto): number {
  let s = 0;
  if (m.etapas.includes(ctx.etapa)) s += 8;
  if (ctx.disciplina && m.disciplinas.includes(ctx.disciplina)) s += 4;
  if (ctx.disciplina && m.disciplinas.includes("General")) s += 1;
  if (ctx.idioma && m.idioma === ctx.idioma) s += 2;
  if (ctx.formatos.length === 0 || TIPO_FORMATO[m.tipo].some((f) => ctx.formatos.includes(f))) s += 3;
  if (ctx.intenciones.length === 0 || TIPO_INTENCION[m.tipo].some((i) => ctx.intenciones.includes(i))) s += 3;
  if (!m.enlace) s -= 6;
  if (m.funciona === "no") s -= 8;
  if (m.funciona === "parcial") s -= 2;
  if (m.verificado) s += 2;
  return s;
}

export interface Bloque {
  fase: "Calentamiento" | "Actividad central" | "Cierre";
  descripcion: string;
  duracion: number;
  material: Material | null;
}

export function recomendarSesion(ctx: Contexto): Bloque[] {
  const candidatos = MATERIALES
    .filter((m) => m.etapas.includes(ctx.etapa) && m.funciona !== "no" && m.enlace)
    .map((m) => ({ m, s: score(m, ctx) }))
    .sort((a, b) => b.s - a.s);

  const presupuesto = ctx.duracion;
  const dCal = Math.max(5, Math.round(presupuesto * 0.18));
  const dCierre = Math.max(5, Math.round(presupuesto * 0.22));
  const dMain = Math.max(10, presupuesto - dCal - dCierre);

  const tiposCorto: Tipo[] = ["Vídeos", "Pósters", "Pegatinas", "Calendarios", "Ilustraciones"];
  const tiposCierre: Tipo[] = ["Juegos", "Kahoot", "Fichas", "Pegatinas"];
  const tiposCentral: Tipo[] = ["Presentaciones", "Fichas", "Cómics", "Libros", "Webs", "Juegos", "Exposiciones", "Podcast"];

  const usados = new Set<string>();
  const pick = (filtro: (m: Material) => boolean): Material | null => {
    for (const c of candidatos) if (!usados.has(c.m.id) && filtro(c.m)) { usados.add(c.m.id); return c.m; }
    return null;
  };

  const calentamiento = pick((m) => tiposCorto.includes(m.tipo));
  const central = pick((m) => tiposCentral.includes(m.tipo)) ?? pick(() => true);
  const cierre = pick((m) => tiposCierre.includes(m.tipo)) ?? pick(() => true);

  return [
    { fase: "Calentamiento", descripcion: "Encender la curiosidad del grupo con un disparador breve.", duracion: dCal, material: calentamiento },
    { fase: "Actividad central", descripcion: "Investigar, descubrir y debatir con un material de fondo.", duracion: dMain, material: central },
    { fase: "Cierre", descripcion: "Consolidar lo aprendido con una dinámica activa.", duracion: dCierre, material: cierre },
  ];
}

export function sesionATexto(bloques: Bloque[], ctx: Contexto): string {
  const fmtFecha = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
  const lines: string[] = [];
  lines.push(`SESIÓN 11F — ${ctx.etapa}${ctx.disciplina ? " · " + ctx.disciplina : ""}`);
  lines.push(`Duración total: ${ctx.duracion} min · Generada el ${fmtFecha}`);
  lines.push("");
  for (const b of bloques) {
    lines.push(`▸ ${b.fase.toUpperCase()} (${b.duracion} min)`);
    lines.push(`  ${b.descripcion}`);
    if (b.material) {
      lines.push(`  • ${b.material.titulo} [${b.material.tipo}]`);
      lines.push(`    ${b.material.enlace}`);
    } else {
      lines.push(`  • (Sin material asignado)`);
    }
    lines.push("");
  }
  lines.push("Generado en 11F·Hub");
  return lines.join("\n");
}
