import React from 'react';
import { PTUSpec } from '../types/hardware';
import { Brain, Clock, Zap, DollarSign, MapPin, Star } from 'lucide-react';

interface PTUCardProps {
  ptu: PTUSpec;
  onSelect: (ptu: PTUSpec) => void;
  isSelected: boolean;
}

const PTUCard: React.FC<PTUCardProps> = ({ ptu, onSelect, isSelected }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toLocaleString();
  };

  const getModelColor = (modelType: PTUSpec['modelType']) => {
    switch (modelType) {
      case 'GPT-4o': return 'text-purple-400';
      case 'GPT-4o-mini': return 'text-blue-400';
      case 'GPT-4.1': return 'text-cyan-400';
      case 'GPT-4.1-mini': return 'text-emerald-400';
      case 'o3-mini': return 'text-orange-400';
      case 'GPT-4-Turbo': return 'text-emerald-400';
      case 'GPT-4': return 'text-yellow-400';
      case 'GPT-3.5-Turbo': return 'text-cyan-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div 
      className={`bg-slate-800 rounded-lg p-6 border transition-all duration-200 cursor-pointer hover:scale-105 ${
        isSelected 
          ? 'border-purple-400 ring-2 ring-purple-400/20' 
          : 'border-slate-700 hover:border-slate-600'
      }`}
      onClick={() => onSelect(ptu)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{ptu.name}</h3>
          <p className={`text-sm font-medium ${getModelColor(ptu.modelType)}`}>
            {ptu.modelType}
          </p>
          <p className="text-xs text-slate-400">Version {ptu.version}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-purple-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-sm text-slate-400">Context Length</p>
            <p className="text-white font-medium">{formatNumber(ptu.contextLength)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-sm text-slate-400">TPM per PTU</p>
            <p className="text-white font-medium">{formatNumber(ptu.tokensPerMinute)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-sm text-slate-400">Price/PTU/Hr</p>
            <p className="text-white font-medium">${ptu.pricePerPTUPerHour}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-sm text-slate-400">Max Tokens</p>
            <p className="text-white font-medium">{formatNumber(ptu.maxTokensPerRequest)}</p>
          </div>
        </div>
      </div>

      {ptu.features.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-slate-400 mb-2">Features</p>
          <div className="flex flex-wrap gap-1">
            {ptu.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
              >
                {feature}
              </span>
            ))}
            {ptu.features.length > 3 && (
              <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
                +{ptu.features.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="border-t border-slate-700 pt-3">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4 text-slate-400" />
          <p className="text-sm text-slate-400">Available Regions</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {ptu.regions.slice(0, 2).map((region, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
            >
              {region}
            </span>
          ))}
          {ptu.regions.length > 2 && (
            <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
              +{ptu.regions.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PTUCard;
