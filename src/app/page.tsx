import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoutineSteps from "@/components/RoutineSteps";
import KitDestacado from "@/components/KitDestacado";
import CompletaTuRutina from "@/components/CompletaTuRutina";
import Testimonios from "@/components/Testimonios";
import Envios from "@/components/Envios";
import CartDrawer from "@/components/CartDrawer";
import { catalogoJsonLd } from "@/lib/jsonld";

/**
 * Home. Cada sección es un componente independiente: para reordenar la página
 * alcanza con mover una línea acá.
 *
 * Embudo: Hero (con badges de confianza) → cómo funciona la rutina → el kit
 * estrella → productos individuales (cross-selling) → prueba social → envíos.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <RoutineSteps />
        <KitDestacado />
        <CompletaTuRutina />
        <Testimonios />
        <Envios />
      </main>

      {/* Vive fuera de <main>: se monta una sola vez. */}
      <CartDrawer />

      {/* Precios y stock legibles por Google, generados desde productos.ts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogoJsonLd()) }}
      />
    </>
  );
}
