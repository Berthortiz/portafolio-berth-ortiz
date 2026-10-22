# Prompt — Efecto de disolución con blur en el hero (GSAP + ScrollTrigger)

> Prompt listo para pegar en un agente de código. **Funciona con cualquier
> hero, tenga o no video/imagen destacada**: todo el efecto vive sobre el
> texto (siempre existe) y la pieza de media es opcional y se detecta por
> selector. Reemplaza los selectores indicados entre corchetes por los del
> proyecto destino.

---

**PROMPT:**

Quiero que el contenido de la sección hero de la página de inicio se disuelva
con un efecto blur al hacer scroll, de forma **fluida y progresiva**, similar a
un efecto de "desvanecimiento por profundidad de campo". NO quiero el efecto
típico basado en `getVelocity()` que golpea y se corta en seco con cada tick de
scroll.

**Requisitos técnicos:**

1. Usa GSAP + ScrollTrigger (instálalos si no existen: `gsap` y
   `gsap/ScrollTrigger`, con `gsap.registerPlugin(ScrollTrigger)`).

2. **Efecto principal por progreso, no por velocidad:** un `gsap.timeline` con

   ```js
   scrollTrigger: {
     trigger: hero,
     start: "top+=200 top",
     end: "bottom top",
     scrub: 1,
   }
   ```

   - El `scrub: 1` es obligatorio: hace que el efecto "persiga" al scroll con
     1 segundo de suavizado, y es la clave de la fluidez.
   - El `start` con offset de 200px hace que el hero aguante legible los
     primeros 200px de scroll antes de empezar a difuminarse.

3. La disolución del texto (contenedor del título, subtítulo y botones)
   debe animar a la vez:

   ```js
   .to(heroCopy, { filter: "blur(14px)", opacity: 0, y: -50, ease: "none" }, 0)
   ```

4. **Media destacado OPCIONAL (video o imagen):** el hero puede o no tener una
   pieza media. Búscala por un selector de datos, por ejemplo:

   ```js
   const heroMedia = hero.querySelector("[data-hero-media]");
   ```

   - Si **no existe**, la timeline funciona solo con el texto: **no la rompas
     ni la envuelvas en try/catch** — simplemente salta la animación del media:

     ```js
     if (heroMedia) {
       tl.to(
         heroMedia,
         { filter: "blur(8px)", opacity: 0.1, scale: 0.85, ease: "none" },
         0,
       );
     }
     ```

   - Si es un video gestionado por un componente de carga por dispositivo
     (ej. `[data-device-video]` o similar), anímate el **contenedor** del
     video, no el elemento `<video>` en sí (así el swap entre móvil/escritorio
     no rompe la animación).
   - Añade el atributo `data-hero-media` al contenedor del video/imagen del
     hero destino (si no existe el atributo, créalo).

5. **Impulso sutil por velocidad (secundario):** además, un
   `ScrollTrigger.create` con `onUpdate` que use `getVelocity()` solo como
   retoque:

   ```js
   // divisor alto + tope bajo = efecto sutil, nunca agresivo
   const impulso = Math.min(Math.abs(self.getVelocity()) / 400, 4);
   ```

   - Aplica ese blur sobre un objeto proxy `{ valor: 0 }` y píntalo manualmente
     con `elemento.style.filter = ...` (NO uses `gsap.quickTo` con `filter`;
     no interpola bien strings complejos).
   - Entrada rápida: duración `0.3`, `ease: "power2.out"`, `overwrite: "auto"`.
   - **Salida lenta:** al frenar el scroll, un
     `gsap.delayedCall(0.12, () => animar(0, 0.8))` con `.pause()` que se
     reinicia en cada evento de scroll (`volverACero.restart(true)`)
     devuelve el blur a 0, para que no se corte en seco al parar.

6. Rendimiento y accesibilidad:

   - Añade `will-change: transform, opacity, filter` en CSS a los elementos
     animados.
   - Envuelve toda la lógica en un guard:

     ```js
     if (!elementos || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
     ```

7. Todo dentro del script del propio componente (o en su JS asociado), y usa
   el mismo estilo/naming del proyecto destino.

**Parámetros ajustables (dejar documentados en el código):**

| Quiero...                          | Cambia                                                 |
| ---------------------------------- | ------------------------------------------------------ |
| Más/menos blur final del texto     | `blur(14px)`                                           |
| Disolución más lenta               | `scrub: 1` → `scrub: 2`                                |
| Que empiece más abajo              | `top+=200` → `top+=400`                                |
| Que termine antes de salir         | `end: "bottom top"` → `end: "80% top"`                 |
| Impulso de velocidad más notorio   | tope `4` → `8` y divisor `/400` → `/250`               |

---

**Notas:**

- **Genérico:** sirve para cualquier hero. El único requisito es marcar el
  contenedor del texto (y opcionalmente el del media) con los selectores
  entre corchetes. Sin video/imagen funciona igual, solo con el texto.
- Si el hero usa carga de video por dispositivo, marca el contenedor con
  `data-hero-media` y deja que el script anime ese nodo: el swap
  móvil/escritorio del `<video>` queda transparente para la animación.
- El prompt asume una hero de altura grande (`h-screen` o similar). Si el hero
  nuevo es más corto, usa `end: "80% top"`.
- No incluir `markers: true` (es solo para debug).
- `will-change` + el guard de `prefers-reduced-motion` (punto 6) son
  obligatorios en cualquier variante.
