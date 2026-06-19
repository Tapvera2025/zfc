import { getDb } from "./mongodb";
import type { BlogPost, BlogStatus } from "@/types/admin";

async function col() {
  const db = await getDb();
  return db.collection("blog_posts");
}

function generateId(): string {
  return "post-" + Math.random().toString(36).slice(2, 10);
}

async function generateSlug(title: string, excludeId?: string): Promise<string> {
  const c = await col();
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const existingFilter = excludeId ? { id: { $ne: excludeId } } : {};
  const existingSlugs = (await c.distinct("slug", existingFilter)) as string[];

  if (!existingSlugs.includes(base)) return base;
  let i = 2;
  while (existingSlugs.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

function calcSeoScore(post: Partial<BlogPost>): number {
  let score = 100;
  if (!post.seo?.metaTitle)       score -= 20;
  if (!post.seo?.metaDescription) score -= 20;
  if (!post.seo?.ogImage)         score -= 15;
  if (!post.seo?.canonicalUrl)    score -= 10;
  if (!post.featuredImage)        score -= 10;
  if (post.seo?.metaTitle && post.seo.metaTitle.length > 60)              score -= 5;
  if (post.seo?.metaDescription && post.seo.metaDescription.length > 160) score -= 5;
  if (post.seo?.noindex && post.status === "published")                    score -= 15;
  return Math.max(0, score);
}

export type ListParams = {
  status?:   BlogStatus | "all";
  search?:   string;
  category?: string;
  page?:     number;
  limit?:    number;
  sort?:     "newest" | "oldest" | "updated" | "views";
};

const SORT_MAP: Record<string, Record<string, 1 | -1>> = {
  newest:  { createdAt: -1 },
  oldest:  { createdAt:  1 },
  updated: { updatedAt: -1 },
  views:   { views:     -1 },
};

export async function listPosts(params: ListParams = {}) {
  const { status = "all", search = "", category = "", page = 1, limit = 20, sort = "newest" } = params;
  const c = await col();

  const filter: Record<string, unknown> = {};
  if (status && status !== "all") filter.status = status;
  if (category) filter.category = { $regex: new RegExp(`^${category}$`, "i") };
  if (search.trim()) {
    const q = search.trim();
    filter.$or = [
      { title:    { $regex: q, $options: "i" } },
      { author:   { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
      { tags:     { $regex: q, $options: "i" } },
    ];
  }

  const total      = await c.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage   = Math.min(Math.max(1, page), totalPages);

  const posts = await c
    .find(filter, { projection: { _id: 0 } })
    .sort(SORT_MAP[sort] ?? { createdAt: -1 })
    .skip((safePage - 1) * limit)
    .limit(limit)
    .toArray() as unknown as BlogPost[];

  return { posts, total, totalPages, page: safePage };
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const c = await col();
  const post = await c.findOne({ id }, { projection: { _id: 0 } });
  return (post ?? undefined) as BlogPost | undefined;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const c = await col();
  const post = await c.findOne({ slug }, { projection: { _id: 0 } });
  return (post ?? undefined) as BlogPost | undefined;
}

export type CreateInput = Omit<BlogPost, "id" | "slug" | "views" | "seoScore" | "createdAt" | "updatedAt" | "publishedAt">;

export async function createPost(input: CreateInput): Promise<BlogPost> {
  const c = await col();
  const now  = new Date().toISOString();
  const slug = await generateSlug(input.title);

  const post: BlogPost = {
    ...input,
    id:          generateId(),
    slug,
    views:       0,
    seoScore:    calcSeoScore(input),
    createdAt:   now,
    updatedAt:   now,
    publishedAt: input.status === "published" ? now : null,
  };

  await c.insertOne({ ...post });
  return post;
}

export type UpdateInput = Partial<Omit<BlogPost, "id" | "slug" | "views" | "createdAt">>;

export async function updatePost(id: string, input: UpdateInput): Promise<BlogPost | null> {
  const c        = await col();
  const existing = await getPostById(id);
  if (!existing) return null;

  const now  = new Date().toISOString();
  const slug = input.title && input.title !== existing.title
    ? await generateSlug(input.title, id)
    : existing.slug;

  const publishedAt =
    input.status === "published" && !existing.publishedAt ? now : existing.publishedAt;

  const updated: BlogPost = {
    ...existing,
    ...input,
    slug,
    publishedAt,
    updatedAt: now,
    seoScore:  calcSeoScore({ ...existing, ...input }),
  };

  await c.updateOne({ id }, { $set: updated });
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  const c      = await col();
  const result = await c.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function getStats() {
  const c       = await col();
  const results = await c
    .aggregate([
      {
        $group: {
          _id:           "$status",
          count:         { $sum: 1 },
          totalSeoScore: { $sum: "$seoScore" },
          categories:    { $addToSet: "$category" },
        },
      },
    ])
    .toArray();

  let total = 0, published = 0, draft = 0, archived = 0, totalSeoScore = 0;
  const categorySet = new Set<string>();

  for (const r of results) {
    const n = r.count as number;
    total += n;
    if (r._id === "published") published = n;
    if (r._id === "draft")     draft     = n;
    if (r._id === "archived")  archived  = n;
    totalSeoScore += r.totalSeoScore as number;
    (r.categories as string[]).forEach((cat) => categorySet.add(cat));
  }

  const avgSeoScore = total ? Math.round(totalSeoScore / total) : 0;
  return { total, published, draft, archived, avgSeoScore, categories: [...categorySet] };
}
