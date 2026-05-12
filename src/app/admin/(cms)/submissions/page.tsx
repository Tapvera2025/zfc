"use client";

import { useEffect, useState, useCallback } from "react";
import { TrashIcon } from "@/components/admin/icons";

type SubmissionStatus = "new" | "read" | "archived";

type Submission = {
  id: string;
  formType: string;
  data: Record<string, unknown>;
  submittedAt: string;
  status: SubmissionStatus;
};

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  new:      "bg-red-100 text-red-700",
  read:     "bg-zinc-100 text-zinc-600",
  archived: "bg-yellow-100 text-yellow-700",
};

const FORM_TYPE_LABELS: Record<string, string> = {
  contact:      "Get in Touch",
  consultation: "Consultation",
  quote:        "Quote Request",
};

function label(type: string) {
  return FORM_TYPE_LABELS[type] ?? type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [formType, setFormType] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const url = formType !== "all" ? `/api/form-submission?formType=${formType}` : "/api/form-submission";
    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      setSubmissions(json.data.submissions);
      setTypes(json.data.types);
    }
    setLoading(false);
  }, [formType]);

  useEffect(() => { load(); }, [load]);

  async function setStatus(id: string, status: SubmissionStatus) {
    await fetch("/api/form-submission", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  }

  async function remove(id: string) {
    if (!confirm("Delete this submission?")) return;
    await fetch("/api/form-submission", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }

  const filtered = submissions.filter((s) =>
    statusFilter === "all" ? true : s.status === statusFilter
  );

  const counts = {
    all:      submissions.length,
    new:      submissions.filter((s) => s.status === "new").length,
    read:     submissions.filter((s) => s.status === "read").length,
    archived: submissions.filter((s) => s.status === "archived").length,
  };

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Form Submissions</h1>
        <p className="mt-1 text-sm text-zinc-500">
          All submissions from forms across the website.
        </p>
      </div>

      {/* Form type tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["all", ...types].map((t) => (
          <button
            key={t}
            onClick={() => { setFormType(t); setExpanded(null); }}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors border ${
              formType === t
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            {t === "all" ? "All Forms" : label(t)}
          </button>
        ))}
        <button
          onClick={load}
          className="ml-auto rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Status filter chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "new", "read", "archived"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-4 py-1 text-xs font-semibold transition-colors ${
              statusFilter === s
                ? "bg-red-600 text-white"
                : "bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-50"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="ml-1 opacity-75">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-zinc-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-3xl">📋</p>
            <p className="mt-3 text-sm font-medium text-zinc-500">No submissions yet</p>
            <p className="text-xs text-zinc-400">Form submissions will appear here.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <th className="px-5 py-3">Form</th>
                <th className="px-5 py-3">Name / Details</th>
                <th className="px-5 py-3 whitespace-nowrap">Submitted</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((sub) => (
                <>
                  <tr
                    key={sub.id}
                    className="group hover:bg-zinc-50 transition-colors cursor-pointer"
                    onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                  >
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-semibold">
                        {label(sub.formType)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-800 font-medium">
                      {String(sub.data.name ?? sub.data.contactName ?? sub.data.email ?? "—")}
                    </td>
                    <td className="px-5 py-4 text-zinc-400 whitespace-nowrap text-xs">
                      {new Date(sub.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={sub.status}
                        onChange={(e) => { e.stopPropagation(); setStatus(sub.id, e.target.value as SubmissionStatus); }}
                        onClick={(e) => e.stopPropagation()}
                        className={`rounded-full px-3 py-1 text-xs font-semibold border-0 cursor-pointer ${STATUS_COLORS[sub.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); remove(sub.id); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </td>
                  </tr>
                  {/* Expanded row — shows all field data */}
                  {expanded === sub.id && (
                    <tr key={sub.id + "-expanded"} className="bg-zinc-50">
                      <td colSpan={5} className="px-5 py-4">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-3">
                          {Object.entries(sub.data).map(([key, val]) => (
                            <div key={key}>
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </p>
                              <p className="mt-0.5 text-sm text-zinc-700 break-words">
                                {String(val ?? "—")}
                              </p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
