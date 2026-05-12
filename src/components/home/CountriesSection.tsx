import Image from "next/image";
import Link from "next/link";

const topCountries = [
  { name: "India",      flag: "/assets/flag-india.png" },
  { name: "Bangladesh", flag: "/assets/flag-bangladesh.png" },
  { name: "Sri Lanka",  flag: "/assets/flag-srilanka.png" },
  { name: "Pakistan",   flag: "/assets/flag-pakistan.png" },
];

const bottomCountries = [
  { name: "Saudi Arabia", flag: "/assets/flag-saudi.png" },
  { name: "Kuwait",       flag: "/assets/flag-kuwait.png" },
  { name: "Oman",         flag: "/assets/flag-oman.png" },
];

export default function CountriesSection() {
  return (
    <section className="zfc-countries" aria-label="Countries we offer immigration services">
      <div className="zfc-countries__inner">

        {/* Left: badge + heading + body */}
        <div className="zfc-countries__left">
          <div className="zfc-countries__badge-row">
            <span className="zfc-countries__badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
              COUNTRIES WE OFFER
            </span>
          </div>

          <h2 className="zfc-countries__heading">
            Licensed Canada Immigration<br />
            Consultant serving Applicants<br />
            From Anywhere
          </h2>

          <p className="zfc-countries__body">
            We help you migrate smoothly with expert guidance and tailored
            solutions for your needs.
          </p>
        </div>

        {/* Right: country grid + CTA */}
        <div className="zfc-countries__right">
          <p className="zfc-countries__list-label">Country List:</p>

          {/* Row 1 - circular flags */}
          <div className="zfc-countries__grid">
            {topCountries.map((c) => (
              <div key={c.name} className="zfc-countries__cell">
                <div className="zfc-countries__flag-wrap zfc-countries__flag-wrap--circle">
                  <Image
                    src={c.flag}
                    alt={`Flag of ${c.name}`}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>
                <span className="zfc-countries__name">{c.name}</span>
              </div>
            ))}
          </div>

          {/* Row 2 - rectangular flags + 50+ */}
          <div className="zfc-countries__grid zfc-countries__grid--row2">
            {bottomCountries.map((c) => (
              <div key={c.name} className="zfc-countries__cell">
                <div className="zfc-countries__flag-wrap zfc-countries__flag-wrap--rect">
                  <Image
                    src={c.flag}
                    alt={`Flag of ${c.name}`}
                    fill
                    sizes="110px"
                    className="object-cover object-center"
                  />
                </div>
                <span className="zfc-countries__name">{c.name}</span>
              </div>
            ))}
            <div className="zfc-countries__cell zfc-countries__cell--more">
              <span className="zfc-countries__more-number">50+</span>
              <span className="zfc-countries__name">Other Countries</span>
            </div>
          </div>

          {/* CTA */}
          <Link href="/contact" className="zfc-countries__cta">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Hire Immigration Consultant
          </Link>
        </div>

      </div>
    </section>
  );
}
