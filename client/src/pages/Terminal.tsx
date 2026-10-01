import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { achievements, blogs, experience, expertiseGroups, profile } from "../data/content";

type Line = { text: string; cmd?: boolean };

const HELP = [
  "available commands:",
  "  whoami        — who is this guy?",
  "  experience    — where has he worked?",
  "  skills        — what does he work with?",
  "  achievements  — any proof?",
  "  blogs         — list blog posts",
  "  open <target> — github | linkedin | leetcode | resume | blogs",
  "  contact       — how to reach him",
  "  date          — current IST time",
  "  cat           — important",
  "  clear         — wipe the screen",
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { text: "ankit@online:~$ whoami --short" },
    { text: `${profile.displayName} — ${profile.role}. type 'help' to look around.` },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "terminal — ankit patel";
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const print = (text: string | string[]) =>
    setLines((l) => [...l, ...(Array.isArray(text) ? text : [text]).map((t) => ({ text: t }))]);

  const run = (raw: string) => {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    switch ((cmd || "").toLowerCase()) {
      case "":
        break;
      case "help":
        print(HELP);
        break;
      case "whoami":
        print([
          `${profile.displayName} — ${profile.role}.`,
          "3+ yrs: MERN + Java backend, DSA, system design. Hyderabad, India.",
        ]);
        break;
      case "experience":
        print(experience.map((e) => `• ${e.org} — ${e.role} (${e.time})`));
        break;
      case "skills":
        print(expertiseGroups.flatMap((g) => [`[${g.title}]`, `  ${g.items.join(" · ")}`]));
        break;
      case "achievements":
        print(achievements.map((a) => `• ${a.rank} ${a.detail}`));
        break;
      case "blogs":
        print(blogs.map((b, i) => `${i + 1}. ${b.title}`));
        print("tip: read one on /blogs — this shell is read-only :)");
        break;
      case "open":
        if (["github", "linkedin", "leetcode", "resume", "blogs"].includes(arg)) {
          const urls: Record<string, string> = {
            github: profile.github,
            linkedin: profile.linkedin,
            leetcode: profile.leetcode,
            resume: "/resume.pdf",
            blogs: "/blogs",
          };
          const url = urls[arg];
          if (url.startsWith("/")) navigate(url);
          else window.open(url, "_blank", "noopener");
          print(`opening ${arg}…`);
        } else {
          print(`open what? try: github | linkedin | leetcode | resume | blogs`);
        }
        break;
      case "contact":
        print([`email: ${profile.email}`, "or use the form in the connect section. i actually reply."]);
        break;
      case "date":
        print(
          new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"
        );
        break;
      case "cat":
        print("🐾 meow. psst — there's a paw button in the footer. press it.");
        break;
      case "sudo":
        print("permission denied: nice try 😏");
        break;
      case "clear":
        setLines([]);
        break;
      default:
        print(`command not found: ${cmd}. type 'help'.`);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLines((l) => [...l, { text: `ankit@online:~$ ${value}`, cmd: true }]);
    if (value.trim()) setHistory((h) => [value, ...h].slice(0, 50));
    setHIndex(-1);
    run(value);
    setValue("");
  };

  return (
    <section className="pt-10">
      <p className="section-label">terminal</p>
      <div className="mt-1 flex items-center gap-2">
        <h1 className="font-display text-[22px] font-bold text-white">say hi to the shell</h1>
        <span className="hand">no rm -rf here ↘</span>
      </div>
      <div
        className="card mt-5 min-h-[380px] cursor-text p-5 font-mono text-[13px] leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-1">
          {lines.map((l, i) => (
            <p key={i} className={l.cmd ? "text-white" : "text-[#9c9ca4]"}>
              {l.text}
            </p>
          ))}
        </div>
        <form onSubmit={submit} className="mt-2 flex items-center gap-2">
          <span className="shrink-0 text-[#e8a020]">ankit@online:~$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const n = Math.min(hIndex + 1, history.length - 1);
                if (history[n] !== undefined) {
                  setHIndex(n);
                  setValue(history[n]);
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = hIndex - 1;
                setHIndex(Math.max(n, -1));
                setValue(n >= 0 && history[n] ? history[n] : "");
              }
            }}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            aria-label="terminal input"
            className="w-full bg-transparent text-white caret-[#e8a020] focus:outline-none"
          />
        </form>
        <div ref={bottomRef} />
      </div>
      <p className="mt-3 font-mono text-[11px] text-[#55555e]">
        start with <span className="text-[#e8a020]">help</span> · press{" "}
        <span className="text-[#e8a020]">ctrl+k</span> anywhere to jump around
      </p>
    </section>
  );
}
