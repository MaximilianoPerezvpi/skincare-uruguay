"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categorias, productos, type Categoria } from "@/data/productos";
import TarjetaProducto from "./TarjetaProducto";

/** Tienda completa con filtro por categoría. Los destacados van primero. */
export default function Catalogo({
  categoriaInicial = "todos",
}: {
  categoriaInicial?: Categoria | "todos";
}) {
  const [categoria, setCategoria] = useState<Categoria | "todos">(categoriaInicial);

  const visibles = useMemo(
    () =>
      productos
        .filter((p) => categoria === "todos" || p.categoria === categoria)
        .sort((a, b) => Number(!!b.destacado) - Number(!!a.destacado)),
    [categoria],
  );

  return (
    <section className="marco py-10 md:py-14">
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        {categorias.map((c) => {
          const activa = c.id === categoria;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={activa}
              onClick={() => setCategoria(c.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                activa
                  ? "border-champan bg-champan text-noche"
                  : "border-borde text-arena hover:border-champan/50 hover:text-marfil"
              }`}
            >
              {c.etiqueta}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibles.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <TarjetaProducto producto={p} prioridad={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibles.length === 0 && (
        <p className="mt-10 text-arena">No hay productos en esta categoría todavía.</p>
      )}
    </section>
  );
}
