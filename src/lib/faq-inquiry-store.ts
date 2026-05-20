export type FaqInquiry = {
  id: string;
  question: string;
  submittedAt: string; // ISO string
  status: "new" | "read" | "archived";
};

let inquiries: FaqInquiry[] = [];

function generateId(): string {
  return "faq-" + Math.random().toString(36).slice(2, 10);
}

export function createInquiry(question: string): FaqInquiry {
  const entry: FaqInquiry = {
    id: generateId(),
    question: question.trim(),
    submittedAt: new Date().toISOString(),
    status: "new",
  };
  inquiries.unshift(entry); // newest first
  return entry;
}

export function listInquiries(): FaqInquiry[] {
  return [...inquiries];
}

export function updateInquiryStatus(
  id: string,
  status: FaqInquiry["status"]
): FaqInquiry | null {
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  inquiries[idx] = { ...inquiries[idx], status };
  return inquiries[idx];
}

export function deleteInquiry(id: string): boolean {
  const before = inquiries.length;
  inquiries = inquiries.filter((i) => i.id !== id);
  return inquiries.length < before;
}

export function countByStatus() {
  return {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    read: inquiries.filter((i) => i.status === "read").length,
    archived: inquiries.filter((i) => i.status === "archived").length,
  };
}
