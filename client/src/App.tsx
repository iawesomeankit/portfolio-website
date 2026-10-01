import { Suspense, lazy, useEffect, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";

// Lazy-load blog pages so homepage bundle stays light
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Terminal = lazy(() => import("./pages/Terminal"));
const NotFound = lazy(() => import("./pages/NotFound"));

function BlogSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blogs/${slug}`} replace />;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function RouteFade({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="route-fade">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0b]">
        <ScrollProgress />
        <CommandPalette />
        <ScrollToTop />
        <Navbar />
        <main className="mx-auto w-full max-w-[820px] px-5 pb-4">
          <Suspense fallback={<p className="pt-16 text-center text-[13px] text-[#63636b]">loading…</p>}>
            <RouteFade>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs/:slug" element={<BlogPost />} />
                <Route path="/terminal" element={<Terminal />} />
                {/* legacy singular URLs */}
                <Route path="/blog" element={<Navigate to="/blogs" replace />} />
                <Route path="/blog/:slug" element={<BlogSlugRedirect />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RouteFade>
          </Suspense>
          <Footer />
        </main>
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}
