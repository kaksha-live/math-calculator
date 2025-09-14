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
  const baseClasses = 'h-16 font-bold text-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-100 ',
    operator: 'hover:bg-blue-500 hover:text-white',
    equals: 'hover:bg-blue-500 hover:text-white',
    clear: '',
    memory: '',
    function: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-100 ',
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