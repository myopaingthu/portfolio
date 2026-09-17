export const site = {
  name: "Myo Paing Thu",
  role: "Software Engineer",
  url: "https://myopaingthu.dev",
  tagline: "backend, frontend, and the systems between",
  description:
    "Software engineer with 5+ years across FinTech, core banking, e-commerce and Japanese web solutions. Laravel, NestJS, React, Vue — strategy through production code.",
  location: "Bangkok, Thailand",
  since: 2021,
};

export const nav = [
  { label: "projects", href: "/projects" },
  { label: "experience", href: "/experience" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

type PrismSheet =
  | {
      kind: "screen";
      source: string;
      headline: [string, string];
      foot: string;
      mark: string;
    }
  | {
      kind: "code";
      source: string;
      badge: string;
      code: string;
      foot: string;
    };

export const prism: {
  topline: string;
  layers: {
    id: string;
    label: string;
    sheet: PrismSheet;
    surface: string;
    title: string;
    body: string;
    link: { label: string; href: string };
  }[];
} = {
  topline: "One request. Every layer.",
  layers: [
    {
      id: "interface",
      label: "Interface",
      sheet: {
        kind: "screen",
        source: "billing / run 2481",
        headline: ["1,284 invoices", "issued."],
        foot: "Recurring billing — automated run",
        mark: "MPT",
      },
      surface: "Rendered screen",
      title: "A surface that explains itself.",
      body: "React, Vue and TypeScript. The part people touch has to look obvious, whatever it costs behind the glass.",
      link: { label: "See the work", href: "/projects" },
    },
    {
      id: "service",
      label: "Service",
      sheet: {
        kind: "code",
        source: "POST /api/billing/runs",
        badge: "{ }",
        code: `{
  "cycle": "2026-09",
  "tenant": "acme-isp",
  "idempotency_key": "run_2481",
  "dispatch": "queue:billing"
}`,
        foot: "Accepted once. Safe to retry.",
      },
      surface: "Request handler — excerpt",
      title: "A contract that holds under retry.",
      body: "Laravel and NestJS. Validation, idempotency keys and queues, so the same call twice still bills once.",
      link: { label: "Read the record", href: "/experience" },
    },
    {
      id: "data",
      label: "Data",
      sheet: {
        kind: "code",
        source: "ledger.invoice_lines",
        badge: "SQL",
        code: `BEGIN;
  INSERT INTO invoices      (...);
  INSERT INTO ledger_lines  (...);
  UPDATE subscriptions
     SET billed_through = '2026-09-30';
COMMIT;`,
        foot: "All three land, or none do.",
      },
      surface: "Transaction — excerpt",
      title: "A write that balances or fails.",
      body: "MySQL, PostgreSQL and Redis. Money moves inside one transaction — all of it, or none of it, never half.",
      link: { label: "How I work", href: "/about" },
    },
  ],
};

export const thesis = {
  eyebrow: "the thesis",
  lead: "Most systems fail at the seams —",
  emphasis: "the migration, the integration, the edge case at 2am.",
  tail: "That is where I work.",
  principles: [
    {
      label: "full stack",
      body: "Laravel and NestJS on the back, React and Vue on the front. One person across the whole request.",
    },
    {
      label: "production first",
      body: "Core banking migrations, payment rails, billing engines. Systems where being wrong costs money.",
    },
    {
      label: "measured",
      body: "30% fewer manual errors on core banking ops. 90% automation on recurring billing. Numbers, not adjectives.",
    },
  ],
};

export const doors = [
  {
    index: "01",
    title: "The work",
    body: "Nineteen shipped projects across banking, e-commerce and automation platforms.",
    foot: "projects · case studies",
    href: "/projects",
  },
  {
    index: "02",
    title: "The record",
    body: "Five roles, five years. Core banking, FinTech, AI automation, Japanese web systems.",
    foot: "experience · timeline",
    href: "/experience",
  },
  {
    index: "03",
    title: "The person",
    body: "How I work, what I have learned, and what I am looking for next.",
    foot: "about · contact",
    href: "/about",
  },
];

export const capabilities = [
  {
    index: "01",
    title: "backend engineering",
    body: "PHP, Laravel, NestJS, Node.js, Express. API design, queue architecture, background job pipelines, payment and billing engines.",
    href: "/projects",
  },
  {
    index: "02",
    title: "frontend engineering",
    body: "React, Vue 3, TypeScript. Complex workflow builders, admin portals, real-time interfaces, design-system work.",
    href: "/projects",
  },
  {
    index: "03",
    title: "systems & data",
    body: "MySQL, PostgreSQL, MongoDB, MS SQL Server, Redis. Legacy migration, multi-tenancy, event-driven architecture with Kafka.",
    href: "/projects",
  },
  {
    index: "04",
    title: "platform & delivery",
    body: "Docker, AWS, GitLab CI/CD. Observability with Prometheus and Grafana. Mentoring interns and junior engineers.",
    href: "/experience",
  },
];

export const readouts = [
  { label: "years shipping", value: "05", note: "in practice since 2021" },
  { label: "projects", value: "19", note: "10 professional · 09 personal" },
  { label: "roles", value: "05", note: "banking · fintech · ai" },
  { label: "manual error cut", value: "30%", note: "core banking ops" },
];
