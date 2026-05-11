## Objetivo

Convertir el hub del 11F en una pieza con carácter editorial-científico (lejos del look "IA genérica"), con datos verificados y un recomendador que pase de wizard a generador de sesión didáctica.

---

## 1. Limpieza de datos

- **Eliminar la etapa "Adultos"** del tipo `Etapa`, de los filtros y de cada material que la incluya (sustituir `all` por `["Infantil","Primaria","ESO","Bachillerato"]`).
- **Reabrir el Excel original** (te pediré que lo re-subas al implementar) y, en paralelo, lanzar una **auditoría HTTP** con script Node sobre los ~76 enlaces actuales:
  - 200 → enlace válido, se mantiene.
  - 3xx → seguir redirección y actualizar al destino final.
  - 404/timeout → marcar `enlace: null` y mostrar el material como "enlace no disponible" (sin botón de descarga, badge gris).
- Reconciliar URLs: para cada fila del Excel, comparar con `materiales.ts` y reemplazar la URL si difiere. Materiales que no estén en el Excel quedan marcados `fuente: "curado"`.

## 2. Dirección visual: "Editorial científico"

Inspiración: revistas tipo *Nautilus*, *Scientific American*, cuadernos de Marie Curie.

**Tipografía** (Google Fonts, dos familias):

- Titulares: **Fraunces** (serif con carácter, opsz variable) en pesos 400/600, con `font-optical-sizing: auto`.
- Cuerpo y UI: **Inter Tight** 400/500.
- Detalles editoriales: números en versalitas, kicker en mayúsculas tracking ancho.

**Retícula**:

- Hero asimétrico tipo portada de revista: bloque de texto a la izquierda con kicker "Nº 11 · Febrero", titular serif gigante con un tachado/subrayado a mano sobre la palabra clave, columna lateral con "Sumario" estilo índice de revista linkando a las secciones.
- Listados con líneas finas separadoras (`border-b border-foreground/10`), no cards con sombras.
- Mucho espacio en blanco; columnas de texto con `max-width: 65ch`.

**Paleta** (manteniendo `#00B4BC`):

- Fondo papel: `oklch(0.985 0.005 90)` (crema sutil).
- Tinta: `oklch(0.18 0.02 220)` (casi negro azulado).
- Acento turquesa (#00B4BC) reservado a subrayados, números, hover y un sello tipo "imprimatur".
- Acento secundario coral muy puntual para badges de novedad.

**Detalles que humanizan**:

- Subrayados SVG dibujados a mano en titulares clave.
- Pequeñas marcas de anotación (asteriscos, llaves, flechas) en SVG inline al margen.
- Números de sección estilo revista: "01 — MATERIALES", "02 — RECOMENDADOR".
- Footer con colofón tipo editorial (créditos, tirada, fecha).
- Microinteracciones: hover de tarjetas con desplazamiento de 2px y aparición de una flecha "→ leer".
- Cero degradados violáceos genéricos, cero glassmorphism.

## 3. Página `/materiales` (rediseño)

- Reemplazar tarjetas actuales por **listado tipo índice editorial**: cada material es una fila con número, título serif, descripción breve, badges minimalistas (etapa · tipo · idioma) y un único CTA `Abrir ↗`.
- Vista alternativa "mosaico" para quien prefiera retícula (toggle discreto).
- Sidebar de filtros como **"Filtros de redacción"** con chips activos arriba y conteo en vivo.
- Buscador con placeholder rotativo ("Buscar Marie Curie…", "Buscar pósters de primaria…").
- Empty state ilustrado a línea (no genérico).

## 4. Recomendador → "Diseña tu sesión del 11F"

Sustituye el `WizardDialog` actual por una experiencia de 3 pasos + resultado:

**Paso 1 — Contexto**: etapa educativa, asignatura, tiempo disponible (20/45/90 min), idioma.
**Paso 2 — Intención**: chips múltiples ("inspirar", "investigar", "crear", "debatir", "celebrar").
**Paso 3 — Formato preferido**: visual, manipulativo, audiovisual, lúdico.

**Resultado — Secuencia didáctica generada**:

- Calentamiento (5–10 min): un material corto (vídeo/póster).
- Actividad central (20–60 min): material principal coherente con intención.
- Cierre (5–15 min): juego, kahoot o ficha de reflexión.
- Cada bloque con su material, duración estimada y un campo de notas editable.
- Acciones: **copiar al portapapeles** (texto plano formateado para enviar a claustro), **imprimir** (CSS print con cabecera "Sesión 11F · [fecha]"), **enlace permanente** (estado serializado en query params, sin backend).

Algoritmo: scoring sencillo en cliente que pondera coincidencia de etapa (peso alto), disciplina, tipo preferido y duración estimada por tipo de material (constante por `Tipo`). Sin IA, determinista.

## 5. Sorpresas (los detalles que rompen el "look IA")

- **"Cita del día"**: al cargar la home, una cita rotativa de una científica (Curie, Mayer, Ride, Yonath…) en una banda tipográfica grande con su firma manuscrita en SVG.
- **Modo "papel cuadriculado"** opcional: toggle en el footer que activa un fondo de retícula 4mm sutil tipo cuaderno.
- **Cuenta atrás al 11F** discreta en el header ("Faltan 23 días para el 11F") que desaparece tras la fecha. Recuerda q seria el 11f de 2027
- **Sello "verificado"** en cada material cuyo enlace ha pasado la auditoría HTTP, con tooltip "Comprobado el [fecha]".
- &nbsp;

## 6. Detalles técnicos

- Quitar `Adultos` del enum `ETAPAS` y depurar materiales (script de migración o edición manual de `materiales.ts`).
- Añadir campo `verificado: boolean` y `enlaceVerificadoEn: string` a `Material`.
- Script `scripts/audit-links.mjs` (Node, `fetch` con timeout 8s, HEAD con fallback a GET) que reescribe `materiales.ts` con el campo `verificado`.
- Tipografías con `<link rel="preconnect">` a Google Fonts en `__root.tsx`.
- Recomendador: nuevo componente `<SesionRecomendada>` + utilidad `recomendarSesion(input): Bloque[]` testeable.
- CSS de impresión en `styles.css` (`@media print`).
- Persistencia de modo papel y atajos en `localStorage`.

## 7. Necesito de ti antes de implementar

- **Re-subir el Excel** (`11F_materiales.xlsx` o equivalente) para reconciliar enlaces fila a fila.

Cuando tenga el Excel, ejecuto auditoría + reconciliación, depuro "Adultos", aplico el rediseño editorial y el nuevo recomendador en una sola tanda.