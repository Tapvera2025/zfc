"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage: string | null;
  featuredImageAlt: string;
  publishedAt: string | null;
  createdAt: string;
  views: number;
};

type ApiResult = {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
  categories: string[];
  tags: string[];
};

const LIMIT = 6;

const FALLBACK_IMG = "/assets/blog-featured.png";

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function GridIcon({ active }: { active: boolean }) {
  const c = active ? "#cc1f1f" : "#bbb";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={c}>
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  const c = active ? "#cc1f1f" : "#bbb";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
      <line x1="9" y1="6" x2="21" y2="6"/>
      <line x1="9" y1="12" x2="21" y2="12"/>
      <line x1="9" y1="18" x2="21" y2="18"/>
      <circle cx="4" cy="6" r="1.2" fill={c} stroke="none"/>
      <circle cx="4" cy="12" r="1.2" fill={c} stroke="none"/>
      <circle cx="4" cy="18" r="1.2" fill={c} stroke="none"/>
    </svg>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      status: "published",
      page: String(page),
      limit: String(LIMIT),
      sort: "newest",
    });
    if (search) params.set("search", search);
    if (activeCategory) params.set("category", activeCategory);

    const res = await fetch(`/api/blog?${params}`);
    const json = await res.json();
    if (json.success) {
      const { posts: p, total: t, page: pg, totalPages: tp } = json.data;
      setPosts(p);
      setTotal(t);
      setTotalPages(tp);
      setPage(pg);
    }
    setLoading(false);
  }, [page, search, activeCategory]);

  // Fetch sidebar data once
  useEffect(() => {
    fetch("/api/blog?status=published&limit=100")
      .then((r) => r.json())
      .then((j) => {
        if (!j.success) return;
        const all: Post[] = j.data.posts;
        const cats = [...new Set(all.map((p: Post) => p.category).filter(Boolean))];
        const tags = [...new Set(all.flatMap((p: Post) => p.tags).filter(Boolean))];
        const counts: Record<string, number> = {};
        all.forEach((p: Post) => { if (p.category) counts[p.category] = (counts[p.category] ?? 0) + 1; });
        setAllCategories(cats);
        setAllTags(tags);
        setCategoryCounts(counts);
        setRecentPosts(all.slice(0, 4));
      });
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  }

  function selectCategory(cat: string) {
    setActiveCategory(activeCategory === cat ? "" : cat);
    setActiveTag("");
    setPage(1);
  }

  function selectTag(tag: string) {
    setActiveTag(activeTag === tag ? "" : tag);
    setSearchInput(activeTag === tag ? "" : tag);
    setSearch(activeTag === tag ? "" : tag);
    setActiveCategory("");
    setPage(1);
  }

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader activePage="Blog" />

      {/* Hero banner */}
      <div className="zfc-about-hero-wrap">
        <section className="zfc-about-hero" aria-label="Blog hero">
          <div className="zfc-about-hero__bg" aria-hidden="true">
            <Image
              src="/assets/services-hero-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="zfc-about-hero__overlay" aria-hidden="true" />
          <div className="zfc-about-hero__content">
            <h1 className="zfc-about-hero__title">Blog & Articles</h1>
            <nav className="zfc-about-hero__breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="zfc-about-hero__breadcrumb-link">Home</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span className="zfc-about-hero__breadcrumb-current">Blog</span>
            </nav>
          </div>
        </section>
      </div>

      <div className="blog-layout">
        {/* ── Main articles ── */}
        <main>
          <div className="blog-main__header">
            <div className="blog-main__title-wrap">
              <h2 className="blog-main__title">All Articles</h2>
              <div className="blog-main__title-bar" />
            </div>

            <div className="blog-main__controls">
              <form className="blog-main__search" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search articles…"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              </form>

              <div className="blog-main__view-toggle">
                <button
                  className={`blog-main__view-btn ${viewMode === "grid" ? "blog-main__view-btn--active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <GridIcon active={viewMode === "grid"} />
                </button>
                <button
                  className={`blog-main__view-btn ${viewMode === "list" ? "blog-main__view-btn--active" : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <ListIcon active={viewMode === "list"} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="blog-empty">Loading articles…</div>
          ) : posts.length === 0 ? (
            <div className="blog-empty">
              <p style={{ fontSize: "3rem" }}>📝</p>
              <p style={{ marginTop: "12px", fontWeight: 600, color: "#555" }}>No articles found</p>
              {(search || activeCategory) && (
                <button
                  style={{ marginTop: "12px", color: "#cc1f1f", fontSize: "14px", fontWeight: 600, textDecoration: "underline" }}
                  onClick={() => { setSearch(""); setSearchInput(""); setActiveCategory(""); setPage(1); }}
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className={viewMode === "grid" ? "blog-grid" : "blog-list"}>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`blog-card ${viewMode === "list" ? "blog-card--list" : ""}`}
                >
                  <div className="blog-card__thumb">
                    <img
                      src={post.featuredImage ?? FALLBACK_IMG}
                      alt={post.featuredImageAlt || post.title}
                      loading="lazy"
                    />
                    {post.category && (
                      <span className="blog-card__badge">{post.category}</span>
                    )}
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{post.title}</h3>
                    <div className="blog-card__meta">
                      <CalendarIcon />
                      <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                    </div>
                    {post.excerpt && (
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                    )}
                    <div className="blog-card__footer">
                      <span className="blog-card__read-more">
                        Read More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="blog-pagination">
              <button
                className="blog-pagination__btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`blog-pagination__btn ${p === page ? "blog-pagination__btn--active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="blog-pagination__btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </main>

        {/* ── Sidebar ── */}
        <aside className="blog-sidebar">
          {/* Categories */}
          <div className="blog-sidebar__widget">
            <h3 className="blog-sidebar__heading">Category</h3>
            <ul className="blog-sidebar__categories">
              {allCategories.length === 0 ? (
                <li style={{ fontSize: "13px", color: "#aaa", padding: "8px 0" }}>No categories yet</li>
              ) : allCategories.map((cat) => (
                <li
                  key={cat}
                  className={`blog-sidebar__cat-item ${activeCategory === cat ? "blog-sidebar__cat-item--active" : ""}`}
                  onClick={() => selectCategory(cat)}
                >
                  <span className="blog-sidebar__cat-item__label">
                    <span className="blog-sidebar__cat-item__dot" />
                    {cat}
                  </span>
                  {categoryCounts[cat] ? (
                    <span className="blog-sidebar__cat-count">{categoryCounts[cat]}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <div className="blog-sidebar__widget">
              <h3 className="blog-sidebar__heading">Recent Posts</h3>
              <ul className="blog-sidebar__recent">
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="blog-sidebar__recent-item">
                      <div className="blog-sidebar__recent-thumb">
                        <img
                          src={post.featuredImage ?? FALLBACK_IMG}
                          alt={post.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="blog-sidebar__recent-info">
                        <span className="blog-sidebar__recent-title">{post.title}</span>
                        <p className="blog-sidebar__recent-date">{formatDate(post.publishedAt ?? post.createdAt)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="blog-sidebar__widget">
              <h3 className="blog-sidebar__heading">Tags</h3>
              <div className="blog-sidebar__tags">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`blog-sidebar__tag ${activeTag === tag ? "blog-sidebar__tag--active" : ""}`}
                    onClick={() => selectTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <FAQSection />
      <Footer />
    </div>
  );
}
