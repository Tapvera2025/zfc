import Image from "next/image";
import Link from "next/link";

type WhyCard = {
  title: string;
  body: string;
  icon: "cicc" | "advice" | "success" | "clock" | "language";
};

const ICON_ORDER: WhyCard["icon"][] = ["cicc", "advice", "success", "clock", "language"];

const WHY_CARDS: WhyCard[] = [
  {
    title: "CICC Licensed",
    body: "We are a Licensed Immigration Consultant Canada, authorized by the College of Immigration and Citizenship Consultants (CICC - formerly ICCRC), allowing us to represent clients before Immigration, Refugees and Citizenship Canada (IRCC).",
    icon: "cicc",
  },
  {
    title: "Advice You Can Trust",
    body: "Experienced and knowledgeable Immigration Consultant in Canada with more than a decade of combined expertise.",
    icon: "advice",
  },
  {
    title: "Proven Success",
    body: "We've helped hundreds of clients from 35+ countries with our trusted Canada Visa Consultant Canada services.",
    icon: "success",
  },
  {
    title: "No Hassle Service",
    body: "We leverage technology for a simple and hassle-free experience.",
    icon: "clock",
  },
  {
    title: "Speak Different Languages",
    body: "We speak different languages like English, Urdu, Hindi, Punjabi, BENGALI.",
    icon: "language",
  },
];

interface AssessmentBannerProps {
  heading?: string;
  cards?: { title: string; body: string }[];
}

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.7 2.3 2.6 10.7c-.7.3-.7 1.3.1 1.5l7 2.1 2.1 7c.2.8 1.2.8 1.5.1l8.4-19.1Z" fill="currentColor" />
    </svg>
  );
}

function CiccIcon() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className="zfc-assess__inline-icon">
      <circle cx="22" cy="22" r="16" fill="#fff8d8" stroke="#25365d" strokeWidth="2" />
      <path d="M8.8 21.8c3.4-4.1 7.8-5.7 13.3-4.8 3.5.6 6.5-.5 9.2-3.3" fill="none" stroke="#22a8c7" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13.2 10.9c.6 2.3 1.6 4.1 3.1 5.3 1.2 1 1.8 2.1 1.7 3.4-.1 1.7-1.4 3-3.9 4l-4.1 1.5" fill="none" stroke="#db3d78" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M26.4 8.6c-1.2 3.3-1.2 6.1.1 8.5.9 1.8.5 3.5-1.2 5l-4.1 3.8c-1.6 1.5-1.9 3.4-.8 5.6l2 4" fill="none" stroke="#f2b438" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M34.4 24.4c-2.5.4-4.1 1.4-4.8 2.9-.7 1.7-.3 3.5 1.3 5.4" fill="none" stroke="#db3d78" strokeWidth="2.1" strokeLinecap="round" />
      <path d="m24.5 23.5 2.6 2.6 6-7" fill="none" stroke="#25365d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className="zfc-assess__inline-icon">
      <path d="M7 11.5c0-3 2.5-5.5 5.5-5.5h13c3 0 5.5 2.5 5.5 5.5v8c0 3-2.5 5.5-5.5 5.5H18l-7 5v-5.3c-2.3-.7-4-2.9-4-5.4v-7.8Z" fill="#2ea8ff" />
      <path d="M16 20.5c0-2.7 2.2-4.8 4.8-4.8h10.7c2.7 0 4.8 2.2 4.8 4.8v6.8c0 2.7-2.2 4.8-4.8 4.8h-5.7l-6.1 4.4v-4.7c-2.1-.6-3.7-2.5-3.7-4.8v-6.5Z" fill="#2abf93" />
      <path d="M12.3 18.3h8.2M16.4 12.6v10.3M11.9 22.9c3.9-2.2 6.2-5.2 7-9" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m25.1 28.5 3.4-7.8 3.4 7.8M26.3 26.1h5" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon({ icon }: { icon: WhyCard["icon"] }) {
  if (icon === "advice") {
    return (
      <Image
        src="/assets/why-advice.png"
        alt=""
        width={29}
        height={30}
        className="zfc-assess__icon-img zfc-assess__icon-img--advice"
      />
    );
  }

  if (icon === "success") {
    return (
      <Image
        src="/assets/why-success.png"
        alt=""
        width={32}
        height={25}
        className="zfc-assess__icon-img zfc-assess__icon-img--success"
      />
    );
  }

  if (icon === "clock") {
    return (
      <Image
        src="/assets/why-clock.png"
        alt=""
        width={31}
        height={31}
        className="zfc-assess__icon-img"
      />
    );
  }

  if (icon === "language") return <LanguageIcon />;
  return <CiccIcon />;
}

export default function AssessmentBannerSection({ heading, cards }: AssessmentBannerProps) {
  const resolvedHeading = heading ?? "Why choose ZF Canada Immigration for a Visa Application";
  const resolvedCards: WhyCard[] = cards
    ? cards.map((c, i) => ({ title: c.title, body: c.body, icon: ICON_ORDER[i] ?? "cicc" }))
    : WHY_CARDS;

  return (
    <section id="why-choose-zf" className="zfc-assess" aria-label="Why choose ZF Canada Immigration">
      <div className="zfc-assess__bg" aria-hidden="true">
        <Image
          src="/assets/visa-approved-banner.png"
          alt=""
          fill
          sizes="100vw"
          className="zfc-assess__bg-img"
          priority={false}
        />
      </div>

      <div className="zfc-assess__inner">
        <div className="zfc-assess__header">
          <div className="zfc-assess__badge">
            <PaperPlaneIcon />
            WHO WE ARE ?
          </div>

          <h2 className="zfc-assess__heading">
            {resolvedHeading}
          </h2>
        </div>

        <div className="zfc-assess__grid">
          {resolvedCards.map((card) => (
            <article className="zfc-assess__card" key={card.title}>
              <div className="zfc-assess__icon-tile">
                <CardIcon icon={card.icon} />
              </div>
              <h3 className="zfc-assess__card-title">{card.title}</h3>
              <p className="zfc-assess__card-body">{card.body}</p>
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
