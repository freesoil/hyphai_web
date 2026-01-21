
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const TrustBadge: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce hover:animate-none">
      <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-2xl border-4 border-emerald-400 flex items-center gap-3 cursor-pointer group transition-all hover:scale-105">
        <ShieldCheck className="w-8 h-8 text-emerald-100" />
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 leading-none mb-1">Risk-Free Pilot</p>
          <p className="text-sm font-bold leading-tight">1-Acre Performance<br/>Guarantee</p>
        </div>
        <div className="hidden group-hover:block absolute bottom-full mb-4 right-0 w-64 bg-slate-900 text-white p-4 rounded-xl text-xs leading-relaxed shadow-xl border border-slate-700">
          If our machine doesn't perform to specifications on your first acre of production, we will retrieve the unit and provide a 100% full refund. No questions asked.
        </div>
      </div>
    </div>
  );
};

export default TrustBadge;
