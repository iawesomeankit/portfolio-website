import { useState } from "react";
import { experience } from "../data/content";

export default function Experience() {
  // Single-open accordion; Smart Interviews starts open (richest history)
  const [open, setOpen] = useState<string | null>("Smart Interviews");

  return (
    <section id="experience" className="scroll-mt-20 pt-14">
      <p className="section-label">experience</p>
      <div className="mt-1 flex items-center gap-2">
        <h2 className="font-display text-[22px] font-bold text-white">the path so far</h2>
        <span className="hand">the journey ✦ ↘</span>
      </div>
      <div className="relative mt-6 space-y-2 pl-1">
        <div className="journey-line absolute bottom-4 left-[22px] top-2 w-px opacity-60" />
        {experience.map((e) => {
          const isOpen = open === e.org;
          return (
            <div
              key={e.org}
              className={`relative rounded-xl border transition-all duration-300 ${
                isOpen
                  ? "border-[#e8a020]/50 bg-[#111114]"
                  : "border-transparent hover:border-[#2a2a30] hover:bg-[#111114]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : e.org)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 px-2 py-2.5 text-left"
              >
                <div
                  className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-[#151518] text-[15px] transition-transform duration-300 ${
                    isOpen ? "rotate-6 border-[#e8a020]/50" : "border-[#26262c]"
                  }`}
                >
                  {e.icon}
                </div>
                <div className="flex w-full flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="text-[13.5px] text-[#d4d4d8]">
                    {e.org === "Salesforce" && (
                      <span className="relative mr-1.5 inline-flex h-2 w-2 align-middle">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                    )}
                    <span className="font-semibold text-white">{e.org}</span>{" "}
                    <span className="text-[#8e8e96]">{e.role}</span>
                    {!isOpen && e.detail && (
                      <span className="mt-0.5 block text-[12px] leading-relaxed text-[#6d6d76]">
                        {e.detail}
                      </span>
                    )}
                  </p>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="font-mono text-[11px] text-[#55555e]">{e.time}</span>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md border text-[13px] transition-all duration-300 ${
                        isOpen
                          ? "border-[#e8a020]/50 text-[#e8a020]"
                          : "border-[#26262c] bg-[#151518] text-[#a1a1aa]"
                      }`}
                    >
                      <span className={`inline-block transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        ⌄
                      </span>
                    </span>
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="px-2 pb-3 pl-[52px] pr-4">
                  {e.points && (
                    <ul className="space-y-1.5">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2 text-[12.5px] leading-relaxed text-[#9c9ca4]">
                          <span className="shrink-0 text-[#e8a020]">✳</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.sub && (
                    <div className="mt-3 space-y-3 border-t border-[#1f1f23] pt-3">
                      {e.sub.map((s) => (
                        <div key={s.role}>
                          <p className="flex flex-col gap-0.5 text-[13px] sm:flex-row sm:items-baseline sm:justify-between">
                            <span className="font-semibold text-white">
                              {e.org} <span className="font-normal text-[#8e8e96]">{s.role}</span>
                            </span>
                            <span className="shrink-0 font-mono text-[11px] text-[#55555e]">{s.time}</span>
                          </p>
                          {s.points ? (
                            <ul className="mt-1.5 space-y-1.5">
                              {s.points.map((p) => (
                                <li key={p} className="flex gap-2 text-[12.5px] leading-relaxed text-[#9c9ca4]">
                                  <span className="shrink-0 text-[#e8a020]">✳</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="mt-0.5 text-[12px] leading-relaxed text-[#6d6d76]">{s.detail}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
