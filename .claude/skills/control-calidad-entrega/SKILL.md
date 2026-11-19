---
name: control-calidad-entrega
description: Úsala siempre antes de dar por terminada una web o un cambio importante, antes de enseñar una demo al cliente y antes de conectar un dominio. Revisión final de calidad, accesibilidad, legal y funcionamiento.
---

# Control de calidad antes de entregar

Repasa cada punto. Corrige lo que falle. Al final, dame la lista con ✅ / ❌ y lo que no hayas podido comprobar.

## Funciona
- [ ] Todos los enlaces llevan a su sitio. No hay enlaces rotos ni `href="#"` sueltos.
- [ ] Teléfonos con `tel:+34…`, WhatsApp con `https://wa.me/34…` y mensaje predefinido.
- [ ] El formulario de reserva valida los campos y genera bien el mensaje de WhatsApp.
- [ ] El horario y el "Abierto ahora / Cerrado" funcionan con la hora de España.
- [ ] El menú móvil abre, cierra y navega bien.
- [ ] El cambio de idioma ES/EN, si existe, cambia todos los textos.
- [ ] No hay errores en la consola del navegador.

## Se ve bien
- [ ] A 360, 390, 768, 1024 y 1440 px de ancho: nada se desborda, nada se corta.
- [ ] El botón principal se ve sin hacer scroll en móvil.
- [ ] Ninguna imagen deformada, pixelada o que no cargue.
- [ ] Favicon, tarjeta para compartir en redes y página 404 con la marca.

## Accesible (WCAG 2.1 AA)
- [ ] Contraste suficiente en textos y botones.
- [ ] Se puede navegar con teclado y el foco se ve.
- [ ] Todas las imágenes tienen texto alternativo útil (las decorativas, `alt=""`).
- [ ] Los formularios tienen etiquetas.
- [ ] `prefers-reduced-motion` desactiva las animaciones.

## Contenido honesto
- [ ] Ningún dato inventado. Todo lo dudoso marcado `[PENDIENTE]`.
- [ ] Ninguna reseña, foto de stock o imagen generada que se haga pasar por el local.
- [ ] Ortografía y tildes revisadas en ES (y EN si existe).

## Legal (España / RGPD)
- [ ] Páginas de aviso legal, privacidad y cookies enlazadas en el pie.
- [ ] Datos del titular presentes o marcados `[PENDIENTE]`.
- [ ] Si hay cookies no técnicas (analítica, mapas con cookies), aviso de cookies con opción de rechazar.
- [ ] Sin Google Fonts por enlace externo.

## Publicación
- [ ] `index.html` en la raíz, rutas relativas correctas.
- [ ] `_redirects` bloquea `/CLAUDE.md`, `/README.md`, `/BRIEF.md` y `/.claude/*`.
- [ ] `_headers` con caché y seguridad.
- [ ] SEO revisado con la skill `seo-local-rendimiento`.
- [ ] Commit con mensaje claro y push a `main`.

## Resumen final para mí
1. Lo que se ha hecho.
2. Lista de `[PENDIENTE]` y qué hay que pedir al cliente (fotos, datos, textos).
3. Enlace a la web publicada y a la última publicación de Netlify si lo tienes.
