export const profile = {
  name: "ankit patel",
  displayName: "Ankit Patel",
  role: "Member of Technical Staff @ Salesforce",
  tagline:
    "Software Development Engineer with 3 years of experience taking products from concept to scale — MERN + Java backend. Passionate about DSA, system design, and building applications that just work.",
  location: "hyderabad, telangana, india",
  email: "ap92625@gmail.com",
  phone: "+91-7989932040",
  github: "https://github.com/iawesomeankit",
  githubHandle: "iawesomeankit",
  linkedin: "https://linkedin.com/in/ankit-patel-156402212",
  linkedinHandle: "ankit-patel-156402212",
  leetcode: "https://leetcode.com/u/rohan70970/",
  leetcodeHandle: "knight · max 1840",
  stack: ["Node.js", "MongoDB", "Redis", "Kafka", "AWS", "TypeScript", "Git"],
};

export const stats = [
  { value: "3+", label: "years engineering & IT" },
  { value: "B.Tech", label: "CS graduate · CMR" },
  { value: "MTS", label: "salesforce" },
  { value: "Knight", label: "leetcode · max 1840" },
];

export const aboutCards = [
  {
    icon: "💼",
    label: "current role",
    title: "MTS @ Salesforce",
    body: "Member of Technical Staff, building reliable backend systems at scale — previously SDE-2 in insurtech.",
  },
  {
    icon: "📍",
    label: "based in",
    title: "Hyderabad, India",
    body: "Based in Hyderabad, collaborating with distributed teams. I like backend work with real scale and real users.",
  },
  {
    icon: "🎓",
    label: "education",
    title: "B.Tech Computer Science",
    body: "CMR Technical Campus (2019–2023), CGPA 8.29. DSA in C++ & Java, OOP, DBMS, OS, CN.",
  },
  {
    icon: "🧠",
    label: "what drives me",
    title: "Systems that scale",
    body: "I keep my head down, work hard, and let results do the talking — profiling bottlenecks, cutting p99s, shipping reliable payments & AI systems.",
  },
];

export type Experience = {
  org: string;
  role: string;
  time: string;
  icon: string;
  detail?: string;
  points?: string[];
  sub?: { role: string; time: string; detail: string; points?: string[] }[];
};

export const experience: Experience[] = [
  {
    org: "Salesforce",
    role: "MTS",
    time: "2026 — present",
    icon: "☁️",
    detail: "Member of Technical Staff · large-scale backend systems",
    points: ["Member of Technical Staff @ Salesforce, building reliable backend systems at scale."],
  },
  {
    org: "InsuranceDekho (CarDekho Group)",
    role: "SDE-2 · Full-time",
    time: "Feb 2026 — Sept 2026",
    icon: "🏦",
    detail: "Playwright MCP automation · CSC wallet & reversals · Node, NestJS, Mongo, MySQL, Kafka, Redis, AWS",
    points: [
      "Playwright MCP-based automation for health & motor journeys — quote, proposal, payment, KYC, issuance.",
      "CSC wallet payments & transaction reversals with debit, refund, status tracking & reconciliation.",
      "Stack: Node.js, NestJS, TypeScript, Express, MongoDB, MySQL, Kafka, Redis, Docker, AWS.",
    ],
  },
  {
    org: "Smart Interviews",
    role: "SDE-2 → SDE-1 → Intern",
    time: "2022 — 2026",
    icon: "💡",
    detail: "AI interviews · payments · realtime proctoring · Redis leaderboard · MERN + AWS",
    sub: [
      {
        role: "SDE-2",
        time: "2024 — 2026",
        detail: "AI mock interviews (LangChain+OpenAI) · Razorpay subscriptions · realtime proctoring for 50K+ users",
        points: [
          "AI mock interview platform (LangChain + OpenAI) — 35% lower LLM latency, 5,000+ interviews/month.",
          "Fault-tolerant Razorpay subscription system with idempotent webhooks & distributed locking.",
          "Realtime proctoring pipeline for 50K+ users — 45% fewer writes, 80% better violation detection.",
        ],
      },
      {
        role: "SDE-1",
        time: "2023 — 2024",
        detail: "Redis leaderboard (320ms→40ms p99) · referral pipeline · placement portal · MERN + AWS",
        points: [
          "Leaderboard re-architected onto Redis Sorted Sets — p99 latency 320ms → 40ms.",
          "Referral & user-growth pipeline — 20% acquisition growth; Discord monitoring automated (90% less manual effort).",
          "Placement portal with role-based access & realtime notifications.",
        ],
      },
      {
        role: "SDE Intern",
        time: "2022 — 2023",
        detail: "C, C++ & full-stack foundations · instructor tooling",
        points: ["C, C++ & full-stack foundations.", "Instructor tooling & content systems."],
      },
    ],
  },
  {
    org: "CMR Technical Campus",
    role: "B.Tech CS",
    time: "2019 — 2023",
    icon: "🎓",
    detail: "B.Tech Computer Science · CGPA 8.29",
    points: [
      "B.Tech Computer Science (2019–2023), CGPA 8.29.",
      "DSA in C++ & Java, OOP, DBMS, Operating Systems, Computer Networks.",
    ],
  },
];

export const expertiseGroups = [
  {
    title: "technical",
    items: [
      "Scalable Node.js APIs",
      "MongoDB / MySQL",
      "Redis & Caching",
      "Kafka / RabbitMQ",
      "System Design",
      "DSA (C++ / Java)",
    ],
  },
  {
    title: "professional",
    items: [
      "Payment Systems",
      "AI / LLM Systems",
      "Realtime Streaming",
      "Performance Tuning",
      "Test Automation",
      "Mentorship",
    ],
  },
];

export const skillPills = [
  "TypeScript",
  "Node.js",
  "Express",
  "NestJS",
  "MongoDB",
  "MySQL",
  "Redis",
  "Kafka",
  "RabbitMQ",
  "AWS",
  "Docker",
  "Angular",
  "LangChain",
  "Git",
  "Linux",
];

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
};

export const blogs: Blog[] = [
  {
    slug: "redis-sorted-sets-p99-320-to-40",
    title: "How I cut leaderboard p99 from 320ms to 40ms with Redis Sorted Sets",
    excerpt:
      "Mongo was doing 1.2k QPS of ranking reads. Offloading rank ops to ZSETs gave O(log n) updates — here's the exact profiling + migration path.",
    date: "Mar 12, 2026",
    readTime: "7 min",
    tags: ["redis", "system-design", "performance"],
    content: [
      "Our leaderboard looked fine at low traffic. Then contests spiked to ~1.2k QPS and Mongo read latency blew up — p99 hit 320ms and the page felt sticky.",
      "Profiling showed the problem wasn't Mongo itself, it was the access pattern: sort + skip + limit over a growing collection on every poll. Classic ranking anti-pattern.",
      "The fix: Redis Sorted Sets. Score = points, member = userId. ZADD is O(log n), ZRANK / ZREVRANK are O(log n), and range fetches are O(log n + m). We kept Mongo as source of truth and synced writes async.",
      "Migration steps: 1) dual-write scores to Redis, 2) backfill with a cursor job, 3) shadow-read and compare ranks, 4) flip reads to Redis with Mongo fallback. p99 dropped to 40ms and responsiveness improved ~25–30%.",
      "Takeaway: don't rank in your primary DB at high QPS. Use the right data structure — ZSETs exist exactly for this.",
    ],
  },
  {
    slug: "idempotent-razorpay-webhooks-mongodb",
    title: "Idempotent webhooks: reliable Razorpay subscriptions with MongoDB",
    excerpt:
      "Double-charges and stuck entitlements come from retry storms. Idempotency keys + distributed locks + eventual consistency fixed ours.",
    date: "Feb 02, 2026",
    readTime: "8 min",
    tags: ["payments", "mongodb", "backend"],
    content: [
      "Payment webhooks retry. That's by design — but if your handler isn't idempotent, retries become double-credits or flapping entitlements.",
      "Our design: Razorpay event_id as idempotency key with a unique index in Mongo. First insert wins; duplicates return the stored result without side effects.",
      "Around that: a short-TTL distributed lock per user (Redis SET NX) to serialize concurrent events, then eventual-consistency updates to user entitlement docs.",
      "We also reconcile nightly against Razorpay's API to catch missed webhooks. Reliability went from 'hopefully consistent' to boring — which is exactly what you want from billing.",
    ],
  },
  {
    slug: "realtime-proctoring-50k-websockets",
    title: "Debounced WebSockets: proctoring 50K contest users without melting the backend",
    excerpt:
      "DOM tracking at full fidelity is a write-amplification bomb. Debouncing + TTL-indexed events cut writes 45% and caught more violations.",
    date: "Jan 18, 2026",
    readTime: "6 min",
    tags: ["websockets", "scaling", "mern"],
    content: [
      "50K contest users each emitting focus/blur/tab-switch events is a firehose. Naive per-event writes would have drowned Mongo.",
      "We debounced streams client-side, batched over a single WebSocket per user, and stored events in a TTL-indexed collection — hot for the contest window, auto-expiring after.",
      "Low-overhead DOM listeners (visibilitychange + blur, not mutation spam) fed a small state machine. Violation-detection accuracy went up 80% while backend writes dropped 45%.",
      "Lesson: sample deliberately, expire aggressively, and never let client telemetry dictate your write path.",
    ],
  },
  {
    slug: "langchain-prompt-caching-llm-latency",
    title: "LangChain + prompt caching: 35% cheaper, faster AI mock interviews",
    excerpt:
      "Conversation-state management, response batching, and prompt caching let us serve 5,000+ interviews/month with zero degradation.",
    date: "Dec 08, 2025",
    readTime: "9 min",
    tags: ["ai", "langchain", "openai"],
    content: [
      "AI interviews are stateful, bursty, and expensive. Every follow-up re-sends history — tokens balloon fast.",
      "We split prompts into stable (system + rubric, cacheable) vs dynamic (transcript tail) parts, enabled prompt caching, and batched non-critical model calls.",
      "Conversation state lived in Redis with explicit compaction: summarize every N turns, keep the last K verbatim. LLM latency dropped 35%, throughput held at 5,000+ interviews/month.",
      "Engagement rose 30% — mostly because waits got shorter. Speed is a feature in conversational UX.",
    ],
  },
  {
    slug: "playwright-mcp-insurance-flows",
    title: "Playwright MCP automation for insurance journeys: quote to issuance",
    excerpt:
      "Health + motor flows across quote, proposal, payment, KYC, issuance — automated per-partner to kill manual regression.",
    date: "Nov 20, 2025",
    readTime: "5 min",
    tags: ["testing", "playwright", "insurtech"],
    content: [
      "Insurance journeys are long: quote → proposal → payment → KYC → issuance, multiplied by partners with slightly different rules.",
      "We built Playwright MCP-based suites per partner, with seeded fixtures and traceable run artifacts. Regression for partner-specific releases went from days of manual clicking to an automated gate.",
      "Biggest win wasn't speed — it was traceability. Every failure maps to a journey step with screenshots + network logs, so triage is minutes, not meetings.",
    ],
  },
  {
    slug: "dsa-consistency-500-problems-backend",
    title: "DSA consistency: how 500+ problems made me a better backend engineer",
    excerpt:
      "Knight on LeetCode (1840), 3★ CodeChef. Not for badges — for the patterns that show up in real ranking, caching, and scheduling code.",
    date: "Oct 05, 2025",
    readTime: "4 min",
    tags: ["dsa", "career"],
    content: [
      "I don't grind DSA for ratings. I do it because sorted sets, heaps, sliding windows, and graphs keep appearing in backend work.",
      "Leaderboards are order statistics. Rate limiters are sliding windows. Proctoring timelines are interval problems. The mapping is direct.",
      "My routine: 30–45 min daily, one pattern at a time, revise weekly. Consistency beats intensity — 500 steady problems beat 50 rushed ones.",
    ],
  },
];

export const achievements = [
  { rank: "2nd", detail: "of 1.8k users · NeoCodeathon May Edition (all India)" },
  { rank: "38th", detail: "of 4k users · CodeChef Starters 81 · Div 3" },
  { rank: "1020th", detail: "of 41k users · Codeforces Round 1017" },
];

export const codingProfiles: { label: string; detail: string; href?: string }[] = [
  { label: "LeetCode", detail: "knight · max 1840", href: "https://leetcode.com/u/rohan70970/" },
  { label: "CodeChef", detail: "3 star · max 1644" },
  { label: "Codeforces", detail: "pupil · max 1262" },
];

export const connectLinks = [
  { label: "Email", handle: "ap92625@gmail.com", href: "mailto:ap92625@gmail.com" },
  { label: "GitHub", handle: "iawesomeankit", href: "https://github.com/iawesomeankit" },
  { label: "LinkedIn", handle: "ankit-patel-156402212", href: "https://linkedin.com/in/ankit-patel-156402212" },
  { label: "LeetCode", handle: "knight · max 1840", href: "https://leetcode.com/u/rohan70970/" },
];
