import React from 'react';
import { ArrowRight, LayoutDashboard, Radio, Cpu, Wrench } from 'lucide-react';
import { resolveAssetUrl } from '../utils/asset';
import { copy } from '../copy/redesign';

type NavView = 'home' | 'solutions' | 'pilot' | 'who-we-serve' | 'how-we-work' | 'about' | 'contact' | 'catalog' | 'guide' | 'service' | 'brochure' | 'safety' | 'privacy';

const PILLAR_ICONS = [LayoutDashboard, Radio, Cpu, Wrench] as const;

export const HomePage: React.FC<{
  setView: (view: NavView) => void;
  logEvent: (event: string) => void;
}> = ({ setView, logEvent }) => {
  const nav = (view: NavView, event: string) => {
    logEvent(event);
    setView(view);
  };
  const { home } = copy;

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative min-h-[72vh] flex items-center overflow-hidden">
        <video
          src={resolveAssetUrl('/hero-transplanter-video.mp4')}
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 grain" />
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="max-w-3xl text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200/90 reveal">
                {home.hero.pill}
              </p>
              <h1 className="font-display text-4xl md:text-6xl leading-tight mt-4 reveal reveal-delay-1">
                {home.hero.headline}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-stone-100/90 reveal reveal-delay-2">
                {home.hero.subhead}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 reveal reveal-delay-3">
                <button
                  onClick={() => nav('contact', 'Clicked "Talk to us"')}
                  className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:bg-amber-300 transition-all"
                >
                  {home.hero.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => nav('solutions', 'Clicked "Explore solutions"')}
                  className="border border-white/60 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition-all"
                >
                  {home.hero.ctaSecondary}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-stone-900">
            {home.builtAround.headline}
          </h2>
          <p className="mt-4 text-stone-600 max-w-3xl">{home.builtAround.body}</p>
          <p className="mt-3 text-stone-700 font-medium">{home.builtAround.closing}</p>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="surface rounded-3xl p-6">
              <h3 className="font-display text-xl text-stone-900 mb-3">{home.builtAround.growers.title}</h3>
              <ul className="text-stone-600 space-y-2 text-sm">
                {home.builtAround.growers.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface rounded-3xl p-6">
              <h3 className="font-display text-xl text-stone-900 mb-3">{home.builtAround.foodHubs.title}</h3>
              <ul className="text-stone-600 space-y-2 text-sm">
                {home.builtAround.foodHubs.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/60">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-stone-900">
            {home.oneSystem.headline}
          </h2>
          <p className="mt-4 text-stone-600 max-w-3xl">{home.oneSystem.intro}</p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.oneSystem.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <div key={pillar.title} className="surface rounded-3xl p-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl mt-5 text-stone-900">{pillar.title}</h3>
                  <p className="text-sm text-stone-600 mt-3">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-stone-700 font-medium">{home.oneSystem.closing}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-stone-900">
            {home.partnership.headline}
          </h2>
          <p className="mt-4 text-stone-600 max-w-3xl">{home.partnership.body}</p>
          <div className="mt-12 surface rounded-3xl p-8">
            <h3 className="font-display text-2xl text-stone-900">{home.partnership.designedToFit.headline}</h3>
            <p className="mt-2 text-stone-600">{home.partnership.designedToFit.steps}</p>
            <p className="mt-3 text-stone-700 font-medium">{home.partnership.designedToFit.tagline}</p>
            <button
              onClick={() => nav('contact', 'Clicked "Talk to us" (partnership)')}
              className="mt-6 bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-amber-300 transition-all"
            >
              {home.partnership.designedToFit.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl">{home.footerCta.headline}</h2>
          <p className="text-stone-300 mt-4 max-w-2xl mx-auto">{home.footerCta.body}</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => nav('contact', 'Clicked "Talk to us" (footer)')}
              className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-amber-300 transition-all"
            >
              {home.footerCta.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => nav('solutions', 'Clicked "Explore solutions" (footer)')}
              className="border border-white/50 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              {home.footerCta.ctaSecondary}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
