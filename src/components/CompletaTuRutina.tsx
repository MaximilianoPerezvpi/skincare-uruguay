import Link from "next/link";
import { productos } from "@/data/productos";
import TarjetaProducto from "./TarjetaProducto";

/** Cross-selling: los productos individuales, para reponer o armar la rutina a medida. */
export default function CompletaTuRutina() {
  const individuales = productos.filter((p) => p.categoria !== "Kits");

  return (
    <section className="py-20 md:py-28">
      <div className="marco">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="kicker">Productos individuales</p>
            <h2 className="mt-2 font-display text-[length:var(--text-titulo)] font-light leading-tight text-marfil">
              Completá o reponé tu rutina
            </h2>
            <p className="mt-4 max-w-[52ch] text-arena">
              Sumá un tratamiento específico o reponé solo el paso que se te
              terminó.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="text-sm text-champan underline-offset-4 hover:underline"
          >
            Ver toda la tienda →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {individuales.map((p) => (
            <TarjetaProducto key={p.id} producto={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
