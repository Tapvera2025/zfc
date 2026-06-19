import { NextRequest, NextResponse } from "next/server";
import {
  createSubmission,
  listSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  getFormTypes,
  countByStatus,
  type SubmissionStatus,
} from "@/lib/form-submission-store";
import { sendFormEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, data } = body;

    if (!formType?.trim()) {
      return NextResponse.json({ success: false, message: "formType is required" }, { status: 400 });
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ success: false, message: "data must be an object" }, { status: 400 });
    }

    const submission = await createSubmission(formType.trim(), data);

    sendFormEmail(formType.trim(), data as Record<string, unknown>).catch((err) =>
      console.error("[mailer] failed to send notification:", err)
    );

    return NextResponse.json({ success: true, data: submission }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const formType    = req.nextUrl.searchParams.get("formType") ?? undefined;
  const submissions = await listSubmissions(formType);
  const types       = await getFormTypes();
  const counts      = await countByStatus(formType);
  return NextResponse.json({ success: true, data: { submissions, types, counts } });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !["new", "read", "archived"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }
    const updated = await updateSubmissionStatus(id, status as SubmissionStatus);
    if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const ok     = await deleteSubmission(id);
    if (!ok) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
