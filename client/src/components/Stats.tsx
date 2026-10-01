import CountUp from "./CountUp";
import { stats } from "../data/content";

export default function Stats() {
  return (
    <section className="mt-12 border-y border-[#1c1c21] py-5">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="group">
            <p className="font-display text-[22px] font-bold text-white transition-colors group-hover:text-[#e8a020]">
              <CountUp value={s.value} />
            </p>
            <p className="mt-1 text-[11.5px] leading-snug text-[#7c7c85]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
