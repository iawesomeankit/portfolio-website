export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
};

// Dummy seed data — mirrors client/src/data/content.ts so the site works with no DB.
// When MONGO_URI is set, these are upserted once and then served from MongoDB.
export const seedBlogs: Blog[] = [
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
