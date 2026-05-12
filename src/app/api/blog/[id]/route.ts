import { NextRequest, NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/blog-store";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) {
    return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: { post } });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;

  if (!getPostById(id)) {
    return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
  }

  try {
    const body = await req.json();

    // Normalise keywords if sent as comma-separated string
    if (body.seo?.keywords && typeof body.seo.keywords === "string") {
      body.seo.keywords = body.seo.keywords
        .split(",")
        .map((k: string) => k.trim())
        .filter(Boolean);
    }

    const updated = updatePost(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: { post: updated } });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const deleted = deletePost(id);
  if (!deleted) {
    return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Post deleted" });
}
