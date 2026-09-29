"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { linkWhatsApp } from "@/lib/site";
import { mensajeWhatsAppDe, productoEstrella } from "@/data/productos";
import TrustBadges from "./TrustBadges";

/**
 * Hero. Entrada escalonada con Framer Motion: badge, título, subtítulo,
 * botones y badges de confianza aparecen uno tras otro, no todos de golpe.
 *
 * Sin foto de fondo: un degradé con dos halos (dorado y verde botánico) que
 * evoca la luz sobre una piel hidratada. Cuando haya fotografía de producto
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
      className="relative flex min-h-[88vh] items-center overflow-hidden pt-[104px]"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-noche">
        <div className="absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-champan/15 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 h-[420px] w-[420px] rounded-full bg-vetiver/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-noche to-transparent" />
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
            className="inline-flex items-center gap-2 rounded-full border border-champan/40 bg-white/5 px-4 py-2 text-sm text-champan backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Skincare &amp; K-Beauty Premium en Uruguay
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[length:var(--text-hero)] font-light leading-[0.95] tracking-[-0.01em] text-marfil"
          >
            Piel de cristal{" "}
            <span className="italic text-champan">en 3 pasos</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[46ch] text-[1.05rem] leading-relaxed text-arena"
          >
            La rutina coreana que limpia, trata e hidrata tu piel en menos de
            cinco minutos. Luminosa, sin brillo y profundamente hidratada.
          </motion.p>

          <motion.div
            variants={item}
            className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={`/producto/${kit.id}`}
              className="rounded-full bg-champan px-8 py-4 text-center font-semibold text-noche transition-transform duration-200 hover:scale-[1.02] hover:bg-oro-claro active:scale-[0.99]"
            >
              Quiero el Kit 3 Pasos
            </Link>
            <a
              href={linkWhatsApp(mensajeWhatsAppDe(kit))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-center text-marfil backdrop-blur-md transition-colors hover:border-vetiver hover:text-vetiver"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Asesoría por WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-14 max-w-4xl">
          <TrustBadges />
        </motion.div>
      </motion.div>
    </section>
  );
}
