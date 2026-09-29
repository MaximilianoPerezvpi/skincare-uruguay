"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import {
  ahorro,
  hayStock,
  mensajeWhatsAppDe,
  productoEstrella,
} from "@/data/productos";
import { useCarrito } from "@/lib/cartStore";
import { precio } from "@/lib/format";
import { linkWhatsApp } from "@/lib/site";
import ImagenProducto from "./ImagenProducto";

/**
 * El producto estrella en grande: el kit de alto ticket es la venta que más
 * importa, así que tiene su propia sección con precio tachado, ahorro, los
 * pasos que incluye y dos salidas claras (carrito o WhatsApp).
 */
export default function KitDestacado() {
  const kit = productoEstrella();
  const agregar = useCarrito((e) => e.agregar);
  const disponible = hayStock(kit);
  const descuento = ahorro(kit);

  return (
    <section id="kit" className="scroll-mt-24 py-20 md:py-28">
      <div className="marco">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid overflow-hidden rounded-3xl border border-champan/30 bg-carbon lg:grid-cols-2"
        >
          <div className="relative aspect-square bg-humo lg:aspect-auto lg:min-h-[560px]">
            <ImagenProducto
              producto={kit}
              sizes="(max-width: 1024px) 92vw, 50vw"
              className="object-cover"
            />
            {kit.badge && (
              <span className="absolute left-5 top-5 rounded-full bg-champan px-4 py-1.5 text-micro font-semibold text-noche">
                {kit.badge}
              </span>
            )}
          </div>

          <div className="flex flex-col p-8 md:p-12">
            <p className="kicker">Producto estrella</p>
            <h2 className="mt-3 font-display text-[length:var(--text-titulo)] font-light leading-tight text-marfil">
              {kit.nombre}
            </h2>
            {kit.subtitulo && <p className="mt-2 text-vetiver">{kit.subtitulo}</p>}

            <p className="mt-5 max-w-[52ch] leading-relaxed text-arena">
              {kit.descripcion}
            </p>

            {kit.pasos && (
              <ol className="mt-6 grid gap-2 sm:grid-cols-3">
                {kit.pasos.map((paso) => (
                  <li
                    key={paso}
                    className="rounded-xl border border-borde bg-noche/60 px-4 py-3 text-sm text-marfil"
                  >
                    {paso}
                  </li>
                ))}
              </ol>
            )}

            <ul className="mt-6 flex flex-col gap-2">
              {kit.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-arena">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-vetiver" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="cifras text-4xl text-champan">{precio(kit.precio)}</p>
              {kit.precioAnterior && (
                <p className="cifras text-lg text-arena line-through">
                  {precio(kit.precioAnterior)}
                </p>
              )}
              {descuento > 0 && (
                <span className="rounded-full bg-vetiver/15 px-3 py-1 text-micro font-medium text-vetiver">
                  Ahorrás {precio(descuento)}
                </span>
              )}
            </div>
            <p className="mt-1 text-micro text-arena">
              Hasta 12 cuotas con Mercado Pago · Envío por DAC a todo Uruguay
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                disabled={!disponible}
                onClick={() => agregar(kit.id)}
                whileTap={disponible ? { scale: 0.97 } : undefined}
                className="flex-1 rounded-full bg-champan px-8 py-4 font-semibold text-noche transition-colors hover:bg-oro-claro disabled:cursor-not-allowed disabled:bg-borde disabled:text-arena"
              >
                {disponible ? "Agregar el kit al carrito" : "Sin stock por ahora"}
              </motion.button>
              <a
                href={linkWhatsApp(mensajeWhatsAppDe(kit))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-vetiver/50 px-8 py-4 text-vetiver transition-colors hover:bg-vetiver/10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Consultar por WhatsApp
              </a>
            </div>

            <Link
              href={`/producto/${kit.id}`}
              className="mt-5 text-sm text-arena underline-offset-4 transition-colors hover:text-marfil hover:underline"
            >
              Ver ficha completa del kit
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
