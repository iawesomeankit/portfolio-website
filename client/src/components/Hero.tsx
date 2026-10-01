import { useEffect, useState } from "react";
import { profile } from "../data/content";

function useISTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
        }) + " ist"
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const time = useISTClock();
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <section className="relative pt-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 left-1/2 h-56 w-[420px] max-w-full -translate-x-1/2 rounded-full bg-[#e8a020]/[0.07] blur-3xl"
      />
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[540px]">
          <p className="hand mb-1">hello, i'm 👋</p>
          <h1
            className="font-display cursor-default text-[44px] font-bold leading-[1.02] tracking-tight text-white sm:text-[56px]"
            aria-label={profile.displayName.toLowerCase()}
          >
            {profile.displayName.toLowerCase().split("").map((ch, i) =>
              ch === " " ? (
                <span key={i} className="inline-block w-[0.28em]">
                  {"\u00A0"}
                </span>
              ) : (
                <span
                  key={i}
                  aria-hidden
                  className="hero-letter inline-block transition-all duration-150 hover:-translate-y-1.5 hover:text-[#e8a020]"
                >
                  {ch}
                </span>
              )
            )}
          </h1>
          <p className="mt-4 max-w-[480px] text-[14.5px] leading-relaxed text-[#b6b6bd]">
            IT professional, B.Tech CS graduate & backend enthusiast. I turn complex product
            ideas into reliable, scalable systems.
          </p>
          <p className="mt-3 font-mono text-[11px] text-[#63636b]">
            {profile.location} · {time}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-black hover:bg-[#e8a020] hover:text-black"
            >
              say hello 👋
            </a>
            <button
              type="button"
              onClick={copyEmail}
              title="Copy email"
              className="font-mono text-[11.5px] text-[#8e8e96] transition-colors hover:text-white"
            >
              {copied ? "copied ✓" : profile.email}
            </button>
            <span className="hand">i actually reply ↗</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            <span className="hand mr-1">my stack</span>
            {profile.stack.map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="group relative shrink-0">
          <span className="hand absolute -top-5 right-2">that's me ↘</span>
          <div className="h-[132px] w-[132px] overflow-hidden rounded-full border border-[#2a2a30] bg-[#17171a] transition-all duration-300 group-hover:border-[#e8a020]/60 group-hover:shadow-[0_0_32px_rgba(232,160,32,0.25)]">
            <picture>
              <source srcSet="/profile.webp" type="image/webp" />
              <img
                src="/profile.jpg"
                alt="Ankit Patel"
                width={132}
                height={132}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
            </picture>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <a
          href="/resume.pdf"
          download="Ankit_Patel_Resume.pdf"
          className="inline-block rounded-full border border-[#2a2a30] px-4 py-1.5 text-[12.5px] text-[#d4d4d8] hover:border-[#e8a020] hover:text-white"
        >
          ↓ download resume
        </a>
      </div>
    </section>
  );
}
