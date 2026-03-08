import { GPUSpec, TPUSpec, PTUSpec } from '../types/hardware';

export const gpuDatabase: GPUSpec[] = [
  {
    id: 'b200',
    name: 'B200 SXM',
    manufacturer: 'NVIDIA',
    memory: 192,
    memoryBandwidth: 8000,
    computeUnits: 208,
    baseClock: 1200,
    boostClock: 1800,
    tdp: 1000,
    fp32Performance: 120,
    fp16Performance: 4500,
    int8Performance: 9000,
    price: 45000,
    cloudProviders: [
      { name: 'AWS', instanceType: 'p6-b200', pricePerHour: 120.00, availability: ['us-east-1'] },
      { name: 'Azure', instanceType: 'ND GB200 v6', pricePerHour: 115.00, availability: ['East US 2'] }
    ]
  },
  {
    id: 'h200',
    name: 'H200 SXM',
    manufacturer: 'NVIDIA',
    memory: 141,
    memoryBandwidth: 4800,
    computeUnits: 132,
    baseClock: 1400,
    boostClock: 1830,
    tdp: 700,
    fp32Performance: 67,
    fp16Performance: 3958,
    int8Performance: 7916,
    price: 35000,
    cloudProviders: [
      { name: 'AWS', instanceType: 'p5e.48xlarge', pricePerHour: 109.00, availability: ['us-east-1', 'us-west-2'] },
      { name: 'GCP', instanceType: 'a3-ultragpu-8g', pricePerHour: 44.80, availability: ['us-central1'] },
      { name: 'Azure', instanceType: 'ND H200 v5', pricePerHour: 49.60, availability: ['East US 2'] }
    ]
  },
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
    id: 'l40s',
    name: 'L40S',
    manufacturer: 'NVIDIA',
    memory: 48,
    memoryBandwidth: 864,
    computeUnits: 142,
    baseClock: 1980,
    boostClock: 2520,
    tdp: 350,
    fp32Performance: 91.6,
    fp16Performance: 183,
    int8Performance: 733,
    price: 9000,
    cloudProviders: [
      { name: 'AWS', instanceType: 'g6.48xlarge', pricePerHour: 18.24, availability: ['us-east-1', 'us-west-2'] },
      { name: 'Azure', instanceType: 'NVadsA10_v5', pricePerHour: 16.20, availability: ['East US', 'West Europe'] }
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
    id: 'tpu-v6e',
    name: 'TPU Trillium (v6e)',
    generation: 'v6e',
    memory: 32,
    memoryBandwidth: 1600,
    matrixUnits: 2,
    fp32Performance: 360,
    bf16Performance: 720,
    int8Performance: 1440,
    interconnectBandwidth: 400,
    price: 3.20,
    cloudProviders: [
      { name: 'GCP', instanceType: 'ct6e-standard-4t', pricePerHour: 12.80, availability: ['us-central1'] }
    ]
  },
  {
    id: 'tpu-v5p',
    name: 'TPU v5p',
    generation: 'v5p',
    memory: 95,
    memoryBandwidth: 2765,
    matrixUnits: 2,
    fp32Performance: 459,
    bf16Performance: 918,
    int8Performance: 1836,
    interconnectBandwidth: 450,
    price: 4.20,
    cloudProviders: [
      { name: 'GCP', instanceType: 'ct5p-hightpu-4t', pricePerHour: 16.80, availability: ['us-central1', 'europe-west4'] }
    ]
  },
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
  }
];

export const ptuDatabase: PTUSpec[] = [
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    modelType: 'GPT-4.1',
    version: '2025-01',
    contextLength: 128000,
    ptuCapacity: 100,
    tokensPerMinute: 55000,
    maxTokensPerRequest: 32768,
    pricePerPTUPerHour: 19.50,
    regions: ['East US 2', 'West Europe', 'Sweden Central'],
    features: ['Function Calling', 'JSON Mode', 'Structured Outputs', 'Vision']
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    modelType: 'GPT-4.1-mini',
    version: '2025-01',
    contextLength: 128000,
    ptuCapacity: 100,
    tokensPerMinute: 240000,
    maxTokensPerRequest: 32768,
    pricePerPTUPerHour: 6.20,
    regions: ['East US 2', 'West US 3', 'West Europe', 'UK South', 'Sweden Central'],
    features: ['Function Calling', 'JSON Mode', 'Structured Outputs', 'Vision']
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    modelType: 'o3-mini',
    version: '2025-01',
    contextLength: 200000,
    ptuCapacity: 100,
    tokensPerMinute: 90000,
    maxTokensPerRequest: 65536,
    pricePerPTUPerHour: 12.00,
    regions: ['East US 2', 'West Europe', 'UK South'],
    features: ['Reasoning', 'Function Calling', 'JSON Mode']
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    modelType: 'GPT-4o',
    version: '2024-08-06',
    contextLength: 128000,
    ptuCapacity: 100,
    tokensPerMinute: 30000,
    maxTokensPerRequest: 16384,
    pricePerPTUPerHour: 18.00,
    regions: ['East US', 'West US 2', 'West Europe', 'UK South', 'Australia East'],
    features: ['Vision', 'Function Calling', 'JSON Mode', 'Reproducible Outputs']
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    modelType: 'GPT-4o-mini',
    version: '2024-07-18',
    contextLength: 128000,
    ptuCapacity: 100,
    tokensPerMinute: 200000,
    maxTokensPerRequest: 16384,
    pricePerPTUPerHour: 5.40,
    regions: ['East US', 'West US 2', 'West Europe', 'UK South', 'Sweden Central'],
    features: ['Vision', 'Function Calling', 'JSON Mode', 'Reproducible Outputs']
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    modelType: 'GPT-4-Turbo',
    version: '2024-04-09',
    contextLength: 128000,
    ptuCapacity: 100,
    tokensPerMinute: 30000,
    maxTokensPerRequest: 4096,
    pricePerPTUPerHour: 36.00,
    regions: ['East US', 'West US', 'West Europe', 'UK South'],
    features: ['Vision', 'Function Calling', 'JSON Mode']
  }
];
