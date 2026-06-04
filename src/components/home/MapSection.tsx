const DEFAULT_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.4!2d-79.6924!3d43.5999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b47e2a1a3d5a7%3A0x9f5c3e1d4e6f8a2b!2s808%20Britannia%20Rd%20W%20%23214%2C%20Mississauga%2C%20ON%20L5V%200A6%2C%20Canada!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca";

interface MapSectionProps {
  embedUrl?: string;
}

export default function MapSection({ embedUrl }: MapSectionProps) {
  const src = embedUrl ?? DEFAULT_EMBED_URL;

  return (
    <section className="zfc-map" aria-label="Our office location">
      <iframe
        className="zfc-map__iframe"
        src={src}
        title="ZF Canada Immigration office location — 808 Britannia Rd W #214, Mississauga"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}
