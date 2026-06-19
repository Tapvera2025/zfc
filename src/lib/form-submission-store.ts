import { getDb } from "./mongodb";

export type SubmissionStatus = "new" | "read" | "archived";

export type FormSubmission = {
  id:          string;
  formType:    string;
  data:        Record<string, unknown>;
  submittedAt: string;
  status:      SubmissionStatus;
};

function generateId(): string {
  return "sub-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}

async function col() {
  const db = await getDb();
  return db.collection("form_submissions");
}

export async function createSubmission(
  formType: string,
  data: Record<string, unknown>
): Promise<FormSubmission> {
  const c = await col();
  const entry: FormSubmission = {
    id:          generateId(),
    formType,
    data,
    submittedAt: new Date().toISOString(),
    status:      "new",
  };
  await c.insertOne({ ...entry });
  return entry;
}

export async function listSubmissions(formType?: string): Promise<FormSubmission[]> {
  const c = await col();
  const filter = formType ? { formType } : {};
  return c
    .find(filter, { projection: { _id: 0 } })
    .sort({ submittedAt: -1 })
    .toArray() as unknown as Promise<FormSubmission[]>;
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus
): Promise<FormSubmission | null> {
  const c = await col();
  const result = await c.findOneAndUpdate(
    { id },
    { $set: { status } },
    { returnDocument: "after", projection: { _id: 0 } }
  );
  return (result ?? null) as FormSubmission | null;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const c = await col();
  const result = await c.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function getFormTypes(): Promise<string[]> {
  const c = await col();
  return c.distinct("formType") as Promise<string[]>;
}

export async function checkExistingAssessment(email: string, phone: string): Promise<boolean> {
  const c = await col();
  const normalEmail = email.toLowerCase().trim();
  const normalPhone = phone.replace(/\D/g, "");

  const submissions = await c
    .find({ formType: "free-assessment" }, { projection: { _id: 0 } })
    .toArray() as unknown as FormSubmission[];

  return submissions.some((s) => {
    const d = s.data as Record<string, unknown>;
    const e = String(d.email ?? "").toLowerCase().trim();
    const p = String(d.phone ?? "").replace(/\D/g, "");
    return (normalEmail && e === normalEmail) || (normalPhone && p === normalPhone);
  });
}

export async function countByStatus(formType?: string) {
  const c = await col();
  const matchStage = formType ? { $match: { formType } } : { $match: {} };
  const results = await c
    .aggregate([matchStage, { $group: { _id: "$status", count: { $sum: 1 } } }])
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
