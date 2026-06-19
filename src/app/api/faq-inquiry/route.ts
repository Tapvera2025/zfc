import { NextRequest, NextResponse } from "next/server";
import {
  createInquiry,
  listInquiries,
  updateInquiryStatus,
  deleteInquiry,
  type FaqInquiry,
} from "@/lib/faq-inquiry-store";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question?.trim()) {
      return NextResponse.json({ success: false, message: "Question is required" }, { status: 400 });
    }
    const inquiry = await createInquiry(question);
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  const data = await listInquiries();
  return NextResponse.json({ success: true, data });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !["new", "read", "archived"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }
    const updated = await updateInquiryStatus(id, status as FaqInquiry["status"]);
    if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const ok     = await deleteInquiry(id);
    if (!ok) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
