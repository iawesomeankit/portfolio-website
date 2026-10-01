import { useState, type FormEvent } from "react";
import { connectLinks } from "../data/content";
import { api } from "../lib/api";

type Status = "idle" | "sending" | "sent" | "error";

export default function Connect() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const r = await fetch(api("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.message || "Something went wrong");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const input =
    "w-full rounded-lg border border-[#26262c] bg-[#141417] px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-[#55555e] focus:border-[#e8a020] focus:outline-none";

  return (
    <section id="connect" className="scroll-mt-20 pt-14">
      <h2 className="font-display text-[22px] font-bold text-white">let's be friends</h2>
      <div className="mt-5 divide-y divide-[#191920]">
        {connectLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="group -mx-2 flex items-center justify-between rounded-lg px-2 py-3.5 transition-all hover:translate-x-1 hover:bg-[#111114]"
          >
            <span className="flex items-center gap-3 text-[13.5px]">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#26262c] bg-[#151518] text-[13px]">
                ✉
              </span>
              <span className="font-semibold text-white">{l.label}</span>
              <span className="text-[#7c7c85]">{l.handle}</span>
            </span>
            <span className="text-[#55555e] group-hover:text-white">↗</span>
          </a>
        ))}
      </div>

      <form onSubmit={submit} className="card mt-5 space-y-3 p-5">
        <p className="text-[14px] font-semibold text-white">
          or drop a message <span className="hand">— i actually reply ↗</span>
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={input}
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
          <input
            className={input}
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={200}
            required
          />
        </div>
        <textarea
          className={`${input} min-h-[96px] resize-y`}
          placeholder="hey ankit, …"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          required
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-white px-5 py-1.5 text-[13px] font-medium text-black hover:bg-[#e8a020] disabled:opacity-50"
          >
            {status === "sending" ? "sending…" : "send →"}
          </button>
          {status === "sent" && <span className="text-[12.5px] text-emerald-400">sent ✓ talk soon</span>}
          {status === "error" && <span className="text-[12.5px] text-red-400">{error}</span>}
        </div>
      </form>
      <p className="hand mt-2 text-right">don't be shy — say hi!</p>
    </section>
  );
}
