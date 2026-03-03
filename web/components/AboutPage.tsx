import React from 'react';
import { ArrowRight } from 'lucide-react';
import { copy } from '../copy/redesign';

type NavView = 'home' | 'solutions' | 'pilot' | 'who-we-serve' | 'how-we-work' | 'about' | 'contact' | 'catalog' | 'guide' | 'service' | 'brochure' | 'safety' | 'privacy';

interface AboutPageProps {
  onNavigate: (view: NavView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { about } = copy;

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl text-stone-900">
            {about.headline}
          </h1>
        </div>
      </section>

      <section className="py-12 px-6 max-w-3xl mx-auto space-y-12">
        <div>
          <h2 className="font-display text-xl text-stone-900 mb-3">Mission</h2>
          <p className="text-lg text-stone-600">
            {about.mission}
          </p>
        </div>

        <div className="surface rounded-3xl p-8">
          <h2 className="font-display text-xl text-stone-900 mb-4">{about.principlesTitle}</h2>
          <ul className="space-y-3">
            {about.principles.map((p) => (
              <li key={p} className="flex items-center gap-3 text-stone-700">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all"
          >
            {about.footerCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
