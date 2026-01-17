import type { CalculatorConfig } from './types';
import { taxWithholdingCalculator } from './definitions';

export const calculatorRegistry: CalculatorConfig[] = [
  taxWithholdingCalculator,
  // Add more calculators here as they're created
];
