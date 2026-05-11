# Hub de materiales 11F — Día Internacional de la Mujer y la Niña en la Ciencia

Una sola web, en castellano, color identitario `#00B4BC`, donde docentes y curiosos encuentran cualquier material en menos de 10 segundos. Sustituye la actual maraña de subpáginas por un hub único con filtros, buscador y wizard.

## Arquitectura de páginas

Pocas rutas, todo gira alrededor del hub:

- `/` — **Landing**: hero potente con frase fuerza, CTA "Explorar materiales", contador (ej. "+150 recursos"), 3 atajos visuales (Infantil / Primaria / Secundaria) y wizard "¿Qué busco?".
- `/materiales` — **Hub unificado** con filtros, buscador y grid de cards (corazón del proyecto).
- `/sobre-el-11f` — Qué es el 11F, por qué importa, cómo usar los materiales en el aula.
- `/contacto` — Email + enlace a redes oficiales.

Cada ruta con su propio `head()` (title, description, og:*) — separadas para SEO real.

## Categorías propuestas (ampliando el Excel)

El Excel agrupa por TIPO de forma irregular. Reorganizamos con dos taxonomías cruzadas que se filtran de forma independiente:

**Tipo de recurso** (badge principal en card):

- Presentaciones (PPT)
- Vídeos
- Juegos y dinámicas
- Ilustraciones y para colorear
- Pósters
- Cómics y viñetas
- Exposiciones
- Calendarios
- Libros y lecturas
- Pegatinas y marcapáginas
- Fichas didácticas
- Kahoots y quizzes

**Etapa educativa**:

- Infantil (3-6)
- Primaria (6-12)
- ESO (12-16)
- Bachillerato (16-18)
- Todas las edades

**Disciplina científica** (filtro secundario, derivado de los títulos):

- General / múltiples
- Física y Química
- Matemáticas
- Biología y Medicina
- Astronomía
- Arquitectura e Ingeniería
- Tecnología y STEAM
- Historia de la ciencia

**Idioma**: Castellano · Català · Inglés · Multilingüe

## Funcionalidades (todas en v1)

### 1. Hub `/materiales` con filtros en tiempo real

- Sidebar (desktop) / drawer (móvil) con chips de filtro: tipo, etapa, disciplina, idioma.
- Estado de filtros sincronizado con la URL (search params) → se puede compartir un enlace ya filtrado.
- Resultado instantáneo, sin recarga. Contador "X materiales encontrados".
- Botón "Limpiar filtros" siempre visible cuando hay alguno activo.

### 2. Buscador global

- Input prominente arriba del grid.
- Búsqueda fuzzy con **Fuse.js** sobre título, descripción, autor/fuente y tags.
- Funciona junto con los filtros (intersección).

### 3. Cards de descarga explícita

Cada card muestra:

- Thumbnail/icono coloreado según tipo
- Título
- Descripción corta (1-2 líneas)
- Badges visibles: tipo · etapa · idioma · disciplina
- Botón principal **"Descargar"** o **"Abrir recurso"** (según destino) → abre el enlace de Drive/web original en nueva pestaña, sin pasos intermedios
- Botón secundario "Ver fuente oficial" cuando exista

### 4. Wizard "¿Qué busco?" (3 pasos)

- Modal/sheet accesible desde un botón flotante y desde la landing.
- Paso 1: Para quién (Infantil / Primaria / ESO / Bachillerato / Adultos)
- Paso 2: Qué tipo (Presentación / Vídeo / Juego / Ficha imprimible / Cualquiera)
- Paso 3: Te lleva a `/materiales?etapa=...&tipo=...` con resultados ya filtrados
- Animación suave entre pasos

### 5. Badges visuales en cada material

Chips de color con icono distintivo por tipo y etapa. Permiten escanear el grid sin leer títulos.

### 6. UX extras

- Modo oscuro automático respetando preferencia del sistema
- Skeleton loaders mientras carga
- Empty state con sugerencias cuando un filtro no devuelve resultados
- Toast de feedback al abrir un recurso
- 100% responsive, mobile-first

## Identidad visual

- **Color primario** `#00B4BC` (turquesa identitario 11F) — convertido a `oklch` y usado en tokens semánticos (`--primary`, gradientes, glow).
- **Acentos**: rosa cálido (#E91E63 suave) y morado profundo como acentos secundarios para diferenciar tipos de recurso.
- **Tipografía**: sans-serif moderna (Inter o similar) + display contundente para titulares.
- Microinteracciones, gradientes sutiles `--primary` → `--primary-glow`, sombras elegantes.
- Hero con ilustración/composición vibrante alusiva a mujeres en ciencia (imagen generada).
- Iconos lucide-react para badges de categoría.

## Datos

Los ~50+ materiales del Excel se modelan en un único array tipado en `src/data/materiales.ts`:

```ts
type Material = {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: TipoRecurso;
  etapas: Etapa[];
  disciplinas: Disciplina[];
  idioma: Idioma;
  enlace: string;          // Drive o web original
  enlaceFuente?: string;   // 11defebrero.org u oficial
  thumbnail?: string;      // opcional
};
```

Sin backend: todo client-side. Filtros + búsqueda en memoria → instantáneo.

## Stack técnico

- TanStack Start + TanStack Router (rutas separadas, search params tipados con `zodValidator` + `fallback`)
- Tailwind v4 + tokens `oklch` en `src/styles.css`
- shadcn/ui (Card, Badge, Sheet/Drawer, Dialog para wizard, Input, Select)
- Fuse.js para búsqueda fuzzy
- lucide-react para iconografía
- Imagen hero generada con `imagegen` en calidad standard

## Entregables del primer build

1. Tokens `oklch` con `#00B4BC` como `--primary` + gradientes y sombras
2. `src/data/materiales.ts` con todos los recursos del Excel categorizados
3. Componentes: `MaterialCard`, `FilterSidebar`, `SearchBar`, `WizardDialog`, `Hero`, `SiteHeader`, `SiteFooter`
4. Rutas: `/`, `/materiales`, `/sobre-el-11f`, `/contacto` con `head()` propios
5. Search params tipados en `/materiales` (etapa, tipo, disciplina, idioma, q)
6. Imagen hero generada
7. SEO básico: títulos, meta descriptions, semantic HTML, H1 único por página, alt text