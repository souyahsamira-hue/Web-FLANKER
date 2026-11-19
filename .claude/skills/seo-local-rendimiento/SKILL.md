---
name: seo-local-rendimiento
description: Úsala al preparar una web de cliente para Google y para que cargue rápido - etiquetas SEO, datos estructurados, SEO local, imágenes, caché, Lighthouse - y siempre antes de publicar o entregar.
---

# SEO local y rendimiento

## SEO en cada página
- `<html lang="es">`, `<title>` de 50–60 caracteres: "Nombre · tipo de negocio en Zona".
- Meta description de 140–160 caracteres con la zona y la acción principal.
- Un solo `<h1>` por página. Jerarquía de encabezados lógica.
- `<link rel="canonical">` con la URL definitiva (o la de Netlify mientras no haya dominio).
- Etiquetas Open Graph y Twitter con una foto real del local de 1200×630.
- Si hay versión en inglés: `hreflang` correcto.
- `robots.txt` y `sitemap.xml` con todas las páginas.
- Textos alternativos descriptivos en todas las imágenes ("Terraza de Flanker Bar en una calle peatonal de noche"), nunca "imagen1".

## Datos estructurados (JSON-LD)
Usa el tipo más específico: `Restaurant`, `BarOrPub`, `CafeOrCoffeeShop`, `HairSalon`, `AutoRepair`, `Dentist`… Incluye:
`name`, `image`, `logo`, `address` (PostalAddress completa), `geo`, `telephone`, `url`, `openingHoursSpecification`, `priceRange`, `sameAs` (Instagram, Google Maps) y, en restauración, `servesCuisine`, `acceptsReservations` y `hasMenu` si hay carta.
No añadas `aggregateRating` ni reseñas: Google lo penaliza si no son verificables en la propia web.
Valida que el JSON es correcto.

## SEO local
- Nombre, dirección y teléfono idénticos en la web, en Google Business Profile y en redes.
- Mapa integrado y botón "Cómo llegar" con enlace a Google Maps.
- Menciona la zona y los barrios cercanos de forma natural.
- Recuérdame al entregar: pedir al cliente que añada la URL de la web en su ficha de Google.

## Rendimiento (objetivo Lighthouse ≥ 90 en todo, en móvil)
- Imágenes en WebP, con `srcset` y tamaños adecuados. Ninguna imagen de más de 300 KB y el hero por debajo de 200 KB.
- `width` y `height` en todas las imágenes para no mover el diseño al cargar.
- La imagen del hero con `fetchpriority="high"` y sin lazy. El resto con `loading="lazy"`.
- Fuentes woff2 autoalojadas, `font-display: swap` y precarga solo de la fuente del titular.
- CSS crítico ligero. JS con `defer` y sin librerías.
- Mapa de Google cargado al hacer scroll o con una imagen de vista previa y clic, para no frenar la carga.
- `_headers` de Netlify: caché larga para `/css`, `/js`, `/img` y `/fonts`, más cabeceras de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`).

## Comprobación
Si puedes ejecutar Lighthouse o revisar los pesos de los archivos, hazlo y apunta los resultados en tu resumen. Si no, revisa manualmente esta lista y dime qué no has podido comprobar.
