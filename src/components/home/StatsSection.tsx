import Image from "next/image";

const STAT_ICONS = [
  "/assets/stat-icon-1.svg",
  "/assets/stat-icon-visa.svg",
  "/assets/stat-icon-3.svg",
  "/assets/stat-icon-2.svg",
];

const DEFAULT_STATS = [
  { value: "567+", label: "Country Operation" },
  { value: "16+",  label: "Visa Completion" },
  { value: "26",   label: "Immigration Experts" },
  { value: "759+", label: "Client Satisfaction" },
];

interface StatsSectionProps {
  stats?: { label: string; value: string }[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const items = (stats && stats.length > 0) ? stats : DEFAULT_STATS;
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
        {items.map((stat, idx) => (
          <div key={idx} className="zfc-stats__item">
            {idx > 0 && <div className="zfc-stats__divider" aria-hidden="true" />}
            <div className="zfc-stats__content">
              <div className="zfc-stats__icon" aria-hidden="true">
                <Image
                  src={STAT_ICONS[idx % STAT_ICONS.length]}
                  alt=""
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div className="zfc-stats__text">
                <span className="zfc-stats__number">{stat.value}</span>
                <span className="zfc-stats__label">{stat.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
