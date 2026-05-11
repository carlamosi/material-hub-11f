export type Cita = { texto: string; autora: string; rol: string };

export const CITAS: Cita[] = [
  {
    texto: "Nada en la vida debe ser temido, solamente comprendido. Ahora es momento de comprender más, para temer menos.",
    autora: "Marie Curie",
    rol: "Física y química, 1867–1934",
  },
  {
    texto: "Dejé de pedir permiso. Las niñas necesitan ver mujeres que decidan por sí mismas.",
    autora: "Margarita Salas",
    rol: "Bioquímica, 1938–2019",
  },
  {
    texto: "El universo no está obligado a tener sentido para ti. Pero puedes preguntarle.",
    autora: "Vera Rubin",
    rol: "Astrónoma, 1928–2016",
  },
  {
    texto: "Si supieras lo emocionante que es descubrir algo que nadie sabía antes, lo entenderías todo.",
    autora: "Jocelyn Bell Burnell",
    rol: "Astrofísica, n. 1943",
  },
  {
    texto: "Lo que importa es lo que aprendes después de saberlo todo.",
    autora: "Hedy Lamarr",
    rol: "Inventora, 1914–2000",
  },
  {
    texto: "Lo bonito de aprender es que nadie puede arrebatártelo.",
    autora: "Ada Yonath",
    rol: "Cristalógrafa, n. 1939",
  },
  {
    texto: "Soy lo que soy gracias a las que vinieron antes y a las que vendrán después.",
    autora: "Mae Jemison",
    rol: "Astronauta y médica, n. 1956",
  },
  {
    texto: "La ciencia no conoce país, porque el conocimiento pertenece a la humanidad.",
    autora: "Rita Levi-Montalcini",
    rol: "Neuróloga, 1909–2012",
  },
  {
    texto: "Si no podemos contarlo, no podemos cambiarlo.",
    autora: "Katherine Johnson",
    rol: "Matemática, 1918–2020",
  },
  {
    texto: "Mira las estrellas, no a tus pies. Intenta dar sentido a lo que ves.",
    autora: "—atribuida a la tradición divulgativa",
    rol: "para empezar el día",
  },
];

export function citaDelDia(now: Date = new Date()): Cita {
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const day = Math.floor(diff / 86400000);
  return CITAS[day % CITAS.length];
}
