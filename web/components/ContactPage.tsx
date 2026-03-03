import React, { useState } from 'react';
import { Send, Check, AlertTriangle } from 'lucide-react';
import { copy } from '../copy/redesign';

interface ContactPageProps {
  logEvent: (event: string) => void;
}

/** Simple check: has @ and something after it, or looks like a phone (digits, +, spaces, parens, dashes). */
function looksLikeEmailOrPhone(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.includes('@')) {
    const [local, domain] = trimmed.split('@');
    return domain.length >= 2 && local.length >= 1 && domain.includes('.');
  }
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 10;
}

export const ContactPage: React.FC<ContactPageProps> = ({ logEvent }) => {
  const c = copy.contact;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    role: '',
    interest: '',
    busySeason: '',
    currentTools: '',
    emailOrPhone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = formState.emailOrPhone.trim();
    if (!trimmed) {
      setError(c.requiredError);
      return;
    }
    if (!looksLikeEmailOrPhone(trimmed)) {
      setError('Please enter a valid email address or phone number.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('https://formspree.io/f/mqelrdep', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: 'Contact',
          role: formState.role || undefined,
          primaryInterest: formState.interest || undefined,
          busySeasonWindow: formState.busySeason || undefined,
          currentTools: formState.currentTools || undefined,
          emailOrPhone: formState.emailOrPhone,
          message: formState.message || undefined
        })
      });
      if (!response.ok) throw new Error('Submission failed');
      logEvent('Contact form submitted');
      setSubmitted(true);
    } catch {
      setError(c.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl text-stone-900">
            {c.headline}
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-xl mx-auto">
            {c.subhead}
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-xl mx-auto">
        {submitted ? (
          <div className="surface rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Check size={32} />
              </div>
            </div>
            <h2 className="font-display text-2xl text-stone-900 mb-2">{c.successTitle}</h2>
            <p className="text-stone-600">{c.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="surface rounded-3xl p-8 space-y-5">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-stone-700 mb-1">{c.roleLabel}</label>
              <select
                id="role"
                name="role"
                value={formState.role}
                onChange={handleChange}
                className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select...</option>
                {c.roleOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-stone-700 mb-1">{c.interestLabel}</label>
              <select
                id="interest"
                name="interest"
                value={formState.interest}
                onChange={handleChange}
                className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select...</option>
                {c.interestOptions.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="busySeason" className="block text-sm font-medium text-stone-700 mb-1">{c.busySeasonLabel}</label>
              <input
                type="text"
                id="busySeason"
                name="busySeason"
                value={formState.busySeason}
                onChange={handleChange}
                placeholder={c.busySeasonPlaceholder}
                className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="currentTools" className="block text-sm font-medium text-stone-700 mb-1">{c.currentToolsLabel}</label>
              <input
                type="text"
                id="currentTools"
                name="currentTools"
                value={formState.currentTools}
                onChange={handleChange}
                placeholder={c.currentToolsPlaceholder}
                className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="emailOrPhone" className="block text-sm font-medium text-stone-700 mb-1">{c.emailPhoneLabel}</label>
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                value={formState.emailOrPhone}
                onChange={handleChange}
                required
                placeholder={c.emailPhonePlaceholder}
                className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">{c.messageLabel}</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4}
                className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder={c.messagePlaceholder}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertTriangle size={18} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-amber-400 text-stone-900 font-semibold rounded-lg hover:bg-amber-300 transition-all disabled:opacity-70"
            >
              <Send size={18} /> {isSubmitting ? c.sending : c.submit}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
