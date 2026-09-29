import type { Metadata } from "next";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Catalogo from "@/components/Catalogo";
import { categorias, type Categoria } from "@/data/productos";
import { site } from "@/lib/site";
import { catalogoJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Tienda",
  description: site.descripcion,
  alternates: { canonical: "/catalogo" },
};

type SearchParams = Promise<{ categoria?: string }>;

/** Deep-link opcional: /catalogo?categoria=serums */
function categoriaDesdeParam(valor?: string): Categoria | "todos" {
  const encontrada = categorias.find(
    (c) => c.id !== "todos" && c.id.toLowerCase() === valor?.toLowerCase(),
  );
  return encontrada?.id ?? "todos";
}

export default async function PaginaCatalogo({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <main id="contenido" className="pt-[104px]">
        <div className="marco pt-10">
          <p className="kicker">Tienda</p>
          <h1 className="mt-2 font-display text-[length:var(--text-titulo)] font-light leading-tight text-marfil">
            Skincare &amp; K-Beauty
          </h1>
        </div>

        <Catalogo categoriaInicial={categoriaDesdeParam(params.categoria)} />
      </main>

      <CartDrawer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogoJsonLd()) }}
      />
    </>
  );
}
