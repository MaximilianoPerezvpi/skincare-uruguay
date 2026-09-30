import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
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
 * Embudo: Hero → barra de garantías → cómo funciona la rutina → el kit
 * estrella → productos individuales (cross-selling) → prueba social → envíos.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <TrustBadges />
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
