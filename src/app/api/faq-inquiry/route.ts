import { NextRequest, NextResponse } from "next/server";
import {
  createInquiry,
  listInquiries,
  updateInquiryStatus,
  deleteInquiry,
  type FaqInquiry,
} from "@/lib/faq-inquiry-store";

// POST /api/faq-inquiry — submit a question from the homepage
export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question?.trim()) {
      return NextResponse.json(
        { success: false, message: "Question is required" },
        { status: 400 }
      );
    }
    const inquiry = createInquiry(question);
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}

// GET /api/faq-inquiry — list all inquiries (admin)
export async function GET() {
  return NextResponse.json({ success: true, data: listInquiries() });
}

// PATCH /api/faq-inquiry — update status
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !["new", "read", "archived"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }
    const updated = updateInquiryStatus(id, status as FaqInquiry["status"]);
    if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

// DELETE /api/faq-inquiry — delete an inquiry
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const ok = deleteInquiry(id);
    if (!ok) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
