import { GPUSpec, TPUSpec } from '../types/hardware';

export const gpuDatabase: GPUSpec[] = [
  {
    id: 'h100',
    name: 'H100 SXM',
    manufacturer: 'NVIDIA',
    memory: 80,
    memoryBandwidth: 3352,
    computeUnits: 132,
    baseClock: 1410,
    boostClock: 1830,
    tdp: 700,
    fp32Performance: 67,
    fp16Performance: 1979,
    int8Performance: 3958,
    price: 30000,
    cloudProviders: [
      { name: 'AWS', instanceType: 'p5.48xlarge', pricePerHour: 98.32, availability: ['us-east-1', 'us-west-2'] },
      { name: 'GCP', instanceType: 'a3-highgpu-8g', pricePerHour: 37.70, availability: ['us-central1', 'europe-west4'] },
      { name: 'Azure', instanceType: 'ND96isr_H100_v5', pricePerHour: 43.72, availability: ['East US', 'West US 2'] }
    ]
  },
  {
    id: 'a100',
    name: 'A100 SXM 80GB',
    manufacturer: 'NVIDIA',
    memory: 80,
    memoryBandwidth: 2039,
    computeUnits: 108,
    baseClock: 1410,
    boostClock: 1830,
    tdp: 500,
    fp32Performance: 19.5,
    fp16Performance: 624,
    int8Performance: 1248,
    price: 15000,
    cloudProviders: [
      { name: 'AWS', instanceType: 'p4d.24xlarge', pricePerHour: 32.77, availability: ['us-east-1', 'us-west-2'] },
      { name: 'GCP', instanceType: 'a2-ultragpu-8g', pricePerHour: 33.14, availability: ['us-central1', 'europe-west4'] },
      { name: 'Azure', instanceType: 'ND96asr_v4', pricePerHour: 27.20, availability: ['East US', 'West Europe'] }
    ]
  },
  {
    id: 'v100',
    name: 'V100 SXM2 32GB',
    manufacturer: 'NVIDIA',
    memory: 32,
    memoryBandwidth: 900,
    computeUnits: 84,
    baseClock: 1530,
    boostClock: 1890,
    tdp: 350,
    fp32Performance: 15.7,
    fp16Performance: 125,
    price: 8000,
    cloudProviders: [
      { name: 'AWS', instanceType: 'p3.16xlarge', pricePerHour: 24.48, availability: ['us-east-1', 'us-west-2'] },
      { name: 'GCP', instanceType: 'n1-standard-96-v100x8', pricePerHour: 18.48, availability: ['us-central1', 'europe-west1'] }
    ]
  },
  {
    id: 'rtx4090',
    name: 'RTX 4090',
    manufacturer: 'NVIDIA',
    memory: 24,
    memoryBandwidth: 1008,
    computeUnits: 128,
    baseClock: 2520,
    boostClock: 2750,
    tdp: 450,
    fp32Performance: 83,
    fp16Performance: 166,
    price: 1600,
    cloudProviders: []
  }
];

export const tpuDatabase: TPUSpec[] = [
  {
    id: 'tpu-v5e',
    name: 'TPU v5e',
    generation: 'v5e',
    memory: 16,
    memoryBandwidth: 1200,
    matrixUnits: 2,
    fp32Performance: 197,
    bf16Performance: 394,
    int8Performance: 788,
    interconnectBandwidth: 200,
    price: 1.60,
    cloudProviders: [
      { name: 'GCP', instanceType: 'ct5lp-hightpu-4t', pricePerHour: 6.40, availability: ['us-central1', 'europe-west4'] }
    ]
  },
  {
    id: 'tpu-v4',
    name: 'TPU v4',
    generation: 'v4',
    memory: 32,
    memoryBandwidth: 1200,
    matrixUnits: 2,
    fp32Performance: 275,
    bf16Performance: 550,
    int8Performance: 1100,
    interconnectBandwidth: 300,
    price: 2.40,
    cloudProviders: [
      { name: 'GCP', instanceType: 'ct4p-hightpu-4t', pricePerHour: 9.60, availability: ['us-central1', 'europe-west4'] }
    ]
  },
  {
    id: 'tpu-v3',
    name: 'TPU v3',
    generation: 'v3',
    memory: 16,
    memoryBandwidth: 900,
    matrixUnits: 2,
    fp32Performance: 123,
    bf16Performance: 420,
    int8Performance: 840,
    interconnectBandwidth: 100,
    price: 1.35,
    cloudProviders: [
      { name: 'GCP', instanceType: 'v3-8', pricePerHour: 2.40, availability: ['us-central1', 'europe-west1'] }
    ]
  }
];