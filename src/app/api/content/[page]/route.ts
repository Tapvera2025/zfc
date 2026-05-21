import { NextRequest, NextResponse } from "next/server";
import { getPageContent, setPageContent, listPages } from "@/lib/page-content-store";

type Params = { params: Promise<{ page: string }> };

const VALID_SLUGS = new Set(listPages().map((p) => p.slug));

/** GET /api/content/[page] — returns current page content */
export async function GET(_req: NextRequest, { params }: Params) {
  const { page } = await params;
  const content = getPageContent(page);
  return NextResponse.json({ success: true, data: content });
}

/** PUT /api/content/[page] — saves updated page content */
export async function PUT(req: NextRequest, { params }: Params) {
  const { page } = await params;

  if (!VALID_SLUGS.has(page)) {
    return NextResponse.json({ success: false, message: "Unknown page slug" }, { status: 400 });
  }

  try {
    const body = await req.json();
    setPageContent(page, body);
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }
}
