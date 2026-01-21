
import React, { useState } from 'react';
import { machines, Machine } from '../machineData';
import { ListFilter, Search } from 'lucide-react';

type MachineType = 'All' | 'Transplanter' | 'Ridging Machine';

interface MachineCatalogProps {
  onMachineSelect: (machine: Machine) => void;
}

export const MachineCatalog: React.FC<MachineCatalogProps> = ({ onMachineSelect }) => {
  const [filter, setFilter] = useState<MachineType>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMachines = machines.filter(machine => {
    const matchesType = filter === 'All' || machine.type === filter;
    const matchesSearch = searchTerm === '' || machine.name.toLowerCase().includes(searchTerm.toLowerCase()) || machine.features.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-orange-50/70 py-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900">Our Machines</h1>
          <p className="mt-4 text-lg text-stone-600">Browse our full catalog of innovative agricultural solutions.</p>
        </div>

        <div className="mb-10 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md border border-stone-200 sticky top-24 z-30">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input 
                type="text"
                placeholder="Search machines..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-stone-500" />
              <span className="text-sm font-semibold">Filter by Type:</span>
              <div className="flex gap-2 rounded-lg bg-stone-100 p-1">
                {(['All', 'Transplanter', 'Ridging Machine'] as MachineType[]).map(type => (
                  <button 
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${filter === type ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-600 hover:bg-white/50'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachines.map(machine => (
            <MachineCard key={machine.model} machine={machine} onSelect={() => onMachineSelect(machine)} />
          ))}
        </div>
        {filteredMachines.length === 0 && (
          <div className="text-center col-span-full py-16">
            <h3 className="text-xl font-semibold">No machines found</h3>
            <p className="text-stone-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MachineCard: React.FC<{ machine: Machine, onSelect: () => void }> = ({ machine, onSelect }) => {
  const isVideo = machine.imageUrls[0].endsWith('.mp4');
  return (
    <div 
      className="bg-white rounded-3xl shadow-lg border border-stone-100 text-left overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
      onClick={onSelect}
    >
      <div className="h-48 overflow-hidden">
        {isVideo ? (
          <video src={machine.imageUrls[0]} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <img src={machine.imageUrls[0]} alt={machine.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="p-6">
        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">{machine.type}</span>
        <h3 className="text-xl font-bold mt-3 mb-1 truncate">{machine.name}</h3>
        <p className="text-sm text-stone-500 font-mono mb-4">{machine.model}</p>
        <p className="text-sm text-stone-600 h-10 overflow-hidden text-ellipsis">{machine.features}</p>
        <div className="mt-4 text-orange-600 font-semibold text-sm group-hover:underline">
          View Details →
        </div>
      </div>
    </div>
  );
};
