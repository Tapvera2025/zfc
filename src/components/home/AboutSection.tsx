import Image from "next/image";
import Link from "next/link";

const features = [
  { label: "Expert Knowledge" },
  { label: "Transparent Advice" },
  { label: "Higher Success Rate" },
  { label: "End-to-End Support" },
  { label: "Personalized Guidance" },
  { label: "Global Expertise" },
];

/** Red double-chevron >> icon extracted from Group_16.svg */
const DoubleChevron = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="zfc-about__chevron"
  >
    <path
      d="M1.988 0.391C1.44 -0.131 0.55 -0.131 0 0.391C-0.548 0.913 -0.548 1.759 0 2.282L4.968 7.008L0 11.733C-0.548 12.255 -0.548 13.101 0 13.624C0.55 14.146 1.44 14.146 1.988 13.624L6.956 8.898C8.054 7.854 8.054 6.162 6.956 5.117L1.988 0.391Z"
      fill="#cc1f1f"
    />
    <path
      d="M9.268 0.391C8.72 -0.131 7.83 -0.131 7.281 0.391C6.732 0.913 6.732 1.759 7.281 2.282L12.249 7.008L7.281 11.733C6.732 12.255 6.732 13.101 7.281 13.624C7.83 14.146 8.72 14.146 9.268 13.624L14.236 8.898C15.334 7.854 15.334 6.162 14.236 5.117L9.268 0.391Z"
      fill="#cc1f1f"
    />
  </svg>
);

export default function AboutSection() {
  return (
    <section className="zfc-about" aria-label="About ZF Canada">
      <div className="zfc-about__inner">
        {/* ── Left: portrait photo ── */}
        <div className="zfc-about__photo-wrap">
          <Image
            src="/assets/services-photo.png"
            alt="Happy ZF Canada immigration clients at the airport"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* ── Right: content ── */}
        <div className="zfc-about__content">
          {/* Badge */}
          <div className="zfc-about__badge-row">
            <span className="zfc-about__badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
              ABOUT US
            </span>
          </div>

          {/* Heading */}
          <h2 className="zfc-about__heading">
            We help Making Your<br />Dream Into Reality
          </h2>

          {/* Body */}
          <p className="zfc-about__body">
            ZF Canada is a leading immigration consultancy firm in Canada,
            dedicated to providing professional and reliable pathways to Canada.
            Established in 1992, we bring over 25 years of experience as a
            Licensed Immigration Consultant Canada, helping clients achieve their
            immigration goals successfully.
          </p>

          {/* Features box */}
          <div className="zfc-about__features">
            {features.map((f) => (
              <div key={f.label} className="zfc-about__feature-item">
                <DoubleChevron />
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href="/about" className="zfc-about__cta">
            {/* Info circle icon */}
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
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
