# Libro de marca — Berth Ortiz

Desarrollo de páginas web para negocios y empresas. **Personal, técnica, directa.**
Este documento es la fuente única de verdad del look de la marca: cualquier
componente, banner, OG image o corrección visual debe salir de aquí, no de la
memoria. Los tokens viven en `src/css/style.css` (`@theme`, Tailwind v4) y en
`src/layouts/Layout.astro` (`:root`).

---

## 1. Identidad

- **Nombre:** Berth Ortiz · **Sector:** desarrollo web freelance / estudio de una persona.
- **Promesa:** sitios rápidos, optimizados y diseñados para convertir visitas en ventas.
- **Persona:** desarrollador de trato cercano que acompaña al negocio desde el diseño hasta la publicación ("te acompañamos en la publicación").
- **Audiencia:** emprendedores y pequeñas empresas que no saben (ni quieren saber) de código.
- **Idea de marca:** *la tecnología puesta al servicio del negocio del cliente*, no por encima de él. Azul eléctrico + cian = confianza técnica y mundo dev; Sora en los titulares = seguridad; Inter en el texto = trato directo y cercano.

---

## 2. Color

La paleta es fija. **No se inventan colores**: los estados se toman de los derivados documentados abajo.

| Rol | Token CSS / Tailwind | Hex | Uso |
| --- | --- | --- | --- |
| Fondo del sitio | `--color-ground` · `bg-ground` | `#080e1c` | Fondo de todo el sitio, `themeColor` |
| Acento (acción) | `--color-brand` · `text-brand` `bg-brand` | `#008cff` | Botón primario, enlaces activos, íconos de lista, foco |
| Acento 2 | `--color-brand-two` · `text-brand-two` | `#03cff3` | Solo dentro del gradiente de marca y carruseles |
| Titular sobre oscuro | `--color-ink-strong` · `text-ink-strong` | `#ffffff` | h1–h3 y frases dominantes sobre `ground` |
| Texto sobre oscuro | `--color-ink` · `text-ink` | `#a5b4cb` | Párrafos, nav secundaria, pies |
| Superficie clara | `--color-surface` · `bg-surface` | `#e7effa` | Tarjetas, formularios de contacto, secciones invertidas |
| Superficie clara 2 | `--color-surface-two` · `bg-surface-two` | `#dce8f5` | Paso de tono, hover dentro de superficies claras |
| Texto sobre claro | `--color-ink-dark` · `text-ink-dark` | `#09111f` | Textos y títulos sobre `surface`/`surface-two` |

### Estado hover (derivado calculado)

| Estado | Hex | Nota |
| --- | --- | --- |
| `brand` en hover / pressed (sobre oscuro) | `#33a0ff` | La única variación permitida del acento: se aclara ~20%. Contraste 6.99:1 sobre `ground`. |

En superficies claras el hover es un **paso de tono** (ir de `surface` a `surface-two`), nunca un color nuevo.

### Contraste (medido, WCAG 2.x)

| Combinación | Ratio | Uso correcto |
| --- | --- | --- |
| `ink-strong` sobre `ground` | 19.3:1 | Titulares |
| `ink` sobre `ground` | 9.2:1 | Texto corrido |
| `brand` sobre `ground` | 5.7:1 | Texto y elementos gráficos |
| `brand-two` sobre `ground` | 10.3:1 | Texto y elementos gráficos |
| `ink-dark` sobre `surface` / `surface-two` | 16.3:1 / 15.2:1 | Formularios, tarjetas |
| `brand` sobre `surface` | **2.9:1** | ⚠️ Sólo decorativo/íconos; **nunca texto** sobre superficie clara |

### Gradiente de marca (asset fijo)

`linear-gradient(90deg, var(--color-brand), var(--color-brand-two), var(--color-brand))` — azul → cian.

- Aplicar **solo** en: el botón primario (con su halo animado) y el span del titular del hero (`.gradiente-title-hero` / `.gradiente-title-g`).
- **Nunca:** fondos de secciones, titulares de otras secciones (esas van en tinta sólida), ni texto pequeño.
- No se agregan colores intermedios (el rosa/naranja que había fue eliminado en la limpieza del 2026-10).

---

## 3. Tipografía

**Dos familias, cada una con un solo trabajo.** Nunca se mezclan en el mismo bloque.

| Familia | Carga | Trabajo | Pesos |
| --- | --- | --- | --- |
| **Sora** | Google Fonts 600–800 | Titulares h1–h3, text-4xl y arriba | 600 / 700 (bold de uso común) / 800 |
| **Inter** | Google Fonts variable (100..900) | Texto corrido, navegación, botones, formularios, captions | 400 / 500 / 600 |

> Sora se eligió por su geometría limpia y sus terminaciones angulares: habla el idioma del código y del blue/cyan técnico de la marca. Inter hace el resto del trabajo para no saturar la pantalla.

### Hierarquía (escala fluida con `clamp()`)

| Nivel | Familia | Tamaño fluido | Tracking | Interlínea |
| --- | --- | --- | --- | --- |
| h1 (una por página) | Sora 700 | `clamp(2.5rem, 1.2rem + 4vw, 4.5rem)` | −0.02em (aplicado global) | ≤ 1.05 (aplicado global) |
| h2 sección | Sora 700 | `clamp(2rem, 1.2rem + 2.5vw, 3rem)` | −0.02em | ≤ 1.05 |
| h3 | Sora 600 | `clamp(1.35rem, 1.15rem + 0.8vw, 1.75rem)` | −0.01em | ≤ 1.15 |
| texto corrido | Inter 400 | 16–18px (md → 18px) | 0 | 1.5–1.6, 45–75 caracteres |
| texto destacado | Inter 500 | 18–20px | 0 | 1.5 |
| navegación | Inter 500 | 15–16px | 0 | — |
| botón | Inter 500/600 | 16–19px | 0 | — |
| caption / crédito | Inter 400 | 13–14px | 0 | 1.4 |

- El tracking `−0.02em` y el `line-height: 1.05` de titulares ya están en el `h1–h4` global de `Layout.astro`: los componentes no los repiten a mano.
- **Los titulares caben en 2 líneas o menos a todas las anchuras** (~32 caracteres máx). Si no cabe, se cortan palabras, se agranda el contenedor; el tamaño es lo último.
- La etiqueta-eyebrow (la de "¡Creamos la página web que necesitas!", la de Projects y la de Process) es texto pequeño en `text-brand` sentence case; en un siguiente pase se pedirá quitar `uppercase` + `tracking-widest` (regla de la skill).
- Una sola carga de fuentes: el `<link>` de `Layout.astro`. **Prohibido** volver a `@import` fuentes dentro de componentes (ocurría en Contact).

---

## 4. Componentes

### Botón primario (asset con forma fija)
- Relleno con el **gradiente de marca** (ver §2), sin borde, radio `4px`, texto `#ffffff` Inter 500, halo animado en hover (`glow`).
- Máximo **uno por pantalla** (el hero cotiza; el resto de acciones son secundarias).
- Token: `src/components/ButtonPrimary.astro`.

### Botón secundario
- Fondo transparente, borde fino `1px` en `--color-brand-white` o `--color-brand`, texto blanco. Mismo radio `4px`, mismas alturas que el primario.

### Tarjetas
- Superficie `surface` / `surface-two` con textos en `ink-dark`.
- Sobre fondo oscuro: un paso de tono en vez de color sólido (como el `bg-zinc-500/5` que ya usan Projects y ServicesCards), **sin bordes de 1px, sin sombras**; la separación es por tono, no por línea.
- La esquina ronda solo si ya está en el componente vivo (`rounded-lg` en Projects/ServicesCards); NO introducir esquinas `rounded-2xl` nuevas.

### Formularios
- Se apoyan en un formulario FS-Form (`Contact.astro`): fondo `surface`, campo con borde `1px` `#94a3b8`, labels Inter 600 en `ink-dark`.
- Los campos de formulario **sí** pueden tener línea (excepción de la skill para formularios reales).

### Navegación
- Barra mínima: wordmark (`logo-berth.svg`), 3–5 enlaces planos Inter 500, **una** acción (Cotizar).

---

## 5. Logo

| Variante | Archivo | Fondo |
| --- | --- | --- |
| Wordmark principal | `src/assets/img/logo-berth.svg` | `ground` / clara |
| Versión con contorno azul | `src/assets/img/logo-raep-border.svg` | Clara |
| Ícono (social/app) | `public/portfolio-icon.png`, `src/assets/img/berth-icon.png` | Cualquiera |

- Espacio de reserva: mínimo el alto de la "B" a cada lado.
- Tamaño mínimo: 120px de ancho el wordmark; 24px el ícono.
- Nunca deformar, nunca colocar el wordmark sobre una foto sin scrim.
- El logo general de la plantilla (`logo-raep.svg`, multicolor) **no es de esta marca**: solo se usa donde ya estaba en portafolio de clientes.

---

## 6. Imagen e iconografía

- **Retícula de fondo (textura dev):** solo en el hero, como capa `aria-hidden` (`src/components/Hero.astro`, clase `.hero-grid`): líneas de 1px al 5% de alfa blanco, celda de 48px, desvanecida con máscara hacia el borde inferior. Es la textura "de desarrollador" de la marca; **nunca** en otras secciones ni con más opacidad.
- **Orbes de profundidad (Projects):** en `src/sections/Projects.astro` — sección **full-bleed** (`relative isolate w-full overflow-clip`), con el contenido en un contenedor interno `max-w-7xl mx-auto` (patrón de astro.build): fondo a todo el viewport, contenido centrado. La atmósfera la componen tres discos radiales suaves en los colores de la marca (azul dominante arriba-izquierda, cian abajo-derecha, un terceto débil al centro), tamaño fluido con `clamp()` y caídas largas del gradiente (más un `filter: blur(70–110px)` de refuerzo) para que no se perciba contorno. Requisito técnico: la sección debe llevar `isolate` (contexto de apilamiento propio); sin él, el fondo opaco de `html/body` (§2 ground) cubre cualquier capa con `z-index` negativo y el device queda invisible. Exclusivo de esta sección; sin violeta ni otros colores.
- **Fotografía:** las del proyecto viven en `src/assets/img/` (obras, procesos, clientes reales). Recuadro rectangular (sin esquinas), recortes de la misma altura en un mismo grupo.
- **Capturas de producto** (portafolio, dashboard de cliente): son el material más fuerte; van grandes, con borde propio del OS, nunca pixeladas (< 1.5× por su natural).
- **Íconos:** `src/icons/` — mono-lineal (stroke 1.5–2px), un solo color del tema (típicamente `brand` o `ink`). Sin gradientes de relleno en íconos.
- **Prohibido:** placeholders grises, lorem, emojis en títulos, figuras decorativas aleatorias, dashboards falsos de barras grises.

---

## 7. Voz y textos

- Tono: **directo, trato de tú, cero jerga técnica innecesaria**. El cliente piensa "tengo un negocio", no "tengo visitantes".
- Hablar del beneficio, de la acción y del negocio, nunca del código subyacente ("MERN", "tailwind", "componentes").
- Accionables concretos: "Cotizar mi web", "Ver portafolio". Nada de "Enviar", "Conoce más", "Getting started".

| Voz correcta | Evitar |
| --- | --- |
| "Una página web que impulsa tu negocio" | "Impulsa tu presencia digital al siguiente nivel 🚀" |
| "Con tecnología actual, tu negocio…" | "Stack moderno con arquitectura escalable" |
| "Cotizar mi web" | "¡Contáctanos HOY!" |

- **Se prohíbe inventar prueba social** (números de clientes, cotizaciones falsas). Las recensiones solo del archivo `Testimonials`.

---

## 8. Do's & Don'ts (resumen operativo)

| Se puede | No se hace |
| --- | --- |
| Escala tipográfica por `clamp()` y solo Sora/Inter | Terceras fuentes, `@import` sueltos, mono salvo en `<code>` |
| Gradiente azul→cian (botón + hero) | Otros gradientes, otros colores intermedios (naranja, rosa, violeta) |
| Colores solo por token | Inline `#hex` nuevos; `text-[#...]` |
| Labels sentence-case `text-brand` | Uppercase + tracking-widest adicional |
| Sombras solo en menú / dialog | Sombras o glows en elementos estáticos |
| Bordes y backdrops solo si ya existen | Añadirlos a secciones nuevas |
| Una acción primaria por pantalla | Filas de CTAs gemelos con la misma jerarquía |

---

## 9. Flags de inspección (taste-skill)

Al validar la web con `inspect.mjs` de la skill `design-taste-frontend`, quedan como **assets de marca heredada/documentada** (con comentario `taste-skill-ignore` en el código): el gradiente del botón primario, el gradiente animado del titular del hero, el scrim neutro del hero sobre foto, la retícula sutil del hero (§6) y los orbes de profundidad de Projects (§6). En ningún caso se extienden a otras secciones.
