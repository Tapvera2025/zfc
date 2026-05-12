"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Extension } from "@tiptap/core";
import { useEffect, useRef } from "react";

// ─── Custom FontSize extension ────────────────────────────────────────────────

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() { return { types: ["textStyle"] }; },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: (el: HTMLElement) => el.style.fontSize?.replace("px", "") || null,
          renderHTML: (attrs: Record<string, unknown>) => {
            if (!attrs.fontSize) return {};
            return { style: `font-size: ${attrs.fontSize}px` };
          },
        },
      },
    }];
  },
  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }: { chain: () => { setMark: (n: string, a: Record<string, unknown>) => { run: () => boolean } } }) =>
          chain().setMark("textStyle", { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }: { chain: () => { setMark: (n: string, a: Record<string, unknown>) => { removeEmptyTextStyle: () => { run: () => boolean } } } }) =>
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

// ─── Toolbar primitives ───────────────────────────────────────────────────────

function Divider() {
  return <div className="mx-0.5 h-5 w-px shrink-0 bg-zinc-200" />;
}

function Btn({
  active = false,
  disabled = false,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-sm transition
        ${active ? "bg-red-100 text-red-700" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"}
        disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

function ToolSelect({
  value,
  onChange,
  title,
  className = "",
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <select
      title={title}
      value={value}
      onMouseDown={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value)}
      className={`h-7 cursor-pointer rounded border border-zinc-200 bg-white px-1.5 text-xs text-zinc-700
        focus:border-red-400 focus:outline-none ${className}`}
    >
      {children}
    </select>
  );
}

// ─── SVG icon set ─────────────────────────────────────────────────────────────

const I = {
  bold:        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-2 3.46A4 4 0 0 1 14 20H6V4zm2 7h6a2 2 0 0 0 0-4H8v4zm0 6h6a2 2 0 0 0 0-4H8v4z"/></svg>,
  italic:      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M10 4v3h2.21l-3.42 10H6v3h8v-3h-2.21l3.42-10H18V4z"/></svg>,
  underline:   <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>,
  strike:      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6.85 7.08C6.85 4.37 9.45 3 12.24 3c1.64 0 3 .49 3.9 1.28.77.65 1.46 1.68 1.46 3.23h-2.45c0-.86-.25-1.47-.68-1.88-.48-.46-1.23-.68-2.22-.68-1.73 0-2.38.88-2.38 1.79 0 .48.13.81.42 1.07.29.26.79.52 1.63.78l1.6.5c1.5.46 2.53.99 3.08 1.59.55.6.82 1.37.82 2.3 0 1.46-.59 2.57-1.77 3.32-1.02.67-2.33.99-3.88.99-1.62 0-3.08-.47-4.08-1.39-.95-.87-1.36-2.01-1.36-3.32h2.45c.03.73.27 1.27.72 1.63.47.37 1.2.57 2.18.57 1.81 0 2.53-.72 2.53-1.79 0-.96-.72-1.5-2.72-2.08L9.9 9.81C8.15 9.22 6.85 8.3 6.85 7.08zM5 13v-2h14v2H5z"/></svg>,
  code:        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
  alignL:      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3 5h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z"/></svg>,
  alignC:      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3 5h18v2H3zm3 4h12v2H6zm-3 4h18v2H3zm3 4h12v2H6z"/></svg>,
  alignR:      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3 5h18v2H3zm6 4h12v2H9zm-6 4h18v2H3zm6 4h12v2H9z"/></svg>,
  alignJ:      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3 5h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z"/></svg>,
  ul:          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zM8 6h13v2H8zm0 5h13v2H8zm0 5h13v2H8z"/></svg>,
  ol:          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2zm1-9h1V4H2v1h1zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2zm5-6v2h14V5H7zm0 5v2h14v-2H7zm0 5v2h14v-2H7z"/></svg>,
  quote:       <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>,
  link:        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>,
  unlink:      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.21-.69 2.25-1.7 2.78l1.42 1.42C21.28 15.26 22 13.74 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16v-2zM2 4.27l3.11 3.11A5 5 0 0 0 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73l2 2H8v1.9h4c.66 0 1.28-.13 1.85-.35L17.73 20 19 18.73 3.27 3 2 4.27z"/></svg>,
  hr:          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M19 11H5v2h14v-2z"/></svg>,
  undo:        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>,
  redo:        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>,
  clear:       <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.27 5zM6 5v.18L8.82 8H6V5zM20 5H8.82l2 2H20v2h-7.18l2 2H20v2h-5.18l5.55 5.55L21 19V6a1 1 0 0 0-1-1z"/></svg>,
};

// ─── Toolbar ──────────────────────────────────────────────────────────────────

const FONTS = [
  { label: "Default",         value: "" },
  { label: "Inter",           value: "Inter, sans-serif" },
  { label: "Arial",           value: "Arial, sans-serif" },
  { label: "Georgia",         value: "Georgia, serif" },
  { label: "Times New Roman", value: '"Times New Roman", serif' },
  { label: "Courier New",     value: '"Courier New", monospace' },
];

const SIZES = ["10","11","12","13","14","16","18","20","24","28","32","36","48","64","72"];

function Toolbar({ editor }: { editor: Editor }) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const hlInputRef    = useRef<HTMLInputElement>(null);

  function getBlockType() {
    for (const level of [1, 2, 3, 4, 5, 6] as const) {
      if (editor.isActive("heading", { level })) return `h${level}`;
    }
    if (editor.isActive("codeBlock"))  return "codeBlock";
    if (editor.isActive("blockquote")) return "blockquote";
    return "paragraph";
  }

  function setBlockType(v: string) {
    const chain = editor.chain().focus();
    if (v === "paragraph")  chain.setParagraph().run();
    else if (v === "codeBlock")  chain.toggleCodeBlock().run();
    else if (v === "blockquote") chain.toggleBlockquote().run();
    else chain.setHeading({ level: Number(v[1]) as 1|2|3|4|5|6 }).run();
  }

  const textStyleAttrs = editor.getAttributes("textStyle");
  const currentSize   = (textStyleAttrs.fontSize as string | undefined) ?? "16";
  const currentFont   = (textStyleAttrs.fontFamily as string | undefined) ?? "";
  const currentColor  = (textStyleAttrs.color as string | undefined) ?? "#000000";

  function handleLink() {
    if (editor.isActive("link")) { editor.chain().focus().unsetLink().run(); return; }
    const existing = editor.getAttributes("link").href as string ?? "";
    const url = window.prompt("Enter URL:", existing);
    if (url === null) return;
    if (!url.trim()) { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url.trim(), target: "_blank" }).run();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chain = editor.chain().focus() as any;

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-zinc-200 bg-zinc-50 px-2 py-1.5">

      {/* Block type */}
      <ToolSelect value={getBlockType()} onChange={setBlockType} title="Block type" className="w-[120px]">
        <option value="paragraph">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
        <option value="codeBlock">Code block</option>
        <option value="blockquote">Blockquote</option>
      </ToolSelect>

      <Divider />

      {/* Font family */}
      <ToolSelect value={currentFont} onChange={(v) => {
        if (!v) editor.chain().focus().unsetFontFamily().run();
        else editor.chain().focus().setFontFamily(v).run();
      }} title="Font family" className="w-[108px]">
        {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
      </ToolSelect>

      {/* Font size */}
      <ToolSelect value={currentSize} onChange={(v) => {
        if (!v) chain.unsetFontSize().run();
        else chain.setFontSize(v).run();
      }} title="Font size" className="w-[54px]">
        {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
      </ToolSelect>

      <Divider />

      {/* Inline marks */}
      <Btn active={editor.isActive("bold")}      onClick={() => editor.chain().focus().toggleBold().run()}      title="Bold (Ctrl+B)">{I.bold}</Btn>
      <Btn active={editor.isActive("italic")}    onClick={() => editor.chain().focus().toggleItalic().run()}    title="Italic (Ctrl+I)">{I.italic}</Btn>
      <Btn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline (Ctrl+U)">{I.underline}</Btn>
      <Btn active={editor.isActive("strike")}    onClick={() => editor.chain().focus().toggleStrike().run()}    title="Strikethrough">{I.strike}</Btn>
      <Btn active={editor.isActive("code")}      onClick={() => editor.chain().focus().toggleCode().run()}      title="Inline code">{I.code}</Btn>

      <Divider />

      {/* Text colour */}
      <div className="relative">
        <button
          type="button"
          title="Text colour"
          onMouseDown={(e) => { e.preventDefault(); colorInputRef.current?.click(); }}
          className="flex h-7 w-7 flex-col items-center justify-center gap-0.5 rounded hover:bg-zinc-100"
        >
          <span className="text-[13px] font-black leading-none" style={{ color: currentColor }}>A</span>
          <span className="h-[3px] w-4 rounded-sm" style={{ background: currentColor }} />
        </button>
        <input
          ref={colorInputRef}
          type="color"
          value={currentColor}
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="absolute h-0 w-0 opacity-0 pointer-events-none"
        />
      </div>

      {/* Highlight colour */}
      <div className="relative">
        <button
          type="button"
          title="Highlight colour"
          onMouseDown={(e) => { e.preventDefault(); hlInputRef.current?.click(); }}
          className="flex h-7 w-7 items-center justify-center rounded text-base hover:bg-zinc-100"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <input
          ref={hlInputRef}
          type="color"
          defaultValue="#fef08a"
          onChange={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
          className="absolute h-0 w-0 opacity-0 pointer-events-none"
        />
      </div>

      <Divider />

      {/* Alignment */}
      <Btn active={editor.isActive({ textAlign: "left"    })} onClick={() => editor.chain().focus().setTextAlign("left").run()}    title="Align left">{I.alignL}</Btn>
      <Btn active={editor.isActive({ textAlign: "center"  })} onClick={() => editor.chain().focus().setTextAlign("center").run()}  title="Align centre">{I.alignC}</Btn>
      <Btn active={editor.isActive({ textAlign: "right"   })} onClick={() => editor.chain().focus().setTextAlign("right").run()}   title="Align right">{I.alignR}</Btn>
      <Btn active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()} title="Justify">{I.alignJ}</Btn>

      <Divider />

      {/* Lists & blocks */}
      <Btn active={editor.isActive("bulletList")}  onClick={() => editor.chain().focus().toggleBulletList().run()}  title="Bullet list">{I.ul}</Btn>
      <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">{I.ol}</Btn>
      <Btn active={editor.isActive("blockquote")}  onClick={() => editor.chain().focus().toggleBlockquote().run()}  title="Blockquote">{I.quote}</Btn>

      <Divider />

      {/* Link & HR */}
      <Btn active={editor.isActive("link")}  onClick={handleLink}                                                   title={editor.isActive("link") ? "Remove link" : "Add link"}>{editor.isActive("link") ? I.unlink : I.link}</Btn>
      <Btn active={false}                    onClick={() => editor.chain().focus().setHorizontalRule().run()}        title="Horizontal rule">{I.hr}</Btn>

      <Divider />

      {/* History & clear */}
      <Btn active={false} disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)">{I.undo}</Btn>
      <Btn active={false} disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)">{I.redo}</Btn>
      <Btn active={false} onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting">{I.clear}</Btn>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function RichTextEditor({ value, onChange, placeholder = "Write your post content here…" }: Props) {
  const editor = useEditor({
    immediatelyRender: false, // avoids SSR hydration mismatch
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[500px] px-6 py-5 text-sm text-zinc-800 leading-relaxed",
      },
    },
  });

  // Sync when value is set externally (e.g., post loaded from API)
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const words = editor
    ? editor.getText().trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div className="rich-editor overflow-hidden rounded-md border border-zinc-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400/20 transition">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      <div className="border-t border-zinc-100 px-6 py-1.5 text-right text-xs text-zinc-400">
        {words} {words === 1 ? "word" : "words"}
      </div>
    </div>
  );
}
