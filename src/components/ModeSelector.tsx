import React from 'react';
import { Calculator, Sigma, TrendingUp, DollarSign, ArrowLeftRight } from 'lucide-react';
import { CalculatorMode } from '../types/calculator';

interface ModeSelectorProps {
  currentMode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

const modes: { id: CalculatorMode; label: string; icon: React.ReactNode }[] = [
  { id: 'standard', label: 'Standard', icon: <Calculator size={18} /> },
  { id: 'scientific', label: 'Scientific', icon: <Sigma size={18} /> },
  { id: 'graphing', label: 'Graphing', icon: <TrendingUp size={18} /> },
  { id: 'financial', label: 'Financial', icon: <DollarSign size={18} /> },
  { id: 'conversion', label: 'Convert', icon: <ArrowLeftRight size={18} /> },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentMode === mode.id
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200 hover:border-gray-300'
          }`}
        >
          {mode.icon}
          <span className="hidden sm:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  );
};