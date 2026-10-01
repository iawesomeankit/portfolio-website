import { useEffect, useRef, useState } from "react";

// Opt-in easter egg: a tiny SVG cat that trails the cursor.
// Desktop pointers only, off by default, killed entirely under reduced-motion.
export default function CatFriend() {
  const [on, setOn] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!on) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move, { passive: true });
    const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let raf = 0;
    const tick = () => {
      cur.x += (target.current.x - cur.x) * 0.14;
      cur.y += (target.current.y - cur.y) * 0.14;
      catRef.current?.style.setProperty(
        "transform",
        `translate(${cur.x}px, ${cur.y}px) translate(-50%, -130%)`
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [on ]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        title={on ? "shoo the cat away" : "a tiny companion"}
        aria-pressed={on}
        className={`rounded-md px-1.5 py-0.5 text-[13px] transition-transform hover:scale-125 ${
          on ? "opacity-100" : "opacity-40 hover:opacity-80"
        }`}
      >
        🐾
      </button>
      {on && (
        <div
          ref={catRef}
          aria-hidden
          className="cat-bob pointer-events-none fixed left-0 top-0 z-[70]"
          style={{ transform: "translate(-100px, -100px)" }}
        >
          <svg width="30" height="28" viewBox="0 0 30 28" fill="none">
            <path
              d="M5 12 L3 3 L11 7 Z M25 12 L27 3 L19 7 Z"
              fill="#e8a020"
            />
            <circle cx="15" cy="17" r="11" fill="#17171a" stroke="#e8a020" strokeWidth="1.5" />
            <circle cx="11" cy="16" r="1.6" fill="#e4e4e7" />
            <circle cx="19" cy="16" r="1.6" fill="#e4e4e7" />
            <path d="M13 21 Q15 23 17 21" stroke="#e4e4e7" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </>
  );
}
