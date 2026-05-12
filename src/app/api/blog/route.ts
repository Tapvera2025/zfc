import { NextRequest, NextResponse } from "next/server";
import { listPosts, createPost } from "@/lib/blog-store";
import type { BlogStatus } from "@/types/admin";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const status   = (searchParams.get("status")   ?? "all") as BlogStatus | "all";
  const search   = searchParams.get("search")   ?? "";
  const category = searchParams.get("category") ?? "";
  const sort     = (searchParams.get("sort") ?? "newest") as "newest" | "oldest" | "updated" | "views";
  const page     = Math.max(1, parseInt(searchParams.get("page")  ?? "1",  10));
  const limit    = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));

  const result = listPosts({ status, search, category, page, limit, sort });

  return NextResponse.json({ success: true, data: result });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, author, excerpt, content, featuredImage, featuredImageAlt,
            category, tags, status, seo } = body;

    if (!title?.trim())   return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    if (!author?.trim())  return NextResponse.json({ success: false, message: "Author is required" }, { status: 400 });
    if (!excerpt?.trim()) return NextResponse.json({ success: false, message: "Excerpt is required" }, { status: 400 });
    if (!content?.trim()) return NextResponse.json({ success: false, message: "Content is required" }, { status: 400 });

    const post = createPost({
      title:            title.trim(),
      author:           author.trim(),
      excerpt:          excerpt.trim(),
      content,
      featuredImage:    featuredImage ?? null,
      featuredImageAlt: featuredImageAlt ?? "",
      category:         category?.trim() || "General",
      tags:             Array.isArray(tags) ? tags : [],
      status:           status ?? "draft",
      seo: {
        metaTitle:       seo?.metaTitle       ?? "",
        metaDescription: seo?.metaDescription ?? "",
        canonicalUrl:    seo?.canonicalUrl    ?? "",
        keywords:        Array.isArray(seo?.keywords) ? seo.keywords : [],
        ogTitle:         seo?.ogTitle         ?? "",
        ogDescription:   seo?.ogDescription   ?? "",
        ogImage:         seo?.ogImage         ?? null,
        noindex:         seo?.noindex         ?? false,
        nofollow:        seo?.nofollow        ?? false,
      },
    });

    return NextResponse.json({ success: true, data: { post } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }
}
