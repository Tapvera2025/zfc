import Image from "next/image";

const stats = [
  {
    id: 1,
    icon: "/assets/stat-icon-1.svg",
    number: "567+",
    label: "Country Operation",
  },
  {
    id: 2,
    icon: "/assets/stat-icon-visa.svg",
    number: "16+",
    label: "Visa Completion",
  },
  {
    id: 3,
    icon: "/assets/stat-icon-3.svg",
    number: "26",
    label: "Immigration Experts",
  },
  {
    id: 4,
    icon: "/assets/stat-icon-2.svg",
    number: "759+",
    label: "Client Satisfaction",
  },
];

export default function StatsSection() {
  return (
    <section className="zfc-stats" aria-label="Our achievements">
      {/* Background image */}
      <div className="zfc-stats__bg" aria-hidden="true">
        <Image
          src="/assets/stats-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Canada flag — top left (uses right image) */}
      <div className="zfc-stats__flag zfc-stats__flag--left" aria-hidden="true">
        <Image
          src="/assets/canada-flag-right.png"
          alt=""
          width={180}
          height={119}
          className="object-contain"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Canada flag — top right (uses left image) */}
      <div className="zfc-stats__flag zfc-stats__flag--right" aria-hidden="true">
        <Image
          src="/assets/canada-flag-left.png"
          alt=""
          width={180}
          height={119}
          className="object-contain"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Stat items */}
      <div className="zfc-stats__inner">
        {stats.map((stat, idx) => (
          <div key={stat.id} className="zfc-stats__item">
            {/* Vertical divider before each item except the first */}
            {idx > 0 && <div className="zfc-stats__divider" aria-hidden="true" />}

            <div className="zfc-stats__content">
              <div className="zfc-stats__icon" aria-hidden="true">
                <Image
                  src={stat.icon}
                  alt=""
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="zfc-stats__text">
                <span className="zfc-stats__number">{stat.number}</span>
                <span className="zfc-stats__label">{stat.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
