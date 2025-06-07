import React, { useState } from 'react';
import Header from './components/Header';
import HardwareCard from './components/HardwareCard';
import PTUCard from './components/PTUCard';
import Calculator from './components/Calculator';
import ComparisonTable from './components/ComparisonTable';
import { gpuDatabase, tpuDatabase, ptuDatabase } from './data/hardware';
import { GPUSpec, TPUSpec, PTUSpec } from './types/hardware';
import { Cpu, Zap, BarChart3, Calculator as CalcIcon, Brain } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'gpu' | 'tpu' | 'ptu'>('gpu');
  const [selectedHardware, setSelectedHardware] = useState<(GPUSpec | TPUSpec | PTUSpec)[]>([]);
  const [viewMode, setViewMode] = useState<'browse' | 'calculate' | 'compare'>('browse');

  const getCurrentDatabase = () => {
    switch (activeTab) {
      case 'gpu': return gpuDatabase;
      case 'tpu': return tpuDatabase;
      case 'ptu': return ptuDatabase;
    }
  };

  const handleHardwareSelect = (hardware: GPUSpec | TPUSpec | PTUSpec) => {
    setSelectedHardware(prev => {
      const exists = prev.find(h => h.id === hardware.id);
      if (exists) {
        return prev.filter(h => h.id !== hardware.id);
      } else {
        return [...prev, hardware];
      }
    });
  };

  const clearSelection = () => {
    setSelectedHardware([]);
  };

  const currentDatabase = getCurrentDatabase();

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('gpu')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'gpu'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Cpu className="h-4 w-4" />
              <span>GPUs</span>
            </button>
            <button
              onClick={() => setActiveTab('tpu')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'tpu'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>TPUs</span>
            </button>
            <button
              onClick={() => setActiveTab('ptu')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'ptu'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Brain className="h-4 w-4" />
              <span>PTUs</span>
            </button>
          </div>

          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('browse')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'browse'
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setViewMode('calculate')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                viewMode === 'calculate'
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <CalcIcon className="h-4 w-4" />
              <span>Calculate</span>
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                viewMode === 'compare'
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Compare</span>
            </button>
          </div>

          {selectedHardware.length > 0 && (
            <div className="flex items-center space-x-4">
              <span className="text-slate-300 text-sm">
                {selectedHardware.length} selected
              </span>
              <button
                onClick={clearSelection}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {viewMode === 'browse' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDatabase.map((hardware) => (
              activeTab === 'ptu' ? (
                <PTUCard
                  key={hardware.id}
                  ptu={hardware as PTUSpec}
                  onSelect={handleHardwareSelect}
                  isSelected={selectedHardware.some(h => h.id === hardware.id)}
                />
              ) : (
                <HardwareCard
                  key={hardware.id}
                  hardware={hardware as GPUSpec | TPUSpec}
                  type={activeTab as 'gpu' | 'tpu'}
                  onSelect={handleHardwareSelect}
                  isSelected={selectedHardware.some(h => h.id === hardware.id)}
                />
              )
            ))}
          </div>
        )}

        {viewMode === 'calculate' && (
          <Calculator selectedHardware={selectedHardware} activeTab={activeTab} />
        )}

        {viewMode === 'compare' && (
          <ComparisonTable 
            hardware={selectedHardware.length > 0 ? selectedHardware : currentDatabase} 
            type={activeTab}
          />
        )}
      </div>
    </div>
  );
}

export default App;