import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "lost? — ankit patel";
  }, []);

  return (
    <section className="py-24 text-center">
      <p className="font-mono text-[13px] text-[#63636b]">404</p>
      <h1 className="font-display mt-2 text-[28px] font-bold text-white">nothing here yet</h1>
      <p className="hand mt-2">lost? happens to the best of us ↘</p>
      <div className="mt-6 flex items-center justify-center gap-3 text-[13px]">
        <Link
          to="/"
          className="rounded-full bg-white px-4 py-1.5 font-medium text-black hover:bg-[#e8a020]"
        >
          go home
        </Link>
        <Link to="/blogs" className="text-[#a1a1aa] hover:text-white">
          or read the blogs →
        </Link>
      </div>
    </section>
  );
}
