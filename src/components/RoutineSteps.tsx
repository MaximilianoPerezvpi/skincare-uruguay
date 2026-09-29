"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { productoEstrella } from "@/data/productos";

/**
 * La rutina en 3 pasos, interactiva: tocás un paso (o esperás, avanza solo)
 * y el panel muestra qué hace y por qué va en ese orden. El avance automático
 * se frena apenas la persona interactúa, y no existe con movimiento reducido.
 */
const PASOS = [
  {
    numero: "01",
    verbo: "Limpiar",
    producto: "Limpiador Gel Suave pH Balanceado",
    resumen: "Remueve impurezas y exceso de sebo.",
    detalle:
      "Un gel de pH 5.5 que arrastra suciedad, sebo y restos de protector sin dejar la piel tirante. Es la base: sobre una piel limpia, todo lo que sigue penetra mejor.",
    tiempo: "60 segundos",
  },
  {
    numero: "02",
    verbo: "Tratar",
    producto: "Serum de Ácido Hialurónico",
    resumen: "El serum penetra las capas profundas.",
    detalle:
      "Moléculas de hialurónico de distinto tamaño atraen agua a las capas más profundas de la piel. Es el paso que cambia la textura y le da ese brillo de piel de cristal.",
    tiempo: "2-3 gotas",
  },
  {
    numero: "03",
    verbo: "Hidratar",
    producto: "Crema Hidratante",
    resumen: "Sella la humedad y protege la barrera cutánea.",
    detalle:
      "La crema cierra la rutina: sella el agua que aportó el serum y refuerza la barrera cutánea para que la piel se mantenga hidratada y calma durante todo el día.",
    tiempo: "Mañana y noche",
  },
] as const;

const INTERVALO_MS = 5000;

export default function RoutineSteps() {
  const [activo, setActivo] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sinMovimiento = useReducedMotion();
  const kit = productoEstrella();

  useEffect(() => {
    if (!autoplay || sinMovimiento) return;
    const t = setInterval(() => setActivo((i) => (i + 1) % PASOS.length), INTERVALO_MS);
    return () => clearInterval(t);
  }, [autoplay, sinMovimiento]);

  function elegir(i: number) {
    setAutoplay(false);
    setActivo(i);
  }

  const paso = PASOS[activo];

  return (
    <section id="rutina" className="scroll-mt-24 py-20 md:py-28">
      <div className="marco">
        <div className="max-w-2xl">
          <p className="kicker">La rutina</p>
          <h2 className="mt-2 font-display text-[length:var(--text-titulo)] font-light leading-tight text-marfil">
            Cómo funciona tu rutina coreana
          </h2>
          <p className="mt-4 max-w-[52ch] text-arena">
            Tres pasos, en este orden, mañana y noche. Cada uno prepara la piel
            para el siguiente.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
          {/* Selector de pasos */}
          <div role="tablist" aria-label="Pasos de la rutina" className="flex flex-col gap-3">
            {PASOS.map((p, i) => {
              const seleccionado = i === activo;
              return (
                <button
                  key={p.numero}
                  type="button"
                  role="tab"
                  id={`paso-tab-${i}`}
                  aria-selected={seleccionado}
                  aria-controls="paso-panel"
                  onClick={() => elegir(i)}
                  className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-colors ${
                    seleccionado
                      ? "border-champan/50 bg-carbon"
                      : "border-borde bg-transparent hover:border-champan/30 hover:bg-carbon/60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`cifras flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-display text-xl ${
                        seleccionado
                          ? "border-champan bg-champan text-noche"
                          : "border-borde text-arena"
                      }`}
                    >
                      {p.numero}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[1.5rem] leading-tight text-marfil">
                        {p.verbo}
                      </p>
                      <p className="text-sm text-arena">{p.resumen}</p>
                    </div>
                  </div>

                  {/* Barra de progreso del autoplay */}
                  {seleccionado && autoplay && !sinMovimiento && (
                    <motion.span
                      key={`progreso-${activo}`}
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVALO_MS / 1000, ease: "linear" }}
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-champan/70"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel del paso activo */}
          <div
            id="paso-panel"
            role="tabpanel"
            aria-labelledby={`paso-tab-${activo}`}
            className="relative overflow-hidden rounded-3xl border border-borde bg-carbon p-8 md:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-vetiver/10 blur-[90px]"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={paso.numero}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
              >
                <p className="kicker text-vetiver">Paso {paso.numero}</p>
                <h3 className="mt-3 font-display text-[2.5rem] font-light leading-none text-marfil">
                  {paso.verbo}
                </h3>
                <p className="mt-2 text-champan">{paso.producto}</p>
                <p className="mt-6 max-w-[48ch] leading-relaxed text-arena">
                  {paso.detalle}
                </p>
                <p className="mt-6 inline-flex rounded-full border border-cristal/15 px-4 py-1.5 text-micro text-cristal">
                  {paso.tiempo}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Indicador de posición */}
            <div className="relative mt-10 flex items-center justify-between gap-4 border-t border-borde pt-6">
              <div className="flex gap-2" aria-hidden>
                {PASOS.map((p, i) => (
                  <span
                    key={p.numero}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activo ? "w-8 bg-champan" : "w-3 bg-borde"
                    }`}
                  />
                ))}
              </div>
              <Link
                href={`/producto/${kit.id}`}
                className="text-sm text-champan underline-offset-4 hover:underline"
              >
                Los 3 pasos en un kit →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
