import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** Imagen para compartir (WhatsApp, redes), generada en build: sin assets sueltos. */
export const alt = `${site.nombre} — Skincare & K-Beauty Premium en Uruguay`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background:
            "radial-gradient(circle at 80% 30%, #E8D8CE 0%, #FAF8F5 60%)",
          color: "#2D2A26",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#4E7A5C" }}>
          K-BEAUTY · URUGUAY
        </div>
        <div style={{ fontSize: 92, marginTop: 24 }}>{site.nombre}</div>
        <div
          style={{ fontSize: 40, marginTop: 16, color: "#8C6A5A", fontStyle: "italic" }}
        >
          Rutina Coreana Glass Skin en 3 pasos
        </div>
        <div style={{ fontSize: 28, marginTop: 40, color: "#6B645D" }}>
          Envíos a todo Uruguay por DAC · Hasta 12 cuotas con Mercado Pago
        </div>
      </div>
    ),
    size,
  );
}
