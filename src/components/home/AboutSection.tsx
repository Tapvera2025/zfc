import Link from "next/link";

const DEFAULT_HEADING = "Top Rated Immigration Consultants Canada for Trusted Visa & PR Services";

const DEFAULT_BODY = `ZF Canada is a leading immigration consultancy firm in Canada, dedicated to providing professional and reliable pathways to Canada. Established in 1992, we bring over 25 years of experience as a Licensed Immigration Consultant Canada, helping clients achieve their immigration goals successfully.
Under the leadership of Sufian Ahmed (RCIC-IRB) - a trusted Immigration Consultant in Canada in good standing with the College of Immigration and Citizenship Consultants (CICC) - our team has grown into one of the Best Immigration Agency Canada.
We are widely recognized as a reliable Canada Visa Consultant Canada, offering expert advice, personalized representation, and a high success rate. Our clients trust us for honest and ethical services across multiple immigration pathways, including:
• Express Entry Consultant Canada services
• Family Sponsorship (including Spousal Sponsorship in Canada)
• Study Permit Consultant Canada guidance
• Super Visa & Temporary Visa
• Work Permit Consultant Canada solutions
• LMIA & PNP Applications
• Canadian Citizenship
At ZF Canada, we strictly follow professional codes of conduct. Every step of the way, we remain honest, pragmatic, efficient, consistent, unbiased, and genuine. This commitment sets us apart as a Licensed Immigration Consultant Canada.`;

interface AboutSectionProps {
  heading?: string;
  body?: string;
}

export default function AboutSection({
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
}: AboutSectionProps) {
  const lines = body.split("\n").filter((l) => l.trim() !== "");

  type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };
  const blocks: Block[] = [];

  for (const line of lines) {
    if (line.startsWith("• ")) {
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") {
        last.items.push(line.slice(2));
      } else {
        blocks.push({ type: "ul", items: [line.slice(2)] });
      }
    } else {
      blocks.push({ type: "p", text: line });
    }
  }

  return (
    <section className="zfc-about" aria-label="About ZF Canada">
      <div className="zfc-about__inner">
        {/* ── Left: video ── */}
        <div className="zfc-about__photo-wrap">
          <video
            className="zfc-about__video"
            poster="/assets/about-zfc-video-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Know more about ZF Canada"
          >
            <source src="/assets/about-zfc-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── Right: content ── */}
        <div className="zfc-about__content">
          <h2 className="zfc-about__heading">{heading}</h2>

          <div className="zfc-about__body">
            {blocks.map((block, i) =>
              block.type === "ul" ? (
                <ul key={i}>
                  {block.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              ) : (
                <p key={i}>{block.text}</p>
              )
            )}
          </div>

          <Link href="/free-assessment" className="zfc-about__cta">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <path d="M0 0L14 8L0 16V0Z" />
            </svg>
            START YOUR IMMIGRATION JOURNEY
          </Link>
        </div>
      </div>
    </section>
  );
}
