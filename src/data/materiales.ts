export const TIPOS = [
  "Presentaciones",
  "Vídeos",
  "Juegos",
  "Ilustraciones",
  "Pósters",
  "Cómics",
  "Exposiciones",
  "Calendarios",
  "Libros",
  "Pegatinas",
  "Fichas",
  "Kahoot",
  "Podcast",
  "Webs"] as const;
export type Tipo = (typeof TIPOS)[number];

export const ETAPAS = [
  "Infantil",
  "Primaria",
  "ESO",
  "Bachillerato"] as const;
export type Etapa = (typeof ETAPAS)[number];

export const DISCIPLINAS = [
  "General",
  "Física y Química",
  "Matemáticas",
  "Biología y Medicina",
  "Astronomía",
  "Arquitectura e Ingeniería",
  "Tecnología y STEAM",
  "Historia de la ciencia"] as const;
export type Disciplina = (typeof DISCIPLINAS)[number];

export const IDIOMAS = ["Castellano", "Català", "Inglés", "Multilingüe"] as const;
export type Idioma = (typeof IDIOMAS)[number];

export interface Material {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: Tipo;
  etapas: Etapa[];
  disciplinas: Disciplina[];
  idioma: Idioma;
  enlace: string;
  enlaceFuente?: string;
  autor?: string;
  verificado?: boolean;
  verificadoEn?: string;
}

const all = ["Infantil", "Primaria", "ESO", "Bachillerato"] as Etapa[];
const ePrimSec = ["Primaria", "ESO"] as Etapa[];
const eSecBach = ["ESO", "Bachillerato"] as Etapa[];

export const MATERIALES: Material[] = [
  // ==== Pósters & Casio ====
  {
    id: "casio-posters",
    titulo: "Pósters Científicas (CASIO)",
    descripcion: "Colección de pósters para imprimir con científicas referentes, editados por CASIO Educación.",
    tipo: "Pósters",
    etapas: all,
    disciplinas: ["General", "Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://www.cientificascasio.com/recursos",
    autor: "CASIO Educación",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "casio-actividades",
    titulo: "Actividades Científicas (CASIO)",
    descripcion: "Pack de actividades didácticas listas para el aula sobre mujeres científicas.",
    tipo: "Fichas",
    etapas: ["Primaria", "ESO"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://www.cientificascasio.com/recursos",
    autor: "CASIO Educación",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "casio-kahoot",
    titulo: "Kahoot Científicas CASIO",
    descripcion: "Kahoot con distintos niveles sobre la historia de las mujeres en la ciencia.",
    tipo: "Kahoot",
    etapas: ["Primaria", "ESO", "Bachillerato"],
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://www.cientificascasio.com/recursos",
    autor: "CASIO Educación",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "nomorematildas",
    titulo: "Pósters #NoMoreMatildas",
    descripcion: "Cuentos y pósters que rescatan el legado de científicas invisibilizadas por el efecto Matilda.",
    tipo: "Pósters",
    etapas: all,
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://www.nomorematildas.com/11f",
    autor: "AMIT",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "canarias-cartas",
    titulo: "Juego de cartas: Mujeres en Ciencia",
    descripcion: "Baraja imprimible para conocer a mujeres pioneras de la ciencia. Editada por el Gobierno de Canarias.",
    tipo: "Juegos",
    etapas: ["Primaria", "ESO"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://www3.gobiernodecanarias.org/medusa/ecoescuela/recursosdigitales/files/formidable/6/es.pdf",
    autor: "Gobierno de Canarias",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "oceanicas",
    titulo: "Oceánicas: pioneras de la oceanografía",
    descripcion: "Fichas didácticas sobre las pioneras de la oceanografía. Material del IEO.",
    tipo: "Fichas",
    etapas: ePrimSec,
    disciplinas: ["Biología y Medicina"],
    idioma: "Castellano",
    enlace: "https://oceanicas.ieo.es/fichas-didacticas/",
    autor: "Instituto Español de Oceanografía",
    verificado: true,
    verificadoEn: "2026-05-11"
  },

  // ==== Presentaciones ====
  {
    id: "ppt-primaria",
    titulo: "Propuesta Primaria",
    descripcion: "Presentación lista para usar en aula de primaria sobre mujeres científicas.",
    tipo: "Presentaciones",
    etapas: ["Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2017/01/24/presentacion-para-primaria/",
    enlaceFuente: "https://11defebrero.org/2017/01/24/presentacion-para-primaria/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-infantil",
    titulo: "Propuesta Infantil",
    descripcion: "Presentación adaptada a peques de educación infantil.",
    tipo: "Presentaciones",
    etapas: ["Infantil"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2017/01/24/presentacion-para-infantil/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-basica",
    titulo: "Propuesta Básica 11F",
    descripcion: "Presentación generalista para introducir el 11F en cualquier etapa.",
    tipo: "Presentaciones",
    etapas: all,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2018/01/19/presentacion-basica-11f/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-estadisticas",
    titulo: "¿Qué nos cuentan las estadísticas sobre la mujer en la ciencia?",
    descripcion: "Presentación con datos actualizados sobre brecha de género en STEM.",
    tipo: "Presentaciones",
    etapas: eSecBach,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2018/02/03/presentacion-estadisticas-11f/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-microbiologas",
    titulo: "Microbiólogas",
    descripcion: "Presentación sobre microbiólogas adaptada para los más peques.",
    tipo: "Presentaciones",
    etapas: ["Infantil", "Primaria"],
    disciplinas: ["Biología y Medicina"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/recursos/",
    verificado: false,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-referentes",
    titulo: "¿Cuántos referentes científicos femeninos conocemos?",
    descripcion: "Dinámica para descubrir el desconocimiento sobre mujeres científicas.",
    tipo: "Presentaciones",
    etapas: ["Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/recursos/",
    verificado: false,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-arquitectura",
    titulo: "Pioneras en Arquitectura",
    descripcion: "Presentación sobre mujeres pioneras en la arquitectura.",
    tipo: "Presentaciones",
    etapas: eSecBach,
    disciplinas: ["Arquitectura e Ingeniería"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/recursos/",
    verificado: false,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-astronomia",
    titulo: "Pioneras en Astronomía y Astrofísica",
    descripcion: "Recorrido por las grandes astrónomas de la historia.",
    tipo: "Presentaciones",
    etapas: eSecBach,
    disciplinas: ["Astronomía"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/recursos/",
    verificado: false,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-fisicaquimica",
    titulo: "Pioneras en Física y Química",
    descripcion: "Presentación sobre las pioneras de la física y la química.",
    tipo: "Presentaciones",
    etapas: eSecBach,
    disciplinas: ["Física y Química"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/recursos/",
    verificado: false,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-matematicas",
    titulo: "Pioneras en Matemáticas",
    descripcion: "Presentación sobre las grandes matemáticas de la historia.",
    tipo: "Presentaciones",
    etapas: eSecBach,
    disciplinas: ["Matemáticas"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/recursos/",
    verificado: false,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ppt-nobel-quimica",
    titulo: "Premio Nobel Química 2020",
    descripcion: "Presentación sobre Charpentier y Doudna, Premio Nobel de Química 2020.",
    tipo: "Presentaciones",
    etapas: ["Bachillerato"],
    disciplinas: ["Física y Química", "Biología y Medicina"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/recursos/",
    verificado: false,
    verificadoEn: "2026-05-11"
  },

  // ==== Ilustraciones ====
  {
    id: "ilus-rosalind",
    titulo: "Ilustración Rosalind Franklin",
    descripcion: "Ilustración homenaje a Rosalind Franklin, descubridora de la estructura del ADN.",
    tipo: "Ilustraciones",
    etapas: all,
    disciplinas: ["Biología y Medicina"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2022/02/09/ilustracion-rosalind-franklin/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "color-women-stem",
    titulo: "Libro para colorear: WOMEN IN STEM",
    descripcion: "Cuaderno para colorear de mujeres STEM editado por el Departamento de Energía de EE.UU.",
    tipo: "Libros",
    etapas: ["Infantil", "Primaria"],
    disciplinas: ["Tecnología y STEAM"],
    idioma: "Inglés",
    enlace: "https://www.energy.gov/sites/prod/files/2017/04/f34/WomenInSTEM2017-coloringbook%20%282%29_0.pdf",
    enlaceFuente: "https://11defebrero.org/2022/01/13/libro-para-colorear-women-in-stem/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "color-elise-gravel",
    titulo: "Ilustraciones para colorear de Elise Gravel",
    descripcion: "Láminas para colorear de mujeres científicas por la ilustradora Elise Gravel.",
    tipo: "Ilustraciones",
    etapas: ["Infantil", "Primaria"],
    disciplinas: ["General"],
    idioma: "Inglés",
    enlace: "https://elisegravel.com/en/livres/free-printables/",
    enlaceFuente: "https://11defebrero.org/2022/01/13/ilustraciones-para-colorear-de-elise-gravel/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "comic-jocelyn",
    titulo: "Minibiografía comiquera de Jocelyn Bell",
    descripcion: "Cómic corto sobre Jocelyn Bell, descubridora de los púlsares.",
    tipo: "Cómics",
    etapas: ePrimSec,
    disciplinas: ["Astronomía"],
    idioma: "Castellano",
    enlace: "https://mujeresconciencia.com/2017/08/04/la-nieta-de-la-fuensanta-y-el-anton-quiere-ser-jocelyn-bell/",
    enlaceFuente: "https://11defebrero.org/2022/01/13/minibiografia-comiquera-de-jocelyn-bell/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "noethember",
    titulo: "#Noethember: Ilustrando la vida de Emmy Noether",
    descripcion: "Serie de ilustraciones que recorren la vida de la matemática Emmy Noether.",
    tipo: "Ilustraciones",
    etapas: eSecBach,
    disciplinas: ["Matemáticas"],
    idioma: "Castellano",
    enlace: "https://mujeresconciencia.com/2018/12/07/en-homenaje-a-emmy-noether-noethember/",
    enlaceFuente: "https://11defebrero.org/2022/01/13/noethember-ilustrando-la-vida-de-emmy-noether/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "pegatinas-inspirasteam",
    titulo: "Pegatinas InspiraSTEAM",
    descripcion: "Pegatinas descargables con científicas y tecnólogas referentes.",
    tipo: "Pegatinas",
    etapas: all,
    disciplinas: ["Tecnología y STEAM"],
    idioma: "Castellano",
    enlace: "https://wearekaikoo.com/Inspira",
    enlaceFuente: "https://11defebrero.org/2022/01/13/pegatinas-inspirasteam/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "color-think-like-girl",
    titulo: "Libro para colorear THINK LIKE A GIRL",
    descripcion: "Cuaderno para colorear con mujeres pioneras STEM (Vilcek Foundation).",
    tipo: "Libros",
    etapas: ["Infantil", "Primaria"],
    disciplinas: ["Tecnología y STEAM"],
    idioma: "Inglés",
    enlace: "https://vilcek.org/wp-content/uploads/2021/02/VilcekFoundation_Women_Pioneers_In_STEM_ColoringBook.pdf",
    enlaceFuente: "https://11defebrero.org/2022/01/13/libro-para-colorear-think-like-a-girl/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ilus-eduardo-hernandez",
    titulo: "Ilustraciones de Eduardo Hernández",
    descripcion: "Mujeres STEM ilustradas por Eduardo Hernández (Pelopantón) listas para colorear.",
    tipo: "Ilustraciones",
    etapas: ["Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2022/01/13/mujeres-stem-para-colorear-de-pelopanton/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "mary-anning",
    titulo: "Mary Anning ilustrada por Danibus",
    descripcion: "Ilustración de la paleontóloga Mary Anning.",
    tipo: "Ilustraciones",
    etapas: ePrimSec,
    disciplinas: ["Biología y Medicina", "Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2020/02/09/mary-anning-ilustrada-por-danibus/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ilus-beatriz-arribas",
    titulo: "Ilustraciones de Beatriz Arribas",
    descripcion: "Serie de ilustraciones sobre mujeres científicas de Beatriz Arribas.",
    tipo: "Ilustraciones",
    etapas: all,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2017/02/12/ilustraciones-de-beatriz-arribas/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "mujer-bombilla",
    titulo: "La Mujer Bombilla – Colorcrema",
    descripcion: "Ilustración inspiradora de Colorcrema sobre el ingenio femenino.",
    tipo: "Ilustraciones",
    etapas: all,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2017/02/10/la-mujer-bombilla-colorcrema/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ilus-anna-medina",
    titulo: "Ilustración de Anna Medina @contesiciencia",
    descripcion: "Ilustraciones que combinan ciencia y cuento de Anna Medina.",
    tipo: "Ilustraciones",
    etapas: ["Infantil", "Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2017/02/06/ilustracion-de-anna-medina-contesiciencia/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },

  // ==== Materiales singulares ====
  {
    id: "marcapaginas",
    titulo: "Marcapáginas 11F",
    descripcion: "Marcapáginas imprimibles con científicas para repartir en clase.",
    tipo: "Pegatinas",
    etapas: all,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://cytcerones.es/descargas/",
    enlaceFuente: "https://11defebrero.org/2023/05/20/marcapaginas-11f/",
    autor: "CYT Cerones",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "cientificartas",
    titulo: "Cientificartas / Scientificards",
    descripcion: "Juego de cartas con mujeres científicas. Ideal para usar en grupo.",
    tipo: "Juegos",
    etapas: ePrimSec,
    disciplinas: ["General"],
    idioma: "Multilingüe",
    enlace: "https://cytcerones.es/descargas/",
    enlaceFuente: "https://11defebrero.org/2023/05/20/juego-cientificartas-scientificards/",
    autor: "CYT Cerones",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "vinetas-ninacientifica",
    titulo: "Colección de viñetas «De niña a científica»",
    descripcion: "Viñetas con historias de niñas que se convirtieron en científicas.",
    tipo: "Cómics",
    etapas: ["Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://cytcerones.es/portfolio/de-nina-a-cientifica/",
    enlaceFuente: "https://11defebrero.org/2023/05/20/coleccion-de-vinetas-de-nina-a-cientifica/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "loquita-huesos",
    titulo: "Loquita por sus huesos",
    descripcion: "Cómic divulgativo sobre la paleontología desde una mirada femenina.",
    tipo: "Cómics",
    etapas: eSecBach,
    disciplinas: ["Biología y Medicina"],
    idioma: "Castellano",
    enlace: "https://cytcerones.es/portfolio/loquita-por-sus-huesos/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "rompecabezas",
    titulo: "Rompecabezas 11F",
    descripcion: "Puzzle imprimible con científicas para resolver en aula.",
    tipo: "Juegos",
    etapas: ["Infantil", "Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/wp-content/uploads/2021/02/puzlea4-1.pdf",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "cartas-mujeresciencia",
    titulo: "El juego de cartas de mujeres científicas",
    descripcion: "Baraja imprimible publicada por Mujeres con Ciencia.",
    tipo: "Juegos",
    etapas: ePrimSec,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://mujeresconciencia.com/2015/09/09/el-juego-de-cartas-mujeres-de-ciencia/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "sopa-letras",
    titulo: "Sopa de letras de mujeres científicas",
    descripcion: "Sopa de letras imprimible para descubrir nombres de científicas.",
    tipo: "Juegos",
    etapas: ["Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://mujeresconciencia.com/2016/12/31/sopa-letras-cientificas/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "adivina-quien",
    titulo: "Adivina quién soy yo",
    descripcion: "Juego de pistas para adivinar qué científica corresponde a cada descripción.",
    tipo: "Juegos",
    etapas: ["Primaria", "ESO"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/wp-content/uploads/2018/01/adivina-quiecc81n-soy-11f.pdf",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "mujeres-11f-dolores",
    titulo: "Mujeres 11F de Dolores Bueno",
    descripcion: "Juego didáctico creado por Dolores Bueno.",
    tipo: "Juegos",
    etapas: ePrimSec,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://worlderlenmeyer.blogspot.com/2018/02/juego-mujeres-11f.html",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "rosco-cientificas",
    titulo: "Rosco de mujeres de la ciencia",
    descripcion: "Rosco tipo Pasapalabra para descubrir científicas de la A a la Z.",
    tipo: "Juegos",
    etapas: eSecBach,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://algunastecnocosas.wordpress.com/2020/03/14/rosco-de-las-mujeres-cientificas/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "mini-gymkana",
    titulo: "Mini gymkana matemática",
    descripcion: "Pequeña gymkana matemática del proyecto Conexión Matemática.",
    tipo: "Juegos",
    etapas: ePrimSec,
    disciplinas: ["Matemáticas"],
    idioma: "Castellano",
    enlace: "https://conexionmatematica.catedu.es/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "scratch-juego",
    titulo: "Juego de Scratch sobre mujeres científicas",
    descripcion: "Proyecto interactivo de Scratch para conocer científicas jugando.",
    tipo: "Juegos",
    etapas: ePrimSec,
    disciplinas: ["Tecnología y STEAM"],
    idioma: "Castellano",
    enlace: "https://scratch.mit.edu/projects/144610528/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "scratch-laberinto",
    titulo: "Descubriendo a través del laberinto",
    descripcion: "Laberinto en Scratch para descubrir mujeres científicas.",
    tipo: "Juegos",
    etapas: ePrimSec,
    disciplinas: ["Tecnología y STEAM"],
    idioma: "Castellano",
    enlace: "https://scratch.mit.edu/projects/142874238/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "expo-cientificas",
    titulo: "Exposición de pósters de mujeres científicas",
    descripcion: "Pósters listos para imprimir y montar una exposición en el centro.",
    tipo: "Exposiciones",
    etapas: all,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2017/02/21/exposicion-de-posters-de-mujeres-cientificas-2/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "expo-astronoma",
    titulo: "Exposición «Con A de AstrónomA»",
    descripcion: "Exposición itinerante sobre mujeres astrónomas, de la SEA.",
    tipo: "Exposiciones",
    etapas: eSecBach,
    disciplinas: ["Astronomía"],
    idioma: "Castellano",
    enlace: "https://www.sea-astronomia.es/comision-mujer-y-astronomia-divulgacion",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "poster-elise",
    titulo: "Póster de mujeres científicas de Elise Gravel",
    descripcion: "Póster ilustrado con mujeres científicas famosas.",
    tipo: "Pósters",
    etapas: all,
    disciplinas: ["General"],
    idioma: "Inglés",
    enlace: "https://elisegravel.com/en/blog/some-famous-scientists/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "astronomas-historia",
    titulo: "Astrónomas que hicieron historia",
    descripcion: "Calendario y materiales sobre astrónomas pioneras (SEA).",
    tipo: "Calendarios",
    etapas: eSecBach,
    disciplinas: ["Astronomía"],
    idioma: "Castellano",
    enlace: "https://www.sea-astronomia.es/comision-mujer-y-astronomia-divulgacion",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "calendari-urv",
    titulo: "Calendari de dones científiques · URV",
    descripcion: "Calendario de mujeres científicas editado por la Universitat Rovira i Virgili.",
    tipo: "Calendarios",
    etapas: ["Bachillerato"],
    disciplinas: ["General"],
    idioma: "Català",
    enlace: "https://www.urv.cat/ca/vida-campus/serveis/unitat-igualtat/activitats/calendaris/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "mujeres-invisibles",
    titulo: "Mujeres Invisibles",
    descripcion: "Sitio web colaborativo que recupera figuras femeninas invisibilizadas.",
    tipo: "Webs",
    etapas: eSecBach,
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://sites.google.com/view/cognovisual/mujeres-invisibles?authuser=0",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "stem-role-model",
    titulo: "STEM Role Model Posters",
    descripcion: "Pósters internacionales de mujeres referentes en STEM.",
    tipo: "Pósters",
    etapas: all,
    disciplinas: ["Tecnología y STEAM"],
    idioma: "Inglés",
    enlace: "https://medium.com/nevertheless-podcast/stem-role-models-posters-2404424b37dd",
    verificado: true,
    verificadoEn: "2026-05-11"
  },

  // ==== Vídeos ====
  {
    id: "video-mujer-ingenieria",
    titulo: "Programa Mujer e Ingeniería",
    descripcion: "Vídeo divulgativo sobre el programa Mujer e Ingeniería.",
    tipo: "Vídeos",
    etapas: eSecBach,
    disciplinas: ["Arquitectura e Ingeniería"],
    idioma: "Castellano",
    enlace: "https://www.youtube.com/watch?v=pRcyJF_vb5c",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "videos-scientista",
    titulo: "Vídeos de mujeres científicas",
    descripcion: "Recopilación de vídeos cortos sobre científicas en activo.",
    tipo: "Vídeos",
    etapas: eSecBach,
    disciplinas: ["General"],
    idioma: "Inglés",
    enlace: "http://www.scientistafoundation.com/women-in-science-video.html",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ted-women",
    titulo: "12 charlas TED de mujeres científicas y tecnólogas",
    descripcion: "Playlist de TED con charlas brillantes de mujeres en ciencia y tech.",
    tipo: "Vídeos",
    etapas: eSecBach,
    disciplinas: ["General"],
    idioma: "Inglés",
    enlace: "https://www.ted.com/playlists/253/11_ted_talks_by_brilliant_wome",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "video-mujeres-ciencia",
    titulo: "Mujeres de Ciencia",
    descripcion: "Vídeo divulgativo sobre mujeres referentes de la ciencia.",
    tipo: "Vídeos",
    etapas: ePrimSec,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://www.youtube.com/watch?v=E3QptE6rSZc",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "video-mujeres-cientificas",
    titulo: "Vídeo Mujeres Científicas",
    descripcion: "Recopilación visual de mujeres científicas a lo largo de la historia.",
    tipo: "Vídeos",
    etapas: ePrimSec,
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://www.youtube.com/watch?v=9q_tRDvY-sg",
    verificado: true,
    verificadoEn: "2026-05-11"
  },

  // ==== Podcast ====
  {
    id: "podcast-euskadi",
    titulo: "Podcast «Mujeres en la Historia de la Ciencia»",
    descripcion: "Especial de Radio Euskadi sobre mujeres en la historia de la ciencia.",
    tipo: "Podcast",
    etapas: ["Bachillerato"],
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://mujeresconciencia.com/2016/02/13/especial-mujeres-en-la-historia-de-la-ciencia/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "capsulas-son",
    titulo: "Miniserie audio «Cápsulas de SoN»",
    descripcion: "Cápsulas radiofónicas sobre ciencia con perspectiva de género.",
    tipo: "Podcast",
    etapas: ["Bachillerato"],
    disciplinas: ["Biología y Medicina"],
    idioma: "Castellano",
    enlace: "https://www.ciber-bbn.es/programas-transversales/programa-de-difusion-e-internacionalizacion/biomedicina-con-y-para-la-sociedad/miniserie-de-radio",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "oxford-women",
    titulo: "Entrevistas a científicas de Oxford",
    descripcion: "Podcast de la Universidad de Oxford con entrevistas a científicas.",
    tipo: "Podcast",
    etapas: ["Bachillerato"],
    disciplinas: ["General"],
    idioma: "Inglés",
    enlace: "https://podcasts.ox.ac.uk/series/women-science",
    verificado: true,
    verificadoEn: "2026-05-11"
  },

  // ==== Webs y recopilaciones ====
  {
    id: "naukas-recop",
    titulo: "Recopilación en Naukas sobre científicas",
    descripcion: "Compilación de artículos de Naukas sobre mujeres en la ciencia.",
    tipo: "Webs",
    etapas: ["Bachillerato"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://naukas.com/2017/02/11/feliz-dia-de-la-mujer-y-la-nina-en-ciencia/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "mujeres-historia",
    titulo: "Mujeres en la historia: científicas",
    descripcion: "Sección monográfica del blog Mujeres en la Historia.",
    tipo: "Webs",
    etapas: eSecBach,
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://www.mujeresenlahistoria.com/p/cientificas.html",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "scientific-women",
    titulo: "Scientific Women Through History",
    descripcion: "Base de datos internacional de mujeres científicas a lo largo de la historia.",
    tipo: "Webs",
    etapas: eSecBach,
    disciplinas: ["Historia de la ciencia"],
    idioma: "Inglés",
    enlace: "https://scientificwomen.net/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "doodles",
    titulo: "Doodles de mujer y ciencia",
    descripcion: "Recopilación de los doodles de Google dedicados a mujeres científicas.",
    tipo: "Webs",
    etapas: all,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://mujeresconciencia.com/2015/01/21/los-doodles-de-mujeres-con-ciencia/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "sellos",
    titulo: "Sellos de mujer con ciencia",
    descripcion: "Recopilación filatélica de sellos dedicados a científicas.",
    tipo: "Webs",
    etapas: ["Bachillerato"],
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://mujeresconciencia.com/2016/06/10/los-sellos-mujeres-ciencia/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "huellas-geniales",
    titulo: "Huellas de mujeres geniales",
    descripcion: "Repositorio de biografías y materiales sobre mujeres geniales.",
    tipo: "Webs",
    etapas: eSecBach,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://www.huellasdemujeresgeniales.com/category/mas/ciencia-otras/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "dossier-escaparates",
    titulo: "Dossier #escaparates11F Zaragoza",
    descripcion: "Dossier con las científicas homenajeadas en la edición 2019 de Escaparates 11F.",
    tipo: "Libros",
    etapas: eSecBach,
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/wp-content/uploads/2019/02/dossier_completo-escaparates11f.pdf",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ua-secundando",
    titulo: "Propuestas didácticas «Secundando la Igualdad»",
    descripcion: "Propuestas didácticas para Secundaria y Bachillerato de la Universidad de Alicante.",
    tipo: "Fichas",
    etapas: eSecBach,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://web.ua.es/es/unidad-igualdad/secundando-la-igualdad/mujeres-a-ciencia-cierta/mujeres-a-ciencia-propuestas-didacticas.html",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "ccoo-matematicas",
    titulo: "Aportaciones de las mujeres a las matemáticas",
    descripcion: "Documento divulgativo sobre las matemáticas femeninas (FE-CCOO).",
    tipo: "Libros",
    etapas: eSecBach,
    disciplinas: ["Matemáticas"],
    idioma: "Castellano",
    enlace: "https://fe.ccoo.es/9accb222558c022b7c04e03a753d8a9d000063.pdf",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "matematicas-feminista",
    titulo: "Educación matemática desde una perspectiva feminista",
    descripcion: "Ideas para llevar la perspectiva feminista al aula de matemáticas.",
    tipo: "Libros",
    etapas: ["Bachillerato"],
    disciplinas: ["Matemáticas"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/wp-content/uploads/2016/12/educ-matematica-y-feminismo_vanesacaleroblanco.pdf",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "adivina-aventurera",
    titulo: "Adivina tu científica aventurera",
    descripcion: "Juego para descubrir qué científica aventurera te representa.",
    tipo: "Juegos",
    etapas: ePrimSec,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2018/11/26/adivina-tu-cientifica-aventurera-3/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "blog-mujeresciencia",
    titulo: "Blog Mujeres y ciencia",
    descripcion: "Blog escolar con recursos sobre mujeres y ciencia.",
    tipo: "Webs",
    etapas: ePrimSec,
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://clasedeciencias2.wixsite.com/mujeresyciencia",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "crucigrama-aero",
    titulo: "Crucigrama: pioneras del sector aeronáutico en España",
    descripcion: "Ficha imprimible para aprender sobre las pioneras de la aeronáutica española.",
    tipo: "Fichas",
    etapas: eSecBach,
    disciplinas: ["Arquitectura e Ingeniería"],
    idioma: "Castellano",
    enlace: "https://d1fdloi71mui9q.cloudfront.net/mPaYRd7mRJ6njVWXuhDt_Fichas%20mujeres%20(2).pdf",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "bebe-mordor",
    titulo: "Selección de libros y cómics — Bebé a Mordor",
    descripcion: "Recursos educativos sobre mujeres y ciencia seleccionados por Bebé a Mordor.",
    tipo: "Libros",
    etapas: ["Infantil", "Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://bebeamordor.com/dia-de-las-ninas-y-mujeres-en-la-ciencia/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "directorio-tech",
    titulo: "Directorio de mujeres tecnólogas #WomenInTech",
    descripcion: "Directorio de mujeres tecnólogas que han hecho historia.",
    tipo: "Webs",
    etapas: ["Bachillerato"],
    disciplinas: ["Tecnología y STEAM"],
    idioma: "Castellano",
    enlace: "http://blog.loretahur.net/2017/11/directorio-de-mujeres-tecnologas-que-han-hecho-historia-womenintech.html",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "cuento-guisante",
    titulo: "Cuento: La Científica y el guisante",
    descripcion: "Cuento descargable para realizar un #cuentacientíficas.",
    tipo: "Libros",
    etapas: ["Infantil", "Primaria"],
    disciplinas: ["General"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/wp-content/uploads/2019/04/la-cientifica-y-el-guisante-11f.pdf",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "tabla-periodica",
    titulo: "Tabla Periódica de las Científicas",
    descripcion: "Tabla periódica reinterpretada con mujeres científicas.",
    tipo: "Pósters",
    etapas: eSecBach,
    disciplinas: ["Física y Química"],
    idioma: "Castellano",
    enlace: "https://11defebrero.org/2018/11/28/la-tabla-periodica-de-las-cientificas/",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "csic-detectives",
    titulo: "Detectives de crisis climáticas y medioambientales",
    descripcion: "Proyecto del CSIC para investigar la crisis climática con perspectiva científica.",
    tipo: "Fichas",
    etapas: eSecBach,
    disciplinas: ["Biología y Medicina"],
    idioma: "Castellano",
    enlace: "https://www.recursosdivulgacion.csic.es/proyectos/detectives-de-crisis-climaticas-y-medioambientales",
    autor: "CSIC",
    verificado: true,
    verificadoEn: "2026-05-11"
  },
  {
    id: "cientificas-cine",
    titulo: "Científicas de cine — 101 películas",
    descripcion: "Estudio panorámico sobre la imagen filmica de las mujeres científicas en el cine internacional.",
    tipo: "Libros",
    etapas: ["Bachillerato"],
    disciplinas: ["Historia de la ciencia"],
    idioma: "Castellano",
    enlace: "https://publicaciones.unileon.es/cientificas-de-cine-panoramica-historica-en-101-peliculas-de-la-evolucion-de-la-imagen-filmica-de-la-mujer-de-ciencia-y-conocimiento-en-el-cine-internacional/",
    autor: "Universidad de León",
  }];

export const TIPO_META: Record<Tipo, { color: string; emoji: string }> = {
  Presentaciones: { color: "primary", emoji: "📊" },
  "Vídeos": { color: "coral", emoji: "🎬" },
  Juegos: { color: "violet", emoji: "🎮" },
  Ilustraciones: { color: "amber", emoji: "🎨" },
  "Pósters": { color: "primary", emoji: "🖼️" },
  Cómics: { color: "coral", emoji: "💥" },
  Exposiciones: { color: "violet", emoji: "🏛️" },
  Calendarios: { color: "amber", emoji: "📅" },
  Libros: { color: "primary", emoji: "📚" },
  Pegatinas: { color: "coral", emoji: "✨" },
  Fichas: { color: "violet", emoji: "📝" },
  Kahoot: { color: "amber", emoji: "❓" },
  Podcast: { color: "primary", emoji: "🎙️" },
  Webs: { color: "violet", emoji: "🌐" },
};
