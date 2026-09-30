/**
 * Barra de garantías: tira horizontal crema justo debajo del Hero. Responde
 * las tres objeciones que frenan una compra de skincare online ("¿me va a
 * hacer mal?", "¿cuándo llega?", "¿puedo pagar en cuotas?") de un vistazo.
 */
const BADGES = [
  { icono: "🌸", texto: "Apto para todo tipo de pieles" },
  { icono: "🚚", texto: "Envíos a todo Uruguay por DAC (24-48 hs)" },
  { icono: "💳", texto: "Hasta 12 cuotas sin recargo por Mercado Pago" },
] as const;

export default function TrustBadges() {
  return (
    <section aria-label="Por qué comprarnos" className="border-y border-stone-200 bg-[#F7F4EF]">
      <ul className="marco grid gap-3 py-5 sm:grid-cols-3 sm:gap-6">
        {BADGES.map((b) => (
          <li key={b.texto} className="flex items-center gap-3 sm:justify-center">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-base shadow-sm"
            >
              {b.icono}
            </span>
            <span className="text-sm leading-snug text-marfil">{b.texto}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
