/**
 * Page Content Store — file-backed CMS for editable page content.
 * Content is saved to  data/pages/<slug>.json  and survives server restarts.
 * Each page has a typed schema; the store handles reads/writes generically.
 */

import fs   from "fs";
import path from "path";

// ── Storage path ────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data", "pages");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function filePath(slug: string) {
  return path.join(DATA_DIR, `${slug}.json`);
}

// ── Default content for every page ─────────────────────────────────────────

export const PAGE_DEFAULTS: Record<string, unknown> = {

  home: {
    hero: {
      title: "We Speak for You.\nWe Make the Law Work for You.",
      subtitle: "Regulated Canadian Immigration Consultants helping families, students, workers and businesses navigate Canada's immigration system.",
      ctaText: "Get Free Consultation",
      ctaHref: "/free-assessment",
    },
    about: {
      heading: "About ZF Canada",
      body: "ZF Canada Immigration Consultants is a full-service immigration firm based in Mississauga, Ontario. Our team of Regulated Canadian Immigration Consultants (RCICs) has helped thousands of clients achieve their Canadian immigration goals.",
      highlight: "Trusted by thousands of immigrants across Canada.",
    },
    stats: [
      { label: "Years of Experience", value: "15+" },
      { label: "Successful Cases",    value: "5,000+" },
      { label: "Countries Served",    value: "80+" },
      { label: "Success Rate",        value: "97%" },
    ],
    whyUs: {
      heading: "Why Choose ZF Canada?",
      points: [
        "Regulated Canadian Immigration Consultants (RCIC) — licensed and accountable.",
        "Personalized service with transparent, honest advice on every case.",
        "Comprehensive expertise covering all immigration pathways.",
        "Proven track record with thousands of successful applications.",
      ],
    },
  },

  about: {
    hero: {
      title: "About Us",
      breadcrumb: "About",
    },
    intro: {
      heading: "ZF Canada Immigration Consultants",
      body: "ZF Canada is a full-service immigration consulting firm based in Mississauga, Ontario. We are Regulated Canadian Immigration Consultants (RCICs) licensed by the College of Immigration and Citizenship Consultants (CICC). Our mission is simple: to make your immigration journey as smooth, transparent, and successful as possible.",
    },
    mission: {
      heading: "Our Mission",
      body: "We believe every client deserves personalized attention, honest advice, and dedicated advocacy. We stand beside our clients every step of the way — from the initial consultation through to the final decision on their application.",
    },
    vision: {
      heading: "Our Vision",
      body: "To be Canada's most trusted immigration consultancy by providing expert, ethical, and compassionate service to every client, regardless of their background or circumstances.",
    },
  },

  "our-client": {
    hero: {
      title: "Our Client",
      breadcrumb: "Our Client",
    },
    intro: {
      heading: "Our Client",
      paragraphs: [
        "Our clients include all types of prospective immigrants to Canada. We've served foreign skilled workers, students, refugees, entrepreneurs and most of all – businesses of all sizes (who seek us out for solutions to immigration issues related to human resources).",
        "In today's global market, borders no longer bind enterprises, and to remain competitive they must be able to relocate skilled professionals from abroad, quickly and efficiently. With a thorough knowledge of all government programs currently available to facilitate the entry of foreign workers, we focus on achieving this goal. We advise corporate clients on a broad spectrum of issues; from obtaining temporary employment authorizations for foreign workers and compliance that both protect the employers interests and are sensitive to the particular concerns of recently arrived employees. Our mission is to unite corporate clients with the skilled foreign professionals they require.",
      ],
    },
  },

  toronto: {
    hero: {
      title: "Immigration Consultants Serving Toronto",
      breadcrumb: "Toronto",
    },
    content: {
      title: "Immigration Consultants Serving Toronto",
      paragraphs: [
        "Toronto is Canada's largest city and one of the most multicultural urban centres in the world. With over half of its residents born outside Canada, Toronto has long been the destination of choice for immigrants seeking opportunity, safety, and a better quality of life. At ZF Canada Immigration Consultants, we are proud to serve the vibrant and diverse communities of Toronto and the Greater Toronto Area (GTA).",
        "Our team of experienced Regulated Canadian Immigration Consultants (RCICs) provides comprehensive immigration services tailored to the unique needs of Toronto residents and newcomers. Whether you are a skilled worker seeking permanent residency, a student planning to study at one of Toronto's world-class institutions, a business owner looking to bring skilled professionals from abroad, or a family hoping to reunite with loved ones, we have the expertise to guide you through every step of the Canadian immigration process.",
        "Toronto continues to attract hundreds of thousands of immigrants each year, drawn by its robust economy, world-class healthcare, excellent education system, and unparalleled cultural diversity. The city is home to immigrants from more than 200 countries, speaking over 140 languages. This incredible diversity has become Toronto's greatest strength — fueling innovation, entrepreneurship, and economic growth across every sector.",
        "We understand that navigating Canada's complex immigration system can be daunting. Immigration rules and policies change frequently, and mistakes in applications can lead to costly delays or refusals. That is why working with an experienced RCIC is essential. Our consultants stay up to date with the latest policy changes, program requirements, and processing times to ensure your application is as strong as possible.",
        "From Express Entry and Provincial Nominee Programs (PNP) to study permits, work permits, visitor visas, family sponsorship, and refugee claims — ZF Canada offers the full spectrum of Canadian immigration services to clients in Toronto and across the GTA. We also assist businesses of all sizes in navigating corporate immigration needs, including Labour Market Impact Assessments (LMIAs) and intra-company transfers.",
        "Our mission is simple: to make your immigration journey as smooth, transparent, and successful as possible. We believe every client deserves personalized attention, honest advice, and dedicated advocacy. Contact us today to schedule a free consultation and take the first step toward your Canadian dream.",
      ],
    },
    contact: {
      phone: "+1 (905) 858-5589",
      email: "info@zfcanada.com",
      address: "214-808 Britannia Rd W,\nMississauga, ON L5V 0A7",
    },
  },

  "free-assessment": {
    hero: {
      title: "Free Assessment",
      breadcrumb: "Free Assessment",
    },
    intro: {
      heading: "Start Your Free Immigration Assessment",
      body: "Fill out the form below and one of our Regulated Canadian Immigration Consultants will review your information and contact you within 1–2 business days.",
    },
    submitButtonText: "Submit Assessment",
  },

  services: {
    hero: {
      title: "Our Services",
      breadcrumb: "Services",
    },
    intro: {
      heading: "Comprehensive Canadian Immigration Services",
      body: "ZF Canada offers a full range of immigration services for individuals, families, and businesses. Our RCICs have the expertise to handle even the most complex cases.",
    },
  },
};

// ── In-memory cache ─────────────────────────────────────────────────────────

const cache: Record<string, unknown> = {};

// ── Public API ──────────────────────────────────────────────────────────────

export function getPageContent(slug: string): unknown {
  if (cache[slug] !== undefined) return cache[slug];

  ensureDir();
  const fp = filePath(slug);

  if (!fs.existsSync(fp)) {
    // Seed default content
    const defaults = PAGE_DEFAULTS[slug] ?? {};
    fs.writeFileSync(fp, JSON.stringify(defaults, null, 2), "utf8");
    cache[slug] = defaults;
    return defaults;
  }

  try {
    const raw = fs.readFileSync(fp, "utf8");
    cache[slug] = JSON.parse(raw);
  } catch {
    cache[slug] = PAGE_DEFAULTS[slug] ?? {};
  }
  return cache[slug];
}

export function setPageContent(slug: string, content: unknown): void {
  ensureDir();
  const fp = filePath(slug);
  fs.writeFileSync(fp, JSON.stringify(content, null, 2), "utf8");
  cache[slug] = content; // update cache
}

export function listPages(): { slug: string; label: string }[] {
  return [
    { slug: "home",            label: "Home Page"           },
    { slug: "about",           label: "About Us"            },
    { slug: "services",        label: "Services"            },
    { slug: "our-client",      label: "Our Client"          },
    { slug: "toronto",         label: "Toronto (Immigration Consultants)" },
    { slug: "free-assessment", label: "Free Assessment"     },
  ];
}
