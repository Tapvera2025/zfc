"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "@/components/admin/icons";

type Inquiry = {
  id: string;
  question: string;
  submittedAt: string;
  status: "new" | "read" | "archived";
};

const STATUS_LABELS: Record<Inquiry["status"], string> = {
  new: "New",
  read: "Read",
  archived: "Archived",
};

const STATUS_COLORS: Record<Inquiry["status"], string> = {
  new: "bg-red-100 text-red-700",
  read: "bg-zinc-100 text-zinc-600",
  archived: "bg-yellow-100 text-yellow-700",
};

export default function FaqInquiryPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Inquiry["status"] | "all">("all");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/faq-inquiry");
    const json = await res.json();
    if (json.success) setInquiries(json.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: Inquiry["status"]) {
    await fetch("/api/faq-inquiry", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await fetch("/api/faq-inquiry", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  }

  const filtered =
    filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    read: inquiries.filter((i) => i.status === "read").length,
    archived: inquiries.filter((i) => i.status === "archived").length,
  };

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">FAQ Inquiries</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Questions submitted from the homepage &quot;Any Question?&quot; widget.
        </p>
      </div>

      {/* Stat chips */}
      <div className="mb-6 flex flex-wrap gap-3">
        {(["all", "new", "read", "archived"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === s
                ? "bg-red-600 text-white"
                : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {s === "all" ? "All" : STATUS_LABELS[s]}
            <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
              {counts[s]}
            </span>
          </button>
        ))}
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
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-3xl">💬</p>
            <p className="mt-3 text-sm font-medium text-zinc-500">No inquiries yet</p>
            <p className="text-xs text-zinc-400">
              Questions from the homepage will appear here.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <th className="px-5 py-3 w-full">Question</th>
                <th className="px-5 py-3 whitespace-nowrap">Submitted</th>
                <th className="px-5 py-3 whitespace-nowrap">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((inq) => (
                <tr key={inq.id} className="group hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-4 text-zinc-800 font-medium max-w-xl">
                    {inq.question}
                  </td>
                  <td className="px-5 py-4 text-zinc-400 whitespace-nowrap text-xs">
                    {new Date(inq.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        setStatus(inq.id, e.target.value as Inquiry["status"])
                      }
                      className={`rounded-full px-3 py-1 text-xs font-semibold border-0 cursor-pointer ${
                        STATUS_COLORS[inq.status]
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => remove(inq.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                      title="Delete"
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
