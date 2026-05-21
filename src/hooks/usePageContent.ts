"use client";

import { useEffect, useState } from "react";
import type { PAGE_DEFAULTS } from "@/lib/page-content-store";

type Defaults = typeof PAGE_DEFAULTS;
type PageKey  = keyof Defaults;

/**
 * Fetches editable page content from /api/content/[slug].
 * Falls back to the provided defaults while loading or on error.
 */
export function usePageContent<T extends Record<string, unknown>>(
  slug: PageKey | string,
  defaults: T
): T {
  const [content, setContent] = useState<T>(defaults);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/content/${slug}`)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled && json.success && json.data) {
          // Deep merge so missing keys fall back to defaults
          setContent(deepMerge(defaults, json.data as T) as T);
        }
      })
      .catch(() => {/* keep defaults on error */});
    return () => { cancelled = true; };
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  return content;
}

/** Recursively merge b into a (a = defaults, b = saved content) */
function deepMerge<T>(a: T, b: Partial<T>): T {
  if (!b || typeof b !== "object" || Array.isArray(b)) return (b ?? a) as T;
  const result = { ...a };
  for (const key of Object.keys(b) as (keyof T)[]) {
    const av = a[key];
    const bv = b[key];
    if (bv !== undefined && bv !== null) {
      if (typeof av === "object" && !Array.isArray(av) && typeof bv === "object" && !Array.isArray(bv)) {
        result[key] = deepMerge(av, bv as Partial<typeof av>);
      } else {
        result[key] = bv as typeof av;
      }
    }
  }
  return result;
}
