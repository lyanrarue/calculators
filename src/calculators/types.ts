export type CalculatorInputType = 'number' | 'select' | 'text' | 'checkbox';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface CalculatorInput {
  name: string;
  label: string;
  type: CalculatorInputType;
  defaultValue?: string | number | boolean;
  validation?: (value: string | number | boolean) => boolean | string;
  options?: SelectOption[];
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  helpText?: string;
  placeholder?: string;
}

export type CalculatorResult =
  | { type: 'single'; value: number; label?: string }
  | { type: 'multiple'; values: Array<{ label: string; value: number }> }
  | { type: 'table'; headers: string[]; rows: (string | number)[][] }
  | { type: 'chart'; data: unknown; chartType: string };

export interface CalculatorConfig {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  inputs: CalculatorInput[];
  calculate: (values: Record<string, string | number | boolean>) => CalculatorResult;
  formatResult?: (result: CalculatorResult) => string;
}

export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};
