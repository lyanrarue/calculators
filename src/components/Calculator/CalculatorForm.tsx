import type { CalculatorConfig } from '../../calculators/types';
import { useCalculator } from '../../hooks/useCalculator';
import { FormInput } from './FormInput';
import { ResultDisplay } from './ResultDisplay';

interface CalculatorFormProps {
  config: CalculatorConfig;
}

export function CalculatorForm({ config }: CalculatorFormProps) {
  const { values, updateValue, result, error, validation, isCalculating } =
    useCalculator(config);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{config.name}</h2>
        {config.description && (
          <p className="mt-1 text-sm text-gray-600">{config.description}</p>
        )}
      </div>

      {/* Form Inputs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="space-y-4">
          {config.inputs.map((input) => (
            <FormInput
              key={input.name}
              input={input}
              value={values[input.name]}
              onChange={(value) => updateValue(input.name, value)}
              error={validation.errors[input.name]}
            />
          ))}
        </div>
      </div>

      {/* Result Display */}
      <ResultDisplay
        result={result}
        error={error}
        isCalculating={isCalculating}
      />
    </div>
  );
}
