import Link from "next/link";
import { HOME_ABOUT_BODY, HOME_ABOUT_HEADING } from "@/lib/home-about-content";

interface AboutSectionProps {
  heading?: string;
  body?: string;
}

export default function AboutSection({
  heading = HOME_ABOUT_HEADING,
  body = HOME_ABOUT_BODY,
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
    <section className="zfc-about" aria-label="Top rated immigration consultants Canada">
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
