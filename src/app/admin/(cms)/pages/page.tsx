"use client";

import Link from "next/link";
import { PagesIcon, EditIcon, ExternalLinkIcon } from "@/components/admin/icons";

const PAGES = [
  {
    slug: "home",
    label: "Home Page",
    description: "Hero headline, about section, stats, why-choose-us points.",
    href: "/",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    slug: "about",
    label: "About Us",
    description: "Intro paragraph, mission statement, and vision text.",
    href: "/about",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    slug: "services",
    label: "Services",
    description: "Services section heading and intro body text.",
    href: "/services",
    color: "bg-green-50 text-green-600 border-green-100",
    iconBg: "bg-green-100",
  },
  {
    slug: "our-client",
    label: "Our Client",
    description: "Intro heading and body paragraphs shown on the Our Client page.",
    href: "/our-client",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    slug: "toronto",
    label: "Toronto Immigration Page",
    description: "Page title, body paragraphs, and contact information.",
    href: "/toronto",
    color: "bg-red-50 text-red-600 border-red-100",
    iconBg: "bg-red-100",
  },
  {
    slug: "free-assessment",
    label: "Free Assessment",
    description: "Hero title, form intro text, and submit button label.",
    href: "/free-assessment",
    color: "bg-teal-50 text-teal-600 border-teal-100",
    iconBg: "bg-teal-100",
  },
];

export default function PagesListPage() {
  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Pages</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Edit the text content on each page of the website. Changes take effect immediately.
        </p>
      </div>

      {/* Pages grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PAGES.map((page) => (
          <div
            key={page.slug}
            className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-zinc-300"
          >
            {/* Icon */}
            <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${page.iconBg}`}>
              <PagesIcon size={18} className={page.color.split(" ")[1]} />
            </div>

            {/* Label + description */}
            <h2 className="text-sm font-semibold text-zinc-900">{page.label}</h2>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{page.description}</p>

            {/* Actions */}
            <div className="mt-5 flex items-center gap-3">
              <Link
                href={`/admin/pages/${page.slug}`}
                className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700"
              >
                <EditIcon size={12} />
                Edit Content
              </Link>
              <Link
                href={page.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50"
              >
                <ExternalLinkIcon size={12} />
                View Page
              </Link>
            </div>

            {/* Color accent bar */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity ${page.color.split(" ")[2].replace("border-", "bg-")}`} />
          </div>
        ))}
      </div>

      {/* Info note */}
      <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 px-5 py-4">
        <p className="text-sm text-blue-700">
          <strong>Tip:</strong> Content changes are saved to JSON files and applied immediately.
          Images and structural layout changes require a developer.
        </p>
      </div>
    </div>
  );
}
