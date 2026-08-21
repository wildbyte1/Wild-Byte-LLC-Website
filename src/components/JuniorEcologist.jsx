import React from 'react';
import assets from '../assets/assets';

const JuniorEcologist = () => {
  const calendlyUrl =
    'https://calendly.com/wildbyte-avictoria/junior-ecologist-workshop-series';

  const quickStats = [
    {
      icon: '🗓️',
      label: 'When',
      value: 'Saturdays, 9–11 AM',
      detail: 'Sept 26 – Nov 7, 2026 (7 Wks)',
    },
    {
      icon: '📍',
      label: 'Where',
      value: 'Root 66 Community Garden',
      detail: '12151 Foothill Blvd, Rancho Cucamonga',
    },
    {
      icon: '🌱',
      label: 'Who',
      value: 'Ages 6–12',
      detail: 'Under 5s free with adult',
    },
    {
      icon: '🎟️',
      label: 'Tuition',
      value: '$195 / Child',
      detail: '$75 Sibling Discount',
    },
  ];

  const pdfDocuments = [
    {
      id: 'flyer',
      title: 'Workshop Series Flyer',
      badge: 'Visual Overview',
      description: 'Program highlights, cohort details, and garden activities.',
      src: '/junior-ecologist-flyer.pdf',
    },
    {
      id: 'syllabus',
      title: '7-Week Course Syllabus',
      badge: 'Curriculum & Schedule',
      description: 'Weekly STEM explorations, soil experiments, and field objectives.',
      src: '/junior-ecologist-syllabus.pdf',
    },
  ];

  return (
    <section
      id="junior-ecologist"
      className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto transition-colors duration-300 scroll-mt-16"
    >
      <div className="bg-light dark:bg-stone-900 border border-secondary/30 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-primary text-secondary dark:bg-primary/20 dark:text-primary mb-3">
            Fall 2026 Workshop Series
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-tertiary dark:text-stone-100 tracking-tight">
            Junior Ecologist Program
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Hands-on outdoor NATURE connection and exploration combining plant biology, soil microscopy, animal care, and digital storytelling at the Root 66 Community Garden.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-primary/25 dark:bg-stone-950 border border-secondary/20 dark:border-stone-800/80 text-center flex flex-col items-center justify-center shadow-xs"
            >
              <span className="text-2xl mb-1">{stat.icon}</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary dark:text-stone-500">
                {stat.label}
              </span>
              <span className="text-sm font-extrabold text-tertiary dark:text-stone-100 mt-0.5">
                {stat.value}
              </span>
              <span className="text-[12px] text-stone-700 dark:text-stone-400 mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>

        
        <div className="bg-secondary dark:bg-stone-800 text-white rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-primary">
              Limited Registration Spots
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              Ready to reserve your child's spot?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 dark:text-stone-300 mt-1 max-w-xl">
              Register directly on Calendly. Use code <strong className="text-primary">WILDBYTE26</strong> for each additional sibling ($75).
            </p>
          </div>

          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-light text-tertiary dark:hover:bg-primary/90 font-extrabold text-xs uppercase tracking-wider py-3.5 px-7 rounded-xl transition-all shadow-md active:scale-95 text-center shrink-0"
          >
            Register on Calendly
            <img
              src={assets.arrow_icon}
              alt=""
              width={12}
              className="invert-0"
            />
          </a>
        </div>

        
        <div className="border-t border-secondary/20 dark:border-stone-800 pt-10 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-tertiary dark:text-stone-100 text-center">
            Program Materials & Previews
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 text-center mt-1">
            Scroll through the materials below or open and download them directly.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {pdfDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col bg-white dark:bg-stone-950 border border-secondary/20 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm overflow-hidden"
            >
              
              <div className="mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary text-secondary dark:bg-primary/20 dark:text-primary">
                  {doc.badge}
                </span>
                <h4 className="text-lg font-bold text-tertiary dark:text-stone-100 mt-2">
                  {doc.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  {doc.description}
                </p>
              </div>

              
              <div className="relative w-full h-88 sm:h-96 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 mb-4">
                <iframe
                  src={`${doc.src}#toolbar=0&navpanes=0&scrollbar=1`}
                  title={doc.title}
                  className="w-full h-full border-none"
                  loading="lazy"
                />
              </div>

              
              <div className="grid grid-cols-2 gap-2.5 mt-auto">
                <a
                  href={doc.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-light dark:bg-stone-800 hover:bg-primary/40 dark:hover:bg-stone-700 text-tertiary dark:text-stone-200 font-bold text-xs uppercase tracking-wider py-3 px-3 rounded-xl border border-secondary/20 dark:border-stone-700 transition-colors text-center"
                >
                  🔍 View Full Page
                </a>

                <a
                  href={doc.src}
                  download
                  className="inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-tertiary dark:bg-primary dark:text-tertiary text-white font-bold text-xs uppercase tracking-wider py-3 px-3 rounded-xl transition-colors text-center"
                >
                  📥 Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>

        
        <p className="text-center text-sm text-secondary dark:text-stone-400">
          Limited scholarships available • Garden pathways are unpaved. Contact{' '}
          <a
            href="mailto:contact@wildbyte.dev"
            className="font-bold underline hover:text-tertiary dark:hover:text-primary"
          >
            contact@wildbyte.dev
          </a>{' '}
          for accommodations or sibling discounts.
        </p>
      </div>
    </section>
  );
};

export default JuniorEcologist;