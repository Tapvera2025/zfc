"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BlogIcon,
  SubmissionsIcon,
  SEOIcon,
  ExternalLinkIcon,
  PlusIcon,
} from "@/components/admin/icons";
import { Badge } from "@/components/admin/badge";

type Stats = {
  total: number;
  published: number;
  draft: number;
  archived: number;
  avgSeoScore: number;
  categories: string[];
};

const EMPTY: Stats = { total: 0, published: 0, draft: 0, archived: 0, avgSeoScore: 0, categories: [] };

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: "red" | "green" | "yellow";
}) {
  const accentClass =
    accent === "red"    ? "text-red-600"    :
    accent === "green"  ? "text-green-600"  :
    accent === "yellow" ? "text-yellow-600" : "text-zinc-900";

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${accentClass}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-zinc-400">{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog/stats")
      .then((r) => r.json())
      .then((j) => { if (j.success) setStats(j.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const { total, published, draft, archived, avgSeoScore } = stats;
  const publishedPct = total > 0 ? Math.round((published / total) * 100) : 0;

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome back. Here&apos;s what&apos;s happening on your site.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Total Posts"  value={loading ? "—" : total}          />
        <StatCard label="Published"    value={loading ? "—" : published}       accent="green"  />
        <StatCard label="Drafts"       value={loading ? "—" : draft}           accent="yellow" />
        <StatCard label="Archived"     value={loading ? "—" : archived}        />
        <StatCard
          label="Avg SEO Score"
          value={loading ? "—" : avgSeoScore}
          sub="out of 100"
          accent={avgSeoScore >= 80 ? "green" : avgSeoScore >= 60 ? "yellow" : "red"}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-zinc-900">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-3 rounded-md border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <PlusIcon size={15} className="text-red-600" />
              Create Blog Post
            </Link>
            <Link
              href="/admin/submissions"
              className="flex items-center gap-3 rounded-md border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <SubmissionsIcon size={15} className="text-zinc-400" />
              View Form Submissions
            </Link>
            <Link
              href="/admin/seo"
              className="flex items-center gap-3 rounded-md border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <SEOIcon size={15} className="text-zinc-400" />
              Open SEO Dashboard
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <ExternalLinkIcon size={15} className="text-zinc-400" />
              View Website
            </Link>
          </div>
        </div>

        {/* Blog Summary */}
        <div className="lg:col-span-2 rounded-lg border border-zinc-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-900">Blog Overview</h2>
            <Link
              href="/admin/blog"
              className="text-xs font-medium text-red-600 transition hover:text-red-700"
            >
              View all posts →
            </Link>
          </div>

          {!loading && total === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <BlogIcon size={32} className="text-zinc-300" />
              <p className="mt-3 text-sm text-zinc-500">No posts yet.</p>
              <Link
                href="/admin/blog/new"
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
              >
                <PlusIcon size={12} />
                Create your first post
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <span className="text-2xl font-semibold text-zinc-900">
                    {loading ? <span className="inline-block h-7 w-6 animate-pulse rounded bg-zinc-100" /> : total}
                  </span>
                  <span className="ml-2 text-zinc-500">total posts</span>
                </div>
                <div className="h-8 w-px bg-zinc-200" />
                <div className="flex items-center gap-2">
                  <Badge variant="published">Published</Badge>
                  <span className="font-semibold text-zinc-900">{loading ? "—" : published}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="draft">Draft</Badge>
                  <span className="font-semibold text-zinc-900">{loading ? "—" : draft}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="archived">Archived</Badge>
                  <span className="font-semibold text-zinc-900">{loading ? "—" : archived}</span>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${publishedPct}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                {loading ? "Loading…" : `${publishedPct}% of posts published`}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
