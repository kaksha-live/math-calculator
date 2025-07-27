import React from 'react';

interface DisplayProps {
  value: string;
  memory: number;
  expression?: string;
}

export const Display: React.FC<DisplayProps> = ({ value, memory, expression }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg mb-4 min-h-[80px] flex flex-col justify-end">
      {expression && (
        <div className="text-sm text-gray-400 mb-1 overflow-hidden text-ellipsis">
          {expression}
        </div>
      )}
      <div className="text-right">
        <div className="text-2xl font-mono font-bold overflow-hidden text-ellipsis">
          {value}
        </div>
        {memory !== 0 && (
          <div className="text-xs text-blue-400 mt-1">
            M: {memory}
          </div>
        )}
      </div>
    </div>
  );
};