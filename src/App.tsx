import { useCalculator } from './hooks/useCalculator';
import { ModeSelector } from './components/ModeSelector';
import { StandardCalculator } from './components/calculators/StandardCalculator';
import { ScientificCalculator } from './components/calculators/ScientificCalculator';
import { GraphingCalculator } from './components/calculators/GraphingCalculator';
import { ConversionCalculator } from './components/calculators/ConversionCalculator';
import { History } from './components/History';

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
    clearHistory,
    recallLastResult,
    addToHistory,
  } = calculator;

  const handleHistoryItemSelect = (item: any) => {
    setDisplay(item.result);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
       

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
                recallLastResult={recallLastResult}
                addToHistory={addToHistory}
              />
            )}

            {mode === 'graphing' && (
              <GraphingCalculator calculate={calculate} />
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

      </div>
    </div>
  );
}

export default App;