import React from 'react';
import { ArrowRight, BadgeCheck, Bot, MapPinned, MoveRight, Pickaxe, Target, Users } from 'lucide-react';
import { resolveAssetUrl } from '../utils/asset';

type NavView =
  | 'home'
  | 'solutions'
  | 'pilot'
  | 'who-we-serve'
  | 'how-we-work'
  | 'about'
  | 'contact'
  | 'catalog'
  | 'guide'
  | 'service'
  | 'brochure'
  | 'safety'
  | 'privacy'
  | 'project-strawberry-harvest-assist';

interface StrawberryHarvestAssistPageProps {
  onNavigate: (view: NavView) => void;
}

const proofPoints = [
  { label: 'Stage', value: 'Prototype in development' },
  { label: 'Primary crop', value: 'Strawberries' },
  { label: 'Pilot region', value: 'Watsonville, California' },
  { label: 'Focus', value: 'Labor savings and loss reduction' },
];

const workflow = [
  'Worker harvests continuously instead of stopping to haul full crates.',
  'Filled crates are placed directly onto a robotic harvest-assist vehicle.',
  'When capacity is reached, the vehicle transports fruit to the collection point.',
  'The platform returns to the picker so harvesting can continue with minimal interruption.',
];

const milestones = [
  {
    title: 'Prototype completion',
    body: 'Finalize vehicle integration across mobility, sensing, compute, and worker-facing crate handling.',
  },
  {
    title: 'Field deployment',
    body: 'Bring the system into commercial strawberry rows and tune behavior around real harvest patterns.',
  },
  {
    title: 'Pilot validation',
    body: 'Measure worker utilization, transport reduction, usability, and operational reliability during harvest.',
  },
];

export const StrawberryHarvestAssistPage: React.FC<StrawberryHarvestAssistPageProps> = ({
  onNavigate,
}) => {
  const pickingImage = resolveAssetUrl('/projects/strawberry-harvest-assist/strawberry_picking.jpg');
  const transportImage = resolveAssetUrl('/projects/strawberry-harvest-assist/strawberry_transport.jpg');
  const fleetImage = resolveAssetUrl('/projects/strawberry-harvest-assist/fleet_of_machines.png');

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,107,53,0.16),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(201,119,79,0.18),transparent_28%),linear-gradient(180deg,rgba(58,47,37,0.96),rgba(58,47,37,0.88))]" />
        <div className="absolute inset-0 grain opacity-25" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-4xl text-white">
              <p className="text-xs uppercase tracking-[0.32em] text-amber-200/90 reveal">
                Project Spotlight
              </p>
              <h1 className="font-display text-4xl md:text-6xl leading-tight mt-4 reveal reveal-delay-1">
                Strawberry Harvest Assist
              </h1>
              <p className="mt-6 text-lg md:text-xl text-stone-100/90 max-w-3xl reveal reveal-delay-2">
                A worker-centered robotic collection platform designed to reduce transport downtime,
                cut physical strain, and recover yield lost to harvest bottlenecks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 reveal reveal-delay-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                  California-based
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                  Commercial farm pilot in planning
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                  Built for specialty crop harvest workflows
                </span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:bg-amber-300 transition-all"
                >
                  Discuss the project
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="border border-white/50 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white/10 transition-all"
                >
                  Learn about Hyphai
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <div className="surface rounded-[2rem] overflow-hidden border border-white/10 bg-white/10 shadow-2xl shadow-black/20">
                <img
                  src={pickingImage}
                  alt="Strawberry harvesters picking fruit in the field."
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
                <div className="border-t border-white/10 bg-stone-950/70 px-6 py-5 text-stone-100">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-200/80">Field context</p>
                  <p className="mt-2 text-sm text-stone-200/90">
                    Built around the reality of active strawberry harvest work, where efficiency is limited by transport interruptions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {proofPoints.map(point => (
            <div key={point.label} className="surface rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{point.label}</p>
              <p className="mt-3 text-xl font-semibold text-stone-900">{point.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface rounded-[2rem] p-8 md:p-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="font-display text-3xl text-stone-900 mt-6">The operating problem</h2>
            <p className="mt-4 text-lg text-stone-700">
              Strawberry harvest crews lose time every day because picking and transport are tightly
              coupled. Workers must repeatedly stop harvesting to carry full crates 300 to 900 feet to
              collection points, creating fatigue, idle time, and avoidable workflow breaks.
            </p>
            <p className="mt-4 text-stone-600">
              On labor-constrained farms, that lost time directly affects throughput and contributes to
              fruit remaining in the field. This project targets that operational gap rather than asking
              growers to redesign the whole harvest system.
            </p>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-stone-200">
              <img
                src={transportImage}
                alt="Harvesters carrying strawberry crates through the field."
                className="h-[260px] w-full object-cover"
              />
            </div>
          </div>

          <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center">
              <BadgeCheck className="w-7 h-7" />
            </div>
            <h2 className="font-display text-3xl mt-6">Why this approach</h2>
            <p className="mt-4 text-stone-200">
              Existing options are usually manual carts or expensive autonomous platforms that are not
              tuned for strawberry picking behavior. The goal here is a lower-friction system that fits
              the worker, the row, and the collection workflow.
            </p>
            <ul className="mt-6 space-y-3 text-stone-200">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-amber-300" />
                Worker-centric interaction rather than fully replacing crews
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-amber-300" />
                Lower operational interruption during active harvest windows
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-amber-300" />
                Designed around measurable productivity gains in commercial use
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/55">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">System concept</p>
            <h2 className="font-display text-3xl md:text-4xl text-stone-900 mt-3">
              How the harvest-assist loop works
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="surface rounded-[2rem] p-8">
              <div className="space-y-6">
                {workflow.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-2xl bg-amber-100 text-orange-700 flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-stone-700 text-lg">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-gradient-to-br from-emerald-50 via-amber-50 to-white p-5 md:p-6">
              <div className="overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-lg shadow-stone-200/40">
                <img
                  src={fleetImage}
                  alt="Illustration of a fleet-style harvest assist concept supporting pickers in strawberry rows."
                  className="w-full object-cover"
                />
              </div>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl bg-white/80 p-5 border border-white">
                  <div className="flex items-center gap-3 text-stone-900">
                    <Users className="w-5 h-5 text-emerald-700" />
                    <span className="font-semibold">Continuous picking</span>
                  </div>
                  <p className="mt-2 text-sm text-stone-600">Workers stay on task instead of breaking rhythm for transport runs.</p>
                </div>
                <div className="flex justify-center text-stone-400">
                  <MoveRight className="w-6 h-6" />
                </div>
                <div className="rounded-3xl bg-white/80 p-5 border border-white">
                  <div className="flex items-center gap-3 text-stone-900">
                    <Bot className="w-5 h-5 text-emerald-700" />
                    <span className="font-semibold">Mobile field support</span>
                  </div>
                  <p className="mt-2 text-sm text-stone-600">Harvest movement is handled in the background as part of the field workflow.</p>
                </div>
                <div className="flex justify-center text-stone-400">
                  <MoveRight className="w-6 h-6" />
                </div>
                <div className="rounded-3xl bg-white/80 p-5 border border-white">
                  <div className="flex items-center gap-3 text-stone-900">
                    <Pickaxe className="w-5 h-5 text-emerald-700" />
                    <span className="font-semibold">Higher effective labor output</span>
                  </div>
                  <p className="mt-2 text-sm text-stone-600">The same crew can spend a larger share of the day actually harvesting fruit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-3">
          <div className="surface rounded-[2rem] p-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl text-stone-900 mt-5">Deployment fit</h3>
            <p className="mt-3 text-stone-600">
              The system is being designed around real harvest conditions, with emphasis on worker interaction,
              row-level maneuvering, crate handling, and minimal disruption to existing farm operations.
            </p>
          </div>

          <div className="surface rounded-[2rem] p-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MapPinned className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl text-stone-900 mt-5">California relevance</h3>
            <p className="mt-3 text-stone-600">
              Built for specialty crop operations where labor availability, harvesting speed, and fruit recovery
              directly affect revenue. Initial pilot work is targeted for Watsonville-area strawberry production.
            </p>
          </div>

          <div className="surface rounded-[2rem] p-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl text-stone-900 mt-5">Current build focus</h3>
            <p className="mt-3 text-stone-600">
              The near-term effort is centered on prototype completion, autonomy refinement, and field validation
              of worker productivity, usability, and reliability under harvest conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Execution plan</p>
            <h2 className="font-display text-3xl md:text-4xl mt-3">Near-term milestones</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {milestones.map((item, index) => (
              <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                <p className="text-sm font-mono text-amber-300">0{index + 1}</p>
                <h3 className="font-display text-2xl mt-3">{item.title}</h3>
                <p className="mt-4 text-stone-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center surface rounded-[2rem] p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Project contact</p>
          <h2 className="font-display text-3xl md:text-4xl text-stone-900 mt-3">
            Interested in piloting or reviewing the project?
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            This page is intended as a direct overview of the Strawberry Harvest Assist project for partners,
            growers, and grant reviewers who want a concise view of the problem, system, and execution plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-amber-300 transition-all"
            >
              Contact Hyphai
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="border border-stone-300 text-stone-800 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-stone-50 transition-all"
            >
              Back to site
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
