import React from 'react';
import assets from '../assets/assets';
import ParentPortalCTA from '../ParentPortalCTA';
import PhotoCarousel from './PhotoCarousel';

const CONTACT_EMAIL = 'contact@wildbyte.dev';

const ActionLink = ({ href, fallbackLabel, fallbackSubject, className, children }) => {
  const ready = Boolean(href);
  return (
    <a
      href={
        ready
          ? href
          : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(fallbackSubject)}`
      }
      {...(ready ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 font-extrabold text-xs uppercase tracking-wider py-3.5 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-center ${className}`}
    >
      {ready ? children : fallbackLabel}
      <img src={assets.arrow_icon} alt="" width={12} className="invert-0" />
    </a>
  );
};

const JuniorEcologist = () => {
  const adobeFormUrl =
    'https://na5.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBZdSaWKlcpW5yerXMahQuAeuFOrV7GmF-OR4gaZJDBLW3CULa7lhB5nJID3HU6qgg*';

  const cohorts = [
    {
      id: 'ages-3-6',
      ageLabel: 'Ages 3–6',
      when: 'Saturdays, 9–11 AM',
      dates: 'Jan 9 – Feb 20, 2027 (7 Wks)',
      tuition: '$195 / Child',
      tuitionDetail: 'Entire 7-week series',
      siblingValue: '$100',
      paymentUrl: 'https://buy.stripe.com/9B68wPcadgDL6Y326E3cc06',
      siblingPaymentUrl: 'https://buy.stripe.com/00w00jcad9bjbejbHe3cc07',
      dropIn: {
        price: '$35',
        url: 'https://buy.stripe.com/6oUcN51vz73bbej6mU3cc08',
      },
    },
    {
      id: 'ages-7-12',
      ageLabel: 'Ages 7–12',
      when: 'Mondays, 4–5:30 PM',
      dates: 'Jan 11 – Feb 22, 2027 (7 Wks)',
      tuition: '$200 / Child',
      tuitionDetail: 'Entire 7-week series',
      siblingValue: '$150',
      paymentUrl: 'https://buy.stripe.com/dRm00j8Y1fzH2HN9z63cc09',
      siblingPaymentUrl: 'https://buy.stripe.com/00waEX6PTcnv3LR5iQ3cc0a',
      dropIn: null,
    },
  ];

  // Photos from public/gallery/ with descriptive scene alts and captions
  const galleryImages = [
    {
      src: '/gallery/explorers-magnifiers.jpg',
      alt: 'Young ecologists examining garden leaves and plants with magnifying glasses',
      caption: 'Bug & Plant Inspection',
    },
    {
      src: '/gallery/nature-exploration.jpg',
      alt: 'Children playing in shallow pond together',
      caption: 'Nature Exploration'

    },
    {
      src: '/gallery/exploring-together.jpg',
      alt: 'Children exploring the community garden beds together',
      caption: 'Garden Exploration',
    },
    {
      src: '/gallery/feeding-goats.jpg',
      alt: 'Feeding fresh hay and garden greens to farm animals',
      caption: 'Farm Animal Care',
    },
    {
      src: '/gallery/garden-art.jpg',
      alt: 'Botanical nature art and botanical prints made by students',
      caption: 'Nature Crafts & Art',
    },
    {
      src: '/gallery/garden-flower.jpg',
      alt: 'Vibrant blooming flower in the community garden beds',
      caption: 'Pollinator Habitat',
    },
    {
      src: '/gallery/hands-on-soil.jpg',
      alt: 'Hands-on planting and soil exploration in the garden',
      caption: 'Soil Discovery',
    },
    {
      src: '/gallery/meeting-the-goats.jpg',
      alt: 'Children interacting with friendly goats at the garden fence',
      caption: 'Meeting the Goats',
    },
    {
      src: '/gallery/soil-microscope.jpg',
      alt: 'Close-up examination of soil biology under a field microscope',
      caption: 'Microscopy Science',
    },
  ];

  // Active Winter 2027 documents located in the /public folder
  const pdfDocuments = [
    {
      id: 'flyer',
      title: 'Winter 2027 Workshop Flyer',
      badge: 'Visual Overview',
      description: 'Program highlights, age cohorts, and garden activities.',
      src: '/junior-ecologist-winter2027-flyer.pdf',
      featured: true,
    },
    {
      id: 'syllabus-3-6',
      title: 'Ages 3–6 Syllabus',
      badge: 'Saturday Series',
      description: 'Week-by-week schedule for the Saturday 9–11 AM cohort.',
      src: '/junior-eco-syllabus-3-6.pdf',
    },
    {
      id: 'syllabus-7-12',
      title: 'Ages 7–12 Syllabus',
      badge: 'Monday Series',
      description: 'Week-by-week schedule for the Monday 4–5:30 PM cohort.',
      src: '/junior-ecologist-syllabus-7-12.pdf',
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
            Winter 2027 Workshop Series
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-tertiary dark:text-stone-100 tracking-tight">
            Junior Ecologist Program
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Hands-on outdoor NATURE connection and exploration combining plant biology, soil microscopy, animal care, and digital storytelling at the Root 66 Community Garden.
          </p>
          
        </div>

        {/* Parent Portal */}
        <div className="mb-10">
          <ParentPortalCTA />
        </div>

        {/* Photo Gallery Carousel */}
        <PhotoCarousel
          images={galleryImages}
          eyebrow="From our Fall 2026 cohort"
          title="See Junior Ecologists in action"
          subtitle="Plants, soil, animals, and digital storytelling at Root 66."
        />

        {/* Cohort Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-8 mb-12">
          {cohorts.map((c) => (
            <article
              key={c.id}
              className="flex flex-col gap-5 bg-white dark:bg-stone-950 border border-secondary/20 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm"
            >
              <header className="text-center">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-primary text-secondary dark:bg-primary/20 dark:text-primary mb-2">
                  {c.ageLabel}
                </span>
                <h3 className="text-2xl font-bold text-tertiary dark:text-stone-100">
                  🗓️ {c.when}
                </h3>
                <p className="text-sm text-stone-700 dark:text-stone-400 mt-0.5">
                  {c.dates}
                </p>
              </header>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-primary/25 dark:bg-stone-900 border border-secondary/20 dark:border-stone-800/80 text-center flex flex-col items-center justify-center shadow-xs">
                  <span className="text-2xl mb-1">🎟️</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary dark:text-stone-500">
                    Tuition
                  </span>
                  <span className="text-sm font-extrabold text-tertiary dark:text-stone-100 mt-0.5">
                    {c.tuition}
                  </span>
                  <span className="text-[12px] text-stone-700 dark:text-stone-400 mt-0.5">
                    {c.tuitionDetail}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-primary/25 dark:bg-stone-900 border border-secondary/20 dark:border-stone-800/80 text-center flex flex-col items-center justify-center shadow-xs">
                  <span className="text-2xl mb-1">👨‍👩‍👧</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary dark:text-stone-500">
                    Siblings
                  </span>
                  <span className="text-sm font-extrabold text-tertiary dark:text-stone-100 mt-0.5">
                    {c.siblingValue} Sibling Rate
                  </span>
                  <span className="text-[12px] text-stone-700 dark:text-stone-400 mt-0.5">
                    Per additional child
                  </span>
                </div>
              </div>

              {c.dropIn && (
                <div className="rounded-2xl border border-secondary/30 dark:border-stone-700 bg-light dark:bg-stone-900 p-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary dark:text-stone-500">
                    🌿 Drop-ins welcome
                  </span>
                  <p className="text-sm font-extrabold text-tertiary dark:text-stone-100 mt-0.5">
                    {c.dropIn.price} per session
                  </p>
                  <p className="text-[12px] text-stone-700 dark:text-stone-400 mt-0.5">
                    Can’t commit to all 7 weeks? Join us for single sessions.
                  </p>
                </div>
              )}

              {/* Registration & Differentiated Payment Buttons */}
              <div className="mt-auto bg-secondary dark:bg-stone-800 text-white rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-md">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                    Limited Registration Spots
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    Reserve a spot for {c.ageLabel}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-200 dark:text-stone-300 mt-1">
                    Two steps: complete the liability & registration form, then submit payment.
                    Additional siblings require a separate form and sibling checkout.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Step 1: Adobe Registration Form */}
                  <a
                    href={adobeFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#e4ecc4] text-tertiary font-extrabold text-xs uppercase tracking-wider py-3.5 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:ring-2 hover:ring-primary/80 active:scale-95 text-center"
                  >
                    1. Complete Registration Form
                    <img src={assets.arrow_icon} alt="" width={12} className="invert-0" />
                  </a>

                  {/* Step 2: Primary Series Tuition */}
                  <ActionLink
                    href={c.paymentUrl}
                    fallbackLabel="2. Email Us to Arrange Payment"
                    fallbackSubject={`Junior Ecologist ${c.ageLabel} registration`}
                    className="bg-[#FFFDF6] hover:bg-amber-50 text-stone-900 border border-amber-200/90 hover:ring-2 hover:ring-amber-400 hover:border-amber-400"
                  >
                    2. Pay Tuition ({c.tuition})
                  </ActionLink>

                  {/* Sibling Tuition Button */}
                  {c.siblingPaymentUrl && (
                    <ActionLink
                      href={c.siblingPaymentUrl}
                      fallbackLabel={`Email for Sibling Enrollment (${c.siblingValue})`}
                      fallbackSubject={`Junior Ecologist ${c.ageLabel} sibling registration`}
                      className="bg-[#F2D4BC] hover:bg-[#FBE8D8] text-[#44230D] border border-[#DEAB88] hover:ring-2 hover:ring-[#D88A52] hover:border-[#D88A52]"
                    >
                      Pay Sibling Fee ({c.siblingValue})
                    </ActionLink>
                  )}

                  {/* Single Drop-In Button */}
                  {c.dropIn && (
                    <ActionLink
                      href={c.dropIn.url}
                      fallbackLabel="Email Us to Book a Drop-In"
                      fallbackSubject={`Junior Ecologist ${c.ageLabel} drop-in session`}
                      className="bg-[#D3E8D7] hover:bg-[#E5F3E8] text-[#183B20] border border-[#9DC3A4] hover:ring-2 hover:ring-[#6EAC79] hover:border-[#6EAC79]"
                    >
                      Book a Single Drop-In ({c.dropIn.price})
                    </ActionLink>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Embedded PDF Previews for Flyer and Syllabi */}
        {pdfDocuments.length > 0 && (
          <>
            <div className="border-t border-secondary/20 dark:border-stone-800 pt-10 mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-tertiary dark:text-stone-100 text-center">
                Program Materials & Previews
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 text-center mt-1">
                Preview the series flyer and curriculum below or download them directly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {pdfDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`flex flex-col bg-white dark:bg-stone-950 border border-secondary/20 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm overflow-hidden ${doc.featured ? 'lg:col-span-2 lg:max-w-3xl lg:mx-auto lg:w-full' : ''}`}
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
          </>
        )}

        <p className="text-center text-sm text-secondary dark:text-stone-400">
          Limited scholarships available • Garden pathways are unpaved. Contact{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-bold underline hover:text-tertiary dark:hover:text-primary"
          >
            {CONTACT_EMAIL}
          </a>{' '}
          for accommodations or scholarship information.
        </p>
      </div>
    </section>
  );
};

export default JuniorEcologist;