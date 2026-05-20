"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  DashboardIcon,
  BlogIcon,
  SubmissionsIcon,
  SEOIcon,
  SettingsIcon,
  MailIcon,
} from "@/components/admin/icons";

const navItems = [
  { label: "Dashboard",        href: "/admin",                  icon: DashboardIcon,   exact: true  },
  { label: "Blog",             href: "/admin/blog",             icon: BlogIcon,        exact: false },
  { label: "Form Submissions", href: "/admin/submissions",      icon: SubmissionsIcon, exact: false },
  { label: "FAQ Inquiries",    href: "/admin/faq-inquiry",      icon: MailIcon,        exact: false },
  { label: "SEO",              href: "/admin/seo",              icon: SEOIcon,         exact: false },
  { label: "Settings",         href: "/admin/settings",         icon: SettingsIcon,    exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-zinc-200 bg-white">
      {/* Brand */}
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-zinc-200 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-red-600">
          <span className="text-xs font-bold text-white">ZFC</span>
        </div>
        <span className="text-sm font-semibold text-zinc-900">CMS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 admin-scrollbar" aria-label="Admin navigation">
        <ul className="space-y-0.5 px-3">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-red-50 text-red-600"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    size={16}
                    className={cn(
                      "shrink-0 transition-colors",
                      active ? "text-red-600" : "text-zinc-400 group-hover:text-zinc-600"
                    )}
                  />
                  {item.label}
                  {/* Active indicator */}
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-600" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-zinc-200 p-4">
        <p className="text-[11px] text-zinc-400">ZFC CMS v0.1.0</p>
      </div>
    </aside>
  );
}
