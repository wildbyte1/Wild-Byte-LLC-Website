import React from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

// Set this to your exact route path (e.g. '/programs', '/junior-ecologist', or '/programs#junior-ecologist')
const JUNIOR_ECO_PROGRAM_ROUTE = '/programs';

const events = [
  {
    id: 'junior-ecologist-kickoff',
    date: '2026-09-26',
    time: '9:00 – 11:00 AM',
    title: 'Junior Ecologist Program Kickoff',
    location: 'Root 66 Community Garden, Rancho Cucamonga',
    description:
      'First session of the 7-week Junior Ecologist series — soil science, plant biology, and garden exploration for ages 6–12.',
    links: [
      {
        label: 'Program details',
        url: JUNIOR_ECO_PROGRAM_ROUTE,
        style: 'text',
      },
    ],
    category: 'Workshop',
  },
  {
    id: 'junior-ecologist-showcase',
    date: '2026-11-07',
    time: '9:00 – 11:00 AM',
    title: 'Junior Ecologist Final Showcase',
    location: 'Root 66 Community Garden, Rancho Cucamonga',
    description:
      'Closing session of the workshop series — kids present their digital storytelling projects to family and friends.',
    links: [
      {
        label: 'Program details',
        url: JUNIOR_ECO_PROGRAM_ROUTE,
        style: 'text',
      },
    ],
    category: 'Workshop',
  },
  {
    id: 'junior-ecologist-winter-2027-ages-3-6',
    date: '2027-01-09',
    time: 'Saturdays, 9:00 – 11:00 AM',
    title: 'Junior Ecologist Winter Series (Ages 3–6)',
    location: 'Root 66 Community Garden, Rancho Cucamonga',
    description:
      'A 7-week hands-on Saturday morning nature series running Jan 9 – Feb 20, 2027. Little ecologists discover living soil, gentle farm animals, seed planting, bug safaris, and nature art.',
    links: [
      {
        label: 'View Program Details & Register',
        url: JUNIOR_ECO_PROGRAM_ROUTE,
        style: 'button',
      },
    ],
    category: 'Workshop',
  },
  {
    id: 'junior-ecologist-winter-2027-ages-7-12',
    date: '2027-01-11',
    time: 'Mondays, 4:00 – 5:30 PM',
    title: 'Junior Ecologist Winter Series (Ages 7–12)',
    location: 'Root 66 Community Garden, Rancho Cucamonga',
    description:
      'A 7-week after-school field biology series running Jan 11 – Feb 22, 2027. Features digital field microscopy, California native plant adaptations, food web mapping, animal stewardship, and student research presentations.',
    links: [
      {
        label: 'View Program Details & Register',
        url: JUNIOR_ECO_PROGRAM_ROUTE,
        style: 'button',
      },
    ],
    category: 'Workshop',
  },
  {
    id: 'armchair-naturalist-postponed-2027',
    date: '2027-01-20',
    time: 'Evenings · Dates TBA',
    title: 'The Armchair Naturalist (Postponed to Early 2027)',
    location: 'Zoom (Virtual)',
    description:
      'Our 4-week adult virtual workshop series exploring botany, heritage, and digital nature has been postponed until after the holiday season to allow for a full, interactive cohort. Join the priority waitlist to receive advance notification when dates and registrations reopen.',
    links: [
      {
        label: 'Join Priority Waitlist',
        url: 'mailto:contact@wildbyte.dev?subject=The%20Armchair%20Naturalist%20Waitlist',
        style: 'button-outline',
      },
    ],
    category: 'Workshop',
  },
];

const categoryStyles = {
  Workshop: 'bg-secondary text-white dark:bg-primary dark:text-tertiary',
  Community: 'bg-primary text-secondary dark:bg-stone-800 dark:text-primary',
};

const linkStyles = {
  text: 'inline-flex items-center gap-1.5 text-xs font-bold text-secondary dark:text-primary hover:underline cursor-pointer',
  button:
    'inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-xl bg-secondary text-white hover:bg-tertiary dark:bg-primary dark:text-tertiary dark:hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer',
  'button-outline':
    'inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-tertiary transition-all shadow-sm active:scale-95 cursor-pointer',
};

const formatDate = (isoDate) => {
  const d = new Date(`${isoDate}T00:00:00`);
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
  };
};

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((e) => new Date(`${e.date}T00:00:00`) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleNavigation = (e, url) => {
    // External URLs and mailto open normally
    if (url.startsWith('http') || url.startsWith('mailto:')) {
      return;
    }

    e.preventDefault();

    // Handle React Router navigation
    if (url.startsWith('/')) {
      navigate(url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // In-page anchor on the current view
    if (url.startsWith('#')) {
      const el = document.getElementById(url.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(`/${url}`);
      }
    }
  };

  return (
    <section
      id="events"
      className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto transition-colors duration-300 scroll-mt-16"
    >
      <div className="dark:bg-stone-900 border border-secondary/30 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-tertiary dark:text-stone-100 tracking-tight">
            Upcoming Events
          </h2>
          <p className="mt-3 text-primary dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Workshops, garden days, and community gatherings — here's what's coming up.
          </p>
        </div>

        {upcoming.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
              Nothing on the calendar right now — check back soon, or{' '}
              <a
                href="mailto:contact@wildbyte.dev"
                className="font-bold underline hover:text-tertiary dark:hover:text-primary"
              >
                email us
              </a>{' '}
              to suggest one.
            </p>
          </div>
        ) : (
          <ol className="relative max-w-3xl mx-auto">
            {upcoming.map((event, idx) => {
              const { month, day, weekday } = formatDate(event.date);
              const isLast = idx === upcoming.length - 1;
              const links = event.links || [];

              return (
                <li key={event.id} className="relative flex gap-5 sm:gap-8 pb-10 last:pb-0">
                  {!isLast && (
                    <span
                      className="absolute left-[27px] sm:left-[35px] top-[64px] bottom-0 w-px bg-secondary/30 dark:bg-stone-800"
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex flex-col items-center justify-center shrink-0 w-14 h-14 sm:w-[70px] sm:h-[70px] rounded-2xl bg-secondary dark:bg-primary text-center shadow-sm">
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-primary dark:text-tertiary">
                      {month}
                    </span>
                    <span className="text-lg sm:text-2xl font-extrabold text-white dark:text-tertiary leading-none mt-0.5">
                      {day}
                    </span>
                  </div>

                  <div className="flex-1 bg-white dark:bg-stone-950 border border-secondary/20 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xs">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-500">
                        {weekday} · {event.time}
                      </span>
                      {event.category && (
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            categoryStyles[event.category] || categoryStyles.Community
                          }`}
                        >
                          {event.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-tertiary dark:text-stone-100">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                      📍 {event.location}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                      {event.description}
                    </p>

                    {links.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2.5 mt-4">
                        {links.map((l, lIdx) => {
                          const isExternal = l.url.startsWith('http') || l.url.startsWith('mailto:');
                          const styleKey = l.style && linkStyles[l.style] ? l.style : 'text';
                          return (
                            <a
                              key={`${event.id}-link-${lIdx}`}
                              href={l.url}
                              onClick={(e) => handleNavigation(e, l.url)}
                              {...(isExternal
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                              className={linkStyles[styleKey]}
                            >
                              {l.label}
                              <img
                                src={assets.arrow_icon}
                                alt=""
                                width={10}
                                className={
                                  styleKey === 'button'
                                    ? 'brightness-0 invert dark:brightness-100 dark:invert-0'
                                    : ''
                                }
                              />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;