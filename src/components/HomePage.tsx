import React from 'react';
import { ArrowRight, Cpu, Radio, Wrench, ClipboardList, Sprout } from 'lucide-react';
import { resolveAssetUrl } from '../utils/asset';

type View = 'guide' | 'service' | 'catalog';

export const HomePage: React.FC<{ setView: (view: View) => void; logEvent: (event: string) => void }> = ({
  setView,
  logEvent
}) => {
  const handleNavigation = (view: View, event: string) => {
    logEvent(event);
    setView(view);
  };

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
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 grain"></div>
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="max-w-3xl text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200/90 reveal">
                Farm-first AgTech for specialty crops
              </p>
              <h1 className="font-display text-4xl md:text-6xl leading-tight mt-4 reveal reveal-delay-1">
                Let’s grow together with practical, field-ready technology.
              </h1>
              <p className="mt-5 text-lg md:text-xl text-stone-100/90 reveal reveal-delay-2">
                We help vegetable and fruit growers use AI, sensors, automation, and software only where it saves time
                and labor. Consultation is free because long-term relationships matter more than quick sales.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 reveal reveal-delay-3">
                <button
                  onClick={() => handleNavigation('service', 'Clicked "Free Consultation"')}
                  className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:bg-amber-300 transition-all"
                >
                  Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleNavigation('catalog', 'Clicked "Explore Equipment"')}
                  className="border border-white/60 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition-all"
                >
                  Explore Equipment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-stone-200/80">
                <span>Vegetables + Fruits</span>
                <span>Practical ROI</span>
                <span>Relationship-first</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">How we help</p>
              <h2 className="font-display text-3xl md:text-4xl mt-4">
                A calm, practical path from curiosity to real on-farm results.
              </h2>
            </div>
            <div className="text-stone-600 max-w-xl">
              We listen first, map the bottlenecks, and only recommend technology that genuinely reduces labor,
              improves quality, or simplifies decisions.
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'AI + Sensor Roadmap',
                description: 'Crop-specific guidance on sensing, automation, and AI with clear ROI.',
                icon: <Cpu className="w-6 h-6" />
              },
              {
                title: 'Field Monitoring',
                description: 'Practical sensor strategy for irrigation, microclimates, and crop health.',
                icon: <Radio className="w-6 h-6" />
              },
              {
                title: 'Equipment + Sourcing',
                description: 'Cost-effective tools and integration, from transplanters to light automation.',
                icon: <Wrench className="w-6 h-6" />
              },
              {
                title: 'Workflow + Software',
                description: 'Field-friendly record-keeping and traceability systems crews actually use.',
                icon: <ClipboardList className="w-6 h-6" />
              }
            ].map((card, index) => (
              <div
                key={card.title}
                className={`surface rounded-3xl p-6 reveal ${index === 1 ? 'reveal-delay-1' : ''} ${index === 2 ? 'reveal-delay-2' : ''} ${index === 3 ? 'reveal-delay-3' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-display text-xl mt-5">{card.title}</h3>
                <p className="text-sm text-stone-600 mt-3">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/60">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Field notes</p>
            <h2 className="font-display text-3xl md:text-4xl mt-4">
              Supporting a specialty organic farm with crew-first software.
            </h2>
            <p className="text-stone-600 mt-4">
              We are helping an organic farm streamline record-keeping and traceability with a field-friendly app
              designed for crews. The goal is simple: reduce daily logging friction while improving operational clarity.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wide">
                Crew-friendly UI
              </span>
              <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wide">
                Traceability-ready
              </span>
              <span className="px-4 py-2 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wide">
                Built from field feedback
              </span>
            </div>
          </div>
          <div className="surface rounded-[32px] p-8 relative overflow-hidden">
            <div className="absolute -top-12 -right-10 w-40 h-40 rounded-full bg-amber-200/40 blur-2xl"></div>
            <div className="absolute -bottom-16 -left-10 w-40 h-40 rounded-full bg-emerald-200/40 blur-2xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Current focus</p>
                  <p className="font-display text-xl">Specialty crop operations</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Records in-field', value: 'Simplified' },
                  { label: 'Traceability', value: 'Improved' },
                  { label: 'Labor friction', value: 'Reduced' },
                  { label: 'Decision clarity', value: 'Rising' }
                ].map(item => (
                  <div key={item.label} className="bg-white/70 border border-white/80 rounded-2xl p-4">
                    <p className="text-xs uppercase tracking-wide text-stone-500">{item.label}</p>
                    <p className="font-display text-lg text-stone-800 mt-2">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div className="surface rounded-3xl p-8 float-slow">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Consultation flow</p>
              <h2 className="font-display text-3xl mt-4">Three simple steps.</h2>
              <p className="text-stone-600 mt-3">
                A quick, grounded process to uncover what is working, what is not, and where technology could help.
              </p>
              <button
                onClick={() => handleNavigation('service', 'Clicked "Consultation Steps"')}
                className="mt-6 text-emerald-700 font-semibold inline-flex items-center gap-2"
              >
                See consultation details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Listen on-site or remote',
                  description: 'We learn your crop, scale, workflow, and current tools.'
                },
                {
                  step: '2',
                  title: 'Map the bottlenecks',
                  description: 'We identify the highest-impact opportunities for sensors, AI, or automation.'
                },
                {
                  step: '3',
                  title: 'Build the roadmap',
                  description: 'You get a practical plan with options for software or equipment if helpful.'
                }
              ].map(card => (
                <div key={card.step} className="bg-white/80 border border-white/60 rounded-3xl p-6">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    {card.step}
                  </div>
                  <h3 className="font-display text-lg mt-4">{card.title}</h3>
                  <p className="text-sm text-stone-600 mt-2">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Bring a real farm problem. We will bring the tech lens.</h2>
          <p className="text-stone-300 mt-4 max-w-2xl mx-auto">
            If you are considering sensors, AI, automation, or workflow software, we will help you decide what is worth
            doing now and what can wait.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleNavigation('service', 'Clicked "Start Free Consultation"')}
              className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-amber-300 transition-all"
            >
              Start a free consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavigation('guide', 'Clicked "Equipment Guide"')}
              className="border border-white/50 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              Try the equipment guide
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
