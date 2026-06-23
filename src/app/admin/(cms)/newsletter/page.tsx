"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "@/components/admin/icons";

type Subscriber = {
  id: string;
  email: string;
  subscribedAt: string;
};

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", { cache: "no-store" });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success || !Array.isArray(json.data)) {
        throw new Error(json?.message || "Unable to load newsletter subscribers.");
      }

      setSubscribers(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load newsletter subscribers.");
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Remove this subscriber?")) return;
    const res = await fetch("/api/newsletter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      alert("Could not remove this subscriber. Please refresh and try again.");
      return;
    }
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Newsletter Subscribers</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Emails collected from the footer subscription form.
        </p>
      </div>

      {/* Count + refresh */}
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white">
          {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={load}
          className="ml-auto rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-zinc-400">
            Loading…
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              onClick={load}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              Try again
            </button>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-3xl">📬</p>
            <p className="mt-3 text-sm font-medium text-zinc-500">No subscribers yet</p>
            <p className="text-xs text-zinc-400">
              Emails from the footer newsletter form will appear here.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <th className="px-5 py-3 w-full">Email</th>
                <th className="px-5 py-3 whitespace-nowrap">Subscribed</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="group hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-zinc-800">
                    <a
                      href={`mailto:${sub.email}`}
                      className="hover:text-red-600 transition-colors"
                    >
                      {sub.email}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-xs text-zinc-400 whitespace-nowrap">
                    {new Date(sub.subscribedAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => remove(sub.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                      title="Remove subscriber"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
