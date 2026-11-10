import React, { useCallback, useEffect, useRef, useState } from 'react';

const Chevron = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

const PhotoCarousel = ({ images = [], eyebrow, title, subtitle }) => {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, images.length]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector('[data-slide]');
    const step = slide ? slide.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  if (images.length === 0) return null;

  const arrowClass =
    'hidden sm:flex absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/95 dark:bg-stone-800/95 text-tertiary dark:text-stone-100 border border-secondary/20 dark:border-stone-700 shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-0 disabled:pointer-events-none cursor-pointer';

  return (
    <section
      className="mb-10"
      aria-roledescription="carousel"
      aria-label={title || 'Photo gallery'}
    >
      <div className="text-center mb-5">
        {eyebrow && (
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-primary text-secondary dark:bg-primary/20 dark:text-primary mb-2">
            {eyebrow}
          </span>
        )}
        {title && (
          <h3 className="text-2xl sm:text-3xl font-bold text-tertiary dark:text-stone-100">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{subtitle}</p>
        )}
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          tabIndex={0}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory motion-safe:scroll-smooth pb-2 rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {images.map((img, i) => (
            <figure
              key={img.src}
              data-slide
              className="snap-start shrink-0 w-[85%] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full aspect-[4/3] object-cover rounded-2xl border border-secondary/20 dark:border-stone-800 shadow-sm"
              />
              {img.caption && (
                <figcaption className="mt-2 text-xs sm:text-sm text-center text-stone-600 dark:text-stone-400">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous photos"
          className={`${arrowClass} left-2`}
        >
          <Chevron direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next photos"
          className={`${arrowClass} right-2`}
        >
          <Chevron direction="right" />
        </button>
      </div>
    </section>
  );
};

export default PhotoCarousel;