"use client";

import { useEffect, useMemo, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import { buscarProducto, type Producto } from "@/data/productos";

/**
 * CARRITO (Zustand + localStorage)
 *
 * Decisión importante: en localStorage se guardan SOLO `id` y `cantidad`.
 * Nada de precios ni nombres. Si mañana cambiás un precio en `productos.ts`,
 * el carrito de alguien que lo abrió la semana pasada se actualiza solo, y
 * nadie puede editar el localStorage para pagar menos (igual el servidor
 * recalcula todo en /api/checkout).
 */

export type ItemCarrito = {
  id: string;
  cantidad: number;
};

/** Item del carrito ya cruzado con el catálogo, listo para mostrar. */
export type LineaCarrito = {
  producto: Producto;
  cantidad: number;
  subtotal: number;
};

type EstadoCarrito = {
  items: ItemCarrito[];
  abierto: boolean;

  agregar: (id: string, cantidad?: number) => void;
  ajustarCantidad: (id: string, cantidad: number) => void;
  eliminar: (id: string) => void;
  vaciar: () => void;

  abrirCarrito: () => void;
  cerrarCarrito: () => void;
};

/** No deja pedir más unidades de las que hay en stock. */
function limitar(id: string, cantidad: number): number {
  const producto = buscarProducto(id);
  if (!producto) return 0;
  return Math.max(0, Math.min(cantidad, producto.stock));
}

export const useCarrito = create<EstadoCarrito>()(
  persist(
    (set) => ({
      items: [],
      abierto: false,

      agregar: (id, cantidad = 1) =>
        set((estado) => {
          const producto = buscarProducto(id);
          const existente = estado.items.find((i) => i.id === id);
          const nueva = limitar(id, (existente?.cantidad ?? 0) + cantidad);
          if (nueva === 0) return estado; // sin stock: no se agrega nada

          const items = existente
            ? estado.items.map((i) =>
                i.id === id ? { ...i, cantidad: nueva } : i,
              )
            : [...estado.items, { id, cantidad: nueva }];

          // Toast al toque + el carrito que se abre: la confirmación se ve
          // aunque la persona ya haya scrolleado lejos del botón.
          if (producto) {
            toast.success(`${producto.nombre} agregado al carrito`, {
              description: producto.subtitulo,
            });
          }

          return { items, abierto: true };
        }),

      ajustarCantidad: (id, cantidad) =>
        set((estado) => {
          const nueva = limitar(id, cantidad);
          return {
            items:
              nueva <= 0
                ? estado.items.filter((i) => i.id !== id)
                : estado.items.map((i) =>
                    i.id === id ? { ...i, cantidad: nueva } : i,
                  ),
          };
        }),

      eliminar: (id) =>
        set((estado) => ({
          items: estado.items.filter((i) => i.id !== id),
        })),

      vaciar: () => set({ items: [] }),

      abrirCarrito: () => set({ abierto: true }),
      cerrarCarrito: () => set({ abierto: false }),
    }),
    {
      name: "skincare-carrito",
      version: 3, // subilo si cambiás la forma de ItemCarrito: limpia carritos viejos
      storage: createJSONStorage(() => localStorage),
      // `abierto` es estado de interfaz: no tiene por qué sobrevivir al refresh.
      partialize: (estado) => ({ items: estado.items }),
    },
  ),
);

/**
 * Cruza el carrito con el catálogo. Descarta ids que ya no existen
 * (por ejemplo, un producto que sacaste del archivo de datos).
 */
export function useLineas(): LineaCarrito[] {
  const items = useCarrito((e) => e.items);

  return useMemo(
    () =>
      items.flatMap((item) => {
        const producto = buscarProducto(item.id);
        if (!producto) return [];
        return [
          {
            producto,
            cantidad: item.cantidad,
            subtotal: producto.precio * item.cantidad,
          },
        ];
      }),
    [items],
  );
}

/** Total en pesos uruguayos. */
export function useTotal(): number {
  const lineas = useLineas();
  return lineas.reduce((acc, l) => acc + l.subtotal, 0);
}

/** Cantidad de unidades, para el globito del header. */
export function useUnidades(): number {
  return useCarrito((e) => e.items.reduce((acc, i) => acc + i.cantidad, 0));
}

/**
 * El servidor no tiene localStorage, así que en el primer render el carrito
 * siempre está vacío. Este hook avisa cuándo terminó de leerse, para no
 * renderizar el contador antes y provocar un error de hidratación.
 */
export function useCarritoListo(): boolean {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    if (useCarrito.persist.hasHydrated()) setListo(true);
    return useCarrito.persist.onFinishHydration(() => setListo(true));
  }, []);

  return listo;
}
