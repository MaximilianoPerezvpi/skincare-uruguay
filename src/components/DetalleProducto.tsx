"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import {
  ahorro,
  hayStock,
  mensajeWhatsAppDe,
  type Producto,
} from "@/data/productos";
import { useCarrito } from "@/lib/cartStore";
import { precio } from "@/lib/format";
import { linkWhatsApp } from "@/lib/site";
import TarjetaProducto from "./TarjetaProducto";
import ImagenProducto from "./ImagenProducto";

const CONFIANZA = [
  "✨ Testeado dermatológicamente",
  "🚚 DAC a todo Uruguay (24-48 hs)",
  "💳 Hasta 12 cuotas",
] as const;

/** Página de un producto: imagen grande, ficha completa y selector de cantidad. */
export default function DetalleProducto({
  producto,
  relacionados,
}: {
  producto: Producto;
  relacionados: Producto[];
}) {
  const agregar = useCarrito((e) => e.agregar);
  const enCarrito = useCarrito(
    (e) => e.items.find((i) => i.id === producto.id)?.cantidad ?? 0,
  );

  const disponible = hayStock(producto);
  const restante = Math.max(0, producto.stock - enCarrito);
  const descuento = ahorro(producto);

  const [cantidad, setCantidad] = useState(1);

  // Si ya tenés casi todo el stock en el carrito, el selector no puede pedir
  // más de lo que queda: se recorta solo cuando `restante` cambia.
  useEffect(() => {
    setCantidad((c) => Math.min(Math.max(c, 1), Math.max(restante, 1)));
  }, [restante]);

  // Barra fija de compra (solo mobile): aparece cuando el botón principal
  // de "Añadir al carrito" sale de la pantalla al scrollear.
  const botonPrincipalRef = useRef<HTMLDivElement>(null);
  const [mostrarBarraFija, setMostrarBarraFija] = useState(false);

  useEffect(() => {
    const el = botonPrincipalRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entrada]) => setMostrarBarraFija(!entrada.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function agregarAlCarrito() {
    agregar(producto.id, cantidad);
    setCantidad(1);
  }

  return (
    <>
      <div className="marco pt-10">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-arena transition-colors hover:text-marfil"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
            <path
              d="M15 5l-7 7 7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Volver a la tienda
        </Link>
      </div>

      <section className="marco grid gap-10 py-8 md:py-14 lg:grid-cols-2 lg:gap-16">
        {/* Imagen principal */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-borde bg-humo">
          <ImagenProducto
            producto={producto}
            prioridad
            sizes="(max-width: 1024px) 92vw, 46vw"
            className={`object-cover ${disponible ? "" : "opacity-40 grayscale"}`}
          />
          {producto.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-nude px-3 py-1 text-micro font-semibold text-marfil">
              {producto.badge}
            </span>
          )}
          {!disponible && (
            <span className="absolute inset-x-0 bottom-0 bg-noche/85 py-2 text-center text-micro text-marfil">
              Sin stock por ahora
            </span>
          )}
        </div>

        {/* Ficha */}
        <div className="flex flex-col">
          <p className="kicker">{producto.categoria}</p>
          <h1 className="mt-2 font-display text-[length:var(--text-titulo)] font-light leading-[1.05] text-marfil">
            {producto.nombre}
          </h1>
          {producto.subtitulo && (
            <p className="mt-2 text-vetiver">{producto.subtitulo}</p>
          )}
          <p className="cifras mt-1 text-sm text-arena">{producto.contenido}</p>

          <p className="mt-5 max-w-[52ch] leading-relaxed text-arena">
            {producto.descripcion}
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="cifras text-3xl text-champan">{precio(producto.precio)}</p>
            {producto.precioAnterior && (
              <p className="cifras text-lg text-arena line-through">
                {precio(producto.precioAnterior)}
              </p>
            )}
            {descuento > 0 && (
              <span className="rounded-full bg-vetiver/15 px-3 py-1 text-micro font-medium text-vetiver">
                Ahorrás {precio(descuento)}
              </span>
            )}
          </div>

          {/* Pasos del kit */}
          {producto.pasos && (
            <ol className="mt-6 grid gap-2 sm:grid-cols-3">
              {producto.pasos.map((paso) => (
                <li
                  key={paso}
                  className="rounded-2xl border border-borde bg-carbon px-4 py-3 text-sm text-marfil"
                >
                  {paso}
                </li>
              ))}
            </ol>
          )}

          {/* Selector de cantidad + agregar */}
          <div ref={botonPrincipalRef} className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-borde">
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                disabled={cantidad <= 1}
                aria-label="Restar una unidad"
                className="h-12 w-12 text-lg text-arena transition-colors hover:text-marfil disabled:opacity-30 disabled:hover:text-arena"
              >
                −
              </button>
              <span className="cifras w-8 text-center text-marfil">{cantidad}</span>
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.min(restante, c + 1))}
                disabled={cantidad >= restante}
                aria-label="Sumar una unidad"
                className="h-12 w-12 text-lg text-arena transition-colors hover:text-marfil disabled:opacity-30 disabled:hover:text-arena"
              >
                +
              </button>
            </div>

            <motion.button
              type="button"
              disabled={!disponible || restante <= 0}
              onClick={agregarAlCarrito}
              whileTap={disponible && restante > 0 ? { scale: 0.97 } : undefined}
              className="h-12 min-w-[12rem] flex-1 rounded-full bg-champan px-8 font-semibold text-noche transition-colors hover:bg-oro-claro disabled:cursor-not-allowed disabled:bg-borde disabled:text-arena"
            >
              {!disponible
                ? "Sin stock"
                : restante <= 0
                  ? `Ya tenés ${enCarrito} en el carrito`
                  : "Añadir al carrito"}
            </motion.button>
          </div>

          <a
            href={linkWhatsApp(mensajeWhatsAppDe(producto))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-vetiver/50 px-8 text-vetiver transition-colors hover:bg-vetiver/10"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Consultar por WhatsApp
          </a>

          {/* Beneficios */}
          <div className="mt-8 rounded-2xl border border-borde bg-carbon p-5">
            <h2 className="text-micro uppercase tracking-[0.2em] text-arena">
              Beneficios
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {producto.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-marfil">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-vetiver" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-borde pt-4 text-sm text-arena">
              <span className="text-marfil">Tipo de piel:</span> {producto.tipoPiel}
            </p>
          </div>

          {/* Insignias de confianza */}
          <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-borde bg-borde sm:grid-cols-3">
            {CONFIANZA.map((texto) => (
              <li key={texto} className="bg-carbon px-4 py-4 text-center text-sm text-marfil">
                {texto}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="marco border-t border-borde py-16 md:py-20">
          <h2 className="font-display text-[length:var(--text-medio)] font-light text-marfil">
            Completá tu rutina
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((p) => (
              <TarjetaProducto key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}

      {/* Barra fija de compra: solo mobile, solo cuando el botón principal
          ya no está a la vista. */}
      <AnimatePresence>
        {mostrarBarraFija && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-4 border-t border-borde bg-carbon/95 px-4 py-3 backdrop-blur-md md:hidden"
          >
            <div className="min-w-0">
              <p className="truncate text-micro text-arena">{producto.nombre}</p>
              <p className="cifras text-lg text-champan">{precio(producto.precio)}</p>
            </div>
            <button
              type="button"
              disabled={!disponible || restante <= 0}
              onClick={agregarAlCarrito}
              className="shrink-0 rounded-full bg-champan px-6 py-3 text-sm font-semibold text-noche transition-colors hover:bg-oro-claro disabled:cursor-not-allowed disabled:bg-borde disabled:text-arena"
            >
              {!disponible ? "Sin stock" : restante <= 0 ? "En el carrito" : "Añadir al carrito"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
