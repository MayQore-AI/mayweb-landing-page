export const SERVICES = [
  {
    n: "01",
    icon: "◈",
    title: "Product Strategy",
    body: "Before a line of code is written, we help you think clearly. User research, scope definition, technical feasibility, and roadmap design — so you ship the right thing, not just something.",
    tags: ["Discovery", "Roadmapping", "User Research", "Feasibility"],
  },
  {
    n: "02",
    icon: "◉",
    title: "Full-Stack Engineering",
    body: "End-to-end web applications built for performance, scale, and longevity. We architect the whole system — database to UI — with deliberate decisions at every layer.",
    tags: ["Node.js", "React", "PostgreSQL", "TypeScript"],
  },
  {
    n: "03",
    icon: "◎",
    title: "Mobile Engineering",
    body: "Production-grade iOS and Android applications. Fluid interfaces, optimised media playback, background processing, and caching strategies that make the difference between good and great.",
    tags: ["Swift", "Kotlin", "React Native", "AVFoundation"],
  },
  {
    n: "04",
    icon: "◆",
    title: "Frontend Development",
    body: "Component systems and interfaces that feel alive. We care about motion, accessibility, and the micro-interactions that transform a competent UI into one people enjoy.",
    tags: ["React", "Next.js", "Animation", "Design Systems"],
  },
  {
    n: "05",
    icon: "◐",
    title: "Backend & APIs",
    body: "Scalable server architectures, open banking integrations, payment systems, and data pipelines. We've built fintech infrastructure handling cross-border transactions in production.",
    tags: ["REST", "GraphQL", "Open Banking", "Microservices"],
  },
  {
    n: "06",
    icon: "◑",
    title: "QA & Quality Engineering",
    body: "Quality as a first-class concern, not a final gate. Test strategy, automated suites, performance benchmarking, and the engineering culture to keep standards high across the lifecycle.",
    tags: ["Automation", "Performance", "Test Strategy", "CI/CD"],
  },
] as const

export const DOMAINS = [
  {
    title: "Fintech & Open Banking",
    body: "Cross-border remittance, non-residential banking, open banking integrations — systems where correctness and latency are both product decisions.",
  },
  {
    title: "Web3 & Digital Assets",
    body: "ERC-20 and ERC-721 token integrations, NFT management, and crypto wallets designed for mainstream users, not blockchain specialists.",
  },
  {
    title: "Video & Media",
    body: "High-performance media experiences with intelligent preloading and caching — for audiences that won't tolerate buffering.",
  },
  {
    title: "Logistics & Marketplaces",
    body: "Multi-sided ecosystems — buyer, seller, and delivery — with real-time coordination, assignment logic, and retention mechanics built to hold under scale.",
  },
  {
    title: "Banking & Accounts",
    body: "Financial services expansion: KYC flows, non-residential accounts, and compliance-aware feature development across multiple jurisdictions.",
  },
  {
    title: "Legacy Modernisation",
    body: "We inherit complex, legacy codebases and leave them clean. Migration without disruption, measurable error reduction, and no continuity gaps.",
  },
] as const

export const STATS = [
  {
    value: 30,
    suffix: "%",
    label: "Reduction in system errors post-migration",
  },
  {
    value: 40,
    suffix: "%",
    label: "Increase in user engagement, measured by analytics",
  },
  { value: 35, suffix: "%", label: "Faster average order processing time" },
  {
    value: 25,
    suffix: "%",
    label: "Transaction volume growth within 3 months",
  },
  { value: 60, suffix: "%", label: "Early beta user retention rate" },
  {
    value: 20,
    suffix: "%",
    label: "Increase in non-residential account activations",
  },
] as const

export const WHY = [
  {
    label: "Track record",
    title: "Results we can measure",
    body: "Every engagement is tracked against milestones. We instrument, monitor, and report — because impact you can't measure is just a claim.",
  },
  {
    label: "Rigour",
    title: "A team built to a high bar",
    body: "We designed our own technical assessment framework to hire the engineers on your project. The same standard applies to every role.",
  },
  {
    label: "Strategy",
    title: "We help you shape the product",
    body: "Not just builders. We bring product thinking — research, scoping, feasibility, and roadmap clarity — before writing a single line of code.",
  },
  {
    label: "Culture",
    title: "Engineering that grows",
    body: "Mentorship, growth paths, and knowledge transfer are standard. We deliver the project and leave the team stronger, not dependent.",
  },
  {
    label: "Depth",
    title: "Seniors, not a managed layer",
    body: "Lead engineers who've shipped across fintech, Web3, media, and logistics. You work with the people doing the work.",
  },
  {
    label: "Partnership",
    title: "Structured accountability",
    body: "Regular syncs, milestone tracking, one-on-ones. On-time delivery is a process we've built and refined — not a hope.",
  },
] as const

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "We map the product, users, and constraints before anything is built. Ambiguity at this stage costs ten times more later.",
  },
  {
    step: "02",
    title: "Architect",
    body: "Technology decisions matched to actual scale and risk — not borrowed from a larger company's playbook.",
  },
  {
    step: "03",
    title: "Deliver",
    body: "Iterative, milestone-tracked engineering with regular check-ins and transparent progress. No surprises at launch.",
  },
  {
    step: "04",
    title: "Optimise",
    body: "Post-launch performance tuning, analytics review, and deliberate debt paydown — on a defined schedule.",
  },
] as const

export const FAQS = [
  {
    q: "What kinds of products do you build?",
    a: "Full-stack web applications, mobile apps (iOS and Android), backend systems, and the product strategy that underpins them. Our strongest work tends to be in technically demanding environments where performance, correctness, and scale all matter.",
  },
  {
    q: "Can you help define the product before building?",
    a: "Yes — and we'd argue this is often the highest-value work. We offer discovery and strategy engagements that produce scope documents, technical feasibility assessments, and roadmaps before a build contract begins.",
  },
  {
    q: "Do you work with early-stage companies?",
    a: "Yes. We've worked across the spectrum from pre-launch MVPs to established products with millions of users. What matters more than stage is whether you have clarity on what you're building and why.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Absolutely. We've handled large-scale legacy migrations and have a track record of significantly reducing system errors post-migration. We conduct a technical audit before any work begins.",
  },
  {
    q: "How do you handle NDAs and confidentiality?",
    a: "All engagements are governed by robust NDAs as standard. We don't discuss client work publicly. What you build with us stays with you.",
  },
] as const

export const TICKER_ITEMS = [
  "Full-Stack",
  "Mobile",
  "Frontend",
  "Backend",
  "QA",
  "Product Strategy",
  "Open Banking",
  "Web3",
  "Fintech",
  "Logistics",
  "Media Platforms",
  "Quality Engineering",
] as const
