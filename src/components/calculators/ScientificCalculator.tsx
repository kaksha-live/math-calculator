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
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      if (num === '.' && display.includes('.')) {
        return; // Don't add multiple decimal points
      }
      if (display === '0' && num !== '.') {
        setDisplay(num);
      } else {
        setDisplay(display + num);
      }
    }
  };

  const inputOperator = (op: string) => {
    const newExpression = expression + display + ' ' + op + ' ';
    setExpression(newExpression);
    setWaitingForOperand(true);
  };

  const inputFunction = (func: string) => {
    let functionName = func;
    let mathJsFunction = func;
    
    if (isInverse) {
      switch (func) {
        case 'sin': 
          functionName = 'sin⁻¹';
          mathJsFunction = 'asin';
          break;
        case 'cos': 
          functionName = 'cos⁻¹';
          mathJsFunction = 'acos';
          break;
        case 'tan': 
          functionName = 'tan⁻¹';
          mathJsFunction = 'atan';
          break;
        case 'log': 
          functionName = '10^';
          mathJsFunction = '10^';
          break;
        case 'ln': 
          functionName = 'e^';
          mathJsFunction = 'exp';
          break;
      }
    }
    
    // Build the expression for display and calculation
    let displayValue = display;
    let calcValue = display;
    
    // Handle constants properly
    if (display === 'π') {
      calcValue = 'pi';
    } else if (display === 'e') {
      calcValue = 'e';
    }
    
    const displayExpression = expression + functionName + '(' + displayValue + ')';
    const calcExpression = expression + mathJsFunction + '(' + calcValue + ')';
    
    setExpression(calcExpression);
    setWaitingForOperand(true);
    setIsInverse(false);
  };

  const inputFactorial = () => {
    const newExpression = expression + display + '!';
    setExpression(newExpression);
    setWaitingForOperand(true);
  };

  const inputConstant = (constant: string) => {
    if (waitingForOperand || display === '0') {
      if (constant === 'π') {
        setDisplay('3.14159265359');
      } else if (constant === 'e') {
        setDisplay('2.71828182846');
      } else {
        setDisplay(constant);
      }
      setWaitingForOperand(false);
    } else {
      if (constant === 'π') {
        setDisplay(display + '3.14159265359');
      } else if (constant === 'e') {
        setDisplay(display + '2.71828182846');
      } else {
        setDisplay(display + constant);
      }
    }
  };

  const performCalculation = () => {
    if (expression) {
      let fullExpression = expression;
      
      // If there's a pending value, add it to the expression
      if (!waitingForOperand) {
        fullExpression += display;
      }
      
      console.log('Original expression:', fullExpression);
      
      // Replace constants first, before other transformations
      fullExpression = fullExpression
        .replace(/π/g, 'pi')
        .replace(/(?<![a-zA-Z])e(?![a-zA-Z])/g, 'e');
      
      console.log('After constants:', fullExpression);
      
      // Convert scientific functions to mathjs format
      fullExpression = fullExpression
        .replace(/\blog\(/g, 'log10(')  // Convert log button to log10 (base-10)
        .replace(/\bln\(/g, 'log(')     // Convert ln button to log (natural log)
        .replace(/cos⁻¹\(/g, 'acos(')
        .replace(/tan⁻¹\(/g, 'atan(')
        .replace(/10\^\(/g, 'pow(10, ')
        .replace(/e\^\(/g, 'exp(')
        .replace(/(\d+)!/g, 'factorial($1)')
        .replace(/(\d+)!/g, 'factorial($1)');
      
      // Handle degree mode for trig functions
      if (angleMode === 'DEG') {
        // Handle forward trig functions (input angle in degrees)
        fullExpression = fullExpression.replace(/\bsin\(([^)]+)\)/g, (match, angle) => {
          if (!match.includes('asin')) return `sin(${angle} * pi / 180)`;
          return match;
        });
        fullExpression = fullExpression.replace(/\bcos\(([^)]+)\)/g, (match, angle) => {
          if (!match.includes('acos')) return `cos(${angle} * pi / 180)`;
          return match;
        });
        fullExpression = fullExpression.replace(/\btan\(([^)]+)\)/g, (match, angle) => {
          if (!match.includes('atan')) return `tan(${angle} * pi / 180)`;
          return match;
        });
        
        // Handle inverse trig functions (output angle in degrees)
        fullExpression = fullExpression
          .replace(/asin\(([^)]+)\)/g, '(asin($1) * 180 / pi)')
          .replace(/acos\(([^)]+)\)/g, '(acos($1) * 180 / pi)')
          .replace(/atan\(([^)]+)\)/g, '(atan($1) * 180 / pi)');
      }
      
      console.log('After function conversion:', fullExpression);
      
      // Fix power function syntax for mathjs
      fullExpression = fullExpression.replace(/pow\(10, ([^)]+)\)/g, 'pow(10, $1)');
      
      console.log('Final expression:', fullExpression);
      
      const result = calculate(fullExpression);
      setExpression('');
      setWaitingForOperand(true);
    }
  };

  const handleSpecialFunction = (func: string) => {
    const currentValue = parseFloat(display);
    let result: string;
    
    try {
      switch (func) {
        case 'x²':
          result = calculate(`(${display})^2`);
          break;
        case '√':
          result = calculate(`sqrt(${display})`);
          break;
        case '1/x':
          result = calculate(`1/(${display})`);
          break;
        case '%':
          result = (currentValue / 100).toString();
          // EXP should input scientific notation multiplier
          const newExpression = expression + display + 'e';
          setExpression(newExpression);
          setWaitingForOperand(true);
          return;
        case '±':
          result = display.startsWith('-') ? display.slice(1) : '-' + display;
          break;
        case '|x|':
          result = Math.abs(currentValue).toString();
          break;
        default:
          return;
      }
      
      setDisplay(result);
      setWaitingForOperand(true);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    clearDisplay();
    setExpression('');
    setWaitingForOperand(false);
  };

  const handleAllClear = () => {
    clearAll();
    setExpression('');
    setWaitingForOperand(false);
    setIsInverse(false);
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
        <CalculatorButton value="x!" onClick={inputFactorial} variant="function">x!</CalculatorButton>

        {/* Row 2 - Powers and roots */}
        <CalculatorButton value="π" onClick={() => inputConstant('π')} variant="function">π</CalculatorButton>
        <CalculatorButton value="e" onClick={() => inputConstant('e')} variant="function">e</CalculatorButton>
        <CalculatorButton value="x²" onClick={() => handleSpecialFunction('x²')} variant="function">x²</CalculatorButton>
        <CalculatorButton value="√" onClick={() => handleSpecialFunction('√')} variant="function">√x</CalculatorButton>
        <CalculatorButton value="^" onClick={() => inputOperator('^')} variant="function">xʸ</CalculatorButton>
        <CalculatorButton value="(" onClick={() => {
          // Add opening parenthesis to expression
          const newExpression = expression + display + '(';
          setExpression(newExpression);
          setDisplay('0');
          setWaitingForOperand(false);
        }} variant="operator">(</CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton value="AC" onClick={handleAllClear} variant="clear">AC</CalculatorButton>
        <CalculatorButton value="C" onClick={handleClear} variant="clear">C</CalculatorButton>
        <CalculatorButton value=")" onClick={() => {
          // Add closing parenthesis to expression
          const newExpression = expression + display + ')';
          setExpression(newExpression);
          setWaitingForOperand(true);
        }} variant="operator">)</CalculatorButton>
        <CalculatorButton value="/" onClick={() => inputOperator('/')} variant="operator">÷</CalculatorButton>
        <CalculatorButton value="*" onClick={() => inputOperator('*')} variant="operator">×</CalculatorButton>
        <CalculatorButton value="DEL" onClick={() => {
          const newDisplay = display.slice(0, -1) || '0';
          setDisplay(newDisplay);
          if (newDisplay === '0') setWaitingForOperand(false);
        }} variant="clear">DEL</CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton value="7" onClick={() => inputNumber('7')}>7</CalculatorButton>
        <CalculatorButton value="8" onClick={() => inputNumber('8')}>8</CalculatorButton>
        <CalculatorButton value="9" onClick={() => inputNumber('9')}>9</CalculatorButton>
        <CalculatorButton value="-" onClick={() => inputOperator('-')} variant="operator">−</CalculatorButton>
        <CalculatorButton value="%" onClick={() => handleSpecialFunction('%')} variant="operator">%</CalculatorButton>
        <CalculatorButton value="1/x" onClick={() => handleSpecialFunction('1/x')} variant="function">1/x</CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton value="4" onClick={() => inputNumber('4')}>4</CalculatorButton>
        <CalculatorButton value="5" onClick={() => inputNumber('5')}>5</CalculatorButton>
        <CalculatorButton value="6" onClick={() => inputNumber('6')}>6</CalculatorButton>
        <CalculatorButton value="+" onClick={() => inputOperator('+')} variant="operator">+</CalculatorButton>
        <CalculatorButton value="±" onClick={() => handleSpecialFunction('±')} variant="operator">±</CalculatorButton>
        <CalculatorButton value="EXP" onClick={() => {
          // Handle scientific notation (e.g., 1.5e10)
          if (!display.includes('e') && !waitingForOperand) {
            setDisplay(display + 'e');
          }
        }} variant="function">EXP</CalculatorButton>

        {/* Row 6 */}
        <CalculatorButton value="1" onClick={() => inputNumber('1')}>1</CalculatorButton>
        <CalculatorButton value="2" onClick={() => inputNumber('2')}>2</CalculatorButton>
        <CalculatorButton value="3" onClick={() => inputNumber('3')}>3</CalculatorButton>
        <CalculatorButton value="=" onClick={performCalculation} variant="equals" className="row-span-2">=</CalculatorButton>
        <CalculatorButton value="Ans" onClick={() => setDisplay(display)} variant="function">Ans</CalculatorButton>
        <CalculatorButton value="mod" onClick={() => inputOperator(' mod ')} variant="function">mod</CalculatorButton>
          setDisplay(Math.random().toString());
          setWaitingForOperand(true);
        }} variant="function">Rand</CalculatorButton>

        {/* Row 7 */}
        <CalculatorButton value="0" onClick={() => inputNumber('0')} className="col-span-2">0</CalculatorButton>
        <CalculatorButton value="." onClick={() => {
          if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
          } else if (!display.includes('.')) {
            setDisplay(display + '.');
          }
        }}>.</CalculatorButton>
        <CalculatorButton value="abs" onClick={() => handleSpecialFunction('|x|')} variant="function">|x|</CalculatorButton>
      </div>
    </div>
  );
};