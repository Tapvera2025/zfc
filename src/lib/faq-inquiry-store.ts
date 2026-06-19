import { getDb } from "./mongodb";

export type FaqInquiry = {
  id:          string;
  question:    string;
  submittedAt: string;
  status:      "new" | "read" | "archived";
};

function generateId(): string {
  return "faq-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}

async function col() {
  const db = await getDb();
  return db.collection("faq_inquiries");
}

export async function createInquiry(question: string): Promise<FaqInquiry> {
  const c = await col();
  const entry: FaqInquiry = {
    id:          generateId(),
    question:    question.trim(),
    submittedAt: new Date().toISOString(),
    status:      "new",
  };
  await c.insertOne({ ...entry });
  return entry;
}

export async function listInquiries(): Promise<FaqInquiry[]> {
  const c = await col();
  return c
    .find({}, { projection: { _id: 0 } })
    .sort({ submittedAt: -1 })
    .toArray() as unknown as Promise<FaqInquiry[]>;
}

export async function updateInquiryStatus(
  id: string,
  status: FaqInquiry["status"]
): Promise<FaqInquiry | null> {
  const c = await col();
  const result = await c.findOneAndUpdate(
    { id },
    { $set: { status } },
    { returnDocument: "after", projection: { _id: 0 } }
  );
  return (result ?? null) as FaqInquiry | null;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const c = await col();
  const result = await c.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function countByStatus() {
  const c = await col();
  const results = await c
    .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
    .toArray();

  const counts = { total: 0, new: 0, read: 0, archived: 0 };
  for (const r of results) {
    const n = r.count as number;
    counts.total += n;
    if (r._id === "new")      counts.new      = n;
    if (r._id === "read")     counts.read     = n;
    if (r._id === "archived") counts.archived = n;
  }
  return counts;
}
