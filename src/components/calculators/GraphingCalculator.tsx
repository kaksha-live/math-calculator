import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { evaluate } from 'mathjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { GraphFunction } from '../../types/calculator';
import { Plus, Eye, EyeOff, Trash2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphingCalculatorProps {
  calculate: (expression: string) => string;
}

export const GraphingCalculator: React.FC<GraphingCalculatorProps> = ({ calculate }) => {
  const [functions, setFunctions] = useState<GraphFunction[]>([
    { id: '1', expression: 'x^2', color: '#3B82F6', visible: true },
  ]);
  const [newFunction, setNewFunction] = useState('');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  const generateGraphData = () => {
    const step = (xMax - xMin) / 400;
    const xValues: number[] = [];
    for (let x = xMin; x <= xMax; x += step) {
      xValues.push(x);
    }

    const datasets = functions
      .filter(func => func.visible)
      .map((func, index) => {
        const yValues = xValues.map(x => {
          try {
            const expression = func.expression.replace(/x/g, `(${x})`);
            const result = evaluate(expression);
            return typeof result === 'number' && isFinite(result) ? result : null;
          } catch {
            return null;
          }
        });

        return {
          label: `y = ${func.expression}`,
          data: yValues,
          borderColor: func.color,
          backgroundColor: func.color + '20',
          borderWidth: 2,
          fill: false,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 4,
        };
      });

    return {
      labels: xValues.map(x => x.toFixed(2)),
      datasets,
    };
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'center',
        min: xMin,
        max: xMax,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: (xMax - xMin) / 10,
        },
      },
      y: {
        type: 'linear',
        position: 'center',
        min: yMin,
        max: yMax,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: (yMax - yMin) / 10,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const addFunction = () => {
    if (newFunction.trim()) {
      const newFunc: GraphFunction = {
        id: Date.now().toString(),
        expression: newFunction.trim(),
        color: colors[functions.length % colors.length],
        visible: true,
      };
      setFunctions([...functions, newFunc]);
      setNewFunction('');
    }
  };

  const removeFunction = (id: string) => {
    setFunctions(functions.filter(func => func.id !== id));
  };

  const toggleVisibility = (id: string) => {
    setFunctions(functions.map(func =>
      func.id === id ? { ...func, visible: !func.visible } : func
    ));
  };

  const updateExpression = (id: string, expression: string) => {
    setFunctions(functions.map(func =>
      func.id === id ? { ...func, expression } : func
    ));
  };

  const resetView = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Function Input */}
      <div className="bg-white/80 p-4 rounded-lg mb-4 backdrop-blur-sm">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newFunction}
            onChange={(e) => setNewFunction(e.target.value)}
            placeholder="Enter function (e.g., x^2, sin(x), 2*x + 1)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addFunction()}
          />
          <button
            onClick={addFunction}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* Function List */}
        <div className="space-y-2">
          {functions.map((func) => (
            <div key={func.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: func.color }}
              />
              <input
                type="text"
                value={func.expression}
                onChange={(e) => updateExpression(func.id, e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => toggleVisibility(func.id)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                {func.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                onClick={() => removeFunction(func.id)}
                className="p-1 hover:bg-red-100 text-red-600 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-white/80 p-4 rounded-lg mb-4 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X Min</label>
            <input
              type="number"
              value={xMin}
              onChange={(e) => setXMin(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X Max</label>
            <input
              type="number"
              value={xMax}
              onChange={(e) => setXMax(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Y Min</label>
            <input
              type="number"
              value={yMin}
              onChange={(e) => setYMin(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Y Max</label>
            <input
              type="number"
              value={yMax}
              onChange={(e) => setYMax(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={resetView}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reset View
        </button>
      </div>

      {/* Graph */}
      <div className="bg-white/80 p-4 rounded-lg backdrop-blur-sm">
        <div className="h-96">
          <Line data={generateGraphData()} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};