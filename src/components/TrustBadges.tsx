/**
 * Badges de confianza para Uruguay: las tres objeciones que frenan una compra
 * de skincare online ("¿me va a hacer mal?", "¿cuándo llega?", "¿puedo pagar
 * en cuotas?"), resueltas de un vistazo. Se usa al pie del Hero.
 */
const BADGES = [
  { icono: "✨", texto: "Fórmulas Testeadas Dermatológicamente" },
  { icono: "🚚", texto: "Envíos a todo Uruguay por DAC (24-48 hs)" },
  { icono: "💳", texto: "Hasta 12 Cuotas con Mercado Pago" },
] as const;

export default function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid gap-3 sm:grid-cols-3 ${className}`}
      aria-label="Por qué comprarnos"
    >
      {BADGES.map((b) => (
        <li
          key={b.texto}
          className="flex items-center gap-3 rounded-2xl border border-cristal/10 bg-white/[0.03] px-4 py-3 backdrop-blur-md"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champan/30 bg-noche text-base"
          >
            {b.icono}
          </span>
          <span className="text-sm leading-snug text-marfil">{b.texto}</span>
        </li>
      ))}
    </ul>
  );
}
