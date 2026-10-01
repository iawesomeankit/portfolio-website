import { aboutCards } from "../data/content";

export default function About() {
  const [first, second, third, fourth] = aboutCards;
  const cards = [
    { data: first, span: "md:col-span-2" },
    { data: second, span: "" },
    { data: third, span: "" },
    { data: fourth, span: "md:col-span-2" },
  ];
  return (
    <section id="about" className="scroll-mt-20 pt-14">
      <p className="section-label">about</p>
      <div className="mt-1 flex items-center gap-2">
        <h2 className="font-display text-[22px] font-bold text-white">the short version</h2>
        <span className="hand">psst — keep reading ↗</span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {cards.map(
          (c) =>
            c.data && (
              <div key={c.data.title} className={`card group p-5 ${c.span}`}>
                <p className="text-[20px] transition-transform duration-300 group-hover:-translate-x-1">
                  {c.data.icon}
                </p>
                <p className="section-label mt-3">{c.data.label}</p>
                <p className="mt-1 text-[14px] font-semibold text-white transition-colors group-hover:text-[#e8a020]">
                  {c.data.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#9c9ca4]">{c.data.body}</p>
              </div>
            )
        )}
      </div>
    </section>
  );
}
