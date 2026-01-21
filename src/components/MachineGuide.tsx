import React, { useState, useEffect } from 'react';
import { ChevronRight, RefreshCw, ArrowLeft } from 'lucide-react';
import { machines, Machine } from '../machineData';
import { resolveAssetUrl } from '../utils/asset';

type Step = 'machineType' | 'transplanterScale' | 'tractorPower' | 'ridgeRows' | 'ridgeFunctions' | 'result';

interface AnswerState {
  machineType?: 'Transplanter' | 'Ridging Machine';
  transplanterScale?: 'small' | 'large';
  tractorPower?: '40-70' | '70+';
  ridgeRows?: 'single' | 'double';
  ridgeFunctions?: 'none' | 'mulching' | 'all-in-one' | 'specialized';
}

interface MachineGuideProps {
  logEvent: (event: string) => void;
  onMachineSelect: (machine: Machine) => void;
}

export const MachineGuide: React.FC<MachineGuideProps> = ({ logEvent, onMachineSelect }) => {
  const [step, setStep] = useState<Step>('machineType');
  const [history, setHistory] = useState<Step[]>(['machineType']);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);

  useEffect(() => {
    if (step === 'result') {
      let result = machines;
      if (answers.machineType) result = result.filter(m => m.type === answers.machineType);
      if (answers.machineType === 'Transplanter') {
        if (answers.transplanterScale === 'small') result = result.filter(m => m.category === 'Self-Propelled');
        else {
          result = result.filter(m => m.category === 'Tractor-Pulled');
          if (answers.tractorPower === '40-70') result = result.filter(m => m.specs['Required Power']?.includes('40'));
          else if (answers.tractorPower === '70+') result = result.filter(m => m.specs['Required Power']?.includes('70'));
        }
      }
      if (answers.machineType === 'Ridging Machine') {
        if (answers.ridgeRows === 'single') result = result.filter(m => m.category === 'Single Ridge');
        else {
          if (answers.ridgeFunctions === 'none') result = result.filter(m => m.name === 'Double Ridge Machine');
          else if (answers.ridgeFunctions === 'mulching') result = result.filter(m => m.name.includes('Mulching'));
          else if (answers.ridgeFunctions === 'all-in-one') result = result.filter(m => m.name.includes('Vegetable'));
          else if (answers.ridgeFunctions === 'specialized') result = result.filter(m => m.name.includes('Onion'));
        }
      }
      setFilteredMachines(result);
      logEvent(`Guide Result: Found ${result.length} machine(s)`);
    }
  }, [step, answers, logEvent]);

  const handleAnswer = (key: keyof AnswerState, value: string, nextStep: Step, event: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setHistory(prev => [...prev, nextStep]);
    logEvent(event);
    setStep(nextStep);
  };
  
  const handleBack = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop();
    const previousStep = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setStep(previousStep);
    logEvent(`Went back to step: ${previousStep}`);
  };

  const reset = () => {
    setAnswers({});
    setHistory(['machineType']);
    setStep('machineType');
    logEvent('Guide reset');
  };

  const renderStep = () => {
    switch (step) {
      case 'machineType':
        return (
          <QuestionStep title="What type of machine are you looking for?" onBack={handleBack} showBack={history.length > 1}>
            <OptionCard title="Transplanter" imageUrl={machines.find(m => m.type === 'Transplanter')?.imageUrls[0] || resolveAssetUrl('/hero-transplanter.jpg')} onClick={() => handleAnswer('machineType', 'Transplanter', 'transplanterScale', 'Selected: Transplanter')} />
            <OptionCard title="Ridging Machine" imageUrl={machines.find(m => m.type === 'Ridging Machine')?.imageUrls[0] || resolveAssetUrl('/ridging-machine-double-mulch.jpg')} onClick={() => handleAnswer('machineType', 'Ridging Machine', 'ridgeRows', 'Selected: Ridging Machine')} />
          </QuestionStep>
        );
      case 'transplanterScale':
        return (
          <QuestionStep title="What is the scale of your operation?" onBack={handleBack} showBack={history.length > 1}>
            <OptionCard title="Small Scale / Hills / Greenhouse" imageUrl={machines.find(m => m.category === 'Self-Propelled')?.imageUrls[0] || resolveAssetUrl('/transplanter-self-propelled.jpg')} onClick={() => handleAnswer('transplanterScale', 'small', 'result', 'Selected: Small Scale')} />
            <OptionCard title="Large Scale / Flat Fields" imageUrl={machines.find(m => m.category === 'Tractor-Pulled')?.imageUrls[0] || resolveAssetUrl('/transplanter-4-row.jpg')} onClick={() => handleAnswer('transplanterScale', 'large', 'tractorPower', 'Selected: Large Scale')} />
          </QuestionStep>
        );
      case 'tractorPower':
        return (
          <QuestionStep title="What is the horsepower of your tractor?" onBack={handleBack} showBack={history.length > 1}>
            <OptionCard title="40-70 HP" imageUrl={machines.find(m => m.model === '2ZBX-2 / 2ZBX-2A')?.imageUrls[0] || resolveAssetUrl('/transplanter-4-row.jpg')} onClick={() => handleAnswer('tractorPower', '40-70', 'result', 'Selected: 40-70 HP')} />
            <OptionCard title="70 HP or more" imageUrl={machines.find(m => m.model === '2ZBX-3 / 2ZBX-4')?.imageUrls[0] || resolveAssetUrl('/transplanter-4-row.jpg')} onClick={() => handleAnswer('tractorPower', '70+', 'result', 'Selected: 70+ HP')} />
          </QuestionStep>
        );
      case 'ridgeRows':
        return (
          <QuestionStep title="How many ridges do you want to create at once?" onBack={handleBack} showBack={history.length > 1}>
            <OptionCard title="Single Ridge" imageUrl={machines.find(m => m.name === 'Single Ridge Machine')?.imageUrls[0] || resolveAssetUrl('/ridging-machine-single.jpg')} onClick={() => handleAnswer('ridgeRows', 'single', 'result', 'Selected: Single Ridge')} />
            <OptionCard title="Double Ridge" imageUrl={machines.find(m => m.name === 'Double Ridge Machine')?.imageUrls[0] || resolveAssetUrl('/ridging-machine-double.mp4')} onClick={() => handleAnswer('ridgeRows', 'double', 'ridgeFunctions', 'Selected: Double Ridge')} />
          </QuestionStep>
        );
      case 'ridgeFunctions':
        return (
          <QuestionStep title="Do you need additional functions?" onBack={handleBack} showBack={history.length > 1}>
            <OptionCard title="Just Ridging (Double Row)" imageUrl={machines.find(m => m.name === 'Double Ridge Machine')?.imageUrls[0] || resolveAssetUrl('/ridging-machine-double.mp4')} onClick={() => handleAnswer('ridgeFunctions', 'none', 'result', 'Selected: Just Double Ridging')} />
            <OptionCard title="Mulching (Film Covering)" imageUrl={machines.find(m => m.name === 'Double Ridge with Mulching')?.imageUrls[0] || resolveAssetUrl('/ridging-machine-double-mulch.jpg')} onClick={() => handleAnswer('ridgeFunctions', 'mulching', 'result', 'Selected: Mulching')} />
            <OptionCard title="All-in-one (Seeding)" imageUrl={machines.find(m => m.name === 'Vegetable Ridging, Mulching, and Seeding Machine')?.imageUrls[0] || resolveAssetUrl('/vegetable-all-in-one.mp4')} onClick={() => handleAnswer('ridgeFunctions', 'all-in-one', 'result', 'Selected: Mulching and Seeding')} />
            <OptionCard title="Specialized (Onion)" imageUrl={machines.find(m => m.name === 'Onion Mulching and Hole Punching Machine')?.imageUrls[0] || resolveAssetUrl('/onion-mulch-punch.mp4')} onClick={() => handleAnswer('ridgeFunctions', 'specialized', 'result', 'Selected: Mulching and Hole Punching')} />
          </QuestionStep>
        );
      case 'result':
        return <Results machines={filteredMachines} onMachineSelect={onMachineSelect} reset={reset} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="bg-orange-50/70 min-h-[80vh] py-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

const QuestionStep: React.FC<{ title: string; children: React.ReactNode; onBack: () => void; showBack: boolean; }> = ({ title, children, onBack, showBack }) => (
  <div className="text-center">
    <div className="relative mb-8 flex justify-center items-center">
      {showBack && (
        <button onClick={onBack} className="absolute left-0 bg-white p-3 rounded-full shadow-md hover:bg-stone-100 transition-all">
          <ArrowLeft size={20} />
        </button>
      )}
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

const OptionCard: React.FC<{ title: string; imageUrl: string; onClick: () => void }> = ({ title, imageUrl, onClick }) => {
  const isVideo = imageUrl.endsWith('.mp4');
  const mediaUrl = resolveAssetUrl(imageUrl);
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all cursor-pointer group overflow-hidden"
    >
      {isVideo ? (
        <video src={mediaUrl} autoPlay loop muted playsInline className="w-full h-40 object-cover" />
      ) : (
        <img src={mediaUrl} alt={title} className="w-full h-40 object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
      </div>
    </div>
  );
};

const Results: React.FC<{ machines: Machine[], reset: () => void, onMachineSelect: (machine: Machine) => void }> = ({ machines, reset, onMachineSelect }) => (
  <div className="text-center">
    <h2 className="text-3xl font-bold mb-4">Here are Your Recommended Machines</h2>
    <p className="text-stone-500 mb-10">Click on a machine to see more details and request a quote or service.</p>
    <div className="grid md:grid-cols-2 gap-8 my-10">
      {machines.length > 0 ? (
        machines.map(machine => <MachineResultCard key={machine.model} machine={machine} onSelect={onMachineSelect} />)
      ) : (
        <p className="text-stone-600 col-span-full">No machines match your criteria. Please try again.</p>
      )}
    </div>
    <button
      onClick={reset}
      className="bg-stone-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-stone-800 transition-all flex items-center gap-2 mx-auto"
    >
      <RefreshCw size={16} /> Start Over
    </button>
  </div>
);

const MachineResultCard: React.FC<{ machine: Machine, onSelect: (machine: Machine) => void }> = ({ machine, onSelect }) => {
  const isVideo = machine.imageUrls[0].endsWith('.mp4');
  const mediaUrl = resolveAssetUrl(machine.imageUrls[0]);
  return (
    <div 
      className="bg-white rounded-3xl shadow-lg border border-stone-100 text-left overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
      onClick={() => onSelect(machine)}
    >
      <div className="h-48 overflow-hidden">
        {isVideo ? (
          <video src={mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <img src={mediaUrl} alt={machine.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="p-6">
        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">{machine.type}</span>
        <h3 className="text-xl font-bold mt-3 mb-1 truncate">{machine.name}</h3>
        <p className="text-sm text-stone-600 h-10 overflow-hidden text-ellipsis">{machine.features}</p>
        <div className="mt-4 text-orange-600 font-semibold text-sm group-hover:underline">
          View Details →
        </div>
      </div>
    </div>
  );
};
