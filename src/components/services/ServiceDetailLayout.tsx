import Link from "next/link";

const sidebarServices = [
  { label: "Refused Applications",        href: "/services/refused-applications" },
  { label: "Humanitarian & Compassionate", href: "/services/humanitarian-compassionate" },
  { label: "Inadmissibility",             href: "/services/inadmissibility" },
  { label: "Misrepresentation",           href: "/services/misrepresentation" },
  { label: "Sponsorship",                 href: "/services/sponsorship" },
  { label: "Refugee Claim Application",   href: "/services/refugee-claim" },
  { label: "IRB – Hearing & Appeals",     href: "/services/irb-hearings" },
  { label: "Temporary Residence",         href: "/services/temporary-residence" },
  { label: "PR Card / Citizenship",       href: "/services/pr-card-citizenship" },
  { label: "Permanent Residency",         href: "/services/permanent-residency" },
];

/* Generic document icon — reused for all sidebar items */
const DocIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

interface ServiceDetailLayoutProps {
  activeHref: string;
  children: React.ReactNode;
}

export default function ServiceDetailLayout({ activeHref, children }: ServiceDetailLayoutProps) {
  return (
    <section className="zfc-svc-detail">
      <div className="zfc-svc-detail__inner">

        {/* ── Left sidebar ── */}
        <aside className="zfc-svc-detail__sidebar">
          <ul className="zfc-svc-detail__list">
            {sidebarServices.map((svc) => {
              const isActive = svc.href === activeHref;
              return (
                <li key={svc.href}>
                  <Link
                    href={svc.href}
                    className={`zfc-svc-detail__list-item${isActive ? " zfc-svc-detail__list-item--active" : ""}`}
                  >
                    <span className={`zfc-svc-detail__list-icon${isActive ? " zfc-svc-detail__list-icon--active" : ""}`}>
                      <DocIcon />
                    </span>
                    <span className="zfc-svc-detail__list-label">{svc.label}</span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="zfc-svc-detail__list-chevron"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* ── Right content ── */}
        <div className="zfc-svc-detail__content">
          {children}
        </div>

      </div>
    </section>
  );
}
