import React, { useState } from 'react';
import { CalculatorButton } from '../CalculatorButton';
import { Display } from '../Display';

interface ScientificCalculatorProps {
  display: string;
  setDisplay: (value: string) => void;
  memory: number;
  calculate: (expression: string) => string;
  clearDisplay: () => void;
  clearAll: () => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({
  display,
  setDisplay,
  memory,
  calculate,
  clearDisplay,
  clearAll,
}) => {
  const [expression, setExpression] = useState('');
  const [isInverse, setIsInverse] = useState(false);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');

  const inputNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const inputOperator = (op: string) => {
    const newExpression = expression + display + op;
    setExpression(newExpression);
    setDisplay('0');
  };

  const inputFunction = (func: string) => {
    let functionName = func;
    
    // Handle angle conversion for trigonometric functions
    if (['sin', 'cos', 'tan'].includes(func) && angleMode === 'DEG') {
      functionName = `${func}(${display} * pi / 180)`;
      const result = calculate(functionName);
      setDisplay(result);
      return;
    }
    
    // Handle inverse functions
    if (isInverse) {
      switch (func) {
        case 'sin': functionName = 'asin'; break;
        case 'cos': functionName = 'acos'; break;
        case 'tan': functionName = 'atan'; break;
        case 'log': functionName = '10^'; break;
        case 'ln': functionName = 'e^'; break;
      }
    }

    const fullExpression = `${functionName}(${display})`;
    const result = calculate(fullExpression);
    setDisplay(result);
    setIsInverse(false);
  };

  const inputConstant = (constant: string) => {
    const constants: { [key: string]: string } = {
      'π': 'pi',
      'e': 'e',
    };
    setDisplay(constants[constant] || constant);
  };

  const performCalculation = () => {
    if (expression) {
      const result = calculate(expression + display);
      setExpression('');
      setDisplay(result);
    }
  };

  const handleClear = () => {
    clearDisplay();
    setExpression('');
  };

  const square = () => {
    const result = calculate(`(${display})^2`);
    setDisplay(result);
  };

  const squareRoot = () => {
    const result = calculate(`sqrt(${display})`);
    setDisplay(result);
  };

  const power = () => {
    setExpression(expression + display + '^');
    setDisplay('0');
  };

  const factorial = () => {
    const result = calculate(`${display}!`);
    setDisplay(result);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Display value={display} memory={memory} expression={expression} />
      
      {/* Mode indicators */}
      <div className="flex gap-2 mb-4 text-sm">
        <button
          onClick={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG')}
          className={`px-3 py-1 rounded ${angleMode === 'DEG' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {angleMode}
        </button>
        <button
          onClick={() => setIsInverse(!isInverse)}
          className={`px-3 py-1 rounded ${isInverse ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          INV
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {/* Row 1 - Functions */}
        <CalculatorButton value="sin" onClick={() => inputFunction('sin')} variant="function">
          {isInverse ? 'sin⁻¹' : 'sin'}
        </CalculatorButton>
        <CalculatorButton value="cos" onClick={() => inputFunction('cos')} variant="function">
          {isInverse ? 'cos⁻¹' : 'cos'}
        </CalculatorButton>
        <CalculatorButton value="tan" onClick={() => inputFunction('tan')} variant="function">
          {isInverse ? 'tan⁻¹' : 'tan'}
        </CalculatorButton>
        <CalculatorButton value="log" onClick={() => inputFunction('log')} variant="function">
          {isInverse ? '10ˣ' : 'log'}
        </CalculatorButton>
        <CalculatorButton value="ln" onClick={() => inputFunction('ln')} variant="function">
          {isInverse ? 'eˣ' : 'ln'}
        </CalculatorButton>
        <CalculatorButton value="!" onClick={factorial} variant="function">x!</CalculatorButton>

        {/* Row 2 - Powers and roots */}
        <CalculatorButton value="π" onClick={() => inputConstant('π')} variant="function">π</CalculatorButton>
        <CalculatorButton value="e" onClick={() => inputConstant('e')} variant="function">e</CalculatorButton>
        <CalculatorButton value="x²" onClick={square} variant="function">x²</CalculatorButton>
        <CalculatorButton value="√" onClick={squareRoot} variant="function">√x</CalculatorButton>
        <CalculatorButton value="^" onClick={power} variant="function">xʸ</CalculatorButton>
        <CalculatorButton value="(" onClick={() => inputNumber('(')} variant="operator">(</CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton value="AC" onClick={clearAll} variant="clear">AC</CalculatorButton>
        <CalculatorButton value="C" onClick={handleClear} variant="clear">C</CalculatorButton>
        <CalculatorButton value=")" onClick={() => inputNumber(')')} variant="operator">)</CalculatorButton>
        <CalculatorButton value="/" onClick={() => inputOperator('/')} variant="operator">÷</CalculatorButton>
        <CalculatorButton value="*" onClick={() => inputOperator('*')} variant="operator">×</CalculatorButton>
        <CalculatorButton value="DEL" onClick={() => setDisplay(display.slice(0, -1) || '0')} variant="clear">DEL</CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton value="7" onClick={() => inputNumber('7')}>7</CalculatorButton>
        <CalculatorButton value="8" onClick={() => inputNumber('8')}>8</CalculatorButton>
        <CalculatorButton value="9" onClick={() => inputNumber('9')}>9</CalculatorButton>
        <CalculatorButton value="-" onClick={() => inputOperator('-')} variant="operator">−</CalculatorButton>
        <CalculatorButton value="%" onClick={() => setDisplay((parseFloat(display) / 100).toString())} variant="operator">%</CalculatorButton>
        <CalculatorButton value="1/x" onClick={() => setDisplay((1 / parseFloat(display)).toString())} variant="function">1/x</CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton value="4" onClick={() => inputNumber('4')}>4</CalculatorButton>
        <CalculatorButton value="5" onClick={() => inputNumber('5')}>5</CalculatorButton>
        <CalculatorButton value="6" onClick={() => inputNumber('6')}>6</CalculatorButton>
        <CalculatorButton value="+" onClick={() => inputOperator('+')} variant="operator">+</CalculatorButton>
        <CalculatorButton value="±" onClick={() => setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)} variant="operator">±</CalculatorButton>
        <CalculatorButton value="EXP" onClick={() => inputOperator('e')} variant="function">EXP</CalculatorButton>

        {/* Row 6 */}
        <CalculatorButton value="1" onClick={() => inputNumber('1')}>1</CalculatorButton>
        <CalculatorButton value="2" onClick={() => inputNumber('2')}>2</CalculatorButton>
        <CalculatorButton value="3" onClick={() => inputNumber('3')}>3</CalculatorButton>
        <CalculatorButton value="=" onClick={performCalculation} variant="equals" className="row-span-2">=</CalculatorButton>
        <CalculatorButton value="Ans" onClick={() => setDisplay(display)} variant="function">Ans</CalculatorButton>
        <CalculatorButton value="Rand" onClick={() => setDisplay(Math.random().toString())} variant="function">Rand</CalculatorButton>

        {/* Row 7 */}
        <CalculatorButton value="0" onClick={() => inputNumber('0')} className="col-span-2">0</CalculatorButton>
        <CalculatorButton value="." onClick={() => inputNumber('.')}>.</CalculatorButton>
        <CalculatorButton value="mod" onClick={() => inputOperator(' mod ')} variant="function">mod</CalculatorButton>
        <CalculatorButton value="abs" onClick={() => setDisplay(Math.abs(parseFloat(display)).toString())} variant="function">|x|</CalculatorButton>
      </div>
    </div>
  );
};