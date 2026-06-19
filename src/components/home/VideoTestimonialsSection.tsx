"use client";

import { useRef, useState } from "react";

const videos = [
  {
    id: "waliya-1",
    src: "/assets/client-testimonial-1.mp4",
    poster: "/assets/client-testimonial-1-poster.png",
    title: "ZF Canada client testimonial video",
  },
  {
    id: "waliya-2",
    src: "/assets/client-testimonial-2.mp4",
    poster: "/assets/client-testimonial-2-poster.png",
    title: "ZF Canada client testimonial video",
  },
];

type VideoReview = { text: string; name: string; role: string; rating: number };

const DEFAULT_REVIEWS: VideoReview[] = [
  {
    text: "ZF Canada made my study permit process feel clear from the first consultation. The team explained every document, followed up quickly, and gave me confidence before submission.",
    name: "Ayesha Rahman",
    role: "Student",
    rating: 5,
  },
  {
    text: "I came to ZF Canada after a complicated refusal and they helped me understand my options. Their advice was honest, organized, and focused on building a stronger application.",
    name: "Daniel Morgan",
    role: "Work Permit Applicant",
    rating: 5,
  },
];

interface VideoTestimonialsProps {
  reviews?: VideoReview[];
}

const PlayIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M12 8.5L23 16L12 23.5V8.5Z" fill="currentColor" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 1.7L15.1 8.4L22.4 9.3L17 14.3L18.4 21.4L12 17.8L5.6 21.4L7 14.3L1.6 9.3L8.9 8.4L12 1.7Z" />
  </svg>
);

function VideoCard({ video }: { video: (typeof videos)[number] }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function handlePlayClick() {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    try {
      await videoEl.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <article
      className={
        "zfc-video-testimonials__video" +
        (isPlaying ? " zfc-video-testimonials__video--playing" : "")
      }
    >
      <video
        ref={videoRef}
        className="zfc-video-testimonials__media"
        poster={video.poster}
        preload="metadata"
        playsInline
        controls={isPlaying}
        aria-label={video.title}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <div className="zfc-video-testimonials__overlay" aria-hidden="true" />
      {!isPlaying && (
        <button
          type="button"
          className="zfc-video-testimonials__play"
          aria-label="Play testimonial video"
          onClick={handlePlayClick}
        >
          <PlayIcon />
        </button>
      )}
    </article>
  );
}

export default function VideoTestimonialsSection({ reviews }: VideoTestimonialsProps) {
  const resolvedReviews = reviews ?? DEFAULT_REVIEWS;

  return (
    <section className="zfc-video-testimonials" aria-label="Video testimonials">
      <div className="zfc-video-testimonials__inner">
        <div className="zfc-video-testimonials__videos">
          {videos.map((video) => <VideoCard key={video.id} video={video} />)}
        </div>

        <div className="zfc-video-testimonials__reviews">
          {resolvedReviews.map((review, index) => (
            <article key={index} className="zfc-video-testimonials__review">
              <p className="zfc-video-testimonials__copy">{review.text}</p>
              <div className="zfc-video-testimonials__person">
                <p className="zfc-video-testimonials__name">{review.name}</p>
                <p className="zfc-video-testimonials__role">{review.role}</p>
              </div>
              <div
                className="zfc-video-testimonials__stars"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }, (_, star) => (
                  <StarIcon key={star} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
