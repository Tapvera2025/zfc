"use client";

import { cn } from "@/lib/cn";

type BadgeVariant =
  | "published"
  | "draft"
  | "archived"
  | "new"
  | "read"
  | "high"
  | "medium"
  | "low"
  | "default";

const variantClasses: Record<BadgeVariant, string> = {
  published: "bg-green-50 text-green-700 border border-green-200",
  draft:     "bg-yellow-50 text-yellow-700 border border-yellow-200",
  archived:  "bg-zinc-100 text-zinc-500 border border-zinc-200",
  new:       "bg-red-50 text-red-700 border border-red-200",
  read:      "bg-zinc-100 text-zinc-500 border border-zinc-200",
  high:      "bg-red-50 text-red-700 border border-red-200",
  medium:    "bg-yellow-50 text-yellow-700 border border-yellow-200",
  low:       "bg-zinc-100 text-zinc-600 border border-zinc-200",
  default:   "bg-zinc-100 text-zinc-600 border border-zinc-200",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SEOScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "text-green-600" :
    score >= 60 ? "text-yellow-600" :
    "text-red-600";
  const bg =
    score >= 80 ? "bg-green-50 border-green-200" :
    score >= 60 ? "bg-yellow-50 border-yellow-200" :
    "bg-red-50 border-red-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold border",
        bg,
        color
      )}
    >
      {score}
    </span>
  );
}
