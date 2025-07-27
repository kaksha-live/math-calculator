import React from 'react';

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'operator' | 'equals' | 'clear' | 'memory' | 'function';
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  value,
  onClick,
  className = '',
  children,
  disabled = false,
  variant = 'default',
}) => {
  const baseClasses = 'h-12 rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: 'bg-white/80 hover:bg-white text-gray-800 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md',
    operator: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg',
    equals: 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg',
    clear: 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg',
    memory: 'bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg',
    function: 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg text-sm',
  };

  return (
    <button
      onClick={() => onClick(value)}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children || value}
    </button>
  );
};