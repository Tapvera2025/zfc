"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLinkIcon, LogOutIcon } from "@/components/admin/icons";

export function AdminTopbar() {
  const router = useRouter();

  function handleLogout() {
    // Clear mock auth token and redirect to login
    if (typeof window !== "undefined") {
      localStorage.removeItem("zfc-admin-token");
    }
    router.push("/admin/login");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-20 ml-60 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6">
      {/* Left: breadcrumb / title area (slot for pages to fill) */}
      <div id="topbar-title" className="flex items-center gap-2 text-sm font-medium text-zinc-900" />

      {/* Right: actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-900"
        >
          <ExternalLinkIcon size={14} />
          View Site
        </Link>

        <div className="h-4 w-px bg-zinc-200" />

        <span className="text-sm font-medium text-zinc-700">Admin User</span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
          type="button"
        >
          <LogOutIcon size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
