import { useState, useCallback } from 'react';
import { evaluate } from 'mathjs';
import { CalculationHistory, CalculatorMode } from '../types/calculator';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [lastResult, setLastResult] = useState('0');
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [mode, setMode] = useState<CalculatorMode>('standard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addToHistory = useCallback((expression: string, result: string) => {
    const newEntry: CalculationHistory = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date(),
      mode,
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 49)]); // Keep last 50 entries
  }, [mode]);

  // Calculate function that automatically adds to history (for simple calculations)
  const calculate = useCallback((expression: string) => {
    try {
      console.log('Calculating:', expression);
      const result = evaluate(expression);
      console.log('Result:', result);

      let resultStr: string;
      if (typeof result === 'number') {
        if (Number.isInteger(result)) {
          // Format integers with commas for readability
          resultStr = result.toLocaleString();
        } else {
          // Format decimals, remove trailing zeros, then add commas
          const formatted = result.toFixed(8).replace(/\.?0+$/, '');
          const num = parseFloat(formatted);
          resultStr = num.toLocaleString();
        }
      } else {
        resultStr = result.toString();
      }

      addToHistory(expression, resultStr);
      setDisplay(resultStr);
      setLastResult(resultStr);
      return resultStr;
    } catch (error) {
      console.error('Calculation error:', error);
      setDisplay('Error');
      return 'Error';
    }
  }, [addToHistory]);

  // Calculate function that doesn't add to history (for manual history control)
  const calculateOnly = useCallback((expression: string) => {
    try {
      console.log('Calculating:', expression);
      const result = evaluate(expression);
      console.log('Result:', result);

      let resultStr: string;
      if (typeof result === 'number') {
        if (Number.isInteger(result)) {
          resultStr = result.toLocaleString();
        } else {
          const formatted = result.toFixed(8).replace(/\.?0+$/, '');
          const num = parseFloat(formatted);
          resultStr = num.toLocaleString();
        }
      } else {
        resultStr = result.toString();
      }

      return resultStr;
    } catch (error) {
      console.error('Calculation error:', error);
      return 'Error';
    }
  }, []);

  const clearDisplay = useCallback(() => {
    setDisplay('0');
  }, []);

  const clearAll = useCallback(() => {
    setDisplay('0');
  }, []);

  const memoryAdd = useCallback(() => {
    setMemory(prev => prev + parseFloat(display || '0'));
  }, [display]);

  const memorySubtract = useCallback(() => {
    setMemory(prev => prev - parseFloat(display || '0'));
  }, [display]);

  const memoryRecall = useCallback(() => {
    setDisplay(memory.toString());
  }, [memory]);

  const memoryClear = useCallback(() => {
    setMemory(0);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const recallLastResult = useCallback(() => {
    setDisplay(lastResult);
  }, [lastResult]);

  return {
    display,
    setDisplay,
    memory,
    history,
    mode,
    setMode,
    isDarkMode,
    lastResult,
    setLastResult,
    calculate,
    calculateOnly,
    clearDisplay,
    clearAll,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
    toggleDarkMode,
    addToHistory,
    clearHistory,
    recallLastResult,
  };
};