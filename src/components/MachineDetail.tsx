
import React, { useState } from 'react';
import { Machine } from '../machineData';
import { ArrowLeft, FileText, Users, Wind, Check, ChevronRight } from 'lucide-react';
import { resolveAssetUrl } from '../utils/asset';

interface MachineDetailProps {
  machine: Machine;
  onBack: () => void;
  onQuoteRequest: (machine: Machine) => void;
  onServiceRequest: (machine: Machine) => void;
}

export const MachineDetail: React.FC<MachineDetailProps> = ({ machine, onBack, onQuoteRequest, onServiceRequest }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentMedia = machine.imageUrls[currentImageIndex];
  const isVideo = currentMedia.endsWith('.mp4');
  const currentMediaUrl = resolveAssetUrl(currentMedia);

  const splitFeatures = (features: string) => {
    return features.split('.').map(f => f.trim()).filter(f => f.length > 0);
  };

  return (
    <div className="bg-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-600 hover:text-orange-600 font-semibold mb-8 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </button>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column: Media and Specs */}
          <div className="space-y-6">
            {/* Main Media Viewer */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-video">
              {isVideo ? (
                <video src={currentMediaUrl} autoPlay loop muted controls playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={currentMediaUrl} alt={machine.name} className="w-full h-full object-cover" />
              )}
            </div>

            {/* Thumbnails */}
            {machine.imageUrls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {machine.imageUrls.map((mediaUrl, index) => {
                  const isThumbVideo = mediaUrl.endsWith('.mp4');
                  const resolvedMediaUrl = resolveAssetUrl(mediaUrl);
                  return (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-4 ${currentImageIndex === index ? 'border-orange-500' : 'border-transparent'} cursor-pointer hover:border-orange-300 transition-all`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      {isThumbVideo ? (
                        <div className="relative w-full h-full">
                           <video src={resolvedMediaUrl} muted playsInline className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <ChevronRight className="w-6 h-6 text-white/70"/>
                           </div>
                        </div>
                      ) : (
                        <img src={resolvedMediaUrl} alt={`${machine.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
             
            {Object.keys(machine.specs).length > 0 && (
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-stone-800 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-stone-700">
                  {Object.entries(machine.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="font-semibold">{key}</span>
                      <span className="text-stone-800 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Info and CTA */}
          <div className="space-y-8">
            <div>
              <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1.5 rounded-full">{machine.category}</span>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 mt-4">{machine.name}</h1>
              <p className="text-lg text-stone-500 font-mono mt-1">{machine.model}</p>
            </div>
            
            <div className="bg-stone-50/80 p-8 rounded-2xl border border-stone-200">
              <h3 className="font-bold text-lg mb-3">Ideal For:</h3>
              <ul className="space-y-3">
                {splitFeatures(machine.features).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {machine.inferred && (
              <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm flex items-center gap-3 border border-amber-200">
                <Wind size={16} />
                <span><b>Note:</b> Specifications inferred from available data. Contact us for precise details.</span>
              </div>
            )}

            <div className="sticky top-28 space-y-6">
               <div className="bg-white p-6 rounded-2xl border-2 border-orange-500 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" onClick={() => onQuoteRequest(machine)}>
                  <h4 className="font-bold text-lg text-orange-700">Full Ownership</h4>
                  <p className="text-sm text-stone-600 mt-1 mb-3">Take control of your operation. Request a factory-direct quote to purchase this machine.</p>
                  <div className="font-bold text-orange-600 flex items-center">
                     Request a Quote <ChevronRight size={18} className="ml-1"/>
                  </div>
               </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-lg cursor-pointer hover:shadow-2xl transition-shadow" onClick={() => onServiceRequest(machine)}>
                  <h4 className="font-bold text-lg text-indigo-700">Managed by Experts</h4>
                  <p className="text-sm text-stone-600 mt-1 mb-3">Let us handle the work. Inquire about having our professional team operate this machine for you.</p>
                  <div className="font-bold text-indigo-600 flex items-center">
                     Inquire about Service <ChevronRight size={18} className="ml-1"/>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
