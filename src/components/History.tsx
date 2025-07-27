import React from 'react';
import { History as HistoryIcon, Trash2 } from 'lucide-react';
import { CalculationHistory } from '../types/calculator';

interface HistoryProps {
  history: CalculationHistory[];
  onClearHistory: () => void;
  onSelectHistoryItem: (item: CalculationHistory) => void;
}

export const History: React.FC<HistoryProps> = ({ 
  history, 
  onClearHistory,
  onSelectHistoryItem 
}) => {
  if (history.length === 0) {
    return (
      <div className="bg-white/80 p-4 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <HistoryIcon size={20} />
          <h3 className="font-semibold">History</h3>
        </div>
        <p className="text-gray-500 text-sm">No calculations yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 p-4 rounded-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <HistoryIcon size={20} />
          <h3 className="font-semibold">History</h3>
        </div>
        <button
          onClick={onClearHistory}
          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
          title="Clear History"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectHistoryItem(item)}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-600 truncate">
                  {item.expression}
                </div>
                <div className="font-mono font-bold text-blue-600">
                  = {item.result}
                </div>
              </div>
              <div className="text-xs text-gray-400 ml-2 flex-shrink-0">
                <div>{item.mode}</div>
                <div>{item.timestamp.toLocaleTimeString()}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};