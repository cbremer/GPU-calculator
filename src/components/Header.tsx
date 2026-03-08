import React from 'react';
import { Cpu, Zap, Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Cpu className="h-8 w-8 text-emerald-400" />
            <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
            <Brain className="h-3 w-3 text-purple-400 absolute -bottom-1 -left-1" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">GPU, TPU & PTU Calculator</h1>
            <p className="text-slate-400 text-sm">Distributed Systems & AI Workload Planning (updated for 2026)</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
