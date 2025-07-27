export type CalculatorMode = 'standard' | 'scientific' | 'graphing' | 'financial' | 'conversion';

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
  mode: CalculatorMode;
}

export interface FinancialCalculation {
  type: 'loan' | 'compound' | 'investment';
  principal?: number;
  rate?: number;
  time?: number;
  payment?: number;
  futureValue?: number;
  presentValue?: number;
}

export interface ConversionUnit {
  name: string;
  symbol: string;
  factor: number;
}

export interface ConversionCategory {
  name: string;
  units: ConversionUnit[];
}

export interface GraphFunction {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}