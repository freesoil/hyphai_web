
import React, { useState, useEffect } from 'react';
import { Send, Check, AlertTriangle, Wrench, UserCheck } from 'lucide-react';
import { Machine } from '../machineData';

interface PilotServiceProps {
  logEvent: (event: string) => void;
  machine: Machine | null;
}

export const PilotService: React.FC<PilotServiceProps> = ({ logEvent, machine }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
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
        message: `I am interested in the pilot service for the ${machine.name} (${machine.model}).`
      }));
    }
  }, [machine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) {
      setError('Please fill in your name and email address.');
      return;
    }
    const event = machine 
      ? `Pilot service form for ${machine.name} submitted by ${formState.name}`
      : `General pilot service form submitted by ${formState.name}`;
    logEvent(event);
    setError('');
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="bg-white py-24 px-6 animate-in fade-in duration-700">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center bg-amber-100 text-amber-800 w-20 h-20 rounded-full mb-6 mx-auto">
              <Check size={40} />
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-4">Thank You!</h1>
            <p className="text-stone-600 text-lg mb-12">
              Your inquiry has been received. Our team will review your information and get back to you shortly.
            </p>
          </div>

          <div className="bg-stone-50/70 p-8 rounded-2xl border border-stone-200">
            <h3 className="font-bold text-lg text-stone-800 mb-4 text-center">What Happens Next?</h3>
            <ol className="space-y-4 text-stone-600">
              <li className="flex items-start gap-4">
                <div className="font-bold text-lg text-orange-600">1.</div>
                <div>
                  <h4 className="font-semibold">Feasibility Review</h4>
                  <p className="text-sm">Our team will assess if your location and needs fit the pilot program's requirements.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="font-bold text-lg text-orange-600">2.</div>
                <div>
                  <h4 className="font-semibold">Follow-up Call</h4>
                  <p className="text-sm">If the initial review is positive, we'll schedule a brief call to discuss your operational details.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="font-bold text-lg text-orange-600">3.</div>
                <div>
                  <h4 className="font-semibold">On-site Visit & Planning</h4>
                  <p className="text-sm">A field expert may visit your location to plan the execution and logistics.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="font-bold text-lg text-orange-600">4.</div>
                <div>
                  <h4 className="font-semibold">Service Agreement</h4>
                  <p className="text-sm">We'll provide a clear agreement with scope and pricing before any work begins.</p>
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
          <h1 className="text-5xl font-bold tracking-tighter text-stone-900">
            {machine ? `Service for ${machine.name}` : 'Hire the Outcome, Not the Tool.'}
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">
            {machine 
              ? `Submit an inquiry to have our expert team operate the ${machine.name} for you.`
              : 'Eliminate capital risk and labor headaches. Our expert team brings the specialized machinery to your field and handles the technical execution from fence-to-fence.'
            }
          </p>
        </div>
        
        {!machine && (
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-stone-50/70 p-8 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-center bg-indigo-100 text-indigo-800 w-12 h-12 rounded-full mb-4">
                <Wrench size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Zero Maintenance</h3>
              <p className="text-stone-600">We own the downtime risk. You only pay for the completed acre.</p>
            </div>
            <div className="bg-stone-50/70 p-8 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-center bg-indigo-100 text-indigo-800 w-12 h-12 rounded-full mb-4">
                <UserCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Operators</h3>
              <p className="text-stone-600">Certified precision drivers who understand your crop's sensitivity.</p>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Express Your Interest</h2>
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
                  Farm Size (e.g., Acres, Hectares)
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
                  Tell us about your needs
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
                  className="w-full flex justify-center items-center gap-3 px-6 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                >
                  <Send size={20} />
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
