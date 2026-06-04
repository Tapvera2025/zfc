import Image from "next/image";
import Link from "next/link";

const services = [
  "Express Entry Consultant Canada services",
  "Family Sponsorship (including Spousal Sponsorship in Canada)",
  "Study Permit Consultant Canada guidance",
  "Super Visa & Temporary Visa",
  "Work Permit Consultant Canada solutions",
  "LMIA & PNP Applications",
  "Canadian Citizenship",
];

const PaperPlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3.6 11.4L20.4 3.5L12.6 20.5L10.3 13.7L3.6 11.4Z"
      fill="currentColor"
    />
    <path
      d="M10.3 13.7L14.7 9.3"
      stroke="#cc1f1f"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 5L19 12L8 19V5Z" fill="currentColor" />
  </svg>
);

export default function HomeWhoWeAreSection() {
  return (
    <section className="zfc-home-who" aria-labelledby="home-who-heading">
      <div className="zfc-home-who__inner">
        <div className="zfc-home-who__content">
          <div className="zfc-home-who__badge">
            <PaperPlaneIcon />
            WHO WE ARE ?
          </div>

          <h2 className="zfc-home-who__heading" id="home-who-heading">
            Leading Immigration Consulting Firm Canada
          </h2>

          <div className="zfc-home-who__copy">
            <p>
              ZF Canada is a leading immigration consultancy firm in Canada,
              dedicated to providing professional and reliable pathways to
              Canada. Established in 1992, we bring over 25 years of experience
              as a Licensed Immigration Consultant Canada, helping clients
              achieve their immigration goals successfully.
            </p>
            <p>
              Under the leadership of Sufian Ahmed (RCIC-IRB) - a trusted
              Immigration Consultant in Canada in good standing with the College
              of Immigration and Citizenship Consultants (CICC) - our team has
              grown into one of the Best Immigration Agency Canada.
            </p>
            <p>
              We are widely recognized as a reliable Canada Visa Consultant
              Canada, offering expert advice, personalized representation, and a
              high success rate. Our clients trust us for honest and ethical
              services across multiple immigration pathways, including:
            </p>
            <ul>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <p>
              At ZF Canada, we strictly follow professional codes of conduct.
              Every step of the way, we remain honest, pragmatic, efficient,
              consistent, unbiased, and genuine. This commitment sets us apart
              as a Licensed Immigration Consultant Canada.
            </p>
          </div>

          <Link href="/free-assessment" className="zfc-home-who__cta">
            <PlayIcon />
            SPEAK WITH OUR EXPERTS
          </Link>
        </div>

        <div className="zfc-home-who__media">
          <Image
            src="/assets/home-who-we-are-group.png"
            alt="ZF Canada immigration consulting and passport services"
            width={631}
            height={767}
            sizes="(max-width: 900px) min(92vw, 560px), 42vw"
            className="zfc-home-who__group-img"
          />
        </div>
      </div>
    </section>
  );
}
