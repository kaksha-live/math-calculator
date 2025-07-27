import React from 'react';
import { Moon, Sun, Calculator as CalcIcon } from 'lucide-react';
import { useCalculator } from './hooks/useCalculator';
import { ModeSelector } from './components/ModeSelector';
import { StandardCalculator } from './components/calculators/StandardCalculator';
import { ScientificCalculator } from './components/calculators/ScientificCalculator';
import { GraphingCalculator } from './components/calculators/GraphingCalculator';
import { FinancialCalculator } from './components/calculators/FinancialCalculator';
import { ConversionCalculator } from './components/calculators/ConversionCalculator';
import { History } from './components/History';
import BoltBadge from './components/BoltBadge';

function App() {
  const calculator = useCalculator();
  const {
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
  } = calculator;

  const clearHistory = () => {
    // This would need to be implemented in the useCalculator hook
  };

  const handleHistoryItemSelect = (item: any) => {
    setDisplay(item.result);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <CalcIcon size={32} className={isDarkMode ? 'text-white' : 'text-blue-600'} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                All-in-One Calculator
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Professional calculator suite for all your needs
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Bolt Badge */}
            <div className="w-10 h-10">
              <BoltBadge isDarkMode={isDarkMode} />
            </div>
            
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-lg transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
                  : 'bg-white/80 text-gray-700 hover:bg-white shadow-md'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Mode Selector */}
        <ModeSelector currentMode={mode} onModeChange={setMode} />

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calculator */}
          <div className="lg:col-span-3">
            {mode === 'standard' && (
              <StandardCalculator
                display={display}
                setDisplay={setDisplay}
                memory={memory}
                calculate={calculate}
                clearDisplay={clearDisplay}
                clearAll={clearAll}
                memoryAdd={memoryAdd}
                memorySubtract={memorySubtract}
                memoryRecall={memoryRecall}
                memoryClear={memoryClear}
              />
            )}
            
            {mode === 'scientific' && (
              <ScientificCalculator
                display={display}
                setDisplay={setDisplay}
                memory={memory}
                calculate={calculate}
                clearDisplay={clearDisplay}
                clearAll={clearAll}
              />
            )}
            
            {mode === 'graphing' && (
              <GraphingCalculator calculate={calculate} />
            )}
            
            {mode === 'financial' && (
              <FinancialCalculator calculate={calculate} />
            )}
            
            {mode === 'conversion' && (
              <ConversionCalculator calculate={calculate} />
            )}
          </div>

          {/* History Panel */}
          <div className="lg:col-span-1">
            <History
              history={history}
              onClearHistory={clearHistory}
              onSelectHistoryItem={handleHistoryItemSelect}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className={`mt-12 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <p>© 2025 All-in-One Calculator. Built with React, TypeScript & Tailwind CSS.</p>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-1">
              <span>Powered by</span>
              <div className="w-4 h-4">
                <BoltBadge isDarkMode={isDarkMode} />
              </div>
              <a 
                href="https://bolt.new/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`hover:underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
              >
                Bolt.new
              </a>
            </div>
          </div>
          <p className="mt-1">Professional-grade calculator suite for education, business, and personal use.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;