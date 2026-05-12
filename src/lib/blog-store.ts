import type { BlogPost, BlogStatus } from "@/types/admin";

let posts: BlogPost[] = [];

function generateId(): string {
  return "post-" + Math.random().toString(36).slice(2, 10);
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const existing = posts.map((p) => p.slug);
  if (!existing.includes(base)) return base;

  let i = 2;
  while (existing.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

function calcSeoScore(post: Partial<BlogPost>): number {
  let score = 100;
  if (!post.seo?.metaTitle)       score -= 20;
  if (!post.seo?.metaDescription) score -= 20;
  if (!post.seo?.ogImage)         score -= 15;
  if (!post.seo?.canonicalUrl)    score -= 10;
  if (!post.featuredImage)        score -= 10;
  if (post.seo?.metaTitle && post.seo.metaTitle.length > 60)       score -= 5;
  if (post.seo?.metaDescription && post.seo.metaDescription.length > 160) score -= 5;
  if (post.seo?.noindex && post.status === "published")             score -= 15;
  return Math.max(0, score);
}

export type ListParams = {
  status?: BlogStatus | "all";
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest" | "updated" | "views";
};

export function listPosts(params: ListParams = {}) {
  const { status = "all", search = "", category = "", page = 1, limit = 20, sort = "newest" } = params;

  let filtered = [...posts];

  if (status && status !== "all") {
    filtered = filtered.filter((p) => p.status === status);
  }

  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  filtered.sort((a, b) => {
    if (sort === "oldest")  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sort === "updated") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (sort === "views")   return b.views - a.views;
    // newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const data = filtered.slice((safePage - 1) * limit, safePage * limit);

  return { posts: data, total, totalPages, page: safePage };
}

export function getPostById(id: string): BlogPost | undefined {
  return posts.find((p) => p.id === id);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export type CreateInput = Omit<BlogPost, "id" | "slug" | "views" | "seoScore" | "createdAt" | "updatedAt" | "publishedAt">;

export function createPost(input: CreateInput): BlogPost {
  const now = new Date().toISOString();
  const slug = generateSlug(input.title);
  const post: BlogPost = {
    ...input,
    id: generateId(),
    slug,
    views: 0,
    seoScore: calcSeoScore(input),
    createdAt: now,
    updatedAt: now,
    publishedAt: input.status === "published" ? now : null,
  };
  posts = [post, ...posts];
  return post;
}

export type UpdateInput = Partial<Omit<BlogPost, "id" | "slug" | "views" | "createdAt">>;

export function updatePost(id: string, input: UpdateInput): BlogPost | null {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const existing = posts[idx];
  const now = new Date().toISOString();

  // Re-generate slug only if title changed
  const slug =
    input.title && input.title !== existing.title
      ? generateSlug(input.title)
      : existing.slug;

  // Set publishedAt when first publishing
  const publishedAt =
    input.status === "published" && !existing.publishedAt ? now : existing.publishedAt;

  const updated: BlogPost = {
    ...existing,
    ...input,
    slug,
    publishedAt,
    updatedAt: now,
    seoScore: calcSeoScore({ ...existing, ...input }),
  };

  posts = posts.map((p, i) => (i === idx ? updated : p));
  return updated;
}

export function deletePost(id: string): boolean {
  const before = posts.length;
  posts = posts.filter((p) => p.id !== id);
  return posts.length < before;
}

export function getStats() {
  const total     = posts.length;
  const published = posts.filter((p) => p.status === "published").length;
  const draft     = posts.filter((p) => p.status === "draft").length;
  const archived  = posts.filter((p) => p.status === "archived").length;
  const avgSeoScore = total
    ? Math.round(posts.reduce((s, p) => s + p.seoScore, 0) / total)
    : 0;
  const categories = [...new Set(posts.map((p) => p.category))];
  return { total, published, draft, archived, avgSeoScore, categories };
}
