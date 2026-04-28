import type { ClassValue } from "@/types/class-value";

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
