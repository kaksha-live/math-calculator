import React, { useState } from 'react';
import { ConversionCategory } from '../../types/calculator';

interface ConversionCalculatorProps {
  calculate: (expression: string) => string;
}

const conversionCategories: ConversionCategory[] = [
  {
    name: 'Length',
    units: [
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { name: 'Mile', symbol: 'mi', factor: 1609.34 },
    ],
  },
  {
    name: 'Weight',
    units: [
      { name: 'Kilogram', symbol: 'kg', factor: 1 },
      { name: 'Gram', symbol: 'g', factor: 0.001 },
      { name: 'Pound', symbol: 'lb', factor: 0.453592 },
      { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
      { name: 'Stone', symbol: 'st', factor: 6.35029 },
      { name: 'Ton', symbol: 't', factor: 1000 },
    ],
  },
  {
    name: 'Temperature',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1 },
      { name: 'Fahrenheit', symbol: '°F', factor: 1 },
      { name: 'Kelvin', symbol: 'K', factor: 1 },
    ],
  },
  {
    name: 'Area',
    units: [
      { name: 'Square Meter', symbol: 'm²', factor: 1 },
      { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
      { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 },
      { name: 'Acre', symbol: 'acre', factor: 4046.86 },
      { name: 'Hectare', symbol: 'ha', factor: 10000 },
    ],
  },
  {
    name: 'Volume',
    units: [
      { name: 'Liter', symbol: 'L', factor: 1 },
      { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      { name: 'Gallon (US)', symbol: 'gal', factor: 3.78541 },
      { name: 'Quart (US)', symbol: 'qt', factor: 0.946353 },
      { name: 'Pint (US)', symbol: 'pt', factor: 0.473176 },
      { name: 'Cup (US)', symbol: 'cup', factor: 0.236588 },
      { name: 'Fluid Ounce (US)', symbol: 'fl oz', factor: 0.0295735 },
    ],
  },
  {
    name: 'Time',
    units: [
      { name: 'Second', symbol: 's', factor: 1 },
      { name: 'Minute', symbol: 'min', factor: 60 },
      { name: 'Hour', symbol: 'h', factor: 3600 },
      { name: 'Day', symbol: 'd', factor: 86400 },
      { name: 'Week', symbol: 'wk', factor: 604800 },
      { name: 'Month', symbol: 'mo', factor: 2629746 },
      { name: 'Year', symbol: 'yr', factor: 31556952 },
    ],
  },
];

export const ConversionCalculator: React.FC<ConversionCalculatorProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState(conversionCategories[0]);
  const [fromUnit, setFromUnit] = useState(selectedCategory.units[0]);
  const [toUnit, setToUnit] = useState(selectedCategory.units[1]);
  const [inputValue, setInputValue] = useState('1');
  const [result, setResult] = useState('');

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius: number;
    if (from === '°C') {
      celsius = value;
    } else if (from === '°F') {
      celsius = (value - 32) * 5/9;
    } else { // Kelvin
      celsius = value - 273.15;
    }

    // Convert from Celsius to target
    if (to === '°C') {
      return celsius;
    } else if (to === '°F') {
      return celsius * 9/5 + 32;
    } else { // Kelvin
      return celsius + 273.15;
    }
  };

  const performConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Invalid input');
      return;
    }

    if (selectedCategory.name === 'Temperature') {
      const converted = convertTemperature(value, fromUnit.symbol, toUnit.symbol);
      setResult(converted.toFixed(4).replace(/\.?0+$/, ''));
    } else {
      // Standard unit conversion using base factors
      const baseValue = value * fromUnit.factor;
      const converted = baseValue / toUnit.factor;
      setResult(converted.toFixed(8).replace(/\.?0+$/, ''));
    }
  };

  const handleCategoryChange = (category: ConversionCategory) => {
    setSelectedCategory(category);
    setFromUnit(category.units[0]);
    setToUnit(category.units[1] || category.units[0]);
    setResult('');
  };

  React.useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      performConversion();
    }
  }, [inputValue, fromUnit, toUnit]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Category Selection */}
      <div className="bg-white/80 p-4 rounded-lg mb-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-3">Conversion Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {conversionCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory.name === category.name
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Interface */}
      <div className="bg-white/80 p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">{selectedCategory.name} Conversion</h3>
        
        <div className="grid md:grid-cols-3 gap-4 items-end">
          {/* From Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="Enter value"
            />
            <select
              value={fromUnit.name}
              onChange={(e) => setFromUnit(selectedCategory.units.find(u => u.name === e.target.value)!)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedCategory.units.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ⇄
            </button>
          </div>

          {/* To Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 mb-2 min-h-[2.5rem] flex items-center">
              <span className="text-lg font-mono font-bold text-blue-600">
                {result || '0'}
              </span>
            </div>
            <select
              value={toUnit.name}
              onChange={(e) => setToUnit(selectedCategory.units.find(u => u.name === e.target.value)!)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedCategory.units.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conversion Formula */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Result:</strong> {inputValue} {fromUnit.symbol} = {result} {toUnit.symbol}
            </p>
          </div>
        )}

        {/* Quick Conversions */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Quick Conversions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {[1, 10, 100, 1000].map((quickValue) => {
              const quickResult = selectedCategory.name === 'Temperature'
                ? convertTemperature(quickValue, fromUnit.symbol, toUnit.symbol)
                : (quickValue * fromUnit.factor) / toUnit.factor;
              
              return (
                <button
                  key={quickValue}
                  onClick={() => setInputValue(quickValue.toString())}
                  className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  {quickValue} {fromUnit.symbol} → {quickResult.toFixed(2).replace(/\.?0+$/, '')} {toUnit.symbol}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};