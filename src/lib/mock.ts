import type { IdeaInput, Proposal } from "./schema";

type Mod = Proposal["modules"][number];

interface Domain {
  key: string;
  match: RegExp;
  name: string;
  modules: Mod[];
}

const DOMAINS: Domain[] = [
  {
    key: "delivery",
    match: /deliver|restaurant|food|grocery|order|marketplace|e-?commerce|shop|store/i,
    name: "Commerce & Delivery Platform",
    modules: [
      { name: "Catalogue & Ordering", description: "Browse vendors and items, build a cart and place orders.", priority: "MVP", features: ["Vendor and item listings", "Search and filters", "Cart and checkout", "Order history"] },
      { name: "Live Order Tracking", description: "Real-time order status and delivery location updates.", priority: "MVP", features: ["Status timeline", "Map-based tracking", "Push notifications"] },
      { name: "Vendor Dashboard", description: "Tools for vendors to manage menus, stock and incoming orders.", priority: "MVP", features: ["Order acceptance", "Inventory management", "Sales reports"] },
      { name: "Payments", description: "Secure online payments and payouts.", priority: "MVP", features: ["Card and wallet payments", "Refunds", "Vendor payout ledger"] },
      { name: "Ratings & Promotions", description: "Customer feedback and discount campaigns.", priority: "Phase 2", features: ["Reviews", "Coupon codes", "Referral rewards"] },
    ],
  },
  {
    key: "health",
    match: /clinic|hospital|patient|doctor|health|medical|appointment|telemedicine/i,
    name: "Healthcare Management System",
    modules: [
      { name: "Appointment Scheduling", description: "Online booking with doctor availability and reminders.", priority: "MVP", features: ["Slot management", "Online booking", "Email and SMS reminders"] },
      { name: "Patient Records", description: "Secure electronic records for each patient.", priority: "MVP", features: ["Patient profiles", "Visit notes", "Document uploads"] },
      { name: "Billing & Invoicing", description: "Invoices, receipts and payment tracking.", priority: "MVP", features: ["Invoice generation", "Payment status", "Financial reports"] },
      { name: "Role-based Access", description: "Controlled access for admins, doctors and reception staff.", priority: "MVP", features: ["User roles", "Audit log"] },
      { name: "Telemedicine", description: "Remote consultations over video.", priority: "Phase 2", features: ["Video consultations", "E-prescriptions"] },
    ],
  },
  {
    key: "finance",
    match: /fintech|payment|wallet|bank|lending|loan|invest|trading|finance|invoice/i,
    name: "Financial Services Platform",
    modules: [
      { name: "Account & KYC Onboarding", description: "User registration with identity verification.", priority: "MVP", features: ["Registration and login", "Document-based KYC", "Admin approval queue"] },
      { name: "Transactions", description: "Core money movement and ledger.", priority: "MVP", features: ["Transfers and top-ups", "Transaction history", "Double-entry ledger"] },
      { name: "Security & Compliance", description: "Controls required for regulated financial products.", priority: "MVP", features: ["Two-factor authentication", "Audit trails", "Fraud rules"] },
      { name: "Reporting", description: "Statements and operational reports.", priority: "MVP", features: ["Account statements", "Admin analytics"] },
      { name: "Integrations", description: "Third-party banking and payment gateways.", priority: "Phase 2", features: ["Payment gateway", "Bank API connectors"] },
    ],
  },
  {
    key: "education",
    match: /learn|course|education|school|student|teacher|tutor|lms|training/i,
    name: "Learning Management Platform",
    modules: [
      { name: "Course Management", description: "Create and organise courses, lessons and assessments.", priority: "MVP", features: ["Course builder", "Video and document lessons", "Quizzes"] },
      { name: "Student Portal", description: "Enrolment, progress tracking and certificates.", priority: "MVP", features: ["Enrolment", "Progress tracking", "Certificates"] },
      { name: "Instructor Tools", description: "Gradebook and learner communication.", priority: "MVP", features: ["Gradebook", "Announcements"] },
      { name: "Payments & Plans", description: "Paid courses and subscriptions.", priority: "Phase 2", features: ["Checkout", "Subscriptions"] },
    ],
  },
  {
    key: "iot",
    match: /iot|sensor|device|smart home|fleet|tracking|telemetry|industrial/i,
    name: "IoT Monitoring Platform",
    modules: [
      { name: "Device Management", description: "Register, configure and monitor connected devices.", priority: "MVP", features: ["Device registry", "Status monitoring", "Remote configuration"] },
      { name: "Data Ingestion", description: "Collect and store telemetry at scale.", priority: "MVP", features: ["MQTT / HTTP ingestion", "Time-series storage"] },
      { name: "Dashboards & Alerts", description: "Visualise readings and notify on thresholds.", priority: "MVP", features: ["Live charts", "Rule-based alerts", "Email notifications"] },
      { name: "Analytics", description: "Trend analysis and predictive maintenance.", priority: "Phase 2", features: ["Anomaly detection", "Scheduled reports"] },
    ],
  },
];

const GENERIC: Domain = {
  key: "generic",
  match: /./,
  name: "Custom Software Platform",
  modules: [
    { name: "User Management", description: "Registration, login and role-based access.", priority: "MVP", features: ["Email and social login", "User roles", "Profile management"] },
    { name: "Core Workflow", description: "The primary functionality described in the brief.", priority: "MVP", features: ["Main user journey", "Data entry and validation", "Notifications"] },
    { name: "Admin Panel", description: "Back-office tools to manage users, content and settings.", priority: "MVP", features: ["User and content management", "Activity log"] },
    { name: "Analytics & Reporting", description: "Operational dashboards.", priority: "Phase 2", features: ["Usage metrics", "Exportable reports"] },
  ],
};

const AI_MODULE: Mod = { name: "AI Assistance", description: "AI-powered features that automate repetitive work.", priority: "Phase 2", features: ["Smart recommendations", "Natural-language search or chat"] };

const WEB3_MODULES: Mod[] = [
  { name: "Smart Contracts", description: "On-chain logic for tokens or records, audited before mainnet.", priority: "MVP", features: ["Solidity contract development", "Unit tests and testnet deployment", "Third-party security review"] },
  { name: "Wallet Integration", description: "Connect user wallets and sign transactions.", priority: "MVP", features: ["Wallet connection", "Transaction signing", "On-chain event indexing"] },
];

function slug(idea: string): string {
  const words = idea.replace(/[^a-zA-Z ]/g, " ").split(/\s+/).filter((w) => w.length > 3).slice(0, 2);
  const t = words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  return t || "Project";
}

export function generateDemoProposal(input: IdeaInput): Proposal {
  const text = input.idea;
  const domain = DOMAINS.find((d) => d.match.test(text)) || GENERIC;
  const wantsWeb3 = input.web3 || /blockchain|web3|token|nft|smart contract|solidity|polygon|ethereum|solana/i.test(text);
  const wantsAi = /\bai\b|artificial|machine learning|chatbot|recommend|predict/i.test(text);

  const modules: Mod[] = [...domain.modules];
  if (wantsWeb3) modules.splice(2, 0, ...WEB3_MODULES);
  if (wantsAi) modules.push(AI_MODULE);

  const mobile = /mobile|ios|android/i.test(input.platform) || /mobile app|ios|android/i.test(text);
  const web = input.platform === "Web" || input.platform === "Web + Mobile" || input.platform === "Not sure" || /web/i.test(text);

  const mvpCount = modules.filter((m) => m.priority === "MVP").length;
  const baseWeeks = 6 + mvpCount * 1.5 + (mobile && web ? 4 : 0) + (wantsWeb3 ? 3 : 0);
  const weeks = Math.round(baseWeeks);
  const weeklyBurn = 3200 + (mobile && web ? 900 : 0) + (wantsWeb3 ? 700 : 0);
  const min = Math.round((weeks * weeklyBurn * 0.85) / 500) * 500;
  const max = Math.round((weeks * weeklyBurn * 1.25) / 500) * 500;

  const techStack: Proposal["techStack"] = [];
  if (web) techStack.push({ layer: "Web frontend", technologies: ["Next.js", "React"], rationale: "Fast, SEO-friendly interfaces with a large talent pool and easy deployment." });
  if (mobile) techStack.push({ layer: "Mobile apps", technologies: ["Flutter"], rationale: "One codebase for iOS and Android reduces cost and keeps behaviour consistent." });
  techStack.push({ layer: "Backend & APIs", technologies: ["Node.js"], rationale: "Productive for REST APIs and real-time features, and consistent with a JavaScript frontend." });
  techStack.push({ layer: "Database", technologies: ["MongoDB"], rationale: "Flexible schema suits an evolving product; managed hosting is available on all major clouds." });
  if (wantsWeb3) techStack.push({ layer: "Blockchain", technologies: ["Solidity", "Ethers.js", "Polygon"], rationale: "Low transaction costs and a mature tooling ecosystem for tokenised features." });
  if (wantsAi) techStack.push({ layer: "AI services", technologies: ["Python", "Claude / OpenAI APIs"], rationale: "Managed model APIs deliver AI features quickly without training custom models." });
  techStack.push({ layer: "Infrastructure", technologies: ["AWS", "Docker"], rationale: "Containerised deployment with managed services, monitoring and scalable hosting." });

  const team: Proposal["team"] = [
    { role: "Project Manager", count: 1, responsibilities: "Planning, client communication, progress reporting and risk management." },
    { role: "UI/UX Designer", count: 1, responsibilities: "User flows, wireframes and the visual design system." },
    { role: "Full-stack Developer", count: web ? 2 : 1, responsibilities: "API, database and web application development." },
  ];
  if (mobile) team.push({ role: "Mobile Developer", count: 1, responsibilities: "iOS and Android application development and store release." });
  if (wantsWeb3) team.push({ role: "Blockchain Developer", count: 1, responsibilities: "Smart contract development, testing and deployment." });
  team.push({ role: "QA Engineer", count: 1, responsibilities: "Test planning, functional and regression testing." });

  const w = (f: number) => Math.max(1, Math.round(weeks * f));
  const timeline: Proposal["timeline"] = [
    { phase: "Discovery & Design", duration: `${w(0.18)} weeks`, deliverables: ["Requirements document", "User flows and wireframes", "UI design for core screens"] },
    { phase: "Core Development", duration: `${w(0.5)} weeks`, deliverables: ["Backend APIs and database", "MVP modules implemented", "Admin panel"] },
    { phase: "Integration & Testing", duration: `${w(0.2)} weeks`, deliverables: ["Third-party integrations", "QA and bug fixing", "Performance and security checks"] },
    { phase: "Launch & Handover", duration: `${w(0.12)} weeks`, deliverables: ["Production deployment", "Documentation and training", "Post-launch support plan"] },
  ];

  const assumptions = [
    "Estimate covers the MVP scope only; Phase 2 modules are quoted separately.",
    "Excludes cloud hosting, third-party licences and app-store fees.",
    "Assumes timely feedback and one consolidated review per milestone.",
  ];
  if (input.budget !== "Not sure") assumptions.push(`Client budget band noted: ${input.budget}. Scope can be adjusted to fit.`);

  const risks: Proposal["risks"] = [
    { risk: "Scope growth during development", mitigation: "Fixed MVP scope with a formal change-request process." },
    { risk: "Third-party service dependencies", mitigation: "Early integration spikes and fallback providers where possible." },
  ];
  if (wantsWeb3) risks.push({ risk: "Smart contract vulnerabilities", mitigation: "Comprehensive tests, testnet trials and an independent audit before mainnet." });
  if (input.timeline === "Under 2 months" && weeks > 8) risks.push({ risk: "Requested timeline is shorter than the estimated build", mitigation: "Reduce MVP scope or add engineers to parallelise work." });

  return {
    projectName: domain.key === "generic" ? "Custom Software Platform" : `${slug(text)} Platform`,
    summary: `A ${domain.name.toLowerCase()} based on the client's brief, delivered as a phased MVP followed by incremental enhancements. The proposal prioritises the modules needed to validate the product with real users within approximately ${weeks} weeks.`,
    objectives: ["Launch a working MVP that validates the core idea", "Provide a secure and scalable foundation for future growth", "Keep operating and maintenance costs predictable"],
    modules,
    techStack,
    team,
    timeline,
    totalDurationWeeks: weeks,
    cost: { currency: "USD", min, max, assumptions },
    risks,
    nextSteps: ["Review this proposal and confirm priorities", "Schedule a discovery call with a solutions architect", "Receive a detailed statement of work and fixed-scope quotation"],
  };
}
