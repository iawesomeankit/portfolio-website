import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/#about", label: "about" },
  { to: "/#experience", label: "experience" },
  { to: "/#expertise", label: "expertise" },
  { to: "/blogs", label: "blogs" },
  { to: "/#connect", label: "connect" },
];

export default function Navbar() {
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1a1e] bg-[#0a0a0b]/85 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-[820px] items-center justify-between px-5">
        <Link to="/" className="font-display text-[13px] font-700 font-bold tracking-tight text-white">
          ankit<span className="text-[#e8a020]">.</span>
        </Link>
        <nav className="flex items-center gap-5 text-[12.5px] text-[#a1a1aa]">
          {links.map((l) =>
            l.to === "/blogs" ? (
              <Link key={l.label} to="/blogs" className={`transition-colors hover:text-white ${loc.pathname.startsWith("/blogs") ? "text-white" : ""}`}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.to} className="hidden transition-colors hover:text-white sm:inline">
                {l.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
