# Glass Skin UY

Tienda de Skincare & K-Beauty premium para Uruguay, enfocada en la venta del
Kit Rutina Coreana Glass Skin (3 pasos). Next.js 15 (App Router) + Tailwind v4 +
Framer Motion + Zustand, con checkout de Mercado Pago Uruguay (UYU).
Pensado para deployear en Vercel.

## Arrancar

```bash
npm install
cp .env.example .env.local   # y completá las credenciales
npm run dev                  # http://localhost:3000
```

## Variables de entorno

| Variable | Qué es |
| --- | --- |
| `MP_ACCESS_TOKEN` | Access Token de Mercado Pago. TEST mientras probás, producción al publicar. Nunca lo subas al repo. |
| `NEXT_PUBLIC_SITE_URL` | URL pública sin barra final. En local `http://localhost:3000`. |

## Lo primero que tenés que editar

| Qué | Dónde |
| --- | --- |
| Productos, precios (UYU), stock, pasos del kit | `src/data/productos.ts` |
| Fotos de producto | `public/productos/<id>.webp` + campo `imagen` |
| Nombre de marca, WhatsApp, Instagram, dominio | `src/lib/site.ts` |
| Pasos de la rutina (portada) | `src/components/RoutineSteps.tsx` |
| Badges de confianza | `src/components/TrustBadges.tsx` |
| Formas de pago y envíos | `src/components/Envios.tsx` |
| Testimonios (hoy son placeholders) | `src/components/Testimonios.tsx` |
| Paleta y tipografías | `src/app/globals.css` (bloque `@theme`) |

Buscá `TODO` en el proyecto: marqué cada dato que es placeholder.

## Cómo funciona la compra

```
Tarjeta / Kit → "Agregar al carrito"     (Zustand, guarda id + cantidad)
              → CartDrawer               (total en UYU)
              → CheckoutModal            (datos de envío)
              → POST /api/checkout       (el servidor RECALCULA precios y stock)
              → Preference de Mercado Pago (currency_id: "UYU", hasta 12 cuotas)
              → /compra/exito | /compra/pendiente | /compra/error
```

- **El navegador nunca manda precios.** El carrito guarda solo `id` y
  `cantidad`; `/api/checkout` busca cada producto en `productos.ts` y arma la
  preferencia con el precio real en pesos uruguayos.
- **`binary_mode: false`.** Abitab y Redpagos generan un pago *pendiente*; con
  `binary_mode: true` Mercado Pago los rechazaría.

### Pendiente para operar en serio

1. **Webhook** en `/api/webhooks/mercadopago` (la `notification_url` ya apunta ahí).
2. **Stock real**: hoy vive en `productos.ts` y se descuenta a mano.
3. **Costo de envío**: el checkout cobra solo los productos; el envío no se suma.

## WhatsApp

Número: +598 097 443 176 (`site.whatsapp = "59897443176"`). El botón flotante
usa el mensaje del producto cuando estás en su ficha; el kit tiene su mensaje
propio en `mensajeWhatsApp`:

> Hola! Quisiera más información sobre el Kit Rutina Coreana 3 Pasos y cómo comprarlo.
