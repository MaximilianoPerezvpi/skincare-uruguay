import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import DetalleProducto from "@/components/DetalleProducto";
import {
  buscarProducto,
  imagenUrl,
  productos,
  type Producto,
} from "@/data/productos";
import { productoJsonLd } from "@/lib/jsonld";

type Parametros = { params: Promise<{ slug: string }> };

/** Prerenderiza una página estática por cada producto del catálogo. */
export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: Parametros): Promise<Metadata> {
  const { slug } = await params;
  const producto = buscarProducto(slug);
  if (!producto) return {};

  const titulo = producto.nombre;
  // Foto propia (cuadrada) o la imagen OG del sitio (1200×630) si todavía no hay.
  const imagen = producto.imagen
    ? { url: producto.imagen, width: 1000, height: 1000, alt: titulo }
    : { url: imagenUrl(producto), width: 1200, height: 630, alt: titulo };

  return {
    title: titulo,
    description: producto.descripcion,
    alternates: { canonical: `/producto/${producto.id}` },
    openGraph: {
      type: "website",
      title: titulo,
      description: producto.descripcion,
      images: [imagen],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: producto.descripcion,
      images: [imagen.url],
    },
  };
}

/** Cross-selling: el kit primero (ticket más alto), después el resto. */
function relacionadosDe(producto: Producto): Producto[] {
  return productos
    .filter((p) => p.id !== producto.id)
    .sort((a, b) => Number(!!b.destacado) - Number(!!a.destacado))
    .slice(0, 3);
}

export default async function PaginaProducto({ params }: Parametros) {
  const { slug } = await params;
  const producto = buscarProducto(slug);
  if (!producto) notFound();

  const relacionados = relacionadosDe(producto);

  return (
    <>
      <Header />
      <main id="contenido" className="pt-[104px]">
        <DetalleProducto producto={producto} relacionados={relacionados} />
      </main>

      <CartDrawer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productoJsonLd(producto)),
        }}
      />
    </>
  );
}
