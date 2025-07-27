import React, { useState } from 'react';
import { History as HistoryIcon, Trash2, Copy, Check } from 'lucide-react';
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
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <HistoryIcon size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">History</h2>
        </div>
        <div className="text-center text-gray-500 py-8">
          <HistoryIcon size={48} className="mx-auto mb-3 text-gray-300" />
          <p>No calculations yet</p>
          <p className="text-sm">Your calculation history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HistoryIcon size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">History</h2>
          <span className="text-sm text-gray-500">({history.length})</span>
        </div>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 size={14} />
          Clear
        </button>
      </div>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="p-3 hover:bg-gray-50 transition-colors group">
              <div className="flex justify-between items-start">
                <button
                  onClick={() => onSelectHistoryItem(item)}
                  className="flex-1 min-w-0 text-left"
                >
                  <div className={`text-sm text-gray-600 ${expandedItem === item.id ? '' : 'truncate'}`}>
                    {item.expression}
                  </div>
                  <div className="font-mono font-bold text-blue-600 mt-1">
                    = {item.result}
                  </div>
                </button>
                <div className="flex items-start gap-2 ml-2 flex-shrink-0">
                  <button
                    onClick={() => copyToClipboard(item.result, item.id)}
                    className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Copy result"
                  >
                    {copiedItem === item.id ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                  <div className="text-xs text-gray-400">
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                      {item.mode.toUpperCase()}
                    </div>
                    <div className="mt-1">
                      {item.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Expand/Collapse button for long expressions */}
            {item.expression.length > 50 && (
              <button
                onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                className="w-full px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 border-t border-gray-200 transition-colors"
              >
                {expandedItem === item.id ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};