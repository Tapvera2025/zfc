import Image from "next/image";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import Footer from "@/components/home/Footer";
import type { CountryDatum, LocationPageProfile, TrendDatum } from "@/lib/location-page-data";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-CA").format(value);
}

function BarChart({ data, title }: { data: CountryDatum[]; title: string }) {
  const width = 583;
  const height = 328;
  const pad = { top: 42, right: 10, bottom: 36, left: 52 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.max(...data.map((item) => item.value));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round((max * ratio) / 1000) * 1000);
  const barSlot = chartW / data.length;

  return (
    <svg className="zfc-city-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
      <rect width={width} height={height} rx="18" fill="#edf3f2" />
      <circle cx="188" cy="22" r="6" fill="#403b58" />
      <text x="204" y="27" fontSize="14" fill="#111111" fontFamily="serif">{title}</text>
      {ticks.map((tick) => {
        const y = pad.top + chartH - (tick / max) * chartH;
        return (
          <g key={tick}>
            <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="#d7dddc" />
            <text x={pad.left - 10} y={y + 4} textAnchor="end" fontSize="13" fill="#111111" fontFamily="serif">
              {tick}
            </text>
          </g>
        );
      })}
      {data.map((item, index) => {
        const barW = Math.min(50, barSlot * 0.78);
        const x = pad.left + index * barSlot + (barSlot - barW) / 2;
        const barH = (item.value / max) * chartH;
        const y = pad.top + chartH - barH;
        return (
          <g key={item.country}>
            <rect x={x} y={y} width={barW} height={barH} rx="5" fill="#403b58" />
            <text x={x + barW / 2} y={y + 18} textAnchor="middle" fontSize="11" fill="#ffffff" fontFamily="serif">
              {formatNumber(item.value)}
            </text>
            <text x={x + barW / 2} y={height - 14} textAnchor="middle" fontSize="12" fill="#111111" fontFamily="serif">
              {item.country.length > 10 ? `${item.country.slice(0, 9)}.` : item.country}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TrendChart({ data, title }: { data: TrendDatum[]; title: string }) {
  const width = 582;
  const height = 328;
  const pad = { top: 44, right: 12, bottom: 40, left: 58 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.max(...data.map((item) => item.value));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round((max * ratio) / 1000) * 1000);
  const barSlot = chartW / data.length;
  const points = data.map((item, index) => ({
    x: pad.left + index * barSlot + barSlot / 2,
    y: pad.top + chartH - (item.value / max) * chartH,
  }));
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <svg className="zfc-city-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
      <rect width={width} height={height} rx="18" fill="#edf3f2" />
      <circle cx="204" cy="22" r="6" fill="#403b58" />
      <text x="220" y="27" fontSize="14" fill="#111111" fontFamily="serif">{title}</text>
      {ticks.map((tick) => {
        const y = pad.top + chartH - (tick / max) * chartH;
        return (
          <g key={tick}>
            <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="#d7dddc" />
            <text x={pad.left - 10} y={y + 4} textAnchor="end" fontSize="13" fill="#111111" fontFamily="serif">
              {tick}
            </text>
          </g>
        );
      })}
      {data.map((item, index) => {
        const barW = Math.min(68, barSlot * 0.72);
        const x = pad.left + index * barSlot + (barSlot - barW) / 2;
        const barH = (item.value / max) * chartH;
        const y = pad.top + chartH - barH;
        return (
          <g key={item.period}>
            <rect x={x} y={y} width={barW} height={barH} rx="5" fill="#403b58" />
            <text x={x + barW / 2} y={y + 18} textAnchor="middle" fontSize="11" fill="#ffffff" fontFamily="serif">
              {formatNumber(item.value)}
            </text>
            <text x={x + barW / 2} y={height - 18} textAnchor="middle" fontSize="11" fill="#111111" fontFamily="serif">
              {item.period.replace(" to ", "-").replace("Before ", "Pre ")}
            </text>
          </g>
        );
      })}
      <path d={path} fill="none" stroke="#d52027" strokeWidth="2" />
    </svg>
  );
}

function getBody(profile: LocationPageProfile) {
  const immigrantShare = Math.round((profile.immigrants / profile.population) * 100);

  return [
    `${profile.city} is an important Ontario destination for newcomers, families, international students, workers, and businesses planning their next step in Canada. The local population of ${formatNumber(profile.population)} includes an estimated ${formatNumber(profile.immigrants)} immigrants, giving ${profile.regionLabel} an immigrant share of about ${immigrantShare}%.`,
    `ZF Canada supports clients in ${profile.city} with practical, reliable immigration guidance for permanent residence, temporary residence, family sponsorship, study permits, work permits, visitor visas, inadmissibility concerns, and refused applications. Our team helps clients understand eligibility, prepare documentation, and avoid mistakes that can delay or weaken an application.`,
    `The charts below summarize a custom local immigration snapshot for ${profile.city}. They combine census-style community indicators with the most common immigrant source-country patterns seen across Ontario municipalities, helping visitors quickly understand the area's newcomer profile and immigration demand.`,
    `Whether you are already living in ${profile.city}, moving from another Ontario community, or applying from outside Canada, our consultants can help map the right pathway and next steps for your situation. We focus on clear advice, transparent communication, and complete application preparation from start to finish.`,
  ];
}

export default function LocationCityPage({ profile }: { profile: LocationPageProfile }) {
  const body = getBody(profile);

  return (
    <div className="zfc-location-page">
      <ServicesPageHeader activePage="" />

      <main>
        <section className="zfc-location-intro" aria-label={`Immigration consultants serving ${profile.city}`}>
          <div className="zfc-location-intro__inner">
            <Image
              src="/assets/location-maple-leaf.png"
              alt=""
              width={238}
              height={223}
              className="zfc-location-intro__leaf"
              priority
            />
            <h1 className="zfc-location-intro__title">
              Immigration Consultants Serving {profile.city}
            </h1>
            <div className="zfc-location-intro__body">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="zfc-location-charts" aria-label={`${profile.city} immigration charts`}>
          <div className="zfc-location-charts__inner">
            <BarChart
              data={profile.countries}
              title={`Top Immigrant Birth Countries in ${profile.city}`}
            />
            <TrendChart
              data={profile.trends}
              title={`${profile.city} Immigration by Arrival Period`}
            />
          </div>
        </section>

        <section className="zfc-location-map" aria-label="ZF Canada office map">
          <div className="zfc-location-map__inner">
            <div className="zfc-location-map__frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.043738043738!2d-79.6487!3d43.5813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b47a4e8dcbb3d%3A0x96d7e5f62bc8c5d2!2s808%20Britannia%20Rd%20W%20%23214%2C%20Mississauga%2C%20ON%20L5V%200A7!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
                title="ZF Canada Immigration Consultants location"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="zfc-location-contact" aria-label="Contact details">
          <div className="zfc-location-contact__inner">
            <article className="zfc-location-contact__item">
              <Image src="/assets/location-phone-icon.png" alt="" width={62} height={62} />
              <div>
                <h2>Call</h2>
                <a href="tel:+19058585589">+1 (905) 858-5589</a>
              </div>
            </article>
            <article className="zfc-location-contact__item">
              <Image src="/assets/location-email-icon.png" alt="" width={63} height={62} />
              <div>
                <h2>Email</h2>
                <a href="mailto:info@zfcanada.com">info@zfcanada.com</a>
              </div>
            </article>
            <article className="zfc-location-contact__item">
              <Image src="/assets/location-map-icon.png" alt="" width={62} height={62} />
              <div>
                <h2>Location</h2>
                <p>214-808 Britannia Rd W,<br />Mississauga, ON L5V 0A7,<br />Canada</p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
