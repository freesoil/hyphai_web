import React, { useState } from 'react';
import { ArrowRight, Check, Send, AlertTriangle } from 'lucide-react';
import { copy } from '../copy/redesign';

type NavView = 'home' | 'solutions' | 'pilot' | 'who-we-serve' | 'how-we-work' | 'about' | 'contact' | 'catalog' | 'guide' | 'service' | 'brochure' | 'safety' | 'privacy';

interface PilotProgramsPageProps {
  onNavigate: (view: NavView) => void;
  logEvent: (event: string) => void;
}

function looksLikeEmail(value: string): boolean {
  const t = value.trim();
  return t.includes('@') && t.split('@')[1]?.includes('.') && t.length >= 5;
}

export const PilotProgramsPage: React.FC<PilotProgramsPageProps> = ({ onNavigate, logEvent }) => {
  const { pilot } = copy;
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistError, setWaitlistError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = waitlistEmail.trim();
    if (!trimmed) {
      setWaitlistError('Please enter your email.');
      return;
    }
    if (!looksLikeEmail(trimmed)) {
      setWaitlistError('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    setWaitlistError('');
    try {
      const response = await fetch('https://formspree.io/f/mqelrdep', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: waitlistEmail,
          requestType: 'Pilot waitlist (Software Summer 2026)',
          message: 'Join pilot waitlist - Operational Software Pilot Summer 2026'
        })
      });
      if (!response.ok) throw new Error('Submission failed');
      logEvent('Pilot waitlist submitted');
      setWaitlistSubmitted(true);
    } catch {
      setWaitlistError('We could not add you to the waitlist. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl text-stone-900">
            {pilot.headline}
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            {pilot.subhead}
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-5xl mx-auto space-y-16">
        <div className="surface rounded-3xl p-8">
          <h2 className="font-display text-2xl text-stone-900 mb-4">{pilot.equipment.title}</h2>
          <p className="text-stone-600 mb-4">{pilot.equipment.intro}</p>
          <p className="text-stone-600 mb-4">
            {pilot.equipment.opportunities}
          </p>
          <p className="text-stone-600 mb-4">{pilot.equipment.partnersReceive}</p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 mb-6">
            {pilot.equipment.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-sm text-stone-500 italic mb-4">{pilot.equipment.pricingNote}</p>
          <button
            onClick={() => {
              logEvent('Pilot → Explore Equipment');
              onNavigate('catalog');
            }}
            className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
          >
            {pilot.equipment.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="surface rounded-3xl p-8">
          <h2 className="font-display text-2xl text-stone-900 mb-4">{pilot.software.title}</h2>
          <p className="text-stone-600 mb-4">{pilot.software.intro}</p>
          <p className="text-stone-600 mb-4">{pilot.software.focusAreas}</p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 mb-6">
            {pilot.software.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {!waitlistSubmitted ? (
            <form onSubmit={handleWaitlistSubmit} className="max-w-md space-y-4">
              <label htmlFor="pilot-email" className="block text-sm font-medium text-stone-700">
                {pilot.software.cta}
              </label>
              <div className="flex gap-2 flex-wrap">
                <input
                  id="pilot-email"
                  type="email"
                  value={waitlistEmail}
                  onChange={e => setWaitlistEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-[200px] px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-amber-400 text-stone-900 font-semibold rounded-lg hover:bg-amber-300 transition-all disabled:opacity-70 flex items-center gap-2"
                >
                  <Send size={18} /> {isSubmitting ? 'Sending...' : 'Join waitlist'}
                </button>
              </div>
              {waitlistError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle size={18} /> {waitlistError}
                </div>
              )}
            </form>
          ) : (
            <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 rounded-xl max-w-md">
              <Check size={24} />
              <p className="font-medium">You're on the list. We'll be in touch about the Summer 2026 pilot.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => {
              logEvent('Pilot → Talk to us');
              onNavigate('contact');
            }}
            className="bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all"
          >
            {pilot.footerCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
