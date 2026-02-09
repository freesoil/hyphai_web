
import React from 'react';
import { STEPS } from '../constants';

const ProcessTimeline: React.FC = () => {
  return (
    <div className="relative py-12">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
        {STEPS.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-200 flex items-center justify-center mb-4 z-10 transition-all group-hover:border-emerald-500 group-hover:text-emerald-600">
              {step.icon}
            </div>
            <h4 className="font-bold text-sm mb-2">{step.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[160px]">{step.description}</p>
            {idx === 3 && (
              <div className="mt-4 inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">60-Day Lead Time</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;
