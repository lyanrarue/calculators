import type { CalculatorInput, ValidationResult } from '../calculators/types';

/**
 * Validate a single input value against its validation function
 * @param input - The input configuration
 * @param value - The value to validate
 * @param showRequiredErrors - Whether to show "required field" errors (default: false)
 * @returns Validation error message or true if valid
 */
export const validateInput = (
  input: CalculatorInput,
  value: string | number | boolean,
  showRequiredErrors: boolean = false
): boolean | string => {
  // Check required validation - only show if explicitly requested
  if (value === undefined || value === null || value === '') {
    if (showRequiredErrors) {
      return 'This field is required';
    }
    return true; // Don't show error for empty fields unless requested
  }

  // Check min/max for number inputs
  if (input.type === 'number') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return 'Must be a valid number';
    }
    if (input.min !== undefined && numValue < input.min) {
      return `Must be at least ${input.min}`;
    }
    if (input.max !== undefined && numValue > input.max) {
      return `Must be at most ${input.max}`;
    }
  }

  // Run custom validation if provided
  if (input.validation) {
    const result = input.validation(value);
    // Only show required errors if showRequiredErrors is true
    if (!showRequiredErrors && result === 'Required field') {
      return true;
    }
    return result;
  }

  return true;
};

/**
 * Validate all inputs in a calculator form
 * @param inputs - Array of input configurations
 * @param values - Record of current values
 * @param showRequiredErrors - Whether to show "required field" errors (default: false)
 * @returns ValidationResult with overall validity and error messages
 */
export const validateAllInputs = (
  inputs: CalculatorInput[],
  values: Record<string, string | number | boolean>,
  showRequiredErrors: boolean = false
): ValidationResult => {
  const errors: Record<string, string> = {};
  let isValid = true;

  inputs.forEach((input) => {
    const value = values[input.name];
    const result = validateInput(input, value, showRequiredErrors);

    if (result !== true) {
      errors[input.name] = typeof result === 'string' ? result : 'Invalid value';
      isValid = false;
    }
  });

  return { isValid, errors };
};
