import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogs, type Blog } from "../data/content";
import { api } from "../lib/api";

async function fetchBlogs(): Promise<Blog[]> {
  try {
    const r = await fetch(api("/api/blogs"));
    if (!r.ok) throw new Error("api");
    const j = await r.json();
    if (Array.isArray(j) && j.length) return j as Blog[];
    return blogs;
  } catch {
    return blogs;
  }
}

export default function BlogPreview({ limit = 3 }: { limit?: number }) {
  const [items, setItems] = useState<Blog[]>(blogs.slice(0, limit));
  useEffect(() => {
    fetchBlogs().then((b) => setItems(b.slice(0, limit)));
  }, [limit]);

  return (
    <section id="blog" className="scroll-mt-20 pt-14">
      <p className="section-label">blog</p>
      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-[22px] font-bold text-white">writing & notes</h2>
          <span className="hand">fresh from the terminal ↘</span>
        </div>
        <Link to="/blogs" className="text-[12.5px] text-[#a1a1aa] hover:text-white">
          view all →
        </Link>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {items.map((b) => (
          <Link key={b.slug} to={`/blogs/${b.slug}`} className="card group block p-5">
            <p className="font-mono text-[11px] text-[#63636b]">
              {b.date} · {b.readTime}
            </p>
            <p className="mt-2 text-[14.5px] font-semibold leading-snug text-white group-hover:text-[#e8a020]">
              {b.title}
            </p>
            <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-[#9c9ca4]">{b.excerpt}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {b.tags.slice(0, 2).map((t) => (
                  <span key={t} className="font-mono text-[11px] text-[#e8a020]/90">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-[12px] text-[#63636b] transition-all group-hover:translate-x-1 group-hover:text-[#e8a020]">
                read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
