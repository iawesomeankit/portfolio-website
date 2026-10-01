import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollProgress from "../components/ScrollProgress";
import { api } from "../lib/api";
import { blogs, type Blog } from "../data/content";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Blog | undefined>(blogs.find((b) => b.slug === slug));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(api(`/api/blogs/${slug}`))
      .then((r) => (r.ok ? r.json() : undefined))
      .then((j) => j && setPost(j))
      .catch(() => {});
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    document.title = post ? `${post.title} — ankit patel` : "not found — ankit patel";
    const tag = document.querySelector('meta[name="description"]');
    if (tag && post) tag.setAttribute("content", post.excerpt);
  }, [post]);

  if (!post)
    return (
      <section className="pt-16 text-center">
        <p className="text-white">Post not found.</p>
        <Link to="/blogs" className="mt-3 inline-block text-[#e8a020]">
          ← back to blogs
        </Link>
      </section>
    );

  return (
    <article className="pt-10">
      <ScrollProgress />
      <Link to="/blogs" className="text-[12.5px] text-[#8e8e96] hover:text-white">
        ← all posts
      </Link>
      <p className="mt-4 font-mono text-[11px] text-[#63636b]">
        {post.date} · {post.readTime}
      </p>
      <h1 className="font-display mt-2 max-w-[640px] text-[26px] font-bold leading-tight text-white sm:text-[32px]">
        {post.title}
      </h1>
      <p className="mt-2 font-mono text-[11px] text-[#e8a020]/80">{post.tags.map((t) => `#${t} `)}</p>
      <div className="mt-6 max-w-[680px] space-y-4">
        {post.content.map((p, i) => (
          <p key={i} className="text-[14.5px] leading-[1.8] text-[#bcbcc4]">
            {p}
          </p>
        ))}
      </div>
      <div className="mt-8 flex max-w-[680px] flex-wrap items-center gap-2 border-t border-[#1c1c21] pt-4">
        <span className="font-mono text-[11px] text-[#55555e]">share →</span>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(`https://ankitpatel.online/blogs/${post.slug}`);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              /* clipboard unavailable */
            }
          }}
          className="pill transition-all hover:border-[#e8a020]/60 hover:text-white"
        >
          {copied ? "copied ✓" : "copy link"}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://ankitpatel.online/blogs/${post.slug}`)}`}
          target="_blank"
          rel="noreferrer"
          className="pill transition-all hover:border-[#e8a020]/60 hover:text-white"
        >
          post on X ↗
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://ankitpatel.online/blogs/${post.slug}`)}`}
          target="_blank"
          rel="noreferrer"
          className="pill transition-all hover:border-[#e8a020]/60 hover:text-white"
        >
          share on linkedin ↗
        </a>
      </div>
      <div className="card mt-6 p-5">
        <p className="text-[13.5px] text-white"> enjoyed this? let's be friends →</p>
        <a href="mailto:ap92625@gmail.com" className="hand text-[16px]">
          say hello — i actually reply ↗
        </a>
      </div>
    </article>
  );
}
