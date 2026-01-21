
import React from 'react';
import { Scale, Operation } from '../types';

interface Props {
  scale: Scale;
  operation: Operation;
}

const CustomizationDiagram: React.FC<Props> = ({ scale, operation }) => {
  const rowCount = scale === '1 Row' ? 1 : scale === '2 Rows' ? 2 : scale === '3 Rows' ? 3 : 4;
  
  return (
    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-inner overflow-hidden relative group">
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Active CAD Preview</span>
      </div>
      
      <div className="flex justify-center items-center h-64">
        <svg viewBox="0 0 400 200" className="w-full max-w-md drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          {/* Main Chassis Frame */}
          <rect x="50" y="80" width="300" height="20" fill="#334155" rx="2" />
          <rect x="180" y="40" width="40" height="60" fill="#475569" rx="2" />
          
          {/* Dynamic Rows */}
          {Array.from({ length: rowCount }).map((_, i) => {
            const xPos = 50 + (300 / (rowCount + 1)) * (i + 1);
            return (
              <g key={i} className="animate-in fade-in slide-in-from-top duration-700" style={{ animationDelay: `${i * 150}ms` }}>
                {/* Tooling (Transplanter/Bedmaker) */}
                <path 
                  d={operation === 'Transplanting' 
                    ? `M${xPos-10} 100 L${xPos} 150 L${xPos+10} 100 Z` 
                    : `M${xPos-15} 100 Q${xPos} 160 ${xPos+15} 100 Z`} 
                  fill={operation === 'Transplanting' ? "#10b981" : "#3b82f6"} 
                />
                {/* Support Strut */}
                <rect x={xPos - 2} y="85" width="4" height="20" fill="#94a3b8" />
                {/* Connection Point Label */}
                <circle cx={xPos} cy="90" r="3" fill="white" className="group-hover:fill-emerald-400 transition-colors" />
              </g>
            );
          })}
          
          {/* Ground Line */}
          <line x1="20" y1="160" x2="380" y2="160" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
          <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Row Spacing</p>
          <p className="text-white font-mono text-sm">{rowCount > 1 ? 'Adj. 15-30"' : 'Standard'}</p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
          <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Load Limit</p>
          <p className="text-white font-mono text-sm">{rowCount * 450} KG</p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
          <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Frame Alloy</p>
          <p className="text-white font-mono text-sm">Q345B Steel</p>
        </div>
      </div>
    </div>
  );
};

export default CustomizationDiagram;
