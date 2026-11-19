---
name: diseno-exclusivo
description: Úsala al decidir el aspecto visual de una web de cliente - colores, tipografía, maquetación, fotos, animaciones - o al rediseñar una sección. Evita que la web parezca una plantilla genérica y le da una dirección de arte propia del negocio.
---

# Dirección de arte exclusiva

La pregunta que guía todo: "¿Esta web podría ser de cualquier otro negocio?". Si la respuesta es sí, no está terminada.

## 1. Encuentra el ADN visual antes de diseñar
Saca 3 rasgos del propio negocio y tradúcelos a decisiones de diseño. Ejemplos:
- Un bar con nombre de rugby → tipografía condensada y firme, líneas de campo como recurso gráfico.
- Una cafetería de barrio con 40 años → serif clásica, tonos tostados, fotos con grano.
- Una peluquería moderna → mucho espacio en blanco, tipografía fina, fotos de detalle.
Escribe esos 3 rasgos y las decisiones al principio de `css/style.css` como comentario.

## 2. Color
- Extrae los colores del logo y las fotos reales del cliente. No los inventes.
- Define variables: `--color-principal`, `--color-secundario`, `--color-acento`, `--fondo`, `--fondo-alt`, `--texto`, `--texto-suave`.
- Un solo color de acento, reservado para la acción principal.
- Comprueba contraste AA (4,5:1 en texto normal).
- Prohibido: degradados morados genéricos, neones y colores chillones que no vengan de la marca.

## 3. Tipografía
- Dos familias como máximo: una con carácter para titulares y una sans muy legible para textos.
- Escala tipográfica con `clamp()` para que respire en móvil y escritorio.
- Titulares grandes y con contraste de tamaño real frente al texto. La jerarquía se tiene que ver de un vistazo.
- Interlineado 1,5–1,7 en textos y longitud de línea de 60–75 caracteres.
- Evita los combos por defecto de siempre, salvo que encajen de verdad con la marca.

## 4. Maquetación
- Rompe la monotonía de "bloque centrado tras bloque centrado": alterna anchos, asimetrías, imágenes a sangre y texto superpuesto.
- Espaciado generoso y consistente con una escala (8, 16, 24, 40, 64, 104 px).
- Cada sección tiene un propósito y una composición distinta.
- Nada de iconos genéricos de librería para rellenar. Si un icono no aporta información, quítalo.

## 5. Fotografía
- Las fotos reales del local son las protagonistas. Encuádralas bien con `object-fit` y `object-position`.
- Aplica un tratamiento coherente (mismo ajuste de color o tono) para que parezcan de la misma sesión.
- La foto del hero se elige por emoción, no por cantidad de información.

## 6. Movimiento
- Sutil y con intención: apariciones al hacer scroll (fundido + 16–24 px), hover en botones y enlaces, transiciones de 250–600 ms.
- Nada de rebotes, confeti, parallax mareante ni música automática.
- Respeta siempre `prefers-reduced-motion`.

## 7. Detalles que marcan "agencia"
- Favicon y tarjeta para compartir en redes con la marca del cliente.
- Estados de foco visibles y bonitos.
- Página 404 diseñada con el tono de la marca.
- Microinteracción en el botón principal.
- Selección de texto (`::selection`) con el color de la marca.

## Antes de dar el diseño por bueno
Mira la web a 360 px, 768 px y 1440 px y pregúntate: ¿se reconoce la marca sin ver el logo? ¿El botón principal salta a la vista? ¿Hay algo que parezca de plantilla? Corrige antes de seguir.
