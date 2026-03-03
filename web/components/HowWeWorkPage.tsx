import React from 'react';
import { ArrowRight } from 'lucide-react';
import { copy } from '../copy/redesign';

type NavView = 'home' | 'solutions' | 'pilot' | 'who-we-serve' | 'how-we-work' | 'about' | 'contact' | 'catalog' | 'guide' | 'service' | 'brochure' | 'safety' | 'privacy';

interface HowWeWorkPageProps {
  onNavigate: (view: NavView) => void;
}

export const HowWeWorkPage: React.FC<HowWeWorkPageProps> = ({ onNavigate }) => {
  const { howWeWork } = copy;

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-lg md:text-xl text-stone-700 font-medium mb-8">
            {howWeWork.steps.map((step, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-stone-400">·</span>}
                {step}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-stone-900">
            {howWeWork.headline}
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            {howWeWork.subhead}
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {howWeWork.sections.map((section) => (
            <div key={section.title} className="surface rounded-3xl p-6">
              <h2 className="font-display text-xl text-stone-900 mb-2">{section.title}</h2>
              <p className="text-stone-600">{section.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all"
          >
            {howWeWork.footerCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
