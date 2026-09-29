"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ahorro, hayStock, type Producto } from "@/data/productos";
import { useCarrito } from "@/lib/cartStore";
import { precio } from "@/lib/format";
import ImagenProducto from "./ImagenProducto";

/**
 * Tarjeta de producto. Un solo botón y una sola decisión: agregar al carrito.
 */
export default function TarjetaProducto({
  producto,
  prioridad = false,
}: {
  producto: Producto;
  /** true en las primeras tarjetas: le dice a next/image que las cargue ya. */
  prioridad?: boolean;
}) {
  const agregar = useCarrito((e) => e.agregar);
  const enCarrito = useCarrito(
    (e) => e.items.find((i) => i.id === producto.id)?.cantidad ?? 0,
  );

  const disponible = hayStock(producto);
  const sinMasStock = enCarrito >= producto.stock;
  const descuento = ahorro(producto);

  // "¡Agregado!" en el botón por un instante, antes de que aparezca el
  // toast: la confirmación se ve en el mismo lugar donde hiciste clic.
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (!agregado) return;
    const t = setTimeout(() => setAgregado(false), 1200);
    return () => clearTimeout(t);
  }, [agregado]);

  function manejarAgregar() {
    agregar(producto.id);
    setAgregado(true);
  }

  return (
    <motion.article
      layout
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-carbon transition-all duration-300 hover:-translate-y-1 hover:glow-oro ${
        producto.destacado
          ? "border border-champan/35"
          : "border border-borde hover:border-oro-vivo/40"
      }`}
    >
      <Link
        href={`/producto/${producto.id}`}
        aria-label={`Ver ${producto.nombre}`}
        className="relative block aspect-square overflow-hidden bg-humo"
      >
        <ImagenProducto
          producto={producto}
          prioridad={prioridad}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 300px"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            disponible ? "" : "opacity-40 grayscale"
          }`}
        />

        {producto.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-champan px-3 py-1 text-micro font-semibold text-noche">
            {producto.badge}
          </span>
        )}

        <span className="absolute bottom-3 left-3 rounded-full border border-cristal/20 bg-noche/70 px-3 py-1 text-micro text-cristal backdrop-blur-sm">
          {producto.categoria}
        </span>

        {!disponible && (
          <span className="absolute inset-x-0 bottom-0 bg-noche/85 py-2 text-center text-micro text-marfil">
            Sin stock por ahora
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[1.4rem] leading-tight text-marfil">
          <Link
            href={`/producto/${producto.id}`}
            className="transition-colors hover:text-champan"
          >
            {producto.nombre}
          </Link>
        </h3>
        {producto.subtitulo && (
          <p className="mt-1 text-sm text-vetiver">{producto.subtitulo}</p>
        )}
        <p className="cifras mt-1 text-micro text-arena">{producto.contenido}</p>

        <p className="mt-3 text-sm leading-relaxed text-arena">
          {producto.descripcion}
        </p>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <p className="cifras text-2xl text-champan">{precio(producto.precio)}</p>
            {producto.precioAnterior && (
              <p className="cifras text-sm text-arena line-through">
                {precio(producto.precioAnterior)}
              </p>
            )}
          </div>
          {descuento > 0 && (
            <p className="mt-1 text-micro text-vetiver">Ahorrás {precio(descuento)}</p>
          )}

          <motion.button
            type="button"
            disabled={!disponible || sinMasStock}
            onClick={manejarAgregar}
            whileTap={disponible && !sinMasStock ? { scale: 0.95 } : undefined}
            className={`mt-4 w-full overflow-hidden rounded-full border py-3 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_var(--color-oro-vivo)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:border-borde disabled:bg-transparent disabled:text-arena disabled:shadow-none ${
              agregado
                ? "border-vetiver bg-vetiver text-noche"
                : "border-transparent bg-champan font-semibold text-noche hover:bg-oro-claro"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={agregado ? "ok" : "label"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {agregado
                  ? "¡Agregado!"
                  : !disponible
                    ? "Sin stock"
                    : sinMasStock
                      ? `Ya tenés ${enCarrito} en el carrito`
                      : "Agregar al carrito"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
