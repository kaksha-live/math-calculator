import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, PiggyBank } from 'lucide-react';

interface FinancialCalculatorProps {
  calculate: (expression: string) => string;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({ calculate }) => {
  const [activeTab, setActiveTab] = useState<'loan' | 'compound' | 'investment'>('loan');
  
  // Loan Calculator State
  const [loanPrincipal, setLoanPrincipal] = useState('');
  const [loanRate, setLoanRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanPayment, setLoanPayment] = useState('');

  // Compound Interest State
  const [compoundPrincipal, setCompoundPrincipal] = useState('');
  const [compoundRate, setCompoundRate] = useState('');
  const [compoundTime, setCompoundTime] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('12');
  const [compoundResult, setCompoundResult] = useState('');

  // Investment State
  const [investmentInitial, setInvestmentInitial] = useState('');
  const [investmentMonthly, setInvestmentMonthly] = useState('');
  const [investmentRate, setInvestmentRate] = useState('');
  const [investmentYears, setInvestmentYears] = useState('');
  const [investmentResult, setInvestmentResult] = useState('');

  const calculateLoanPayment = () => {
    const P = parseFloat(loanPrincipal);
    const r = parseFloat(loanRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (P && r && n) {
      const payment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setLoanPayment(payment.toFixed(2));
    }
  };

  const calculateCompoundInterest = () => {
    const P = parseFloat(compoundPrincipal);
    const r = parseFloat(compoundRate) / 100;
    const n = parseFloat(compoundFrequency);
    const t = parseFloat(compoundTime);

    if (P && r && n && t) {
      const amount = P * Math.pow(1 + r / n, n * t);
      setCompoundResult(amount.toFixed(2));
    }
  };

  const calculateInvestment = () => {
    const P = parseFloat(investmentInitial) || 0;
    const PMT = parseFloat(investmentMonthly) || 0;
    const r = parseFloat(investmentRate) / 100 / 12;
    const n = parseFloat(investmentYears) * 12;

    if ((P || PMT) && r && n) {
      // Future value of initial investment
      const FV1 = P * Math.pow(1 + r, n);
      
      // Future value of monthly payments (annuity)
      const FV2 = PMT * ((Math.pow(1 + r, n) - 1) / r);
      
      const totalFV = FV1 + FV2;
      setInvestmentResult(totalFV.toFixed(2));
    }
  };

  const tabs = [
    { id: 'loan' as const, label: 'Loan Calculator', icon: <DollarSign size={20} /> },
    { id: 'compound' as const, label: 'Compound Interest', icon: <TrendingUp size={20} /> },
    { id: 'investment' as const, label: 'Investment', icon: <PiggyBank size={20} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Loan Calculator */}
      {activeTab === 'loan' && (
        <div className="bg-white/80 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign size={24} />
            Loan Payment Calculator
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount ($)
                </label>
                <input
                  type="number"
                  value={loanPrincipal}
                  onChange={(e) => setLoanPrincipal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="250000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={loanRate}
                  onChange={(e) => setLoanRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="3.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (years)
                </label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="30"
                />
              </div>
              <button
                onClick={calculateLoanPayment}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Calculate Payment
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Monthly Payment</h4>
              <div className="text-3xl font-bold text-green-600">
                ${loanPayment || '0.00'}
              </div>
              {loanPayment && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Total Interest: ${((parseFloat(loanPayment) * parseFloat(loanTerm) * 12) - parseFloat(loanPrincipal)).toFixed(2)}</p>
                  <p>Total Paid: ${(parseFloat(loanPayment) * parseFloat(loanTerm) * 12).toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Compound Interest Calculator */}
      {activeTab === 'compound' && (
        <div className="bg-white/80 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={24} />
            Compound Interest Calculator
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Principal Amount ($)
                </label>
                <input
                  type="number"
                  value={compoundPrincipal}
                  onChange={(e) => setCompoundPrincipal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={compoundRate}
                  onChange={(e) => setCompoundRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time (years)
                </label>
                <input
                  type="number"
                  value={compoundTime}
                  onChange={(e) => setCompoundTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compounding Frequency
                </label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Annually</option>
                  <option value="2">Semi-annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="365">Daily</option>
                </select>
              </div>
              <button
                onClick={calculateCompoundInterest}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Calculate
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Final Amount</h4>
              <div className="text-3xl font-bold text-blue-600">
                ${compoundResult || '0.00'}
              </div>
              {compoundResult && compoundPrincipal && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Interest Earned: ${(parseFloat(compoundResult) - parseFloat(compoundPrincipal)).toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Investment Calculator */}
      {activeTab === 'investment' && (
        <div className="bg-white/80 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PiggyBank size={24} />
            Investment Calculator
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Investment ($)
                </label>
                <input
                  type="number"
                  value={investmentInitial}
                  onChange={(e) => setInvestmentInitial(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Contribution ($)
                </label>
                <input
                  type="number"
                  value={investmentMonthly}
                  onChange={(e) => setInvestmentMonthly(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Return (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={investmentRate}
                  onChange={(e) => setInvestmentRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Period (years)
                </label>
                <input
                  type="number"
                  value={investmentYears}
                  onChange={(e) => setInvestmentYears(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="20"
                />
              </div>
              <button
                onClick={calculateInvestment}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Calculate Investment
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Future Value</h4>
              <div className="text-3xl font-bold text-purple-600">
                ${investmentResult || '0.00'}
              </div>
              {investmentResult && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Total Contributions: ${((parseFloat(investmentInitial) || 0) + (parseFloat(investmentMonthly) || 0) * parseFloat(investmentYears) * 12).toFixed(2)}</p>
                  <p>Investment Gains: ${(parseFloat(investmentResult) - ((parseFloat(investmentInitial) || 0) + (parseFloat(investmentMonthly) || 0) * parseFloat(investmentYears) * 12)).toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};