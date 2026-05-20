/**
 * Generic form submission store — file-backed persistence.
 * Submissions are saved to  data/form-submissions.json  so they survive
 * server restarts.  Any form on the site can save data here by passing
 * a unique `formType` string.
 */

import fs   from "fs";
import path from "path";

export type SubmissionStatus = "new" | "read" | "archived";

export type FormSubmission = {
  id:          string;
  formType:    string;                  // e.g. "contact", "consultation"
  data:        Record<string, unknown>; // all field values
  submittedAt: string;                  // ISO timestamp
  status:      SubmissionStatus;
};

// ── Persistence helpers ────────────────────────────────────────────────────

const DATA_DIR  = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "form-submissions.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function load(): FormSubmission[] {
  try {
    ensureDir();
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw) as FormSubmission[];
  } catch {
    return [];
  }
}

function save(submissions: FormSubmission[]) {
  try {
    ensureDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf8");
  } catch (err) {
    console.error("[form-submission-store] Failed to write:", err);
  }
}

// In-memory cache — stays warm between requests in the same process
let cache: FormSubmission[] | null = null;

function getAll(): FormSubmission[] {
  if (cache === null) cache = load();
  return cache;
}

function persist() {
  save(getAll());
}

// ── ID helper ──────────────────────────────────────────────────────────────

function generateId(): string {
  return "sub-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}

// ── Public API ─────────────────────────────────────────────────────────────

export function createSubmission(
  formType: string,
  data: Record<string, unknown>
): FormSubmission {
  const entry: FormSubmission = {
    id:          generateId(),
    formType,
    data,
    submittedAt: new Date().toISOString(),
    status:      "new",
  };
  getAll().unshift(entry); // newest first
  persist();
  return entry;
}

export function listSubmissions(formType?: string): FormSubmission[] {
  const all = getAll();
  if (formType) return all.filter((s) => s.formType === formType);
  return [...all];
}

export function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus
): FormSubmission | null {
  const submissions = getAll();
  const idx = submissions.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  submissions[idx] = { ...submissions[idx], status };
  persist();
  return submissions[idx];
}

export function deleteSubmission(id: string): boolean {
  const before = getAll().length;
  cache = getAll().filter((s) => s.id !== id);
  persist();
  return cache.length < before;
}

export function getFormTypes(): string[] {
  return [...new Set(getAll().map((s) => s.formType))];
}

export function countByStatus(formType?: string) {
  const list = formType ? getAll().filter((s) => s.formType === formType) : getAll();
  return {
    total:    list.length,
    new:      list.filter((s) => s.status === "new").length,
    read:     list.filter((s) => s.status === "read").length,
    archived: list.filter((s) => s.status === "archived").length,
  };
}
