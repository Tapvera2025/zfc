import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPageContent, setPageContent, listPages } from "@/lib/page-content-store";

type Params = { params: Promise<{ page: string }> };

const VALID_SLUGS = new Set(listPages().map((p) => p.slug));

const SLUG_TO_PATH: Record<string, string> = {
  "home":                          "/",
  "about":                         "/about",
  "services":                      "/services",
  "our-client":                    "/our-client",
  "toronto":                       "/toronto",
  "free-assessment":               "/free-assessment",
  "svc-permanent-residency":       "/services/permanent-residency",
  "svc-sponsorship":               "/services/sponsorship",
  "svc-temporary-residence":       "/services/temporary-residence",
  "svc-refugee-claim":             "/services/refugee-claim",
  "svc-irb-hearings":              "/services/irb-hearings",
  "svc-refused-applications":      "/services/refused-applications",
  "svc-humanitarian-compassionate":"/services/humanitarian-compassionate",
  "svc-inadmissibility":           "/services/inadmissibility",
  "svc-misrepresentation":         "/services/misrepresentation",
  "svc-pr-card-citizenship":       "/services/pr-card-citizenship",
};

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

    const pagePath = SLUG_TO_PATH[page];
    if (pagePath) revalidatePath(pagePath);

    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }
}
