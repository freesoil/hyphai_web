import React, { useEffect, useMemo, useState } from 'react';
import { Sprout, Menu, X } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { MachineGuide } from './components/MachineGuide';
import { PilotService } from './components/PilotService';
import { SafetyPage } from './components/SafetyPage';
import { PrivacyPage } from './components/PrivacyPage';
import { MachineCatalog } from './components/MachineCatalog';
import { MachineDetail } from './components/MachineDetail';
import BrochurePage from './components/BrochurePage';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { SolutionsPage } from './components/SolutionsPage';
import { PilotProgramsPage } from './components/PilotProgramsPage';
import { WhoWeServePage } from './components/WhoWeServePage';
import { HowWeWorkPage } from './components/HowWeWorkPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Machine, catalogMachines } from './machineData';
import { type View, type RouteState, parseHashRoute, buildHash } from './routes';

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getMachineSlug = (machine: Machine): string => toSlug(`${machine.name}-${machine.model}`);

export const App: React.FC = () => {
  const [analytics, setAnalytics] = useState<string[]>([]);
  const [quoteMachine, setQuoteMachine] = useState<Machine | null>(null);
  const [serviceMachine, setServiceMachine] = useState<Machine | null>(null);

  const machineBySlug = useMemo(
    () => new Map(catalogMachines.map(machine => [getMachineSlug(machine), machine])),
    []
  );

  const initialRoute = parseHashRoute(window.location.hash);
  const [view, setView] = useState<View>(initialRoute.view);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(() =>
    initialRoute.machineSlug ? machineBySlug.get(initialRoute.machineSlug) ?? null : null
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const logEvent = (event: string) => {
    setAnalytics(prev => [...prev, event]);
  };

  const navigateTo = (nextRoute: RouteState) => {
    const nextHash = buildHash(nextRoute);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      // Keep state in sync even when the hash stays unchanged.
      setView(nextRoute.view);
      if (nextRoute.view !== 'machineDetail') {
        setSelectedMachine(null);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetView = (newView: Exclude<View, 'machineDetail'>) => {
    setMobileNavOpen(false);
    navigateTo({ view: newView });
  };

  const handleMachineSelect = (machine: Machine) => {
    setSelectedMachine(machine);
    logEvent(`Viewed details for ${machine.name}`);
    navigateTo({ view: 'machineDetail', machineSlug: getMachineSlug(machine) });
  };

  const handleQuoteRequest = (machine: Machine) => {
    setQuoteMachine(machine);
  };

  const handleServiceRequest = (machine: Machine) => {
    setServiceMachine(machine);
    navigateTo({ view: 'service' });
  };

  useEffect(() => {
    const syncFromHash = () => {
      const route = parseHashRoute(window.location.hash);

      if (route.view === 'machineDetail') {
        const machine = route.machineSlug ? machineBySlug.get(route.machineSlug) ?? null : null;
        if (!machine) {
          setView('catalog');
          setSelectedMachine(null);
          const catalogHash = buildHash({ view: 'catalog' });
          if (window.location.hash !== catalogHash) {
            window.location.replace(catalogHash);
          }
          return;
        }

        setSelectedMachine(machine);
        setView('machineDetail');
        return;
      }

      setView(route.view);
      setSelectedMachine(null);
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, [machineBySlug]);

  const renderView = () => {
    switch (view) {
      case 'solutions':
        return <SolutionsPage onNavigate={handleSetView} logEvent={logEvent} />;
      case 'pilot':
        return <PilotProgramsPage onNavigate={handleSetView} logEvent={logEvent} />;
      case 'who-we-serve':
        return <WhoWeServePage onNavigate={handleSetView} />;
      case 'how-we-work':
        return <HowWeWorkPage onNavigate={handleSetView} />;
      case 'about':
        return <AboutPage onNavigate={handleSetView} />;
      case 'contact':
        return <ContactPage logEvent={logEvent} />;
      case 'catalog':
        return <MachineCatalog onMachineSelect={handleMachineSelect} />;
      case 'machineDetail':
        if (!selectedMachine) return <MachineCatalog onMachineSelect={handleMachineSelect} />;
        return (
          <MachineDetail
            machine={selectedMachine}
            onBack={() => handleSetView('catalog')}
            onQuoteRequest={handleQuoteRequest}
            onServiceRequest={handleServiceRequest}
          />
        );
      case 'guide':
        return <MachineGuide logEvent={logEvent} onMachineSelect={handleMachineSelect} onNavigate={handleSetView} />;
      case 'service':
        return <PilotService logEvent={logEvent} machine={serviceMachine} onNavigate={handleSetView} />;
      case 'safety':
        return <SafetyPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'brochure':
        return <BrochurePage />;
      case 'home':
      default:
        return <HomePage setView={handleSetView} logEvent={logEvent} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col site-bg text-stone-900">
      <header className="surface border-b border-white/60 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSetView('home')}>
            <div className="bg-emerald-700 p-2 rounded-xl shadow-md">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-stone-900">Hyphai</span>
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <button onClick={() => handleSetView('home')} className="hover:text-orange-700 transition-colors">Home</button>
            <button onClick={() => handleSetView('solutions')} className="hover:text-orange-700 transition-colors">Solutions</button>
            <button onClick={() => handleSetView('pilot')} className="hover:text-orange-700 transition-colors">Pilot Programs</button>
            <button onClick={() => handleSetView('about')} className="hover:text-orange-700 transition-colors">About</button>
            <button onClick={() => handleSetView('contact')} className="hover:text-orange-700 transition-colors">Contact</button>
          </nav>
          <button
            type="button"
            onClick={() => setMobileNavOpen(open => !open)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileNavOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/60 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1 text-sm font-semibold text-stone-700">
              <button onClick={() => handleSetView('home')} className="py-3 px-2 text-left rounded-lg hover:bg-stone-100 hover:text-orange-700 transition-colors">Home</button>
              <button onClick={() => handleSetView('solutions')} className="py-3 px-2 text-left rounded-lg hover:bg-stone-100 hover:text-orange-700 transition-colors">Solutions</button>
              <button onClick={() => handleSetView('pilot')} className="py-3 px-2 text-left rounded-lg hover:bg-stone-100 hover:text-orange-700 transition-colors">Pilot Programs</button>
              <button onClick={() => handleSetView('about')} className="py-3 px-2 text-left rounded-lg hover:bg-stone-100 hover:text-orange-700 transition-colors">About</button>
              <button onClick={() => handleSetView('contact')} className="py-3 px-2 text-left rounded-lg hover:bg-stone-100 hover:text-orange-700 transition-colors">Contact</button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">{renderView()}</main>

      {quoteMachine && (
        <QuoteRequestModal machine={quoteMachine} onClose={() => setQuoteMachine(null)} logEvent={logEvent} />
      )}

      <footer className="bg-stone-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-700 p-2 rounded-xl shadow-md">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-black text-lg tracking-tight uppercase text-white">Hyphai</span>
            </div>

            <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-stone-400">
              <button onClick={() => handleSetView('safety')} className="hover:text-white transition-colors">Safety</button>
              <button onClick={() => handleSetView('privacy')} className="hover:text-white transition-colors">Privacy</button>
            </div>

            <p className="text-[10px] font-mono text-stone-300">
              © {new Date().getFullYear()} Hyphai Agricultural Technology. FARM-FIRST PARTNERSHIP.
            </p>
          </div>
        </footer>
    </div>
  );
};

export default App;
