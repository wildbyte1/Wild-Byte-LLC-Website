import React from 'react';
import assets from '../assets/assets';

// Add new events here. Dates use ISO format (YYYY-MM-DD) so they sort correctly.
// Past events are hidden automatically. "category" drives the color-coded tag.
// Links: use "links" for one or more buttons/links. Set style: 'button' for a filled
// button (good for registration/payment). Legacy "link" + "linkLabel" still work.
const events = [
  {
    id: 'junior-ecologist-kickoff',
    date: '2026-09-26',
    time: '9:00 – 11:00 AM',
    title: 'Junior Ecologist Program Kickoff',
    location: 'Root 66 Community Garden, Rancho Cucamonga',
    description:
      'First session of the 7-week Junior Ecologist series — soil science, plant biology, and garden exploration for ages 6–12.',
    link: '#junior-ecologist',
    linkLabel: 'Program details',
    category: 'Workshop',
  },
  {
    id: 'virtual-workshops',
    date: '2026-11-03',
    time: '6:00 PM – 7:00 PM',
    title: 'The Armchair Naturalist: Botany, Heritage & Digital Nature',
    location: 'Zoom',
    description:
      'Explore the living world from the comfort of your home. Join Wild Byte for an accessible 4-week virtual workshop series designed for adults. Each week, we decode the fascinating stories of everyday plants and animals in our natural communities.',
    links: [
      {
        label: 'Register: Full 4-Week Series',
        url: 'https://buy.stripe.com/fZu3cv1vzcnv2HN5iQ3cc05',
        style: 'button',
      },
      {
        label: 'Single Session',
        url: 'https://buy.stripe.com/bJe00jgqt73bcin9z63cc04',
        style: 'button-outline',
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
    link: '#junior-ecologist',
    linkLabel: 'Program details',
    category: 'Workshop',
  },
];

const categoryStyles = {
  Workshop: 'bg-secondary text-white dark:bg-primary dark:text-tertiary',
  Community: 'bg-primary text-secondary dark:bg-stone-800 dark:text-primary',
};

const linkStyles = {
  text: 'inline-flex items-center gap-1.5 text-xs font-bold text-secondary dark:text-primary hover:underline',
  button:
    'inline-flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 rounded-xl bg-secondary text-white hover:bg-tertiary dark:bg-primary dark:text-tertiary dark:hover:bg-primary/90 transition-colors',
  'button-outline':
    'inline-flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-tertiary transition-colors',
};

const getLinks = (event) => {
  if (event.links) return event.links;
  if (event.link) return [{ label: event.linkLabel || 'Learn more', url: event.link }];
  return [];
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((e) => new Date(`${e.date}T00:00:00`) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section
      id="events"
      className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto transition-colors duration-300 scroll-mt-16"
    >
      <div className=" dark:bg-stone-900 border border-secondary/30 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm">
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
              const links = getLinks(event);

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
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${categoryStyles[event.category] || categoryStyles.Community}`}
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
                        {links.map((l) => {
                          const isAnchor = l.url.startsWith('#');
                          const styleKey = l.style && linkStyles[l.style] ? l.style : 'text';
                          return (
                            <a
                              key={l.url}
                              href={l.url}
                              {...(isAnchor
                                ? {}
                                : { target: '_blank', rel: 'noopener noreferrer' })}
                              className={linkStyles[styleKey]}
                            >
                              {l.label}
                              {styleKey === 'text' && (
                                <img src={assets.arrow_icon} alt="" width={10} />
                              )}
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
