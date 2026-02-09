
import React from 'react';
import { Landmark, Users, TrendingDown, ShieldCheck, Zap } from 'lucide-react';

const ComparisonLab: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">Financial Decision Support</h3>
        <p className="text-slate-500">Deciding between ownership and service depends on your season's scale, labor availability, and capital strategy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ownership Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Landmark className="text-emerald-700 w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold mb-4 italic">The Ownership Path</h4>
          <p className="text-sm text-slate-500 mb-8">Best for large-scale multi-year operations where equipment becomes a core asset.</p>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex justify-between items-center pb-3 border-b border-slate-50">
              <span className="text-slate-400">Upfront Investment</span>
              <span className="text-slate-900">20% Deposit / Full Balance</span>
            </li>
            <li className="flex justify-between items-center pb-3 border-b border-slate-50">
              <span className="text-slate-400">Maintenance</span>
              <span className="text-slate-900">Owner Managed (Stateside Support)</span>
            </li>
            <li className="flex justify-between items-center pb-3 border-b border-slate-50">
              <span className="text-slate-400">Labor Source</span>
              <span className="text-slate-900">Your Existing Staff</span>
            </li>
          </ul>
        </div>

        {/* Service Card */}
        <div className="bg-blue-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-24 h-24" />
          </div>
          <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Users className="text-white w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold mb-4 italic">The Professional Service Path</h4>
          <p className="text-blue-100 text-sm mb-8">Best for testing new crops or operations where labor is the primary bottleneck.</p>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-blue-200">Daily Service Rate</span>
              <span className="text-white">Fixed Day-Rate</span>
            </li>
            <li className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-blue-200">Execution Team</span>
              <span className="text-white">Managed Expert Crew</span>
            </li>
            <li className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-blue-200">Risk Profile</span>
              <span className="text-white">Zero Equipment Liability</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparisonLab;
