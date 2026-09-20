
export const personalInfo = {
  name: "Myo Paing Thu",
  title: "Software Engineer",
  tagline: "Building modern web experiences!",
  description: "Results-driven Software Engineer with 5+ years of experience across SaaS, Financial Services, Digital Health, E-commerce, and HR Tech. I love building scalable, secure, and impactful software.",
  heroHighlights: ["PHP", "JavaScript", "Laravel", "Vue", "React"],
  currentFocus: "Backend, Frontend, AI, and Cloud",
  experience: "5+ years of full-stack delivery",
  education: {
    degree: "Bachelor of Computer Science | Software Engineering",
    institution: "University of Information Technology, Yangon",
  },
  about: "I build dependable web products from interface to infrastructure, carrying the work across product UI, APIs, data, and delivery.",
};

export const skillGroups = [
  {
    title: "Interface systems",
    icon: "Code",
    signal: "UI → STATE",
    description: "Accessible interfaces, stateful workflows, and design systems that stay fast.",
    items: ["HTML", "CSS", "JavaScript", "Vue.js", "React.js", "Material UI", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Application core",
    icon: "Server",
    signal: "API → DOMAIN",
    description: "Secure APIs and product logic, from Laravel monoliths to NestJS services.",
    items: ["PHP", "Laravel", "Express.js", "Node.js", "NestJS", "Livewire", "Filament"],
  },
  {
    title: "Data layer",
    icon: "Database",
    signal: "QUERY → CACHE",
    description: "Transactional schemas, document stores, caching, and real-time data.",
    items: ["MySQL", "MongoDB", "MS SQL Server", "Redis", "Firebase"],
  },
  {
    title: "Delivery",
    icon: "Wrench",
    signal: "COMMIT → CLOUD",
    description: "Containers, cloud deployment, source control, and automated delivery.",
    items: ["Docker", "AWS", "Git", "GitHub", "GitLab", "Bitbucket", "GitLab CI/CD"],
  },
];

export const aboutPage = {
  eyebrow: "about — the operator",
  headline: ["One person.", "Whole stack."],
  register: "in practice since 2021 · bangkok · remote across time zones",
  profileLabel: "the operator, in short",
  workEyebrow: "how I work",
  toolkit: {
    ariaLabel: "Four engineering disciplines assembling into one full-stack practice",
    eyebrow: "the toolkit: four disciplines, one pair of hands",
    count: "04 parts",
    assembled: "assembled — interface to infrastructure",
    note: "one builder · no handoff",
  },
};

export const experienceTimeline = [
  {
    role: "Software Engineer",
    company: "Phluid Worldwide",
    period: "Feb 2025 - Present",
    bullets: [
      "Contributed to the development of an ISO compliance system that enables users to apply for ISO certification, featuring complex file management, a built-in document editor, and AI integration. The system was built using Laravel Filament.",
      "Contributed to the development of an HR Management System for an HR company, focusing on secure employee data handling, attendance tracking, and role-based access.",
      "Managed and enhanced a multi-tenant ISP billing and subscription platform built with NestJS, MongoDB, and React.",
      "Maintained automated billing cycles and invoice generation engines using Bull (Redis) and Puppeteer, ensuring 90% automation efficiency for recurring charges."
    ],
  },
  {
    role: "Software Engineer",
    company: "NOCA.AI",
    period: "June 2025 - December 2025",
    bullets: [
      "Contributed in the frontend and backend for an enterprise-grade, no-code automation platform using React.js and Node.js. Built with React.js and node.js.",
      "Developed complex workflow builders that enable users to create 'digital employees' by connecting disparate SaaS systems like Salesforce, Google Drive, and Dropbox.",
      "Built the 'prompt-to-workflow' interface, allowing users to transform plain-English descriptions into functional,automated business applications.",
    ],
  },
  {
    role: "Software Engineer",
    company: "uab bank",
    period: "Jan 2024 - Present",
    bullets: [
      "Mainly contribute in core banking system migration projects, enhancing system reliability, reducing human error by 30%, and improving user experience through automation enhancements.",
      "Successfully launched a social media system with multimedia management and an in-app gift system that facilitates real-time user interactions and reward claiming. Built with Laravel, MySQL, and Livewire, system streamlines dynamic form control within the admin backend.",
      "Designed, developed, and launched a Payroll Processing System to streamline operations for internal teams and partner companies.",
      "Designed and implemented admin and client admin portals for the Sermal feature in the uab Pay mobile wallet application.",
      "Successfully migrated the Clearing House System and Operation Cash Management System from legacy stacks to modern PHP and MS SQL Server versions.",
      "Maintain and troubleshoot other core banking support modules to ensure smooth operation.",
      "Mentor and train interns and junior team members, ensuring a smooth onboarding process and skill development for newcomers.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Super Seven Stars Co., Ltd Myanmar",
    period: "Jan 2023 - Jan 2024",
    bullets: [
      "Designed and developed APIs and Admin Portals for an On-Demand Grocery and Food Service platform, incorporating advanced algorithms such as real-time location-based delivery matching.",
      "Fully developed APIs and Admin Portals for a Classified Car Marketplace platform, providing a seamless user experience for buying and selling vehicles.",
      "Contributed to all stages of the development lifecycle, ensuring robust architecture and efficient performance.",
    ],
  },
  {
    role: "Junior Developer",
    company: "METATEAM MYANMAR Co., Ltd",
    period: "Nov 2021 - Jan 2023",
    bullets: [
      "Developed and maintained APIs and Admin Portals for the Evaluation Management System, collaborating with senior team members to support a Japanese restaurant's operational needs.",
      "Maintained and updated the Japan Television Programs Guide System, developed using Vue 3 Composition API with TypeScript.",
      "Maintained and updated Japanese systems, including the Book Guide and Review System for Students.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: "Professional Work" | "Personal Project";
  kind: string;
  status: string;
  summary: string;
  description: string;
  readouts: { value: string; label: string }[];
  tags: string[];
  links: { label: string; href: string }[];
  gallery?: string;
};

export const projects: Project[] = [
  {
    slug: "noca-ai",
    title: "NOCA.ai",
    category: "Professional Work",
    kind: "no-code automation platform · workflow builder",
    status: "professional · live",
    summary: "Digital employees, assembled by wiring SaaS systems together without code.",
    description:
      "An AI-powered automation platform where users can create many automation workflows from various SaaS like SalesForce, Google Drive and DropBox. I've involved as a full stack developer in building this platform.",
    readouts: [
      { value: "PROMPT → FLOW", label: "plain-English descriptions become working automations" },
      { value: "CONNECTORS", label: "Salesforce, Google Drive and Dropbox wired in" },
    ],
    tags: ["React", "TypeScript", "Material UI", "Node.js", "WebSocket"],
    links: [{ label: "View on Website", href: "https://noca.ai/" }],
  },
  {
    slug: "isp-platform",
    title: "ISP platform",
    category: "Professional Work",
    kind: "multi-tenant billing saas · nestjs + mongodb",
    status: "professional · in production",
    summary: "Recurring billing and invoicing for internet providers, one tenant at a time.",
    description:
      "A multi-tenant ISP billing and subscription platform including automated billing cycles and invoice generation engines. I've involved as a full stack developer in building this platform.",
    readouts: [
      { value: "90%", label: "automation efficiency on recurring charge cycles" },
      { value: "MULTI-TENANT", label: "isolated data per provider on one platform" },
    ],
    tags: ["NestJS", "TypeScript", "MongoDB", "React", "Tailwind", "Ant Design"],
    links: [],
    gallery: "isp",
  },
  {
    slug: "iso-compliance-system",
    title: "ISO Compliance System",
    category: "Professional Work",
    kind: "iso certification platform · laravel filament",
    status: "professional · live",
    summary: "Certification applications, document editing and AI review in one system.",
    description:
      "A comprehensive system enabling users to apply for ISO certification, featuring complex file management, a built-in document editor, and AI integration.",
    readouts: [
      { value: "EDITOR + AI", label: "a built-in document editor with AI assistance" },
      { value: "DOCUMENT FLOW", label: "application, evidence and review in one place" },
    ],
    tags: ["Laravel", "Filament", "Python", "Livewire", "Tailwind"],
    links: [{ label: "View on Website", href: "https://iso2.innoquesttech.my/" }],
  },
  {
    slug: "social-uab-pay",
    title: "Social in uab pay",
    category: "Professional Work",
    kind: "in-app social layer · uab pay mobile wallet",
    status: "professional · on the play store",
    summary: "A social feed and gift system living inside a bank's mobile wallet.",
    description:
      "A feature-rich social media system with multimedia management and an in-app gift system that facilitates real-time user interactions and reward claiming. Streamlines dynamic form control within the admin backend.",
    readouts: [
      { value: "IN-APP GIFTS", label: "real-time interaction and reward claiming" },
      { value: "DYNAMIC FORMS", label: "form schema controlled from the admin backend" },
    ],
    tags: ["Laravel", "MySQL", "Payment Gateways"],
    links: [
      {
        label: "View on Play Store",
        href: "https://play.google.com/store/apps/details?id=com.uab.uabbankpay&pcampaignid=web_share",
      },
    ],
    gallery: "social",
  },
  {
    slug: "payroll-processing-system",
    title: "Payroll Processing System",
    category: "Professional Work",
    kind: "payroll operations module · laravel 9 + ms sql",
    status: "professional · internal",
    summary: "Bulk payroll upload and processing for internal teams and partner companies.",
    description:
      "A Payroll Processing System to streamline operations for internal teams and partner companies. This module enables the operations team to upload and process payroll data efficiently and integrates with external HR service providers via API. The system, built using Laravel 9 and MS SQL Server, incorporates background scheduling to handle large datasets seamlessly.",
    readouts: [
      { value: "SCHEDULED", label: "large payroll datasets processed off-request" },
      { value: "HR API", label: "external HR providers integrated over API" },
    ],
    tags: ["Laravel 9", "MS SQL Server", "Background Jobs", "API Integration"],
    links: [],
  },
  {
    slug: "sermal-admin-portals",
    title: "Sermal Admin Portals",
    category: "Professional Work",
    kind: "admin + client portals · uab pay feature",
    status: "professional · in production",
    summary: "Two portals over one feature, split by who is allowed to see what.",
    description:
      "Admin and client admin portals for the Sermal feature in the uab Pay mobile wallet application. These portals include advanced role-based permission management and dynamic forms to enhance the user experience.",
    readouts: [
      { value: "ROLE-BASED", label: "granular permission management across portals" },
      { value: "DYNAMIC FORMS", label: "form control handled from the admin backend" },
    ],
    tags: ["Laravel 9", "MySQL", "Livewire"],
    links: [
      {
        label: "View on Play Store",
        href: "https://play.google.com/store/apps/details?id=com.uab.uabbankpay&pcampaignid=web_share",
      },
    ],
    gallery: "sermal",
  },
  {
    slug: "on-demand-grocery",
    title: "On-Demand Grocery & Food Service",
    category: "Professional Work",
    kind: "grocery & food delivery platform · apis + admin",
    status: "professional · shipped",
    summary: "Orders matched to drivers by location, then broadcast live.",
    description:
      "Incorporating advanced algorithms such as real-time location-based delivery matching. The project featured real-time data handling with WebSocket for broadcasting, Firebase SDK for notifications, and Redis for optimized performance. It also included FCM push notifications and integrated payment systems.",
    readouts: [
      { value: "REAL-TIME", label: "location-based delivery matching" },
      { value: "WEBSOCKET", label: "live order broadcasting, Redis-backed" },
    ],
    tags: ["Laravel 9", "MySQL", "JavaScript", "Firebase SDK", "WebSocket", "Redis"],
    links: [],
    gallery: "grocery",
  },
  {
    slug: "car-marketplace",
    title: "Classified Car Marketplace Platform",
    category: "Professional Work",
    kind: "vehicle marketplace · apis + admin portals",
    status: "professional · shipped",
    summary: "Buying and selling vehicles, with payments and push wired through.",
    description:
      "A Classified Car Marketplace platform, providing a seamless user experience for buying and selling vehicles. The system included FCM push notifications and payment integrations, ensuring smooth communication and secure transactions.",
    readouts: [
      { value: "FCM PUSH", label: "notifications across listing and chat events" },
      { value: "PAYMENTS", label: "integrated gateways for secure transactions" },
    ],
    tags: ["Laravel 9", "MySQL", "JavaScript", "Firebase SDK", "WebSocket", "Redis"],
    links: [],
    gallery: "car",
  },
  {
    slug: "evaluation-management-system",
    title: "Evaluation Management System",
    category: "Professional Work",
    kind: "restaurant operations tooling · laravel 6",
    status: "professional · on the play store",
    summary: "Evaluation workflows built to a restaurant group's operational needs.",
    description:
      "The Evaluation Management System, collaborating with senior team members to support a Japanese restaurant's operational needs.",
    readouts: [
      { value: "APIS + ADMIN", label: "backend and portal delivered together" },
      { value: "OPERATIONS", label: "evaluation cycles run by the floor team" },
    ],
    tags: ["Laravel 6", "MySQL", "JavaScript"],
    links: [
      {
        label: "View on Play Store",
        href: "https://play.google.com/store/apps/details?id=com.thanxi.canayell&pcampaignid=web_share",
      },
    ],
  },
  {
    slug: "book-guide-review-system",
    title: "Book Guide and Review System for Students",
    category: "Professional Work",
    kind: "student book guide · phalcon",
    status: "professional · live",
    summary: "A book guide and review system, maintained and extended on request.",
    description:
      "The Book Guide and Review System for Students which is developed with Phalcon, incorporating user-requested changes and enhancements.",
    readouts: [
      { value: "PHALCON", label: "picked up and extended an unfamiliar stack" },
      { value: "REQUEST-LED", label: "changes shipped from user-reported needs" },
    ],
    tags: ["Phalcon"],
    links: [{ label: "Visit Website", href: "https://sonicmoov.com/works/studico/" }],
  },
  {
    slug: "agent-change-review",
    title: "Agent Change Review",
    category: "Personal Project",
    kind: "vs code extension · claude code hook",
    status: "personal · on the marketplace",
    summary: "Review exactly what a coding agent changed, one request at a time.",
    description:
      "A VS Code extension that reviews what a coding agent changed, one request at a time, before you keep it. A Claude Code hook records a Git checkpoint around each request, so the panel shows only the agent's work for that request — never your own hand-edits — with per-hunk accept/reject, multi-repo support, and keyboard-driven review.",
    readouts: [
      { value: "PER-REQUEST", label: "a Git checkpoint around every agent request" },
      { value: "PER-HUNK", label: "accept or reject each change from the keyboard" },
    ],
    tags: ["VS Code Extension", "TypeScript", "Claude Code", "Git"],
    links: [
      { label: "View on Website", href: "https://marketplace.visualstudio.com/items?itemName=myopaingthu.agent-change-review" },
      { label: "View on GitHub", href: "https://github.com/myopaingthu/agent-change-review" },
    ],
  },
  {
    slug: "db-diagram-tool",
    title: "DB Diagram Tool",
    category: "Personal Project",
    kind: "visual schema designer · react flow + nestjs",
    status: "personal · live demo",
    summary: "An ER canvas and a DBML editor that stay in sync as you work.",
    description:
      "A real-time, AI-assisted visual database schema designer in the spirit of dbdiagram.io. Drag-and-drop ER canvas built with React Flow and a side-by-side DBML editor stay in sync as you work, with a NestJS/Socket.IO backend handling DBML parsing, diagram persistence in MongoDB, JWT authentication, and an AI schema assistant that streams generated changes token-by-token.",
    readouts: [
      { value: "TWO-WAY SYNC", label: "canvas and DBML editor never drift apart" },
      { value: "STREAMING AI", label: "schema changes arrive token by token" },
    ],
    tags: ["React", "NestJS", "TypeScript", "Socket.IO", "MongoDB", "Zustand", "AI Integration"],
    links: [
      { label: "View on Website", href: "https://db-diagram-tool-fe-ruddy.vercel.app" },
      { label: "GitHub", href: "https://github.com/myopaingthu/db-diagram-tool-fe" },
      { label: "GitHub", href: "https://github.com/myopaingthu/db-diagram-tool-bk" },
    ],
  },
  {
    slug: "orderflow-integration-hub",
    title: "OrderFlow Integration Hub",
    category: "Personal Project",
    kind: "event-driven integration platform · six services",
    status: "personal · on github",
    summary: "The business logic is deliberately small. The architecture is the point.",
    description:
      "An event-driven order integration platform built with NestJS, PostgreSQL, Redis, and Redpanda (Kafka-compatible). The business logic is deliberately small; the focus is the architecture — the outbox pattern, idempotency on both edges, retries with backoff, dead-letter handling, and full observability via Prometheus and Grafana across six services.",
    readouts: [
      { value: "06 SERVICES", label: "outbox, idempotency, retries, dead letters" },
      { value: "OBSERVED", label: "Prometheus and Grafana across the whole hub" },
    ],
    tags: ["NestJS", "PostgreSQL", "Kafka", "Redis", "Microservices"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/OrderFlow-Integration-Hub" },
    ],
  },
  {
    slug: "language-learning-app",
    title: "Responsive Language Learning App",
    category: "Personal Project",
    kind: "language learning web app · vue 3 + typescript",
    status: "personal · live demo",
    summary: "Interactive exercises and progress tracking, responsive throughout.",
    description:
      "A responsive web app for language learning, featuring interactive exercises and progress tracking. Built with Vue 3 Composition API and TypeScript.",
    readouts: [
      { value: "VUE 3", label: "built on the Composition API with TypeScript" },
      { value: "RESPONSIVE", label: "one layout from phone through to desktop" },
    ],
    tags: ["Vue 3", "TypeScript"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/language-learning-app" },
      { label: "Live Demo", href: "https://iridescent-melba-df9013.netlify.app/" },
    ],
  },
  {
    slug: "mini-ecommerce",
    title: "Mini Buy and Sell E-commerce with Admin Dashboard",
    category: "Personal Project",
    kind: "e-commerce sandbox · laravel 8 + jquery",
    status: "personal · on github",
    summary: "A storefront and admin dashboard, built to learn the shape of one.",
    description:
      "A simple e-commerce platform with admin dashboard, product management, and other features. Built for learning and experimentation.",
    readouts: [
      { value: "STOREFRONT", label: "products, cart and checkout end to end" },
      { value: "ADMIN", label: "product and order management behind it" },
    ],
    tags: ["MySQL", "jQuery", "Laravel 8"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/Mini-buy-and-sell-ecommerce" },
    ],
  },
  {
    slug: "realtime-forum-app",
    title: "Real time forum app (Udemy Course)",
    category: "Personal Project",
    kind: "real-time discussion platform · laravel websocket",
    status: "personal · on github",
    summary: "Topics, replies and moderation that update without a refresh.",
    description:
      "A real-time discussion platform where users can create topics, post replies, and interact instantly. Features real-time updates, user authentication, topic and post management, and admin moderation. Built with Laravel 8, MySQL, Vue.js, and Laravel WebSocket.",
    readouts: [
      { value: "LIVE UPDATES", label: "Laravel WebSocket pushing new posts" },
      { value: "MODERATED", label: "auth, roles and admin moderation built in" },
    ],
    tags: ["MySQL", "Vue.js", "Laravel 8", "Laravel WebSocket"],
    links: [
      { label: "GitHub", href: "https://github.com/myopaingthu/Forum-backend" },
      { label: "GitHub", href: "https://github.com/myopaingthu/Forum-frontend" },
    ],
  },
  {
    slug: "inventory-management-system",
    title: "Inventory Management System",
    category: "Personal Project",
    kind: "inventory backend · node + express + mongodb",
    status: "personal · on github",
    summary: "Stock tracking and reporting, API-first.",
    description:
      "A backend system for managing inventory, supporting CRUD operations for products, stock tracking, and reporting. Built with Node.js, Express.js, and MongoDB.",
    readouts: [
      { value: "API-FIRST", label: "CRUD, stock movement and reporting endpoints" },
      { value: "MONGODB", label: "a document model for products and stock" },
    ],
    tags: ["Node.js", "Express.js", "MongoDB"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/Inventory_Management_System" },
    ],
  },
  {
    slug: "library-management-system",
    title: "Library Management System",
    category: "Personal Project",
    kind: "library operations · laravel 8 + docker",
    status: "personal · on github",
    summary: "Books, members and lending operations, containerised.",
    description:
      "A web-based system for managing library resources, including book inventory, member management, and lending operations. Built with Laravel 8, MySQL, and Docker.",
    readouts: [
      { value: "LENDING", label: "inventory, members and loan cycles" },
      { value: "DOCKERISED", label: "one command from clone to running" },
    ],
    tags: ["MySQL", "Laravel 8", "Docker"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/Library_Management_System" },
    ],
  },
  {
    slug: "online-counselling-system",
    title: "Online Counselling System",
    category: "Personal Project",
    kind: "counselling platform · laravel 8 + docker",
    status: "personal · on github",
    summary: "Appointments and private messaging between counsellors and clients.",
    description:
      "A web-based platform designed to facilitate online counselling sessions, appointment management, and secure communication between counsellors and clients. Built with Laravel 8, MySQL, and Docker for scalable deployment.",
    readouts: [
      { value: "APPOINTMENTS", label: "scheduling between counsellors and clients" },
      { value: "PRIVATE", label: "communication kept between the two parties" },
    ],
    tags: ["MySQL", "Laravel 8", "Docker"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/Online_Counselling_System" },
    ],
  },
];

export type Plate = {
  src: string;
  label: string;
  note: string;
  orientation: "portrait" | "landscape";
  width: number;
  height: number;
};

export const galleries: Record<string, { title: string; images: Plate[] }> = {
  social: {
    title: "Social in uab pay",
    images: [
      {
        src: "/images/social_home.jpg",
        label: "wallet home",
        note: "The social feed surfaced inside uab Pay's main screen, sitting above the virtual card and the service shortcuts.",
        orientation: "portrait",
        width: 811,
        height: 1800,
      },
      {
        src: "/images/social_landing.jpg",
        label: "the feed",
        note: "A single post with its media, reactions and share controls — the surface the in-app gift system hangs off.",
        orientation: "portrait",
        width: 811,
        height: 1800,
      },
      {
        src: "/images/social_profile.jpg",
        label: "member profile",
        note: "Followers, likes and a member's own media grid, with saved and liked collections alongside.",
        orientation: "portrait",
        width: 811,
        height: 1800,
      },
    ],
  },
  sermal: {
    title: "Sermal Admin Portals",
    images: [
      {
        src: "/images/sm_home.jpg",
        label: "restaurant discovery",
        note: "Cuisine filters, running promotions and merchant cards — the customer half of what the two portals administer.",
        orientation: "portrait",
        width: 811,
        height: 1800,
      },
      {
        src: "/images/sm_info.jpg",
        label: "order history",
        note: "Active and past orders per member, each with its amount and settlement state.",
        orientation: "portrait",
        width: 811,
        height: 1800,
      },
    ],
  },
  grocery: {
    title: "On-Demand Grocery & Food Service",
    images: [
      {
        src: "/images/nm_dh.png",
        label: "operations dashboard",
        note: "Buyers, vendors, sales and delivery tracking in one view, with report generation and activity logs behind it.",
        orientation: "landscape",
        width: 2880,
        height: 1556,
      },
      {
        src: "/images/nm_hm.png",
        label: "storefront",
        note: "Address-aware browsing — nearby stores ranked by delivery window and distance from the chosen address.",
        orientation: "portrait",
        width: 842,
        height: 1892,
      },
    ],
  },
  car: {
    title: "Classified Car Marketplace Platform",
    images: [
      {
        src: "/images/na_dh.png",
        label: "operations dashboard",
        note: "Customer statistics, post counts and advertisement management for the people running the marketplace.",
        orientation: "landscape",
        width: 2880,
        height: 1556,
      },
      {
        src: "/images/na_view.png",
        label: "buyer listings",
        note: "Featured, best-selling and recommended vehicles as a buyer meets them, priced and filterable.",
        orientation: "portrait",
        width: 772,
        height: 1816,
      },
    ],
  },
  isp: {
    title: "Multi-tenant ISP billing and subscription platform",
    images: [
      {
        src: "/images/isp_1.png",
        label: "customer accounts",
        note: "Accounts across sites and packages, each carrying its activation state and outstanding balance.",
        orientation: "landscape",
        width: 1919,
        height: 960,
      },
      {
        src: "/images/isp_2.png",
        label: "product listing",
        note: "The catalogue the billing engine charges against — subscriptions, top-ups, services and hardware.",
        orientation: "landscape",
        width: 1919,
        height: 960,
      },
    ],
  },
};

export const contactMethods = [
  {
    label: "Phone",
    value: "+66 95 120 0272",
    href: "tel:+66951200272",
    icon: "Phone",
  },
  {
    label: "Email",
    value: "paingthumyo41297@gmail.com",
    href: "mailto:paingthumyo41297@gmail.com",
    icon: "Mail",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/myo-paing-thu-027aaa214",
    href: "http://linkedin.com/in/myo-paing-thu-027aaa214",
    icon: "Linkedin",
  },
  {
    label: "GitHub",
    value: "github.com/myopaingthu",
    href: "https://github.com/myopaingthu",
    icon: "Github",
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/myopaingthu", icon: "Github" },
  { label: "LinkedIn", href: "http://linkedin.com/in/myo-paing-thu-027aaa214", icon: "Linkedin" },
];

export const navItems = [
  { label: "Home", to: "/", icon: "Home" },
  { label: "About", to: "/about", icon: "User" },
  { label: "Projects", to: "/projects", icon: "FolderKanban" },
  { label: "Experience", to: "/experience", icon: "Briefcase" },
  { label: "Contact", to: "/contact", icon: "MessageCircle" },
];

export const availability = {
  intro: "I'm available for full-time opportunities and impactful collaborations across SaaS, financial services, digital health and HR tech.",
  points: [
    "Based in Thailand with remote collaboration across time zones.",
    "Passionate about end-to-end product delivery and engineering mentorship.",
    "Focused on building resilient, secure, and user-centric platforms.",
  ],
};

export const provenance = {
  eyebrow: "act ii — the provenance: four rooms, november 2021 to now",
  rail: "every room ran a different stack · every room, the same job: ship it and keep it up · scroll — the record plays",
  chapters: [
    {
      mark: "2021.11",
      tick: "nov 2021",
      company: "metateam myanmar",
      period: "nov 2021 — jan 2023",
      role: "Junior Developer",
      title: "The first",
      accent: "brief.",
      body: [
        "Two years inside Japanese systems, building and maintaining APIs and admin portals beside senior engineers. An Evaluation Management System for a restaurant group's operational needs, the Japan television programme guide in Vue 3 Composition API and TypeScript, and a book guide and review system for students.",
        "None of it was mine to design. All of it was mine to keep running — which is the part of the job nobody writes a tutorial for.",
      ],
      quote:
        "The room where I learned what a maintained codebase actually costs.",
    },
    {
      mark: "2023.01",
      tick: "jan 2023",
      company: "super seven stars",
      period: "jan 2023 — jan 2024",
      role: "Backend Developer",
      title: "Backend,",
      accent: "end to end.",
      body: [
        "An on-demand grocery and food service platform: APIs and admin portals carrying real-time, location-based delivery matching — the first system where the algorithm, not the CRUD, was the hard part.",
        "Then a classified car marketplace, built out in full: APIs, admin portals, FCM push notifications and payment integration. Every stage of the lifecycle, from architecture to the performance pass at the end.",
      ],
      quote: "The year the work stopped being tickets and started being architecture.",
    },
    {
      mark: "2024.01",
      tick: "jan 2024",
      company: "uab bank",
      period: "jan 2024 — present",
      role: "Software Engineer",
      title: "Core",
      accent: "banking.",
      body: [
        "Core banking migration work: lifting the Clearing House and Operation Cash Management systems off legacy stacks onto modern PHP and MS SQL Server, then automating the manual steps around them.",
        "Alongside it, product: a social system with multimedia management and an in-app gift engine for real-time rewards, built on Laravel, MySQL and Livewire with dynamic form control in the admin backend. A payroll processing system for internal teams and partner companies. Admin and client portals for the Sermal feature inside the uab Pay wallet, with role-based permissions and dynamic forms.",
        "And the part that does not appear in a changelog: onboarding interns and junior engineers, and holding up the support modules nobody volunteers for.",
      ],
      quote: "Regulated money is the strictest reviewer a codebase ever gets.",
      readouts: [
        { value: "30", suffix: "%", label: "human error reduced" },
        { value: "02", suffix: "", label: "legacy systems migrated" },
      ],
    },
    {
      mark: "2025.02",
      tick: "feb 2025",
      company: "phluid worldwide",
      period: "feb 2025 — present",
      role: "Software Engineer",
      title: "Compliance,",
      accent: "HR, billing.",
      body: [
        "An ISO compliance platform in Laravel Filament — applications for certification carried through complex file management, a built-in document editor, and AI assistance where it earns its place.",
        "An HR management system built around the parts that have to be right: secure employee data handling, attendance tracking, role-based access.",
        "And a multi-tenant ISP billing and subscription platform in NestJS, MongoDB and React — automated billing cycles and invoice generation running on Bull over Redis with Puppeteer, holding recurring charges at ninety per cent automated.",
      ],
      quote: "Three products, three stacks, one standard for what counts as done.",
      readouts: [
        { value: "90", suffix: "%", label: "recurring charges automated" },
        { value: "03", suffix: "", label: "platforms in production" },
      ],
    },
  ],
};
