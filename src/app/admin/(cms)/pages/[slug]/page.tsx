"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SaveIcon, ExternalLinkIcon, RefreshIcon, CheckIcon } from "@/components/admin/icons";

/* ── Page metadata ─────────────────────────────────────────── */
const PAGE_META: Record<string, { label: string; href: string }> = {
  home:             { label: "Home Page",                    href: "/" },
  about:            { label: "About Us",                     href: "/about" },
  services:         { label: "Services",                     href: "/services" },
  "our-client":     { label: "Our Client",                   href: "/our-client" },
  toronto:          { label: "Toronto Immigration Page",     href: "/toronto" },
  "free-assessment":{ label: "Free Assessment",              href: "/free-assessment" },
  "svc-permanent-residency":        { label: "Service: Permanent Residency",         href: "/services/permanent-residency" },
  "svc-sponsorship":                { label: "Service: Sponsorship",                 href: "/services/sponsorship" },
  "svc-temporary-residence":        { label: "Service: Temporary Residence",         href: "/services/temporary-residence" },
  "svc-refugee-claim":              { label: "Service: Refugee Claim",               href: "/services/refugee-claim" },
  "svc-irb-hearings":               { label: "Service: IRB Hearings & Appeals",      href: "/services/irb-hearings" },
  "svc-refused-applications":       { label: "Service: Refused Applications",        href: "/services/refused-applications" },
  "svc-humanitarian-compassionate": { label: "Service: Humanitarian & Compassionate",href: "/services/humanitarian-compassionate" },
  "svc-inadmissibility":            { label: "Service: Inadmissibility",             href: "/services/inadmissibility" },
  "svc-misrepresentation":          { label: "Service: Misrepresentation",           href: "/services/misrepresentation" },
  "svc-pr-card-citizenship":        { label: "Service: PR Card / Citizenship",       href: "/services/pr-card-citizenship" },
};

/* ── Field schemas per page ────────────────────────────────── */
type FieldDef =
  | { type: "text";      path: string; label: string; hint?: string }
  | { type: "textarea";  path: string; label: string; hint?: string; rows?: number }
  | { type: "array";     path: string; label: string; hint?: string; fieldLabel?: string }
  | { type: "section";   label: string }
  | { type: "stats";     path: string; label: string };

const PAGE_FIELDS: Record<string, FieldDef[]> = {
  home: [
    { type: "section",  label: "Hero" },
    { type: "textarea", path: "hero.title",    label: "Hero Title",    rows: 2, hint: "Use \\n for line breaks." },
    { type: "textarea", path: "hero.subtitle", label: "Hero Subtitle", rows: 3 },
    { type: "text",     path: "hero.ctaText",  label: "CTA Button Text" },
    { type: "text",     path: "hero.ctaHref",  label: "CTA Button Link" },
    { type: "section",  label: "About Section" },
    { type: "text",     path: "about.heading",   label: "Heading" },
    { type: "textarea", path: "about.body",      label: "Body Text", rows: 4 },
    { type: "text",     path: "about.highlight", label: "Highlight Text" },
    { type: "section",  label: "Stats" },
    { type: "stats",    path: "stats",           label: "Stats (label + value pairs)" },
    { type: "section",  label: "Why Choose Us" },
    { type: "text",     path: "whyUs.heading", label: "Section Heading" },
    { type: "array",    path: "whyUs.points",  label: "Bullet Points", fieldLabel: "Point" },
  ],
  about: [
    { type: "section",  label: "Hero" },
    { type: "text",     path: "hero.title",      label: "Hero Title" },
    { type: "section",  label: "Intro" },
    { type: "text",     path: "intro.heading",   label: "Heading" },
    { type: "textarea", path: "intro.body",      label: "Body Text", rows: 5 },
    { type: "section",  label: "Mission" },
    { type: "text",     path: "mission.heading", label: "Heading" },
    { type: "textarea", path: "mission.body",    label: "Body Text", rows: 4 },
    { type: "section",  label: "Vision" },
    { type: "text",     path: "vision.heading",  label: "Heading" },
    { type: "textarea", path: "vision.body",     label: "Body Text", rows: 4 },
  ],
  services: [
    { type: "section",  label: "Hero" },
    { type: "text",     path: "hero.title",      label: "Hero Title" },
    { type: "section",  label: "Intro" },
    { type: "text",     path: "intro.heading",   label: "Section Heading" },
    { type: "textarea", path: "intro.body",      label: "Intro Body", rows: 4 },
  ],
  "our-client": [
    { type: "section",  label: "Hero" },
    { type: "text",     path: "hero.title",      label: "Hero Title" },
    { type: "section",  label: "Intro Section" },
    { type: "text",     path: "intro.heading",   label: "Heading" },
    { type: "array",    path: "intro.paragraphs", label: "Body Paragraphs", fieldLabel: "Paragraph" },
  ],
  toronto: [
    { type: "section",  label: "Hero" },
    { type: "text",     path: "hero.title",      label: "Hero Title" },
    { type: "section",  label: "Main Content" },
    { type: "text",     path: "content.title",   label: "Page Title (red heading)" },
    { type: "array",    path: "content.paragraphs", label: "Body Paragraphs", fieldLabel: "Paragraph" },
    { type: "section",  label: "Contact Info" },
    { type: "text",     path: "contact.phone",   label: "Phone Number" },
    { type: "text",     path: "contact.email",   label: "Email Address" },
    { type: "textarea", path: "contact.address", label: "Address (use \\n for line break)", rows: 2 },
  ],
  "free-assessment": [
    { type: "section",  label: "Hero" },
    { type: "text",     path: "hero.title",        label: "Hero Title" },
    { type: "section",  label: "Form Intro" },
    { type: "text",     path: "intro.heading",     label: "Heading" },
    { type: "textarea", path: "intro.body",        label: "Intro Body", rows: 3 },
    { type: "section",  label: "Form" },
    { type: "text",     path: "submitButtonText",  label: "Submit Button Text" },
  ],
};

const SVC_FIELDS: FieldDef[] = [
  { type: "section", label: "Hero" },
  { type: "text",    path: "hero.title",          label: "Hero Title" },
  { type: "section", label: "Main Content" },
  { type: "text",    path: "detail.heading",      label: "Section Heading" },
  { type: "array",   path: "detail.paragraphs",   label: "Body Paragraphs", hint: "First paragraph appears above the image; remaining paragraphs appear below.", fieldLabel: "Paragraph" },
  { type: "section", label: "Extra Section (right column)" },
  { type: "array",   path: "extra.paragraphs",    label: "Extra Paragraphs", fieldLabel: "Paragraph" },
];

[
  "svc-permanent-residency",
  "svc-sponsorship",
  "svc-temporary-residence",
  "svc-refugee-claim",
  "svc-irb-hearings",
  "svc-refused-applications",
  "svc-humanitarian-compassionate",
  "svc-inadmissibility",
  "svc-misrepresentation",
  "svc-pr-card-citizenship",
].forEach((slug) => { PAGE_FIELDS[slug] = SVC_FIELDS; });

/* ── Deep get / set by dot-path ──────────────────────────────── */
function deepGet(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

function deepSet(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split(".");
  const result = structuredClone(obj);
  let cur: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!cur[k] || typeof cur[k] !== "object") cur[k] = {};
    cur = cur[k] as Record<string, unknown>;
  }
  cur[keys[keys.length - 1]] = value;
  return result;
}

/* ── Stat row editor ─────────────────────────────────────────── */
function StatsEditor({
  value,
  onChange,
}: {
  value: { label: string; value: string }[];
  onChange: (v: { label: string; value: string }[]) => void;
}) {
  const rows = Array.isArray(value) ? value : [];
  function update(i: number, field: "label" | "value", v: string) {
    const next = rows.map((r, idx) => idx === i ? { ...r, [field]: v } : r);
    onChange(next);
  }
  function add() { onChange([...rows, { label: "", value: "" }]); }
  function remove(i: number) { onChange(rows.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
            placeholder="Label (e.g. Years of Experience)"
            value={row.label}
            onChange={(e) => update(i, "label", e.target.value)}
          />
          <input
            className="w-28 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
            placeholder="Value (e.g. 15+)"
            value={row.value}
            onChange={(e) => update(i, "value", e.target.value)}
          />
          <button
            onClick={() => remove(i)}
            className="rounded p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Remove"
          >✕</button>
        </div>
      ))}
      <button
        onClick={add}
        className="mt-1 rounded-md border border-dashed border-zinc-300 px-3 py-1.5 text-xs text-zinc-500 hover:border-red-300 hover:text-red-600 transition-colors w-full"
      >
        + Add stat
      </button>
    </div>
  );
}

/* ── Array editor ────────────────────────────────────────────── */
function ArrayEditor({
  value,
  onChange,
  fieldLabel = "Item",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  fieldLabel?: string;
}) {
  const rows = Array.isArray(value) ? value : [];
  function update(i: number, v: string) { onChange(rows.map((r, idx) => idx === i ? v : r)); }
  function add() { onChange([...rows, ""]); }
  function remove(i: number) { onChange(rows.filter((_, idx) => idx !== i)); }
  function move(i: number, dir: -1 | 1) {
    const next = [...rows];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex flex-col gap-0.5 pt-1">
            <button onClick={() => move(i, -1)} disabled={i === 0}
              className="rounded px-1 text-zinc-300 hover:text-zinc-600 disabled:opacity-20 transition-colors text-xs leading-none">▲</button>
            <button onClick={() => move(i, 1)} disabled={i === rows.length - 1}
              className="rounded px-1 text-zinc-300 hover:text-zinc-600 disabled:opacity-20 transition-colors text-xs leading-none">▼</button>
          </div>
          <textarea
            className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 resize-y"
            rows={3}
            placeholder={`${fieldLabel} ${i + 1}`}
            value={row}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            onClick={() => remove(i)}
            className="rounded p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-colors mt-1"
            title="Remove"
          >✕</button>
        </div>
      ))}
      <button
        onClick={add}
        className="mt-1 rounded-md border border-dashed border-zinc-300 px-3 py-1.5 text-xs text-zinc-500 hover:border-red-300 hover:text-red-600 transition-colors w-full"
      >
        + Add {fieldLabel.toLowerCase()}
      </button>
    </div>
  );
}

/* ── Main editor page ────────────────────────────────────────── */
export default function PageEditorPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  const meta    = PAGE_META[slug];
  const fields  = PAGE_FIELDS[slug];

  const [content, setContent]   = useState<Record<string, unknown>>({});
  const [loading, setLoading]   = useState(true);
  const [saving,  setSaving]    = useState(false);
  const [saved,   setSaved]     = useState(false);
  const [error,   setError]     = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/content/${slug}`);
      const json = await res.json();
      if (json.success) setContent(json.data as Record<string, unknown>);
    } catch {
      setError("Failed to load content.");
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  if (!meta || !fields) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-2xl">🤔</p>
        <p className="mt-3 text-sm text-zinc-500">Unknown page slug: <code>{slug}</code></p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-red-600 hover:underline">← Go back</button>
      </div>
    );
  }

  function handleChange(path: string, value: unknown) {
    setContent((prev) => deepSet(prev, path, value));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/content/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const json = await res.json();
      if (json.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError("Save failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSaving(false);
  }

  return (
    <div className="px-8 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => router.back()}
            className="mb-2 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            ← Pages
          </button>
          <h1 className="text-2xl font-semibold text-zinc-900">{meta.label}</h1>
          <p className="mt-1 text-sm text-zinc-500">Edit the text content for this page.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={meta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <ExternalLinkIcon size={14} />
            Preview
          </Link>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors disabled:opacity-50"
            title="Reload from server"
          >
            <RefreshIcon size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {saving ? (
              <RefreshIcon size={14} className="animate-spin" />
            ) : saved ? (
              <CheckIcon size={14} />
            ) : (
              <SaveIcon size={14} />
            )}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {saved && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-center gap-2">
          <CheckIcon size={14} />
          Changes saved successfully! The page has been updated.
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <RefreshIcon size={24} className="animate-spin text-zinc-400" />
            <p className="text-sm text-zinc-400">Loading content…</p>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          {fields.map((field, idx) => {
            if (field.type === "section") {
              return (
                <div key={idx} className={`${idx > 0 ? "pt-8" : ""}`}>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
                    {field.label}
                  </h3>
                </div>
              );
            }

            if (field.type === "stats") {
              const val = deepGet(content, field.path);
              return (
                <div key={idx} className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">{field.label}</label>
                  <StatsEditor
                    value={(val as { label: string; value: string }[]) ?? []}
                    onChange={(v) => handleChange(field.path, v)}
                  />
                </div>
              );
            }

            if (field.type === "array") {
              const val = deepGet(content, field.path);
              return (
                <div key={idx} className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">{field.label}</label>
                  {field.hint && <p className="mb-2 text-xs text-zinc-400">{field.hint}</p>}
                  <ArrayEditor
                    value={(val as string[]) ?? []}
                    onChange={(v) => handleChange(field.path, v)}
                    fieldLabel={field.fieldLabel}
                  />
                </div>
              );
            }

            const val = String(deepGet(content, field.path) ?? "");

            return (
              <div key={idx} className="mb-5">
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  {field.label}
                </label>
                {field.hint && <p className="mb-1 text-xs text-zinc-400">{field.hint}</p>}
                {field.type === "textarea" ? (
                  <textarea
                    rows={field.rows ?? 4}
                    value={val}
                    onChange={(e) => handleChange(field.path, e.target.value)}
                    className="block w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 resize-y"
                  />
                ) : (
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleChange(field.path, e.target.value)}
                    className="block w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom save bar */}
      {!loading && (
        <div className="mt-10 flex items-center justify-between border-t border-zinc-100 pt-6">
          <p className="text-xs text-zinc-400">
            Changes are saved to the server and applied immediately.
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {saving ? <RefreshIcon size={14} className="animate-spin" /> : <SaveIcon size={14} />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}
