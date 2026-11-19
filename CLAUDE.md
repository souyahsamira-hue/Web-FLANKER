# Estándares del proyecto: webs para pequeños negocios locales

## Objetivo
Webs de una sola página (o pocas páginas) para negocios locales en España (bares, peluquerías, talleres, clínicas, tiendas...).
El objetivo de cada web es que el visitante **llame, escriba por WhatsApp, reserve o venga al local**. Todo lo demás es secundario.

## Stack técnico
- Astro + Tailwind CSS. Sin frameworks pesados ni JavaScript innecesario.
- Todo el contenido del negocio (nombre, textos, horarios, teléfono, colores, fotos) vive en UN archivo: `src/data/negocio.json`. Cambiar de cliente = cambiar ese archivo + las imágenes.
- Despliegue estático (`output: 'static'`): Netlify, Cloudflare Pages o Hostinger (ver "Publicación en Hostinger").

## Identidad de marca
- Prohibido modificar el logo del cliente (colores, proporciones, tipografía, recortes o efectos).
- Si el cliente tiene paleta y tipografías propias, son obligatorias y mandan sobre cualquier propuesta de diseño.
- Extraerlas siempre de su web y su logo, y confirmarlas con el usuario antes de diseñar.
- El eslogan y las frases de marca del cliente se mantienen palabra por palabra, sin modificar letras, mayúsculas ni signos. En otros idiomas se conserva el eslogan original y, si hace falta, se añade la traducción aparte.

## Estructura obligatoria de la página
1. **Hero**: qué es el negocio + dónde está, en una frase. Botón principal (Llamar / WhatsApp / Reservar) visible sin hacer scroll en móvil.
2. **Servicios o productos**: tarjetas claras, con precio orientativo si el cliente lo permite.
3. **Prueba social**: reseñas reales (Google), años de experiencia, nº de clientes.
4. **Sobre nosotros**: fotos reales del local y del equipo, tono cercano.
5. **Horario y ubicación**: mapa de Google embebido (carga diferida), dirección y cómo llegar.
6. **Contacto**: teléfono clicable (`tel:`), WhatsApp (`wa.me`), email, formulario simple.
7. **Footer**: nombre, dirección y teléfono (NAP idéntico al de Google Business Profile), redes, enlaces legales.
- Botón flotante de WhatsApp en móvil.

## Calidad mínima (no negociable)
- Diseño mobile-first: la mayoría de visitas vienen del móvil.
- Lighthouse ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- Imágenes en WebP/AVIF, con `width`/`height`, `loading="lazy"` excepto la del hero.
- Accesibilidad: contraste AA, textos alternativos, HTML semántico, navegable con teclado.
- Tipografía legible (mín. 16px en móvil), máximo 2 fuentes.

## Imágenes
- **Conversión automática a WebP/AVIF con Astro**: las fotos van en `src/assets/` (nunca en `public/`) y se usan con `<Image>` o `<Picture>` de `astro:assets`. Astro genera WebP/AVIF, `srcset` y `width`/`height` en el build. No subir JPG/PNG sin procesar.
- Tamaños de referencia: hero máx. 2000px de ancho; tarjetas y galería máx. 1200px; retratos y miniaturas máx. 600px. Calidad 75–80.
- Hero con `loading="eager"` y `fetchpriority="high"`; el resto, `loading="lazy"`.
- **Fotos de demo**: si aún no hay fotos reales del cliente, usar fotos libres de **Openverse** (openverse.org, sin registro). Filtrar solo licencias aptas para uso comercial: CC0, dominio público (PDM), CC BY y CC BY-SA. También valen Unsplash y Pexels.
  - Registrar cada foto de demo en `src/data/creditos.json` (archivo, título, autor, licencia, URL de origen). Las CC BY / BY-SA exigen atribución visible (p. ej. en el footer o en una página de créditos).
  - Toda foto de demo queda marcada como pendiente: se sustituye por fotos reales antes de publicar la web definitiva.
- En demos privadas, nunca usar fotos del negocio sacadas de su web o redes sin permiso del dueño.

## Animaciones
- Contenido primero, animación después: la página debe leerse completa sin JavaScript. Nunca dejar contenido con `opacity: 0` que dependa de JS para aparecer.
- Por defecto: aparición suave al hacer scroll con CSS + `IntersectionObserver` (umbral bajo, ≤ 0.1, y un temporizador de seguridad que muestre todo si el observador falla). Duraciones de 300–700 ms, desplazamientos pequeños (≤ 24px).
- **GSAP** (con ScrollTrigger) solo si el diseño lo pide de verdad: instalado con npm, importado únicamente en el componente que lo usa y cargado en un `<script>` de Astro (nunca desde un CDN ni de forma global).
- **Lenis** (scroll suave) es opcional y solo con un motivo claro: puede empeorar la accesibilidad y el rendimiento.
- `prefers-reduced-motion: reduce`: desactivar desplazamientos, parallax, scroll suave y animaciones automáticas; el contenido aparece directamente (como mucho, un fundido corto).
- Las animaciones no pueden bajar el Lighthouse de 90 ni provocar saltos de diseño (CLS).

## SEO local
- `<title>` y meta description con servicio + ciudad/barrio (ej. "Peluquería en Chamberí | Nombre").
- Datos estructurados JSON-LD tipo `LocalBusiness` (o subtipo concreto) con dirección, horario, teléfono y geo.
- Open Graph para que se vea bien al compartir por WhatsApp.
- `sitemap.xml` y `robots.txt`.

## Legal (España)
- Páginas de Aviso legal (LSSI), Política de privacidad (RGPD/LOPDGDD) y Política de cookies.
- Si hay cookies no esenciales (analítica, mapas), banner de consentimiento con opción de rechazar igual de visible.
- Casilla de aceptación de privacidad en el formulario.

## Publicación en Hostinger
- Se publica la carpeta `dist/` generada por `npm run build`: el `index.html` debe quedar en la raíz de `public_html`.
- Incluir siempre `public/.htaccess` (Astro lo copia tal cual a `dist/`) con esta plantilla de caché:

    # HTML: siempre fresco tras cada publicación
    <IfModule mod_headers.c>
      <FilesMatch "\.(html|htm)$">
        Header set Cache-Control "no-cache, must-revalidate"
      </FilesMatch>
      # Archivos de Astro con hash en el nombre: caché de 1 año
      <If "%{REQUEST_URI} =~ m#^/_astro/#">
        Header set Cache-Control "public, max-age=31536000, immutable"
      </If>
      # Imágenes y fuentes fuera de /_astro/: 1 mes
      <FilesMatch "\.(webp|avif|jpg|jpeg|png|svg|ico|woff2?)$">
        Header set Cache-Control "public, max-age=2592000"
      </FilesMatch>
      Header always set X-Content-Type-Options "nosniff"
      Header always set Referrer-Policy "strict-origin-when-cross-origin"
    </IfModule>

    <IfModule mod_mime.c>
      AddType image/webp .webp
      AddType image/avif .avif
      AddType font/woff2 .woff2
    </IfModule>

    <IfModule mod_deflate.c>
      AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
    </IfModule>

    # Forzar HTTPS (activar cuando el dominio tenga SSL)
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteCond %{HTTPS} !=on
      RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
    </IfModule>

    # Página 404 propia de Astro
    ErrorDocument 404 /404.html

- No hace falta añadir `?v=fecha` a los recursos: Astro ya pone un hash en los nombres de `/_astro/`.
- Publicar con el conector oficial de Hostinger. Nunca subir a un subdominio público una demo privada sin confirmarlo antes.

## Estilo
- Webs de hostelería: estética editorial y sobria; prohibidos los emojis y las ilustraciones infantiles.

## Forma de trabajar
- Responde siempre al usuario en español.
- Antes de un cambio grande, explica el plan en pocas líneas.
- Tras cada bloque, revisa la versión móvil y comprueba que no hay errores en consola.
- Textos en español de España, tono cercano y sin relleno. Nada de "lorem ipsum" en entregas.
