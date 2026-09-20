# Portfolio

Personal portfolio for Myo Paing Thu. Next.js 16 (App Router) · TypeScript · Tailwind v4 ·
shadcn/ui · GSAP + ScrollTrigger · Lenis · Three.js WebGPU.

## Rules

- **Do not add code comments.** The code should read without them.
- Install with **npm**. Never yarn or pnpm.
- Tailwind v4: the theme lives in `@theme` in `src/app/globals.css`. Do not create
  `tailwind.config.js`.
- Use the tokens. No raw hex, no arbitrary colour values in components.
- Motion durations are a fixed set: **150 / 180 / 200 / 300 / 500 / 700ms**. Do not invent new ones.
- Easings are `--ease-out`, `--ease-instrument`, or the Tailwind default. Nothing else.
- Every animation needs a `prefers-reduced-motion: reduce` off-switch.
- Reveals are declarative: add `data-reveal` to an element or `data-reveal-group` to a container.
  Scroll-scrubbed sections are too: `data-story` on the section, `data-story-pane` / `-tick` /
  `-head` inside. Never hand-roll a ScrollTrigger in a component — every one of these lives in
  `MotionProvider`.
- No decorative motion. No tilt, glow, spotlight, aurora, parallax, blobs, or 3D card effects.
  Two components are the deliberate exceptions and the only ones: `graphics/ParticleField` and
  `interactions/LayerPrism` (perspective, 3D transforms, pointer tilt — see `animation.md` §5.5).
  Do not spread their vocabulary to anything else.
- Hover vocabulary is translate / colour / border / scale-x only. No shadows, no filters.
- Content lives in `src/content/`. Never hardcode copy in components.
- The particle field is hard-gated behind WebGPU + reduced-motion + saveData checks. The site must
  be complete and correct without it.

## Layout

```
src/app/          routes; layout.tsx wires fonts + providers
src/components/
  shell/          Header, Footer, PageShell
  editorial/      Eyebrow, IndexRow, MetricReadout, ProjectCard, ProjectExhibit, ProvenanceStory
  interactions/   MagneticCard, RevealGroup
  motion/         MotionProvider, RouteTransition
  graphics/       ParticleField (client-only, dynamic import)
  ui/             shadcn primitives
src/content/      portfolio data — projects, experience, about, contact
src/lib/          utils, particles/
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
