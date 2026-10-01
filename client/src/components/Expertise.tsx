import { expertiseGroups, skillPills } from "../data/content";

export default function Expertise() {
  return (
    <section id="expertise" className="scroll-mt-20 pt-14">
      <p className="section-label">expertise</p>
      <div className="mt-1 flex items-center gap-2">
        <h2 className="font-display text-[22px] font-bold text-white">what i work with</h2>
        <span className="hand">always learning more ↘</span>
      </div>
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        {expertiseGroups.map((g) => (
          <div key={g.title}>
            <p className="section-label">{g.title}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <span key={i} className="pill">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#1c1c21] pt-4">
        {skillPills.map((s) => (
          <span key={s} className="pill opacity-80">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
