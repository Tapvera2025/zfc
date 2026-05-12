"use client";

import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  aspectHint?: string;
};

export function ImageUpload({ value, onChange, folder = "blog", aspectHint }: Props) {
  const inputRef   = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState("");
  const [urlDraft,  setUrlDraft]  = useState("");
  const [dragging,  setDragging]  = useState(false);

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);

      const res  = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();

      if (json.success) {
        onChange(json.data.url);
      } else {
        setError(json.message ?? "Upload failed.");
      }
    } catch {
      setError("Network error — upload failed.");
    } finally {
      setUploading(false);
      // Reset file input so the same file can be re-selected after removal
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }

  function applyUrl() {
    const url = urlDraft.trim();
    if (!url) return;
    onChange(url);
    setUrlDraft("");
    setError("");
  }

  return (
    <div className="space-y-2">
      {/* Preview when image is already set */}
      {value && !uploading && (
        <div>
          <img
            src={value}
            alt="Preview"
            className="h-40 w-full rounded-md border border-zinc-200 object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="mt-1.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 transition"
            >
              Change image
            </button>
            <span className="text-zinc-300">·</span>
            <button
              type="button"
              onClick={() => { onChange(""); setError(""); }}
              className="text-xs font-medium text-red-500 hover:text-red-700 transition"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Drop zone — shown when no image is set */}
      {!value && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed py-8 text-sm transition select-none ${
            uploading
              ? "cursor-wait border-zinc-200 bg-zinc-50"
              : dragging
              ? "cursor-copy border-red-400 bg-red-50"
              : "cursor-pointer border-zinc-200 bg-zinc-50 hover:border-red-300 hover:bg-red-50/50"
          }`}
        >
          {uploading ? (
            <>
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-red-600" />
              <span className="text-xs text-zinc-500">Uploading…</span>
            </>
          ) : (
            <>
              <svg className="h-8 w-8 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-zinc-500">Click to upload or drag &amp; drop</span>
              <span className="text-xs text-zinc-400">
                JPEG, PNG, WebP, GIF · max 4 MB{aspectHint ? ` · ${aspectHint}` : ""}
              </span>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
      />

      {/* URL fallback */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyUrl(); } }}
          placeholder="Or paste an image URL"
          className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20"
        />
        <button
          type="button"
          onClick={applyUrl}
          disabled={!urlDraft.trim()}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-40"
        >
          Apply
        </button>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
