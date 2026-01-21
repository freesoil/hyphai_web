






import React, { useState } from 'react';



import { Tractor } from 'lucide-react';



import { HomePage } from './components/HomePage';



import { MachineGuide } from './components/MachineGuide';



import { PilotService } from './components/PilotService';



import { AnalyticsTracker } from './components/AnalyticsTracker';



import { SafetyPage } from './components/SafetyPage';



import { PrivacyPage } from './components/PrivacyPage';



import { MachineCatalog } from './components/MachineCatalog';



import { MachineDetail } from './components/MachineDetail';
import BrochurePage from './components/BrochurePage';



import { QuoteRequestModal } from './components/QuoteRequestModal';



import { Machine } from './machineData';







type View = 'home' | 'guide' | 'service' | 'safety' | 'privacy' | 'catalog' | 'machineDetail' | 'brochure';







export const App: React.FC = () => {



  const [view, setView] = useState<View>('home');



  const [analytics, setAnalytics] = useState<string[]>([]);



  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);



  const [quoteMachine, setQuoteMachine] = useState<Machine | null>(null);



  const [serviceMachine, setServiceMachine] = useState<Machine | null>(null);







  const logEvent = (event: string) => {



    setAnalytics(prev => [...prev, event]);



  };



  



  const handleSetView = (newView: View) => {



    setView(newView);



    window.scrollTo({ top: 0, behavior: 'smooth' });



  }







  const handleMachineSelect = (machine: Machine) => {



    setSelectedMachine(machine);



    logEvent(`Viewed details for ${machine.name}`);



    handleSetView('machineDetail');



  }



  



  const handleQuoteRequest = (machine: Machine) => {



    setQuoteMachine(machine);



  }







  const handleServiceRequest = (machine: Machine) => {



    setServiceMachine(machine);



    handleSetView('service');



  }







  const renderView = () => {



    switch (view) {



      case 'catalog':



        return <MachineCatalog onMachineSelect={handleMachineSelect} />;



      case 'machineDetail':



        if (!selectedMachine) return <MachineCatalog onMachineSelect={handleMachineSelect} />;



        return <MachineDetail 



          machine={selectedMachine} 



          onBack={() => handleSetView('catalog')}



          onQuoteRequest={handleQuoteRequest}



          onServiceRequest={handleServiceRequest}



        />;



      case 'guide':



        // This is now an alternative path. We need to decide what happens at the end.



        // For now, let's have it also lead to the detail page.



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



    <div className="min-h-screen flex flex-col font-sans bg-orange-50 text-stone-800">



      <header className="bg-white/90 backdrop-blur-lg border-b border-stone-100 sticky top-0 z-40 px-6 py-4">



        <div className="max-w-7xl mx-auto flex items-center justify-between">



          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSetView('home')}>



            <div className="bg-orange-700 p-2 rounded-xl">



              <Tractor className="w-6 h-6 text-white" />



            </div>



            <span className="font-bold text-xl tracking-tighter text-stone-900">Hyphai</span>



          </div>



                    <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">



                      <button onClick={() => handleSetView('home')} className="hover:text-orange-700 transition-colors">Home</button>



                      <button onClick={() => handleSetView('catalog')} className="hover:text-orange-700 transition-colors">All Machines</button>



                      <button onClick={() => handleSetView('guide')} className="hover:text-orange-700 transition-colors">Machine Guide</button>



                      <button onClick={() => handleSetView('service')} className="hover:text-orange-700 transition-colors">Pilot Services</button>



                      <button onClick={() => handleSetView('brochure')} className="hover:text-orange-700 transition-colors">Brochure</button>



                    </nav>



        </div>



      </header>







      <main className="flex-grow">



        {renderView()}



      </main>



      



      {quoteMachine && (



        <QuoteRequestModal 



          machine={quoteMachine}



          onClose={() => setQuoteMachine(null)}



          logEvent={logEvent}



        />



      )}







      <AnalyticsTracker events={analytics} />







      {view !== 'home' && (



        <footer className="bg-stone-800 text-white py-12 px-6">



          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">



            <div className="flex items-center gap-2">



              <div className="bg-orange-700 p-2 rounded-xl">



                <Tractor className="w-5 h-5 text-white" />



              </div>



              <span className="font-black text-lg tracking-tighter uppercase text-white">Hyphai</span>



            </div>



            



            <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-stone-400">



               <button onClick={() => handleSetView('safety')} className="hover:text-white transition-colors">Safety</button>



               <button onClick={() => handleSetView('privacy')} className="hover:text-white transition-colors">Privacy</button>



            </div>







            <p className="text-[10px] font-mono text-stone-300">© {new Date().getFullYear()} Hyphai Agricultural Technology. BUILT TO GROW.</p>



          </div>



        </footer>



      )}



    </div>



  );



};







export default App;




