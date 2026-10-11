import React, { useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/xvkzgppp';

const tracks = [
  {
    icon: '🔬',
    title: 'Youth & School Programming',
    bestFor:
      'After-school programs, homeschool co-ops, scout troops, and youth recreation departments.',
    themes: [
      {
        name: 'Micro-Worlds & Pollinators',
        detail:
          'High-magnification microscope activities exploring flower architecture, insect adaptations, and seeds.',
      },
      {
        name: 'Soil, Seeds & Sprout Science',
        detail: 'Tactile planting, seed anatomy dissection, and companion planting basics.',
      },
      
    ],
    format: '60–90 minutes · Ages 5–18',
  },
  {
    icon: '🌿',
    title: 'Senior Living & Lifelong Learning',
    bestFor:
      'Senior community centers, assisted living, memory care communities, and public libraries.',
    themes: [
      {
        name: 'Living Botanical History',
        detail:
          'Exploring the heritage, cultural folklore, and historical journey of heirloom garden plants and herbs.',
      },
      {
        name: 'Nature Discovery & Creative Keepsakes',
        detail:
          'Interactive plant craft activities featuring seasonal aromatic herb identification, botanical art making, and custom garden blends.',
      },
    ],
    format: '45–60 minutes · Fully seated & mobility-friendly',
  },
  {
    icon: '🌱',
    title: 'Adaptive Recreation & Community Groups',
    bestFor: 'Neurodiverse community programs, Regional Center cohorts, and local non-profits.',
    themes: [
      {
        name: 'Practical & Garden Focused',
        detail: 'Guided Garden Projects: Structured outdoor activities introducing beginner plant care, safe tool handling, and cooperative teamwork.',
      },
      {
        name: 'Inclusive Workstations',
        detail:
          'Thoughtfully arranged setups featuring flexible pacing and step-by-step illustrated guides.',
      },
      
    ],
    format: 'Flexible ratios · Tailored to group needs',
  },
];

const bookingSteps = [
  {
    title: 'Submit Your Request',
    detail:
      'Share your group size, target age range, and preferred dates using the inquiry form below.',
  },
  {
    title: 'Customized Program Plan',
    detail:
      "We provide a tailored workshop proposal matching your group's goals, space setup, and budget.",
  },
  {
    title: 'We Bring the Workshop',
    detail: 'Wild Byte handles full setup, provides all gear and materials, leads the session, and cleans up afterward.',
  },
];

const audienceOptions = [
  'Youth / After-School / Scouts',
  'Older Adults / Senior Living',
  'Neurodiverse / Adaptive Group',
  'Other / Community Event',
];

const groupSizeOptions = ['5–10', '11–20', '21–35', '35+'];

const locationOptions = [
  'At our facility / organization',
  'Outdoor community setting (e.g., Root 66 Community Garden)',
  'Virtual / Remote',
];

const initialFormState = {
  contactName: '',
  orgName: '',
  email: '',
  phone: '',
  audience: [],
  groupSize: '',
  location: '',
  timeframe: '',
  goals: '',
};

const EarlyAccess = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAudience = (option) => {
    setFormData((prev) => {
      const exists = prev.audience.includes(option);
      return {
        ...prev,
        audience: exists
          ? prev.audience.filter((a) => a !== option)
          : [...prev.audience, option],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData(initialFormState);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div id='early-access' className='py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto'>
      
      <div className='text-center max-w-3xl mx-auto mb-14'>
        <h2 className='text-3xl sm:text-4xl font-bold text-tertiary dark:text-stone-100 tracking-tight'>
          Bring Wild Byte to Your Community
        </h2>
        <p className='mt-2 text-lg font-semibold text-secondary dark:text-primary'>
          Hands-On Nature Education & Tech Workshops Delivered to Your Group
        </p>
        <p className='mt-4 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed'>
          Whether you're looking for an engaging outdoor hands-on experience, an accessible sensory session
          for older adults, or an adaptive recreational workshop, Wild Byte brings fully equipped,
          nature based programming directly to your facility, school, or community space.
        </p>
        <p className='mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed'>
          We provide all materials, specialized gear (digital field microscopes, tactile botanical
          specimens, and guided activity guides), and experienced facilitator instruction. Programs
          are available as single pop-up sessions, half-day enrichment events, or multi-week
          workshop series. Custom software is available upon request. 
        </p>
      </div>

      
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16'>
        {tracks.map((track) => (
          <div
            key={track.title}
            className='flex flex-col bg-primary/50 dark:bg-stone-950 border border-secondary/20 dark:border-stone-800 rounded-3xl p-6 shadow-sm'
          >
            <span className='text-3xl mb-3'>{track.icon}</span>
            <h3 className='text-lg font-bold text-secondary dark:text-stone-100 mb-1'>
              {track.title}
            </h3>
            <p className='text-xs text-tertiary dark:text-stone-400 mb-4'>
              Best for: {track.bestFor}
            </p>

            <ul className='space-y-3 mb-4 flex-1'>
              {track.themes.map((theme) => (
                <li key={theme.name} className='text-xs sm:text-sm'>
                  <span className='font-bold text-black dark:text-primary'>
                    {theme.name}:
                  </span>{' '}
                  <span className='text-stone-600 dark:text-stone-300'>{theme.detail}</span>
                </li>
              ))}
            </ul>

            <p className='text-[11px] font-bold text-stone-500 dark:text-stone-500 pt-3 border-t border-secondary/10 dark:border-stone-800'>
              {track.format}
            </p>
          </div>
        ))}
      </div>

     
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16'>
        {bookingSteps.map((step, idx) => (
          <div key={step.title} className='flex gap-3'>
            <span className='shrink-0 w-8 h-8 rounded-full bg-primary/25 dark:bg-stone-800 text-secondary dark:text-primary font-extrabold text-sm flex items-center justify-center'>
              {idx + 1}
            </span>
            <div>
              <h4 className='text-sm font-bold text-tertiary dark:text-stone-100'>
                {step.title}
              </h4>
              <p className='text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed'>
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

     
      <div className='bg-light dark:bg-stone-900 border border-secondary/30 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm max-w-3xl mx-auto'>
        <h3 className='text-xl sm:text-2xl font-bold text-tertiary dark:text-stone-100 text-center mb-1'>
          Organization Booking Request
        </h3>
        <p className='text-xs sm:text-sm text-stone-600 dark:text-stone-400 text-center mb-8'>
          Tell us about your group and we'll follow up with a tailored proposal.
        </p>

        {status === 'success' ? (
          <div className='text-center py-10'>
            <p className='text-2xl mb-2'>🌿</p>
            <p className='font-bold text-tertiary dark:text-stone-100'>Request received!</p>
            <p className='text-sm text-stone-600 dark:text-stone-400 mt-1'>
              Thanks for reaching out — we'll be in touch soon with a proposal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-1.5'>
                  Contact Name
                </label>
                <input
                  type='text'
                  required
                  value={formData.contactName}
                  onChange={(e) => handleChange('contactName', e.target.value)}
                  className='w-full rounded-xl border border-secondary/30 dark:border-stone-700 bg-white dark:bg-stone-950 text-tertiary dark:text-stone-100 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-primary'
                />
              </div>
              <div>
                <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-1.5'>
                  Organization / Group Name
                </label>
                <input
                  type='text'
                  required
                  placeholder='e.g. Senior Center, School, Scout Troop'
                  value={formData.orgName}
                  onChange={(e) => handleChange('orgName', e.target.value)}
                  className='w-full rounded-xl border border-secondary/30 dark:border-stone-700 bg-white dark:bg-stone-950 text-tertiary dark:text-stone-100 placeholder:text-stone-400 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-primary'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-1.5'>
                  Email Address
                </label>
                <input
                  type='email'
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className='w-full rounded-xl border border-secondary/30 dark:border-stone-700 bg-white dark:bg-stone-950 text-tertiary dark:text-stone-100 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-primary'
                />
              </div>
              <div>
                <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-1.5'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className='w-full rounded-xl border border-secondary/30 dark:border-stone-700 bg-white dark:bg-stone-950 text-tertiary dark:text-stone-100 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-primary'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-2'>
                Target Audience
              </label>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {audienceOptions.map((option) => (
                  <label
                    key={option}
                    className='flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 cursor-pointer'
                  >
                    <input
                      type='checkbox'
                      checked={formData.audience.includes(option)}
                      onChange={() => toggleAudience(option)}
                      className='w-4 h-4 rounded accent-secondary dark:accent-primary'
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-1.5'>
                  Estimated Group Size
                </label>
                <select
                  required
                  value={formData.groupSize}
                  onChange={(e) => handleChange('groupSize', e.target.value)}
                  className='w-full rounded-xl border border-secondary/30 dark:border-stone-700 bg-white dark:bg-stone-950 text-tertiary dark:text-stone-100 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-primary'
                >
                  <option value='' disabled>
                    Select a range
                  </option>
                  {groupSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-1.5'>
                  Desired Timeframe or Dates
                </label>
                <input
                  type='text'
                  placeholder='e.g. Early November, flexible'
                  value={formData.timeframe}
                  onChange={(e) => handleChange('timeframe', e.target.value)}
                  className='w-full rounded-xl border border-secondary/30 dark:border-stone-700 bg-white dark:bg-stone-950 text-tertiary dark:text-stone-100 placeholder:text-stone-400 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-primary'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-2'>
                Preferred Location
              </label>
              <div className='space-y-2'>
                {locationOptions.map((option) => (
                  <label
                    key={option}
                    className='flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='location'
                      required
                      checked={formData.location === option}
                      onChange={() => handleChange('location', option)}
                      className='w-4 h-4 accent-secondary dark:accent-primary'
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-xs font-bold text-tertiary dark:text-stone-300 mb-1.5'>
                Tell us about your goals or accessibility needs
              </label>
              <textarea
                rows={4}
                value={formData.goals}
                onChange={(e) => handleChange('goals', e.target.value)}
                className='w-full rounded-xl border border-secondary/30 dark:border-stone-700 bg-white dark:bg-stone-950 text-tertiary dark:text-stone-100 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-primary resize-none'
              />
            </div>

            {status === 'error' && (
              <p className='text-xs font-bold text-red-600 dark:text-red-400 text-center'>
                Something went wrong sending your request — please try again, or email us at
                contact@wildbyte.dev.
              </p>
            )}

            <button
              type='submit'
              disabled={status === 'submitting'}
              className='w-full bg-secondary hover:bg-tertiary dark:bg-primary dark:text-tertiary text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-7 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {status === 'submitting' ? 'Sending…' : 'Request Workshop Proposal'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EarlyAccess;