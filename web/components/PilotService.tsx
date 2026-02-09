
import React, { useState, useEffect } from 'react';
import { Send, Check, AlertTriangle, Cpu, ClipboardList } from 'lucide-react';
import { Machine } from '../machineData';

interface PilotServiceProps {
  logEvent: (event: string) => void;
  machine: Machine | null;
}

export const PilotService: React.FC<PilotServiceProps> = ({ logEvent, machine }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    farmSize: '',
    message: ''
  });

  useEffect(() => {
    if (machine) {
      setFormState(prev => ({
        ...prev,
        message: `I would like consultation on integrating the ${machine.name} (${machine.model}) into our workflow.`
      }));
    }
  }, [machine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) {
      setError('Please fill in your name and email address.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    const event = machine
      ? `Consultation form for ${machine.name} submitted by ${formState.name}`
      : `General consultation form submitted by ${formState.name}`;

    try {
      const response = await fetch('https://formspree.io/f/mqelrdep', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          farmSize: formState.farmSize,
          message: formState.message,
          machine: machine ? `${machine.name} (${machine.model})` : 'General consultation'
        })
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      logEvent(event);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('We could not send your request. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white py-24 px-6 animate-in fade-in duration-700">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center bg-amber-100 text-amber-800 w-20 h-20 rounded-full mb-6 mx-auto">
              <Check size={40} />
            </div>
            <h1 className="font-display text-3xl text-stone-900 mb-4">Thank You!</h1>
            <p className="text-stone-600 text-lg mb-12">
              Your request has been received. We will review the details and follow up with next steps shortly.
            </p>
          </div>

          <div className="bg-stone-50/70 p-8 rounded-2xl border border-stone-200">
            <h3 className="font-display text-lg text-stone-800 mb-4 text-center">What Happens Next?</h3>
            <ol className="space-y-4 text-stone-600">
              <li className="flex items-start gap-4">
                <div className="font-bold text-lg text-orange-600">1.</div>
                <div>
                  <h4 className="font-semibold">Quick Review</h4>
                  <p className="text-sm">We review your goals, crops, and current tools to understand fit.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="font-bold text-lg text-orange-600">2.</div>
                <div>
                  <h4 className="font-semibold">Short Call</h4>
                  <p className="text-sm">We will schedule a brief call to understand workflows, labor constraints, and timing.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="font-bold text-lg text-orange-600">3.</div>
                <div>
                  <h4 className="font-semibold">Farm Context</h4>
                  <p className="text-sm">If helpful, we will review field conditions, crops, and existing systems.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="font-bold text-lg text-orange-600">4.</div>
                <div>
                  <h4 className="font-semibold">Actionable Roadmap</h4>
                  <p className="text-sm">You receive a clear plan with recommended tools, software options, and next steps.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl tracking-tight text-stone-900">
            {machine ? `Consultation for ${machine.name}` : 'Free Technical Consultation for Specialty Farms'}
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">
            {machine
              ? `Let’s assess fit, integration, and ROI for the ${machine.name} in your operation.`
              : 'We provide practical guidance on AI, sensors, equipment, and software workflows to reduce labor and improve operational clarity.'
            }
          </p>
        </div>
        
        {!machine && (
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-stone-50/70 p-8 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-center bg-emerald-100 text-emerald-800 w-12 h-12 rounded-full mb-4">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Practical ROI First</h3>
              <p className="text-stone-600">We focus on technology that meaningfully reduces labor or improves quality.</p>
            </div>
            <div className="bg-stone-50/70 p-8 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-center bg-amber-100 text-amber-800 w-12 h-12 rounded-full mb-4">
                <ClipboardList size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Crew-First Workflows</h3>
              <p className="text-stone-600">We design software and processes that are usable in the field.</p>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl text-center mb-8">Request a Consultation</h2>
          <div className="bg-stone-50/70 p-8 sm:p-12 rounded-3xl border border-stone-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="farmSize" className="block text-sm font-medium text-stone-700 mb-1">
                  Farm Size + Crops (e.g., 40 acres, leafy greens)
                </label>
                <input
                  type="text"
                  name="farmSize"
                  id="farmSize"
                  value={formState.farmSize}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                  Tell us about your operation and goals
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {error && (
                <div className="flex items-center gap-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-3 px-6 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Request Consultation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
