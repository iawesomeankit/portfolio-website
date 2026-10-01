import { Router } from "express";

const router = Router();

// Simple in-memory rate limit: 5 messages / hour / IP
const hits = new Map<string, number[]>();

router.post("/", (req, res) => {
  const { name, email, message } = (req.body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim() || name.length > 100) {
    res.status(400).json({ message: "Name is required" });
    return;
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    res.status(400).json({ message: "A valid email is required" });
    return;
  }
  if (typeof message !== "string" || !message.trim() || message.length > 2000) {
    res.status(400).json({ message: "Message is required" });
    return;
  }

  const ip = req.ip ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= 5) {
    res.status(429).json({ message: "Too many messages — try again later" });
    return;
  }
  recent.push(now);
  hits.set(ip, recent);

  // No SMTP configured: log for now (wire nodemailer later to forward to inbox)
  console.log(`[contact] ${name.trim()} <${email.trim()}>: ${message.trim().slice(0, 500)}`);
  res.json({ ok: true });
});

export default router;
