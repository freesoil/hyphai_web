
import React, { useState } from 'react';
import { Calendar, Users, MapPin, CheckCircle2, ArrowRight, ClipboardList, Briefcase, ShieldCheck, Phone } from 'lucide-react';
import { ServiceApplication } from '../types';

interface Props {
  onBack: () => void;
  configSummary?: string;
}

const ServicePilotInfo: React.FC<Props> = ({ onBack, configSummary }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ServiceApplication>({
    acres: 5,
    startDate: '',
    primaryReason: 'Labor Shortage',
    location: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Inquiry Successfully Lodged</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          One of our field operations managers will review your acreage and location. Expect a consultative call within 24 business hours to discuss equipment availability.
        </p>
        <button 
          onClick={onBack}
          className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            <Briefcase className="w-4 h-4" /> Professional Managed Operations
          </div>
          <h2 className="text-5xl font-black text-slate-900 leading-[1.1] italic">Hire the Outcome, <br/>Not the Tool.</h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Eliminate capital risk and labor headaches. Our expert team brings the specialized machinery to your field and handles the technical execution from fence-to-fence.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <ShieldCheck className="text-blue-600 w-6 h-6 mb-3" />
              <p className="font-bold text-slate-900">Zero Maintenance</p>
              <p className="text-xs text-slate-500 mt-2">We own the downtime risk. You only pay for the completed acre.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <Users className="text-blue-600 w-6 h-6 mb-3" />
              <p className="font-bold text-slate-900">Expert Operators</p>
              <p className="text-xs text-slate-500 mt-2">Certified precision drivers who understand your crop's sensitivity.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative">
          <div className="absolute -top-6 -right-6 bg-slate-900 text-white p-6 rounded-3xl shadow-xl max-w-[180px]">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Pricing Guideline</p>
            <p className="text-2xl font-black italic">$2,450<span className="text-xs font-normal"> /Day</span></p>
          </div>

          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
             <ClipboardList className="w-6 h-6 text-blue-600" /> Service Feasibility
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Target Acres</label>
                <input 
                  type="number" 
                  required
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-bold"
                  value={formData.acres}
                  onChange={e => setFormData({...formData, acres: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Planting Window</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Primary Operational Pain</label>
              <select 
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold"
                value={formData.primaryReason}
                onChange={e => setFormData({...formData, primaryReason: e.target.value as any})}
              >
                <option value="Labor Shortage">Unreliable Seasonal Labor</option>
                <option value="Capex Avoidance">High Equipment Purchase Costs</option>
                <option value="Test Before Purchase">Evaluating Custom Configuration</option>
                <option value="Expert Execution">High-Precision Setup Required</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">City, State</label>
                <input 
                  type="text" 
                  placeholder="Salem, OR"
                  required
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="(503) 555-0123"
                  required
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-3"
            >
              Check Pilot Availability <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicePilotInfo;
