"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPost, BlogStatus } from "@/types/admin";
import { ImageUpload } from "@/components/admin/image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "content" | "seo" | "settings";

type FormData = {
  title:            string;
  slug:             string;
  author:           string;
  excerpt:          string;
  content:          string;
  featuredImage:    string;
  featuredImageAlt: string;
  category:         string;
  tags:             string;
  status:           BlogStatus;
  seo: {
    metaTitle:       string;
    metaDescription: string;
    canonicalUrl:    string;
    keywords:        string;
    ogTitle:         string;
    ogDescription:   string;
    ogImage:         string;
    noindex:         boolean;
    nofollow:        boolean;
  };
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}


function buildPayload(form: FormData) {
  return {
    title:            form.title.trim(),
    author:           form.author.trim(),
    excerpt:          form.excerpt.trim(),
    content:          form.content,
    featuredImage:    form.featuredImage.trim() || null,
    featuredImageAlt: form.featuredImageAlt.trim(),
    category:         form.category.trim() || "General",
    tags:             form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    status:           form.status,
    seo: {
      metaTitle:       form.seo.metaTitle.trim(),
      metaDescription: form.seo.metaDescription.trim(),
      canonicalUrl:    form.seo.canonicalUrl.trim(),
      keywords:        form.seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      ogTitle:         form.seo.ogTitle.trim(),
      ogDescription:   form.seo.ogDescription.trim(),
      ogImage:         form.seo.ogImage.trim() || null,
      noindex:         form.seo.noindex,
      nofollow:        form.seo.nofollow,
    },
  };
}

const EMPTY_FORM: FormData = {
  title:            "",
  slug:             "",
  author:           "",
  excerpt:          "",
  content:          "",
  featuredImage:    "",
  featuredImageAlt: "",
  category:         "",
  tags:             "",
  status:           "draft",
  seo: {
    metaTitle:       "",
    metaDescription: "",
    canonicalUrl:    "",
    keywords:        "",
    ogTitle:         "",
    ogDescription:   "",
    ogImage:         "",
    noindex:         false,
    nofollow:        false,
  },
};

function postToForm(post: BlogPost): FormData {
  return {
    title:            post.title,
    slug:             post.slug,
    author:           post.author,
    excerpt:          post.excerpt,
    content:          post.content,
    featuredImage:    post.featuredImage ?? "",
    featuredImageAlt: post.featuredImageAlt,
    category:         post.category,
    tags:             post.tags.join(", "),
    status:           post.status,
    seo: {
      metaTitle:       post.seo.metaTitle,
      metaDescription: post.seo.metaDescription,
      canonicalUrl:    post.seo.canonicalUrl,
      keywords:        post.seo.keywords.join(", "),
      ogTitle:         post.seo.ogTitle,
      ogDescription:   post.seo.ogDescription,
      ogImage:         post.seo.ogImage ?? "",
      noindex:         post.seo.noindex,
      nofollow:        post.seo.nofollow,
    },
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TabBar({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "content",  label: "Content"  },
    { id: "seo",      label: "SEO"      },
    { id: "settings", label: "Settings" },
  ];
  return (
    <div className="flex border-b border-zinc-200">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`px-5 py-3 text-sm font-medium transition border-b-2 -mb-px ${
            tab === t.id
              ? "border-red-600 text-red-600"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-zinc-400">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20";

function charColor(len: number, warn: number, max: number) {
  if (len > max)  return "text-red-600 font-semibold";
  if (len > warn) return "text-yellow-600";
  return "text-zinc-400";
}

function GooglePreview({ title, description, url }: { title: string; description: string; url: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">Google preview</p>
      <p className="truncate text-xs text-zinc-500">{url || "https://zfc.org/blog/your-post-slug"}</p>
      <p className="mt-0.5 truncate text-[17px] leading-snug text-blue-700">
        {title || "Post title"}
      </p>
      <p className="mt-0.5 line-clamp-2 text-sm text-zinc-600">
        {description || "Meta description will appear here…"}
      </p>
    </div>
  );
}

function SEOWarnings({ form }: { form: FormData }) {
  const warnings: string[] = [];
  if (!form.seo.metaTitle)       warnings.push("Missing meta title");
  if (!form.seo.metaDescription) warnings.push("Missing meta description");
  if (!form.featuredImage)       warnings.push("No featured image");
  if (!form.seo.canonicalUrl)    warnings.push("Missing canonical URL");
  if (!form.seo.ogImage)         warnings.push("Missing Open Graph image");
  if (form.seo.metaTitle.length > 60)  warnings.push("Meta title is over 60 characters");
  if (form.seo.metaDescription.length > 160) warnings.push("Meta description is over 160 characters");
  if (warnings.length === 0) return null;
  return (
    <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3">
      <p className="mb-1.5 text-xs font-semibold text-yellow-800">SEO warnings</p>
      <ul className="space-y-0.5">
        {warnings.map((w) => (
          <li key={w} className="flex items-center gap-1.5 text-xs text-yellow-700">
            <span>⚠</span> {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main editor ──────────────────────────────────────────────────────────────

export function BlogEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const isEdit = Boolean(postId);

  const [tab, setTab]               = useState<Tab>("content");
  const [form, setForm]             = useState<FormData>(EMPTY_FORM);
  const [loading, setLoading]       = useState(isEdit);
  const [saving, setSaving]         = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved]   = useState<Date | null>(null);
  const [error, setError]           = useState("");
  const [slugManual, setSlugManual] = useState(false);

  const hasUnsaved      = useRef(false);
  const autoSaveRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track whether the user has manually edited these SEO fields.
  // While locked=false we mirror them from title/excerpt/slug automatically.
  const metaTitleLocked = useRef(false);
  const metaDescLocked  = useRef(false);
  const canonicalLocked = useRef(false);

  // ── Load existing post ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!postId) return;
    fetch(`/api/blog/${postId}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setForm(postToForm(j.data.post));
          // Lock auto-population for existing posts — fields already have real values.
          setSlugManual(true);
          metaTitleLocked.current = true;
          metaDescLocked.current  = true;
          canonicalLocked.current = true;
        } else {
          setError("Post not found.");
        }
      })
      .catch(() => setError("Failed to load post."))
      .finally(() => setLoading(false));
  }, [postId]);

  // ── Auto-slug + auto-canonical from title (new posts only) ─────────────────

  useEffect(() => {
    if (isEdit || slugManual) return;
    const newSlug = slugify(form.title);
    setForm((f) => ({
      ...f,
      slug: newSlug,
      seo: {
        ...f.seo,
        canonicalUrl: canonicalLocked.current
          ? f.seo.canonicalUrl
          : newSlug ? `https://zfc.org/blog/${newSlug}` : "",
      },
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, isEdit, slugManual]);

  // ── Save ────────────────────────────────────────────────────────────────────

  // statusOverride lets sidebar buttons pass the intended status without waiting
  // for the React state update to commit (avoids the setField → save race).
  const save = useCallback(async (notify = false, statusOverride?: BlogStatus) => {
    if (!form.title.trim())   { setError("Title is required."); return; }
    if (!form.author.trim())  { setError("Author is required."); return; }
    if (!form.excerpt.trim()) { setError("Excerpt is required."); return; }
    setError("");
    setSaving(true);
    setSaveStatus("saving");

    try {
      const payload = buildPayload({
        ...form,
        status: statusOverride ?? form.status,
      });

      const res = isEdit
        ? await fetch(`/api/blog/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const json = await res.json();

      if (json.success) {
        hasUnsaved.current = false;
        setSaveStatus("saved");
        setLastSaved(new Date());
        if (statusOverride) {
          setForm((f) => ({ ...f, status: statusOverride }));
        }
        if (notify && !isEdit) {
          router.push(`/admin/blog/${json.data.post.id}/edit`);
        }
      } else {
        setSaveStatus("error");
        setError(json.message || "Save failed.");
      }
    } catch {
      setSaveStatus("error");
      setError("Network error — could not save.");
    } finally {
      setSaving(false);
    }
  }, [form, isEdit, postId, router]);

  // ── Auto-save in edit mode ──────────────────────────────────────────────────

  useEffect(() => {
    if (!isEdit || loading) return;
    if (!hasUnsaved.current) return;
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(() => save(), 2000);
    return () => { if (autoSaveRef.current) clearTimeout(autoSaveRef.current); };
  }, [form, isEdit, loading, save]);

  // ── Field helpers ───────────────────────────────────────────────────────────

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    hasUnsaved.current = true;
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setSeoField<K extends keyof FormData["seo"]>(key: K, value: FormData["seo"][K]) {
    hasUnsaved.current = true;
    setForm((f) => ({ ...f, seo: { ...f.seo, [key]: value } }));
  }

  // Title → auto-mirrors to meta title (until user edits it) and OG title (if blank).
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    hasUnsaved.current = true;
    setForm((f) => ({
      ...f,
      title: val,
      seo: {
        ...f.seo,
        metaTitle: metaTitleLocked.current ? f.seo.metaTitle : val,
        ogTitle:   f.seo.ogTitle           ? f.seo.ogTitle   : val,
      },
    }));
  }

  // Excerpt → auto-mirrors to meta description (until user edits it).
  function handleExcerptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    hasUnsaved.current = true;
    setForm((f) => ({
      ...f,
      excerpt: val,
      seo: {
        ...f.seo,
        metaDescription: metaDescLocked.current
          ? f.seo.metaDescription
          : val.slice(0, 160),
      },
    }));
  }

  // Slug (manual edit) → auto-mirrors to canonical URL (until user edits it).
  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlugManual(true);
    const newSlug = slugify(e.target.value);
    hasUnsaved.current = true;
    setForm((f) => ({
      ...f,
      slug: newSlug,
      seo: {
        ...f.seo,
        canonicalUrl: canonicalLocked.current
          ? f.seo.canonicalUrl
          : newSlug ? `https://zfc.org/blog/${newSlug}` : "",
      },
    }));
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-zinc-400">
        Loading post…
      </div>
    );
  }

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/admin/blog" className="hover:text-zinc-800">Blog</Link>
            <span>/</span>
            <span>{isEdit ? "Edit post" : "New post"}</span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-900">
            {isEdit ? (form.title || "Edit post") : "Create blog post"}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {saveStatus === "saving" && <span className="text-xs text-zinc-400">Saving…</span>}
          {saveStatus === "saved" && lastSaved && (
            <span className="text-xs text-zinc-400">
              Saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          {saveStatus === "error" && <span className="text-xs text-red-600">Save failed</span>}

          <Link
            href="/admin/blog"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => save(true)}
            disabled={saving}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : isEdit ? "Save" : "Create post"}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Main panel */}
        <div className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white">
          <TabBar tab={tab} onChange={setTab} />

          <div className="p-6">

            {/* ── Content tab ── */}
            {tab === "content" && (
              <div className="space-y-5">
                <Field label="Title *">
                  <input
                    type="text"
                    value={form.title}
                    onChange={handleTitleChange}
                    placeholder="Post title"
                    className={inputClass}
                    autoFocus
                  />
                </Field>

                <Field label="URL slug">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 text-sm text-zinc-400">/blog/</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={handleSlugChange}
                      placeholder="auto-generated-from-title"
                      className={inputClass}
                    />
                  </div>
                </Field>

                <Field label="Author *">
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setField("author", e.target.value)}
                    placeholder="Author name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Excerpt *" hint="Also used as the meta description if you haven't set one.">
                  <textarea
                    value={form.excerpt}
                    onChange={handleExcerptChange}
                    rows={3}
                    maxLength={300}
                    placeholder="Short description shown in listings and search results"
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-zinc-400">{form.excerpt.length}/300 characters</p>
                </Field>

                <Field label="Content *">
                  <RichTextEditor
                    value={form.content}
                    onChange={(html) => setField("content", html)}
                  />
                </Field>
              </div>
            )}

            {/* ── SEO tab ── */}
            {tab === "seo" && (
              <div className="space-y-5">
                <SEOWarnings form={form} />

                <Field label="Meta title">
                  <input
                    type="text"
                    value={form.seo.metaTitle}
                    onChange={(e) => {
                      metaTitleLocked.current = true;
                      setSeoField("metaTitle", e.target.value);
                    }}
                    placeholder="Defaults to post title"
                    className={inputClass}
                  />
                  <p className={`mt-1 text-xs ${charColor(form.seo.metaTitle.length, 50, 60)}`}>
                    {form.seo.metaTitle.length}/60 characters
                    {form.seo.metaTitle.length > 60 ? " — too long" : ""}
                  </p>
                </Field>

                <Field label="Meta description">
                  <textarea
                    value={form.seo.metaDescription}
                    onChange={(e) => {
                      metaDescLocked.current = true;
                      setSeoField("metaDescription", e.target.value);
                    }}
                    rows={3}
                    placeholder="Defaults to excerpt"
                    className={inputClass}
                  />
                  <p className={`mt-1 text-xs ${charColor(form.seo.metaDescription.length, 140, 160)}`}>
                    {form.seo.metaDescription.length}/160 characters
                    {form.seo.metaDescription.length > 160 ? " — too long" : ""}
                  </p>
                </Field>

                <GooglePreview
                  title={form.seo.metaTitle || form.title}
                  description={form.seo.metaDescription || form.excerpt}
                  url={form.seo.canonicalUrl || `https://zfc.org/blog/${form.slug}`}
                />

                <Field label="Canonical URL">
                  <input
                    type="url"
                    value={form.seo.canonicalUrl}
                    onChange={(e) => {
                      canonicalLocked.current = true;
                      setSeoField("canonicalUrl", e.target.value);
                    }}
                    placeholder="Auto-filled from slug"
                    className={inputClass}
                  />
                </Field>

                <Field label="Meta keywords" hint="Comma-separated">
                  <input
                    type="text"
                    value={form.seo.keywords}
                    onChange={(e) => setSeoField("keywords", e.target.value)}
                    placeholder="financial literacy, budgeting, youth finance"
                    className={inputClass}
                  />
                </Field>

                <div className="border-t border-zinc-100 pt-5">
                  <p className="mb-3 text-sm font-medium text-zinc-700">Open Graph</p>
                  <div className="space-y-4">
                    <Field label="OG title">
                      <input
                        type="text"
                        value={form.seo.ogTitle}
                        onChange={(e) => setSeoField("ogTitle", e.target.value)}
                        placeholder="Defaults to post title"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="OG description">
                      <textarea
                        value={form.seo.ogDescription}
                        onChange={(e) => setSeoField("ogDescription", e.target.value)}
                        rows={2}
                        placeholder="Description for social sharing"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="OG image" hint="1200×630 recommended for social sharing">
                      <ImageUpload
                        value={form.seo.ogImage}
                        onChange={(url) => setSeoField("ogImage", url)}
                        folder="blog/og"
                        aspectHint="1200×630"
                      />
                    </Field>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-5 space-y-3">
                  <p className="text-sm font-medium text-zinc-700">Indexing</p>
                  {(["noindex", "nofollow"] as const).map((key) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.seo[key]}
                        onChange={(e) => setSeoField(key, e.target.checked)}
                        className="h-4 w-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-zinc-700">
                        {key === "noindex"
                          ? "noindex — exclude from search engines"
                          : "nofollow — don't follow links on this page"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── Settings tab ── */}
            {tab === "settings" && (
              <div className="space-y-5">
                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(e) => setField("status", e.target.value as BlogStatus)}
                    className={inputClass}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </Field>

                <Field label="Category">
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                    placeholder="e.g. Education, Personal Finance"
                    className={inputClass}
                  />
                </Field>

                <Field label="Tags" hint="Comma-separated">
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setField("tags", e.target.value)}
                    placeholder="financial literacy, budgeting, youth"
                    className={inputClass}
                  />
                </Field>

                <Field label="Featured image" hint="16:9 ratio works best for blog listings">
                  <ImageUpload
                    value={form.featuredImage}
                    onChange={(url) => setField("featuredImage", url)}
                    folder="blog/featured"
                    aspectHint="16:9 recommended"
                  />
                </Field>

                <Field label="Featured image alt text">
                  <input
                    type="text"
                    value={form.featuredImageAlt}
                    onChange={(e) => setField("featuredImageAlt", e.target.value)}
                    placeholder="Descriptive alt text for accessibility and SEO"
                    className={inputClass}
                  />
                </Field>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 shrink-0 space-y-4">
          {/* Publish card */}
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Publish</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => save(true, "draft")}
                disabled={saving}
                className="w-full rounded-md border border-zinc-300 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50"
              >
                Save as draft
              </button>
              <button
                type="button"
                onClick={() => save(true, "published")}
                disabled={saving}
                className="w-full rounded-md bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {form.status === "published" ? "Update & keep published" : "Publish"}
              </button>
            </div>

            <div className="mt-3 border-t border-zinc-100 pt-3">
              <p className="text-xs text-zinc-500">
                Status:{" "}
                <span className="font-medium capitalize text-zinc-700">{form.status}</span>
              </p>
            </div>
          </div>

          {/* SEO snapshot */}
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">SEO snapshot</p>
            <div className="space-y-1.5 text-xs">
              {[
                { label: "Meta title",        ok: !!form.seo.metaTitle },
                { label: "Meta description",  ok: !!form.seo.metaDescription },
                { label: "Canonical URL",     ok: !!form.seo.canonicalUrl },
                { label: "OG image",          ok: !!form.seo.ogImage },
                { label: "Featured image",    ok: !!form.featuredImage },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={ok ? "text-green-500" : "text-red-400"}>{ok ? "✓" : "✗"}</span>
                  <span className={ok ? "text-zinc-600" : "text-zinc-400"}>{label}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTab("seo")}
              className="mt-3 text-xs font-medium text-red-600 hover:text-red-700"
            >
              Open SEO tab →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
