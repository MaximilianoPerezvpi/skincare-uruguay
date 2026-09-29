/**
 * CATÁLOGO — Skincare & K-Beauty
 *
 * Única fuente de datos del sitio. Para agregar un producto copiás un objeto
 * y listo: no hay que tocar ningún componente.
 *
 * ⚠️ Este archivo también se usa EN EL SERVIDOR (/api/checkout) para recalcular
 * el precio de cada compra. Nunca se le cree el precio al navegador: lo que
 * está acá es lo que se cobra.
 *
 * 💵 PRECIOS
 * En pesos uruguayos (UYU), IVA incluido. `precioAnterior` es opcional: si
 * está, la tarjeta muestra el tachado y el ahorro calculado.
 *
 * 📸 IMÁGENES
 * Guardá la foto en /public/productos/<id>.webp (cuadrada, 1000×1000, <150 KB)
 * y poné la ruta en `imagen`. Sin foto, `ImagenProducto` muestra un fallback
 * de frasco en vez de una ruta rota.
 *
 * 📦 STOCK
 * Unidades disponibles. 0 = sin stock (no se puede comprar).
 */

export type Categoria = "Kits" | "Serums" | "Limpiadores" | "Hidratantes";

export type Producto = {
  /** Identificador único. Es también la URL (/producto/<id>) y el nombre de la foto. */
  id: string;
  nombre: string;
  subtitulo?: string;
  categoria: Categoria;
  /** Precio final, en pesos uruguayos. */
  precio: number;
  /** Precio de lista antes del descuento, en pesos uruguayos. */
  precioAnterior?: number;
  /** Contenido del envase ("30 ml", "3 productos"). */
  contenido: string;
  /** Ruta pública de la foto. Sin definir = fallback visual (ver ImagenProducto). */
  imagen?: string;
  stock: number;
  descripcion: string;
  /** Beneficios cortos, en bullets. */
  beneficios: string[];
  /** Para qué pieles está pensado. */
  tipoPiel: string;
  /** Pasos de la rutina (solo kits). */
  pasos?: string[];
  /** Se muestra primero y con el borde dorado. */
  destacado?: boolean;
  badge?: string;
  /** Mensaje pre-cargado para el botón de WhatsApp de este producto. */
  mensajeWhatsApp?: string;
};

export const categorias: { id: Categoria | "todos"; etiqueta: string }[] = [
  { id: "todos", etiqueta: "Todos" },
  { id: "Kits", etiqueta: "Kits de rutina" },
  { id: "Serums", etiqueta: "Serums" },
  { id: "Limpiadores", etiqueta: "Limpiadores" },
  { id: "Hidratantes", etiqueta: "Hidratantes" },
];

export const productos: Producto[] = [
  {
    id: "kit-rutina-coreana-3-pasos",
    nombre: "Kit Rutina Coreana Glass Skin (3 Pasos)",
    subtitulo: "Limpiador + Serum Ácido Hialurónico + Crema Hidratante",
    categoria: "Kits",
    precio: 2390,
    precioAnterior: 3100,
    contenido: "3 productos full size",
    stock: 30,
    destacado: true,
    badge: "🔥 MÁS VENDIDO",
    descripcion:
      "El combo definitivo para lograr una piel luminosa, libre de imperfecciones y profundamente hidratada. Fórmula apta para todo tipo de pieles, especialmente grasas y mixtas.",
    pasos: [
      "1. Limpieza Profunda",
      "2. Tratamiento Concentrado",
      "3. Sellado e Hidratación",
    ],
    beneficios: [
      "Piel luminosa efecto glass skin",
      "Menos brillo y poros más finos",
      "Hidratación profunda que dura todo el día",
    ],
    tipoPiel: "Todo tipo de piel, especialmente grasa y mixta",
    mensajeWhatsApp:
      "Hola! Quisiera más información sobre el Kit Rutina Coreana 3 Pasos y cómo comprarlo.",
  },
  {
    id: "serum-niacinamida-cinc",
    nombre: "Serum Concentrado Niacinamida + Cinc",
    subtitulo: "Niacinamida 10% + Cinc 1%",
    categoria: "Serums",
    precio: 990,
    contenido: "30 ml",
    stock: 40,
    descripcion:
      "Serum liviano que regula el sebo, afina la textura y atenúa las marcas post-acné. Se absorbe al instante, sin sensación pegajosa.",
    beneficios: [
      "Controla el exceso de sebo",
      "Minimiza la apariencia de los poros",
      "Unifica el tono",
    ],
    tipoPiel: "Grasa, mixta y con tendencia acneica",
  },
  {
    id: "limpiador-gel-ph-balanceado",
    nombre: "Limpiador Gel Suave pH Balanceado",
    subtitulo: "pH 5.5 · Sin sulfatos agresivos",
    categoria: "Limpiadores",
    precio: 890,
    contenido: "150 ml",
    stock: 40,
    descripcion:
      "Gel de limpieza diaria que remueve impurezas y exceso de sebo sin tirantez, respetando el pH natural de la piel.",
    beneficios: [
      "Limpia sin resecar",
      "Respeta el manto ácido de la piel",
      "Apto para uso mañana y noche",
    ],
    tipoPiel: "Todo tipo de piel, incluso sensible",
  },
  {
    id: "crema-reparadora-barrera",
    nombre: "Crema Reparadora de Barrera Cutánea",
    subtitulo: "Ceramidas + Centella Asiática",
    categoria: "Hidratantes",
    precio: 1190,
    contenido: "50 ml",
    stock: 40,
    descripcion:
      "Crema de textura sedosa que sella la hidratación y fortalece la barrera cutánea. Calma el enrojecimiento y deja la piel suave y protegida.",
    beneficios: [
      "Refuerza la barrera cutánea",
      "Calma irritación y enrojecimiento",
      "Hidratación de larga duración",
    ],
    tipoPiel: "Todo tipo de piel, ideal para piel sensibilizada",
  },
];

/** Busca por id. Lo usa el checkout para recalcular precios en el servidor. */
export function buscarProducto(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}

/** El kit estrella: el primer producto destacado del catálogo. */
export function productoEstrella(): Producto {
  return productos.find((p) => p.destacado) ?? productos[0];
}

/**
 * URL de la foto para lugares que necesitan un string plano (metadata,
 * JSON-LD, `picture_url` de Mercado Pago): si el producto todavía no tiene
 * foto propia, cae a la imagen Open Graph generada del sitio.
 */
export function imagenUrl(p: Producto): string {
  return p.imagen ?? "/opengraph-image";
}

/** true si queda al menos una unidad. */
export function hayStock(p: Producto): boolean {
  return p.stock > 0;
}

/** Ahorro en pesos frente al precio anterior (0 si no hay descuento). */
export function ahorro(p: Producto): number {
  return p.precioAnterior ? Math.max(0, p.precioAnterior - p.precio) : 0;
}

/** Mensaje de WhatsApp para consultar por un producto puntual. */
export function mensajeWhatsAppDe(p: Producto): string {
  return (
    p.mensajeWhatsApp ??
    `Hola! Quisiera más información sobre ${p.nombre} y cómo comprarlo.`
  );
}
