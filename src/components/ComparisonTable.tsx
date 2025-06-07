import React from 'react';
import { GPUSpec, TPUSpec } from '../types/hardware';
import { Cpu, MemoryStick as Memory, Zap, DollarSign, Cloud } from 'lucide-react';

interface ComparisonTableProps {
  hardware: (GPUSpec | TPUSpec)[];
  type: 'gpu' | 'tpu';
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ hardware, type }) => {
  if (hardware.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 text-center">
        <p className="text-slate-400">No hardware selected for comparison</p>
      </div>
    );
  }

  const isGPU = type === 'gpu';

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Cpu className="h-5 w-5 mr-2 text-emerald-400" />
        {isGPU ? 'GPU' : 'TPU'} Comparison
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-slate-300 font-medium py-3 px-4">Model</th>
              <th className="text-right text-slate-300 font-medium py-3 px-4">
                <div className="flex items-center justify-end">
                  <Memory className="h-4 w-4 mr-1" />
                  Memory
                </div>
              </th>
              <th className="text-right text-slate-300 font-medium py-3 px-4">
                <div className="flex items-center justify-end">
                  <Zap className="h-4 w-4 mr-1" />
                  Bandwidth
                </div>
              </th>
              <th className="text-right text-slate-300 font-medium py-3 px-4">
                <div className="flex items-center justify-end">
                  <Cpu className="h-4 w-4 mr-1" />
                  FP32 TFLOPS
                </div>
              </th>
              {isGPU && (
                <>
                  <th className="text-right text-slate-300 font-medium py-3 px-4">FP16 TFLOPS</th>
                  <th className="text-right text-slate-300 font-medium py-3 px-4">TDP (W)</th>
                </>
              )}
              {!isGPU && (
                <>
                  <th className="text-right text-slate-300 font-medium py-3 px-4">BF16 TFLOPS</th>
                  <th className="text-right text-slate-300 font-medium py-3 px-4">INT8 TOPS</th>
                </>
              )}
              <th className="text-right text-slate-300 font-medium py-3 px-4">
                <div className="flex items-center justify-end">
                  <Cloud className="h-4 w-4 mr-1" />
                  Providers
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {hardware.map((hw, index) => {
              const gpu = isGPU ? hw as GPUSpec : null;
              const tpu = !isGPU ? hw as TPUSpec : null;
              
              return (
                <tr key={hw.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white font-medium">{hw.name}</p>
                      {gpu && <p className="text-slate-400 text-xs">{gpu.manufacturer}</p>}
                      {tpu && <p className="text-slate-400 text-xs">Gen {tpu.generation}</p>}
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-white font-medium">{hw.memory} GB</td>
                  <td className="text-right py-3 px-4 text-white font-medium">{hw.memoryBandwidth.toLocaleString()} GB/s</td>
                  <td className="text-right py-3 px-4 text-white font-medium">{hw.fp32Performance}</td>
                  {gpu && (
                    <>
                      <td className="text-right py-3 px-4 text-white font-medium">{gpu.fp16Performance || 'N/A'}</td>
                      <td className="text-right py-3 px-4 text-white font-medium">{gpu.tdp}</td>
                    </>
                  )}
                  {tpu && (
                    <>
                      <td className="text-right py-3 px-4 text-white font-medium">{tpu.bf16Performance}</td>
                      <td className="text-right py-3 px-4 text-white font-medium">{tpu.int8Performance}</td>
                    </>
                  )}
                  <td className="text-right py-3 px-4">
                    <div className="flex flex-wrap justify-end gap-1">
                      {hw.cloudProviders.slice(0, 3).map((provider, pIndex) => (
                        <span 
                          key={pIndex}
                          className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                        >
                          {provider.name}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Performance per dollar analysis */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-yellow-400" />
          Cost Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hardware.map((hw) => {
            const cheapestProvider = hw.cloudProviders.sort((a, b) => a.pricePerHour - b.pricePerHour)[0];
            if (!cheapestProvider) return null;
            
            const performancePerDollar = hw.fp32Performance / cheapestProvider.pricePerHour;
            
            return (
              <div key={hw.id} className="bg-slate-700 rounded-lg p-4">
                <p className="text-white font-medium mb-2">{hw.name}</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Best Price:</span>
                    <span className="text-white text-sm">${cheapestProvider.pricePerHour}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">TFLOPS/$:</span>
                    <span className="text-emerald-400 text-sm font-medium">{performancePerDollar.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Provider:</span>
                    <span className="text-blue-400 text-sm">{cheapestProvider.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;