"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { linkWhatsApp } from "@/lib/site";
import { mensajeWhatsAppDe, productoEstrella } from "@/data/productos";

/**
 * Hero. Entrada escalonada con Framer Motion: badge, título, subtítulo y
 * botones aparecen uno tras otro, no todos de golpe. La barra de garantías
 * (TrustBadges) va justo debajo, como tira propia en page.tsx.
 *
 * Sin foto de fondo: degradé marfil → nude pastel → blanco con dos halos
 * (rosé y verde botánico) que evocan la luz sobre una piel hidratada. Cuando haya fotografía de producto
 * propia, puede ir a la derecha en desktop.
 */
const contenedor: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  oculto: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const kit = productoEstrella();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[80vh] items-center overflow-hidden pt-[104px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEC] to-white"
      >
        <div className="absolute -right-24 top-16 h-[460px] w-[460px] rounded-full bg-nude/50 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/4 h-[380px] w-[380px] rounded-full bg-botanico/70 blur-[120px]" />
      </div>

      <motion.div
        initial="oculto"
        animate="visible"
        variants={contenedor}
        className="marco relative z-10 py-16 md:py-20"
      >
        <div className="max-w-[40ch]">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-[#E8D8CE]/40 px-4 py-2 text-micro font-medium tracking-[0.18em] text-[#2D2A26]"
          >
            <span aria-hidden>✨</span>
            RUTINA COREANA DE 3 PASOS
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[length:var(--text-hero)] font-light leading-[0.95] tracking-[-0.01em] text-marfil"
          >
            Descubre el efecto{" "}
            <span className="italic text-cristal">Glass Skin</span> en tu piel
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[46ch] text-[1.05rem] leading-relaxed text-arena"
          >
            Nutrición, hidratación profunda y luminosidad natural. Sin
            complicaciones ni pasos innecesarios.
          </motion.p>

          <motion.div
            variants={item}
            className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={`/producto/${kit.id}`}
              className="rounded-full bg-[#1A1A1A] px-8 py-4 text-center font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-black active:scale-[0.99]"
            >
              Quiero el Kit 3 Pasos
            </Link>
            <a
              href={linkWhatsApp(mensajeWhatsAppDe(kit))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/80 px-8 py-4 text-center text-[#1A1A1A] shadow-sm backdrop-blur-md transition-colors hover:border-vetiver hover:text-vetiver"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Asesoría por WhatsApp
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
