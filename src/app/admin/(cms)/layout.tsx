"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default function AdminCMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Simple mock auth guard — replace with real server-side auth in production
  useEffect(() => {
    const token = localStorage.getItem("zfc-admin-token");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex h-full min-h-screen bg-zinc-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col pl-60">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto pt-14">
          {children}
        </main>
      </div>
    </div>
  );
}
