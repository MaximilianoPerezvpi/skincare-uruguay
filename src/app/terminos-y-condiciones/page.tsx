import type { Metadata } from "next";
import Header from "@/components/Header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: `Términos y condiciones de uso y compra en ${site.nombre}.`,
  alternates: { canonical: "/terminos-y-condiciones" },
};

const SECCIONES = [
  {
    titulo: "1. Quiénes somos",
    texto: `${site.nombre} es una tienda online de skincare y cosmética coreana (K-Beauty), con base en ${site.ciudad}, ${site.pais}. Vendemos productos sellados, con fecha de vencimiento vigente.`,
  },
  {
    titulo: "2. Precios y disponibilidad",
    texto:
      "Todos los precios están expresados en pesos uruguayos (UYU) e incluyen IVA. El stock que ves en cada ficha de producto se actualiza a medida que se procesan los pedidos; si un producto se agota entre que lo agregaste al carrito y confirmaste el pago, te lo vamos a avisar por WhatsApp o email antes de cobrarte.",
  },
  {
    titulo: "3. Compra y pago",
    texto:
      "El pago se procesa a través de Mercado Pago: tarjetas de crédito y débito (Visa, Mastercard, OCA), hasta 12 cuotas, o en efectivo por Abitab y Redpagos. Tus datos de tarjeta nunca pasan por nuestro servidor: los maneja directamente Mercado Pago.",
  },
  {
    titulo: "4. Envíos",
    texto:
      "Envíos a todo el país vía DAC (24-48 hs hábiles). Los tiempos y costos de envío se detallan en la Política de Envíos. El costo se calcula según tu departamento en el paso de checkout, antes de confirmar el pago.",
  },
  {
    titulo: "5. Devoluciones y garantía",
    texto:
      "Tenés 7 días desde que recibís el pedido para devolver un producto sin abrir y con su sello intacto. Si un producto llega dañado o vencido, te lo cambiamos o te devolvemos el dinero.",
  },
  {
    titulo: "6. Uso de los productos",
    texto:
      "Los productos son cosméticos de uso externo y no reemplazan un tratamiento médico. Antes del primer uso, recomendamos hacer una prueba en una zona pequeña de la piel (por ejemplo, detrás de la oreja) durante 24 horas. Si notás irritación, suspendé el uso y consultá a tu dermatólogo.",
  },
  {
    titulo: "7. Limitación de responsabilidad",
    texto:
      "Hacemos lo posible por describir cada producto con precisión (activos, contenido, modo de uso). Pequeñas variaciones de lote entre lo que ves en fotos y el envase físico no constituyen un defecto. Los resultados varían según cada piel y la constancia de la rutina.",
  },
  {
    titulo: "8. Legislación aplicable",
    texto: `Estos términos se rigen por las leyes de ${site.pais}. Cualquier disputa se resuelve ante los tribunales competentes de ${site.ciudad}.`,
  },
] as const;

export default function PaginaTerminos() {
  return (
    <>
      <Header />
      <main id="contenido" className="pt-[104px]">
        <div className="marco max-w-[68ch] py-14 md:py-20">
          <p className="kicker">Legal</p>
          <h1 className="mt-2 font-display text-[length:var(--text-titulo)] font-light leading-tight text-marfil">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-sm text-arena">
            Última actualización: septiembre de 2026.
          </p>

          <div className="mt-10 flex flex-col gap-8">
            {SECCIONES.map((s) => (
              <div key={s.titulo}>
                <h2 className="font-display text-[1.15rem] font-light text-marfil">
                  {s.titulo}
                </h2>
                <p className="mt-2 leading-relaxed text-arena">{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
