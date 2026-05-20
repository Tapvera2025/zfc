import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SESSION_SECRET || "zfc-cms-secret-change-in-production";
const COOKIE_NAME = "zfc_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

/* ------------------------------------------------------------------
   Token: base64(payload) . hmac(base64(payload))
------------------------------------------------------------------ */
function sign(payload: string): string {
  const encoded = Buffer.from(payload).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

function verify(token: string): string | null {
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;
  const expected = createHmac("sha256", SECRET).update(encoded).digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  return Buffer.from(encoded, "base64url").toString("utf8");
}

/* ------------------------------------------------------------------
   Public API
------------------------------------------------------------------ */
export function createSessionToken(): string {
  const payload = JSON.stringify({ role: "admin", ts: Date.now() });
  return sign(payload);
}

export function verifySessionToken(token: string): boolean {
  const payload = verify(token);
  if (!payload) return false;
  try {
    const { ts } = JSON.parse(payload) as { ts: number };
    return Date.now() - ts < MAX_AGE * 1000;
  } catch {
    return false;
  }
}

export function checkAdminPassword(submitted: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  try {
    const a = Buffer.from(submitted.padEnd(64));
    const b = Buffer.from(adminPassword.padEnd(64));
    return timingSafeEqual(a.subarray(0, 64), b.subarray(0, 64)) && submitted === adminPassword;
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { COOKIE_NAME, MAX_AGE };
