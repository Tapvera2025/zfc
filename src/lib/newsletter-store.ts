import { getDb } from "./mongodb";

export type NewsletterSubscriber = {
  id: string;
  email: string;
  subscribedAt: string;
};

function generateId(): string {
  return "nl-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}

async function col() {
  const db = await getDb();
  return db.collection("newsletter_subscribers");
}

export async function createSubscriber(
  email: string
): Promise<{ subscriber: NewsletterSubscriber; alreadySubscribed: boolean }> {
  const c = await col();
  const normalized = email.toLowerCase().trim();

  const existing = await c.findOne({ email: normalized }, { projection: { _id: 0 } });
  if (existing) {
    return { subscriber: existing as unknown as NewsletterSubscriber, alreadySubscribed: true };
  }

  const entry: NewsletterSubscriber = {
    id: generateId(),
    email: normalized,
    subscribedAt: new Date().toISOString(),
  };
  await c.insertOne({ ...entry });
  return { subscriber: entry, alreadySubscribed: false };
}

export async function listSubscribers(): Promise<NewsletterSubscriber[]> {
  const c = await col();
  return c
    .find({}, { projection: { _id: 0 } })
    .sort({ subscribedAt: -1 })
    .toArray() as unknown as Promise<NewsletterSubscriber[]>;
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const c = await col();
  const result = await c.deleteOne({ id });
  return result.deletedCount > 0;
}
