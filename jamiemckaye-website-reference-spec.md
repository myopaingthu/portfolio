# jamiemckaye.com — Reverse-Engineered Website Experience Specification

Source website: https://jamiemckaye.com/

> This document reconstructs the website's visible design language, information architecture, animation concepts, interaction model, page structure, and implementation philosophy from the live site and its publicly exposed technical descriptions.
>
> Exact values such as animation milliseconds, easing curves, shader parameters, and some typography metrics should be treated as approximations unless verified directly in browser DevTools.

---

# 1. Core Design Idea

This is not a conventional portfolio built around screenshots, cards, and decorative imagery.

The site behaves more like an **interactive technical instrument**.

Its visual identity combines:

```text
editorial typography
+
technical terminal / system-interface language
+
live measurements
+
persistent particle simulation
+
minimal imagery
+
large amounts of negative space
```

The website itself is part of the portfolio.

The core experience is built around a persistent WebGPU particle field containing roughly **110,000 particles**.

That field is used to:

- assemble the homepage headline
- participate in navigation transitions
- visualize a verified performance metric on the Work page
- represent the writing archive as ambient lights
- provide a shared visual language across routes

This means animation should be treated as a **global system**, not as separate effects attached to individual sections.

---

# 2. Global Experience Philosophy

The site feels:

- technical
- editorial
- restrained
- measurable
- deliberate
- research-driven
- non-corporate
- non-SaaS

Avoid:

```text
rounded cards everywhere
glassmorphism
large gradients
floating decorative blobs
huge pill buttons
generic icon grids
stock photography
3D decorative hero objects
heavy drop shadows
```

Prefer:

```text
thin rules
registries
rows
indexes
metrics
monospace metadata
LIVE indicators
build hashes
status labels
numbered sections
arrows
code
technical readouts
prose
particle transformations
```

---

# 3. Global Layout

Primary routes:

```text
/
├── work
├── writing
├── lab
├── services
├── about
└── contact
```

Additional route families include:

```text
/services/[service]
/work/[project]
/writing/[article]
```

The layout is mostly document-based and editorial rather than dashboard-based.

Pages generally follow this rhythm:

```text
navigation
↓
large editorial hero
↓
intro / thesis
↓
indexed sections
↓
technical demo or instrument
↓
long-form explanation
↓
evidence / metrics
↓
direct CTA
↓
instrumentation footer
```

---

# 4. Global Header

The header is visually minimal.

Conceptually:

```text
┌──────────────────────────────────────────────────────────────┐
│ jamiemckaye.com                                              │
│                                                              │
│             work  writing  lab  services  about  contact    │
└──────────────────────────────────────────────────────────────┘
```

Characteristics:

- text-based identity
- restrained wordmark
- no large graphical logo
- lightweight navigation
- generous whitespace
- desktop-first editorial composition
- navigation remains visually secondary to the page headline

The header should feel like part of a publication, not an application shell.

---

# 5. Persistent Particle System

The most important architectural idea is a single persistent graphics layer.

Conceptual component:

```text
<PersistentField />
```

Possible internal states:

```text
BOOT
HERO_ASSEMBLY
AMBIENT
NAV_MELT
WORK_PLOT
ARCHIVE_FIELD
PARKED
REDUCED_MOTION
```

Suggested architecture:

```text
<App>
│
├── <PersistentField />
│      ├── ambient()
│      ├── assembleText()
│      ├── navigationMelt()
│      ├── plotMetric()
│      ├── archiveLights()
│      └── park()
│
├── <GlobalHeader />
│
├── <RouteTransitionController />
│
├── <Page />
│
└── <InstrumentFooter />
```

The particle field should persist across client-side navigation rather than remount on every page.

---

# 6. Intro / Load Animation

The homepage introduction appears to revolve around particles assembling the display headline.

Conceptual sequence:

```text
dark / quiet field
       ↓
particles activate
       ↓
particles move toward glyph geometry
       ↓
SEARCH DIDN'T
DIE. IT MULTIPLIED.
       ↓
supporting text becomes available
       ↓
primary actions become interactive
```

Important:

The headline should not simply use a CSS opacity reveal.

The visual idea is:

```text
particle field
→ letter geometry
→ readable headline
```

A faithful implementation should use geometry or texture-based target positions.

---

# 7. Route Transition

Navigation is presented as a visual **melt**.

Conceptual sequence:

```text
CURRENT PAGE
    ↓
content starts releasing
    ↓
particle field changes state
    ↓
visual structure melts / disperses
    ↓
route changes
    ↓
particles reposition / park
    ↓
new content resolves
    ↓
AMBIENT state
```

Do not implement this as only:

```js
opacity: 1 -> 0
router.push()
opacity: 0 -> 1
```

The particle simulation should actively participate.

Recommended state machine:

```text
AMBIENT
   │
   └─ navigation requested
           │
           ▼
       MELT_OUT
           │
           ▼
       ROUTE_SWAP
           │
           ▼
          PARK
           │
           ▼
       PAGE_REVEAL
           │
           ▼
        AMBIENT
```

---

# 8. Pointer / Magnetic Interaction

The site exposes a component conceptually equivalent to:

```text
<Doors count={3} magnetic />
```

This strongly suggests cursor-proximity magnetic interaction.

Example:

```text
mouse away

┌─────────────────────────────┐
│ 01 →                        │
│ THE AUDIT                   │
└─────────────────────────────┘


mouse approaches

        ↘
┌─────────────────────────────┐
│      01 →                   │
│      THE AUDIT              │
└─────────────────────────────┘
       ↑
text subtly pulls toward cursor
```

Recommended implementation:

```text
distance > influence radius
    x = 0
    y = 0

distance < influence radius
    x = cursorDeltaX * 0.10–0.20
    y = cursorDeltaY * 0.10–0.20
```

Return motion should be spring-like or smoothly eased.

Do not assume a custom replacement cursor unless verified.

---

# 9. Homepage

## Hero

Content structure:

```text
Jamie McKaye / Technical consultant


SEARCH DIDN'T
DIE. IT MULTIPLIED.


Nineteen years of technical SEO...
Strategy through production code —
one person, no handoffs.


Audit my site
Build with me
Read the notes
```

Visual hierarchy:

```text
small eyebrow
↓
very large display headline
↓
short supporting prose
↓
three text-forward actions
```

The hero should feel spacious and quiet.

The particles provide the spectacle.

The UI does not need extra decoration.

---

# 10. Homepage — "One Site. Every Reader."

Heading:

```text
One site.
Every reader.
```

The concept is that the same site is read by different classes of readers:

```text
human
search engine
answer engine
agent
machine-readable endpoint
```

Possible states / representations:

```text
Rendered page
Structured identity
llms.txt
Agent-readable representation
Search representation
```

The section should feel like switching lenses over the same content.

Avoid making these into unrelated visual cards.

---

# 11. Homepage — Thesis

Structure:

```text
THE THESIS

The readers multiplied —
Google,
answer engines,
agents.

Legibility stopped being marketing
and became an engineering discipline.
```

Supporting principles:

```text
ONE PERSON
strategy through production code

INSTRUMENTED
claims are measured

REFERENCE BUILD
the site itself is the portfolio
```

Visual pattern:

```text
small uppercase label

VERY LARGE EDITORIAL ARGUMENT

small evidence / metadata
```

This pattern repeats throughout the site.

---

# 12. Homepage — Three Doors

Main navigation concept:

```text
THREE DOORS


01 → THE AUDIT

Technical SEO and
AI-search readiness


02 → THE BUILD

AI systems and
full-stack engineering


03 → THE NOTES

Working notes on
search and agents
```

Design:

- full-width editorial rows
- number column
- heading
- supporting copy
- arrow
- subtle border/rule
- magnetic hover behaviour
- no floating card style

Conceptual layout:

```text
01       THE AUDIT                          →
         Technical SEO and AI-search readiness
───────────────────────────────────────────────

02       THE BUILD                          →
         AI systems and full-stack engineering
───────────────────────────────────────────────

03       THE NOTES                          →
         Working notes on search and agents
```

---

# 13. Homepage — Capability Index

Structure:

```text
CAPABILITY INDEX

01  technical seo & ai search        →
02  ai systems & consulting          →
03  full-stack build                 →
04  technical writing                →
```

Each row includes descriptive copy.

Recommended grid:

```text
[number] [large title] [description] [arrow]
```

Interactions should be restrained:

- shift
- underline
- arrow movement
- contrast change

Avoid:

- large scale transforms
- glow effects
- large card lifts

---

# 14. Homepage — Why One Person

This is a prose-heavy editorial section.

Metadata may appear as short factual lines:

```text
in practice since 2007

auditor · fractional head of search · embedded lead

hersham, uk · london · remote

read by me · shipped by me · answered by me
```

Key design rule:

**Prose is part of the visual composition.**

Do not artificially break every paragraph into cards.

---

# 15. Homepage — Machine Lens

Heading:

```text
THE MACHINE LENS
what the readers read

same payload
three real representations
nothing mocked
```

Representations include:

## 01 — Rendered HTML

Example:

```html
<script type="application/ld+json">
{
  "@type": "Person"
}
</script>
```

## 02 — Markdown

A machine-readable Markdown rendering.

## 03 — MCP / Site Manifest

A structured description of:

- the person
- the site
- the services
- available routes
- machine-readable endpoints

Design pattern:

```text
INDEX
TITLE
DESCRIPTION
────────────────────────
monospace / code content
────────────────────────
verification note
```

The technical representation should feel real, not decorative.

---

# 16. Homepage — Writing Teaser

Structure:

```text
FIELD NOTES —
THE PEN IS WARM
```

Article records appear like entries in a registry:

```text
NOTE
Your website will be deposed
voiced
2026-08-27
→
```

or:

```text
REC 11
The measurement problem...
→
```

Then a link:

```text
the archive & the recordings →
```

Use metadata-heavy editorial rows rather than magazine thumbnails.

---

# 17. Global Closing CTA

Example:

```text
THE DIRECT LINE

One address,
read by the person who does the work.

Two plain sentences beat a brief.

start a conversation
see the record
```

Design rules:

- plain language
- no oversized marketing panel
- no decorative gradient
- no giant rounded button
- direct and human

---

# 18. Global Footer / Instrument Panel

The footer behaves like a small observability panel.

Example:

```text
SELF-AUDIT

agent-ready grader
LIVE

mcp tools
05

corpus
222 → 31

markdown mirrors
LIVE
```

Visitor metrics:

```text
YOUR VISIT — MEASURED ON YOU, JUST NOW

TTFB
LCP
INP
CLS
```

Build metadata:

```text
compiled from 61051c1
2026-09-12 15:22 UTC
push = ship
```

This should visually resemble:

```text
build system
+
runtime status
+
site diagnostics
```

rather than a conventional footer.

---

# 19. Work Page

Route:

```text
/work/
```

Hero:

```text
WORK — THE REGISTRY

ON THE RECORD.
```

Top-level summary metrics:

```text
08 products
16 engagements
06 named
60 readouts
```

The page behaves like a registry/database.

Main section families:

```text
Named engagements
Verified readout
Unsealed case files
Built & shipped products
Client ledger
Claim-publication protocol
```

The page should not look like a portfolio thumbnail grid.

---

# 20. Work — Signature Scroll Plot

A notable metric:

```text
UK TILE RETAILER

2.2 s → 47 ms

TTFB
Δ -97.9%
```

This is visualized using particles and scroll progress.

Conceptual sequence:

```text
scroll reaches metric
        ↓
ambient particles detach
        ↓
particles reorganise into plot
        ↓
metric is revealed
        ↓
scroll position drives progress
        ↓
plot completes
        ↓
particles release back to field
```

This should use scroll-scrubbing.

Possible implementation:

```text
ScrollTrigger / MotionValue
progress 0.0 → 1.0
```

The particle target geometry interpolates using scroll progress.

---

# 21. Work — Registry Entries

Named engagement:

```text
ENG-001

NAMED

NIKE

description...

brand research
retail marketing
europe-wide

open case file →
```

Built product:

```text
BLT-01
2025–2026 · LIVE

KLARVO

EU AI Act compliance platform

2,816
registry entries

61k
tokens

open case file →
```

Design principles:

- status labels
- identifiers
- date
- category
- evidence
- measurements
- link

---

# 22. Work Detail Page

Typical structure:

```text
← work — the registry

BLT-08
BUILT & SHIPPED

jamiemckaye.com

portfolio as working exhibit
```

Metadata:

```text
sector
period
role
```

Readouts:

```text
READOUTS — MEASURED, SOURCED

110,000
particles

NOMINEE
Awwwards

222 → 31
archive conversion
```

Main case-study structure:

```text
01 THE PROBLEM

02 THE ENGINEERING

03 THE PROOF
```

Final provenance block:

```text
PROVENANCE

surfaces touched
numbers read from
stack
tags
```

This can be used as a reusable case-study page template.

---

# 23. Services Landing Page

Route:

```text
/services/
```

Hero:

```text
SERVICES — THE RACK

ONE SPINE,
FOUR FACETS.
```

Main service bays:

```text
01 Technical SEO
02 AI systems
03 Full-stack
04 Technical writing
```

Each bay includes a small live demonstration of the service itself.

This is important:

The page **shows the service through an instrument**, instead of merely describing it.

---

# 24. Services Bay 01 — Technical SEO

Concept:

live crawl waterfall / route inspection.

Example:

```text
/
200

/work/
200

/writing/
200

/services/
200

/lab/
200

/llms.txt
200
```

Visual inspiration:

```text
network inspector
+
terminal output
+
crawl report
```

---

# 25. Services Bay 02 — AI Systems

Agent / tool execution demo.

Example:

```text
> can an agent book a discovery call?

tool · calendar.check
...

tool · scope.draft
...

tool · call.book
...
```

Then a live input or question interface.

Design goal:

Make it feel like a working agent terminal.

Avoid making it look like a generic chatbot bubble UI.

---

# 26. Services Bay 03 — Full-Stack

Example sequence:

```text
01 <Header wordmark nav />
02 <Headline display chrome />
03 <Doors count={3} magnetic />
04 <Metrics source="live" />
05 deploy — vitals green ✓
```

Then a simplified rendered result:

```text
jamiemckaye.com
work writing lab

Search didn't die.
It multiplied.

audit
build
read
```

Concept:

```text
code / component primitives
        ↓
interface
        ↓
deployment / healthy vitals
```

---

# 27. Services Bay 04 — Technical Writing

Before:

```text
We leverage best-in-class synergies
to holistically empower your digital
transformation journey.
```

After:

```text
We fix what's broken,
and prove it.
```

Interaction should resemble:

- editorial markup
- redline
- rewriting
- deletion
- replacement
- simplification

Avoid using a generic image before/after slider.

---

# 28. Service Detail Template

Shared pattern:

```text
FACET NUMBER

SERVICE TITLE

intro

↓ scroll — instrument is live
```

Then:

```text
LIVE SERVICE INSTRUMENT
```

Then:

```text
THE WORK — MANIFEST
```

Then:

```text
HOW IT'S DIFFERENT
```

Then:

```text
METHOD — HOW IT RUNS

01 ...
02 ...
03 ...
04 ...
```

Then:

```text
MANIFEST — WHAT LANDS ON YOUR DESK

✓ deliverable
✓ deliverable
✓ deliverable
```

Then:

```text
ENGAGEMENT — THE TERMS
```

Then:

```text
PROOF — ON THE RECORD
```

Then:

```text
ASKED STRAIGHT — ANSWERED STRAIGHT

01 FAQ +
02 FAQ +
03 FAQ +
04 FAQ +
```

This is a reusable route template.

---

# 29. About Page

Hero:

```text
ABOUT — THE OPERATOR

ONE PERSON.
NO HANDOFFS.
```

Then:

```text
ACT I
THE PRACTICE
```

Disciplines:

```text
01 technical seo
02 ai systems
03 full-stack build
04 technical writing
```

Then:

```text
ACT II
THE PROVENANCE
```

Chronological chapters:

```text
00 early 2000s
The checkout.

01 2007–2011
Sold it, then learned it.

02 2011–2017
The systems game.

03 2008–now
The independent thread.

04 2026
Build, don't just advise.
```

Later timeline:

```text
2007
2011
2015
2020
2024
2026
```

Operating principles:

```text
01 proof over promises
02 small surface area
03 reversible first
04 plain reporting
```

The About page is essentially a cinematic editorial résumé.

---

# 30. Writing Index

Hero:

```text
WRITING — FIELD NOTES

WRITING.
```

Archive concept:

```text
222 posts were retired

191 remain retired
31 re-instrumented
01 new
```

The archive is represented in the particle field.

Conceptually:

```text
old article
   ↓
ambient particle/light

active / restored article
   ↓
lit / linked point
```

Article registry:

```text
REC 11

2026-08-24
RE-INSTRUMENTED
VOICED

The measurement problem
is the whole problem now

description...

→
```

---

# 31. Article Detail Page

Article header:

```text
FIELD NOTE

first published 2026-08-27


YOUR WEBSITE
WILL BE DEPOSED


deck / abstract


1,335 words
6 min read
9 min listen
AI SEARCH
```

Audio block:

```text
read by jamie mckaye
his own voice via voice model

00:00 / --:--
1×
```

Reading-progress block:

```text
SECTIONS 0%

01 The page stops being the product
02 Witnesses don't fail on weakness
03 Depose my site
04 The dated claim
05 Prepare the witness
```

As the article is read:

```text
0%
↓
20%
↓
40%
↓
60%
↓
80%
↓
100%
```

Article content alternates:

```text
large editorial heading

paragraphs

blockquote

illustration / technical plate

code example

prose
```

The article experience should be calmer than the homepage.

---

# 32. Lab Page

Route:

```text
/lab/
```

Hero:

```text
LAB — WORKING EXHIBITS

RUN THE INSTRUMENT.
```

First major tool:

```text
[yoursite.co.uk] [GRADE IT] [SELF-TEST]
```

The Lab then becomes a public technical observability surface.

Possible exhibits include:

```text
Agent-ready grader
MCP endpoint
llms.txt
Concierge
Machine-reader guestbook
Grader league
Markdown mirrors
Vitals loop
Accessibility audit
The deposition
```

Visual density should be higher here than on other pages.

Think:

```text
developer console
+
observability dashboard
+
research notebook
```

but keep the same editorial visual language.

---

# 33. Contact Page

Hero:

```text
CONTACT — THE DIRECT LINE

NO FORMS.
NO FUNNELS.
```

Yet the page contains a client-side brief compiler.

Step 1:

```text
01 — WHAT IS THIS ABOUT

[something's broken]
[building something]
[can't measure it]
[ai / agent readiness]
[just talking]
```

Step 2:

```text
02 — IN YOUR WORDS

[text area]
```

Step 3:

```text
03 — YOUR SITE

[example.co.uk]
```

Live preview:

```text
TRANSMISSION PREVIEW

to       jamie@...
subject  Brief

────────────────────

compiled message...

────────────────────

0 / 1400
```

Message completeness indicators:

```text
○ site
○ problem
○ evidence
○ the ask
```

The compiler should remain client-side.

Final action opens the user's email client rather than submitting into a CRM.

After the compiler:

```text
SHAPES — HOW ENGAGEMENTS RUN

01 audit
02 fractional head of search
03 embedded technical lead
04 build
```

And principles such as:

```text
NO CRM
NOTHING STORED
AGENTS WELCOME
```

---

# 34. Scroll Behaviour

Do not hijack scrolling globally.

Most pages should use normal document scrolling.

Insert enhanced animation only at intentional moments.

Preferred model:

```text
normal reading
↓
normal reading
↓
SPECIAL INSTRUMENT ENTERS
↓
scroll controls its progress
↓
instrument resolves
↓
normal reading continues
```

Use pinned or scrubbed behaviour sparingly.

Good candidates:

- work metric plot
- certain service instruments
- archival particle transformation
- article progress

---

# 35. Motion Design Rules

Animation should communicate meaning.

Good:

```text
particles assemble text
particles become data
particles represent archived content
navigation melts into next route
code becomes interface
text is edited in-place
metrics animate when measured
```

Bad:

```text
random fade-ups on every section
decorative spinning
large parallax everywhere
arbitrary 3D tilt
meaningless floating blobs
excessive cursor trails
```

Motion should feel engineered, not ornamental.

---

# 36. Recommended Animation Stack

Possible stack:

```text
Next.js
React
Three.js / WebGPU
TSL or shaders
GSAP
GSAP ScrollTrigger
Framer Motion / Motion
Lenis optional
```

Suggested responsibilities:

```text
Three.js / WebGPU
    persistent particle field
    target geometry
    archive lights
    work plot

GSAP
    route melt
    sequencing
    scroll-scrubbing
    timeline coordination

React / Next.js
    state
    content
    routing
    page shell

CSS
    typography
    grid
    rules
    responsive behaviour
    focus states
```

Avoid making GSAP responsible for every basic UI transition.

---

# 37. Animation Controller

Conceptual API:

```ts
type FieldState =
  | 'boot'
  | 'hero'
  | 'ambient'
  | 'melt'
  | 'workPlot'
  | 'archive'
  | 'parked'
  | 'reducedMotion'
```

Possible interface:

```ts
field.setState('hero')
field.assembleText(target)
field.melt()
field.plot(metricData)
field.showArchive(points)
field.park()
```

Route coordinator:

```ts
async function navigate(url) {
  await field.melt()
  await router.push(url)
  await field.park()
  revealPage()
  field.setState('ambient')
}
```

---

# 38. Suggested Component System

```text
components/
│
├── shell/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PageShell.tsx
│   └── RouteTransition.tsx
│
├── graphics/
│   ├── PersistentField.tsx
│   ├── ParticleRenderer.tsx
│   ├── ParticleTargets.ts
│   └── useFieldState.ts
│
├── editorial/
│   ├── EditorialHero.tsx
│   ├── Eyebrow.tsx
│   ├── DisplayHeading.tsx
│   ├── ProseSection.tsx
│   └── PullQuote.tsx
│
├── registry/
│   ├── RegistryRow.tsx
│   ├── RegistryIndex.tsx
│   ├── StatusLabel.tsx
│   └── MetricReadout.tsx
│
├── interactions/
│   ├── MagneticLink.tsx
│   ├── AccordionRow.tsx
│   ├── ScrollInstrument.tsx
│   └── ProgressIndex.tsx
│
└── instruments/
    ├── CrawlWaterfall.tsx
    ├── AgentTerminal.tsx
    ├── BuildInstrument.tsx
    ├── RedlineDemo.tsx
    ├── SiteGrader.tsx
    └── BriefCompiler.tsx
```

---

# 39. Typography Direction

Exact font families should be verified separately.

The visual system appears to require at least:

```text
Display / editorial face
    used for large arguments and hero headlines

Neutral sans
    body copy and navigation

Monospace
    metrics, metadata, code, build state
```

Important hierarchy:

```text
EYEBROW
small / uppercase / tracked

DISPLAY
very large
high visual authority

BODY
comfortable reading measure

METADATA
compact / technical

CODE
monospace
```

Do not overuse font weights.

Scale and spacing should create hierarchy.

---

# 40. Color Direction

Exact values should be sampled in-browser.

General direction:

```text
near-black / dark neutral
warm or neutral light text
muted secondary gray
thin low-contrast borders
limited accent usage
```

The interface should mostly be monochrome.

Color should primarily indicate:

- state
- measurement
- status
- active particle state

Avoid large decorative gradients.

---

# 41. Grid and Spacing Philosophy

Use:

- wide desktop canvas
- generous side gutters
- strong vertical rhythm
- large whitespace between editorial chapters
- precise alignment
- multi-column metadata
- thin dividers

Common patterns:

```text
12-column desktop grid
or
asymmetric editorial grid
```

Important:

Sections should not all share identical max-widths.

Use narrow widths for prose and broader widths for instruments.

---

# 42. Responsive Behaviour

Likely adaptation strategy:

Desktop:

```text
multi-column editorial layout
large display typography
horizontal registries
wide technical instruments
```

Tablet:

```text
reduced columns
same hierarchy
simplified instruments
```

Mobile:

```text
single-column flow
large typography scaled down
metadata stacked
registry rows become vertical
technical instruments scroll or simplify
magnetic effects disabled
particle density reduced
```

Never allow the graphics layer to compromise readability.

---

# 43. Reduced Motion

Critical accessibility requirement.

When:

```css
@media (prefers-reduced-motion: reduce)
```

Disable:

```text
particle simulation
scroll-scrub animation
load sequences
navigation melts
continuous motion
```

Replace with static equivalents.

Example:

```text
Animated headline
→ static headline

Particle metric plot
→ static chart / metric

Archive field
→ static archive count

Melt transition
→ immediate route change
```

Content must remain identical.

---

# 44. Progressive Enhancement

The site philosophy supports a functional baseline without the graphics layer.

Layer architecture:

```text
HTML content
    ↓
CSS layout
    ↓
JavaScript interactions
    ↓
WebGPU / particle enhancement
```

The content should never depend solely on canvas.

Meaning must exist in semantic HTML.

---

# 45. Accessibility

Interactive elements should support:

- keyboard navigation
- visible focus state
- meaningful labels
- semantic landmarks
- reduced motion
- sufficient contrast
- canvas alternatives
- usable content without WebGPU

For visual instruments:

```text
canvas
+
semantic fallback
+
textual metric
```

Example:

The particle TTFB plot must still expose:

```text
2.2s → 47ms
-97.9%
```

as normal HTML.

---

# 46. Implementation Philosophy

The strongest design lesson is:

**do not animate everything.**

Create a quiet baseline.

Then reserve the high-cost visual system for meaningful transformations.

Good example:

```text
headline
→ particle assembly

navigation
→ melt

metric
→ particle plot

archive
→ ambient lights

service capability
→ live demo
```

Everything else can remain:

```text
text
rules
spacing
indexes
prose
metrics
```

---

# 47. Reproduction Acceptance Criteria

A recreation inspired by this site should satisfy the following.

## Global

- persistent visual field across routes
- editorial layout
- minimal decorative chrome
- text-heavy design
- machine/readout aesthetic
- strong whitespace
- registry-style components
- technical metadata

## Motion

- meaningful particle hero sequence
- global navigation transition
- at least one scroll-scrubbed data visualization
- magnetic interaction on major navigation targets
- reduced-motion fallback

## Homepage

- major display thesis
- three-door navigation
- capability index
- machine-reader section
- writing registry
- direct CTA
- instrumentation footer

## Work

- registry layout
- metrics
- evidence
- project identifiers
- case-study detail pages
- scroll-controlled verified metric

## Services

- four numbered facets
- a live instrument per service
- shared service detail template

## About

- editorial biography
- chapter structure
- timeline
- operating principles

## Writing

- archive concept
- article registry
- audio metadata
- reading progress
- long-form editorial layout

## Lab

- real functional tools
- public technical instrumentation
- dense technical layout

## Contact

- direct communication philosophy
- client-side brief compiler
- live message preview
- no CRM-style funnel

---

# 48. Recommended Project Architecture

```text
src/
├── app/
│   ├── page.tsx
│   ├── work/
│   ├── services/
│   ├── writing/
│   ├── lab/
│   ├── about/
│   └── contact/
│
├── components/
│   ├── shell/
│   ├── editorial/
│   ├── registry/
│   ├── instruments/
│   ├── interactions/
│   └── graphics/
│
├── lib/
│   ├── animation/
│   ├── particles/
│   ├── metrics/
│   └── content/
│
├── styles/
│   ├── tokens.css
│   ├── typography.css
│   ├── grid.css
│   └── motion.css
│
└── content/
    ├── work/
    ├── writing/
    └── services/
```

---

# 49. Suggested Animation State Flow

```text
BOOT
 │
 ▼
HERO_ASSEMBLY
 │
 ▼
AMBIENT
 │
 ├──── pointer ─────► MAGNETIC_INTERACTION
 │
 ├──── /work ───────► DATA_PLOT
 │
 ├──── /writing ────► ARCHIVE_FIELD
 │
 └──── navigation
          │
          ▼
       MELT_OUT
          │
          ▼
       ROUTE_SWAP
          │
          ▼
       PARK
          │
          ▼
       PAGE_REVEAL
          │
          ▼
       AMBIENT
```

---

# 50. Developer Summary

If the whole website had to be described in one implementation instruction:

> Build an editorial, technical portfolio over a persistent WebGPU particle field. Keep the normal interface extremely restrained—typography, rules, indexes, metrics, code, prose, build states, and registries. Reserve spectacle for meaningful transformations: assemble the thesis from particles, melt the interface during navigation, convert verified data into a particle visualization, and represent archived content as ambient light. The website itself should act as proof of the technical capability being presented.

The main design equation is:

```text
EDITORIAL RESTRAINT
+
LIVE TECHNICAL INSTRUMENTATION
+
MEANINGFUL MOTION
+
MEASURED CLAIMS
=
THE EXPERIENCE
```

---

# 51. What Still Needs Browser-Level Verification

Before attempting a pixel-perfect reproduction, verify these directly in a browser with DevTools:

```text
exact font families
exact font weights
exact text sizes
exact line heights
exact page gutters
desktop max width
breakpoints
mobile menu behaviour
exact background and text hex values
animation durations
animation easing curves
particle shader parameters
particle point sizes
pointer spring constants
scroll trigger start/end points
sticky offsets
hover transitions
focus styles
canvas scaling strategy
GPU fallback strategy
```

These should not be invented if the goal is a truly faithful reproduction.

---

# End

Reference website:

https://jamiemckaye.com/
