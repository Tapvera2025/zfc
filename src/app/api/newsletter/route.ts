import { NextRequest, NextResponse } from "next/server";
import {
  createSubscriber,
  listSubscribers,
  deleteSubscriber,
} from "@/lib/newsletter-store";

function newsletterJson(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const normalizedEmail = typeof email === "string" ? email.trim() : "";

    if (!normalizedEmail) {
      return newsletterJson({ success: false, message: "Email is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return newsletterJson({ success: false, message: "Invalid email address." }, { status: 400 });
    }

    const { subscriber, alreadySubscribed } = await createSubscriber(normalizedEmail);
    return newsletterJson(
      { success: true, data: subscriber, alreadySubscribed },
      { status: alreadySubscribed ? 200 : 201 }
    );
  } catch (err) {
    console.error("[newsletter] POST error:", err);
    const detail = process.env.NODE_ENV === "development" ? String(err) : "Something went wrong.";
    return newsletterJson({ success: false, message: detail }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await listSubscribers();
    return newsletterJson({ success: true, data: subscribers });
  } catch (err) {
    console.error("[newsletter] GET error:", err);
    const detail = process.env.NODE_ENV === "development" ? String(err) : "Unable to load newsletter subscribers.";
    return newsletterJson({ success: false, message: detail, data: [] }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const ok = await deleteSubscriber(id);
    if (!ok) return newsletterJson({ success: false, message: "Not found." }, { status: 404 });
    return newsletterJson({ success: true });
  } catch {
    return newsletterJson({ success: false, message: "Invalid request." }, { status: 400 });
  }
}
