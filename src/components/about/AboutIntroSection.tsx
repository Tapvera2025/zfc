import Image from "next/image";

interface AboutIntroSectionProps {
  heading?: string;
  body?: string;
}

const DEFAULT_HEADING = "ZF Canada - Trusted Canada Visa Consultants Since 1992";

const DEFAULT_BODY = [
  "ZF Canada is a go-to Canada Visa Consultant that guides individuals, families, and businesses through the Canadian immigration process. Since 1992, they've provided expert advice and personal assistance to folks all over the world.",
  "The company is led by Sufian Ahmed (RCIC-IRB) along with a team of pros who give reliable advice and custom immigration plans. Sufian is an active member of the College of Immigration and Citizenship Consultants (CICC), which is the main regulator for immigration consultants in Canada.",
  "With a lot of experience under their belts, the ZF Canada team is known for giving honest advice and stellar service. They stay up-to-date on Canadian immigration laws to help their clients accurately and efficiently.",
  "Integrity, transparency, and putting clients first are key at ZF Canada. Because of these values, they're seen as a top choice for those looking for help with immigration. When it comes to refused or complicated applications, ZF Canada steps in to help. If your application was rejected, the team can evaluate your situation, discuss your choices, and guide you toward reaching your immigration goals in Canada.",
].join("\n\n");

export default function AboutIntroSection({
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
}: AboutIntroSectionProps) {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="zfc-about-intro" aria-labelledby="about-intro-heading">
      <div className="zfc-about-intro__inner">
        <div className="zfc-about-intro__lead-col">
          <div className="zfc-about-intro__badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            WHO WE ARE
          </div>

          <h2 className="zfc-about-intro__heading" id="about-intro-heading">
            {heading}
          </h2>

          <div className="zfc-about-intro__media">
            <Image
              src="/assets/about-company-consultation.webp"
              alt="Canadian visa consultation with a ZF Canada advisor"
              fill
              sizes="(max-width: 900px) calc(100vw - 48px), 38vw"
              className="zfc-about-intro__photo"
              priority
            />
          </div>
        </div>

        <div className="zfc-about-intro__content-col">
          {paragraphs.map((paragraph) => (
            <p className="zfc-about-intro__body" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
