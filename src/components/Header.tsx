import React from 'react';
import { Cpu, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Cpu className="h-8 w-8 text-emerald-400" />
            <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">GPU & TPU Calculator</h1>
            <p className="text-slate-400 text-sm">Distributed Systems Hardware Planning</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;