import { NextRequest, NextResponse } from "next/server";
import { checkExistingAssessment } from "@/lib/form-submission-store";

export async function POST(req: NextRequest) {
  try {
    const { email, phone } = await req.json();
    if (!email?.trim() && !phone?.trim()) {
      return NextResponse.json({ success: false, message: "Email or phone is required" }, { status: 400 });
    }
    const isReturning = await checkExistingAssessment(email ?? "", phone ?? "");
    return NextResponse.json({ success: true, isNew: !isReturning });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
