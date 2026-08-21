import React from 'react';
import { Sparkles, Calendar, MapPin, Users, ArrowRight, Leaf, Cpu, Compass } from 'lucide-react';

export default function Programs({ handleNavigation }) {
  return (
    <section id="programs" className="scroll-mt-20 py-16 px-4 sm:px-12 lg:px-24 bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-300 dark:border-emerald-800">
            <Compass className="w-3.5 h-3.5" /> Wild Byte Learning & Workshops
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Connecting Nature, Community & Technology
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            Our hands-on programs blend ecological field research, community gardening, and custom digital tools to foster meaningful outdoor engagement for all ages.
          </p>
        </div>

        
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors">
          
          
          <div className="lg:col-span-5 bg-emerald-800 dark:bg-emerald-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-emerald-600/30 dark:bg-emerald-800/30 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <span className="inline-block px-3 py-1 bg-amber-400 text-stone-950 text-xs font-black uppercase rounded-md shadow-sm">
                Featured Fall 2026 Cohort
              </span>
              <h3 className="text-3xl font-extrabold text-amber-300">
                Junior Ecologist Workshop Series
              </h3>
              <p className="text-stone-200 text-sm leading-relaxed">
                An interactive 7-week outdoor adventure for kids ages 6–12 blending soil science under digital microscopes, native plant stewardship, farm animal care, and digital storytelling[cite: 3, 4, 5, 21].
              </p>
            </div>

            <div className="pt-8 space-y-3 border-t border-emerald-700 dark:border-emerald-800/80 text-xs text-stone-200 relative z-10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Saturdays, Sept 26 – Nov 7, 2026 (9:00 AM – 11:00 AM) [cite: 48]</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Root 66 Community Garden, Rancho Cucamonga [cite: 48]</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Facilitated by Angelica & Victoria [cite: 48]</span>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                What Makes This Program Unique?
              </h4>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                Junior Ecologists don't just study nature—they create lasting community art and compile field data into Wild Byte's custom story-builder software to present interactive presentations at graduation[cite: 4, 5, 48]!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800">
                  <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100">Field Science</h5>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">Soil analysis & CA native plant botany[cite: 3, 4, 7, 9].</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800">
                  <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100">Digital Tools</h5>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">Digital microscopes & story software[cite: 3, 5, 48].</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div>
                <span className="text-2xl font-black text-emerald-800 dark:text-amber-400">$195</span>
                <span className="text-xs text-stone-500 dark:text-stone-400"> / full 7-week series ($75 per additional sibling) [cite: 14, 15]</span>
              </div>

              <a
                href="#junior-ecologist"
                onClick={(e) => {
                  if (handleNavigation) {
                    e.preventDefault();
                    handleNavigation('/', 'junior-ecologist');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-tertiary dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
              >
                View Full Syllabus & Details <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}