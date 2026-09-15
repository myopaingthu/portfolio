# jamiemckaye.com — Measured Animation & Motion Reference

Captured 2026-09-15 from the live site at https://jamiemckaye.com/ using Playwright: computed
styles, `document.styleSheets` traversal, and the deminified production JavaScript bundle.

Every value here was **read off the running site**, not inferred. Where something was inferred it
says so. This supersedes `jamiemckaye-website-reference-spec.md`, which is wrong on most specifics
(see §9).

---

## 0. Stack actually in use

| Thing | Verdict | Evidence |
|---|---|---|
| Next.js | Yes, Turbopack build | `/_next/static/immutable/chunks/turbopack-*.js` |
| Tailwind CSS | **v4** | `@theme`-generated `--text-*`, `--color-*`, `--spacing`, `--default-transition-*` on `:root` |
| GSAP | **3.15.0** | `rM.version="3.15.0"` in bundle |
| ScrollTrigger | Yes | `gsap.registerPlugin(ScrollTrigger)`, `T.version="3.15.0"` |
| Lenis | **Yes, required** | `new Lenis({lerp:.12,wheelMultiplier:1})` |
| Three.js | **r185**, as `three/webgpu` | `revision:"185"`, 42× `WebGPURenderer`, 58× `TSL` |
| WebGPU | Yes, WGSL compute | 18× `WGSL`, `getContext("webgpu")`, `requestAdapter` |
| Framer Motion / Motion | **No** | absent from bundle |
| Lottie | **No** | absent from bundle |
| Fonts | Geist Sans + Geist Mono | 2 woff2, 138KB total |
| Supabase Realtime | Yes — live visitor cursors | `realtime.disconnect()`, `removeChannel()` |

Nothing is on `window` — everything is ESM-bundled, so `window.gsap` is `undefined` even though
GSAP is running. Detect it by the inline-style signature instead (§3).

**Zero images.** `document.querySelectorAll('img').length === 0`. Total page weight 817KB, of which
the only media is two font files. The whole aesthetic is procedural.

---

## 1. Design tokens (exact, from computed `:root`)

### Colour

```
--color-ink-0:           #0b0c0e    page background, scene clear colour
--color-ink-1:           #121316    raised surface, card hover
--color-ink-2:           #1a1c20    highest surface

--color-paper-0:         #fafbfd    primary text, nav hover
--color-paper-1:         #ccd1d8    body text, nav rest
--color-paper-2:         #8a919b    muted / eyebrow text

--color-chrome-hi:       #e9ebef    gradient peak, arrow hover
--color-chrome-mid:      #aeb4bd    label hover
--color-chrome-lo:       #6e747d    gradient edge, secondary border

--color-hairline:        #f4f5f71a  10% — every rule on the site
--color-hairline-strong: #f4f5f72e  18%

--color-signal-pos:      #8fe3b0    green (live TTFB readout)
--color-signal-neg:      #e3908f    red
--color-signal-warn:     #e3cf8f    amber
```

Scene background in the particle renderer is decimal `723982` = `0x0B0C0E` — the same `--color-ink-0`.
The canvas and the page are the same black by construction.

### Type

```
--font-sans: "GeistSans", "GeistSans Fallback", "Helvetica Neue", Arial, sans-serif
--font-mono: "GeistMono", ui-monospace, SFMono-Regular, Roboto Mono, Menlo, ...

--text-display:    clamp(2.75rem, 1.9rem + 4.6vw, 6rem)     lh 1.02   ls -0.03em
--text-editorial:  clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)  lh 1.15
--text-body:       1.0625rem  (17px)                        lh 1.65
--text-label:      0.71875rem (11.5px)                      lh 1.3    ls 0.14em
```

Hero headline overrides all of these with its own scale:

```css
font-size: clamp(52px, 7.25vw, 108px);
line-height: 0.98;
letter-spacing: -0.058em;   /* far tighter than --text-display */
font-weight: 600;
```

The eyebrow utility, used on nearly every section:

```css
.label-mono {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-paper-2);
}
```

### Easing and duration

```
--default-transition-duration:        0.15s
--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out:                           cubic-bezier(0, 0, 0.2, 1)
--ease-instrument:                    cubic-bezier(0.22, 1, 0.36, 1)   /* expo-out */
```

**The complete duration vocabulary on the site.** There are no other values:

| Duration | Used for |
|---|---|
| 150ms | default colour transitions |
| 180ms | hero button background / border |
| 200ms | transform, lift, nav colour |
| 300ms | arrow nudge, nav underline, route transition |
| 350ms | `.manifest-node` background |
| 400ms | `.rail-node` border, `.rail-station` colour |
| 500ms | card top-hairline sweep, lamp fades |
| 650ms | ReaderPrism stack rotate |
| 700ms | scroll reveal, plate fade-in |
| 850ms | ReaderPrism sheet transform |

Holding to a small fixed set is most of why the site reads as deliberate rather than busy.

---

## 2. Hero on page load

**There is no hero text animation.** The headline, lede and buttons are static server-rendered HTML
at full opacity. Nothing tweens them in.

The spec's claim that particles assemble into the headline glyphs is **false** for the current
build. The two are independent: the headline is DOM text, the particles are an ambient field behind
and around it that actively *avoids* the text (§6).

The only load-time animation is:

```css
@keyframes jm-plate-in { 0% { opacity: 0 } }
.jm-fade-in { animation: 0.7s both jm-plate-in }
```

A 0.7s fade applied to plates/figures. That is the entire load sequence in CSS.

The perceived "spectacle" on load is the WebGPU field booting and settling — not a DOM animation.

---

## 3. Scroll-triggered reveal

The primary motion pattern. 26 elements carry it on the homepage alone.

**Trigger:** ScrollTrigger, fires once when the element's top reaches 88% of viewport height.

**Initial state — CSS, so it is correct before JS runs:**

```css
[data-reveal], [data-wreveal] { opacity: 0; transform: translateY(14px) }
```

**The tween, verbatim from the bundle:**

```js
gsap.to(el, {
  opacity: 1,
  y: 0,
  duration: 0.7,
  ease: "power3.out",
  scrollTrigger: { trigger: el, start: "top 88%", once: true }
});
```

**Grouped variant** — container is the trigger, children stagger:

```js
gsap.to(group.querySelectorAll("[data-reveal]"), {
  opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
  stagger: 0.04,
  scrollTrigger: { trigger: group, start: "top 88%", once: true }
});
```

Selector deliberately excludes nested children so a grouped item is never animated twice:

```js
gsap.utils.toArray("[data-reveal]:not([data-reveal-group] [data-reveal])")
```

There are two parallel systems with identical parameters: `data-reveal` (global, `stagger: 0.04`)
and `data-wreveal` (scoped to a subtree, `stagger: 0.05`). The scoped one additionally calls
`document.fonts.ready.then(() => ScrollTrigger.refresh())` so trigger points are recomputed after
webfonts land.

**How to confirm GSAP is driving it:** revealed elements carry this inline style —

```
translate: none; rotate: none; scale: none; transform: translate(0px, 14px); opacity: 0;
```

Setting `translate`/`rotate`/`scale` to `none` while writing `transform` is GSAP's signature for
taking ownership of an element's transform.

---

## 4. Smooth scroll (Lenis)

```js
const lenis = window.matchMedia("(pointer: coarse)").matches
  ? null
  : new Lenis({ lerp: 0.12, wheelMultiplier: 1 });

const raf = (t) => lenis?.raf(t * 1000);

if (lenis) {
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  lenis.on("scroll", ScrollTrigger.update);
}
```

Two things worth copying:

1. **Disabled on coarse pointers.** Touch devices get native scroll — no hijack, no momentum fight.
2. **One clock.** Lenis is driven by `gsap.ticker`, not its own rAF, and `lagSmoothing(0)` stops
   GSAP compensating for frame drops. Scroll position and tweens can never desync.

Teardown removes the ticker callback and calls `lenis.destroy()`.

---

## 5. Hover micro-interactions

### 5.1 Magnetic cards — the "three doors"

Real, and far subtler than the spec claims. **Not** a spring, **not** GSAP:

```jsx
onPointerMove={(e) => {
  const el = ref.current;
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const r  = el.getBoundingClientRect();
  const nx = (e.clientX - r.left) / r.width  - 0.5;   // -0.5 .. 0.5
  const ny = (e.clientY - r.top)  / r.height - 0.5;
  el.style.transform = `translate(${8 * nx}px, ${6 * ny}px)`;
}}
onPointerLeave={() => { ref.current.style.transform = ""; }}
```

Class on the element: `transition-transform duration-200 ease-out`.

- **Maximum displacement ±4px horizontal, ±3px vertical.** Regardless of card size.
- Transform is assigned directly during move, so the card tracks the cursor with zero lag.
- On leave the inline style is cleared and the **CSS transition** eases it home over 200ms
  `cubic-bezier(0, 0, 0.2, 1)`. The transition only ever plays on release.
- Reduced motion returns early — the card never moves.

Measured on a 434×290 card: pointer 10px inside top-left → `translate(-3.83px, -2.81px)`; pointer
10px inside bottom-right → `translate(3.80px, 2.78px)`.

The spec's `cursorDelta * 0.10–0.20` would give ±43px on that card. An order of magnitude wrong.

### 5.2 Navigation links

Pure Tailwind, no JS:

```
relative text-[13.5px] font-medium tracking-[0.005em] text-paper-1
transition-colors duration-200 hover:text-paper-0
after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0
after:bg-gradient-to-r after:from-chrome-lo after:via-chrome-hi after:to-chrome-lo
after:transition-all after:duration-300 hover:after:w-full
```

| | Rest | Hover | Transition |
|---|---|---|---|
| colour | `#ccd1d8` | `#fafbfd` | 200ms `cubic-bezier(.4,0,.2,1)` |
| `::after` width | `0px` | full (32.08px on "work") | 300ms `cubic-bezier(.4,0,.2,1)` |

The underline is a **1px gradient bar**, not a solid rule — it is brightest in the middle:

```
linear-gradient(to right in oklab, #6e747d 0%, #e9ebef 50%, #6e747d 100%)
```

It grows from the left (`transform-origin: 0px 0.5px`) and sits 4px below the text.

### 5.3 Card hover — three durations, deliberately staggered

On `.door.group`, three things move at different speeds. This is what makes it feel composed rather
than switched:

```
top hairline  origin-left scale-x-0 → group-hover:scale-x-100   500ms ease-out
arrow  →      group-hover:translate-x-1 (4px) + text-chrome-hi  300ms
foot label    group-hover:text-chrome-mid                       150ms (default)
```

The top hairline is the same `from-chrome-lo via-chrome-hi to-chrome-lo` gradient as the nav
underline, swept via `scaleX` rather than `width`, so it is compositor-only.

### 5.4 Buttons

```css
/* hero primary / secondary */
transition: background .18s, border-color .18s;
.primary        { background: var(--color-paper-0); color: var(--color-ink-0) }
.primary:hover  { background: #dfe3e9; border-color: #dfe3e9 }
.secondary      { border-color: var(--color-chrome-lo) }
.secondary:hover{ border-color: var(--color-paper-0); background: #fafbfd09 }
```

Closing CTA: `transition-transform duration-200 hover:-translate-y-0.5` — a 2px lift. No shadow,
no scale, no glow.

**Full hover vocabulary on the site.** This is all of it:

```
hover:-translate-y-0.5   hover:after:w-full     hover:bg-ink-1
hover:bg-paper-0/5       hover:border-chrome-hi hover:border-chrome-mid
hover:text-paper-0       hover:text-paper-1
group-hover:border-chrome-hi  group-hover:scale-x-100  group-hover:text-chrome-hi
group-hover:text-chrome-mid   group-hover:text-paper-0 group-hover:text-paper-1
group-hover:translate-x-1
```

Translate, colour, border, scale-x. No shadows, no filters, no 3D.

---

## 6. Particle field (WebGPU) — TWO systems, not one

```js
if (!navigator.gpu?.requestAdapter
    || matchMedia("(prefers-reduced-motion: reduce)").matches
    || navigator.connection?.saveData) return;          // renders nothing at all

const COUNT = matchMedia("(pointer: coarse)").matches ? 45_000 : 110_000;
```

Measured by sampling screenshots at four pointer positions. The field is **not** a uniform
starfield — it is two distinct populations:

### 6.1 Ambient band

Confined to the **bottom ~28% of the hero viewport**. Vertical density, normalised, identical at
every pointer position (1512x900 viewport):

```
y   0 - 614   0.00      <- top 68% of the hero is completely empty
y   655       0.13
y   695       0.86
y   736       1.00      <- peak, ~0.82 of viewport height
y   777       0.87
y   818       0.43
y   859       0.15
```

Approximately Gaussian, centred at 0.82h with sigma ~0.065h. Horizontally it is **right-biased**,
roughly 2x denser on the right half than the far left. Density in a clean band window
(x 900-1460, y 700-840): mean luminance **48.4**, 49.7% of pixels above lum 40, 16.4% above 80.

The band drifts slowly and is displaced locally when the pointer comes near, springing back to
its home position afterwards.

### 6.2 Cursor blob

A cluster that tracks the pointer anywhere on the page, at any scroll position. Its shape is
**driven by pointer speed**, and the direction is the opposite of what you would guess:

```
at rest     diffuse, dim, loose scatter of individual motes   ~200 x 80 px
in motion   tight, bright, blown-out core, elongated along
            the direction of travel                           ~180 x 95 px
```

Motion *concentrates* the blob; rest *disperses* it.

The mechanism is not a soft spring onto the live pointer — that produces a smear along the path.
It is a **tight clump bound to a lagging centre**: the centre eases toward the pointer at roughly
5% of the gap per frame (so it trails a long way, measured ~730px behind during a fast sweep),
while the particles hold formation tightly around that centre.

Implementation notes that matter:

- Integrating force -> velocity -> position multiplies by `dt` twice, so displacement scales with
  `dt^2`. At 120fps that is 6.4e-5, and a spring stiffness in the tens moves a particle well under
  1% of the gap per frame — it never converges. Use a frame-rate-independent exponential follow
  (`mix(position, target, clamp(dt * k, 0, 1))`) for the blob instead.
- Speed must decay slowly (~0.965 per frame). A fast decay makes the blob disperse mid-gesture.
- The centre is a **spring, not an ease**. Measured on a 900px jump: barely moves for the first
  200ms, mid-flight at 500ms, arrives ~900ms with a slight overshoot, settles by 2.5s. A pure
  exponential ease moves fastest at t=0 and cannot produce that slow start.
- Brightness at rest must stay low or the additive blend destroys the contrast of any text above
  it. Measured in the blob core: at rest mean luminance ~48 with 2.9% of pixels over 180; in
  motion mean ~151 with 44% over 180. The canvas sits *below* the content in z-order, so
  legibility is governed entirely by how bright the blob is, not by stacking.
- Motion brightness comes from particle **density**, not per-particle alpha — alpha saturates at
  1 and raising it further does nothing.

On the reference this is per-visitor: each connected reader gets a blob, synced over Supabase
Realtime, hence `05 OTHER READERS ON THIS PAGE - THE MOTES ARE THEIR CURSORS`.

### 6.3 Mote size — WebGPU will not render sized points

**WebGPU's point-list topology renders 1-pixel points only.** There is no `gl_PointSize`
equivalent, so `sizeNode` on `THREE.Points` under `WebGPURenderer` is silently a no-op: raising it
changes nothing (and in practice measured *smaller*, since the only variation left is
antialiasing). A field built on `THREE.Points` can never be anything but 1px static.

The reference renders each particle as an **instanced sprite** — hence `SpriteNodeMaterial` and
`InstancedBufferGeometry` in its bundle:

```js
const material = new THREE.SpriteNodeMaterial({ transparent: true, depthWrite: false,
                                                depthTest: false, blending: THREE.AdditiveBlending });
material.positionNode = positions.element(instanceIndex);   // instanceIndex, not vertexIndex
material.scaleNode = sizeInPixels.mul(worldPerPixel);       // scaleNode is in WORLD units
const sprites = new THREE.Sprite(material);
sprites.count = count;
```

Measured mote geometry (horizontal run-length of lit pixels, threshold 45):

```
                    median   mean   coverage   mean lit luminance
cursor blob            4px   5.1px     28%           114
ambient band           2px   3.0px     43%            58
```

The blob's motes are twice the size of the band's and twice as bright, and there are roughly half
as many of them. The two populations need **separate size and alpha**, keyed off the role flag —
sharing one size node makes the band a solid mass whenever the blob looks right.

### 6.4 Deformation is squash-and-bulge, not contraction

Tracking blob width and height through a gesture shows the size barely changes; the brightness
does almost all the work:

```
            width   height   mean luminance
at rest      ~200      ~80        ~82
in motion    ~180      ~95       ~175
```

It compresses ~10% along the direction of travel and expands ~20% perpendicular — a squash — while
luminance roughly doubles. A uniform contraction is wrong and reads as the blob imploding: scaling
the offset radius to 0.3 collapses it to a quarter of its area and blows it to solid white, which
is the single most obvious tell that it is not the reference.

Speed must also ease in, not snap. Taking `max(speed, instantaneous)` jumps to full deformation on
the first pointer event; lerping toward the target (~0.16 per frame) makes the transition read as
continuous.

### 6.5 Renderer

- `three` r186 as `three/webgpu` + `three/tsl`, automatic WebGL2 fallback.
- Scene bg `0x0b0c0e`. `PerspectiveCamera(34, 1, 0.1, 20)` at `z = 3.4`.
- Camera **must sit at y = 0** if the DOM-to-world projection assumes an origin-centred camera;
  the reference uses y = 0.1, and mixing the two puts every mapping out by ~43px.
- DOM to world: `halfH = 3.4 * tan(17deg)`, `halfW = halfH * aspect`,
  `worldPerPixel = 2 * halfH / rectHeight`.
- Up to 6 tracked elements become repulsion masks so particles stay off live text.

## 7. Route transition

Not a particle melt. A 300ms CSS fade, despite the class name:

```css
main                 { transition: opacity .3s, transform .3s }
.jm-melt main        { opacity: 0; pointer-events: none; transform: translateY(14px) }
@media (prefers-reduced-motion: reduce) { main { transition: none } }
```

`.jm-melt` is toggled on the root element around navigation. `pointer-events: none` during the
transition prevents double-clicks on outgoing content. The 14px offset is the same distance as the
scroll reveal, so exits and entrances share one spatial language.

---

## 8. Reduced motion, no-JS, print

Every single motion system has an explicit off-switch. This is the most copyable thing on the site.

```css
@media (prefers-reduced-motion: reduce) {
  [data-reveal], [data-wreveal] { opacity: 1; transition: none; transform: none }
  main { transition: none }
  .hero .primary, .hero .secondary, .hero .foot a > span { transition: none }
  .ReaderPrism .stack, .ReaderPrism .sheet, .ReaderPrism .controls button { transition: none }
}

.no-js [data-reveal], .no-js [data-wreveal] { opacity: 1; transform: none }

@media print {
  [data-reveal], [data-wreveal] { opacity: 1 !important; transform: none !important }
  canvas, [data-console-open], .terminal-caret, .grain::after { display: none !important }
}
```

In JS, reduced motion is checked **before** anything initialises:

```js
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("[data-reveal]").forEach(el => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  return;                    // no Lenis, no ScrollTrigger, no particle field
}
```

Reduced motion is not a degraded mode here — it is a complete, static, fully-readable site.

---

## 9. Corrections to `jamiemckaye-website-reference-spec.md`

| Spec § | Claim | Measured reality |
|---|---|---|
| §5 | Persistent particle field across routes, `<PersistentField />` | **One canvas, hero-scoped.** `document.querySelectorAll('canvas').length === 1`, inside `.absolute.inset-0` |
| §6 | Particles assemble into the headline | Headline is static HTML. Particles avoid text, never form it |
| §7 | Navigation "melt", particles participate | 300ms CSS opacity + `translateY(14px)` on `main`. Particles unaffected |
| §8 | Magnetic `cursorDelta * 0.10–0.20`, spring return | `translate(8·nx, 6·ny)` → **±4px / ±3px**. CSS transition on release, no spring |
| §36 | "Framer Motion / Motion", "Lenis optional" | No Framer Motion. **Lenis required**, drives ScrollTrigger |
| §4 | Nav below wordmark | Single row: wordmark + tagline left, nav + `⌘K` right |
| §42 | Mobile: magnetic disabled, particle density reduced | Both true. Also: **no hamburger** — nav wraps to two text rows. Lenis off entirely |
| §51 | Font families need verification | Geist Sans + Geist Mono, SIL OFL, via `next/font` |

Correct in the spec: 110,000 particles, WebGPU, editorial restraint, reduced-motion as a hard
requirement, and the overall "don't animate everything" philosophy.

---

## 10. Texture — the only non-type visual

Zero-asset film grain, inline SVG data URI:

```css
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

`feTurbulence` `fractalNoise`, `baseFrequency 0.9`, 2 octaves, 160×160 tile, at **3.5% opacity**.
No network request, no image file, tiles seamlessly at any size.

---

## 11. Implementation checklist

Ordered by impact per unit of effort.

- [ ] Tokens: the colour ramp, the four easings, the fixed duration set (§1)
- [ ] Geist Sans + Geist Mono via `next/font` (`npm i geist`)
- [ ] `.label-mono` eyebrow + 1px hairlines at 10% — these two carry the look
- [ ] `[data-reveal]` initial state in **CSS**, tween in GSAP (§3)
- [ ] Lenis `lerp: 0.12`, off on coarse pointer, driven by `gsap.ticker` (§4)
- [ ] Magnetic `8 / 6`, CSS transition on release only (§5.1)
- [ ] Nav gradient underline `w-0 → w-full` over 300ms (§5.2)
- [ ] Card hover: 500 / 300 / 150ms stagger (§5.3)
- [ ] Route transition: 300ms, same 14px as the reveal (§7)
- [ ] Grain at `opacity: .035` (§10)
- [ ] Reduced-motion + no-JS + print off-switches for all of the above (§8)
- [ ] WebGPU particle field, hard-gated, built last (§6)

The first ten are a few days and get most of the way there. The last one is the long pole.
