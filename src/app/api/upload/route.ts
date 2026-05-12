import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION  = process.env.AWS_REGION;
const BUCKET  = process.env.AWS_S3_BUCKET_NAME;
const CDN     = process.env.AWS_S3_CUSTOM_DOMAIN;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB — stays under Next.js default body limit

function s3Client() {
  return new S3Client({
    region: REGION!,
    credentials: {
      accessKeyId:     process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

export async function POST(req: NextRequest) {
  if (!REGION || !BUCKET || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return NextResponse.json(
      { success: false, message: "S3 is not configured. Set AWS_* environment variables." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid multipart request." }, { status: 400 });
  }

  const file   = formData.get("file")   as File   | null;
  const folder = (formData.get("folder") as string | null) ?? "uploads";

  if (!file) {
    return NextResponse.json({ success: false, message: "No file provided." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { success: false, message: "File type not allowed. Use JPEG, PNG, WebP, GIF, or SVG." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { success: false, message: "File too large. Maximum size is 4 MB." },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3Client().send(
      new PutObjectCommand({
        Bucket:      BUCKET,
        Key:         key,
        Body:        buffer,
        ContentType: file.type,
      }),
    );
  } catch (err) {
    console.error("[upload] S3 error:", err);
    return NextResponse.json({ success: false, message: "Upload to S3 failed." }, { status: 500 });
  }

  const url = CDN
    ? `https://${CDN}/${key}`
    : `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

  return NextResponse.json({ success: true, data: { url, key } }, { status: 201 });
}
