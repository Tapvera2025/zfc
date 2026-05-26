"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

const FALLBACK_IMG = "/assets/blog-featured.png";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  featuredImageAlt: string;
  category: string;
  tags: string[];
  views: number;
  publishedAt: string | null;
  createdAt: string;
};

type SidebarPost = {
  id: string;
  title: string;
  slug: string;
  featuredImage: string | null;
  publishedAt: string | null;
  createdAt: string;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<SidebarPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog/slug/${slug}`);
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const json = await res.json();
        if (!json.success) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setPost(json.data.post);
      } catch {
        setNotFound(true);
      }
      setLoading(false);
    }

    load();

    fetch("/api/blog?status=published&limit=4")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setRecentPosts(
            j.data.posts.filter((p: SidebarPost) => p.slug !== slug).slice(0, 4)
          );
        }
      })
      .catch(() => {});
  }, [slug]);

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader activePage="Blog" />

      {loading ? (
        <div className="blog-single-loading">Loading article…</div>
      ) : notFound ? (
        <div className="blog-single-notfound">
          <p style={{ fontSize: "3rem" }}>📄</p>
          <p style={{ marginTop: "12px", fontWeight: 600, color: "#555" }}>Article not found</p>
          <Link href="/blog" className="blog-single-back-btn" style={{ marginTop: "20px", display: "inline-block" }}>
            ← Back to Blog
          </Link>
        </div>
      ) : post ? (
        <div className="blog-single-layout">
          <article className="blog-single-article">
            {post.featuredImage && (
              <div className="blog-single-featured-img">
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt || post.title}
                />
              </div>
            )}

            <div className="blog-single-meta">
              {post.category && (
                <span className="blog-single-badge">{post.category}</span>
              )}
              <span className="blog-single-meta-item">
                <PersonIcon /> {post.author}
              </span>
              <span className="blog-single-meta-item">
                <CalendarIcon /> {formatDate(post.publishedAt ?? post.createdAt)}
              </span>
            </div>

            <h1 className="blog-single-title">{post.title}</h1>

            {post.excerpt && (
              <p className="blog-single-excerpt">{post.excerpt}</p>
            )}

            <div
              className="blog-single-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 && (
              <div className="blog-single-tags">
                <span className="blog-single-tags-label">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="blog-single-tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <div className="blog-single-footer">
              <Link href="/blog" className="blog-single-back-btn">
                ← Back to Blog
              </Link>
            </div>
          </article>

          <aside className="blog-single-sidebar">
            {recentPosts.length > 0 && (
              <div className="blog-sidebar__widget">
                <h3 className="blog-sidebar__heading">Recent Posts</h3>
                <ul className="blog-sidebar__recent">
                  {recentPosts.map((p) => (
                    <li key={p.id}>
                      <Link href={`/blog/${p.slug}`} className="blog-sidebar__recent-item">
                        <div className="blog-sidebar__recent-thumb">
                          <img
                            src={p.featuredImage ?? FALLBACK_IMG}
                            alt={p.title}
                            loading="lazy"
                          />
                        </div>
                        <div className="blog-sidebar__recent-info">
                          <span className="blog-sidebar__recent-title">{p.title}</span>
                          <p className="blog-sidebar__recent-date">
                            {formatDate(p.publishedAt ?? p.createdAt)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      ) : null}

      <FAQSection />
      <Footer />
    </div>
  );
}
