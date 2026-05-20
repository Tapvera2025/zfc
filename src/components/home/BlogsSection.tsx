import Image from "next/image";
import Link from "next/link";

const smallPosts = [
  {
    id: 2,
    thumb: "/assets/blog-thumb-1.png",
    title: "Your Complete Guide To Temporary Residence Canada",
    date: "27 AUGUST, 2026",
  },
  {
    id: 3,
    thumb: "/assets/blog-thumb-2.png",
    title: "8 Common Mistakes That Lead To Misrepresentation In Canada",
    date: "27 AUGUST, 2026",
  },
  {
    id: 4,
    thumb: "/assets/blog-thumb-3.png",
    title: "8 Mistakes That Lead To Application Refusals In Canada",
    date: "27 AUGUST, 2026",
  },
];

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function BlogsSection() {
  return (
    <section className="zfc-blogs" aria-label="Weekly best blogs">
      {/* Header row */}
      <div className="zfc-blogs__header">
        <div className="zfc-blogs__title-group">
          <h2 className="zfc-blogs__heading">Weekly Best Blogs</h2>
          <div className="zfc-blogs__underline" aria-hidden="true" />
        </div>
        <Link href="/blog" className="zfc-blogs__view-all">
          VIEW ALL
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Divider */}
      <div className="zfc-blogs__divider" aria-hidden="true" />

      {/* Two-column layout */}
      <div className="zfc-blogs__body">

        {/* Left — large featured post */}
        <article className="zfc-blogs__featured">
          <div className="zfc-blogs__featured-img">
            <Image
              src="/assets/blog-featured.png"
              alt="Latest Canada Immigration Rules 2026: What Has Changed?"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Dark gradient overlay */}
            <div className="zfc-blogs__featured-overlay" aria-hidden="true" />
            {/* Content overlaid on image */}
            <div className="zfc-blogs__featured-content">
              <span className="zfc-blogs__badge">NEW</span>
              <h3 className="zfc-blogs__featured-title">
                Latest Canada Immigration Rules 2026: What Has Changed?
              </h3>
              <div className="zfc-blogs__meta zfc-blogs__meta--light">
                <span className="zfc-blogs__meta-item">
                  <PersonIcon /> BY ADMIN
                </span>
                <span className="zfc-blogs__meta-item">
                  <CalendarIcon /> 27 AUGUST, 2026
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Right — 3 small posts */}
        <div className="zfc-blogs__list">
          {smallPosts.map((post) => (
            <article key={post.id} className="zfc-blogs__post">
              <div className="zfc-blogs__post-thumb">
                <Image
                  src={post.thumb}
                  alt={post.title}
                  fill
                  sizes="180px"
                  className="object-cover object-center"
                />
              </div>
              <div className="zfc-blogs__post-content">
                <span className="zfc-blogs__badge">NEW</span>
                <h3 className="zfc-blogs__post-title">{post.title}</h3>
                <div className="zfc-blogs__meta">
                  <span className="zfc-blogs__meta-item">
                    <PersonIcon /> BY ADMIN
                  </span>
                  <span className="zfc-blogs__meta-item">
                    <CalendarIcon /> {post.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
