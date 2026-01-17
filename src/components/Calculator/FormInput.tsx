import type { CalculatorInput } from '../../calculators/types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface FormInputProps {
  input: CalculatorInput;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  error?: string;
}

export function FormInput({ input, value, onChange, error }: FormInputProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (input.type === 'number') {
      // Allow empty string for better UX
      const newValue = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
      onChange(newValue);
    } else {
      onChange(e.target.value);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  switch (input.type) {
    case 'number':
      return (
        <Input
          type="number"
          label={input.label}
          value={typeof value === 'string' || typeof value === 'number' ? value : ''}
          onChange={handleChange}
          error={error}
          helpText={input.helpText}
          prefix={input.prefix}
          suffix={input.suffix}
          step={input.step}
          min={input.min}
          max={input.max}
          placeholder={input.placeholder}
        />
      );

    case 'select':
      return (
        <Select
          label={input.label}
          value={typeof value === 'string' || typeof value === 'number' ? value : ''}
          onChange={handleChange}
          error={error}
          helpText={input.helpText}
          options={input.options || []}
        />
      );

    case 'text':
      return (
        <Input
          type="text"
          label={input.label}
          value={typeof value === 'string' || typeof value === 'number' ? value : ''}
          onChange={handleChange}
          error={error}
          helpText={input.helpText}
          prefix={input.prefix}
          suffix={input.suffix}
          placeholder={input.placeholder}
        />
      );

    case 'checkbox':
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={input.name}
            checked={typeof value === 'boolean' ? value : false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor={input.name}
            className="ml-2 block text-sm text-gray-900"
          >
            {input.label}
          </label>
        </div>
      );

    default:
      return null;
  }
}
