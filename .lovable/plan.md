## Plan: Catálogo definitivo + rediseño editorial-científico

He parseado el Excel `Lista_de_Materiales_11F_en_la_web-2.xlsx` (Hoja 1, ~96 filas útiles). Cada fila trae: TIPO, Material, Enlace Drive, Enlace fuente oficial / 11F, Funciona? (SI / NO / Otro), notas y rango de edad. Esa es la fuente de verdad.

### 1. Reescribir `src/data/materiales.ts` desde el Excel

- Generar el array `MATERIALES` 1:1 con las filas del Excel (mantener orden y secciones: Pósters Científicas CASIO, Actividades CASIO, Kahoot CASIO, #NoMoreMatildas, Juego de cartas Canarias, Oceánicas, Presentaciones Primaria/Infantil/Básica/Estadísticas/Microbiólogas/Referentes/Pioneras Arquitectura/Astronomía/Física-Química/Matemáticas/Nobel Química 2020, Ilustraciones (Rosalind Franklin, WOMEN IN STEM, Elise Gravel, Jocelyn Bell, Noethember, InspiraSTEAM, THINK LIKE A GIRL, Hernández, Mary Anning, La ciencia también es nuestra, SaliArtworks, Beatriz Arribas, Mujer Bombilla, Isabel Ruiz, Anna Medina), Materiales Singulares (Marcapáginas, Cientificartas, De niña a científica, Loquita por sus huesos, Rompecabezas, Juego de cartas, ¿Quién es ella?, Sopa de letras, Adivina quién soy, Mujeres 11F Dolores Bueno, Babelbox, Rosco, Mini gymkana, Scratch x2, Las Invisibles, Exposición posters, Con A de AstrónomA, Elise Gravel poster, Investigadoras en la Luz, Astrónomas, Calendari URV, Física nuclear UB, Mujeres Invisibles, STEM Role Model, vídeos varios, podcasts, Naukas, Mujeres en la historia, Bioquímica, Oxford, scientificwomen, Doodles, Sellos, Los 3 Chanchitos, Huellas, Minibiografías, Dossier Zaragoza, Secundando la Igualdad, CCOO matemáticas, Ed. matemática feminista, Calendari Temps de dones, Adivina aventurera, Blog clase de ciencias, Crucigrama aeronáutico, Bebé a Mordor, Directorio WomenInTech, La Científica y el guisante, Tabla periódica, papel plegado, Marie Curie Pepitas, CSIC Detectives).
- Para cada fila:
  - `enlace` = primer enlace válido (Drive si existe, si no fuente oficial 11F, si no `null`).
  - `enlaceFuente` = enlace 11defebrero.org cuando exista (segunda columna).
  - `funciona`: `"si" | "no" | "parcial"` mapeado de SI / NO / Otro.
  - `notaEnlace`: comentario del Excel cuando funciona = `"parcial"` (p.ej. "Calendario de 2013", "el enlace no es el correcto", etc.).
  - `etapas`: derivar de TIPO y "Rango de edad" (Infantil, Primaria, ESO, Bachillerato; eliminar Adultos como ya quedó pactado).
  - `disciplinas`: inferir del título (Astronomía → Astronomía; Matemáticas → Matemáticas; etc.).
  - `tipo` normalizado a la lista `TIPOS` (Presentaciones, Ilustraciones, Juegos, Pósters, Vídeos, Podcast, Webs, Cómics, Exposiciones, Calendarios, Libros, Pegatinas, Fichas, Kahoot).
- Añadir `verificado: boolean` y `enlaceVerificadoEn: string`.
- Excluir filas sin material real (la fila 38 sólo es comentario, fila 7 es cabecera "ADALT SÓN NOUS"). Filas sin enlace útil se conservan con `enlace: null` y badge gris "Sin enlace público".

### 2. Auditoría HTTP de enlaces

- Script `scripts/audit-links.mjs`:
  - HEAD → si 405/403, GET; sigue redirecciones; timeout 10 s.
  - Marca `verificado: true` si `2xx`/`3xx→2xx`.
  - Marca `funciona: "no"` con `notaEnlace: "404 / sin respuesta"` si `4xx`/`5xx`/timeout. No sobrescribe entradas ya marcadas como NO en el Excel.
  - Excluye dominios que bloquean bots de auditoría (drive.google.com, docs.google.com → marca `verificado: true` por confianza del Excel).
  - Genera `scripts/audit-report.json` y aplica los cambios a `src/data/materiales.ts` automáticamente (regeneración del archivo).
- Output en consola: tabla `OK / ROTO / OMITIDO`.

### 3. Rediseño editorial-científico (aprobado)

- Tipografía: Fraunces (serif variable) para titulares, Inter Tight para cuerpo (Google Fonts en `__root.tsx`).
- Tokens en `src/styles.css`: papel crema `--paper`, tinta `--ink`, turquesa `--accent` (#00B4BC) reservado para subrayados/citas, coral `--coral` para badge "novedad".
- Hero asimétrico con kicker "Nº 11 · Febrero", sumario lateral, subrayado SVG dibujado a mano, números de sección en serif, footer con colofón.
- `/materiales`: vista índice editorial (número, título serif, badges minimalistas, CTA único) + toggle a vista mosaico. Sidebar "Filtros de redacción" con chips activos y placeholder rotativo en el buscador. Empty state ilustrado.
- Sello "Verificado" para enlaces auditados; badge gris "Sin enlace público" cuando `enlace == null`; badge ámbar "Enlace parcial" con tooltip de la nota cuando `funciona = "parcial"`.

### 4. Recomendador "Diseña tu sesión del 11F" (ambas modalidades)

- Wizard conversacional 3 pasos (contexto → intención → formato) que termina mostrando una **sesión didáctica completa**: calentamiento → actividad central → cierre, combinando hasta 3 materiales del catálogo verificados.
- Scoring determinista cliente: peso alto a `etapa`, medio a `disciplina` y `tipo`, ajuste por duración estimada.
- Botones: copiar al portapapeles, imprimir (CSS print), enlace serializable en `?sesion=...`. Persistencia en localStorage.

### 5. Sorpresas

- Cita del día (rotación diaria de científicas con firma SVG manuscrita).
- Cuenta atrás al 11F · 2027.
- Modo papel cuadriculado conmutable.

### 6. Detalles técnicos

- Ningún cambio de stack. Sólo frontend + datos.
- Componentes nuevos: `IndiceEditorial`, `MaterialEntry`, `SesionRecomendada`, `WizardSesion`, `CitaDelDia`, `CountdownColofon`, `KeyboardShortcuts`.
- Utilidades: `recomendarSesion(input): SesionRecomendada` en `src/lib/recomendador.ts`.
- Test rápido manual del audit script antes de aplicar al data file.

### Pregunta única antes de implementar

Confirma si quieres que durante la auditoría aplique el resultado **directamente** sobre `src/data/materiales.ts` (sobrescribir `funciona`/`verificado`) o que **sólo genere el reporte** y tú decidas qué desactivar. Por defecto aplicaría directamente y dejaría la nota con la razón.