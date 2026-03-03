import React from 'react';
import { Sprout, Package } from 'lucide-react';
import { copy } from '../copy/redesign';

type NavView = 'home' | 'solutions' | 'pilot' | 'who-we-serve' | 'how-we-work' | 'about' | 'contact' | 'catalog' | 'guide' | 'service' | 'brochure' | 'safety' | 'privacy';

interface WhoWeServePageProps {
  onNavigate: (view: NavView) => void;
}

export const WhoWeServePage: React.FC<WhoWeServePageProps> = () => {
  const { whoWeServe } = copy;

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl text-stone-900">
            {whoWeServe.headline}
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            {whoWeServe.subhead}
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-5xl mx-auto space-y-16">
        <div className="surface rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl text-stone-900">{whoWeServe.growers.title}</h2>
          </div>
          <p className="text-stone-600 mb-4">{whoWeServe.growers.value}</p>
          <p className="text-sm font-medium text-stone-700 mb-2">{whoWeServe.growers.painPointsLabel}</p>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            {whoWeServe.growers.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="surface rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl text-stone-900">{whoWeServe.foodHubs.title}</h2>
          </div>
          <p className="text-stone-600 mb-4">{whoWeServe.foodHubs.value}</p>
          <p className="text-sm font-medium text-stone-700 mb-2">{whoWeServe.foodHubs.painPointsLabel}</p>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            {whoWeServe.foodHubs.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
