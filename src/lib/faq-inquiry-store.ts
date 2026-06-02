import fs   from "fs";
import path from "path";

export type FaqInquiry = {
  id: string;
  question: string;
  submittedAt: string;
  status: "new" | "read" | "archived";
};

const DATA_DIR  = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "faq-inquiries.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function load(): FaqInquiry[] {
  try {
    ensureDir();
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) as FaqInquiry[];
  } catch {
    return [];
  }
}

function save(inquiries: FaqInquiry[]) {
  try {
    ensureDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2), "utf8");
  } catch (err) {
    console.error("[faq-inquiry-store] Failed to write:", err);
  }
}

let cache: FaqInquiry[] | null = null;

function getAll(): FaqInquiry[] {
  if (cache === null) cache = load();
  return cache;
}

function persist() {
  save(getAll());
}

function generateId(): string {
  return "faq-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}

export function createInquiry(question: string): FaqInquiry {
  const entry: FaqInquiry = {
    id: generateId(),
    question: question.trim(),
    submittedAt: new Date().toISOString(),
    status: "new",
  };
  getAll().unshift(entry);
  persist();
  return entry;
}

export function listInquiries(): FaqInquiry[] {
  return [...getAll()];
}

export function updateInquiryStatus(
  id: string,
  status: FaqInquiry["status"]
): FaqInquiry | null {
  const inquiries = getAll();
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  inquiries[idx] = { ...inquiries[idx], status };
  persist();
  return inquiries[idx];
}

export function deleteInquiry(id: string): boolean {
  const before = getAll().length;
  cache = getAll().filter((i) => i.id !== id);
  persist();
  return cache.length < before;
}

export function countByStatus() {
  const list = getAll();
  return {
    total:    list.length,
    new:      list.filter((i) => i.status === "new").length,
    read:     list.filter((i) => i.status === "read").length,
    archived: list.filter((i) => i.status === "archived").length,
  };
}
