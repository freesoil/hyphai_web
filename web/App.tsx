import React, { useEffect, useMemo, useState } from 'react';
import { Sprout } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { MachineGuide } from './components/MachineGuide';
import { PilotService } from './components/PilotService';
import { SafetyPage } from './components/SafetyPage';
import { PrivacyPage } from './components/PrivacyPage';
import { MachineCatalog } from './components/MachineCatalog';
import { MachineDetail } from './components/MachineDetail';
import BrochurePage from './components/BrochurePage';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { Machine, machines } from './machineData';

type View = 'home' | 'guide' | 'service' | 'safety' | 'privacy' | 'catalog' | 'machineDetail' | 'brochure';
type RouteState = { view: View; machineSlug?: string };

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getMachineSlug = (machine: Machine): string => toSlug(`${machine.name}-${machine.model}`);

const parseHashRoute = (hash: string): RouteState => {
  const rawPath = hash.startsWith('#') ? hash.slice(1) : hash;
  const path = rawPath || '/';
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);

  if (segments.length === 0) return { view: 'home' };
  if (segments[0] === 'machine' && segments[1]) {
    return { view: 'machineDetail', machineSlug: decodeURIComponent(segments[1]) };
  }

  switch (segments[0]) {
    case 'catalog':
      return { view: 'catalog' };
    case 'guide':
      return { view: 'guide' };
    case 'service':
      return { view: 'service' };
    case 'safety':
      return { view: 'safety' };
    case 'privacy':
      return { view: 'privacy' };
    case 'brochure':
      return { view: 'brochure' };
    default:
      return { view: 'home' };
  }
};

const buildHash = (route: RouteState): string => {
  if (route.view === 'machineDetail' && route.machineSlug) {
    return `#/machine/${encodeURIComponent(route.machineSlug)}`;
  }

  switch (route.view) {
    case 'catalog':
      return '#/catalog';
    case 'guide':
      return '#/guide';
    case 'service':
      return '#/service';
    case 'safety':
      return '#/safety';
    case 'privacy':
      return '#/privacy';
    case 'brochure':
      return '#/brochure';
    case 'home':
    default:
      return '#/';
  }
};

export const App: React.FC = () => {
  const [analytics, setAnalytics] = useState<string[]>([]);
  const [quoteMachine, setQuoteMachine] = useState<Machine | null>(null);
  const [serviceMachine, setServiceMachine] = useState<Machine | null>(null);

  const machineBySlug = useMemo(
    () => new Map(machines.map(machine => [getMachineSlug(machine), machine])),
    []
  );

  const initialRoute = parseHashRoute(window.location.hash);
  const [view, setView] = useState<View>(initialRoute.view);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(() =>
    initialRoute.machineSlug ? machineBySlug.get(initialRoute.machineSlug) ?? null : null
  );

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
        return <MachineGuide logEvent={logEvent} onMachineSelect={handleMachineSelect} />;
      case 'service':
        return <PilotService logEvent={logEvent} machine={serviceMachine} />;
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
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-700">
            <button onClick={() => handleSetView('home')} className="hover:text-orange-700 transition-colors">Home</button>
            <button onClick={() => handleSetView('service')} className="hover:text-orange-700 transition-colors">Consultation</button>
            <button onClick={() => handleSetView('catalog')} className="hover:text-orange-700 transition-colors">Equipment</button>
            <button onClick={() => handleSetView('guide')} className="hover:text-orange-700 transition-colors">Equipment Guide</button>
            <button onClick={() => handleSetView('brochure')} className="hover:text-orange-700 transition-colors">Brochure</button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">{renderView()}</main>

      {quoteMachine && (
        <QuoteRequestModal machine={quoteMachine} onClose={() => setQuoteMachine(null)} logEvent={logEvent} />
      )}

      {view !== 'home' && (
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
      )}
    </div>
  );
};

export default App;
