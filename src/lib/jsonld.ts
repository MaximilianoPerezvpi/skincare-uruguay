import { productos, imagenUrl, type Producto } from "@/data/productos";
import { site } from "@/lib/site";

/**
 * Datos estructurados del catálogo (schema.org/ItemList + Product).
 *
 * Es lo que le permite a Google mostrar precio y disponibilidad directo en el
 * resultado de búsqueda. Se genera solo a partir de `productos.ts`: si agregás
 * un producto, acá aparece sin tocar nada.
 */

function oferta(p: Producto, url = `${site.url}/catalogo`) {
  return {
    "@type": "Offer",
    priceCurrency: "UYU",
    price: p.precio,
    availability:
      p.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    url,
    areaServed: { "@type": "Country", name: "Uruguay" },
    seller: { "@type": "Organization", name: site.nombre },
  };
}

export function catalogoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Skincare y K-Beauty en Uruguay — ${site.nombre}`,
    numberOfItems: productos.length,
    itemListElement: productos.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.nombre,
        brand: { "@type": "Brand", name: site.nombre },
        category: "Skincare",
        description: p.descripcion,
        image: `${site.url}${imagenUrl(p)}`,
        size: p.contenido,
        url: `${site.url}/producto/${p.id}`,
        offers: oferta(p, `${site.url}/producto/${p.id}`),
      },
    })),
  };
}

/** Datos estructurados de un producto individual, para /producto/[slug]. */
export function productoJsonLd(p: Producto) {
  const url = `${site.url}/producto/${p.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nombre,
    brand: { "@type": "Brand", name: site.nombre },
    category: "Skincare",
    description: p.descripcion,
    image: `${site.url}${imagenUrl(p)}`,
    size: p.contenido,
    url,
    offers: oferta(p, url),
  };
}
