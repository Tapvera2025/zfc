"use client";

import Image from "next/image";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import Footer from "@/components/home/Footer";

/* ── Bar chart data ─────────────────────────────────────────── */
const BAR_DATA = [
  { label: "India",       value: 40200 },
  { label: "Philippines", value: 24910 },
  { label: "China",       value: 18530 },
  { label: "Pakistan",    value: 5740  },
  { label: "Iran",        value: 5225  },
  { label: "USA",         value: 5125  },
  { label: "Bangladesh",  value: 4760  },
  { label: "Syria",       value: 4685  },
  { label: "Nigeria",     value: 4535  },
  { label: "Brazil",      value: 4200  },
];

/* ── Line chart data ────────────────────────────────────────── */
const LINE_DATA = [
  { label: "Before\n1980", value: 222685 },
  { label: "1980–\n1990",  value: 156465 },
  { label: "1991–\n2000",  value: 273985 },
  { label: "2001–\n2005",  value: 146690 },
  { label: "2006–\n2010",  value: 143710 },
  { label: "2011–\n2015",  value: 144315 },
  { label: "2016–\n2021",  value: 198045 },
];

/* ── Bar Chart (SVG) ──────────────────────────────────────── */
function BarChart() {
  const W = 480, H = 320;
  const pad = { top: 16, right: 12, bottom: 80, left: 56 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const maxVal = Math.max(...BAR_DATA.map((d) => d.value));
  const barW = chartW / BAR_DATA.length;
  const barPad = barW * 0.28;

  const yTicks = [0, 10000, 20000, 30000, 40000];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart">
      {/* Y axis ticks + grid */}
      {yTicks.map((tick) => {
        const y = pad.top + chartH - (tick / maxVal) * chartH;
        return (
          <g key={tick}>
            <line x1={pad.left} x2={pad.left + chartW} y1={y} y2={y}
              stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 3" />
            <text x={pad.left - 6} y={y + 4} textAnchor="end"
              fontSize="9" fill="#888">
              {tick === 0 ? "0" : `${tick / 1000}k`}
            </text>
          </g>
        );
      })}

      {/* X axis line */}
      <line x1={pad.left} x2={pad.left + chartW}
        y1={pad.top + chartH} y2={pad.top + chartH}
        stroke="#d1d5db" strokeWidth="1.5" />

      {/* Bars */}
      {BAR_DATA.map((d, i) => {
        const barH = (d.value / maxVal) * chartH;
        const x = pad.left + i * barW + barPad / 2;
        const y = pad.top + chartH - barH;
        const bw = barW - barPad;
        const midX = x + bw / 2;

        return (
          <g key={d.label}>
            {/* Bar */}
            <rect x={x} y={y} width={bw} height={barH}
              fill="#cc1f1f" rx="3" opacity="0.92" />
            {/* Value label on top */}
            <text x={midX} y={y - 4} textAnchor="middle"
              fontSize="8" fill="#cc1f1f" fontWeight="700">
              {(d.value / 1000).toFixed(1)}k
            </text>
            {/* X label — two lines */}
            {d.label.split(" ").map((word, wi) => (
              <text key={wi}
                x={midX} y={pad.top + chartH + 14 + wi * 11}
                textAnchor="middle" fontSize="8.5" fill="#555">
                {word}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Line Chart (SVG) ─────────────────────────────────────── */
function LineChart() {
  const W = 480, H = 300;
  const pad = { top: 24, right: 20, bottom: 64, left: 60 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const maxVal = Math.max(...LINE_DATA.map((d) => d.value));
  const minVal = 100000;
  const range = maxVal - minVal;

  const pts = LINE_DATA.map((d, i) => ({
    x: pad.left + (i / (LINE_DATA.length - 1)) * chartW,
    y: pad.top + chartH - ((d.value - minVal) / range) * chartH,
    value: d.value,
    label: d.label,
  }));

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const areaD = [
    `M ${pts[0].x} ${pad.top + chartH}`,
    ...pts.map((p) => `L ${p.x} ${p.y}`),
    `L ${pts[pts.length - 1].x} ${pad.top + chartH}`,
    "Z",
  ].join(" ");

  const yTicks = [100000, 150000, 200000, 250000];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line chart">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cc1f1f" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#cc1f1f" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Y axis ticks + grid */}
      {yTicks.map((tick) => {
        const y = pad.top + chartH - ((tick - minVal) / range) * chartH;
        return (
          <g key={tick}>
            <line x1={pad.left} x2={pad.left + chartW} y1={y} y2={y}
              stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 3" />
            <text x={pad.left - 8} y={y + 4} textAnchor="end"
              fontSize="9" fill="#888">
              {`${tick / 1000}k`}
            </text>
          </g>
        );
      })}

      {/* X axis line */}
      <line x1={pad.left} x2={pad.left + chartW}
        y1={pad.top + chartH} y2={pad.top + chartH}
        stroke="#d1d5db" strokeWidth="1.5" />

      {/* Area fill */}
      <path d={areaD} fill="url(#lineGrad)" />

      {/* Line */}
      <path d={pathD} fill="none" stroke="#cc1f1f" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />

      {/* Data points + labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4.5" fill="#fff" stroke="#cc1f1f" strokeWidth="2.5" />
          {/* Value above point */}
          <text x={p.x} y={p.y - 9} textAnchor="middle"
            fontSize="8" fill="#cc1f1f" fontWeight="700">
            {`${Math.round(p.value / 1000)}k`}
          </text>
          {/* X label — two lines */}
          {p.label.split("\n").map((word, wi) => (
            <text key={wi}
              x={p.x} y={pad.top + chartH + 15 + wi * 11}
              textAnchor="middle" fontSize="8.5" fill="#555">
              {word}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ── Maple Leaf SVG ─────────────────────────────────────── */
function MapleLeaf() {
  return (
    <svg
      className="zfc-tor-maple"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50 5
           C50 5 44 18 38 20
           C32 22 20 16 20 16
           C20 16 26 26 24 32
           C22 38 10 40 10 40
           C10 40 20 46 20 52
           C20 58 14 68 14 68
           C14 68 26 64 32 66
           C38 68 42 80 42 80
           L46 65
           L50 68
           L54 65
           L58 80
           C58 80 62 68 68 66
           C74 64 86 68 86 68
           C86 68 80 58 80 52
           C80 46 90 40 90 40
           C90 40 78 38 76 32
           C74 26 80 16 80 16
           C80 16 68 22 62 20
           C56 18 50 5 50 5Z"
        stroke="#cc1f1f"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="rgba(204,31,31,0.08)"
      />
      <line x1="50" y1="68" x2="50" y2="95" stroke="#cc1f1f" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function TorontoPage() {
  return (
    <div className="zfc-toronto-page">
      <ServicesPageHeader activePage="" />

      {/* Hero */}
      <div className="zfc-about-hero-wrap">
        <section className="zfc-about-hero" aria-label="Toronto hero">
          <div className="zfc-about-hero__bg" aria-hidden="true">
            <Image
              src="/assets/services-hero-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="zfc-about-hero__overlay" aria-hidden="true" />
          <div className="zfc-about-hero__content">
            <h1 className="zfc-about-hero__title">Immigration Consultants Serving Toronto</h1>
            <nav className="zfc-about-hero__breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="zfc-about-hero__breadcrumb-link">Home</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="zfc-about-hero__breadcrumb-current">Toronto</span>
            </nav>
          </div>
        </section>
      </div>

      {/* Main Content — maple leaf + title + body */}
      <section className="zfc-tor-content" aria-label="About Toronto immigration services">
        <div className="zfc-tor-content__inner">
          <MapleLeaf />

          <h2 className="zfc-tor-title">
            Immigration Consultants Serving Toronto
          </h2>

          <div className="zfc-tor-body">
            <p>
              Toronto is Canada's largest city and one of the most multicultural urban centres in the
              world. With over half of its residents born outside Canada, Toronto has long been the
              destination of choice for immigrants seeking opportunity, safety, and a better quality
              of life. At ZF Canada Immigration Consultants, we are proud to serve the vibrant and
              diverse communities of Toronto and the Greater Toronto Area (GTA).
            </p>
            <p>
              Our team of experienced Regulated Canadian Immigration Consultants (RCICs) provides
              comprehensive immigration services tailored to the unique needs of Toronto residents
              and newcomers. Whether you are a skilled worker seeking permanent residency, a student
              planning to study at one of Toronto's world-class institutions, a business owner
              looking to bring skilled professionals from abroad, or a family hoping to reunite with
              loved ones, we have the expertise to guide you through every step of the Canadian
              immigration process.
            </p>
            <p>
              Toronto continues to attract hundreds of thousands of immigrants each year, drawn by
              its robust economy, world-class healthcare, excellent education system, and
              unparalleled cultural diversity. The city is home to immigrants from more than 200
              countries, speaking over 140 languages. This incredible diversity has become Toronto's
              greatest strength — fueling innovation, entrepreneurship, and economic growth across
              every sector.
            </p>
            <p>
              We understand that navigating Canada's complex immigration system can be daunting.
              Immigration rules and policies change frequently, and mistakes in applications can lead
              to costly delays or refusals. That is why working with an experienced RCIC is
              essential. Our consultants stay up to date with the latest policy changes, program
              requirements, and processing times to ensure your application is as strong as possible.
            </p>
            <p>
              From Express Entry and Provincial Nominee Programs (PNP) to study permits, work
              permits, visitor visas, family sponsorship, and refugee claims — ZF Canada offers
              the full spectrum of Canadian immigration services to clients in Toronto and across
              the GTA. We also assist businesses of all sizes in navigating corporate immigration
              needs, including Labour Market Impact Assessments (LMIAs) and intra-company transfers.
            </p>
            <p>
              Our mission is simple: to make your immigration journey as smooth, transparent, and
              successful as possible. We believe every client deserves personalized attention,
              honest advice, and dedicated advocacy. Contact us today to schedule a free consultation
              and take the first step toward your Canadian dream.
            </p>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="zfc-tor-charts" aria-label="Toronto immigration statistics">
        <div className="zfc-tor-charts__inner">
          {/* Bar chart */}
          <div className="zfc-tor-chart-card">
            <h3 className="zfc-tor-chart-card__title">
              Top 10 Countries of Birth Among Immigrants in Toronto (2016–2021)
            </h3>
            <BarChart />
          </div>

          {/* Line chart */}
          <div className="zfc-tor-chart-card">
            <h3 className="zfc-tor-chart-card__title">
              Toronto Immigration Trends (1980–2021)
            </h3>
            <LineChart />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="zfc-tor-map" aria-label="Our location">
        <div className="zfc-tor-map__inner">
          <h2 className="zfc-tor-map__title">Find Us</h2>
          <div className="zfc-tor-map__frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.043738043738!2d-79.6487!3d43.5813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b47a4e8dcbb3d%3A0x96d7e5f62bc8c5d2!2s808%20Britannia%20Rd%20W%20%23214%2C%20Mississauga%2C%20ON%20L5V%200A7!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
              title="ZF Canada Immigration Consultants — Mississauga Office"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="zfc-tor-contact" aria-label="Contact information">
        <div className="zfc-tor-contact__inner">
          {/* Call */}
          <div className="zfc-tor-contact__item">
            <div className="zfc-tor-contact__icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <span className="zfc-tor-contact__label">Call Us</span>
            <span className="zfc-tor-contact__value">
              <a href="tel:+19058585589">+1 (905) 858-5589</a>
            </span>
          </div>

          {/* Email */}
          <div className="zfc-tor-contact__item">
            <div className="zfc-tor-contact__icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <span className="zfc-tor-contact__label">Email Us</span>
            <span className="zfc-tor-contact__value">
              <a href="mailto:info@zfcanada.com">info@zfcanada.com</a>
            </span>
          </div>

          {/* Location */}
          <div className="zfc-tor-contact__item">
            <div className="zfc-tor-contact__icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <span className="zfc-tor-contact__label">Visit Us</span>
            <span className="zfc-tor-contact__value">
              214-808 Britannia Rd W,<br />Mississauga, ON L5V 0A7
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
