"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Badge, SEOScoreBadge } from "@/components/admin/badge";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  ArchiveIcon,
  CopyIcon,
} from "@/components/admin/icons";
import type { BlogPost, BlogStatus } from "@/types/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortOption = "newest" | "oldest" | "updated" | "views";

type ListResponse = {
  success: boolean;
  data: {
    posts: BlogPost[];
    total: number;
    totalPages: number;
    page: number;
  };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_FILTERS: { label: string; value: BlogStatus | "all" }[] = [
  { label: "All",       value: "all"       },
  { label: "Published", value: "published" },
  { label: "Draft",     value: "draft"     },
  { label: "Archived",  value: "archived"  },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest first",   value: "newest"  },
  { label: "Oldest first",   value: "oldest"  },
  { label: "Last updated",   value: "updated" },
  { label: "Most viewed",    value: "views"   },
];

const LIMIT = 15;

// ─── Row action menu ──────────────────────────────────────────────────────────

function ActionMenu({
  post,
  onPublish,
  onUnpublish,
  onArchive,
  onDuplicate,
  onDelete,
}: {
  post: BlogPost;
  onPublish:   () => void;
  onUnpublish: () => void;
  onArchive:   () => void;
  onDuplicate: () => void;
  onDelete:    () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const item = "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-zinc-50";
  const danger = `${item} text-red-600 hover:bg-red-50`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded px-2 py-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
        aria-label="Actions"
        type="button"
      >
        ···
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-20 w-44 rounded-lg border border-zinc-200 bg-white py-1 shadow-md">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={item + " text-zinc-700"}
          >
            <EyeIcon size={13} className="shrink-0 text-zinc-400" />
            View post
          </Link>

          {post.status !== "published" && (
            <button className={item + " text-zinc-700"} onClick={() => { onPublish(); setOpen(false); }}>
              <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-green-500" />
              Publish
            </button>
          )}
          {post.status === "published" && (
            <button className={item + " text-zinc-700"} onClick={() => { onUnpublish(); setOpen(false); }}>
              <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-yellow-400" />
              Unpublish
            </button>
          )}
          {post.status !== "archived" && (
            <button className={item + " text-zinc-700"} onClick={() => { onArchive(); setOpen(false); }}>
              <ArchiveIcon size={13} className="shrink-0 text-zinc-400" />
              Archive
            </button>
          )}

          <button className={item + " text-zinc-700"} onClick={() => { onDuplicate(); setOpen(false); }}>
            <CopyIcon size={13} className="shrink-0 text-zinc-400" />
            Duplicate
          </button>

          <div className="my-1 border-t border-zinc-100" />

          <button className={danger} onClick={() => { onDelete(); setOpen(false); }}>
            <TrashIcon size={13} className="shrink-0" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogListPage() {
  const [posts, setPosts]           = useState<BlogPost[]>([]);
  const [total, setTotal]           = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage]             = useState(1);
  const [loading, setLoading]       = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch]           = useState("");
  const [status, setStatus]           = useState<BlogStatus | "all">("all");
  const [category, setCategory]       = useState("");
  const [sort, setSort]               = useState<SortOption>("newest");
  const [categories, setCategories]   = useState<string[]>([]);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Fetch ────────────────────────────────────────────────────────────────

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page:  String(page),
        limit: String(LIMIT),
        sort,
      });
      if (status !== "all") params.set("status", status);
      if (search)           params.set("search", search);
      if (category)         params.set("category", category);

      const res  = await fetch(`/api/blog?${params}`);
      const json: ListResponse = await res.json();

      if (json.success) {
        setPosts(json.data.posts);
        setTotal(json.data.total);
        setTotalPages(json.data.totalPages);
      }
    } finally {
      setLoading(false);
    }
  }, [page, sort, status, search, category]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  // ── Fetch category list once ─────────────────────────────────────────────

  useEffect(() => {
    fetch("/api/blog/stats")
      .then((r) => r.json())
      .then((j) => { if (j.success) setCategories(j.data.categories ?? []); })
      .catch(() => {});
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleStatusChange(s: BlogStatus | "all") {
    setStatus(s);
    setPage(1);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearch(e.target.value);
      setPage(1);
    }, 350);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as SortOption);
    setPage(1);
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
    setPage(1);
  }

  async function handleStatusUpdate(id: string, newStatus: BlogStatus) {
    await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchPosts();
  }

  async function handleDuplicate(post: BlogPost) {
    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title:            `Copy of ${post.title}`,
        author:           post.author,
        excerpt:          post.excerpt,
        content:          post.content,
        featuredImage:    post.featuredImage,
        featuredImageAlt: post.featuredImageAlt,
        category:         post.category,
        tags:             post.tags,
        status:           "draft",
        seo:              post.seo,
      }),
    });
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    // Step back if we deleted the last item on a page > 1
    if (posts.length === 1 && page > 1) {
      setPage((p) => p - 1);
    } else {
      fetchPosts();
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Blog</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            {total} {total === 1 ? "post" : "posts"} total
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <PlusIcon size={14} />
          Create Blog Post
        </Link>
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            width={14} height={14} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search posts…"
            value={searchInput}
            onChange={handleSearchChange}
            className="w-56 rounded-md border border-zinc-300 bg-white py-1.5 pl-8 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
          />
        </div>

        {/* Status filters */}
        <div className="flex rounded-md border border-zinc-200 bg-white">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleStatusChange(value)}
              className={`px-3 py-1.5 text-sm font-medium transition first:rounded-l-md last:rounded-r-md ${
                status === value
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-50"
              }`}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category */}
        {categories.length > 0 && (
          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded-md border border-zinc-300 bg-white py-1.5 pl-3 pr-8 text-sm text-zinc-700 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}

        {/* Sort */}
        <select
          value={sort}
          onChange={handleSortChange}
          className="ml-auto rounded-md border border-zinc-300 bg-white py-1.5 pl-3 pr-8 text-sm text-zinc-700 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
        >
          {SORT_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-zinc-400">
            Loading…
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <EditIcon size={20} className="text-zinc-400" />
            </div>
            <p className="text-sm font-medium text-zinc-700">No posts found</p>
            <p className="mt-1 text-xs text-zinc-400">
              {search || status !== "all" || category
                ? "Try adjusting your filters."
                : "Create your first blog post to get started."}
            </p>
            {!search && status === "all" && !category && (
              <Link
                href="/admin/blog/new"
                className="mt-4 flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <PlusIcon size={13} />
                Create Blog Post
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                <th className="px-4 py-3">Title</th>
                <th className="hidden px-4 py-3 lg:table-cell">Author</th>
                <th className="hidden px-4 py-3 xl:table-cell">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="hidden px-4 py-3 xl:table-cell">Views</th>
                <th className="hidden px-4 py-3 lg:table-cell">Published</th>
                <th className="hidden px-4 py-3 lg:table-cell">Updated</th>
                <th className="px-4 py-3 text-center">SEO</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {posts.map((post) => (
                <tr key={post.id} className="group hover:bg-zinc-50">
                  {/* Title */}
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="font-medium text-zinc-900 transition hover:text-red-600"
                    >
                      {post.title}
                    </Link>
                    {post.excerpt && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-zinc-400">
                        {post.excerpt}
                      </p>
                    )}
                  </td>

                  {/* Author */}
                  <td className="hidden px-4 py-3 text-zinc-600 lg:table-cell">
                    {post.author}
                  </td>

                  {/* Category */}
                  <td className="hidden px-4 py-3 xl:table-cell">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                      {post.category}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <Badge variant={post.status}>{
                      post.status.charAt(0).toUpperCase() + post.status.slice(1)
                    }</Badge>
                  </td>

                  {/* Views */}
                  <td className="hidden px-4 py-3 text-zinc-500 xl:table-cell">
                    {post.views.toLocaleString()}
                  </td>

                  {/* Published */}
                  <td className="hidden px-4 py-3 text-zinc-500 lg:table-cell">
                    {formatDate(post.publishedAt)}
                  </td>

                  {/* Updated */}
                  <td className="hidden px-4 py-3 text-zinc-500 lg:table-cell">
                    {formatDate(post.updatedAt)}
                  </td>

                  {/* SEO score */}
                  <td className="px-4 py-3 text-center">
                    <SEOScoreBadge score={post.seoScore} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="rounded p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                        title="Edit"
                      >
                        <EditIcon size={14} />
                      </Link>
                      <ActionMenu
                        post={post}
                        onPublish={()   => handleStatusUpdate(post.id, "published")}
                        onUnpublish={() => handleStatusUpdate(post.id, "draft")}
                        onArchive={()   => handleStatusUpdate(post.id, "archived")}
                        onDuplicate={()  => handleDuplicate(post)}
                        onDelete={()    => handleDelete(post.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-zinc-500">
            Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total} posts
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="rounded border border-zinc-200 px-3 py-1.5 text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "…")[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "…" ? (
                  <span key={`gap-${idx}`} className="px-1 text-zinc-400">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setPage(item as number)}
                    className={`rounded border px-3 py-1.5 transition ${
                      item === page
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                    type="button"
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="rounded border border-zinc-200 px-3 py-1.5 text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
