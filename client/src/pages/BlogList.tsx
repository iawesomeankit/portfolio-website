import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { blogs, type Blog } from "../data/content";
import { api } from "../lib/api";

export default function BlogList() {
  const [items, setItems] = useState<Blog[]>(blogs);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    document.title = "writing & notes — ankit patel";
  }, []);

  useEffect(() => {
    fetch(api("/api/blogs"))
      .then((r) => (r.ok ? r.json() : blogs))
      .then((j) => Array.isArray(j) && j.length && setItems(j))
      .catch(() => {});
  }, []);

  const allTags = useMemo(() => [...new Set(items.flatMap((b) => b.tags))].sort(), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (b) =>
        (!tag || b.tags.includes(tag)) &&
        (!q ||
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t) => t.includes(q)))
    );
  }, [items, query, tag]);

  return (
    <section className="pt-10">
      <p className="section-label">blogs</p>
      <div className="mt-1 flex items-center gap-2">
        <h1 className="font-display text-[28px] font-bold text-white">writing & notes</h1>
        <span className="hand">grab a chai ☕</span>
      </div>
      <p className="mt-2 max-w-[560px] text-[13.5px] leading-relaxed text-[#9c9ca4]">
        Backend, system design, AI systems & career notes — from Redis p99s to idempotent payments.
      </p>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-[13px] text-[#55555e]">
            ⌕
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search posts… (redis, payments, dsa)"
            aria-label="search blog posts"
            className="w-full rounded-lg border border-[#26262c] bg-[#141417] py-2.5 pl-10 pr-3.5 text-[13.5px] text-white placeholder:text-[#55555e] focus:border-[#e8a020] focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setTag(null)}
            className={`pill transition-all hover:border-[#e8a020]/60 hover:text-white ${
              tag === null ? "pill-active" : ""
            }`}
        >
          all
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag((cur) => (cur === t ? null : t))}
            className={`pill transition-all hover:border-[#e8a020]/60 hover:text-white ${
              tag === t ? "pill-active" : ""
            }`}
          >
            #{t}
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-[11px] text-[#55555e]">
        {filtered.length} post{filtered.length === 1 ? "" : "s"}
        {tag ? ` · #${tag}` : ""}
        {query.trim() ? ` · “${query.trim()}”` : ""}
      </p>
      <div className="mt-2 space-y-3">
        {filtered.map((b) => (
          <Link key={b.slug} to={`/blogs/${b.slug}`} className="card group block p-5">
            <p className="font-mono text-[11px] text-[#63636b]">
              {b.date} · {b.readTime}
            </p>
            <p className="mt-1.5 text-[16px] font-semibold text-white group-hover:text-[#e8a020]">{b.title}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#9c9ca4]">{b.excerpt}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="font-mono text-[11px] text-[#e8a020]/80">{b.tags.map((t) => `#${t} `)}</p>
              <span className="text-[12px] text-[#63636b] transition-all group-hover:translate-x-1 group-hover:text-[#e8a020]">
                read →
              </span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="card p-8 text-center">
            <p className="text-[14px] text-white">no posts match that.</p>
            <p className="hand mt-1">try fewer words ↘</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTag(null);
              }}
              className="mt-3 text-[12.5px] text-[#e8a020] hover:text-white"
            >
              clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
