import Image from "next/image";

const commitmentParagraphs = [
  "We're a trusted Immigration Consulting Firm that gets amazing results with a solid, detail-focused method. We carefully look at each application considering current visa office needs, our clients' situations, and recent Canadian laws.",
  "Our team keeps up with policy updates and process changes for accurate and timely advice. Also, we stay in touch with overseas embassies and immigration authorities to get the latest info. This lets us offer efficient, reliable, and personalized solutions, giving our clients their best shot at success.",
];

const careParagraphs = [
  "Picking the right immigration rep is super crucial on your trip to Canada. At ZF Canada, we think every client should get personal attention, honest advice, and total confidentiality during the process.",
  "We take time to understand your unique goals, situation, and obstacles, to give you customized solutions. Our team stays close with each client for clear communication and focused support from start to finish.",
  "When we take on a case, we go in with confidence, commitment, and a true desire to see our clients succeed. Whether your application is simple or complex, our personal approach helps us manage it effectively, giving you top-notch service and the best results. Your success matters to us, and we're proud to help you reach your immigration goals in Canada.",
];

export default function AboutCommitmentSection() {
  return (
    <section id="about-commitment" className="zfc-about-commitment" aria-label="Our commitment and client care">
      <div className="zfc-about-commitment__inner">
        <div className="zfc-about-commitment__media zfc-about-commitment__media--landscape">
          <Image
            src="/assets/refused-approach-canada-flag.webp"
            alt="Canadian flag held by people outdoors"
            fill
            sizes="(max-width: 900px) calc(100vw - 40px), 36vw"
            className="zfc-about-commitment__image"
          />
        </div>

        <div className="zfc-about-commitment__copy zfc-about-commitment__copy--commitment">
          <h2 className="zfc-about-commitment__heading">Our Commitment</h2>
          {commitmentParagraphs.map((paragraph) => (
            <p className="zfc-about-commitment__body" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="zfc-about-commitment__copy zfc-about-commitment__copy--care">
          <h2 className="zfc-about-commitment__heading">We Care</h2>
          {careParagraphs.map((paragraph) => (
            <p className="zfc-about-commitment__body" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="zfc-about-commitment__media zfc-about-commitment__media--portrait">
          <Image
            src="/assets/about-care-team.webp"
            alt="Immigration consulting team working with clients"
            fill
            sizes="(max-width: 900px) calc(100vw - 40px), 36vw"
            className="zfc-about-commitment__image"
          />
        </div>
      </div>
    </section>
  );
}
