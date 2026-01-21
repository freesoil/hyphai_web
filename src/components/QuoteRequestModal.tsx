
import React, { useState } from 'react';
import { Machine } from '../machineData';
import { Send, Check, AlertTriangle, X } from 'lucide-react';

interface QuoteRequestModalProps {
  machine: Machine | null;
  onClose: () => void;
  logEvent: (event: string) => void;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({ machine, onClose, logEvent }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  if (!machine) return null;

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
    logEvent(`Quote request submitted for ${machine.name} by ${formState.name}`);
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800">
            <X size={24} />
          </button>

          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Request a Quote</h2>
              <p className="text-stone-600 mb-6">For the <span className="font-semibold">{machine.name}</span></p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                  <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Your Message (Optional)</label>
                  <textarea name="message" id="message" rows={3} value={formState.message} onChange={handleChange} className="block w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder={`I'm interested in learning more about the ${machine.name}...`}/>
                </div>
                {error && (
                  <div className="flex items-center gap-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg"><AlertTriangle size={20}/><span>{error}</span></div>
                )}
                <div>
                  <button type="submit" className="w-full flex justify-center items-center gap-3 px-6 py-3 border-transparent rounded-lg shadow-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all">
                    <Send size={18} /> Submit Request
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center items-center bg-amber-100 text-amber-800 w-16 h-16 rounded-full mb-6 mx-auto">
                <Check size={32} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Quote Request Sent!</h2>
              <p className="text-stone-600 mb-6">Thank you for your interest. A member of our team will be in touch with you shortly.</p>
              
              <h3 className="font-bold text-lg text-stone-800 mb-3">What Happens Next?</h3>
              <ol className="text-left space-y-3 text-stone-600">
                <li className="flex items-start gap-3"><span className="font-bold text-orange-600">1.</span><span>We'll review your request and the machine configuration.</span></li>
                <li className="flex items-start gap-3"><span className="font-bold text-orange-600">2.</span><span>A sales representative will email you a preliminary quote and financing options within 2 business days.</span></li>
                <li className="flex items-start gap-3"><span className="font-bold text-orange-600">3.</span><span>We will schedule a brief call to finalize details and answer any questions.</span></li>
              </ol>

              <button onClick={onClose} className="mt-8 w-full bg-stone-200 text-stone-800 font-semibold py-3 rounded-lg hover:bg-stone-300 transition-all">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
