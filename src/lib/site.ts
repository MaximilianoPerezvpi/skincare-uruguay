/**
 * Configuración central del sitio.
 * ⚠️ REVISAR ANTES DE DEPLOYEAR: los valores marcados con TODO son placeholders.
 */
export const site = {
  // TODO: nombre definitivo de la marca.
  nombre: "Glass Skin UY",
  // Dominio público: canonical, sitemap, Open Graph y fotos para Mercado Pago.
  // 1) NEXT_PUBLIC_SITE_URL si la cargaste (dominio propio), 2) el dominio de
  //    producción que Vercel inyecta solo, 3) placeholder local.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),
  descripcion:
    "Skincare y K-Beauty premium en Uruguay: kits de rutina coreana, serums y cremas. Comprá online con Mercado Pago en hasta 12 cuotas y recibilo en todo el país.",

  // WhatsApp de consultas y pedidos: +598 097 443 176, en formato
  // internacional sin +, sin espacios y sin el 0 inicial del celular.
  whatsapp: "59897443176",
  instagram: "glassskin.uy", // TODO
  instagramUrl: "https://instagram.com/glassskin.uy", // TODO
  email: "hola@glassskin.uy", // TODO

  ciudad: "Montevideo",
  pais: "Uruguay",
} as const;

/** Link de WhatsApp con mensaje pre-cargado (mejora muchísimo la conversión). */
export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Navegación principal: una sola fuente de verdad para header y footer. */
export const navegacion = [
  { href: "/", etiqueta: "Inicio" },
  { href: "/catalogo", etiqueta: "Tienda" },
  { href: "/#rutina", etiqueta: "La rutina" },
  { href: "/#envios", etiqueta: "Envíos y pagos" },
] as const;
