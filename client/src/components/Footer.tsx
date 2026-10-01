import { Link } from "react-router-dom";
import CatFriend from "./CatFriend";

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-[#1a1a1e] py-6">
      <div className="flex flex-col items-center justify-between gap-3 text-[11.5px] text-[#55555e] sm:flex-row">
        <span>© 2024–2026 ankit patel</span>
        <span className="flex items-center gap-4">
          <a href="https://github.com/iawesomeankit" className="transition-colors hover:text-white">github</a>
          <a href="https://linkedin.com/in/ankit-patel-156402212" className="transition-colors hover:text-white">linkedin</a>
          <a href="mailto:ap92625@gmail.com" className="transition-colors hover:text-white">email</a>
          <Link to="/terminal" className="font-mono transition-colors hover:text-white">~/terminal</Link>
          <span className="hidden font-mono text-[10.5px] text-[#3f3f46] sm:inline">ctrl+k</span>
          <CatFriend />
        </span>
      </div>
    </footer>
  );
}
