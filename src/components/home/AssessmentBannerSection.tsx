import Image from "next/image";
import Link from "next/link";

type WhyCard = {
  title: string;
  body: string;
};

const WHY_CARDS: WhyCard[] = [
  {
    title: "CICC Licensed",
    body: "We are a Licensed Immigration Consultant Canada, authorized by the College of Immigration and Citizenship Consultants (CICC - formerly ICCRC), allowing us to represent clients before Immigration, Refugees and Citizenship Canada (IRCC).",
  },
  {
    title: "Advice You Can Trust",
    body: "Experienced and knowledgeable Immigration Consultant in Canada with more than a decade of combined expertise.",
  },
  {
    title: "Proven Success",
    body: "We've helped hundreds of clients from 35+ countries with our trusted Canada Visa Consultant Canada services.",
  },
  {
    title: "No Hassle Service",
    body: "We leverage technology for a simple and hassle-free experience.",
  },
  {
    title: "Speak Different Languages",
    body: "We speak different languages like English, Urdu, Hindi, Punjabi, BENGALI.",
  },
];

interface AssessmentBannerProps {
  heading?: string;
  cards?: WhyCard[];
}

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.7 2.3 2.6 10.7c-.7.3-.7 1.3.1 1.5l7 2.1 2.1 7c.2.8 1.2.8 1.5.1l8.4-19.1Z" fill="currentColor" />
    </svg>
  );
}

function HeadingLines({ heading }: { heading: string }) {
  if (heading === "Why choose ZF Canada Immigration for a Visa Application") {
    return (
      <>
        <span>Why choose ZF Canada</span>
        <span>Immigration for a Visa Application</span>
      </>
    );
  }

  return <span>{heading}</span>;
}

export default function AssessmentBannerSection({ heading, cards }: AssessmentBannerProps) {
  const resolvedHeading = heading ?? "Why choose ZF Canada Immigration for a Visa Application";
  const resolvedCards = cards?.length ? cards.slice(0, 5) : WHY_CARDS;

  return (
    <section id="why-choose-zf" className="zfc-assess" aria-label="Why choose ZF Canada Immigration">
      <div className="zfc-assess__inner">
        <div className="zfc-assess__header">
          <div className="zfc-assess__badge">
            <PaperPlaneIcon />
            WHO WE ARE ?
          </div>

          <h2 className="zfc-assess__heading">
            <HeadingLines heading={resolvedHeading} />
          </h2>
        </div>

        <div className="zfc-assess__timeline">
          <Image
            src="/assets/why-choose-vector.png"
            alt=""
            fill
            sizes="100vw"
            className="zfc-assess__vector"
            priority={false}
          />

          {resolvedCards.map((card, index) => (
            <article
              className={`zfc-assess__item zfc-assess__item--${index + 1}`}
              key={card.title}
            >
              <h3 className="zfc-assess__item-title">{card.title}</h3>
              <p className="zfc-assess__item-body">{card.body}</p>
            </article>
          ))}
        </div>

        <Link href="/free-assessment" className="zfc-assess__cta">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M14.9 8.5 3.1 15.2V1.8l11.8 6.7Z" fill="currentColor" />
          </svg>
          SPEAK WITH OUR EXPERTS
        </Link>
      </div>
    </section>
  );
}
