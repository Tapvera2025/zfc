import Link from "next/link";

type StepTone = "red" | "navy";

const DEFAULT_STEPS = [
  {
    title: "Choose Your Immigration Program",
    body: "Select the right visa, PR, study permit, work permit, or immigration pathway based on your goals and eligibility.",
  },
  {
    title: "Contact Our Immigration Team",
    body: "Get in touch with ZF Canada to discuss your immigration options and receive professional guidance from our experienced team.",
  },
  {
    title: "Submit Required Documents",
    body: "Provide all necessary documents and information so we can prepare and process your application accurately.",
  },
  {
    title: "Application Processing & Updates",
    body: "Our team will manage your application process and keep you informed with regular updates at every stage.",
  },
  {
    title: "Receive Your Visa Decision",
    body: "Once your application is approved, we will guide you through the next steps for your move to Canada.",
  },
];

const TONES: StepTone[] = ["red", "navy"];

interface VisaStepsSectionProps {
  heading?: string;
  ctaText?: string;
  steps?: { title: string; body: string }[];
}

export default function VisaStepsSection({ heading, ctaText, steps }: VisaStepsSectionProps) {
  const resolvedHeading = heading ?? "Steps to Apply for Your Visa With ZF Canada";
  const resolvedCtaText = ctaText ?? "A REGULATED CANADIAN IMMIGRATION CONSULTANT (RCIC)";
  const resolvedSteps = (steps ?? DEFAULT_STEPS).map((s, i) => ({
    ...s,
    number: String(i + 1).padStart(2, "0"),
    tone: TONES[i % 2],
  }));

  return (
    <section className="zfc-visa-steps" aria-labelledby="visa-steps-heading">
      <div className="zfc-visa-steps__inner">
        <h2 className="zfc-visa-steps__heading" id="visa-steps-heading">
          {resolvedHeading}
        </h2>

        <div className="zfc-visa-steps__grid">
          {resolvedSteps.map((step) => (
            <article className="zfc-visa-steps__item" key={step.number}>
              <div className={`zfc-visa-steps__orb zfc-visa-steps__orb--${step.tone}`}>
                <span className="zfc-visa-steps__ring" aria-hidden="true" />
                <span className="zfc-visa-steps__center">
                  <span className="zfc-visa-steps__number">{step.number}</span>
                  <span className="zfc-visa-steps__label">STEP</span>
                </span>
              </div>

              <h3 className="zfc-visa-steps__title">{step.title}</h3>
              <p className="zfc-visa-steps__body">{step.body}</p>
            </article>
          ))}
        </div>

        <Link href="/about" className="zfc-visa-steps__cta">
          <svg width="16" height="16" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M14.9 8.5 3.1 15.2V1.8l11.8 6.7Z" fill="currentColor" />
          </svg>
          {resolvedCtaText}
        </Link>
      </div>
    </section>
  );
}
