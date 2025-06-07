export interface GPUSpec {
  id: string;
  name: string;
  manufacturer: 'NVIDIA' | 'AMD' | 'Intel';
  memory: number; // GB
  memoryBandwidth: number; // GB/s
  computeUnits: number;
  baseClock: number; // MHz
  boostClock: number; // MHz
  tdp: number; // Watts
  fp32Performance: number; // TFLOPS
  fp16Performance?: number; // TFLOPS
  int8Performance?: number; // TOPS
  price?: number; // USD
  cloudProviders: CloudProvider[];
}

export interface TPUSpec {
  id: string;
  name: string;
  generation: string;
  memory: number; // GB
  memoryBandwidth: number; // GB/s
  matrixUnits: number;
  fp32Performance: number; // TFLOPS
  bf16Performance: number; // TFLOPS
  int8Performance: number; // TOPS
  interconnectBandwidth: number; // GB/s
  price?: number; // USD per hour
  cloudProviders: CloudProvider[];
}

export interface CloudProvider {
  name: 'AWS' | 'GCP' | 'Azure' | 'Oracle';
  instanceType: string;
  pricePerHour: number;
  pricePerMonth?: number;
  availability: string[];
}

export interface CalculationResult {
  totalCost: number;
  performanceMetrics: {
    totalFLOPS: number;
    totalMemory: number;
    totalBandwidth: number;
    efficiencyScore: number;
  };
  scalingRecommendations: string[];
  bottlenecks: string[];
}