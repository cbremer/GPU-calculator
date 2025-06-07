import React, { useState, useEffect } from 'react';
import { GPUSpec, TPUSpec, PTUSpec, CalculationResult } from '../types/hardware';
import { Calculator as CalcIcon, Users, Clock, DollarSign, TrendingUp, AlertTriangle, Brain, Zap } from 'lucide-react';

interface CalculatorProps {
  selectedHardware: (GPUSpec | TPUSpec | PTUSpec)[];
  activeTab: 'gpu' | 'tpu' | 'ptu';
}

const Calculator: React.FC<CalculatorProps> = ({ selectedHardware, activeTab }) => {
  const [nodeCount, setNodeCount] = useState(1);
  const [unitsPerNode, setUnitsPerNode] = useState(8);
  const [utilizationRate, setUtilizationRate] = useState(85);
  const [monthlyHours, setMonthlyHours] = useState(730);
  
  // PTU-specific state
  const [ptuCount, setPtuCount] = useState(100);
  const [expectedTPM, setExpectedTPM] = useState(10000);
  
  const [results, setResults] = useState<CalculationResult | null>(null);

  useEffect(() => {
    if (selectedHardware.length > 0) {
      calculateResults();
    }
  }, [selectedHardware, nodeCount, unitsPerNode, utilizationRate, monthlyHours, ptuCount, expectedTPM, activeTab]);

  const calculateResults = () => {
    const hardware = selectedHardware[0]; // For simplicity, using first selected
    
    if (activeTab === 'ptu') {
      calculatePTUResults(hardware as PTUSpec);
    } else {
      calculateHardwareResults(hardware as GPUSpec | TPUSpec);
    }
  };

  const calculatePTUResults = (ptu: PTUSpec) => {
    const actualTPM = ptu.tokensPerMinute * ptuCount;
    const monthlyCost = ptu.pricePerPTUPerHour * ptuCount * monthlyHours;
    
    // Calculate efficiency based on utilization vs capacity
    const utilizationRatio = expectedTPM / actualTPM;
    const efficiencyScore = Math.min(100, utilizationRatio * 100);
    
    const recommendations: string[] = [];
    const bottlenecks: string[] = [];

    if (utilizationRatio < 0.5) {
      recommendations.push('Consider reducing PTU allocation to optimize costs');
    }
    if (utilizationRatio > 0.9) {
      recommendations.push('Consider increasing PTU allocation to handle peak loads');
      bottlenecks.push('High utilization may cause request throttling');
    }
    if (expectedTPM > ptu.tokensPerMinute * ptuCount) {
      bottlenecks.push('Expected throughput exceeds provisioned capacity');
    }
    if (ptuCount < 50) {
      recommendations.push('Consider minimum PTU allocation for consistent performance');
    }

    setResults({
      totalCost: monthlyCost,
      performanceMetrics: {
        totalTPM: actualTPM,
        totalPTUs: ptuCount,
        efficiencyScore
      },
      scalingRecommendations: recommendations,
      bottlenecks
    });
  };

  const calculateHardwareResults = (hardware: GPUSpec | TPUSpec) => {
    const totalUnits = nodeCount * unitsPerNode;
    const actualUtilization = utilizationRate / 100;

    const totalMemory = hardware.memory * totalUnits;
    const totalBandwidth = hardware.memoryBandwidth * totalUnits * actualUtilization;
    const totalFLOPS = hardware.fp32Performance * totalUnits * actualUtilization;

    // Calculate cost (using first available cloud provider if exists)
    let monthlyCost = 0;
    if ('cloudProviders' in hardware && hardware.cloudProviders.length > 0) {
      const provider = hardware.cloudProviders[0];
      monthlyCost = provider.pricePerHour * totalUnits * monthlyHours;
    }

    // Efficiency score based on utilization and memory bandwidth usage
    const memoryUtilizationScore = Math.min(100, (totalBandwidth / (hardware.memoryBandwidth * totalUnits)) * 100);
    const efficiencyScore = (actualUtilization * 100 + memoryUtilizationScore) / 2;

    // Generate recommendations
    const recommendations: string[] = [];
    const bottlenecks: string[] = [];

    if (utilizationRate < 70) {
      recommendations.push('Consider increasing workload utilization to improve cost efficiency');
    }
    if (totalMemory > 1000) {
      recommendations.push('Large memory footprint detected - consider data sharding strategies');
    }
    if (efficiencyScore < 60) {
      bottlenecks.push('Low efficiency detected - review memory access patterns');
    }
    if (nodeCount > 16) {
      recommendations.push('Consider implementing hierarchical communication patterns for large clusters');
    }

    setResults({
      totalCost: monthlyCost,
      performanceMetrics: {
        totalFLOPS,
        totalMemory,
        totalBandwidth,
        efficiencyScore
      },
      scalingRecommendations: recommendations,
      bottlenecks
    });
  };

  if (selectedHardware.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 text-center">
        <CalcIcon className="h-12 w-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-400">Select hardware to start calculating</p>
      </div>
    );
  }

  const isPTU = activeTab === 'ptu';

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <CalcIcon className="h-5 w-5 mr-2 text-emerald-400" />
          {isPTU ? 'PTU Configuration' : 'System Configuration'}
        </h3>
        
        {isPTU ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                PTU Count
              </label>
              <input
                type="number"
                value={ptuCount}
                onChange={(e) => setPtuCount(Math.max(50, parseInt(e.target.value) || 50))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Expected TPM
              </label>
              <input
                type="number"
                value={expectedTPM}
                onChange={(e) => setExpectedTPM(Math.max(1000, parseInt(e.target.value) || 1000))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Monthly Hours
              </label>
              <input
                type="number"
                value={monthlyHours}
                onChange={(e) => setMonthlyHours(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Number of Nodes
              </label>
              <input
                type="number"
                value={nodeCount}
                onChange={(e) => setNodeCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Units per Node
              </label>
              <input
                type="number"
                value={unitsPerNode}
                onChange={(e) => setUnitsPerNode(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Utilization Rate (%)
              </label>
              <input
                type="number"
                value={utilizationRate}
                onChange={(e) => setUtilizationRate(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Monthly Hours
              </label>
              <input
                type="number"
                value={monthlyHours}
                onChange={(e) => setMonthlyHours(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Performance</h4>
              {isPTU ? <Brain className="h-5 w-5 text-purple-400" /> : <TrendingUp className="h-5 w-5 text-emerald-400" />}
            </div>
            <div className="space-y-3">
              {isPTU ? (
                <>
                  <div>
                    <p className="text-sm text-slate-400">Total TPM</p>
                    <p className="text-2xl font-bold text-white">{results.performanceMetrics.totalTPM?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Efficiency Score</p>
                    <p className="text-lg font-semibold text-purple-400">{results.performanceMetrics.efficiencyScore.toFixed(1)}%</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-slate-400">Total TFLOPS</p>
                    <p className="text-2xl font-bold text-white">{results.performanceMetrics.totalFLOPS?.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Efficiency Score</p>
                    <p className="text-lg font-semibold text-emerald-400">{results.performanceMetrics.efficiencyScore.toFixed(1)}%</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {isPTU ? (
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Capacity</h4>
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Total PTUs</p>
                  <p className="text-2xl font-bold text-white">{results.performanceMetrics.totalPTUs}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Expected TPM</p>
                  <p className="text-lg font-semibold text-blue-400">{expectedTPM.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Memory</h4>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Total Memory</p>
                  <p className="text-2xl font-bold text-white">{results.performanceMetrics.totalMemory?.toLocaleString()} GB</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Bandwidth</p>
                  <p className="text-lg font-semibold text-blue-400">{results.performanceMetrics.totalBandwidth?.toFixed(0)} GB/s</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Scale</h4>
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <div className="space-y-3">
              {isPTU ? (
                <>
                  <div>
                    <p className="text-sm text-slate-400">PTU Units</p>
                    <p className="text-2xl font-bold text-white">{ptuCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Utilization</p>
                    <p className="text-lg font-semibold text-purple-400">{((expectedTPM / (results.performanceMetrics.totalTPM || 1)) * 100).toFixed(1)}%</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-slate-400">Total Units</p>
                    <p className="text-2xl font-bold text-white">{nodeCount * unitsPerNode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Nodes</p>
                    <p className="text-lg font-semibold text-purple-400">{nodeCount}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Cost</h4>
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-400">Monthly Cost</p>
                <p className="text-2xl font-bold text-white">${results.totalCost.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Per Hour</p>
                <p className="text-lg font-semibold text-yellow-400">${(results.totalCost / monthlyHours).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {results && (results.scalingRecommendations.length > 0 || results.bottlenecks.length > 0) && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Recommendations & Analysis</h4>
          
          {results.scalingRecommendations.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-emerald-400 mb-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Scaling Recommendations
              </h5>
              <ul className="space-y-1">
                {results.scalingRecommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-start">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.bottlenecks.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-orange-400 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Potential Bottlenecks
              </h5>
              <ul className="space-y-1">
                {results.bottlenecks.map((bottleneck, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-start">
                    <span className="w-1 h-1 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {bottleneck}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calculator;