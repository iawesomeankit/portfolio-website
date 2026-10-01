import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogs, profile } from "../data/content";

type Item = {
  title: string;
  hint: string;
  keywords: string;
  run: () => void;
};

function scrollToId(id: string) {
  // Allow route render first when coming from another page
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      ...[
        { id: "about", title: "About" },
        { id: "experience", title: "Experience" },
        { id: "expertise", title: "Expertise" },
        { id: "achievements", title: "Achievements" },
        { id: "blog", title: "Blogs (preview)" },
        { id: "connect", title: "Connect" },
      ].map((s) => ({
        title: `Go to ${s.title}`,
        hint: "section",
        keywords: `go section ${s.title} ${s.id}`,
        run: () => {
          navigate("/");
          scrollToId(s.id);
        },
      })),
      {
        title: "All blogs",
        hint: "page",
        keywords: "blogs writing notes list",
        run: () => navigate("/blogs"),
      },
      {
        title: "Terminal",
        hint: "page",
        keywords: "terminal shell cli command",
        run: () => navigate("/terminal"),
      },
      ...blogs.map((b) => ({
        title: b.title,
        hint: "blog",
        keywords: `blog ${b.title} ${b.tags.join(" ")}`,
        run: () => navigate(`/blogs/${b.slug}`),
      })),
      {
        title: "Copy email",
        hint: "action",
        keywords: "email copy contact mail",
        run: () => navigator.clipboard?.writeText(profile.email).catch(() => {}),
      },
      {
        title: "GitHub ↗",
        hint: "link",
        keywords: "github code profile",
        run: () => window.open(profile.github, "_blank", "noopener"),
      },
      {
        title: "LinkedIn ↗",
        hint: "link",
        keywords: "linkedin profile",
        run: () => window.open(profile.linkedin, "_blank", "noopener"),
      },
      {
        title: "LeetCode ↗",
        hint: "link",
        keywords: "leetcode dsa knight",
        run: () => window.open(profile.leetcode, "_blank", "noopener"),
      },
      {
        title: "Download resume",
        hint: "action",
        keywords: "resume cv pdf download",
        run: () => window.open("/resume.pdf", "_blank", "noopener"),
      },
    ],
    [navigate]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items.filter((i) => i.keywords.toLowerCase().includes(q)).slice(0, 8);
  }, [items, query]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open ]);

  if (!open) return null;

  const choose = (i: Item) => {
    setOpen(false);
    i.run();
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="card card-static mx-auto mt-24 w-[calc(100%-2rem)] max-w-[480px] overflow-hidden p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-[#1f1f23] px-3 py-2.5">
          <span className="font-mono text-[13px] text-[#e8a020]">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIndex((v) => (v + 1) % Math.max(results.length, 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIndex((v) => (v - 1 + results.length) % Math.max(results.length, 1));
              } else if (e.key === "Enter" && results[index]) {
                choose(results[index]);
              }
            }}
            placeholder="type to jump… (blogs, sections, links)"
            className="w-full bg-transparent text-[14px] text-white placeholder:text-[#55555e] focus:outline-none"
          />
          <kbd className="rounded border border-[#2a2a30] px-1.5 py-0.5 font-mono text-[10px] text-[#63636b]">
            esc
          </kbd>
        </div>
        <div className="max-h-[320px] overflow-y-auto py-1">
          {results.length === 0 && (
            <p className="px-3 py-4 text-[13px] text-[#63636b]">
              nothing found. try "blogs" or "terminal".
            </p>
          )}
          {results.map((r, i) => (
            <button
              key={r.title}
              type="button"
              onMouseEnter={() => setIndex(i)}
              onClick={() => choose(r)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] ${
                i === index ? "bg-[#1a1a1e] text-white" : "text-[#b6b6bd]"
              }`}
            >
              <span className="truncate">{r.title}</span>
              <span className="ml-3 shrink-0 font-mono text-[10.5px] text-[#63636b]">{r.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
