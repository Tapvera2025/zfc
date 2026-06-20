// Edge Runtime compatible — uses Web Crypto (crypto.subtle) instead of Node.js crypto

export const COOKIE_NAME = "zfc_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "zfc-cms-secret-change-in-production";
}

function base64urlToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  // Uint8Array.from() always allocates a fresh ArrayBuffer (never SharedArrayBuffer),
  // but TS 5.7+ infers Uint8Array<ArrayBufferLike> from the overload — cast to narrow it.
  return Uint8Array.from(binary, (c) => c.charCodeAt(0)) as Uint8Array<ArrayBuffer>;
}

async function importKey(): Promise<CryptoKey> {
  const keyBytes = new TextEncoder().encode(getSecret()) as Uint8Array<ArrayBuffer>;
  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const encoded = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  try {
    const key = await importKey();
    const sigBytes = base64urlToBytes(sig);
    const dataBytes = new TextEncoder().encode(encoded);

    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, dataBytes);
    if (!valid) return false;

    const payload = JSON.parse(atob(encoded.replace(/-/g, "+").replace(/_/g, "/")));
    return Date.now() - (payload.ts as number) < MAX_AGE * 1000;
  } catch {
    return false;
  }
}
