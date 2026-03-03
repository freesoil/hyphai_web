import React from 'react';
import { ArrowRight, LayoutDashboard, Radio, Cpu, Wrench } from 'lucide-react';
import { copy } from '../copy/redesign';

type NavView = 'home' | 'solutions' | 'pilot' | 'who-we-serve' | 'how-we-work' | 'about' | 'contact' | 'catalog' | 'guide' | 'service' | 'brochure' | 'safety' | 'privacy';

const SECTION_ICONS = [LayoutDashboard, Radio, Cpu, Wrench] as const;

interface SolutionsPageProps {
  onNavigate: (view: NavView) => void;
  logEvent: (event: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate, logEvent }) => {
  const { solutions } = copy;

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl text-stone-900">
            {solutions.headline}
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            {solutions.subhead}
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-5xl mx-auto space-y-16">
        {solutions.sections.map((section, idx) => {
          const Icon = SECTION_ICONS[idx];
          const isEquipment = section.title === 'Equipment Integration';
          return (
            <div key={section.title} className="surface rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl text-stone-900">{section.title}</h2>
              </div>
              <p className="text-stone-600 mb-4">{section.intro}</p>
              {'bullets' in section && (
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  {section.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
              {isEquipment && 'pilotIntegrations' in section && (
                <>
                  <p className="text-stone-600 mb-4">{section.pilotIntegrations}</p>
                  <button
                    onClick={() => {
                      logEvent('Solutions → Explore Equipment');
                      onNavigate('catalog');
                    }}
                    className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
                  >
                    {section.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </section>

      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-xl text-stone-800">{solutions.closing}</p>
          <button
            onClick={() => {
              logEvent('Solutions → Talk to us');
              onNavigate('contact');
            }}
            className="mt-6 bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all"
          >
            {copy.home.hero.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
