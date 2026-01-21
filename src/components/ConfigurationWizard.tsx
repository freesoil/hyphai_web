
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Send, Loader2, Leaf } from 'lucide-react';
import { Operation, PowerType, Scale, SoilType, Configuration, CropCategory } from '../types';
import { getExpertOpinion } from '../services/geminiService';

interface Props {
  onComplete: (config: Configuration, aiSummary: string) => void;
}

const ConfigurationWizard: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Configuration>({
    crop: 'Leafy Greens',
    operation: 'Transplanting',
    power: 'Towed-behind',
    scale: '1 Row',
    soil: 'Loamy',
    specialRequirements: '',
  });
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleFinish = async () => {
    setLoading(true);
    const summary = await getExpertOpinion(config);
    onComplete(config, summary);
    setLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 italic">"What are you growing?"</h2>
            <p className="text-slate-500">Spacing and torque requirements vary wildly by crop family.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(['Berries', 'Leafy Greens', 'Root Veg', 'Alliums', 'Brassicas', 'Other'] as CropCategory[]).map((c) => (
                <button
                  key={c}
                  onClick={() => { setConfig({ ...config, crop: c }); nextStep(); }}
                  className={`p-6 text-center rounded-xl border-2 transition-all ${config.crop === c ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}
                >
                  <Leaf className={`w-6 h-6 mx-auto mb-2 ${config.crop === c ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <p className="font-bold text-sm uppercase tracking-wider">{c}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 italic">"What is the task?"</h2>
            <p className="text-slate-500">Select the primary operation for this specific {config.crop} cycle.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['Bed-making', 'Transplanting', 'Plastic Mulching', 'Inter-row Weeding'] as Operation[]).map((op) => (
                <button
                  key={op}
                  onClick={() => { setConfig({ ...config, operation: op }); nextStep(); }}
                  className={`p-6 text-left rounded-xl border-2 transition-all ${config.operation === op ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}
                >
                  <p className="font-bold text-lg">{op}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 italic">"How will you move it?"</h2>
            <p className="text-slate-500">Choose your power source preference.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['Towed-behind', 'Self-powered', 'Manual-assist'] as PowerType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => { setConfig({ ...config, power: p }); nextStep(); }}
                  className={`p-6 text-left rounded-xl border-2 transition-all ${config.power === p ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}
                >
                  <p className="font-bold text-lg">{p}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {p === 'Towed-behind' ? 'Best for tractors 25HP+' : p === 'Self-powered' ? 'Integrated diesel/gas engine' : 'Small plot manual'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 italic">"Scale & Throughput"</h2>
            <p className="text-slate-500">Number of rows to process per pass.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(['1 Row', '2 Rows', '3 Rows', 'Custom'] as Scale[]).map((s) => (
                <button
                  key={s}
                  onClick={() => { setConfig({ ...config, scale: s }); nextStep(); }}
                  className={`p-6 text-center rounded-xl border-2 transition-all ${config.scale === s ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}
                >
                  <p className="font-bold text-xl">{s}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 italic">"Soil Profile"</h2>
            <p className="text-slate-500">Density affects frame weight and disc material.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['Sandy', 'Clay', 'Loamy', 'Rocky'] as SoilType[]).map((st) => (
                <button
                  key={st}
                  onClick={() => { setConfig({ ...config, soil: st }); nextStep(); }}
                  className={`p-6 text-left rounded-xl border-2 transition-all ${config.soil === st ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}
                >
                  <p className="font-bold text-lg">{st}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 italic">"Custom Specs"</h2>
            <p className="text-slate-500">Any specialized needs for {config.crop}?</p>
            <textarea
              className="w-full h-32 p-4 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none transition-all"
              placeholder="e.g. 2-inch seedling plug size, specialized fertilizer injectors..."
              value={config.specialRequirements}
              onChange={(e) => setConfig({ ...config, specialRequirements: e.target.value })}
            />
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-sm text-amber-800">Our engineering team manually reviews these notes to select the correct sub-components from our China partners.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
        <div 
          className="h-full bg-emerald-600 transition-all duration-500" 
          style={{ width: `${(step / 6) * 100}%` }}
        />
      </div>

      <div className="mb-8 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Section {step} / 6</span>
        <button onClick={prevStep} disabled={step === 1} className="text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="min-h-[300px]">
        {renderStep()}
      </div>

      <div className="mt-12 flex justify-end">
        {step < 6 ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200"
          >
            Continue <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            Review Specification
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfigurationWizard;
