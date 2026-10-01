import { achievements, codingProfiles } from "../data/content";

export default function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-20 pt-14">
      <p className="section-label">achievements</p>
      <div className="mt-1 flex items-center gap-2">
        <h2 className="font-display text-[22px] font-bold text-white">receipts</h2>
        <span className="hand">ranks, not promises 🧾</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {achievements.map((a) => (
          <div key={a.rank + a.detail} className="card p-5">
            <p className="font-display text-[22px] font-bold text-[#e8a020]">{a.rank}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#9c9ca4]">{a.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {codingProfiles.map((c) =>
          c.href ? (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="pill hover:border-[#e8a020] hover:text-white">
              {c.label} · {c.detail} ↗
            </a>
          ) : (
            <span key={c.label} title="profile link coming soon" className="pill opacity-80">
              {c.label} · {c.detail}
            </span>
          )
        )}
      </div>
    </section>
  );
}
