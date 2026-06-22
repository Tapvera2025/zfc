import { NextRequest, NextResponse } from "next/server";
import {
  createSubscriber,
  listSubscribers,
  deleteSubscriber,
} from "@/lib/newsletter-store";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ success: false, message: "Invalid email address." }, { status: 400 });
    }

    const { subscriber, alreadySubscribed } = await createSubscriber(email);
    return NextResponse.json(
      { success: true, data: subscriber, alreadySubscribed },
      { status: alreadySubscribed ? 200 : 201 }
    );
  } catch (err) {
    console.error("[newsletter] POST error:", err);
    const detail = process.env.NODE_ENV === "development" ? String(err) : "Something went wrong.";
    return NextResponse.json({ success: false, message: detail }, { status: 500 });
  }
}

export async function GET() {
  const subscribers = await listSubscribers();
  return NextResponse.json({ success: true, data: subscribers });
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const ok = await deleteSubscriber(id);
    if (!ok) return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }
}
