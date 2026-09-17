
export const personalInfo = {
  name: "Myo Paing Thu",
  title: "Software Engineer",
  tagline: "Building modern web experiences!",
  description: "Results-driven Software Engineer with 5+ years of experience in FinTech, Core Banking, E-commerce, and Japanese Web Solutions. I love building scalable, secure, and impactful software.",
  heroHighlights: ["PHP", "JavaScript", "Laravel", "Vue", "React"],
  currentFocus: "Backend, Frontend, AI, and Cloud",
  experience: "5+ years of full-stack delivery",
  education: {
    degree: "Bachelor of Computer Science | Software Engineering",
    institution: "University of Information Technology, Yangon",
  },
  about: "I specialize in both frontend and backend development, with expertise in PHP, JavaScript, Vue.js, React.js, Node.js, and advanced proficiency in Laravel. I enjoy collaborating in teams and embracing new technologies to deliver efficient projects.",
};

export const skillGroups = [
  {
    title: "Frontend",
    icon: "Code",
    items: ["HTML", "CSS", "JavaScript", "Vue.js", "React.js", "Material UI", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Backend",
    icon: "Server",
    items: ["PHP", "Laravel", "Express.js", "Node.js", "NestJS", "Livewire", "Filament"],
  },
  {
    title: "Database",
    icon: "Database",
    items: ["MySQL", "MongoDB", "MS SQL Server", "Redis", "Firebase"],
  },
  {
    title: "DevOps & Tools",
    icon: "Wrench",
    items: ["Docker", "AWS", "Git", "GitHub", "GitLab", "Bitbucket", "GitLab CI/CD"],
  },
];

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

export const projects = [
  {
    title: "NOCA.ai",
    category: "Professional Work",
    description:
      "An AI-powered automation platform where users can create many automation workflows from various SaaS like SalesForce, Google Drive and DropBox. I've involved as a full stack developer in building this platform.",
    tags: ["React", "TypeScript", "Material UI", "Node.js", "WebSocket"],
    links: [{ label: "View on Website", href: "https://noca.ai/" }],
  },
  {
    title: "ISP platform",
    category: "Professional Work",
    description:
      "A multi-tenant ISP billing and subscription platform including automated billing cycles and invoice generation engines. I've involved as a full stack developer in building this platform.",
    tags: ["NestJS", "TypeScript", "MongoDB", "React", "Tailwind", "Ant Design"],
    gallery: "isp",
    links: []
  },
  {
    title: "ISO Compliance System",
    category: "Professional Work",
    description:
      "A comprehensive system enabling users to apply for ISO certification, featuring complex file management, a built-in document editor, and AI integration.",
    tags: ["Laravel", "Filament", "Python", "Livewire", "Tailwind"],
    links: [{ label: "View on Website", href: "https://iso2.innoquesttech.my/" }],
  },
  {
    title: "Social in uab pay",
    category: "Professional Work",
    description:
      "A feature-rich social media system with multimedia management and an in-app gift system that facilitates real-time user interactions and reward claiming. Streamlines dynamic form control within the admin backend.",
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
    title: "Payroll Processing System",
    category: "Professional Work",
    description:
      "A Payroll Processing System to streamline operations for internal teams and partner companies. This module enables the operations team to upload and process payroll data efficiently and integrates with external HR service providers via API. The system, built using Laravel 9 and MS SQL Server, incorporates background scheduling to handle large datasets seamlessly.",
    tags: ["Laravel 9", "MS SQL Server", "Background Jobs", "API Integration"],
    links: [],
  },
  {
    title: "Sermal Admin Portals",
    category: "Professional Work",
    description:
      "Admin and client admin portals for the Sermal feature in the uab Pay mobile wallet application. These portals include advanced role-based permission management and dynamic forms to enhance the user experience.",
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
    title: "On-Demand Grocery & Food Service",
    category: "Professional Work",
    description:
      "Incorporating advanced algorithms such as real-time location-based delivery matching. The project featured real-time data handling with WebSocket for broadcasting, Firebase SDK for notifications, and Redis for optimized performance. It also included FCM push notifications and integrated payment systems.",
    tags: ["Laravel 9", "MySQL", "JavaScript", "Firebase SDK", "WebSocket", "Redis"],
    links: [],
    gallery: "grocery",
  },
  {
    title: "Classified Car Marketplace Platform",
    category: "Professional Work",
    description:
      "A Classified Car Marketplace platform, providing a seamless user experience for buying and selling vehicles. The system included FCM push notifications and payment integrations, ensuring smooth communication and secure transactions.",
    tags: ["Laravel 9", "MySQL", "JavaScript", "Firebase SDK", "WebSocket", "Redis"],
    links: [],
    gallery: "car",
  },
  {
    title: "Evaluation Management System",
    category: "Professional Work",
    description:
      "The Evaluation Management System, collaborating with senior team members to support a Japanese restaurant's operational needs.",
    tags: ["Laravel 6", "MySQL", "JavaScript"],
    links: [
      {
        label: "View on Play Store",
        href: "https://play.google.com/store/apps/details?id=com.thanxi.canayell&pcampaignid=web_share",
      },
    ],
  },
  {
    title: "Book Guide and Review System for Students",
    category: "Professional Work",
    description:
      "The Book Guide and Review System for Students which is developed with Phalcon, incorporating user-requested changes and enhancements.",
    tags: ["Phalcon"],
    links: [{ label: "Visit Website", href: "https://sonicmoov.com/works/studico/" }],
  },
  {
    title: "Agent Change Review",
    category: "Personal Project",
    description:
      "A VS Code extension that reviews what a coding agent changed, one request at a time, before you keep it. A Claude Code hook records a Git checkpoint around each request, so the panel shows only the agent's work for that request — never your own hand-edits — with per-hunk accept/reject, multi-repo support, and keyboard-driven review.",
    tags: ["VS Code Extension", "TypeScript", "Claude Code", "Git"],
    links: [
      { label: "View on Website", href: "https://marketplace.visualstudio.com/items?itemName=myopaingthu.agent-change-review" },
      { label: "View on GitHub", href: "https://github.com/myopaingthu/agent-change-review" },
    ],
  },
  {
    title: "DB Diagram Tool",
    category: "Personal Project",
    description:
      "A real-time, AI-assisted visual database schema designer in the spirit of dbdiagram.io. Drag-and-drop ER canvas built with React Flow and a side-by-side DBML editor stay in sync as you work, with a NestJS/Socket.IO backend handling DBML parsing, diagram persistence in MongoDB, JWT authentication, and an AI schema assistant that streams generated changes token-by-token.",
    tags: ["React", "NestJS", "TypeScript", "Socket.IO", "MongoDB", "Zustand", "AI Integration"],
    links: [
      { label: "View on Website", href: "https://db-diagram-tool-fe-ruddy.vercel.app" },
      { label: "GitHub", href: "https://github.com/myopaingthu/db-diagram-tool-fe" },
      { label: "GitHub", href: "https://github.com/myopaingthu/db-diagram-tool-bk" },
    ],
  },
  {
    title: "OrderFlow Integration Hub",
    category: "Personal Project",
    description:
      "An event-driven order integration platform built with NestJS, PostgreSQL, Redis, and Redpanda (Kafka-compatible). The business logic is deliberately small; the focus is the architecture — the outbox pattern, idempotency on both edges, retries with backoff, dead-letter handling, and full observability via Prometheus and Grafana across six services.",
    tags: ["NestJS", "PostgreSQL", "Kafka", "Redis", "Microservices"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/OrderFlow-Integration-Hub" },
    ],
  },
  {
    title: "Responsive Language Learning App",
    category: "Personal Project",
    description:
      "A responsive web app for language learning, featuring interactive exercises and progress tracking. Built with Vue 3 Composition API and TypeScript.",
    tags: ["Vue 3", "TypeScript"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/language-learning-app" },
      { label: "Live Demo", href: "https://iridescent-melba-df9013.netlify.app/" },
    ],
  },
  {
    title: "Mini Buy and Sell E-commerce with Admin Dashboard",
    category: "Personal Project",
    description:
      "A simple e-commerce platform with admin dashboard, product management, and other features. Built for learning and experimentation.",
    tags: ["MySQL", "jQuery", "Laravel 8"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/Mini-buy-and-sell-ecommerce" },
    ],
  },
  {
    title: "Real time forum app (Udemy Course)",
    category: "Personal Project",
    description:
      "A real-time discussion platform where users can create topics, post replies, and interact instantly. Features real-time updates, user authentication, topic and post management, and admin moderation. Built with Laravel 8, MySQL, Vue.js, and Laravel WebSocket.",
    tags: ["MySQL", "Vue.js", "Laravel 8", "Laravel WebSocket"],
    links: [
      { label: "GitHub", href: "https://github.com/myopaingthu/Forum-backend" },
      { label: "GitHub", href: "https://github.com/myopaingthu/Forum-frontend" },
    ],
  },
  {
    title: "Inventory Management System",
    category: "Personal Project",
    description:
      "A backend system for managing inventory, supporting CRUD operations for products, stock tracking, and reporting. Built with Node.js, Express.js, and MongoDB.",
    tags: ["Node.js", "Express.js", "MongoDB"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/Inventory_Management_System" },
    ],
  },
  {
    title: "Library Management System",
    category: "Personal Project",
    description:
      "A web-based system for managing library resources, including book inventory, member management, and lending operations. Built with Laravel 8, MySQL, and Docker.",
    tags: ["MySQL", "Laravel 8", "Docker"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/Library_Management_System" },
    ],
  },
  {
    title: "Online Counselling System",
    category: "Personal Project",
    description:
      "A web-based platform designed to facilitate online counselling sessions, appointment management, and secure communication between counsellors and clients. Built with Laravel 8, MySQL, and Docker for scalable deployment.",
    tags: ["MySQL", "Laravel 8", "Docker"],
    links: [
      { label: "View on GitHub", href: "https://github.com/myopaingthu/Online_Counselling_System" },
    ],
  },
];

export type Plate = {
  src: string;
  label: string;
  orientation: "portrait" | "landscape";
  width: number;
  height: number;
};

export const galleries: Record<string, { title: string; images: Plate[] }> = {
  social: {
    title: "Social in uab pay",
    images: [
      { src: "/images/social_home.jpg", label: "home feed", orientation: "portrait", width: 811, height: 1800 },
      { src: "/images/social_landing.jpg", label: "landing", orientation: "portrait", width: 811, height: 1800 },
      { src: "/images/social_profile.jpg", label: "profile", orientation: "portrait", width: 811, height: 1800 },
    ],
  },
  sermal: {
    title: "Sermal Admin Portals",
    images: [
      { src: "/images/sm_home.jpg", label: "portal home", orientation: "portrait", width: 811, height: 1800 },
      { src: "/images/sm_info.jpg", label: "record detail", orientation: "portrait", width: 811, height: 1800 },
    ],
  },
  grocery: {
    title: "On-Demand Grocery & Food Service",
    images: [
      { src: "/images/nm_dh.png", label: "admin dashboard", orientation: "landscape", width: 2880, height: 1556 },
      { src: "/images/nm_hm.png", label: "storefront", orientation: "portrait", width: 842, height: 1892 },
    ],
  },
  car: {
    title: "Classified Car Marketplace Platform",
    images: [
      { src: "/images/na_dh.png", label: "admin dashboard", orientation: "landscape", width: 2880, height: 1556 },
      { src: "/images/na_view.png", label: "listing view", orientation: "portrait", width: 772, height: 1816 },
    ],
  },
  isp: {
    title: "Multi-tenant ISP billing and subscription platform",
    images: [
      { src: "/images/isp_1.png", label: "billing dashboard", orientation: "landscape", width: 1919, height: 960 },
      { src: "/images/isp_2.png", label: "subscription detail", orientation: "landscape", width: 1919, height: 960 },
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
  intro: "I'm available for full-time opportunities and impactful collaborations in FinTech, operations tooling, and product-led initiatives.",
  points: [
    "Based in Thailand with remote collaboration across time zones.",
    "Passionate about end-to-end product delivery and engineering mentorship.",
    "Focused on building resilient, secure, and user-centric platforms.",
  ],
};
