import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blog-store";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.status !== "published") {
    return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: { post } });
}
