
import React from 'react';
import { Layers, PackageSearch, FileQuestion } from 'lucide-react';

type View = 'guide' | 'service' | 'catalog';

export const HomePage: React.FC<{ setView: (view: View) => void, logEvent: (event: string) => void }> = ({ setView, logEvent }) => {
  
  const handleNavigation = (view: View, event: string) => {
    logEvent(event);
    setView(view);
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white text-center px-6 overflow-hidden">
        <video 
          src="/hero-transplanter-video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">Advanced Machinery for Modern Farms</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-stone-200">
            Intelligent, reliable, and efficient solutions designed to maximize your yield and streamline your operations.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Find Your Solution in Two Simple Steps</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12 text-left">
            <div className="flex gap-6">
              <div className="text-orange-600 flex-shrink-0">
                <PackageSearch size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold">1. Choose Operation & Equipment</h3>
                <p className="text-stone-600 mt-2">Use our full catalog or guided selector to find the perfect machine for your specific crop and operational needs.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-indigo-600 flex-shrink-0">
                <FileQuestion size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold">2. Inquire for Quote or Service</h3>
                <p className="text-stone-600 mt-2">Once you've found your machine, request a no-obligation quote to purchase or inquire about our full-service pilot program.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-50/70">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Two Ways to Grow Your Business</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Whether you prefer the control of ownership or the convenience of a fully managed service, we provide a path that fits your operational needs and financial strategy.
              </p>
              <button
                onClick={() => handleNavigation('catalog', 'Clicked "Browse All Machines"')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Layers size={20} /> Browse All Machines
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                <h3 className="font-bold text-lg">1. Own Your Equipment</h3>
                <p className="text-stone-600 text-sm mt-1">Purchase factory-direct and take full control of your assets with our 100% stateside technical support.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                <h3 className="font-bold text-lg">2. Hire the Outcome</h3>
                <p className="text-stone-600 text-sm mt-1">Our expert team brings the machinery and handles the technical execution, letting you focus on the bigger picture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
