import { useState, useCallback } from 'react';
import { evaluate } from 'mathjs';
import { CalculationHistory, CalculatorMode } from '../types/calculator';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
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

  const calculate = useCallback((expression: string) => {
    try {
      const result = evaluate(expression);
      const resultStr = typeof result === 'number' ? 
        (Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '')) : 
        result.toString();
      
      addToHistory(expression, resultStr);
      setDisplay(resultStr);
      return resultStr;
    } catch (error) {
      setDisplay('Error');
      return 'Error';
    }
  }, [addToHistory]);

  const clearDisplay = useCallback(() => {
    setDisplay('0');
  }, []);

  const clearAll = useCallback(() => {
    setDisplay('0');
    setMemory(0);
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

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return {
    display,
    setDisplay,
    memory,
    history,
    mode,
    setMode,
    isDarkMode,
    calculate,
    clearDisplay,
    clearAll,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
    toggleDarkMode,
    addToHistory,
  };
};