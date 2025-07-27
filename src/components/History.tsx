import React, { useState } from 'react';
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => onSelectHistoryItem(item)}
              className="w-full text-left p-3 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className={`text-sm text-gray-600 ${expandedItem === item.id ? '' : 'truncate'}`}>
                    {item.expression}
                  </div>
                  <div className="font-mono font-bold text-blue-600 mt-1">
                    = {item.result}
                  </div>
                </div>
                <div className="text-xs text-gray-400 ml-2 flex-shrink-0">
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                    {item.mode.toUpperCase()}
                  </div>
                  <div className="mt-1">
                    {item.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </button>
            
            {/* Expand/Collapse button for long expressions */}
            {item.expression.length > 50 && (
              <button
                onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                className="w-full px-3 py-2 text-xs text-blue-600 hover:bg-blue-50 border-t border-gray-100 transition-colors"
              >
                {expandedItem === item.id ? 'Show Less' : 'Show Full Expression'}
              </button>
            )}
            
            {/* Expanded view */}
            {expandedItem === item.id && (
              <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-1">Full Expression:</div>
                <div className="text-sm font-mono text-gray-700 break-all">
                  {item.expression}
                </div>
                <div className="text-xs text-gray-500 mt-2 mb-1">Result:</div>
                <div className="text-sm font-mono font-bold text-blue-600">
                  {item.result}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Calculated at: {item.timestamp.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};