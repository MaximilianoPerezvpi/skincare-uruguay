import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { site } from "@/lib/site";
import BotonFlotanteWhatsApp from "@/components/BotonFlotanteWhatsApp";
import Footer from "@/components/Footer";
import "./globals.css";

/* Cormorant Garamond para títulos: serif fina y luminosa, el registro de
   las marcas de skincare de lujo. */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-familia",
});

/* Manrope para interfaz y cuerpo: geométrica limpia, aire clínico. */
const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-familia",
});

const TITULO_COMPARTIR = `${site.nombre} | Skincare & K-Beauty Premium en Uruguay`;
const DESCRIPCION_COMPARTIR =
  "Kit Rutina Coreana Glass Skin en 3 pasos. Fórmulas testeadas dermatológicamente, envíos por DAC a todo Uruguay y hasta 12 cuotas con Mercado Pago.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITULO_COMPARTIR,
    template: `%s | ${site.nombre}`,
  },
  description: DESCRIPCION_COMPARTIR,
  keywords: [
    "skincare Uruguay",
    "k-beauty Uruguay",
    "rutina coreana",
    "glass skin",
    "cosmética coreana Montevideo",
    "serum niacinamida Uruguay",
    "ácido hialurónico",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: site.url,
    siteName: site.nombre,
    title: TITULO_COMPARTIR,
    description: DESCRIPCION_COMPARTIR,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO_COMPARTIR,
    description: DESCRIPCION_COMPARTIR,
  },
  robots: { index: true, follow: true },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#0F0F11",
  colorScheme: "dark",
};

/* Datos estructurados: le dicen a Google que esto es una tienda real con
   ubicación y horarios. Es lo que habilita los resultados enriquecidos. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.nombre,
  description: site.descripcion,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  sameAs: [site.instagramUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.ciudad,
    addressCountry: "UY",
  },
  areaServed: { "@type": "Country", name: "Uruguay" },
  priceRange: "$$",
  currenciesAccepted: "UYU",
  paymentAccepted: "Mercado Pago, Tarjetas de crédito y débito, Abitab, Redpagos",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-UY" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}

        {/* Montados una sola vez acá (antes se repetían en cada página). */}
        <Footer />
        <BotonFlotanteWhatsApp />

        {/* Toasts de confirmación (agregar al carrito, etc.), con la paleta del sitio. */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--color-carbon)",
              color: "var(--color-marfil)",
              border: "1px solid var(--color-borde)",
            },
            descriptionClassName: "!text-arena",
          }}
          icons={{ success: "✓" }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
