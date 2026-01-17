import { useEffect, useState, useCallback } from 'react';
import type { CalculatorConfig, CalculatorResult, ValidationResult } from '../calculators/types';
import { validateAllInputs } from '../utils/validation';
import { useDebounce } from './useDebounce';

interface UseCalculatorReturn {
  values: Record<string, string | number | boolean>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, string | number | boolean>>>;
  updateValue: (name: string, value: string | number | boolean) => void;
  result: CalculatorResult | null;
  error: string | null;
  validation: ValidationResult;
  isCalculating: boolean;
}

/**
 * Custom hook to manage calculator state and computation
 * @param config - The calculator configuration
 * @returns Calculator state and methods
 */
export function useCalculator(config: CalculatorConfig): UseCalculatorReturn {
  // Initialize values from input defaults
  const [values, setValues] = useState<Record<string, string | number | boolean>>(() => {
    const initialValues: Record<string, string | number | boolean> = {};
    config.inputs.forEach((input) => {
      initialValues[input.name] = input.defaultValue ?? '';
    });
    return initialValues;
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationResult>({
    isValid: false,
    errors: {},
  });
  const [isCalculating, setIsCalculating] = useState(false);

  // Debounce the values for auto-calculation
  const debouncedValues = useDebounce(values, 250);

  // Update a single value
  const updateValue = useCallback((name: string, value: string | number | boolean) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Validate inputs whenever values change
  // Don't show "required field" errors until user has interacted
  useEffect(() => {
    const validationResult = validateAllInputs(config.inputs, values, false);
    setValidation(validationResult);
  }, [values, config.inputs]);

  // Auto-calculate when debounced values change and validation passes
  useEffect(() => {
    const performCalculation = async () => {
      // Check all validations including required fields for calculation
      const validationResult = validateAllInputs(config.inputs, debouncedValues, true);

      if (!validationResult.isValid) {
        setResult(null);
        setError(null);
        return;
      }

      setIsCalculating(true);
      setError(null);

      try {
        const calculationResult = config.calculate(debouncedValues);
        setResult(calculationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred during calculation');
        setResult(null);
      } finally {
        setIsCalculating(false);
      }
    };

    performCalculation();
  }, [debouncedValues, config]);

  return {
    values,
    setValues,
    updateValue,
    result,
    error,
    validation,
    isCalculating,
  };
}
