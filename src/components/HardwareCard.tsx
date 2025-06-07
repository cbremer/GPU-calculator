import React from 'react';
import { GPUSpec, TPUSpec } from '../types/hardware';
import { Cpu, MemoryStick as Memory, Zap, DollarSign, Cloud } from 'lucide-react';

interface HardwareCardProps {
  hardware: GPUSpec | TPUSpec;
  type: 'gpu' | 'tpu';
  onSelect: (hardware: GPUSpec | TPUSpec) => void;
  isSelected: boolean;
}

const HardwareCard: React.FC<HardwareCardProps> = ({ hardware, type, onSelect, isSelected }) => {
  const isGPU = type === 'gpu';
  const gpu = isGPU ? hardware as GPUSpec : null;
  const tpu = !isGPU ? hardware as TPUSpec : null;

  return (
    <div 
      className={`bg-slate-800 rounded-lg p-6 border transition-all duration-200 cursor-pointer hover:scale-105 ${
        isSelected 
          ? 'border-emerald-400 ring-2 ring-emerald-400/20' 
          : 'border-slate-700 hover:border-slate-600'
      }`}
      onClick={() => onSelect(hardware)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{hardware.name}</h3>
          {gpu && <p className="text-emerald-400 text-sm font-medium">{gpu.manufacturer}</p>}
          {tpu && <p className="text-blue-400 text-sm font-medium">Generation {tpu.generation}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <Cpu className={`h-6 w-6 ${isGPU ? 'text-emerald-400' : 'text-blue-400'}`} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Memory className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-sm text-slate-400">Memory</p>
            <p className="text-white font-medium">{hardware.memory} GB</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-sm text-slate-400">Bandwidth</p>
            <p className="text-white font-medium">{hardware.memoryBandwidth} GB/s</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-sm text-slate-400">FP32 TFLOPS</p>
            <p className="text-white font-medium">{hardware.fp32Performance}</p>
          </div>
        </div>

        {gpu && (
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm text-slate-400">TDP</p>
              <p className="text-white font-medium">{gpu.tdp}W</p>
            </div>
          </div>
        )}

        {tpu && (
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-sm text-slate-400">BF16 TFLOPS</p>
              <p className="text-white font-medium">{tpu.bf16Performance}</p>
            </div>
          </div>
        )}
      </div>

      {hardware.cloudProviders.length > 0 && (
        <div className="border-t border-slate-700 pt-3">
          <div className="flex items-center space-x-2 mb-2">
            <Cloud className="h-4 w-4 text-slate-400" />
            <p className="text-sm text-slate-400">Cloud Availability</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {hardware.cloudProviders.slice(0, 3).map((provider, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
              >
                {provider.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HardwareCard;