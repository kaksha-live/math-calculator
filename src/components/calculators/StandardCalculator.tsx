import React, { useState } from 'react';
import { CalculatorButton } from '../CalculatorButton';
import { Display } from '../Display';

interface StandardCalculatorProps {
  display: string;
  setDisplay: (value: string) => void;
  memory: number;
  calculate: (expression: string) => string;
  clearDisplay: () => void;
  clearAll: () => void;
  memoryAdd: () => void;
  memorySubtract: () => void;
  memoryRecall: () => void;
  memoryClear: () => void;
}

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({
  display,
  setDisplay,
  memory,
  calculate,
  clearDisplay,
  clearAll,
  memoryAdd,
  memorySubtract,
  memoryRecall,
  memoryClear,
}) => {
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (expression === '') {
      setExpression(display + ' ' + nextOperator + ' ');
    } else {
      const result = calculate(expression + display);
      setExpression(result + ' ' + nextOperator + ' ');
    }

    setWaitingForOperand(true);
  };

  const performCalculation = () => {
    if (expression !== '') {
      calculate(expression + display);
      setExpression('');
      setWaitingForOperand(true);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    }
  };

  const percentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  const handleClear = () => {
    clearDisplay();
    setExpression('');
    setWaitingForOperand(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <Display value={display} memory={memory} expression={expression} />
      
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CalculatorButton value="AC" onClick={clearAll} variant="clear">AC</CalculatorButton>
        <CalculatorButton value="C" onClick={handleClear} variant="clear">C</CalculatorButton>
        <CalculatorButton value="±" onClick={toggleSign} variant="operator">±</CalculatorButton>
        <CalculatorButton value="÷" onClick={() => inputOperator('/')} variant="operator">÷</CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton value="MC" onClick={memoryClear} variant="memory">MC</CalculatorButton>
        <CalculatorButton value="MR" onClick={memoryRecall} variant="memory">MR</CalculatorButton>
        <CalculatorButton value="M+" onClick={memoryAdd} variant="memory">M+</CalculatorButton>
        <CalculatorButton value="×" onClick={() => inputOperator('*')} variant="operator">×</CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton value="7" onClick={() => inputNumber('7')}>7</CalculatorButton>
        <CalculatorButton value="8" onClick={() => inputNumber('8')}>8</CalculatorButton>
        <CalculatorButton value="9" onClick={() => inputNumber('9')}>9</CalculatorButton>
        <CalculatorButton value="-" onClick={() => inputOperator('-')} variant="operator">−</CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton value="4" onClick={() => inputNumber('4')}>4</CalculatorButton>
        <CalculatorButton value="5" onClick={() => inputNumber('5')}>5</CalculatorButton>
        <CalculatorButton value="6" onClick={() => inputNumber('6')}>6</CalculatorButton>
        <CalculatorButton value="+" onClick={() => inputOperator('+')} variant="operator">+</CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton value="1" onClick={() => inputNumber('1')}>1</CalculatorButton>
        <CalculatorButton value="2" onClick={() => inputNumber('2')}>2</CalculatorButton>
        <CalculatorButton value="3" onClick={() => inputNumber('3')}>3</CalculatorButton>
        <CalculatorButton value="%" onClick={percentage} variant="operator" className="row-span-2">%</CalculatorButton>

        {/* Row 6 */}
        <CalculatorButton value="0" onClick={() => inputNumber('0')} className="col-span-2">0</CalculatorButton>
        <CalculatorButton value="." onClick={inputDecimal}>.</CalculatorButton>
        
        {/* Equals button */}
        <CalculatorButton value="=" onClick={performCalculation} variant="equals" className="col-start-4 row-start-6">=</CalculatorButton>
      </div>
    </div>
  );
};