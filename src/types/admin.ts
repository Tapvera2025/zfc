// ─── Blog ────────────────────────────────────────────────────────────────────

export type BlogStatus = "draft" | "published" | "archived";

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string | null;
  noindex: boolean;
  nofollow: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  featuredImageAlt: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  views: number;
  seoScore: number;
  seo: BlogSEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Form Submissions ─────────────────────────────────────────────────────────

export type SubmissionStatus = "new" | "read" | "archived";

export interface FormSubmission {
  id: string;
  formType: string;
  sourcePage: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  internalNote: string;
  metadata: {
    browser: string;
    device: string;
    ip: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export type SEOItemType = "blog" | "page";

export interface SEOIssue {
  type: string;
  severity: "high" | "medium" | "low";
  message: string;
}

export interface SEOItem {
  id: string;
  title: string;
  url: string;
  type: SEOItemType;
  status: "published" | "draft";
  score: number;
  issues: SEOIssue[];
  updatedAt: string;
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

export type ActivityType = "blog_edit" | "blog_publish" | "submission" | "seo_warning";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
}

// ─── Admin User ───────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  active: boolean;
}
